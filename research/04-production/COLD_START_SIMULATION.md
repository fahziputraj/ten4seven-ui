# Cold-start AI simulation

Status: **PASS**.

`scripts/verify-reference-cold-start.mjs` constrains its read set to nine consumer-facing contracts/catalogs:

- `AGENTS.md`, `llms.txt`, and `packages/ai/templates/AGENTS.ten4seven.md`.
- `docs/ai/AI_QUICKSTART.md` and `docs/ai/APPLY_TO_EXISTING_WEB.md`.
- `packages/ai/catalog/recipes.json`, `components.json`, and `icons.json`.

It explicitly excludes donor extraction, reference-screen source, and donor
folders. Every recipe component (including optional composition) and every
referenced expressive block must have catalog status `implemented`; expressive
recipes also classify their blocks through `blockRoles` as `required`,
`recommended`, or `optional`. The public `t7ui find` CLI must return the
expected recipe, shell, role-aware block structure, and core components.

## Deterministic route retrieval

The consumer contract lists these direct local URLs: `/theme-studio`,
`/component-lab`, `/tokens`, `/components`, `/blocks`, `/blocks/hero-split`,
`/components/patterns`, `/components/tables`,
`/components/filtering-bulk-actions`, `/icons`, `/recipes`, `/recipes/cart`,
`/operations-tracker`, `/ebook-store`, and `/public-showcase`.

## Simulated prompts

| Prompt type            | Query                           | Resolved recipe  | Profile    |
| ---------------------- | ------------------------------- | ---------------- | ---------- |
| Registration Form      | `registration form`             | `auth`           | commerce   |
| Advanced Employee Form | `advanced employee form`        | `entity-form`    | enterprise |
| Operations Tracker     | `operations tracker work queue` | `entity-list`    | enterprise |
| Modal Confirmation     | `modal confirmation`            | `entity-detail`  | enterprise |
| Mobile Filter Drawer   | `mobile filter drawer`          | `entity-list`    | enterprise |
| File Upload Form       | `file upload`                   | `entity-form`    | enterprise |
| KPI Dashboard          | `KPI dashboard`                 | `dashboard`      | dashboard  |
| Public Catalog         | `public catalog`                | `catalog`        | commerce   |
| Cart Review            | `cart review`                   | `cart`           | commerce   |
| Checkout               | `checkout`                      | `checkout`       | commerce   |
| Public Showcase        | `public showcase`               | `marketing-home` | marketing  |

For Operations Tracker, the simulation reconstructs the entity-list chain: `AppShell`, `Sidebar`, `PageHeader`, `KPICluster`, optional `MilestoneTracker`, `FilterToolbar`, `DataTable`, `Pagination`, `BulkActionBar`, and `DetailDrawer`, with `RecordSummary`, `KeyValueList`, `ActivityFeed`, `Avatar`, and `StatusChip` available as canonical optional composition for cross-domain workstream detail. For Ebook, it reconstructs the public catalog chain: `PublicShell`, `NavigationMenu`, `PageHeader`, `SearchInput`, `ProductGrid`, `ProductCard`, and `Pagination`, with `CartTrigger`, `CartPanel`, `CartLineItem`, `QuantityControl`, `Price`, `Rating`, `ProductMeta`, and `FilterDrawer` available as canonical optional composition. The separate cart recipe adds `OrderSummary` without creating a commerce-only primitive family.

For the public showcase, the simulation resolves `PublicShell`, the
`marketing-home` recipe, its required/recommended/optional block roles across
twelve expressive blocks, shared chart/carousel contracts, and semantic icons
without reading donor implementation folders.
The migration contract still preserves API calls, cart state, routing,
authentication, validation, permissions, schemas, and events. The read-limited
simulation completed **11 tasks, 9 contract/catalog reads, and 0 donor reads**.
