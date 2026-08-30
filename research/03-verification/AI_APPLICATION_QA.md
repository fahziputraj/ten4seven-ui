# AI application QA

Status: **PASS** for retrieval, bootstrap, deterministic routing, v1 component contracts, and cold-start recipe reproduction.

## Consumer-visible direct URLs

- Theme Studio: `http://localhost:4173/theme-studio`
- Tokens: `http://localhost:4173/tokens`
- Components: `http://localhost:4173/components`
- Icons: `http://localhost:4173/icons`
- Recipes: `http://localhost:4173/recipes`
- Operations Tracker: `http://localhost:4173/operations-tracker`
- Ebook Store Catalog: `http://localhost:4173/ebook-store`

## Retrieval proof

The public CLI resolves the intended contract without opening source or donors:

```text
pnpm t7ui find "operations tracker work queue"
→ entity-list / enterprise
→ AppShell, Sidebar, PageHeader, KPICluster, FilterToolbar, DataTable,
  Pagination, BulkActionBar, DetailDrawer

pnpm t7ui find "ebook store catalog"
→ catalog / commerce
→ PublicShell, NavigationMenu, PageHeader, SearchInput, ProductGrid,
  ProductCard, Pagination
```

`pnpm t7ui show DatePicker` returns the implemented catalog contract and its package source. The AI catalog gate rejects the retired `available` status, validates every catalog source path/export name, validates all recipe references as `implemented`, and compares the 98 catalogued semantic icons against the local registry exactly.

## Cold-start result

The executable simulation uses only `AGENTS.md`, AI contract docs, templates, and three catalogs. It verifies Operations Tracker/Ebook plus eight additional archetypes: entity detail, entity form, approval queue, report, settings, auth, ebook reader, and product detail. Every lookup resolved to its intended recipe and profile with **0 donor reads**.

The system contract tells consuming agents to preserve business logic and to stop at a missing generic capability rather than introduce a local parallel component. Canonical package → AAPM extraction → bounded donor lookup only if necessary → normalization/catalog/provenance update is a system-owner workflow, not a feature migration workflow.
