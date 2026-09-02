import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { THEME_RECIPES } from "../packages/contracts/src/theme-recipe.ts";
import {
  densityProfiles,
  motionDurationRange,
  paletteProfiles,
  radiusProfiles,
  referenceSpace,
} from "../packages/tokens/src/theme.ts";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputPaths = [
  resolve(repoRoot, "generated/tokens.dtcg.json"),
  resolve(repoRoot, "packages/tokens/generated/tokens.dtcg.json"),
  resolve(repoRoot, "packages/agent/generated/tokens.dtcg.json"),
];

function parseHsl(value) {
  const match = /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/.exec(
    value,
  );
  if (!match) throw new Error(`Expected HSL reference value: ${value}`);
  return {
    h: Number(match[1]) / 360,
    s: Number(match[2]) / 100,
    l: Number(match[3]) / 100,
  };
}

function hueToRgb(p, q, t) {
  let adjusted = t;
  if (adjusted < 0) adjusted += 1;
  if (adjusted > 1) adjusted -= 1;
  if (adjusted < 1 / 6) return p + (q - p) * 6 * adjusted;
  if (adjusted < 1 / 2) return q;
  if (adjusted < 2 / 3) return p + (q - p) * (2 / 3 - adjusted) * 6;
  return p;
}

function hslToSrgb(value) {
  const { h, l, s } = parseHsl(value);
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    hueToRgb(p, q, h + 1 / 3),
    hueToRgb(p, q, h),
    hueToRgb(p, q, h - 1 / 3),
  ].map((component) => Number(component.toFixed(6)));
}

function color(value) {
  return {
    $type: "color",
    $value: {
      colorSpace: "srgb",
      components: hslToSrgb(value),
      alpha: 1,
    },
    $extensions: {
      "org.ten4seven": { compatibilityHsl: value },
    },
  };
}

function parseUnitValue(value, units, tokenType) {
  const match = new RegExp(`^(-?\\d+(?:\\.\\d+)?)(${units.join("|")})$`).exec(
    value,
  );
  if (!match)
    throw new Error(`Expected ${tokenType} value with unit: ${value}`);
  return { value: Number(match[1]), unit: match[2] };
}

function dimension(value) {
  return {
    $type: "dimension",
    $value: parseUnitValue(value, ["px", "rem"], "dimension"),
  };
}

function duration(value) {
  return {
    $type: "duration",
    $value: parseUnitValue(value, ["ms", "s"], "duration"),
  };
}

function alias(type, target) {
  return { $type: type, $value: `{${target}}` };
}

function semanticActionTokens(palette) {
  return {
    primary: alias("color", `ref.color.palette.${palette}.primary`),
    primaryHover: alias("color", `ref.color.palette.${palette}.primaryHover`),
    primaryPressed: alias(
      "color",
      `ref.color.palette.${palette}.primaryPressed`,
    ),
  };
}

export function buildDtcgTokenExport() {
  const referencePalettes = Object.fromEntries(
    Object.entries(paletteProfiles).map(([name, profile]) => [
      name,
      {
        primary: color(profile.primary),
        primaryHover: color(profile.primaryHover),
        primaryPressed: color(profile.primaryActive),
        accent: color(profile.accent),
      },
    ]),
  );

  return {
    $description:
      "Deterministic DTCG-compatible export of the typed Ten4Seven v2 token runtime.",
    $extensions: {
      "org.ten4seven": {
        canonicalRuntime: "packages/tokens/src/theme.ts",
        compatibilityBoundary:
          "The runtime retains HSL custom properties for visual stability while this export exposes DTCG-shaped typed sRGB reference values and semantic aliases. Recipe selection remains runtime-aware.",
        dtcgDirection:
          "2025.10-compatible groups, typed $value objects, and aliases.",
      },
    },
    ref: {
      space: Object.fromEntries(
        Object.entries(referenceSpace).map(([step, value]) => [
          step,
          dimension(value),
        ]),
      ),
      radius: Object.fromEntries(
        Object.entries(radiusProfiles.soft).map(([name, value]) => [
          name,
          dimension(value),
        ]),
      ),
      duration: {
        motionAnchorMinimum: duration(`${motionDurationRange.min}s`),
        motionAnchorMaximum: duration(`${motionDurationRange.max}s`),
      },
      color: { palette: referencePalettes },
    },
    semantic: {
      color: {
        action: {
          // Baseline tokens describe the default palette. Consumers selecting a
          // named recipe should use its theme.recipes.<name>.semantic group.
          ...semanticActionTokens("emerald"),
        },
      },
      geometry: {
        control: {
          height: dimension(densityProfiles.default.control),
          paddingInline: dimension(
            densityProfiles.default.controlPaddingInline,
          ),
        },
        field: {
          gap: dimension(densityProfiles.default.fieldGap),
          paddingInline: dimension(densityProfiles.default.fieldPaddingInline),
        },
        card: {
          padding: dimension(densityProfiles.default.cardPadding),
          headerGap: dimension(densityProfiles.default.cardHeaderGap),
        },
      },
    },
    theme: {
      $extensions: {
        "org.ten4seven": {
          recipes: Object.fromEntries(
            Object.values(THEME_RECIPES).map((recipe) => [
              recipe.id,
              {
                expression: recipe.expression,
                composition: recipe.composition,
                profileId: recipe.profile.id,
              },
            ]),
          ),
        },
      },
      default: {
        $description:
          "Baseline semantic aliases for the default emerald runtime.",
        semantic: {
          color: { action: semanticActionTokens("emerald") },
        },
      },
      recipes: Object.fromEntries(
        Object.values(THEME_RECIPES).map((recipe) => [
          recipe.id,
          {
            $description: `Semantic aliases resolved for the ${recipe.label} recipe.`,
            semantic: {
              color: {
                action: semanticActionTokens(recipe.profile.action.primary),
              },
            },
          },
        ]),
      ),
    },
  };
}

export function renderDtcgTokenExport() {
  return `${JSON.stringify(buildDtcgTokenExport(), null, 2)}\n`;
}

if (process.argv.includes("--stdout")) {
  process.stdout.write(renderDtcgTokenExport());
} else {
  const output = renderDtcgTokenExport();
  await Promise.all(
    outputPaths.map(async (outputPath) => {
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, output, "utf8");
    }),
  );
  console.log(`Generated ${outputPaths.length} DTCG-compatible token exports.`);
}
