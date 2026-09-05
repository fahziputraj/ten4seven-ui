import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import * as prettier from "prettier";

const repoRoot = path.resolve(import.meta.dirname, "..");
const iconsRequire = createRequire(
  path.join(repoRoot, "packages/icons/package.json"),
);
const solar = iconsRequire("@iconify-json/solar/icons.json");

const iconBodies = Object.fromEntries(
  Object.entries(solar.icons ?? {})
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, icon]) => [name, icon.body]),
);
const iconAliases = Object.fromEntries(
  Object.entries(solar.aliases ?? {}).sort(([left], [right]) =>
    left.localeCompare(right),
  ),
);
const iconNames = [
  ...Object.keys(iconBodies),
  ...Object.keys(iconAliases),
].sort((left, right) => left.localeCompare(right));

const missingAliasParents = Object.entries(iconAliases)
  .filter(([, alias]) => !iconBodies[alias.parent])
  .map(([name, alias]) => `${name} -> ${alias.parent}`);
if (missingAliasParents.length > 0) {
  throw new Error(
    `Solar catalog aliases have missing parents: ${missingAliasParents.join(", ")}`,
  );
}

const output = [
  "/**",
  " * Generated from the local @iconify-json/solar package.",
  " * Do not edit by hand; run pnpm icons:generate instead.",
  " *",
  " * The complete Solar set is bundled locally so consumers never need an",
  " * Iconify CDN request at runtime. Aliases point at their canonical body.",
  " */",
  `export const solarIconBodies: Record<string, string> = ${JSON.stringify(iconBodies, null, 2)};`,
  `export const solarIconAliases: Record<string, string> = ${JSON.stringify(Object.fromEntries(Object.entries(iconAliases).map(([name, alias]) => [name, alias.parent])), null, 2)};`,
  `export const solarIconNames: readonly string[] = Object.freeze(${JSON.stringify(iconNames, null, 2)});`,
  "",
].join("\n");

const formattedOutput = await prettier.format(output, { parser: "typescript" });
fs.writeFileSync(
  path.join(repoRoot, "packages/icons/src/solar-catalog.ts"),
  formattedOutput,
);
console.log(
  `Generated ${Object.keys(iconBodies).length} Solar bodies, ${Object.keys(iconAliases).length} aliases, and ${iconNames.length} local icon names.`,
);
