import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const contract = readJson("generated/saas-control-plane.json");
const routeSource = read(
  "apps/playground/src/saas-control-plane-reference.tsx",
);
const sharedChromeSource = read("apps/playground/src/playground-chrome.tsx");
const routeMapSource = read("apps/playground/src/playground-routes.ts");
const appSource = read("apps/playground/src/App.tsx");
const agentIndex = readJson("generated/agent-index.json");
const generatedIndex = readJson("generated/index.json");

const expectedPatternIds = [
  "tenant-selector",
  "resource-selector",
  "module-catalog",
  "module-activation",
  "setup-checklist",
  "module-state-presentation",
  "permission-scope",
  "permission-matrix",
  "activity-audit",
  "import-exception-review",
  "mapping-reconciliation",
];
const expectedReferenceViewIds = [
  "context",
  "module-catalog",
  "activation",
  "access",
  "trace",
];

assert.equal(contract.id, "saas-control-plane");
assert.deepEqual(Object.keys(contract.patterns), expectedPatternIds);
assert.deepEqual(
  Object.keys(contract.referenceViews),
  expectedReferenceViewIds,
);
assert.deepEqual(contract.stateCoverage, [
  "empty",
  "loading",
  "error",
  "disabled",
  "read-only",
  "action-required",
  "ready",
]);
assert.equal(
  agentIndex.entryPoints["saas-control-plane"].source,
  "generated/saas-control-plane.json",
);
assert.equal(generatedIndex.saasControlPlane.path, "saas-control-plane.json");

for (const symbol of [
  "AppShell",
  "Sidebar",
  "PageHeader",
  "Select",
  "HierarchyPicker",
  "ModuleState",
  "MilestoneTracker",
  "Progress",
  "ActivityFeed",
  "DataTable",
  "StatusChip",
  "FileUpload",
])
  assert.match(
    symbol === "Sidebar" ? `${routeSource}\n${sharedChromeSource}` : routeSource,
    new RegExp(`\\b${symbol}\\b`),
    `Q05 reference route or shared shell is missing ${symbol}`,
  );

for (const fixtureId of [
  "q05-tenant-selector",
  "q05-resource-selector",
  "q05-module-catalog",
  "q05-activation-progress",
  "q05-suspended-module",
  "q05-permission-denied",
  "q05-out-of-scope",
  "q05-permission-matrix",
  "q05-activity-audit",
  "q05-import-exception-review",
  "q05-mapping-reconciliation",
])
  assert.match(
    routeSource,
    new RegExp(fixtureId),
    `Q05 reference route is missing fixture ${fixtureId}`,
  );

for (const forbidden of [
  "fetch(",
  "canAccess(",
  "authorize(",
  "apiClient",
  "database",
  "localStorage",
  "subscription",
  "entitlement",
])
  assert.equal(
    routeSource.includes(forbidden),
    false,
    `Q05 reference route must not own ${forbidden}`,
  );

assert.match(routeMapSource, /"SaaS Control Plane": "\/saas-control-plane"/);
assert.match(appSource, /SaasControlPlaneReference/);

const queries = new Map([
  [
    "tenant organization selector",
    "Control-plane pattern: Tenant / organization selector (tenant-selector)",
  ],
  [
    "resource scope selection",
    "Control-plane pattern: Resource selector (resource-selector)",
  ],
  [
    "module setup requirements",
    "Control-plane pattern: Setup checklist (setup-checklist)",
  ],
  [
    "suspended module",
    "Control-plane pattern: Module availability state (module-state-presentation)",
  ],
  [
    "permission denied",
    "Control-plane pattern: Permission and resource-scope state (permission-scope)",
  ],
  [
    "role permission matrix",
    "Control-plane pattern: Role / capability matrix (permission-matrix)",
  ],
  [
    "audit timeline",
    "Control-plane pattern: Activity / audit timeline (activity-audit)",
  ],
  [
    "import exceptions",
    "Control-plane pattern: Import progress and exception review (import-exception-review)",
  ],
  [
    "mapping reconciliation",
    "Control-plane pattern: Mapping and reconciliation status (mapping-reconciliation)",
  ],
]);

for (const [query, expected] of queries) {
  const output = execFileSync(
    process.execPath,
    ["packages/ai/bin/t7ui.mjs", "find", query],
    { cwd: repoRoot, encoding: "utf8" },
  );
  assert.match(
    output,
    new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  );
}

console.log(
  `SaaS control-plane gate verified: ${expectedPatternIds.length} typed patterns, ${expectedReferenceViewIds.length} reference views, static ownership-safe fixtures, and ${queries.size} AI retrieval queries.`,
);
