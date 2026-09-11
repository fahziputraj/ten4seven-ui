# T7-POST-Q08-Q13 — Consumer Proof Design-Language Harmonization Evidence

Status: `PASS WITH CONSTRAINTS FOR Q14`

Execution date: 2026-09-11  
Repository: `D:\SA\ten4seven-ui`  
Branch: `feat/icons-aapm-iconify-expansion`  
Baseline observed: `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`

Q13 was executed as a bounded consumer-proof harmonization job. Q14 was not
started. Existing worktree changes from earlier queue items were preserved.

## Scope and design boundary

The target was to make consumer-shaped proofs read as products built with
Ten4Seven UI while retaining their intended context and expression. The work
was limited to:

- inspecting the Publishing Store/Ebook Store, Public Showcase, Auth proofs,
  and Farm Synthetic consumer proof;
- verifying canonical shell, component, token, state, and responsive behavior;
- repairing consumer-specific focus overrides that hid the canonical focus
  treatment; and
- removing one business-specific selector from the shared PublicShell mobile
  stylesheet where the generic trailing-action rule already owns the behavior.

No business logic, data contracts, routing, permissions, authentication
behavior, fixture ownership, or production adoption claims were changed.

## Proof inventory and intentional differences

| Proof                            | Canonical composition                                                                                                                                        | Intentional difference retained                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/ebook-store`                   | `PublicShell` with `PageHeader`, `SearchInput`, `Select`, catalog cards, `DetailDrawer`, `CartPanel`, and pagination                                         | Content-led commerce/catalog hierarchy, cover-led product rhythm, filters, cart, and detail inspection remain storefront-specific.                                               |
| `/public-showcase`               | `PublicShell` with canonical buttons, charts, carousel, and expressive block compositions                                                                    | Public storytelling keeps the hero, section map, editorial sections, testimonials, pricing comparison, CTA, and public footer. It does not become an enterprise sidebar surface. |
| `/brand-proof/auth-neutral`      | Standalone Auth composition using canonical `Input`, `PasswordInput`, `Checkbox`, `Button`, `Surface`, `ActionFooter`, typography, media, and semantic icons | Auth remains a focused centered sign-in proof. The Design System sidebar is intentionally absent.                                                                                |
| `/brand-proof/auth-aapm-academy` | The same Auth recipe with the AAPM Academy BrandProfile and canonical form controls                                                                          | The split/editorial media treatment is intentionally stronger while the interaction and control contracts remain shared.                                                         |
| `/farm-synthetic-proof`          | Canonical `AppShell`, shared sidebar/header, `Select`, cards, KPI cluster, status and recovery states                                                        | Authorized Farm context navigation and synthetic fixture states remain explicit because this is a contextual reference proof, not a production Farm screen.                      |

The differences above are composition and content differences, not parallel
primitive systems. The storefront does not define the Public Showcase layout,
and the Auth proofs do not inherit a product sidebar merely for visual
uniformity.

## Drift found and corrected

### Consumer focus behavior

The Public Showcase section-map links explicitly set `outline: none` for their
hover/focus/active rule. Because the rule was more specific than the global
anchor treatment, keyboard focus could lose the canonical focus ring. The
focused state now composes `var(--t7-focus-ring)` with the existing section-map
state.

The Ebook category links use an intentional active/hover inset cue. Its
specificity previously allowed that custom `box-shadow` to replace the
canonical focus ring. The inactive and active category focus states now retain
their local cue while composing the shared `var(--t7-focus-ring)` token.

### Shared PublicShell selector ownership

The PublicShell mobile stylesheet contained a selector for
`.ebook-store-actions`, which is a business-specific wrapper inside a shared
package. The generic `.t7-navigation-menu-trailing > .t7-button` rule already
owns direct trailing buttons, and `.t7-cart-trigger` remains the only explicit
cart contract. The Ebook-specific selector was removed; no storefront behavior
was removed.

### Token and primitive review

The targeted consumer styles use semantic `--t7-*` tokens for color, type,
radius, border, shadow, motion, focus, and control treatment. Layout values
remain local composition decisions where the route needs a different grid or
content rhythm. No new raw color, radius, shadow, typography, icon-provider,
or motion-runtime path was introduced by Q13.

The audit did not perform a broad deletion of legacy unused selectors in the
dirty worktree. That inventory remains a follow-up constraint rather than an
unattributed cleanup in this queue item.

## Publishing Store principles reused

The Publishing Store was used as a benchmark for product polish and hierarchy,
not as a universal template. The reusable principles are:

- clear page-level hierarchy through canonical heading and page composition;
- a quiet neutral surface system that lets primary actions and content lead;
- contextual controls grouped with the content they affect;
- canonical buttons, inputs, menu controls, drawers, cards, and pagination;
- explicit empty, status, and recovery feedback;
- cover/media framing that supports the content without creating a second
  primitive family; and
- responsive conversion of the desktop filter rail to a canonical mobile
  filter drawer while preserving the same filter contract.

No business-specific bookstore pattern was copied into the Public Showcase,
Auth, or Farm proof. Those surfaces reuse the principles and Ten4Seven
contracts while keeping their own information architecture.

## Browser evidence

Rendered local-browser checks were performed with the headed Playwright CLI
session `q13-consumer`.

| Route / state                    | Desktop    | Mobile    | Result                                                                                                               |
| -------------------------------- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------- |
| `/ebook-store` catalog           | 1440 × 900 | 390 × 844 | PASS; catalog, category filter, empty state, detail drawer, cart, and responsive filter drawer exercised.            |
| `/public-showcase`               | 1440 × 900 | 390 × 844 | PASS; PublicShell, Explore menu, carousel advance, section map, and responsive composition exercised.                |
| `/brand-proof/auth-neutral`      | 1440 × 900 | 390 × 844 | PASS; standalone Auth surface, password visibility, form submission status, and responsive stack exercised.          |
| `/brand-proof/auth-aapm-academy` | 1440 × 900 | 390 × 844 | PASS; BrandProfile switch from Neutral, shared form contract, and responsive editorial stack exercised.              |
| `/farm-synthetic-proof`          | 1440 × 900 | 390 × 844 | PASS; shared AppShell/sidebar/header, scenario menu, error state, synthetic retry, and mobile composition exercised. |

Observed browser details:

- Desktop and mobile consumer routes reported zero horizontal overflow during
  the checks that measured `document.documentElement.scrollWidth` against the
  viewport width.
- Public Showcase section-map keyboard focus retained the canonical focus-ring
  box shadow after the correction.
- Ebook category keyboard focus retained the canonical focus ring plus the
  category cue after the correction.
- Ebook detail inspection rendered as a right-side canonical dialog/drawer;
  mobile filters rendered in the same contextual drawer pattern.
- The Farm proof exposed `Current`, `Loading`, `No data`, `Error`, `Out of
scope`, and `Not found` as canonical selection states; the `Error` state
  rendered a safe recovery action and returned to the synthetic current state
  through retry.

Captured screenshots:

- `output/playwright/q13-ebook-desktop-final.png`
- `output/playwright/q13-ebook-detail-drawer.png`
- `output/playwright/q13-ebook-mobile-filter.png`
- `output/playwright/q13-ebook-mobile-final.png`
- `output/playwright/q13-public-desktop-final.png`
- `output/playwright/q13-public-mobile-final.png`
- `output/playwright/q13-auth-neutral-desktop-final.png`
- `output/playwright/q13-auth-neutral-mobile-final.png`
- `output/playwright/q13-auth-academy-desktop-final.png`
- `output/playwright/q13-auth-academy-mobile-final.png`
- `output/playwright/q13-farm-synthetic-mobile-final.png`

## Verification ledger

| Check                    | Result      | Evidence / constraint                                                                                                                                        |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Targeted source review   | PASS        | Consumer proof routes, shared shell use, canonical component use, token use, focus ownership, and route boundaries reviewed.                                 |
| Rendered browser QA      | PASS        | The route/state matrix above was exercised in a real local headed browser; final route reloads reported zero console errors.                                 |
| Targeted evidence format | PASS        | `pnpm exec prettier --check docs/aapm/T7-POST-Q08-Q13-CONSUMER-PROOF-EVIDENCE.md` passed.                                                                    |
| Targeted CSS format      | CONSTRAINT  | `apps/playground/src/app.css` and `packages/ui/src/styles.css` remain flagged by Prettier; both contain earlier queue work, so no broad rewrite was applied. |
| `pnpm format:check`      | FAIL        | Repository-wide check reports 365 files, including existing queue files, generated artifacts, browser snapshots, and legacy source files.                    |
| `pnpm typecheck`         | PASS        | `pnpm typecheck` completed with `TYPECHECK_EXIT=0`.                                                                                                          |
| `pnpm test`              | PASS        | Full `pnpm test` chain completed all contract, token, catalog, consumer, and bridge checks.                                                                  |
| `pnpm build`             | PASS        | Playground production build completed; Vite emitted only the existing large-chunk advisory.                                                                  |
| `git diff --check`       | PASS        | Exit 0; Git reported only existing CRLF-to-LF working-copy warnings.                                                                                         |
| Q14                      | NOT STARTED | Explicit stop boundary.                                                                                                                                      |

## Constraints and unknowns

- The proofs use deterministic local fixtures. Browser PASS is not production
  adoption, API integration, authentication integration, or Farm authorization
  evidence.
- Existing worktree changes and repository-wide formatting debt predate this
  Q13 evidence. Q13 does not normalize unrelated files or claim ownership of
  their format state.
- The shared package selector cleanup is intentionally narrow. A broader
  unused-CSS inventory can be handled only as a separately bounded cleanup.
- `PUSHED`, `REVIEWED`, and `ACCEPTED` are not implied; no commit, push, merge,
  or deploy was performed.

## Q13 gate

`PASS WITH CONSTRAINTS FOR Q14`

Q13 is complete at this gate. Q14 was not started.
