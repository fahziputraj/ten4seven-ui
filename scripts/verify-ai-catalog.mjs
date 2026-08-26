import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const exists = (relativePath) =>
  fs.existsSync(path.join(repoRoot, relativePath));

const recipes = readJson("packages/ai/catalog/recipes.json");
const components = readJson("packages/ai/catalog/components.json");
const icons = readJson("packages/ai/catalog/icons.json");
const iconSource = fs.readFileSync(
  path.join(repoRoot, "packages/icons/src/index.tsx"),
  "utf8",
);

const requiredRecipes = [
  "dashboard",
  "entity-list",
  "entity-detail",
  "entity-form",
  "master-detail",
  "approval-queue",
  "settings",
  "report",
  "catalog",
  "product-detail",
  "checkout",
  "content-list",
  "content-detail",
  "ebook-reader",
  "auth",
  "marketing-home",
];
const requiredComponents = [
  "AppShell",
  "Sidebar",
  "Button",
  "Input",
  "Checkbox",
  "Radio",
  "Card",
  "DataTable",
  "Modal",
  "PageHeader",
  "FilterToolbar",
  "Pagination",
  "KPICluster",
  "BulkActionBar",
  "DetailDrawer",
  "EmptyState",
  "ProductCard",
];
const requiredIcons = [
  "invoice",
  "warehouse",
  "inventory",
  "stockIn",
  "stockOut",
  "transfer",
  "filter",
  "sort",
  "search",
  "export",
  "add",
  "view",
  "warning",
  "danger",
  "success",
  "book",
  "ebook",
  "author",
  "catalog",
  "category",
  "cart",
  "favorite",
  "rating",
  "preview",
];

for (const name of requiredRecipes)
  assert.ok(recipes[name], `missing recipe: ${name}`);
for (const name of requiredComponents)
  assert.ok(components[name], `missing component: ${name}`);
for (const name of requiredIcons) {
  assert.ok(icons[name], `missing icon catalog entry: ${name}`);
  assert.match(
    iconSource,
    new RegExp(`\\b${name}:`),
    `missing icon registry entry: ${name}`,
  );
}

assert.deepEqual(recipes["entity-list"].components, [
  "AppShell",
  "Sidebar",
  "PageHeader",
  "KPICluster",
  "FilterToolbar",
  "DataTable",
  "Pagination",
  "BulkActionBar",
  "DetailDrawer",
]);
assert.deepEqual(recipes.catalog.components, [
  "AppShell",
  "PageHeader",
  "Input",
  "ProductCard",
  "Pagination",
]);
assert.equal(components.DataTable.status, "available");
assert.equal(components.PageHeader.status, "available");
assert.equal(components.DetailDrawer.status, "available");
assert.equal(components.Checkbox.status, "available");
assert.equal(components.Radio.status, "available");
assert.ok(exists("packages/ai/templates/AGENTS.ten4seven.md"));
assert.ok(exists("docs/ai/APPLY_TO_EXISTING_WEB.md"));
assert.ok(exists("skills/ten4seven-ui/SKILL.md"));

const cliPath = path.join(repoRoot, "packages/ai/bin/t7ui.mjs");
const cliResult = execFileSync(
  process.execPath,
  [cliPath, "find", "inventory list"],
  {
    cwd: repoRoot,
    encoding: "utf8",
  },
);
assert.match(cliResult, /Recipe: entity-list/);
assert.match(cliResult, /DataTable/);
assert.match(cliResult, /stockIn/);
assert.match(cliResult, /DetailDrawer/);

const catalogCliResult = execFileSync(
  process.execPath,
  [cliPath, "find", "ebook store catalog"],
  {
    cwd: repoRoot,
    encoding: "utf8",
  },
);
assert.match(catalogCliResult, /Recipe: catalog/);
assert.match(catalogCliResult, /ProductCard/);
assert.match(catalogCliResult, /cart/);

console.log(
  `AI catalog verified: ${Object.keys(recipes).length} recipes, ${Object.keys(components).length} components, ${Object.keys(icons).length} semantic icons.`,
);
