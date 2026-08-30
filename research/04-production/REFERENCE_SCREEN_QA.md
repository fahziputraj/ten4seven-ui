# Reference screen QA — Gate C.2

Gate C is structurally passed. Gate C.2 retains deterministic, refresh-safe routes inside the existing Vite playground; no backend, auth, API, business-flow, or cart architecture was introduced.

| Reference           | Direct URL                                                                           | Refresh result                          |
| ------------------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| Theme Studio        | [http://localhost:4173/theme-studio](http://localhost:4173/theme-studio)             | Theme Studio heading and title restored |
| Operations Tracker  | [http://localhost:4173/operations-tracker](http://localhost:4173/operations-tracker) | Operations heading and title restored   |
| Ebook Store Catalog | [http://localhost:4173/ebook-store](http://localhost:4173/ebook-store)               | Catalog heading and title restored      |

System exploration routes are direct as well: `/tokens`, `/components`, `/icons`, and `/recipes`. `/not-a-route` renders the honest 404 surface rather than Theme Studio.

Expressive composition is verified separately at `/blocks`,
`/blocks/hero-split`, and `/public-showcase`; see
`research/09-expressive/GATE_EXPRESSIVE_DESIGN.md` and
`tests/expressive-blocks.spec.ts`.

## Operations Tracker — enterprise / entity-list

- Composition: `AppShell → Sidebar → PageHeader → KPICluster → MilestoneTracker → FilterToolbar → DataTable → Pagination → BulkActionBar → DetailDrawer`.
- Fixture: cross-domain operational workstreams covering customer intelligence, delivery checkpoints, supply/QC, finance follow-up, and fleet service, with owners, health, due dates, next actions, activity signals, and local currency/context values.
- Passed live interactions: milestone selection/detail, search, workstream/health filtering, sortable workstream headers, row selection, bulk bar, pagination, row/detail action, drawer close, loading toggle, error + retry, empty + clear search.
- Semantic treatment: one comparable work queue grammar for records from different operational domains; status, owner, next action, and recent activity remain scannable across workstreams.
- Surface behavior: desktop rows wrap the workstream hierarchy and keep the table compact; below 860px the canonical DataTable switches to stacked records so health and next action stay visible without horizontal scrolling. The drawer remains the full-detail path.

## Ebook Store Catalog — commerce / catalog

- Composition: `PublicShell` → `NavigationMenu` → `PageHeader` → primary `SearchInput` → desktop browse rail with canonical category `Button`s, `Input`, `Radio`, and `Checkbox` controls → compact sort/view controls → `ProductGrid` of cover-led `ProductCard` items using `Price`, `ProductMeta`, and `Rating` → `Pagination`; the same filter content moves into one canonical `DetailDrawer` on mobile.
- Fixture: ten realistic Indonesian publishing titles across Manajemen, Akuntansi, Pendidikan, Kesehatan, Teknologi Informasi, Hukum, and Administrasi Publik, with Indonesian prices, authors, formats, availability, ratings, restrained badges, and deterministic local editorial SVG cover fixtures.
- Passed live interactions: title/author search, browse category, author filter, price radio filter, availability checkbox filter, sort select, grid/list switch, favorite feedback, cart feedback, product detail drawer open/close, mobile filter drawer open/apply, pagination.
- Product feedback is action-driven: the initial storefront has no `Cart (0)` status or success notice; feedback appears after save/add/cart actions.
- Deliberate difference: no enterprise sidebar, KPI wall, or administrative filter toolbar; the same buttons, inputs, selects, selection controls, badges, semantic icons, surfaces, focus treatment, radius, density, and typography are reused through a publishing composition.

## Explicit route renders

The direct URLs were captured and checked at each requested size:

| Viewport     | Operations Tracker | Ebook                                                           | Horizontal overflow                          |
| ------------ | ------------------ | --------------------------------------------------------------- | -------------------------------------------- |
| `1440 × 900` | meaningful heading | meaningful heading; cover ratio `2:3` and `object-fit: contain` | none; `scrollWidth=1425`, `clientWidth=1425` |
| `390 × 844`  | meaningful heading | meaningful heading; mobile `Filters` control visible            | none; `scrollWidth=375`, `clientWidth=375`   |
| `360 × 800`  | meaningful heading | meaningful heading; two-column cover grid remains overflow-free | none; `scrollWidth=345`, `clientWidth=345`   |

Final Operations Tracker/Ebook PNG evidence is retained in
`research/05-v1/render-evidence/`; it was recaptured from the direct routes
after neutralizing the local editorial cover lettering, normalizing operations
bulk-selection copy, and correcting the Operations mobile navigation rail. The
expressive first-viewport snapshots are retained in
`tests/expressive-blocks.spec.ts-snapshots/`.

## Cross-axis checks

The live proof switched the provider to `dark + blue + rounded + compact + modern`, verified provider data attributes on both references, and returned to the accepted baseline `light + emerald + soft + default + modern`. Both references remained usable and overflow-free in the connected browser viewport.

## Accessibility notes

- Native labelled inputs/selects are used for search and filters.
- Table headers use `scope`, sortable headers expose buttons, and selection controls have row/select-all labels.
- Drawer uses dialog semantics, labelled title/description, close button, Escape, backdrop dismissal, and native focus restoration.
- Icon-only actions carry explicit accessible names.

## Intentional limitations

- Fixtures are local and deterministic; no backend or persistence is part of this proof.
- Fixtures are intentionally local. Backend integration and product-specific policies remain outside this UI proof; native focus restoration, bounded column visibility, and the stacked narrow-screen DataTable presentation are canonical behavior.
