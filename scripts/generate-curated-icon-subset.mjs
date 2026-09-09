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
const aapmChickenBody =
  '<g transform="scale(0.75 0.75)"><g fill="currentColor"><path opacity=".28" d="M30.356 26.452L27.71 14.587c-.947-4.928-5.37-8.608-10.622-8.376c-1.592.069-3.018.848-4.221 1.941c-1.206 1.094-2.252 2.556-3.108 4.135C8.053 15.427 6.99 19.233 6.99 22v5.2c0 2.045 1.629 3.785 3.722 3.8a3.73 3.73 0 0 0 2.688-1.108A3.74 3.74 0 0 0 16.06 31a3.76 3.76 0 0 0 2.66-1.107A3.74 3.74 0 0 0 21.38 31a3.76 3.76 0 0 0 2.66-1.107a3.748 3.748 0 0 0 6.41-2.643v-.025l-.001-.025a4.5 4.5 0 0 0-.093-.748"/><path d="m9.3 16.66l.78.39c.63.31 1.03.96 1.03 1.67V21H7.82l-4.783-1.348a.92.92 0 0 1 .013-.632l.29-.72a6.14 6.14 0 0 1 4.85-3.79c.45-.06.84.28.84.73v.99c0 .18.11.35.27.43"/><path opacity=".52" d="M3.34 20.11C4.3 21.08 6.18 22 7.82 22h3.29v-1.26l-.51-1.1H3.035c.05.17.165.33.305.47"/><path d="M20.72 11.86v-.44a4.77 4.77 0 0 1-3.53-2.02c-.61.75-1.5 1.28-2.51 1.41a3.872 3.872 0 0 1-4 4.49C8.7 15.21 7.09 13.59 7 11.61a3.88 3.88 0 0 1 2.76-3.89c.33-.1.55-.4.55-.74v-.01c0-2.14 1.73-3.87 3.87-3.87c.56 0 1.09.12 1.57.33c.76.34 1.66.21 2.3-.33a4.72 4.72 0 0 1 3-1.1h.14c3.45.08 5.08 4.31 2.64 6.75z"/><path d="M13.5 18a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/></g></g>';

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
    iconName: "chicken-bold-duotone",
    provider: "curated:aapm-chicken-bold-duotone",
    source: "@aapm/ten4seven-curated",
    body: aapmChickenBody,
    width: 24,
    height: 24,
    duotone: true,
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
  {
    // Graph up/down variants are intentionally not copied here: the semantic
    // registry already owns Solar `graph`, `trendUp`, and `trendDown`. Keep
    // this curated list for domain glyphs that Solar does not cover.
    name: "graphMemory",
    packageName: "@iconify-json/iconmind",
    iconName: "graph-memory-duotone-regular",
    provider: "iconmind:graph-memory-duotone-regular",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "marginalRoi",
    packageName: "@iconify-json/iconmind",
    iconName: "marginal-roi-duotone-regular",
    provider: "iconmind:marginal-roi-duotone-regular",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "hvac",
    packageName: "@iconify-json/ic",
    iconName: "twotone-hvac",
    provider: "ic:twotone-hvac",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "waterRate",
    packageName: "@iconify-json/icon-park-twotone",
    iconName: "water-rate-two",
    provider: "icon-park-twotone:water-rate-two",
    width: 48,
    height: 48,
  },
  {
    name: "mortality",
    packageName: "@iconify-json/ph",
    iconName: "skull-duotone",
    provider: "ph:skull-duotone",
    width: 256,
    height: 256,
    duotone: true,
  },
  {
    name: "breakEven",
    packageName: "@iconify-json/iconmind",
    iconName: "break-even-duotone-regular",
    provider: "iconmind:break-even-duotone-regular",
    width: 24,
    height: 24,
    duotone: true,
  },
  {
    name: "equalRatio",
    packageName: "@iconify-json/icon-park-twotone",
    iconName: "equal-ratio",
    provider: "icon-park-twotone:equal-ratio",
    width: 48,
    height: 48,
  },
  {
    name: "weight",
    packageName: "@iconify-json/icon-park-twotone",
    iconName: "weight",
    provider: "icon-park-twotone:weight",
    width: 48,
    height: 48,
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
  const collection = definition.body
    ? undefined
    : iconsRequire(`${definition.packageName}/icons.json`);
  const icon = definition.body
    ? { body: definition.body }
    : collection.icons[definition.iconName];
  if (!icon?.body)
    throw new Error(
      `Missing ${definition.packageName}:${definition.iconName} in local Iconify packages`,
    );

  bodies[definition.name] = normalizeBody(icon.body, definition);
  metadata[definition.name] = {
    provider: definition.provider,
    source: definition.source ?? definition.packageName,
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
