# Pre-Commit Audit

Status: **PASS for bounded stabilization audit**

Verified: 2026-09-01

Scope: account for the current dirty tree, verify source/generated
boundaries, identify accidental outputs, preserve historical gate semantics,
and prepare an ordered atomic commit plan. This audit does not change runtime
behavior.

## Executive decision

The current implementation is ready for a deliberate atomic staging pass. The
working tree is not itself commit-ready because it contains multiple completed
milestones mixed together, two non-ignored local server logs, generated
projections, evidence, and 25 modified screenshot baselines. The correct next
operation is selective staging according to
[`PROPOSED_COMMIT_PLAN.md`](PROPOSED_COMMIT_PLAN.md), not a broad `git add .`.

No commit, push, deploy, package publication, cleanup, reset, or route/recipe
redesign was performed.

## Audit matrix

| Check                          | Result            | Evidence and disposition                                                                                                                                                                       |
| ------------------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository identity            | PASS              | `D:/SA/ten4seven-ui`, branch `main`, HEAD `6fd6bd9`                                                                                                                                            |
| Staged-state safety            | PASS              | `0` staged files; all changes remain reviewable in the worktree                                                                                                                                |
| Tracked/untracked inventory    | PASS              | `61` tracked modifications and `438` non-ignored untracked files are enumerated in `CHANGE_INVENTORY.md`                                                                                       |
| Accidental/temp files          | FINDING — EXCLUDE | `.dev-server.log` and `.dev-server-error.log` are local server logs, 4,725 and 7,778 bytes; neither belongs in a commit                                                                        |
| Ignored build output           | PASS — EXCLUDE    | Package tarball, `dist/`, dependency, cache, and Playwright outputs remain non-commit artifacts                                                                                                |
| Debug residue                  | PASS              | Scoped search found no `debugger`, `TODO`, `FIXME`, or `HACK` residue in the current source/evidence set; console output is limited to intentional CLI, generator, verifier, and build scripts |
| Generated projections          | PASS              | `node scripts/generate-contract-projections.mjs --check` exited `0` with no stale projection report                                                                                            |
| Projection parity              | PASS              | All `169` shared files under `generated/` and `packages/agent/generated/` have identical SHA-256 content; package-only files are the two expected entry modules                                |
| Core/node boundary             | PASS              | `packages/agent/src/core.mjs` has no Node/filesystem coupling; `node.mjs` owns `node:fs` loading and delegates to the core; existing boundary gate retains the no-duplicate-resolver claim     |
| Historical benchmark semantics | PASS              | `BENCHMARK_GAP-01` remains historical/remediated-for-repack; `BENCHMARK_GAP-02` remains closed only through explicit core/node separation; Independent Adoption remains `CONDITIONAL PASS`     |
| Fresh agent context            | NOT VERIFIED      | Preserved as an open condition; no code is added to manufacture this proof                                                                                                                     |
| Registry publication           | FUTURE GATE       | No registry publish is attempted or implied by local packed artifacts                                                                                                                          |
| Vite chunk advisory            | ACCEPTED          | `pnpm build` passes with the existing non-blocking `>500 kB` advisory; no optimization work is introduced here                                                                                 |
| Live Browser connector         | UNVERIFIED        | In-app browser navigation to `http://127.0.0.1:4173/theme-studio` still returns `ERR_CONNECTION_REFUSED`; no live browser visual claim is made                                                 |
| Existing rendered proof        | PASS              | The latest implementation run completed `111` Playwright E2E tests and the targeted baseline refresh completed `20` screenshot tests; the audit made no runtime change after that run          |
| Formatting and whitespace      | PASS              | `pnpm format:check` and `git diff --check` passed before writing this audit; they are rerun after the six audit files are added                                                                |

## Findings

### F-01 — local server logs are untracked

The repository contains two non-ignored files created by local Vite/server
activity:

```text
.dev-server.log
.dev-server-error.log
```

They are diagnostic outputs, not implementation or evidence sources. They are
excluded from every proposed commit. They were not deleted during this audit
because the user requested inventory and preservation of the dirty worktree,
not cleanup.

### F-02 — the working tree contains several milestone boundaries

The tracked and untracked changes combine P0, Slice A, adoption boundary,
brand expression, recipe families, package bundling, and UI polish. A single
commit would make rollback and gate attribution ambiguous. The ordered plan
keeps contract sources with their projections, runtime with its consumer proof,
and UI behavior with its regression tests. The six stabilization documents
are the final audit artifacts and are kept together as a documentation unit.

### F-03 — screenshot provenance is mixed

There are `25` modified screenshot baselines. `20` were refreshed by the latest
targeted command for the intentional public-shell, Ebook Store, cart, and
Theme Studio changes. The `5` semantic-icon images were already dirty before
this audit and were not regenerated here. They need explicit inclusion in the
icon-system commit or an intentional review decision; they must not be swept
into a Theme Studio commit by path globbing.

### F-04 — live connector review is unavailable

The in-app browser currently cannot connect to port `4173`. This is an
environment/preview availability condition, not evidence of a UI regression.
The audit records it as unverified. Existing Playwright screenshot and
interaction gates remain the reproducible runtime evidence, and no visual
claim is promoted beyond that evidence.

## Boundary decisions retained

The audit confirms and preserves the following operating rule:

```text
Human workbench:
  exact radius values, exact motion duration, individual palette roles,
  advanced typography inspection

Agent-facing contract:
  radiusProfile, motionProfile, typographyProfile, ThemeProfile, BrandProfile
```

Theme Studio may expose engineering-level detail without expanding the
agent-facing contract vocabulary. `@ten4seven/ui` remains the application UI
runtime; `@ten4seven/agent/node` remains the supported build-time/CLI loader;
`@ten4seven/agent/core` remains the portable deterministic resolver.

## Reproducibility and package checks

The following current-state checks passed after the audit documents were
created:

```text
node scripts/generate-contract-projections.mjs --check     PASS
pnpm test:adoption:static                                  PASS
pnpm test                                                    PASS
pnpm typecheck                                               PASS
pnpm build                                                    PASS (chunk-size advisory retained)
pnpm package:build                                           PASS
pnpm package:verify                                          PASS
pnpm test:consistency                                        PASS
pnpm format:check                                            PASS
git diff --check                                             PASS
```

The full rendered suite also passed in the same implementation state:

```text
111 Playwright E2E tests                                     PASS
20 targeted screenshot baseline refresh tests                PASS
```

The audit does not touch runtime, contract, package, or screenshot source, so
the post-audit reruns were limited to format/whitespace and projection checks.
Both passed. If a later staging operation changes source or baselines, reopen
this gate and rerun the affected validation instead of silently updating a
baseline.

## Pre-commit exclusion list

Do not stage:

```text
.dev-server.log
.dev-server-error.log
artifacts/
apps/*/dist/
**/node_modules/
**/.vite/
test-results/
```

The evidence archives under `research/11-ai-native/` and generated projections
are not automatically excluded: they are intentional candidate artifacts and
must be staged only with the source/ledger commit identified in the proposed
plan.
