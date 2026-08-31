# Independent AI Adoption Benchmark Results

Status: **CONDITIONAL PASS**
Verified: 2026-08-31
Scope: `entity-list` only
Fresh agent context: **NOT VERIFIED**

## Decision

The compact-first entity-list path is independently consumable from packed
artifacts and resolves the required composition differences for all three
scenarios. The consumer uses public ten4seven exports, supplies domain data
locally, and defines no local primitives or parallel theme.

The result is a **CONDITIONAL PASS**, not an unconditional release claim, for
two reasons that remain explicitly recorded:

1. this run did not establish a truly fresh-agent context; and
2. the packed agent runtime is currently Node/build-step oriented, so the
   browser consumer serializes resolver output rather than importing the
   filesystem-backed resolver directly.

The benchmark therefore proves the supported external build-time adoption path
and records the browser-safe agent export as a follow-up gap.

## Artifact and workspace proof

The consumer lives outside the product workspace at
`D:\SA\t7-independent-benchmark`. A normal pnpm install of the local packed
artifacts succeeded after the package metadata remediation recorded in
`BENCHMARK_GAPS.md`.

Verified package resolution:

- `@ten4seven/ui@1.0.0` resolved from the external `node_modules` tree;
- `@ten4seven/contracts@0.1.0` resolved from the external installed artifact;
- `@ten4seven/agent@0.1.0` resolved from the external installed artifact;
- no resolution path pointed to `D:\SA\ten4seven-ui`;
- no installed package manifest contained `link:` or `workspace:` dependencies;
- source-workspace imports, internal implementation reads, and donor reads were
  all `0`.

The external build used `@ten4seven/agent` in its Node benchmark runner and
serialized the public resolver output into the browser fixture. The browser
entrypoint imports only public `@ten4seven/ui` exports plus local scenario data
and serialized benchmark output.

## Composition proof

| Scenario               | Compact composition                                                                                                    | Conditional behavior proven                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| A — invoice list       | `AppShell → PageHeader → DataTable → Sidebar → KPICluster → FilterToolbar → Pagination → BulkActionBar → DetailDrawer` | KPI, filters, pagination, multi-select, bulk action, and drawer included.                                          |
| B — customer directory | `AppShell → PageHeader → DataTable → FilterToolbar`                                                                    | KPI, persistent sidebar, pagination, selection, bulk action, and drawer omitted; row navigation is consumer-owned. |
| C — exception queue    | `AppShell → PageHeader → DataTable → Sidebar → FilterToolbar → Pagination → BulkActionBar → DetailDrawer`              | KPI omitted; high-density table, selection, bulk action, drawer, and explicit state controls included.             |

All three scaffolds passed the integrity check: no `rows`, `columns`,
`permissions`, `persistence`, `handlers`, or `fetch` keys leaked into the
resolver scaffold.

## Retrieval and decision result

- Compact runtime retrieval: `84,135` bytes per scenario.
- Legacy runtime retrieval: `358,487` bytes per scenario.
- Compact share of legacy: `23.47%`.
- Runtime retrieval reduction: `76.53%`.
- Aggregate compact/runtime legacy: `252,405` vs `1,075,461` bytes.
- Compact full-catalog fallbacks: `0` per scenario.
- Legacy full-catalog fallbacks: `1` per scenario.
- Compact agent-owned decisions: `0` per scenario, `0` total.
- Legacy agent-owned decisions: `9` per scenario, `27` total.
- Scenario-specific legacy manual component selections: A `9`, B `4`, C `8`.
- Compact commands: `2` per scenario; legacy commands: `3` per scenario.

The complete decision and byte accounting is in
[`DECISION_COUNT_LEDGER.md`](DECISION_COUNT_LEDGER.md) and
[`RETRIEVAL_COST_LEDGER.md`](RETRIEVAL_COST_LEDGER.md).
The raw serialized runner output is preserved at
[`evidence/benchmark-results.json`](evidence/benchmark-results.json).

## Consumer integrity

Static consumer inspection measured:

- local primitive definitions: `0`;
- hardcoded color literals in consumer CSS: `0`;
- external icon-library imports: `0`;
- copied ten4seven CSS: `false`;
- parallel theme: `false`;
- catalog contract violations: `0`.

The consumer layout stylesheet is composition-only and consumes ten4seven
variables. Rows, columns, state handlers, and interaction behavior remain
consumer-owned. The app uses semantic `T7Icon` names and canonical
`Button`, `Input`, `Select`, `Card`, `Badge`, `DataTable`, `FilterToolbar`,
`KPICluster`, `Pagination`, `BulkActionBar`, `DetailDrawer`, `StateView`, and
other public contracts.

## Browser and interaction proof

The independent app was served at `http://127.0.0.1:4184/` and checked through
the browser harness. Requested viewport sizes are listed below. The browser
driver reported a device scale factor of `0.75`, so its effective CSS viewport
was `1920 × 1200` for requested `1440 × 900`, `520 × 1125` for requested
`390 × 844`, and `1120 × 1200` for requested `840 × 900`. The requested sizes
remain the evidence names; the effective dimensions are recorded to avoid
pretending the driver used a different viewport.

| Proof                                   | Result                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Scenario A search/filter/sort           | Passed through the canonical controls and deterministic fixture.                                             |
| Scenario A selection + bulk             | Passed; `BulkActionBar` appeared with selected invoice count and Confirm/Export actions.                     |
| Scenario A quick detail                 | Passed; selecting `INV-10418` on page 2 opened `DetailDrawer`.                                               |
| Scenario A pagination                   | Passed; page 1 → page 2 exposed `INV-10418`.                                                                 |
| Scenario B search/filter/sort           | Passed; `Cipta` and `At risk` reduced the visible directory and the Customer header was sortable.            |
| Scenario B normal row navigation        | Passed; `Bumi Ternak` produced the consumer-owned route navigation boundary and no drawer.                   |
| Scenario C loading                      | Passed; the table rendered the canonical `Loading records…` row.                                             |
| Scenario C error                        | Passed; the canonical error surface exposed `Retry feed`.                                                    |
| Scenario C filtered-empty               | Passed; the canonical `No matching records` surface exposed `Clear filters`.                                 |
| Scenario C selection + quick inspection | Passed in the ready fixture; bulk and drawer contracts were visible.                                         |
| Scenario C mobile table                 | Passed; the table kept an inner horizontal scroll boundary while the page itself had no horizontal overflow. |
| Console error-level logs                | `0` after the checked interaction paths.                                                                     |

## Responsive proof

The page-level horizontal overflow check passed for all captured viewports. The
canonical responsive mode for the comparison surface was `table-scroll` on
tablet and mobile; the C mobile table check confirmed the table itself retained
an inner horizontal scroll affordance.

| Scenario               | Desktop 1440×900 | Mobile 390×844 | Tablet 840×900             | Evidence                                                                                                                                                                                                                         |
| ---------------------- | ---------------- | -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A — invoice list       | Passed           | Passed         | Not required by this slice | [`desktop`](evidence/scenario-a-desktop-1440x900.jpg), [`mobile`](evidence/scenario-a-mobile-390x844.jpg), [`detail`](evidence/scenario-a-detail-1440x900.jpg)                                                                   |
| B — customer directory | Passed           | Passed         | Not required by this slice | [`desktop`](evidence/scenario-b-desktop-1440x900.jpg), [`mobile`](evidence/scenario-b-mobile-390x844.jpg), [`navigation`](evidence/scenario-b-navigation-1440x900.jpg)                                                           |
| C — exception queue    | Passed           | Passed         | Passed                     | [`desktop`](evidence/scenario-c-desktop-1440x900.jpg), [`mobile`](evidence/scenario-c-mobile-390x844.jpg), [`tablet`](evidence/scenario-c-tablet-840x900.jpg), [`table view`](evidence/scenario-c-mobile-table-view-390x844.jpg) |

Additional C state evidence: [`loading`](evidence/scenario-c-loading-1440x900.jpg),
[`error`](evidence/scenario-c-error-1440x900.jpg), and
[`filtered empty`](evidence/scenario-c-filtered-empty-1440x900.jpg).

## Correction accounting

- Build correction rounds: `1` — the initial benchmark browser entry omitted
  `export { App }`; this was corrected in the external harness before the
  production build.
- Visual correction rounds: `0` — no visual correction was silently applied;
  the benchmark records the first valid consumer render and its evidence.

## Resulting gaps

See [`BENCHMARK_GAPS.md`](BENCHMARK_GAPS.md). The original artifact-install
failure remains recorded even though repacking and external installation now
pass. The Node-only agent runtime remains an open browser-package limitation.

## Stop condition

The benchmark is complete at this bounded scope. No additional recipes,
components, visual foundations, commits, pushes, or deployments were made as
part of this benchmark.
