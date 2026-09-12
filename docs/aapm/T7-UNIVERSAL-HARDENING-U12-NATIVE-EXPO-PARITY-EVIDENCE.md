# T7 Universal Hardening U12 — Native / Expo Parity + Device Capability Evidence

This is the bounded evidence record for `T7-UNIVERSAL-HARDENING-U12`. It covers
the shared contract plane, the first real React Native renderer foundation, the
Expo Native Component Lab, and the device-capability ownership boundary. U13
and every later queue were not executed.

Evidence labels used below are deliberately conservative:

- `SOURCE` means the repository source or typed contract states the behavior.
- `TEST` means a deterministic repository verifier, typecheck, or unit test
  passed.
- `OBSERVED` means the rendered local browser surface was inspected.
- `EMULATOR` means only that the Android emulator itself booted; it does not
  imply that the Native Lab rendered on it.
- `PROPOSED` means a future adapter/strategy is described but not implemented.
- `UNVERIFIED` means the required platform or device proof was not available.

## 1. Coordinates

| Item                       | Evidence                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Repository                 | `D:\\SA\\ten4seven-ui` (`fahziputraj/ten4seven-ui`)                                    |
| Work item                  | `T7-UNIVERSAL-HARDENING-U12-NATIVE-EXPO-PARITY`                                        |
| Execution date             | 2026-09-13, Asia/Jakarta                                                               |
| Branch                     | `codex/icons-curated-solar-style`                                                      |
| HEAD at discovery          | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                                             |
| Initial worktree inventory | 632 paths from `git status --short`; the checkout already contained earlier queue work |
| Scope                      | U12 only; no U13/U14/AAPM/Farm Mobile work                                             |
| Git boundary               | No commit, push, PR, merge, tag, or publish was performed                              |

The worktree is intentionally dirty. Earlier U01–U11 changes and unrelated
user changes were preserved and are not treated as U12 delta evidence.

## 2. Native architecture before

Before U12, `packages/native/src/index.ts` provided a CSS-independent contract
adapter and typed descriptors, but there was no React Native renderer export,
no RN primitives, and no Native Lab app. The Web package remained the only
rendering implementation. There was no checked-in Expo app entry point and no
Android/iOS runtime proof surface.

The pre-U12 maturity was therefore `CONTRACT_ONLY`: shared meaning, token
resolution, icon semantics, collection/visualization/workflow canaries, and
composition metadata existed, but “contract exists” was not represented as
“native UI renders.”

## 3. Native maturity before

| Area                   | Before U12                                                   | Evidence class          |
| ---------------------- | ------------------------------------------------------------ | ----------------------- |
| Native package         | Contract adapter only                                        | `SOURCE`                |
| Native components      | None in a React Native renderer                              | `SOURCE`                |
| Expo app               | None                                                         | `SOURCE`                |
| Android                | No AVD or app proof at discovery                             | `SOURCE` / `UNVERIFIED` |
| iOS                    | No simulator/toolchain on this Windows host                  | `UNVERIFIED`            |
| Native theme           | Typed native snapshot seam existed, but no renderer consumer | `SOURCE`                |
| Device capability APIs | Contract descriptors only; consumer-owned integrations       | `SOURCE`                |

The explicit U12 maturity transition is from `CONTRACT_ONLY` to
`PARTIAL_RENDERER`. It is not `FUNCTIONAL_CANARY` or
`MATURE_FAMILY_COVERAGE` because native runtime proof did not complete.

## 4. Native renderer architecture after

U12 adds a separate renderer at
`packages/native/src/renderer.tsx` and exposes it as
`@ten4seven/native/renderer`. It does not import `@ten4seven/ui`, `react-dom`,
browser globals, CSS, CSS variable syntax, `fetch`, local storage, or a donor
UI library.

The renderer foundation contains the following bounded primitives and
strategies:

| Concern                 | Native renderer implementation                                                                              | Evidence         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------- |
| Theme provider          | `NativeThemeProvider` resolves `resolveNativeTheme` and provides concrete JS/TS values                      | `SOURCE`, `TEST` |
| Screen root             | `NativeScreen` with `SafeAreaProvider`/`useSafeAreaInsets`                                                  | `SOURCE`, `TEST` |
| Typography/icon         | `NativeText` with `allowFontScaling` and semantic `NativeIcon` names                                        | `SOURCE`, `TEST` |
| Layout/surface          | `NativeStack`, `NativeInline`, `NativeContainer`, `NativeSurface`                                           | `SOURCE`, `TEST` |
| Actions                 | `NativeButton`, `NativeIconButton`, `Pressable`, pressed/disabled/loading state, 44 px minimum touch target | `SOURCE`, `TEST` |
| Forms                   | `NativeField`, password, textarea, checkbox, radio, switch                                                  | `SOURCE`, `TEST` |
| Selection               | One `NativeSelect` trigger with a native `Modal`/`FlatList` sheet strategy                                  | `SOURCE`, `TEST` |
| Overlay                 | `NativeSheet`, `NativeDialog`, `NativeAlertDialog`, `onRequestClose`                                        | `SOURCE`, `TEST` |
| Navigation              | `NativeTabs`, `NativeBottomNavigation`, direct-entry/back intent composition                                | `SOURCE`, `TEST` |
| Collections             | `NativeList`/`FlatList` and `NativeMasterDetail` list-to-detail adaptation                                  | `SOURCE`, `TEST` |
| AI/workflow             | conversation, prompt composer, citation, tool, approval, progress, sync banner                              | `SOURCE`, `TEST` |
| Capability presentation | state cards and haptic intents only; no platform API or business logic                                      | `SOURCE`, `TEST` |

The renderer is intentionally partial. It establishes the render seam and
representative family behavior without pretending that camera, secure storage,
push, background work, chart engines, maps, editors, or product persistence
are component-library responsibilities.

## 5. Shared token/profile consumption

The renderer-neutral sources are:

- `packages/contracts/src/native-expo.ts` for U12 maturity, platform strategy,
  capability, adaptive, family, haptic, and offline/sync contracts;
- `packages/contracts/src/native-mobile.ts` for the typed native token shape;
- `packages/contracts/src/foundation.ts` for token ownership, dimension
  classification, measure vocabulary, and resolution order;
- `packages/contracts/src/brand-profile.ts` for product-profile ownership;
- `packages/tokens/src/theme.ts` for the shared resolver and
  `buildNativeThemeSnapshot` projection.

The deterministic resolution order is:

`SYSTEM_DEFAULTS → BASE_RECIPE → PRODUCT_PROFILE → THEME_OVERRIDE → SCOPED_OVERRIDE → COMPONENT_STATE`

`resolveThemeConfigLayers` applies the shared contract order. The native
adapter supplies the base recipe, product profile, and theme-level appearance/
density/motion values, then `buildNativeThemeSnapshot` converts the resolved
theme into concrete native data. Renderer state such as pressed, disabled,
invalid, busy, selected, and loading is applied at the native component layer.
The U12 verifier also exercises all six generic stages with distinct sentinel
values, so resolution-order behavior is deterministic rather than inferred
from CSS.

The native snapshot includes the following token families:

| Ownership layer    | Native projection                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundation         | concrete colors, numeric spacing, raw radius values, numeric elevation and motion                                                           |
| Semantic           | canvas, surface, raised surface, foreground, muted text, border, focus, primary/secondary/quiet/danger actions, success/warning/danger/info |
| Layout             | compact/control/content/reading/wide/fluid measures with minimum/preferred/maximum bounds                                                   |
| Component          | control/row/card/section/field spacing, control/card/panel radius, touch target                                                             |
| Product profile    | all seven exposed profiles resolve through the existing brand/theme recipes                                                                 |
| Scope/state        | shared contract resolver vocabulary; native component state remains semantic renderer input                                                 |
| Data visualization | typed chart palette plus five concrete chart colors                                                                                         |

`buildNativeThemeSnapshot` now also emits numeric elevation records for flat,
standard, and soft themes and a chart palette/colors record. Native consumers
receive opaque six-digit hex colors, numbers, and typed role maps; they never
parse `var(--t7-...)` or Web CSS.

Profile canaries verified by the native-expo test are:

`neutral-product`, `aapm-core`, `aapm-farm`, `aapm-operations`, `aapm-erp`,
`aapm-academy`, and `aapm-public`.

Light/dark resolution, Farm primary `#318139`, Farm accent `#D4451A`, touch
target minimum, measures, elevation, chart colors, full motion, and reduced
motion were checked for all seven profiles.

## 6. Native Component Lab

`apps/native-lab` is a deterministic Expo app with `expo/AppEntry`,
`userInterfaceStyle: automatic`, default orientation, Android/iOS identities,
and Metro single-page Web export. It is a system proof surface, not a product
application and not a place for API/auth/storage/business fixtures.

The lab exposes controls for all seven profiles, system/light/dark appearance,
four density options, full/reduced motion, and the following family panels:

Foundations/actions, forms/selection, navigation/overlays, data/master-detail,
workflow/offline-sync, AI/power, and device capabilities. It visibly states
that API, authentication, persistence, upload, camera, location, push,
secure-storage, and background-task implementations are not bundled.

`pnpm --filter @ten4seven/native-lab typecheck` passed.
`pnpm --filter @ten4seven/native-lab export:web` passed and produced the Expo
Metro Web bundle at `apps/native-lab/dist` (the generated directory is ignored
by `apps/native-lab/.gitignore`).

Rendered browser proof was observed at `http://localhost:4174/` after serving
that export locally. The page title, shared `aapm-farm` profile readout,
system-to-dark resolution, chart/elevation/measure values, semantic tabs,
forms, native select dialog, navigation sheet, adaptive list/detail, workflow
pending-sync state, AI composer, and 18 capability cards were visible in the
accessibility/DOM snapshot. Browser console warning/error inspection returned
an empty list.

## 7. Family parity matrix

This is the canonical/derived maturity matrix rather than a claim that every
row has device runtime proof. The generated projection contains 17 family rows,
35 native renderer component ids, 8 alternate component ids, and a derived
maturity row for all 179 catalogued components.

| Family              | Platform class | Web  | Android           | iOS               | Native strategy/status                                               | Evidence                                  |
| ------------------- | -------------- | ---- | ----------------- | ----------------- | -------------------------------------------------------------------- | ----------------------------------------- |
| Foundations         | BOTH           | FULL | PARTIAL           | PARTIAL           | same intent: text, surface, badge, icon, typography, theme           | `SOURCE` + `TEST`                         |
| Layout              | BOTH           | FULL | PARTIAL           | PARTIAL           | flexbox, ScrollView, safe area, runtime dimensions, measure roles    | `SOURCE` + `TEST`                         |
| Actions             | BOTH           | FULL | PARTIAL           | PARTIAL           | Pressable, pressed state, 44 px target, accessibility state          | `SOURCE` + `TEST`                         |
| Forms               | BOTH           | FULL | PARTIAL           | PARTIAL           | native TextInput/control primitives; keyboard QA pending             | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Selection           | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | popup/listbox on Web; sheet/native list on Native                    | `SOURCE` + `TEST`                         |
| Date/time           | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | picker adapter boundary proposed; production picker deferred         | `PROPOSED`                                |
| Files               | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | document/image/camera source presentation; no upload                 | `PROPOSED`                                |
| Navigation          | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | tabs, bottom navigation, back/up, list/detail                        | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Overlays            | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | Modal/sheet with explicit close and system-back callback             | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Feedback            | BOTH           | FULL | PARTIAL           | PARTIAL           | banner, status, progress, toast, reduced-motion intent               | `SOURCE` + `TEST`                         |
| Data                | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | FlatList and list/detail instead of a squeezed table                 | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Charts              | ADAPTIVE       | FULL | PLANNED           | PLANNED           | chart semantics remain an engine boundary; no engine bundled         | `PROPOSED`                                |
| Maps                | ADAPTIVE       | FULL | PLANNED           | PLANNED           | map semantics remain an engine boundary; no engine bundled           | `PROPOSED`                                |
| Workflow            | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | work queue, decision workspace, wizard, Kanban consumer compositions | `SOURCE` + `TEST`                         |
| AI/power            | ADAPTIVE       | FULL | ALTERNATE_PATTERN | ALTERNATE_PATTERN | message list, composer, citation, tool, approval                     | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Profiles            | BOTH           | FULL | PARTIAL           | PARTIAL           | seven profiles resolve from shared theme runtime                     | `SOURCE` + `TEST`, native `UNVERIFIED`    |
| Device capabilities | NATIVE         | N/A  | PARTIAL           | PARTIAL           | state/adapter contract; platform APIs and device QA pending          | `SOURCE`, `PROPOSED`, native `UNVERIFIED` |

## 8. Adaptive component matrix

| Contract/candidate  | Platform | Web presentation                | Native presentation                           | U12 status                                                         |
| ------------------- | -------- | ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| Select              | ADAPTIVE | popup/listbox                   | sheet/native picker/bounded native list       | partial renderer; observed Web export, native runtime `UNVERIFIED` |
| DataTable           | ADAPTIVE | dense table/grid when justified | FlatList record list with detail/action path  | partial renderer; source + browser observation                     |
| MasterDetail recipe | ADAPTIVE | split/list-detail composition   | list → detail with direct-entry-safe back/up  | partial renderer; source + browser observation                     |
| Operational Kanban  | ADAPTIVE | lanes/cards with pointer DnD    | lane selector/tabs → card list                | planned native alternate; movement engine deferred                 |
| Tooltip/Popover     | ADAPTIVE | hover/focus popup               | contextual press/help surface                 | planned native alternate                                           |
| AI conversation     | ADAPTIVE | bounded thread + composer       | bounded message list + keyboard-safe composer | partial renderer; source + browser observation                     |
| Editor/Builder      | WEB      | editor/canvas contract          | preview/basic text/property detail only       | Web-only boundary honored; native not applicable                   |

## 9. Safe-area evidence

`NativeThemeProvider` wraps the tree in `SafeAreaProvider`. `NativeScreen` reads
`useSafeAreaInsets` and applies the selected edge insets. `NativeSheet` and
`NativeSelect` use the bottom inset when calculating the bounded sheet padding.
This is `SOURCE` and `TEST` evidence from the renderer typecheck and native
verifier.

The exported Web rendering was `OBSERVED`, but React Native Web does not prove
safe-area behavior on a physical notch/cutout. The AVD booted but did not
produce an APK, so native safe-area runtime behavior is `UNVERIFIED`.

## 10. Virtual-keyboard evidence

`NativePromptComposer` uses `KeyboardAvoidingView`, a scrollable message/list
region, and a labelled `TextInput`; the renderer also keeps the primary action
in the keyboard-safe composition contract. The capability contract defines
focused-field, active-keyboard, dismissal, validation, and persistence
ownership explicitly.

The source and typecheck are `SOURCE`/`TEST`. The AI composer and labelled
textbox were visible in the exported Web DOM (`OBSERVED`). No Android APK was
installed and no physical keyboard/IME interaction completed, therefore
virtual-keyboard runtime behavior is `UNVERIFIED`.

## 11. Navigation evidence

`NativeTabs` and `NativeBottomNavigation` use native touch/press semantics and
expose selected state. `NativeMasterDetail` carries list/detail and direct-entry
back/up intent. The Lab navigation panel also includes an explicit “Back / up
intent” control.

The browser observation showed semantic `tablist`/`tab` roles and a selected
route in the exported Lab (`OBSERVED`). Native renderer typecheck and the U12
verifier passed (`TEST`). Android/iOS navigation runtime and native back
gesture proof remain `UNVERIFIED`.

## 12. Overlay evidence

`NativeSheet`, `NativeDialog`, and `NativeAlertDialog` use React Native
`Modal`, an explicit close action, `onRequestClose`,
`accessibilityViewIsModal`, safe-area padding, and a bounded sheet layout.
`NativeSelect` uses the same single-trigger principle with a native
`Modal`/`FlatList` list strategy.

The browser observation opened the navigation sheet and showed its labelled
close action and Done action. It also opened the select dialog, showed Daily,
Weekly, and a disabled option, selected Weekly, and reflected Weekly on the
trigger (`OBSERVED`). Native system-back/dismissal on Android/iOS is
`UNVERIFIED` because the APK was not built.

## 13. Form/selection evidence

The renderer provides labelled `TextInput`, secure password input, multiline
textarea, checkbox, radio, native switch, and one-trigger `NativeSelect`. It
represents default, focused, invalid, disabled, read-only, pending, selected,
empty, and loading-related states without a Web primitive dependency.

The Lab browser DOM exposed labelled Record name, Secret value, Invalid field,
Notes, Include archived, Daily cadence, Enabled, Cadence, and Empty selection
controls. Invalid helper text, read-only password presentation, checked switch,
disabled option, empty-selection placeholder, and Weekly selection were
observed. This is `SOURCE` + `TEST` + `OBSERVED`; native touch/IME proof is
`UNVERIFIED`.

## 14. Data/List adaptive evidence

`NativeList` is backed by `FlatList` and has loading, error, and empty props.
`NativeMasterDetail` chooses a wide two-pane intent at 720 px and above and a
narrow list/detail path below that threshold. This is a renderer strategy, not
a claim that a Web DataTable implementation runs on Native.

The Lab browser Data panel showed Lot 101, Lot 102, Lot 103, the selected-record
path, a FlatList fixture, and a labelled progress bar (`OBSERVED`). Sorting,
pagination, column management, pull-to-refresh, and business data remain
consumer responsibilities; Android/iOS collection runtime is `UNVERIFIED`.

## 15. Workflow evidence

`NativeSyncBanner`, `NativeApprovalPanel`, `NativeConversation`,
`NativePromptComposer`, `NativeCitationList`, `NativeToolCallCard`, and
`NativeProgress` establish presentation seams for workflow and AI patterns.
The contract owns presentation and accessibility intent; the consumer owns
queueing, persistence, authorization, conflict policy, retry execution, and
network truth.

The shared U12 contract makes the presentation sequence explicit:

`offline → pendingSync → syncing → synced`

and also models failed/retry paths. The Lab browser showed the Offline state,
then the Changes pending sync state after selecting `pendingSync`, plus the
presentation-only approval actions (`OBSERVED`). No sync engine or mutation was
executed.

## 16. Device capabilities

The typed contract defines 18 capability ids, execution mode, platform class,
renderer strategy, states, accessibility obligations, and system/consumer
ownership. All rows are state/presentation contracts; none silently embeds an
API client, permission flow, persistence engine, or business operation.

| Capability      | Platform | Execution mode      | Strategy          | U12 implementation/proof                                          |
| --------------- | -------- | ------------------- | ----------------- | ----------------------------------------------------------------- |
| safeArea        | NATIVE   | EXPO_GO             | NATIVE_RENDERER   | renderer source; native runtime `UNVERIFIED`                      |
| virtualKeyboard | NATIVE   | EXPO_GO             | NATIVE_RENDERER   | renderer source; IME runtime `UNVERIFIED`                         |
| camera          | NATIVE   | DEV_CLIENT_REQUIRED | NATIVE_RENDERER   | adapter boundary only; `PROPOSED`/`UNVERIFIED`                    |
| qrScanner       | NATIVE   | DEV_CLIENT_REQUIRED | NATIVE_RENDERER   | scanner boundary only; `PROPOSED`/`UNVERIFIED`                    |
| documentPicker  | ADAPTIVE | EXPO_GO             | ALTERNATE_PATTERN | picker boundary only; `PROPOSED`/`UNVERIFIED`                     |
| photoLibrary    | ADAPTIVE | EXPO_GO             | ALTERNATE_PATTERN | media-source boundary only; `PROPOSED`/`UNVERIFIED`               |
| permissions     | BOTH     | EXPO_GO             | ALTERNATE_PATTERN | permission-state presentation only; `PROPOSED`/`UNVERIFIED`       |
| location        | NATIVE   | DEV_CLIENT_REQUIRED | NATIVE_RENDERER   | location adapter boundary only; `PROPOSED`/`UNVERIFIED`           |
| haptics         | NATIVE   | EXPO_GO             | NATIVE_RENDERER   | `NativeHapticIntent`; dispatch adapter not bundled                |
| pushEntry       | NATIVE   | DEV_CLIENT_REQUIRED | ALTERNATE_PATTERN | notification-entry boundary only; `PROPOSED`/`UNVERIFIED`         |
| deepLink        | BOTH     | EXPO_GO             | ALTERNATE_PATTERN | direct-entry intent only; app routing owns integration            |
| offline         | BOTH     | EXPO_GO             | SAME_INTENT       | state/banner presentation; consumer owns connectivity             |
| sync            | BOTH     | EXPO_GO             | SAME_INTENT       | pending/syncing/synced/failure presentation; consumer owns engine |
| networkRetry    | BOTH     | EXPO_GO             | SAME_INTENT       | retry presentation; consumer owns request/backoff                 |
| secureStorage   | NATIVE   | DEV_CLIENT_REQUIRED | NATIVE_RENDERER   | safe status boundary only; no secrets/storage                     |
| backgroundTask  | NATIVE   | DEV_CLIENT_REQUIRED | NATIVE_RENDERER   | status boundary only; no scheduler                                |
| orientation     | NATIVE   | EXPO_GO             | NATIVE_RENDERER   | runtime-dimension intent; no rotation proof                       |
| fontScale       | NATIVE   | EXPO_GO             | NATIVE_RENDERER   | `allowFontScaling`/layout intent; no system-scale proof           |

The Lab’s Device panel rendered all capability fixtures with permission,
unavailable, loading, offline, retry, orientation, font-scale, and haptic
intent controls (`OBSERVED`). This is not device capability proof.

## 17. Android QA

Android SDK tooling was present:

- `adb`: `C:\\Users\\user\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe`;
- `emulator`: `C:\\Users\\user\\AppData\\Local\\Android\\Sdk\\emulator\\emulator.exe`;
- `avdmanager`: `C:\\Users\\user\\AppData\\Local\\Android\\Sdk\\cmdline-tools\\latest\\bin\\avdmanager.bat`;
- JDK 17 was available.

An AVD named `t7-u12-api37` was created and booted. `adb devices` reported
`emulator-5554 device` and `sys.boot_completed=1`. This is `EMULATOR` evidence
for the environment only.

`expo run:android` was attempted. The generated Gradle project first exposed a
pnpm workspace Node-resolution/hermes path issue; the generated
`apps/native-lab/android/app/build.gradle` was boundedly adjusted for that
local attempt. A no-build-cache retry then reproduced the native build
failure. The terminal ended with:

`ninja: error: manifest 'build.ninja' still dirty after 100 tries`

The log also contained repeated Windows CMake object-path warnings for the
long pnpm/expo-modules-core path. No debug APK appeared under
`apps/native-lab/android/app/build/outputs/apk/debug`, no package was installed,
and no Native Lab Android screen or TalkBack session was observed. Android
rendered UI, safe area, IME, touch, system back, and capability execution are
therefore `UNVERIFIED`.

## 18. iOS

This execution host is Windows. `xcrun` and `simctl` were unavailable, no iOS
simulator was attached, and no physical iPhone/iPad was available for this
queue. The Expo app config contains iOS identity/supports-tablet metadata, but
that is `SOURCE` only. iOS renderer, safe-area, keyboard, accessibility,
permission, capability, orientation, and physical-device behavior are
`UNVERIFIED`.

## 19. Expo Go vs Dev Client matrix

| Surface/capability                                                                  | Intended mode           | Rationale                                                 | Actual U12 proof                                    |
| ----------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- | --------------------------------------------------- |
| Theme, profile, density, motion, typography, layout                                 | EXPO_GO                 | No native module beyond renderer/safe-area contract       | Web export `OBSERVED`; Expo Go launch `UNVERIFIED`  |
| Safe area, keyboard-safe composition, forms, selection, navigation, overlays, lists | EXPO_GO                 | Expo-compatible renderer primitives and safe-area context | `SOURCE` + `TEST`; native launch `UNVERIFIED`       |
| Document picker, photo-library alternate pattern                                    | EXPO_GO                 | Contract allows Expo-compatible source adapters           | `PROPOSED`; no picker integration                   |
| Offline/sync/retry presentation                                                     | EXPO_GO                 | Consumer state adapter; no network dependency in library  | Web fixture `OBSERVED`; native `UNVERIFIED`         |
| Orientation/font scaling                                                            | EXPO_GO                 | Runtime dimensions and native font scaling                | `SOURCE` + `TEST`; device/system proof `UNVERIFIED` |
| Camera and QR scanner                                                               | DEV_CLIENT_REQUIRED     | Permission/native camera module boundary                  | `PROPOSED`; no dev client                           |
| Location                                                                            | DEV_CLIENT_REQUIRED     | Permission/native location module boundary                | `PROPOSED`; no dev client                           |
| Push entry                                                                          | DEV_CLIENT_REQUIRED     | Notification/deep-entry module boundary                   | `PROPOSED`; no dev client                           |
| Secure storage                                                                      | DEV_CLIENT_REQUIRED     | App-owned secure-value adapter                            | `PROPOSED`; no dev client                           |
| Background task                                                                     | DEV_CLIENT_REQUIRED     | App-owned scheduler/lifecycle adapter                     | `PROPOSED`; no dev client                           |
| SIMULATOR_ONLY / DEVICE_REQUIRED cases                                              | As required by consumer | Reserved execution vocabulary in the contract             | No target executed                                  |

The Native Lab is configured for `EXPO_GO`, but Expo Go itself was not
launched on a physical device or emulator. The Web export is not substituted
for that proof.

## 20. Accessibility

The renderer source provides:

- `accessibilityRole`, `accessibilityLabel`, `accessibilityHint`, and
  `accessibilityState` on actions, fields, choices, tabs, lists, progress,
  overlays, and capability fixtures;
- selected/disabled/busy/invalid state communication;
- `accessibilityViewIsModal` and `onRequestClose` on modal surfaces;
- labelled text inputs and a labelled primary composer action;
- `allowFontScaling={true}` by default;
- readable text for status meaning rather than color-only status;
- semantic icon names rather than vendor/provider ids.

Typecheck, source assertions, and the exported Web accessibility/DOM snapshot
passed (`SOURCE` + `TEST` + `OBSERVED`). No TalkBack, VoiceOver, native screen
reader, switch-control, or physical-device focus traversal test completed;
those remain `UNVERIFIED`.

## 21. Orientation/font-scale

`app.json` uses `orientation: default`. `NativeMasterDetail` reads
`useWindowDimensions` and recomposes between a narrow list/detail path and a
wide two-pane path. `NativeText` leaves `allowFontScaling` enabled unless a
consumer explicitly opts out. The capability contract requires reading-order
preservation and no clipping/overlap at larger text.

These are `SOURCE` + `TEST` findings. Rotation and system font-scale snapshots
were not possible because the APK did not build; runtime proof is
`UNVERIFIED`.

## 22. Performance/bundle

The Expo Web export completed with one Metro JavaScript bundle of approximately
1.1 MB and `index.html`/`metadata.json`. It rendered in the local browser with
an empty warning/error console (`OBSERVED`). `FlatList` is used for long native
collections (`SOURCE`), but no native frame-time, memory, startup, or scroll
benchmark was run.

The Android attempt emitted repeated CMake path-length warnings and failed
before APK creation. Native bundle size, startup, frame rate, memory, and
Hermes/runtime performance are `UNVERIFIED`.

## 23. Web regression

The required Web and repository checks produced this bounded result:

| Command                                          | Result                                                                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                        | PASS; 234 projections generated                                                                                              |
| `pnpm test`                                      | PASS; includes the U12 native-expo verifier, prior queue verifiers, token tests, package proofs, and component-system checks |
| `pnpm test:native-expo`                          | PASS; 7 profiles, 18 capabilities, 179 derived component rows                                                                |
| `pnpm test:native-mobile`                        | PASS                                                                                                                         |
| `pnpm --filter @ten4seven/contracts typecheck`   | PASS                                                                                                                         |
| `pnpm --filter @ten4seven/native typecheck`      | PASS                                                                                                                         |
| `pnpm --filter @ten4seven/native-lab typecheck`  | PASS                                                                                                                         |
| `pnpm typecheck`                                 | PASS                                                                                                                         |
| `pnpm build`                                     | PASS; Playground Vite production build                                                                                       |
| `pnpm --filter @ten4seven/native-lab export:web` | PASS; Expo Metro Web export                                                                                                  |
| Local exported Native Lab browser render         | PASS as `OBSERVED`; console warnings/errors empty                                                                            |
| `git diff --check`                               | PASS; only existing CRLF conversion warnings                                                                                 |
| `pnpm format:check`                              | FAIL; 504 already-dirty/unformatted repository paths remain                                                                  |

Only the four U12-authored source files identified by the targeted check were
formatted. The extended projection generator remains part of the pre-existing
dirty contract-generation surface and was not mass-reformatted. No Web
product route was rewritten by U12.

## 24. AI/catalog

The typed source and generated projections are aligned:

- `packages/contracts/src/native-expo.ts` is the U12 contract source;
- `packages/contracts/src/canonical.ts` registers `CANONICAL_CONTRACTS.nativeExpo`;
- `scripts/generate-contract-projections.mjs` emits `native-expo.json` and the
  derived `componentMaturity` projection;
- `generated/native-expo.json` and `packages/agent/generated/native-expo.json`
  are generated from the same source;
- the projections contain the seven profile canaries, 18 capability contracts,
  family/adaptive matrices, resolver order, native lab metadata, dependency
  policy, and 179 derived catalog maturity rows;
- `scripts/verify-native-expo.mjs` rejects stale projections, CSS parsing,
  parallel native theme sources, forbidden Web imports, missing renderer/lab
  markers, and invalid maturity/parity vocabulary.

No second manually maintained AI decision manifest was introduced. Native
component IDs are derived from the typed U12 lists and the existing catalog;
they do not silently promote every catalog row to native parity.

## 25. Dependencies

`@ten4seven/native` owns only the existing workspace contract/token dependencies
and declares React, React Native, and `react-native-safe-area-context` as peer
dependencies. Its U12 development versions are React 19.2.8, React Native
0.81.5, and safe-area-context 5.6.2.

`apps/native-lab` uses Expo 57.0.22, React 19.2.8, React Native 0.81.5,
react-native-web 0.21.x, and safe-area-context 5.6.2. `react-dom` is present
only for the Expo Web target; the native renderer source does not import it.

No donor UI library, parallel primitive library, chart engine, map engine,
editor engine, upload API, camera API, storage library, or business-data
dependency was added. `pnpm-lock.yaml` changed as the in-scope workspace
dependency installation result.

## 26. Known Native gaps

The following are intentionally recorded rather than hidden behind metadata:

1. Android Gradle/native compilation failed before APK creation because Ninja
   repeatedly reported a dirty manifest in the long pnpm CMake path.
2. iOS simulator/toolchain proof was unavailable on the Windows host.
3. Expo Go was not launched; there is no physical-device proof.
4. No TalkBack, VoiceOver, rotation, font-scale, IME, back-gesture, notch,
   permission, haptics, push, camera, scanner, location, secure-storage, or
   background-task runtime test completed.
5. Camera, QR scanner, location, push, document/media picker, secure storage,
   and background-task entries are adapter contracts, not shipped platform API
   integrations. Consumers own permission, lifecycle, persistence, upload,
   encryption, scheduling, and authorization.
6. Charts and maps remain engine boundaries. Editors/builders remain Web-only
   or preview/detail alternates; no heavy engine was forced into Native.
7. Native DataTable sorting/pagination/column management and business sync are
   not implemented in the generic renderer.
8. Native visual regression, native performance benchmarks, and screen-reader
   automation remain required follow-up evidence.

These gaps are why the contract maturity is `PARTIAL_RENDERER` and the queue
gate is not a pass-forward gate.

## 27. U13 readiness

| U13 readiness question                          | U12 answer                                                                          | Evidence                               |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------- |
| Can the component’s semantic intent be stated?  | Yes for the renderer/family rows covered here                                       | `SOURCE` + `TEST`                      |
| Is platform classification explicit?            | Yes: BOTH/WEB/NATIVE/ADAPTIVE in typed contracts and derived rows                   | `SOURCE` + `TEST`                      |
| Is the Web/native strategy explicit?            | Yes: SAME_INTENT/NATIVE_RENDERER/ALTERNATE_PATTERN/NOT_APPLICABLE                   | `SOURCE` + `TEST`                      |
| Are token roles and profile ownership explicit? | Yes; native values resolve from the shared runtime and seven profiles               | `SOURCE` + `TEST`                      |
| Is useful measure/layout intent explicit?       | Yes for measure roles and adaptive list/detail; device geometry proof pending       | `SOURCE` + `TEST`                      |
| Are meaningful states represented?              | Yes for renderer and capability presentation fixtures; integrations remain deferred | `SOURCE` + `OBSERVED`                  |
| Are accessibility obligations represented?      | Yes in source and contracts; TalkBack/VoiceOver proof pending                       | `SOURCE` + `TEST`, native `UNVERIFIED` |
| Are capability ownership boundaries explicit?   | Yes; 18 capability contracts separate system presentation from consumer adapters    | `SOURCE` + `TEST`                      |
| Is a native engine required?                    | Only where a future chart/map/editor/gesture adapter justifies it; none was bundled | `SOURCE` + `PROPOSED`                  |
| Is AI/catalog metadata available?               | Yes; generated native-expo projection and 179 maturity rows                         | `SOURCE` + `TEST`                      |
| Is Web regression proof available?              | Yes, except the repository-wide pre-existing format debt                            | `TEST` + `OBSERVED`                    |
| Is native QA proof available?                   | No; Android build and iOS/Expo Go/device evidence are blocked                       | `UNVERIFIED`                           |

The native QA answer is a hard blocker for advancing to U13 as a completed
parity queue.

## 28. Baseline debt

The checkout already contained a large dirty surface from earlier queues and
user work. U12 did not reset, clean, normalize, stage, commit, or publish that
surface. The initial inventory was 632 paths; the U12 additions/changes are
bounded to the native contract/projection, native renderer export, Expo Lab
source/configuration, verifier, dependency lock/manifest changes, the scoped
Lab generated-output ignore rules, and this evidence file. In particular,
`packages/native/src/index.ts` and earlier native-mobile verification changes
were preserved as pre-existing dirty work.

The generated `apps/native-lab/.expo`, `dist`, and prebuild `android` folders
remain disposable local runtime artifacts and are ignored by the new Lab-local
`.gitignore`; they are not treated as source-of-truth files. The Android
prebuild was only used for the bounded compile attempt.

Repository-wide formatting currently reports 504 paths. This is not a U12
visual rewrite and was not mass-fixed because doing so would overwrite
unrelated queue/user formatting. Targeted U12-authored files are formatted;
the projection generator retains inherited dirty formatting.

## 29. Gate

FAIL / BLOCKED

Reason: U12 successfully establishes a typed, generated, CSS-independent
native renderer foundation and a rendered Expo/Web Native Lab proof surface,
but the hard native acceptance boundary is not met. The Android AVD booted yet
the Expo/Gradle build failed before APK creation; iOS tooling/simulator and
Expo Go/physical-device access were unavailable; and no native screen-reader,
IME, capability, orientation, haptics, or device runtime evidence exists.

No U13 work was executed.
