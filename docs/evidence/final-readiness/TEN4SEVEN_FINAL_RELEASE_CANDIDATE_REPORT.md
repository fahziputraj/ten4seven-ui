# TEN4SEVEN FINAL RELEASE CANDIDATE REPORT

TEN4SEVEN LIBRARY VERDICT: `TEN4SEVEN FINAL BUILD READY`

AAPM ADOPTION STATUS: `UNVERIFIED` for production Farm, Farm Monitoring,
Operations/Sales/SCM, ERP, Academy, and native-mobile journeys that were not
run or accepted in this isolated UI repository.

This report is the evidence record for the final-build and AAPM-readiness
program in the attached handoff. The attached handoff is treated as an
execution instruction set; repository contracts, ownership rules, runtime
results, and the evidence below are the authority for the verdict.

The two readiness definitions are intentionally independent. The ten4seven
library verdict is determined by library-owned contracts, package portability,
generic consumer proofs, deterministic visual quality, and the repository
release gates. Production AAPM consumer applications remain `AAPM ADOPTION
UNVERIFIED` until their owners run and accept the real Farm/ERP/Academy and
related journeys. Missing consumer integration does not, by itself, make the
ten4seven library conditional or block a future library `FINAL BUILD READY`
verdict.

## Identity

| Field                | Value                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| Repository           | `D:\\SA\\ten4seven-ui`                                                          |
| Isolated worktree    | `D:\\SA\\ten4seven-ui-t7-final-readiness-001`                                   |
| Comparison base      | `origin/main` at `df95c8a2f39a1023e47f3f6a155d2d0dabfb7031`                     |
| Execution base       | `origin/feat/T7-FARM-COMPOSE-001` at `66cca70a0c0e016a19affb80e9cbcff1e3db1519` |
| Checked-out head SHA | `66cca70a0c0e016a19affb80e9cbcff1e3db1519`                                      |
| Branch               | `architecture/T7-FINAL-READINESS-001`                                           |
| Date                 | `2026-09-06`                                                                    |
| Node                 | `v24.20.0`                                                                      |
| pnpm                 | `11.22.0`                                                                       |
| Playwright           | `1.62.1`                                                                        |
| Remote mutation      | None: no push, merge, PR update, or remote-ref change                           |
| AAPM ERP repository  | Not opened or modified; `D:\\SA\\aapm_prod` remains outside this proof          |

The checked-out commit is unchanged because this run deliberately leaves the
worktree reviewable and does not create an automatic commit. The worktree has
uncommitted implementation, generated-projection, test, and evidence changes.

## Scope

This run covered the final-build program from F0 through F34 within the
ten4seven UI repository and its isolated consumer fixtures. The work included:

- reconstructing the stacked baseline and preserving the existing Gate 12
  train;
- normalizing repository line endings and formatter behavior with
  `.gitattributes`, `.editorconfig`, and the generated-file-safe Prettier
  ignore rule;
- keeping typed contracts as the source of truth and regenerating the agent
  projections;
- making `@ten4seven/agent` publishable without a runtime `workspace:*`
  dependency, with bundled declarations and explicit package-build metadata;
- converting the Entity List consumer proof to install UI and agent tarballs
  in a clean, ignored workspace;
- extending root typecheck to cover the agent declaration build;
- validating the Next.js 16 / React 19 App Router consumer;
- preserving exact AAPM color-source mapping as consumer/theme input rather than
  generic ten4seven defaults;
- replacing one remaining canonical selection shadow literal with the
  `--t7-shadow-selection` semantic token;
- correcting the `apps/adoption-public` cover treatment, hero ratio, semantic
  cover boundary, and token-only local styling while preserving its catalog,
  detail, cart, filter, and theme behavior;
- aligning the Theme Studio browser assertions with the intentionally visible
  `preset` provenance label introduced by the exact-color-source contract; and
- adding this report and the AAPM compatibility matrix.

No AAPM business logic, permissions, API client, persistence, workflow
transition, tenant rule, Farm rule, ERP rule, or approval authority was moved
into ten4seven components.

## Gate status summary

| Gate                                       | Status                                                | Evidence / interpretation                                                                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F0 current-state reconstruction            | PASS                                                  | Isolated worktree pinned to `66cca70`; `origin/main` and the Gate 12 feature base recorded; unrelated worktrees preserved.                                                       |
| F1 baseline quality convergence            | PASS for changed scope                                | `pnpm typecheck`, `pnpm test`, and `pnpm build` pass; repository-wide `pnpm format:check` still reports 291 baseline files outside this closure, while targeted changed source/test checks pass. |
| F2 portable package / isolated consumer    | PASS                                                  | UI and agent tarballs install and build in the clean Entity List fixture with no runtime workspace dependency.                                                                   |
| F3 Next.js 16 / React 19 / RSC             | PASS                                                  | Next production build, strict typecheck, 3 Playwright tests, and axe pass under the fixture's declared Node >=24 runtime.                                                        |
| F4 theme / exact brand source              | PASS                                                  | Presets, exact source values, light/dark derivation, DTCG, contrast, and AAPM green/orange consumer proof pass.                                                                  |
| F5 core component consistency              | PASS                                                  | Canonical consistency and token-governance checks pass; no new parallel primitive family.                                                                                        |
| F6 operational pattern completeness        | PASS                                                  | 12 typed operational patterns have semantic parity and browser/reference coverage.                                                                                               |
| F7 StageBoard / workboard quality          | PASS as generic composition                           | Operational Kanban and process-workspace contracts compose the required anatomy; no product-specific StageBoard primitive was invented.                                          |
| F8 process / decision / eligibility        | PASS as generic composition                           | Decision-workspace and readiness-review contracts expose consumer-owned decision boundaries.                                                                                     |
| F9 revision / correction / audit           | PASS as generic composition                           | RevisionDiff, ActivityFeed, KeyValueList, and operational audit proofs pass behavior/a11y coverage.                                                                              |
| F10 enterprise DataGrid                    | PASS                                                  | AdvancedDataGrid behavior, typed editors, validation, keyboard traversal, bounded mobile owner, and reviewed current visual baselines are covered.                               |
| F11 hierarchy / context / tenant UX        | PASS as generic composition                           | HierarchyPicker, SectionNavigation, scoped context patterns, and QR contract are covered; tenant authorization remains consumer-owned.                                           |
| F12 Farm customer compatibility            | PASS as generic composition; AAPM Adoption UNVERIFIED | Synthetic authorized-context and state matrix passes; no production Farm application/API/permission acceptance was attempted.                                                    |
| F13 Farm Monitoring compatibility          | PASS as generic composition; AAPM Adoption UNVERIFIED | Metric/state/navigation composition is proven in the Farm synthetic reference; real monitoring data and tenant rules are unverified.                                             |
| F14 Operations / Sales / SCM compatibility | PASS as generic composition; AAPM Adoption UNVERIFIED | Operational reference, receipt consumer, readiness, receiving, route, and exception contracts pass; real SCM integrations are unverified.                                        |
| F15 ERP experience compatibility           | PASS as generic composition; AAPM Adoption UNVERIFIED | Dense data, forms, grid, approval, audit, and report compositions are proven; ERP runtime/DB behavior is out of scope and unverified.                                            |
| F16 Academy compatibility                  | PASS as generic composition; AAPM Adoption UNVERIFIED | Content/catalog/reader and AAPM Academy brand composition are proven; the separate Academy production runtime is unverified.                                                     |
| F17 mobile semantic compatibility          | PASS for Web semantics                                | 360/390/768 and other narrow Web journeys pass interaction/overflow checks; React Native implementation is not claimed.                                                          |
| F18 public showcase alignment              | PASS for local consumer proof                         | `apps/adoption-public` now renders as a coherent public/commerce proof, and its 4-test behavior/theme suite passes.                                                              |
| F19 playground / lab / studio alignment    | PASS                                                  | Shared shell, theme, token, component-lab, operations, public reference routes, and final direct-navigation closure remain aligned by the browser suite.                         |
| F20 global responsive QA                   | PASS                                                  | Responsive interaction, overflow, and reviewed screenshot baselines pass across desktop, wide, tablet, mobile, and narrow viewport families.                                     |
| F21 accessibility convergence              | PASS for covered surfaces                             | Adoption, Next, Farm, operational, overlay, keyboard, focus, and representative axe checks pass.                                                                                 |
| F22 system states                          | PASS                                                  | Loading, empty, no-data, error, unauthorized/safe-scope, and validation states are exercised in reference proofs.                                                                |
| F23 action availability                    | PASS                                                  | Unavailable action reasons remain keyboard and screen-reader discoverable.                                                                                                       |
| F24 design-token governance                | PASS                                                  | 284 semantic contrast pairs, token-governance, coverage, consistency, and adoption-static checks pass.                                                                           |
| F25 AI-first contract completeness         | PASS                                                  | 29 recipes, 150 compact component entries, 12 expressive blocks, 98 semantic icons, and cold-start retrieval proof pass.                                                         |
| F26 recipe maturity                        | PASS                                                  | Selective Entity List and Entity Detail family retrieval proves conditional anatomy and no full-catalog fallback.                                                                |
| F27 performance / bundle health            | PASS with v1 bundle note                              | Bundle measurements are recorded and accepted for v1: UI ESM is 10.8 MB (2.124 MB gzip), Playground is 21.8 MB (4.354 MB gzip), and Vite emits a documented large-chunk warning. |
| F28 public API audit                       | PASS                                                  | Package verification passes with 15 root exports, bundled styles/tokens/icons/motion, and self-contained published output.                                                       |
| F29 documentation convergence              | PASS for changed scope                                | Theme, component-selection, compatibility, and this evidence report document the current contracts and limitations.                                                              |
| F30 visual regression normalization        | PASS                                                  | The initial 28 screenshot failures and later navigation-closure deltas were classified/reviewed; affected snapshots were normalized, followed by final 240/240.                 |
| F31 AAPM compatibility matrix              | PASS as evidence artifact                             | Matrix is present in `AAPM_UI_COMPATIBILITY_MATRIX.md`; generic library dispositions and the separate `AAPM ADOPTION UNVERIFIED` status are explicit.                            |
| F32 final consumer proofs                  | PASS                                                  | Isolated tarball consumer, Next App Router consumer, adoption consumers, brand proof, and Tailwind bridge pass.                                                                  |
| F33 full quality suite                     | PASS                                                  | `pnpm test` and the final Node 24 browser run are green; the complete exact-RC browser matrix finished at 240/240.                                                               |
| F34 final browser QA                       | PASS                                                  | Rendered/functional review and the complete visual suite pass; AAPM production-route status remains separately tracked as `AAPM ADOPTION UNVERIFIED`.                            |

## Navigation closure

The final RC Playground shell exposes the canonical system/reference surface
as direct destinations in the requested four groups:

| Group             | Direct destinations                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `STUDIO`          | Theme Studio (`/theme-studio`); Component Lab (`/component-lab`)                                                                                                                                                   |
| `LIBRARY`         | Tokens (`/tokens`); Components (`/components`); Blocks (`/blocks`); Icons (`/icons`); Recipes (`/recipes`)                                                                                                        |
| `REFERENCES`      | Operations Tracker (`/operations-tracker`); Operational Patterns (`/operational-patterns`); Publishing Store (`/ebook-store`); Public Showcase (`/public-showcase`)                                            |
| `ADOPTION PROOFS` | Farm Synthetic (`/farm-synthetic-proof`); Auth · Neutral (`/brand-proof/auth-neutral`); Auth · AAPM Academy (`/brand-proof/auth-aapm-academy`)                                                                  |

The five Library destinations are now direct primary navigation items rather
than being represented only by a `Library` launcher. Library detail routes
retain the active parent context. Exact-RC browser closure evidence passed
`49/49` targeted tests at `http://127.0.0.1:4183`, including desktop and
320/375/390px mobile navigation, no document overflow, label geometry, direct
route reachability, bounded active-route visibility, and bounded return paths
from Farm and brand proof shells. `ADOPTION PROOFS` is visible by default. The
desktop visual label is `Auth · Academy`; the accessible/full identity remains
`Auth · AAPM Academy`, and the canonical route remains
`/brand-proof/auth-aapm-academy`.
The current Farm wording explicitly records `AAPM production adoption
unverified`; that status belongs to the production consumer DoD and does not
make the ten4seven library conditional.

This is browser automation and reviewed snapshot evidence. A manual Opera
inspection after the local server is started remains a separate human QA
activity and is not claimed as completed by this report.

## Final capability inventory

| Primitive / capability     | Recipe                                                                                                 | Contract                                                                           | Reference surface                                             | Status                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| Canonical component system | All 29 recipes                                                                                         | 144 canonical implemented components, 6 aliases, 150 compact retrieval entries     | Components, Component Lab, Tokens, Icons                      | PASS                        |
| Data and filtering         | Entity List, Catalog, Report                                                                           | DataTable, AdvancedDataGrid, FilterToolbar, DataTableColumnPicker                  | `/recipes`, `/ebook-store`, AdvancedDataGrid proof            | PASS                        |
| Record and audit work      | Entity Detail, Entity 360, Activity Audit                                                              | DetailDrawer, RevisionDiff, ActivityFeed, KeyValueList                             | Operational reference and RevisionDiff proofs                 | PASS                        |
| Workflow and decisions     | Process Workspace, Decision Workspace, Readiness Review                                                | MilestoneTracker, ApprovalPanel, StateView, StatusChip                             | Operations Tracker and operational reference                  | PASS as generic composition |
| Operations planning        | Operational Kanban, Control Tower, Load Planning, Route Planning, Receiving Console, Resource Forecast | Typed operational contracts plus canonical surfaces                                | `/operational-patterns` and receipt adoption fixture          | PASS as generic composition |
| Hierarchy and scope        | Entity 360 and consumer-owned context                                                                  | HierarchyPicker, SectionNavigation, QrCode                                         | Farm synthetic reference                                      | PASS as generic composition |
| Public / commerce          | Marketing Home, Catalog, Product Detail, Cart, Ebook Reader                                            | PublicShell, NavigationMenu, ProductGrid, ProductShowcase, CartPanel, OrderSummary | `apps/adoption-public`, `/public-showcase`, `/ebook-store`    | PASS locally                |
| Brand expression           | Authentication                                                                                         | Brand profiles and exact theme source                                              | `/brand-proof/auth-neutral`, `/brand-proof/auth-aapm-academy` | PASS                        |
| Agent retrieval            | Entity List, Entity Detail, Brand Expression                                                           | Typed decision contracts, compact projections, aliases, ownership rules            | `@ten4seven/agent` package and CLI                            | PASS                        |

## AAPM compatibility summary

The compatibility result is a UI composition result, not production acceptance.
The AAPM application owns data, permissions, APIs, calculations, persistence,
tenant/Farm/ERP rules, workflow transitions, and Brand Core composition.

| AAPM area        | What is proven here                                                                                                                                                       | What remains outside this proof                                                                    | Generic ten4seven disposition       | AAPM Adoption |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------- |
| Farm             | Authorized context selection, current overview metrics, loading/no-data/error/safe-scope states, navigation and mobile usability in a synthetic consumer.                 | Real Farm API, tenant hierarchy, permission predicates, data freshness, and production route.      | COMPOSED + PROVEN                   | UNVERIFIED    |
| Operations       | Typed operational patterns, receipt workflow, Kanban, readiness, receiving, route/load, resource, audit, and entity-360 composition.                                      | Sales/SCM APIs, workflow authority, calculation ownership, persistence, and production acceptance. | COMPOSED + PROVEN                   | UNVERIFIED    |
| ERP              | Generic dense records, editable DataGrid, forms, approval, revision, audit, and report anatomy.                                                                           | ERP application, SQL/DB evidence, ledger calculations, approval authority, and connector behavior. | COMPOSED + PROVEN                   | UNVERIFIED    |
| Academy          | Content-detail/list, reader/catalog, public shell, and `aapm-academy` brand-expression proof.                                                                             | Academy production runtime, lesson state, enrollment, permissions, and publication workflow.       | COMPOSED + PROVEN                   | UNVERIFIED    |
| Public           | `Common Ground Library` adoption route has coherent public archetype, catalog/detail/cart behavior, shared theme axes, semantic cover label, and no new primitive system. | Customer content, payment, fulfillment, analytics, and production deployment.                      | COMPOSED + PROVEN                   | UNVERIFIED    |
| Mobile semantics | Web responsive navigation, bounded controls, drawer behavior, touch-safe targets, no-document-overflow checks, and 390/360 narrow journeys.                               | Native mobile implementation and device-specific accessibility acceptance.                         | COMPOSED + PROVEN for Web semantics | UNVERIFIED    |

## Packaging

### UI package

- `@ten4seven/ui@1.0.0` package build and verification pass.
- Published tarball: `artifacts/consumer-proof/ten4seven-ui-1.0.0.tgz`;
  observed size `8,868,788` bytes.
- Package verification reports 15 root exports, bundled tokens/icons/motion,
  self-contained styles, and generated fonts/license notices.

### Agent package

- `@ten4seven/agent@0.1.0` builds runtime files and bundled declaration files.
- Published tarball: `artifacts/consumer-proof/ten4seven-agent-0.1.0.tgz`;
  observed size `67,614` bytes.
- `dist/package-build.json` records no workspace runtime dependencies and the
  generated projection root.
- The declaration graph now resolves the package-root alias back to the
  portable contracts source, so the Rollup unresolved-import warning is gone.
  The resulting declarations were checked for `src/`, `workspace:`,
  `@ten4seven/contracts`, `index.ts`, and `.mts` leaks and contain none.
  Package verification and the isolated consumer pass.

### Isolated consumer

`pnpm test:slice-a` builds both tarballs, installs them under
`--ignore-workspace`, runs strict TypeScript, runs an isolated Vite build, and
executes the installed runtime. It passes with the default nine-contract
resolution, reduced five-contract omission, domain-data-free composition, and
public package-boundary assertions.

### Next / RSC

`pnpm test:next-consumer` passes installation, strict typecheck, Next.js 16.3.4
production build, explicit client-boundary hydration, interaction, and axe
coverage (3/3 browser tests) under Node `v24.20.0`, matching the fixture's
declared Node `>=24.0.0` engine.

## Theme

- Preset themes: typed profiles and recipe metadata pass contract, token,
  browser, and DTCG checks.
- Exact custom colors: `#318139` is proven as the AAPM green primary source and
  `#D4451A` as the AAPM orange accent source in the Next consumer, token tests,
  DTCG export, contract, and contrast proofs.
- Light/dark: semantic variables, inverse scopes, reduced motion, high
  contrast, system preference behavior, and CSS-first delivery are covered by
  the root browser/adoption suites.
- Ownership: generic ten4seven defaults remain neutral; the AAPM mapping is an
  explicit consumer/theme profile input. No AAPM brand choice was hard-coded
  into generic component anatomy.

## Accessibility

The covered Web surfaces pass the representative accessibility gates: adoption
consumer axe checks, Next App Router axe smoke, Farm synthetic axe, operational
axe, public interaction axe, canonical overlay/keyboard checks, focus
restoration, semantic Select/Combobox/MultiSelect behavior, and unavailable
action reason discoverability. The report does not claim native-mobile or
production AAPM accessibility acceptance.

## Responsive

Automated coverage includes desktop/wide/tablet/mobile/narrow viewport families,
including 1440, 1280, 1024, 768, 390, and 360 classes across system, operations,
public, catalog, Farm synthetic, and adoption surfaces. Functional, document
overflow, and final screenshot assertions pass for the covered journeys.

## C1 screenshot-delta classification and closure

The first C1 run after the implementation alignment was `205/233` passed and
`28` failed. Every failure was a screenshot assertion; there were no functional,
accessibility, routing, or console-error failures. Each expected/actual pair and
representative diff was inspected before changing snapshots. The classification
record below is the complete 28-test disposition. `Actual/diff evidence` records
what was visible in the Playwright failure attachment during triage; Playwright
cleans transient failure attachments after a subsequent passing run.

|   # | Test / viewport                            | Expected snapshot                                                                                             | Actual/diff evidence                                                                                                                                | Classification         | Disposition                                                                          |
| --: | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------ |
|   1 | AdvancedDataGrid desktop                   | `tests/advanced-data-grid.spec.ts-snapshots/advanced-data-grid-desktop-chromium-win32.png`                    | Action-icon pixels only; representative diff was bounded to a tiny icon region (`37/48` compared pixels), with identical geometry and content.      | ENVIRONMENT DRIFT      | Normalize the current deterministic Chromium baseline; no source fix.                |
|   2 | AdvancedDataGrid mobile                    | `tests/advanced-data-grid.spec.ts-snapshots/advanced-data-grid-mobile-chromium-win32.png`                     | Same action-icon/token rendering delta inside the bounded mobile owner; no overflow, editor, or keyboard change.                                    | ENVIRONMENT DRIFT      | Normalize the current deterministic Chromium baseline; no source fix.                |
|   3 | Public Showcase expressive, desktop 1440   | `tests/expressive-blocks.spec.ts-snapshots/public-showcase-desktop-1440x900-chromium-win32.png`               | Current emerald/green chart and public expression differed from the old blue-primary expected image; layout and section order matched.              | INTENDED DESIGN CHANGE | Adopt the current public-theme baseline.                                             |
|   4 | Public Showcase expressive, wide 1280      | `tests/expressive-blocks.spec.ts-snapshots/public-showcase-wide-1280x800-chromium-win32.png`                  | Same current public-theme color/source change; no geometry or content regression.                                                                   | INTENDED DESIGN CHANGE | Adopt the current public-theme baseline.                                             |
|   5 | Public Showcase expressive, tablet 1024    | `tests/expressive-blocks.spec.ts-snapshots/public-showcase-tablet-1024x900-chromium-win32.png`                | Same current public-theme color/source change; responsive composition remained bounded.                                                             | INTENDED DESIGN CHANGE | Adopt the current public-theme baseline.                                             |
|   6 | Public Showcase expressive, tablet 768     | `tests/expressive-blocks.spec.ts-snapshots/public-showcase-tablet-768x900-chromium-win32.png`                 | Same current public-theme color/source change; no wrapping or overflow regression.                                                                  | INTENDED DESIGN CHANGE | Adopt the current public-theme baseline.                                             |
|   7 | Public Showcase expressive, mobile 390     | `tests/expressive-blocks.spec.ts-snapshots/public-showcase-mobile-390x844-chromium-win32.png`                 | Same current public-theme color/source change; mobile section and CTA geometry matched current source.                                              | INTENDED DESIGN CHANGE | Adopt the current public-theme baseline.                                             |
|   8 | RevisionDiff desktop                       | `tests/operational-patterns.spec.ts-snapshots/revision-diff-desktop-chromium-win32.png`                       | Semantic stack, changed facts, provenance, and geometry matched; only small anti-alias/token pixels differed.                                       | ENVIRONMENT DRIFT      | Normalize the reviewed current baseline; no source fix.                              |
|   9 | RevisionDiff mobile                        | `tests/operational-patterns.spec.ts-snapshots/revision-diff-mobile-chromium-win32.png`                        | Same small rendering delta; every field remained visible and stacked in the same order.                                                             | ENVIRONMENT DRIFT      | Normalize the reviewed current baseline; no source fix.                              |
|  10 | Operational Control Tower, dark preference | `tests/operational-patterns.spec.ts-snapshots/operational-control-tower-dark-chromium-win32.png`              | Current shared theme/settings surface and semantic accent differed from the old expected image; no interaction or contrast failure.                 | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  11 | Operational Control Tower, desktop         | `tests/operational-patterns.spec.ts-snapshots/operational-control-tower-desktop-chromium-win32.png`           | Current shared theme/settings surface differed; control-tower anatomy and geometry matched.                                                         | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  12 | Operational Process Workspace, desktop     | `tests/operational-patterns.spec.ts-snapshots/operational-process-workspace-desktop-chromium-win32.png`       | Current semantic theme surface differed; process stages, status, and action anatomy matched.                                                        | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  13 | Operational Load Route, desktop            | `tests/operational-patterns.spec.ts-snapshots/operational-load-route-desktop-chromium-win32.png`              | Current semantic theme surface differed; load/route content and responsive owner matched.                                                           | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  14 | Operational Receiving, desktop             | `tests/operational-patterns.spec.ts-snapshots/operational-receiving-desktop-chromium-win32.png`               | Current semantic theme surface differed; receiving evidence and decision anatomy matched.                                                           | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  15 | Operational Entity 360, desktop            | `tests/operational-patterns.spec.ts-snapshots/operational-entity-360-desktop-chromium-win32.png`              | Actual included the current page-local `SectionNavigation`; the old expected image predated commit `813d766`, while entity context remained intact. | INTENDED DESIGN CHANGE | Adopt the current SectionNavigation baseline; retain consumer-owned scope semantics. |
|  16 | Operational Load Route, mobile             | `tests/operational-patterns.spec.ts-snapshots/operational-load-route-mobile-chromium-win32.png`               | Current semantic theme surface differed; mobile controls remained bounded and usable.                                                               | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  17 | Operational Receiving, mobile              | `tests/operational-patterns.spec.ts-snapshots/operational-receiving-mobile-chromium-win32.png`                | Current semantic theme surface differed; mobile evidence/decision stack remained readable.                                                          | INTENDED DESIGN CHANGE | Adopt the current operational-theme baseline.                                        |
|  18 | Public Showcase enterprise expression      | `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-enterprise-expression-chromium-win32.png` | Current neutral public hero/emerald expression differed from the old primary-color hero; section semantics and bounds matched.                      | INTENDED DESIGN CHANGE | Adopt the current exact-source/public-expression baseline.                           |
|  19 | Components catalog, desktop                | `tests/visual-regression.spec.ts-snapshots/components-desktop-chromium-win32.png`                             | Current catalog visibly reflected the expanded implemented component/contract surface; no broken route or layout was observed.                      | INTENDED DESIGN CHANGE | Adopt the current catalog baseline.                                                  |
|  20 | Components catalog, wide                   | `tests/visual-regression.spec.ts-snapshots/components-wide-chromium-win32.png`                                | Same current catalog expansion; wide layout remained stable.                                                                                        | INTENDED DESIGN CHANGE | Adopt the current catalog baseline.                                                  |
|  21 | Components catalog, tablet                 | `tests/visual-regression.spec.ts-snapshots/components-tablet-chromium-win32.png`                              | Same current catalog expansion; tablet navigation/content remained bounded.                                                                         | INTENDED DESIGN CHANGE | Adopt the current catalog baseline.                                                  |
|  22 | Components catalog, mobile                 | `tests/visual-regression.spec.ts-snapshots/components-mobile-chromium-win32.png`                              | Same current catalog expansion; mobile drawer and catalog anchors remained usable.                                                                  | INTENDED DESIGN CHANGE | Adopt the current catalog baseline.                                                  |
|  23 | Components catalog, narrow                 | `tests/visual-regression.spec.ts-snapshots/components-narrow-chromium-win32.png`                              | Same current catalog expansion; narrow content remained readable without document overflow.                                                         | INTENDED DESIGN CHANGE | Adopt the current catalog baseline.                                                  |
|  24 | Recipes catalog, desktop                   | `tests/visual-regression.spec.ts-snapshots/recipes-desktop-chromium-win32.png`                                | Current catalog showed the implemented 29-recipe surface versus the old 28-recipe expected image; no broken route was observed.                     | INTENDED DESIGN CHANGE | Adopt the current recipe baseline.                                                   |
|  25 | Recipes catalog, wide                      | `tests/visual-regression.spec.ts-snapshots/recipes-wide-chromium-win32.png`                                   | Same current recipe-surface expansion; wide layout remained stable.                                                                                 | INTENDED DESIGN CHANGE | Adopt the current recipe baseline.                                                   |
|  26 | Recipes catalog, tablet                    | `tests/visual-regression.spec.ts-snapshots/recipes-tablet-chromium-win32.png`                                 | Same current recipe-surface expansion; tablet navigation/content remained bounded.                                                                  | INTENDED DESIGN CHANGE | Adopt the current recipe baseline.                                                   |
|  27 | Recipes catalog, mobile                    | `tests/visual-regression.spec.ts-snapshots/recipes-mobile-chromium-win32.png`                                 | Same current recipe-surface expansion; mobile drawer and recipe anchors remained usable.                                                            | INTENDED DESIGN CHANGE | Adopt the current recipe baseline.                                                   |
|  28 | Recipes catalog, narrow                    | `tests/visual-regression.spec.ts-snapshots/recipes-narrow-chromium-win32.png`                                 | Same current recipe-surface expansion; narrow content remained readable without document overflow.                                                  | INTENDED DESIGN CHANGE | Adopt the current recipe baseline.                                                   |

Only the five affected pre-closure spec snapshot sets were updated:
AdvancedDataGrid, expressive blocks, operational patterns, public-showcase
expression, and visual regression. The pre-navigation-closure focused rerun
passed `84/84`, and the pre-closure full rerun passed `233/233` under Node
`v24.20.0`. The requested direct navigation closure added six tests plus the
associated reviewed snapshot updates; the final discoverability closure added
one active-scroll/label test; the final exact-RC full rerun passed `240/240`
under the same Node runtime.

## Public showcase

### Before

The local `apps/adoption-public` route had a very tall hero media frame and a
flat cover whose oversized two-letter initials dominated the visual identity.
That made the consumer feel disconnected from the public showcase and the
shared ten4seven visual grammar even though its behavior and route structure
were sound.

### After

The hero media now uses a bounded editorial ratio. The cover uses category
context, a semantic `T7Icon`, title/author composition, a restrained rule, and
token-based geometric accents. The cover remains an image-labeled semantic
boundary so the visual title is not announced twice in the cart/detail stack.
Spacing uses existing section/control/page/card tokens; no consumer primitive,
raw color literal, or local motion runtime was introduced.

### Why it belongs to the same system

The route uses `PublicShell`, `NavigationMenu`, `PageHeader`, `Hero`,
`ProductShowcase`, `ContentShowcase`, `CtaBlock`, `PublicFooter`, `ProductGrid`,
`DetailDrawer`, `CartPanel`, `CartLineItem`, and `OrderSummary` from the
canonical layer. Its behavior/theme suite passes 4/4, its static adoption and
cold-start proofs pass, and the rendered Chrome review now shows a public
editorial surface with the same typography, spacing, radius, semantic token,
focus, and responsive language as the rest of ten4seven.

## Quality commands

| Command                                                                                                                                | Result                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                                                                                                    | BASELINE FAIL — 291 repository files outside this closure remain unformatted; targeted changed source/test check passes                              |
| `pnpm typecheck`                                                                                                                       | PASS — contracts, agent, agent declaration build, playground                                                                                      |
| `pnpm test`                                                                                                                            | PASS — contracts, DTCG, contrast, token governance, coverage, Slice A, brand, recipes, tokens, AI, component system, Tailwind bridge              |
| `pnpm build`                                                                                                                           | PASS — Node 24 Playground production build; Vite large-chunk warning accepted as the documented v1 bundle note                                    |
| `pnpm --filter @ten4seven/adoption-public typecheck`                                                                                   | PASS                                                                                                                                              |
| `pnpm --filter @ten4seven/adoption-public build`                                                                                       | PASS — Vite large-chunk warning accepted as the documented v1 bundle note                                                                         |
| `pnpm test:adoption`                                                                                                                   | PASS — 4/4                                                                                                                                        |
| `pnpm test:adoption:static`                                                                                                            | PASS — 2 isolated consumers, 0 new primitives, 0 parallel systems, 0 raw external icon imports, 0 local color literals, cold-start retrieval pass |
| `pnpm test:consistency`                                                                                                                | PASS — 24 UI source files                                                                                                                         |
| `pnpm test:next-consumer`                                                                                                              | PASS — Node 24.20.0 install, typecheck, production build, and 3/3 Playwright/axe; no engine warning                                               |
| `pnpm test:slice-a`                                                                                                                    | PASS — isolated tarball consumer                                                                                                                  |
| `pnpm package:build`                                                                                                                   | PASS                                                                                                                                              |
| `pnpm package:verify`                                                                                                                  | PASS                                                                                                                                              |
| `pnpm exec playwright test tests/final-stabilization.spec.ts:25 tests/system-coherence.spec.ts:593 tests/system-coherence.spec.ts:652` | PASS — 3/3 after aligning assertions with exact-color-source provenance                                                                           |
| exact-RC full Playwright matrix                                                                                                        | PASS — Node 24.20.0: 240/240 passed in 12.3 minutes using the temporary 4183 proof config; the 4173 server stayed untouched                           |

## Browser QA

Rendered/automated routes reviewed in this worktree include:

- `http://127.0.0.1:4173/theme-studio`
- `http://127.0.0.1:4173/component-lab`
- `http://127.0.0.1:4173/tokens`
- `http://127.0.0.1:4173/components`
- `http://127.0.0.1:4173/blocks`
- `http://127.0.0.1:4173/recipes`
- `http://127.0.0.1:4173/operations-tracker`
- `http://127.0.0.1:4173/operational-patterns`
- `http://127.0.0.1:4173/farm-synthetic-proof`
- `http://127.0.0.1:4173/ebook-store`
- `http://127.0.0.1:4173/public-showcase`
- `http://127.0.0.1:4173/brand-proof/auth-neutral`
- `http://127.0.0.1:4173/brand-proof/auth-aapm-academy`
- `http://127.0.0.1:4174/` for the adoption public consumer
- `http://127.0.0.1:4174/catalog` and product/detail/cart paths through the
  adoption consumer journey

The adoption route was manually rendered at desktop size after the cover
correction and passed its automated behavior/theme/narrow-viewport checks. The
main Playground public showcase was manually rendered in light and dark at
320, 375, 768, 1024, and 1440px widths. At the 320px boundary the public
navigation is an intentional bounded horizontal scroll owner (`304px` viewport,
`343px` content; `Stories` is reachable at the maximum `39px` scroll offset),
while document scroll width remains exactly the viewport width; at 375px and
above all labels fit without scrolling. A production AAPM URL was not invented
or substituted for this local evidence.

## Remaining limitations

1. Published UI, Playground, and adoption bundles are large because the
   current package includes the bundled icon/catalog surface. The measured v1
   disposition is accepted, while code-splitting or a measured icon subset can
   be a later performance gate.
2. No production AAPM Farm, Operations, ERP, Academy, or mobile repository was
   changed or accepted. Their API, permission, persistence, tenant, workflow,
   calculation, and deployment evidence is still required from the respective
   consumer owners. This is an `AAPM ADOPTION UNVERIFIED` finding, not a
   ten4seven library defect or an automatic library-release blocker.
3. `ECO-ADR-007` provider selection remains unresolved in the external AAPM
   architecture boundary; this repository does not pretend to settle it.

## Breaking changes

- No root `@ten4seven/ui` export removal or primitive contract break was
  observed; package verification reports the same 15 root exports.
- `@ten4seven/agent` now resolves its public exports to built `dist` runtime and
  bundled declaration files and no longer declares a runtime `workspace:*`
  dependency. This is the intended portable-package boundary; consumers that
  imported private source files rather than package exports are not supported.
- The Entity List proof fixture now installs packed UI/agent artifacts rather
  than local workspace directories. This strengthens the proof and is not a
  production consumer break.
- Theme Studio diagnostic assertions now include `preset` provenance for preset
  sources. This reflects the existing exact-color-source behavior and does not
  change the public UI package API.

## Compatibility risk

`MEDIUM`.

The generic package and isolated consumer evidence is strong and the complete
functional/interaction/visual gates pass. Library risk remains medium because
the accepted v1 bundles are large and the production consumer boundary is not
tested here. Separately, AAPM production adoption remains `UNVERIFIED`; that
consumer status is not used as a library-owned blocker.

## Final verdict

`TEN4SEVEN FINAL BUILD READY`

All library-owned closure gates pass: the classified visual deltas are closed
by the reviewed targeted snapshot-set updates and a final `240/240` browser run;
Node `v24.20.0` proves the declared Next consumer engine; the declaration
warning is removed and the declaration graph is leak-free; package and isolated
consumer proofs pass; and the measured bundle-size tradeoff is explicitly
accepted for v1. This verdict is for the ten4seven library and generic
consumer/reference proofs only.

Production Farm, Farm Monitoring, Operations/Sales/SCM, ERP, Academy, native
mobile, and any other real AAPM consumer remains `AAPM ADOPTION UNVERIFIED`.
That is a separate consumer Definition of Done and is not a reason to keep the
already-closed ten4seven library conditional.

## Recommended next gate

1. Track the AAPM consumer-owner run against real Farm, Farm Monitoring,
   Operations/Sales/SCM, ERP, Academy, native-mobile, and deployment journeys
   as the separate `AAPM ADOPTION UNVERIFIED` gate. Keep business logic,
   authorization, persistence, calculations, and workflow transitions in those
   consumers; do not use their absence to downgrade the complete ten4seven
   library.
2. Review this isolated diff and explicitly decide whether to merge, tag, or
   publish. The bounded closure commit and its Draft PR publication are
   separate from merge authorization; no merge, auto-merge, tag, release, or
   npm publication is implied by this evidence.
