# Current architecture: Universal Design System v2

## Scope and evidence boundary

This is a source-inventory snapshot taken on 2026-09-02. It records what is
present in the checkout, using exact repository paths. It is not a substitute
for package, browser, accessibility, or visual-regression execution; those
outcomes belong in `GATE_UNIVERSAL_V2.md` only after the commands and renders
have actually run.

## Runtime layers

| Layer                    | Current owner                                                | Evidence                                                                                   | v2 role                                                                                   |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Typed semantic profile   | `packages/contracts/src/theme-profile.ts`                    | `ThemeProfile`, `normalizeThemeProfile`, `themeProfileToLegacyConfig`                      | Normalizes legacy-shaped theme axes into named groups.                                    |
| Curated recipe           | `packages/contracts/src/theme-recipe.ts`                     | `THEME_RECIPES`, `ThemeRecipeName`, `resolveRuntimePreferences`                            | Coordinates profile, expression, and composition for four authored contexts.              |
| Contract types           | `packages/contracts/src/types.ts`                            | `RuntimePreferences`, `ThemeComposition`, `ThemeRecipe`, `LegacyThemeConfigLike`           | Defines the public vocabulary without making components aware of palettes.                |
| Token resolver           | `packages/tokens/src/theme.ts`                               | `resolveTheme`, `buildThemeVariables`                                                      | Resolves palette/canvas/radius/density/type/motion/elevation into semantic CSS variables. |
| Base CSS                 | `packages/tokens/src/theme.css`                              | fonts, focus defaults, z-layer, system reduced-motion media query                          | Supplies browser-level base behavior.                                                     |
| Static recipe CSS        | `packages/tokens/src/theme-recipes.css`                      | generated `data-t7-theme`/mode selectors plus density, contrast, motion selectors          | Supports CSS-first curated recipes.                                                       |
| React runtime            | `packages/ui/src/provider.tsx`                               | `Ten4SevenProvider`, `ThemeScope`, `ThemeOverrides`, context hook                          | Orchestrates recipes, preferences, local persistence, scopes, and runtime variables.      |
| Components               | `packages/ui/src/styles.css`                                 | semantic `--t7-*` consumption                                                              | Renders canonical UI against semantic roles.                                              |
| Package assembly         | `packages/ui/scripts/build-package.mjs`                      | writes CSS slices, `tokens.dtcg.json`, bundled JS/types, and self-hosted fonts             | Makes the artifact self-contained and sliceable.                                          |
| Package verification     | `packages/ui/scripts/verify-package.mjs`                     | checks required artifacts, static selectors, Tailwind bridge, DTCG shape, and root exports | Guards artifact shape, not visual correctness alone.                                      |
| Tailwind bridge          | `packages/ui/src/tailwind.css`                               | `@theme inline` semantic mappings                                                          | Maps Tailwind v4 utilities to active Ten4Seven variables.                                 |
| AI retrieval             | `generated/agent-index.json`, `generated/theme-recipes.json` | `themes` entry points to recipe guidance and `generated/tokens.dtcg.json`                  | Keeps recipe and token knowledge discoverable without scanning all catalogs.              |
| Playground proof surface | `apps/playground/src/App.tsx`, `apps/playground/src/app.css` | Theme Studio recipe/preferences controls and an inverse `ThemeScope` sample                | Gives the runtime a deterministic system/harness surface.                                 |

## DTCG-compatible export

`scripts/generate-dtcg-token-export.mjs` deterministically emits typed sRGB
reference values, normative dimension/duration value objects, baseline semantic
aliases, per-recipe action aliases, and recipe metadata in
`generated/tokens.dtcg.json` and
`packages/tokens/generated/tokens.dtcg.json`, with an agent-facing copy at
`packages/agent/generated/tokens.dtcg.json`. The package includes the same
artifact as `@ten4seven/ui/tokens.dtcg.json`. It is an interoperability output;
the typed runtime remains the canonical authoring and rendering source.

The root `semantic.color.action` group is the baseline emerald alias set.
Recipe-selected action aliases live at
`theme.recipes.<recipe>.semantic.color.action`; that portability aid does not
turn the JSON artifact into a live recipe resolver.

## Data flow

```text
ThemeRecipe
  -> ThemeProfile -> recipe compatibility adapter -> resolved ThemeConfig
ThemeConfig
  -> established provider compatibility configuration
both paths
  -> RuntimePreferences and bounded ThemeOverrides
  -> resolveTheme + buildThemeVariables
  -> data-t7-* attributes and --t7-* variables
  -> canonical component CSS
```

Static delivery follows the same downstream contract:

```text
data-t7-theme + resolved data-t7-mode (light or dark) + optional preference attributes
  -> generated theme-recipes.css selector
  -> --t7-* variables
  -> canonical component CSS
```

`system` is a provider/runtime preference rather than a static recipe selector.
A CSS-first consumer needs an application or media-query adapter to set the
resolved mode on its root.

## Current v2 surface

- Recipes: `enterprise`, `product`, `editorial`, and `commerce`.
- Runtime preferences: appearance, density, contrast, and motion reduction.
- Scope tones: `default` and `inverse`.
- Advanced escape hatch: typed `ThemeOverrides.config` and bounded
  `ThemeOverrides.variables` names beginning with `--t7-`.
- Compatibility: the existing `ThemeConfig` object and legacy provider data
  attributes remain available.

## Important boundaries

1. The generated token JSON is DTCG-compatible, but it does not replace the
   typed runtime as the canonical authoring source.
2. `packages/tokens/src/theme.ts` still uses HSL tuples as the canonical
   runtime color representation. No source evidence in this audit establishes
   an OKLCH migration.
3. Curated recipe selectors are static; arbitrary advanced `ThemeConfig`
   values require the provider/runtime resolver or an application-owned
   compiler.
4. The initial density vocabulary is semantic but limited. See
   `COMPONENT_GEOMETRY_AUDIT.md` for remaining raw geometry examples.
5. Source presence does not prove nested `ThemeScope`, persistence, SSR,
   contrast, package, or rendered-browser behavior. Those require executed
   evidence.
