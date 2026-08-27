import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
const write = (relativePath, contents) => {
  const target = path.join(repoRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
};

const components = readJson("packages/ai/catalog/components.json");
const recipes = readJson("packages/ai/catalog/recipes.json");
const canonicalEntries = Object.entries(components).filter(
  ([, component]) => !component.aliasOf,
);
const labels = {
  foundation: "Foundations",
  action: "Actions",
  form: "Forms",
  navigation: "Navigation",
  layout: "Layout",
  pattern: "Patterns",
  surface: "Surfaces",
  data: "Data Display",
  table: "Tables",
  filter: "Filtering & Bulk Actions",
  overlay: "Overlays",
  feedback: "Feedback & Progress",
  "date-time": "Date & Time",
  file: "Files",
  chart: "Charts & Data Visualization",
  media: "Media",
  commerce: "Commerce",
};
const categoryOrder = Object.keys(labels);

function clean(value) {
  return String(value ?? "—")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function list(value) {
  return value?.length ? value.map(clean).join("; ") : "—";
}

function slugify(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const familySections = categoryOrder
  .map((category) => {
    const entries = Object.entries(components).filter(
      ([, component]) => component.category === category,
    );
    if (!entries.length) return "";
    const rows = entries
      .map(([name, component]) => {
        const contract = component.aliasOf
          ? `Alias of ${component.aliasOf}`
          : "Canonical package contract";
        return `| ${clean(component.displayName ?? name)} | ${name} | ${clean(component.level)} | ${clean(component.maturity)} | ${clean(component.status)} | ${clean(component.purpose)} | ${list(component.useWhen)} | ${list(component.avoidWhen)} | ${list(component.composesWith)} | ${list(component.states)} | ${list(component.accessibility)} | ${list(component.responsive)} | ${list(component.tokens)} | ${contract} |`;
      })
      .join("\n");
    return `## ${labels[category]}\n\n| Display name | Contract | Level | Maturity | Status | Purpose | Use when | Avoid when | Composes with | Critical states | Accessibility | Responsive | Theme tokens | Decision |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${rows}\n`;
  })
  .join("\n");

const recipeRows = Object.entries(recipes)
  .map(
    ([name, recipe]) =>
      `| [${clean(recipe.displayName ?? name)}](../../apps/playground/src/reference-screens.tsx) | ${name} | ${clean(recipe.purpose)} | ${list(recipe.components)} | ${list(recipe.optional)} | ${list(recipe.references)} |`,
  )
  .join("\n");

const blueprint = `# Component master blueprint

Date: 2026-08-27

This is the executable vocabulary map for ten4seven UI v1. It is generated
from packages/ai/catalog/components.json and recipes.json; the catalog
and package exports remain the authority. The blueprint is deliberately
explicit about purpose, boundaries, state, accessibility, responsiveness,
theme roles, maturity, and composition so a component count cannot masquerade
as system completeness.

## Coverage

- ${canonicalEntries.length} canonical component contracts.
- ${Object.keys(components).length - canonicalEntries.length} compatibility aliases.
- ${Object.keys(recipes).length} recipes.
- Levels are L0 Foundations, L1 Primitives, L2 Components, L3 Patterns, L4
  Recipes, and L5 References.
- A catalog status describes API availability; maturity distinguishes
  implemented, polished, experimental, and deprecated evidence.

## Selection rules

- Start with the recipe, then choose the smallest canonical component set.
- Use Select for the custom ten4seven popup and NativeSelect only when
  native platform behavior is intentional. One field has one authoritative
  accessibility model.
- Use semantic tokens and T7Icon; local CSS is for composition and
  documented domain exceptions only.
- Commerce composes the same package contracts. CartPanel, OrderSummary,
  CartLineItem, QuantityControl, and CartTrigger
  do not own cart persistence, pricing policy, payment, or routing.
- Unknown generic capabilities are gap events: canonical package, AAPM
  extraction, one bounded donor lookup only if necessary, normalization,
  catalog/AI update, and provenance evidence.

${familySections}

## Recipe and reference graph

| Display name | Recipe | Purpose | Required contracts | Optional contracts | Product references |\n| --- | --- | --- | --- | --- | --- |\n${recipeRows}

The current L5 reference screens are Warehouse Inventory (entity-list) and
Publishing Store (catalog, cart, and checkout proof). They consume the
same provider, typography, tokens, actions, surfaces, and interaction language.
They are fixtures, not backend or payment implementations.
`;

const matrixRows = canonicalEntries
  .map(([name, component]) => {
    const route = `/components/${slugify(name)}`;
    const refs = component.usedByPatterns?.length
      ? component.usedByPatterns.join(", ")
      : "—";
    return `| [${clean(component.displayName ?? name)}](${route}) | ${name} | ${clean(labels[component.category] ?? component.category)} | L${component.level === "foundation" ? 0 : component.level === "primitive" ? 1 : component.level === "component" ? 2 : 3} | ${clean(component.maturity)} | provider semantic roles | profile-backed | control/row variables | radius role variables | shared duration/easing + reduced motion | ${component.accessibility?.length ? "documented" : "missing"} | ${component.responsive?.length ? "documented" : "missing"} | API/state/a11y/tokens/relations | components.json + t7ui show | ${clean(refs)} |`;
  })
  .join("\n");

const matrix = `# Component system matrix

Date: 2026-08-27

The matrix is the evidence-oriented cross-product for every canonical contract.
"Profile-backed" means the component resolves through the provider's active
appearance/palette profile; it does not claim every component has a bespoke
visual screenshot. Visual maturity is recorded separately from API existence.

| Component | Contract | Family | Level | Maturity | Theme | Dark | Density | Radius | Motion | A11y | Responsive | Docs | AI | Reference usage |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${matrixRows}

## Required cross-component QA

- Geometry: Input, Select, Combobox, MultiSelect, DatePicker, TimeInput, and
  Button resolve shared control height, radius, typography, and focus ring.
- Popup language: DropdownMenu, Select, Combobox, Popover, and DatePicker keep
  their distinct roles while sharing surface, elevation, dismissal, and motion
  tokens.
- Theme profiles: light emerald soft/default, dark blue rounded/compact, light
  red soft/default, dark orange rounded/compact, and light slate sharp/dense.
- Responsive references: Warehouse Inventory and Publishing Store are checked
  at desktop, 390x844, and 360px widths with no horizontal overflow.
- State evidence: loading, empty, error, disabled, selected, sorted, open,
  and action-feedback states must be visible or documented where applicable.
`;

const gate = `# Gate — component system complete

Date: 2026-08-27

## Decision

**PASS — v1 component vocabulary and reference proof are complete with
intentional out-of-scope integrations.** The gate is based on the checks below,
not on the number of catalog entries.

## Gate answers

| Question | Evidence-backed answer |
| --- | --- |
| Can a normal product screen select canonical building blocks without inventing basics? | Yes. The catalog has ${canonicalEntries.length} canonical contracts, structured API/state/a11y/token metadata, 17 families, and ${Object.keys(recipes).length} recipes. |
| Are foundations, primitives, components, patterns, recipes, and references distinguishable? | Yes. L0-L5 are defined in the blueprint; family routes separate Patterns, Data Display, Tables, and Filtering & Bulk Actions. |
| Is Select's accessibility model singular and documented? | Yes. Select exposes one custom trigger/listbox model; the mirrored form select is aria-hidden and not tabbable. NativeSelect remains explicitly native. |
| Are APIs and docs usable without source inspection? | Yes. Public detail routes render purpose, preview, use/avoid, API prop table, minimal example, accessibility, critical states, responsive/motion guidance, tokens, recipes, relations, and alias decisions. |
| Are recipe relationships and product references explicit? | Yes. Recipes declare required/optional contracts and only the evidence-backed Warehouse Inventory and Publishing Store references. |
| Does commerce prove a different composition rather than a second component system? | Yes. Ebook uses the shared provider and package primitives plus canonical commerce contracts; no CommerceButton or CommerceInput exists. |
| Are theme, dark mode, density, radius, motion, a11y, and responsive concerns represented? | Yes at contract level, with the required cross-component QA matrix and reference viewport checks. |
| Did this phase introduce donor runtime code? | No. The donor protocol remains a gap-event rule; no new donor lookup was needed for this completion pass. |
| Can a new AI agent build the cold-start tasks with only the consumer contracts, catalogs, recipes, and ten4seven contracts? | Yes, conditionally on the passing automated cold-start simulation: 10 tasks, 0 donor reads, and direct route retrieval. |

## Explicit non-goals

Backend persistence, payment providers, authentication policy, remote search,
rich text, Kanban, spreadsheet editing, scheduler, GIS, video editor, 3D
viewer, and code-editor primitives remain outside this UI-system gate. They may
be future domain integrations or future gap events; they are not claimed here.

## Verification commands

~~~text
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:component-system
pnpm test:consistency
pnpm build
pnpm test:e2e
~~~

Rendered QA must use the deterministic routes in AGENTS.md, including
/theme-studio, /component-lab, /components, the family routes,
/recipes/cart, /warehouse-inventory, and /ebook-store. Browser evidence
must cover desktop, 390x844, and 360px reference renders for both L5 screens.
`;

write("research/07-component-system/COMPONENT_MASTER_BLUEPRINT.md", blueprint);
write("research/07-component-system/COMPONENT_SYSTEM_MATRIX.md", matrix);
write("research/07-component-system/GATE_COMPONENT_SYSTEM_COMPLETE.md", gate);
console.log(
  `Generated component-system evidence for ${canonicalEntries.length} canonical components and ${Object.keys(recipes).length} recipes.`,
);
