# T7-UNIVERSAL-HARDENING-U07 — Data Display, Collections, Tables, and Hierarchy Evidence

This is the bounded evidence record for U07 of `T7-UNIVERSAL-HARDENING-001`.
It records the normalized data/collection contract plane, the bounded UI
hardening, the native-ready canary, and the validation boundary. It does not
start U08, U09, or U10 implementation work.

## 1. Coordinates

| Field                    | Evidence                                                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Repository               | `D:\\SA\\ten4seven-ui`                                                                                                     |
| Branch                   | `codex/icons-curated-solar-style`                                                                                          |
| HEAD at evidence capture | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                                                                                 |
| Parent                   | `T7-UNIVERSAL-HARDENING-001`                                                                                               |
| Queue                    | `T7-UNIVERSAL-HARDENING-U07`                                                                                               |
| Risk                     | `R2 — shared canonical data/collection contracts`                                                                          |
| Prerequisite             | U06 evidence is present and gates `PASS FOR U07`                                                                           |
| Scope                    | Data display, collections, tables, bounded grid behavior, hierarchy, adaptive metadata, native canary, showroom, and tests |
| Explicit boundary        | No U08 chart implementation, no U09 workflow/Kanban implementation, no U10 DnD/Builder/engine implementation               |
| Publication boundary     | No commit, push, PR, merge, tag, or publish was performed                                                                  |

The checkout was already materially dirty from preceding bounded queues and
existing work. Those changes, generated assets, snapshots, and unrelated
consumer work were preserved. The only new evidence document for this queue is
this file.

## 2. Inventory before

The pre-U07 inventory showed useful canonical coverage but a missing normalized
data/collection contract plane:

| Area            | Existing before U07                                                                                                                                                            | Gap or drift observed                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data display    | `KeyValueList` (DescriptionList intent), `MetricCard` (Metric/Stat intent), `ActivityFeed` (Timeline/Feed intent), tags/status and identity primitives                         | Synonyms were not represented together in a typed U07 taxonomy; no new display primitive was justified                                                                                   |
| Collections     | List was an inventory candidate, but there was no dedicated canonical `List` implementation/catalog entry/export; selection and grouping were spread across existing consumers | `SelectableList`, `GridList`, and `GroupedList` could otherwise become parallel names; large/infinite behavior lacked an explicit boundary                                               |
| Tables          | Semantic `Table` family, interactive `DataTable`, `DataTableColumnPicker`, `BulkActionBar`, and `Pagination`                                                                   | DataTable needed explicit selection modes, column priority, filtered-empty/loading-more/end states, and responsive metadata                                                              |
| Advanced grid   | Existing bounded editable `AdvancedDataGrid`                                                                                                                                   | It needed an explicit non-virtualized/Web-only boundary so it would not imply MUI X/AG Grid or spreadsheet parity                                                                        |
| Hierarchy       | Existing `TreeView` and `HierarchyPicker`                                                                                                                                      | `Tree`, `TreeGrid`, `TreeSelect`, nested lists, and outline terminology needed distinct decisions; the Tree View showroom branch was incorrectly nested under the form preview condition |
| Native boundary | `packages/native` already exposed CSS-independent contract adapters for earlier queues                                                                                         | No U07 data-collection canary set existed; no native components were created in U07                                                                                                      |
| AI/catalog      | Existing human catalog and generated component projections                                                                                                                     | There was no generated data-collection retrieval plane linking the catalog to taxonomy, ownership, adaptive strategy, and engine boundaries                                              |

Representative consumer inspection confirmed that the existing product surfaces
already use the canonical families rather than needing product-local primitives:

- Theme Studio and Component Lab are harness/system surfaces; their data
  previews remain fixture-owned.
- Operations Tracker owns query, sorting, selection, row actions, pagination,
  and bulk-operation authority while consuming `DataTable` and
  `BulkActionBar`.
- Publishing Store and Public Showcase remain composition/commerce surfaces;
  they do not receive a parallel table or list family.
- Farm reference/synthetic surfaces use `KeyValueList`, `DataTable`, and
  `ActivityFeed` within their existing consumer-owned fixture boundary.
- Auth surfaces retain their existing identity/recipe composition; U07 adds no
  auth-specific row or record component.

The source-level evidence is in `apps/playground/src/reference-screens.tsx`,
`apps/playground/src/farm-p1-reference.tsx`,
`apps/playground/src/farm-synthetic-proof.tsx`,
`apps/playground/src/component-preview-fixtures.tsx`, and the existing route
tests. Consumer behavior was not rewritten in U07.

## 3. Data display taxonomy

The typed source is `packages/contracts/src/data-collections.ts`. The display
taxonomy preserves existing canonical components and normalizes intent names as
aliases or usage guidance.

| Intent                                    | Ten4Seven canonical target            | Classification/status                     | Use boundary                                                                            |
| ----------------------------------------- | ------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Label/value facts for one record          | `KeyValueList` / DescriptionList      | `CANONICAL_COMPONENT` / `EXISTING_STABLE` | Use for readable metadata; naturally stacks on narrow surfaces                          |
| One decision signal                       | `MetricCard` / Metric/Stat            | `CANONICAL_COMPONENT` / `EXISTING_STABLE` | Consumer owns calculation and meaning; component owns hierarchy and status presentation |
| Chronological actor/action history        | `ActivityFeed` / Timeline             | `CANONICAL_COMPONENT` / `EXISTING_STABLE` | One-column readable feed; incremental loading remains consumer-controlled               |
| Metadata list / record facts              | Alias/intent of `KeyValueList`        | `ALIAS`                                   | No `MetadataList` duplicate was created                                                 |
| Tags, status, identity, code/diff display | Existing canonical display components | Existing contracts                        | U07 records their relationship without replacing their APIs                             |

Data display is not collapsed into a table. A single record's facts use a
description-list contract; cross-record comparison uses a table; actor/action
history uses a feed/timeline contract.

## 4. Collection taxonomy

`List` is the only net-new canonical collection component. It is a generic
ordered collection, not a domain list and not a virtualization engine.

| Candidate                                         | Decision                                           | Classification                                            | Canonical target/boundary                                                                      |
| ------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `List`                                            | Implemented generic ordered collection             | `ADAPTIVE` / `EXISTING_STABLE` in the U07 inventory plane | `packages/ui/src/collections.tsx` and `@ten4seven/ui` export                                   |
| `SelectableList`                                  | Selection mode of List                             | `COMPONENT_VARIANT` / `VARIANT`                           | `List selectionMode="single"` or `"multiple"`                                                  |
| `GridList`                                        | Spatial recipe/layout of List                      | `COMPONENT_VARIANT` / `VARIANT`                           | Use List or a product block/recipe; no styling-only primitive                                  |
| `GroupedList`                                     | Grouped composition around one collection contract | `COMPONENT_VARIANT` / `VARIANT`                           | Compose grouped sections; preserve one selection model                                         |
| `VirtualList`                                     | Windowing/measurement adapter boundary             | `ENGINE_ADAPTER`                                          | Consumer/renderer chooses an approved vendor-neutral adapter                                   |
| `InfiniteList`                                    | Incremental loading behavior                       | `DEFERRED`                                                | Use List `loadingMore` and `endOfResults`; keep it distinct from virtualization and Pagination |
| `Feed`                                            | Display intent                                     | Existing `ActivityFeed` contract                          | No second feed primitive                                                                       |
| `UserList`, `InvoiceList`, `FarmList`, `TaskList` | Domain composition                                 | `DOMAIN_COMPOSITION`                                      | Product recipes own domain anatomy; they do not enter the canonical primitive count            |

The shared collection state vocabulary is generated from the typed plane:
`ready`, `loading`, `empty`, `filteredEmpty`, `searchEmpty`, `error`, `partial`,
`stale`, `loadingMore`, `endOfResults`, `selected`, `disabled`, `expanded`, and
`collapsed`.

## 5. Table/DataTable/DataGrid taxonomy

| Contract                                                         | Meaning                                                   | Interaction level                                                                                         | Platform/engine boundary                                                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Table`                                                          | Semantic tabular comparison with headers, rows, and cells | Readable comparison; no query/selection engine                                                            | Adaptive presentation; bounded horizontal scroll or cards as the consumer/recipe requires  |
| `DataTable`                                                      | Interactive business table                                | Sorting, filtering slots/state, selection, pagination slots, row actions, visibility, loading/empty/error | Adaptive: Web semantic table; Native record-list/detail or justified horizontal comparison |
| `AdvancedDataGrid`                                               | Existing bounded editable repeated-line-item surface      | Cell editors, row state, keyboard traversal, save/cancel actions                                          | Web-only bounded presentation; not virtualized and not an engine                           |
| `DataGrid`                                                       | High-volume/spreadsheet-like contract                     | Virtualization, resize, pinning, grouping, large row counts, advanced editing                             | `ENGINE_ADAPTER`; no implementation in U07                                                 |
| `TreeGrid`                                                       | Hierarchical tabular data                                 | Tree plus cell navigation                                                                                 | `ENGINE_ADAPTER`; never simulated by nested Tables inside TreeView                         |
| `ResponsiveTable`, `CompactTable`, `MobileTable`, `DesktopTable` | Presentation variants                                     | Layout only                                                                                               | Rejected as separate canonical components; use Table/DataTable plus an adaptive pattern    |

The implementation keeps semantic `table` markup for `Table` and `DataTable`.
It does not add `role="grid"` to a simple or business table. Grid semantics
remain reserved for a future contract whose cell-level interaction truly
requires them.

## 6. Hierarchy taxonomy

| Intent                                  | Canonical target             | Classification/status          | Contract                                                                           |
| --------------------------------------- | ---------------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| Navigate or inspect a hierarchy         | `TreeView`                   | `ADAPTIVE` / `EXISTING_STABLE` | Web `tree`/`treeitem`, expansion, level/position, selection, and keyboard movement |
| Select one or more hierarchical scopes  | `HierarchyPicker`            | `ADAPTIVE` / `EXISTING_STABLE` | Form/authorization selection with descendant/mixed-state semantics                 |
| One structural tree item                | Structural child of TreeView | `FOUNDATION`/structural role   | Not counted as a separate public primitive in the catalog                          |
| Hierarchy with columns                  | `TreeGrid`                   | `ENGINE_ADAPTER`               | Deferred until a distinct keyboard and engine contract is approved                 |
| Hierarchical selection named TreeSelect | `HierarchyPicker`            | `REJECTED_DUPLICATE`           | `TreeSelect` is an explicit rejected duplicate in `DATA_COLLECTION_GAP_DECISIONS`  |
| Nested list / outline view              | Composition or later recipe  | `RECIPE_OR_PATTERN`/`DEFERRED` | Do not add a second tree or list primitive without a new interaction contract      |

The Tree View showroom now renders the actual canonical `TreeView` fixture in
the navigation category. This corrected a harness placement defect and enabled
the Web keyboard expansion proof without changing the TreeView API.

## 7. Adaptive Web/Native strategies

The platform contract is in `packages/contracts/src/component-platform.ts`;
the native-ready data canary is in `packages/contracts/src/data-collections.ts`.
The contract shares intent, states, accessibility obligations, token families,
density, and adaptive strategy. The renderer owns DOM versus native primitives.

| Intent           | Web renderer strategy                                                                                   | Native renderer strategy                                                                      | U07 classification                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| List             | Ordered `ul`/`li`; listbox/option semantics only when selection is enabled                              | Native collection, then record-list/detail when navigation requires it                        | `ADAPTIVE`, `ALTERNATE_PATTERN`                    |
| DescriptionList  | Existing KeyValueList semantic label/value presentation                                                 | Scrollable summary surface with label/value reading order                                     | `ADAPTIVE`/natural stack, `NATIVE_RENDERER` canary |
| SelectableList   | List selection mode; no separate renderer contract                                                      | List canary with touch-safe selection and native list/detail                                  | Variant of List                                    |
| DataTable        | Semantic `table`; stacked record-list pattern or bounded horizontal scroll selected by the route/recipe | Native record list/detail; priority fields become summary and remaining fields move to detail | `ADAPTIVE`, `ALTERNATE_PATTERN`                    |
| AdvancedDataGrid | Bounded native table/editor surface                                                                     | No native renderer in U07                                                                     | `WEB_ONLY`, not applicable to native               |
| TreeView         | `tree`/`treeitem`, keyboard expansion/selection                                                         | Native list/detail or drill-down path; hardware-back is part of the alternative               | `ADAPTIVE`, `ALTERNATE_PATTERN`                    |

The four reusable table recomposition patterns are represented in the typed
plane: Table → Record List, Priority Columns → Detail, bounded Horizontal
Scroll, and Table → Cards. There is no global “mobile table” component.

## 8. Components hardened

### Typed contract and registry

- Added `packages/contracts/src/data-collections.ts` as the single U07 typed
  source for five families: `DATA_DISPLAY`, `COLLECTION`, `TABLE`,
  `HIERARCHY`, and `COLLECTION_STATE`.
- Registered the plane in `packages/contracts/src/canonical.ts` and exported
  it through `packages/contracts/src/index.ts`.
- Added explicit ownership for system, consumer, and renderer responsibilities.
  The system owns semantic intent, state vocabulary, density/responsive
  strategy, accessibility obligations, and the virtualization boundary. The
  consumer owns data/query/filter/sort/page authority, permissions, row
  actions, persistence, and detail routing. The renderer owns DOM/native
  primitives and any approved windowing implementation.
- Added 11 explicit gap decisions, including variant, adapter, deferred,
  native-only, recipe, and rejected-duplicate decisions.

### List

- Added the generic `List<Row>` component in
  `packages/ui/src/collections.tsx` and exported it from `@ten4seven/ui`.
- The consumer supplies stable keys and row content. The component owns
  ordered collection semantics, controlled selection exposure, explicit
  selection/activation policy, focus/keyboard movement, loading/empty/error,
  filtered-empty, loading-more, and end-of-results presentation.
- Pointer and keyboard paths share the same `interactionMode` contract:
  `select`, `activate`, or `select-and-activate`.
- Row content may contain links/buttons; nested controls are not accidentally
  activated by row selection or activation handlers.
- Geometry and state styling use existing semantic table/surface/focus tokens;
  no List-local palette, raw shadow, or second motion runtime was introduced.

### DataTable

- Added `DataTableColumn.priority` with `primary`, `secondary`, `tertiary`,
  and `detailOnly` values for adaptive field ordering.
- Added explicit `selectionMode` (`none`, `single`, `multiple`) while
  preserving the existing `selectable` compatibility prop. Single selection
  uses grouped radio inputs; multiple selection uses checkboxes and a
  visible-record select-all model.
- Added `filteredEmptyMessage`, `hasActiveFilter`, `loadingMore`,
  `endOfResults`, `endOfResultsMessage`, and `footer` state/slot contracts.
- Projected priority metadata to table headers/cells and stacked mobile fields.
- Preserved semantic `table` markup and kept the stacked record-list
  presentation as an adaptive alternative; no ARIA grid was introduced.

### Catalog, native boundary, and showroom

- Added the implemented `List` catalog entry with intent, use/avoid guidance,
  API, state, accessibility, responsive, motion, token, relationship, and
  recipe metadata.
- Added U07 references to generated compact component projections and the
  agent retrieval index.
- Added CSS-independent native descriptors only. No `@ten4seven/native`
  component or React Native dependency was created.
- Added deterministic List/DataTable/Tree previews to Component Lab and moved
  the Tree View preview to its correct navigation branch.

U07 does not create product-profile-specific data colors or domain collection
tokens. The data plane points to the existing foundation/theme token source and
the UI projection consumes existing semantic roles. Token ownership remains:
foundation primitives → semantic roles → component geometry/state selectors;
the consumer can choose a profile/scope, but cannot create an app-local
primitive family through this queue.

## 9. Net-new canonical components

Only one net-new canonical component was added.

| Component | Intent                                                                                                                                      | Complexity level                                               | Platform   | Adaptive strategy                                                                                    | Accessibility                                                                                                                                                                     | Density                                                                        | Performance/virtualization boundary                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `List`    | Render a generic ordered collection with optional selection while leaving data, row meaning, fetching, and business actions to the consumer | Catalog `level: component`; semantic collection, not an engine | `ADAPTIVE` | Web collection → native collection or list/detail; consumer chooses recipe-level record presentation | Accessible name, ordered structure, listbox/option selection semantics when applicable, disabled/selected state, keyboard movement, loading/empty announcements, non-color status | `compact`, `regular`, `comfortable`; row geometry reads semantic density roles | Bounded/medium collections are supported directly. Large counts require consumer-owned windowing behind the normalized adapter boundary; U07 makes no virtualization claim |

`ListItem` was not added as a second public primitive. `renderItem` receives a
small typed context (`index`, `selected`, `disabled`) so product row anatomy
remains consumer-owned without recreating a primitive library.

`DataTable`, `TreeView`, `KeyValueList`, `MetricCard`, `ActivityFeed`, and the
other entries in the U07 plane are existing canonical components that were
classified, linked, or hardened; they are not additional canonical count.

## 10. Engine adapter decisions

| Capability                    | U07 decision                                                                 | Public API consequence                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Virtualization/windowing      | Define `consumer-owned-windowing` and `normalized-engine-adapter` boundaries | Do not implement a virtualizer or expose a vendor API                                                    |
| `VirtualList`                 | `ENGINE_ADAPTER`                                                             | Use List semantics plus an approved adapter when row count/measurement requires it                       |
| `DataGrid`                    | `ENGINE_ADAPTER`                                                             | DataTable remains the bounded business-table contract; a grid engine must sit behind a Ten4Seven adapter |
| `TreeGrid`                    | `ENGINE_ADAPTER`                                                             | Do not simulate hierarchy-plus-cell navigation with nested tables                                        |
| Existing AdvancedDataGrid     | Harden bounded editor semantics only                                         | Explicit Web-only, non-virtualized, non-MUI-X/AG-Grid parity boundary                                    |
| Column resize/pinning/reorder | Reorder is deferred; pinning/resizing remain engine territory                | No new handles or DnD runtime in U07                                                                     |
| Swipe actions                 | Native-only gap decision                                                     | Essential actions stay visible; destructive gesture needs an explicit confirmation/undo contract         |

The adapter direction is Consumer → Ten4Seven semantic contract → Ten4Seven
adapter → engine. The inverse direct consumer → vendor engine path is not
introduced.

## 11. Rejected duplicates

- `SelectableList` is a `List` selection variant.
- `GridList` is a List layout/recipe choice, not a parallel primitive.
- `GroupedList` is a composition around one collection contract until a distinct
  grouped keyboard/selection model is proven.
- `TreeSelect` is a rejected duplicate of `HierarchyPicker`.
- `ResponsiveTable`, `MobileTable`, `CompactTable`, and `DesktopTable` are not
  canonical names; use Table/DataTable plus the selected adaptive pattern.
- `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` remain
  structural Web children, not another table system.
- Domain names such as `UserList`, `InvoiceList`, `FarmList`, and `TaskList`
  remain domain compositions/recipes.

The generated component count is therefore disciplined: 171 canonical
components and 178 catalog entries after adding the one implemented List entry;
variants and aliases do not inflate canonical component count.

## 12. Bulk-selection/action model

Selection authority remains consumer-owned. The canonical presentation exposes
the state without deciding permissions or executing operations.

- `DataTable` supports `none`, `single`, and `multiple` selection. The legacy
  `selectable` prop maps to the existing multiple-selection behavior.
- Select-all applies to the currently visible record keys and leaves the
  consumer's off-window selection authority intact. Clearing select-all removes
  only visible keys.
- `BulkActionBar` receives the consumer's selected count, clear callback, and
  action content. Assign/export/review permissions, confirmation, execution,
  undo, and persistence remain consumer-owned.
- The Operations Tracker composition is the representative proof: it passes
  selection into DataTable, derives the count for BulkActionBar, and owns the
  row detail action and operation callbacks.
- On narrow surfaces, bulk actions remain an adaptive action region; essential
  row actions are not hidden behind an undocumented swipe gesture.

## 13. Responsive table patterns

The typed plane records four reusable patterns and a native detail alternative.

| Pattern                       | Use when                                                                      | U07 evidence                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| A — Table → Record List       | Rows are more important than simultaneous column comparison on narrow screens | DataTable stacked presentation and native DataTable canary                                |
| B — Priority Columns → Detail | One or two fields identify the record and the rest need inspection            | `DataTableColumn.priority` and `priority-columns-to-detail` metadata                      |
| C — Bounded Horizontal Scroll | Wide comparison is the task, such as financial or operational matrices        | Existing DataTable/AdvancedDataGrid scroll-owner contracts; page itself remains bounded   |
| D — Table → Cards             | A small comparison set reads better as labelled cards                         | Responsive pattern metadata; consumer/recipe chooses it rather than a global mobile table |

Desktop table headers and cells carry priority metadata. Stacked rows retain
the same field meaning and use the same semantic labels. The Web proof at
390px reports no document-level horizontal overflow for List and DataTable;
AdvancedDataGrid keeps its intentional overflow inside its bounded scroll
owner.

## 14. Native canary

`NATIVE_DATA_COLLECTION_CANARY` is projected from the typed U07 plane. The
descriptors are JS/TS data and do not parse CSS. `packages/native/src/index.ts`
adds only `resolveNativeDataCollection` and a descriptor type; it does not add
native components.

| Canary            | Source intent  | Native primitive descriptor | Presentation            | Strategy            | Accessibility/behavior proof                                                                     |
| ----------------- | -------------- | --------------------------- | ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| `List`            | `List`         | `FlatList`                  | `native-collection`     | `ALTERNATE_PATTERN` | Labelled collection, selected state, loading/empty announcements, native list/detail alternative |
| `DescriptionList` | `KeyValueList` | `ScrollView`                | `native-scroll-surface` | `NATIVE_RENDERER`   | Label/value association, reading order, optional action labels                                   |
| `SelectableList`  | `List` variant | `FlatList`                  | `native-collection`     | `ALTERNATE_PATTERN` | Selected/multiple-selected state and touch-safe row actions                                      |
| `DataTable`       | `DataTable`    | `FlatList`                  | `native-list-detail`    | `ALTERNATE_PATTERN` | Record identity, field/value association, sort/selection/loading/error state, priority fields    |
| `Tree`            | `TreeView`     | `SectionList`               | `native-list-detail`    | `ALTERNATE_PATTERN` | Hierarchy path/level, expanded/selected state, drill-down and hardware-back intent               |

The native canary key set is exactly `List`, `DescriptionList`,
`SelectableList`, `DataTable`, and `Tree`. Native renderer implementation is a
future bounded queue; this queue proves the shared intent and mapping contract.

## 15. Performance proof

U07 records bounded deterministic evidence and deliberately makes no
virtualization performance claim.

| Fixture/proof                     |                              Logical records |                                 Active rendered records | Engine/virtualization status                                 | Scroll behavior                                                                             |
| --------------------------------- | -------------------------------------------: | ------------------------------------------------------: | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Component Lab List canary         |                                            3 |                                         3 `option` rows | No engine; `consumer-owned-windowing` boundary               | 390px page has no document overflow                                                         |
| Component Lab DataTable canary    |                                            2 | 2 records in the active desktop or stacked presentation | No engine; bounded semantic table/record-list contract       | 390px page has no document overflow                                                         |
| AdvancedDataGrid canary           |                     2 bounded editable lines |                                   2 bounded editor rows | Explicitly not virtualized; `deferred-until-engine-approved` | Intentional horizontal overflow is inside `.t7-advanced-data-grid-scroll`, not the document |
| Operations Tracker consumer proof | 8 fixture workstreams, paged in the consumer |                            Consumer-visible page window | Consumer owns filtering, sort, page, and selection authority | DataTable owns semantic presentation; consumer owns query/window state                      |

The browser suites assert row counts, semantic roles, responsive overflow
metrics, and bounded scroll ownership. No frame-rate, memory, or large-volume
microbenchmark was run because U07 has no approved engine and such a result
would not prove the contract.

## 16. Showroom

The Component Lab/detail showroom now has deterministic previews for:

- `/components/list` — List selection, row state, density/tokenized geometry,
  and narrow layout;
- `/components/data-table` — semantic table and stacked record-list mapping;
- `/components/data-table-column-picker` — controlled visibility connected to
  DataTable;
- `/components/advanced-data-grid` — existing bounded editable grid proof;
- `/components/tree-view` — actual tree/treeitem fixture with expansion;
- existing Operations Tracker and Farm reference compositions — consumer-owned
  DataTable, KeyValueList, ActivityFeed, row actions, and bounded state usage.

The showroom uses small deterministic fixtures rather than a giant 50-row
table. The corrected Tree View fixture is now selected by the navigation
category branch in `apps/playground/src/component-preview-fixtures.tsx`.

## 17. Component Lab stress proof

Browser proof was run against the final package build:

- `tests/q07-data-collections-tables.spec.ts`: 3/3 passed. It proves List
  selection and keyboard movement, Tree expansion with keyboard semantics,
  semantic DataTable versus grid distinction, narrow viewport behavior, and
  serious/critical axe checks.
- `tests/q08-tables-datagrid-virtualization.spec.ts`: 3/3 passed as adjacent
  table-boundary regression coverage. It proves DataTable naming/responsive
  behavior, column-picker connection, and bounded AdvancedDataGrid behavior.
  This test was used only as U07 table regression evidence; no U08
  implementation queue was started.
- `tests/canonical-component-a11y-hardening.spec.ts --grep "DataTable rows activate"`:
  1/1 passed. It proves a selected checkbox does not accidentally activate a
  row and that keyboard row activation opens the existing detail surface.
- The existing `tests/advanced-data-grid.spec.ts` interaction/bounds assertions
  completed, including typed editors, validation, save action, selection,
  keyboard traversal, and mobile scroll ownership. Its two unrelated visual
  snapshot assertions remain stale against the inherited baseline (desktop
  4% pixel difference; mobile 3% pixel difference). U07 did not change that
  visual surface, so snapshots were not rewritten.

The U07 browser proof directly covers the final List/Tree/DataTable canaries in
light/default and narrow/mobile conditions. Dark, reduced-motion, contrast, and
broader product-surface coverage remains represented by the repository's
existing token/contrast/route suites; U07 did not expand those surfaces or
claim a new visual snapshot baseline.

## 18. AI/catalog projection

The projection source and retrieval boundary are explicit:

- Typed source: `packages/contracts/src/data-collections.ts`.
- Platform source: `packages/contracts/src/component-platform.ts`.
- Token source named by the plane: `packages/contracts/src/foundation.ts` and
  `packages/tokens/src/theme.ts`.
- Generated projection: `generated/data-collections.json` and the mirrored
  `packages/agent/generated/data-collections.json`.
- Agent entry point: `generated/agent-index.json` with
  `generated/data-collections.json` in the default retrieval order.
- Compact component references: `dataCollectionRef` is attached only to the
  U07 implemented catalog components; `verify-ai-catalog.mjs` rejects stale or
  non-U07 references.

The generated U07 projection contains 12 canonical data/collection definitions,
11 gap decisions, five taxonomy families, the exact five-item native canary,
ownership, state, density, responsive, and virtualization vocabularies. The
AI catalog remains at 171 canonical components/178 catalog entries, with List
at `status: implemented`, `level: component`, source
`packages/ui/src/collections.tsx`, and explicit alternatives to DataTable.

The AI guidance distinguishes:

- six metadata fields → DescriptionList/KeyValueList;
- sortable/interactive business records → DataTable;
- very large interactive rows → DataGrid only through an approved adapter;
- phone records → adaptive list/detail;
- hierarchy → Tree;
- hierarchy plus columns → TreeGrid adapter boundary.

The cold-start verification reported 0 donor reads. No donor CSS, theme,
colors, radius, typography, spacing, public API, or engine dependency was
introduced.

## 19. Tests

| Command                                                                                                                                           | Result/evidence                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                                                                                                         | PASS — 229 contract projections generated; theme CSS and three DTCG exports regenerated from existing typed sources                                               |
| `pnpm --filter @ten4seven/contracts typecheck`                                                                                                    | PASS                                                                                                                                                              |
| `pnpm package:build`                                                                                                                              | PASS — `@ten4seven/ui@1.0.0` built with the new List export                                                                                                       |
| `pnpm typecheck`                                                                                                                                  | PASS — contracts, native, agent, and playground typechecks/builds                                                                                                 |
| `pnpm test:contracts`                                                                                                                             | PASS — typed registry, U07 taxonomy/ownership/native projection, and generated parity                                                                             |
| `pnpm test:ai`                                                                                                                                    | PASS — 29 recipes, 178 components, 60 blocks, 122 icons; cold-start references verified                                                                           |
| `pnpm test:consistency`                                                                                                                           | PASS — 28 UI source files                                                                                                                                         |
| `pnpm test:token-governance`                                                                                                                      | PASS — no raw component colors/palette dependencies/ungoverned timing                                                                                             |
| `pnpm test:native-mobile`                                                                                                                         | PASS — CSS-independent native canary and platform metadata                                                                                                        |
| `pnpm test:component-system`                                                                                                                      | PASS — 171 canonical components, 7 aliases, taxonomy/relations                                                                                                    |
| `pnpm test`                                                                                                                                       | PASS — full repository test chain; token coverage reports 1000 existing raw-pixel occurrences as migration debt                                                   |
| `pnpm build`                                                                                                                                      | PASS — playground production build; existing large-chunk warning remains                                                                                          |
| `pnpm package:verify`                                                                                                                             | PASS — 17 root exports, bundled tokens/icons/motion, self-contained styles                                                                                        |
| `pnpm exec playwright test tests/q07-data-collections-tables.spec.ts tests/q08-tables-datagrid-virtualization.spec.ts --project=chromium`         | PASS — 6/6 tests                                                                                                                                                  |
| `pnpm exec playwright test tests/canonical-component-a11y-hardening.spec.ts --project=chromium --grep "DataTable rows activate"`                  | PASS — 1/1 test                                                                                                                                                   |
| `pnpm exec prettier --check packages/contracts/src/data-collections.ts packages/ui/src/collections.tsx tests/q07-data-collections-tables.spec.ts` | PASS — all new U07 contract/component/canary tests formatted                                                                                                      |
| `git diff --check`                                                                                                                                | PASS — only existing CRLF normalization warnings; no whitespace errors                                                                                            |
| `pnpm format:check`                                                                                                                               | FAIL against the dirty repository baseline — Prettier reported 358 files. The three new U07 files above pass targeted formatting; no broad reformat was performed |

## 20. Baseline debt

- The worktree contains substantial pre-existing edits and generated outputs;
  U07 preserved them and did not reset, clean, or normalize the checkout.
- Repository-wide Prettier remains non-green at 358 files. This is broader than
  the U07 change set; the targeted new U07 files are formatted.
- Token coverage reports 1000 raw-pixel occurrences as tracked migration debt.
  U07 adds no new raw palette, radius, shadow, or timing source.
- The production build retains the existing chunk-size warning (>500 kB). It
  is not a U07 data/collection correctness failure.
- AdvancedDataGrid visual snapshots remain an inherited baseline mismatch. The
  U07 semantic/bounds canary passes; no unrelated snapshot was updated.
- U07 performance proof is intentionally bounded. There is no evidence to claim
  virtualization, large-volume frame time, or engine parity.
- Full consumer migration is not part of U07. Operations, Farm, Publishing,
  Auth, and Public Showcase contracts were inspected as evidence; their
  business behavior and data authority were preserved.

## 21. Deferred U08/U09/U10 gaps

The following are explicitly deferred and were not implemented in this queue:

- U08: charts, advanced visualization, chart engines, and visualization-specific
  adapters. Data visualization is represented only as a taxonomy boundary where
  necessary; no chart work was mixed into U07.
- U09: full Kanban lanes, workflow productivity behavior, cross-lane semantics,
  and drag-enabled workflow compositions.
- U10: DnD runtime, column reordering, Builder interactions, high-volume
  DataGrid/TreeGrid engine adapters, swipe-action implementation, and any
  additional native renderer/components.

U07 leaves the semantic adapter boundaries and collection/card prerequisites
available for those queues without pre-empting their implementation scope.

## 22. Gate

PASS FOR U08
