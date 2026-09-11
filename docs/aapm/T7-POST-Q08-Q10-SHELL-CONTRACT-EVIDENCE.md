# T7-POST-Q08-Q10 — Shell Contract and Component Lab Geometry Evidence

## Scope and ownership

- This evidence covers Q10 only: shell contract and Component Lab geometry authority.
- Component Lab is the golden reference for the standard private-library shell.
- Q09 remains complete as previously recorded. Q11 has not been started.
- The change is presentation-layer work: shell metadata, shared geometry ownership, CSS composition, and browser tests. It does not establish or alter business authority, permissions, entitlements, persistence, Farm authority, ERP calculations, or route data contracts.
- The existing dirty worktree was preserved. No reset, cleanup, broad formatting rewrite, commit, push, merge, or deployment was performed.

## SOURCE baseline and authority

The existing ten4seven token and shell layers are the source of truth:

- `packages/tokens/src/theme.ts` owns the layout geometry and semantic aliases, including the 232px sidebar, 64px header, responsive page gutter, data rail, control gaps, navigation icon size, menu height, panel radius, and raised-surface elevation.
- `packages/ui/src/styles.css` owns the canonical `AppShell`, `Sidebar`, `NavItem`, topbar, and mobile shell behavior.
- `apps/playground/src/playground-chrome.tsx` owns the shared Playground sidebar/topbar composition; no second navigation primitive was created.
- `apps/playground/src/playground-routes.ts` is the route metadata owner and now records the shell presentation variant.
- `apps/playground/src/app.css` composes the route shells from those tokens. The new `--t7-shell-*` names are local semantic hooks to existing tokens, not independent geometry values.

Before Q10, the Studio shell still owned presentation geometry locally: a 244px grid rail, a `1260px` content cap, and a viewport-dependent padding clamp. At 1440px this placed the Studio H1 at approximately x=292px, and at 1024px at approximately x=285px. The canonical reference AppShell placed the same content origin at x=275.2px and x=262.7px respectively.

## OBSERVED measured grammar

Measurements below are from direct local-browser inspection after the change. The 1440px and 1024px page gutters resolve from the shared responsive token; the 390px value is the canonical mobile shell gutter.

| Measurement            | Shared owner                              | 1440px desktop | 1024px intermediate |                        390px mobile |
| ---------------------- | ----------------------------------------- | -------------: | ------------------: | ----------------------------------: |
| Sidebar rail           | `--t7-sidebar-width`                      |          232px |               232px | collapsed/hidden from document flow |
| Topbar height          | `--t7-header-height`                      |           64px |                64px |                                64px |
| Page gutter            | `--t7-page-gutter` plus safe-area aliases |         43.2px |             30.72px |              16px mobile shell rule |
| Content maximum        | `--t7-content-max`                        |     1440px cap |          1440px cap |                full available width |
| Navigation item height | `--t7-menu-height`                        |           40px |                40px |                mobile menu contract |
| Navigation icon        | `--t7-icon-navigation`                    |           18px |                18px |                                18px |
| Panel radius           | `--t7-radius-panel`                       |           16px |                16px |                                16px |
| Raised elevation       | `--t7-shadow-raised`                      |   shared token |        shared token |                        shared token |
| Studio H1 origin       | shell content origin + gutter             |      x=275.2px |           x=262.7px |                              x=16px |

The same desktop H1/content origin was observed on Operations Tracker, Operational Patterns, ERP Density Reference, and Farm P1 Reference. On mobile, those reference routes preserve x=16px and document width equals viewport width. No tested route produced horizontal document overflow.

Vertical structure is now expressed through the existing section and control rhythm tokens: `--t7-section-gap`, `--t7-control-gap-sm`, and `--t7-control-gap-lg`. Active/focus treatment, borders, radius, elevation, and typography remain owned by the canonical component/token layers rather than by route-specific colors or geometry.

## Contract model

The shell contract is explicit and inspectable without changing the public primitive API:

- `standard`: Component Lab, Tokens, Components, Blocks, Icons, Recipes, and other standard library surfaces.
- `workbench`: Theme Studio, where the editor/preview relationship is intentionally part of the route composition.
- `wide`: genuinely data-dense reference surfaces such as Operations Tracker and ERP Density Reference.
- `contextual`: reference workspaces with an additional local/context navigation relationship, including Operational Patterns, SaaS Control Plane, and Farm P1 Reference.

Studio routes receive `data-shell-contract="reference-shell"` and a metadata-driven `data-shell-variant`. Existing private/reference `AppShell` routes receive the same contract marker and their explicit variant. Public Showcase and Publishing Store remain on `PublicShell`; that is a deliberate shell-family exception, not an accidental geometry fork.

The global sidebar and topbar remain the shared `Sidebar`/`NavItem` and Playground chrome owners. The route-level header remains the existing shared header composition; the Q10 change makes the surrounding shell coordinate system and variant contract explicit instead of duplicating a page-heading shell inside each route.

## Implementation record

- `apps/playground/src/playground-routes.ts`
  - Added the `PlaygroundShellVariant` type and one route-to-variant map.
  - Kept the map presentation-only; route permissions and business behavior remain elsewhere.
- `apps/playground/src/App.tsx`
  - Marked the Studio shell with the reference contract and metadata-driven variant.
- `apps/playground/src/app.css`
  - Replaced Studio’s local 244px rail, 1260px content cap, and local padding with shared shell/page tokens.
  - Added desktop shell alignment, shared section/control rhythm, safe-area handling, and tokenized navigation containment.
  - Added the wide/contextual content and contextual-navigation hooks for reference AppShell routes.
  - Kept the package mobile AppShell gutter and mobile visibility behavior authoritative.
- Reference route files for Operations Tracker, Operational Patterns, SaaS Control Plane, ERP Density Reference, Farm P1 Reference, and Farm Synthetic Proof
  - Added explicit shell contract and variant metadata to the existing AppShell instances.
- `tests/q10-shell-contract.spec.ts`
  - Added direct route/viewport checks for shell markers, token-resolved sidebar/topbar geometry, H1 alignment, mobile containment, and reference variant coverage.

## Deliberate exceptions

- Theme Studio remains a `workbench` because its editor/preview split is part of its job; it uses the shared outer shell coordinate system while retaining its bounded workbench composition.
- Wide and contextual reference routes may use the existing data-rail width and density profile. This does not authorize route-local geometry values or a second shell system.
- Public routes continue using `PublicShell` and `NavigationMenu` according to the shell grammar; they were not converted to an enterprise sidebar.
- Mobile uses the canonical package/AppShell responsive behavior: the sidebar is collapsed from the page flow, the mobile menu remains available, and the content gutter is 16px.
- The repository-wide format check still sees inherited formatting drift across the pre-existing dirty worktree. No mass formatting change was made as part of Q10.

## Verification

| Check                         | Result             | Evidence                                                                                                                                                                                                                                                                                     |
| ----------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript                    | PASS               | `pnpm typecheck` exited 0.                                                                                                                                                                                                                                                                   |
| Unit/contract suite           | PASS               | `pnpm test` exited 0; the repository verification chain passed.                                                                                                                                                                                                                              |
| Consistency                   | PASS               | `pnpm test:consistency` reported canonical consistency across 25 UI source files.                                                                                                                                                                                                            |
| Build                         | PASS               | `pnpm build` exited 0; only the existing large-chunk warning was reported.                                                                                                                                                                                                                   |
| Diff whitespace               | PASS WITH WARNINGS | `git diff --check` found no whitespace errors; existing CRLF/LF drift produced warnings.                                                                                                                                                                                                     |
| Q04/Q10 focused browser tests | PASS               | 25/25 passed: responsive shell, mobile navigation, navigation closure, and Q10 shell contract.                                                                                                                                                                                               |
| Direct browser matrix         | PASS               | Component Lab, Tokens, Theme Studio, Operations Tracker, Operational Patterns, ERP Density Reference, and Farm P1 Reference loaded directly at 1440px, 1024px, and 390px with no document overflow or captured console/page/request errors.                                                  |
| Repository e2e suite          | CONSTRAINED        | 203/267 passed and 64 failed. Q10 tests and the relevant Q04–Q08 shell tests passed; the remaining failures are inherited visual/interaction baselines across screenshots, tooltip expectations, prior profile counts, and other pre-existing route fixtures. No Q10 shell assertion failed. |
| Repository format check       | CONSTRAINED        | `pnpm format:check` reported 300 files with inherited/pre-existing formatting warnings. The new Q10 test was formatted and checked separately.                                                                                                                                               |

## Business-authority confirmation

Q10 changed only shell presentation metadata, shared CSS composition, and test coverage. No business-authority source, data, permission, validation, persistence, calculation, or deployment behavior was changed or confirmed by this work. Runtime claims above are limited to local rendered-browser observations.

## Gate

PASS WITH CONSTRAINTS FOR Q11

STOP.
