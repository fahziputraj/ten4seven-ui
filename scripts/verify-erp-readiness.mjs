import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const erpDensity = readJson("generated/erp-density.json");
const agentIndex = readJson("generated/agent-index.json");
const generatedIndex = readJson("generated/index.json");
const components = readJson("generated/components.compact.json");
const routeSource = read("apps/playground/src/playground-routes.ts");
const appSource = read("apps/playground/src/App.tsx");
const referenceSource = read(
  "apps/playground/src/erp-data-dense-reference.tsx",
);
const stylesSource = read("apps/playground/src/app.css");
const uiPackage = readJson("packages/ui/package.json");
const nativePackage = readJson("packages/native/package.json");

assert.equal(erpDensity.id, "erp-density-readiness");
assert.deepEqual(Object.keys(erpDensity.patterns), [
  "collection",
  "transaction-detail",
  "editable-entry",
  "approval-queue",
  "operational-dashboard",
]);
assert.deepEqual(erpDensity.states, [
  "loading",
  "ready",
  "empty",
  "error",
  "stale",
  "conflicted",
  "read-only",
  "permission-limited",
  "pending",
]);
assert.deepEqual(generatedIndex.erpDensity, { path: "erp-density.json" });
assert.deepEqual(agentIndex.entryPoints["erp-density"], {
  source: "generated/erp-density.json",
  guidance: "packages/contracts/src/erp-density.ts",
  reference: "/erp-reference",
  find: 't7ui find "ERP dense table"',
});

for (const pattern of Object.values(erpDensity.patterns)) {
  assert.equal(pattern.reference, "/erp-reference");
  for (const componentName of [
    ...pattern.components,
    ...pattern.optionalComponents,
  ])
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `ERP component is not implemented: ${componentName}`,
    );
  for (const viewport of ["desktop", "tablet", "mobile"])
    assert.ok(
      pattern.responsive[viewport],
      `ERP responsive contract missing: ${pattern.id}/${viewport}`,
    );
  assert.ok(pattern.unsupportedNeeds.length > 0);
  assert.ok(pattern.consumerOwns.length > 0);
}

assert.match(routeSource, /"ERP Density Reference"/);
assert.match(
  routeSource,
  /"ERP Density Reference": \{[\s\S]*?path: "\/erp-density-reference"/,
);
assert.match(appSource, /ErpDataDenseReference/);
assert.match(appSource, /routeMatch\.route === "ERP Density Reference"/);
assert.match(referenceSource, /data-contract=\{ERP_DENSITY_CONTRACT\.id\}/);
assert.match(referenceSource, /data-testid="erp-data-dense-reference"/);
assert.match(referenceSource, /data-brand-profile="aapm-erp"/);
for (const componentName of [
  "PageHeader",
  "SectionNavigation",
  "KPICluster",
  "FilterToolbar",
  "DataTable",
  "DataTableColumnPicker",
  "BulkActionBar",
  "Pagination",
  "DetailDrawer",
  "AdvancedDataGrid",
  "FormGrid",
  "ApprovalPanel",
  "RevisionDiff",
  "ActivityFeed",
  "LineChart",
  "BarChart",
  "DonutChart",
  "StateView",
  "ModuleState",
  "ThemeScope",
])
  assert.match(
    referenceSource,
    new RegExp(`\\b${componentName}\\b`),
    `Q08 must compose canonical ${componentName}`,
  );
for (const className of [
  ".erp-reference",
  ".erp-filter-row",
  ".erp-entry-grid",
  ".erp-review-grid",
  ".erp-chart-grid",
])
  assert.match(stylesSource, new RegExp(`\\${className}\\b`));

for (const forbidden of [
  "fetch(",
  "axios",
  "apiClient",
  "localStorage",
  "database",
  "authorize(",
  "canAccess(",
])
  assert.doesNotMatch(
    referenceSource,
    new RegExp(forbidden.replace(/[()[\].]/g, "\\$&"), "i"),
    `Q08 reference must not own ${forbidden}`,
  );

assert.equal(uiPackage.private, true);
assert.equal(uiPackage.license, "UNLICENSED");
assert.equal(uiPackage.exports["./server"], undefined);
assert.equal(nativePackage.dependencies["@ten4seven/ui"], undefined);
assert.equal(nativePackage.dependencies["@ten4seven/icons"], undefined);

const cliOutput = execFileSync(
  process.execPath,
  ["packages/ai/bin/t7ui.mjs", "find", "ERP dense table"],
  { cwd: repoRoot, encoding: "utf8" },
);
assert.match(cliOutput, /ERP density pattern: ERP collection \(collection\)/);
assert.match(cliOutput, /Contract: generated\/erp-density\.json/);
assert.match(
  cliOutput,
  /Responsive: desktop=table, tablet=table-scroll, mobile=table-scroll/,
);

console.log(
  "ERP readiness verification passed: typed density contract, generated retrieval, canonical composition, token-owned layout, package boundary, and fixture-only route are aligned.",
);
