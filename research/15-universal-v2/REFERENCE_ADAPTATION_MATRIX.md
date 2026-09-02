# Reference adaptation matrix

This matrix records ideas adapted into Ten4Seven. It does not authorize copied
source, assets, brands, or third-party runtime dependencies. Provenance and
license boundaries remain governed by `docs/adr/ADR-008-license-provenance.md`
and `research/16-design-lineage-audit/`.

| Reference     | Observed strength                                                        | Adapted concept                                                        | Ten4Seven implementation                                                                                                           | Deliberately not copied                                                                    |
| ------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Tamagui       | Separation of themes from contextual theme application                   | Bounded contextual semantic treatment                                  | `ThemeScope` in `packages/ui/src/provider.tsx` resolves the same token contract for `default`/`inverse` scopes                     | Tamagui runtime, API surface, and component source.                                        |
| HeroUI        | Semantic CSS variables and CSS-first theme ergonomics                    | Static recipe attributes plus an ergonomic React orchestrator          | `data-t7-*` selectors in `packages/tokens/src/theme-recipes.css`; CSS slices assembled in `packages/ui/scripts/build-package.mjs`  | HeroUI components, brand, styling source, or dependency.                                   |
| Minimal UI    | Coherent application-level art direction                                 | Quiet operational expression and shared shell/route hierarchy          | `enterprise` recipe in `packages/contracts/src/theme-recipe.ts`; `AppShell`/`PageHeader` grammar in `docs/ai/SHELL_COMPOSITION.md` | MUI dependency, layout source, visual identity, or component API.                          |
| shadcn/ui     | Interoperable semantic CSS-variable conventions and composition          | Portable semantic `--t7-*` variables and bounded component composition | `packages/tokens/src/theme.ts`, `packages/ui/src/styles.css`, and `packages/ui/src/tailwind.css`                                   | shadcn component source, copy-paste implementation model, or a parallel primitive library. |
| ShadcnBlocks  | Explicit visual/taste guidance for AI and expressive section composition | AI retrieval contract plus block-layer guidance                        | `generated/agent-index.json`, `generated/theme-recipes.json`, `docs/AI_DESIGN_GUIDANCE.md`, and `packages/ai/catalog/blocks.json`  | Blocks source, brand identity, or uncontrolled visual variants.                            |
| Tailwind Plus | Composition discipline: hierarchy, whitespace, rhythm, and balance       | Recipe composition values and route-level review criteria              | `ThemeComposition` in `packages/contracts/src/types.ts`; `docs/COMPOSITION.md`; canonical shell grammar                            | Proprietary templates, source, assets, or a dependency.                                    |

## Adaptation rule

When a new generic gap appears, look first at the canonical Ten4Seven contract,
then the AAPM extraction, then one reference only if needed. Re-author the
generic behavior into the system with tokens, accessibility, tests, catalog
updates, and provenance. A consumer feature is not permitted to import or copy
donor code to solve a local deadline.
