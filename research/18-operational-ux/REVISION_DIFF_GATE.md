# T7-REVISION-001 — Revision / Change Summary

Status: **scoped PASS — NEW COMPONENT IMPLEMENTED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-REVISION-001**
Stacked base: **T7-READINESS-001 / `c932b9d89821fed6bfcfc2c687d91573cc35f206`**

## Gate decision

The AAPM revision/change-summary requirement is classified **COMPONENT GAP**.
Discovery found no canonical `RevisionDiff` or `ChangeSummary` component, no
typed or legacy recipe contract for the repeated before/after behavior, and no
AI projection that could be selected for the required presentation. The
existing `KeyValueList` describes stable facts and `ActivityFeed` orders events,
but neither component expresses multiple before/after values with an explicit
change kind and adjacent provenance.

The gap is now closed by the generic `RevisionDiff` component. Completion is
**NEW COMPONENT IMPLEMENTED + PROVEN** for the component contract, package
export, catalog/projections, reference adoption, responsive behavior,
accessibility, and browser evidence. No correction mutation, policy
calculation, authorization decision, audit persistence, or AAPM product logic
was added.

## Requirement and ownership boundary

The source requirement calls for a reusable presentation of:

- original and current values;
- reason, accountable actor, occurred-at timestamp, and optional evidence or
  source;
- scalar values, short text, dates, and status/value changes;
- field context and explicit added, removed, changed, or unchanged meaning;
- readable semantics that do not depend on color; and
- responsive stacking for detail, audit, and correction review.

Ten4Seven owns the generic rendering and responsive/accessibility contract. The
consumer supplies every value and the explicit change kind, and remains the
owner of diff calculation, correction policy, state transitions, immutable
audit storage, permissions, and persistence.

## Implementation path

| Plane                    | Evidence                                                                                                                                             | Result                                                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract/API             | `packages/ui/src/data-display.tsx` (`RevisionDiffKind`, `RevisionDiffItem`, `RevisionDiffProps`)                                                     | Additive public API; explicit `change` kind is required; before/after and provenance remain consumer-supplied                                      |
| Canonical implementation | `packages/ui/src/data-display.tsx`                                                                                                                   | Semantic table on wide layouts, canonical `StatusChip` change labels, `KeyValueList` provenance, explicit `Not present` values, and an empty state |
| Package export           | `packages/ui/src/index.ts` (`export * from "./data-display"`)                                                                                        | `RevisionDiff` and its public types are available from `@ten4seven/ui` without a second export path                                                |
| Theme/motion             | `packages/ui/src/styles.css`                                                                                                                         | Surface, border, muted text, radius, table spacing, and shared typography/motion tokens only; narrow layouts use a stacked representation          |
| Compatibility catalog    | `packages/ai/catalog/components.json`                                                                                                                | Implemented `data` component with API, states, accessibility, responsive, motion, token, and relationship metadata                                 |
| Generated projection     | `generated/components/RevisionDiff.json`, `packages/agent/generated/components/RevisionDiff.json`, compact/index projections                         | `pnpm contracts:generate` produced 184 projections; generated output is reproducible and was not hand-edited                                       |
| AI/catalog verification  | `pnpm t7ui show RevisionDiff`, `pnpm test:ai`, `pnpm test:component-system`                                                                          | Component resolves as implemented; 146 catalog components (140 canonical + 6 aliases), 29 recipes, 12 blocks; no donor read                        |
| Reference surface        | `apps/playground/src/operational-reference.tsx` — Entity 360                                                                                         | Six synthetic changes cover number, text/status, date, unchanged, added, and removed facts with reason, actor, timestamp, and evidence/source      |
| Guidance                 | `docs/ai/AI_QUICKSTART.md`, `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_AI_GUIDANCE.md`, `AAPM_REFERENCE_ADOPTION.md` | Agents are directed to `RevisionDiff` for multi-field change explanation and told not to move diff/policy/audit behavior into the UI system        |
| Tests/evidence           | `tests/operational-patterns.spec.ts` and this gate record                                                                                            | Semantic, overflow, axe, mobile stacking, desktop visual, and mobile visual checks are recorded below                                              |

No existing semantic recipe was rewritten. `RevisionDiff` is a standalone
generic data component because the gate requirement was a component capability,
not a new operational information architecture. Consumers may compose it with
Entity Detail, Activity & Audit Stream, Decision Workspace, or their own
bounded detail surface when the required semantics are present.

## Runtime evidence

Browser evidence ran against the isolated revision worktree server:
`http://127.0.0.1:4176/operational-patterns`. The ambient 4174/4175 servers
were not used as revision evidence.

- Desktop `1440×900`: Entity 360 renders a bounded RevisionDiff with `Field`,
  `Before`, `After`, and `Change` headers. Changed, added, removed, and
  unchanged labels remain textual and are reinforced by semantic icons.
- Mobile `390×844`: the canonical table representation is replaced by the
  component's stacked rows; each row keeps Field, Before, After, and Change
  labels in one vertical reading order. Reason, actor, occurred-at, and
  evidence/source continue below the rows without document overflow.
- The reference fixture uses no API, Farm data, correction action, diff
  calculation, or persistence. Its only purpose is to make the generic
  capability inspectable.
- New visual baselines are kept at:
  `tests/operational-patterns.spec.ts-snapshots/revision-diff-desktop-chromium-win32.png`
  and
  `tests/operational-patterns.spec.ts-snapshots/revision-diff-mobile-chromium-win32.png`.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS, 184 generated projections and three DTCG
  exports.
- `pnpm test:contracts` — PASS, 29 recipes and four typed operational recipes
  with semantic parity.
- `pnpm test:ai` — PASS, 29 recipes, 146 components, 12 blocks, 98 icons;
  15 cold-start tasks, 12 contract/catalog reads, 0 donor reads.
- `pnpm test:component-system` — PASS, 140 canonical components, six aliases,
  29 recipes, 12 blocks; explicit RevisionDiff source/category/status checks.
- `pnpm test:tailwind-bridge` — PASS.
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm build` — PASS (playground production build).
- Targeted revision Playwright slice on the isolated 4176 server — **6 passed**:
  reference semantics, mobile stacking, desktop visual, mobile visual,
  responsive overflow, and serious/critical axe checks.
- Full `tests/operational-patterns.spec.ts` on the isolated 4176 server — **13
  passed**, including the RevisionDiff assertions, responsive overflow,
  decision behavior, axe checks, and the two new RevisionDiff visual
  baselines.
- Targeted Prettier check over every changed source, catalog, projection,
  guidance, evidence, and test file — PASS.

### Baseline debt / not a gate blocker

- `pnpm format:check` remains a repository baseline failure: the full tree
  contains existing CRLF/formatting drift. The files changed by this gate pass
  the targeted check above.
- `pnpm test` now passes the contract, DTCG, contrast, token-governance, and
  component-token-coverage steps, then stops at the isolated consumer-fixture
  baseline because the local `@ten4seven/agent` package cannot be resolved.
- The full operational Playwright run reports eight legacy visual snapshot
  pixel drifts (control tower dark/desktop, process desktop, load desktop/mobile,
  receiving desktop/mobile, and entity-360 desktop). They are the same
  environment-level drift observed before this gate and were not overwritten;
  only the new component baselines were added.
- `pnpm test:slice-a` remains an isolated consumer-fixture baseline issue when
  its local `@ten4seven/agent` package resolution is absent; no workaround was
  added to the component or reference.

## Stop-condition audit

The gate did not require a donor/runtime dependency, breaking public API,
business calculation, authorization logic, `aapm_prod` access, or a semantic
existing-recipe rewrite. Generic versus product ownership is explicit: the
component renders supplied revision facts, while the consumer owns all truth,
policy, mutation, and persistence. The gate is safe to hand off to the next
bounded gate, **T7-SECTIONNAV-001**, after this local delivery is committed.
