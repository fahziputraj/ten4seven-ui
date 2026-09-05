# Overlay Geometry and Global Theme Settings Correction

## Scope

This is a bounded P0 correction for the local Ten4Seven UI playground. It
addresses two related ownership failures without expanding product behavior:

1. Calendar and time overlays must retain component identity instead of
   inheriting the width of a wide form trigger.
2. The header settings affordance must expose a shared, progressive Theme
   Settings Sheet while `/theme-studio` remains the advanced authoring
   workbench.

No commit, push, deployment, or publication is authorized by this note.

## Overlay geometry

`useFloatingPosition` now accepts the explicit `OverlayWidthStrategy` contract:

```text
content | trigger | min-trigger | fixed | viewport
```

The legacy `minWidth` option remains a compatibility alias for
`min-trigger`. Canonical consumers declare their intent at the call site:

- `Select`, `MultiSelect`, navigation branches, and `Combobox` use
  `min-trigger`, with the searchable combobox receiving a 280px minimum.
- `DatePicker`, the current one-month `DateRangePicker`, and `TimePicker` use
  `fixed` preferred geometry and clamp to the viewport.
- `Popover`, `Tooltip`, `DropdownMenu`, and contextual floating surfaces retain
  intrinsic/content geometry.
- `CommandMenu` uses the canonical Modal with a command-sized variant;
  Modal now exposes small, medium, large, and command geometry variants.
- `Drawer` remains viewport-based with a tokenized desktop maximum.

The token runtime exposes component-owned semantic geometry in both the
provider variables and the DTCG export:

```text
--t7-overlay-menu-sm / md / lg
--t7-overlay-select-min / max
--t7-overlay-combobox
--t7-overlay-date / date-range / time / color
--t7-overlay-popover-min / max
--t7-overlay-tooltip-max
--t7-overlay-command
--t7-overlay-dialog-sm / md / lg
--t7-overlay-drawer-max
```

Calendar and time surfaces use bounded CSS widths (`336px` and `360px` by
default) with `calc(100vw - 32px)` collision-safe clamps. The positioning hook
still measures the resulting surface, flips when necessary, and keeps it in
the viewport; fixed means preferred identity, not an unresponsive rectangle.

## Global Theme Settings Sheet

The canonical header gear opens one shared right-side `Drawer` titled
`Theme settings` on Theme Studio, Component Lab, Operations Tracker, Publishing
Store, and Public Showcase. The panel intentionally contains only everyday and
basic authored choices:

- named recipes and Custom;
- Appearance, Density, Contrast, and Motion runtime preferences;
- Sharp, Soft, and Rounded basic Shape presets;
- Typography and Brand color selects;
- Reset settings and `Open Theme Studio`.

The panel writes through the same provider and runtime-preference callbacks as
Theme Studio, so changes are live across the currently rendered product shell.
Reset clears authored overrides, returns to the playground defaults, clears the
runtime preference object, and leaves the sheet open for another choice.

`/theme-studio` remains the advanced workbench for live preview, exact 0–24px
radius authoring, semantic axes, scopes, diagnostics, CSS-first delivery, and
export. The basic panel deliberately does not duplicate those controls.

## Verification boundary

Rendered browser QA must confirm:

- date and time popovers are materially narrower than their wide form triggers;
- each overlay remains inside desktop and narrow viewports;
- the settings sheet is reachable from all five shells;
- recipe, runtime, shape, reset, and `Open Theme Studio` changes are visible on
  the shared provider.

All checks are local. Existing dirty worktree changes remain user-owned and are
preserved.
