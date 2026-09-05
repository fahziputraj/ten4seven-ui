# Operational AI Guidance

Status: **generated, verified, and bounded**

## Cold-start retrieval order

An agent selecting operational UI should use this order:

1. Read `generated/agent-index.json`.
2. Read `generated/recipes.compact.json` for the smallest useful selection
   surface.
3. Run `pnpm t7ui find "<user intent>"`.
4. Run `pnpm t7ui recipe inspect <recipe-id>` for the selected operational
   recipe.
5. Read `docs/ai/OPERATIONAL_PATTERNS.md` for cross-pattern rules.
6. Inspect `/operational-patterns` when rendered composition evidence is needed.
7. Open the full recipe/component/icon catalogs only when the compact
   projections do not answer the question.

Do not begin with donor research. A donor lookup remains a design-system gap
event after canonical Ten4Seven and the AAPM extraction have both been checked.

## Intent-to-pattern decision

```text
Cross-workstream priorities now?            → Control Tower
One object moving through stages?           → Process Workspace
Many items waiting across states?           → Operational Kanban
Capacity and allocation?                    → Load Planning
Arrival, unloading, QC, receipt?             → Receiving Console
Ordered stops and ETA sequence?              → Route Planning
Shared partner/customer/farmer context?      → Entity 360
Evidence-led judgment and rationale?         → Decision Workspace
Exceptions are the primary work collection? → Exception Queue
Why/how did state change?                    → Activity & Audit Stream
How long will a resource remain sufficient? → Resource Forecast
```

## Required prompt semantics

Before composing, identify:

- the operational object;
- its current state;
- completed/current/next movement;
- the exception and consequence, if present;
- accountable owner;
- explicit next action and time window;
- trace/evidence needed to explain the state.

If those facts are absent, keep placeholders honest or request product data. Do
not fabricate quantities, thresholds, owners, SLAs, forecasts, permissions, or
audit guarantees.

## Canonical composition rules

- Build with catalogued components; never create a local Button, Input, Card,
  Modal, Drawer, Table, Badge, navigation primitive, or alternate icon system.
- Configure semantic theme tokens first. Use `className` for layout and
  operational composition, not local color/radius/type/shadow systems.
- Use `T7Icon` semantic names. Do not put raw Iconify provider strings in
  product code.
- Choose `DataTable` only when selection/sorting/pagination/column behavior is
  part of the contract; use the lightweight `Table` family for readable static
  comparisons.
- Use `DetailDrawer` for record inspection, `Drawer` for generic contextual
  work, `Modal` for a focused task, and `AlertDialog` for final irreversible
  confirmation.
- Present consumer-computed forecasts and routes; never invent prediction or
  optimization logic in Ten4Seven.

## CLI evidence

The catalog verifier now checks 28 recipes, including all eleven operational
recipes at maturity `mature`, complete use/avoid/anatomy/semantic/responsive/
accessibility/AI/anti-pattern/relationship fields, and the bounded reference
path.

Examples:

```bash
pnpm t7ui find "control tower exception next action"
pnpm t7ui find "receiving arrival receipt difference decision evidence"
pnpm t7ui find "days of cover incoming supply"
pnpm t7ui recipe inspect decision-workspace
```

**OBSERVED:** the natural receiving intent resolves `receiving-console` and
returns semantic icons including `warehouse`, `stockIn`, `package`, `warning`,
and `approve`. The existing `inventory list` query still resolves
`entity-list` and prioritizes inventory-domain icons. `pnpm test:ai` reports
28 recipes, 145 components, 12 expressive blocks, 98 semantic icons, and a
cold-start proof of 11 tasks / 12 contract reads / 0 donor reads.

## Output boundary

Generated projections are reproducible outputs. Update the typed/catalog
source and run `pnpm contracts:generate`; do not hand-maintain a second agent
manifest. The reference fixture is evidence, not a scaffold containing Farm
business behavior.
