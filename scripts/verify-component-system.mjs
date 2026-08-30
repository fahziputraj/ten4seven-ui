import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const exists = (relativePath) =>
  fs.existsSync(path.join(repoRoot, relativePath));

const components = readJson("packages/ai/catalog/components.json");
const blocks = readJson("packages/ai/catalog/blocks.json");
const recipes = readJson("packages/ai/catalog/recipes.json");
const canonical = Object.entries(components).filter(
  ([, component]) => !component.aliasOf,
);
const categories = new Set([
  "foundation",
  "action",
  "form",
  "navigation",
  "layout",
  "pattern",
  "surface",
  "data",
  "table",
  "filter",
  "overlay",
  "feedback",
  "date-time",
  "file",
  "chart",
  "media",
  "commerce",
]);
const levels = new Set(["foundation", "primitive", "component", "pattern"]);
const maturities = new Set([
  "implemented",
  "polished",
  "experimental",
  "deprecated",
]);
const relationFields = ["alternativeTo", "composesWith"];

assert.equal(
  canonical.length,
  139,
  "canonical component count changed; update evidence intentionally",
);
assert.equal(
  Object.keys(components).length,
  145,
  "component catalog count changed; update evidence intentionally",
);
assert.equal(
  Object.keys(recipes).length,
  17,
  "recipe count changed; update evidence intentionally",
);

assert.equal(
  Object.keys(blocks).length,
  12,
  "expressive block count changed; update evidence intentionally",
);

for (const [name, component] of Object.entries(components)) {
  assert.ok(categories.has(component.category), `${name}: invalid taxonomy`);
  assert.ok(levels.has(component.level), `${name}: level missing or invalid`);
  assert.ok(
    maturities.has(component.maturity),
    `${name}: maturity missing or invalid`,
  );
  assert.ok(component.displayName, `${name}: displayName missing`);
  assert.ok(component.purpose, `${name}: purpose missing`);
  assert.ok(component.example, `${name}: example missing`);
  assert.ok(component.states?.length, `${name}: states missing`);
  assert.ok(component.accessibility?.length, `${name}: accessibility missing`);
  assert.ok(
    component.responsive?.length,
    `${name}: responsive metadata missing`,
  );
  assert.ok(component.motion?.length, `${name}: motion metadata missing`);
  assert.ok(component.tokens?.length, `${name}: token metadata missing`);
  assert.ok(
    component.api?.length >= component.importantProps.length,
    `${name}: API rows incomplete`,
  );
  for (const prop of component.api) {
    assert.equal(typeof prop.name, "string", `${name}: API prop name invalid`);
    assert.equal(
      typeof prop.type,
      "string",
      `${name}.${prop.name}: API type invalid`,
    );
    assert.equal(
      typeof prop.description,
      "string",
      `${name}.${prop.name}: API description invalid`,
    );
    assert.ok(
      "defaultValue" in prop,
      `${name}.${prop.name}: API default missing`,
    );
    assert.equal(
      typeof prop.required,
      "boolean",
      `${name}.${prop.name}: API required missing`,
    );
  }
  for (const field of relationFields)
    for (const related of component[field] ?? [])
      assert.ok(components[related], `${name}: ${field} points to ${related}`);
  for (const recipeName of component.usedByPatterns ?? [])
    assert.ok(
      recipes[recipeName],
      `${name}: usedByPatterns points to ${recipeName}`,
    );
  assert.ok(exists(component.source), `${name}: source missing`);
  assert.match(
    read(component.source),
    new RegExp(`\\b${name}\\b`),
    `${name}: source symbol missing`,
  );
}

assert.equal(components.Select.category, "form");
assert.equal(
  components.Select.alternativeTo.join(","),
  "NativeSelect,Combobox",
);
assert.equal(components.NativeSelect.alternativeTo.join(","), "Select");
assert.equal(components.DataTable.category, "table");
assert.equal(components.DataTableColumnPicker.category, "table");
assert.equal(components.AppShell.category, "pattern");
assert.equal(components.ApprovalPanel.category, "pattern");
assert.equal(components.ActionFooter.category, "pattern");
assert.doesNotMatch(
  JSON.stringify(components.Select),
  /labelled native select/i,
);
assert.doesNotMatch(
  read("apps/playground/src/reference-screens.tsx"),
  /Commerce(Button|Input)/,
);

for (const [name, recipe] of Object.entries(recipes)) {
  assert.ok(recipe.displayName, `${name}: displayName missing`);
  assert.ok(recipe.purpose, `${name}: purpose missing`);
  const allComponents = [...recipe.components, ...(recipe.optional ?? [])];
  assert.equal(
    new Set(allComponents).size,
    allComponents.length,
    `${name}: duplicate composition entry`,
  );
  for (const componentName of allComponents)
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `${name}: ${componentName} is not implemented`,
    );
  for (const reference of recipe.references ?? [])
    assert.ok(
      ["Operations Tracker", "Publishing Store", "Public Showcase"].includes(
        reference,
      ),
      `${name}: reference is not evidence-backed`,
    );
  for (const blockName of recipe.blocks ?? [])
    assert.ok(
      blocks[blockName],
      `${name}: unknown expressive block ${blockName}`,
    );
  if (recipe.blockRoles) {
    const roleNames = [
      ...(recipe.blockRoles.required ?? []),
      ...(recipe.blockRoles.recommended ?? []),
      ...(recipe.blockRoles.optional ?? []),
    ];
    for (const role of ["required", "recommended", "optional"])
      assert.ok(
        Array.isArray(recipe.blockRoles[role]),
        `${name}: ${role} block role list missing`,
      );
    assert.equal(
      new Set(roleNames).size,
      roleNames.length,
      `${name}: repeated block role entry`,
    );
    assert.deepEqual(
      [...new Set(roleNames)].sort(),
      [...new Set(recipe.blocks ?? [])].sort(),
      `${name}: block roles must classify every listed block exactly once`,
    );
  }
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
  "PublicShell",
  "NavigationMenu",
  "PageHeader",
  "SearchInput",
  "ProductGrid",
  "ProductCard",
  "Pagination",
]);
assert.equal(recipes.catalog.shell.preferred, "PublicShell");
assert.equal(recipes["marketing-home"].shell.preferred, "PublicShell");
assert.ok(recipes["marketing-home"].blocks.includes("hero-split"));
assert.deepEqual(recipes["marketing-home"].blockRoles, {
  required: ["hero-split", "cta-contained", "public-footer"],
  recommended: [
    "logo-cloud",
    "feature-showcase",
    "stats-section",
    "content-showcase",
    "testimonials",
  ],
  optional: [
    "announcement-bar",
    "product-showcase",
    "pricing-section",
    "carousel",
  ],
});
assert.deepEqual(recipes.cart.components, [
  "AppShell",
  "TopNavigation",
  "CartPanel",
  "OrderSummary",
]);

const routeSource = read("apps/playground/src/catalog-model.ts");
for (const routeFragment of [
  'label: "Patterns"',
  'label: "Data Display"',
  'label: "Tables"',
  'label: "Filtering & Bulk Actions"',
  '["application", "pattern"]',
  '["tables-filtering", "filter"]',
])
  assert.match(
    routeSource,
    new RegExp(routeFragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `taxonomy route contract missing: ${routeFragment}`,
  );

const selectSource = read("packages/ui/src/components.tsx");
assert.match(selectSource, /aria-hidden="true"/);
assert.match(selectSource, /tabIndex=\{-1\}/);
assert.match(read("packages/ui/src/forms.tsx"), /NativeSelect/);
assert.match(read("packages/ui/src/index.ts"), /export \* from "\.\/commerce"/);

for (const evidencePath of [
  "research/07-component-system/COMPONENT_MASTER_BLUEPRINT.md",
  "research/07-component-system/COMPONENT_SYSTEM_MATRIX.md",
  "research/07-component-system/GATE_COMPONENT_SYSTEM_COMPLETE.md",
]) {
  assert.ok(exists(evidencePath), `${evidencePath}: evidence file missing`);
  const evidence = read(evidencePath);
  assert.match(evidence, /Accessibility|A11y/i);
  assert.match(evidence, /Responsive/i);
  assert.match(evidence, /Select/);
  assert.match(evidence, /Operations Tracker/);
  assert.match(evidence, /Publishing Store/);
}

for (const route of [
  "/theme-studio",
  "/component-lab",
  "/components",
  "/components/patterns",
  "/components/tables",
  "/components/filtering-bulk-actions",
  "/recipes/cart",
  "/operations-tracker",
  "/ebook-store",
  "/blocks",
  "/blocks/hero-split",
  "/public-showcase",
]) {
  const contract = `${read("AGENTS.md")}\n${read("llms.txt")}\n${read("docs/ai/AI_QUICKSTART.md")}`;
  assert.match(
    contract,
    new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `documented route missing: ${route}`,
  );
}

console.log(
  `Component system verified: ${canonical.length} canonical components, ${Object.keys(components).length - canonical.length} aliases, ${Object.keys(recipes).length} recipes, ${Object.keys(blocks).length} expressive blocks, singular Select model, and explicit taxonomy/relations.`,
);
