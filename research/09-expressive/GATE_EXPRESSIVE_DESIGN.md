# Expressive design gate

Date: 2026-08-27

## Decision

**PASS — expressive block coverage and public reference proof are complete for
this phase.** The gate adds composition coverage above the accepted foundation,
component, and recipe layers. It does not redesign those layers.

## Acceptance evidence

| Gate question                                      | Evidence                                                                                                                                                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Is the hierarchy explicit?                         | `AGENTS.md`, `llms.txt`, the AI quickstart, and the block catalog define Foundations → Primitives → Components → Patterns → Blocks → Recipes → Templates/References.                                            |
| Are expressive blocks reusable?                    | Twelve package-owned blocks are exported from `@ten4seven/ui`, have catalog metadata, live `/blocks` previews, and detail route contracts.                                                                      |
| Are the primitives shared?                         | Blocks compose existing `Typography`, `Button`, `IconButton`, `Card`, `MediaFrame`, `ProductCard`, navigation, and chart contracts. No parallel domain primitive was added.                                     |
| Is there a public reference surface?               | `/public-showcase` uses `PublicShell`, the `marketing-home` recipe, all major expressive categories, local fixture media, and ten4seven UI identity.                                                            |
| Is public navigation separated from the workbench? | The showcase navigation contains Overview, Blocks, and Recipes; workbench links stay in the footer/library group and are not the perceived storefront navigation.                                               |
| Are chart and carousel behaviors real?             | Chart point/bar focus and hover expose a local tooltip and summary; the carousel uses native scroll-snap, named controls, indicators, keyboard arrows, Home/End, and reduced-motion behavior.                   |
| Are responsive states covered?                     | The expressive render suite captures `1440×900`, `1280×800`, `1024×900`, `768×900`, `390×844`, and `360×800`; each asserts meaningful content, no page overflow, and no prohibited brand copy.                  |
| Can an agent cold-start the public surface?        | `pnpm test:ai` validates the block catalog and `pnpm test:component-system` validates the routes; `verify-reference-cold-start.mjs` resolves the public showcase from consumer contracts with zero donor reads. |

## Route and render evidence

Direct route proof:

- `/blocks` — twelve live previews with layer rail, search, and category filter.
- `/blocks/hero-split` — detail contract with preview, anatomy, quality, and
  required/optional contract lists.
- `/public-showcase` — public reference shell with Hero, logo cloud, stats,
  feature/chart, content, product/carousel, testimonials, pricing, CTA, and
  footer sections.

The repeatable browser evidence is in
`tests/expressive-blocks.spec.ts`. It records first-viewport screenshots under
`tests/expressive-blocks.spec.ts-snapshots/` and checks the direct catalog/detail
routes plus carousel and chart affordances.

## Required quality checks

- Desktop, tablet, 390px, and 360px renders stay within the document viewport.
- Typography, palette, radius, density, focus, surface, and motion continue to
  resolve from the provider and semantic tokens.
- Reduced motion leaves content visible and changes scrolling to instant
  behavior where applicable.
- Carousels and chart affordances remain keyboard reachable and understandable
  without color alone.
- Public fixtures stay deterministic and local; no external brand is exposed
  in the visible showcase identity.
- Pricing, CTA, and announcement actions report fixture feedback only and do
  not imply billing, persistence, or remote integrations.

## AI cold-start result

The read-limited simulation covers the public showcase prompt and resolves the
`marketing-home` recipe, its canonical component set, twelve expressive blocks,
and semantic icons without reading source donor folders. The exact task/read
counts were verified as **11 tasks, 9 contract/catalog reads, and 0 donor
reads**.

The final implementation checks completed with these results:

```text
pnpm typecheck                         PASS
pnpm format:check                      PASS
pnpm build                             PASS
pnpm test                              PASS
pnpm test:consistency                  PASS
pnpm test:component-system             PASS
pnpm exec playwright test tests/expressive-blocks.spec.ts --project=chromium  8 passed
pnpm test:e2e                          75 passed
```

## Boundary

Future domains may reuse these blocks. A new visual treatment is justified only
when an existing block contract cannot express the content or interaction; the
decision must be recorded in the donor gap ledger before implementation.
