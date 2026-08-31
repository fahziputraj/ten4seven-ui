# Theme contract

Configure the provider or a named preset. Do not manually restyle every component.

## Public axes

- `appearance`: `light`, `dark`, or `system`.
- `palette`: one of `emerald`, `teal`, `cyan`, `blue`, `indigo`, `violet`,
  `rose`, `red`, `orange`, `amber`, or `slate`; the base semantic family used
  by UI and chart defaults. Theme Studio's base swatches also reset `primary`
  and `accent` to the selected family.
- `primary`: optional `PaletteName` source for the main action and selection
  color; defaults to `palette` and can override it independently.
- `accent`: optional `PaletteName` source for supporting accent and focus
  emphasis; defaults to `palette` and can override it independently. The same
  semantic source drives `--t7-accent-hsl`, `--t7-focus-hsl`, the focus ring,
  and focused input borders, so the Theme Studio role is intentionally one
  control rather than two colors that can drift apart.
- `canvas`: `balanced`, `paper`, or `monochrome` neutral surface treatment.
- `chartPalette`: `spectrum`, `four`, or `monochrome` data colorway. It changes
  chart series only; the existing five-slot chart variable contract remains
  stable and UI roles stay unchanged.
- `radius`: `sharp`, `soft`, or `rounded`.
- `radiusValue`: optional exact base radius in px from `0` to `24`; when set,
  it drives the entire hierarchical radius scale at one-pixel steps while
  `radius` remains the semantic family name.
- `density`: `comfortable`, `default`, `compact`, or `dense`.
- `motionDuration`: shared reveal and interaction duration in seconds from
  `0.25` to `2.5` in `0.25` second steps. The default is `1.5` seconds; derived
  fast, standard, slow, and loop duration variables keep the component
  contracts synchronized. Native motion roles then compose those durations
  with one of the shared easing curves: `--t7-motion-interactive` for hover
  and press, `--t7-motion-state` for state changes, `--t7-motion-enter-fast`,
  `--t7-motion-enter`, `--t7-motion-enter-slow`, `--t7-motion-exit`, and
  `--t7-motion-loop` / `--t7-motion-loop-eased` for keyframe behavior.
  `t7Motion` is the UI package's small public role map for consumers that
  need to author a custom surface. Components should consume these roles
  instead of inventing local animation timing.
- `typography`: `modern`, `humanist`, `editorial`, `technical`, `mono`, or an
  object with `preset`, `ui`, `display`, and `mono` family overrides. Presets
  change the family character and shared tracking while preserving the same
  semantic role names.

```tsx
<Ten4SevenProvider
  theme={{
    appearance: "dark",
    palette: "blue",
    primary: "indigo",
    accent: "cyan",
    canvas: "paper",
    chartPalette: "four",
    radius: "soft",
    radiusValue: 12,
    density: "compact",
    motionDuration: 1.5,
    typography: "modern",
  }}
>
  <App />
</Ten4SevenProvider>
```

Custom family example:

```tsx
<Ten4SevenProvider
  theme={{
    typography: {
      preset: "modern",
      ui: '"Brand Sans", sans-serif',
      display: '"Brand Display", sans-serif',
      mono: '"Brand Mono", monospace',
    },
  }}
>
  <App />
</Ten4SevenProvider>
```

Use semantic typography roles (`display-lg`, `heading-lg`, `body`, `label`, `button`, `table-header`, `metric-lg`) and component tokens. The default is one-font Inter with local variable `wght` support and optical sizing enabled. Follow **theme first, component second, local override last**.
