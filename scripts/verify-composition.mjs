import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  BRAND_PROFILES,
  CANONICAL_CONTRACTS,
  COMPOSITION_BLOCK_FAMILIES,
  COMPOSITION_BLOCKS,
  COMPOSITION_CONTRACT,
  COMPOSITION_INVENTORY_STATUSES,
  COMPOSITION_RECIPE_FAMILIES,
  COMPOSITION_RECIPES,
  COMPOSITION_RESOLUTION_ORDER,
  COMPOSITION_STATES,
  NATIVE_COMPOSITION_CANARY,
  PRODUCT_PROFILE_CAPABILITIES,
  PRODUCT_PROFILE_IDS,
  TOKEN_RESOLUTION_ORDER,
  projectCompositionToNative,
  projectCompositionToWeb,
  resolveCompositionLayers,
  resolveProductComposition,
  resolveProductProfile,
} from "../packages/contracts/src/index.ts";
import {
  resolveNativeBlockComposition,
  resolveNativeRecipeComposition,
  resolveNativeTheme,
} from "../packages/native/src/index.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");

const generated = readJson("generated/composition.json");
const generatedCompact = readJson("generated/composition.compact.json");
const agentGenerated = readJson("packages/agent/generated/composition.json");
const projections = await buildProjections();
const expected = projections.outputs["composition.json"];
const expectedCompact = projections.outputs["composition.compact.json"];

for (const [relativePath, actual, expectedValue] of [
  ["generated/composition.json", generated, expected],
  ["generated/composition.compact.json", generatedCompact, expectedCompact],
  ["packages/agent/generated/composition.json", agentGenerated, expected],
]) {
  assert.equal(
    normalizeLineEndings(read(relativePath)),
    normalizeLineEndings(
      serializeProjection(path.basename(relativePath), expectedValue),
    ),
    `${relativePath} is stale; run pnpm contracts:generate`,
  );
  assert.deepEqual(
    actual,
    expectedValue,
    `${relativePath} must be deterministic`,
  );
}

assert.equal(
  CANONICAL_CONTRACTS.composition,
  COMPOSITION_CONTRACT,
  "canonical registry must point at the typed U11 composition plane",
);
assert.deepEqual(COMPOSITION_RESOLUTION_ORDER, TOKEN_RESOLUTION_ORDER);
assert.deepEqual(generated.taxonomy.blockFamilies, COMPOSITION_BLOCK_FAMILIES);
assert.deepEqual(
  generated.taxonomy.recipeFamilies,
  COMPOSITION_RECIPE_FAMILIES,
);
assert.deepEqual(
  generated.taxonomy.inventoryStatuses,
  COMPOSITION_INVENTORY_STATUSES,
);
assert.deepEqual(generated.resolverOrder, TOKEN_RESOLUTION_ORDER);
assert.equal(generated.nativeProjection.cssParsing, false);
assert.equal(generated.webProjection.authority, "derived");
assert.equal(generated.nativeProjection.authority, "derived");
assert.equal(generated.registry.typed, "packages/contracts/src/composition.ts");
assert.ok(generated.registry.generated.includes("generated/composition.json"));
assert.ok(
  generated.registry.generated.includes("generated/composition.compact.json"),
);

const legacyComponents = readJson("packages/ai/catalog/components.json");
const legacyBlocks = readJson("packages/ai/catalog/blocks.json");
const legacyRecipes = readJson("packages/ai/catalog/recipes.json");
const forbiddenDomainKeys = new Set([
  "apiEndpoint",
  "businessApi",
  "fetchUrl",
  "mutationName",
  "permissionName",
  "queryKey",
  "sqlQuery",
  "transitionRules",
]);

function findForbiddenKeys(value, location = "contract") {
  if (!value || typeof value !== "object") return [];
  const findings = [];
  for (const [key, child] of Object.entries(value)) {
    if (forbiddenDomainKeys.has(key)) findings.push(`${location}.${key}`);
    findings.push(...findForbiddenKeys(child, `${location}.${key}`));
  }
  return findings;
}

const forbiddenKeys = findForbiddenKeys({
  blocks: COMPOSITION_BLOCKS,
  recipes: COMPOSITION_RECIPES,
});
assert.deepEqual(
  forbiddenKeys,
  [],
  "composition plane must not own domain behavior",
);

function assertProfiles(owner, profiles) {
  assert.ok(profiles.length > 0, `${owner} needs profile compatibility`);
  for (const profileId of profiles) {
    assert.ok(
      PRODUCT_PROFILE_IDS.includes(profileId),
      `${owner} references unknown profile ${profileId}`,
    );
  }
}

function assertSharedMetadata(owner, entry, level) {
  assert.equal(entry.id, owner, `${owner} key and id must agree`);
  assert.equal(entry.level, level, `${owner} must be a ${level}`);
  assert.ok(entry.intent.length > 0, `${owner} intent is required`);
  assert.ok(entry.useWhen.length > 0, `${owner} useWhen is required`);
  assert.ok(entry.avoidWhen.length > 0, `${owner} avoidWhen is required`);
  assert.ok(
    entry.accessibility.length > 0,
    `${owner} accessibility is required`,
  );
  assert.ok(
    entry.tokenFamilies.length > 0,
    `${owner} token families are required`,
  );
  assert.ok(
    entry.boundaries.consumerOwns.length > 0,
    `${owner} consumer boundary is required`,
  );
  assert.ok(
    entry.boundaries.ten4sevenOwns.length > 0,
    `${owner} system boundary is required`,
  );
  assert.ok(
    entry.boundaries.rendererOwns.length > 0,
    `${owner} renderer boundary is required`,
  );
  assert.ok(entry.ai.useWhen.length > 0, `${owner} AI useWhen is required`);
  assert.ok(entry.ai.avoidWhen.length > 0, `${owner} AI avoidWhen is required`);
  assert.ok(
    entry.ai.businessBoundary.length > 0,
    `${owner} AI boundary is required`,
  );
  assert.ok(
    entry.responsive.desktop.length > 0,
    `${owner} desktop strategy is required`,
  );
  assert.ok(
    entry.responsive.tablet.length > 0,
    `${owner} tablet strategy is required`,
  );
  assert.ok(
    entry.responsive.mobile.length > 0,
    `${owner} mobile strategy is required`,
  );
  assert.ok(
    entry.responsive.native.length > 0,
    `${owner} native strategy is required`,
  );
  assert.ok(
    entry.responsive.semanticOrder.length > 0,
    `${owner} semantic order is required`,
  );
  assert.ok(
    entry.states.includes("loading"),
    `${owner} loading state is required`,
  );
  assert.ok(entry.states.includes("ready"), `${owner} ready state is required`);
  assert.ok(entry.states.includes("empty"), `${owner} empty state is required`);
  assert.ok(entry.states.includes("error"), `${owner} error state is required`);
  assert.ok(
    COMPOSITION_STATES.every((state) => typeof state === "string"),
    "composition state taxonomy must remain typed",
  );
  assertProfiles(owner, entry.profileCompatibility);
  assert.ok(
    ["BOTH", "WEB", "NATIVE", "ADAPTIVE"].includes(entry.platform),
    `${owner} has an invalid platform classification`,
  );
  assert.ok(
    [
      "SAME_INTENT",
      "NATIVE_RENDERER",
      "ALTERNATE_PATTERN",
      "NOT_APPLICABLE",
    ].includes(entry.nativeStrategy),
    `${owner} has an invalid native strategy`,
  );
  assert.equal(entry.ai.compositionLevel, level);
}

for (const [id, block] of Object.entries(COMPOSITION_BLOCKS)) {
  assertSharedMetadata(id, block, "BLOCK");
  assert.ok(COMPOSITION_BLOCK_FAMILIES.includes(block.family));
  assert.ok(COMPOSITION_INVENTORY_STATUSES.includes(block.inventoryStatus));
  assert.ok(block.slots.length > 0, `${id} needs semantic slots`);
  assert.ok(
    block.requiredComponents.length > 0,
    `${id} needs required components`,
  );
  for (const component of [
    ...block.requiredComponents,
    ...block.optionalComponents,
  ]) {
    assert.equal(
      legacyComponents[component]?.status,
      "implemented",
      `${id} must reference an implemented canonical component: ${component}`,
    );
  }
  for (const recipe of block.recommendedRecipes)
    assert.ok(
      COMPOSITION_RECIPES[recipe],
      `${id} references missing recipe ${recipe}`,
    );
  if (block.provenance.legacyCatalogId)
    assert.ok(legacyBlocks[block.provenance.legacyCatalogId]);
}

for (const [id, recipe] of Object.entries(COMPOSITION_RECIPES)) {
  assertSharedMetadata(id, recipe, "RECIPE");
  assert.ok(COMPOSITION_RECIPE_FAMILIES.includes(recipe.family));
  assert.ok(COMPOSITION_INVENTORY_STATUSES.includes(recipe.inventoryStatus));
  assert.ok(
    recipe.requiredComponents.length > 0,
    `${id} needs required components`,
  );
  for (const component of [
    ...recipe.requiredComponents,
    ...recipe.optionalComponents,
  ]) {
    assert.equal(
      legacyComponents[component]?.status,
      "implemented",
      `${id} must reference an implemented canonical component: ${component}`,
    );
  }
  const roleIds = [
    ...recipe.blockRoles.required,
    ...recipe.blockRoles.recommended,
    ...recipe.blockRoles.optional,
  ];
  assert.equal(
    new Set(roleIds).size,
    roleIds.length,
    `${id} must not duplicate a block across roles`,
  );
  for (const blockId of roleIds)
    assert.ok(
      COMPOSITION_BLOCKS[blockId],
      `${id} references missing block ${blockId}`,
    );
  for (const alternative of recipe.alternatives)
    assert.ok(
      COMPOSITION_RECIPES[alternative],
      `${id} references missing alternative ${alternative}`,
    );
  if (recipe.provenance.legacyCatalogId)
    assert.ok(legacyRecipes[recipe.provenance.legacyCatalogId]);
}

for (const profileId of PRODUCT_PROFILE_IDS) {
  const profile = PRODUCT_PROFILE_CAPABILITIES[profileId];
  assert.equal(profile.id, profileId);
  assert.equal(profile.webSupport, true);
  assert.equal(profile.nativeSupport, true);
  assert.equal(profile.nativeStrategy, "SAME_INTENT");
  assert.ok(BRAND_PROFILES[profileId]);
  assert.ok(
    profile.sourceOfTruth.includes("packages/contracts/src/brand-profile.ts"),
  );
  assert.ok(
    profile.sourceOfTruth.includes("packages/contracts/src/theme-recipe.ts"),
  );
}
assert.equal(
  PRODUCT_PROFILE_CAPABILITIES["aapm-core"].brandExpression,
  "AAPM Brand Core",
);
assert.equal(
  PRODUCT_PROFILE_CAPABILITIES["aapm-farm"].densityTendency,
  "comfortable",
);
assert.equal(
  PRODUCT_PROFILE_CAPABILITIES["aapm-operations"].densityTendency,
  "compact",
);
assert.equal(PRODUCT_PROFILE_CAPABILITIES["aapm-erp"].densityTendency, "dense");
assert.equal(resolveProductProfile("unknown-profile").id, "neutral-product");

const defaults = resolveProductComposition();
assert.deepEqual(defaults.resolutionOrder, TOKEN_RESOLUTION_ORDER);
assert.equal(defaults.values.profile, "neutral-product");
assert.equal(defaults.values.recipe, "product");
const baseRecipe = resolveProductComposition({ baseRecipe: "editorial" });
assert.equal(baseRecipe.values.recipe, "editorial");
const profile = resolveProductComposition({
  baseRecipe: "editorial",
  productProfile: "aapm-erp",
});
assert.equal(profile.values.profile, "aapm-erp");
assert.equal(profile.values.recipe, "enterprise");
assert.equal(profile.values.density, "dense");
const themeOverride = resolveProductComposition({
  productProfile: "aapm-erp",
  themeOverride: { density: "comfortable" },
});
assert.equal(themeOverride.values.density, "comfortable");
const scopedOverride = resolveProductComposition({
  productProfile: "aapm-erp",
  themeOverride: { density: "comfortable" },
  scopedOverride: { density: "compact" },
});
assert.equal(scopedOverride.values.density, "compact");
const componentState = resolveProductComposition({
  productProfile: "aapm-erp",
  themeOverride: { density: "comfortable" },
  scopedOverride: { density: "compact" },
  componentState: { density: "default" },
});
assert.equal(componentState.values.density, "default");
const runtime = resolveProductComposition({
  runtime: { appearance: "dark", motion: "reduced", contrast: "more" },
});
assert.equal(runtime.runtime.appearance, "dark");
assert.equal(runtime.runtime.motion, "reduced");
assert.equal(runtime.runtime.contrast, "more");
assert.equal(projectCompositionToWeb(defaults).authority, "derived");
assert.equal(projectCompositionToNative(defaults).cssParsing, false);
assert.deepEqual(projectCompositionToNative(defaults).values, defaults.values);

for (const [id, canary] of Object.entries(NATIVE_COMPOSITION_CANARY.blocks)) {
  assert.equal(
    canary.platform,
    "ADAPTIVE",
    `${id} block canary must be adaptive`,
  );
  assert.equal(canary.cssParsing, false);
  assert.ok(COMPOSITION_BLOCKS[canary.sourceId]);
  assert.ok(canary.presentation.length > 0);
  assert.ok(canary.primitive.length > 0);
}
for (const [id, canary] of Object.entries(NATIVE_COMPOSITION_CANARY.recipes)) {
  assert.equal(
    canary.platform,
    "ADAPTIVE",
    `${id} recipe canary must be adaptive`,
  );
  assert.equal(canary.cssParsing, false);
  assert.ok(COMPOSITION_RECIPES[canary.sourceId]);
}
assert.ok(NATIVE_COMPOSITION_CANARY.profiles.length >= 2);
const nativeBlock = resolveNativeBlockComposition(
  "public-auth-entry",
  "aapm-farm",
);
assert.equal(nativeBlock.cssParsing, false);
assert.equal(nativeBlock.profile.id, "aapm-farm");
assert.equal(nativeBlock.kind, "block");
const nativeRecipe = resolveNativeRecipeComposition(
  "queue-detail",
  "aapm-operations",
);
assert.equal(nativeRecipe.cssParsing, false);
assert.equal(nativeRecipe.profile.id, "aapm-operations");
assert.equal(nativeRecipe.kind, "recipe");
const nativeTheme = resolveNativeTheme({
  profile: "aapm-farm",
  appearance: "dark",
  motion: "reduced",
});
assert.equal(nativeTheme.appearance, "dark");
assert.equal(nativeTheme.motion, "reduced");
assert.ok(nativeTheme.variants.light);
assert.ok(nativeTheme.variants.dark);

const generatedIndex = readJson("generated/index.json");
const agentIndex = readJson("generated/agent-index.json");
assert.equal(generatedIndex.composition.path, "composition.json");
assert.equal(
  generatedIndex.composition.compactPath,
  "composition.compact.json",
);
assert.equal(
  agentIndex.sourceOfTruth.composition,
  "packages/contracts/src/composition.ts",
);
assert.ok(
  agentIndex.defaultRetrieval.includes("generated/composition.compact.json"),
);
assert.equal(
  agentIndex.entryPoints.composition.source,
  "generated/composition.json",
);
assert.equal(
  agentIndex.entryPoints["product-profiles"].guidance,
  "packages/contracts/src/brand-profile.ts",
);
assert.equal(
  generatedCompact.counts.blockContracts,
  Object.keys(COMPOSITION_BLOCKS).length,
);
assert.equal(
  generatedCompact.counts.recipeContracts,
  Object.keys(COMPOSITION_RECIPES).length,
);

console.log(
  `U11 composition plane verified: ${Object.keys(COMPOSITION_BLOCKS).length} blocks, ${Object.keys(COMPOSITION_RECIPES).length} recipes, ${PRODUCT_PROFILE_IDS.length} profiles, ${Object.keys(NATIVE_COMPOSITION_CANARY.blocks).length + Object.keys(NATIVE_COMPOSITION_CANARY.recipes).length} native canaries.`,
);
