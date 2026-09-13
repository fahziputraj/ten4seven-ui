# T7-SYSTEM-HARDENING-H01 Evidence

## 1. Work item

- Work Item ID: `T7-SYSTEM-HARDENING-H01`
- Execution mode: `BOUNDED / STRICT`
- Risk: `R2 — shared design-system infrastructure`
- Branch: `codex/icons-curated-solar-style`
- Starting HEAD: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`
- Ending working-tree HEAD: `e582cfcfbe0f077d1a5832d86db9da1898487fd3` (unchanged; no commit was created)
- Gate reassessment: `BOUNDED GATE POLICY` applied on `2026-09-12`
- Runtime URL: `http://127.0.0.1:4173/`

The worktree was already substantially dirty before H01 execution. Existing user changes were preserved; no reset, revert, cleanup, unrelated formatting sweep, commit, push, PR, merge, tag, or publish was performed.

## 2. Before

`OBSERVED` from the supplied H01 audit and the pre-change route seam:

- Document-title synchronization was stale: many direct and internal routes retained `ten4seven UI — Theme Studio`.
- ERP Density Reference and Farm P1 Reference were advertised by the UI but their intended canonical paths were not consistently routable.
- Runtime/source identity could not be confidently reconciled with the expected branch or source revision.
- `/warehouse-inventory` was an existing compatibility route and had to remain mapped to Operations Tracker.
- `/farm-reference` was an existing Farm reference entry and had to remain compatible while `/farm-p1-reference` became canonical.
- Detail routes were already catalog/catalog-model driven and had to remain derived rather than becoming a handwritten URL list.

## 3. Source of truth

- Routes, canonical paths, aliases, route matching, route descriptions, and title resolution: `apps/playground/src/playground-routes.ts`.
- Navigation groups and shell route consumption: `apps/playground/src/playground-chrome.tsx`, `apps/playground/src/App.tsx`, `apps/playground/src/farm-p1-reference.tsx`, and `apps/playground/src/erp-data-dense-reference.tsx`.
- Catalog-derived detail identities: `apps/playground/src/catalog-model.ts`, `packages/ai/catalog/components.json`, `packages/ai/catalog/blocks.json`, and `packages/ai/catalog/recipes.json`.
- Document-title synchronization and route metadata application: `apps/playground/src/App.tsx`, using `routeTitleForMatch()` and `routeDescriptionForMatch()` from the route registry.
- Playground-only build identity injection: `apps/playground/vite.config.ts`, `apps/playground/src/build-identity.ts`, and `apps/playground/src/vite-env.d.ts`.
- QA/developer display surface: `apps/playground/src/reference-harness.tsx`; bounded presentation rules are in `apps/playground/src/app.css`.
- Automated H01 closure: `tests/route-contract.spec.ts`, with navigation coverage derived from the route registry and catalogs.

No second route manifest or second catalog title map was introduced.

## 4. Decisions applied

Canonical studio and library routes:

- `/theme-studio`
- `/component-lab`
- `/tokens`
- `/components`
- `/blocks`
- `/icons`
- `/recipes`

Canonical reference routes:

- `/operations-tracker`
- `/operational-patterns`
- `/saas-control-plane`
- `/erp-density-reference`
- `/farm-p1-reference`
- `/ebook-store`
- `/public-showcase`

Canonical proof routes:

- `/farm-synthetic-proof`
- `/brand-proof/auth-neutral`
- `/brand-proof/auth-aapm-academy`

Accepted compatibility aliases remain explicit and separate from canonical definitions:

- `/warehouse-inventory` → `/operations-tracker`
- `/erp-density` → `/erp-density-reference`
- `/erp-reference` → `/erp-density-reference`
- `/farm-reference` → `/farm-p1-reference`
- `/farm-reference/overview` → `/farm-p1-reference/overview`
- `/farm-reference/daily-operations` → `/farm-p1-reference/daily-operations`
- `/farm-reference/context` → `/farm-p1-reference/context`
- `/farm-reference/flocks` → `/farm-p1-reference/flocks`
- `/farm-reference/inventory` → `/farm-p1-reference/inventory`

New navigation emits the canonical route paths. Legacy Farm paths remain renderable and retain their incoming legacy pathname for old direct links; active navigation is resolved against the canonical identity.

Root `/` remains an entry alias and rendered as the canonical `/theme-studio` route in the browser.

Document titles use one deterministic convention. Top-level and proof titles use the route contract; component-family, component-detail, block-detail, and recipe-detail titles derive from catalog identity, for example:

- `/components/forms` → `ten4seven UI — Forms`
- `/components/button` → `ten4seven UI — Button`
- `/blocks/kpi-dashboard` → `ten4seven UI — KPI Dashboard`
- `/recipes/entity-list` → `ten4seven UI — Entity List`

Build identity is injected only into the existing playground QA controls. The displayed fields are package version, short commit, and branch/ref, with a working-tree state indicator. Product/reference shells do not render that metadata.

## 5. Files changed

H01 changes were limited to the route, title, compatibility, QA identity, verifier, test, and evidence seams below. Several listed files were already dirty in the shared worktree; unrelated existing edits in those files were preserved.

- `apps/playground/src/playground-routes.ts` — made the existing route registry contract authoritative, normalized canonical ERP/Farm paths, separated aliases, added canonical-path normalization, explicit not-found matching, and catalog-derived title/description helpers.
- `apps/playground/src/App.tsx` — synchronized document title and description from the route match and supplied playground build identity to the existing QA harness.
- `apps/playground/src/farm-p1-reference.tsx` — resolved canonical and legacy Farm child paths through the route contract and preserved legacy direct-link behavior.
- `apps/playground/src/erp-data-dense-reference.tsx` — aligned active navigation with the canonical ERP Density Reference path.
- `apps/playground/src/reference-harness.tsx` — added a bounded QA-only build identity section to the existing reference QA control.
- `apps/playground/src/app.css` — added token-based, bounded layout rules for the QA identity section only.
- `apps/playground/vite.config.ts` — injected package version, short Git SHA, branch/ref, and dirty/clean state at the playground Vite boundary.
- `apps/playground/src/build-identity.ts` — typed playground-only build identity access.
- `apps/playground/src/vite-env.d.ts` — declared the Vite build-time identity global.
- `apps/playground/package.json` and `pnpm-lock.yaml` — supplied Node typings required by the Vite config; no consumer package API was changed.
- `tests/route-contract.spec.ts` — added registry/catalog-derived static closure, representative direct/refresh checks, complete generated inventory sweep, alias checks, not-found checks, and QA identity verification.
- `tests/navigation-closure.spec.ts` — derived top-level navigation coverage from the actual registry rather than a duplicate URL inventory.
- `tests/q05-saas-control-plane.spec.ts` — aligned the existing expected title with the canonical route title.
- `scripts/verify-saas-control-plane.mjs` — kept the existing static verifier compatible with the canonical SaaS title/path contract.
- `scripts/verify-farm-reference.mjs` — kept the existing Farm verifier aligned with the canonical path and explicit legacy alias while retaining its canonical child-route assertions.
- `scripts/verify-erp-readiness.mjs` — kept the existing ERP verifier aligned with the canonical ERP Density Reference path.
- `docs/aapm/T7-SYSTEM-HARDENING-H01-ROUTE-RUNTIME-IDENTITY-EVIDENCE.md` — this single H01 evidence artifact.

No AI contract projection regeneration was required: H01 changed the playground route/runtime seam, not typed component/recipe/theme contract sources.

## 6. Route matrix

`PASS` in the runtime and refresh columns means the route rendered through the local playground browser, retained the expected identity/title, and rendered again after a direct reload. Alias rows intentionally retain their legacy pathname while resolving to the canonical identity.

| Surface                  | Canonical path                                      | Aliases                                       | Resolved identity                | Expected title                                    | Runtime result          | Refresh result                     |
| ------------------------ | --------------------------------------------------- | --------------------------------------------- | -------------------------------- | ------------------------------------------------- | ----------------------- | ---------------------------------- |
| Theme Studio             | `/theme-studio`                                     | `/`                                           | Theme Studio                     | `ten4seven UI — Theme Studio`                     | PASS                    | PASS; `/` ended at `/theme-studio` |
| Component Lab            | `/component-lab`                                    | —                                             | Component Lab                    | `ten4seven UI — Component Lab`                    | PASS                    | PASS                               |
| Tokens                   | `/tokens`                                           | —                                             | Tokens                           | `ten4seven UI — Tokens`                           | PASS                    | PASS                               |
| Components               | `/components`                                       | —                                             | Components                       | `ten4seven UI — Components`                       | PASS                    | PASS                               |
| Blocks                   | `/blocks`                                           | —                                             | Blocks                           | `ten4seven UI — Blocks`                           | PASS                    | PASS                               |
| Icons                    | `/icons`                                            | —                                             | Icons                            | `ten4seven UI — Icons`                            | PASS                    | PASS                               |
| Recipes                  | `/recipes`                                          | —                                             | Recipes                          | `ten4seven UI — Recipes`                          | PASS                    | PASS                               |
| Operations Tracker       | `/operations-tracker`                               | `/warehouse-inventory`                        | Operations Tracker               | `ten4seven UI — Operations Tracker`               | PASS                    | PASS                               |
| Operational Patterns     | `/operational-patterns`                             | —                                             | Operational Patterns             | `ten4seven UI — Operational Patterns`             | PASS                    | PASS                               |
| SaaS Control Plane       | `/saas-control-plane`                               | —                                             | SaaS Control Plane               | `ten4seven UI — SaaS Control Plane`               | PASS                    | PASS                               |
| ERP Density Reference    | `/erp-density-reference`                            | `/erp-density`, `/erp-reference`              | ERP Density Reference            | `ten4seven UI — ERP Density Reference`            | PASS                    | PASS                               |
| Farm P1 Reference        | `/farm-p1-reference` and five canonical child paths | `/farm-reference` and five legacy child paths | Farm P1 Reference                | `ten4seven UI — Farm P1 Reference`                | PASS                    | PASS                               |
| Publishing Store         | `/ebook-store`                                      | —                                             | Publishing Store                 | `ten4seven UI — Publishing Store`                 | PASS                    | PASS                               |
| Public Showcase          | `/public-showcase`                                  | —                                             | Public Showcase                  | `ten4seven UI — Public Showcase`                  | PASS                    | PASS                               |
| Farm Synthetic proof     | `/farm-synthetic-proof`                             | —                                             | Farm Synthetic Consumer Proof    | `ten4seven UI — Farm Synthetic Consumer Proof`    | PASS                    | PASS                               |
| Neutral auth proof       | `/brand-proof/auth-neutral`                         | —                                             | Authentication · Neutral Product | `ten4seven UI — Authentication · Neutral Product` | PASS                    | PASS                               |
| AAPM Academy auth proof  | `/brand-proof/auth-aapm-academy`                    | —                                             | Authentication · AAPM Academy    | `ten4seven UI — Authentication · AAPM Academy`    | PASS                    | PASS                               |
| Components family        | `/components/forms`                                 | —                                             | Forms                            | `ten4seven UI — Forms`                            | PASS                    | PASS                               |
| Component detail         | `/components/button`                                | —                                             | Button catalog identity          | `ten4seven UI — Button`                           | PASS                    | PASS                               |
| Block detail             | `/blocks/kpi-dashboard`                             | —                                             | KPI Dashboard catalog identity   | `ten4seven UI — KPI Dashboard`                    | PASS                    | PASS                               |
| Recipe detail            | `/recipes/entity-list`                              | —                                             | Entity List catalog identity     | `ten4seven UI — Entity List`                      | PASS                    | PASS                               |
| Guaranteed invalid route | no canonical path                                   | `/not-a-real-ten4seven-route`                 | Explicit Not Found               | `ten4seven UI — Not Found`                        | PASS; bounded 404 state | PASS; remains Not Found            |

## 7. Generated inventory result

The inventory is derived from the route registry and catalog metadata in `tests/route-contract.spec.ts`; it is not a manually duplicated list of hundreds of detail URLs.

- Top-level routes: `14`
- Proof routes: `3`
- Farm route family: `6` (parent plus five child paths)
- Component-family routes: `21`
- Component-detail routes: `173`
- Block-detail routes: `60`
- Recipe-detail routes: `29`
- Accepted aliases: `9`
- Canonical inventory total: `306`
- Generated inventory failures: `0`

Exact route-sweep output:

`H01 route inventory: top-level=14 proofs=3 farm=6 component-families=21 component-details=173 block-details=60 recipe-details=29 aliases=9 failures=0`

## 8. Verification

| Command                                                                                | Result      | Evidence                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                                                    | FAIL        | `BASELINE DEBT / OUT-OF-SCOPE FAILURE`: Prettier reported `354 files`; the failures span the inherited `.playwright-cli` snapshots, docs, research, generated/user-owned surfaces, and unrelated source changes. No broad reformat was performed. |
| Targeted `pnpm exec prettier --check` for H01-touched source, verifier, and test files | PASS        | H01 files are individually formatted.                                                                                                                                                                                                             |
| `pnpm typecheck`                                                                       | PASS        | Contracts, native, agent, agent build, and playground typecheck completed.                                                                                                                                                                        |
| `pnpm test`                                                                            | PASS        | Full static/package/token/catalog/recipe/brand/component gate completed successfully.                                                                                                                                                             |
| `pnpm build`                                                                           | PASS        | Playground production build completed; existing large-chunk warning remains.                                                                                                                                                                      |
| `pnpm test:consistency`                                                                | PASS        | `Canonical consistency verified across 27 UI source files.`                                                                                                                                                                                       |
| `pnpm test:e2e`                                                                        | FAIL        | `BASELINE DEBT / OUT-OF-SCOPE FAILURE`: `314` tests ran: `220 passed`, `94 failed`. Failures are concentrated in existing visual/interaction baseline suites outside H01; they were not changed or “fixed” under the H01 boundary.                |
| `pnpm test:saas-control-plane`                                                         | PASS        | SaaS control-plane static gate verified.                                                                                                                                                                                                          |
| `pnpm test:farm-reference`                                                             | PASS        | Farm canonical/legacy route verifier passed.                                                                                                                                                                                                      |
| `pnpm test:erp-readiness`                                                              | PASS        | ERP canonical composition/readiness verifier passed.                                                                                                                                                                                              |
| Initial `pnpm exec playwright test tests/route-contract.spec.ts`                       | INTERRUPTED | `5 passed`; the remaining inventory and QA tests received `ERR_CONNECTION_REFUSED` after the local server stopped listening. This was a runtime verification interruption, not an H01 assertion failure.                                          |
| Bounded rerun — generated inventory test                                               | PASS        | `pnpm exec playwright test tests/route-contract.spec.ts --grep "complete generated route inventory"` passed the `306`-route inventory test after `pnpm dev --host 127.0.0.1` restored the local listener.                                         |
| Bounded rerun — QA identity test                                                       | PASS        | `pnpm exec playwright test tests/route-contract.spec.ts --grep "QA controls expose playground build identity"` passed the QA-control test after the local listener was restored.                                                                  |
| Combined H01 route-contract result                                                     | PASS        | Static closure, representative direct/refresh, full `306`-route inventory, alias/not-found checks, and QA identity checks passed; no H01-relevant assertion failure was found.                                                                    |

The repository-wide format and full-browser commands remain red, but bounded gate semantics classify both results as inherited baseline debt/out-of-scope failures. The H01-specific verification is green after the local runtime interruption was resolved. No out-of-scope remediation was performed.

### 8.1 Bounded gate reassessment

The first targeted route-contract invocation was not a source failure: five tests passed, then the local Vite listener became unavailable while the generated inventory loop was visiting `/components/tool-call-card`; the following QA-control test consequently received the same `ERR_CONNECTION_REFUSED`. The Playwright configuration uses `reuseExistingServer: true`, so the bounded recovery was to restore the already-required local dev runtime with `pnpm dev --host 127.0.0.1` and rerun only the two affected H01 tests.

The recovery rerun passed both tests. The `306`-route inventory emitted `failures=0`, and the QA build-identity contract passed. Therefore:

- H01-caused regression found: `NO`.
- H01-relevant assertion failure found: `NO`.
- Temporary runtime verification interruption: `RESOLVED`.
- Remaining global failures: `BASELINE DEBT / OUT-OF-SCOPE`, not blockers under the bounded gate policy.

## 9. Runtime browser evidence

Rendered QA used the local in-app browser runtime against `http://127.0.0.1:4173/`.

Focused direct-entry-plus-refresh coverage exercised `27` requested paths:

`/`, `/theme-studio`, `/component-lab`, `/tokens`, `/components`, `/components/forms`, `/components/button`, `/blocks`, `/blocks/kpi-dashboard`, `/icons`, `/recipes`, `/recipes/entity-list`, `/operations-tracker`, `/operational-patterns`, `/saas-control-plane`, `/erp-density-reference`, `/farm-p1-reference`, `/ebook-store`, `/public-showcase`, `/farm-synthetic-proof`, `/brand-proof/auth-neutral`, `/brand-proof/auth-aapm-academy`, `/warehouse-inventory`, `/erp-reference`, `/farm-reference`, `/farm-reference/daily-operations`, and `/not-a-real-ten4seven-route`.

Observed results:

- Canonical surfaces rendered directly with the expected pathname and title.
- `/` resolved to `/theme-studio` with `ten4seven UI — Theme Studio`.
- `/components/forms`, `/components/button`, `/blocks/kpi-dashboard`, and `/recipes/entity-list` rendered catalog-derived titles: `Forms`, `Button`, `KPI Dashboard`, and `Entity List`.
- `/warehouse-inventory` rendered Operations Tracker with `ten4seven UI — Operations Tracker`.
- `/erp-reference` rendered ERP Density Reference with `ten4seven UI — ERP Density Reference`.
- `/farm-reference` and `/farm-reference/daily-operations` rendered Farm P1 Reference while retaining their legacy incoming pathname.
- The guaranteed invalid route rendered the bounded explicit not-found state with `ten4seven UI — Not Found`; it did not fall back to Theme Studio.
- The complete generated direct-entry sweep rendered all `306` canonical inventory routes with `0` failures.
- The QA control displayed package `0.1.0`, commit `e582cfcf`, branch/ref `codex/icons-curated-solar-style`, and `Working tree` state.
- `/ebook-store` was checked for diagnostic isolation: no `data-testid="build-identity"` and no `Runtime build identity` text appeared in the product shell.
- The focused browser session produced no captured warning or error console entries.
- The Farm daily-operations route rendered a route-specific heading, canonical Farm shell, static-fixture boundary, form fields, and the expected route title.

## 10. Regression

The bounded reassessment found no H01-caused regression. The only red targeted attempt was caused by an unavailable local listener; once the runtime was restored, the affected H01 tests passed without source changes.

H01 did not change:

- component APIs or `@ten4seven/ui` consumer APIs;
- theme/token semantics or product profiles;
- business/domain behavior, data authority, permissions, or validation contracts;
- component, block, or recipe taxonomy;
- product/reference visual design beyond the small QA-only identity layout;
- legacy alias compatibility.

The build identity is playground-only and is not rendered by product or consumer shells. No commit, push, PR, merge, tag, or publish was performed.

## 11. Baseline Debt / Out-of-Scope Repository Failures

These findings are recorded for separately authorized work and do not block H01 under the bounded gate policy:

- `pnpm format:check`: `FAIL`, with `354` inherited dirty files across `.playwright-cli`, docs, research, generated/user-owned surfaces, and unrelated source. Classification: `BASELINE DEBT / OUT-OF-SCOPE FAILURE`.
- `pnpm test:e2e`: `FAIL`, with `220 passed / 94 failed`; the failures are in broader visual/interaction baseline suites and do not cover the H01 route/runtime identity contract. Classification: `BASELINE DEBT / OUT-OF-SCOPE FAILURE`.
- The first targeted route-contract attempt encountered a stopped local listener. Classification: `RUNTIME VERIFICATION INTERRUPTION`, resolved by bounded runtime restart and affected-test rerun; it is not a current-queue regression.
- The existing production build reports a large JavaScript chunk warning. Classification: `UNRELATED / OUT OF SCOPE`; bundle decomposition is outside H01.

No `CURRENT-QUEUE REGRESSION`, `CURRENT-QUEUE RELEVANT` failure, or unresolved `UNKNOWN` was identified.

## 12. Gate

PASS FOR H01A

Bounded gate rationale: H01 route/runtime/source identity behavior is verified by the route registry closure, canonical and legacy route checks, title resolution, complete `306`-route inventory, QA build identity, targeted formatting, and focused rendered browser evidence. No H01-caused or H01-relevant regression was found. The red repository-wide format/e2e results are retained as `BASELINE DEBT / OUT-OF-SCOPE` and do not block this bounded queue. H01 is complete for the next queue: `PASS FOR H01A`.
