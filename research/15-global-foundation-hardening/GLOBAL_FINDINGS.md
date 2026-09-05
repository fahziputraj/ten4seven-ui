# Global foundation findings

Date: 5 September 2026  
Primary surface: `http://127.0.0.1:4173/tokens`  
Scope: bounded global foundation hardening only.

## Findings resolved

| Area                | Finding                                                                                      | Resolution                                                                                                                                                                                                                 | Evidence                                                               |
| ------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Semantic color      | Primary, success and chart roles needed explicit ownership and a stable expressive sequence. | Action/brand, status and categorical chart roles are resolved independently. The shared chart sequence is green, teal, amber, violet and rose; a hue may intentionally recur in a profile without changing role ownership. | `packages/tokens/src/theme.ts`; `tests/global-foundation.spec.ts`      |
| Surface expression  | Colored KPI surfaces needed a global intensity model instead of local color decisions.       | Canonical `Paper`, `Soft`, `Expressive`, `Solid` and `Inverse` expressions are exposed by the shared `SurfaceEmphasis`/`Surface` contracts.                                                                                | `packages/contracts/src/foundation.ts`; `/tokens#token-surfaces`       |
| Semantic foreground | Solid colored surfaces needed centrally paired readable foregrounds.                         | Solid primary, success, warning, danger, info, categorical chart surfaces and inverse resolve through shared foreground tokens.                                                                                            | `/tokens#token-surfaces`; semantic contrast suite                      |
| Motion              | One authored duration could make ordinary interactions sluggish.                             | Motion is resolved through bounded semantic roles: micro, state, popup, overlay, layout, reveal, chart, slow and exit. Reduced motion collapses effective behavior.                                                        | `/tokens#token-motion`; `tests/global-foundation.spec.ts`              |
| Focus               | Focus could inherit an overly saturated accent treatment.                                    | Focus has independent color, width, offset, neutral halo, composed ring and field-border roles; forced colors uses the platform outline.                                                                                   | `/tokens#token-interaction`; forced-colors test                        |
| Typography          | Dense profiles risked 10px overlines/table headers and 12px table cells.                     | Readability floors are 12px overline/table header and 13px table cell/input while density controls rhythm and geometry.                                                                                                    | `/tokens#token-typography`; typography assertions                      |
| Layout              | Page/shell measurements were not sufficiently discoverable as a global contract.             | Page gutter, mobile gutter, content/prose rails, sidebar/header/aside geometry, section rhythm, safe areas and component-owned breakpoints are documented and inspectable.                                                 | `/tokens#token-viewport`                                               |
| Viewport vs scroll  | Responsive behavior and scroll ownership were presented as one concern.                      | `Layout & Viewport` and `Scroll Ownership` are separate token families with an explicit one-document-scroll rule and bounded-region exceptions.                                                                            | `/tokens#token-viewport`; `/tokens#token-scroll`                       |
| Boundary hierarchy  | Subtle/default/strong tiers could collapse under increased contrast.                         | An internal contrast boundary tier keeps `--t7-border-hsl` between subtle and strong when contrast is `more`; no public token expansion was required.                                                                      | `packages/tokens/src/theme.ts`; token boundary test                    |
| Elevation           | The token inspector could collapse distinct shadow values through a CSS probe.               | The inspector now presents the authoritative runtime custom-property payload, preserving distinct Surface/Raised/Card/Popup/Modal values.                                                                                  | `/tokens#token-elevation`; `apps/playground/src/token-foundations.tsx` |
| Terminology         | Canvas display labels and machine names could drift.                                         | Canonical display labels are shared through `CANVAS_LABELS`; `/tokens` presents the display name with the machine name.                                                                                                    | `packages/contracts/src/foundation.ts`; active profile                 |
| Data visualization  | Chart roles were mostly visible as a five-slot series palette.                               | Axis, grid, labels, tooltip, focus, selection, comparison, threshold, no-data and explicit positive/negative roles are exposed separately.                                                                                 | `/tokens#token-charts`                                                 |
| Iconography         | Optical icon conventions were not discoverable from the foundation page.                     | Compact/control/navigation/status/feature size roles and semantic inherited paint/alignment guidance are documented.                                                                                                       | `/tokens#token-icons`                                                  |

## Explicit non-findings / preserved decisions

- This pass does not redesign Operations Tracker, Publishing Store, Public Showcase,
  Theme Studio or Component Lab. They are propagation evidence surfaces.
- Selective colored KPI cards and expressive surfaces remain supported. The global
  contract controls meaning and intensity; it does not flatten every card to paper.
- The preferred KPI/chart expression remains the ten4seven sequence: green,
  amber, teal and violet for the four-card operational row, with rose available
  as the fifth categorical slot.
- No new primitive family or donor UI dependency was introduced.
- Existing semantic roles remain separate even when two roles resolve to the same
  value in a particular profile; the role distinction is intentional and allows
  future profile divergence.
