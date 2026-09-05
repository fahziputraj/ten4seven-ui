# T7-CONTRACT-OPS-003 — Operational Contracts Batch 3

Status: **scoped PASS — CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-CONTRACT-OPS-003 — Load Planning + Route Planning + Receiving Console + Resource Forecast**
Stacked base: **T7-CONTRACT-OPS-002 / `01f9e054692e40cb36b32cc382f2c4f9ab1f789e`**

## Gate decision

Batch 3 is classified as **CONTRACT GAP**, not a component gap. The four
recipes already had mature, generic compositions and a live synthetic
reference surface:

- `load-planning` composes `RecordSummary`, `KeyValueList`, `Progress`, and a
  semantic `Table` for capacity, allocation, remaining quantity, manifest,
  sequence, and readiness;
- `route-planning` composes `RecordSummary`, `DataTable`, and `Progress` for
  ordered stops, current/future state, ETA, quantity, and completion;
- `receiving-console` composes `Alert`, `MilestoneTracker`, `KeyValueList`,
  `Progress`, and decision controls for arrival, unloading, QC, receipt, and
  quantity reconciliation;
- `resource-forecast` composes `MetricCard`, `Progress`, `TrendIndicator`,
  and `Sparkline` for consumer-calculated sufficiency context.

Discovery did not prove a reusable `LoadPlanner`, map renderer, scanner,
forecast engine, or domain receiving widget that could not be expressed by
existing implemented contracts. No new component or runtime dependency was
added.

The four legacy catalog decisions are now registered as typed canonical
contracts. Completion is **CONTRACT MIGRATED + PROVEN** for the contract,
registry, generated projections, CLI retrieval, catalog parity, and recipe
detail surfaces. Completion is **COMPOSED + PROVEN** for the synthetic
reference adoption, responsive behavior, and accessibility/browser checks.
Consumers continue to own capacity thresholds, allocation, route ordering,
forecast calculations, QC/finality, permissions, and persistence.

## Classification matrix

| Requirement                                                                                                 | Classification | Completion state                               | Evidence                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Load Planning — capacity, allocation, remaining space, manifest, sequence, readiness                        | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, existing canonical composition, Load & Route reference, recipe detail and browser proof     |
| Route Planning — ordered stops, current/next/future movement, ETA, quantity, exception                      | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, DataTable/Progress composition, Load & Route reference, recipe detail and browser proof     |
| Receiving Console — ARRIVED distinct from RECEIVED with quantity reconciliation and QC decision             | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, lifecycle/decision composition, Receiving reference, recipe detail and browser proof        |
| Resource Forecast — consumer-calculated quantity, consumption, days of cover, incoming supply, trend        | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, metric/progress/trend composition, Control Tower reference, recipe detail and browser proof |
| New map/scanner/solver/forecasting/receiving primitive                                                      | READY          | READY / not required                           | Existing implemented components and bounded recipe semantics cover the generic presentation                 |
| Route optimization, capacity allocation, threshold, forecasting, QC/finality, authorization, or persistence | PRODUCT OWNED  | PRODUCT OWNED                                  | No such behavior is implemented in the reference or typed contracts                                         |
| Geospatial map renderer or native camera scanner                                                            | NATIVE         | NATIVE / explicit boundary                     | AAPM requirement keeps maps optional and scanning outside Web UI; no runtime dependency added               |

## Source and ownership boundary

The governing AAPM requirement marks these four compositions `READY`, requires
the Batch 3 typed-contract migration, and explicitly keeps optional
geospatial/map visualization separate from Route Planning. The migration
preserves:

- `useWhen` and `avoidWhen` selection rules;
- anatomy and required/optional semantics;
- responsive and accessibility guidance;
- AI guidance and anti-patterns;
- relationship map and `/operational-patterns` reference path;
- compatibility catalog values and generated shard shape.

Ten4Seven owns the generic presentation grammar, component contracts,
semantic tokens, responsive behavior, keyboard/accessibility behavior, and
recipe selection guidance. A consumer supplies capacity and allocation truth,
route order and ETA, quantities and QC outcomes, consumption and incoming
supply calculations, target/threshold meaning, permissions, mutation, and
persistence. The reference fixture uses synthetic values only.

## Implementation path

| Plane                 | Evidence                                                                                                                                                         | Result                                                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed source          | `packages/contracts/src/operational-patterns.ts`                                                                                                                 | Added `LOAD_PLANNING_CONTRACT`, `ROUTE_PLANNING_CONTRACT`, `RECEIVING_CONSOLE_CONTRACT`, and `RESOURCE_FORECAST_CONTRACT` with legacy semantic payload preserved                             |
| Canonical registry    | `packages/contracts/src/canonical.ts`                                                                                                                            | All four recipes now resolve through `CANONICAL_CONTRACTS.recipes`                                                                                                                           |
| Compatibility catalog | `packages/ai/catalog/recipes.json`                                                                                                                               | Existing full descriptions remain unchanged and serve as parity source                                                                                                                       |
| Generated projection  | `generated/recipes/{load-planning,route-planning,receiving-console,resource-forecast}.json`, compact/index projections, and mirrored `packages/agent/generated/` | `pnpm contracts:generate` switches the four recipe sources to `canonical-contract` without hand-editing generated files                                                                      |
| Agent/CLI             | `packages/ai/bin/t7ui.mjs`, `scripts/verify-contracts.mjs`, `scripts/verify-ai-catalog.mjs`                                                                      | `t7ui recipe inspect` and `t7ui find` return canonical recipe decisions; parity checks cover eleven typed operational recipes                                                                |
| Reference surface     | `apps/playground/src/operational-reference.tsx`                                                                                                                  | Load & Route view composes Load Planning + Route Planning; Receiving view composes Receiving Console + Decision Workspace; Control Tower includes Resource Forecast                          |
| Documentation         | `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_PATTERN_MATRIX.md`, AAPM capability/handoff docs                                      | Selection, ownership, responsive, accessibility, and adoption guidance remain explicit                                                                                                       |
| Tests                 | `tests/operational-patterns.spec.ts` plus contract/AI/component-system gates                                                                                     | Added recipe-detail coverage for all four Batch 3 contracts; existing reference checks cover route order, capacity/quantities, ARRIVED ≠ RECEIVED, QC decision, responsive overflow, and axe |

No semantic recipe behavior was rewritten. This gate only changes the source
of truth for the four existing decisions and makes that source reproducible.

## Runtime and browser evidence

The reference route is the deterministic local surface:
`http://127.0.0.1:4183/operational-patterns`.

- Desktop `1440×900`: Load & Route presents capacity `9,000 kg`, allocated
  `7,300 kg`, remaining `1,700 kg`, utilization `81%`, a named ordered route,
  and the vehicle manifest. Receiving keeps arrival, unloading, quantities,
  QC, and the decision context together. Control Tower presents `4.6 days`
  of consumer-supplied resource cover.
- Tablet and mobile widths retain route order, ETA, quantities, and the
  arrival/receipt distinction. Supporting visualizations reduce before
  decision semantics; the document itself has no horizontal overflow.
- Receiving decision controls are keyboard-operable and keep evidence, reason,
  owner, and outcome together. The fixture records no API or inventory change.
- Route understanding does not depend on a map. No map, scanner, optimizer,
  or forecast algorithm is loaded.
- Recipe detail routes `/recipes/load-planning`, `/recipes/route-planning`,
  `/recipes/receiving-console`, and `/recipes/resource-forecast` expose the
  operational semantics, responsive guidance, accessibility guidance, AI
  guidance, and the `AAPM Operational Reference` link.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS; generated projections and DTCG exports are
  reproducible from typed source.
- `pnpm test:contracts` — PASS; 29 recipes and eleven typed operational
  recipes with semantic parity.
- `pnpm t7ui recipe inspect load-planning` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui recipe inspect route-planning` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui recipe inspect receiving-console` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui recipe inspect resource-forecast` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm test:ai` — PASS; catalog/reference cold-start checks continue to pass
  with no donor reads.
- `pnpm test:component-system` — PASS; all recipe components are implemented
  and canonical component ownership remains intact.
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm build` — PASS (playground production build).
- Batch 3 Playwright recipe-detail and reference slice — PASS; route,
  receiving, forecast, responsive overflow, decision, and axe assertions are
  green.
- Targeted Prettier check over changed TypeScript, test, and evidence files —
  PASS.

### Baseline debt / not a gate blocker

- `pnpm format:check` remains a repository-wide baseline failure from existing
  CRLF/formatting drift; changed files pass targeted formatting.
- `pnpm test` remains gated by the pre-existing component-token-coverage
  report's CRLF/LF mismatch before `pnpm test:slice-a`; no unrelated baseline
  regeneration was performed.
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

This gate is safe to hand off automatically to **Gate 11 — Entity 360 typed
contract**. That gate should stop at evidence if shared customer/supplier/farmer
semantics require a breaking identity model, scoring/authorization, or a
product-owned business calculation; otherwise continue through the same
contract → projection → reference → tests → responsive → accessibility →
browser QA chain.
