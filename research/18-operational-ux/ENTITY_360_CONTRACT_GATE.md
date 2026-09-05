# T7-CONTRACT-OPS-004 — Entity 360 Typed Contract

Status: **scoped PASS — CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **T7-CONTRACT-OPS-004 — Entity 360**
Stacked base: **T7-CONTRACT-OPS-003 / `4b1c1cb`**

## Gate decision

Entity 360 is classified as a **CONTRACT GAP**, not a component gap. The
recipe already had a mature, generic composition and a live synthetic
reference surface for a shared customer/supplier/farmer relationship view:

- `AppShell`, `Sidebar`, and `PageHeader` provide the private workspace shell;
- `RecordSummary` and `KeyValueList` provide identity and labelled facts;
- `ActivityFeed` provides ordered activity context;
- optional `DataTable`, `StatusChip`, `DetailDrawer`, `Button`, and `Avatar`
  cover current work, signals, contextual inspection, and relationship cues.

Discovery did not prove a reusable `EntityProfile`, `PartnerDashboard`, or
domain-specific relationship widget that could not be expressed by existing
implemented contracts. No new component or runtime dependency was added.

The legacy `entity-360` decision is now registered as a typed canonical
contract. Completion is **CONTRACT MIGRATED + PROVEN** for the contract,
registry, generated projections, CLI retrieval, catalog parity, and recipe
detail surface. Completion is **COMPOSED + PROVEN** for the synthetic Entity
360 reference, responsive ordering, RevisionDiff/SectionNavigation context,
and accessibility/browser checks. Consumers continue to own relationship
meaning, scoring, permissions, data truth, and persistence.

## Classification matrix

| Requirement                                                                                                 | Classification | Completion state                               | Evidence                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Shared customer/supplier/farmer identity and relationship context                                           | CONTRACT GAP   | CONTRACT MIGRATED + PROVEN / COMPOSED + PROVEN | Typed contract, canonical RecordSummary/KeyValueList/ActivityFeed composition, Entity 360 reference, recipe detail and browser proof |
| Current work, signals, activity, and history in one actionable context                                      | COMPOSE        | COMPOSED + PROVEN                              | Existing reference composition with named sections, synthetic work/signal/activity data, responsive and accessibility checks         |
| New profile or relationship mega-component                                                                  | READY          | READY / not required                           | Existing implemented contracts express the repeated generic behavior without domain coupling                                         |
| Business reliability score, relationship health calculation, payment/QC meaning, permission, or persistence | PRODUCT OWNED  | PRODUCT OWNED                                  | Entity 360 presents supplied values; no scoring or authorization logic is added                                                      |
| RevisionDiff and SectionNavigation behavior                                                                 | READY          | READY / already proven                         | Existing generic components remain consumer-composed context inside Entity 360                                                       |

## Source and ownership boundary

The governing AAPM requirement marks Entity 360 `READY` as a mature composition
and places it in the fourth typed-contract migration batch. The migration
preserves:

- `useWhen` and `avoidWhen` selection rules;
- anatomy and required/optional semantics;
- responsive and accessibility guidance;
- AI guidance and anti-patterns;
- relationship map and `/operational-patterns` reference path;
- compatibility catalog values and generated shard shape.

Ten4Seven owns generic layout, semantic component contracts, responsive order,
keyboard/accessibility behavior, and selection guidance. A consumer supplies
entity identity and relationship type, current work, owner/contact, relevant
signals, activity, history, and any business health or scoring values. The
consumer also owns permissions, data fetching, state transitions, calculations,
and persistence. The reference fixture uses synthetic values only.

## Implementation path

| Plane                 | Evidence                                                                                                                    | Result                                                                                                                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed source          | `packages/contracts/src/operational-patterns.ts`                                                                            | Added `ENTITY_360_CONTRACT` with the legacy semantic payload preserved                                                                                                                    |
| Canonical registry    | `packages/contracts/src/canonical.ts`                                                                                       | `entity-360` now resolves through `CANONICAL_CONTRACTS.recipes`                                                                                                                           |
| Compatibility catalog | `packages/ai/catalog/recipes.json`                                                                                          | Existing full description remains unchanged and serves as parity source                                                                                                                   |
| Generated projection  | `generated/recipes/entity-360.json`, compact/index projections, and mirrored `packages/agent/generated/`                    | `pnpm contracts:generate` switches Entity 360 to `canonical-contract` without hand-editing generated files                                                                                |
| Agent/CLI             | `packages/ai/bin/t7ui.mjs`, `scripts/verify-contracts.mjs`, `scripts/verify-ai-catalog.mjs`                                 | `t7ui recipe inspect entity-360` and `t7ui find` return canonical decisions; parity checks cover all twelve operational recipes                                                           |
| Reference surface     | `apps/playground/src/operational-reference.tsx`                                                                             | Entity 360 composes summary, current work, relationship signals, RevisionDiff context, SectionNavigation, and activity/audit trace                                                        |
| Documentation         | `docs/ai/OPERATIONAL_PATTERNS.md`, `research/18-operational-ux/OPERATIONAL_PATTERN_MATRIX.md`, AAPM capability/handoff docs | Shared relationship-context selection and ownership boundaries remain explicit                                                                                                            |
| Tests                 | `tests/operational-patterns.spec.ts` plus contract/AI/component-system gates                                                | Added recipe-detail coverage for Entity 360; existing reference checks cover entity identity, current work, activity/audit, RevisionDiff, SectionNavigation, responsive overflow, and axe |

No semantic recipe behavior was rewritten. This gate only changes the source
of truth for the existing decision and makes that source reproducible.

## Runtime and browser evidence

The reference route is the deterministic local surface:
`http://127.0.0.1:4184/operational-patterns`.

- Desktop `1440×900`: Entity 360 keeps the entity heading, relationship owner,
  current work, relationship signals, revision context, and activity/audit
  trace in named sections with one route-level heading.
- Mobile `390×844`: summary comes first, followed by current work, signals,
  revision context, and activity; SectionNavigation collapses into its compact
  keyboard-accessible menu without document overflow.
- RevisionDiff remains presentation-only and keeps before/after facts and
  provenance readable; Entity 360 does not calculate or persist corrections.
- Contextual decision and exception drawers retain Escape dismissal and focus
  restoration. Relationship health and exceptions remain text-bearing.
- Recipe detail `/recipes/entity-360` exposes operational semantics,
  responsive guidance, accessibility guidance, AI guidance, and the
  `AAPM Operational Reference` link.
- The fixture performs no API request, scoring, permission evaluation, or
  persistence.

## Verification matrix

### Scoped PASS

- `pnpm contracts:generate` — PASS; generated projections and DTCG exports are
  reproducible from typed source.
- `pnpm test:contracts` — PASS; 29 recipes and twelve typed operational
  recipes with semantic parity.
- `pnpm t7ui recipe inspect entity-360` — PASS; source is
  `canonical-contract` and all operational fields are present.
- `pnpm t7ui find "entity 360 supplier farmer current work signals history"` — PASS;
  resolves Entity 360 and only implemented canonical components.
- `pnpm test:ai` — PASS; catalog/reference cold-start checks continue to pass
  with no donor reads.
- `pnpm test:component-system` — PASS; all recipe components are implemented
  and canonical component ownership remains intact.
- `pnpm typecheck` — PASS (contracts, agent, playground).
- `pnpm package:build` — PASS (ESM/CJS package build).
- `pnpm build` — PASS (playground production build).
- Entity 360 Playwright recipe-detail and reference slice — PASS; entity
  sections, RevisionDiff, SectionNavigation, drawers, responsive overflow,
  and serious/critical axe assertions are green.
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

This gate is safe to hand off automatically to **Gate 12 — Farm synthetic
consumer completeness proof**. That gate must remain synthetic and stop at
evidence if it requires Farm API/business behavior, real permissions,
production data, permanent Farm repository access, or a consumer-owned
business calculation.
