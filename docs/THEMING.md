# Universal theming

Ten4Seven v2 separates an authored visual starting point from the choices a
person makes while using the product. The intent is to make a coherent result
the easy default without removing the established expert configuration path.

```text
typed foundation and semantic profile
  -> curated theme recipe
  -> runtime preferences
  -> component semantic variables
```

The typed sources are `packages/contracts/src/theme-profile.ts` and
`packages/contracts/src/theme-recipe.ts`. The token resolver in
`packages/tokens/src/theme.ts` is the compatibility boundary that produces the
CSS custom properties consumed by `@ten4seven/ui`.

## Start with a recipe

Use a named recipe for normal product work. A recipe coordinates palette,
action color, accent/focus color, canvas, chart treatment, radius, density,
typography, elevation, expression, and composition rather than asking each
consumer to assemble those axes independently.

```tsx
import "@ten4seven/ui/styles.css";
import { Ten4SevenProvider } from "@ten4seven/ui";

export function Root() {
  return (
    <Ten4SevenProvider theme="enterprise">
      <App />
    </Ten4SevenProvider>
  );
}
```

The initial recipe names are `enterprise`, `product`, `editorial`, and
`commerce`. Read [THEME_RECIPES.md](THEME_RECIPES.md) before choosing one; the
names describe an authored product context, not a component variant.

## Apply runtime preferences separately

`preferences` is deliberately limited to personal or accessibility-oriented
choices. It is resolved after the recipe and does not invite an application to
rewrite its brand on every page.

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

| Preference   | Values                                       | Effect                                                                                        |
| ------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `appearance` | `light`, `dark`, `system`                    | Chooses the resolved color mode.                                                              |
| `density`    | `comfortable`, `default`, `compact`, `dense` | Remaps 19 shared roles across control, field, card, menu, overlay, panel, and table geometry. |
| `contrast`   | `standard`, `more`                           | Strengthens muted text, borders, and focus treatment without replacing the recipe.            |
| `motion`     | `full`, `reduced`                            | Uses the semantic reduced-motion values in addition to the operating-system media query.      |

Do not expose raw palette, typography, elevation, or animation knobs as
ordinary user preferences. Those are authored theme decisions unless the
application is intentionally a brand editor.

## Keep the advanced configuration path

The established `ThemeConfig` object remains accepted. Use it when an
application genuinely owns a custom brand or a controlled Theme Studio-like
editor.

```tsx
import type { ThemeConfig } from "@ten4seven/ui";

const customBrand: ThemeConfig = {
  palette: "blue",
  primary: "indigo",
  accent: "cyan",
  canvas: "balanced",
  chartPalette: "spectrum",
  radius: "soft",
  density: "default",
  typography: "modern",
  elevation: "soft",
};

<Ten4SevenProvider
  theme={customBrand}
  preferences={{ appearance: "system", density: "compact" }}
>
  <App />
</Ten4SevenProvider>;
```

The current public API accepts either a recipe name or a `ThemeConfig` object.
For the smaller case where a product starts from a recipe but must make an
explicit expert adjustment, use the bounded `ThemeOverrides` escape hatch:

```tsx
<Ten4SevenProvider
  theme="enterprise"
  overrides={{
    config: { primary: "indigo", elevation: "standard" },
    variables: { "--t7-reading-measure": "72ch" },
  }}
>
  <App />
</Ten4SevenProvider>
```

`overrides.config` is a typed `Partial<ThemeConfig>`; `overrides.variables`
accepts only `--t7-*` custom-property names. Overrides are applied after the
recipe and before persisted local Theme Studio edits. They are an expert-only,
product-root seam, not a routine feature-level styling API. The provider
context still exposes `setTheme` and `resetTheme` for an intentional local
theme editor. `persistenceKey` only controls whether those local overrides are
stored in `localStorage`.

## Scope an intentional contextual surface

`ThemeScope` gives a nested region a complete semantic token contract. It is
appropriate for an inverse hero, footer, promotional panel, or an embedded
surface with a deliberately different recipe. Components inside the scope do
not need special-case colors.

```tsx
import { ThemeScope } from "@ten4seven/ui";

<ThemeScope tone="inverse">
  <Hero />
</ThemeScope>;
```

```tsx
<ThemeScope
  theme="editorial"
  preferences={{ density: "comfortable" }}
  overrides={{ variables: { "--t7-reading-measure": "72ch" } }}
>
  <ArticleLead />
</ThemeScope>
```

### Scope precedence

For a default-toned scope, explicit scope `preferences` win for appearance and
density. If a preference is absent, an explicit scoped recipe or
`ThemeConfig` supplies that value. A scope with neither a theme input nor an
explicit preference inherits the immediate parent’s resolved value.

`overrides.config` is a scoped advanced configuration layer; it applies after
the scope recipe or object but does not outrank an explicit scope preference.
`tone="inverse"` is an intentional contextual exception: it flips the immediate
parent’s resolved appearance for the scoped surface, rather than selecting an
independent appearance mode.

`tone` is currently `default` or `inverse`. Avoid using scopes as page-local
color overrides: a scope should represent a bounded semantic context, not a
way to bypass the theme contract.

## Use the CSS-first contract when React is not in charge

The package can deliver a recipe through attributes alone. Import the theme
slice and component slice (or the all-in-one `styles.css`), then place the
attributes on the document root or another bounded root.

```css
@import "@ten4seven/ui/theme.css";
@import "@ten4seven/ui/components.css";
```

```html
<html
  data-t7-theme="enterprise"
  data-t7-mode="dark"
  data-t7-density="compact"
  data-t7-contrast="more"
  data-t7-motion-preference="reduced"
></html>
```

`theme.css` contains base tokens and the generated, static recipe selectors;
`themes.css` contains only the recipe selectors; `components.css` contains the
canonical component styles. CSS-first usage supports the curated recipes.
Arbitrary `ThemeConfig` values still need the runtime resolver or an
application-owned token compilation step.

Static recipe selectors support resolved `light` and `dark` modes only. Do not
put `data-t7-mode="system"` on a CSS-first root and expect a recipe selector to
match. A non-React application that follows the operating-system preference
needs an application or media-query adapter that writes the resolved `light` or
`dark` value to the root and updates it when that preference changes.

## Observable runtime contract

The provider writes the full runtime vocabulary:

```text
data-t7-theme
data-t7-mode
data-t7-density
data-t7-contrast
data-t7-motion-preference
data-t7-expression
```

Static recipe CSS selects on `data-t7-theme`, the resolved
`data-t7-mode`, `data-t7-density`, `data-t7-contrast`, and
`data-t7-motion-preference`. `data-t7-expression` is provider/recipe metadata;
it does not select a CSS-first recipe block.

Legacy attributes such as `data-density`, `data-palette`, and
`data-theme-appearance` remain on the provider for compatibility. New
CSS-first consumers should prefer the `data-t7-*` contract.

## Next reading

- [THEME_RECIPES.md](THEME_RECIPES.md) for authored starting points.
- [TOKENS.md](TOKENS.md) for ownership and token naming.
- [COMPOSITION.md](COMPOSITION.md) for page rhythm and content bounds.
- [AESTHETIC_PROFILES.md](AESTHETIC_PROFILES.md) for expression guidance.
- [LEGACY_THEME_MIGRATION.md](LEGACY_THEME_MIGRATION.md) for a safe upgrade.
