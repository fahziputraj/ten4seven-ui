# Public / Commerce Consumer Adoption

## Surface

`@ten4seven/adoption-public` is an isolated public ebook-library consumer at `http://127.0.0.1:4182`. It uses a public shell and content/commerce blocks rather than a private application sidebar.

Routes exercised:

- `/` — public home with announcement, hero, selected titles, content showcase, CTA, and footer.
- `/catalog` — searchable and filterable catalog with product details.
- `/guides` — content route reached through public navigation.

## Retrieval trace

For “public catalog”, the catalog CLI returned the `catalog` recipe with `PublicShell`, `NavigationMenu`, `PageHeader`, `SearchInput`, `ProductGrid`, `ProductCard`, `Pagination`, `Select`, `Price`, `Rating`, `DetailDrawer`, `CartTrigger`, `CartPanel`, `CartLineItem`, `QuantityControl`, and `ProductMeta`.

For “public marketing”, the CLI returned `marketing-home` with `PublicShell` and the block roles `hero-split`, `cta-contained`, and `public-footer` required for the page. The consumer composes those with the implemented `AnnouncementBar`, `Hero`, `ProductShowcase`, `ContentShowcase`, `CtaBlock`, and `PublicFooter` APIs.

Semantic icon names are supplied through `T7Icon` or canonical component props: `book`, `ebook`, `catalog`, `category`, `cart`, `favorite`, `rating`, `search`, and `arrowRight`. No raw Iconify/provider string is present in the consumer.

## Behavior matrix

| Behavior          | Before                                       | After                                                              | Result    |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------------ | --------- |
| Home              | Public hero and selected titles render       | `PublicShell` and catalogued blocks render the same content intent | Preserved |
| Browse            | Hero action reaches `/catalog`               | Same route                                                         | Preserved |
| Search            | `Practical` isolates `Practical Type`        | Same                                                               | Preserved |
| Collection filter | `Practice` leaves one title                  | Same through the visible canonical popup                           | Preserved |
| Detail            | View product details without leaving catalog | `DetailDrawer` keeps the same workflow                             | Preserved |
| Cart add          | Add `Practical Type` creates one cart item   | Same                                                               | Preserved |
| Quantity          | Increase to two and update subtotal          | Same through `CartLineItem` / `QuantityControl`                    | Preserved |
| Removal           | Remove the title and show empty state        | Same                                                               | Preserved |
| Navigation        | Explore menu and Guides route                | Same, including Escape dismissal                                   | Preserved |
| Mobile            | Catalog remains reachable at 390×844         | Same with no horizontal overflow                                   | Preserved |

## Adoption measurements

- New basic primitives: `0`.
- New consumer tokens: `0`; cover art uses existing semantic theme variables only.
- Parallel design-system package: `0`; the package consumes workspace `@ten4seven/ui`, `@ten4seven/tokens`, and `@ten4seven/icons`.
- Donor reads/imports: `0` in the controlled consumer proof.
- Local visual CSS: 99 lines / 13 selectors, limited to cover-art treatment and layout glue; visual properties are token-backed.
- Domain behavior source: `src/domain.ts` has no diff from the legacy baseline at `13ec074`.

## Evidence

- Before desktop: `evidence/before/before-public-home-desktop.png`
- Before mobile: `evidence/before/before-public-mobile.png`
- After desktop: `evidence/after/after-public-home-desktop.png`
- After mobile: `evidence/after/after-public-mobile.png`

`pnpm test:adoption` passes the public workflow as part of the 3-test adoption suite. Live Browser QA additionally verified Explore menu behavior, search/filter, detail/cart/quantity/removal, Guides routing, no horizontal overflow, and empty warning/error logs.
