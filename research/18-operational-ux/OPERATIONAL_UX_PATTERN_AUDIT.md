# Operational UX Pattern Audit

Status: **PASS for the bounded operational pattern layer**  
Date: 2026-09-03  
Scope: generic Ten4Seven composition guidance plus one deterministic AAPM-shaped reference fixture

## Audit question

Can Ten4Seven express mature operational work without introducing a second
component system, embedding product business logic, or reducing every workflow
to a generic dashboard/table?

**OBSERVED:** yes. Eleven operational patterns are now explicit recipe
contracts in `packages/ai/catalog/recipes.json`, projected into the compact
agent artifacts, documented for humans, and rendered through one bounded
reference route at `/operational-patterns`.

The shared semantic model is:

```text
OBJECT + STATE + MOVEMENT + EXCEPTION + OWNER + NEXT ACTION + TRACE
```

Every mature pattern does not need to render every field at equal weight, but
the composition must preserve the parts required to understand what is moving,
what is wrong, who owns the next step, and how the state was reached.

## Before and after

**SOURCE — before this work:** the repository already had strong primitives,
patterns, theme/runtime contracts, overlay behavior, and a production-looking
Operations Tracker. The catalog did not yet give an agent first-class selection
contracts for Control Tower, Process Workspace, Operational Kanban, Load
Planning, Receiving Console, Route Planning, Entity 360, Decision Workspace,
Exception Queue, Activity & Audit Stream, or Resource Forecast.

**NORMALIZED — after this work:** those eleven concepts are recipes composed
from existing implemented contracts. No `OperationalButton`, `ERPTable`,
parallel dialog, parallel token engine, or product-specific primitive was
created.

## Pattern coverage

| Pattern                 | Maturity | What the reference proves                                           | Primary canonical contracts                                                  |
| ----------------------- | -------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Control Tower           | mature   | exception-first priorities, KPIs, accountable decision horizon      | `AppShell`, `Sidebar`, `PageHeader`, `Alert`, `KPICluster`, `DataTable`      |
| Process Workspace       | mature   | one order, current stage, owner, next action, milestones, trace     | `RecordSummary`, `MilestoneTracker`, `KeyValueList`, `ActivityFeed`          |
| Operational Kanban      | mature   | a portfolio of work distributed by operational state                | `Card`, `StatusChip`, `Button`, optional `Avatar`/`DetailDrawer`             |
| Load Planning           | mature   | capacity, allocation, remaining capacity, utilization, manifest     | `RecordSummary`, `KeyValueList`, `Progress`, `Table`                         |
| Receiving Console       | mature   | arrival, unloading, QC, receipt, inventory, quantity reconciliation | `Alert`, `MilestoneTracker`, `KeyValueList`, `Progress`, decision controls   |
| Route Planning          | mature   | ordered stops, current/next/future movement, ETA context            | `RecordSummary`, `DataTable`, `Progress`, optional `ActivityFeed`            |
| Entity 360              | mature   | partner identity, relationship context, work, signals, history      | `RecordSummary`, `KeyValueList`, `ActivityFeed`, optional `DataTable`/drawer |
| Decision Workspace      | mature   | evidence, reason, owner, disposition, explicit outcome              | `Alert`, `RadioGroup`, `Textarea`, `ActionFooter`                            |
| Exception Queue         | mature   | attention-ranked collection with accountable next actions           | `FilterToolbar`, `DataTable`, `DetailDrawer`, optional `KPICluster`          |
| Activity & Audit Stream | mature   | readable chronology plus evidence-oriented trace fields             | `ActivityFeed`, `KeyValueList`, optional `DataTable`/filters                 |
| Resource Forecast       | mature   | current stock, rate, incoming supply, threshold, time-to-empty      | `MetricCard`, `Progress`, `TrendIndicator`, `Sparkline`                      |

The detailed selection contract is in `OPERATIONAL_PATTERN_MATRIX.md`.

## Reference composition

`apps/playground/src/operational-reference.tsx` intentionally uses five views
instead of eleven disconnected demos:

1. **Control tower** composes Control Tower, Exception Queue, and Resource
   Forecast.
2. **Process workspace** composes Process Workspace, Operational Kanban, and
   Activity & Audit Stream.
3. **Load & route** composes Load Planning and Route Planning.
4. **Receiving** composes Receiving Console, Decision Workspace, and Activity
   & Audit Stream semantics.
5. **Entity 360** composes Entity 360, Decision Workspace, and a trace.

This relationship is deliberate: the recipes remain individually selectable,
while the reference demonstrates that mature operational UX is a composition
graph rather than eleven unrelated mega-components.

## Canonical ownership review

| Concern                                                                 | Owner                                      | Finding                                                                        |
| ----------------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------ |
| color, type, radius, density, focus, motion, elevation                  | Ten4Seven semantic tokens/theme runtime    | PASS — route CSS uses semantic variables; no AAPM hex values are embedded      |
| shell, navigation, headers, cards, tables, progress, overlays, controls | `@ten4seven/ui`                            | PASS — existing implemented contracts are reused                               |
| icon meaning                                                            | `T7Icon` semantic names/local Solar bundle | PASS — no runtime Iconify/CDN provider strings                                 |
| pattern selection/anatomy                                               | recipe catalog + generated projections     | PASS — rich operational metadata is generated and verified                     |
| quantities, owners, thresholds, lifecycle meaning                       | consumer/product                           | PASS — reference values are deterministic fixtures, not algorithms             |
| persistence/API/routing/authorization                                   | consumer/product                           | PASS — no ERP API, mutation, database, or production authorization exists here |

## Receiving and decision semantics

The receiving proof makes `ARRIVED ≠ RECEIVED` explicit. It separately renders
ordered (`400`), delivered (`400`), physical (`376`), accepted (`373`), damaged
(`3`), and remaining (`24`) quantities. The fixture decision requires a named
disposition and reason, reports the local outcome, and explicitly says that no
API or production inventory was changed.

This avoids three high-risk operational anti-patterns:

- equating a vehicle arrival with accepted inventory;
- collapsing reconciliation into one ambiguous “quantity” field;
- using an irreversible confirmation dialog before evidence and rationale are
  visible.

## Responsiveness, theme, and accessibility

**OBSERVED:** the focused Playwright suite passed 15/15 after a bounded visual
refresh. It covers all five views at 1186×698, 840×900, 390×844, and 360×800;
dark + compact + more-contrast + reduced-motion preferences; drawer Escape and
focus restoration; decision input; semantic tables/list/fieldsets; serious and
critical axe checks; and nine controlled screenshots.

The canonical danger badge token was corrected at the token owner after axe
measured insufficient contrast in the first run. The current semantic contrast
gate measures the lowest enterprise-light danger foreground at `4.80:1`, above
the WCAG AA `4.5:1` text threshold used by the repository gate.

See `RESPONSIVE_QA.md`, `ACCESSIBILITY_QA.md`, and
`VISUAL_REGRESSION_REVIEW.md` for the bounded evidence.

## Milestone workflow hardening

**SOURCE — 2026-09-03:** the first Operations Tracker rendition used large
circular nodes, a connector line, a percentage label, and a separate meter for
each stage. The duplicated visual encodings made the ordered operational state
read more like a generic roadmap than a work queue.

**NORMALIZED:** `MilestoneTracker` now renders a compact, selectable workflow
rail. Each stage presents its ordinal, textual state, semantic icon, label,
work-count context, percentage, and one integrated progressbar. The selected
stage receives the primary visual surface and remains linked to its live detail
region. A blocked stage communicates `Needs attention` in text as well as by
color. On constrained widths, the same ordered rail scrolls horizontally rather
than introducing a second mobile-only tracker.

**OBSERVED:** direct Chromium rendering covered the settled light desktop
1440×900, mobile 390×844, and dark/compact/more-contrast/reduced-motion desktop
1440×900 states. The dark review recorded zero document and rail overflow. The
focused regression tests also verify five progressbars, keyboard `Enter`
selection, selected-stage detail, and no document overflow at compact desktop.

## Explicit non-claims

- **INFERRED:** these patterns are suitable foundations for Farm workflows
  when the product supplies domain data, permissions, validation, and actions.
- **UNKNOWN:** which exact patterns Farm will enable first and which roles may
  execute each action.
- **UNVERIFIED:** live ERP integration, production data scale, product-level
  authorization, non-Chromium engines, and real route transitions with Farm
  networking.
- **PROPOSED:** Farm should select and compose these recipes under ECO-ADR-004;
  it should not copy the AAPM fixture as product logic.

## Conclusion

The operational pattern layer is **mature for bounded design-system use**. It
adds composition intelligence and proof coverage while preserving the existing
Ten4Seven component, theme, icon, package, and consumer-ownership boundaries.
