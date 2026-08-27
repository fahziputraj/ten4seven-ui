# AAPM UI

The shared design language for **PT Agung Abadi Putra Mandiri (AAPM)** — an Indonesian layer‑poultry (commercial egg) operation — and every application built for it: the AAPM Layer Academy learning platform, the AAPM ERP, and the operational/monitoring tools that follow.

Two things this system has to do at once:

1. **Carry the AAPM brand** — a controlled, agricultural green identity with a terracotta counterpoint, honest photography, and unhurried Indonesian copy.
2. **Run an ERP** — dense tables, record lifecycles, approvals, verification queues, exception-first dashboards. Data before decoration.

The visual quality bar comes from the Academy implementation. The structural requirements come from the ERP specification. Both live here. **AAPM UI v0.2.0** also adds a product-neutral application layer so a new Academy, ERP or operations screen can start from the same shell, token and feedback contracts.

## AAPM UI v0.2 — general web/dashboard layer

The existing Academy and ERP kits remain intact. The new general layer is additive and intended for real product consumption:

- **Shell and layout** — `AppShell`, `Sidebar`, `Topbar`, `PageContainer`, `BottomNav`, `DashboardGrid` and `DashboardPanel`. The shell is responsive, mobile-safe-area aware and light by default; add `.dark` for the semantic dark theme.
- **Interaction foundations** — `Combobox` for searchable choices, `ToastProvider` / `useToast` for consistent notifications, `ConfirmDialog` for designed confirmations, and `ProgressRing` for compact completion states.
- **Token architecture** — `tokens/components.css` and `tokens/layout.css` complete the primitive → semantic → component chain. Component code consumes tokens rather than inventing colors or dimensions.
- **Typography** — the bundled local Inter Variable family remains canonical. It is the Academy’s Helvetica-like, resilient web stack, with italic support and the supplied SIL OFL text in `assets/fonts/`.
- **Showcase and package entrypoint** — `showcase/catalog.html` is the product-facing template catalog, `showcase/index.html` is the foundation/component review surface, and `index.js` is the tree-shakable React source entrypoint. The legacy `_ds_bundle.js` is preserved for the existing browser kits.

The general layer is an owned **instant composition system**. Minimal UI supplies visual recipes, HeroUI supplies interaction and accessibility references, and Iconify supplies the semantic glyph surface; AAPM UI tokens, components, responsive contracts and brand rules remain the source of truth. It does not add a runtime UI framework, replace React, or replace the Iconify registry.

## The AAPM UI instant composition model

Use the system like a product-ready template catalog: choose a surface recipe, compose it from AAPM UI components, and let the same token language carry it from Academy to Ebook, reader, operations, auth, or AI workspace. The source boundaries and decision rules are documented in guidelines/instant-composition.md.

The practical split is simple:

- **Minimal UI** — visual rhythm: hierarchy, density, card and dashboard patterns.
- **HeroUI** — interaction behavior: state, focus, keyboard, validation, overlays.
- **Iconify** — icon surface: semantic registry, family discipline, visible fallback.
- **AAPM UI** — owned result: tokens, API, recipes, responsive behavior, theme and brand.

This is an adaptation layer, not three competing design systems. A product may use a Minimal UI pattern or a HeroUI interaction idea, but its implementation must land in the AAPM UI component and token contracts.

---

## Products in scope

| Product | What it is | Status of source |
| --- | --- | --- |
| **AAPM Layer Academy** | Learner-facing training platform for farm staff: 12-module learning path, quizzes, final exam, farm calculators, KPI dashboard, an AI assistant ("APPI"), certification. Plus an admin console for courses, learners, users and workspace status. | Full React source read (see Sources) |
| **AAPM ERP** | Sales, purchase, inventory, logistics, accounting, finance, HR/payroll, farm monitoring. List/detail/transaction/approval screens, operational dashboards. | Specified, not yet built — the ERP kit here is the canonical *pattern* set, drawn from the spec and the Academy's admin console |

Language of the products: **Indonesian-first with English UI scaffolding** — see Content fundamentals.

---

## Sources

Everything in this system was lifted from material the team supplied. Nothing was invented from memory.

- **GitHub** — `erp-aapm/aapmlayeracademy.id`, branch `develop` → <https://github.com/erp-aapm/aapmlayeracademy.id/tree/develop>
  Explore this repo further before building anything AAPM-branded: `src/index.css` is the live token file, `src/components/ui/` is the shadcn-based primitive layer, `src/components/primitives/` is AAPM's own facade over it, and `docs/ui-ux/` contains the team's own hardening notes (`ICONIFY_SURFACE_CONTRACT.md`, `HARDENING_01_PRIMITIVE_FACADE.md`, `UI_ARCHITECTURE_DISCOVERY.md`). See `github.md` for the sync record.
- **Local codebase** — `aapmlayeracademy.id/` (same project, mounted read-only). Read: `src/index.css`, `src/components/{ui,primitives,layout,academy,admin,ai,icons}/`, `src/pages/**`, `public/brand/`, `public/assets/`, `tailwind.config.js`.
- **Brand assets** — `ASSET/AAPM SVG Logo/` (AAPM + Academy logo lockups, app icons, light and dark variants) and the uploaded `uploads/*.svg` set, which is the same family.
- **Reference implementation** — <https://staging.aapmlayeracademy.id/login> (visual quality reference only; authenticated screens were not auditable).
- **Foundation libraries present in `ASSET/`** — HeroUI / HeroUI Pro (web + native, component source and templates), Streamline icon sets (Bold + Regular), Front v4.3.1 HTML template, Refactoring UI. These informed the *architecture* discussion; the runtime the Academy actually ships is Tailwind + shadcn/ui + Iconify, and that is what this system encodes.

**Not reproduced here:** the AAPM ERP screens themselves. No ERP source or design file was supplied, so the ERP UI kit in this system is built from the written specification and the Academy's admin console, and is labelled as such.

---

## CONTENT FUNDAMENTALS

### The bilingual rule

AAPM products are written for Indonesian farm staff, in Indonesian, with English kept for interface furniture. The split is consistent and worth copying exactly:

- **Indonesian** — anything addressed to the user: body copy, helper text, empty states, errors, encouragement, study notes, tooltips.
  > "Belum ada modul yang tersedia untuk akun ini. Roadmap akan muncul di sini saat materi sudah dipublikasikan."
  > "Selesaikan lesson berikutnya untuk membuka rekomendasi."
  > "Gunakan satu sesi untuk satu keputusan operasional. Catat insight yang bisa Anda bawa kembali ke farm."
- **English** — navigation labels, section titles, metric labels, product nouns: `Dashboard`, `Learning Path`, `Farm Calculators`, `Farm KPI`, `Certification`, `Final Exam`, `Up next`, `Study note`, `Learning workspace`, `Academy workspace`.
- **Mixed inside one line is normal and correct** — `"Modul selesai"`, `"Lanjutkan belajar"`, `"Buka lesson"`, `"Buka seluruh roadmap"`, `"Panel Admin"`, `"Lihat profil & prestasi"`. Domain loanwords stay English: *lesson, module, roadmap, farm, learning path, quiz, dashboard, insight*.
- **Auth is English** — `"Sign in"`, `"Continue your learning journey."`, `"New to the Academy?"`, `"Create an account"`, `"Forgot password?"`. The login page is the one fully-English surface.

### Voice

Formal-but-warm. The system uses **Anda**, never *kamu*. It addresses the reader directly and never refers to itself in the first person. No exclamation marks, no hype, no gamified congratulation. Encouragement is stated as a next action, not as praise:

> ✅ "Selesaikan lesson berikutnya untuk membuka rekomendasi."
> ❌ "Kerja bagus! Kamu hebat! 🎉"

The brand's reflective register appears only in the login panel quotes — long, first-person-plural, almost editorial, set in italic serif over photography:

> "Di balik hasil yang konsisten, ada keputusan kecil yang diamati, dicatat, dan dijalankan dengan disiplin."
> "Performa farm yang sehat dimulai dari kemampuan membaca sinyal—pakan, air, telur, dan perilaku ayam."

That voice is for brand storytelling surfaces only. It never appears inside the workspace.

### Casing

- **Sentence case** for everything readable: page titles, card titles, buttons, menu items. `"Up next"`, not `"Up Next"`. `"Buka Final Exam"` keeps `Final Exam` capitalised because it is a product noun.
- **UPPERCASE + wide tracking** (`0.14em`–`0.18em`, 10–11px, semibold) for overlines only: `LEARNING WORKSPACE`, `LANJUTKAN BELAJAR`, `STUDY NOTE`, sidebar group labels (`LEARN`, `TOOLS`, `ACHIEVEMENT`). This is the single most recognisable typographic tic in the system.
- **Title Case** never appears.

### Buttons and labels

Verb-first, one word where one word will do. `Submit`, `Export`, `Filter`, `Refresh`, `Reject`, `Buka lesson`, `Review lesson`, `Lihat semua`, `Keluar`. Loading states keep the label and add an ellipsis: `"Signing in…"`. Pick one word per meaning and hold it — `Delete` for destruction, `Archive` for reversible removal, `Remove` only for taking a row out of a form.

### Errors, empties, and states

Three sentences maximum, and always a way forward. Error copy names what failed and offers the retry:

> Title: "Dashboard belum dapat memuat data"
> Body: "Progress dan roadmap belum berhasil diambil. Coba lagi untuk melanjutkan sesi belajar Anda."
> Action: "Coba lagi"

Empty states describe *why* it's empty, not that it is empty. Never "No data".

### Numbers

Indonesian formatting throughout: `Rp 482.650.000`, `12.450 kg`, `92,4%` (comma decimal, period thousands), `24 Agustus 2026` long form / `24/08/2026` short. Counts read as fractions in prose — `"3 dari 12 modul selesai"` — and as `3/12` in metrics. Percentages in UI are whole numbers unless precision matters.

### Emoji

**None.** No emoji anywhere in the products — not in copy, not as icons, not in empty states. Status is carried by an Iconify glyph and a semantic colour.

---

## VISUAL FOUNDATIONS

### Colour

The palette is narrow on purpose: one green, one lime, one terracotta, and a neutral ramp. Everything else is a tint of those.

- **AAPM green `#318139`** (`--brand-green`, `hsl(135 45% 34%)`) — the primary action, the focus colour, the active nav item, chart series 1. Taken from the logo. Darker steps (`--aapm-green-800/900/950`) exist for hero gradients and photo scrims, not for UI.
- **Signal lime `hsl(77 100% 47%)`** (`--brand-lime`) — progress fills, "continue" accents, the 1px rule on the top edge of an in-progress card, focus-ring glow. Never a background for text.
- **Terracotta `#d4451a`** (`--brand-orange`) — the counterpoint, and not a minor one: **the AAPM wordmark itself is terracotta** while the rooster mark is green, so the two colours are equal partners in the identity. In UI it carries eyebrows, the admin entry point, the "in progress" lifecycle state, the learning-path progress banner and chart series 3. Used sparingly in product; it reads as *attention*, not as danger. The Academy monogram (`academy-icon.svg`) is terracotta on its own.
- **Ink `hsl(145 38% 13%)`** — the foreground. A green-shifted near-black. **Never `#000`.**
- **Neutrals** are almost pure grey (`0 0% 96/94/88/84%`) for surfaces and borders, then shift green at the dark end (`145 8% 43%` muted text, `145 29% 18%`).
- **Semantics** are the conventional four — success `142 61% 35%`, warning `38 92% 50%`, danger `0 72% 51%`, info `199 89% 48%` — plus **AI violet `262 83% 58%`**, reserved for APPI/assistant surfaces and nothing else.
- **Six tint families** (`green, lime, orange, blue, violet, slate`) each ship a wash + foreground + border triple. Category colour-coding uses these, so a tinted tile is always legible and always bordered.
- **Lifecycle colour is fixed**, not decorative: `--state-neutral` (draft/inactive), `--state-progress` (submitted/revised, terracotta), `--state-review` (in review, blue), `--state-approved` (verified/approved/completed, green), `--state-blocked` (rejected/failed/overdue, red). Warning and danger are never used just to add variety.

Dark mode exists (`.dark`) and inverts to green-black surfaces, but the products ship light-first; the theme toggle is in the header.

### Type

**Inter Variable, and only Inter.** Display, heading, body and UI all resolve to the same family — the hierarchy is carried by size, weight and tracking, never by a second typeface. Files are local (`assets/fonts/Inter-Variable.woff2`, `-Italic.woff2`, OFL licence included), so there is no font CDN dependency.

- Body default is **14px/20px** — this is an operational product, not a marketing site. 16px is for long-form lesson content and inputs.
- Metrics are **30px semibold at `-0.04em`** tracking. Page titles 24px semibold at `-0.03em`. Auth headlines 36px at `-0.045em`. Display type tightens as it grows; that negative tracking is a signature.
- Table headers use **weight 650** — deliberately between semibold and bold.
- Overlines: 10px, semibold, uppercase, `+0.16–0.18em`.
- **All numeric UI is tabular** (`font-variant-numeric: tabular-nums`), right-aligned in table cells, with stable decimal positions. Currency is right-aligned always.
- One italic serif exception: the login panel quotes use the system serif stack in italic. It appears nowhere else.

### Space, density, shape

4/8 rhythm (`--space-1` … `--space-16`). Density is a **declared page property**, not a per-component guess: `[data-density="comfortable"]` for executive dashboards and mobile task UI, default for operational dashboards and forms, `[data-density="compact"]` for large tables. Row height moves 52 → 44 → 36px.

Radii are larger than typical admin UI and this is the most distinctive shape decision:

| Token | Value | Used on |
| --- | --- | --- |
| `--radius-control` | 12px | buttons, inputs, nav items, icon tiles |
| `--radius-md` | 14px | the base `--radius` |
| `--radius-panel` | 16px | inner panels, progress cards |
| `--radius-lg` / `--card-radius` | 20px | **cards** |
| `--radius-shell` | 24px | auth card, marketing shells |
| `--radius-full` | 9999px | badges, chips, progress tracks, avatars |

Controls are 44px tall in forms (`--control-height`), 40px for default buttons, 48px for auth CTAs. Touch targets never drop below 44px on mobile.

### Cards, borders, elevation

A card is: **20px radius, 1px `hsl(0 0% 86%)` border, white fill, and a green-tinted double shadow** —
`0 1px 2px rgba(19,64,35,.06), 0 12px 26px -24px rgba(19,64,35,.34)`.
The shadow is green, not grey, and the second layer is a very wide, very negative-spread haze. It reads as lift without visible darkness.

Elevation stops at five levels and level 1 is the ceiling for resting content: 0 canvas → 1 card → 2 popover → 3 drawer/modal → 4 floating. Shadows are never stacked.

Borders come in five intents — `subtle` (50% alpha), `default`, `strong`, `interactive` (green at 35%), `focus` (green at 65%). **Not every container gets a border**: muted and tinted surfaces drop the shadow and keep the border; interactive cards drop the shadow and gain it on hover.

Signature card treatments seen throughout the Academy:
- A **full-width accent rule pinned to the top edge** of a card (`lime` for in-progress, `green` for complete, `orange` for the learning-path progress banner). This is the default accent treatment.
- A **4px left bar** appears in exactly one place in the source: the *current* module tile in the learning roadmap, in terracotta. Left accent bars are otherwise not used — reach for the top rule.
- **Tinted cards** (`bg-tint-green`, `border-tint-green-border`) for advisory content: study notes, progress summaries.
- **Dashed-border surfaces** for "nothing here yet" panels inside otherwise-complete layouts.

### Motion

Three classes only, and motion exists to explain change: **150ms** micro (colour, border, focus), **200ms** standard (hover lift, accordion), **350ms** large (drawer, modal, chart). Easing is `cubic-bezier(.22,1,.36,1)` for entrances and `cubic-bezier(.16,1,.3,1)` for emphasis — both fast-out, long-settle.

- **Hover on an interactive card**: `translateY(-2px)`, border to green/42%, shadow swaps to the hover variant. All three together, 200ms.
- **Hover on a button**: the fill darkens to 90% of itself. Never a hue change, never a scale.
- **Press**: a 1px downward nudge, primary variant only.
- **Focus**: a 3px lime glow at 20% alpha plus a green border — this is the one place lime touches every component.
- **Entrance**: `academy-rise` — 10px up, opacity 0→1, 520ms. Used on page mount, not on every card.
- The login quote rotation is the only expressive animation in the entire system: 1800ms blur-and-rise with a slight overshoot, on a 10-second cycle, and it respects `prefers-reduced-motion` by pausing the video and freezing the rotation.
- Nothing decorative delays work. No bounces, no spring, no parallax.

### Imagery and transparency

- Photography is **real farm material** — poultry houses, layer birds, egg handling, operators at work. Warm daylight, greens and creams, no filters, no duotone. The login panel plays a looping muted farm video (`/assets/Video-Web_3.mp4`).
- Over photography, always a **bottom-up green scrim**, never a flat black overlay:
  `linear-gradient(to top, green-950/.78 0%, /.48 18%, /.16 33%, transparent 48%)`. Brand marks on photography carry a hard drop shadow (`0 6px 20px rgba(0,0,0,.76)`) and sit above a blurred radial glow rather than a capsule.
- **Blur is used twice**: `backdrop-blur-xl` on the sticky header (with `bg-background/90`), and a large soft radial glow behind a logo on imagery. Not on cards, not on modals-over-content beyond the standard scrim.
- Transparency is functional — `/90` sticky surfaces, `/10` semantic tint fills, `/5` selected-row washes, `/70` borders. Alpha is always applied via the `-hsl` channel tokens (`hsl(var(--primary-hsl) / .9)`), never with a second hex.
- Gradients appear only on brand storytelling surfaces (hero green-700 → green-900) and photo scrims. **No gradient ever appears on a card, button, chart fill or ERP surface.**

### Layout

Sidebar 264px, collapsing to 76px with icon-only nav and a percentage-only progress puck. Header 73px, sticky, blurred, carrying breadcrumb-as-overline + page title on the left and workspace badge / theme / account on the right. Content max width 80rem. Mobile replaces the sidebar with a drawer plus a bottom nav bar and turns tables into cards — a task-oriented experience, not a shrunken desktop.

---

## ICONOGRAPHY

**Solar via Iconify is the family.** The Academy reaches it through a single canonical component (`AapmIcon` in the codebase, `Icon` here) with a semantic registry — feature code writes `name="approve"`, never `"solar:check-circle-bold"`. That registry is reproduced in `components/core/Icon.jsx` and carries **290 semantic keys**: the Academy's original set (navigation, actions, status, analytics, finance, inventory, farm/production, logistics, users/access, files, communication, academy, AI), the full **poultry-corporate domain set**, and general web/publishing aliases for products such as Ebook, library, reading and content discovery.

The primary family and its explicit domain extensions are resolved in strict precedence — and the split is the reason the registry exists at all:

| Family | Count | What it carries |
| --- | --- | --- |
| `solar:*` | 249 aliases / 193 glyphs | Everything Solar draws. Default for any new name. |
| `aapm:*-bold-duotone` | 2 | AAPM-owned Solar-like silhouettes for `egg` and `chicken`, where a generic glyph can lose the domain meaning at small sizes. |
| `ph:*-duotone` (Phosphor duotone) | 35 aliases / 31 glyphs | The physical and biological nouns Solar has **no glyph for**: bird, barn, tractor, plant, grains, virus, microscope, test-tube, pill, first-aid-kit, stethoscope, scales, coins, percent, truck, warehouse, factory, storefront, basket, piggy-bank, receipt, bank. Phosphor duotone is the closest stylistic cousin to Solar bold-duotone — rounded geometry, two-tone fill. |
| MingCute poultry compatibility | 2 | Raw `mingcute:egg-fill` and `mingcute:chicken-fill` maps remain available only for consumers of the earlier provider pair. |
| Provider compatibility exceptions | 6 | Raw provider escapes for poultry-industrial nouns: `healthicons:animal-chicken`, `game-icons:rooster`, `game-icons:egg-clutch`, `mdi:silo`, `mdi:corn`, `mdi:forklift`. This list is closed. |

Every name in the registry was verified against the Iconify API — Solar in particular has no `truck`, `coins`, `percent`, `microscope`, `flask`, `first-aid-kit` or `boxes`, and guessing those is how blank glyphs reach production.

Rules the codebase holds to, and this system keeps:

- **Semantic name first.** `icon="mortality"`, not a provider string. A raw `solar:*` name is the documented escape hatch for a one-off domain glyph (the codebase uses it for `solar:calculator-bold-duotone`, `solar:cup-star-bold`, `solar:user-circle-bold-duotone`).
- **`bold-duotone` for objects and domains, `bold` for status and actions, `linear` for chevrons and arrows.** Mixing stroke families inside one screen is the thing to avoid.
- Canonical sizes: **13px** inside a badge, **16px** inside a button, **19–20px** in nav and default, **24px** for section headers, **36px** for illustrative tiles.
- Status icons take the semantic colour of their state; decorative icons stay `--muted-foreground`.
- Icon-only controls always carry a `label` (rendered as `aria-label` + `title`).
- **No emoji as icons. No hand-drawn SVG.**

### The registry is the API

`components/core/Icon.jsx` exports three things, and product code should only ever touch the first:

```jsx
<Icon name="approve" size={16} />          // semantic name — the only supported usage
IconRegistry                                // { approve: "solar:check-circle-bold", … } — 290 names
IconNames                                   // string[] for typing and for the gallery
```

`guidelines/icons-gallery.card.html` renders the base registry grouped by the spec's twelve categories, and `guidelines/icons-domain.card.html` renders the poultry-corporate domain set by its twelve groups. `guidelines/iconography.md` is the reusable semantic contract, including general web/publishing aliases. Both galleries resolve each glyph **through `IconRegistry` itself** — so neither gallery can drift from the code. Adding a domain glyph means one line in the registry; nothing else changes.

### Packaging: local React data, CDN only in the static preview

React consumers use `@iconify/react` with explicit local data from `@iconify-icons/solar`, `@iconify-icons/ph`, `@iconify-icons/mingcute`, `@iconify-icons/mdi`, `@iconify-icons/healthicons` and `@iconify-icons/game-icons`. Standard application rendering makes **no Iconify CDN request**. The dependency-free HTML catalog intentionally uses the Iconify web component CDN as a preview-only exception, documented in `showcase/README.md`; it is not the production React contract:

```
@iconify-icons/*   (curated local glyph modules)
        ↓
@iconify/react       (local renderer)
        ↓  build step resolves only the names in IconRegistry
Design-System icon registry  ← the tree-shaking boundary
        ↓
<Icon name="approve" />  ← the only thing features import
        ↓
application bundle containing roughly 230 unique glyphs, not 200k
```

Because every glyph reference in the whole system passes through `IconRegistry`, the build can enumerate the exact icon set statically. Do **not** put all of Iconify into one browser bundle — the spec (§8.1) explicitly rejects that.

**Real assets copied in** (`assets/`):
- `logos/` — AAPM and Academy lockups and icons, light + dark: `aapm-logo.svg`, `aapm-logo-dark.svg`, `aapm-icon.svg`, `aapm-icon-dark.svg`, `aapm-app-icon.svg`, `academy-logo.svg`, `academy-logo-dark.svg`, `academy-logo-long.svg`, `academy-logo-long-dark.svg`, `academy-icon.svg`, `academy-icon-dark.svg`, `academy-app-icon.svg`, plus the stacked corporate lockup `aapm-logo-stacked.svg` / `-dark.svg` that the login form uses.

  **Delivery note (flag for the team):** the SVG import path in this environment strips `<style>` blocks, which silently removed the `.cls-*` fill rules from every supplied logo and APPI frame. All of them have been rewritten with **inline `fill` / `fill-rule` attributes** carrying the original values (`#318139`, `#d4451a`, `#333`, and `#fff`/`#ccc` for dark variants). They are visually identical to the originals and no longer depend on an internal stylesheet — but if you replace any of these files from the source repo, re-check that the fills survive.
- `appi/` — the **APPI companion presence set**: 12 mascot faces (`face-01.svg` … `face-12.svg`) and their 12 paired decor glyphs (`decor-01.svg` … `decor-12.svg`). `AiAvatar.jsx` pairs face *N* with decor *N* and cycles them per assistant state — idle (01), thinking (05–07), responding (08/10/12), complete (09), success (04/09), alert (11). **These are not people avatars**; learners and staff render as a tinted initial. The faces are the AAPM rooster in amber, terracotta and cream — a warmer palette than the product UI, used only for APPI surfaces.
- `illustrations/` — the domain illustration library (farm, flock, feed, egg handling, finance, logistics, inventory, status, plus the APPI mascot `aapm-ai-mascot.png`).
- `fonts/` — Inter Variable roman + italic, with the OFL licence.

Fonts are exact, not substituted. Logos are the supplied files, untouched.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link. `@import` list only.
- `tokens/` — `fonts.css`, `palette.css`, `semantic.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `dark.css`, `base.css`.
- `assets/` — `logos/`, `appi/`, `illustrations/`, `fonts/`.
- `guidelines/` — foundation specimen cards (colour, type, spacing, shape, elevation, motion, brand) plus architecture, responsive, accessibility, component-matrix, iconography, governance, master-spec review and page-template contracts.
- `readme.md`, `SKILL.md`, `github.md`, `thumbnail.html`.

**Components** (`components/<group>/`) — 90 React component modules across 10 groups

- **layout** — `AppShell`, `Sidebar`, `Topbar`, `PageContainer`, `BottomNav`
- **core** — `Button`, `IconButton`, `ButtonGroup`, `SplitButton`, `Badge`, `Chip`, `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Surface`, `Accordion`, `Icon`, `IconTile`, `Progress`, `Spinner`, `Stat`, `Divider`
- **forms** — `Input`, `Textarea`, `NumberInput`, `CurrencyInput`, `PercentInput`, `SearchInput`, `Select`, `Combobox`, `MultiSelect`, `DatePicker`, `DateRangePicker`, `TimePicker`, `DateTimePicker`, `Checkbox`, `Radio`, `Switch`, `FileUpload`, `OtpInput`, `Label`, `FormField`
- **operations** — `MilestoneTimeline`, `ProcessBoard` for lifecycle checkpoints and process/kanban work
- **data** — `DataTable`, `StatusChip`, `MetricCard`, `KeyValueList`, `Avatar`, `Skeleton`, `ProgressRing`, `AuditTimeline`, `ActivityFeed`
- **charts** — `Sparkline`, `TrendIndicator`, `BulletChart`, `BarChart`, `LineChart`, `DonutChart`, `Heatmap`
- **feedback** — `Alert`, `Toast`, `ToastProvider` / `useToast`, `ConfirmDialog`, `EmptyState`, `StateView`, `PermissionGate`
- **navigation** — `Tabs`, `Breadcrumb`, `Pagination`, `Stepper`, `NavItem`, `CommandMenu`
- **overlay** — `Modal`, `Drawer`, `Tooltip`, `Popover` (`PopoverItem`)
- **blocks** — `PageHeader`, `FilterToolbar`, `DataTableToolbar`, `KPICluster`, `TrendCard`, `ExceptionCard`, `RecordSummary`, `DetailSidebar`, `FormSection`, `TransactionDetailGrid`, `VerificationPanel`, `ApprovalPanel`, `BulkActionBar`, `ActionFooter`

**Utilities** (`utils/`) — `clamp`, `cx`, `formatNumberId`, `formatCurrencyId`, `formatPercentId`, `formatDateId`

**Runnable catalog** — `showcase/catalog.html` is the primary template-library demo for Academy, Ebook, reader, operations and auth patterns. `showcase/index.html` remains the lower-level foundation/component review surface. Both are static, dependency-light and use the same tokens, local font files and Iconify surface.

Pick-the-right-one rules the components themselves enforce:

| Question | Component |
| --- | --- |
| Read-only label or count | `Badge` |
| Removable or selectable token | `Chip` |
| Record lifecycle state | `StatusChip` |
| Number inside an existing surface | `Stat` |
| Number in a dashboard tile | `MetricCard` |
| Completion with no benchmark | `Progress` |
| Actual against a target | `BulletChart` |
| First page load | `Skeleton` / `StateView state="loading"` |
| An action in flight | `Spinner` |
| History of ONE record, oldest first | `AuditTimeline` |
| Stream across MANY records, newest first | `ActivityFeed` |
| 2–7 fixed options | `Select` |
| Searchable, or many options | `MultiSelect` |

**General shell now available.** `AppShell` / `Sidebar` / `Topbar` are product-neutral composition components in `components/layout/`. They own responsive geometry, drawer behavior, mobile safe-area handling and semantic landmarks; a product still supplies its own navigation model and route content. The Academy/admin/ERP kit shells remain the visual reference implementations and are not replaced automatically. `NavItem` remains the shared navigation primitive inside both layers.

**Composition contract.** The recommended page assembly and component selection matrix lives in `guidelines/component-matrix.md`. It separates shell, page chrome, content blocks, feedback and overlays so a new dashboard does not grow another one-off visual language.

**Intentional additions** — components with no 1:1 counterpart in the Academy source, added because the ERP specification requires them and consumers would otherwise invent them:
- `Icon` / `IconTile` wrap the Iconify surface (the codebase's `AapmIcon` + `icon-tile.jsx` equivalent).
- `StatusChip`, `MetricCard`, `TrendCard`, `ExceptionCard`, `KeyValueList`, `AuditTimeline`, `ActivityFeed`, `KPICluster`, `RecordSummary`, `DetailSidebar`, `ApprovalPanel`, `VerificationPanel`, `DataTableToolbar`, `BulkActionBar`, `ActionFooter`, `FilterToolbar`, `Stat` are the specification's named reusable blocks (§12, §14, §16).
- The `charts` group implements §16 with plain SVG — **no charting library**, so consuming projects inherit no dependency. Each answers one question: `Sparkline`/`LineChart` "is it improving?", `BarChart` "which performs better?", `BulletChart` "how far from target?", `DonutChart` "what is it made of?", `Heatmap` "where is the pattern?", `TrendIndicator` "which direction?".
- `StateView` consolidates the source's `LearningLoading` / `LearningEmptyState` / `LearningErrorState` trio into one domain-neutral component covering all nine system states. `PermissionGate` adds explicit hide/disable/message behavior around restricted actions or fields.
- `CurrencyInput`, `PercentInput`, `NumberInput`, `DatePicker`, `DateRangePicker`, `TimePicker` and `DateTimePicker` exist because §26 makes Indonesian formatting and native temporal input contracts a system concern, not a per-form concern.

**UI kits** (`ui_kits/<product>/`)
- `academy/` — Login, Dashboard, Learning Path, Module Detail, Admin Learners. Recreated from `src/pages/**` and `src/components/**`.
- `erp/` — Operational Dashboard, List Page, Master-Detail Transaction, Approval Queue. Built from the ERP specification and the Academy admin console; **no ERP source was supplied**, so these are canonical patterns rather than recreations.
