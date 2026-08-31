# Decision Count Ledger

Status: **MEASURED**
Verified: 2026-08-31
Benchmark: Independent AI Adoption Benchmark
Fresh agent context: **NOT VERIFIED**

This ledger measures post-intent anatomy decisions, not model tokens, latency,
or an observed independent-agent transcript. Compact mode is the intended
system-resolved path. Legacy mode is a deliberately explicit manual-selection
control over the same canonical `entity-list` anatomy.

## Decision definitions

|   # | Decision                  | Compact ownership rule                                                                                           |
| --: | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
|   1 | Page recipe               | System resolves `entity-list`.                                                                                   |
|   2 | Shell                     | System resolves the shell boundary from intent.                                                                  |
|   3 | Main comparison UI        | System resolves tabular comparison.                                                                              |
|   4 | Search and filter surface | Intent resolves `FilterToolbar` inclusion or omission.                                                           |
|   5 | KPI summary               | Intent resolves `KPICluster` inclusion or omission.                                                              |
|   6 | Bulk actions              | Intent resolves `BulkActionBar` inclusion or omission.                                                           |
|   7 | Detail mode               | Intent resolves `DetailDrawer` inclusion or omission.                                                            |
|   8 | Mobile behavior           | System resolves `table-scroll` for narrow comparison surfaces.                                                   |
|   9 | Required states           | System resolves the closed state vocabulary; Scenario C explicitly exercises loading, error, and filtered-empty. |

## Scenario ledger

| Scenario               | Compact resolved composition                                                                                           | Compact agent-owned decisions | Legacy manual selections | Legacy agent-owned decisions |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------: | -----------------------: | ---------------------------: |
| A — invoice list       | `AppShell → PageHeader → DataTable → Sidebar → KPICluster → FilterToolbar → Pagination → BulkActionBar → DetailDrawer` |                             0 |                        9 |                            9 |
| B — customer directory | `AppShell → PageHeader → DataTable → FilterToolbar`                                                                    |                             0 |                        4 |                            9 |
| C — exception queue    | `AppShell → PageHeader → DataTable → Sidebar → FilterToolbar → Pagination → BulkActionBar → DetailDrawer`              |                             0 |                        8 |                            9 |
| **Total**              | —                                                                                                                      |                         **0** |                   **21** |                       **27** |

The `legacy manual selections` column is the number of selected components in
the old control composition (9, 4, and 8). The legacy decision count remains
nine per scenario because the agent must still decide the nine anatomy
questions, including deliberate omissions. It is intentionally not presented
as a measured human or model interaction count.

## Interpretation

The compact path removes agent-owned anatomy choices from the benchmarked
resolution surface: `0` compact-owned versus `27` legacy-owned decisions over
three scenarios. The product benefit is consistency and reproducibility: the
consumer supplies domain data and event behavior, while the contract plane
resolves the system decisions.
