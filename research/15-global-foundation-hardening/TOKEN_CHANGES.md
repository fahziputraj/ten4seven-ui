# Token and foundation changes

Date: 5 September 2026

## Canonical ownership

The resolver in `packages/tokens/src/theme.ts` remains the source of concrete
runtime values. Contracts in `packages/contracts/src/foundation.ts` own the
shared vocabulary and information architecture. `Ten4SevenProvider` delivers
the values, generated theme CSS keeps the packaged path aligned, and canonical
components consume the resulting variables.

## Changes in this bounded pass

### Color and surfaces

- Kept action/brand, status and categorical chart domains distinct.
- Preserved emerald as a valid primary action family.
- Kept chart palettes independent from primary/accent choices, with a stable
  ten4seven categorical sequence: green, teal, amber, violet, rose.
- Added/retained the five-level surface expression model:
  `plain` (displayed as Paper), `soft`, `expressive`, `solid`, `inverse`.
- Centralized solid surface foreground pairs for primary, success, warning,
  danger, info, categorical chart surfaces and inverse.
- Preserved neutral paper/balanced/monochrome canvas families.

### Motion and interaction

- Reused the typed motion role resolver for semantic duration classes rather than
  allowing the authored anchor to become a universal duration.
- Preserved separate easing roles and reduced-motion handling.
- Exposed independent focus color, width, offset, halo, composed ring and field
  focus border variables.

### Typography and geometry

- Raised the production-readable floors for `overline`, `table-header`,
  `table-cell` and `input` roles.
- Kept density responsible for padding, gaps, control height and row geometry;
  it does not shrink type roles.
- Preserved intentional optical values such as 13px, 14px, 17px, 18px and
  21px where adjacent geometry requires them.
- Preserved Sharp, Soft and Rounded radius profiles, with data-surface ceilings
  instead of a universal bubbly treatment.

### Layout, viewport and scroll

- Exposed semantic page gutter, mobile gutter, content max, reading measure,
  sidebar width, header height, aside width, grid gap, section rhythm, safe-area
  and sticky-offset roles.
- Kept responsive breakpoints with the component/recipe that owns the
  transformation.
- Separated the debugger's Layout & Viewport family from Scroll Ownership.

### Boundary hierarchy

- Added one internal `borderContrast` tier to the neutral profile data.
- In `contrast: "more"`, the default boundary now resolves between the subtle
  and strong boundaries instead of aliasing `borderStrong`.
- The public token surface remains unchanged: consumers still use
  `--t7-border-subtle-hsl`, `--t7-border-hsl` and
  `--t7-border-strong-hsl`.

### Inspector correction

`apps/playground/src/token-foundations.tsx` now displays the trimmed computed
custom-property payload for shadow and focus-shadow variables. Those values are
already complete CSS values at the provider scope. Avoiding a second
`box-shadow` shorthand parse prevents browsers from presenting the modal shadow
for every elevation row when nested custom properties are involved.

The inspector still resolves durations through a probe so authored CSS duration
values are shown as usable milliseconds, and still measures rendered typography
specimens from the active page.

## Contract and test updates

- Token tests cover KPI geometry aliases and chart-solid foreground values.
- Token governance covers the core semantic variables, including KPI geometry
  and chart-solid surface roles.
- The component token coverage report was regenerated from the current source.
- The global foundation browser suite covers representative palette, appearance,
  density, contrast, motion, radius and width combinations.
