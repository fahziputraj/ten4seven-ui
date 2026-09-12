# DWO — T7-SYSTEM-HARDENING-H01A

## Authentication Composition Fidelity Evidence

Work item: `T7-SYSTEM-HARDENING-H01A`

Repository: `fahziputraj/ten4seven-ui`

Execution date: `2026-09-12` (Asia/Jakarta)

Execution mode: `CREATIVE / BOUNDED`

Risk: `R1 — visual/reference surface with one canonical primitive hardening`

Branch: `codex/icons-curated-solar-style`

Starting and ending HEAD: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`

No commit, push, PR, merge, deployment, or publication was performed.

## 1. Scope and authority

The H01 prerequisite evidence is
`docs/aapm/T7-SYSTEM-HARDENING-H01-ROUTE-RUNTIME-IDENTITY-EVIDENCE.md`, whose
bounded gate is `PASS FOR H01A`. This execution covers H01A only. H01B, H01C,
and H01D were not implemented or reworked.

The authoritative design correction supplied by the owner superseded the
previous H01A interpretation. Its geometry is the acceptance authority:

- full viewport with no generic Ten4Seven Studio/product shell;
- quiet left auth pane at roughly 44–50% of the desktop viewport;
- bounded, vertically balanced login content inside the pane;
- AAPM Academy mark above `Masuk ke Academy` and one short supporting line;
- email, password with a separately named visibility button, recovery action,
  full-width primary submit, and account-creation line;
- full-height, edge-to-edge media in the remaining right pane;
- no inset media card, floating auth card, profile switcher, marketing hero,
  large headline below the media, or visible design-system proof language;
- desktop split, controlled tablet compression, and mobile auth-first
  recomposition with no horizontal overflow.

The supplied authority was a textual wireframe correction rather than a local
image artifact. The rendered local-browser capture and the focused responsive
suite are therefore the runtime visual evidence for that geometry.

## 2. Before / after

| Area                   | Before H01A correction                                                                                                     | After H01A correction                                                                                                                                    | Evidence                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Page composition       | Generic proof header, profile switcher, media card, explanatory story copy, and a separate auth surface                    | Full-viewport auth recipe with only the product-facing split geometry                                                                                    | SOURCE and RUNTIME: PASS                                  |
| Academy identity       | Generic editorial proof language such as `Brand expression proof`, `Same Authentication recipe`, and `Consumer media slot` | AAPM Academy mark, `Masuk ke Academy`, and one short Academy support sentence                                                                            | SOURCE/RUNTIME: PASS                                      |
| Auth pane              | Form was presented as a rounded/shadowed `Surface` card                                                                    | `Surface` remains the semantic pane element, but its border, radius, and shadow are reset so the pane itself is the composition surface                  | SOURCE/RUNTIME: PASS                                      |
| Desktop geometry       | Centered/variable proof composition with unused canvas                                                                     | `0.9fr / 1.1fr` split: left auth pane, right full-height media pane                                                                                      | RUNTIME: PASS at 1440, 1024, and 768; visual capture PASS |
| Media                  | Inset ratio card with surrounding spacing and profile-specific placement                                                   | `MediaFrame`/`Image` fill the right pane; `object-fit: cover`, no inset radius or border                                                                 | RUNTIME: PASS                                             |
| Form anatomy           | Email, password, remember-device checkbox, recovery button, and `Continue`                                                 | Email, password, recovery link, full-width `Masuk`, and account-creation line; Checkbox is not forced because the approved wireframe does not require it | SOURCE/RUNTIME: PASS                                      |
| Password accessibility | Browser AX exposed the textbox as `Password Show password Use at least 8 characters.`                                      | Textbox name is only `Password`; help text is referenced by `aria-describedby`; visibility control is a separately named button                          | AX/RUNTIME: PASS                                          |
| Route entrance         | Auth route used the general staged route opacity and could remain blank during the critical first frame                    | Auth route is marked immediate while retaining the existing staged behavior for other routes                                                             | SOURCE/RUNTIME: PASS                                      |

## 3. H01A files touched

The repository was already substantially dirty before this bounded execution.
The files below were edited in place only for the H01A scope; unrelated dirty
changes were not reset, cleaned, normalized, staged, or reformatted.

| File                                                           | H01A change                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apps/playground/src/brand-expression.tsx`                     | Replaced the rejected proof composition with one auth-first split recipe for both profile routes. Added `ThemeScope`, product-facing profile copy, flat auth pane, full-bleed media pane, recovery/account links, and the bounded demo submit state.                           |
| `apps/playground/src/app.css`                                  | Removed the unreachable legacy H01A header/story/form-card CSS, retained the shared `.sr-only` utility used elsewhere, and added tokenized H01A pane geometry, measures, full-width action layout, media crop, desktop/tablet/mobile breakpoints, and reduced-motion behavior. |
| `apps/playground/src/App.tsx`                                  | Added a route-local `data-route-immediate` option so the auth route's critical content is readable immediately; removed the profile-switcher callback from the auth consumer.                                                                                                  |
| `apps/playground/src/playground-routes.ts`                     | Changed auth route metadata descriptions from proof language to product-facing sign-in descriptions.                                                                                                                                                                           |
| `packages/ui/src/forms.tsx`                                    | Hardened the canonical `PasswordInput`: separate `<label>`, input wrapper, and help text; preserve caller `aria-describedby`; remove `aria-pressed` so the visibility action remains a button in the browser AX tree.                                                          |
| `tests/brand-expression.spec.ts`                               | Replaced the old composition assertions with H01A geometry, copy, accessibility, responsive, interaction, reduced-motion, and dark-mode assertions.                                                                                                                            |
| `docs/aapm/T7-SYSTEM-HARDENING-H01A-AUTH-FIDELITY-EVIDENCE.md` | This evidence artifact.                                                                                                                                                                                                                                                        |

Build outputs under package `dist` were rebuilt as part of runtime/build
verification but are not source changes in the bounded H01A list.

## 4. Canonical contract and primitive usage

The agent-facing retrieval order was followed through `generated/agent-index.json`
and the compact recipe/component projections before editing. The generated
`auth` recipe requires the following anatomy:

- `Surface`;
- `Input`;
- `PasswordInput`; and
- `ActionFooter`.

The implementation uses those required primitives plus canonical `Button`,
`Typography`, `ThemeScope`, `MediaFrame`, `Image`, and semantic `T7Icon`.
There is no local Button, Input, password control, Card, media primitive, or
parallel auth component family.

`Surface as="section"` is intentionally used as the pane's semantic region,
not as a decorative card. The local composition CSS resets the pane's
`border`, `border-radius`, `box-shadow`, and background treatment so
uniformity comes from shared primitives and semantic tokens rather than from
forcing card geometry onto the approved reference.

`ActionFooter` remains the canonical action composition. H01A gives its
consumer-owned layout a single stretched grid column, places the recovery link
above the primary action, and makes the canonical `Button` fill the bounded
form measure.

`ThemeScope` selects `product` for the neutral profile and `editorial` for
Academy while forwarding the host appearance setting and selecting the
profile's density. This keeps profile-owned expression separate from the
recipe-owned split geometry.

No authentication backend, permissions, identity architecture, Theme Studio,
global token definition, Public Showcase, Ebook Store, or component-library
expansion was performed.

## 5. Geometry and responsive evidence

The focused suite uses the required responsive matrix:

| Viewport   | Neutral | Academy | Acceptance                                                                                                                  |
| ---------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1440 × 900 | PASS    | PASS    | Split pane; auth width constrained to 40–50% range; media reaches top/right/bottom; form stays within pane and one viewport |
| 1024 × 768 | PASS    | PASS    | Controlled two-pane compression; no horizontal overflow; bounded form and media                                             |
| 768 × 900  | PASS    | PASS    | Two-pane tablet composition remains usable; no horizontal overflow                                                          |
| 390 × 844  | PASS    | PASS    | Single-column recomposition; auth pane comes before media; media is bounded and no desktop shrinkage is used                |

At the 1440 desktop assertion, the grid resolves to approximately `648px`
auth / `792px` media. The form measure is at most `420px`; the primary
`Masuk` button matches that form width. Both the auth pane and media pane have
zero border radius, and the media image reports `object-fit: cover`.

The local in-app browser rendered the Academy route at a 1280 × 720 viewport
with the same geometry: a `576px` auth pane and `704px` media pane, both
full-height; a `420px` bounded form; zero horizontal overflow; and no visible
proof/header/profile-switcher copy. The capture showed the Academy mark and
auth task on the quiet left pane and the artwork filling the right edge.

The mobile assertion explicitly checks that the media pane begins at or below
the auth pane's bottom and retains a minimum visual height of `220px`. The
auth form remains the first task in DOM and visual order.

## 6. Neutral versus Academy

| Concern           | Neutral product                                                   | AAPM Academy                             | Shared recipe boundary                                                         |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| Route             | `/brand-proof/auth-neutral`                                       | `/brand-proof/auth-aapm-academy`         | Both remain refresh-safe direct routes                                         |
| Brand mark/copy   | `ten4seven`; `Masuk ke workspace`                                 | `AAPM Academy`; `Masuk ke Academy`       | Mark and intentional copy are profile-owned                                    |
| Theme expression  | `product`, default density                                        | `editorial`, comfortable density         | `ThemeScope` resolves profile expression without changing pane geometry        |
| Media expression  | Neutral low-prominence treatment                                  | Academy high-prominence treatment        | Same full-bleed media slot placement and crop contract                         |
| Geometry          | Same split grid and bounded form measure                          | Same split grid and bounded form measure | One `auth` recipe; no independently maintained auth UI                         |
| Controls          | Email, Password, Show password, recovery, Masuk, account creation | Same                                     | Same canonical component list: `Surface,Input,PasswordInput,ActionFooter`      |
| Profile switching | Not rendered inside the auth route                                | Not rendered inside the auth route       | Profile selection remains route-level/QA context, never production auth chrome |

The runtime comparison at 1280 × 720 measured both profiles at `576px` auth /
`704px` media, with identical zero-radius pane treatment, `420px` form
measure, `cover` media crop, and zero horizontal overflow. Only brand,
copy, theme expression, density, and media treatment differ.

## 7. Accessibility and interaction evidence

The fresh local-browser accessibility snapshot for Academy exposed:

- region `Masuk ke Academy`;
- image/mark `AAPM Academy`;
- heading `Masuk ke Academy` at level 1;
- textbox `Email`;
- textbox `Password`;
- separately named button `Show password`;
- visible text `Use at least 8 characters.`;
- link `Lupa kata sandi?`;
- button `Masuk`; and
- link `Buat akun`.

The password input's generated hint id is the only help relationship added to
the input when no caller description is supplied. Existing caller-provided
`aria-describedby` values are merged rather than discarded. The label is a
real label associated with the input only; the visibility action is outside
that label. The button changes its name to `Hide password` and toggles the
native input type from `password` to `text`.

The focused interaction test fills the canonical fields, toggles visibility,
submits the bounded demo form, and observes the live status
`Permintaan masuk diterima untuk demo.` No real auth request is made.

The immediate route marker prevents a critical-content blank state. A fresh
local-browser tab reported no console errors after direct navigation, rendered
the Academy heading, and contained none of the rejected proof-language strings
in the DOM snapshot. Reduced-motion mode removes the Academy image transform;
the dark-mode test confirms the host's official theme-studio runtime setting
resolves `data-t7-mode="dark"` without changing the approved composition.

## 8. Verification

| Command / check                                                                   | Result                         | Evidence or bounded classification                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:brand-expression`                                                      | PASS                           | Brand expression resolver, two profiles, one canonical auth recipe, zero agent-owned brand decisions, and AAPM adapter verification passed.                                                                             |
| `pnpm exec playwright test tests/brand-expression.spec.ts`                        | PASS                           | `10 passed`; includes 1440/1024/768/390 matrix, both profiles, full-width action, no proof copy, password AX contract, mobile interaction, reduced motion, and dark mode.                                               |
| Local in-app browser direct Academy route                                         | PASS                           | Fresh tab rendered the approved composition and clean console (`errors: []`).                                                                                                                                           |
| `pnpm typecheck`                                                                  | PASS                           | Contracts, native, agent build, and playground typecheck completed.                                                                                                                                                     |
| `pnpm test`                                                                       | PASS                           | Full static/package/token/catalog/recipe/brand/component gate completed successfully after the final H01A source state.                                                                                                 |
| `pnpm build`                                                                      | PASS                           | Playground production build completed; existing large-chunk warning remains.                                                                                                                                            |
| Targeted `pnpm exec prettier --check` for H01A TypeScript/TSX/test/evidence files | PASS                           | H01A TypeScript/TSX/test/evidence files use Prettier style; the dirty shared `App.tsx`/`app.css` files remain covered by the inherited repository-wide result.                                                          |
| `pnpm format:check`                                                               | FAIL — inherited baseline debt | Current repository-wide run returned exit code `1` with `356` warnings spanning inherited `.playwright-cli` captures, docs, generated/user-owned surfaces, and unrelated dirty source. No broad reformat was performed. |
| `git diff --check` for H01A source/test files                                     | PASS                           | No whitespace errors in the bounded source/test diff.                                                                                                                                                                   |

The repository-wide Prettier result is not H01A-caused and does not block this
bounded visual gate under the supplied execution override. The full static
test and production build are green, and the H01A-specific rendered suite is
green.

## 9. Known follow-ups

1. H01B may be evaluated separately under its own authoritative reference and
   gate; it was deliberately not executed in this turn.
2. The auth demo links still point to the existing local `/public-showcase`
   route because real account/recovery backend behavior is out of scope.
3. The existing repository-wide formatting debt remains outside H01A and
   should be handled by its owning cleanup queue rather than by a broad
   reformat during this visual task.

## 10. Gate

PASS FOR H01B

Bounded gate rationale: H01A now matches the supplied authoritative
split-screen auth geometry; both profiles share one canonical recipe; the
Academy route has no production-visible proof chrome; the media is full-bleed;
the submit action fills the bounded form measure; mobile recomposes auth first;
the password accessible-name separation is verified in the browser AX tree;
standard/reduced-motion and host-enabled dark-mode checks pass; and the
focused 10-test suite, full static test, typecheck, and production build are
green. The repository-wide format warning set is retained as inherited
baseline debt. H01B was not run. STOP after H01A.
