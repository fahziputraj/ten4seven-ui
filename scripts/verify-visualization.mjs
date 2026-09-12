import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_CONTRACTS,
  CHART_COLOR_SEMANTICS,
  CHART_DATA_SHAPES,
  CHART_DATA_STATES,
  CHART_TYPES,
  MAP_PRIMITIVES,
  MAP_TAXONOMY,
  NATIVE_VISUALIZATION_CANARY,
  SCHEDULER_RESPONSIVE_STRATEGIES,
  SCHEDULER_STATES,
  SCHEDULER_TAXONOMY,
  SCHEDULER_TIME_BOUNDARY,
  SCHEDULER_VIEWS,
  VISUALIZATION_COMPONENT_DEFINITIONS,
  VISUALIZATION_ENGINE_ADAPTERS,
  VISUALIZATION_SCHEDULING_MAPS_PLANE,
  VISUALIZATION_TOKEN_MAPPING,
  classifyChartValue,
  hasPartialChartData,
  resolveChartDataState,
  resolveComponentPlatformContract,
} from "../packages/contracts/src/index.ts";
import { resolveNativeVisualization } from "../packages/native/src/index.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");

const projection = readJson("generated/visualization-scheduling-maps.json");
const projections = await buildProjections();
assert.equal(
  normalizeLineEndings(read("generated/visualization-scheduling-maps.json")),
  normalizeLineEndings(
    serializeProjection(
      "visualization-scheduling-maps.json",
      projections.outputs["visualization-scheduling-maps.json"],
    ),
  ),
  "U08 projection is stale; run pnpm contracts:generate",
);
assert.deepEqual(
  projections.outputs["visualization-scheduling-maps.json"],
  projection,
  "U08 projection must be deterministic",
);
assert.equal(
  CANONICAL_CONTRACTS.visualizationSchedulingMaps,
  VISUALIZATION_SCHEDULING_MAPS_PLANE,
  "canonical registry must point at the typed U08 plane",
);

assert.deepEqual(projection.taxonomy.families, [
  "CHART",
  "VISUALIZATION_SUPPORT",
  "SCHEDULING",
  "MAP",
]);
assert.deepEqual(projection.taxonomy.chartTypes, CHART_TYPES);
assert.deepEqual(projection.taxonomy.chartDataShapes, CHART_DATA_SHAPES);
assert.deepEqual(projection.taxonomy.chartStates, CHART_DATA_STATES);
assert.deepEqual(projection.taxonomy.schedulerViews, SCHEDULER_VIEWS);
assert.deepEqual(projection.taxonomy.schedulerStates, SCHEDULER_STATES);
assert.deepEqual(projection.taxonomy.mapPrimitives, MAP_PRIMITIVES);
assert.deepEqual(
  projection.taxonomy.chartColorSemantics,
  CHART_COLOR_SEMANTICS,
);

assert.equal(classifyChartValue(0), "zero", "zero is a present chart value");
assert.equal(classifyChartValue(null), "missing");
assert.equal(classifyChartValue(undefined), "missing");
assert.equal(classifyChartValue(Number.NaN), "invalid");
assert.equal(classifyChartValue("0"), "invalid");
assert.equal(hasPartialChartData([0, 4, 8]), false);
assert.equal(hasPartialChartData([0, null, 8]), true);
assert.equal(resolveChartDataState(undefined, []), "noData");
assert.equal(resolveChartDataState(undefined, [0, 0]), "ready");
assert.equal(resolveChartDataState(undefined, [0, null]), "partialData");
assert.equal(
  resolveChartDataState("filteredEmpty", [2, 4]),
  "filteredEmpty",
  "an explicit consumer state wins over inference",
);

const chartNames = ["LineChart", "BarChart", "DonutChart", "Sparkline"];
for (const name of chartNames) {
  const definition = VISUALIZATION_COMPONENT_DEFINITIONS[name];
  assert.ok(definition, `${name} must have a typed visualization contract`);
  assert.equal(definition.classification, "CANONICAL_COMPONENT");
  assert.equal(definition.inventoryStatus, "EXISTING_STABLE");
  assert.ok(
    CHART_DATA_STATES.every((state) => definition.states.includes(state)),
    `${name} must expose the canonical chart lifecycle states`,
  );
  assert.ok(definition.ai.accessibilityAlternative);
  assert.ok(definition.ai.adaptiveStrategy.length > 0);
  assert.ok(definition.consumerOwns.length > 0);
  assert.ok(definition.ten4sevenOwns.length > 0);

  const generatedComponent = projection.components[name];
  assert.equal(generatedComponent.canonicalComponent, name);
  assert.ok(generatedComponent.web);
  assert.ok(generatedComponent.native);
}

const generatedComponents = readJson("generated/components.compact.json");
for (const name of Object.keys(VISUALIZATION_COMPONENT_DEFINITIONS)) {
  assert.deepEqual(
    generatedComponents[name].visualizationRef,
    { path: "visualization-scheduling-maps.json", id: name },
    `${name} compact projection must point to the U08 contract`,
  );
}
assert.equal(
  readJson("generated/index.json").visualizationSchedulingMaps.path,
  "visualization-scheduling-maps.json",
);
const agentIndex = readJson("generated/agent-index.json");
assert.ok(
  agentIndex.defaultRetrieval.includes(
    "generated/visualization-scheduling-maps.json",
  ),
);
assert.equal(
  agentIndex.entryPoints["visualization-scheduling-maps"].source,
  "generated/visualization-scheduling-maps.json",
);

assert.deepEqual(
  VISUALIZATION_TOKEN_MAPPING.categorical.classification,
  "DERIVED",
);
assert.deepEqual(
  VISUALIZATION_TOKEN_MAPPING.semantic.classification,
  "FIXED_SYSTEM_SEMANTIC",
);
assert.ok(
  VISUALIZATION_TOKEN_MAPPING.semantic.roles.includes("chart-threshold"),
);
for (const mapping of Object.values(VISUALIZATION_TOKEN_MAPPING)) {
  assert.ok(mapping.sourcePaths.length > 0);
  assert.ok(mapping.roles.length > 0);
}

assert.equal(SCHEDULER_TAXONOMY.Calendar.kind, "date-selection");
assert.equal(SCHEDULER_TAXONOMY.Scheduler.kind, "scheduler");
assert.notEqual(
  SCHEDULER_TAXONOMY.Calendar.id,
  SCHEDULER_TAXONOMY.Scheduler.id,
);
assert.equal(SCHEDULER_TAXONOMY.Scheduler.platform, "ADAPTIVE");
assert.equal(SCHEDULER_TAXONOMY.Scheduler.engineBoundary, "consumer-engine");
assert.ok(
  SCHEDULER_TAXONOMY.Scheduler.consumerOwns.some((item) =>
    item.includes("event truth"),
  ),
);
assert.ok(
  SCHEDULER_TAXONOMY.Scheduler.consumerOwns.some((item) =>
    item.includes("timezone"),
  ),
);
assert.ok(SCHEDULER_RESPONSIVE_STRATEGIES.includes("month-to-agenda"));
assert.equal(SCHEDULER_TIME_BOUNDARY.silentConversion, false);
assert.ok(
  Object.keys(SCHEDULER_TAXONOMY).every(
    (name) => SCHEDULER_TAXONOMY[name].accessibility.length > 0,
  ),
);

assert.equal(MAP_TAXONOMY.Map.engineBoundary, "consumer-engine");
assert.equal(MAP_TAXONOMY.LocationPicker.inventoryStatus, "DEFERRED");
assert.ok(
  MAP_TAXONOMY.LocationPicker.consumerOwns.some((item) =>
    item.includes("GPS permission"),
  ),
);
assert.ok(
  Object.values(MAP_TAXONOMY).every(
    (entry) => entry.accessibility.length > 0 && entry.responsive.length > 0,
  ),
);

assert.equal(VISUALIZATION_ENGINE_ADAPTERS["t7-svg-charts"].status, "existing");
assert.equal(
  VISUALIZATION_ENGINE_ADAPTERS["t7-svg-charts"].dependency,
  "packages/ui/src/charts.tsx and packages/tokens/src/theme.ts",
);
for (const [name, engine] of Object.entries(VISUALIZATION_ENGINE_ADAPTERS)) {
  assert.ok(engine.capability, `${name} must state its capability`);
  assert.ok(engine.license, `${name} must state its license posture`);
  assert.ok(engine.bundleImplication, `${name} must state bundle implications`);
  assert.ok(
    engine.isolationBoundary,
    `${name} must state its isolation boundary`,
  );
  assert.ok(engine.vendorApiPolicy, `${name} must state vendor API policy`);
}

const nativeSource = read("packages/native/src/index.ts");
for (const forbidden of [
  "@ten4seven/ui",
  "react",
  "react-dom",
  "className",
  "document",
  "window",
  ".css",
  "fetch(",
  "recharts",
  "echarts",
  "fullcalendar",
  "mapbox",
  "leaflet",
  "maplibre",
]) {
  assert.doesNotMatch(
    nativeSource,
    new RegExp(forbidden.replace(/[()[\].]/g, "\\$&"), "i"),
    `native U08 projection must not own ${forbidden}`,
  );
}
for (const name of ["chart", "scheduler", "map"]) {
  const descriptor = resolveNativeVisualization(name);
  assert.equal(descriptor.id, name);
  assert.ok(descriptor.presentation);
  assert.ok(descriptor.semanticInputs.length > 0);
  assert.ok(descriptor.accessibilityAlternative);
  assert.ok(descriptor.primitive);
}
assert.equal(resolveNativeVisualization("chart").primitive, "Chart");
assert.equal(resolveNativeVisualization("scheduler").primitive, "SectionList");
assert.equal(resolveNativeVisualization("map").primitive, "MapView");
assert.deepEqual(Object.keys(NATIVE_VISUALIZATION_CANARY), [
  "chart",
  "scheduler",
  "map",
]);

for (const relativePath of [
  "packages/ui/package.json",
  "packages/native/package.json",
]) {
  const manifest = readJson(relativePath);
  const serialized = JSON.stringify(manifest).toLowerCase();
  assert.doesNotMatch(
    serialized,
    /recharts|echarts|fullcalendar|mapbox|leaflet|maplibre/,
  );
}
const uiSource = read("packages/ui/src/charts.tsx");
const uiStyles = read("packages/ui/src/styles.css");
assert.match(uiSource, /partialData/);
assert.match(uiSource, /ChartAnnotation/);
assert.match(uiStyles, /t7-chart-annotation-line/);

const legacyComponents = readJson("packages/ai/catalog/components.json");
for (const [name, definition] of Object.entries(
  VISUALIZATION_COMPONENT_DEFINITIONS,
)) {
  assert.ok(
    legacyComponents[name],
    `${name} must remain in the compatibility catalog`,
  );
  const platform = resolveComponentPlatformContract(
    name,
    legacyComponents[name],
  );
  assert.equal(projection.components[name].platform, platform.platform);
  assert.equal(
    projection.components[name].rendererStrategy,
    platform.rendererStrategy,
  );
}

console.log(
  `U08 visualization, scheduling, and maps contract verification passed (${Object.keys(VISUALIZATION_COMPONENT_DEFINITIONS).length} linked components; ${Object.keys(VISUALIZATION_ENGINE_ADAPTERS).length} engine boundaries; ${Object.keys(NATIVE_VISUALIZATION_CANARY).length} native canaries).`,
);
