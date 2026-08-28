# ten4seven UI agent contract

ten4seven UI is the canonical UI source for this repository.

Before creating UI:

1. Identify the page archetype.
2. Search `packages/ai/catalog/recipes.json` for a recipe.
3. Search `packages/ai/catalog/components.json` for canonical components.
4. Search `packages/ai/catalog/blocks.json` when the route needs reusable expressive sections.
5. Search `packages/ai/catalog/icons.json` for semantic icons.
6. Configure semantic theme tokens before writing local styles.

Only a component with catalog status `implemented` is ready for feature use.
`experimental` requires an explicit product decision; `planned` is not an API.
Use `displayName`, `level`, `maturity`, `api`, `states`, `accessibility`,
`tokens`, and relationship fields from the catalog as the contract source; a
count of entries is not a quality signal by itself.

## Shell grammar

Compose routes as:

`AppShell → [Sidebar | TopNavigation | NavigationMenu] → [PageHeader] → bounded route content`

- Use `Sidebar` (and optional `SidebarGroup`) for private, information-dense application navigation.
- Use `PublicShell` with `NavigationMenu` for public, content, and commerce contexts; use `TopNavigation` for flat links and do not give a storefront an enterprise sidebar by default.
- Use `PageHeader` for the route-level title, summary, metadata, and primary action. Do not repeat page-heading shells inside route content.
- Keep tables, filters, grids, forms, drawers, and cards inside a bounded route content region. On narrow screens move secondary navigation or filtering into `MobileSidebar` or `FilterDrawer`; do not duplicate a second mobile component system.
- Use `Drawer` as the generic contextual surface, `DetailDrawer` for record inspection, `Modal` for a focused task, and `AlertDialog` for irreversible confirmation.

Hard rules:

- Never recreate `Button`, `Input`, `Card`, `Dialog`/`Modal`, `Drawer`, `Table`, `Badge`, navigation primitives, or another catalogued component locally.
- Do not directly style colors, radius, shadows, control heights, font weights, or typography when ten4seven tokens provide them.
- Use `className` primarily for composition and layout.
- Do not import donor UI libraries into consumer features.
- A donor lookup is a design-system gap event, never normal feature work. Check canonical ten4seven, then the AAPM extraction; only then consult one donor for the missing generic behavior. Normalize the result in `@ten4seven/ui`, update the catalog and AI contract, and record provenance before a consumer uses it.
- Do not use raw Iconify provider strings in application feature code; use `T7Icon` semantic names.
- Preserve business logic, data fetching, state, validation, routing, permissions, and events when migrating an existing interface.
- Use a local override only for exceptional layout or domain-specific behavior; follow **theme first, component second, local override last**.
- Expressive page sections belong to the block layer: use `Hero`, `CtaBlock`,
  `FeatureShowcase`, `StatsSection`, `LogoCloud`, `Testimonials`,
  `PricingSection`, `ContentShowcase`, `ProductShowcase`, `Carousel`, and
  `PublicFooter` from the block catalog. Blocks compose canonical components;
  they are not a second primitive library.
- The canonical Select is a custom accessible popup with one authoritative
  trigger; use `NativeSelect` only when native platform behavior is intentional.
- Use `NativeTimeInput` for intentional platform time controls, `TimePicker` for
  the shared bounded time listbox, and `DateTimeInput` when both compose.
- Use the lightweight semantic `Table` family for readable comparison data;
  use `DataTable` when selection, sorting, pagination, or column management is
  part of the contract.
- Component taxonomy is `Foundations`, `Actions`, `Forms`, `Navigation`,
  `Layout`, `Patterns`, `Surfaces`, `Data Display`, `Tables`, `Filtering & Bulk
Actions`, `Overlays`, `Feedback & Progress`, `Date & Time`, `Files`,
  `Charts & Data Visualization`, `Media`, and `Commerce`.
- Commerce uses the same primitives as every other recipe. Use
  `QuantityControl`, `CartTrigger`, `CartLineItem`, `CartPanel`, and
  `OrderSummary` where their contracts fit; never create `CommerceButton`,
  `CommerceInput`, or another parallel primitive family.

Start with [docs/ai/AI_QUICKSTART.md](docs/ai/AI_QUICKSTART.md). For migrations use [docs/ai/APPLY_TO_EXISTING_WEB.md](docs/ai/APPLY_TO_EXISTING_WEB.md); for greenfield work use [docs/ai/NEW_PROJECT.md](docs/ai/NEW_PROJECT.md).

Before completion run `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and rendered browser QA for the affected flow.

Reference routes:

- Theme Studio: `http://localhost:4173/theme-studio`
- Component Lab: `http://localhost:4173/component-lab`
- Tokens: `http://localhost:4173/tokens`
- Components: `http://localhost:4173/components`
- Blocks: `http://localhost:4173/blocks`
- Hero block detail: `http://localhost:4173/blocks/hero-split`
- Icons: `http://localhost:4173/icons`
- Recipes: `http://localhost:4173/recipes`
- Cart recipe: `http://localhost:4173/recipes/cart`
- Patterns: `http://localhost:4173/components/patterns`
- Tables: `http://localhost:4173/components/tables`
- Filtering & Bulk Actions: `http://localhost:4173/components/filtering-bulk-actions`
- Warehouse Inventory: `http://localhost:4173/warehouse-inventory`
- Ebook Store Catalog: `http://localhost:4173/ebook-store`
- Public Showcase: `http://localhost:4173/public-showcase`

These URLs are deterministic Vite entry points and must remain refresh-safe. Theme Studio and Library routes are system/harness surfaces; Warehouse and Ebook routes must remain production-looking and must not expose fixture or cross-reference controls inside their product shells. Use the URLs for direct AI-agent and Playwright QA instead of relying on an in-app navigation sequence.
