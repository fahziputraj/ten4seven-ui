import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_CONTRACTS,
  DEFAULT_THEME_PROFILE,
  ENTITY_LIST_CONTRACT,
  ENTITY_LIST_STATES,
  exactColor,
  OPERATIONAL_PATTERN_CONTRACTS,
  READINESS_REVIEW_STATES,
  THEME_RECIPES,
  THEME_RECIPE_NAMES,
  RESPONSIVE_MODES,
  normalizeThemeProfile,
  resolveRuntimePreferences,
  themeRecipeToLegacyConfig,
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

const operationalRecipeNames = [
  "readiness-review",
  "process-workspace",
  "decision-workspace",
  "activity-audit",
];
const operationalParity = (name, recipe) => ({
  id: name,
  displayName: recipe.displayName,
  purpose: recipe.purpose,
  profiles: [...recipe.profiles],
  components: [...recipe.components],
  optional: [...(recipe.optional ?? [])],
  icons: [...(recipe.icons ?? [])],
  operational: recipe.operational,
  references: [...(recipe.references ?? [])],
});

for (const recipeName of operationalRecipeNames) {
  const canonical = OPERATIONAL_PATTERN_CONTRACTS[recipeName];
  const registered = CANONICAL_CONTRACTS.recipes[recipeName];
  const legacy = legacyRecipes[recipeName];
  const projected = outputs["recipes.compact.json"][recipeName];

  assert.ok(canonical, `${recipeName}: typed operational contract missing`);
  assert.equal(
    registered,
    canonical,
    `${recipeName}: canonical registry does not point to typed source`,
  );
  assert.ok(legacy, `${recipeName}: legacy parity source missing`);
  assert.ok(projected, `${recipeName}: generated projection missing`);
  assert.equal(
    projected.source,
    "canonical-contract",
    `${recipeName}: generated projection did not switch to canonical source`,
  );
  assert.deepEqual(
    operationalParity(recipeName, canonical),
    operationalParity(recipeName, legacy),
    `${recipeName}: typed contract changed the legacy semantic payload`,
  );
  assert.deepEqual(
    operationalParity(recipeName, projected),
    operationalParity(recipeName, canonical),
    `${recipeName}: generated projection drifted from typed source`,
  );

  const operational = canonical.operational;
  assert.ok(operational, `${recipeName}: operational metadata missing`);
  assert.equal(operational.maturity, "mature");
  for (const field of [
    "useWhen",
    "avoidWhen",
    "anatomy",
    "requiredSemantics",
    "optionalSemantics",
    "accessibility",
    "antiPatterns",
    "relationships",
  ])
    assert.ok(
      Array.isArray(operational[field]) && operational[field].length > 0,
      `${recipeName}: operational ${field} missing`,
    );
  assert.equal(
    operational.referencePath,
    "/operational-patterns",
    `${recipeName}: operational reference path drifted`,
  );
  assert.deepEqual(
    Object.keys(operational.responsive).sort(),
    ["desktop", "mobile", "tablet"],
    `${recipeName}: operational responsive contract incomplete`,
  );
  if (recipeName === "readiness-review") {
    assert.deepEqual(
      canonical.states,
      READINESS_REVIEW_STATES,
      "readiness-review: typed state contract drifted",
    );
    for (const state of ["ready", "blocked", "incomplete"])
      assert.ok(
        canonical.states.includes(state),
        `readiness-review: required state missing: ${state}`,
      );
    assert.match(
      canonical.operational.aiGuidance,
      /Decision Workspace/,
      "readiness-review: decision differentiation guidance missing",
    );
    assert.match(
      canonical.operational.antiPatterns.join(" "),
      /calculating eligibility/i,
      "readiness-review: business-rule ownership boundary missing",
    );
  }
}
assert.deepEqual(
  normalizeThemeProfile(themeProfileToLegacyConfig(DEFAULT_THEME_PROFILE)),
  DEFAULT_THEME_PROFILE,
  "ThemeProfile: legacy adapter does not round-trip the default profile",
);

const exactSourceProfile = normalizeThemeProfile({
  accent: exactColor("#d4451a"),
  palette: "slate",
  primary: exactColor("#318139"),
});
assert.deepEqual(exactSourceProfile.action.primary, {
  kind: "exact",
  value: "#318139",
});
assert.deepEqual(exactSourceProfile.accent.source, {
  kind: "exact",
  value: "#D4451A",
});
assert.deepEqual(
  normalizeThemeProfile(themeProfileToLegacyConfig(exactSourceProfile)),
  exactSourceProfile,
  "ThemeProfile: exact action and accent sources do not round-trip",
);

assert.deepEqual(
  THEME_RECIPE_NAMES,
  ["enterprise", "product", "editorial", "commerce"],
  "Theme recipes: curated v2 recipe set drifted",
);
for (const recipeName of THEME_RECIPE_NAMES) {
  const recipe = THEME_RECIPES[recipeName];
  const legacy = themeRecipeToLegacyConfig(recipe);
  const normalized = normalizeThemeProfile(legacy);
  assert.equal(recipe.id, recipeName, `${recipeName}: id drifted`);
  assert.equal(
    normalized.palette.base,
    recipe.profile.palette.base,
    `${recipeName}: base palette adapter drifted`,
  );
  assert.equal(
    normalized.action.primary,
    recipe.profile.action.primary,
    `${recipeName}: primary action adapter drifted`,
  );
  assert.equal(
    normalized.density.preset,
    recipe.profile.density.preset,
    `${recipeName}: density adapter drifted`,
  );
}
assert.deepEqual(
  resolveRuntimePreferences({
    appearance: "system",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  }),
  {
    appearance: "system",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  },
  "Runtime preferences: valid user choices were not preserved",
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
  `Contract gate verified: ${Object.keys(aliases).length} aliases, ${Object.keys(legacyRecipes).length} recipes, entity-list decision metadata, ${operationalRecipeNames.length} typed operational recipes with semantic parity, ThemeProfile round-trip, and compact retrieval at ${compactBytes}/${fullBytes} bytes.`,
);
