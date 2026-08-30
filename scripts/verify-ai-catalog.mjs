import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const exists = (relativePath) =>
  fs.existsSync(path.join(repoRoot, relativePath));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const recipes = readJson("packages/ai/catalog/recipes.json");
const components = readJson("packages/ai/catalog/components.json");
const blocks = readJson("packages/ai/catalog/blocks.json");
const icons = readJson("packages/ai/catalog/icons.json");
const iconSource = read("packages/icons/src/index.tsx");
const statuses = new Set([
  "implemented",
  "experimental",
  "planned",
  "deprecated",
]);
const maturities = new Set([
  "implemented",
  "polished",
  "experimental",
  "deprecated",
]);
const levels = new Set(["foundation", "primitive", "component", "pattern"]);
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
const profiles = new Set([
  "enterprise",
  "dashboard",
  "commerce",
  "content",
  "marketing",
]);
const blockCategories = new Set([
  "Hero",
  "CTA",
  "Feature",
  "Features",
  "Stats",
  "Social proof",
  "Testimonials",
  "Pricing",
  "Content",
  "Commerce",
  "Announcement",
  "Navigation",
  "Footer",
]);

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
  "cart",
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
  "TopNavigation",
  "NavigationMenu",
  "Button",
  "IconButton",
  "Input",
  "SearchInput",
  "Checkbox",
  "Radio",
  "Combobox",
  "DatePicker",
  "TimePicker",
  "NativeTimeInput",
  "Card",
  "DataTable",
  "Table",
  "TableHeader",
  "TableBody",
  "TableRow",
  "TableHead",
  "TableCell",
  "Modal",
  "AlertDialog",
  "Popover",
  "PageHeader",
  "FilterToolbar",
  "Pagination",
  "KPICluster",
  "BulkActionBar",
  "DetailDrawer",
  "MilestoneTracker",
  "Drawer",
  "EmptyState",
  "ProductGrid",
  "ProductCard",
  "Price",
  "QuantityControl",
  "CartTrigger",
  "CartLineItem",
  "CartPanel",
  "OrderSummary",
  "FileUpload",
  "LineChart",
  "Carousel",
  "PublicShell",
  "ChartPanel",
];
const requiredBlocks = [
  "hero-split",
  "cta-contained",
  "feature-showcase",
  "stats-section",
  "logo-cloud",
  "testimonials",
  "pricing-section",
  "content-showcase",
  "product-showcase",
  "announcement-bar",
  "carousel",
  "public-footer",
];
const blockSymbols = {
  "hero-split": "Hero",
  "cta-contained": "CtaBlock",
  "feature-showcase": "FeatureShowcase",
  "stats-section": "StatsSection",
  "logo-cloud": "LogoCloud",
  testimonials: "Testimonials",
  "pricing-section": "PricingSection",
  "content-showcase": "ContentShowcase",
  "product-showcase": "ProductShowcase",
  "announcement-bar": "AnnouncementBar",
  carousel: "Carousel",
  "public-footer": "PublicFooter",
};
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
  "calendar",
  "upload",
  "command",
];

for (const name of requiredRecipes)
  assert.ok(recipes[name], `missing recipe: ${name}`);
for (const name of requiredComponents)
  assert.ok(components[name], `missing component: ${name}`);
for (const name of requiredBlocks)
  assert.ok(blocks[name], `missing expressive block: ${name}`);
for (const name of requiredIcons)
  assert.ok(icons[name], `missing icon catalog entry: ${name}`);

for (const [name, component] of Object.entries(components)) {
  assert.ok(statuses.has(component.status), `${name}: invalid status`);
  assert.ok(component.category, `${name}: category missing`);
  assert.ok(
    categories.has(component.category),
    `${name}: invalid taxonomy category`,
  );
  assert.ok(component.purpose, `${name}: purpose missing`);
  assert.ok(Array.isArray(component.useWhen), `${name}: useWhen missing`);
  assert.ok(Array.isArray(component.avoidWhen), `${name}: avoidWhen missing`);
  assert.ok(Array.isArray(component.recipes), `${name}: recipes missing`);
  assert.ok(
    Array.isArray(component.importantProps),
    `${name}: importantProps missing`,
  );
  assert.ok(
    Array.isArray(component.relatedComponents),
    `${name}: relatedComponents missing`,
  );
  assert.ok(component.source, `${name}: source missing`);
  assert.ok(component.displayName, `${name}: human-facing displayName missing`);
  assert.ok(levels.has(component.level), `${name}: invalid component level`);
  assert.ok(maturities.has(component.maturity), `${name}: invalid maturity`);
  assert.ok(
    Array.isArray(component.states) && component.states.length > 0,
    `${name}: states missing`,
  );
  assert.ok(
    Array.isArray(component.accessibility) &&
      component.accessibility.length > 0,
    `${name}: accessibility contract missing`,
  );
  assert.ok(
    Array.isArray(component.responsive),
    `${name}: responsive contract missing`,
  );
  assert.ok(
    Array.isArray(component.motion),
    `${name}: motion contract missing`,
  );
  assert.ok(
    Array.isArray(component.tokens) && component.tokens.length > 0,
    `${name}: token roles missing`,
  );
  assert.ok(Array.isArray(component.api), `${name}: structured API missing`);
  assert.ok(
    component.api.length >= component.importantProps.length,
    `${name}: API omits important props`,
  );
  for (const prop of component.api) {
    assert.ok(
      prop.name && prop.type && prop.description,
      `${name}: malformed API row`,
    );
    assert.ok("defaultValue" in prop, `${name}.${prop.name}: default missing`);
    assert.equal(
      typeof prop.required,
      "boolean",
      `${name}.${prop.name}: required missing`,
    );
  }
  assert.ok(component.example, `${name}: minimal example missing`);
  assert.ok(exists(component.source), `${name}: source does not exist`);
  assert.match(
    read(component.source),
    new RegExp(`\\b${escapeRegExp(name)}\\b`),
    `${name}: source does not expose its catalogued name`,
  );
  for (const related of component.relatedComponents)
    assert.ok(
      related === "all" || components[related],
      `${name}: unknown related component ${related}`,
    );
  for (const relationField of ["alternativeTo", "composesWith"])
    for (const relation of component[relationField] ?? [])
      assert.ok(
        components[relation],
        `${name}: unknown ${relationField} component ${relation}`,
      );
  for (const recipeName of component.usedByPatterns ?? [])
    assert.ok(
      recipes[recipeName],
      `${name}: unknown usedByPatterns recipe ${recipeName}`,
    );
}

for (const [name, block] of Object.entries(blocks)) {
  assert.ok(block.displayName, `${name}: block displayName missing`);
  assert.ok(
    blockCategories.has(block.category),
    `${name}: invalid block category`,
  );
  assert.ok(block.purpose, `${name}: block purpose missing`);
  for (const field of [
    "useWhen",
    "avoidWhen",
    "requiredComponents",
    "optionalComponents",
    "contentSlots",
    "responsive",
    "motion",
    "accessibility",
    "performance",
    "recommendedRecipes",
    "variants",
  ])
    assert.ok(
      Array.isArray(block[field]),
      `${name}: ${field} metadata missing`,
    );
  const componentNames = [
    ...block.requiredComponents,
    ...block.optionalComponents,
  ];
  assert.equal(
    new Set(componentNames).size,
    componentNames.length,
    `${name}: repeated component in block contract`,
  );
  for (const componentName of componentNames)
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `${name}: ${componentName} is not implemented`,
    );
  for (const recipeName of block.recommendedRecipes)
    assert.ok(recipes[recipeName], `${name}: unknown recipe ${recipeName}`);
  assert.ok(block.source, `${name}: block source missing`);
  assert.ok(exists(block.source), `${name}: block source does not exist`);
  assert.match(
    read(block.source),
    new RegExp(`\\b${escapeRegExp(blockSymbols[name] ?? name)}\\b`),
    `${name}: block source does not expose its source symbol`,
  );
  assert.ok(block.example, `${name}: block example missing`);
}

assert.doesNotMatch(
  JSON.stringify(components),
  /"available"/,
  "catalog must not claim the retired available status",
);
assert.doesNotMatch(
  JSON.stringify(components.Select),
  /labelled native select/i,
  "Select metadata must describe the canonical custom popup model",
);
assert.equal(components.DataTable.category, "table");
assert.equal(components.DataTableColumnPicker.category, "table");
assert.equal(components.Drawer.aliasOf, undefined);
assert.equal(components.TimeInput.aliasOf, "NativeTimeInput");
assert.equal(
  components.DateTimeInput.relatedComponents.includes("TimePicker"),
  true,
);
assert.equal(components.AppShell.category, "pattern");
assert.equal(components.ApprovalPanel.category, "pattern");
assert.equal(components.ActionFooter.category, "pattern");

for (const [name, recipe] of Object.entries(recipes)) {
  assert.ok(recipe.purpose, `${name}: purpose missing`);
  assert.ok(recipe.displayName, `${name}: human-facing displayName missing`);
  assert.ok(recipe.profiles.length > 0, `${name}: profile missing`);
  for (const profile of recipe.profiles)
    assert.ok(profiles.has(profile), `${name}: unknown profile ${profile}`);
  const componentNames = [...recipe.components, ...(recipe.optional ?? [])];
  assert.equal(
    new Set(componentNames).size,
    componentNames.length,
    `${name}: repeated component in composition`,
  );
  for (const componentName of componentNames)
    assert.equal(
      components[componentName]?.status,
      "implemented",
      `${name}: ${componentName} is not implemented`,
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
  if (recipe.shell) {
    assert.equal(
      components[recipe.shell.preferred]?.status,
      "implemented",
      `${name}: preferred shell is not implemented`,
    );
    for (const shellName of recipe.shell.alternatives ?? [])
      assert.equal(
        components[shellName]?.status,
        "implemented",
        `${name}: shell alternative is not implemented`,
      );
    assert.ok(
      recipe.shell.selectionRule,
      `${name}: shell selection rule missing`,
    );
  }
  for (const iconName of recipe.icons ?? [])
    assert.ok(icons[iconName], `${name}: unknown semantic icon ${iconName}`);
  for (const reference of recipe.references ?? [])
    assert.ok(
      ["Operations Tracker", "Publishing Store", "Public Showcase"].includes(
        reference,
      ),
      `${name}: unknown product reference ${reference}`,
    );
}

const registryNames = [
  ...iconSource.matchAll(/^  ([A-Za-z][A-Za-z0-9]*):\s*\{/gm),
]
  .map((match) => match[1])
  .sort();
assert.deepEqual(
  Object.keys(icons).sort(),
  registryNames,
  "icon catalog and local registry must stay exactly synchronized",
);
for (const [name, icon] of Object.entries(icons)) {
  assert.match(
    icon.provider,
    /^solar:/,
    `${name}: provider must remain local Solar provenance`,
  );
  assert.match(
    iconSource,
    new RegExp(`\\b${escapeRegExp(name)}:`),
    `${name}: missing icon registry entry`,
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
  "PublicShell",
  "NavigationMenu",
  "PageHeader",
  "SearchInput",
  "ProductGrid",
  "ProductCard",
  "Pagination",
]);
assert.deepEqual(recipes.cart.components, [
  "AppShell",
  "TopNavigation",
  "CartPanel",
  "OrderSummary",
]);
assert.ok(exists("packages/ai/templates/AGENTS.ten4seven.md"));
assert.ok(exists("docs/ai/APPLY_TO_EXISTING_WEB.md"));
assert.ok(exists("skills/ten4seven-ui/SKILL.md"));

const cliPath = path.join(repoRoot, "packages/ai/bin/t7ui.mjs");
const find = (query) =>
  execFileSync(process.execPath, [cliPath, "find", query], {
    cwd: repoRoot,
    encoding: "utf8",
  });

const inventoryCliResult = find("inventory list");
assert.match(inventoryCliResult, /Recipe: entity-list/);
assert.match(inventoryCliResult, /DataTable/);
assert.match(inventoryCliResult, /stockIn/);
assert.match(inventoryCliResult, /DetailDrawer/);

const operationsCliResult = find("operations tracker work queue");
assert.match(operationsCliResult, /Recipe: entity-list/);
assert.match(operationsCliResult, /MilestoneTracker/);
assert.match(operationsCliResult, /ActivityFeed/);

const catalogCliResult = find("ebook store catalog");
assert.match(catalogCliResult, /Recipe: catalog/);
assert.match(catalogCliResult, /ProductGrid/);
assert.match(catalogCliResult, /ProductCard/);
assert.match(catalogCliResult, /cart/);

const cartCliResult = find("cart review");
assert.match(cartCliResult, /Recipe: cart/);
assert.match(cartCliResult, /CartPanel/);
assert.match(cartCliResult, /OrderSummary/);

const componentCliResult = execFileSync(
  process.execPath,
  [cliPath, "show", "DatePicker"],
  { cwd: repoRoot, encoding: "utf8" },
);
assert.match(componentCliResult, /"status": "implemented"/);
assert.match(
  componentCliResult,
  /"source": "packages\/ui\/src\/date-time\.tsx"/,
);

console.log(
  `AI catalog verified: ${Object.keys(recipes).length} recipes, ${Object.keys(components).length} components, ${Object.keys(blocks).length} expressive blocks, ${Object.keys(icons).length} semantic icons.`,
);
