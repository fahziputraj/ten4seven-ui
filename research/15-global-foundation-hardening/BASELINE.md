# Global foundation baseline — 5 September 2026

Scope: global foundations and the `/tokens` debugger. Product routes are propagation evidence. Source baseline is the existing dirty checkout at `7e6f33b` on `codex/t7ui-next-001-next-app-router-compat`; existing edits, deleted legacy covers, untracked work and snapshots are preserved.

## Verified runtime

The already-running server at `127.0.0.1:4173` was reused. The connected browser resolved light, emerald base/primary/accent, **paper**, spectrum, **sharp**, comfortable, modern (Inter), soft elevation, **standard** contrast, full motion, **0.5s** anchor. This differs from the supplied audit profile. No live preference was changed to manufacture agreement.

Before/after propagation captures use a separate, isolated browser context with the supplied high-risk profile: light, emerald, balanced canvas, spectrum, rounded, comfortable, modern, soft elevation, more contrast and 1.25s full motion. The browser's actual computed variables and route HTTP status are recorded in `evidence/before/runtime.json`.

## Source and rendered findings

- `theme.ts`: primary and chart-1 both `148 58% 29%`; success `142 66% 29%`. Four-color charts directly borrow primary and accent. Color meaning is insufficiently separated.
- Existing `SurfaceEmphasis` supports plain, soft, solid, inverse; canonical Card/MetricCard/Surface/Alert already own semantic foregrounds. Missing intermediate expressive intensity and a discoverable model.
- Motion runtime scales 10/20/35/100% of one anchor. At 1.25s, state/overlay is 438ms; at 2.5s it becomes 875ms. Typed `resolveMotionRoles` exists but the CSS resolver does not use it.
- Focus is accent-derived (`78 82% 45%` for emerald), translucent and more saturated under increased contrast. A ring exists, but width/offset/halo are not independently semantic.
- Typography: overline 10/14px, table-header 10/14px, table-cell 12/18px. Density already changes geometry without remapping type.
- Layout already has gutters, reading/application/form/data rails, section and cluster rhythm. Shared sidebar width is still a CSS literal; viewport and scroll concepts are merged in the debugger.
- Radius profiles already match the brief. Table wrapper consumes panel radius without an explicit data-surface ceiling.
- Icons already have five optical size roles, a 24-unit viewBox, inherited semantic paint and meaningful labels. Preserve this system.
- Charts have keyboardable marks, labels, summaries, tooltips and legend, but their axis/grid/focus/tooltip styling borrows generic variables and some local literals.
- `/tokens`: navigation does not follow document order, typography is last, long display text wraps inside uniform grid cells, motion/elevation output shows variable names only, preference axes are omitted from the profile summary.
- Studio labels `balanced` as “Soft paper”; token page only prints `balanced`.

## Initial checks

`pnpm test`: PASS before source edits, including 15 token unit tests, contracts, deterministic DTCG, 184 semantic contrast pairs (minimum 4.80:1), token governance, component coverage, slice/adoption contract proof, brand/recipe families, catalog, component system and Tailwind package consumer. This is baseline evidence, not the final gate.

This pass begins with no product composition changes and no new canonical component planned. The page archetype is a system documentation/debugger surface using implemented Typography, Card, Table, Button, Input, MetricCard and chart contracts.
