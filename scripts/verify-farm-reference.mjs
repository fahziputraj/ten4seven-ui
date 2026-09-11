import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const routeSource = read("apps/playground/src/playground-routes.ts");
const appSource = read("apps/playground/src/App.tsx");
const referenceSource = read("apps/playground/src/farm-p1-reference.tsx");
const sharedChromeSource = read("apps/playground/src/playground-chrome.tsx");
const dataSource = read("apps/playground/src/farm-p1-reference-data.ts");
const stylesSource = read("apps/playground/src/app.css");

assert.match(routeSource, /"Farm P1 Reference"/);
assert.match(routeSource, /farmP1ReferencePath = "\/farm-reference"/);
assert.match(routeSource, /kind: "farm-reference"/);
for (const pathName of [
  "/farm-reference/overview",
  "/farm-reference/daily-operations",
  "/farm-reference/context",
  "/farm-reference/flocks",
  "/farm-reference/inventory",
]) {
  assert.match(
    routeSource,
    new RegExp(pathName.replaceAll("/", "\\/")),
    "Q06 child route missing: " + pathName,
  );
}

assert.match(appSource, /FarmP1Reference/);
assert.match(appSource, /routeMatch\.kind === "farm-reference"/);
assert.match(
  `${appSource}\n${sharedChromeSource}`,
  /"Farm P1 Reference": "farm"/,
);

for (const componentName of [
  "AppShell",
  "Sidebar",
  "PageHeader",
  "Card",
  "KPICluster",
  "Select",
  "HierarchyPicker",
  "FormGrid",
  "Input",
  "DataTable",
  "DetailDrawer",
  "ModuleState",
  "MilestoneTracker",
  "ActivityFeed",
  "Progress",
  "StatusChip",
  "ThemeScope",
]) {
  assert.match(
    componentName === "Sidebar"
      ? `${referenceSource}\n${sharedChromeSource}`
      : referenceSource,
    new RegExp("\\b" + componentName + "\\b"),
    "Q06 must compose canonical or shared " + componentName,
  );
}

for (const testId of [
  "farm-p1-overview",
  "farm-p1-daily-operations",
  "farm-p1-context",
  "farm-p1-flocks",
  "farm-p1-inventory",
  "farm-p1-inventory-state",
]) {
  assert.match(referenceSource, new RegExp(testId));
}

for (const state of ["not-entitled", "setup-required", "active", "suspended"]) {
  assert.match(dataSource, new RegExp(state.replace("-", "\\-")));
}

assert.match(referenceSource, /data-brand-profile="aapm-farm"/);
assert.match(referenceSource, /theme={farmProfile\.themeRecipe}/);
assert.match(referenceSource, /adapter\.semantic/);
assert.doesNotMatch(referenceSource, /#(?:[0-9a-f]{3}){1,2}\b/i);
assert.doesNotMatch(
  referenceSource,
  /function\s+Farm(?:Button|Input|Card|Select)\b/,
);
for (const forbidden of [
  "fetch(",
  "apiClient",
  "database",
  "localStorage",
  "authorize(",
  "canAccess(",
  "subscription",
]) {
  assert.doesNotMatch(
    referenceSource,
    new RegExp(forbidden.replace(/[()[\]]/g, "\\$&"), "i"),
    "Q06 reference must not own " + forbidden,
  );
}

for (const className of [
  ".farm-p1-page",
  ".farm-p1-grid",
  ".farm-p1-topbar",
  ".farm-p1-form-actions",
  ".farm-p1-detail-stack",
]) {
  assert.match(stylesSource, new RegExp("\\" + className + "\\b"));
}

console.log(
  "Farm P1 reference verification passed: deterministic route family, canonical composition, scoped profile, and consumer-owned fixture boundary.",
);
