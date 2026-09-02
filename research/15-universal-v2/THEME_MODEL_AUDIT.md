# Theme model audit

## Current model

The v2 model intentionally separates authored choices from runtime choices:

```text
ThemeRecipe
  -> ThemeProfile
  -> compatibility ThemeConfig
  -> runtime preferences and expert overrides
  -> resolved variables
```

The concrete sources are `packages/contracts/src/theme-recipe.ts`,
`packages/contracts/src/theme-profile.ts`, `packages/contracts/src/types.ts`,
and `packages/ui/src/provider.tsx`.

## Recipe versus runtime preference

| Concern                                                                                                                          | Current owner                                      | Reason                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Palette, primary action, accent/focus, canvas, chart strategy, radius, typography, elevation, default density, and motion anchor | `ThemeRecipe.profile`                              | These are coordinated authored product decisions.                                                         |
| Content width, reading measure, page gutter, section rhythm                                                                      | `ThemeRecipe.composition`                          | These are product composition decisions, not primitive variants.                                          |
| Appearance, density, contrast, motion reduction                                                                                  | `RuntimePreferences`                               | These represent user comfort or accessibility choices applied after a recipe.                             |
| Small product exception                                                                                                          | `ThemeOverrides` in `packages/ui/src/provider.tsx` | Typed config axes and bounded `--t7-*` variables apply after the recipe and before persisted local edits. |
| Existing custom brand                                                                                                            | `ThemeConfig` compatibility path                   | Preserves current consumers and controlled Theme Studio workflows.                                        |

## Static and React delivery

`Ten4SevenProvider` sets `data-t7-theme`, `data-t7-mode`,
`data-t7-density`, `data-t7-contrast`, `data-t7-motion-preference`, and
`data-t7-expression` in `packages/ui/src/provider.tsx`. The package generator
in `packages/ui/scripts/build-package.mjs` emits a `theme.css` slice containing
the base CSS plus generated recipe selectors, and a `themes.css` slice with
only those selectors.

`packages/tokens/src/theme-recipes.css` contains static selectors for each of
the four recipes in light and dark modes. It additionally carries independent
density, higher-contrast, and reduced-motion selectors. This establishes a
CSS-first path for curated recipes; it does not compile arbitrary advanced
objects into static CSS. `system` is not a static mode selector: a CSS-first
consumer needs an application or media-query adapter to write its resolved
light or dark value.

## Contextual theming

`ThemeScope` in `packages/ui/src/provider.tsx` re-resolves the semantic token
contract for a subtree and provides that resolved contract to nested scopes.
Its declared tone vocabulary is `default` and `inverse`; it also accepts a
recipe, preferences, and scoped `ThemeOverrides`. `packages/ui/src/styles.css`
includes the `.t7-theme-scope` and inverse-tone surface rules.

For a default-toned scope, explicit scoped preferences win for appearance and
density. Without them, an explicit scoped recipe or `ThemeConfig` supplies
those values; without either, the scope inherits the immediate parent. Scoped
`overrides.config` is an advanced configuration layer below explicit
preferences. `tone="inverse"` deliberately flips the immediate parent’s
resolved appearance for its contextual surface.

This is the correct architectural seam for an inverse hero or footer. Source
inspection alone does not prove nested scopes, portal/overlay inheritance, or
contrast under every scope combination.

## Compatibility status

The provider still accepts a full `ThemeConfig` object and retains its legacy
`data-density`, `data-palette`, `data-primary`, `data-accent`, `data-canvas`,
and `data-theme-appearance` attributes. `themeProfileToLegacyConfig` adapts a
typed profile back into that established shape. This is a real source-level
compatibility seam; consumer and persistence behavior still require executed
tests before a final compatibility pass can be claimed.

## Risks and required proof

- Recipe + runtime preference precedence needs provider/unit and browser proof.
- CSS-first selectors need a browser proof outside React state.
- `ThemeScope` needs nested, inverse, focus, overlay, and narrow-layout proof.
- System appearance and persistence need reload-safe proof.
- New recipe names need both static selector generation and package-artifact
  verification.

The next implementation work should close those proofs before expanding the
recipe catalog.
