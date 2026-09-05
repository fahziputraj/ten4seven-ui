# Operational Pattern Matrix

Status: **authoritative selection summary for the eleven mature operational recipes**

Use this matrix after `generated/agent-index.json` and the compact recipe
projection. Use `pnpm t7ui recipe inspect <id>` when the pattern is selected and
the full anatomy is needed.

| Recipe ID            | Select when                                                                     | Do not select when                                                              | Required operational meaning                                                                        | Related composition                                     | Reference view                             |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| `control-tower`      | a user must triage cross-workstream priorities and accountable action now       | a single object lifecycle is the whole task                                     | exception, consequence, owner, decision window, next action                                         | Exception Queue + Resource Forecast + Process Workspace | Control tower                              |
| `process-workspace`  | one object's lifecycle, current stage, handoff, and trace must stay together    | the user is balancing many independent work items                               | object, current/completed/next stages, owner, next action, timestamps                               | Decision Workspace + Activity & Audit Stream            | Process workspace                          |
| `operational-kanban` | many work items wait for people across a bounded set of states                  | one object's detailed lifecycle is primary                                      | meaningful columns, item identity, owner, age/urgency, permitted movement                           | Process Workspace                                       | Process workspace                          |
| `load-planning`      | capacity and allocation determine whether work can proceed                      | a table of shipments is enough and capacity is irrelevant                       | resource identity, total, allocated, remaining, utilization, allocation rows                        | Route Planning + Process Workspace                      | Load & route                               |
| `receiving-console`  | physical arrival, unloading, QC, receipt, and inventory are distinct            | arrival and receipt are genuinely atomic                                        | ARRIVED ≠ RECEIVED; ordered, delivered, physical, accepted, rejected/damaged/short/over             | Decision Workspace + Activity & Audit Stream            | Receiving                                  |
| `route-planning`     | stop sequence and movement order are operationally meaningful                   | a map is decorative or route order is irrelevant                                | route identity, ordered stops, current/next/future, ETA/status, exception                           | Load Planning + Process Workspace                       | Load & route                               |
| `entity-360`         | users need shared customer/supplier/farmer context before acting                | a single transaction or simple profile is sufficient                            | identity, relationship owner, health/status, current work, signals, history                         | Decision Workspace + Activity & Audit Stream            | Entity 360                                 |
| `decision-workspace` | judgment must be made from evidence with rationale and ownership                | the action is already understood and needs only final irreversible confirmation | decision object, evidence, options, reason, owner, consequence/outcome, trace                       | Process Workspace + Activity & Audit Stream             | Receiving / Entity 360                     |
| `exception-queue`    | exception handling is the primary work collection                               | users are browsing ordinary records                                             | exception identity/severity, affected object, owner, age/SLA, next action, detail                   | Control Tower + Process Workspace + Decision Workspace  | Control tower                              |
| `activity-audit`     | chronology and evidence must explain how state changed                          | a decorative recent-activity list is enough                                     | actor/source, action, object, timestamp, resulting state, evidence/reason when relevant             | Process Workspace + Decision Workspace                  | Process workspace / Receiving / Entity 360 |
| `resource-forecast`  | sufficiency over time matters and values are already calculated by the consumer | the design system would need to invent forecasting logic                        | resource, current amount, consumption rate, incoming supply, threshold, time-to-empty, owner/action | Control Tower + Load Planning                           | Control tower                              |

## Relationship map

```text
Resource Forecast ──→ Control Tower ──→ Exception Queue
       │                   │                   │
       └──→ Load Planning ─┴──→ Process Workspace
                 │                    │
                 └──→ Route Planning  ├──→ Decision Workspace
                                      │             │
Receiving Console ────────────────────┘             │
Entity 360 ─────────────────────────────────────────┘
                                                    │
                                                    └──→ Activity & Audit Stream
```

Arrows express a useful drill-in/composition direction, not a mandatory route
or data dependency.

## Shared rules

1. Start with the object and decision, not a chart collection.
2. State must use human-readable meaning; color may reinforce but never own it.
3. Movement must distinguish completed, current, next, and blocked where those
   meanings exist.
4. Exceptions must carry consequence, owner, and a next action—not only a red
   badge.
5. Forecast values and business thresholds come from the consumer. Ten4Seven
   presents them; it does not calculate operational truth.
6. Maps, charts, and dense tables are optional supporting views. They do not
   replace ordered text, labels, or accountable actions.
7. Use `Drawer`/`DetailDrawer` for contextual inspection, `Modal` for a focused
   task, and `AlertDialog` only for an already-understood irreversible action.
8. Keep audit language honest: a UI timeline does not prove immutable storage.

## Canonical versus consumer-owned

Ten4Seven owns the recipe anatomy, component contracts, tokens, accessibility
behavior, semantic icons, and responsive composition guidance. Consumers own
records, calculations, domain terminology, permissions, routing, persistence,
validation, APIs, and side effects.
