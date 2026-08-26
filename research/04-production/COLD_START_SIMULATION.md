# Cold-start AI simulation

Status: **PASS**.

The executable `scripts/verify-reference-cold-start.mjs` limits its reads to:

- `AGENTS.md` and the consumer `AGENTS.ten4seven.md` template.
- `llms.txt` and the focused AI quickstart/migration contracts.
- `packages/ai/catalog/recipes.json`.
- `packages/ai/catalog/components.json`.
- `packages/ai/catalog/icons.json`.

It does not inspect the AAPM extraction, HeroUI, Minimal, shadcnblocks, application reference source, or donor folders. It resolves:

- Direct reference URLs from `AGENTS.md`/`llms.txt`: `/theme-studio`, `/warehouse-inventory`, and `/ebook-store`.

## Task A — Inventory List

- Direct URL: `/warehouse-inventory`.
- Profile: `enterprise`.
- Recipe: `entity-list`.
- Required production composition: `AppShell`, `Sidebar`, `PageHeader`, `KPICluster`, `FilterToolbar`, `DataTable`, `Pagination`, `BulkActionBar`, `DetailDrawer`.
- Semantic domain/action meanings: warehouse, inventory, stock in/out, transfer, search, filter, sort.

## Task B — Ebook Store Catalog

- Direct URL: `/ebook-store`.
- Profile: `commerce`.
- Recipe: `catalog`.
- Required composition: `AppShell`, `PageHeader`, `Input`, `ProductCard`, `Pagination`.
- Optional composition contracts: `Checkbox`, `Radio`, `Select`, `Button`, `Badge`, `EmptyState`, `DetailDrawer`; use `FilterToolbar` only when a catalog genuinely benefits from a toolbar rather than a browse rail.
- Semantic domain/action meanings: book, ebook, publisher, catalog, category, cart, favorite, rating, search, filter, sort, preview.
- Migration boundary: preserve API, routing, cart state, auth, and business logic.

The simulation also runs the public `t7ui find` lookup for both prompts and asserts that every required component is `available`. The consuming agent can reconstruct both screen structures from the contracts without donor-library research.
