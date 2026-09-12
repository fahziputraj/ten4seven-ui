# DWO — T7-SYSTEM-HARDENING-H01C

## Publishing Store / GetPress Shell Adoption Evidence

Work item: `T7-SYSTEM-HARDENING-H01C`

Repository: `fahziputraj/ten4seven-ui`

Execution date: `2026-09-12` (Asia/Jakarta)

Execution mode: `BOUNDED / STRICT`

Risk: `R2 — multi-surface reference composition`

Branch: `codex/icons-curated-solar-style`

Starting HEAD: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`

Runtime: `http://127.0.0.1:4173/ebook-store`

Browser-plugin status: the dedicated browser plugin was unavailable in this
environment. Browser QA therefore used the repository Playwright/Chromium
fallback, with semantic assertions, runtime fault collection, responsive
viewport checks, and screenshots stored outside the repository.

## 1. Scope and gate boundary

This execution covers H01C only. The user-provided queue state accepts H01,
H01A, H01B, and Q04 as prerequisites; they were not reopened or redesigned.
H01D and H02 were not started. Q04 Core Layout & Actions was not revisited.

The following boundaries were preserved:

- no backend, live GetPress API, Google Books API, live inventory, payment
  provider, account session, cart persistence, fulfilment, or publishing
  workflow was introduced;
- no new store-specific primitive family was added;
- no `packages/ui` source was changed for H01C;
- no token architecture, global measure system, or route architecture was
  refactored;
- no commit, push, PR, merge, tag, publish, or deployment was performed;
- the existing dirty checkout and unrelated user changes were preserved.

## 2. Result summary

The previous Publishing Store was a partial catalog proof: its public shell,
filters, product grid, and cart were present, but it lacked the full publishing
store hierarchy and a substantive product detail contract. The route now has a
bounded GetPress-shaped public shell and a complete local storefront journey:

`public shell → discovery/search/filter → cover-led catalog → product detail →
format and access state → preview/citation → local cart → publishing-service
notice → public footer`.

The result is fixture-only and intentionally does not claim to be a live
GetPress storefront. The H01C gate is:

`PASS FOR H01D`

## 3. External reference and adoption boundary

The public [GetPress Indonesia](https://getpress.co.id/) site was consulted as
an IA and UX reference. The relevant observed roles were a public publishing
identity, Beranda/store entry, books, Jelajahi/discovery, collaboration,
publishing services, search, membership/account access, category-led product
discovery, cover-led cards, standard/member pricing, and public ecosystem
links.

Only those UX roles were adopted. No GetPress HTML, CSS, private content, live
catalog data, imagery, API, or business workflow was copied. Ten4Seven remains
the implementation authority; all controls and layout use existing
`@ten4seven/ui` contracts and the route-local deterministic fixture model.

## 4. Before / after

| Area                 | Before H01C                                                                                  | After H01C                                                                                                                                                                                                                                    | Status |
| -------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Public identity      | Generic `ten4seven UI / Toko penerbitan` identity with a short Buku/Jelajahi/Kolaborasi menu | GetPress-shaped `GetPress / Publishing store` identity with Beranda, Toko Buku, Jelajahi, Kolaborasi, Penerbitan, member, cart, and settings entry                                                                                            | PASS   |
| Store landing        | Page header plus catalog; no store discovery strip or service transition                     | Concise editorial intro, quick discovery links, prominent search, category/filter/sort/result framing, and bounded publishing-service callout                                                                                                 | PASS   |
| Book discovery       | Search, local filters, sort, grid/list, pagination                                           | Same accepted discovery behavior with stronger bookstore hierarchy and explicit format/access summaries                                                                                                                                       | PASS   |
| Book cards           | Cover, category, title, author, availability, rating, price, detail/cart actions             | Cover remains primary; cards also expose physical/ebook summary and member/VIP fixture pricing where supplied                                                                                                                                 | PASS   |
| Product detail       | Quick view with cover, short copy, availability, rating, price, add-to-cart                  | Detail drawer contains cover, title/author/category, description, format selection, access state, standard/member price, preview, ISBN, publisher, publication date, language, page count, metadata table, citation list, and bounded actions | PASS   |
| Format semantics     | `formats` metadata existed but had no user-selectable physical/ebook state                   | `Physical Book` and `Ebook` are distinct accessible radios with local, external, or unavailable state                                                                                                                                         | PASS   |
| External/unavailable | Google Play Books-style availability could still use a generic cart action                   | External access produces a clear provider notice; unavailable format is disabled and labelled                                                                                                                                                 | PASS   |
| Cart                 | Existing local desktop Popover/mobile DetailDrawer proof                                     | Existing canonical surfaces retained; cart lines now show selected format, cover, quantity, price, remove, subtotal, and fixture checkout notice                                                                                              | PASS   |
| Member/account       | `Akun` notice                                                                                | Visible `Masuk member` entry with deterministic local account notice                                                                                                                                                                          | PASS   |
| Publishing service   | Header `Terbitkan` notice only                                                               | Header, discovery link, callout, footer publishing group, and deterministic service transition notice                                                                                                                                         | PASS   |
| Footer               | No route-specific public footer                                                              | Canonical `PublicFooter` with store, publishing, help/account, and legal/context groups                                                                                                                                                       | PASS   |
| Loading/empty        | No store-specific loading branch                                                             | Deterministic `?state=loading` skeleton/status and `?state=empty` empty result proof; normal filtered-empty state retained                                                                                                                    | PASS   |
| Responsive behavior  | Existing catalog responsive branch but H01C matrix not accepted                              | 1440×900, 1024×768, 768×1024, and 390×844 runtime matrix with no horizontal overflow and clean console/page-error results                                                                                                                     | PASS   |

### Root-cause ownership

All H01C gaps were owned by the Publishing Store fixture composition, not by a
canonical Ten4Seven component defect:

- `FIXTURE`: the route had only partial publishing metadata and no physical /
  ebook selection model;
- `FIXTURE`: the public IA stopped at a short catalog menu and had no dedicated
  footer or publishing-service transition;
- `FIXTURE`: product detail was only a quick view and did not compose the
  existing table, citation, preview, and format semantics;
- `FIXTURE`: loading and explicit empty fixture states were absent;
- `CANONICAL COMPONENT`: no defect was proven in `PublicShell`, `ProductCard`,
  `DetailDrawer`, `CartPanel`, `CartLineItem`, `PublicFooter`, `CitationList`,
  or the semantic table family, so none was edited.

## 5. Source-to-target matrix

| GetPress-shaped capability    | UX target                                                                                                  | Ten4Seven canonical implementation                                                       | H01C fixture/composition                                                                                                           | Verification                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Public header and brand       | Persistent public store identity with books, discovery, collaboration, publishing, cart, and member access | `PublicShell`, `Typography`, `T7Icon`, `Button`, `IconButton`, `CartTrigger`             | `GetPress / Publishing store`; Beranda, Toko Buku, Jelajahi, Kolaborasi, Penerbitan, Terbitkan, Keranjang, Masuk member, settings  | H01C Playwright shell test PASS                              |
| Responsive navigation         | Secondary navigation remains reachable without an enterprise sidebar                                       | `PublicShell` and canonical responsive navigation                                        | Public menu remains a top navigation; no private sidebar was introduced                                                            | Existing mobile navigation regression plus H01C 390×844 PASS |
| Store landing                 | Context, title, intro, discovery links, and result framing before the grid                                 | `PageHeader`, `Badge`, `Typography`, semantic anchors                                    | `ebook-store-intro`, quick links for all books, categories, latest books, and publishing                                           | H01C catalog screenshots and shell test PASS                 |
| Header/search affordance      | Search is first-class and easy to find                                                                     | `SearchInput`                                                                            | `Cari buku` searches title, author, and category                                                                                   | H01C search test PASS                                        |
| Category discovery            | Category browsing is visible and route-local                                                               | `Button` with `aria-pressed`, existing filter model                                      | Seven categories plus Semua buku; desktop rail and mobile drawer                                                                   | H01C category and mobile drawer tests PASS                   |
| Filters                       | Price, availability, and author filters remain clear and bounded                                           | `Input`, `Radio`, `Checkbox`, `DetailDrawer`, `Button`                                   | Existing accepted filter model retained; mobile moves into canonical drawer                                                        | H01C filter/empty tests PASS                                 |
| Sort and view                 | Result ordering and grid/list presentation                                                                 | `Select`, `Button`                                                                       | Unggulan, rating, price-low, price-high; grid/list controls                                                                        | H01C search/filter/sort test PASS                            |
| Result state                  | Count, loading, empty, recovery, and pagination are understandable                                         | `ProductGrid`, `ProductCard`, `EmptyState`, `Pagination`, `Skeleton`                     | 10 local books; `?state=loading`; `?state=empty`; filter-empty recovery                                                            | H01C state test PASS                                         |
| Book card                     | Cover-led, intrinsic card with category, title, author, format, availability, rating, price, and actions   | `ProductCard`, `ProductMeta`, `Price`, `Rating`, `Button`, `T7Icon`                      | Local SVG cover, format summary, member/VIP price, save, detail, and format-aware primary action                                   | H01C catalog screenshots and semantic test PASS              |
| Product detail                | Substantive publication record, not only a quick preview                                                   | `DetailDrawer`, `ProductMeta`, `Price`, `Rating`, `Table` family, `Typography`           | Detail composition includes description, cover, author/category, format selector, price/access, preview, metadata table, and close | H01C detail test PASS                                        |
| Physical / ebook formats      | Distinct format choice with truthful availability                                                          | Canonical `Radio`, `Button`, `Price`                                                     | `getEbookFormat` resolves `Physical Book` and `Ebook` to available, external, or unavailable local states                          | H01C format-state test PASS                                  |
| Member pricing                | Standard and member/VIP prices are explicit when fixture data supplies both                                | `Price`, `Typography`                                                                    | `memberPrice` is local fixture metadata; no discount logic or live membership claim                                                | H01C cards/detail assertions PASS                            |
| Preview                       | Preview entry is clear and does not imply full fulfilment                                                  | `Button`, `T7Icon`, local status notice                                                  | `Baca cuplikan` announces the deterministic preview label                                                                          | H01C detail test PASS                                        |
| Citation                      | Source/citation affordance remains readable and bounded                                                    | `CitationList`, `Button`                                                                 | Local citation item plus `Salin sitasi` fixture notice; no clipboard persistence                                                   | H01C detail test PASS                                        |
| Cart trigger and panel        | Cart remains available from the public shell                                                               | `CartTrigger`, `Popover`, `DetailDrawer`, `CartPanel`                                    | Existing desktop Popover and mobile DetailDrawer preserved                                                                         | H01C cart test PASS                                          |
| Cart lines and summary        | Cover, title, format, quantity, price, remove, subtotal, continue/checkout                                 | `CartLineItem`, `QuantityControl` through composition, `OrderSummary`, `Price`, `Button` | Format-aware local cart, quantity changes, removal, summary, and checkout notice                                                   | H01C cart test PASS                                          |
| Member entry                  | Account access is a visible shell action, not an invented backend                                          | `Button`, status feedback                                                                | `Masuk member` local notice                                                                                                        | H01C shell test PASS                                         |
| Publishing-service transition | Store and service path are connected without implementing publishing                                       | `Button`, `PublicFooter`, local status notice                                            | Header action, nav item, quick link, callout, and footer group target the same bounded callout                                     | H01C shell test PASS                                         |
| Public footer                 | Public ecosystem links and context copy close the route                                                    | `PublicFooter`                                                                           | Store, Penerbitan, Bantuan & akun groups plus legal/context copy                                                                   | H01C shell test and screenshot PASS                          |

## 6. Final shell anatomy

The final route uses this composition:

```text
PublicShell
├── GetPress / Publishing store brand
├── NavigationMenu
│   ├── Beranda
│   ├── Toko Buku
│   ├── Jelajahi → categories / collection / publishing
│   ├── Kolaborasi
│   └── Penerbitan
├── public actions
│   ├── Terbitkan
│   ├── CartTrigger → desktop Popover or mobile DetailDrawer
│   ├── Masuk member
│   └── settings harness action
├── PageHeader
├── editorial discovery strip
├── bounded catalog
│   ├── desktop filter rail
│   └── responsive result/search/filter/sort controls
├── ProductGrid / ProductCard collection
├── canonical filter DetailDrawer on narrow screens
├── publishing-service callout
└── PublicFooter
```

The shell remains a public top-navigation surface. No enterprise sidebar or
private application shell was introduced.

## 7. Product-detail anatomy

The selected-book DetailDrawer now exposes:

- primary cover and favorite action;
- category, rating, title, author, and existing availability context;
- editorial description and repeated “Tentang buku ini” description section;
- `Physical Book` and `Ebook` radio options with disabled unavailable state;
- local availability, provider-external, and unavailable notes;
- standard format price and explicit `Harga member/VIP` price when present;
- `Tambah ke keranjang`, `Lihat akses eksternal`, or disabled `Belum tersedia`;
- `Baca cuplikan` status action;
- ISBN, publisher, publication date, language, page count, and format in the
  canonical semantic `Table` family;
- `CitationList` with local editorial citation and `Salin sitasi` fixture
  action;
- close detail action.

The direct fixture query `?book=book-04` is refresh-safe for deterministic
browser QA. It is not a production deep-link or backend lookup.

## 8. Fixture and state model

All data is deterministic and local to `EbookStoreCatalog`:

| State               | Deterministic proof                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| Ready catalog       | 10 local book records and local `/publishing-covers/` SVG covers                                                |
| Search/filter empty | Any unmatched query, category, author, availability, or price combination                                       |
| Loading             | `/ebook-store?state=loading` renders canonical `Skeleton` pieces and `aria-busy="true"` status                  |
| Explicit empty      | `/ebook-store?state=empty` renders `EmptyState` and a zero-result count                                         |
| Local format        | Books such as `book-02`, `book-03`, `book-04`, `book-06`, `book-08`, and `book-09` have local available formats |
| External format     | `book-01`, `book-05`, `book-07`, and `book-10` expose provider-external ebook access                            |
| Unavailable format  | Each record includes at least one unavailable format; unavailable radio/action is disabled or clearly labelled  |
| Both formats        | `book-04` exposes both local Physical Book and Ebook options                                                    |
| Cart                | React state only; selected format, quantity, removal, subtotal, and fixture checkout notice                     |
| Member/account      | Local status notice only; no session or identity authority                                                      |
| Publishing service  | Local status notice only; no authoring, editorial, fulfilment, or submission workflow                           |

No live GetPress or payment data is used.

## 9. Canonical reuse and ownership

H01C reuses the existing Ten4Seven component contracts:

- `PublicShell`, `PublicFooter`, `PageHeader`, and `Typography`;
- `Button`, `IconButton`, `SearchInput`, `Input`, `Select`, `Radio`, and
  `Checkbox`;
- `ProductGrid`, `ProductCard`, `ProductMeta`, `Price`, and `Rating`;
- `DetailDrawer`, `Popover`, `CartTrigger`, `CartPanel`, `CartLineItem`, and
  `OrderSummary`;
- `EmptyState`, `Skeleton`, `Pagination`, `CitationList`, and the semantic
  `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHead` /
  `TableCell` family;
- semantic `T7Icon` names.

No `GetPressButton`, `StoreInput`, `CommerceCard`, local footer primitive, or
second overlay/cart runtime was introduced. H01C made no source change to
`packages/ui`.

## 10. Local composition exceptions

The following local composition is intentional and bounded:

1. `ebookDetailMetadata` and `ebookFormatOverrides` extend the local fixture
   data with publishing-specific metadata and truthful access states. They do
   not create a reusable library data contract.
2. `EbookStoreCatalog` composes the existing `DetailDrawer` into a book-detail
   experience because the route already owned selected-book state. No new
   detail primitive was created.
3. `?state=loading`, `?state=empty`, and `?book=` are deterministic fixture
   selectors for QA. They are not visible QA controls and do not add a second
   runtime.
4. `.ebook-*` CSS is route-scoped composition for the bookstore hierarchy,
   metadata table, format choices, loading proof, callout, and responsive
   layout. It uses existing Ten4Seven semantic tokens for surfaces, borders,
   typography, radius, focus, and motion.

Reusable intrinsic-measure or storefront recipe decisions remain library/H01D
ownership and were not promoted from this local proof.

## 11. Cart behavior

The accepted desktop/mobile cart architecture was preserved:

- desktop uses canonical `Popover` around `CartTrigger`;
- narrow view uses canonical `DetailDrawer`;
- empty cart renders `EmptyState`;
- populated cart renders cover, title, author, selected format, quantity,
  format price, remove action, subtotal, total, “Lihat keranjang”, and
  fixture-only “Checkout”;
- quantity changes and removal update local state;
- external and unavailable formats do not silently enter the local cart;
- the checkout button announces that payment is not connected.

## 12. Responsive QA matrix

| Viewport   | Catalog | Detail                       | Cart                         | Filter drawer                              | Overflow | Console/page errors |
| ---------- | ------- | ---------------------------- | ---------------------------- | ------------------------------------------ | -------- | ------------------- |
| 1440 × 900 | PASS    | PASS                         | PASS                         | Desktop rail                               | `<= 1px` | none / none         |
| 1024 × 768 | PASS    | source/semantic path covered | source/semantic path covered | Responsive transition remains contained    | `<= 1px` | none / none         |
| 768 × 1024 | PASS    | source/semantic path covered | source/semantic path covered | Canonical drawer path                      | `<= 1px` | none / none         |
| 390 × 844  | PASS    | PASS                         | PASS                         | PASS; canonical `Filter buku` DetailDrawer | `<= 1px` | none / none         |

The H01C Playwright suite explicitly exercised the required viewport matrix,
mobile filtering, mobile cart, direct product detail, and reduced-motion route.
The visual evidence captures are:

- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-desktop-catalog.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-desktop-detail.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-desktop-cart.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-mobile-catalog.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-mobile-detail.png`
- `C:\Users\user\.codex\visualizations\2026\09\12\01a0943c-2d31-7940-8681-dcd1ebde7cd1\h01c-after-mobile-cart.png`

Screenshots were captured after the canonical overlay transition settled. They
are outside the repository and were not committed.

## 13. Accessibility and interaction evidence

- `PublicShell` owns the public navigation and its responsive presentation;
  there is no private sidebar to squeeze into mobile.
- Search is a labelled `searchbox` named `Cari buku`.
- Category buttons expose `aria-pressed` state.
- Price uses native radio semantics; availability uses native checkbox
  semantics.
- Product detail format choices use two named native radios sharing a format
  group; unavailable options are disabled rather than visually implied only.
- Product metadata uses a native semantic table with header and row scopes.
- Citation output uses the canonical `CitationList` landmark.
- Cart uses `CartTrigger`, labelled `CartLineItem` quantity controls, explicit
  remove labels, and `OrderSummary`.
- Canonical drawers retain native dialog focus trapping, close semantics, and
  visible close buttons.
- The route retains keyboard-reachable buttons and links; no pointer-only
  publishing or cart path was introduced.

## 14. Motion and reduced-motion behavior

H01C does not add a new animation framework, local keyframes, local duration
constants, or a second motion runtime. Existing canonical component motion and
the route's existing cover/card transitions continue to use Ten4Seven motion
tokens.

The reduced-motion Playwright case sets `prefers-reduced-motion: reduce` and
verifies that the catalog heading, product card, and direct product detail are
immediately visible. Product comprehension does not depend on an entry fade or
delayed content reveal.

## 15. Tests and commands

| Command / suite                                            | Result           | Evidence or classification                                                                                                                                                                                                        |
| ---------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm exec playwright test tests/h01c-ebook-store.spec.ts` | PASS — 10 passed | H01C shell, discovery, detail, format states, citation, cart, loading/empty, mobile filter, responsive matrix, reduced motion, and screenshots                                                                                    |
| `pnpm typecheck`                                           | PASS             | Full workspace typecheck completed; agent package build completed as part of the script                                                                                                                                           |
| `pnpm build`                                               | PASS             | Playground production build completed; existing large-chunk warning remains                                                                                                                                                       |
| `git diff --check`                                         | PASS             | Only existing CRLF conversion warnings were reported; no whitespace error                                                                                                                                                         |
| `pnpm test`                                                | FAIL / baseline  | Stops at pre-existing `test:component-coverage`: generated report expects 976 literal pixel measurements while current canonical stylesheet reports 962. H01C did not edit `packages/ui/src/styles.css` or regenerate this report |
| `pnpm format:check`                                        | FAIL / baseline  | Broad dirty checkout reports hundreds of pre-existing formatting warnings, including unrelated files and the already-dirty `apps/playground/src/app.css` / `reference-screens.tsx`; no repository-wide formatting was performed   |

The affected H01C browser suite passes independently. The repository-wide
`pnpm test` and `pnpm format:check` failures are baseline debt in the dirty
checkout, not failures caused by the H01C route changes.

## 16. Files changed for H01C

| File                                                                     | Bounded purpose                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/playground/src/reference-screens.tsx`                              | Extend only `EbookStoreCatalog` and its local fixture metadata with the GetPress-shaped shell, product detail, format/access states, loading/empty state, footer composition, member/publishing notices, and format-aware cart behavior |
| `apps/playground/src/app.css`                                            | Add route-scoped `.ebook-*` composition for discovery strip, price stack, loading proof, product-detail layout, format options, metadata sections, publishing callout, footer brand, and responsive collapse                            |
| `tests/h01c-ebook-store.spec.ts`                                         | Add bounded H01C Playwright semantic/runtime/browser evidence suite                                                                                                                                                                     |
| `docs/aapm/T7-SYSTEM-HARDENING-H01C-GETPRESS-STORE-ADOPTION-EVIDENCE.md` | Replace the stale preflight-only H01C evidence with this execution record                                                                                                                                                               |

No other H01C source or dependency was intentionally changed. The checkout
contains many unrelated dirty files from earlier work; those were preserved.

## 17. Known follow-up gaps

The following remain intentionally deferred:

1. H01D owns any reusable intrinsic-measure or storefront recipe promotion.
2. Live account, inventory, payment, fulfilment, and publishing workflow
   adoption remains out of scope for this reference route.
3. Member pricing is local fixture metadata, not a membership entitlement
   calculation.
4. Preview and citation actions are presentation notices, not content delivery
   or clipboard persistence.
5. Repository-wide format and component-token coverage debt remains outside
   this bounded route correction.

## 18. Regression statement

H01C preserves the existing `/ebook-store` route, local fixture authority,
canonical `PublicShell` public navigation, desktop cart Popover, mobile cart
DetailDrawer, filter model, grid/list controls, pagination, and settings hook.
It does not implement real payment, live authentication, live inventory,
persistent cart, live GetPress integration, Google Books integration, or a
publishing workflow. H01D and H02 were not started. Q04 was not revisited.

## 19. Gate

PASS FOR H01D
