# Universal v2 migration plan

## Goal

Strengthen the existing Ten4Seven design system through clearer layers and
proof, without deleting its provider, semantic tokens, motion contract,
catalogs, packages, or adoption surfaces.

## Source-backed progress

| Stage                            | Source evidence                                                           | Status in this audit                                                                      |
| -------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Typed semantic theme aggregate   | `packages/contracts/src/theme-profile.ts`                                 | Present.                                                                                  |
| Curated recipe contract          | `packages/contracts/src/theme-recipe.ts`; `generated/theme-recipes.json`  | Present for four recipes.                                                                 |
| Runtime preference split         | `packages/contracts/src/types.ts`; `packages/ui/src/provider.tsx`         | Present in source.                                                                        |
| Legacy adapter                   | `themeProfileToLegacyConfig` and `ThemeConfig` provider path              | Present in source.                                                                        |
| Bounded advanced override seam   | `ThemeOverrides` in `packages/ui/src/provider.tsx`                        | Present in source.                                                                        |
| CSS-first recipe delivery        | `packages/tokens/src/theme-recipes.css`; package build script             | Present in source.                                                                        |
| Contextual scope                 | `ThemeScope` in `packages/ui/src/provider.tsx`                            | Present in source.                                                                        |
| Tailwind v4 semantic bridge      | `packages/ui/src/tailwind.css`                                            | Present in source.                                                                        |
| Full semantic geometry migration | `packages/ui/src/styles.css`                                              | Incomplete: 19 shared density-aware roles exist, but raw geometry remains.                |
| DTCG-compatible export           | `scripts/generate-dtcg-token-export.mjs`; `generated/tokens.dtcg.json`    | Present: deterministic typed reference values, aliases, and recipe metadata.              |
| Canonical DTCG / OKLCH source    | `packages/contracts/src/theme-profile.ts`; `packages/tokens/src/theme.ts` | Not yet complete: export exists, while typed runtime/HSL compatibility remains canonical. |
| End-to-end verification          | root commands and browser suite                                           | Not established by this source audit.                                                     |

## Ordered execution

### 1. Preserve and prove the compatibility boundary

Exercise existing object-based `ThemeConfig` consumers alongside recipe users.
Validate local persistence, reset behavior, system appearance, and old
provider attributes before removing or deprecating anything.

### 2. Validate recipe and preference precedence

Add focused tests for every recipe and mode, then assert that appearance,
density, contrast, motion, and `ThemeOverrides` resolve in the documented
order. Exercise a CSS-first document root independently of React state.

### 3. Validate `ThemeScope`

Test default and inverse scopes, nested scopes, focus visibility, overlays and
portals, reduced motion, and narrow layouts. Do not broaden the tone vocabulary
until these behaviors are proven.

### 4. Harden semantic geometry incrementally

Inventory repeated raw values by component family. Introduce a role only where
one semantic meaning appears across components. Validate touch-target floors
and all density modes; do not mechanically replace intrinsic geometry.

### 5. Maintain the standards-compatible token export deliberately

Keep `scripts/generate-dtcg-token-export.mjs` deterministic and validate both
generated outputs whenever token sources change. Keep the HSL CSS-variable
compatibility path until visual and contrast evidence demonstrates safe
retirement. Introduce a canonical DTCG authoring source or OKLCH only behind
the same proof gate.

### 6. Execute the final quality gate

Run formatting, typechecking, tests, package build/verification, affected
consumer/adoption checks, and rendered browser QA. Record exact commands and
results in `GATE_UNIVERSAL_V2.md`; a source-inventory statement is not enough.
