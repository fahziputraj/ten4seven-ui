# Final system quality gate

Status: **PASS — bounded local closure, finalized 2026-09-05**

Scope: Ten4Seven UI Universal v2 source, its packaged artifact, deterministic
playground/reference proofs, and the standalone Next.js App Router consumer.
This gate does not publish a package, deploy a product, create Farm code, or
resolve package licensing authority.

## Observed final matrix

| Area                                                            | Result | Observed proof                                                                                                                            |
| --------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Architecture, semantic tokens, theme architecture               | PASS   | typed contract generation; 184 recipe/mode semantic-contrast pairs; no parallel token engine                                              |
| Studio/docs, operational, publishing, public shells             | PASS   | serial browser coverage from desktop through 360 px; zero document-overflow assertions                                                    |
| Header/topbar, sidebar/navigation, gutters and rails            | PASS   | explicit header control contract; responsive shared action rail; shell/content-safety suite                                               |
| Insets, slot geometry, long-content and state clearance         | PASS   | long-content, zoom 125/150%, radius, action-slot, and overflow tests                                                                      |
| Navigation, popup semantics, focus, keyboard behavior           | PASS   | roving menus, listboxes, Popover dialog semantics, Escape and focus-restoration proofs                                                    |
| Dropdown, Select, Combobox, Popover, Modal, Drawer, CommandMenu | PASS   | shared viewport-layer and nested-overlay tests; Popover height clipping regression fixed                                                  |
| Calendar, DatePicker, DateRangePicker, TimePicker               | PASS   | canonical date/time interaction and bounded overlay coverage in the full suite                                                            |
| Button, Input, Slider, RangeSlider                              | PASS   | coordinated control-size, keyboard and compact hit-area coverage                                                                          |
| DataTable and chart family                                      | PASS   | table keyboard semantics; chart/readability, tooltip and motion proofs                                                                    |
| Theme settings, Theme Studio, light/dark/density                | PASS   | runtime preference and inverse-scope coverage; dark/high-contrast/compact/reduced-motion Operational proof                                |
| Operations, Operational Patterns, Publishing, Public Showcase   | PASS   | system, reference, operational, and expression visual suites                                                                              |
| 1440, compact desktop, tablet, 390, 360                         | PASS   | `190/190` serial Chromium suite and reviewed visual baselines                                                                             |
| Accessibility, console/runtime                                  | PASS   | serious/critical axe smoke across stress, operational, Component Lab and packaged Next consumer; no regression reported by runtime suites |
| Visual regression                                               | PASS   | 55 reviewed system/reference/public tests plus 20 operational/public expression tests pass without snapshot update                        |
| Package and adoption                                            | PASS   | package build/verify, static adoption proof, `4/4` adoption browser scenarios, packed Next proof `3/3`                                    |
| AI contract generation                                          | PASS   | 181 generated projections; AI catalog 145 components, 28 recipes, 12 blocks, 98 semantic icons                                            |

## Achromatic canvas and chromatic surface expression

The add-on is included in this freeze gate.

- Canvas is paper/ink neutral and does not inherit primary, accent, chart, or
  status hue when the palette changes.
- The default light environmental canvas is explicit white (`0 0% 100%`);
  off-white and gray remain available only as zero-saturation structural
  surfaces. A computed-style regression verifies provider/shell/main
  backgrounds across six representative routes.
- `Card`, `MetricCard`, `Surface`, KPI items, and persistent `Alert` support
  bounded `plain`, `soft`, `solid`, and `inverse` treatment through canonical
  tokens and CSS—not consumer-local color patches.
- `Card`, `MetricCard`, bounded `Surface`, and KPI items additionally support
  global chart-linked `colorway={1..5}` surfaces. The theme engine preserves
  chart hue/saturation, derives accessible lightness, and uses white text/icons
  with a restrained chart-like gradient. Alerts remain semantic-only.
- Operations consumes, but does not own, this capability: its four KPI cards
  use colorway 1/3/2/4 (green/orange/cyan/violet) while `tone` independently
  retains primary/warning/info/accent meaning.
- A real soft-accent metadata contrast failure was discovered during the
  closure, repaired with `muted-foreground-strong` in canonical soft content,
  and verified by axe plus the final serial suite.
- The final serial audit also found `TrendIndicator` context at `3.13:1` on a
  soft success tint and `3.26:1` on white. The canonical context now preserves
  full semantic-foreground opacity; its hierarchy still comes from regular
  weight, and the representative axe audit passes.
- The Popover clipping report was fixed at the shared floating layer. Runtime
  geometry changed from a clipped 24 px client box for 44 px content to a
  44 px client box for the same content.
- The Component Lab `Handoff path` Stepper now keeps its connector behind an
  opaque surface base. Complete checkpoints stay quiet but semantic, while the
  current checkpoint uses the same chart-linked solid surface family as KPI
  cards. The 1 px connector is visible only between checkpoint cards; desktop
  and mobile assertions lock connector alignment, card gap, opaque backgrounds,
  and readable quiet-state text.
- Active milestone selection uses the global chart-linked solid surface tokens
  with white content, while unselected semantic states retain restrained
  status accents. Hover/focus on unselected milestones returns to a neutral
  raised surface plus an 18% inset keyline, avoiding a color flood.
- `BulkActionBar` reuses the chart-linked active surface treatment and exposes
  `reserveSpace` for consumers that need a stable table/content coordinate when
  selection appears. Selected DataTable rows retain a low-tint fill with an
  accent rail rather than recoloring dense table content.

## Commands and exact outcomes

```text
pnpm format:check                         PASS
pnpm contracts:generate                   PASS (181 projections)
pnpm tokens:coverage                      PASS
pnpm typecheck                            PASS
pnpm test                                 PASS (tokens 15/15; contrast 184 pairs; contract/catalog/package bridges pass)
pnpm build                                PASS
pnpm package:build                        PASS
pnpm package:verify                       PASS (13 root exports; self-contained styles/assets)
pnpm test:adoption:static                 PASS
pnpm test:adoption                        PASS (4/4, configured one worker)
pnpm test:next-consumer                   PASS (3/3 from packed tarball)
Playwright reviewed visual suites         PASS (55/55; 20/20)
Affected workflow visual subset           PASS (13/13 without snapshot update after 3 intentional desktop baseline updates)
Stateful active/selection regression      PASS (1/1)
Stepper, connector, and axe regression    PASS (4/4)
pnpm exec playwright test --workers=1     PASS (190/190, 8.8 minutes)
```

## Decision and boundary

**FREEZE TEN4SEVEN UI UNIVERSAL V2 — SYSTEM QUALITY CLOSED** for this bounded
local source state.

The distribution/technical compatibility decision is **PASS**. AAPM/Farm
adoption authorization remains **CONDITIONAL** only because the public
repository and package `private`/`UNLICENSED` wording still needs explicit
owner clarification. That is not a visual, behavioral, package, or Next.js
consumer failure. See
[NEXTJS_APP_ROUTER_COMPATIBILITY.md](../../docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md)
for the cold-start consumer handoff.
