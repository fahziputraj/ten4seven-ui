# Theme contract for agents

Use the v2 theme model in this order:

```text
product context -> ThemeRecipe -> RuntimePreferences -> canonical components
```

Start with the compact recipe projection at `generated/theme-recipes.json`.
The initial curated choices are `enterprise`, `product`, `editorial`, and
`commerce`. A recipe coordinates palette, primary action, accent/focus,
canvas, charts, radius, density, typography, motion anchor, elevation,
expression, and composition. It is not a component variant.

```tsx
<Ten4SevenProvider
  theme="enterprise"
  preferences={{
    appearance: "system",
    density: "compact",
    contrast: "more",
    motion: "reduced",
  }}
>
  <App />
</Ten4SevenProvider>
```

`RuntimePreferences` is intentionally limited to `appearance`, `density`,
`contrast`, and `motion`. Do not turn a normal user settings panel into a raw
brand editor by exposing arbitrary palette, typography, radius, elevation, or
motion-duration controls.

Use `ThemeScope` for an intentional bounded semantic context:

```tsx
<ThemeScope tone="inverse">
  <Hero />
</ThemeScope>
```

For a default-toned scope, explicit scope `preferences` win for appearance and
density; otherwise an explicit scope recipe or `ThemeConfig` supplies those
values, and a scope with neither inherits its immediate parent. The scoped
`overrides.config` layer is an advanced exception below explicit preferences.
`tone="inverse"` intentionally flips the immediate parent’s resolved
appearance for that contextual surface.

For an advanced product-root exception, use typed `ThemeOverrides` after a
recipe:

```tsx
<Ten4SevenProvider theme="product" overrides={{ config: { accent: "cyan" } }}>
  <App />
</Ten4SevenProvider>
```

`ThemeOverrides.variables` accepts only `--t7-*` semantic custom properties.
It is an expert escape hatch, not a local feature-styling API. For a genuine
custom brand editor, the compatible `ThemeConfig` object remains accepted:

```tsx
<Ten4SevenProvider
  theme={{ palette: "blue", primary: "indigo", accent: "cyan" }}
>
  <App />
</Ten4SevenProvider>
```

CSS-first delivery uses `@ten4seven/ui/theme.css` plus
`@ten4seven/ui/components.css` and the `data-t7-*` root attributes. It covers
curated recipes; arbitrary advanced objects still require the runtime resolver
or an application-owned compiler.

```html
<html
  data-t7-theme="enterprise"
  data-t7-mode="dark"
  data-t7-density="compact"
></html>
```

The static recipe CSS has selectors for resolved `light` and `dark` modes, not
for `data-t7-mode="system"`. Outside the provider, use an application or
media-query adapter to write the currently resolved mode to the root.

Components consume semantic variables and the native `t7Motion` role map.
Never re-create a primitive or introduce raw palette-family names in consumer
feature code. Follow **theme first, component second, local override last**.

Read the complete consumer guidance in [THEMING.md](../THEMING.md),
[THEME_RECIPES.md](../THEME_RECIPES.md),
[TOKENS.md](../TOKENS.md), and
[LEGACY_THEME_MIGRATION.md](../LEGACY_THEME_MIGRATION.md).
