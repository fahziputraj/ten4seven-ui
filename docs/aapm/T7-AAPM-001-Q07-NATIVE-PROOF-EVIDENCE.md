# T7-AAPM-001-Q07 — Native Mobile Contract and Adapter Evidence

**Date:** 2026-09-11  
**Repository:** `D:\SA\ten4seven-ui`  
**Branch:** `feat/icons-aapm-iconify-expansion`  
**Queue reference:** `T7-AAPM-001-Q07-NATIVE-MOBILE-CONTRACT-AND-ADAPTER.md`  
**Predecessor gate:** `PASS WITH CONSTRAINTS FOR Q07` from Q06  
**Scope:** shared native-mobile contract, bounded adapter proof, generated
projections, semantic icon compatibility, and existing Web compatibility

## Gate outcome

**PASS WITH CONSTRAINTS FOR Q08**

Q07 establishes the shared boundary needed for a future AAPM native consumer:

`shared semantics/tokens/icon meanings → Web implementation + Native adapter`

The proof is intentionally an adapter contract and descriptor layer. This
checkout does not contain an Expo or React Native consumer, native framework
dependency, device/emulator harness, or native build target. Therefore Q07
does not claim a native launch, screenshot, touch-device, or assistive-
technology runtime pass. The constraint is explicit and concrete rather than
being hidden behind a Web-only screenshot.

The attached queue document was treated as the bounded Q07 acceptance and
evidence reference. It did not authorize a real Farm Mobile API, auth provider,
offline engine, app-store setup, business-rule replacement, or publication
action. Q08 was not started.

## Architecture chosen

Q07 uses the smallest safe implementation that proves the contract without
inventing a second product library:

| Boundary               | Implementation                                                                   | Ownership                                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Shared contract        | `packages/contracts/src/native-mobile.ts`                                        | Ten4Seven semantic roles, state vocabulary, token references, icon meanings, accessibility requirements, and platform ownership rules |
| Native adapter         | `packages/native/src/index.ts` as `@ten4seven/native`                            | Resolves existing contracts and tokens into renderer-neutral theme variants and descriptors                                           |
| Web implementation     | Existing `@ten4seven/ui`, provider, ThemeScope, routes, and canonical components | Existing DOM/CSS rendering and Web interaction mechanics remain the compatibility target                                              |
| Generated retrieval    | `generated/native-mobile.json` and `packages/agent/generated/native-mobile.json` | Agent-facing projection generated from the typed contract; no second hand-authored decision manifest                                  |
| Future native consumer | Not present in this checkout                                                     | The AAPM app will map descriptors to platform controls and own navigation, auth, storage, sync, permissions, and business behavior    |

The adapter imports only `@ten4seven/contracts` and `@ten4seven/tokens`. It has
no import from `@ten4seven/ui`, `@ten4seven/icons`, React, React DOM, CSS, SVG,
DOM APIs, browser storage, native framework packages, or a second motion
runtime. The adapter emits names such as `Pressable`, `TextInput`, and `View`
as renderer-neutral primitive descriptors; these strings are not a native
implementation claim.

## Contract coverage

`NATIVE_MOBILE_CONTRACT` covers:

- semantic canvas, surface, text, border, focus, action, accent, and status
  color roles;
- explicit AAPM brand-role mappings for `primary`, `accent`, `highlight`,
  `surface`, and `text`;
- screen title, section heading, body, label, caption, button, and metric
  typography intents;
- density-aware control, row, card, section, control-gap, field-gap, and
  minimum touch-target geometry;
- control, card, and panel radius roles;
- the existing `fast`, `interaction`, `state`, `enter`, `exit`, `reveal`,
  `chart`, and `loop` motion roles;
- primary, secondary, quiet, and danger action intents;
- default, focused, invalid, disabled, read-only, and pending field states;
- neutral, info, success, warning, and danger feedback states;
- the existing module lifecycle IDs from the shared module-state contract;
- `local`, `pending`, `syncing`, `synced`, `failed`, `conflicted`,
  `requires-action`, and `stale` sync presentation states;
- semantic icon names and their meanings, without provider strings; and
- light, dark, and system appearance, plus all four existing density profiles.

The native adapter resolves both light and dark variants even when the caller
requests `system`. A future platform consumer selects the variant from the
operating-system color scheme. It does not need a second palette or a second
theme provider.

## Parity matrix

| Contract area         | Shared semantic contract                                                                                                     | Web implementation                                                             | Native implementation/adapter                                                                                                                       | Platform-specific behavior                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Brand and theme       | Brand roles, profile ID, recipe, appearance, density                                                                         | Existing provider and `ThemeScope` resolve the Web token variables             | `resolveNativeTheme()` resolves the selected brand profile and recipe into light/dark numeric/color variants                                        | Native app chooses OS scheme and owns native theme plumbing                                   |
| AAPM colors           | `brand.primary`, `brand.accent`, and semantic action/status roles                                                            | Existing AAPM profile adapter feeds the Web theme                              | `aapm-farm` resolves primary `#318139` and accent `#D4451A` through `resolveAapmBrandColor()`; HSL compatibility values are converted to opaque hex | Native renderer decides how color values are registered in its platform theme                 |
| Typography            | Intent-to-role mappings use existing `heading-lg`, `heading-md`, `body`, `label`, `caption`, `button`, and `metric-lg` roles | CSS typography variables and canonical components                              | Numeric font size/line height, normalized 400/500/600/700 weight, letter-spacing, and family role                                                   | Font loading and platform font-family resolution remain native-consumer concerns              |
| Spacing and density   | Existing density profiles and component geometry token references                                                            | CSS variables such as control height and card padding                          | Numeric values derived from the same comfortable/default/compact/dense profiles                                                                     | Native layout units and safe-area insets are platform concerns                                |
| Radius and surfaces   | Existing control/card/panel radius and surface roles                                                                         | Canonical cards, panels, and surfaces render Web elevation and focus treatment | Descriptor exposes surface token roles and numeric radius variants; it does not copy shadow recipes                                                 | Native elevation/shadow mechanics are platform-specific                                       |
| Actions               | Primary, secondary, quiet, danger intents plus shared interaction states                                                     | Canonical `Button`/action family                                               | `createNativeButton()` emits a `Pressable` descriptor with intent, token roles, disabled state, and minimum touch-target token                      | Press feedback, haptics, and platform activation are native-consumer concerns                 |
| Fields and validation | Shared input intent and invalid/disabled/pending semantics                                                                   | Canonical `Input`/`Field` family and Web focus behavior                        | `createNativeInput()` emits a `TextInput` descriptor with label, value, state, role, and announcement state                                         | Keyboard type, input method, autofill, and focus navigation are native-consumer concerns      |
| Feedback and status   | Shared feedback tones, icons, and status presentation                                                                        | Canonical alert/status/feedback components                                     | `createNativeFeedback()` and `createNativeSyncStatus()` emit visible state plus screen-reader status semantics                                      | Native live-region announcement mechanics are platform-specific                               |
| Icons                 | Semantic names and meanings only                                                                                             | Existing `T7Icon`/canonical icon registry                                      | `resolveNativeIcon()` returns meaning metadata; no Web SVG implementation is imported                                                               | Native app supplies a platform icon renderer for the same semantic name                       |
| Module lifecycle      | Existing module-state IDs and consumer ownership                                                                             | Existing `ModuleState` presentation contract                                   | Contract reuses the same IDs; adapter does not evaluate entitlement, permission, or lifecycle authority                                             | Consumer/platform supplies actual applicability and transitions                               |
| Offline and sync      | Presentation vocabulary only                                                                                                 | Web consumers may present the same shared states                               | Adapter presents the eight sync states and maps them to tone/icon/accessible status                                                                 | Product owns queue, retry, ordering, cursors, conflict resolution, persistence, and transport |
| Farm daily operation  | Shared action/input/card/feedback/sync semantics                                                                             | Q06 Farm route is a static Web reference fixture                               | `createFarmDailyOperationProof()` composes five fields, one action, feedback, local sync, and the AAPM Farm theme                                   | AAPM Mobile owns real Farm data, calculations, validation authority, and writes               |
| Motion                | Existing motion role map and reduced-motion preference                                                                       | Web components consume the existing `t7Motion`/theme motion tokens             | Adapter exposes role milliseconds and `enabled: false` for reduced motion                                                                           | Native animation APIs and OS accessibility settings are native-consumer concerns              |

## Native proof surface

The executable adapter proof exposes:

```text
resolveNativeTheme()
createNativeButton()
createNativeInput()
createNativeCard()
createNativeFeedback()
createNativeSyncStatus()
resolveNativeIcon()
createFarmDailyOperationProof()
```

The Farm composition contains the five product-supplied input values expected
for the first daily-operation slice: operation date, eggs collected, feed
intake, flock population, and mortality. It includes a `Pressable` action, a
neutral status message, and the `local` sync state. It deliberately contains
no calculations, API calls, save handler, persistence, authentication,
permissions, entitlement evaluation, or business-rule authority.

## Accessibility and touch findings

The descriptor proof verifies that:

- actions expose a `button` role, visible label, action hint, disabled state,
  and the shared `component.interaction.touchTarget.minimum` token;
- fields expose a `textinput` role, visible label, value, and explicit
  invalid, disabled, read-only, or busy announcement state;
- cards expose a `summary` role and status/feedback surfaces expose a `status`
  role;
- invalid, disabled, busy, and sync states are not communicated through color
  alone; and
- the resolved minimum touch target is at least 44px from the existing token
  source for the tested comfortable Farm profile.

Actual native screen-reader traversal, hit-area measurement on a device,
keyboard behavior, safe-area rendering, and reduced-motion OS setting behavior
were not executed because there is no native consumer or device harness in the
checkout. These are Q08/product-consumer evidence requirements, not silently
reclassified as adapter passes.

## Offline/sync ownership boundary

Ten4Seven owns only the reusable presentation vocabulary:

`local → pending → syncing → synced → failed → conflicted → requires-action → stale`

It maps each state to a shared presentation state, feedback tone, semantic
icon, and accessible status descriptor. It does not decide when a record is
queued, how a retry is scheduled, which cursor is authoritative, how a token is
refreshed, how a conflict is merged, or whether a Farm operation may be
committed. Those decisions remain with the AAPM Mobile product and its
consumer-owned domain/runtime layers.

## Semantic icon compatibility

The proof uses the semantic names `farm`, `egg`, `chicken`, `inventory`,
`table`, `pending`, `refresh`, `check`, `danger`, `warning`, `info`,
`fileCheck`, `settings`, and `clock`.

The verifier cross-checks every name against both:

- `packages/ai/catalog/icons.json`; and
- the canonical `packages/icons/src/index.tsx` registry source.

No raw Iconify provider string or native-specific icon set was added. A future
native renderer must preserve these meanings while choosing its own platform
asset implementation.

## Evidence and validation

| Check                                         | Result                                  | Evidence / constraint                                                                                                                                                                                                                  |
| --------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                     | PASS                                    | Generated the typed native-mobile projection in both generated roots; no second decision manifest was created                                                                                                                          |
| `pnpm --filter @ten4seven/native typecheck`   | PASS                                    | Adapter compiles with only shared contracts/tokens and no native/Web renderer dependency                                                                                                                                               |
| `pnpm test:native-mobile`                     | PASS                                    | Contract parity, dependency boundary, AAPM colors, light/dark/system variants, density, typography, reduced motion, touch target, descriptors, Farm proof, and icon compatibility                                                      |
| `pnpm test:contracts`                         | PASS                                    | Canonical contract registry and generated projections remain synchronized, including `native-mobile.json`                                                                                                                              |
| `pnpm test`                                   | PASS                                    | Full existing repository test chain passed, including native-mobile, responsive, SaaS, Farm reference, token, AI, component-system, and Tailwind gates                                                                                 |
| `pnpm typecheck`                              | PASS                                    | Contracts, native adapter, agent package/build, and playground types pass                                                                                                                                                              |
| `pnpm build`                                  | PASS                                    | Existing playground production build succeeds; only the existing large-chunk advisory remains                                                                                                                                          |
| Targeted Prettier check for Q07-touched files | PASS                                    | All Q07-touched source, manifest, generator, verifier, package, and projection entry files match the configured formatter                                                                                                              |
| `pnpm format:check`                           | CONSTRAINT                              | Repository-wide check reports 293 pre-existing files outside formatter baseline; Q07-touched files were checked separately and pass                                                                                                    |
| `git diff --check`                            | PASS                                    | No whitespace errors; Git reports existing CRLF-normalization warnings for dirty tracked files                                                                                                                                         |
| Existing browser smoke                        | PASS                                    | Reused the existing local tab at `http://localhost:4173/farm-reference/overview`; rendered title, five route buttons, four KPI values, journey, activity, and Inventory state were present in the accessibility tree after Q07 changes |
| Native device/emulator launch                 | UNVERIFIED / NOT APPLICABLE IN CHECKOUT | No Expo/RN consumer, native dependency, device, emulator, or launch harness exists; no native runtime evidence was fabricated                                                                                                          |
| Full `pnpm test:e2e`                          | CARRIED CONSTRAINT                      | Q07 changes do not add or alter a Web route. The latest Q06 baseline remains 177 passed, 77 failed, 254 total, with failures outside the Farm reference route and unrelated baseline/visual drift; no Q07 browser fixture was added    |
| Snapshot updates                              | NOT DONE                                | No snapshot was rewritten to absorb unrelated visual drift                                                                                                                                                                             |
| Commit/push/merge/deploy                      | NOT DONE                                | No publication or integration action was authorized or performed                                                                                                                                                                       |

## Compatibility and remaining gaps

### Confirmed

- The native contract is generated from the same typed contract plane as the
  Web system.
- Native color, typography, spacing, radius, motion, density, and touch-target
  values resolve through existing Ten4Seven token sources.
- AAPM brand roles resolve through the existing `aapm-core` adapter rather than
  a native-local palette.
- The native proof reuses module lifecycle and sync state vocabulary without
  owning authority over either.
- Semantic icon names remain compatible with both the AI catalog and the
  canonical Web icon registry.
- The existing Web build, contracts, test chain, and rendered Farm reference
  smoke remain healthy.

### Remaining

- No executable Expo/RN rendering layer exists yet.
- No native navigation, safe-area, keyboard, gesture, storage, API/auth,
  offline queue, synchronization, conflict, push, deep-link, or camera proof
  exists; these belong to the eventual AAPM Mobile consumer.
- No device/emulator screenshot, native accessibility traversal, or touch-area
  measurement is available from this checkout.
- The canonical AAPM asset distribution remains absent in this checkout, as
  recorded by Q06; Q07 does not invent or copy brand artwork.

## KEEP / ADD / FIX / FUTURE

| Decision | Q07 disposition                                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KEEP     | Existing Web-only `@ten4seven/ui`, canonical tokens, typed brand profiles, semantic icon registry, module-state ownership, Q04 responsive grammar, Q05 control-plane boundary, and Q06 Farm reference route |
| ADD      | `NativeMobileContract`, generated native-mobile projections, `@ten4seven/native` descriptor adapter, semantic icon cross-check, native-mobile verifier, package wiring, and this evidence record            |
| FIX      | Added the missing explicit native brand-role mapping and made the token package entrypoint extension-safe for the DOM-free adapter's executable workspace proof; no visual Web behavior was changed         |
| FUTURE   | Build a separately governed Expo/RN consumer, execute device/emulator/accessibility QA, and connect consumer-owned AAPM auth/data/sync/workflow layers without moving that authority into Ten4Seven         |

## Handoff boundary

- Q07 is a shared contract and adapter proof, not AAPM Mobile product
  implementation.
- No native runtime is claimed until an actual Expo/RN consumer and device or
  emulator harness are introduced and validated.
- No Farm API, auth provider, offline queue, persistence, or business logic was
  added.
- Existing dirty checkout state, generated work, and unrelated Q02–Q06 edits
  were preserved; no reset, cleanup, snapshot rewrite, commit, push, merge, or
  deployment was performed.
- The next queue document must be supplied before Q08 begins.

PASS WITH CONSTRAINTS FOR Q08
