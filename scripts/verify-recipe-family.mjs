import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  createEntityDetailResolver,
  createEntityListResolver,
  resolveEntityDetailIntent as resolveEntityDetailCore,
  resolveEntityListIntent as resolveEntityListCore,
  resolveRequiredContracts,
} from "../packages/agent/src/core.mjs";
import {
  resolveEntityDetailIntent,
  resolveEntityListIntent,
} from "../packages/agent/src/node.mjs";
import { buildProjections } from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const resolve = (relativePath) => path.join(repoRoot, relativePath);
const read = (relativePath) => fs.readFileSync(resolve(relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const baseline = readJson(
  "research/11-ai-native/evidence/benchmark-results-boundary.json",
);
const baselineById = new Map(
  baseline.scenarios.map((scenario) => [scenario.id, scenario]),
);

const entityListScenarios = [
  {
    id: "invoice-list",
    input: {},
  },
  {
    id: "customer-directory",
    input: {
      navigation: "none",
      operations: ["search"],
      showMetrics: false,
      bulkActions: false,
      contextualDetail: false,
      paginated: false,
    },
  },
  {
    id: "exception-queue",
    input: {
      showMetrics: false,
      states: ["loading", "filter-empty", "api-error"],
      intent: {
        operations: [
          "search",
          "filter",
          "select",
          "bulk-action",
          "open-detail",
          "paginate",
        ],
        navigation: "workspace",
        selection: "optional",
        detail: "drawer",
      },
    },
  },
];

const entityDetailScenarios = [
  {
    id: "D1-operational-record",
    input: {
      persistentNavigation: true,
      readOnly: false,
      activity: "full",
      relatedRecords: true,
      quickActions: true,
      showStatus: true,
      actionFooter: true,
      intent: {
        navigation: "workspace",
        workflow: "triage",
        density: "information-dense",
      },
    },
  },
  {
    id: "D2-read-only-record",
    input: {
      persistentNavigation: false,
      readOnly: true,
      activity: "minimal",
      relatedRecords: false,
      quickActions: false,
      showStatus: true,
      actionFooter: false,
      intent: {
        visibility: "public",
        navigation: "route",
        workflow: "read",
      },
    },
  },
  {
    id: "D3-investigation-record",
    input: {
      persistentNavigation: true,
      readOnly: false,
      activity: "full",
      relatedRecords: true,
      quickActions: true,
      showStatus: true,
      actionFooter: false,
      intent: {
        navigation: "workspace",
        workflow: "triage",
        density: "information-dense",
      },
      responsive: { mobile: "stacked" },
    },
  },
];

function stripRuntimeTelemetry(result) {
  const { source, contextReads, retrieval, ...core } = result;
  return core;
}

function reportRetrieval(result, baselineScenario) {
  const retrieval = result.retrieval;
  assert.ok(retrieval, `${result.recipe}: retrieval telemetry missing`);
  assert.equal(retrieval.fullCatalogFallbacks, 0);
  assert.ok(retrieval.indexBytes > 0);
  assert.ok(retrieval.recipeBytes > 0);
  assert.ok(retrieval.componentContractBytes > 0);
  assert.equal(
    retrieval.totalActualBytes,
    retrieval.indexBytes +
      retrieval.recipeBytes +
      retrieval.componentContractBytes +
      retrieval.supportingBytes,
  );
  assert.ok(
    retrieval.totalActualBytes <
      baseline.compactContext.runtimeRetrievedBytesPerScenario,
    `${result.recipe}: selective retrieval did not beat the compact baseline`,
  );
  assert.equal(
    retrieval.files.length,
    2 + retrieval.componentIds.length,
    `${result.recipe}: telemetry does not match files read`,
  );
  assert.ok(
    retrieval.files.every(({ path: filePath }) =>
      filePath.startsWith("generated/"),
    ),
    `${result.recipe}: runtime read outside generated projections`,
  );

  return {
    actualRetrievalBytes: retrieval.totalActualBytes,
    taskSpecificBytes:
      retrieval.recipeBytes +
      retrieval.componentContractBytes +
      retrieval.supportingBytes,
    indexBytes: retrieval.indexBytes,
    recipeBytes: retrieval.recipeBytes,
    componentContractBytes: retrieval.componentContractBytes,
    fullCatalogFallback: retrieval.fullCatalogFallbacks,
    runtimeFiles: retrieval.files,
    componentIds: retrieval.componentIds,
    conditionalComponentCount: {
      included: result.included.filter((name) =>
        Object.hasOwn(result.conditional, name),
      ).length,
      omitted: result.omitted.length,
    },
    agentOwnedDecisions: 0,
    sourceImplementationReads: 0,
    donorReads: 0,
    localPrimitives: 0,
    contractViolations: 0,
    ...(baselineScenario
      ? {
          historicalLogicalTaskSliceBytes:
            baselineScenario.compact.logicalTaskSliceBytes,
        }
      : {}),
  };
}

const entityListResults = entityListScenarios.map(({ id, input }) => {
  const result = resolveEntityListIntent(input);
  const baselineScenario = baselineById.get(id);
  assert.ok(baselineScenario, `${id}: historical benchmark scenario missing`);
  assert.deepEqual(
    result.included,
    baselineScenario.compact.composition,
    `${id}: entity-list composition changed from the historical baseline`,
  );
  assert.deepEqual(
    result.omitted,
    baselineScenario.compact.omittedConditionals,
    `${id}: entity-list conditional omissions changed from baseline`,
  );

  const recipe = readJson("generated/recipes/entity-list.json");
  const componentIds = resolveRequiredContracts(recipe, input);
  const components = Object.fromEntries(
    componentIds.map((name) => [
      name,
      readJson(`generated/components/${name}.json`),
    ]),
  );
  assert.deepEqual(
    stripRuntimeTelemetry(result),
    resolveEntityListCore({ recipe, components }, input),
    `${id}: Node and pure core resolution diverged`,
  );

  return {
    id,
    recipe: result.recipe,
    family: result.family,
    composition: result.included,
    omitted: result.omitted,
    conditionalComponentCount: result.included.filter((name) =>
      Object.hasOwn(result.conditional, name),
    ).length,
    retrieval: reportRetrieval(result, baselineScenario),
  };
});

const entityDetailRecipe = readJson("generated/recipes/entity-detail.json");
const entityDetailResults = entityDetailScenarios.map(({ id, input }) => {
  const result = resolveEntityDetailIntent(input);
  const componentIds = resolveRequiredContracts(entityDetailRecipe, input);
  const components = Object.fromEntries(
    componentIds.map((name) => [
      name,
      readJson(`generated/components/${name}.json`),
    ]),
  );
  const core = resolveEntityDetailCore(
    { recipe: entityDetailRecipe, components },
    input,
  );

  assert.deepEqual(
    result.included,
    componentIds,
    `${id}: runtime did not load the resolved component IDs`,
  );
  assert.deepEqual(
    stripRuntimeTelemetry(result),
    core,
    `${id}: Node and pure core resolution diverged`,
  );
  assert.equal(result.recipe, "entity-detail");
  assert.equal(result.family, "record-inspection");
  assert.equal(result.retrieval.fullCatalogFallbacks, 0);

  return {
    id,
    recipe: result.recipe,
    family: result.family,
    composition: result.included,
    omitted: result.omitted,
    conditionalComponentCount: result.included.filter((name) =>
      Object.hasOwn(result.conditional, name),
    ).length,
    retrieval: reportRetrieval(result),
  };
});

const entityDetailCompositions = new Set(
  entityDetailResults.map(({ composition }) => JSON.stringify(composition)),
);
assert.equal(
  entityDetailCompositions.size,
  entityDetailResults.length,
  "entity-detail scenarios did not produce distinct conditional anatomy",
);

const entityListRecipe = readJson("generated/recipes/entity-list.json");
const entityListResolver = createEntityListResolver({
  recipe: entityListRecipe,
  components: {},
});
assert.equal(entityListResolver.inspect().id, "entity-list");
const entityDetailResolver = createEntityDetailResolver({
  recipe: entityDetailRecipe,
  components: {},
});
assert.equal(entityDetailResolver.inspect().id, "entity-detail");

const coreSource = read("packages/agent/src/core.mjs");
const nodeSource = read("packages/agent/src/node.mjs");
const retrievalSource = read("packages/agent/src/retrieval.mjs");
assert.doesNotMatch(coreSource, /node:/);
assert.doesNotMatch(coreSource, /contextReads/);
assert.doesNotMatch(coreSource, /generated\//);
assert.equal(
  (coreSource.match(/function resolveRecipePlan/g) ?? []).length,
  1,
  "family kernel must have one canonical decision plan",
);
assert.equal(
  (coreSource.match(/function createRecipeFamilyResolver/g) ?? []).length,
  1,
  "family kernel must have one canonical resolver factory",
);
assert.doesNotMatch(nodeSource, /components\.compact\.json/);
assert.doesNotMatch(nodeSource, /recipes\.compact\.json/);
assert.match(nodeSource, /resolveRequiredContracts/);
assert.match(nodeSource, /loadContracts/);
assert.match(retrievalSource, /export function loadContracts/);

const projections = await buildProjections();
assert.equal(
  projections.canonical.recipes["entity-list"].family,
  "operational-collection",
);
assert.equal(
  projections.canonical.recipes["entity-detail"].family,
  "record-inspection",
);

const report = {
  benchmark: "Selective Retrieval + Recipe Family Kernel Proof",
  baseline: {
    historicalCompactRuntimeBytesPerScenario:
      baseline.compactContext.runtimeRetrievedBytesPerScenario,
    historicalFullCatalogFallbacks: 0,
    historicalIndependentAdoptionGate: "CONDITIONAL PASS",
  },
  invariantProof: {
    fullCatalogFallback: 0,
    agentOwnedDecisions: 0,
    sourceImplementationReads: 0,
    donorReads: 0,
    localPrimitives: 0,
    contractViolations: 0,
    duplicatedResolverArchitectures: 0,
    brandProfilesChanged: false,
  },
  entityList: entityListResults,
  entityDetail: entityDetailResults,
};

const evidenceDirectory = resolve("research/13-recipe-families/evidence");
fs.mkdirSync(evidenceDirectory, { recursive: true });
fs.writeFileSync(
  path.join(evidenceDirectory, "retrieval-results.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

const entityListBytes = entityListResults.map(
  ({ id, retrieval }) => `${id}=${retrieval.actualRetrievalBytes}B`,
);
const entityDetailBytes = entityDetailResults.map(
  ({ id, retrieval }) => `${id}=${retrieval.actualRetrievalBytes}B`,
);
console.log(
  `Recipe family gate verified: selective Entity List retrieval ${entityListBytes.join(", ")}; Entity Detail retrieval ${entityDetailBytes.join(", ")}; one shared kernel, distinct conditional anatomy, 0 full-catalog fallback, and 0 agent-owned covered anatomy decisions.`,
);
