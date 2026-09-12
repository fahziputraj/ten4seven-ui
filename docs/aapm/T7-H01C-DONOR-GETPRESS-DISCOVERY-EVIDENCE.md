# GetPress Donor Discovery Evidence

Work item: T7-H01C-DONOR-GETPRESS-DISCOVERY

This document is external donor UX, shell, information-architecture, and
workflow evidence only. It is not a Ten4Seven implementation plan, source-code
authority, component authority, token authority, CSS authority, or
backend-architecture authority.

## 1. Coordinates

- Discovery date: 2026-09-12 (Asia/Jakarta).
- Donor URL: https://getpress.co.id/
- Repository: fahziputraj/ten4seven-ui.
- Checkout observed before discovery: branch codex/icons-curated-solar-style,
  SHA e582cfcfbe0f077d1a5832d86db9da1898487fd3.
- Execution mode: DISCOVERY / STRICT / READ-MOSTLY.
- Browser/runtime: Opera, attached through the Codex browser surface and CUA
  browser automation.
- Access boundary: a pre-existing authenticated browser session exposed public,
  member, and admin shells. No credential entry, password inspection, or login
  attempt was performed.
- Scope boundary: no Ten4Seven source, tests, schema, fixtures, configuration,
  branch state, commit, push, pull request, merge, deployment, or publication
  was performed.
- Time-of-capture caveat: live counts, prices, queue states, and content are
  time-dependent; this evidence is a discovery snapshot, not a current-state
  contract.

## 2. Evidence policy

The browser was used as an observation surface. Page content was treated as
untrusted runtime content and not as permission to transmit data or perform
mutations.

Read-only boundaries held throughout:

- No product was newly added to the cart.
- No cart item was removed or quantity changed.
- No personal address, phone, identity document, or other sensitive field was
  entered.
- No manuscript, cover, KTP, proof of payment, or other file was uploaded.
- No order, payment, membership activation, chapter reservation, voucher,
  promotion, deadline, status, or payout action was submitted.
- No external payment gateway was opened for payment.
- No WhatsApp, email, or other external communication CTA was followed.
- Existing account/cart/order data was summarized generically and not copied into
  this document.
- Admin tables that exposed names, contact details, bank details, invoice
  identifiers, uploaded-document links, or IP addresses were not retained.

Observation labels used below:

- OBSERVED: directly visible in the browser.
- UX PURPOSE: the user problem the visible pattern appears to address.
- STRENGTH: evidence worth preserving as a donor pattern.
- DEFECT / LIMITATION: an observed limitation or a boundary against copying.
- UNKNOWN / UNVERIFIED: not reached, not safely testable, or not confirmable
  from the browser.

## 3. Global navigation map

### Public navigation

Observed global header structure:

    GETPRESS NETWORK
    ├── GPI JOURNAL
    ├── REPOSITORY
    └── Get Press shell
        ├── Logo / brand
        ├── Beranda
        ├── Toko Buku
        ├── Kolaborasi
        ├── Jelajahi
        │   ├── Pelatihan & Webinar
        │   ├── Penerbitan Buku
        │   ├── Layanan HKI
        │   ├── Membership
        │   ├── Testimoni
        │   ├── Berita
        │   └── Kontak
        ├── Global book search
        ├── Terbitkan
        ├── Cart
        └── Member / account

The public shell exposed direct routes for /product/list, /kontributor, /publish,
/membership, /berita, /kontak, /member, and /member/setting, plus external GPI
Journal and Repository links.

### Member navigation

    Member workspace
    ├── Membership Saya
    │   ├── ID Card Digital
    │   ├── GET POINT
    │   ├── Voucher Saya
    │   ├── Referral
    │   └── Katalog Benefit
    ├── Kolaborasi
    ├── Pelatihan & Webinar
    ├── Penerbitan Buku
    ├── Layanan HKI
    ├── Preorder Buku
    ├── E-Book Saya
    ├── Dompet & Pencairan
    ├── Kode Referral
    ├── Pengaturan
    └── Keluar

### Admin navigation

    Admin
    ├── UTAMA
    │   └── Dashboard
    ├── MASTER DATA
    │   ├── Info Website
    │   ├── Testimoni
    │   ├── Portal Berita
    │   ├── Kategori Buku
    │   ├── CMS Homepage
    │   ├── Data Buku
    │   ├── Pelatihan & Webinar
    │   ├── Penerbitan Mandiri
    │   ├── Layanan HKI
    │   └── Data Admin
    ├── Data Member
    │   ├── Status Register
    │   └── Status Aktif
    ├── Membership VIP
    │   ├── Dashboard KPI
    │   ├── Data Member VIP
    │   ├── Master Benefit
    │   ├── GET POINT & Mutasi
    │   ├── Voucher & Campaign
    │   └── Audit Log
    ├── PROSES
    │   ├── Data Order
    │   │   ├── Deadline
    │   │   ├── Kontributor
    │   │   ├── Pemb. Ebook
    │   │   └── Preorder Buku
    │   ├── Proses Editors
    │   ├── Editing Buku
    │   ├── File Hub
    │   ├── WithDraw
    │   ├── Kode Promo
    │   └── Info Persenan
    └── LAPORAN
        ├── Kontributor
        ├── Pemb. Ebook
        ├── Preorder Buku
        └── WithDraw

Jelajahi, member sidebar, and admin sidebar are the main information
architecture mechanisms. The public header and admin sidebar were visually
available during route changes. Exact sticky behavior was not isolated in a
dedicated scroll test.

## 4. Public shell

### OBSERVED

The home route / contains a network strip, logo/header row, primary navigation,
global search, red Terbitkan CTA, cart badge, member/account control, hero
carousel, news area, book shelves, category shelves, testimonials, publishing
CTA cards, and a footer with quick links, categories, and contact areas.

The visible header keeps store, collaboration, search, publish, cart, and member
entry points in one horizontal shell. The home content cross-links to the news
feed, catalog, publishing packages, and collaboration surfaces.

### UX PURPOSE

The shell gives several high-value intents a first-class entry point:

- discover or search a book;
- publish a manuscript;
- join a chapter collaboration;
- inspect institutional/news content;
- resume a member or cart journey.

### STRENGTH

- Clear separation between commercial storefront, publishing service, and
  collaboration.
- Cart and member entry points remain utility-level actions rather than being
  buried in the footer.
- Homepage shelves expose curated discovery without removing the full catalog
  route.
- Footer duplicates important destinations for users who reach the end of the
  page.

### DEFECT / LIMITATION

- The global shell carries many destinations and the Jelajahi menu, which
  increases navigation density.
- A pre-existing cart badge is visible even before a fresh discovery flow starts,
  which can make a clean test state difficult to establish.
- Sticky-header behavior and a true mobile menu state were not confirmed.

## 5. Store/catalog

### OBSERVED

Primary route: /product/list.

The catalog showed a large result set, pagination, and three visible discovery
levels: Buku Terbaru, Paling Diminati, and Semua Koleksi Buku. The left filter
area exposed category, author, minimum price, maximum price, and availability on
Google Play Books. The result area exposed search, sort, and grid/list controls.

Catalog cards visibly carried:

- cover;
- title;
- category;
- Google Play Books availability indicator where present;
- rating where present;
- standard price;
- VIP/member price;
- detail action;
- cart action.

Observed interaction states:

- Search for Python produced a two-result filtered route with search=Python.
- A real category route for Komputer was observed at /product/kategori/59.
- Sort options included Terbaru, Terlama, Terlaris, Harga Terendah, and Harga
  Tertinggi.
- Grid and list query states were exposed through view=grid and view=list.
- Pagination was visible rather than an infinite-scroll-only model.

### UX PURPOSE

Faceted discovery reduces the work of narrowing a large book inventory by
subject, author, price, availability, and ordering preference.

### STRENGTH

- Search, category, sort, and view-mode controls are co-located.
- Standard and member price are visible on the card, making the membership value
  legible before entering detail.
- Pagination and result totals communicate collection scale.
- Category shelves on the home page provide a curated path into the same
  catalog.

### DEFECT / LIMITATION

- The catalog is information-dense and has many category options.
- Empty-result, loading, and no-network states were not intentionally forced.
- A clean cart-add state was not created because the session already contained
  cart items and this discovery remained read-only.
- Card-level stock semantics were not consistently distinguishable from general
  availability indicators.

## 6. Book detail

### Representative detail A: digital/physical variant

Route: /product/dasar-dasar-pemrograman-python-pendekatan-praktis-untuk-pemula.

The detail view showed breadcrumb, cover, share control, title, authors,
publication year, category, publisher, format toggles, preview entry, pricing,
member pricing, and purchase actions. E-Book and Buku Fisik produced different
purchase panels:

- E-book: digital-product explanation, no shipping, access to the member
  library after payment, and Beli E-Book.
- Physical book: address/shipping requirement and Masukkan Keranjang.

The lower page exposed a metadata table, description, citation formats (APA7,
MLA9, Chicago, and BibTeX), and related books. The visible metadata included
author, editor, category, language, dimensions, page count, weight,
availability, publication year, publisher, and acquisition method.

The page was observed in both the e-book and physical-book selected states.

### Representative detail B: reviewed/previewable book

Route: /product/dasar-dasar-dan-aplikasi-internet-of-things-iot.

This detail state exposed rating and review count, e-book and physical prices,
Google Play Books presence, preview, metadata, description, review list, and
related books. It provided an actual preview link:

    /buku/preview/dasar-dasar-dan-aplikasi-internet-of-things-iot

The preview route presented a PDF-like scroll area with a Preview 30% indicator,
a purchase CTA, and a visible Batas Preview 30% Tercapai state after the
preview boundary was reached.

### UX PURPOSE

The detail page answers the purchase decision: what the book is, which format is
available, how much it costs, whether the member price applies, whether a
sample can be read, and how the content can be cited.

### STRENGTH

- Format selection is explicit and changes fulfillment language and primary
  action.
- Member price is visible beside standard price.
- Preview, reviews, metadata, citation, and related content support both
  evaluation and academic reuse.
- The preview boundary is communicated inside the reading surface.

### DEFECT / LIMITATION

- At least one observed book metadata field appeared semantically inconsistent:
  the ISBN row displayed title-like text rather than a conventional ISBN value.
- Physical-book shipping is deferred to checkout, so the detail page does not
  provide an all-in delivery estimate.
- The preview was visibly a partial reader experience; full purchase/download
  behavior was not completed.
- Share and citation actions were observed but their complete copy/share
  semantics were not exhaustively tested.

## 7. Cart

### OBSERVED

The header cart badge showed 3. Opening the cart drawer revealed an existing
cart with multiple physical-book line items, one quantity greater than one, line
prices, a subtotal/total, remove controls, and a checkout link to
/member/beli/daftar.

The cart was treated as pre-existing account state. No item was added, removed,
or edited.

### UX PURPOSE

The drawer lets a user inspect basket contents without abandoning the current
book/detail context and moves the user to checkout when ready.

### STRENGTH

- Cart count is visible globally.
- The drawer exposes item, quantity, line price, total, remove, and checkout in
  one compact state.
- The same cart can be reached from catalog/detail actions.

### DEFECT / LIMITATION

- Empty cart was not safely reachable without mutating or clearing existing
  state; therefore the empty-cart composition is UNKNOWN / UNVERIFIED.
- The drawer inherits the session's existing account state, which is not ideal
  for a clean donor test fixture.
- Exact member-price treatment inside the already-populated cart was not
  changed or recalculated.

## 8. Checkout / manual payment

### Physical checkout

Route: /member/beli/daftar.

The page was titled CHECKOUT BUKU FISIK and exposed fields for full name, phone,
address, province, city/regency, district, postal code, courier, and shipping
application. The order summary reflected the pre-existing cart. The visible
primary action was a continuation to physical-book checkout and looked locked
until shipping/address prerequisites were satisfied.

No personal data was entered and the form was not submitted.

### E-book payment state

From the authenticated e-book order list, a pending order detail was opened
read-only. The page showed:

- INVOICE E-BOOK;
- digital product/no shipping language;
- library access after payment verification;
- pending status;
- an automatic payment gateway labelled Xendit;
- virtual-account, QRIS, wallet, and card method categories;
- an external BAYAR SEKARANG gateway link;
- a Cek Status Pembayaran action;
- total amount.

The external gateway was not opened and no payment was made.

### Manual payment classification

Manual payment / bank transfer / upload proof was not reached in the member flow
observed here. Admin report and order surfaces exposed proof-of-payment
references for historical transactions, but this does not prove the member
checkout presents a manual-payment flow for a new order.

Classification: UNKNOWN / UNVERIFIED.

### UX PURPOSE

Checkout collects fulfillment information, separates physical from digital
fulfillment, and provides a payment-status handoff for the order lifecycle.

### STRENGTH

- Physical and digital fulfillment are not conflated.
- Required delivery information is explicit.
- Payment gateway methods and post-payment status checking are visible.
- The e-book state explains the relationship between payment verification and
  library access.

### DEFECT / LIMITATION

- Physical checkout showed shipping and total placeholders until the address and
  courier flow were completed.
- Manual-payment instructions were not discoverable from the safe path.
- No clean unpaid order was created, so post-submit order status and manual
  confirmation UX remain unverified.

## 9. Member shell

### OBSERVED

Route: /member.

The authenticated member workspace exposed membership, points, vouchers,
referral, collaboration, training, publishing, HKI, preorder, e-book library,
wallet/payout, referral code, settings, and logout. The dashboard contained
membership CTA and status/stat cards, active collaboration context, referral
context, and quick-access actions.

The account identity was visible in the UI but is intentionally omitted here.

### UX PURPOSE

The member shell consolidates commerce, service, publishing, collaboration, and
benefit journeys under one account navigation model.

### STRENGTH

- Broad user intent coverage is exposed from one sidebar.
- Membership and publishing are treated as first-class account products, not
  merely profile settings.
- Quick-access cards provide a dashboard-level continuation path.

### DEFECT / LIMITATION

- The sidebar is long and mixes transactional, service, benefit, and payout
  concepts.
- Identity-card and wallet surfaces can contain sensitive data; they were not
  captured as screenshots.
- Member mobile composition was not verified.

## 10. Profile/account

### OBSERVED

Route: /member/setting.

The settings screen exposed Ubah Foto Profil, change-password entry, personal
biography fields, contact fields, and work/education-related information. Many
values were blank or rendered as - in the observed state. No field was edited.

Membership route /member/membership showed annual membership activation context,
GET POINT, voucher, referral, and community-group areas.

### UX PURPOSE

The page provides a single place to maintain identity, contact, and security
information and links those values to the member benefit model.

### STRENGTH

- Profile, password, and membership context are discoverable from the member
  shell.
- The form is organized into biodata and contact sections.

### DEFECT / LIMITATION

- The page surfaces many sensitive fields in a large form; the safe discovery
  path must distinguish profile inspection from profile mutation.
- Address management was not observed as a separate dedicated surface.
- The digital ID-card page was intentionally not opened because it could expose
  personal identity data.

## 11. Orders

### OBSERVED

The member shell exposed /member/pembelian-ebook and
/member/pembelian-preorder.

The e-book page contained multiple account-specific orders separated into
download-ready, waiting-payment, and rejected/other states. A pending e-book
detail showed the relationship between payment verification, gateway state, and
library access.

The preorder page showed an empty state: Belum ada pre-order.

The authenticated member publishing page also showed an empty submission state:
Belum Ada Naskah Diajukan.

### UX PURPOSE

Order state grouping helps a member distinguish usable content, actions still
requiring payment, and unsuccessful or closed transactions.

### STRENGTH

- E-book access is framed as a library outcome after payment verification.
- Waiting-payment state has a direct payment/status continuation.
- Empty preorder and empty manuscript states are explicit rather than silent.

### DEFECT / LIMITATION

- The observed order list contained sensitive invoice/title/price data; this
  evidence intentionally records only state semantics.
- A separate, complete order-history/detail IA for all product types was not
  confirmed.
- Download action, actual download authorization, and library behavior after a
  successful payment were not verified.

## 12. Publishing

### Public landing

Route: /publish.

The landing page presented Terbitkan Buku Anda Sekarang, service benefits, free
consultation and package CTAs, package cards for Silver, Gold, Platinum, and
Titanium, a three-step explanation, and the form-penerbitan submission area.

The form exposed title/draft, author identity, phone, institution, manuscript
upload, KTP upload, optional plagiarism material, notes, and
Kirim Naskah & Ajukan Penerbitan. A package was preselected in the existing
session. The prefilled identity field was not copied.

### Authenticated status

Route: /member/penerbitan.

The member status page showed an empty submission state. No manuscript was
uploaded and no submission was created.

### UX PURPOSE

The public page explains the service before asking for the manuscript and
identity evidence. The member page is the intended status continuation after
submission.

### STRENGTH

- Package comparison makes service scope and price legible.
- The three-step narrative reduces uncertainty before the upload form.
- Required and optional document concepts are visible in the form.
- Public entry and authenticated status are connected.

### DEFECT / LIMITATION

- The form combines identity, manuscript, contact, and notes in one large
  submission surface; the exact validation and error recovery were not tested.
- The submission asks for sensitive identity material; it must not be used as a
  casual donor form without a clear privacy boundary.
- Review, payment/order relationship, communication, and post-submit status were
  not reachable without creating a real submission.

## 13. Collaboration

### Landing

Route: /kontributor.

The page showed Kolaborasi Penulisan, category filters, search for theme/title/
category, 600 Proyek Aktif, grid/list presentation, project cards, available
chapter counts, and pagination at 25 pages.

### Collaboration detail

An observed detail route was:

    /kontributor/buku/2903-english-for-academic-and-professional-purposes-foundations-skills-and-applications

The detail page showed 0% progress, chapter reservation/upload progress,
milestones from contributor through upload, completion, editing, ISBN, and
publish, plus a 13-chapter list. Each chapter exposed price/member-price
context, deadline context, and Pilih Bab Ini. The selection links pointed to
/member/cart-buku/<encrypted-token> and would have created a paid chapter-cart
side effect, so they were not clicked.

### UX PURPOSE

The collaboration surface converts a broad book project into selectable chapter
work with visible progress and lifecycle milestones.

### STRENGTH

- Project discovery includes filters, search, result scale, and pagination.
- Detail state makes chapter-level commitment, price, deadline, and progress
  visible.
- The milestone line explains the lifecycle beyond the initial purchase.

### DEFECT / LIMITATION

- The observed detail description was visually empty.
- The Pilih Bab Ini action is a commitment boundary but appears close to ordinary
  detail actions; a stronger confirmation/explanation may be needed.
- Contributor/editor communication, revision exchange, and final payout details
  were not completed.

## 14. Book management

### OBSERVED

The authenticated admin shell exposed book management through:

- /admin/buku — Manajemen Buku / Database Buku;
- /admin/buku/editor — Editor Buku;
- /admin/file-hub — File Hub;
- book detail, collaborator, edit, delete, and create links;
- book-level category/status filters and search.

The book list showed cover/book information, category, lifecycle labels such as
CREATED and WAITING ISBN, and Playbooks availability. The editor view showed a
large book list with category/status filters and collaborator counts. The File
Hub separated collaborator, editor, and book-oriented tabs and showed
chapter-level file/Turnitin status concepts.

The create/edit/detail route families were observed as reachable links or forms,
but no record was opened for mutation and no create/edit/delete action was
submitted.

### UX PURPOSE

Admin book management links metadata, lifecycle, collaborators, editor work,
and file evidence around a book record.

### STRENGTH

- Search/filter/status controls are available on the primary lists.
- Collaborators and file status are close to the book workflow.
- Lifecycle labels make the ISBN/publication pipeline visible.

### DEFECT / LIMITATION

- The list exposes direct edit/delete actions alongside read paths; the
  destructive boundary is easy to reach.
- CREATED, WAITING ISBN, READY, and PUBLISH semantics were visible but their
  full transition rules were not confirmed.
- File and Turnitin readiness can be empty while the workflow remains active;
  the exact distinction between missing and not-yet-required was not confirmed.

## 15. Admin shell

### OBSERVED

Route: /admin/dashboard.

The admin shell consisted of a persistent sidebar, top account/logout controls,
page title/content area, dashboard cards, charts, queues, and recent activity.
The Data Member, Membership VIP, Data Order, and Laporan groups expanded into
submenus during safe navigation.

The dashboard visually grouped:

- revenue and transaction aggregates;
- payment-confirmation and file-review queues;
- deadline/timeout urgency;
- withdrawal/member-activation urgency;
- revenue chart range;
- collaboration segmentation;
- workflow health and punctuality;
- recent transaction table.

### UX PURPOSE

The shell gives staff an operational overview and direct routes into queues
rather than making them search for work in separate products.

### STRENGTH

- Operational queues are surfaced at the dashboard level.
- The navigation tree covers storefront content, member operations, fulfillment,
  publishing, collaboration, payouts, and reports.
- Queue segmentation creates a useful handoff from overview to worklist.

### DEFECT / LIMITATION

- Recent transaction and queue tables can expose real customer identity and
  financial data in a dense first-screen context; no admin screenshot was
  retained.
- Menu labels mix abbreviations and terminology (Pemb. Ebook, WithDraw, Info
  Persenan) that may require domain familiarity.
- Dashboard numbers are dynamic and should not be treated as test fixtures.

## 16. Admin books

### OBSERVED

/admin/buku exposed:

- title/category/status search and filters;
- Tambah Buku Baru;
- reset;
- book list with cover, book status, and Playbooks signal;
- links to File Hub, detail, collaborator list, edit, and delete.

/admin/buku/editor exposed a separate editor-facing book list with category and
lifecycle filters. It showed a total book count in the page heading,
collaborator counts, and an EDIT action.

The detail/edit/create surfaces were observed as reachable links, but the
discovery stopped at the safe boundary. No form was filled and no confirmation
was accepted.

### UX PURPOSE

The family separates catalog administration, editorial workflow, collaborator
management, and file evidence while retaining a common book identity.

### STRENGTH

- Multiple operational views can be reached from the same book record.
- Filter/search/status controls are present on both general and editor lists.
- The File Hub provides a focused place for content/file readiness.

### DEFECT / LIMITATION

- Actions are represented by compact icon/link affordances, including delete,
  which increases accidental-action risk in a data-dense table.
- Full book detail, create validation, edit validation, and publication
  transition behavior are UNKNOWN / UNVERIFIED.

## 17. Admin users

### OBSERVED

Member administration:

- /admin/member — register/member list with search by identity/contact/work
  terms and member activity indicators;
- /admin/member/aktif — active-member list with the same search shape;
- member activation/detail links.

Administrator administration:

- /admin/administrator — administrator and editor account tables;
- create/edit/status/delete route families;
- role/level and module-permission columns.

VIP administration:

- /admin/membership/dashboard — membership KPI, recent member, and recent
  membership transaction regions;
- /admin/membership/members — member ID/status/search and detail/assets;
- /admin/membership/benefits — benefit and dynamic-pricing configuration;
- /admin/membership/points — manual points adjustment form and mutation log;
- /admin/membership/vouchers — voucher creation and voucher list;
- /admin/membership/audit — audit trail.

### UX PURPOSE

The family separates general membership operations from privileged membership
benefits and from staff-account authorization.

### STRENGTH

- Register and active users have distinct worklists.
- VIP benefits, points, vouchers, and audit are modeled as first-class
  operational concerns.
- Account permissions are visible as module-level access rather than only a
  generic role label.

### DEFECT / LIMITATION

- Search fields cover sensitive identifiers and contact data, so screenshots and
  notes must be aggressively redacted.
- Manual points, status changes, account create/edit/delete, and benefit saves
  are high-impact actions; only the form boundary was observed.
- Exact authorization enforcement was not inferable from the UI.

## 18. Admin orders/payments

### OBSERVED

Order/process families and visible semantics:

- /admin/order/deadline-buku — urgency filter, active deadline list, progress,
  and deadline update dialog.
- /admin/order/kontributor — pending, payment-validation, and active-order
  tabs, with deadline update and an auto-cancel entry point.
- /admin/order/ebook — waiting, accepted, and rejected tabs; payment proof and
  confirmation/cancel action families.
- /admin/order/preorder — waiting, processing, shipping, and completed tabs;
  delivery/receipt confirmation form.
- /admin/withdraw — pending, completed, and rejected payout tabs; reject and
  confirm-transfer dialogs, including proof upload.
- /admin/info — transaction percentages, refund/referral, minimum withdrawal,
  withdrawal fee, shipping/city, and checkout-deadline settings.

The dashboard and worklists exposed queue counts and status badges. Counts are
dynamic and intentionally not copied here. The UI clearly distinguishes pending
payment, verified/accepted, rejected, overdue, shipping, payout, and completed
states.

### UX PURPOSE

These worklists turn the commerce lifecycle into operational queues: verify,
fulfill, review, ship, pay out, or report.

### STRENGTH

- Tabs align with lifecycle states and make queue ownership visible.
- Payment proof and shipping proof are attached to the relevant operational
  worklist.
- Deadline, payment, file, and payout concerns have separate surfaces rather
  than one overloaded order table.

### DEFECT / LIMITATION

- The same route families expose direct confirmation, cancel, delete, auto-cancel,
  deadline, and payout actions in proximity to read-only rows.
- Payment proof, bank/rekening, address, and payout data can appear in the same
  table as customer names; privacy-safe evidence must avoid screenshots.
- Manual-payment behavior for a newly created member order remains unverified.
- No order status was changed and no payout proof was uploaded.

## 19. Admin publishing/collaboration

### OBSERVED

Publishing:

- /admin/penerbitan — manuscript/publishing queue with search, manuscript
  status, payment status, VIP discount dialog, and KELOLA NASKAH;
- the list visibly linked to manuscript and identity-document files, but those
  links were not opened or retained.

HKI:

- /admin/hki — application list with name/invoice/work search and status filter;
  the observed list was empty;
- a separate price/WhatsApp configuration route was visible.

Editorial/collaboration:

- /admin/editors — pending, verified, uploaded, and completed editor workflow
  tabs;
- /admin/file-hub — collaborator/editor/book tabs, chapter file state, Turnitin
  state, deadlines, and revision form boundary;
- /admin/order/kontributor — chapter-order payment and deadline flow;
- /admin/laporan/kontributors — verified collaboration transaction report.

### UX PURPOSE

The admin model connects public chapter demand, payment validation, contributor
delivery, editorial review, publication, and reporting.

### STRENGTH

- Publishing and collaboration are not isolated marketing pages; they have
  queues, payment state, files, deadlines, and reports.
- Editor and File Hub views provide operational segmentation.
- Empty HKI and empty event states are explicit.

### DEFECT / LIMITATION

- Publishing rows can expose identity-document links and communication CTAs
  directly in a worklist.
- A full manuscript review, editor assignment, revision exchange, and final
  publication handoff were not opened.
- The exact relationship between collaboration order status and contributor
  payout was not fully confirmed.

## 20. Admin settings

### OBSERVED

Settings/configuration surfaces reached read-only:

- /admin/info-website — website/integration settings and apply action;
- /admin/info-testimoni — testimonial/status list;
- /admin/berita — article search/filter, categories/tags, create/edit/status
  and delete route families;
- /admin/kategoribuku — category create/edit/status controls;
- /admin/homepage-cms — homepage custom sections, sliders, preview, and
  ordering/action controls;
- /admin/pelatihan-webinar — event search/type/status filter and create entry;
- /admin/membership/benefits — benefit settings and dynamic pricing;
- /admin/membership/vouchers and /admin/promo — two promotion/voucher families;
- /admin/info — percentage, fee, city, and checkout parameters;
- /admin/administrator — staff/editor account management;
- /admin/account-setting — account-settings entry was visible in the shell.

### UX PURPOSE

These screens let staff tune content, pricing/benefit rules, workflow
parameters, categories, promotions, and authorization without leaving the admin
shell.

### STRENGTH

- CMS, catalog, membership, promotion, and financial parameters have explicit
  admin owners.
- Homepage preview and slider/custom-section concepts make content operations
  visible.
- Audit Log provides a trace surface for membership configuration changes.

### DEFECT / LIMITATION

- Settings pages place high-impact save buttons and mutation forms next to
  read-only configuration context.
- The homepage CMS showed an empty custom-section state with a message referring
  to a deployment/SQL prerequisite; the underlying prerequisite was not
  investigated.
- No setting was saved and no admin account, category, content, benefit,
  voucher, or percentage was changed.

## 21. Responsive observations

### OBSERVED

The normal Opera viewport showed a desktop composition for the public shell,
catalog, detail, checkout, collaboration, publishing, member, and admin
surfaces.

A temporary viewport override was attempted through the available browser
capability and then reset. The attached Opera surface continued to report a
desktop-sized rendered document (innerWidth approximately 1868px) and did not
expose a verified mobile navigation composition.

### UX PURPOSE

Responsive evidence would establish whether the donor shell preserves the same
primary intents when the header, filters, tables, and multi-column cards need to
collapse.

### STRENGTH

- Desktop hierarchy and route families are observable.

### DEFECT / LIMITATION

- Mobile breakpoint behavior, menu collapse, filter drawer behavior, table
  overflow, and member/admin mobile composition are UNKNOWN / UNVERIFIED.
- No responsive screenshot is claimed in the screenshot index.

## 22. End-to-end flow maps

### FLOW A — Public → Search → Book → Cart → Checkout → Order → Manual Payment

    Public home
      → global/catalog search
      → filtered Python results
      → book detail
      → e-book/physical variant
      → existing populated cart drawer
      → physical checkout
      → address/shipping prerequisites
      → STOP before data entry/submission

    E-book branch:
      → member e-book order list
      → pending order detail
      → Xendit payment-method state
      → STOP before external gateway/payment

Manual bank-transfer instructions and a new unpaid order were not reached.

### FLOW B — Public → Member/Login → Account → Orders → Order Detail

    Public account control
      → /member
      → member sidebar
      → /member/setting
      → /member/pembelian-ebook
      → pending e-book detail
      → payment/status CTA

The session was already authenticated; login itself was not tested.

### FLOW C — Public → Terbitkan → Publishing Entry → Submission/Status

    Public /publish
      → package/benefit explanation
      → publishing form
      → manuscript + identity-document fields
      → STOP before upload/submit

    Authenticated continuation:
      → /member/penerbitan
      → empty manuscript-status state

### FLOW D — Public → Collaboration → Collaboration Journey

    /kontributor
      → filter/search/project grid
      → project detail
      → chapter list + milestone/progress
      → Pilih Bab Ini
      → STOP before paid chapter-cart side effect

### FLOW E — Admin → Books → Detail/Edit

    /admin/dashboard
      → /admin/buku
      → search/category/status filters
      → detail/collaborator/edit/delete route families
      → /admin/buku/editor
      → /admin/file-hub
      → STOP at mutation boundary

### FLOW F — Admin → Orders → Order Detail / Payment Status

    Admin shell
      → deadline / contributor / e-book / preorder queue
      → lifecycle tabs
      → proof/status/confirmation action boundary
      → STOP before confirmation, cancel, resi, auto-cancel, or payout

### FLOW G — Admin → Publishing/Collaboration → Report

    Admin publishing queue
      → manuscript/document/status context
      → editor/file hub/collaborator workflow
      → verified contributor report
      → STOP before file, communication, or status mutation

## 23. Screenshot index

The following 13 meaningful screenshots were captured and emitted inline from
the attached Opera/CUA surface during discovery. The screenshot API returned
in-memory image bytes and did not expose a supported repository-path write
operation in this session. Therefore these are logical evidence IDs, not claims
that PNG files exist on disk. No fabricated or privacy-unsafe image placeholder
was added to the repository.

| Evidence ID | Intended filename | Route | State | Purpose | Repository file |
|---|---|---|---|---|---|
| 01-public-home | 01-public-home.png | / | Public home | Header, hero, news, first shell composition | UNKNOWN / UNVERIFIED |
| 03-store-catalog | 03-store-catalog.png | /product/list | Catalog landing | Filters, sort, cards, pagination | UNKNOWN / UNVERIFIED |
| 04-store-search | 04-store-search.png | /product/list?search=Python | Search results | Search result anatomy and price cards | UNKNOWN / UNVERIFIED |
| 05-store-filter | 05-store-filter.png | /product/kategori/59?sort=harga_terendah | Category/sort | Category context and sort state | UNKNOWN / UNVERIFIED |
| 06-book-detail-ebook | 06-book-detail-ebook.png | Python book detail | E-book variant | Format, price, library promise, detail metadata | UNKNOWN / UNVERIFIED |
| 06-book-detail-physical | 06-book-detail-physical.png | Python book detail | Physical variant | Shipping requirement and physical CTA | UNKNOWN / UNVERIFIED |
| 06-book-detail-iot | 06-book-detail-iot.png | IoT book detail | Reviewed/previewable detail | Reviews, Google Play Books, metadata, related books | UNKNOWN / UNVERIFIED |
| 06-book-preview | 06-book-preview.png | /buku/preview/... | Preview reader | 30% preview reader and purchase boundary | UNKNOWN / UNVERIFIED |
| 08-cart-populated | 08-cart-populated.png | Cart drawer over current detail | Existing populated cart | Item/quantity/total/remove/checkout anatomy | UNKNOWN / UNVERIFIED |
| 09-checkout | 09-checkout.png | /member/beli/daftar | Physical checkout | Address/shipping/order-summary boundary | UNKNOWN / UNVERIFIED |
| 15-publishing-landing | 15-publishing-landing.png | /publish | Publishing landing | Packages, steps, public service entry | UNKNOWN / UNVERIFIED |
| 17-collaboration | 17-collaboration.png | /kontributor | Collaboration landing | Project discovery and filters | UNKNOWN / UNVERIFIED |
| 18-collaboration-detail | 18-collaboration-detail.png | /kontributor/buku/... | Chapter detail | Milestones, progress, chapter commitment boundary | UNKNOWN / UNVERIFIED |

Admin, profile, order-history, and membership screenshots were intentionally
withheld because those surfaces exposed private identity, contact, order,
financial, account, or uploaded-document information. A mobile screenshot is
not claimed because the temporary viewport did not produce a verified mobile
rendering.

## 24. UX strengths

The strongest donor evidence is:

- One public shell connects store, publishing, collaboration, news, account,
  and cart intents.
- Catalog discovery supports search, category, author, price, availability,
  sort, pagination, and grid/list presentation.
- Book detail makes e-book versus physical fulfillment explicit and exposes
  member price, preview, citation, reviews, and related books.
- Member navigation treats publishing, collaboration, membership benefits, and
  e-book access as connected account products.
- Collaboration turns a book into chapter-level commitments with price,
  deadline, progress, and lifecycle milestones.
- Admin navigation reflects operational ownership across content, books,
  members, payments, publishing, files, payouts, and reports.
- Payment/order/admin queues are segmented by lifecycle status rather than one
  undifferentiated list.
- Publishing packages and the three-step explanation give a clear pre-form
  orientation.

## 25. UX defects / things not to copy

- Do not copy the dense mixture of commercial, editorial, member-benefit, and
  support destinations without a deliberate IA hierarchy.
- Do not assume a populated account cart is a safe clean-room test fixture.
- Do not make physical checkout show unresolved shipping/total placeholders
  without a clear next-step explanation.
- Do not expose direct destructive links beside ordinary book/member/order
  actions without a clear confirmation and permission boundary.
- Do not expose real names, contact fields, bank/rekening details, identity
  documents, invoice identifiers, proof files, or IP addresses in donor
  screenshots.
- Do not copy ambiguous lifecycle labels until their transition semantics are
  confirmed.
- Do not copy the observed title-like value in an ISBN metadata field.
- Do not leave a collaboration detail with an empty description when the detail
  page is expected to support commitment.
- Do not assume a gateway-based pending payment screen proves a manual-transfer
  workflow exists.
- Do not claim responsive readiness from a desktop screenshot; mobile behavior
  still needs evidence.

## 26. Preliminary Ten4Seven mapping

This is a low-reasoning discovery mapping only. It is not a design decision and
does not authorize implementation.

| GetPress surface/pattern | Observed purpose | Potential Ten4Seven primitive/block/recipe | KEEP / ADAPT / REJECT candidate | Notes |
|---|---|---|---|---|
| Public network header | Route users among store, publish, collaborate, account | Public navigation shell | ADAPT | Preserve intent grouping; avoid copying density verbatim |
| Global book search | Start catalog discovery from any public page | Search control / catalog search recipe | KEEP candidate | Verify canonical catalog contract first |
| Catalog filters + sort | Narrow a large collection | Faceted filter / sort bar / product grid | KEEP candidate | Empty/loading behavior still needs product-specific decisions |
| Grid/list toggle | Support browsing preferences | Product collection view switcher | ADAPT | Keep only if it serves Ten4Seven user intent |
| Product card with member price | Compare purchase and membership value | Product card / price block | KEEP candidate | Preserve business semantics, not visual tokens |
| Format toggle on detail | Separate digital and physical fulfillment | Product option group / fulfillment selector | KEEP candidate | Requires explicit checkout contract |
| Preview boundary | Evaluate content before purchase | Preview reader / gated content block | ADAPT | Do not infer implementation from donor PDF behavior |
| Citation formats | Support academic reuse | Citation action group | KEEP candidate | Confirm product requirements |
| Cart drawer | Inspect basket without leaving context | Cart drawer / cart summary | ADAPT | Need clean empty/populated state coverage |
| Checkout prerequisite state | Collect physical fulfillment details | Checkout steps / address form | ADAPT | Resolve shipping/total feedback |
| Member sidebar | Centralize account services | Member shell / account navigation | ADAPT | Reduce menu density and protect sensitive routes |
| Publishing package cards | Explain service scope before submit | Pricing/package card recipe | KEEP candidate | Preserve package comparison, not donor copy |
| Collaboration project grid | Discover selectable writing projects | Project collection / collaboration card | KEEP candidate | Detail description and commitment confirmation need improvement |
| Collaboration milestone line | Show content lifecycle | Workflow stepper / milestone block | KEEP candidate | Validate status semantics |
| Admin operational sidebar | Expose staff ownership and queues | Admin shell / route family navigation | ADAPT | Keep lifecycle ownership; avoid raw route sprawl |
| Admin status tabs | Work a queue by lifecycle state | Status tabs / filtered data table | KEEP candidate | Counts are runtime data, not fixture assumptions |
| File Hub | Centralize manuscript/editor/file readiness | File workflow hub / review table | ADAPT | Require privacy-safe file permissions |
| Audit Log | Explain benefit/configuration change history | Audit timeline/table | KEEP candidate | Confirm retention and role access |
| Direct delete/status links in tables | Fast staff mutation | Destructive action pattern | REJECT candidate | Replace with explicit permission/confirmation design |

## 27. Unknown / unverified

- Local repository screenshot files under docs/aapm/evidence/getpress-donor/.
  Inline captures exist in the task evidence stream, but the attached Opera
  surface did not provide a supported disk-materialization path.
- Empty cart layout.
- Loading, network-error, and empty-search catalog states.
- True mobile/responsive composition, including mobile nav, filter drawer, and
  admin/member table behavior.
- Login/logout/password-change completion and authorization enforcement.
- Manual bank-transfer instructions for a newly created order.
- Creation of a new unpaid manual-payment order and its post-submit status.
- External gateway behavior after payment.
- E-book download authorization after successful verification.
- Separate full order-history IA for every product type.
- Publishing validation, upload, payment, review, communication, and final
  status after submission.
- Full chapter purchase, contributor upload, revision, editor review, payout,
  and publication completion flow.
- Admin create/edit/detail form validation for books, members, content,
  categories, events, promotions, benefits, and settings.
- Bulk actions, pagination mechanics beyond visible page controls, and
  permission-denied states.
- Backend/API/database architecture and authorization implementation.

## 28. Handoff for H01C

Discovery reached the public shell, catalog/search/filter/sort, multiple book
details, preview, existing cart, physical checkout, authenticated member shell,
profile/settings, e-book order/payment state, publishing landing/status,
collaboration landing/detail, book management routes, complete visible admin
navigation, major admin families, queues, reports, settings, and operational
workflow boundaries.

The donor was used only as external UX evidence. No H01C implementation was
performed. No Ten4Seven source was modified. No payment, upload, submission,
status change, delete, publish, commit, push, pull request, merge, or deploy was
performed. Existing unrelated worktree changes were preserved.

The next review decision is whether any donor patterns should be selected for
H01C after comparison with the current canonical Ten4Seven catalog, cart,
checkout, public shell, member shell, publishing, collaboration, and admin
contracts. This document does not make that adoption decision.

DISCOVERY COMPLETE — READY FOR PT AAPM / CHATGPT REVIEW
