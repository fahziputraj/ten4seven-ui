# KPI system hardening

Status: **bounded canonical hardening; no donor runtime**

## Gap

Ten4Seven already owned `MetricCard`, `KPICluster`, `TrendIndicator`,
`Sparkline`, and `Progress`, but the single-metric and grouped-metric contracts
did not expose a consistent anatomy for trend, chart, progress, action, and
footer content. `TrendIndicator` also mapped arrow direction directly to
positive or negative colour, which is wrong for domain metrics where a lower
value can be beneficial.

## Read-only reference evidence

- HeroUI Pro KPI documentation:
  `https://heroui.pro/docs/react/components/kpi`
- Supplied local research artifact:
  `D:\SA\ASSET\hero-ui\Components\Data Display\KPI.html`
- Supplied local package declarations and styles under:
  `D:\SA\ASSET\hero-ui\@heroui-pro\react\dist\components\kpi`
- KPI Group reference material under the same read-only donor root.

The useful generic principles were a stable metric anatomy, definition-list
semantics, optional trend/progress/chart/action/footer slots, compact charts
that can sit at the card edge, and grouped cards with controlled separators.
No source, class names, dependency, third-party chart runtime, or component API
was copied into Ten4Seven.

## Ten4Seven normalization

- Evolved the existing `MetricCard` and `KPICluster` owners instead of adding a
  parallel KPI primitive.
- Kept `change` compatible while making `trend`, `chart`, `progress`, `action`,
  and `footer` explicit slots.
- Separated `TrendIndicator.direction` from `sentiment` so visual arrows remain
  truthful when down is good or up is bad.
- Extended `Sparkline` with Theme Studio `colorway` and semantic `tone` while
  preserving `currentColor` on solid/inverse surfaces.
- Made sparkline reveal paths continuous throughout motion, added bounded
  bottom/inline chart placement, and normalized progress into the same visual
  bay used by compact charts.
- Removed nested icon tiles from KPI anatomy; direct glyph size and alignment
  now come from global density-aware tokens.
- Added density-aware `--t7-kpi-*` geometry to the theme resolver and DTCG
  export.
- Kept the achromatic canvas and selective bounded colour contract intact.

## Provenance result

- New bounded donor research events in this hardening slice: **1**.
- New donor runtime dependencies: **0**.
- New donor code or assets copied: **0**.
- New consumer imports from HeroUI: **0**.
