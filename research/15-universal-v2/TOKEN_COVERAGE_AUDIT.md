# Token coverage audit

## Scope

This audit compares the current source against the v2 token intent. It records
coverage in the checkout; it does not calculate contrast ratios or certify
every component state. Exact sources are listed in the evidence column.

| Area                                    | Coverage          | Evidence                                                                                                 | Notes                                                                                                                                                         |
| --------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed theme aggregate                   | Present           | `packages/contracts/src/theme-profile.ts`                                                                | `ThemeProfile` separates palette, action, accent, canvas, chart, radius, density, typography, motion, and elevation.                                          |
| Curated recipe metadata                 | Present           | `packages/contracts/src/theme-recipe.ts`; `generated/theme-recipes.json`                                 | Four named recipes add expression and composition to the profile.                                                                                             |
| Surface and text roles                  | Present           | `packages/tokens/src/theme.ts`, `buildThemeVariables`                                                    | Background, surface variants, foreground, muted foreground, borders, and selected roles are emitted.                                                          |
| Primary/accent action roles             | Present           | `packages/tokens/src/theme.ts`                                                                           | Primary hover/active/foreground and accent/focus roles are emitted separately.                                                                                |
| Field roles                             | Present           | `packages/tokens/src/theme.ts`                                                                           | Input/field background, border, foreground, hover border, focus border, and disabled roles are emitted.                                                       |
| Status roles                            | Partial           | `packages/tokens/src/theme.ts`                                                                           | Success, warning, danger, and info colors exist; foreground coverage is not symmetrical for every status in the current variable set.                         |
| Data visualization roles                | Present           | `packages/tokens/src/theme.ts`                                                                           | Five chart slots are emitted and recipes choose spectrum/four/monochrome behavior.                                                                            |
| Radius hierarchy                        | Present           | `packages/tokens/src/theme.ts`                                                                           | Indicator, control, base, panel, card, shell, and full values are emitted.                                                                                    |
| Semantic density geometry               | Partial           | `packages/tokens/src/theme.ts`; `packages/tokens/src/theme-recipes.css`                                  | All 19 `DensityProfile` roles remap by density, including control/field/card padding, menu, overlay, panel, and table geometry; raw debt remains.             |
| Composition variables                   | Present           | `packages/contracts/src/types.ts`; `packages/tokens/src/theme.ts`                                        | Content maximum, reading measure, page gutter, and composition gap are emitted.                                                                               |
| Typography roles                        | Present           | `packages/tokens/src/theme.ts`                                                                           | Role sizes, line heights, weights, tracking, family, and optical sizing are emitted.                                                                          |
| Motion roles and reduction              | Present in source | `packages/tokens/src/theme.ts`; `packages/tokens/src/theme.css`; `packages/tokens/src/theme-recipes.css` | Semantic duration/easing variables and both explicit/system reduced-motion paths exist.                                                                       |
| Z-layer and overlay roles               | Present           | `packages/tokens/src/theme.ts`; `packages/tokens/src/theme.css`                                          | Named base through command z-index variables are emitted.                                                                                                     |
| DTCG-compatible `$type`/`$value` export | Present           | `scripts/generate-dtcg-token-export.mjs`; generated root, tokens, and agent JSON artifacts               | Typed sRGB references, normative dimension/duration values, baseline aliases, and per-recipe action aliases are deterministic; the runtime remains canonical. |
| OKLCH canonical color model             | Not yet present   | `packages/tokens/src/theme.ts`                                                                           | Current palette and semantic output use HSL tuples.                                                                                                           |

## What components consume

`packages/ui/src/styles.css` primarily consumes semantic variables such as
`--t7-color-bg-canvas-hsl`, `--t7-color-text-primary-hsl`,
`--t7-action-primary-hsl`, `--t7-field-background-hsl`,
`--t7-border-hsl`, and `--t7-accent-hsl`, plus the density-aware geometry
roles. A source search for literal `hsl(<number`, hexadecimal, or RGB colors in
that file returned no component-level raw color literals in this snapshot; the
raw color tuples are centralized in the token resolver as intended.

## Geometry limitation

The 19 density-aware geometry roles are meaningful but not exhaustive.
Canonical styles still contain raw measurements for component internals. The
generated `COMPONENT_TOKEN_COVERAGE_REPORT.md` currently tracks 795 literal
pixel measurements, including examples such as:

- `max-height: 260px` on the option-list viewport;
- `min-height: 24px` and `padding: 0 9px` on the compact badge;
- `gap: 11px` and `padding: 0 12px` on the navigation item;
- fixed media, indicator, animation-offset, and viewport-cap measurements.

Some raw values are legitimate intrinsic geometry (hairlines, icon sizes,
media, and scrollbar details); this audit does not classify every occurrence.
It establishes that a full semantic geometry migration is not yet proven.

## Governance conclusions

1. New canonical components should consume existing semantic roles rather than
   add raw palette names or feature-local colors.
2. A new generic token needs a named semantic use, a resolver output, a
   component consumer, and state/contrast validation.
3. A DTCG-compatible export is available, including per-recipe action aliases
   under `theme.recipes`; DTCG-native rendering and OKLCH canonical colors
   remain future work.
4. Before declaring token governance complete, run deterministic token-format
   validation and add contrast evidence across recipe/mode pairs.
