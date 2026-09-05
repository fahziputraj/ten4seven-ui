# Public Showcase Brand-Recognition Proof

## Scope

This note records the focused proof for `/public-showcase` only. It covers the
current four named theme recipes, the public hero composition, and the
consumer-visible preview copy. It does not certify unrelated routes, the
Theme Studio/Lab implementation, or the repository-wide quality gate.

## Implemented surface

The public route keeps its existing `PublicShell`, canonical `Hero`, media
frame, chart panel, and expressive block composition. The route-local styling
uses existing output variables instead of introducing a theme abstraction:

| Verified behavior                                                                                                                                         | Source location                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Content max width, page gutter, and page rhythm come from `--t7-content-max`, `--t7-page-gutter`, and `--t7-composition-gap`.                             | `apps/playground/src/app.css` — `.public-showcase-page`, `.public-showcase-shell .t7-app-content` (currently lines 5353–5362)       |
| The hero is a tonal `surface-subtle` field with no outer radius or shadow; its 2px primary edge is deliberate emphasis rather than a primary-filled card. | `apps/playground/src/app.css` — `.public-showcase-hero` and `::before` (currently lines 5417–5434)                                  |
| Section map, preview, and lower expressive wrappers use tonal/divider-led hierarchy; the preview remains the elevated media surface.                      | `apps/playground/src/app.css` — `.public-showcase-section-map` through `.public-showcase-preview-frame` (currently lines 5460–5555) |
| The consumer preview uses `Product overview`, `Connected surfaces`, and `System health / Ready` rather than fixture/debug copy.                           | `apps/playground/src/public-showcase.tsx` — `ShowcasePreview` (currently lines 40–115)                                              |

The former solid primary hero canvas is therefore not the route's dominant
visual surface. Primary remains visible on the canonical CTA, active
navigation state, and the slim hero edge.

## Executable recipe proof

`tests/public-showcase-expression.spec.ts` runs the real Theme Studio flow at
1440 x 900 with a light, reduced-motion browser environment:

1. It clears the persisted playground-theme key and opens `/theme-studio`.
2. For each exact workbench label—`Enterprise`, `Product`, `Editorial`, and
   `Commerce`—it clicks the real `.studio-recipe-options` control.
3. It confirms the active `.t7-provider` exposes that recipe's expected
   `data-t7-theme` and `data-t7-expression` values.
4. It clicks the actual Studio `Public Showcase` navigation control instead of
   loading the public URL directly. This preserves the selected in-memory
   recipe for the consumer route.
5. On `/public-showcase`, it rechecks provider metadata, reads computed hero
   styles, captures the visual baseline, and returns to Theme Studio with
   browser history before selecting the next recipe.

The expected metadata checked by the test is:

| Workbench recipe | Provider theme | Provider expression |
| ---------------- | -------------- | ------------------- |
| Enterprise       | `enterprise`   | `operational`       |
| Product          | `product`      | `product`           |
| Editorial        | `editorial`    | `editorial`         |
| Commerce         | `commerce`     | `commerce`          |

### Computed-style and geometry criteria

For every recipe, the test requires all of the following:

- Hero background and primary action background are different.
- Hero radius is `0px`; hero box shadow is `none`; top divider is `1px`.
- The primary `::before` edge resolves to the primary action color.
- The route has no horizontal overflow beyond one pixel.

It also verifies that the existing composition variables produce visible
cross-recipe differences at the test viewport:

- content width: Enterprise > Commerce > Product > Editorial;
- section rhythm: Enterprise < Commerce < Editorial.

Those comparisons prove the public composition is consuming the recipe output,
not merely recoloring an otherwise identical primary card.

## Visual artifacts

The focused test owns one desktop baseline per named recipe:

- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-enterprise-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-product-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-editorial-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-commerce-expression-chromium-win32.png`

The existing public expressive route test also retains viewport baselines at
1440x900, 1280x800, 1024x900, 768x900, 390x844, and 360x800. It now emulates
reduced motion before screenshot capture so the chart bars have a stable visual
state. See `tests/expressive-blocks.spec.ts` (currently lines 1–45) and
`tests/expressive-blocks.spec.ts-snapshots/`.

## Focused verification record

The following serial command passed after the public changes and baseline
refresh:

```text
pnpm exec playwright test tests/public-showcase-expression.spec.ts tests/expressive-blocks.spec.ts --workers=1
9 passed (14.0s)
```

`git diff --check` also passed at that point. This record is intentionally
limited to the focused Public Showcase verification; it is not a claim that
the later integrated formatter, typecheck, test, build, or browser review has
completed.
