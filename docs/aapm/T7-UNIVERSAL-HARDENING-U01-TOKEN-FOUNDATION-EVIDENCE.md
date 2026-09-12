# T7-UNIVERSAL-HARDENING-U01 — Token Foundation Evidence

Repository: `fahziputraj/ten4seven-ui`  
Parent: `T7-UNIVERSAL-HARDENING-001`  
Queue: `U01 — Universal Token Ownership + Cross-Platform Theme Foundation`  
Execution mode: `STRICT / BOUNDED`  
Risk: `R2 shared system foundation`

## Scope and execution boundary

This queue audited and hardened token ownership and cross-platform theme
projection only. It did not execute U02 or any later queue, did not create
`@ten4seven/native` components, did not rewrite product consumers, and did not
commit, push, merge, publish, or change deployment state.

The work was performed on branch `codex/icons-curated-solar-style` at
`e582cfcfbe0f077d1a5832d86db9da1898487fd3`. The worktree was already dirty
before U01 (276 status entries observed in the initial baseline). Existing
consumer, catalog, research, Playwright, and generated changes were preserved;
no reset, clean, broad formatting pass, or unrelated consumer migration was
performed. The worktree had 284 status entries after the bounded U01
code/generated changes; this required evidence document is the additional U01
artifact.

## Outcome summary

U01 establishes one typed ownership and resolution contract for Web and future
Native renderers:

```text
typed contracts and token runtime
  -> deterministic layer resolver
  -> ResolvedTheme semantic roles
       -> Web CSS custom-property projection
       -> renderer-neutral Native JS/TS projection
       -> DTCG / AI projections
```

The semantic color calculations now run once in the typed token runtime and are
shared by the Web CSS projection, the Native data projection, and the DTCG
snapshot. The base Web `:root` token block is generated from that same runtime;
the remaining rules in `theme.css` are browser behavior (fonts, reset, focus
rendering, forced colors, and reduced-motion media behavior), not a competing
token authority.

## Canonical source-of-truth map

| Contract concern                    | Typed owner                                                                  | Projection / consumer                                                             | Ownership decision                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Foundation vocabulary and ownership | `packages/contracts/src/foundation.ts`                                       | `generated/foundation.json`, `packages/agent/generated/foundation.json`           | The matrix, classifications, and resolution order are contract data.                                            |
| Theme axes and semantic resolution  | `packages/tokens/src/theme.ts` and `packages/contracts/src/theme-profile.ts` | `ResolvedTheme`, `buildThemeVariables`, `buildNativeThemeSnapshot`, DTCG snapshot | The typed runtime owns values and derived semantic roles.                                                       |
| Curated product recipes             | `packages/contracts/src/theme-recipe.ts`                                     | Provider, static `theme-recipes.css`, recipe catalog                              | A recipe selects approved axes; it is not a second primitive library.                                           |
| Product / brand profiles            | `packages/contracts/src/brand-profile.ts`                                    | Provider and native adapter                                                       | Profiles select approved product decisions and brand aliases only.                                              |
| Scope overrides                     | `packages/ui/src/provider.tsx`                                               | `ThemeScope` CSS variables and context                                            | A scope re-resolves the same layers; it does not create a theme engine.                                         |
| Web delivery                        | `scripts/generate-theme-recipes-css.mjs` plus `theme.css`                    | CSS custom properties and static recipe selectors                                 | CSS is derived delivery. The generated `:root` block has 464 variables in ordered parity with the typed output. |
| Native delivery                     | `buildNativeThemeSnapshot` plus `NativeResolvedProjectionContract`           | `@ten4seven/native` adapter consumers                                             | Native receives resolved JS/TS values and does not parse CSS.                                                   |
| AI / catalog retrieval              | contract projection generator                                                | `generated/agent-index.json`, foundation/native projections, DTCG exports         | AI sees the same contract plane; no manually maintained decision manifest was added.                            |

The canonical contract is exposed through `FOUNDATION_CONTRACT` in
`packages/contracts/src/foundation.ts` and registered in
`packages/contracts/src/canonical.ts`. Generated projections were refreshed by
`pnpm contracts:generate`; generated files remain compatibility outputs, not
authoring sources.

## Canonical token ownership matrix

This is the U01 matrix added to the contract plane. A layer describes who may
author or derive a value, not simply where a CSS variable happens to be used.

| Layer             | Owner and source of truth                                                                       | Dimension classes                                         | Platform   | Native strategy     | Examples / boundary                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FOUNDATION`      | Ten4Seven token runtime; `packages/tokens/src/theme.ts`                                         | `GLOBAL_CUSTOMIZABLE`, `DERIVED`, `FIXED_SYSTEM_SEMANTIC` | `BOTH`     | `SAME_INTENT`       | Primitive color ramps, reference space, type families, raw radius/elevation/motion scales, foundational sizing and icon geometry.                                                             |
| `SEMANTIC`        | Semantic resolver; `packages/contracts/src/theme-profile.ts` and `packages/tokens/src/theme.ts` | `DERIVED`, `FIXED_SYSTEM_SEMANTIC`                        | `BOTH`     | `SAME_INTENT`       | Foreground, background, surface, border, focus, action, selected, destructive, warning, success, information, disabled, and chart roles.                                                      |
| `LAYOUT`          | Token layout and recipe contract; `theme.ts` and `theme-recipe.ts`                              | `DERIVED`, `PRODUCT_PROFILE`, `COMPOSITION_LOCAL`         | `ADAPTIVE` | `ALTERNATE_PATTERN` | Page gutter, section rhythm, content/reading/compact/control/wide measures, minimum useful surface, and systemic shell dimensions. Native may arrange the same intent as a different pattern. |
| `COMPONENT`       | Component contract; `foundation.ts` and `theme.ts`                                              | `COMPONENT_SEMANTIC`, `FIXED_SYSTEM_SEMANTIC`             | `BOTH`     | `NATIVE_RENDERER`   | Control/row/touch-target measures, field/card/overlay/navigation/collection roles, component radii, elevation, and interaction timing.                                                        |
| `PRODUCT_PROFILE` | Recipe and brand profile authoring; `theme-recipe.ts` and `brand-profile.ts`                    | `PRODUCT_PROFILE`                                         | `BOTH`     | `SAME_INTENT`       | Neutral, AAPM, Academy, Publishing, Farm, and Operations selections where justified; named recipe axes and approved brand aliases. Profiles cannot redefine generic component semantics.      |
| `SCOPE`           | Bounded `ThemeScope` context; `packages/ui/src/provider.tsx`                                    | `COMPONENT_SEMANTIC`, `COMPOSITION_LOCAL`                 | `ADAPTIVE` | `SAME_INTENT`       | Inverse/contextual semantic surface and bounded typed overrides. Scope is not permission to create a local palette or parallel primitive library.                                             |

The machine-readable matrix is `TOKEN_OWNERSHIP_MATRIX`; the full contract is
`TOKEN_OWNERSHIP_CONTRACT` in `packages/contracts/src/foundation.ts`.

## Dimension ownership classification

U01 does not tokenize every number. A dimension remains local when its meaning
is local; a repeated system meaning must use the appropriate shared role.

| Classification          | Meaning                                                                  | Examples                                                      | U01 rule                                                                        |
| ----------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `GLOBAL_CUSTOMIZABLE`   | Named system axis intentionally selectable by a product or user.         | Palette, density, typography, radius, motion profile.         | Author through typed theme/profile axes.                                        |
| `DERIVED`               | Computed from foundation, semantic roles, recipe, or runtime preference. | Focus color, chart marks, surface tiers, density geometry.    | Never duplicate the calculation in CSS or a renderer.                           |
| `FIXED_SYSTEM_SEMANTIC` | Stable system obligation whose meaning does not vary by route.           | Minimum touch target, status meaning, safe-area obligation.   | Keep in the foundation/component contract.                                      |
| `PRODUCT_PROFILE`       | Approved product or brand selection, not a generic primitive value.      | AAPM brand alias, Farm density, Academy recipe.               | Keep in product profile/recipe sources.                                         |
| `COMPONENT_SEMANTIC`    | Shared value owned by every consumer of a canonical component.           | Control height, overlay width, card padding, row height.      | Add/use a component token rather than route-local duplication.                  |
| `COMPOSITION_LOCAL`     | Bounded arrangement measurement with no system-wide reuse obligation.    | One-off hero artwork offset, domain-specific plot annotation. | It may remain local; record a design-system gap if the meaning becomes generic. |

## Deterministic resolution order

The contract order is explicit and frozen as
`TOKEN_RESOLUTION_ORDER`:

```text
SYSTEM_DEFAULTS
  -> BASE_RECIPE
  -> PRODUCT_PROFILE
  -> THEME_OVERRIDE
  -> SCOPED_OVERRIDE
  -> COMPONENT_STATE
```

`resolveTokenLayers` in `packages/contracts/src/foundation.ts` applies this
order without interpreting Web or Native values. The token runtime’s
`resolveThemeConfigLayers` seeds system defaults and applies the same ordered
layers before `resolveTheme` derives semantic roles. The provider, ThemeScope,
and Native adapter now call that seam:

- `Ten4SevenProvider`: system defaults, base recipe, product profile, theme
  override, scoped/persisted override, and runtime preference handling remain
  explicit without changing the established public `ThemeConfig` API.
- `ThemeScope`: the parent resolved theme is the scoped system baseline, a
  recipe is the base recipe, and bounded object/config edits are scoped
  overrides.
- `@ten4seven/native`: a recipe is the base, a brand profile is the product
  profile, and explicit appearance/density options are theme overrides.
- `COMPONENT_STATE` is available as a deterministic renderer-level semantic
  stage and is covered by the ordered resolver test. It does not mean that
  components may invent new global axes.

Runtime `contrast`, `motion`, and the resolved system appearance remain
preference/state inputs to the existing variable builder. They are applied
after the typed theme axes in their established runtime path and are not CSS
authoring sources.

## Required audit inventory

| Audited area              | Current evidence                                                                                                                                                                                 | U01 disposition                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Theme types               | `ThemeConfig`, `ResolvedTheme`, `ThemeVariableOptions`, and the new `ThemeResolutionLayers` in `packages/tokens/src/theme.ts`; typed profile/recipe/brand contracts in `packages/contracts/src`. | Explicit ownership and layer seam added. Legacy `ThemeConfig` remains accepted.                                                     |
| Token generation          | `scripts/generate-contract-projections.mjs`, `scripts/generate-theme-recipes-css.mjs`, and `scripts/generate-dtcg-token-export.mjs`.                                                             | Generated contract, CSS, DTCG, and agent outputs remain projections. `theme.css` root generation is now tied to the typed resolver. |
| CSS variables             | `buildThemeVariables` plus `theme-recipes.css` selectors and the generated `theme.css` `:root` block.                                                                                            | Web syntax remains a delivery surface only. No CSS syntax is used as Native input.                                                  |
| Profiles and recipes      | `theme-profile.ts`, `theme-recipe.ts`, and `brand-profile.ts`, including AAPM adapters.                                                                                                          | Product decisions stay in profiles/recipes; generic component values stay in the token runtime.                                     |
| `ThemeScope`              | `packages/ui/src/provider.tsx`.                                                                                                                                                                  | Scope re-resolves the same contract and marks the legacy direct-variable escape hatch Web-only/deprecated.                          |
| Motion roles              | `resolveMotionRoles` in `theme-profile.ts`, consumed by Web and Native projections.                                                                                                              | Full/reduced motion and profile roles share one typed calculation; Native receives numeric milliseconds.                            |
| Typography roles          | `typographyProfiles` and role maps in `theme.ts`; Native maps the same roles to numeric tokens and family roles.                                                                                 | No CSS parsing in Native; concrete token values are converted in the shared runtime.                                                |
| Density                   | `densityProfiles` in `theme.ts` and density selectors in generated CSS.                                                                                                                          | Shared named density axes; Native receives numeric spacing. Touch-target minimum stays fixed at 44 px.                              |
| Contrast                  | `ThemeVariableOptions.contrast`, semantic border/muted/focus outputs, and generated contrast selector.                                                                                           | Standard/more contrast remains a runtime preference; tests cover parity of semantic roles.                                          |
| Chart colors              | Typed chart palette and semantic chart roles in `theme.ts`; DTCG and Native use the same resolved values.                                                                                        | Categorical chart colors remain independent from status meaning and product palette where the contract requires it.                 |
| Layout/composition values | `layoutGeometry`, `referenceSpace`, recipe composition, component geometry, and local route styles.                                                                                              | Systemic values remain typed; composition-local values are not mass-tokenized.                                                      |
| Product profile overrides | `brand-profile.ts`, AAPM brand adapter, Theme Studio profile conversion.                                                                                                                         | Profile axes/brand aliases flow through `PRODUCT_PROFILE`; no component-level brand values added.                                   |
| Generated assets          | `generated/foundation.json`, `generated/native-mobile.json`, their `packages/agent/generated` mirrors, and the existing catalog/AI projections.                                                  | Refreshed via the existing generator. No second decision manifest or hand-edited generated source introduced.                       |

## Representative consumer audit

These surfaces were inspected as evidence of current consumption and drift;
U01 deliberately does not migrate every consumer.

| Surface          | Source evidence                                                                                           | Observed token/ownership behavior                                                                                                                | Classification and decision                                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Theme Studio     | `apps/playground/src/token-foundations.tsx`, `apps/playground/src/App.tsx`                                | Intentionally introspects `buildThemeVariables` and computed CSS to show live token values and source labels.                                    | `UTILITY_OR_PROVIDER` / system harness. This is a debugger, not a second theme engine; no rewrite.     |
| Component Lab    | `apps/playground/src/component-proofs.tsx`, `component-preview-fixtures.tsx`, and `reference-harness.tsx` | Uses provider, ThemeScope, and canonical components. A few fixture/color-picker literals are present for proof data.                             | `COMPOSITE_BLOCK` / harness fixture. Raw fixture colors are `COMPOSITION_LOCAL` evidence and deferred. |
| Auth             | `apps/playground/src/brand-expression.tsx`                                                                | Uses `ThemeScope` and the canonical auth recipe with neutral/AAPM profile variations; composition CSS remains local layout.                      | `RECIPE_OR_PATTERN` plus `PRODUCT_PROFILE`. No parallel primitive or token source observed.            |
| Public Showcase  | `apps/playground/src/public-showcase.tsx`                                                                 | Uses public composition and canonical styling; one decorative bar height is inline percentage data.                                              | `DOMAIN_COMPOSITION` / `COMPOSITION_LOCAL`. The chart fixture is not a generic token and is deferred.  |
| Publishing Store | `apps/playground/src/reference-screens.tsx` (`EbookStoreCatalog`)                                         | Uses `PublicShell`, navigation, commerce primitives, cards, and product compositions.                                                            | `DOMAIN_COMPOSITION` using canonical primitives. No storefront primitive family added.                 |
| Operations       | `apps/playground/src/reference-screens.tsx` (`OperationsTracker`)                                         | Uses `AppShell`, `PageHeader`, `DataTable`, and operational recipe composition.                                                                  | `DOMAIN_COMPOSITION` using canonical collection primitives. No consumer rewrite.                       |
| Farm             | `apps/playground/src/farm-p1-reference.tsx`                                                               | Uses `ThemeScope` with the Farm profile recipe, `AppShell`, `DataTable`, and local shell arrangement; fixture disclaimer remains consumer-owned. | `ADAPTIVE` / `DOMAIN_COMPOSITION`. Farm product adoption/runtime remains outside U01 and unverified.   |

Additional observed drift outside the bounded correction includes raw fixture
hex values, local `color-mix` expressions, and app-local dimensions in the
playground/adoption surfaces. These were classified as fixture or composition
evidence and not mass-migrated. The generated catalog currently contains 167
canonical components and 29 recipes but does not yet carry complete platform
and classification metadata for every entry; that is an audit finding for a
later bounded queue, not an invented U01 fix.

## Implemented bounded corrections

1. Added the typed ownership layers, dimension classifications, platform/native
   strategy vocabulary, exact resolution order, ownership matrix, and
   compatibility contract to `packages/contracts/src/foundation.ts`.
2. Registered the foundation contract in `CANONICAL_CONTRACTS` and regenerated
   the existing AI/agent projections.
3. Added the renderer-neutral Native resolved theme contract to
   `packages/contracts/src/native-mobile.ts`, including the CSS-independent
   output format (`opaque-srgb-hex`, numeric px, numeric ms).
4. Added `resolveThemeConfigLayers` and a shared semantic color-role resolver to
   `packages/tokens/src/theme.ts`. Web CSS variables, DTCG snapshots, and
   Native data now consume the same semantic calculations.
5. Added `buildNativeThemeSnapshot`, which emits numeric, CSS-independent
   Native values. It converts concrete typed runtime values inside the shared
   runtime; it never reads CSS custom properties and never parses CSS.
6. Updated `@ten4seven/native` to consume the Native projection directly and
   preserve its public adapter result shape and descriptor behavior.
7. Updated `Ten4SevenProvider` and `ThemeScope` to make layer ownership and
   re-resolution explicit while preserving existing recipe, preference,
   persistence, and scope behavior.
8. Updated the theme generator so `packages/tokens/src/theme.css`’s `:root`
   token block is generated from the typed resolver. The font and browser
   behavior rules remain in the authored CSS file.
9. Added deterministic tests for default, recipe, product profile, theme
   override, scoped override, component-state order, light/dark, contrast,
   reduced motion, Web/native parity, and generated base CSS parity.
10. Added Native source/contract assertions to
    `scripts/verify-native-mobile.mjs` so CSS-variable maps cannot silently
    return as a Native source.

## Web projection proof

- `buildThemeVariables(resolveTheme())` returns 464 typed CSS custom-property
  values for the default resolved theme.
- The generated `:root` block in `packages/tokens/src/theme.css` contains the
  same 464 names in the same order; the parity test and a direct projection
  check both passed.
- `scripts/generate-theme-recipes-css.mjs` continues to generate the named
  recipe/mode, density, contrast, and reduced-motion selectors in
  `packages/tokens/src/theme-recipes.css`.
- `theme.css` still owns only Web browser behavior outside the generated root
  token block: font faces, reset/box sizing, scrollbars, focus-visible
  rendering, forced colors, and the operating-system reduced-motion media
  contract.
- Running `pnpm themes:generate` twice is idempotent: the base stylesheet
  retained one generated marker and the SHA-256 remained
  `CA566E06B304DD4B01DF8F5E67F12241136B6C1D714FC999625B8F4FD970FF50`.
- DTCG output now consumes the typed semantic color-role result directly
  rather than reading a CSS-variable map.

## Native-ready projection proof

`NativeResolvedThemeVariant` contains:

- semantic colors as opaque six-digit sRGB hex strings;
- typography role values as numeric font size, line height, letter spacing,
  constrained weight, and family role;
- density-aware spacing and radius values as numbers in px;
- motion roles as numeric milliseconds plus an explicit `enabled` flag;
- the fixed 44 px touch-target floor and resolved density.

`NativeResolvedProjectionContract` records the source and format in the typed
Native contract. `packages/native/src/index.ts` contains no `--t7-` references,
CSS `var(` parsing, `buildThemeVariables` calls, or `hslToHex` calls. No
React Native, Expo, DOM, CSS, SVG, persistence, network, or business-authority
dependency was introduced. No `@ten4seven/native` component implementation was
created.

## Compatibility and deprecation notes

- Existing `ThemeConfig` input remains accepted by `resolveTheme` and the
  provider. The layer resolver normalizes it into the new explicit contract;
  existing named palette, recipe, density, radius, typography, and elevation
  values remain valid.
- Existing Web CSS custom-property names remain the delivery API for CSS-first
  consumers. They are compatibility output, not Native input or a new source
  of truth.
- `ThemeOverrides.variables` remains available for a deliberate bounded Web
  exception and is now annotated `@deprecated`; prefer typed `config` and
  semantic axes. Native projections intentionally ignore it.
- The public Native aliases `NativeThemeVariant`, `NativeTypographyToken`, and
  `NativeFontWeight` remain available while their definitions are sourced from
  the shared contract.
- Existing recipe IDs, product profiles, aliases, component count, and route
  contracts were not renamed or removed. Existing consumer behavior and
  business/domain boundaries were preserved.
- Existing `theme.css` browser behavior remains authored and compatible. Only
  its root token declarations became generated from the typed resolver.

## Verification evidence

### U01-focused and prerequisite checks

| Command                                                            | Result                                  | Evidence                                                                                                                                                    |
| ------------------------------------------------------------------ | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm --filter @ten4seven/tokens test`                             | PASS                                    | 34 tests across the theme and foundation suites, including layer order, Web/native parity, light/dark, contrast, reduced motion, and generated root parity. |
| `pnpm --filter @ten4seven/contracts typecheck`                     | PASS                                    | Typed ownership/native contract compiles.                                                                                                                   |
| `pnpm --filter @ten4seven/native typecheck`                        | PASS                                    | Native adapter compiles without a renderer dependency.                                                                                                      |
| `pnpm test:contracts`                                              | PASS                                    | Generated contract projections agree with typed contracts; 6 aliases and 29 recipes verified.                                                               |
| `pnpm test:native-mobile`                                          | PASS                                    | Generated Native contract, CSS-independent projection metadata, descriptors, semantic icons, accessibility, and Farm proof agree.                           |
| `pnpm test:dtcg`                                                   | PASS                                    | Three deterministic DTCG outputs and exact-source snapshots verified.                                                                                       |
| `pnpm themes:generate` twice                                       | PASS                                    | Base Web and recipe projections are repeatable; one generated base marker and identical SHA-256 after the second run.                                       |
| `pnpm test:ai`                                                     | PASS                                    | 29 recipes, 173 components, 60 blocks, 122 icons, and cold-start retrieval verified.                                                                        |
| `pnpm exec prettier --check` on all U01-touched source/CSS/scripts | PASS                                    | All 10 U01-touched source/CSS/script files use Prettier style.                                                                                              |
| `git diff --check`                                                 | PASS with existing line-ending warnings | No whitespace error; Git reported CRLF/LF conversion warnings in already-dirty files.                                                                       |

### Required repository-wide checks

| Command                                                                                                                                                                              | Result                                                  | Boundary note                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                                                                                                                                                     | PASS                                                    | Contracts, Native, agent build/typecheck, and playground typecheck completed.                                                                                                                                                                                                                                                                                                |
| `pnpm build`                                                                                                                                                                         | PASS                                                    | Playground production build completed; Vite emitted the existing large-chunk advisory only.                                                                                                                                                                                                                                                                                  |
| `pnpm format:check`                                                                                                                                                                  | FAIL outside U01 scope                                  | Prettier flagged 356 existing/ambient files, including `.playwright-cli` captures, app/docs/research files, and other dirty worktree content. No broad formatting rewrite was authorized.                                                                                                                                                                                    |
| `pnpm test`                                                                                                                                                                          | PARTIAL / stopped at pre-existing stale coverage report | The chain passed contracts, responsive, SaaS, Farm, Native, ERP, DTCG, contrast, token governance, then stopped at `verify-component-token-coverage`: current user-edited `packages/ui/src/styles.css` computes 976 px occurrences while the preserved pre-existing `research/15-universal-v2/COMPONENT_TOKEN_COVERAGE_REPORT.md` records 962. The report was not rewritten. |
| Remaining post-stop checks (`pnpm test:slice-a`, `pnpm test:brand-expression`, `pnpm test:recipe-family`, `pnpm test:ai`, `pnpm test:component-system`, `pnpm test:tailwind-bridge`) | PASS                                                    | Package, brand, recipe, AI, component, and Tailwind checks completed separately after the unrelated stale-report stop.                                                                                                                                                                                                                                                       |

The format and full-suite findings are recorded rather than concealed. They are
not failures of the U01 ownership/resolution/native projection assertions, and
the affected user-owned files were left unchanged.

### Rendered local browser QA

Rendered direct-route QA used the existing local browser tab at
`http://127.0.0.1:4173` after refreshing the app. The local Vite server was
already running on port 4173; no second server or browser window was created.

| Direct route                     | Visible proof                                                                                                       | Resolved runtime check                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/theme-studio`                  | `Theme Studio` heading, recipe controls, live preview, ThemeScope proof, and token authoring UI rendered.           | `data-t7-theme=product`, `data-t7-mode=light`, `--t7-background-hsl=0 0% 100%`, `--t7-control-height=40px`, `--t7-duration-chart=1040ms`; `h1=Theme Studio`. |
| `/component-lab`                 | `Component Lab` heading and canonical Forms, Feedback, Overlay, Data, Commerce, Table, and chart sections rendered. | `data-t7-theme=product`, light mode, `--t7-control-height=40px`; `h1=Component Lab`.                                                                         |
| `/brand-proof/auth-neutral`      | Neutral Auth heading and email/password form rendered.                                                              | Product recipe and light semantic background resolved; `h1=Masuk ke workspace`.                                                                              |
| `/brand-proof/auth-aapm-academy` | AAPM Academy Auth heading and form rendered.                                                                        | Product recipe and light semantic background resolved; `h1=Masuk ke Academy`.                                                                                |
| `/public-showcase`               | Public showcase heading and public navigation/content rendered.                                                     | Product recipe and light semantic background resolved; public composition loaded.                                                                            |
| `/ebook-store`                   | Publishing Store heading, public commerce navigation, and catalog content rendered.                                 | Product recipe and light semantic background resolved; `h1=Buku untuk ide yang bertahan`.                                                                    |
| `/operations-tracker`            | Operations Tracker heading and operational application shell rendered.                                              | Product recipe and light semantic background resolved; `h1=Operations tracker`.                                                                              |
| `/farm-reference`                | Farm P1 Reference heading and Farm overview rendered.                                                               | Product recipe and light semantic background resolved; `h1=Farm overview`.                                                                                   |

The browser console returned no error entries after the direct-route checks.
Light/dark, contrast, and reduced-motion behavior is covered by the token
tests; browser QA in this queue confirms the live Web projection and route
rendering only.

## Evidence boundaries / unverified items

- There is no Expo or React Native runtime in this queue. Native readiness is
  proven as a renderer-neutral typed projection and adapter contract, not as a
  device render.
- Production AAPM, Academy, Publishing, Operations, and Farm adoption/runtime
  deployment was not claimed. The inspected Farm and Auth routes are local
  playground/reference proofs.
- Platform metadata completion for every existing catalog component/recipe is
  an observed follow-up gap and was not expanded into U01.
- U02 and all later queues remain untouched.

PASS FOR U02
