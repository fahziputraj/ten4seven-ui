# T7-UNIVERSAL-HARDENING-U08 — Visualization, Scheduling, and Maps Evidence

## 1. Coordinates

| Field                  | Evidence                                                          |
| ---------------------- | ----------------------------------------------------------------- |
| Repository             | `fahziputraj/ten4seven-ui`                                        |
| Working directory      | `D:\\SA\\ten4seven-ui`                                            |
| Branch                 | `codex/icons-curated-solar-style`                                 |
| HEAD at U08 validation | `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`                        |
| Parent work item       | `T7-UNIVERSAL-HARDENING-001`                                      |
| Queue executed         | `T7-UNIVERSAL-HARDENING-U08` only                                 |
| Date                   | 2026-09-13, Asia/Jakarta                                          |
| Prerequisite gate      | U07 evidence records `PASS FOR U08`                               |
| Stop boundary          | U09/U10/U11 work was not started                                  |
| Publication boundary   | No commit, push, PR, merge, tag, publish, or deploy was performed |

The worktree was already dirty from prior bounded queues and existing local
artifacts. U08 preserved that state: it did not reset, clean, delete, or
normalize unrelated work. The U08 contract, bounded chart renderer, native
descriptor canary, verifier, and browser proof were already present in the
starting HEAD, so this execution re-verified and refreshed their evidence rather
than duplicating them. The status snapshot during validation contained 79 dirty
entries, including pre-existing U04–U07 projections and unrelated changes; this
count is not treated as an U08 change count.

## 2. Inventory before

The inventory was read from the typed contracts, UI source, AI catalog,
generated projections, token source, and representative playground consumers.

| Area                                                | Start state                                                                                                                  | Classification / finding                                                                                          |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `LineChart`, `BarChart`, `DonutChart`, `Sparkline`  | Existing token-led bounded SVG family with lifecycle message, summaries, focus/hover inspection, tooltip, and reduced motion | `EXISTING_STABLE`; current accepted hardening re-verified for missing-versus-zero and annotations                 |
| `TrendIndicator`, `ChartLegend`, `ChartPanel`       | Existing support/component/block contracts and playground/catalog usage                                                      | Existing stable support; `ChartPanel` remains a composite block, not a new primitive                              |
| Chart tooltip                                       | Internal shared implementation in `packages/ui/src/charts.tsx`; not a separate public primitive                              | Support contract needed; no donor tooltip API adopted                                                             |
| Chart palette and motion                            | Existing semantic chart CSS variables and token-backed motion roles                                                          | Reused; no second palette, color source, or motion runtime introduced                                             |
| `Calendar`                                          | Existing date-selection month-grid component in `packages/ui/src/date-time.tsx`                                              | Date-selection contract; not a scheduler                                                                          |
| Scheduler / resource scheduler / timeline scheduler | No current scheduler placement engine or canonical scheduling plane                                                          | Missing; bounded as `ENGINE_ADAPTER`/`DEFERRED` rather than reimplemented                                         |
| Maps / geospatial layers                            | No map renderer, tile provider, projection, clustering, or geolocation integration                                           | Missing; bounded as adaptive engine adapters; geolocation remains outside scope                                   |
| Typed U08 projection                                | Present in the starting checkout and linked to the canonical registry, compact catalog, and agent index                      | Re-verified from `packages/contracts/src/visualization.ts` → generated projection; no duplicate source introduced |
| Native U08 boundary                                 | Existing CSS-independent visualization descriptor canary                                                                     | Re-verified as metadata/descriptors only; no native components or engine dependency                               |
| Theme Studio                                        | Exposes the shared active palette, chart roles, density, contrast, and motion state                                          | Evidence consumer; not a chart engine or second token source                                                      |
| Component Lab                                       | Existing chart showroom with line, bar, and donut proof plus U08 stress fixtures                                             | Re-verified partial-data, threshold, zero, unavailable, narrow, and axe coverage                                  |
| Auth / Publishing Store / Farm route families       | No direct advanced chart/scheduler/map engine imports found in the inspected route code                                      | No consumer rewrite in U08; business consumers remain outside the bounded scope                                   |
| Public Showcase                                     | Uses the existing `ChartPanel` + `LineChart` composition                                                                     | Consumer evidence; it continues to consume canonical chart intent                                                 |
| Operations                                          | Uses the existing `Sparkline` metric composition                                                                             | Consumer evidence; no operations-specific chart primitive was created                                             |

## 3. Chart taxonomy

The typed taxonomy is in `packages/contracts/src/visualization.ts` and is
projected to `generated/visualization-scheduling-maps.json`. It distinguishes
intent from renderer geometry:

| Chart intent                                                  | Canonical or decision                                                                   | Data shape                                                          |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Trend across an ordered dimension                             | `LineChart`                                                                             | `ordered-series`                                                    |
| Trend with magnitude emphasis                                 | `AreaChart` variant of `LineChart`; no new canonical component                          | `ordered-series`                                                    |
| Compare categories                                            | `BarChart`                                                                              | `categorical-values`                                                |
| Vertical category orientation                                 | `ColumnChart` variant of `BarChart`; no new canonical component                         | `categorical-values`                                                |
| Part-to-whole with a small bounded category set               | `DonutChart`; `PieChart` is a presentation variant                                      | `whole-to-part`                                                     |
| Compact trend cue                                             | `Sparkline`                                                                             | `ordered-series`                                                    |
| Directional comparison without an implicit business sentiment | `TrendIndicator`                                                                        | `bounded-progress`                                                  |
| Stacked category comparison                                   | Deferred `ENGINE_ADAPTER` behind `BarChart` intent                                      | `mixed-series`                                                      |
| Correlation / magnitude / radial / matrix / mixed axes        | `Scatter`, `Bubble`, `Radar`, `Heatmap`, and `ComboChart` are deferred engine decisions | `x-y-pairs`, `x-y-size-triples`, `matrix-values`, or `mixed-series` |
| Gauge                                                         | Deferred; use `Progress` or `MetricCard` for the current bounded signal                 | `bounded-progress`                                                  |

The canonical chart component set does not contain `SalesLineChart`,
`FarmBarChart`, `RevenueDonut`, or another business/domain chart name. Product
profile and domain meaning stay in consumer data and recipes.

## 4. Visualization support contracts

The U08 plane records a renderer-neutral support grammar:

- Consumers own fetching, calculations, business meaning, format intent,
  filter/selection meaning, permissions, and export authorization.
- Ten4Seven owns semantic series identity, chart state grammar, responsive
  intent, token mapping, accessible summaries, legend identity, annotation
  representation, and bounded renderer behavior.
- Renderers own DOM/native primitives, geometry, hit testing, and popup versus
  callout presentation.
- A chart contract does not accept `fetchUrl`, `apiEndpoint`, `sqlQuery`, or a
  vendor chart object.

The shared contract covers labels/series, value format intent, categorical or
semantic palette intent, axes/domain, legend, tooltip, annotations, thresholds,
loading/empty/error states, selection, and responsive behavior. The current UI
family now additionally preserves:

| State / value                                         | Meaning and proof                                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `0`                                                   | Present measurement; classified as `zero` and remains renderable                       |
| `null` / `undefined`                                  | Missing; never converted to zero                                                       |
| non-finite / invalid runtime value                    | Invalid; excluded from geometry and described as unavailable when partial data remains |
| all values missing                                    | `noData`                                                                               |
| at least one present and at least one missing/invalid | `partialData`                                                                          |
| consumer-declared filtered result                     | `filteredEmpty` wins over inference                                                    |
| consumer-declared loading/error                       | Explicit state wins over inference                                                     |

`LineChart` accepts renderer-neutral `ChartAnnotation` intent for reference
lines and thresholds. `BarChart` and `DonutChart` preserve present zero values
and label unavailable values without asking a formatter to format missing data.
`Sparkline` retains the compact fallback and inspection behavior while exposing
the same `noData`/`partialData` state vocabulary.

## 5. Scheduler taxonomy

`Calendar` and `DatePicker` remain date-selection contracts. `Scheduler` is a
separate adaptive engine boundary with generic events and explicit ownership.

| Contract                           | Kind                                  | Status                   | Platform / native strategy       | Boundary                              |
| ---------------------------------- | ------------------------------------- | ------------------------ | -------------------------------- | ------------------------------------- |
| `Calendar`                         | date selection                        | existing stable          | `BOTH` / `NATIVE_RENDERER`       | bounded date-grid renderer            |
| `Scheduler`                        | multi-view event scheduling           | engine adapter           | `ADAPTIVE` / `ALTERNATE_PATTERN` | approved placement engine only        |
| `MonthView`, `WeekView`, `DayView` | scheduler variants                    | variants                 | adaptive / alternate pattern     | no second scheduler API               |
| `Agenda`                           | ordered event-list alternative        | deferred                 | adaptive / alternate pattern     | renderer or native list               |
| `TimeGrid`                         | dense desktop time placement          | engine adapter           | Web / alternate pattern          | consumer engine                       |
| `ResourceScheduler`                | resource-aware placement              | engine adapter           | adaptive / alternate pattern     | consumer engine                       |
| `TimelineScheduler`                | long-running ordered events           | engine adapter           | adaptive / alternate pattern     | consumer engine                       |
| `Availability`                     | consumer-calculated available windows | deferred                 | adaptive / alternate pattern     | consumer truth, renderer presentation |
| `EventCard`                        | generic event summary                 | deferred support variant | `BOTH` / `NATIVE_RENDERER`       | shared event anatomy                  |

The generic event shape is `id`, `title`, `start`, `end`, optional `allDay`,
`status`, `category`, `resource`, `description`, and `metadata`. It does not
contain `FarmID`, `InvoiceID`, or another domain identifier. Consumers own event
truth, permissions, availability, conflicts, booking, persistence, drag/resize
authorization, and timezone policy. The typed timezone boundary explicitly sets
`silentConversion: false`.

On narrow surfaces the scheduler strategy is month→agenda, week→day,
resource→agenda, or a bounded time-grid only where justified. A resource grid
must not be shrunk onto a 390px surface.

## 6. Map taxonomy

The map taxonomy is normalized around generic overlays and deliberately does not
select a map provider:

`Map`, `Marker`, `Cluster`, `Popup`, `Polyline`, `Polygon`, `Circle`,
`Heatmap`, `GeoLayer`, `LocationPicker`, `MapControls`, and `MapLegend`.

| Boundary               | System owns                                                                               | Consumer owns                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Map surface            | semantic surface, states, responsive map/list/detail strategy, accessible alternative     | coordinates, provider, permissions, geocoding, route truth, business geography |
| Marker / cluster       | identity, selected/status treatment, labels, focus and list alternative                   | coordinate and point truth, selection meaning, actions                         |
| Route / area / heatmap | semantic line/fill/intensity roles, legend, non-color explanation, list/table alternative | geometry, route/area meaning, values, thresholds, privacy                      |
| Location picker        | coordinate field semantics, loading/error/unavailable states, adaptive presentation       | GPS permission, reverse geocoding, validation, persistence                     |

Desktop intent is map plus detail panel. Mobile intent is a major map surface
with a bottom sheet or ordered list/detail alternative. Accessibility requires a
named region, selected-location text, keyboard-accessible available markers or
list items, and visible loading/error/unavailable status.

There is no production geolocation, provider key, tile source, projection,
clustering implementation, or map package in U08.

## 7. Existing engines

The only existing engine-like implementation in this queue is the bounded
Ten4Seven SVG chart renderer. There was no existing scheduler or map engine to
adopt.

## 8. Engine adapter decisions

| Engine boundary            | Capability                                                                            | Dependency                                                    | License                                                           | Bundle implication                                                                    | Platform | Isolation boundary                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `t7-svg-charts`            | Bounded line/bar/donut/sparkline, legend, tooltip, lifecycle states                   | `packages/ui/src/charts.tsx` + `packages/tokens/src/theme.ts` | Repository-owned Ten4Seven implementation                         | Already part of the existing `@ten4seven/ui` Web bundle; U08 adds no chart dependency | Web      | Renderer implementation behind semantic props; consumers pass data and formatters only   |
| `native-chart-renderer`    | Future native series/state/token intent with press callout and data-list alternative  | None selected; future native consumer or approved engine      | Not assessed until a concrete engine is proposed                  | Must be optional/lazy for native consumers and must not inflate Web consumers         | Native   | `@ten4seven/native` descriptor/projection only; no component created                     |
| `scheduler-engine-adapter` | Event placement, overlap, resources, time grid, navigation, optional drag/resize      | No scheduler dependency selected                              | Not assessed until candidate review                               | Future lazy/optional boundary; no scheduler code in current UI package                | Adaptive | Normalized event/view/state/timezone contract; vendor engine objects stay inside adapter |
| `map-engine-adapter`       | Tiles, projection, markers, clustering, routes, polygons, heatmaps, provider controls | No map dependency selected                                    | Not assessed until provider, tiles, privacy, and licensing review | Future lazy/optional provider boundary; no map dependency added                       | Adaptive | Normalized coordinates/overlays/list alternative; provider objects never cross the plane |

No Recharts, ECharts, FullCalendar, Mapbox, Leaflet, MapLibre, or other donor
API is exposed as a Ten4Seven contract. `engineOptions` remains an adapter-only
escape hatch for a future approved engine; the current bounded renderer accepts
no vendor options.

## 9. Components hardened

The starting HEAD already contained the following bounded U08 corrections. This
execution verified their current behavior and did not rewrite business
consumers or add a parallel implementation:

1. `packages/contracts/src/visualization.ts` owns the U08 semantic plane,
   chart taxonomy, state/value classifiers, annotation contract, scheduler and
   map taxonomies, ownership rules, token mapping, engine decisions, AI
   metadata, and native canary metadata.
2. `packages/ui/src/charts.tsx` resolves `noData`, `filteredEmpty`, and
   `partialData`; distinguishes zero from missing; skips invalid geometry;
   labels unavailable bar/donut values; renders token-driven threshold
   annotations; and preserves existing focus, hover, tooltip, summary, and
   reduced-motion behavior.
3. `packages/ui/src/styles.css` contains only semantic chart annotation and
   unavailable-state selectors using existing chart token variables.
4. `apps/playground/src/component-proofs.tsx` provides a bounded Component Lab
   proof for partial series, a threshold annotation, zero, and unavailable
   category data.
5. `packages/native/src/index.ts` exposes `resolveNativeVisualization()` and a
   CSS-independent descriptor canary. It does not add a native component or
   native dependency.
6. `scripts/generate-contract-projections.mjs` projects the typed plane and
   links the seven visualization-related existing catalog entries through
   `visualizationRef`/`visualization` fields.

## 10. Net-new canonical contracts

The net-new canonical contract surface for the parent U08 implementation is the
typed U08 plane, not a collection of unimplemented components. That plane was
already present in the starting HEAD; this execution did not create a second
contract source or promote deferred capabilities:

- Seven linked definitions: `LineChart`, `BarChart`, `DonutChart`, `Sparkline`,
  `TrendIndicator`, `ChartLegend`, and `ChartPanel`.
- Four canonical chart renderers/support definitions are existing stable UI
  components; the remaining three are support/block contracts.
- Scheduler and map entries are taxonomy/adapter decisions only. No scheduler
  or map component is advertised as implemented.
- The plane records `BOTH`, `WEB`, `NATIVE`, and `ADAPTIVE` intent through the
  existing component-platform resolver. The linked charts resolve to the
  existing Web implementation with a planned native renderer boundary.
- `packages/contracts/src/index.ts`, `packages/contracts/src/canonical.ts`,
  `packages/ui/src/index.ts`, and the generated agent projections expose the
  normalized contract.

## 11. Rejected variants/duplicates

The gap ledger in `VISUALIZATION_GAP_DECISIONS` records the following decisions:

- `AreaChart` → `LineChart` presentation variant.
- `ColumnChart` → `BarChart` orientation variant.
- `PieChart` → `DonutChart` whole-to-part presentation variant.
- `StackedBar`, `Scatter`, `Heatmap`, and `ComboChart` → future engine adapter
  decisions, not consumer-local renderers.
- `Bubble`, `Radar`, and `Gauge` → deferred until their scale, label,
  accessibility, and non-visual alternatives are proven.
- `ChartTooltip`, `ChartToolbar`, and `DataLabel` → support/utility decisions;
  no donor API or chart-specific control family was added.
- `SalesLineChart`, `FarmBarChart`, and `RevenueDonut` →
  `REJECTED_DUPLICATE`; use canonical charts with consumer-owned data and
  formatting.

Variants and aliases do not increase canonical component count.

## 12. Web/Native adaptive matrix

| Intent                      | Web strategy                                                                                        | Native strategy                                                                                                          | Contract status                               |
| --------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Line/bar/donut/sparkline    | Existing bounded SVG renderer with CSS-projected roles, hover/focus inspection, and textual summary | Native chart renderer can consume series/state/annotation metadata; press/selection callout and ordered list alternative | Web implemented; native planned               |
| Legend / tooltip            | Wrap or move below; positioned tooltip follows shared overlay behavior                              | Wrap/scroll or move below; press/selection callout                                                                       | Shared intent; renderer-specific presentation |
| Scheduler month/week/day    | Future Web engine only where dense placement is justified                                           | Agenda/day/detail screen or native event list                                                                            | Adaptive engine adapter; deferred             |
| Resource/timeline scheduler | Desktop resource/time surface behind an approved engine                                             | Agenda/resource detail alternative; no phone-sized resource grid                                                         | Adaptive engine adapter; deferred             |
| Map / marker / cluster      | Provider-backed Web surface behind adapter, with side panel/list alternative                        | Native map surface with sheet/list/detail alternative                                                                    | Adaptive engine adapter; deferred             |
| Location picker             | Future map/search/detail composition                                                                | Native picker/map/sheet composition                                                                                      | Adaptive; deferred and consumer-authorized    |

No WebView requirement is introduced. Shared meaning, states, accessibility,
token names, and interaction intent remain reusable; DOM, native primitives,
hover/press, popup/sheet, and engine mechanics remain platform-specific.

## 13. Visualization token mapping

`VISUALIZATION_TOKEN_MAPPING` is the only U08 visualization mapping source.
It points to existing semantic token roles rather than adding colors:

| Intent            | Ownership                                   | Roles / source                                                           |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| Categorical       | Derived stable series identity              | `chart-1` … `chart-5` from `semantic.color.chart.*`                      |
| Semantic          | Fixed system semantic                       | comparison, threshold, positive, negative, no-data roles                 |
| Sequential        | Derived ordering over the active chart ramp | Existing chart roles; no arbitrary gradient source                       |
| Diverging         | Derived negative → comparison → positive    | Explicit midpoint and non-color labels                                   |
| Geometry / motion | Fixed system semantic                       | surface, raised surface, border, focus ring, chart motion, measure roles |

Web continues to consume the existing CSS projection (`--t7-chart-*`, semantic
surface/border/focus/motion variables). Native consumes resolved typed values via
the existing token snapshot and U08 semantic metadata; it does not parse CSS.
No raw chart hex, radius, shadow, timing, or second palette is introduced.

## 14. Accessibility strategies

Charts:

- Every canonical chart contract requires a stable accessible name and concise
  data summary.
- Point-level focus/inspection stays bounded; consumers are directed to a
  list/table alternative when detail is too large for a focusable SVG surface.
- Legend identity is textual and not color-only. Semantic tones require labels,
  summaries, or shape in addition to hue.
- Missing and zero values have distinct accessible text; unavailable segments
  are not formatted as zero.
- Tooltip behavior is supplemental to the summary and keyboard/focus path.

Schedulers:

- Named scheduling region, announced view/date range, explicit event title and
  start/end text, keyboard date/view navigation, selected/disabled states, and
  ordered list/detail alternatives are required.
- If a selected engine cannot satisfy the accessibility contract, the gap stays
  recorded rather than being hidden by a visual-only adapter.

Maps:

- Named map region, marker/list alternative, selected-location text, keyboard
  focus where markers are available, and visible loading/error/unavailable
  status are required.
- The accessible list/route/area alternative remains available when a map
  provider or native map surface is unavailable.

The U08 browser proof runs serious/critical axe checks over the chart showroom
fixtures and passes with no violations.

## 15. Performance boundaries

- Current charts remain bounded `L2-bounded-renderer` implementations.
- U08 does not claim streaming, WebGL, GPU acceleration, virtualization, or
  high-frequency rendering.
- Advanced `L4-advanced-engine-adapter` work is isolated to future scatter,
  heatmap, combo, scheduling, and map adapter decisions.
- Consumers calculate and supply business values; renderers do not fetch or
  compute business formulas.
- Any future large-windowed or high-frequency engine must be optional/lazy,
  provider/license reviewed, accessibility tested, and excluded from the
  base Web package when not needed.

## 16. Native canary

`packages/native/src/index.ts` exposes a descriptor-only canary:

```ts
resolveNativeVisualization("chart");
resolveNativeVisualization("scheduler");
resolveNativeVisualization("map");
```

The deterministic descriptors resolve to `Chart`, `SectionList`, and `MapView`
primitive intents respectively, together with the shared presentation,
states, semantic inputs, adaptive strategy, accessibility alternative, and
consumer ownership. The values are JS/TS metadata; no CSS variable parsing,
React dependency, native UI component, geolocation, or production map engine is
present.

## 17. Showroom

Existing canonical showroom surfaces were retained and extended only within
the system harness:

- `/components/charts-data-visualization` shows the catalog-linked Line Chart,
  Bar Chart, Donut Chart, Sparkline, Legend, Trend Indicator, and Chart Panel
  previews.
- `/component-lab#component-lab-charts` shows the existing chart family plus
  the U08 partial-data/threshold and zero/unavailable proof.
- `/public-showcase` remains a consumer composition using `ChartPanel` and
  `LineChart`; it is not a new chart API.

Scheduler and map showroom surfaces were not fabricated because no scheduler or
map renderer is implemented in U08. Their taxonomy, native strategy, and
deferred adapter decisions are visible through the generated contract plane.

## 18. Component Lab stress proof

The browser proof exercised:

- canonical catalog charts at 1280px;
- partial line data with a token-driven `Target` threshold;
- present zero and unavailable category values in the bar renderer;
- chart accessible names/summaries and serious/critical axe checks;
- narrow 390px Component Lab rendering with bounded chart scroll width and no
  document-level horizontal overflow.

Command and result:

```text
pnpm exec playwright test tests/u08-visualization-scheduling-maps.spec.ts
2 passed (9.8s)
```

The test source is `tests/u08-visualization-scheduling-maps.spec.ts`. This is
rendered local-browser evidence, not a claim that a scheduler or map engine was
validated.

## 19. AI/catalog projection

The typed contract is projected by the existing generator; no second decision
manifest was introduced.

The current generator emitted 234 deterministic projections. The canonical
component plane remains 172 components plus 7 aliases, while the U08 plane
links seven existing catalog entries without adding a new public primitive.

| Projection               | Evidence                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Typed source             | `packages/contracts/src/visualization.ts`                                                                        |
| Human canonical registry | `packages/contracts/src/canonical.ts`                                                                            |
| Web/UI export            | `packages/ui/src/index.ts` and existing chart module                                                             |
| Native metadata export   | `packages/native/src/index.ts`                                                                                   |
| Agent index              | `generated/agent-index.json` and `packages/agent/generated/agent-index.json`                                     |
| Plane projection         | `generated/visualization-scheduling-maps.json` and `packages/agent/generated/visualization-scheduling-maps.json` |
| Component links          | `generated/components.compact.json` and linked component shards via `visualizationRef`                           |
| Generator                | `scripts/generate-contract-projections.mjs`                                                                      |
| Verification             | `scripts/verify-visualization.mjs` / `pnpm test:visualization`                                                   |

Each linked definition contains AI metadata for `useWhen`, `avoidWhen`,
`dataShape`, platform, engine level, adaptive strategy, interaction,
accessibility alternative, performance class, and alternatives. Catalog status
remains the compatibility status; the normalized U08 plane does not silently
promote deferred scheduler/map entries to implemented APIs.

## 20. Tests

| Command                                                                                        | Result                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                                                      | PASS — 234 deterministic contract projections; token/theme/DTCG projections regenerated                                                                    |
| `pnpm typecheck`                                                                               | PASS — contracts, native, agent, UI package build/typecheck, playground                                                                                    |
| `pnpm test`                                                                                    | NOT RUN — the root chain enters U09+ verifiers; bounded U08 checks below were run to honor the execute-only queue boundary                                 |
| `pnpm test:visualization`                                                                      | PASS — 7 linked components, 4 engine boundaries, 3 native canaries                                                                                         |
| `pnpm test:native-mobile`                                                                      | PASS — shared native boundary, token resolution, icons, accessibility descriptors, and Farm presentation proof                                             |
| `pnpm test:native-expo`                                                                        | PASS — 7 profiles, 18 capability contracts, 179 component maturity rows, and CSS-independent renderer boundary                                             |
| `pnpm test:ai`                                                                                 | PASS — 29 recipes, 179 components, 60 blocks, 122 semantic icons; cold-start retrieval has 0 donor reads                                                   |
| `pnpm test:consistency`                                                                        | PASS — canonical consistency across 28 UI source files                                                                                                     |
| `pnpm test:token-governance`                                                                   | PASS — 25 component modules, no raw component colors/palette dependencies/ungoverned timing                                                                |
| `pnpm test:contrast`                                                                           | PASS — 284 recipe/mode pairs at WCAG AA 4.5:1; lowest exact-source light standard accent foreground 4.67:1                                                 |
| `pnpm test:dtcg`                                                                               | PASS — 3 deterministic DTCG outputs and exact-source runtime snapshots                                                                                     |
| `pnpm test:component-coverage`                                                                 | PASS — 7 high-impact selector families; 1,000 raw-pixel occurrences remain tracked migration debt                                                          |
| `pnpm test:component-system`                                                                   | PASS — 172 canonical components, 7 aliases, 29 recipes, and 60 expressive blocks                                                                           |
| `pnpm test:tailwind-bridge`                                                                    | PASS — 6 semantic utilities compiled from published theme.css and tailwind.css                                                                             |
| `pnpm build`                                                                                   | PASS — playground production build; existing chunk-size advisory; output JS 22.63 MB and CSS 713.91 kB                                                     |
| `pnpm package:build`                                                                           | PASS — `@ten4seven/ui@1.0.0`                                                                                                                               |
| `pnpm package:verify`                                                                          | PASS — 24 root exports and self-contained styles                                                                                                           |
| `pnpm exec playwright test tests/u08-visualization-scheduling-maps.spec.ts --project=chromium` | PASS — 2 rendered local-browser tests (7.9s)                                                                                                               |
| Targeted Prettier check/write for U08 source, script, test, and evidence files                 | PASS                                                                                                                                                       |
| `git diff --check`                                                                             | PASS — no whitespace errors                                                                                                                                |
| `pnpm format:check`                                                                            | FAIL / baseline debt — 501 pre-existing/unrelated files are reported by the repository-wide check; U08 source/test/evidence files pass targeted formatting |

The format failure is recorded as baseline debt rather than “fixed” by a mass
rewrite. It does not change the U08 semantic, type, package, test, or browser
results.

## 21. Baseline debt

The following remain deliberately outside U08:

- No concrete scheduler engine has been selected, licensed, isolated, or
  validated. Month/week/day/resource/timeline engine rendering is deferred.
- No concrete map provider, tile policy, privacy review, projection engine,
  geocoding, clustering, or location permission integration exists.
- No native chart/scheduler/map renderer or `@ten4seven/native` component was
  created; only the descriptor canary exists.
- `ChartTooltip` remains an internal renderer support implementation rather
  than a separately exported public component. The support gap is documented.
- Advanced charts such as scatter, heatmap, combo, bubble, radar, gauge, and
  stacked charts remain gap decisions rather than partial engines.
- Existing legacy catalog fields and consumer compositions remain compatibility
  surfaces; U08 did not rewrite every consumer to new optional props.
- The repository-wide Prettier baseline reports 501 files and was not mass
  reformatted.
- The current published Web bundle already carries a large existing chart/UI
  bundle; U08 added no heavy visualization dependency or provider package.

## 22. Deferred U09/U10/U11 gaps

U09+ execution was not started. The explicit handoff gaps are:

- U09: continue the next bounded queue only after this evidence gate is accepted;
  any additional product/application contract work must consume the U08 plane
  and must not introduce domain chart, scheduler, or map primitives.
- U10: if scheduling drag/resize or map gesture mutation is later required,
  resolve the separate DnD/gesture boundary, authorization, keyboard, touch,
  and persistence contract before selecting an engine.
- U11: dashboard/reporting and other page-level compositions may compose the
  canonical chart/block/recipe contracts later; they must keep business data,
  calculation, export authorization, and domain meaning consumer-owned.

No U09, U10, or U11 code, engine, consumer migration, or production route was
started in this queue.

## 23. Gate

U08 acceptance is PASS for the bounded scope:

- chart taxonomy is coherent and domain-specific chart duplicates are rejected;
- categorical, semantic, sequential, and diverging color intent is explicit;
- missing data is distinct from zero and canonical lifecycle states are tested;
- responsive chart behavior, accessibility alternatives, and reduced motion are
  represented;
- `Calendar`/`DatePicker` remain distinct from `Scheduler`;
- scheduler event truth, permissions, conflicts, booking, persistence, and
  timezone policy remain consumer-owned;
- mobile scheduler intent is adaptive even though the engine remains deferred;
- map taxonomy and map accessibility alternative are explicit;
- map/geolocation engines are not reimplemented;
- engine boundaries, bundle implications, license posture, and vendor leakage
  policy are explicit;
- Web/native strategies differ safely behind one semantic contract;
- the native canary is proven without a native component or CSS parsing;
- registry, exports, generated projections, AI metadata, and catalog links are
  synchronized;
- bounded unit/static and rendered browser tests pass;
- the repository-wide formatting debt is disclosed and not expanded by a mass
  rewrite.

PASS FOR U09
