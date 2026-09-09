import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import * as prettier from "prettier";

const repoRoot = path.resolve(import.meta.dirname, "..");
const iconsRequire = createRequire(
  path.join(repoRoot, "packages/icons/package.json"),
);

/**
 * A deliberately small, user-requested extension to the Solar family. The
 * source collections stay a build-time concern; consumers only see semantic
 * names through T7Icon or the local Iconify explorer.
 */
const definitions = [
  {
    name: "revenue",
    packageName: "@iconify-json/ic",
    iconName: "twotone-monetization-on",
    provider: "ic:twotone-monetization-on",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "medicine",
    packageName: "@iconify-json/solar",
    iconName: "jar-of-pills-2-bold-duotone",
    provider: "solar:jar-of-pills-2-bold-duotone",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "pills",
    packageName: "@iconify-json/reicon",
    iconName: "pills-duotone",
    provider: "reicon:pills-duotone",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "cashOnDelivery",
    packageName: "@iconify-json/iconmind",
    iconName: "cash-on-delivery-duotone-regular",
    provider: "iconmind:cash-on-delivery-duotone-regular",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "wallet",
    packageName: "@iconify-json/ant-design",
    iconName: "wallet-twotone",
    provider: "ant-design:wallet-twotone",
    width: 1024,
    height: 1024,
    duotone: true,
  },
  {
    name: "triangleRight",
    packageName: "@iconify-json/gravity-ui",
    iconName: "triangle-right-fill",
    provider: "gravity-ui:triangle-right-fill",
    width: 16,
    height: 16,
  },
  {
    name: "triangleLeft",
    packageName: "@iconify-json/gravity-ui",
    iconName: "triangle-left-fill",
    provider: "gravity-ui:triangle-left-fill",
    width: 16,
    height: 16,
  },
  {
    name: "triangleUp",
    packageName: "@iconify-json/gravity-ui",
    iconName: "triangle-up-fill",
    provider: "gravity-ui:triangle-up-fill",
    width: 16,
    height: 16,
  },
  {
    name: "triangleDown",
    packageName: "@iconify-json/gravity-ui",
    iconName: "triangle-down-fill",
    provider: "gravity-ui:triangle-down-fill",
    width: 16,
    height: 16,
  },
  {
    name: "barn",
    packageName: "@iconify-json/si",
    iconName: "barn-duotone",
    provider: "si:barn-duotone",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "eggCrack",
    packageName: "@iconify-json/ph",
    iconName: "egg-crack-duotone",
    provider: "ph:egg-crack-duotone",
    width: 256,
    height: 256,
    duotone: true,
  },
  {
    name: "eggPair",
    packageName: "@iconify-json/icon-park-twotone",
    iconName: "egg-one",
    provider: "icon-park-twotone:egg-one",
    width: 48,
    height: 48,
  },
  {
    name: "egg",
    packageName: "@iconify-json/ic",
    iconName: "twotone-egg",
    provider: "ic:twotone-egg",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "chicken",
    packageName: "@iconify-json/fluent-emoji-high-contrast",
    iconName: "chicken",
    provider: "fluent-emoji-high-contrast:chicken",
    width: 32,
    height: 32,
  },
  {
    name: "chick",
    packageName: "@iconify-json/fluent-emoji-high-contrast",
    iconName: "baby-chick",
    provider: "fluent-emoji-high-contrast:baby-chick",
    width: 32,
    height: 32,
  },
  {
    name: "chickenFlat",
    packageName: "@iconify-json/fluent-emoji-flat",
    iconName: "chicken",
    provider: "fluent-emoji-flat:chicken",
    width: 32,
    height: 32,
    tokenizePaints: true,
  },
  {
    name: "chickFlat",
    packageName: "@iconify-json/fluent-emoji-flat",
    iconName: "baby-chick",
    provider: "fluent-emoji-flat:baby-chick",
    width: 32,
    height: 32,
    tokenizePaints: true,
  },
  {
    name: "chickNoto",
    packageName: "@iconify-json/noto",
    iconName: "baby-chick",
    provider: "noto:baby-chick",
    width: 128,
    height: 128,
    tokenizePaints: true,
  },
];

function tokenisePaints(body) {
  return body.replace(
    /\b(fill|stroke)="(#[0-9a-f]{3,8}|(?:rgb|hsl)a?\([^\"]+\))"/gi,
    '$1="currentColor"',
  );
}

function normalizeBody(body, definition) {
  let normalized = body.trim().replaceAll("fill-opacity=", "opacity=");
  normalized = normalized.replaceAll("stroke-opacity=", "opacity=");
  if (definition.tokenizePaints) normalized = tokenisePaints(normalized);

  const scaleX = 24 / definition.width;
  const scaleY = 24 / definition.height;
  if (scaleX === 1 && scaleY === 1) return normalized;

  const formatScale = (value) =>
    Number(value.toFixed(6)).toString().replace(/\.0+$/, "");
  return `<g transform="scale(${formatScale(scaleX)} ${formatScale(scaleY)})">${normalized}</g>`;
}

const bodies = {};
const metadata = {};
for (const definition of definitions) {
  const collection = iconsRequire(`${definition.packageName}/icons.json`);
  const icon = collection.icons[definition.iconName];
  if (!icon?.body)
    throw new Error(
      `Missing ${definition.packageName}:${definition.iconName} in local Iconify packages`,
    );

  bodies[definition.name] = normalizeBody(icon.body, definition);
  metadata[definition.name] = {
    provider: definition.provider,
    source: definition.packageName,
    icon: definition.iconName,
    ...(definition.duotone ? { duotone: true } : {}),
  };
}

const output = [
  "/**",
  " * Generated from pinned local Iconify collection packages.",
  " * Do not edit by hand; update scripts/generate-curated-icon-subset.mjs instead.",
  " * Bodies are normalized to a 24x24 viewBox and theme-aware currentColor paints.",
  " */",
  `export const curatedIconBodies = ${JSON.stringify(bodies, null, 2)} as const;`,
  `export const curatedIconMetadata = ${JSON.stringify(metadata, null, 2)} as const;`,
  "export const curatedIconNames = Object.keys(curatedIconBodies) as (keyof typeof curatedIconBodies)[];",
  "",
].join("\n");

const formattedOutput = await prettier.format(output, { parser: "typescript" });
fs.writeFileSync(
  path.join(repoRoot, "packages/icons/src/curated-data.ts"),
  formattedOutput,
);
console.log(`Generated ${definitions.length} curated Iconify glyphs.`);
