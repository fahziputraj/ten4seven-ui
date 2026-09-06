# T7-CONTRACT-OPS-002 — Operational Contracts Batch 2

Status: **scoped PASS — CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-CONTRACT-OPS-002 — Operational Kanban + Exception Queue + Control Tower**
Stacked base: **T7-DATAGRID-001 / `717ac1584bca58cc3a68bc23d2b692cc71b8b66d`**

## Gate decision

Batch 2 is classified as **CONTRACT GAP**, not a component gap. The three
recipes already had mature, generic compositions and a live reference surface:

- `operational-kanban` uses `Card`, `StatusChip`, and `Button` for a portfolio
  of work waiting in bounded human-action stages;
- `exception-queue` uses the canonical Entity List grammar with
  `FilterToolbar`, `DataTable`, and `DetailDrawer` for attention-ranked work;
- `control-tower` composes `Alert`, `KPICluster`, and `DataTable` around
  exception-first priorities and accountable next actions.

Discovery did not prove a reusable `StageBoard`, `ExceptionCard`, or
`ControlTowerPanel` leaf capability that could not be expressed by the
existing implemented contracts. No domain-shaped component was added.

The three legacy catalog decisions are now registered as typed canonical
contracts. Completion is **CONTRACT MIGRATED + PROVEN** for the contract,
registry, generated projections, CLI retrieval, catalog parity, and recipe
detail surfaces. Completion is **COMPOSED + PROVEN** for the synthetic
reference adoption, responsive behavior, keyboard/focus behavior, and
accessibility checks. Consumers continue to own domain data, workflow
transitions, WIP meaning, permissions, calculations, escalation, and
persistence.

## Classification matrix

| Requirement                                                                            | Classification | Completion state                               | Evidence                                                                                                                   |
| -------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Operational Kanban — many work objects by bounded human-action stage                   | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, canonical Card/StatusChip/Button composition, Process Workspace reference, recipe detail and browser proof |
| Exception Queue — attention-ranked deviations with reason, owner, age, and next action | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, Entity List/DataTable/DetailDrawer composition, Control Tower reference, recipe detail and browser proof   |
| Control Tower — exception-first cross-flow operating overview                          | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, Alert/KPICluster/DataTable composition, Control Tower reference, recipe detail and browser proof           |
| New Kanban/queue/tower primitive                                                       | READY          | READY / not required                           | Existing implemented catalog contracts cover the repeated generic behavior; no component gap evidence                      |
| Drag-and-drop movement, WIP policy, escalation, authorization, or persistence          | PRODUCT OWNED  | PRODUCT OWNED                                  | No such behavior is implemented in the reference or typed contract                                                         |

## Source and ownership boundary

The governing AAPM requirement explicitly says these patterns are mature
composition contracts and that Batch 2 should migrate their decisions into
typed source without casually changing semantics. The migration preserves:

- `useWhen` and `avoidWhen` selection rules;
- anatomy and required/optional semantics;
- responsive and accessibility guidance;
- AI guidance and anti-patterns;
- relationship map and `/operational-patterns` reference path;
- compatibility catalog values and generated shard shape.

Ten4Seven owns the generic presentation grammar, component contracts,
semantic tokens, responsive behavior, keyboard/accessibility behavior, and
recipe selection guidance. A consumer supplies object identity, stage,
severity, owner, age, next action, due time, WIP reference, forecast, and any
policy or workflow truth. The reference fixture uses synthetic values only.

## Implementation path

| Plane                 | Evidence                                                                                                                                         | Result                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed source          | `packages/contracts/src/operational-patterns.ts`                                                                                                 | Added `OPERATIONAL_KANBAN_CONTRACT`, `EXCEPTION_QUEUE_CONTRACT`, and `CONTROL_TOWER_CONTRACT` with the legacy semantic payload preserved                                   |
| Canonical registry    | `packages/contracts/src/canonical.ts`                                                                                                            | All three recipes now resolve through `CANONICAL_CONTRACTS.recipes`                                                                                                        |
| Compatibility catalog | `packages/ai/catalog/recipes.json`                                                                                                               | Existing full descriptions remain unchanged and serve as parity source                                                                                                     |
| Generated projection  | `generated/recipes/{operational-kanban,exception-queue,control-tower}.json`, compact/index projections, and mirrored `packages/agent/generated/` | `pnpm contracts:generate` switches the three recipe sources to `canonical-contract` without hand-editing generated files                                                   |
| Agent/CLI             | `packages/ai/bin/t7ui.mjs`, `scripts/verify-contracts.mjs`, `scripts/verify-ai-catalog.mjs`                                                      | `t7ui recipe inspect` and `t7ui find` return the canonical recipe decisions; parity checks cover seven typed operational recipes                                           |
| Reference surface     | `apps/playground/src/operational-reference.tsx`                                                                                                  | Control Tower view composes Control Tower + Exception Queue + Resource Forecast; Process Workspace view composes Operational Kanban + Process Workspace + Activity & Audit |
| Documentation         | `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_PATTERN_MATRIX.md`, AAPM capability/handoff docs                      | Selection, ownership, responsive, accessibility, and adoption guidance remain explicit                                                                                     |
| Tests                 | `tests/operational-patterns.spec.ts` plus contract/AI/component-system gates                                                                     | Added recipe-detail coverage for all three Batch 2 contracts; existing reference checks cover exception queue, Kanban columns, drawer focus, responsive overflow, and axe  |

No semantic recipe behavior was rewritten. This gate only changes the source
of truth for the three existing decisions and makes that source reproducible.

## Runtime and browser evidence

The reference route is the deterministic local surface:
`http://127.0.0.1:4181/operational-patterns`.

- Desktop `1440×900`: Control Tower shows the exception-first operating
  context, a named `Operational exception queue`, current signals, and
  resource sufficiency; Process Workspace shows four named Kanban columns with
  object identity, owner, stage, age, and next action.
- Tablet and mobile widths retain readable exception reason, owner, and next
  action semantics. Kanban is allowed to scroll or stack by stage; the
  document itself has no horizontal overflow.
- Exception inspection is keyboard operable. Escape dismisses the contextual
  drawer and returns focus to its invoking row action.
- Severity, stage, and next action remain text-bearing; icons and color are
  supplementary.
- Recipe detail routes `/recipes/control-tower`, `/recipes/exception-queue`,
  and `/recipes/operational-kanban` expose the operational semantics,
  responsive guidance, accessibility guidance, AI guidance, and the
  `AAPM Operational Reference` link.
- The fixture is synthetic and performs no API request, authorization check,
  WIP calculation, escalation, mutation, or persistence.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS; 188 reproducible projections and three
  DTCG-compatible token exports.
- `pnpm test:contracts` — PASS; 29 recipes and seven typed operational recipes
  with semantic parity.
- `pnpm t7ui recipe inspect control-tower` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui recipe inspect operational-kanban` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui recipe inspect exception-queue` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui find "control tower exception next action"` — PASS; resolves
  `control-tower` and only implemented canonical components.
- `pnpm test:ai` — PASS; catalog/reference cold-start checks continue to pass
  with no donor reads.
- `pnpm test:component-system` — PASS; all recipe components are implemented
  and canonical component ownership remains intact.
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm build` — PASS (playground production build).
- Batch 2 Playwright recipe-detail slice — PASS; all three canonical recipe
  detail pages expose semantic, guidance, reference, and overflow assertions.
- Existing operational reference Playwright checks — PASS for Batch 2
  semantics, drawer focus restoration, responsive overflow, and
  serious/critical axe checks.
- Targeted Prettier check over changed TypeScript, test, and evidence files —
  PASS.

### Baseline debt / not a gate blocker

- `pnpm format:check` remains a repository-wide baseline failure (360 existing
  files, predominantly CRLF/formatting drift); changed files pass targeted
  formatting.
- `pnpm test` stops at the pre-existing component-token-coverage report's
  CRLF/LF mismatch before reaching `pnpm test:slice-a`; the scoped contract,
  package, build, AI, and browser checks above are green. When run past that
  report in the established baseline, `test:slice-a` is also known to lack a
  local `@ten4seven/agent` resolution.
- `pnpm test:consistency` retains the known `styles.css:4232 raw shadow`
  violation from earlier SectionNavigation work; this gate does not alter
  unrelated component CSS.
- Existing operational visual baselines may show environment-level pixel drift;
  this migration does not overwrite unrelated snapshots.

## Stop-condition audit and next gate

No donor/runtime dependency, breaking public API, business calculation,
authorization logic, `aapm_prod` access, or semantic existing-recipe rewrite
was needed. Generic versus product ownership is explicit, and no new
component was justified by the evidence.

This gate is safe to hand off automatically to **Gate 10 — Operational
contracts Batch 3: Load Planning + Route Planning + Receiving Console +
Resource Forecast**. That gate should stop at evidence if the requirement
needs a solver, map/scanner runtime, authorization, or a semantic rewrite;
otherwise continue through the same contract → projection → reference →
tests → responsive → accessibility → browser QA chain.
