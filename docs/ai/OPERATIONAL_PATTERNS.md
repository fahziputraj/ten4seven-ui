# Operational UX pattern guide

## Scope

This guide is the authoritative human-readable selection contract for the
Ten4Seven operational pattern layer. The typed canonical source for migrated
recipes is `packages/contracts/src/operational-patterns.ts`; generated shards
under `generated/recipes/` are the preferred bounded retrieval surface. The
legacy `packages/ai/catalog/recipes.json` remains a compatibility surface until
the remaining operational recipes are migrated.

The pattern layer composes canonical components. It does not add eleven
domain-specific mega-components, business rules, APIs, forecasting algorithms,
or product persistence.

The shared operational grammar is:

`OBJECT + STATE + MOVEMENT + EXCEPTION + OWNER + NEXT ACTION + TRACE`

A product may omit a field only when it is genuinely irrelevant. It must not
replace state, ownership, or next action with decorative metrics or color.

## Selection matrix

| Pattern                 | Choose when the primary question is                                  | Required proof                                                                                                | Do not use as                                          |
| ----------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Control Tower           | What needs attention now across several flows?                       | prioritized exception, current state, owner, next action, due time, relevant forecast/capacity                | a vanity KPI dashboard or historical report            |
| Process Workspace       | Where is one object now and what moves it forward?                   | object identity, lifecycle, current state, owner, next action, history                                        | a multi-object board or generic form wizard            |
| Operational Kanban      | Which of many work objects occupy each bounded state?                | explicit columns, object identity, owner or next action, exception visibility                                 | an unbounded sticky-note canvas                        |
| Load Planner            | Can assigned objects fit a bounded resource?                         | capacity, allocated, remaining, utilization, assignment/manifest                                              | a routing engine or optimization algorithm             |
| Receiving Console       | What physically arrived, what was counted, and what can be received? | ARRIVED distinct from RECEIVED, lifecycle, ordered/delivered/physical/accepted quantities, variance, decision | a one-click receipt confirmation                       |
| Route Planner           | What is the ordered movement and which stop is current/next?         | ordered stops, current and next stop, ETA, assigned quantity/resource                                         | a map renderer or route optimization engine            |
| Entity 360              | What is the complete actionable context for one business entity?     | identity, relationship status, current work, exceptions, decisions, owner, trace                              | an unrelated dashboard collection                      |
| Decision Workspace      | What evidence supports the bounded decision?                         | evidence, options, selected outcome, reason, owner, resulting next action, trace                              | a generic confirmation dialog                          |
| Readiness Review        | Can this object proceed now, and what factual conditions block it?   | target/subject, consumer-supplied result, ordered blockers, resolution hints, freshness, next context         | a human decision flow or a UI-owned eligibility engine |
| Exception Queue         | Which deviations require accountable action first?                   | affected object, severity/reason, age, owner, next action, due/escalation                                     | a generic inbox without consequence                    |
| Activity & Audit Stream | Who did what, when, to which object, and from what source?           | ordered events, actor/system, timestamp, action, object, source/evidence                                      | prose-only activity or an editable log                 |
| Resource Forecast       | How long will a resource remain sufficient?                          | current quantity, consumption basis, days of cover/time-to-empty, incoming quantity and ETA                   | a forecasting implementation inside the UI system      |

## Relationship map

```text
Control Tower
  ├─ Exception Queue ──> Decision Workspace
  ├─ Resource Forecast ──> Load Planner
  └─ Process Workspace ──> Operational Kanban
                                │
Receiving Console ──────────────┤
  └─ Decision Workspace         ├─> Activity & Audit Stream
                                │
Route Planner <── Load Planner ─┘

Entity 360
  ├─ current Process Workspaces
  ├─ relevant Exceptions
  ├─ bounded Decisions
  └─ Activity & Audit Stream

Readiness Review
  ├─ Process Workspace → next checkpoint context
  ├─ Decision Workspace → consequential human disposition when needed
  └─ Activity & Audit Stream → prior evaluation trace when supplied
```

Relationships describe composition, not mandatory nesting. Start with the
smallest pattern that answers the user's operating question.

## Canonical composition rules

1. Start with `AppShell → Sidebar → PageHeader → bounded route content` for a
   private operational surface.
2. Use `DataTable` for comparable operational records and `Table` for a small,
   readable manifest or evidence table.
3. Use `MilestoneTracker` for a short, bounded object lifecycle, `Progress`
   for a scalar, and `ActivityFeed` for ordered human-readable trace. A
   milestone stage must keep its textual state, integrated percentage, and
   selection/detail relationship visible; do not replace those signals with a
   decorative roadmap or disconnected progress indicators.
4. Use `Alert` for an important persistent condition and `StatusChip` for a
   compact state whose meaning is also written in text.
5. Use Readiness Review when the consumer has already evaluated whether an
   object can proceed. Keep the result, blocker reasons, resolution hints, and
   freshness context in text; the recipe never calculates or reevaluates them.
6. Use `DetailDrawer` for contextual inspection, `Modal` for a focused task,
   and `AlertDialog` only for irreversible confirmation.
7. Use `RadioGroup`, `Radio`, `Textarea`, and `ActionFooter` to compose a
   bounded decision. The consumer owns the decision policy and persistence.
8. Use `RevisionDiff` when several consumer-supplied facts need an explicit
   before/after comparison with change kind, reason, actor, occurred-at, and
   evidence/source context. Keep the component presentation-only: the
   consumer owns diff calculation, correction policy, persistence, and audit
   storage.
9. Use `SectionNavigation` for labelled anchors inside a long form or bounded
   workspace. Give each item a stable section ID, pass `activeId` only when a
   consumer owns scroll-spy state, and keep validation, business state, and
   scroll observation outside the component. Its narrow layout is a compact
   native menu, not a second navigation system.
10. Use `QrCode` for Web display, copy, and print of an opaque consumer-owned
    value. Supply the resource label and accessible description; keep payload
    generation, resolution, authorization, camera access, and scanning native
    or product-owned.
11. Use `HierarchyPicker` for nested resource selection with visible ancestry,
    partial selection, disabled nodes, optional local search, and keyboard tree
    navigation. Supply opaque IDs and labels; permission meaning, scope
    persistence, and authorization remain consumer-owned.
12. Keep visible-but-unavailable actions discoverable. Render a native-disabled
    `Button`, expose the consumer-supplied reason as linked helper text, and
    place a focusable `IconButton` reason trigger inside `Tooltip`; do not wrap
    the disabled control directly or put permission rules into `Button`.
13. Use semantic `T7Icon` names. Do not introduce raw provider strings or a
    runtime icon CDN.
14. Apply a theme recipe before local layout. Product-specific CSS may arrange
    canonical parts but must use semantic tokens.

## Consumer ownership boundary

Ten4Seven owns:

- component behavior, keyboard interaction, focus, overlay semantics, and
  responsive component states;
- composition guidance, pattern anatomy, semantic tokens, and semantic icons;
- visual hierarchy for exception, state, next action, and trace;
- presentation of values supplied by a consumer.
- presentation of before/after values and explicit change labels supplied by a
  consumer; `RevisionDiff` does not calculate or persist revisions.
- page-local anchor rendering and responsive disclosure through
  `SectionNavigation`; the consumer owns section IDs, scroll observation, and
  form/workflow state.
- QR matrix rendering plus copy/print presentation through `QrCode`; the
  consumer owns payload meaning, resource resolution, authorization, and
  scanner/native camera behavior.

The consumer owns:

- domain entities and vocabulary;
- state machines, permissions, calculations, policies, and validation;
- forecasting, allocation, routing, reconciliation, and escalation logic;
- data fetching, mutation, persistence, audit storage, and authorization;
- truthfulness and freshness of every displayed value.

For example, `Resource Forecast` may present `10.2 t`, `2.2 t/day`, and
`4.6 days of cover`; Ten4Seven does not calculate or predict those values.
Likewise, `Load Planner` presents capacity and allocation supplied by the
consumer; it is not a solver.

## Responsive contract

Desktop may place decision-relevant context side by side, but attention order
still begins with the exception or current object. Tablet removes supporting
metrics before it compresses owner, state, next action, or quantity semantics.
Mobile uses one vertical reading order:

1. object and current state;
2. exception or decision required;
3. owner and next action;
4. movement, quantities, or forecast basis;
5. supporting trace.

Tables must use the canonical scroll or stacked behavior. Operational Kanban
may become two columns on tablet and one column on phone. A route keeps its
stop order. A receiving view never hides the distinction between arrival and
receipt. Numeric values retain units.

## Accessibility contract

- Use one route-level `h1` and named `section`, `nav`, `table`, `form`, and
  dialog regions.
- Communicate severity, completion, and current state in text; color and icon
  are supplementary.
- Name scalar progress and expose its numeric value.
- Preserve logical DOM order when layouts collapse.
- Give tables captions and actions contextual accessible names.
- Group decision options in a labelled fieldset, state evidence before the
  action, and describe the outcome precisely.
- Keep drawer and modal focus trapped while open, support Escape dismissal,
  and restore focus to the invoker.
- Do not auto-advance a lifecycle or silently apply a decision.

## AI retrieval and selection

Start from the generated entry point:

```bash
pnpm t7ui find "control tower exception next action"
pnpm t7ui recipe inspect control-tower
```

Other examples:

```bash
pnpm t7ui find "arrival unloading received quantity mismatch"
pnpm t7ui recipe inspect receiving-console

pnpm t7ui find "vehicle capacity allocation remaining load"
pnpm t7ui recipe inspect load-planning

pnpm t7ui find "days of cover incoming supply"
pnpm t7ui recipe inspect resource-forecast

pnpm t7ui find "can this object proceed why blocked"
pnpm t7ui recipe inspect readiness-review
```

Read the selected recipe's `operational.useWhen`, `avoidWhen`, `anatomy`,
`requiredSemantics`, `responsive`, `accessibility`, `aiGuidance`, and
`antiPatterns` before composing. Then read only the generated component shards
for the components named by the recipe.

Do not select a pattern only because its visual form resembles the request.
Select it by the operating question and required semantics. A request for
“cards showing supplier stats” may actually require `Entity 360`; a request
for “a dashboard” may be a `Control Tower`, `Report`, or neither.

Use Readiness Review when the consumer has already evaluated whether an object
can proceed and the user needs factual blockers or resolution. Use Decision
Workspace only when a person must choose a consequential outcome from
evidence. Readiness Review never owns eligibility rules, thresholds,
permissions, or reevaluation.

## AAPM reference adoption

`/operational-patterns` is a deterministic, non-production adoption fixture.
It demonstrates the mature operational patterns and Readiness Review through
six bounded workspace views:

- Control Tower: Control Tower, Exception Queue, Resource Forecast;
- Process Workspace: Process Workspace, Operational Kanban, Activity & Audit
  Stream;
- Load & Route: Load Planner and Route Planner;
- Receiving: Receiving Console and Decision Workspace;
- Entity 360: Entity 360, Decision Workspace, and Activity & Audit Stream;
- Readiness Review: consumer-supplied ready, blocked, and incomplete states.
- Entity 360: a RevisionDiff reference with six synthetic field changes and
  provenance metadata, plus a SectionNavigation reference with five stable
  page-local anchors; both demonstrate presentation-only context.
- Component Lab: a `QrCode` reference with an AAPM Mobile deep-link fixture,
  accessible SVG description, copy status, print action, and narrow-layout
  proof; the deep-link meaning remains a consumer concern.

The fixture does not create an AAPM ERP, connect APIs, implement policies, or
embed AAPM colors into generic primitives. A future AAPM product should apply
its profile at the provider/root theme boundary and keep the Ten4Seven token
engine canonical.

## Maturity and freeze rule

These operational recipes are marked `mature` at the composition-contract
layer.
That means their selection rules, anatomy, semantic minimums, responsive
behavior, accessibility guidance, AI hints, and bounded reference adoption are
available. It does not certify a future consumer's business logic.

A change to required semantics, ownership, or relationship rules is an
architecture change and must update the source catalog, generated projections,
AI verification, reference evidence, and this guide together.
