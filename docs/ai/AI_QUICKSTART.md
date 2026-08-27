# ten4seven UI AI quickstart

## 1. What ten4seven UI is

ten4seven UI is a token-driven React UI system. It gives an agent a small public language: `Ten4SevenProvider`, semantic typography/theme roles, canonical primitives, and semantic `T7Icon` names. It is the authority for UI implementation; donor folders are research only.

## 2. Detect an existing installation

Look for:

- `@ten4seven/tokens`, `@ten4seven/ui`, or `@ten4seven/icons` in `package.json`.
- `Ten4SevenProvider` in the app root.
- imports of `@ten4seven/tokens/theme.css` and `@ten4seven/ui/styles.css`.
- `T7Icon` calls using semantic names.
- `data-density`, `data-palette`, `data-radius`, or `data-typography` on the provider.

If no installation exists, read the consumer's package manager and framework first, then add the packages through its normal dependency workflow. Do not copy donor libraries into the feature.

## 3. Initialize it

```tsx
import "@ten4seven/tokens/theme.css";
import "@ten4seven/ui/styles.css";
import { Ten4SevenProvider } from "@ten4seven/ui";

<Ten4SevenProvider
  theme={{
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
    typography: "modern",
  }}
>
  <App />
</Ten4SevenProvider>;
```

For a custom family, keep the preset and override only the family axes: `typography: { preset: "modern", ui: '"Brand Sans", sans-serif' }`.

## 4. Select a page recipe

Search `packages/ai/catalog/recipes.json`, or run:

```bash
pnpm t7ui find "inventory list"
```

Start from the closest recipe. Do not invent a new information architecture before checking the catalog.

When a page needs expressive presentation, read the recipe's optional `blocks`
list and then `packages/ai/catalog/blocks.json`. Use the block contract for
content slots, responsive behavior, motion, accessibility, and performance;
keep interaction primitives in `@ten4seven/ui`.

## 5. Find implemented components

Search `packages/ai/catalog/components.json`, or run `pnpm t7ui show DataTable`. Only catalog status `implemented` is a feature API. `experimental` needs an explicit product decision; `planned` is not permission to recreate a library locally.

The catalog is also the documentation contract: use its human-facing
`displayName`, level (`foundation`, `primitive`, `component`, `pattern`),
maturity, API rows, critical states, accessibility, responsive and motion
guidance, semantic tokens, and relationships. Entry count is not a quality
signal by itself.

Use the capability family—not the visual mood—to narrow selection:

- actions: `Button`, `IconButton`, `ButtonGroup`, `ToggleButtonGroup`, `SplitButton`;
- forms: `Field`, native labelled controls, `Combobox`, `MultiSelect`, date/time controls;
- shell/navigation: `AppShell`, `Sidebar`, `TopNavigation`, `Breadcrumb`, `Tabs`, `CommandMenu`;
- data/workflow: `DataTable`, `RecordSummary`, `MetricCard`, `FilterToolbar`, `ApprovalPanel`;
- overlays/feedback: `DetailDrawer`, `Modal`, `AlertDialog`, `Popover`, `Toast`, `StateView`;
- commerce/media: `ProductGrid`, `ProductCard`, `Price`, `Rating`, `QuantityControl`, `CartTrigger`, `CartLineItem`, `CartPanel`, `OrderSummary`, `MediaFrame`;
- charts/files: SVG chart components, `Progress`, `FileUpload`.
- expressive blocks: `Hero`, `CtaBlock`, `FeatureShowcase`, `StatsSection`,
  `LogoCloud`, `Testimonials`, `PricingSection`, `ContentShowcase`,
  `ProductShowcase`, `Carousel`, `PublicFooter`.

Read [COMPONENT_SELECTION.md](COMPONENT_SELECTION.md) for the compact decision matrix and the machine-readable catalog for exact props.

## 6. Compose the shell first

Use one shared grammar:

`AppShell → [Sidebar | TopNavigation] → [PageHeader] → bounded route content`

- Use `Sidebar` / `SidebarGroup` for private, information-dense applications.
- Use `TopNavigation` for public, content, and commerce composition.
- Keep one route-level `PageHeader`; do not nest competing page headings.
- Relocate secondary navigation and filters through `MobileSidebar` or `FilterDrawer` at narrow widths.
- Use `DetailDrawer` for contextual inspection, `Modal` for a focused task, and `AlertDialog` for irreversible confirmation.

## 7. Use theme tokens

Change `Ten4SevenProvider` or a theme preset first. Components consume semantic variables for appearance, palette, radius, density, elevation, typography roles, and font families. Follow **theme first, component second, local override last**.

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

For the local proof application, open deterministic URLs directly: `/theme-studio`, `/component-lab`, `/tokens`, `/components`, `/blocks`, `/blocks/hero-split`, `/components/patterns`, `/components/tables`, `/components/filtering-bulk-actions`, `/icons`, `/recipes`, `/recipes/cart`, `/warehouse-inventory`, `/ebook-store`, and `/public-showcase`. Theme Studio, Component Lab, Library, and block routes may expose harness controls; Warehouse, Ebook, and Public Showcase product shells must remain production-looking.
