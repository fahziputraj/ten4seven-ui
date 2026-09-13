# T7-UNIVERSAL-HARDENING-U04 — Foundations, Layout & Actions Evidence

Status: executed in a bounded local worktree. This evidence covers U04 only;
no U05 or later implementation work was started.

Evidence classes used below are `SOURCE`, `GENERATED`, `RUNTIME`, `OBSERVED`,
`UNKNOWN`, and `UNVERIFIED`. A passing static contract gate is not treated as
device-runtime evidence.

## 1. Coordinates

| Field               | Evidence                                                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository          | `fahziputraj/ten4seven-ui`                                                                                                                                                                                                                                                 |
| Local checkout      | `D:\\SA\\ten4seven-ui`                                                                                                                                                                                                                                                     |
| Branch              | `codex/icons-curated-solar-style`                                                                                                                                                                                                                                          |
| Starting HEAD       | `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`                                                                                                                                                                                                                                 |
| Starting worktree   | Dirty with prior queue work and generated artifacts. Existing changes were preserved; no reset, clean, stash, mass-format, commit, push, PR, merge, tag, publish, or deploy was performed.                                                                                 |
| Local browser       | `http://127.0.0.1:4173` was already available and was reused by Playwright.                                                                                                                                                                                                |
| U04 state validated | Existing dirty U04 candidate changes were preserved and revalidated: typed component-platform metadata, one adaptive pattern, tokenized action geometry, corresponding AI catalog descriptions, generated projections, and `tests/u04-foundations-layout-actions.spec.ts`. |

The starting worktree was already dirty with prior queue work, generated
artifacts, and the U04 candidate changes. Those changes were preserved and
revalidated in place; existing unrelated lockfile and queue artifacts remain
untouched. No source reset, cleanup, stash, mass-format, or unrelated repair was
used to obtain the gate.

## 2. U03 inherited baseline

The supplied U03 gate baseline was:

| Measure               | U03 baseline |
| --------------------- | -----------: |
| Canonical components  |          167 |
| Aliases               |            6 |
| Total catalog entries |          173 |
| Recipes               |           29 |
| Expressive blocks     |           60 |
| Semantic icons        |          122 |
| Platform BOTH         |           96 |
| Platform ADAPTIVE     |           58 |
| Platform WEB          |           13 |
| Platform NATIVE       |            0 |

The checkout already included subsequent dirty queue work when U04 began. The
observed generated starting state for that checkout was 172 canonical entries,
7 aliases, 179 total entries, and a platform projection of BOTH 98, ADAPTIVE
60, WEB 14, NATIVE 0. That later baseline is reported separately from the
inherited U03 numbers rather than being rewritten as U03 history.

After this U04 correction the generated matrix is 172 canonical entries, 7
aliases, 179 total entries, with BOTH 97, ADAPTIVE 61, WEB 14, NATIVE 0. The
one-count platform shift is SplitButton's explicit adaptive classification;
there is no count increase and no Native renderer promotion.

## 3. Inventory before

The inventory uses the U03 classification vocabulary. `EXISTING_STABLE` and
`EXISTING_NEEDS_HARDENING` describe the implementation condition; platform
classification is shown separately where useful.

### Foundations

| Candidate / intent       | Before finding                                                                               | Classification / platform                                               | Existing normalized owner                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Typography               | Semantic `typeRole` component and role map already present.                                  | `EXISTING_STABLE`, `FOUNDATION`, BOTH / NATIVE_RENDERER                 | `Typography` + typed typography roles in `packages/tokens/src/theme.ts`                          |
| Text / Heading / Code    | No separate catalog primitives; arbitrary text styles would duplicate the role map.          | `COMPONENT_VARIANT` / `REJECTED_DUPLICATE`                              | `Typography` roles (`display`, heading, title, body, label, caption, code-compatible mono usage) |
| Label                    | Existing labelled field primitive in the form family.                                        | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Label` / field anatomy; not a second typography library                                         |
| Kbd / KeyboardKey        | Existing semantic `<kbd>` implementation.                                                    | `EXISTING_STABLE`, FOUNDATION, WEB_ONLY                                 | `Kbd` in `packages/ui/src/core.tsx`                                                              |
| VisuallyHidden           | No separate public catalog entry was required by current consumers.                          | `UTILITY_OR_PROVIDER` / `DEFERRED`                                      | Keep as an implementation/accessibility utility if needed; do not inflate U04 canonical count    |
| Separator / Divider      | `Separator` already expresses the divider intent.                                            | `EXISTING_STABLE`, CANONICAL_COMPONENT; Divider is an alias concept     | `Separator` in `packages/ui/src/layout.tsx`                                                      |
| Avatar                   | Existing image/initials fallback contract.                                                   | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Avatar` in `packages/ui/src/data-display.tsx`                                                   |
| Badge                    | Existing compact category/state label.                                                       | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Badge` in `packages/ui/src/components.tsx`                                                      |
| Status / StatusIndicator | No generic duplicate; `StatusChip` owns the materially different state-icon/status contract. | `EXISTING_STABLE` through normalized component, not a new `StatusBadge` | `StatusChip` plus semantic status tokens                                                         |
| Icon                     | Existing semantic `T7Icon` registry and icon name contract.                                  | `EXISTING_STABLE`, FOUNDATION, BOTH / NATIVE_RENDERER                   | `T7Icon` in `packages/icons/src/index.tsx`                                                       |
| Image / AspectRatio      | Existing media primitives.                                                                   | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Image` and `AspectRatio` in `packages/ui/src/media.tsx`                                         |
| Skeleton / Progress      | Existing feedback primitives with loading/progress semantics.                                | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Skeleton` and `Progress` in `packages/ui/src/feedback.tsx`                                      |
| Surface / Card / Panel   | Existing distinct containment roles; no universal Card max-width.                            | `EXISTING_STABLE`, CANONICAL_COMPONENT                                  | `Surface`, `Card`, and `Panel`                                                                   |

### Layout

| Candidate / intent                         | Before finding                                                                                                        | Classification / platform                                       | Existing normalized owner                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Container / BoundedContent / Center / Rail | `Container` already exposed semantic rail and measure choices.                                                        | `EXISTING_STABLE`, CANONICAL_COMPONENT, BOTH / NATIVE_RENDERER  | `Container`; Rail and BoundedContent are intent names, not duplicate components            |
| Stack                                      | Existing directional sequential composition.                                                                          | `EXISTING_STABLE`, CANONICAL_COMPONENT, BOTH / NATIVE_RENDERER  | `Stack`                                                                                    |
| Inline / Cluster / Wrap                    | No separate implementations; the existing flow/wrap API covers these distinct composition modes.                      | `COMPONENT_VARIANT` / `RECIPE_OR_PATTERN`                       | `Stack` direction/wrap and composition contracts                                           |
| Grid / AutoGrid / Columns                  | No generic brittle breakpoint primitive was needed.                                                                   | `RECIPE_OR_PATTERN` / `REJECTED_DUPLICATE`                      | Existing `FormGrid`/`ProductGrid` and intrinsic recipe geometry                            |
| Sidebar / Navigation rail                  | Existing shell/navigation contracts own persistent and adaptive navigation.                                           | `EXISTING_STABLE`, ADAPTIVE                                     | `Sidebar`, `MobileSidebar`, `NavigationRail`, `NavigationMenu`, `TopNavigation`            |
| Split                                      | Existing resizable two-pane Web interaction.                                                                          | `EXISTING_NEEDS_HARDENING` at contract-boundary level, WEB_ONLY | `SplitPane`; Native alternative is list/detail, not forced SplitPane mechanics             |
| MasterDetail                               | Semantic collection/detail relationship is a recipe/adaptive pattern, not the same as a simultaneous resizable split. | `RECIPE_OR_PATTERN`, ADAPTIVE intent                            | `master-detail` recipe and U03 adaptive pattern contract                                   |
| ScrollRegion / StickyRegion                | Existing bounded scroll owner; no page-local scroll primitive was added.                                              | `EXISTING_STABLE` / `DEFERRED` for further overlay layering     | `ScrollArea` plus recipe/shell ownership rules                                             |
| Inset / Bleed / Spacer / OverlayRegion     | No distinct system-wide gap proven in U04.                                                                            | `COMPOSITION_LOCAL` / `RECIPE_OR_PATTERN` / `DEFERRED`          | Composition and overlay contracts; consumer-local geometry remains local when not systemic |

### Actions

| Candidate / intent            | Before finding                                                                                                                                                     | Classification / platform                                    | Existing normalized owner                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------------------------- |
| Button                        | Stable public intent/size/loading API, but generic inherited platform metadata.                                                                                    | `EXISTING_STABLE`, BOTH / SAME_INTENT                        | `Button`                                                              |
| IconButton                    | Required `icon` and `label`, but base Web hit target was 34px/30px.                                                                                                | `EXISTING_NEEDS_HARDENING`, BOTH / SAME_INTENT               | `IconButton`                                                          |
| ButtonGroup / ActionGroup     | Independent action grouping exists; generic group metadata did not distinguish composition from activation.                                                        | `EXISTING_NEEDS_HARDENING`, BOTH / SAME_INTENT               | `ButtonGroup`; ActionGroup is a normalized naming variant             |
| ToggleButton / ToggleGroup    | `ToggleButton` and `ToggleButtonGroup` existed with `aria-pressed` and controlled selection, but inherited action metadata omitted persistent selection semantics. | `EXISTING_NEEDS_HARDENING`, BOTH / SAME_INTENT               | `ToggleButton` / `ToggleButtonGroup`; ToggleGroup is a naming variant |
| SplitButton                   | Legitimate primary action plus tightly related alternatives existed, but was classified as generic BOTH.                                                           | `EXISTING_NEEDS_HARDENING`, now ADAPTIVE / ALTERNATE_PATTERN | `SplitButton` + canonical `DropdownMenu` mechanics                    |
| MenuButton                    | Menu/overlay mechanics are a later layering boundary.                                                                                                              | `DEFERRED`, U06-owned                                        | `DropdownMenu`/`ActionMenu` trigger contract                          |
| FAB / FloatingAction          | No independent current product evidence justified a new canonical primitive.                                                                                       | `DEFERRED` / `REJECTED_DUPLICATE`                            | Consumer composition of `Button` or `IconButton`                      |
| SpeedDial                     | Existing bounded expandable quick-action cluster with a single labelled trigger.                                                                                   | `EXISTING_STABLE`, ADAPTIVE                                  | `SpeedDial`                                                           |
| LinkAction                    | Navigation is distinct from action activation, but a second action primitive is unnecessary.                                                                       | `COMPONENT_VARIANT` / `ALIAS` concept                        | `Link`                                                                |
| Copy / Share / Dismiss / Back | No materially distinct generic primitive contract was proven.                                                                                                      | `COMPONENT_VARIANT` / `RECIPE_OR_PATTERN`                    | Semantic `Button`/`IconButton` usage and consumer-owned handlers      |
| Toolbar action composition    | Existing `Toolbar`/`ActionBar` composition.                                                                                                                        | `EXISTING_STABLE`, CANONICAL_COMPONENT                       | `Toolbar` and `ActionBar`; U06 owns overflow mechanics                |

## 4. Gap analysis

The bounded audit found no missing Foundation or Layout primitive whose intent
could not already be expressed by the current catalog. The actual U04 gaps were
contract precision and action geometry:

1. `ButtonGroup`, `ToggleButton`, and `ToggleButtonGroup` inherited the generic
   action-family activation rule. That metadata did not tell an agent that a
   group is composition, that a toggle has persistent pressed/selection state,
   or that a toggle group owns bounded single/multiple selection.
2. `SplitButton` was a real reusable interaction, but its Web primary-plus-menu
   presentation and future Native primary-plus-sheet alternative were not
   explicit in the platform plane.
3. `IconButton` used a 34px default and 30px small visual box even though the
   shared token contract already supplied a 44px minimum interaction target.
   Toggle and split action geometry also contained repeated literal gap,
   padding, and trigger-width values.
4. No new token was necessary. Existing U01/U02 token roles were sufficient;
   the correction is a projection/consumer hardening, not a second source.

No donor visual API was imported or copied. The run used the existing canonical
behavior and the current U01–U03 contract planes; donor-read count in the
existing cold-start gate remained zero.

## 5. Foundations final coverage

Foundation coverage remains intentionally small and semantic:

- `Ten4SevenProvider` remains the utility/provider that resolves theme axes.
- `Typography` consumes the typed typography role map; consumers do not receive
  arbitrary product text styles.
- `T7Icon` consumes the local semantic icon vocabulary. Action components pass
  semantic `IconName` values; raw provider identifiers are not a consumer API.
- `Kbd` remains a Web semantic `<kbd>` surface. It does not imply a Native
  renderer.
- `Link` remains the navigation foundation with a Native renderer strategy
  descriptor and no change to its public API.
- `Label`, `Avatar`, `Badge`, `StatusChip`, `Image`, `AspectRatio`, `Skeleton`,
  `Progress`, `Surface`, `Card`, and `Panel` remain existing canonical owners
  in their existing catalog families. Their foundation concepts are reused;
  they are not duplicated into a second Foundation family.

Typography roles observed in the typed token runtime include display, heading,
body, label, caption, overline, button, navigation, card, table, input, and
metric roles. The role map is the source; CSS custom properties and Native
numeric values are projections.

## 6. Layout final coverage

The generated layout family contains 12 canonical entries:

`Section`, `Separator`, `ScrollArea`, `PageHeader`, `SectionHeader`, `Toolbar`,
`ActionBar`, `Container`, `Stack`, `SplitPane`, `PropertyInspector`, and
`BuilderCanvas`.

The U02 grammar contains 12 named intents and six semantic measures. The
important normalized decisions are:

- `Container` is the bounded content/rail owner and maps its public measure
  vocabulary through `compact`, `default`/control, `wide`, and `fill` to the
  typed `compact`, `control`, `wide`, and `fluid` roles. The typed contract also
  carries `content` and `reading` for recipe and text surfaces.
- `Stack` owns directional flow, spacing, alignment, justification, and
  wrapping. `Inline` is a flow intent, while `Cluster` is a wrapping-group
  intent; neither creates a parallel primitive.
- Grid geometry remains intrinsic in existing `FormGrid`/`ProductGrid` and
  recipe contracts. U04 did not introduce a universal desktop=3/tablet=2/
  mobile=1 implementation.
- `SplitPane` is explicitly Web-only because its pointer/keyboard resize
  mechanics are a simultaneous-pane interaction. Its Native alternative is
  `list-detail`; it is not forced into a Native renderer.
- Master/detail is preserved as a semantic relationship and adaptive recipe,
  separate from SplitPane mechanics.
- `ScrollArea` remains the bounded scroll owner. U04 did not create page-local
  `overflow: auto` or sticky systems, and U06 overlay layering remains deferred.

## 7. Actions final coverage

The generated action family contains eight canonical entries:

`Button`, `IconButton`, `ButtonGroup`, `ToggleButton`, `ToggleButtonGroup`,
`SplitButton`, `SpeedDial`, and `DragHandle`.

The final contract distinctions are:

- `Button`: explicit action activation with a small existing intent vocabulary
  (`primary`, `secondary`, `quiet`, `danger`), loading, disabled, focus, and
  pressed semantics. No color-named public variants were added.
- `IconButton`: required accessible `label`, semantic icon, loading/disabled
  behavior, and 44px minimum Web interaction target with a smaller visible SVG
  glyph.
- `ButtonGroup`: independent peer action composition, labelled group, ordered
  structure, reflow, and priority-aware layout. It is not a Tabs, segmented
  selection, or ToggleGroup substitute.
- `ToggleButton`: persistent pressed/selection state represented by
  `aria-pressed`; the contract is selection-aware without creating formatting
  variants such as `BoldToggle`.
- `ToggleButtonGroup`: bounded single/multiple selection with labelled group,
  ordered children, keyboard operation, and selected-state metadata.
- `SplitButton`: direct primary action plus tightly related alternatives. Web
  uses the existing canonical menu/overlay trigger; future Native presentation
  is a platform menu or sheet alternative.
- `SpeedDial`: existing bounded quick-action cluster; no new FAB family was
  manufactured.
- `DragHandle`: existing Web-only, consumer-owned reordering affordance.

## 8. Existing components hardened

The checkout already contained the substantive earlier component work for
`Kbd`, `Link`, `Container`, `Stack`, `SplitPane`, `SpeedDial`, and `DragHandle`.
Those existing implementations were preserved rather than re-authored.

The bounded U04 hardening present in the current dirty worktree and revalidated
in this run was:

| Area                | Change                                                                                                                                    | Evidence class       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Platform contract   | Added explicit composition/selection overrides for ButtonGroup, ToggleButton, and ToggleButtonGroup.                                      | `SOURCE`             |
| Platform contract   | Added `split-action` adaptive pattern and moved SplitButton to ADAPTIVE / ALTERNATE_PATTERN with Native `native-sheet` strategy metadata. | `SOURCE`             |
| Web action geometry | Added the existing `--t7-touch-target-min` minimum to IconButton; kept the 18px icon glyph independent of that target.                    | `SOURCE` / `RUNTIME` |
| Web action geometry | Replaced ToggleButton's repeated 7px gap and 12px padding with existing control tokens and applied the touch minimum.                     | `SOURCE` / `RUNTIME` |
| Web action geometry | Tokenized SplitButton primary/trigger target sizing and kept the two segments aligned.                                                    | `SOURCE` / `RUNTIME` |
| AI metadata         | Clarified group-vs-selection-vs-split-action use/avoid/state/accessibility/responsive guidance.                                           | `SOURCE`             |
| Regression proof    | Added a focused rendered test for icon targets, toggle selection, split menu, Escape dismissal, and narrow bounds.                        | `SOURCE` / `RUNTIME` |

## 9. Net-new canonical components

There are no net-new canonical components in this U04 run. This is
intentional: the admission rule did not identify a missing primitive after the
existing Foundation/Layout coverage was normalized.

The new `split-action` item is an adaptive platform contract pattern, not a
component, not a registry entry, and not a second implementation. It therefore
does not increase canonical component count and has no package component export
or Native renderer to claim.

## 10. Rejected candidates

| Candidate class | U04 decision                                                                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variants        | `PrimaryButton`, `SecondaryButton`, `DangerButton`, `SmallButton`, `LargeButton`, `BoldToggle`, and `ItalicToggle` remain variants/consumer usage, not canonical components.                              |
| Aliases         | `Text`, `Heading`, and `Code` remain Typography role vocabulary; `Divider` normalizes to Separator; `ToggleGroup` normalizes to ToggleButtonGroup; `LinkAction` normalizes to Link.                       |
| Duplicates      | `StatusBadge`, `SuccessBadge`, `ErrorBadge`, and `WarningBadge` are not separate components; status meaning uses Badge/StatusChip plus U01 semantic status roles. `Icon` is not duplicated beside T7Icon. |
| Blocks/Recipes  | Grid compositions, CenteredBoundedContent, MasterDetail, and toolbar/overflow compositions remain layout grammar or recipe/block concerns.                                                                |
| Domain-specific | Copy, Share, Back, Dismiss, Farm, Operations, Academy, and commerce-specific action names remain consumer composition or profile/domain concerns.                                                         |
| Deferred        | FAB, a generic MenuButton trigger family, Native split-action sheet implementation, Native DnD, and further overlay/sticky behavior remain deferred to the appropriate later contract/renderer queue.     |

## 11. Platform matrix after

`generated/component-contract-plane.json` reports the following canonical
matrix after regeneration:

| Platform              | Canonical entries |
| --------------------- | ----------------: |
| BOTH                  |                97 |
| ADAPTIVE              |                61 |
| WEB                   |                14 |
| NATIVE                |                 0 |
| Total canonical       |               172 |
| Aliases               |                 7 |
| Total catalog entries |               179 |

The Native count remains zero. BOTH/ADAPTIVE Native status remains `planned`
in the generated component matrix; Web is the implemented renderer. The
Native result is a renderer-neutral contract/descriptor boundary, not a device
runtime claim.

Representative final action metadata:

| Component         | Platform / strategy          | Native presentation         | Critical semantic states                      |
| ----------------- | ---------------------------- | --------------------------- | --------------------------------------------- |
| Button            | BOTH / SAME_INTENT           | `native-pressable`, planned | idle, focus, pressed, disabled, loading       |
| IconButton        | BOTH / SAME_INTENT           | `native-pressable`, planned | idle, focus, pressed, disabled, loading       |
| ButtonGroup       | BOTH / SAME_INTENT           | `native-pressable`, planned | ready, focus, constrained                     |
| ToggleButton      | BOTH / SAME_INTENT           | `native-pressable`, planned | idle, focus, pressed, selected, disabled      |
| ToggleButtonGroup | BOTH / SAME_INTENT           | `native-pressable`, planned | ready, focus, selected, disabled, constrained |
| SplitButton       | ADAPTIVE / ALTERNATE_PATTERN | `native-sheet`, planned     | idle, focus, pressed, expanded, disabled      |
| SpeedDial         | ADAPTIVE / ALTERNATE_PATTERN | `native-pressable`, planned | idle, focus, pressed, disabled, loading       |
| DragHandle        | WEB / NOT_APPLICABLE         | not applicable              | idle, focus, pressed, disabled, loading       |

## 12. Contract changes

`packages/contracts/src/component-platform.ts` remains the typed source for
platform decisions. U04 added:

- `AdaptivePatternId = "split-action"` and its Web/native renderer-neutral
  presentation contract;
- ButtonGroup composition metadata with group naming, ordered structure,
  control measure, touch target, and priority-order intent;
- ToggleButton selection metadata with pressed/selected states and keyboard
  obligations;
- ToggleButtonGroup bounded selection metadata with single/multiple selection
  state and ordered structure;
- SplitButton ADAPTIVE / ALTERNATE_PATTERN metadata with a Web semantic
  control, Native sheet alternative, expanded-state obligation, and U06-owned
  browser overlay dependency.

The contract change is additive metadata. Existing public component props and
existing package import paths were not renamed or removed.

## 13. Compatibility

| Change                                 | Compatibility classification | Notes                                                                                                                                                                 |
| -------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform metadata and adaptive pattern | `ADDITIVE`                   | Consumers gain retrieval and renderer strategy information; no runtime prop change.                                                                                   |
| AI catalog descriptions                | `ADDITIVE`                   | Improves agent selection and avoids action/selection misuse.                                                                                                          |
| IconButton minimum target              | `COMPATIBLE HARDENING`       | The visible glyph remains small; the clickable element may occupy the shared 44px target. This is an intentional accessibility geometry correction, not an API break. |
| ToggleButton gap/padding/minimum       | `COMPATIBLE HARDENING`       | Existing props, callbacks, and `aria-pressed` behavior remain unchanged.                                                                                              |
| SplitButton target alignment           | `COMPATIBLE HARDENING`       | Existing primary/menu API remains unchanged; only token-owned geometry and metadata are corrected.                                                                    |
| Native maturity                        | No promotion                 | Native implementations remain `planned`; no Expo/React Native component renderer was added.                                                                           |

## 14. Token changes, if any

No new token was introduced.

The inherited U01 ownership matrix remains the single ownership authority:

| Layer           | Owner and examples                                                                                                                         | Dimension policy                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| FOUNDATION      | Typed Ten4Seven token runtime; primitive ramps, reference space, type families, raw radius/elevation/motion, foundational sizing           | Global/customizable, derived, or fixed system semantic                   |
| SEMANTIC        | Semantic resolver; foreground, background, surface, border, focus, action, selected, status, disabled, data visualization                  | Derived or fixed system semantic                                         |
| LAYOUT          | Layout/recipe contract; page gutter, section rhythm, content/read/control/wide measures, minimum useful surface, systemic shell dimensions | Derived, profile-selected, or composition-local where explicitly bounded |
| COMPONENT       | Component contract; control/row/touch target, field/card/overlay/navigation/collection roles                                               | Component semantic or fixed system semantic                              |
| PRODUCT_PROFILE | Approved neutral, AAPM, Academy, Publishing, Farm, and Operations profile selection                                                        | Product profile only; never generic primitive ownership                  |
| SCOPE           | Bounded `ThemeScope` consumer context for inverse/contextual semantic overrides                                                            | Component semantic or composition-local; re-resolves the same contract   |

The permitted dimension classifications are `GLOBAL_CUSTOMIZABLE`, `DERIVED`,
`FIXED_SYSTEM_SEMANTIC`, `PRODUCT_PROFILE`, `COMPONENT_SEMANTIC`, and
`COMPOSITION_LOCAL`. Composition-local values are allowed to remain local when
they have no system-wide reuse obligation; repeated global/system geometry is
not allowed to become route-local CSS.

The deterministic resolver order is:

`SYSTEM_DEFAULTS → BASE_RECIPE → PRODUCT_PROFILE → THEME_OVERRIDE →
SCOPED_OVERRIDE → COMPONENT_STATE`.

`packages/tokens/src/theme.ts` applies the typed order. `Ten4SevenProvider` and
`ThemeScope` supply the applicable layers from `packages/ui/src/provider.tsx`;
component state is consumed at the component semantic boundary. Web custom
properties are derived delivery values, not an input layer or source of truth.

The Web projection consumes existing U01/U02 roles:

- `--t7-touch-target-min` (44px fixed system semantic minimum);
- `--t7-control-height` and the existing size projections;
- `--t7-control-gap`;
- `--t7-control-padding-inline`;
- existing focus, radius, color, typography, and motion variables already
  owned by the canonical token runtime.

The typed source remains `packages/tokens/src/theme.ts` and the foundation
ownership/resolution contract remains `packages/contracts/src/foundation.ts`.
The stylesheet is a Web projection/consumer. Native receives equivalent
resolved values from `buildNativeThemeSnapshot`; it does not parse CSS.

## 15. Layout/measure proof

`MEASURE_CONTRACT` contains six renderer-neutral roles: `compact`, `control`,
`content`, `wide`, `reading`, and `fluid`. The layout contract contains the
semantic grammar and deterministic measure mapping. `pnpm test:layout-contracts`
verified six measures, 12 grammar intents, deterministic six-stage resolution,
and Web/native projections.

Rendered proof:

- Existing `tests/q04-core-layout-actions.spec.ts` passed its 1440x900,
  1024x768, 768x1024, and 390x844 transfer/intrinsic/no-overflow checks.
- The same suite passed SplitPane keyboard Home/End and pointer resize at
  1024x768, with pane minimums and no pane overflow.
- The same suite passed bounded Component Lab section navigation and the
  range-slider geometry proof.
- New `tests/u04-foundations-layout-actions.spec.ts` passed narrow icon,
  toggle-group, and split-action geometry checks. Icon-only action boxes were
  at least 44px while their rendered SVG glyphs stayed below 30px.
- `tests/q04-responsive-shell.spec.ts` passed the existing responsive shell
  proof at 1440x900, 840x900, and 390x844; the 1024/768 intrinsic proof is in
  the core suite above.

## 16. Accessibility proof

The renderer-neutral platform plane exposes obligations rather than universal
DOM/ARIA implementation:

- Buttons and icon buttons carry accessible-name, actionable-role,
  disabled/loading, and focus/press obligations. `IconButton` requires a
  `label` prop and uses a semantic button.
- ToggleButton exposes committed pressed state with `aria-pressed`.
  ToggleButtonGroup exposes a labelled group and coordinated child selection.
- ButtonGroup exposes a labelled `role=group` and keeps action semantics on
  each child rather than presenting independent actions as a selection model.
- SplitButton exposes a named primary action and separately named alternatives
  trigger; the generated contract includes expanded-state and keyboard
  obligations. Menu focus/dismissal mechanics remain the canonical U06 overlay
  boundary.
- SplitPane exposes a separator role, value, keyboard resize, focus feedback,
  and pointer resize path.
- T7Icon remains decorative when embedded in a labelled action and supports a
  label when the icon itself is informative.

`tests/u04-foundations-layout-actions.spec.ts` passed the keyboard/selection/
menu interactions. `pnpm test:contrast` passed 284 recipe/mode pairs at WCAG
AA 4.5:1; the lowest exact-source pair was 4.67:1. `tests/universal-v2-theme.spec.ts`
passed the dark, contrast, reduced-motion, focus, and scoped-theme coverage in
the focused run.

## 17. Registry / AI projection

The projection path remains:

`packages/contracts/src` + `packages/ai/catalog/components.json`
→ `pnpm contracts:generate`
→ `generated/` and `packages/agent/generated/`.

No second decision manifest was added. Regeneration updated the component
contract plane and the four affected action component projections in both
projection trees. `packages/ui/src/index.ts` continues to export the canonical
UI modules, tokens, icons, and contract plane through the existing package
boundary.

Verified outputs:

- `pnpm test:component-system`: 172 canonical, 7 aliases, 29 recipes, 60
  blocks, singular Select model, and explicit taxonomy/relations.
- `pnpm test:ai`: 29 recipes, 179 components, 60 expressive blocks, 122
  semantic icons; cold-start references used 13 contract/catalog reads and
  zero donor reads.
- `pnpm test:final-ai-acceptance`: typed projections, positive retrieval,
  negative guidance, platform-aware retrieval, and isolated cold-start
  retrieval passed.
- `pnpm package:verify`: `@ten4seven/ui@1.0.0`, 24 root exports, bundled
  tokens/icons/motion, and self-contained styles passed.
- `pnpm test:native-mobile` and `pnpm test:native-expo`: shared contracts,
  CSS-independent Native projection, capability descriptors, and Expo Lab
  source consistency passed; device runtime remains a separate evidence class.

## 18. Showroom / Component Lab proof

The existing showroom/catalog architecture was used; no second catalog or
endless U04-specific card wall was created.

The rendered proof routes were:

- `/components/foundations` — five foundation catalog entries, including the
  existing Kbd/Link additions;
- `/components/layout` — 12 layout catalog entries;
- `/components/actions` — eight action catalog entries;
- `/components/icon-button`, `/components/toggle-button-group`, and
  `/components/split-button` — direct canonical action previews;
- `/component-lab#component-lab-core-layout-actions` — existing interactive
  SplitPane, TreeView, Transfer, SpeedDial, and navigation proof;
- `/theme-studio` and `/operations-tracker` — existing responsive shell and
  token/runtime regression surfaces.

`tests/q04-core-layout-actions.spec.ts` and
`tests/q04-responsive-shell.spec.ts` passed their route/contract and no-
overflow assertions. Existing consumer surfaces were used as regression
evidence only; no Auth, Public Showcase, Publishing Store, Operations, or Farm
product redesign was performed.

## 19. Browser QA

### Required viewport matrix

| Viewport | Rendered proof                                                                                    | Result                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1440x900 | Component-family catalog indexing, Component Lab core proof, Theme Studio, action routes          | `PASS` in the focused U04 suites; existing action snapshot mismatch is recorded as baseline debt below |
| 1024x768 | SplitPane pointer/keyboard bounds, pane minimums, no overflow                                     | `PASS`                                                                                                 |
| 768x1024 | Transfer intrinsic options, compact ColorPicker/TagsInput, card bounds, no overflow               | `PASS`                                                                                                 |
| 390x844  | Transfer/no overflow, icon target, toggle selection, split-action geometry/menu, responsive shell | `PASS`                                                                                                 |

### State and mode coverage

Dark mode, higher contrast, scoped inverse themes, and reduced motion were
covered by the passing universal theme and static contrast gates. Loading,
disabled, pressed/selected, focused, and expanded menu behavior were covered by
the existing action fixtures and the new U04 test.

The broader 28-test focused browser batch returned 18 passing tests and 10
failures. The failures are not silently converted to PASS:

- two `action-availability` screenshot assertions differ from the checked-in
  snapshots because the existing dirty checkout has prior palette/shell/layout
  changes; the DOM, keyboard, tooltip, disabled/loading, and axe assertions
  before the snapshot passed;
- one existing CommandMenu accessibility test stops on a strict-mode duplicate
  `Open command menu` fixture (the same page exposes an existing U10 canary);
- seven global-foundation scenario assertions cannot find the existing chart
  tooltip after focus. The U04 action/layout/theme tests and static contrast
  gates pass; no chart code was changed in U04.

These are classified as `INHERITED BASELINE` or `UNRELATED / OUT OF SCOPE`, not
as a current U04 regression. The dedicated U04 browser suite completed 10/10.

## 20. Tests

| Command                                                                                                                                                                                                                                                           | Result / evidence                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm contracts:generate`                                                                                                                                                                                                                                         | `PASS` — generated 234 contract projections, token recipe CSS, theme CSS, and three DTCG exports.                                                                  |
| `pnpm test:contracts`                                                                                                                                                                                                                                             | `PASS` — 7 aliases, 29 recipes, typed operational recipes, ThemeProfile round-trip, compact retrieval.                                                             |
| `pnpm test:responsive-contracts`                                                                                                                                                                                                                                  | `PASS` — 9 behavior contracts, 11 module states, tokenized AppShell slots.                                                                                         |
| `pnpm test:layout-contracts`                                                                                                                                                                                                                                      | `PASS` — 6 measures, 12 grammar intents, six-stage resolution, Web/native projections.                                                                             |
| `pnpm test:component-system`                                                                                                                                                                                                                                      | `PASS` — 172 canonical, 7 aliases, 29 recipes, 60 blocks.                                                                                                          |
| `pnpm test:ai`                                                                                                                                                                                                                                                    | `PASS` — 179 components, 122 icons, 29 recipes, 60 blocks; cold-start donor reads 0.                                                                               |
| `pnpm test:consistency`                                                                                                                                                                                                                                           | `PASS` — canonical consistency across 28 UI source files.                                                                                                          |
| `pnpm test:token-governance`                                                                                                                                                                                                                                      | `PASS` — 25 component modules, no raw component colors/palette dependencies/ungoverned timing.                                                                     |
| `pnpm test:component-coverage`                                                                                                                                                                                                                                    | `PASS` after the declared `pnpm tokens:coverage` refresh; seven high-impact selector families and 1000 raw-pixel occurrences explicitly tracked as migration debt. |
| `pnpm test:native-mobile`                                                                                                                                                                                                                                         | `PASS` — shared contract/token/icon/a11y boundary without Native renderer dependency.                                                                              |
| `pnpm test:native-expo`                                                                                                                                                                                                                                           | `PASS` — seven profiles, 18 capabilities, 179 derived maturity rows, CSS-independent boundary.                                                                     |
| `pnpm test:dtcg`                                                                                                                                                                                                                                                  | `PASS` — three deterministic DTCG outputs.                                                                                                                         |
| `pnpm test:contrast`                                                                                                                                                                                                                                              | `PASS` — 284 recipe/mode pairs at WCAG AA.                                                                                                                         |
| `pnpm test:final-ai-acceptance`                                                                                                                                                                                                                                   | `PASS`.                                                                                                                                                            |
| `pnpm test:component-corpus`                                                                                                                                                                                                                                      | `PASS` — 2221 raw entries, 2073 normalized candidates, 172 canonical, zero legitimate U13 gaps.                                                                    |
| `pnpm package:build`                                                                                                                                                                                                                                              | `PASS` — `@ten4seven/ui@1.0.0`.                                                                                                                                    |
| `pnpm package:verify`                                                                                                                                                                                                                                             | `PASS` — 24 root exports and self-contained package styles/assets.                                                                                                 |
| `pnpm typecheck`                                                                                                                                                                                                                                                  | `PASS` — contracts, native, agent, agent build, and playground.                                                                                                    |
| `pnpm build`                                                                                                                                                                                                                                                      | `PASS` — Vite production build; existing large-chunk advisory only.                                                                                                |
| `pnpm test`                                                                                                                                                                                                                                                       | `PASS` — full repository static/package chain, including inherited later-queue verification scripts; no later queue implementation was performed.                  |
| `pnpm exec playwright test tests/u04-foundations-layout-actions.spec.ts tests/q04-core-layout-actions.spec.ts tests/q04-responsive-shell.spec.ts`                                                                                                                 | `PASS` — 10/10 rendered tests.                                                                                                                                     |
| `pnpm exec prettier --check packages/contracts/src/component-platform.ts packages/ui/src/styles.css packages/ai/catalog/components.json tests/u04-foundations-layout-actions.spec.ts docs/aapm/T7-UNIVERSAL-HARDENING-U04-FOUNDATIONS-LAYOUT-ACTIONS-EVIDENCE.md` | `PASS` — all U04-scoped source, test, and evidence files matched targeted formatting.                                                                              |
| `git diff --check`                                                                                                                                                                                                                                                | `PASS` — no whitespace errors.                                                                                                                                     |

The initial focused component-token coverage check reported a stale generated
report (computed 1003 versus recorded 1000). Running its declared generator,
`pnpm tokens:coverage`, refreshed the report; the final verification passed and
continues to track the 1000 literal-pixel debt explicitly.

## 21. Baseline debt

The following conditions remain separate from U04 acceptance:

- Repository-wide `pnpm format:check` remains `FAIL / INHERITED BASELINE` with
  501 files reported by Prettier. U04-authored files passed targeted formatting;
  mass-formatting was prohibited.
- The existing `action-availability` desktop/mobile screenshot baselines do not
  describe the current dirty checkout's palette, shell, and layout. Snapshots
  were not overwritten merely to obtain green output.
- The existing CommandMenu accessibility test has a duplicate unscoped
  `Open command menu` fixture from a later canary surface.
- The global foundation browser scenarios have an existing chart-tooltip focus
  observation. Chart implementation is outside U04.
- The token coverage report still records 1000 literal pixel measurements as
  migration debt. This is not evidence that every number must become a token;
  composition-local and browser-normalization values remain classified under
  U01 ownership rules.
- Native device/Expo runtime execution remains `UNVERIFIED` for U04. Static
  Native projection and capability descriptor checks passed, but no Native
  component renderer was started.

## 22. Deferred U05+ gaps

U04 stopped at its boundary. Deferred work includes:

- U05 forms, selection, date/time, files, and Native picker/file renderer work;
- U06 navigation, disclosure, overlay, menu, focus-dismissal, and sheet
  mechanics beyond the SplitButton metadata dependency;
- U07 data display, tables, collections, and virtualization;
- U08 charts, scheduling, maps, and engine adapters;
- U09 workflow/productivity/application patterns;
- U10 editors, builders, DnD, and AI power-user surfaces;
- U11 blocks, recipes, and product-profile composition;
- U12 Native/Expo parity and device capability runtime;
- U13 corpus normalization and U14 distribution/final consumer validation.

No U05+ source implementation was performed in this queue.

## 23. Gate

PASS FOR U05
