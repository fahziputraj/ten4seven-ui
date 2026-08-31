import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  composeEntityList,
  inspectEntityList,
  resolveEntityListIntent,
} from "../packages/agent/src/node.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const defaultResolution = resolveEntityListIntent();
assert.equal(defaultResolution.source, "generated/recipes/entity-list.json");
assert.equal(defaultResolution.retrieval.fullCatalogFallbacks, 0);
assert.ok(defaultResolution.retrieval.totalActualBytes < 84135);
assert.deepEqual(defaultResolution.required, [
  "AppShell",
  "PageHeader",
  "DataTable",
]);
assert.deepEqual(defaultResolution.included, [
  "AppShell",
  "PageHeader",
  "DataTable",
  "Sidebar",
  "KPICluster",
  "FilterToolbar",
  "Pagination",
  "BulkActionBar",
  "DetailDrawer",
]);
assert.equal(defaultResolution.intent.workflow, "triage");
assert.equal(defaultResolution.responsive.mobile, "table-scroll");
assert.ok(defaultResolution.consumerOwned.includes("permissions"));

const reducedResolution = resolveEntityListIntent({
  navigation: "none",
  operations: ["search"],
  showMetrics: false,
  bulkActions: false,
  contextualDetail: false,
  paginated: false,
});
assert.deepEqual(reducedResolution.included, [
  "AppShell",
  "PageHeader",
  "DataTable",
  "FilterToolbar",
]);
assert.deepEqual(reducedResolution.omitted, [
  "Sidebar",
  "KPICluster",
  "Pagination",
  "BulkActionBar",
  "DetailDrawer",
]);

const scaffold = composeEntityList();
assert.equal(scaffold.kind, "ten4seven-canonical-scaffold");
assert.ok(scaffold.composition.includes("DataTable"));
assert.ok(scaffold.consumerOwned.includes("rows"));
assert.equal(Object.hasOwn(scaffold, "rows"), false);
assert.equal(Object.hasOwn(scaffold, "permissions"), false);
assert.equal(scaffold.retrieval.fullCatalogFallbacks, 0);

const inspected = inspectEntityList();
assert.equal(inspected.id, "entity-list");
assert.ok(inspected.intent);
assert.ok(inspected.required.includes("DataTable"));

const nodeSource = read("packages/agent/src/node.mjs");
assert.match(nodeSource, /generated\/\$\{relativePath\}/);
assert.match(nodeSource, /createEntityListResolver/);
assert.doesNotMatch(nodeSource, /packages\/ai\/catalog/);

const coreSource = read("packages/agent/src/core.mjs");
assert.match(coreSource, /createEntityListResolver/);
assert.doesNotMatch(coreSource, /node:/);
assert.doesNotMatch(coreSource, /from ["']node:/);
assert.doesNotMatch(coreSource, /contextReads/);
assert.doesNotMatch(coreSource, /generated\//);

const consumerSource = read(
  "consumer-tests/entity-list-consumer/src/consumer.ts",
);
assert.match(consumerSource, /from "@ten4seven\/agent"/);
assert.match(consumerSource, /from "@ten4seven\/ui"/);
assert.doesNotMatch(consumerSource, /packages\/(?:ui|contracts|ai)\/src/);
assert.doesNotMatch(
  consumerSource,
  /(?:function|const)\s+(?:Button|Input|Card|Modal|Drawer|Table|Select|Badge)/,
);

const consumerRoot = path.join(repoRoot, "consumer-tests/entity-list-consumer");
const installedConsumerOutput = execFileSync(
  process.execPath,
  ["src/run.mjs"],
  { cwd: consumerRoot, encoding: "utf8" },
);
assert.match(
  installedConsumerOutput,
  /Installed consumer resolved entity-list/,
);

console.log(
  `Slice A verified: default entity-list resolution includes ${defaultResolution.included.length} canonical contracts, reduced intent omits ${reducedResolution.omitted.length} conditional contracts, compose is domain-data-free, and installed isolated consumer imports public package boundaries.`,
);
