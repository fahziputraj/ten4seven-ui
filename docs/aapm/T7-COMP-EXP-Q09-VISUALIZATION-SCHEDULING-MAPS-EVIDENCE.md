# Q09 — Visualization, Scheduling and Maps Evidence

Date: 2026-09-12  
Repository: `D:\SA\ten4seven-ui`  
Branch: `codex/icons-curated-solar-style`  
HEAD at Q09 execution: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`

## Scope and instruction boundary

The attached `Q09-VISUALIZATION-SCHEDULING-MAPS.md` was treated as the
bounded Q09 specification. It was not treated as an independent instruction
source. The user request was to execute Q09 only. Q10 was not started.

The prerequisite evidence was read from
`docs/aapm/T7-COMP-EXP-Q08-TABLES-DATAGRID-VIRTUALIZATION-EVIDENCE.md`, whose
gate is `PASS WITH CONSTRAINTS FOR Q09`.

Unrelated dirty worktree changes were preserved. No reset, clean, commit,
merge, push, or deployment was performed.

## Delivered decisions

### Visualization

The existing SVG chart family was hardened in place; no thin wrapper or heavy
visualization engine was introduced.

- `ChartDataState` now normalizes `ready`, `loading`, `empty`, and `error`
  presentation for `Sparkline`, `LineChart`, `BarChart`, and `DonutChart`.
- Empty data is inferred from invalid or absent finite values unless the
  consumer explicitly supplies `loading`, `empty`, or `error`.
- Loading and empty states use an accessible live status; error uses an alert
  role. Invalid plot geometry is not rendered for those states.
- `accessibleSummary` associates a concise non-visual fallback with the SVG.
- `stateMessage` lets the consumer provide domain-specific state copy without
  replacing the chart contract.
- `ChartSeries`, `BarChartDatum`, and `DonutSegment` now support an explicit
  categorical colorway or semantic chart tone. The semantic roles are
  `comparison`, `threshold`, `positive`, `negative`, and `no-data`.
- Categorical series continue to use `chart-1` through `chart-5`. Semantic
  tones resolve through the canonical chart token role map, so the same line,
  bar, donut, tooltip swatch, legend swatch, gradient, and depth shadow remain
  theme-owned.
- Point, bar, and donut tooltips remain anchored to the highlighted geometry;
  existing keyboard focus and reduced-motion behavior remains intact.
- Component Lab chart fixtures now expose accessible summaries for the line,
  bar, and donut proof surfaces. The component explorer now previews the
  canonical `Sparkline` instead of rendering a `LineChart` under the Sparkline
  entry.

### Scheduling and calendar

No generic scheduler, resource calendar, booking engine, availability truth,
or time-slot domain model was added. The consumer must own booking,
availability, resource, and permission truth.

The existing canonical `Calendar`, `DatePicker`, `DateRangePicker`, and
`TimePicker` remain the bounded date/time contract. The `TimePicker` overlay was
made content-aware: it uses intrinsic content width capped by the tokenized
overlay geometry rather than forcing a fixed 360px panel into a smaller form
field. This keeps the shared popup viewport-safe without creating a second
picker implementation.

### Maps

No map engine or provider dependency is present in the base UI package, and no
map wrapper was invented without a real consumer-owned geographic contract.
Route-planning guidance continues to treat a map as optional: route sequence
and operational facts must remain understandable without the map.

If a future consumer supplies a geographic surface, the engine must remain
behind an adapter. Ten4Seven will own controls, surface, focus, selection,
tooltip, responsive, and empty/error presentation; the consumer will own
geographic data, business semantics, and permissions.

## Heavy-engine gate

The repository was scanned for chart/map/scheduling engines and vendor strings:

- `echarts`, `recharts`, `visx`, `leaflet`, `mapbox`, Google Maps, OpenLayers,
  Deck.gl, and React map packages: none found in the UI or playground source.
- Scheduler/resource-calendar/time-slot/schedule-grid wrappers: none found in
  the UI or catalog.
- Package dependencies contain no Q09 visualization or map engine. The
  `scheduler` lockfile entry is the React scheduling runtime dependency, not a
  calendar/visualization engine.

Because no heavy engine was introduced, license, lazy subpath, tree-shaking,
SSR/browser, and public-contract isolation evidence is `N/A — no engine
adopted`, rather than being claimed as a vendor integration pass.

## Source and contract evidence

Changed Q09 source/contracts:

- `packages/ui/src/charts.tsx`
- `packages/ui/src/date-time.tsx`
- `packages/ui/src/styles.css`
- `packages/contracts/src/foundation.ts`
- `packages/ai/catalog/components.json`
- `apps/playground/src/component-proofs.tsx`
- `apps/playground/src/component-preview-fixtures.tsx`
- generated chart/foundation projections under `generated/`
- `research/15-universal-v2/COMPONENT_TOKEN_COVERAGE_REPORT.md` regenerated
  after the stylesheet changed

The semantic chart roles were added to the typed component token contract and
the projections were regenerated. This keeps the catalog, runtime token map,
and agent-facing retrieval surface aligned.

## Validation evidence

### PASS

- `pnpm typecheck`
- `pnpm test` — all repository verification, package, token, catalog, and
  consumer-proof stages passed
- `pnpm build`
- `pnpm package:build`
- `pnpm test:contracts`
- `pnpm test:ai`
- `pnpm test:component-system`
- `pnpm test:contrast`
- `pnpm test:q06-forms-selection-datetime-files.spec.ts --grep "time|date|calendar"`
  equivalent focused command: `pnpm exec playwright test
tests/q06-forms-selection-datetime-files.spec.ts --grep "time|date|calendar"`
  — 3/3 passed
- `pnpm exec playwright test tests/workbench-interaction.spec.ts --grep
"sparkline settles|KPI sparklines"` — 2/2 passed
- Edited source files pass the targeted Prettier check.
- Codex in-app browser render QA passed for `/theme-studio` and
  `/component-lab#component-lab-charts`. The final chart surface showed the
  shared line, bar, and donut colorway/depth treatment and the shared legend.
- Runtime geometry check after rebuilding the package: the time popover was
  approximately 166px inside a 312px trigger at the focused viewport.

### CONSTRAINTS / NOT PASS

- Repository-wide `pnpm format:check` remains red because 363 pre-existing
  files are not Prettier-clean. Those unrelated files were not reformatted.
- The combined legacy workbench test
  `tests/workbench-interaction.spec.ts --grep "component lab charts"` reaches
  the date-range step but expects the accessible name `Select dates`, while
  the labelled control correctly exposes its field label `Planning range`.
  The direct Q06 date/time/files suite passes; this is recorded as an existing
  test-contract mismatch, not hidden by changing accessible label semantics.
- No real consumer-owned scheduler, booking/availability model, or map
  provider integration was exercised. Those remain intentionally deferred
  until a consumer contract and the Q09 heavy-engine gate exist.

## Gate

Q09 visualization normalization and bounded scheduling hardening are complete.
Maps and heavyweight scheduling engines remain explicitly deferred behind the
documented consumer/adapter boundary. Q10 has not been started.

PASS WITH CONSTRAINTS FOR Q10
