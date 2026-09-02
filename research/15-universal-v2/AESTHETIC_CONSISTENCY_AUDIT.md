# Aesthetic consistency audit

## Design principle

Ten4Seven should provide a quiet universal core plus curated expressions, not a
visually neutral system with no character and not a collage of donor styles.
The review priority is clarity, hierarchy, balance, alignment, rhythm,
semantic meaning, and accessibility over decorative novelty.

## Current system evidence

| Concern                     | Source evidence                                                                                         | Assessment                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Shared component language   | `packages/ui/src/styles.css`                                                                            | Canonical components consume a common semantic variable system.                                                                        |
| Product-context expressions | `packages/contracts/src/types.ts`; `packages/contracts/src/theme-recipe.ts`                             | `operational`, `product`, `editorial`, and `commerce` are recipe metadata rather than separate primitive libraries.                    |
| Composition                 | `packages/contracts/src/types.ts`; `packages/ui/src/styles.css:912-1003`                                | Recipes provide content width, reading measure, page gutter, and section rhythm; shell/page-header CSS consumes part of that contract. |
| Existing product shells     | `docs/ai/SHELL_COMPOSITION.md`; `apps/playground/src/App.tsx`                                           | The documented shell grammar provides a shared structure for application and public routes.                                            |
| Brand expression guardrail  | `packages/contracts/src/brand-profile.ts`; `research/12-brand-expression/BRAND_PROFILE_ARCHITECTURE.md` | Brand profiles stay above control semantics and component behavior.                                                                    |
| Reference provenance        | `docs/adr/ADR-008-license-provenance.md`; `research/16-design-lineage-audit/`                           | Donor/reference material is kept out of runtime dependencies and copied brand identity.                                                |

## Expression guidance

- **Operational / enterprise:** favor scanning, data hierarchy, quiet surfaces,
  restrained elevation, and direct status communication.
- **Product:** use balanced whitespace and a clear action hierarchy without
  turning routine workflows into a marketing surface.
- **Editorial:** give content a readable measure, lower chrome, generous
  rhythm, and subtle/flat surface treatment.
- **Commerce:** make browsing, comparison, media, and purchase decisions easy
  to understand; rounded geometry must not obscure data density or actions.

The current recipe expression is intentionally metadata plus coordinated
tokens/composition. There is no source evidence that each expression has a
separate component variant matrix, which is desirable: expression should not
create an uncontrolled `EditorialButton` or `CommerceInput` family.

## Evidence gaps

This audit did not execute screenshots or browser comparison after the v2
changes. It therefore cannot certify:

- light/dark coherence for every recipe;
- reference-route visual hierarchy at desktop/tablet/mobile;
- absence of layout overflow or over-decoration;
- consistency of loading, empty, error, selection, and overlay states;
- contrast after a scoped inverse surface or a more-contrast preference.

These are open validation requirements, not defects inferred from source.

## Review protocol

For each affected route, inspect a purposeful desktop and narrow viewport with
meaningful content and non-happy states. Check one dominant title, a clear
primary action, readable text measure, stable table/grid rhythm, visible focus,
and a mobile reflow that preserves the task. Compare the result to the recipe
intent, not to a donor screenshot.
