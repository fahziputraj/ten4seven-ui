import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import * as prettier from "prettier";

const repoRoot = path.resolve(import.meta.dirname, "..");
const iconsRequire = createRequire(
  path.join(repoRoot, "packages/icons/package.json"),
);
const solar = iconsRequire("@iconify-json/solar/icons.json");

/**
 * Curated names are semantic aliases, not a second visual language. The
 * normal path is a locally bundled Solar Bold Duotone body. Farm-specific
 * glyphs that Solar does not provide use the same 24px filled-and-layered
 * contract authored at this boundary, so the explorer and consumers stay
 * visually coherent without a donor collection at runtime.
 */
const authoredEggBody =
  '<path fill="currentColor" d="M12 5c-1.93 0-5 4.91-5 9c0 2.76 2.24 5 5 5s5-2.24 5-5c0-4.09-3.07-9-5-9m1 13c-3.01 0-5-2-5-5c0-.55.45-1 1-1s1 .45 1 1c0 2.92 2.42 3 3 3c.55 0 1 .45 1 1s-.45 1-1 1" opacity=".3"/><path fill="currentColor" d="M12 3C8.5 3 5 9.33 5 14c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4.67-3.5-11-7-11m0 16c-2.76 0-5-2.24-5-5c0-4.09 3.07-9 5-9s5 4.91 5 9c0 2.76-2.24 5-5 5"/><path fill="currentColor" d="M13 16c-.58 0-3-.08-3-3c0-.55-.45-1-1-1s-1 .45-1 1c0 3 1.99 5 5 5c.55 0 1-.45 1-1s-.45-1-1-1"/>';
const authoredEggPairBody =
  '<path fill="currentColor" d="M9 4.5c-2.49 0-4.5 3.02-4.5 6.75S6.51 18 9 18s4.5-3.02 4.5-6.75S11.49 4.5 9 4.5m6 1.25c-1.13 0-2.11.67-2.75 1.72c.79 1.15 1.25 2.55 1.25 4.03c0 2.18-.9 4.13-2.29 5.28c.78 1.05 1.87 1.72 3.09 1.72c2.49 0 4.5-3.02 4.5-6.75S17.49 5.75 15 5.75" opacity=".5"/><path fill="currentColor" d="M9 5.75c-1.5 0-2.75 2.39-2.75 5.25S7.5 16.25 9 16.25s2.75-2.39 2.75-5.25S10.5 5.75 9 5.75m6 2.25c-.51 0-.99.24-1.39.66c.19.57.29 1.18.29 1.84c0 1.16-.28 2.23-.77 3.08c.48.74 1.11 1.17 1.87 1.17c1.5 0 2.75-1.51 2.75-3.38S16.5 8 15 8"/>';
const authoredEggCrackBody =
  '<path fill="currentColor" d="M12 3.25c-3.59 0-6.5 4.25-6.5 9.23C5.5 17.3 8.41 21 12 21s6.5-3.7 6.5-8.52c0-4.98-2.91-9.23-6.5-9.23" opacity=".5"/><path fill="currentColor" d="m11.05 5.7 1.42 3.28-1.17 1.55 2.12 1.67-1.3 1.66 1.18 1.37-1.13 1.04-2.05-2.39 1.24-1.58-2.1-1.65 1.18-1.57-.93-2.15z"/>';
const authoredChickenBody =
  '<g transform="scale(0.75 0.75)"><g fill="currentColor"><path opacity=".28" d="M30.356 26.452L27.71 14.587c-.947-4.928-5.37-8.608-10.622-8.376c-1.592.069-3.018.848-4.221 1.941c-1.206 1.094-2.252 2.556-3.108 4.135C8.053 15.427 6.99 19.233 6.99 22v5.2c0 2.045 1.629 3.785 3.722 3.8a3.73 3.73 0 0 0 2.688-1.108A3.74 3.74 0 0 0 16.06 31a3.76 3.76 0 0 0 2.66-1.107A3.74 3.74 0 0 0 21.38 31a3.76 3.76 0 0 0 2.66-1.107a3.748 3.748 0 0 0 6.41-2.643v-.025l-.001-.025a4.5 4.5 0 0 0-.093-.748"/><path d="m9.3 16.66l.78.39c.63.31 1.03.96 1.03 1.67V21H7.82l-4.783-1.348a.92.92 0 0 1 .013-.632l.29-.72a6.14 6.14 0 0 1 4.85-3.79c.45-.06.84.28.84.73v.99c0 .18.11.35.27.43"/><path opacity=".52" d="M3.34 20.11C4.3 21.08 6.18 22 7.82 22h3.29v-1.26l-.51-1.1H3.035c.05.17.165.33.305.47"/><path d="M20.72 11.86v-.44a4.77 4.77 0 0 1-3.53-2.02c-.61.75-1.5 1.28-2.51 1.41a3.872 3.872 0 0 1-4 4.49C8.7 15.21 7.09 13.59 7 11.61a3.88 3.88 0 0 1 2.76-3.89c.33-.1.55-.4.55-.74v-.01c0-2.14 1.73-3.87 3.87-3.87c.56 0 1.09.12 1.57.33c.76.34 1.66.21 2.3-.33a4.72 4.72 0 0 1 3-1.1h.14c3.45.08 5.08 4.31 2.64 6.75z"/><path d="M13.5 18a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"/></g></g>';
const authoredChickBody =
  '<g transform="scale(0.75 0.75)"><g fill="currentColor"><path d="M9.5 12.83a1.5 1.5 0 1 0 0-3.001a1.5 1.5 0 0 0 0 3"/><path d="m3 13.99l-1.27-.97a1.795 1.795 0 0 1-.022-2.873l1.775-1.495A8.485 8.485 0 0 1 11.48 3a8.47 8.47 0 0 1 8.188 6.262l9.616 2.52A2.295 2.295 0 0 1 31 14c0 7.09-5.269 12.948-12.105 13.873l-.125.627h1.78c.73 0 1.34.52 1.48 1.21c.03.15-.09.29-.25.29H9.25c-.16 0-.28-.14-.24-.29c.14-.69.74-1.21 1.47-1.21h1.8l.246-1.23C6.988 25.404 3 20.168 3 14zM15.52 28.5h1.75l.101-.505Q17.186 28 17 28a14 14 0 0 1-3.053-.334l-.167.834zM11.48 5A6.48 6.48 0 0 0 5 11.48V14c0 6.628 5.372 12 12 12a11.94 11.94 0 0 0 6.253-1.756a9 9 0 0 1-1.984.256h-.009c-3.333 0-6.906-1.65-8.774-4.449a.5.5 0 0 1 .832-.555c1.655 2.48 4.89 4.003 7.937 4.004a8.14 8.14 0 0 0 4.954-1.806A11.95 11.95 0 0 0 29 14a.294.294 0 0 0-.224-.283l-9.66-2.532a1.96 1.96 0 0 1-1.369-1.364l-.002-.007l-.002-.007A6.47 6.47 0 0 0 11.48 5"/></g></g>';

const definitions = [
  { name: "revenue", solarName: "dollar-minimalistic-bold-duotone" },
  { name: "medicine", solarName: "jar-of-pills-2-bold-duotone" },
  { name: "pills", solarName: "pills-bold-duotone" },
  { name: "cashOnDelivery", solarName: "hand-money-bold-duotone" },
  { name: "wallet", solarName: "wallet-money-bold-duotone" },
  { name: "triangleRight", solarName: "alt-arrow-right-bold-duotone" },
  { name: "triangleLeft", solarName: "alt-arrow-left-bold-duotone" },
  { name: "triangleUp", solarName: "alt-arrow-up-bold-duotone" },
  { name: "triangleDown", solarName: "alt-arrow-down-bold-duotone" },
  { name: "barn", solarName: "buildings-3-bold-duotone" },
  {
    name: "eggCrack",
    iconName: "egg-crack-bold-duotone",
    provider: "curated:egg-crack-bold-duotone",
    source: "@ten4seven/icons",
    body: authoredEggCrackBody,
  },
  {
    name: "eggPair",
    iconName: "egg-pair-bold-duotone",
    provider: "curated:egg-pair-bold-duotone",
    source: "@ten4seven/icons",
    body: authoredEggPairBody,
  },
  {
    name: "egg",
    iconName: "egg-bold-duotone",
    provider: "curated:egg-bold-duotone",
    source: "@ten4seven/icons",
    body: authoredEggBody,
  },
  {
    name: "chicken",
    iconName: "chicken-bold-duotone",
    provider: "curated:aapm-chicken-bold-duotone",
    source: "@ten4seven/icons",
    body: authoredChickenBody,
  },
  {
    name: "chick",
    iconName: "chick-bold-duotone",
    provider: "curated:aapm-chick-bold-duotone",
    source: "@ten4seven/icons",
    body: authoredChickBody,
  },
  { name: "graphMemory", solarName: "graph-bold-duotone" },
  { name: "marginalRoi", solarName: "chart-square-bold-duotone" },
  { name: "hvac", solarName: "wind-bold-duotone" },
  { name: "waterRate", solarName: "waterdrop-bold-duotone" },
  { name: "mortality", solarName: "danger-circle-bold-duotone" },
  { name: "breakEven", solarName: "scale-bold-duotone" },
  { name: "equalRatio", solarName: "round-sort-horizontal-bold-duotone" },
  { name: "weight", solarName: "scale-bold-duotone" },
];

function normalizeBody(body, definition) {
  let normalized = body
    .trim()
    .replaceAll("fill-opacity=", "opacity=")
    .replaceAll("stroke-opacity=", "opacity=");
  const width = definition.width ?? 24;
  const height = definition.height ?? 24;
  const scaleX = 24 / width;
  const scaleY = 24 / height;
  if (scaleX === 1 && scaleY === 1) return normalized;

  const formatScale = (value) =>
    Number(value.toFixed(6)).toString().replace(/\.0+$/, "");
  return `<g transform="scale(${formatScale(scaleX)} ${formatScale(scaleY)})">${normalized}</g>`;
}

const bodies = {};
const metadata = {};
for (const definition of definitions) {
  const body = definition.body ?? solar.icons[definition.solarName]?.body;
  if (!body) {
    throw new Error(
      `Missing Solar glyph ${definition.solarName} for curated ${definition.name}`,
    );
  }

  bodies[definition.name] = normalizeBody(body, definition);
  metadata[definition.name] = {
    provider: definition.provider ?? `solar:${definition.solarName}`,
    source: definition.source ?? "@iconify-json/solar",
    icon: definition.iconName ?? definition.solarName,
    duotone: true,
    style: "solar-bold-duotone",
  };
}

const output = [
  "/**",
  " * Generated from the pinned local Solar collection plus authored",
  " * Solar-compatible farm glyphs.",
  " * Do not edit by hand; update scripts/generate-curated-icon-subset.mjs instead.",
  " * Every body is normalized to the shared 24x24 Bold Duotone contract.",
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
console.log(`Generated ${definitions.length} Solar-compatible curated glyphs.`);
