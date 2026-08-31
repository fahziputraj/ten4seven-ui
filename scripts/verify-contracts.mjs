import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  DEFAULT_THEME_PROFILE,
  ENTITY_LIST_CONTRACT,
  ENTITY_LIST_STATES,
  RESPONSIVE_MODES,
  normalizeThemeProfile,
  themeProfileToLegacyConfig,
} from "../packages/contracts/src/index.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const generatedRoot = path.join(repoRoot, "generated");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const projections = await buildProjections();
const { outputs, legacyComponents, legacyRecipes } = projections;

for (const root of ["generated", "packages/agent/generated"])
  for (const [filename, value] of Object.entries(outputs)) {
    const relativePath = `${root}/${filename}`;
    assert.equal(
      read(relativePath),
      serializeProjection(filename, value),
      `${relativePath}: generated output is stale; run pnpm contracts:generate`,
    );
  }

const aliases = outputs["aliases.json"];
for (const [alias, canonical] of Object.entries(aliases)) {
  assert.ok(legacyComponents[alias], `alias ${alias}: source entry missing`);
  assert.ok(
    legacyComponents[canonical],
    `alias ${alias}: canonical target ${canonical} missing`,
  );
  assert.equal(
    legacyComponents[canonical].status,
    "implemented",
    `alias ${alias}: canonical target is not implemented`,
  );
  assert.equal(
    legacyComponents[alias].aliasOf,
    canonical,
    `alias ${alias}: legacy catalog drifted from canonical alias map`,
  );
}

for (const [recipeName, recipe] of Object.entries(legacyRecipes)) {
  const allComponents = [...recipe.components, ...(recipe.optional ?? [])];
  for (const componentName of allComponents)
    assert.equal(
      legacyComponents[componentName]?.status,
      "implemented",
      `${recipeName}: ${componentName} is not implemented`,
    );
}

const entityList = outputs["recipes.compact.json"]["entity-list"];
const required = new Set(entityList.required);
const conditional = new Set(Object.keys(entityList.conditional));
const forbidden = new Set(entityList.forbid);
assert.equal(
  [...required].some((name) => conditional.has(name)),
  false,
  "entity-list: required and conditional decisions overlap",
);
assert.equal(
  [...required].some((name) => forbidden.has(name)),
  false,
  "entity-list: required and forbid decisions overlap",
);
assert.equal(
  [...conditional].some((name) => forbidden.has(name)),
  false,
  "entity-list: conditional and forbid decisions overlap",
);
for (const state of entityList.states)
  assert.ok(
    ENTITY_LIST_STATES.includes(state),
    `entity-list: invalid state ${state}`,
  );
for (const mode of [
  entityList.responsive.desktop,
  entityList.responsive.tablet,
  entityList.responsive.mobile,
  entityList.responsive.navigation,
  entityList.responsive.detail,
])
  if (mode !== undefined)
    assert.ok(
      RESPONSIVE_MODES.includes(mode),
      `entity-list: invalid responsive mode ${mode}`,
    );

assert.deepEqual(
  entityList.components,
  ENTITY_LIST_CONTRACT.components,
  "entity-list: compact component composition drifted from the typed contract",
);
assert.deepEqual(
  normalizeThemeProfile(themeProfileToLegacyConfig(DEFAULT_THEME_PROFILE)),
  DEFAULT_THEME_PROFILE,
  "ThemeProfile: legacy adapter does not round-trip the default profile",
);

const fullBytes =
  Buffer.byteLength(JSON.stringify(legacyComponents)) +
  Buffer.byteLength(JSON.stringify(legacyRecipes));
const compactBytes =
  Buffer.byteLength(JSON.stringify(outputs["components.compact.json"])) +
  Buffer.byteLength(JSON.stringify(outputs["recipes.compact.json"]));
assert.ok(
  compactBytes < fullBytes * 0.6,
  `compact projection is not materially smaller (${compactBytes}/${fullBytes} bytes)`,
);

console.log(
  `Contract gate verified: ${Object.keys(aliases).length} aliases, ${Object.keys(legacyRecipes).length} recipes, entity-list decision metadata, ThemeProfile round-trip, and compact retrieval at ${compactBytes}/${fullBytes} bytes.`,
);
