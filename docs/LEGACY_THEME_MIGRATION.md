# Legacy theme migration

The v2 recipe model is additive. Existing `ThemeConfig` consumers continue to
work through the provider's compatibility resolver. Migrate when a product can
benefit from a coherent authored baseline, not simply because a new API exists.

## Existing configuration remains valid

```tsx
import "@ten4seven/ui/styles.css";
import { Ten4SevenProvider } from "@ten4seven/ui";

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
    elevation: "soft",
  }}
>
  <App />
</Ten4SevenProvider>;
```

The provider merges the object into its established compatibility configuration
and resolves it through the existing token runtime. `ThemeProfile`
normalization is the recipe-construction path, not a conversion step imposed on
direct `ThemeConfig` consumers. The provider also retains legacy data
attributes such as `data-density`, `data-palette`, and `data-theme-appearance`
for established consumers.

## Prefer a recipe for ordinary products

```tsx
<Ten4SevenProvider
  theme="enterprise"
  preferences={{ appearance: "system", density: "compact" }}
>
  <App />
</Ten4SevenProvider>
```

This replaces a broad set of product-level choices with an intentional recipe,
then keeps genuine user choices in `preferences`.

| Legacy axis                                              | v2 destination                                                                   | Notes                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `appearance`                                             | `preferences.appearance` for user choice; recipe profile for an authored default | `system` remains supported at runtime.                                  |
| `density`                                                | `preferences.density` for user choice; recipe profile for the default            | All four existing density names remain valid.                           |
| `palette`, `primary`, `accent`, `canvas`, `chartPalette` | recipe profile, typed `ThemeOverrides.config`, or advanced `ThemeConfig`         | Do not normally expose these in a settings panel.                       |
| `radius`, `radiusValue`, `typography`, `elevation`       | recipe profile, typed `ThemeOverrides.config`, or advanced `ThemeConfig`         | Keep an advanced editor explicit and local to a product root.           |
| `motionDuration`                                         | recipe motion anchor or advanced `ThemeConfig`                                   | User-facing reduction is `preferences.motion: "reduced"`.               |
| no legacy equivalent                                     | `preferences.contrast`                                                           | `more` strengthens existing semantic roles without changing the recipe. |

## Choose a migration path

### Product matches a curated context

Replace the configuration object with a recipe name, then move individual
appearance and density choices into `preferences`.

### Product has an owned brand

Keep the `ThemeConfig` object. Use a typed, centrally owned configuration and
continue to consume semantic components. Do not invent a new recipe just to
name a one-off brand until it has a reusable, tested product-context rationale.

### Product needs one controlled recipe adjustment

Keep the recipe and use `ThemeOverrides` at the product root:

```tsx
<Ten4SevenProvider theme="product" overrides={{ config: { accent: "cyan" } }}>
  <App />
</Ten4SevenProvider>
```

Use `variables` only for a documented `--t7-*` token adjustment that cannot
be represented by `config`. It is typed and bounded, but still an expert
escape hatch rather than a feature styling mechanism.

### A single region needs contrast or a different treatment

Keep the page recipe and use `ThemeScope`:

```tsx
<ThemeScope tone="inverse">
  <CampaignHero />
</ThemeScope>
```

Do not attach ad hoc color overrides to child controls.

## Verify an upgrade

1. Run the product with the old object configuration and capture the intended
   state.
2. Introduce the selected recipe or keep the object path.
3. Check light, dark, and system appearance; each supported density; focus;
   reduced motion; overlays; and both desktop and narrow layouts.
4. If using persistence, check a save, reload, reset, and storage-failure
   path using the intended `persistenceKey`.
5. Run the repository validation gates and rendered browser QA.

Do not delete the compatibility object configuration merely because a route has
moved to a recipe. Other consumers may still rely on it.
