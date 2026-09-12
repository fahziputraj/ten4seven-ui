# T7-UNIVERSAL-HARDENING-U03 Evidence

## 1. Coordinates

- Repository: `fahziputraj/ten4seven-ui`
- Working directory: `D:\SA\ten4seven-ui`
- Parent: `T7-UNIVERSAL-HARDENING-001`
- Work item: `T7-UNIVERSAL-HARDENING-U03`
- Execution mode: strict / bounded-wide
- Risk: R2 — shared architecture / public component contracts
- Branch: `codex/icons-curated-solar-style`
- HEAD at evidence capture: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`
- Prerequisite U01: [U01 token foundation evidence](T7-UNIVERSAL-HARDENING-U01-TOKEN-FOUNDATION-EVIDENCE.md), gate `PASS FOR U02`.
- Prerequisite U02: [U02 intrinsic layout evidence](T7-UNIVERSAL-HARDENING-U02-INTRINSIC-LAYOUT-EVIDENCE.md), gate `PASS FOR U03`.

U03 was executed only. No commit, push, PR, merge, tag, publish, or deploy was
performed. The working tree was already dirty before U03; unrelated existing
work and U01/U02 changes were preserved.

## 2. Current Web/Native architecture

The repository now has an explicit semantic-contract seam without forcing the
Web renderer to run on Native:

| Layer                     | Current owner                             | U03 boundary                                                                                      |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Shared semantic contracts | `packages/contracts/src`                  | Typed platform, intent, state, accessibility, capability, ownership, and adaptation vocabulary.   |
| Shared resolved tokens    | `packages/tokens/src`                     | U01 typed theme/token source; Web CSS and Native JS/TS projections are derived from it.           |
| Web renderer              | `packages/ui`                             | DOM/CSS implementation and existing public Web component APIs.                                    |
| Native-ready adapter      | `packages/native`                         | CSS-independent semantic and resolved-token consumption proof; not an Expo/React Native renderer. |
| AI/catalog projection     | `generated/`, `packages/agent/generated/` | Generated retrieval metadata; never a second semantic source of truth.                            |

The north-star boundary is therefore:

```text
@ten4seven/contracts
        ↓
@ten4seven/tokens
        ↓
┌──────────────────┬──────────────────┐
│                  │                  │
@ten4seven/ui   @ten4seven/native   AI/generated
Web renderer     Native adapter       projections
```

Shared meaning includes component intent, critical states, accessibility
obligations, token-family references, layout intent, responsive/adaptive intent,
renderer maturity, and AI search metadata. DOM elements, CSS mechanics, native
pressables, sheets, platform pickers, gestures, and device capabilities remain
renderer/platform concerns.

## 3. Existing Native package maturity

`packages/native` is classified as a bounded contract projection / experimental
adapter, not a real mobile renderer. It currently:

- imports shared contracts and tokens;
- resolves a ThemeProfile into JS/TS data through `buildNativeThemeSnapshot`;
- exposes semantic descriptors for existing button, input, card, feedback, sync,
  and Farm daily-operation presentation proofs;
- now exposes `resolveNativeComponentContract`, which consumes a typed
  `ComponentPlatformContract` and returns CSS-independent Native-facing metadata;
- does not import React Native, Expo, DOM, CSS, or SVG runtime dependencies;
- has no device/emulator launch proof and does not claim implemented Native
  components.

The Native package boundary remains intentionally incomplete for later queues.
Application-owned navigation, safe-area handling, gestures, authentication,
permissions, API/persistence, offline storage, synchronization, conflict
resolution, camera, and platform lifecycle are not moved into Ten4Seven by U03.

The Native verification now consumes generated `Button` metadata as a canary and
checks that its Native status remains `planned`, its Native presentation is
`native-pressable`, and its token, layout, and accessibility references are
present. This proves the boundary without pretending a renderer exists.

## 4. Universal contract model

The single typed platform source is:

```text
packages/contracts/src/component-platform.ts
```

It is aggregated into `CANONICAL_CONTRACTS.componentPlatform` by
`packages/contracts/src/canonical.ts` and exported through
`packages/contracts/src/index.ts`. It extends the existing contract seam rather
than introducing a new JSON authority.

`ComponentPlatformContract` expresses the following normalized fields:

```text
id, canonicalId, displayName, family, kind
platform, rendererStrategy
semanticIntent, interactionModel, criticalStates
web, native
accessibilityObligations, inputModalities
responsiveBehavior, adaptiveBehavior
tokenFamilies, layoutIntents, motionRoles
nativeAlternative, webAlternative
engineBoundary, dependencies
aliases, searchTerms
```

Existing catalog fields such as `maturity`, `api`, `states`, `accessibility`,
`tokens`, `composesWith`, `relatedComponents`, and `usedByPatterns` remain in
the existing component registry/shard contract. U03 does not clone them into a
second authority; generated shards retain the existing fields and add the
normalized platform metadata.

The semantic contract is distinct from renderer-specific APIs. For example,
Button intent includes action meaning, size, disabled/loading state, icon
relationship, and accessibility obligations. A Web implementation may expose
DOM refs, anchor behavior, and hover behavior; a future Native implementation
may expose press state, native accessibility role/state, and haptic intent.
Those escapes are not added to the universal semantic contract unless they are
genuinely cross-platform.

The platform contract also carries `engineBoundary`, dependency metadata, and
consumer-owned concerns. It does not contain permission policy, entitlement
truth, workflow transitions, business validation, persistence ownership, or
domain source-of-truth data.

## 5. Platform classification

The only accepted semantic platform classes are the typed values:

```text
BOTH | WEB | NATIVE | ADAPTIVE
```

The generated matrix covers the current implemented catalog registry, not the
large future candidate corpus. The registry has 173 entries: 167 canonical
implemented entries and 6 aliases. Counts are:

| Matrix scope          | BOTH | ADAPTIVE | WEB | NATIVE | Total |
| --------------------- | ---: | -------: | --: | -----: | ----: |
| Canonical entries     |   96 |       58 |  13 |      0 |   167 |
| Aliases               |    3 |        3 |   0 |      0 |     6 |
| Full generated matrix |   99 |       61 |  13 |      0 |   173 |

`NATIVE` is a valid supported class, but no current catalog component claims it
yet. Four future Native-only metadata contracts are defined as planned and
deferred: `SafeAreaSurface`, `PullToRefresh`, `HapticAction`, and
`ScannerSurface`.

The existing six aliases resolve to their canonical platform metadata:

```text
RadioGroup       → CheckboxGroup
TimeInput        → NativeTimeInput
ActionMenu       → DropdownMenu
CommandPalette   → CommandMenu
DescriptionList  → KeyValueList
Timeline         → ActivityFeed
```

Aliases do not increase the canonical component count and cannot drift to a
different platform classification or renderer strategy.

## 6. Renderer strategies

The typed renderer strategy vocabulary is:

| Strategy            | Meaning in the contract plane                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `SAME_INTENT`       | Web and Native use the same semantic job with renderer-specific implementations.                                            |
| `NATIVE_RENDERER`   | Native has a first-class platform renderer for the same intent; its implementation is separate and may use native controls. |
| `ALTERNATE_PATTERN` | The semantic job is shared, but the interaction/presentation pattern changes by platform.                                   |
| `NOT_APPLICABLE`    | The contract is intentionally not part of that renderer.                                                                    |

Full-matrix strategy counts, including aliases, are:

```text
NATIVE_RENDERER   98
SAME_INTENT       12
ALTERNATE_PATTERN 50
NOT_APPLICABLE    13
```

Current Web catalog entries are implemented. For current `BOTH` and `ADAPTIVE`
entries, the Native renderer status is machine-readable as `planned`; for
`WEB` entries it is `not-applicable`. This prevents AI or consumers from
mistaking semantic parity for Native implementation availability.

## 7. Adaptive-pattern decisions

The typed `ADAPTIVE_PATTERN_CONTRACTS` registry records the following decisions.
The shared contract owns the user intent and state; the consumer owns business
data, handlers, routing, permissions, persistence, and other concerns listed by
each pattern.

| Pattern        | Web presentation                                                       | Native presentation                                                                   | Strategy            | Boundary decision                                                                          |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| Select         | Popup/listbox or bounded list; one authoritative trigger               | Sheet, native picker, or bounded list surface                                         | `ALTERNATE_PATTERN` | Same choose-one/many intent; consumer owns data, handlers, permissions.                    |
| Dialog / Modal | Centered modal/dialog with labelled task surface and focus containment | Native modal or sheet chosen by task intent                                           | `ALTERNATE_PATTERN` | Not every dialog is forced into a bottom sheet.                                            |
| Drawer         | Edge contextual surface with parent-route context and owned scroll     | Sheet, modal, or navigation surface according to role                                 | `ALTERNATE_PATTERN` | Role determines the Native presentation.                                                   |
| Sidebar        | Persistent or collapsible information navigation                       | Drawer, tabs, or stack navigation according to information architecture               | `ALTERNATE_PATTERN` | A narrow desktop sidebar is not reproduced on a phone.                                     |
| DataTable      | Dense table/grid with row, column, sort, and selection meaning         | Usually list/detail or cards/rows; intentional horizontal comparison remains possible | `ALTERNATE_PATTERN` | Shared data meaning and selection/sort/filter intent; no HTML-table requirement on Native. |
| MasterDetail   | Simultaneous list and detail panes when bounded space supports them    | List → detail navigation or sheet/detail stack                                        | `ALTERNATE_PATTERN` | Record intent is shared; navigation truth remains consumer-owned.                          |
| Date/Time      | Calendar, popup, bounded list, and supported text entry                | Platform date/time controls where appropriate                                         | `NATIVE_RENDERER`   | Shared value contract; platform control is an implementation choice.                       |
| Files          | File input, dropzone, or drag/drop selection                           | Document picker, photo library, camera, or share/import affordance                    | `NATIVE_RENDERER`   | Same provide/select-file intent; storage and transport remain consumer-owned.              |

Additional typed adaptive patterns cover command surfaces, navigation shells,
filtering, collections, carousels, hierarchy, and commerce. Existing component
overrides select these patterns only where the canonical component contract
requires them.

## 8. Interaction modalities

The intentionally small typed modality vocabulary is:

```text
keyboard | pointer | touch | screenReader | hover | focus
gesture | hardwareBack | virtualKeyboard
```

Modalities are attached per contract, not indiscriminately. Representative
examples from the generated matrix include:

- `Button`: keyboard, pointer, touch, screenReader;
- `Input`: keyboard, pointer, touch, screenReader, focus, virtualKeyboard;
- `Select`: keyboard, pointer, touch, screenReader, focus, virtualKeyboard;
- `Tooltip`: pointer, hover, keyboard, screenReader, focus, with a
  `non-hover-alternative` obligation;
- `Drawer` and `Modal`: keyboard, pointer, touch, screenReader, focus,
  hardwareBack;
- `SplitPane`: pointer, keyboard, screenReader, focus, with keyboard resize;
- `TreeView`: keyboard, pointer, touch, screenReader, focus;
- `CommandMenu`: keyboard, pointer, touch, screenReader, focus,
  virtualKeyboard.

Hover is therefore a Web modality and never a prerequisite for Native parity.
Touch/gesture and hardware-back semantics are modeled where the contract uses
them, while the renderer supplies the actual platform mechanics.

## 9. Accessibility obligation model

Accessibility metadata stores obligations, not Web ARIA attribute strings. The
typed obligation vocabulary includes:

```text
accessible-name, actionable-role, input-role, value-state, disabled-state,
loading-state, invalid-state, error-association, selection-state,
expanded-state, selected-state, navigation-role, labelled-surface,
focus-containment, focus-return, dismissal, focus-or-press-feedback,
keyboard-navigation, ordered-structure, structure-order, empty-state,
status-announcement, non-color-status, table-context, sort-state,
separator-role, keyboard-resize, supplemental-description,
non-hover-alternative, alternative-text, data-summary, file-state,
safe-area-inset, virtual-keyboard, hardware-capability
```

Web maps those obligations to native HTML semantics and ARIA only where needed.
A future Native renderer maps the same obligations to platform labels, roles,
states, focus/press feedback, and announcements. No Web-specific ARIA attribute
is treated as the universal component API.

The verification gate requires every current canonical registry entry to resolve
to at least one valid typed accessibility obligation and rejects arbitrary
obligation values. State obligations are component-specific; U03 does not force
loading, empty, error, or selection states onto components where they make no
semantic sense.

## 10. Token consumption model

U03 consumes the U01 token contract and does not introduce a Native visual theme.
Component contracts reference token families/roles, not CSS syntax or ad hoc
values. The normalized component token-family vocabulary is:

```text
color, typography, spacing, radius, elevation, motion, sizing,
focus, density, touch-target, measure, data-visualization
```

Ownership remains layered:

```text
foundation → semantic → layout → component → product profile → scope
```

Resolution remains the U01 deterministic order:

```text
system defaults
→ base recipe
→ product profile
→ theme override
→ scoped override
→ component state
```

Web consumes the generated CSS-variable projection from the typed token/theme
contract. Native consumes the resolved JS/TS snapshot from
`buildNativeThemeSnapshot` together with `resolveNativeComponentContract`; it
never parses `var(--t7-...)` and does not own a second color/radius/spacing
theme. The component platform source contains semantic family references only.

## 11. Layout/measure consumption model

U03 consumes the U02 intrinsic-layout contract. Universal component metadata
references semantic layout intent IDs, including:

```text
measure-compact, measure-control, measure-content, measure-wide,
measure-reading, measure-fluid, density-adaptive, minimum-useful-surface,
bounded-scroll-owner, priority-order, single-column, split-panes,
stacked-detail, safe-area-inset, touch-target-minimum, content-max,
page-gutter, section-rhythm
```

The shared contract can state useful measure, density behavior, scroll ownership,
priority order, minimum useful surface, and adaptive stacking. It does not store
CSS Grid/Flex syntax, DOM selectors, or React Native layout primitives. Web and
Native renderers own their layout mechanics while resolving the same semantic
measure and adaptive intent.

## 12. Device capability vocabulary

The typed capability metadata is exactly:

```text
safeArea, virtualKeyboard, camera, qrScanner, photoLibrary,
documentPicker, haptics, pushEntry, deepLink, offline, sync,
networkRetry, secureStorage, backgroundTask, permissions
```

These are not visual tokens. They are capability/obligation metadata used to
describe why a future renderer or recipe may need a platform adapter. The
platform/consumer owns permission prompts, secure storage, connectivity truth,
push/deep-link resolution, background execution, camera access, and device
lifecycle. U03 defines vocabulary only and does not implement those capabilities.

## 13. Offline/sync presentation boundary

`OFFLINE_SYNC_PRESENTATION_CONTRACT` defines reusable presentation semantics for
field conditions without moving business state into Ten4Seven:

| State            | Tone    | Announcement | Retry affordance | Consumer remains owner of                            |
| ---------------- | ------- | ------------ | ---------------- | ---------------------------------------------------- |
| `online`         | success | none         | no               | business data and handlers                           |
| `offline`        | warning | polite       | no               | connectivity meaning, persistence, handlers          |
| `pendingSync`    | info    | polite       | no               | business data, persistence, handlers                 |
| `syncing`        | info    | polite       | no               | business data, persistence, handlers                 |
| `syncFailed`     | danger  | assertive    | yes              | business data, persistence, handlers, reconciliation |
| `retryAvailable` | warning | polite       | yes              | business data and handlers                           |
| `stale`          | warning | polite       | yes              | business data, persistence, handlers                 |

Ten4Seven owns tone, announcement intent, retry presentation, and state
vocabulary. The application owns actual connectivity truth, sync engine,
persistence, retry policy, conflict resolution, and business meaning. No second
business-state source was added.

Navigation follows the same boundary. Ten4Seven owns navigation presentation
patterns, item states, focus/press and accessibility obligations, and responsive
shell intent. Consumers own routes, permissions/guards, deep-link and push-entry
resolution, navigation handlers, and business navigation logic.

## 14. Representative canary matrix

This canary is derived from `generated/component-contract-plane.json`; the full
173-entry matrix is the authoritative generated proof. `SR` below means the
exact `screenReader` modality; all other modality and obligation names are the
exact typed IDs.

| Component   | Family     | Platform | Web / Native status          | Strategy          | Adaptive alternative     | Input modalities                                     | Accessibility obligations                                                                                                         | Token families                                                                    | Layout intents                                                                        |
| ----------- | ---------- | -------- | ---------------------------- | ----------------- | ------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Button      | action     | BOTH     | implemented / planned        | SAME_INTENT       | —                        | keyboard, pointer, touch, SR                         | accessible-name, actionable-role, disabled-state, loading-state, focus-or-press-feedback                                          | color, typography, spacing, radius, focus, motion, touch-target, measure          | measure-control, touch-target-minimum                                                 |
| Input       | form       | BOTH     | implemented / planned        | NATIVE_RENDERER   | —                        | keyboard, pointer, touch, SR, focus, virtualKeyboard | accessible-name, input-role, value-state, disabled-state, invalid-state, error-association, focus-or-press-feedback               | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-control, touch-target-minimum, density-adaptive                               |
| Select      | form       | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | selector-sheet           | keyboard, pointer, touch, SR, focus, virtualKeyboard | accessible-name, selection-state, expanded-state, disabled-state, focus-or-press-feedback, keyboard-navigation                    | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-control, touch-target-minimum, density-adaptive                               |
| Checkbox    | form       | BOTH     | implemented / planned        | NATIVE_RENDERER   | —                        | keyboard, pointer, touch, SR, focus, virtualKeyboard | accessible-name, input-role, value-state, disabled-state, invalid-state, error-association, focus-or-press-feedback               | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-control, touch-target-minimum, density-adaptive                               |
| Tabs        | navigation | BOTH     | implemented / planned        | SAME_INTENT       | —                        | keyboard, pointer, touch, SR, focus                  | accessible-name, selected-state, keyboard-navigation, focus-or-press-feedback                                                     | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-content, touch-target-minimum                                                 |
| Modal       | overlay    | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | native-modal             | keyboard, pointer, touch, SR, focus, hardwareBack    | accessible-name, labelled-surface, focus-containment, focus-return, dismissal, focus-or-press-feedback                            | color, spacing, radius, elevation, focus, motion, measure                         | measure-content, measure-wide, bounded-scroll-owner, touch-target-minimum             |
| Drawer      | overlay    | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | native-sheet             | keyboard, pointer, touch, SR, focus, hardwareBack    | accessible-name, labelled-surface, focus-containment, focus-return, dismissal, focus-or-press-feedback                            | color, spacing, radius, elevation, focus, motion, measure                         | measure-content, measure-wide, bounded-scroll-owner, touch-target-minimum             |
| Tooltip     | overlay    | WEB      | implemented / not-applicable | NOT_APPLICABLE    | contextual-help          | pointer, hover, keyboard, SR, focus                  | accessible-name, supplemental-description, non-hover-alternative, focus-or-press-feedback                                         | color, spacing, radius, elevation, focus, motion, measure                         | measure-content, measure-wide, bounded-scroll-owner, touch-target-minimum             |
| DatePicker  | date-time  | ADAPTIVE | implemented / planned        | NATIVE_RENDERER   | native-date-time-control | keyboard, pointer, touch, SR, focus, virtualKeyboard | accessible-name, input-role, value-state, selection-state, disabled-state, invalid-state, focus-or-press-feedback                 | color, typography, spacing, radius, focus, motion, touch-target, measure          | measure-control, touch-target-minimum, single-column                                  |
| FileUpload  | file       | ADAPTIVE | implemented / planned        | NATIVE_RENDERER   | document-picker          | keyboard, pointer, touch, SR, focus                  | accessible-name, file-state, error-association, disabled-state, focus-or-press-feedback                                           | color, typography, spacing, radius, focus, motion, touch-target, measure          | measure-content, single-column, touch-target-minimum                                  |
| DataTable   | table      | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | data-list-detail         | keyboard, pointer, touch, SR, focus                  | accessible-name, table-context, sort-state, selection-state, empty-state, loading-state, focus-or-press-feedback                  | color, typography, spacing, radius, focus, motion, density, measure               | measure-content, measure-wide, bounded-scroll-owner, stacked-detail, density-adaptive |
| TreeView    | navigation | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | hierarchy-list           | keyboard, pointer, touch, SR, focus                  | accessible-name, navigation-role, ordered-structure, expanded-state, selected-state, keyboard-navigation, focus-or-press-feedback | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-content, minimum-useful-surface, priority-order, touch-target-minimum         |
| SplitPane   | layout     | WEB      | implemented / not-applicable | NOT_APPLICABLE    | list-detail              | pointer, keyboard, SR, focus                         | separator-role, keyboard-resize, focus-or-press-feedback                                                                          | spacing, sizing, radius, elevation, focus, density, measure                       | split-panes, measure-content, bounded-scroll-owner                                    |
| Stepper     | navigation | BOTH     | implemented / planned        | SAME_INTENT       | —                        | keyboard, pointer, touch, SR, focus                  | accessible-name, ordered-structure, selected-state, focus-or-press-feedback                                                       | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-content, minimum-useful-surface, priority-order, touch-target-minimum         |
| CommandMenu | navigation | ADAPTIVE | implemented / planned        | ALTERNATE_PATTERN | search-action-surface    | keyboard, pointer, touch, SR, focus, virtualKeyboard | accessible-name, selection-state, ordered-structure, keyboard-navigation, focus-return                                            | color, typography, spacing, radius, focus, motion, touch-target, measure, density | measure-content, minimum-useful-surface, priority-order, touch-target-minimum         |

`HoverCard` is not a current canonical catalog entry; `Tooltip` is the existing
Web-only canary and explicitly carries the contextual-help Native alternative.
No missing canary component was implemented merely to satisfy U03.

## 15. Generated projections

The existing generation pipeline was extended in
`scripts/generate-contract-projections.mjs`. It imports the typed component
platform source and generates, together with the existing projections:

- `generated/component-contract-plane.json`;
- `packages/agent/generated/component-contract-plane.json`;
- `generated/components.compact.json` with `platform`, renderer status,
  `rendererStrategy`, `semanticIntent`, `interactionModel`, `inputModalities`,
  adaptive pattern, and Native alternative metadata;
- full component shards under `generated/components/` and
  `packages/agent/generated/components/`;
- `generated/agent-index.json` and `generated/index.json` entries that point to
  the generated component-contract-plane projection.

The projection records:

```text
schemaVersion: 0.1
id: component-contract-plane
sourceOfTruth: packages/contracts/src/component-platform.ts
registry: 173 catalog entries / 167 canonical / 6 aliases
matrix: 173 normalized component entries
deferredNative: 4 planned Native-only metadata contracts
```

The final refresh command was:

```text
pnpm contracts:generate
```

It completed with `Generated 221 contract projections in generated/`, followed
by the existing theme CSS and three DTCG token projections. The two generated
component-contract-plane files are byte-identical at 432,323 bytes with SHA-256
`fdfdb4505c33e92db8d3fb4ea65c1e1c5800d3e03067e001fea009923c5672da`.

No independent `platform-contracts.json`, `native-decisions.json`, or
`component-platform-map.json` was created. Verification explicitly rejects
those filenames at the repository root.

## 16. Compatibility / breaking changes

- Existing Web component APIs and catalog fields were preserved. No Web
  component was rewritten to manufacture Native parity.
- The generated compact and full component projections are additive. Existing
  `displayName`, `level`, `maturity`, `api`, `states`, `accessibility`, `tokens`,
  recipe, alias, and relationship metadata remain available.
- The six legacy aliases continue to resolve to their canonical targets and now
  inherit platform/renderer metadata deterministically.
- The compact projection is intentionally larger than the old compact baseline
  because it now carries AI-relevant platform metadata. The existing compact
  size guard was bounded from 60% to 75% of the full legacy component+recipe
  projection; the current verification output is `274130/377209` bytes, still
  materially smaller.
- `@ten4seven/ui` only re-exports typed contract metadata; no new runtime UI
  dependency was added.
- `@ten4seven/native` adds a metadata projection function only. No Expo,
  React Native, NativeBase, Tamagui, MUI, Radix, React Aria, or other donor UI
  runtime was added.
- Renderer-specific extensions remain possible at the package boundary. A
  future Native implementation may add native roles, press feedback, haptics,
  and platform controls without changing the shared semantic intent.

## 17. Tests

### U03 targeted and affected tests

| Command                                        | Result                                                                                                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                      | PASS — deterministic typed-to-generated projection, theme CSS, and DTCG refresh.                                                                                                                  |
| `pnpm test:contracts`                          | PASS — 173 component matrix entries, enum checks, generated-vs-typed equality, aliases, canaries, deferred Native contracts, and no duplicate-manifest checks; compact retrieval `274130/377209`. |
| `pnpm test:native-mobile`                      | PASS — CSS-independent Native contract/token consumption and existing Farm presentation proof.                                                                                                    |
| `pnpm test:ai`                                 | PASS — 29 recipes, 173 components, 60 blocks, 122 semantic icons, and compact platform metadata alignment.                                                                                        |
| `pnpm test:consistency`                        | PASS — canonical consistency across 27 UI source files.                                                                                                                                           |
| `pnpm test:component-system`                   | PASS — 167 canonical components, 6 aliases, taxonomy/relations, and no duplicate primitive family.                                                                                                |
| `pnpm --filter @ten4seven/contracts typecheck` | PASS.                                                                                                                                                                                             |
| `pnpm --filter @ten4seven/native typecheck`    | PASS.                                                                                                                                                                                             |
| `pnpm typecheck`                               | PASS — contracts, Native, agent typecheck/build, and playground typecheck.                                                                                                                        |
| `pnpm package:build`                           | PASS — Web package built in ESM and CJS forms.                                                                                                                                                    |
| `pnpm package:verify`                          | PASS — 17 root exports, bundled tokens/icons/motion, and self-contained styles.                                                                                                                   |
| `pnpm build`                                   | PASS — playground Vite production build; only the existing large-chunk warning was emitted.                                                                                                       |
| `pnpm test:slice-a`                            | PASS — isolated consumer and package-boundary proof.                                                                                                                                              |
| `pnpm test:brand-expression`                   | PASS.                                                                                                                                                                                             |
| `pnpm test:recipe-family`                      | PASS.                                                                                                                                                                                             |
| `pnpm --filter @ten4seven/tokens test`         | PASS — 34 tests.                                                                                                                                                                                  |
| `pnpm test:tailwind-bridge`                    | PASS — published-theme consumer proof.                                                                                                                                                            |
| `git diff --check`                             | PASS — only unrelated CRLF normalization warnings were reported.                                                                                                                                  |

### Rendered browser proof

Using the existing Opera tab (reused; no new window or tab),
`http://127.0.0.1:4173/component-lab` loaded successfully. The accessibility
tree exposed the canonical Component Lab sections for Forms, Core, Data,
Overlays, Surfaces, Charts, Navigation, Workflow, and Advanced, including
controls, tables, overlays, responsive split workspace, files, and state
proofs. A rendered screenshot was captured from the same tab and the browser
reported zero captured console errors. U03 does not change a visual component,
so this is a route/package smoke proof rather than a claim of Native device QA.

## 18. Baseline debt

The full root test chain was run and stopped at the existing
`test:component-coverage` gate. It failed because the tracked generated report
is stale:

```text
actual stylesheet literal-pixel count: 962
tracked report count:                   976
```

This is the same inherited component-token-coverage debt observed before U03.
The report was not regenerated as a side effect because doing so would broaden
the bounded U03 change into unrelated stylesheet/report migration.

`pnpm format:check` also remains an inherited repository-wide failure: Prettier
reported 355 files. The U03 source files were formatted with targeted Prettier;
mass formatting was intentionally not performed. The dirty working tree was
preserved throughout; U03 did not reset, clean, normalize, or stage unrelated
files.

The full chain's earlier gates through token governance passed, and tests after
the short-circuit were run individually and passed as listed above. The two
repository-wide baseline failures are therefore reported as inherited debt,
not hidden or attributed to the component contract plane.

## 19. Deferred implementation for U04+

U03 deliberately does not implement the following:

- `@ten4seven/native` Web/Expo/React Native components or a mobile renderer;
- Expo/React Native dependencies, device/emulator launch, safe-area runtime,
  gestures, haptics, camera/scanner, permissions, secure storage, or background
  execution;
- application route truth, auth, push/deep-link resolution, persistence,
  offline engine, synchronization, retry policy, or conflict resolution;
- a large candidate-corpus classification; that remains a later normalization
  queue;
- recipe/block redesign, product-route adoption, or mass Web consumer migration;
- donor UI runtime adoption or donor visual/theme leakage;
- U04 or any later queue.

The typed schema, generated matrix, Native consumption boundary, and AI status
metadata are the only U03 foundation needed for later platform-specific work.

## 20. Gate

PASS FOR U04
