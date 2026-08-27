# Catalog and workbench IA polish

Date: 2026-08-27

## Decision

**Pass.** The system workbench is now a catalog-led information architecture rather than a gallery of repeated cards. Human users and AI agents share the same route, catalog, recipe, icon, and component-contract sources.

## Canonical sources

- `packages/ai/catalog/components.json` is the component source of truth: 132 contracts, 126 canonical components, and 6 documented aliases.
- `packages/ai/catalog/recipes.json` is the recipe source of truth: 17 composition recipes, including `cart`.
- `packages/ai/catalog/icons.json` plus the local icon registry provide 97 semantic icon contracts.
- `apps/playground/src/catalog-model.ts` derives family labels, slugs, counts, and deep-link paths from those catalogs; it does not create a second catalog.

## Information architecture

| Surface          | Route                                  | Contract                                                                   |
| ---------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| Theme Studio     | `/theme-studio`                        | Global theme controls and live typography specimen                         |
| Component Lab    | `/component-lab`                       | Separate interaction stress-test surface                                   |
| Tokens           | `/tokens`                              | Intent-first token families with in-page navigation and copy actions       |
| Components       | `/components`                          | Compact canonical overview with search, common components, and families    |
| Component family | `/components/<family-slug>`            | Family list with the current family expanded                               |
| Component detail | `/components/<component-slug>`         | Preview, usage, API, accessibility, tokens, recipes, and related contracts |
| Icons            | `/icons`                               | Searchable, category-filtered semantic icon grid with copy feedback        |
| Recipes          | `/recipes`                             | Compact recipe index with direct composition detail routes                 |
| Recipe detail    | `/recipes/<recipe-slug>`               | Anatomy flow with links to canonical component contracts                   |
| References       | `/warehouse-inventory`, `/ebook-store` | Production-shaped recipe proof surfaces                                    |

Canonical taxonomy routes include `/components/patterns`,
`/components/tables`, and `/components/filtering-bulk-actions`. The previous
`application`, `tables-filtering`, and `charts` slugs remain compatibility
routes for existing bookmarks.

Every registered route is deterministic and refresh-safe. Unknown paths render the honest 404 surface. The global CommandMenu searches component contracts, aliases, semantic icons, and recipes; selection navigates to the corresponding canonical detail or recipe route.

## Interaction and responsive proof

- The desktop sidebar is generated from the same catalog metadata as the overview and keeps component families collapsed by default; the active family is opened for context.
- The component navigation is scrollable and the mobile equivalent is the canonical `MobileSidebar` drawer.
- Breadcrumbs preserve hierarchy and normal browser modifier-key behavior.
- Token-family anchors are visible near the top of `/tokens`; semantic swatches and icon entries expose copy actions with `ToastProvider` feedback.
- Component detail routes now use category-aware live contract fixtures; the catalog no longer falls back to a generic "live preview" placeholder. The Scroll Area fixture demonstrates a real bounded event list, while overlay, commerce, chart, media, and feedback entries expose their canonical interaction anatomy.
- Component Lab now includes the shared commerce contracts (`CartTrigger`, `CartPanel`, `CartLineItem`, `QuantityControl`, `OrderSummary`) with quantity, removal, empty-state, and checkout-action feedback.
- Icons reports `97/97` typed registry entries assigned across eight intent families, while preserving the compact search, filter, and copy workflow.
- No commerce-specific primitive family was introduced. Component Lab remains separate from the production-shaped references.

## Verification

- `tests/catalog-integrity.spec.ts`: route and interaction coverage now includes 126 canonical component routes with live non-placeholder fixtures, 17 canonical family routes plus legacy aliases, 17 recipe routes, root/404 behavior, singular Select accessibility, global search, icon intent search/copy feedback, and the mobile drawer.
- `tests/visual-regression.spec.ts`: 41 tests passed with explicit `1440 × 900`, `1280 × 800`, `768 × 900`, `390 × 844`, and `360 × 800` baselines for the workbench and references plus the Component Lab modal state.
- The visual matrix checks meaningful `main` content and horizontal overflow for every route at every viewport; the 768px Ebook render now transitions to the stacked commerce layout.
- Direct browser QA confirmed `/components/surface` resolves with the expected title and heading after direct navigation; `/tokens` exposes one visible `Token families` navigation.

The implementation uses existing ten4seven primitives and semantic tokens. No donor component was added for this IA work, and no business or theme architecture was changed to make the catalog presentationally easier.
