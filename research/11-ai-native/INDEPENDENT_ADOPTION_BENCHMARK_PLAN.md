# Independent AI Adoption Benchmark Plan

Status: **EXECUTED — bounded benchmark**
Verified: 2026-08-31
Scope: `entity-list` only
Fresh agent context: **NOT VERIFIED**

## Purpose

This benchmark measures whether an independent consumer can adopt the
ten4seven UI contracts from packed artifacts and compact AI-facing projections
without reading the ten4seven source workspace, AAPM extraction, HeroUI,
Minimal, or shadcnblocks. It is a proof of adoption cost and contract
reproducibility, not a product redesign and not a claim about model token
telemetry.

The benchmark is deliberately outside the product repository at:

```text
D:\SA\t7-independent-benchmark
```

The main repository remains the evidence and contract source at:

```text
D:\SA\ten4seven-ui
```

## Boundaries

Included:

- one canonical recipe: `entity-list`;
- three deterministic domain scenarios;
- compact-first retrieval and a legacy full-catalog control;
- packed `@ten4seven/ui`, `@ten4seven/contracts`, and `@ten4seven/agent`
  artifacts installed by an independent pnpm workspace;
- consumer rendering through public ten4seven exports;
- search, filtering, sorting, selection, bulk action, row navigation, detail,
  pagination, loading, error, empty, table-scroll, and responsive checks;
- exact file, byte, catalog-entry, fallback, command, manual-selection,
  scaffold, and static consumer measurements;
- captured reference screenshots stored in this repository under `evidence/`.

Explicitly excluded:

- Brand Profile or additional recipe metadata;
- visual redesign of ten4seven foundations;
- migration of the other 17 recipes;
- new ten4seven components;
- donor lookup or donor implementation;
- commit, push, deployment, or publication of the benchmark workspace;
- a claim that the benchmark was performed in a truly fresh agent context.

## Scenarios

| ID                       | Consumer requirement                                                                                                                                                          | Deliberate composition difference                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A — `invoice-list`       | Authenticated operational invoice list with comparable records, search, status filter, KPI summary, multi-select, bulk confirmation, quick detail, and pagination.            | Full operational anatomy, including `Sidebar`, `KPICluster`, `Pagination`, `BulkActionBar`, and `DetailDrawer`.                                        |
| B — `customer-directory` | Reduced customer directory with search, simple filters, and normal row navigation.                                                                                            | Omits KPI, multi-select, bulk action, pagination, persistent sidebar, and quick-detail drawer. Row navigation ends at a consumer-owned route boundary. |
| C — `exception-queue`    | High-density exception queue with status filtering, multi-select, bulk action, quick inspection, no KPI, explicit loading/error/filtered-empty states, and tablet/mobile use. | Retains operational triage anatomy while omitting `KPICluster`; state controls exercise canonical state surfaces.                                      |

Each scenario uses eight deterministic local fixture rows. Domain rows,
columns, handlers, persistence, permissions, and fetch behavior remain in the
consumer fixture; the resolver and scaffold never receive those business-data
keys.

## Comparison modes

### Compact-first mode

1. Resolve the typed `entity-list` intent through the packed public agent.
2. Read `generated/recipes.compact.json` and
   `generated/components.compact.json` from the installed agent artifact.
3. Compose the canonical scaffold.
4. Add only domain-owned rows, columns, handlers, and layout composition in the
   consumer.

### Legacy full-catalog control

The control reads the copied compatibility fixtures
`legacy-catalog/recipes.json` and `legacy-catalog/components.json` and replays
the same scenario anatomy as explicit manual component selection. This is a
measurement control, not a second runtime used by ten4seven.

## Measurements

| Measurement                 | Definition                                                                                                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Runtime retrieval bytes     | Raw byte size of the files read for the mode per scenario.                                                                                                                           |
| Task slice bytes            | Serialized recipe plus only the components needed for that scenario.                                                                                                                 |
| Catalog entries             | Top-level entries in the compact/full recipe and component files, plus selected scenario components.                                                                                 |
| Full-catalog fallbacks      | A read of the compatibility catalog after the compact path should have answered the task.                                                                                            |
| Commands                    | Discrete retrieval/resolve/compose commands recorded by the runner.                                                                                                                  |
| Manual component selections | Component choices the legacy control must make explicitly; compact mode records zero agent-owned choices.                                                                            |
| Decision count              | Nine post-intent anatomy decisions: recipe, shell, comparison UI, filter surface, KPI, bulk actions, detail mode, mobile behavior, and required states. This is not token telemetry. |
| Scaffold integrity          | Whether domain data, business logic, permissions, persistence, handlers, or fetch keys leak into the scaffold.                                                                       |
| Static consumer proof       | Local primitive definitions, hardcoded color literals, external icon imports, copied ten4seven CSS, parallel theme, and contract violations.                                         |
| Render proof                | Browser evidence for desktop, mobile, and the Scenario C tablet viewport, including overflow and state behavior.                                                                     |

## Acceptance checks

- All three scenarios resolve the expected composition.
- Compact mode reads only compact projections for the entity-list proof.
- The independent app resolves packages from its own installed artifact tree,
  not the product source workspace.
- Packed manifests contain no `link:` or `workspace:` dependency after pack.
- Consumer source uses public ten4seven exports and semantic icons only.
- No local primitive or parallel theme is created.
- Consumer scaffold stays free of domain data and business behavior.
- Scenario A supports search/filter/sort/select/bulk/detail/pagination.
- Scenario B demonstrates reduced anatomy and consumer-owned row navigation.
- Scenario C demonstrates loading/error/filtered-empty, selection/detail, and
  table-scroll behavior on mobile/tablet.
- Browser console error-level logs remain empty during the checked paths.
- Any setup or package limitation is recorded as a benchmark gap rather than
  silently repaired in the result narrative.

## Stop rule

Stop after producing the five benchmark reports, gap ledger update, and
captured evidence. Do not alter unrelated recipes or visual foundations and do
not commit or push this benchmark.
