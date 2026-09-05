# Visual proportion, spatial rhythm and content safety

This is the bounded geometry contract for the current Universal v2 system.
It reuses `packages/tokens/src/theme.ts`, authored recipe composition and
canonical UI components. It is not another spacing engine or a new theme API.

## Ownership and layout

The order is viewport → shell gutter → content rail → section rhythm →
component safe inset → leading/content/trailing slots. Backgrounds may bleed;
meaningful content and focus indicators must remain inside their safe area.

| Role        | Contract                                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gutter      | `--t7-gutter-mobile/tablet/desktop/wide`: 16/24/32/40 px from reference space. Existing authored `--t7-page-gutter` clamps remain authoritative for each recipe. |
| Reading     | `data-t7-rail="reading"`, using the recipe's 64–70 ch reading measure.                                                                                           |
| Form        | `data-t7-rail="form"`, max 640 px; still shrinks to its container.                                                                                               |
| Application | `data-t7-rail="application"`, using recipe `contentMax`.                                                                                                         |
| Wide data   | `data-t7-rail="data"`, max 1480 px.                                                                                                                              |
| Full        | `data-t7-rail="full"`, intentional opt-out from a max width, not permission to remove meaningful-content gutters.                                                |
| Section     | `--t7-section-tight/default/spacious`: density rhythm, authored recipe rhythm, or at least the existing 40 px reference step.                                    |
| Cluster     | `--t7-cluster-tight/default/loose`: 4 px, density control gap, density card-content gap.                                                                         |

`AppShell` already owns its content gutter and bounded application rail.
Do not add another page gutter inside every Card. The workbench keeps its
intentional 1260 px max width; product references retain their existing bounded
rails. Full-bleed public backgrounds retain inner safe content.

```tsx
<AppShell sidebar={<Sidebar {...navigation} />}>
  <PageHeader title="Review receiving" description="Resolve the discrepancy." />
  <section data-t7-rail="form">
    <ReceivingDecision />
  </section>
</AppShell>
```

This illustrates composition; application state and business logic belong to
the consumer. Do not recreate canonical primitives inside `ReceivingDecision`.

## Insets and shape

Existing density roles own control padding, field padding, card/panel padding,
table cells, menu items and overlays. Safe aliases add a floor only where the
most expressive shape needs it:

- Card radii up to 18 px retain at least 12 px; up to 24 px retain at least
  16 px; larger exact radii retain at least 20 px.
- Overlay inset is at least 12 px, or 16 px for panel radii above 24 px.
- Field corner floor is 8 px, or 12 px for control radii above 14 px.
- Menu panel padding preserves an internal focus outline; the largest exact
  panel radius has 10 px corner clearance.

These are bounded rendered tiers, not a generic `radius × padding` formula.
Normal default/comfortable Card insets remain unchanged. Dense is an expert
boundary, not a reason to make body text smaller. Custom radius still resolves
through the existing 0–24 base axis.

## Slots and overflow

| Family                    | Default / disclosure                                                                                                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button                    | Bounded single line, label ellipsis, non-shrinking icons/spinner. `wrap` explicitly permits a long CTA to wrap and grow vertically. Full accessible name is retained.                                                                                                            |
| Card title/description    | Natural wrapping, including unbroken identifiers. Header actions remain separate and bounded; large action groups belong in the footer or an overflow menu.                                                                                                                      |
| NavItem                   | Bounded label with ellipsis; semantic icon never shrinks.                                                                                                                                                                                                                        |
| MenuItem / Select value   | Ellipsis within the text slot; shortcut/check/chevron stays in its own slot. Accessible name retains the complete text.                                                                                                                                                          |
| Field                     | The native editable value can scroll internally; label/helper/error text wraps. Never truncate an error to hide its cause.                                                                                                                                                       |
| Badge / StatusChip        | Secondary single-line signal with bounded text, not a multi-line action. Use descriptive body text or a detail surface for long status explanations.                                                                                                                             |
| DataTable                 | Per-column `overflow`: `wrap`, `nowrap`, `ellipsis`, or two-line `clamp`; omitted preserves the existing rendering contract. Clipped text requires a consumer-owned detail disclosure. Stacked mobile values expose the full content.                                            |
| Table numbers/actions     | Right-align numbers and use tabular digits; deliberate nowrap is allowed inside the owned scroll region. Keep actions required/sticky where needed, or use `responsive="stacked"`.                                                                                               |
| Dialog / Drawer / Tooltip | Title and description wrap; close action is non-shrinking. Overlays retain bounded viewport collision handling.                                                                                                                                                                  |
| Activity / metadata       | Natural wrapping, including long unbroken identifiers.                                                                                                                                                                                                                           |
| KPI / chart values        | Consumer owns appropriate numeric formatting and units. Use compact displayed values plus complete accessible/detail values when precision cannot fit; do not hide critical digits with an unexplained clip. Chart labels stay within the chart's owned viewBox/legend contract. |

Do not put arbitrary rich interactive children in a clipped text slot. Ellipsis
is an intentional presentation policy, never a substitute for a missing
`min-width: 0` or an escaped action. A full accessible name does not replace a
visual detail path when users need to read every character.

```tsx
const columns: DataTableColumn<ReceivingRecord>[] = [
  { key: "supplier", header: "Supplier", overflow: "wrap" },
  { key: "amount", header: "Amount", align: "right", overflow: "nowrap" },
  {
    key: "action",
    header: "Action",
    required: true,
    sticky: "right",
    overflow: "nowrap",
    render: (record) => <InspectRecord record={record} />,
  },
];
```

## Control and type proportion

At regular density the SM/MD/LG minimum heights are 36/40/48 px. Button labels
are 12/14/16 px and icons 14/16/18 px; padding and gaps change with the family.
Ordinary field type remains its established 13 px optical role at MD. All
typography uses the existing semantic roles and line heights; no font family
or display hierarchy is replaced.

`Button size` remains supported. To coordinate a bounded mixed field/trigger
group, use `data-t7-control-size="sm"` or `"lg"` on its owner. The default MD
needs no override. The attribute changes shared height, field/button type,
padding, gap and control icon roles; it is not a page-wide density setting.
Avoid nesting differently sized control scopes; start a sibling group instead.

```tsx
<FieldGroup legend="Decision" data-t7-control-size="lg">
  <Input label="Reference" />
  <Select label="Disposition">{options}</Select>
  <Button leadingIcon="check">Confirm</Button>
</FieldGroup>
```

Semantic icon roles are compact 14, control 16, navigation 18, status 13 and
feature 24 px. Icon-only actions retain their established slightly stronger
18 px optical emphasis. A feature/decorative icon is not a button icon.

Typography hierarchy remains display → page heading → section → card/object
title → body → supporting/metadata. Use spacing and surface roles before
adding bold weight or another Card. Section and cluster gaps are not identical.

## States and responsive behavior

Selected states do not add border width. Nav/menu/stacked-row focus uses an
internal outline where an outer ring would clip against a scrolling boundary.
Other controls retain the global focus ring and protected component inset.
The existing small pointer-motion transforms are intentional and do not
change layout dimensions; reduced motion disables those transforms.

Mobile shells retain 16 px gutters. Forms and action groups recompose;
tables opt into their owned scroll or stacked-record contract; overlays clamp
to the viewport. Do not universally scale down desktop typography or apply
`overflow: hidden` to the page to conceal a layout failure.

## Proof and regression policy

Permanent stress fixture: `/component-lab?stress=content`. It uses the existing
Component Lab archetype and never appears in a production reference shell.
The controls select recipe, appearance, density and shape without persistence.

`tests/content-safety.spec.ts` checks long Indonesian business names, unbroken
IDs, large money/percentages, exact-radius/dense boundaries, keyboard focus,
action reachability, size-family geometry, axe, five viewport route audits,
and reviewed visual captures. Desktop CSS render-zoom checks at 125/150% are
additional stress, not a claim of all native-browser zoom/assistive-technology
combinations. Existing regression/adoption suites remain mandatory.

Before accepting a baseline: inspect actual, expected and diff; explain the
intentional source change; then update only affected images and rerun without
an update flag. See `research/19-proportion-content-safety/` for the final gate.

Anti-patterns: random margins, negative-margin repairs, fixed heights around
wrapping text, giant nowrap labels, oversized chips, tiny large-button icons,
large radius with tiny insets, clipping root overflow, and competing spacing
or component systems.
