# T7-READINESS-001 — Readiness / Eligibility Review

Status: **scoped PASS — CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-READINESS-001 / Issue #2**

## Gate decision

The readiness requirement is classified **COMPOSE + TYPED RECIPE**. Existing
canonical `RecordSummary`, `StatusChip`, `Alert`, and `KeyValueList` primitives
cover the generic visual behavior. Discovery did not prove a new leaf
component gap, so no `EligibilityPanel` or other product-shaped mega-component
was added.

Completion is **CONTRACT MIGRATED + PROVEN** for the typed/canonical recipe and
**COMPOSED + PROVEN** for the deterministic reference route. Eligibility,
thresholds, permissions, freshness policy, reevaluation, persistence, and
mutation remain consumer/product-owned.

## Source and boundary

The source requirement asks whether an object is currently ready for a target
action and, when it is not, which factual conditions block it. The AAPM
requirement distinguishes this from an evidence-led human decision: the
consumer supplies the evaluated result, ordered blockers, resolution hints,
freshness context, and optional next action.

The typed contract makes these boundaries explicit:

- result states are text-bearing `READY`, `BLOCKED`, `INCOMPLETE`, or `UNKNOWN`
  semantics supplied by the consumer;
- blockers preserve consumer order and pair a factual reason with a resolution
  hint or next required evidence;
- evaluation/freshness context is displayed, not calculated;
- the recipe never auto-reevaluates or mutates state;
- `Decision Workspace` is selected only when a person must choose a
  consequential outcome from evidence.

## Implementation path

| Plane                 | Evidence                                                                                                                                                                              | Result                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Typed source          | `packages/contracts/src/types.ts`, `packages/contracts/src/operational-patterns.ts`                                                                                                   | `READINESS_REVIEW_STATES` plus `READINESS_REVIEW_CONTRACT`; additive state vocabulary, no business policy |
| Canonical registry    | `packages/contracts/src/canonical.ts`                                                                                                                                                 | `readiness-review` is a canonical recipe source                                                           |
| Compatibility catalog | `packages/ai/catalog/recipes.json`                                                                                                                                                    | full semantic recipe entry and AAPM reference                                                             |
| Generated projection  | `generated/recipes/readiness-review.json`, `packages/agent/generated/recipes/readiness-review.json`, compact/index projections                                                        | `pnpm contracts:generate` produced 183 projections from the typed source                                  |
| Agent/CLI             | `packages/ai/bin/t7ui.mjs`, `scripts/verify-ai-catalog.mjs`, `scripts/verify-reference-cold-start.mjs`                                                                                | readiness intent resolves deterministically with five semantic icons and no donor reads                   |
| Reference surface     | `apps/playground/src/operational-reference.tsx`, `apps/playground/src/app.css`                                                                                                        | three synthetic ready/blocked/incomplete examples composed from existing primitives                       |
| Documentation         | `docs/ai/AI_QUICKSTART.md`, `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_PATTERN_MATRIX.md`, `OPERATIONAL_AI_GUIDANCE.md`, `AAPM_REFERENCE_ADOPTION.md` | selection, ownership, relationship, responsive, and adoption guidance updated                             |
| Tests                 | `tests/operational-patterns.spec.ts` and contract/AI/component-system gates                                                                                                           | reference, recipe detail, responsive overflow, keyboard-oriented route checks, and axe coverage added     |

## Runtime evidence

The readiness branch ran its own Vite process at
`http://127.0.0.1:4175/operational-patterns`; the ambient Batch 1 server at
port 4174 was not used as readiness evidence.

- Desktop `1440×900`: three state cards remain readable in one bounded grid;
  subject, target, result, evaluation, freshness, blockers, satisfied
  conditions, and next context are visible as text.
- Mobile `390×844`: the grid becomes one vertical reading order, the
  navigation remains collapsible, the result remains text-bearing, and the
  route has no asserted document overflow.
- The readiness recipe detail shows the required blocker semantic, explicit
  Decision Workspace differentiation, responsive guidance, and the
  `AAPM Operational Reference` link.
- New visual baselines are kept at:
  `tests/operational-patterns.spec.ts-snapshots/operational-readiness-review-desktop-chromium-win32.png`
  and
  `tests/operational-patterns.spec.ts-snapshots/operational-readiness-review-mobile-chromium-win32.png`.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS, 183 projections and three DTCG exports.
- `pnpm test:contracts` — PASS, 29 recipes and four typed operational recipes
  with semantic parity.
- `pnpm test:ai` — PASS, 29 recipes, 145 components, 12 blocks, 98 icons;
  15 cold-start tasks, 12 contract/catalog reads, 0 donor reads.
- `pnpm test:recipe-family` — PASS; retrieval evidence refreshed because the
  generated index grew for the new recipe.
- `pnpm test:component-system` — PASS, 139 canonical components, six aliases,
  29 recipes, 12 blocks.
- `pnpm test:tailwind-bridge` — PASS.
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm build` — PASS (playground production build).
- Readiness Playwright slice on the isolated 4175 server — **4 passed**:
  reference semantics, recipe detail, desktop visual, and mobile visual.
- Full `tests/operational-patterns.spec.ts` on the isolated 4175 server — **10
  non-visual checks passed**, including serious/critical axe checks and
  responsive overflow checks; the new readiness desktop/mobile visuals pass.

### Baseline debt / not a gate blocker

- `pnpm format:check` remains a repository baseline failure: Prettier reports
  337 existing files, predominantly CRLF/formatting drift. The files changed
  by this gate were formatted before verification.
- `pnpm test` stops at the existing component-token-coverage report line-ending
  mismatch (expected LF, observed CRLF); earlier contract, DTCG, contrast, and
  token-governance steps pass.
- The full operational Playwright run reports eight pre-existing visual
  snapshot pixel drifts across legacy control-tower/process/load-route/
  receiving/entity-360 cases. These were not overwritten; readiness snapshots
  were added explicitly.
- `pnpm test:slice-a` remains blocked by the isolated consumer's missing local
  `@ten4seven/agent` package resolution. This is a consumer-fixture/install
  baseline issue, not readiness behavior.

## Ownership and stop conditions

No donor/runtime dependency, breaking public API, authorization logic, business
calculation, `aapm_prod` change, or semantic existing-recipe rewrite was
needed. The reference data is synthetic and contains no Farm API, policy, or
persistence behavior.

This gate is safe to hand off to **T7-REVISION-001**. That next gate should
stop at evidence if RevisionDiff ownership proves ambiguous, requires a
breaking public API, or needs business diff calculation; otherwise it may
continue through the same contract → component (only if proven gap) → export →
catalog → projection → reference → test → responsive → accessibility → browser
QA chain.
