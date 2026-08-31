# Family Decision Ledger

Status: PASS.

The ledger records which layer owns each covered decision. The common kernel
owns normalization and output shape. Family policy owns only the conditional
decision value. The consumer owns domain data and behavior.

## Ownership rules

| Decision surface                                    | Owner                    | Evidence                                   |
| --------------------------------------------------- | ------------------------ | ------------------------------------------ |
| Recipe identity and family                          | Canonical contract       | `packages/contracts/src/*.ts`              |
| Intent merge and vocabulary validation              | Shared kernel            | `packages/agent/src/core.mjs`              |
| Required component set                              | Canonical contract       | `required` in recipe shard                 |
| Conditional component inclusion                     | Family policy            | `entityListPolicy` or `entityDetailPolicy` |
| Omitted conditional reporting                       | Shared kernel            | `resolveRecipePlan`                        |
| Loaded component status validation                  | Shared kernel            | `assertLoadedComponents`                   |
| State and responsive output                         | Shared kernel + contract | recipe metadata and normalized overrides   |
| Composition scaffold                                | Shared kernel            | `composeFromResolution`                    |
| Record rows, attributes, activity, and related data | Consumer                 | `consumerOwned` output                     |
| Filesystem source, bytes, and read paths            | Node loader              | `node.mjs` telemetry                       |

## Covered decision count

| Family                               | Policy conditional decisions | Agent-owned covered decisions |
| ------------------------------------ | ---------------------------: | ----------------------------: |
| Operational Collection / Entity List |                            6 |                             0 |
| Record / Inspection / Entity Detail  |                            9 |                             0 |

The policy decisions are deterministic functions of normalized intent and
explicit recipe inputs. There is no fallback branch that asks an agent to pick
a component manually.

## Duplication check

```text
canonical recipe resolver kernels: 1
family-specific policy objects: 2
bespoke entity-list resolver architectures: 0
bespoke entity-detail resolver architectures: 0
```

Authentication Brand Expression remains outside this kernel proof and is not
changed in this phase.
