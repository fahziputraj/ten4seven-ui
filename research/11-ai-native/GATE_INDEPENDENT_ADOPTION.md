# Gate — Independent AI Adoption Benchmark

Status: **CONDITIONAL PASS**
Verified: 2026-08-31
Scope: `entity-list` compact-first adoption proof only
Fresh agent context: **NOT VERIFIED**

## Gate decision

The first independent consumer proof is structurally successful: the packed
ten4seven artifacts install in an external pnpm workspace, the public agent
resolves the three required `entity-list` compositions, and the consumer
renders and exercises the canonical UI contracts without source-workspace,
donor, local-primitive, or parallel-theme reads.

The gate is conditional because this run does not prove a truly fresh agent
context and because the filesystem-backed agent runtime is not yet a
browser-safe import. Those are adoption-boundary limitations, not silently
converted passes.

## Criteria

| Criterion                            | Result                        | Evidence                                                                                                            |
| ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Independent benchmark workspace      | PASS                          | `D:\SA\t7-independent-benchmark`; no root workspace manifest.                                                       |
| Packed UI/contracts/agent artifacts  | PASS with pre-registry caveat | `RETRIEVAL_COST_LEDGER.md`; local tarball override is explicit because packages are private/not registry-published. |
| No source workspace resolution       | PASS                          | Package resolution checks: source imports `0`, implementation reads `0`.                                            |
| No donor reads                       | PASS                          | Donor reads `0`; no donor dependency or import in consumer.                                                         |
| Compact-first entity-list resolution | PASS                          | Scenarios A/B/C expected compositions all matched.                                                                  |
| Conditional composition              | PASS                          | KPI included only for A; reduced B anatomy; C excludes KPI and keeps triage surfaces.                               |
| Scaffold ownership boundary          | PASS                          | No `rows`, `columns`, `permissions`, `persistence`, `handlers`, or `fetch` keys in scaffold.                        |
| Consumer uses canonical contracts    | PASS                          | Static proof: local primitives `0`, external icon imports `0`, copied CSS `false`, parallel theme `false`.          |
| Retrieval reduction                  | PASS                          | `84,135` vs `358,487` bytes per scenario; `23.47%` share, `76.53%` reduction.                                       |
| Decision reduction                   | PASS                          | `0` compact agent-owned vs `9` legacy agent-owned per scenario.                                                     |
| A operational interactions           | PASS                          | Search/filter/sort/selection/bulk/pagination/quick-detail proof.                                                    |
| B reduced directory                  | PASS                          | Search/filter/sort and consumer-owned row navigation; KPI/bulk/drawer omitted.                                      |
| C state and responsive proof         | PASS                          | Loading/error/filtered-empty, selection/detail, mobile table-scroll, and 840×900 tablet.                            |
| Fresh-agent reproduction             | NOT VERIFIED                  | This run was performed in the current Codex context.                                                                |
| Browser-safe public agent import     | OPEN GAP                      | Resolver runs in external Node benchmark and serializes output for browser consumer.                                |

## Required follow-up before unconditional adoption PASS

1. Repeat the same benchmark from a genuinely fresh agent context using only
   `AGENTS.md`, the generated projections, recipes, catalogs, and public
   ten4seven contracts; preserve the same ledgers for comparison.
2. Publish or package a browser-safe agent export that does not require
   filesystem-backed `node:fs` access, then rerun the browser import/build
   proof without serialized resolver output.
3. If the packages become registry-published, rerun installation without the
   local tarball override and retain the current artifact-install evidence as
   historical provenance.

## Evidence index

- [`INDEPENDENT_ADOPTION_BENCHMARK_PLAN.md`](INDEPENDENT_ADOPTION_BENCHMARK_PLAN.md)
- [`INDEPENDENT_ADOPTION_BENCHMARK_RESULTS.md`](INDEPENDENT_ADOPTION_BENCHMARK_RESULTS.md)
- [`DECISION_COUNT_LEDGER.md`](DECISION_COUNT_LEDGER.md)
- [`RETRIEVAL_COST_LEDGER.md`](RETRIEVAL_COST_LEDGER.md)
- [`BENCHMARK_GAPS.md`](BENCHMARK_GAPS.md)
- [`evidence/`](evidence/)

## Scope closure

This gate stops after the bounded benchmark. It does not authorize a broader
recipe migration, foundation redesign, new components, commit, push, or
deployment.
