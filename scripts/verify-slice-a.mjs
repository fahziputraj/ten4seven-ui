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
const artifactDir = path.join(repoRoot, "artifacts", "consumer-proof");
const uiArtifact = path.join(artifactDir, "ten4seven-ui-1.0.0.tgz");
const agentArtifact = path.join(artifactDir, "ten4seven-agent-0.1.0.tgz");
const pnpmCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const pnpmExecutable =
  process.platform === "win32" ? process.env.ComSpec : pnpmCommand;
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

function runPnpm(args, cwd = repoRoot) {
  const commandArgs =
    process.platform === "win32"
      ? ["/d", "/s", "/c", pnpmCommand, ...args]
      : args;
  execFileSync(pnpmExecutable, commandArgs, {
    cwd,
    encoding: "utf8",
    stdio: "inherit",
  });
}

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
runPnpm(["package:build"]);
runPnpm(["package:verify"]);
runPnpm([
  "--filter",
  "@ten4seven/ui",
  "pack",
  "--pack-destination",
  artifactDir,
]);
runPnpm(["--filter", "@ten4seven/agent", "build"]);
runPnpm([
  "--filter",
  "@ten4seven/agent",
  "pack",
  "--pack-destination",
  artifactDir,
]);

for (const artifact of [uiArtifact, agentArtifact]) {
  if (!fs.existsSync(artifact) || fs.statSync(artifact).size === 0)
    throw new Error(`missing release artifact: ${artifact}`);
}

const agentManifest = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "packages/agent/package.json"), "utf8"),
);
if (JSON.stringify(agentManifest).includes("workspace:"))
  throw new Error("agent release manifest leaks a workspace dependency");

const uiManifest = JSON.parse(
  fs.readFileSync(path.join(repoRoot, "packages/ui/package.json"), "utf8"),
);
if (JSON.stringify(uiManifest).includes("workspace:"))
  throw new Error("UI release manifest leaks a workspace dependency");

runPnpm(
  ["install", "--ignore-workspace", "--force", "--no-frozen-lockfile"],
  consumerRoot,
);

const installedAgentManifest = JSON.parse(
  fs.readFileSync(
    path.join(
      consumerRoot,
      "node_modules",
      "@ten4seven",
      "agent",
      "package.json",
    ),
    "utf8",
  ),
);
const installedUiManifest = JSON.parse(
  fs.readFileSync(
    path.join(consumerRoot, "node_modules", "@ten4seven", "ui", "package.json"),
    "utf8",
  ),
);
if (
  JSON.stringify(installedAgentManifest).includes("workspace:") ||
  JSON.stringify(installedUiManifest).includes("workspace:")
)
  throw new Error(
    "installed consumer package manifests leak a workspace dependency",
  );

runPnpm(["run", "typecheck"], consumerRoot);
runPnpm(["run", "build"], consumerRoot);
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
