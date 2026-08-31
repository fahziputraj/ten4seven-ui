import fs from "node:fs";

import {
  composeBrandExpression as composeBrandCore,
  composeEntityDetail as composeEntityDetailCore,
  composeEntityList as composeEntityListCore,
  createBrandExpressionResolver,
  createEntityDetailResolver,
  createEntityListResolver,
  resolveBrandExpression as resolveBrandCore,
  resolveEntityDetailIntent as resolveEntityDetailCore,
  resolveEntityListIntent as resolveEntityListCore,
} from "./core.mjs";
import {
  loadContracts,
  resolveComponentShardPath,
  resolveRecipeReference,
  resolveRequiredContracts,
} from "./retrieval.mjs";

const generatedUrl = (relativePath) => {
  const candidates = [
    new URL(`../generated/${relativePath}`, import.meta.url),
    new URL(`../../../generated/${relativePath}`, import.meta.url),
  ];
  const target = candidates.find((candidate) => fs.existsSync(candidate));
  if (!target)
    throw new Error(`Missing generated contract projection: ${relativePath}`);
  return target;
};

function createTelemetry() {
  return {
    indexBytes: 0,
    recipeBytes: 0,
    componentContractBytes: 0,
    supportingBytes: 0,
    totalActualBytes: 0,
    fullCatalogFallbacks: 0,
    files: [],
    componentIds: [],
  };
}

function readJson(relativePath, telemetry, kind) {
  const target = generatedUrl(relativePath);
  const raw = fs.readFileSync(target, "utf8");
  const bytes = Buffer.byteLength(raw);
  if (telemetry) {
    telemetry[`${kind}Bytes`] += bytes;
    telemetry.totalActualBytes += bytes;
    telemetry.files.push({
      kind,
      path: `generated/${relativePath}`,
      bytes,
    });
  }
  return JSON.parse(raw);
}

function loadSelectiveRecipe(recipeId, input = {}) {
  const telemetry = createTelemetry();
  const index = readJson("index.json", telemetry, "index");
  const reference = resolveRecipeReference(index, recipeId);
  const recipe = readJson(reference.path, telemetry, "recipe");
  const componentIds = resolveRequiredContracts(recipe, input);
  const components = loadContracts(componentIds, (componentId) => {
    const relativePath = resolveComponentShardPath(index, componentId);
    const component = readJson(relativePath, telemetry, "componentContract");
    telemetry.componentIds.push(componentId);
    return component;
  });

  return { recipe, components, telemetry };
}

function loadBrandRecipe() {
  const telemetry = createTelemetry();
  const index = readJson("index.json", telemetry, "index");
  const reference = resolveRecipeReference(index, "auth");
  const recipe = readJson(reference.path, telemetry, "recipe");
  const profiles = readJson("brand-profiles.json", telemetry, "supporting");
  const components = loadContracts(recipe.components, (componentId) => {
    const relativePath = resolveComponentShardPath(index, componentId);
    const component = readJson(relativePath, telemetry, "componentContract");
    telemetry.componentIds.push(componentId);
    return component;
  });

  return { recipe, profiles, components, telemetry };
}

function attachTelemetry(resolution, telemetry, recipeId) {
  return {
    ...resolution,
    source: `generated/recipes/${recipeId}.json`,
    contextReads: telemetry.files.map(({ path }) => path),
    retrieval: {
      indexBytes: telemetry.indexBytes,
      recipeBytes: telemetry.recipeBytes,
      componentContractBytes: telemetry.componentContractBytes,
      supportingBytes: telemetry.supportingBytes,
      totalActualBytes: telemetry.totalActualBytes,
      fullCatalogFallbacks: telemetry.fullCatalogFallbacks,
      files: telemetry.files,
      componentIds: telemetry.componentIds,
    },
  };
}

function loadRecipeForInspection(recipeId) {
  const telemetry = createTelemetry();
  const index = readJson("index.json", telemetry, "index");
  const reference = resolveRecipeReference(index, recipeId);
  return readJson(reference.path, telemetry, "recipe");
}

/**
 * Node/build-time convenience layer. Filesystem loading ends at this
 * boundary; deterministic decisions are delegated to the pure core kernel.
 */
export function resolveEntityListIntent(input = {}) {
  const loaded = loadSelectiveRecipe("entity-list", input);
  return attachTelemetry(
    resolveEntityListCore(
      { recipe: loaded.recipe, components: loaded.components },
      input,
    ),
    loaded.telemetry,
    "entity-list",
  );
}

export function composeEntityList(input = {}) {
  const loaded = loadSelectiveRecipe("entity-list", input);
  return attachTelemetry(
    composeEntityListCore(
      { recipe: loaded.recipe, components: loaded.components },
      input,
    ),
    loaded.telemetry,
    "entity-list",
  );
}

export function inspectEntityList() {
  return loadRecipeForInspection("entity-list");
}

export function resolveEntityDetailIntent(input = {}) {
  const loaded = loadSelectiveRecipe("entity-detail", input);
  return attachTelemetry(
    resolveEntityDetailCore(
      { recipe: loaded.recipe, components: loaded.components },
      input,
    ),
    loaded.telemetry,
    "entity-detail",
  );
}

export function composeEntityDetail(input = {}) {
  const loaded = loadSelectiveRecipe("entity-detail", input);
  return attachTelemetry(
    composeEntityDetailCore(
      { recipe: loaded.recipe, components: loaded.components },
      input,
    ),
    loaded.telemetry,
    "entity-detail",
  );
}

export function inspectEntityDetail() {
  return loadRecipeForInspection("entity-detail");
}

export function resolveBrandExpression(input = {}) {
  const loaded = loadBrandRecipe();
  return attachTelemetry(
    resolveBrandCore(
      {
        recipe: loaded.recipe,
        profiles: loaded.profiles,
        components: loaded.components,
      },
      input,
    ),
    loaded.telemetry,
    "auth",
  );
}

export function composeBrandExpression(input = {}) {
  const loaded = loadBrandRecipe();
  return attachTelemetry(
    composeBrandCore(
      {
        recipe: loaded.recipe,
        profiles: loaded.profiles,
        components: loaded.components,
      },
      input,
    ),
    loaded.telemetry,
    "auth",
  );
}

export function inspectBrandExpression() {
  return loadRecipeForInspection("auth");
}

// Keep the resolver constructors reachable to package-internal consumers that
// already pass normalized data directly, while the functions above remain the
// filesystem-backed Node convenience boundary.
export {
  createBrandExpressionResolver,
  createEntityDetailResolver,
  createEntityListResolver,
};
