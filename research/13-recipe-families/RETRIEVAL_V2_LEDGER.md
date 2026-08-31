# Retrieval V2 Ledger

Status: PASS.

All byte counts below are raw bytes from files actually read by the Node
loader. `taskSpecificBytes` excludes the shared `index.json` and includes the
recipe shard plus selected component (and supporting, when applicable) bytes.

Historical compact runtime baseline: `84,135` bytes per scenario.

## Entity List regression

| Scenario           | Index | Recipe | Components | Actual total | Task-specific | Full catalog fallback | Conditional included/omitted |
| ------------------ | ----: | -----: | ---------: | -----------: | ------------: | --------------------: | ---------------------------: |
| Invoice list       | 1,315 |  2,688 |      2,638 |        6,641 |         5,326 |                     0 |                        6 / 0 |
| Customer directory | 1,315 |  2,688 |      1,255 |        5,258 |         3,943 |                     0 |                        1 / 5 |
| Exception queue    | 1,315 |  2,688 |      2,399 |        6,402 |         5,087 |                     0 |                        5 / 1 |

Historical logical task slices remain recorded in the benchmark evidence and
are not confused with the actual file-read measurement:

```text
invoice-list       6,294 bytes logical historical slice
customer-directory 4,367 bytes logical historical slice
exception-queue    5,950 bytes logical historical slice
```

Composition and conditional omissions are identical to the historical Entity
List baseline for all three scenarios.

## Entity Detail family proof

| Scenario                | Index | Recipe | Components | Actual total | Task-specific | Full catalog fallback | Conditional included/omitted |
| ----------------------- | ----: | -----: | ---------: | -----------: | ------------: | --------------------: | ---------------------------: |
| D1 operational record   | 1,315 |  2,877 |      2,825 |        7,017 |         5,702 |                     0 |                        7 / 2 |
| D2 read-only record     | 1,315 |  2,877 |      1,317 |        5,509 |         4,194 |                     0 |                        5 / 4 |
| D3 investigation record | 1,315 |  2,877 |      2,540 |        6,732 |         5,417 |                     0 |                        6 / 3 |

## Invariants

| Measure                               | Entity List | Entity Detail |
| ------------------------------------- | ----------: | ------------: |
| Agent-owned covered anatomy decisions |           0 |             0 |
| Source implementation reads           |           0 |             0 |
| Donor reads                           |           0 |             0 |
| Local primitives                      |           0 |             0 |
| Parallel design systems               |           0 |             0 |
| Contract violations                   |           0 |             0 |
| Full-catalog fallback                 |           0 |             0 |

The machine-readable evidence is
`research/13-recipe-families/evidence/retrieval-results.json`.
