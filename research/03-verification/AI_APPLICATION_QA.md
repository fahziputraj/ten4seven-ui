# AI application QA

Status: PASS for retrieval, bootstrap, deterministic reference routing, and first production-reference composition.

Direct reference URLs used by AI agents and Playwright:

- Theme Studio: `http://localhost:4173/theme-studio`
- Warehouse Inventory: `http://localhost:4173/warehouse-inventory`
- Ebook Store Catalog: `http://localhost:4173/ebook-store`

## Test 1 — warehouse inventory list

Prompt: “Build an inventory list page for an existing warehouse React application using ten4seven UI.”

Cold-start lookup:

```text
pnpm t7ui find "inventory list"
```

Resolved without opening donor repositories:

- Recipe: `entity-list`
- Profiles: `enterprise`, `dashboard`
- Components: `AppShell`, `Sidebar`, `PageHeader`, `KPICluster`, `FilterToolbar`, `DataTable`, `Pagination`, `BulkActionBar`, `DetailDrawer`, plus `EmptyState`, `Badge`, and `Button`
- Icons: `warehouse`, `inventory`, `stockIn`, `stockOut`, `transfer`, `filter`, `sort`, `search` (the catalog also exposes export/add/view/status meanings)

Context used: `AGENTS.md`, `docs/ai/AI_QUICKSTART.md`, one recipe entry, the required component entries, and the required icon entries. Source components opened: 0. Donor repositories needed: 0.

## Test 2 — ebook store catalog migration

Prompt: “Restyle an ebook store catalog to ten4seven UI without modifying business logic.”

Cold-start lookup:

```text
pnpm t7ui find "ebook store catalog"
```

Resolved:

- Recipe: `catalog`
- Profiles: `commerce`, `content`
- Components: `AppShell`, `PageHeader`, `Input`, `ProductCard`, `Pagination`, plus `Checkbox`, `Radio`, `Select`, `Button`, `Badge`, `EmptyState`, and `DetailDrawer`
- Icons: `book`, `ebook`, `catalog`, `category`, `cart`, `favorite`, `rating`, `search`

The migration playbook explicitly preserves API calls, cart state, routing, authentication, validation, permissions, form schemas, and events. Source components opened: 0. Donor repositories needed by the cold-start consumer: 0. The storefront refinement changed only composition, action feedback, normalized selection controls, Indonesian fixture data, and deterministic local editorial SVG fixtures.

## Bootstrap test

`t7ui agents init` created `AGENTS.md` in an empty consumer directory. When `AGENTS.md` already existed, it created `AGENTS.ten4seven.md`; a subsequent run reported the target as not overwritten.

## Efficiency conclusion

The normal consuming Agent can resolve the page archetype, complete component composition, semantic icons, theme-first rule, and business-logic boundary from the short agent contract, AI guides, catalogs, and CLI. The Warehouse and Ebook reference surfaces were then reproduced from those contracts without reopening AAPM, HeroUI, Minimal UI, or shadcnblocks source. The implementation-only Checkbox/Radio gap event is not part of the cold-start consumer read set.
