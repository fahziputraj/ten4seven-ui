# ten4seven UI AI quickstart

## 1. What ten4seven UI is

ten4seven UI is a token-driven React UI system. It gives an agent a small public language: `Ten4SevenProvider`, semantic typography/theme roles, canonical primitives, and semantic `T7Icon` names. It is the authority for UI implementation; donor folders are research only.

## 2. Detect an existing installation

Look for:

- `@ten4seven/tokens`, `@ten4seven/ui`, or `@ten4seven/icons` in `package.json`.
- `Ten4SevenProvider` in the app root.
- imports of `@ten4seven/ui/styles.css`, or the `theme.css` and
  `components.css` package slices.
- `T7Icon` calls using semantic names.
- `data-t7-theme`, `data-t7-mode`, `data-t7-density`, `data-t7-contrast`, or
  `data-t7-motion-preference` on a provider or CSS-first root. Legacy
  `data-density`, `data-palette`, `data-primary`, `data-accent`,
  `data-canvas`, `data-radius`, and `data-typography` may still be present on
  existing providers.

If no installation exists, read the consumer's package manager and framework first, then add the packages through its normal dependency workflow. Do not copy donor libraries into the feature.

For a packaged consumer, prefer the single private `@ten4seven/ui` artifact:
it already contains the token runtime, curated static recipe CSS, semantic icon
registry, motion runtime, self-hosted fonts, stylesheet slices, and
declarations. Do not add the workspace-only `@ten4seven/tokens` or
`@ten4seven/icons` packages alongside that artifact. The workspace may still
use those packages as internal source layers while the artifact is built.

## 3. Initialize it

```tsx
import "@ten4seven/ui/styles.css";
import { Ten4SevenProvider } from "@ten4seven/ui";

<Ten4SevenProvider
  theme="enterprise"
  preferences={{ appearance: "system", density: "default" }}
>
  <App />
</Ten4SevenProvider>;
```

Use a recipe for normal product work. For a genuine custom brand or Theme
Studio-like editor, the compatible object form remains available:
`theme={{ palette: "blue", primary: "indigo", accent: "cyan" }}`. Use typed
`ThemeOverrides` only as a bounded product-root exception after a recipe.

## 4. Select a page recipe

Start with `generated/agent-index.json`, then read the compact recipe and
component projections. For the migrated Entity List slice, inspect and compose
from the contract plane:

```bash
pnpm t7ui recipe inspect entity-list
pnpm t7ui compose entity-list
```

For recipes that are not migrated yet, search the full
`packages/ai/catalog/recipes.json`, or run:

```bash
pnpm t7ui find "operations tracker work queue"
```

For operational work, select by the operating question and required semantics,
then inspect the bounded recipe shard:

```bash
pnpm t7ui find "control tower exception next action"
pnpm t7ui recipe inspect control-tower
```

Read [OPERATIONAL_PATTERNS.md](OPERATIONAL_PATTERNS.md) before composing a
Control Tower, Process Workspace, Operational Kanban, Load Planner, Receiving
Console, Route Planner, Entity 360, Decision Workspace, Exception Queue,
Activity & Audit Stream, or Resource Forecast. These are recipes built from
canonical components, not product-specific mega-components.

Start from the closest recipe. Do not invent a new information architecture before checking the catalog.

When a page needs expressive presentation, read the recipe's `blocks` list and
its `blockRoles` classification (`required`, `recommended`, or `optional`),
then read `packages/ai/catalog/blocks.json`. Do not render every available
block by default. Use each block contract for content slots, responsive
behavior, motion, accessibility, and performance; keep interaction primitives
in `@ten4seven/ui`.

## 5. Find implemented components

Before composing layout or handling long content, apply
[Visual Proportion and Content Safety](VISUAL_PROPORTION_AND_CONTENT_SAFETY.md).
Use the shell gutter and content rail first, preserve non-shrinking action
slots, choose an explicit overflow policy, and coordinate control size roles.

Search `generated/components.compact.json` first, or run `pnpm t7ui show DataTable` when the full contract is needed. Only catalog status `implemented` is a feature API. `experimental` needs an explicit product decision; `planned` is not permission to recreate a library locally.

The catalog is also the documentation contract: use its human-facing
`displayName`, level (`foundation`, `primitive`, `component`, `pattern`),
maturity, API rows, critical states, accessibility, responsive and motion
guidance, semantic tokens, and relationships. Entry count is not a quality
signal by itself.

Use the capability family—not the visual mood—to narrow selection:

- actions: `Button`, `IconButton`, `ButtonGroup`, `ToggleButtonGroup`, `SplitButton`;
- forms: `Field`, native labelled controls, `Combobox`, `MultiSelect`, date/time controls;
- shell/navigation: `AppShell`, `Sidebar`, `TopNavigation`, `NavigationMenu`, `PublicShell`, `Breadcrumb`, `Tabs`, `CommandMenu`;
- data/workflow: `DataTable`, `RecordSummary`, `MetricCard`, `FilterToolbar`, `ApprovalPanel`;
- overlays/feedback: `Drawer`, `DetailDrawer`, `Modal`, `AlertDialog`, `Popover`, `Toast`, `StateView`;
- commerce/media: `ProductGrid`, `ProductCard`, `Price`, `Rating`, `QuantityControl`, `CartTrigger`, `CartLineItem`, `CartPanel`, `OrderSummary`, `MediaFrame`;
- charts/files: SVG chart components, `Progress`, `FileUpload`.
- expressive blocks: `Hero`, `CtaBlock`, `FeatureShowcase`, `StatsSection`,
  `LogoCloud`, `Testimonials`, `PricingSection`, `ContentShowcase`,
  `ProductShowcase`, `Carousel`, `PublicFooter`.

Read [COMPONENT_SELECTION.md](COMPONENT_SELECTION.md) for the compact decision matrix and the machine-readable catalog for exact props.

For KPI work, use `MetricCard` for one decision signal and `KPICluster` for a
small related set. Compose `TrendIndicator`, `Sparkline`, and `Progress` through
their dedicated `trend`, `chart`, and `progress` slots. Direction and business
meaning are separate: use `direction="down"` with `sentiment="positive"` when a
decrease is beneficial. Do not fabricate a delta, comparison window, target,
or historical series just to make a dashboard look richer. KPI geometry is
owned globally by the `--t7-kpi-*` token family and remains density-responsive.
Use the default bottom chart placement for dense KPI groups and
`chartPlacement="inline"` only on a sufficiently wide card. KPI icons are
direct token-sized glyphs; do not wrap them in feature-local icon tiles.

## 6. Compose the shell first

Use one shared grammar:

`AppShell → [Sidebar | TopNavigation | NavigationMenu] → [PageHeader] → bounded route content`

- Use `Sidebar` / `SidebarGroup` for private, information-dense applications.
- Use `PublicShell` with `NavigationMenu` for public, content, and commerce composition; use `TopNavigation` for flat links.
- Keep one route-level `PageHeader`; do not nest competing page headings.
- Relocate secondary navigation and filters through `MobileSidebar` or `FilterDrawer` at narrow widths.
- Use `Drawer` or `DetailDrawer` for contextual inspection, `Modal` for a focused task, and `AlertDialog` for irreversible confirmation.

## 7. Use theme tokens

Choose a `ThemeRecipe` first, then use `RuntimePreferences` for the user's
appearance, density, contrast, and motion-reduction choices. Components consume
semantic variables for surfaces, text, borders, actions, fields, status, data,
geometry, typography, motion, and elevation. Follow **theme first, component
second, local override last**.

The typed `ThemeProfile` aggregate in `packages/contracts/src/theme-profile.ts`
normalizes the existing legacy axes. `ThemeRecipe` in
`packages/contracts/src/theme-recipe.ts` coordinates that profile with an
expression and composition. `ThemeOverrides` is a typed expert escape hatch;
it is not permission to write raw palette styles in a feature.

Motion follows the same rule. Canonical components use the native `t7Motion`
role map and the provider's semantic duration contract. Custom surfaces may
import `t7Motion` from `@ten4seven/ui`; do not add local keyframes, durations,
or a second animation runtime. Respect both the shared reduced-motion policy
and `preferences.motion: "reduced"`.

### Achromatic canvas and bounded surface emphasis

The light canvas is paper-neutral by contract. Do not tint a page, app shell,
or broad route region with the chosen brand palette. Palette, chart, and status
colours belong to an object that has deliberately opted into emphasis.

Use the canonical treatment on `Card`, `MetricCard`, `Surface`, `KPICluster`
items, or the persistent `Alert` callout:

```tsx
<Card emphasis="plain">Normal reading surface</Card>
<MetricCard emphasis="soft" tone="accent" title="Customer signals" value="3" />
<MetricCard emphasis="expressive" colorway={2} title="Active lanes" value="12" />
<Card colorway={4} emphasis="solid">Categorical summary</Card>
<Surface colorway={5} emphasis="solid">Bounded spotlight</Surface>
<Card emphasis="inverse">One focal decision</Card>
```

- `plain` is the default for most records and comparisons.
- `soft` is the restrained choice for one supporting signal; use a semantic
  status tone only when the object actually represents that status.
- `solid` is deliberate for a strong KPI/summary, confirmation, spotlight, or
  critical state; do not apply it to every repeated card.
- `expressive` gives bounded data emphasis a stronger tint while retaining
  readable neutral text. `tone` selects meaning; emphasis selects intensity.
- `inverse` is a neutral high-contrast focal surface, not a Button-only color
  shortcut.

Do not create feature-local pale fills for KPI rows, callouts, or cards. The
provider emits the `surface-emphasis` variables and canonical components own
their contrast in light and dark modes. For categorical presentation,
`Card`, `MetricCard`, bounded `Surface`, and `KPICluster` items can combine
`emphasis="soft"`, `"expressive"`, or `"solid"` with `colorway={1..5}`.
For solid emphasis, these colorways follow the active
Theme Studio chart family, use accessible derived lightness plus white
text/icons, and are globally reusable; they are not Operations-only styles.
Keep `tone` independent so semantic meaning is not inferred from a series hue.
For status-first cards, omit `colorway` and use semantic `tone`; if both are
intentional, choose a compatible series hue. `Alert` remains semantic-only.
Forms, tables, shells, and ordinary repeated records stay neutral.

For shared headers, compose `AppShell`, `TopNavigation`, or `NavigationMenu`
first and keep actions as canonical `Button`/`IconButton` children in the
header action region. The shared header geometry preserves usable action
controls across density modes and narrow widths; do not introduce a separate
local header button family.

## 8. Use icons

Search `packages/ai/catalog/icons.json` by meaning: `invoice`, `warehouse`, `filter`, `search`, `export`, `add`. Render `T7Icon name="search"`; provider-specific names are implementation details.

## 9. Resolve a real system gap correctly

Do not create `CommerceButton`, a local dialog, or another parallel primitive when a capability is missing. Treat the request as a design-system gap event:

1. Search the canonical ten4seven package and catalogs.
2. Search the AAPM extraction for the generic contract.
3. Consult one donor only if the generic gap remains.
4. Normalize the behavior into `@ten4seven/ui` with tokens, accessibility, tests, and semantic icons.
5. Update the component catalog, AI contract, and provenance ledger before a consumer uses it.

Consumer feature tasks stop at step 1 and report the gap; they do not import donor code.

## 10. Verify

Run:

```bash
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

Then test the real route in a browser: meaningful content, no runtime overlay, no console errors, keyboard/focus behavior, responsive layout, and the primary interaction.

For the local proof application, open deterministic URLs directly: `/theme-studio`, `/component-lab`, `/tokens`, `/components`, `/blocks`, `/blocks/hero-split`, `/components/patterns`, `/components/tables`, `/components/filtering-bulk-actions`, `/icons`, `/recipes`, `/recipes/cart`, `/operations-tracker`, `/operational-patterns`, `/ebook-store`, and `/public-showcase`. Theme Studio, Component Lab, Library, and block routes may expose harness controls; Operations Tracker, Operational Patterns, Ebook, and Public Showcase product shells must remain production-looking. The legacy `/warehouse-inventory` alias remains accepted for existing links.
