# T7-DATAGRID-001 — Enterprise DataGrid architecture spike

Status: **NEW COMPONENT IMPLEMENTED + PROVEN (bounded first slice); advanced
capabilities DEFERRED WITH EXPLICIT REASONS**

Program: `T7-AAPM-AGENTIC-001` (Issue #3)
Gate: `T7-DATAGRID-001` (Gate 8)
Stacked baseline: `928723d9480fa6dcc0a3fc40ea675f55eb4c2b29` (`T7-ACTION-AVAILABILITY-001`)

## Decision summary

The existing `DataTable` remains the canonical read-oriented table. The
enterprise workflow evidence proves one repeated generic gap: bounded inline
editing of operational line items with typed text, number, currency, and select
controls, row dirty/saving/saved/error presentation, inline cell feedback, and
keyboard traversal. That gap is now closed by a separate public
`AdvancedDataGrid` contract and implementation.

The implementation is deliberately the smallest proven slice. It is a native
semantic table with controlled editors and consumer callbacks, not a
spreadsheet engine. No donor grid or runtime dependency was added, and no
business calculation, permission, persistence, or authorization logic moved
into the UI package.

## Evidence basis

### SOURCE

- `D:\SA\AAPM_Ecosystem\docs\ux-map\ECOSYSTEM_UI_CAPABILITY_REQUIREMENTS.md`
  defines the current `DataTable` boundary and the P1 Enterprise DataGrid
  spike. It calls out editable cells, typed numeric/currency/select editors,
  sticky identity/action columns, row state, keyboard traversal, validation,
  batch actions, large row counts, virtualization, and grouping/tree rows.
- `D:\SA\AAPM_Ecosystem\docs\handoffs\TEN4SEVEN_UI_AAPM_COMPLETENESS_DEVELOPER_HANDOFF.md`
  requires a spike-first decision and explicitly allows extending `DataTable`,
  adding `AdvancedDataGrid`, placing a headless engine behind a ten4seven
  contract, or keeping some workflows as table plus form composition.
- `D:\SA\AAPM_Ecosystem\docs\ux-map\erp-localhost-8080\RUNTIME_EVIDENCE.md`
  records Cash Verification detail rows with standard account, book account,
  debit, credit, job, status, and action fields, plus verify/unverify behavior.
- `D:\SA\erp_aapm_analyst\Analyst\Laporan Evaluasi Aplikasi Pihak Ketiga\enterprise-system-context\enterprise-system-context\modules\accounting\cash-verification\SYSTEM_CONTRACT.md`
  and `USE_CASES.md` describe one-row commit, split rows, link/unlink, dirty and
  saved row states, exactly-one-debit/credit validation, balanced sums, and a
  verified immutable state. These documents are static evidence and remain
  marked PARTIAL in their own scope.
- The corresponding General Journal `SYSTEM_CONTRACT.md` describes manual
  double-entry detail editing, typed amounts, balance validation, and verified
  immutability. It is evidence of repeated interaction shape, not a request to
  move accounting rules into ten4seven.

### OBSERVED

- `DataTable` is a native table with sorting, selection, loading/error/empty
  states, density, column visibility, responsive scroll/stacked modes, and
  simple sticky columns. Its `render` function is presentation-only and has no
  editor, row lifecycle, cell-error, or keyboard-grid contract.
- Existing `Input`, `NumberInput`, `CurrencyInput`, `Select`, `Checkbox`, and
  `IconButton` contracts provide the generic control anatomy needed by the
  bounded first slice.
- The current catalog and generated projections had no implemented component
  for the repeated editable-cell behavior. A feature-local grid would violate
  the canonical ownership boundary.

## Requirement classification

| Requirement                                                                                                | Classification  | Decision / owner                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Comparable read-oriented records, sorting, selection, loading/error, visibility, normal report tables      | `READY`         | Use `DataTable`.                                                                                                          |
| Bulk actions, pagination, narrow-screen table plus form/drawer, consumer-supplied summary/totals           | `COMPOSE`       | Compose `DataTable` or `AdvancedDataGrid` with `BulkActionBar`, `Pagination`, a form/drawer, and a consumer-owned footer. |
| Repeated text/number/currency/select editors across operational line items                                 | `COMPONENT GAP` | Implemented in the bounded `AdvancedDataGrid` slice.                                                                      |
| Inline cell validation display, dirty/saving/saved/error row presentation, explicit row save/cancel intent | `COMPONENT GAP` | Implemented as presentation and callbacks; consumer owns the state machine and persistence.                               |
| Arrow traversal among editor cells, Escape cancel, Ctrl/Meta+Enter save                                    | `COMPONENT GAP` | Implemented and browser-proven for the bounded slice.                                                                     |
| Domain validation, debit/credit balance, split/link semantics, totals, reconciliation                      | `PRODUCT OWNED` | Consumer supplies values/errors and owns policy, calculations, persistence, and audit meaning.                            |
| Virtualization and very large row counts                                                                   | `SPIKE`         | Deferred: no quantitative row budget or runtime performance evidence was supplied.                                        |
| Grouping, tree rows, pivots, formula cells, arbitrary resize, multi-column pinning                         | `SPIKE`         | Deferred: distinct information architecture and keyboard/performance contracts require separate evidence.                 |
| Async remote editors and server-side option loading                                                        | `SPIKE`         | Deferred: transport, cancellation, loading, and authorization semantics are consumer-owned and unbounded here.            |
| Rich split/view/delete/domain actions                                                                      | `PRODUCT OWNED` | Keep as consumer composition around row/action slots; the grid only exposes save/cancel intent.                           |
| Permission and authorization meaning                                                                       | `PRODUCT OWNED` | Never infer or enforce it in the generic component.                                                                       |
| Browser/mobile platform input semantics where intentional                                                  | `NATIVE`        | Preserve native input/select semantics inside canonical wrappers.                                                         |

No requirement in this spike is left implicitly undecided. Advanced items are
explicitly deferred, not represented as a promise that `DataTable` will grow
spreadsheet behavior later.

## Candidate evaluation

| Candidate                                                         | Result                                  | Reason                                                                                                                                  |
| ----------------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| A — extend `DataTable`                                            | Rejected for this gate                  | Would make a polished read-only contract carry editor lifecycle and keyboard-grid assumptions, increasing regression and API ambiguity. |
| B — new `AdvancedDataGrid` contract with a bounded implementation | **Chosen**                              | Keeps `DataTable` stable while closing the proven repeated generic gap using existing canonical controls and a native table.            |
| C — headless grid engine behind ten4seven                         | Deferred                                | No measured row budget or proven engine requirement; adding the dependency now would create a runtime/API decision before evidence.     |
| D — table plus form/drawer composition only                       | Valid composition, not sufficient alone | Appropriate for dense mobile or domain-specific editing, but it would leave the repeated desktop inline-cell gap to each consumer.      |

## Bounded public contract

`AdvancedDataGrid` is exported from `@ten4seven/ui` and catalogued as an
implemented Tables component. Its contract includes:

- native table semantics with stable `caption`, row, and column context;
- `AdvancedDataGridColumn` presentation metadata plus optional typed
  `text`, `number`, `currency`, or bounded `select` editor;
- controlled `onCellChange(rowKey, columnKey, value)` with opaque string values;
- consumer-supplied `rowState` (`clean`, `dirty`, `saving`, `saved`, `error`)
  and nested `cellErrors`;
- optional canonical row selection, sorting, one sticky identity column, and
  one sticky action column;
- optional canonical `IconButton` save/cancel intent callbacks;
- loading, empty, error, and consumer-owned footer/summary presentation;
- arrow movement between editor cells, Escape cancel, and Ctrl/Meta+Enter save;
- a bounded horizontal scroll owner on narrow Web layouts.

The component never calculates totals, validates accounting, persists rows,
resolves permissions, fetches options, or changes row state by itself. It does
not expose a donor API or a second grid runtime.

## Explicitly deferred capabilities

The following are `DEFERRED WITH EXPLICIT REASON` for this gate:

1. **Virtualization / very large row counts** — requires a measured row-count
   budget, scroll/focus retention evidence, and performance acceptance criteria.
2. **Grouping, tree rows, and pivots** — require a distinct semantic and
   keyboard model; `HierarchyPicker` is the existing selection contract when
   the requirement is resource scope rather than tabular grouping.
3. **Arbitrary resize, reordering, and multi-column pinning** — requires a
   layout persistence and sticky-offset contract beyond the proven single
   identity/action boundary.
4. **Async remote editors** — requires consumer-owned transport, cancellation,
   loading, authorization, and option freshness semantics.
5. **Formula cells, totals, and reconciliation** — remain domain calculations
   and must be supplied by accounting/ERP consumers.
6. **Split/view/delete and workflow-specific actions** — remain product-owned
   composition and authorization, not generic row lifecycle behavior.

## Implementation and proof planes

The completion path is closed across every required plane:

```text
typed public API
  → packages/ui/src/data-grid.tsx
  → packages/ui/src/index.ts export
  → packages/ai/catalog/components.json
  → generated/components/AdvancedDataGrid.json + compact projections
  → Component Lab /components/advanced-data-grid reference fixture
  → targeted component tests and screenshots
  → responsive scroll-owner and axe proof
  → this evidence record
```

## Verification matrix

| Plane                   | Evidence                                                                                                                                                                             | Result                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Type/API                | `pnpm typecheck`                                                                                                                                                                     | PASS                                                                                                                |
| Package artifact        | `pnpm package:build`                                                                                                                                                                 | PASS                                                                                                                |
| Catalog/projections     | `pnpm contracts:generate`, `pnpm tokens:coverage`, `pnpm test:ai`, `pnpm test:component-system`                                                                                      | PASS; 150 catalog components / 144 canonical components                                                             |
| Existing contract gates | `pnpm test:contracts`, `pnpm test:component-coverage`, `pnpm test:brand-expression`, `pnpm test:recipe-family`, `pnpm test:dtcg`, `pnpm test:contrast`, `pnpm test:token-governance` | PASS                                                                                                                |
| Browser desktop         | `tests/advanced-data-grid.spec.ts` at 1440×900                                                                                                                                       | PASS; typed editors, row state/error, save intent, selection, keyboard movement, axe critical/serious = 0           |
| Browser mobile          | same test at 390×844                                                                                                                                                                 | PASS; preview remains within viewport and table owns horizontal overflow                                            |
| Format gate             | `pnpm format:check`                                                                                                                                                                  | BASELINE DEBT; existing repository-wide formatting failures remain outside this bounded change                      |
| Full test gate          | `pnpm test`                                                                                                                                                                          | BASELINE DEBT; the existing `test:slice-a` consumer cannot resolve `@ten4seven/agent`; scoped gates above are green |

## Stop audit

- No `D:\SA\aapm_prod` files, configuration, data, or runtime were touched.
- No donor UI library or new runtime dependency was introduced.
- No permission, accounting calculation, reconciliation, persistence, or
  authorization logic was implemented in the component.
- No existing semantic recipe was rewritten; `AdvancedDataGrid` is available
  for future consumer composition after its own recipe decision.
- Existing unrelated worktree and remote refs remain preserved. No push,
  merge, or auto-merge was performed.

## Completion state and next gate

```text
AdvancedDataGrid bounded editable-cell behavior:
  NEW COMPONENT IMPLEMENTED + PROVEN

Virtualization, grouping/tree, pivot, arbitrary resize/pinning, async remote
editors, totals/reconciliation, and domain actions:
  DEFERRED WITH EXPLICIT REASON

Next bounded gate:
  T7-CONTRACT-OPS-002 / Gate 9 — Operational contracts Batch 2
  Kanban + Exception Queue + Control Tower
```
