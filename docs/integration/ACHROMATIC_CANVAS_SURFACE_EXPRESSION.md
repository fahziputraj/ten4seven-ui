# Achromatic canvas and surface expression

`@ten4seven/ui` keeps the environment neutral and applies colour only where a
contained object needs an intentional signal. This applies to app shells,
Theme Studio, reference screens, and packed consumers alike.

## Canvas contract

`canvas` remains a backwards-compatible theme axis with the existing values:
`balanced`, `paper`, and `monochrome`. In light mode all three are achromatic
paper variants; in dark mode they are neutral ink variants. A palette change
must not change `--t7-background-hsl`, `--t7-surface-hsl`, or the neutral
border roles for the selected canvas.

Choose canvas for paper contrast and density of separation, not brand mood:

| Canvas value | Theme Studio label | Intended use                                              |
| ------------ | ------------------ | --------------------------------------------------------- |
| `balanced`   | Soft paper         | White default with restrained neutral surface separation. |
| `paper`      | Pure paper         | White canvas and neutral contrast.                        |
| `monochrome` | Monochrome paper   | Explicit hue-free grayscale.                              |

Main action, accent/focus, status, and chart palette remain independent axes.
They may colour a control, status, data mark, or bounded surface, never the
whole canvas.

## Bounded treatments

The canonical `emphasis` values are available on `Card`, `MetricCard`, and
`Surface`; `KPICluster` accepts them per item and `Alert` provides the same
callout treatment.

| Treatment | Use                                                    | Constraint                                                            |
| --------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| `plain`   | Normal reading, comparison, and repeated records.      | Default for most UI.                                                  |
| `soft`    | One supporting signal, data cue, or status.            | Use semantic tone only when the data represents that status.          |
| `solid`   | Strong confirmation, KPI hierarchy, or critical state. | Keep bounded to a deliberate summary cluster or focal object.         |
| `inverse` | One focal decision or closing surface.                 | Neutral high contrast; not a substitute for arbitrary dark local CSS. |

```tsx
import { Alert, Card, MetricCard, Surface } from "@ten4seven/ui";

<Card emphasis="plain">Normal operational context</Card>

<MetricCard
  emphasis="soft"
  tone="accent"
  title="Customer signals"
  value="3"
/>

<Alert
  emphasis="soft"
  tone="warning"
  title="Review needed"
  description="One accountable action is overdue."
/>

<Card emphasis="inverse">One deliberate finish or decision</Card>
```

`accent` is a non-status emphasis. `success`, `warning`, `danger`, and `info`
are status semantics. Do not use success-green to decorate unrelated data, or
warning/danger colour to imply a state the record does not have.

## Chart-linked solid surfaces

`Card`, `MetricCard`, bounded `Surface` regions, and each `KPICluster` item can
opt into `colorway={1..5}` when a categorical summary or spotlight should share
the same visual family as the active Theme Studio chart. This capability is
owned by the global surface system; Operations Tracker is one consumer, not its
styling owner. The raw `--t7-chart-*` tokens remain the source hue and
saturation. The theme engine derives separate
`--t7-surface-emphasis-solid-chart-*` values by lowering only lightness until
white text has contrast headroom; chart marks themselves remain unchanged.

This is an explicit bridge, not a semantic remap: `tone` continues to describe
meaning, while `colorway` selects a categorical presentation hue. Icons and
text on the resulting solid surface use the shared white foreground. The
canonical card treatment adds the same restrained directional gradient used
to give the Bar Chart depth.

Suitable consumers include summary cards, KPI/metric cards, categorical signal
cards, and a bounded editorial or section spotlight. Keep forms, tables,
repeated list containers, shells, and ordinary product cards neutral. Alerts
continue to use semantic tones instead of categorical colorways. When a card's
primary job is to communicate status rather than category, omit `colorway` and
use its semantic `tone`; if both are intentionally present, select a colorway
that does not contradict the status.

```tsx
<Card colorway={4} emphasis="solid">
  Categorical summary
</Card>

<Surface colorway={5} emphasis="solid">
  Bounded spotlight region
</Surface>

<KPICluster
  label="Workstream health"
  variant="cards"
  items={[
    {
      colorway: 1,
      emphasis: "solid",
      icon: "dashboard",
      label: "Open workstreams",
      tone: "primary",
      value: "8",
    },
    {
      colorway: 3,
      emphasis: "solid",
      icon: "warning",
      label: "Needs attention",
      tone: "warning",
      value: "3",
    },
  ]}
/>
```

## Shared active-state expression

The same global surface vocabulary is available to interaction patterns that
need a stronger active state than a low-opacity fill. `MilestoneTracker`
selection and the current `Stepper` checkpoint use a chart-linked solid surface
with the shared white foreground; the selected checkpoint chooses a bounded
chart family from the same Theme Studio palette. Unselected semantic states
keep their status accents, while hover/focus returns to a raised neutral
surface with a keyline so interaction does not create a colour flood.

`BulkActionBar` uses the same active surface contract when records are selected.
When a consumer must keep a table or content region at a stable document
coordinate while selection appears, set `reserveSpace` to `true`; the empty
bar keeps its layout slot but is hidden from visual interaction. Selected table
rows remain intentionally restrained: a low-tint fill and accent rail preserve
density and scanability.

These behaviours are owned by the canonical package stylesheet and semantic
surface tokens. Consumer routes should compose the canonical component and
choose the semantic state; they should not recreate the gradient, foreground,
hover, or stacking rules locally.

## Header composition

Use `AppShell` for private applications and `PublicShell` with
`NavigationMenu` or `TopNavigation` for public contexts. Put actual actions in
the shell's header action region using canonical `Button` and `IconButton`.
The shared header contract provides density-aware height, action spacing, and
small-screen containment. Consumer code should not duplicate a separate
header-button style system.

## Verification

The token regression covers emerald, blue, indigo, violet, and orange palettes
for every canvas in light and dark appearance. The semantic contrast gate also
checks every solid semantic surface and all five chart-linked solid surfaces
against their white foreground. Browser proof covers paper canvas,
plain/soft/solid/inverse surfaces, chart-linked Card, MetricCard, Surface, and
KPI examples, desktop/mobile header containment, and the Component Lab overlay
fixture. See the current audit in
[ACHROMATIC_CANVAS_SURFACE_EXPRESSION_AUDIT.md](../../research/20-final-system-quality/ACHROMATIC_CANVAS_SURFACE_EXPRESSION_AUDIT.md).
