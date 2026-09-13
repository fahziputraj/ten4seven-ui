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
The capture test writes the following deterministic filenames under
`output/playwright/` by default; `T7_H01C_EVIDENCE_DIR` can point to an external
evidence archive when a separate capture bundle is required:

- `h01c-after-desktop-catalog.png`
- `h01c-after-desktop-detail.png`
- `h01c-after-desktop-cart.png`
- `h01c-after-mobile-catalog.png`
- `h01c-after-mobile-detail.png`
- `h01c-after-mobile-cart.png`

Screenshots are captured after the canonical overlay transition settles. The
generated capture files are runtime evidence, not package source.

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

| Command / suite                                            | Result           | Evidence or classification                                                                                                                                                                     |
| ---------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm exec playwright test tests/h01c-ebook-store.spec.ts` | PASS — 12 passed | H01C shell, discovery, detail, format states, citation, cart, loading/empty, mobile filter, responsive matrix, reduced motion, R1 semantic checks, and screenshots                             |
| `pnpm typecheck`                                           | PASS             | Full workspace typecheck completed; agent package build completed as part of the script                                                                                                        |
| `pnpm build`                                               | PASS             | Playground production build completed; existing large-chunk warning remains                                                                                                                    |
| `git diff --check`                                         | PASS             | Only existing CRLF conversion warnings were reported; no whitespace error                                                                                                                      |
| `pnpm test`                                                | PASS             | Full repository contract, package, token, AI, component, and bridge test chain completed during the R1 rerun                                                                                   |
| `pnpm format:check`                                        | FAIL / baseline  | Broad repository check reports 288 pre-existing formatting warnings across unrelated app, docs, generated/native, package, script, and test files; no repository-wide formatting was performed |

The affected H01C browser suite and the repository-wide `pnpm test` pass. The
repository-wide `pnpm format:check` failure is baseline debt in the dirty
checkout, not a failure caused by the H01C route changes.

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

## H01C-R1 Shell Fidelity & Semantic Integrity

Execution date: `2026-09-13` (Asia/Jakarta)

### Live reference observations and current proof gap

The live [GetPress Indonesia](https://getpress.co.id/) shell was rechecked as a
composition reference. Its landing surface establishes a publishing identity
before the bookstore: a compact ecosystem/utility layer, strong brand header,
primary search (`Cari buku...`), public store/discovery navigation, a visible
member entry, publishing/service routes, and editorial sections such as recent
updates and book collections. The store is presented as one part of a broader
publishing platform rather than as a filter sidebar followed immediately by a
product grid.

The accepted H01C implementation already had the required catalog, detail, cart,
member, publishing, footer, loading, and empty-state behavior. Its remaining
gap was compositional: the header was too generic/minimal, search lived only in
the catalog toolbar, the publishing CTA did not establish enough product
identity in the first fold, and the transition into the catalog lacked a
promotional/editorial anchor. Fixture cards also combined source fields into
ambiguous labels and could show a member price above the displayed default
format price.

### Before / after shell anatomy

| Concern               | Before R1                                                                       | After R1                                                                                                                                                      | Result |
| --------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Utility layer         | No compact publishing/ecosystem strip before route content                      | `Jaringan GetPress` strip with deterministic local anchors for publishing, HKI, membership, and contact                                                       | PASS   |
| Brand and navigation  | GetPress name existed, but the navigation read as a thin generic catalog header | Stronger bounded/pill navigation with active `Toko Buku`, `Beranda`, `Jelajahi`, `Kolaborasi`, and `Penerbitan` grouping                                      | PASS   |
| Search                | Search was only part of the catalog toolbar                                     | One labelled `Cari buku` `SearchInput` is placed inside the upper publishing shell/promo; catalog filtering remains backed by the same query state            | PASS   |
| Publishing prominence | `Terbitkan` existed as a header action/notice                                   | Header `Terbitkan`, upper-fold `Terbitkan buku`, publishing proof copy, and the existing service callout share the same local route path                      | PASS   |
| Commerce utilities    | Cart and member were available but visually secondary                           | Cart and `Masuk member` are grouped beside the primary publishing CTA; canonical cart behavior is unchanged                                                   | PASS   |
| First fold            | Page header and catalog discovery dominated the landing state                   | `ebook-store-promo` establishes publishing identity, search, CTA, local cover proof, update label, metrics, and a clear path to books before catalog controls | PASS   |
| Catalog transition    | Store felt like a green catalog first                                           | Editorial discovery rail now follows the promo, then the existing bounded filters, results, cards, and pagination                                             | PASS   |

The final composition remains:

```text
PublicShell
├── GetPress / Publishing store brand
├── NavigationMenu with active Toko Buku
│   ├── Beranda
│   ├── Toko Buku
│   ├── Jelajahi
│   ├── Kolaborasi
│   └── Penerbitan
├── grouped Terbitkan / cart / member utilities
├── Jaringan GetPress utility strip
├── publishing/store promo
│   ├── PageHeader identity
│   ├── shell-level Cari buku search
│   ├── Jelajahi buku / Terbitkan buku actions
│   └── local editorial cover proof and metrics
├── discovery links
├── existing bounded catalog and state model
├── existing publishing-service callout
└── PublicFooter
```

No GetPress HTML, CSS, JavaScript, proprietary asset, customer data, live API,
or live catalog behavior was copied. The implementation uses the existing
Ten4Seven `PublicShell`, `NavigationMenu`, `PageHeader`, `SearchInput`,
`ProductCard`, `ProductGrid`, `DetailDrawer`, cart components, and semantic
controls.

### Brand/profile ownership and exact local exceptions

The route keeps its existing `data-profile="commerce"` boundary and the
`GetPress / Publishing store` fixture identity. No global Ten4Seven brand token
was changed. The only publishing accent alias introduced by R1 is scoped to
`.ebook-app-shell` and resolves through the existing semantic chart token:

```css
--ebook-publishing-accent-hsl: var(--t7-surface-emphasis-solid-chart-2-hsl);
```

The scoped rules use existing surface, foreground, border, radius, shadow,
typography, focus, and primary-foreground tokens. They do not introduce raw
palette colors, global product tokens, a second theme runtime, local animation
durations, or local keyframes.

The exact route-local CSS exceptions are:

- `.ebook-app-shell .t7-navigation-menu` and its link/trigger selectors for the
  stronger bounded navigation and active state;
- `.ebook-app-shell .ebook-store-actions` for the cart/member/publishing
  utility cluster;
- `.ebook-reference .ebook-utility-strip` for the compact ecosystem layer;
- `.ebook-reference .ebook-store-promo`, `.ebook-promo-copy`,
  `.ebook-promo-proof`, and their responsive rules for the first-fold promo;
- `.ebook-reference .ebook-shell-search` for the shell-level search measure;
- `.ebook-reference .ebook-meta-pair`, `.ebook-meta-label`, and
  `.ebook-price-state` for explicit format/access and acquisition semantics;
- `.ebook-app-shell .t7-app-content:focus` to remove the non-interactive main
  landmark outline that otherwise framed the route as a black browser-like
  rectangle after route focus.

These are composition constraints for this reference surface. A reusable
storefront product profile or intrinsic-measure contract remains future H02 /
H01D ownership; it was not promoted from this bounded proof.

### Format/access normalization and price audit

Cards and detail now expose separate roles rather than concatenating source
fields:

- `Format`: `Physical Book` or `Ebook`;
- `Access`: `Local store`, `Google Play Books`, `External`, or `Unavailable`.

The former ambiguous combinations such as `Ebook · Ebook` and
`Google Play Books · Ebook` are no longer rendered. External-only cards show an
access state instead of a local purchase price; unavailable formats show
`Belum tersedia`; local formats retain the canonical standard price and only a
legitimate lower member/VIP price.

All 10 fixture books were audited through the two catalog pages. The local
member-price set is:

| Book      | Default format | Default state |  Standard | Member/VIP | Audit |
| --------- | -------------- | ------------- | --------: | ---------: | ----- |
| `book-02` | Physical Book  | Local store   | Rp110.000 |   Rp99.000 | PASS  |
| `book-03` | Ebook          | Local store   |  Rp78.000 |   Rp65.000 | PASS  |
| `book-04` | Physical Book  | Local store   | Rp125.000 |  Rp112.000 | PASS  |
| `book-06` | Ebook          | Local store   |  Rp89.000 |   Rp79.000 | PASS  |
| `book-08` | Ebook          | Local store   |  Rp75.000 |   Rp68.000 | PASS  |
| `book-09` | Physical Book  | Local store   |  Rp82.000 |   Rp74.000 | PASS  |

`book-01`, `book-05`, `book-07`, and `book-10` are provider-external default
formats. Their unsupported member-price fields were removed from the fixture;
they render `Access: Google Play Books` and do not claim a Member/VIP benefit.
The UI helper also guards the invariant at the selected-format boundary:
`memberPrice` is emitted only when the selected option is locally available and
`memberPrice <= standardPrice`.

### Responsive and browser proof

Rendered Playwright/Chromium QA was run because the dedicated browser plugin was
unavailable in this environment. The required route was checked at 1440×900,
1024×768, 768×1024, and 390×844. The matrix covered first-fold readability,
catalog transition, product detail, mobile filter/cart behavior,
`prefers-reduced-motion`, console/page errors, and document overflow. All four
viewports returned no console errors, no page errors, and root overflow `<= 1px`.

The R1 capture set uses these filenames under `output/playwright/` by default:

- `h01c-r1-1440-first-fold.png`
- `h01c-r1-1440-catalog.png`
- `h01c-r1-1440-detail.png`
- `h01c-r1-390-first-fold.png`
- `h01c-r1-390-catalog.png`
- `h01c-r1-390-detail.png`
- `h01c-r1-390-cart.png`

The 1440 first-fold capture shows the publishing identity, public navigation,
shell search, strong publishing actions, member/cart utilities, editorial
cover proof, and the route into the bookstore before the catalog. The 390
capture keeps the brand, search, publish action, member/cart cluster, useful
promo copy, and responsive catalog path reachable without horizontal page
overflow. Capture files remain generated evidence and are not package source.

### Tests and regression evidence

| Command / assertion                                                                                                               | Result           | Scope                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm exec playwright test tests/h01c-ebook-store.spec.ts --project=chromium`                                                     | PASS — 12 passed | Existing H01C behavior plus R1 shell anatomy, 10-fixture pricing/label audit, responsive matrix, reduced motion, overflow, console/page errors, and screenshots                          |
| Shell anatomy assertions                                                                                                          | PASS             | Primary navigation, utility navigation, promo region, one shell search, publish CTA, cart trigger, member entry, active store item                                                       |
| Fixture semantics assertions                                                                                                      | PASS             | Every fixture card has a valid format/access pair; no duplicate labels; local member prices never exceed their displayed standard price; external and unavailable states remain distinct |
| `pnpm typecheck`                                                                                                                  | PASS             | Full workspace typecheck and agent package build                                                                                                                                         |
| `pnpm build`                                                                                                                      | PASS             | Playground production build; existing large bundle-size warning remains                                                                                                                  |
| `pnpm test`                                                                                                                       | PASS             | Full repository contract, package, token, AI, component, and bridge test chain                                                                                                           |
| `pnpm exec prettier --check apps/playground/src/reference-screens.tsx apps/playground/src/app.css tests/h01c-ebook-store.spec.ts` | PASS             | All R1-touched source/test files formatted                                                                                                                                               |
| `pnpm format:check`                                                                                                               | FAIL / baseline  | Broad repository check reports 288 pre-existing formatting warnings across unrelated app, docs, generated/native, package, script, and test files; no mass-format was run                |
| `git diff --check`                                                                                                                | PASS             | No whitespace errors introduced by the bounded source/test/evidence changes                                                                                                              |

### Baseline debt and regression statement

The dedicated browser plugin remained unavailable, so this evidence uses the
repository's Playwright Chromium path and records the fallback explicitly. The
only repository-wide non-green check is the existing 288-file formatting debt;
the touched route, CSS, test, and evidence files pass targeted formatting. The
production build's large chunk warning is unchanged and does not affect the
route runtime proof.

R1 changed only the Publishing Store route composition, its route-scoped CSS,
its bounded Playwright evidence, and this evidence addendum. It did not touch
Component Lab, Public Showcase, Auth, Theme Studio, Q04, H01D, H02, `packages/ui`,
global tokens, routing architecture, backend data, live GetPress integration,
account/inventory/payment behavior, or the accepted catalog/detail/cart
business behavior. No new animation framework or local motion runtime was
introduced. The current route is immediately understandable at first paint and
retains the accepted H01C functionality.

## 18. Regression statement

H01C preserves the existing `/ebook-store` route, local fixture authority,
canonical `PublicShell` public navigation, desktop cart Popover, mobile cart
DetailDrawer, filter model, grid/list controls, pagination, and settings hook.
It does not implement real payment, live authentication, live inventory,
persistent cart, live GetPress integration, Google Books integration, or a
publishing workflow. H01D and H02 were not started. Q04 was not revisited.

## 19. Gate

PASS FOR H01D
