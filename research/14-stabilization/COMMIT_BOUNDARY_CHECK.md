# Commit boundary check

Status: **PASS — selective staging boundary reviewed**
Verified on **2026-09-01** before the first authorized commit.

## Planned decision counts

| Decision          | Count | Meaning                                                                                                  |
| ----------------- | ----: | -------------------------------------------------------------------------------------------------------- |
| STAGE             |   492 | Approved implementation, reproducible generated outputs, tests, intentional snapshots, and research/docs |
| HOLD              |     5 | Five pre-existing semantic-icon screenshot baselines                                                     |
| EXCLUDE           |     2 | Local dev-server logs                                                                                    |
| Ignored exclusion |     1 | `artifacts/ten4seven-ui-1.0.0.tgz`, local package artifact                                               |

## Boundary checks

- The ledger covers every non-ignored changed/untracked path present when it was generated: **499 files**.
- The planned staged set is **492 files**; no wildcard or repository-root add is part of the plan.
- All five icon baselines are explicitly **HOLD**.
- The 20 intentional baselines are explicitly eligible for batch 6.
- Root projections and `packages/agent/generated/` are both staged only with the canonical contract/projection batch.
- `packages/agent/src/core.mjs` is staged with the agent runtime; no duplicate resolver is introduced.
- `packages/agent/src/node.mjs` is staged with the node boundary; filesystem access remains outside core.
- `research/11-ai-native/BENCHMARK_GAPS.md` remains historical evidence; Independent Adoption remains **CONDITIONAL PASS**.
- `FRESH_AGENT_CONTEXT` remains **NOT VERIFIED**.
- Registry publication remains a future distribution gate.
- Vite's bundle-size advisory remains accepted and is not mixed into this commit scope.
- Browser connector visual verification remains unavailable; no live visual sign-off is claimed.

## Reproducibility checks already available

- `node scripts/generate-contract-projections.mjs --check`: PASS.
- Root/package generated projections share identical hashes for 169 files; package-only `index.mjs` and `index.d.mts` are expected package modules.
- `pnpm package:verify`: PASS for the private `@ten4seven/ui@1.0.0` packed-package contract.
- Prior required root validation: format, typecheck, unit/contract tests, build, and targeted rendered E2E/screenshot runs passed; the Vite size warning is accepted.
- Post-document checks: `pnpm format:check`, `git diff --check`, and projection reproducibility check passed.

## Commit boundaries

1. P0 / AI contract plane.
2. Agent runtime / Slice A / boundary.
3. Brand Expression / Slice B.
4. Recipe-family kernel.
5. Theme / tokens / UI package / workbench polish.
6. Interaction / visual regression tests.
7. Research / repository documentation, including `research/14-stabilization/`.

The five held icon baselines must remain unstaged after all seven commits.
