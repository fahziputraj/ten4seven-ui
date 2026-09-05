# Achromatic canvas and surface expression audit

Status: **PASS — bounded add-on, 2026-09-04**

## Scope

This audit closes the achromatic-canvas add-on without redesigning the
Ten4Seven visual language, changing palette definitions, creating a consumer
parallel component system, or introducing Farm product code.

## Source findings

SOURCE: `packages/tokens/src/theme.ts` resolves canvas neutrals separately
from palette, primary, accent, chart, and semantic status variables.

SOURCE: before this add-on, the `balanced` and `paper` light canvas profiles
contained blue-hued neutral roles. The source now defines every light and dark
canvas neutral with zero saturation; the default `balanced` environmental
canvas is explicit white (`0 0% 100%`), while off-white and gray are reserved
for achromatic structural surfaces. `balanced`, `paper`, and `monochrome`
remain backwards-compatible runtime values.

SOURCE: canonical `Card`, `MetricCard`, `Surface`, KPI items, and persistent
`Alert` callouts expose the same bounded `emphasis` vocabulary: `plain`,
`soft`, `solid`, and `inverse`. `Card`, `MetricCard`, `Surface`, and KPI items
also expose an opt-in `colorway={1..5}` bridge to the active chart series.

SOURCE: `packages/tokens/src/theme.ts` derives chart-linked solid fills while
preserving each chart hue and saturation and lowering only lightness until a
white foreground has contrast headroom. `packages/ui/src/styles.css` owns the
shared treatment and restrained Bar Chart-like gradient. No Operations,
Component Lab, or consumer-local colour fill implements this capability.

## Support matrix

| Surface           | Plain | Soft | Solid | Inverse | Chart colorway | Semantic tone             |
| ----------------- | ----- | ---- | ----- | ------- | -------------- | ------------------------- |
| `Card`            | yes   | yes  | yes   | yes     | 1–5            | `primary`/`accent`/status |
| `MetricCard`      | yes   | yes  | yes   | yes     | 1–5            | explicit when emphasized  |
| `Surface`         | yes   | yes  | yes   | yes     | 1–5            | `accent`/status           |
| `KPICluster` item | yes   | yes  | yes   | yes     | 1–5 per item   | per item                  |
| `Alert` callout   | yes   | yes  | yes   | yes     | no             | feedback status           |

`accent` is a non-status/data emphasis. `success`, `warning`, `danger`, and
`info` retain status meaning. A chart `colorway` is categorical presentation,
not a semantic remap. Alerts therefore remain semantic-only. Operations uses
colorway 1/3/2/4 for Open workstreams, Needs attention, Due in 7 days, and
Customer signals while preserving their independent primary/warning/info/accent
meaning.

## Surface allocation

The handoff's selective-colour requirement is intentionally preserved at the
surface level. Chroma is kept where it improves hierarchy, semantic scanning,
or editorial/product expression; shells, forms, dense data containers, and
ordinary repeated content remain neutral.

| Surface              | Deliberately retained colour                                                                                                  | Neutral boundary                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Theme Studio         | selected recipe proof, preview signals, and authored theme examples                                                           | authoring controls, runtime preference groups, and supporting metadata |
| Component Lab        | semantic state proofs plus five chart-linked colorways across Card, MetricCard, signal/category Card, and Surface             | specimen scaffolding, forms, tables, and repeated control rows         |
| Operations Tracker   | four solid chart-linked KPI cards plus a chart-linked active milestone: green, orange, cyan, and violet with white text/icons | quiet milestone states, tables, worklists, and application shell       |
| Operational Patterns | alert, resource, milestone, and other status/data signals                                                                     | work queues, audit streams, tables, and workflow containers            |
| Ebook Store          | cover media and restrained featured/editorial highlights                                                                      | filters, toolbar, catalog rails, and repeated list/card framing        |
| Public Showcase      | focal product/chart proof, CTA edge, and recipe-specific showcase accents                                                     | hero canvas, reading sections, generic wrappers, and page shell        |

This allocation is a visual hierarchy rule, not a consumer-specific colour
override. `emphasis="solid"` and `colorway` own categorical presentation on a
canonical surface; `tone` remains the separate semantic contract.

## Header and overlay hardening

SOURCE: the package emits `--t7-header-height`,
`--t7-header-control-height`, `--t7-header-action-gap`, and
`--t7-header-padding-inline`. `AppShell`, `TopNavigation`, and
`NavigationMenu` share the action rail rules.

SOURCE: Studio, Operations/Operational Patterns, Ebook, and Public Showcase
now use canonical header action composition. Icon-only header actions are
`IconButton` controls with labels; the reference context icon receives one
bounded neutral surface rather than a loose glyph.

SOURCE: `FloatingPortal` writes final `top`/`left` values. A legacy popover
`bottom` rule could remain active for a top-side panel, constraining its height.
The canonical `.t7-floating-content[style]` reset clears legacy insets only
when runtime coordinates exist.

OBSERVED: before the fix, a Component Lab top-side Popover measured
`clientHeight: 24`, `scrollHeight: 44`, and a rendered height of about 26 px.
After packaging the source, it measured `clientHeight: 44`,
`scrollHeight: 44`, and a rendered height of about 46 px at the same fixture.

## Verified evidence

OBSERVED:

- `pnpm format:check`, `pnpm contracts:generate`, `pnpm tokens:coverage`,
  `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm package:build`, and
  `pnpm package:verify` passed after the add-on source changes.
- The token suite passed `15/15`; its canvas-invariance assertion covers
  emerald, blue, indigo, violet, and orange in light and dark.
- The semantic contrast gate verified `184` recipe/mode pairs at WCAG AA,
  including general, semantic, and five chart-linked solid fills plus their 8%
  white gradient highlight. The lowest measured result was `4.80:1`.
- A real axe regression was found on a soft-accent MetricCard (`4.44:1`),
  corrected in canonical soft-treatment text, then the representative
  Component Lab axe smoke passed.
- A later full-suite axe pass exposed caption-sized `TrendIndicator` context at
  `3.13:1` on a soft success tint and `3.26:1` on white. Canonical trend context
  now keeps the semantic foreground at full opacity; the same axe test and the
  complete serial suite pass without changing component geometry.
- The Component Lab browser fixture renders plain, soft, solid, and inverse
  canonical surfaces plus all five chart-linked colorways across Card,
  MetricCard, and Surface. Its popover is no longer clipped.
- The Component Lab handoff Stepper preserves complete/current tint over an
  opaque surface base, so its connector cannot bleed through checkpoint copy.
  Its desktop and mobile geometry/opacity regression passed `2/2`.
- Milestone hover no longer floods a tile with selected green. Unselected hover
  uses the raised neutral surface plus an 18% inset keyline; the selected tile
  retains only its bounded 12% tint. The selected-hover render was reviewed at
  `rgba(31, 117, 71, 0.12)`.
- The explicitly reviewed visual suites passed without snapshot update:
  `55/55` system/reference/public visual tests and `20/20` operational/public
  expression and accessibility tests.
- The chart/surface/Operations affected visual subset passed `18/18` without a
  snapshot update after the reviewed Operations baselines were refreshed.
- The light-canvas browser guard opens Theme Studio, Component Lab, Operations
  Tracker, Operational Patterns, Ebook Store, and Public Showcase. It verifies
  an explicit white provider canvas plus equal RGB channels on every opaque
  provider/shell/main structural background.
- The full serial Chromium gate passed `190/190` in 8.8 minutes. It includes
  1440/1280/768/390/360 visual and content-safety coverage, keyboard overlay
  behavior, dark/high-contrast/compact/reduced-motion preferences, and axe
  smoke checks.
- `pnpm test:next-consumer` passed from a freshly packed artifact: Node
  `24.19.0`, pnpm `11.22.0`, Next `16.3.4`, React/React DOM `19.2.8`,
  TypeScript `5.9.3`, and three production Playwright/axe scenarios.

## Final add-on gate

| Requirement                                            | Result | Evidence                                                       |
| ------------------------------------------------------ | ------ | -------------------------------------------------------------- |
| Canvas remains achromatic; palette does not recolor it | PASS   | token suite + Theme Studio canvas-invariance browser test      |
| Paper/ink families and neutral default surfaces        | PASS   | runtime tokens + reviewed Studio/Operations/Publishing renders |
| Soft accent and soft status treatment                  | PASS   | Card/Metric/KPI/Alert canonical contract                       |
| Solid and inverse content beyond Button                | PASS   | Card/Metric/Surface/KPI/Alert contract + Component Lab fixture |
| Chart colorway is a reusable surface capability        | PASS   | Card/Metric/Surface/KPI APIs + five-color global proof         |
| Status differs from categorical presentation           | PASS   | independent `tone` and `colorway`; semantic-only Alert         |
| Header controls and responsive action rails            | PASS   | workbench suite and full 190/190 suite                         |
| Floating Popover geometry                              | PASS   | measured no-clipping regression + keyboard overlay suite       |
| Light/dark contrast and accessibility                  | PASS   | contrast gate, corrected axe issue, full serial axe smoke      |
| Publishing restraint and Public focal depth            | PASS   | reviewed mobile renders + visual/public expression suites      |
| AI guidance and consumer documentation                 | PASS   | `AI_QUICKSTART.md` and integration contract                    |

No hard blocker remains for this add-on. The canvas is environmental and
neutral; chroma is bounded to semantic objects of interest.

## Consumer guidance

Read [ACHROMATIC_CANVAS_SURFACE_EXPRESSION.md](../../docs/integration/ACHROMATIC_CANVAS_SURFACE_EXPRESSION.md)
for the public integration contract and
[AI_QUICKSTART.md](../../docs/ai/AI_QUICKSTART.md) for agent-facing usage.
