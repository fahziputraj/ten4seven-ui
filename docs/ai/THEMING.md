# Theme contract

Configure the provider or a named preset. Do not manually restyle every component.

## Public axes

- `appearance`: `light`, `dark`, or `system`.
- `palette`: `emerald`, `blue`, `violet`, or `slate`.
- `radius`: `sharp`, `soft`, or `rounded`.
- `density`: `comfortable`, `default`, `compact`, or `dense`.
- `typography`: `modern`, `humanist`, `mono`, or an object with `preset`, `ui`, `display`, and `mono` family overrides.

```tsx
<Ten4SevenProvider
  theme={{
    appearance: "dark",
    palette: "blue",
    radius: "soft",
    density: "compact",
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
