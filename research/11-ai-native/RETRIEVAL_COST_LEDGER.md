# Retrieval Cost Ledger

Status: **MEASURED**
Verified: 2026-08-31
Benchmark root: `D:\SA\t7-independent-benchmark`
Fresh agent context: **NOT VERIFIED**

All bytes below are raw file bytes measured in the independent benchmark
workspace. The compact and legacy runtime values are repeated per scenario
because each scenario is measured as a cold-start task slice. No token or
network telemetry is inferred from these byte counts.

## Catalog inventory

| Mode    | Runtime file                          | Top-level catalog entries |       Bytes |
| ------- | ------------------------------------- | ------------------------: | ----------: |
| Compact | `generated/recipes.compact.json`      |                17 recipes |      13,024 |
| Compact | `generated/components.compact.json`   |            145 components |      71,111 |
| Compact | **Runtime total**                     |           **162 entries** |  **84,135** |
| Compact | optional `generated/agent-index.json` |           retrieval index |         823 |
| Legacy  | `legacy-catalog/recipes.json`         |                17 recipes |       9,409 |
| Legacy  | `legacy-catalog/components.json`      |            145 components |     349,078 |
| Legacy  | **Runtime total**                     |           **162 entries** | **358,487** |

The compact projection intentionally retains the catalog entry universe needed
by the current agent package while reducing the serialized contract detail
retrieved for this adoption path. The scenario-specific selected component
counts are A `9`, B `4`, and C `8`.

## Scenario cost

| Scenario               | Compact runtime bytes | Legacy runtime bytes | Compact task slice | Legacy task slice | Compact fallbacks | Legacy fallbacks | Compact commands | Legacy commands |
| ---------------------- | --------------------: | -------------------: | -----------------: | ----------------: | ----------------: | ---------------: | ---------------: | --------------: |
| A — invoice list       |                84,135 |              358,487 |              6,294 |            20,115 |                 0 |                1 |                2 |               3 |
| B — customer directory |                84,135 |              358,487 |              4,367 |            10,151 |                 0 |                1 |                2 |               3 |
| C — exception queue    |                84,135 |              358,487 |              5,950 |            18,526 |                 0 |                1 |                2 |               3 |
| **Total / aggregate**  |           **252,405** |        **1,075,461** |         **16,611** |        **48,792** |             **0** |            **3** |            **6** |           **9** |

## Ratio

```text
84,135 / 358,487 = 0.23469470301573
compact share of legacy runtime retrieval = 23.47%
reduction = 76.53%
```

The aggregate ratio is the same because all three cold-start scenarios read the
same compact/full runtime files. The compact task-specific logical slices are
also smaller in every scenario, but those slices are reported separately from
the actual files read.

## Packed artifacts and resolution

| Artifact                     | Packed bytes | External resolution result                                  |
| ---------------------------- | -----------: | ----------------------------------------------------------- |
| `@ten4seven/ui@1.0.0`        |      695,362 | Resolves from `D:\SA\t7-independent-benchmark\node_modules` |
| `@ten4seven/contracts@0.1.0` |        6,519 | Resolves from the installed external artifact tree          |
| `@ten4seven/agent@0.1.0`     |       15,925 | Resolves from the installed external artifact tree          |

The packed agent manifest resolves `@ten4seven/contracts` to `0.1.0` and the
installed manifests contain no `link:` or `workspace:` dependency. The
external workspace needed an explicit local tarball override for the private
contracts package because these packages are not registry-published. This is
an artifact-install proof, not a claim of registry-public installation.

## Isolation measurements

- Independent benchmark root outside `D:\SA\ten4seven-ui`: `true`.
- Root ten4seven workspace manifest present in benchmark: `false`.
- Source workspace imports: `0`.
- Internal implementation reads: `0`.
- Donor reads: `0`.
- Compact mode full-catalog fallbacks: `0`.
- Legacy control full-catalog fallbacks: `1` per scenario.
