# T7 Universal Hardening U12 — Native / Expo Parity + Device Capability Evidence

Status: bounded U12 execution only. The prerequisite gate was `U11 = PASS FOR U12`.

Evidence labels used below:

- `SOURCE` — typed contract, renderer, fixture, or configuration inspected in the checkout.
- `TEST` — deterministic repository verifier, typecheck, build, or export result.
- `EMULATOR` — behavior observed on the Android AVD, including the debug development-client + Metro path.
- `BROWSER` — rendered local Web export observed in a browser surface.
- `UNVERIFIED` — the required simulator, device, platform API, or assistive-technology proof was unavailable.
- `INHERITED / ENVIRONMENT` — a host, toolchain, or pre-existing repository limitation, not a U12 renderer assertion.

## 1. Coordinates

| Item                | Evidence                                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Repository          | `D:\\SA\\ten4seven-ui` (`fahziputraj/ten4seven-ui`)                                                                         |
| Branch              | `codex/icons-curated-solar-style`                                                                                           |
| HEAD at U12 start   | `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`                                                                                  |
| Parent at U12 start | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                                                                                  |
| Runtime             | Node `v22.23.2`, pnpm `11.22.0`, Windows host                                                                               |
| Starting worktree   | 86 existing `git status --short` entries; all treated as user-owned and preserved                                           |
| Scope               | Native / Expo capability hardening only; no U13+ work, product mobile app, commit, push, PR, merge, tag, publish, or deploy |

The earlier U01–U11 changes remained dirty throughout. The U12 delta is limited to the Native Lab composition, the Lab's Expo-compatible dependency alignment, the generated workspace lockfile, and this evidence file.

## 2. Native architecture before

The historical U12 contract baseline represented Native as `CONTRACT_ONLY`: typed Native metadata, capability contracts, and a renderer boundary existed, but an actual renderer canary had not been proven. At the beginning of this bounded retry, the accepted checkout already contained the partial React Native renderer and deterministic Expo Lab source from the earlier U12 preparation; the missing evidence was a valid runtime path.

No second token system, Native component package, or consumer mobile application was introduced. The Native package remained a separate renderer boundary from the Web package.

## 3. Native maturity before

| Surface                      | Start-of-run maturity                                      | Evidence                                                |
| ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| `@ten4seven/native` contract | `PARTIAL_RENDERER` source status                           | `SOURCE` — existing typed metadata and renderer exports |
| Native foundation renderer   | Source present; runtime unproven                           | `SOURCE` / `UNVERIFIED`                                 |
| Expo Lab                     | Deterministic source present; runtime unproven             | `SOURCE` / `UNVERIFIED`                                 |
| Android                      | AVD and toolchain available; no valid Lab session at start | `EMULATOR` available / runtime pending                  |
| iOS                          | No Apple toolchain or simulator on this Windows host       | `UNVERIFIED`                                            |

The run does not promote every catalog row to mature Native coverage. The source projection still describes the bounded renderer as partial; the new runtime result is a `FUNCTIONAL_CANARY` at the Lab/family scope only.

## 4. Native renderer architecture after

The implemented architecture is:

```text
packages/contracts/src + packages/tokens/src
        -> shared theme/profile resolver
        -> buildNativeThemeSnapshot (JS/TS values)
        -> @ten4seven/native renderer (React Native primitives)
        -> apps/native-lab deterministic canary
```

The renderer uses React Native primitives (`View`, `Text`, `Pressable`, `TextInput`, `FlatList`, `Modal`) and `react-native-safe-area-context`. `NativeThemeProvider`, `NativeScreen`, semantic icons, native controls, sheets, tabs, lists, list/detail, feedback, sync, conversation, and approval surfaces are already present at the package boundary. Native consumes resolved JS/TS values and never parses CSS variables or CSS files.

The U12 source correction is in `apps/native-lab/App.tsx`: the Data family now makes the canonical virtualized `NativeList` the owning scroll surface. The former outer `ScrollView` no longer nests the list/detail FlatList canary, eliminating the Android nested-virtualization warning without changing the public renderer contract.

## 5. Shared token/profile consumption

| Concern            | Source / behavior                                                        | Result                                                                                                   |
| ------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Theme resolution   | `resolveTheme`, `resolveThemeConfigLayers`                               | `SOURCE` / `TEST` — shared Web/Native contract path                                                      |
| Native projection  | `buildNativeThemeSnapshot` and `packages/contracts/src/native-mobile.ts` | `SOURCE` / `TEST` — CSS-independent JS/TS snapshot                                                       |
| Profiles           | Seven typed profiles, including `aapm-farm`                              | `TEST` — `test:native-expo` reports 7 profiles                                                           |
| Appearance         | System, light, dark                                                      | `EMULATOR` — Lab exposed all three; Dark selection was observed                                          |
| Density            | Comfortable, default, compact, dense                                     | `SOURCE` / `EMULATOR` — shared controls and resolved measure                                             |
| Motion             | Full and reduced-motion roles                                            | `SOURCE` / `TEST`; Lab exposes the control, but a separate runtime reduced-motion toggle was not claimed |
| Typography         | Native text uses shared roles and `allowFontScaling`                     | `SOURCE` / `TEST`; system font-scale variation remains unverified                                        |
| Chart/data palette | Shared semantic chart palette in the Native snapshot                     | `SOURCE` / `TEST`; no chart engine was added                                                             |

The local browser render displayed: `Resolved values are JS/TS data from the shared token runtime. The renderer does not parse CSS.` It also displayed the selected `aapm-farm` profile, resolved dark surface, chart palette, elevation, and measure values.

## 6. Native Component Lab

`apps/native-lab/App.tsx` is a deterministic, domain-neutral Expo Lab with controls for product profile, appearance, density, motion, and family. Its families are Foundations, Forms, Navigation, Data, Workflow, AI / Power, and Device. It intentionally contains no application authentication, API, persistence, upload, camera, location, push, secure-storage, or background-task implementation.

The Lab is a proof surface, not a product mobile app. Its Device family renders deterministic capability states as presentation fixtures, and its Workflow/AI families emit no business transition, tool execution, or persistence side effects.

Evidence: `SOURCE`, `TEST`, `EMULATOR`, and `BROWSER`. The exported Web Lab also rendered successfully in a local browser at `http://127.0.0.1:4174/`.

## 7. Family parity matrix

The table distinguishes source/contract maturity from the bounded Android runtime canary. iOS remains explicit rather than inferred.

| Family                             | Platform intent                  | Renderer / adaptive strategy                                                           | Android U12 evidence                                                                      | iOS evidence |
| ---------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------ |
| Foundations / Actions              | `BOTH`, `SAME_INTENT`            | Native text, icon, surface, press, loading, disabled, and touch-target primitives      | `EMULATOR` — Lab loaded; accessibility tree exposed actions                               | `UNVERIFIED` |
| Layout / Surface                   | `BOTH` / `ADAPTIVE`              | `NativeScreen`, Safe Area provider, Stack/Inline/Container/Surface                     | `SOURCE` + `EMULATOR` — root loaded below system status area; cutout variation not tested | `UNVERIFIED` |
| Forms / Selection                  | `BOTH` / `ADAPTIVE`              | TextInput/control primitives; Select becomes native option sheet/list                  | `EMULATOR` — fields, states, IME, and option sheet observed                               | `UNVERIFIED` |
| Date / Time                        | `ADAPTIVE`                       | Shared intent; native picker/list is an alternate presentation                         | `SOURCE` / `TEST`; runtime not exercised                                                  | `UNVERIFIED` |
| Files / Media                      | `ADAPTIVE`                       | Browser input versus consumer-owned native picker/camera source contract               | `SOURCE` only; no picker/API integration                                                  | `UNVERIFIED` |
| Navigation                         | `ADAPTIVE`                       | Tabs and BottomNavigation on narrow surfaces; native stack/list-detail boundary        | `EMULATOR` — route tabs and selected state observed                                       | `UNVERIFIED` |
| Overlays                           | `ADAPTIVE`                       | Dialog/AlertDialog/Drawer intent rendered as Modal/Sheet with system Back              | `EMULATOR` — sheet open, dismiss, and Back observed                                       | `UNVERIFIED` |
| Feedback / Sync                    | `BOTH` / `ADAPTIVE`              | Banner, Toast/status intent, progress, sync state presentation                         | `EMULATOR` — progress and deterministic sync/retry cards rendered; no network engine      | `UNVERIFIED` |
| Data / Collections                 | `ADAPTIVE`                       | DataTable intent becomes virtualized list and list/detail on narrow surfaces           | `EMULATOR` — list/detail selection and owning FlatList observed                           | `UNVERIFIED` |
| Workflow                           | `ADAPTIVE`                       | Workspace intent adapts to single-task mobile composition                              | `SOURCE` + `TEST`; separate Android workflow interaction not claimed                      | `UNVERIFIED` |
| AI / Power                         | `ADAPTIVE`                       | Conversation, PromptComposer, citations, tool status, approval, keyboard-safe composer | `EMULATOR` — AI canary and composer semantics observed                                    | `UNVERIFIED` |
| Profiles                           | `BOTH`                           | Same semantic structure; profile values resolve through shared runtime                 | `EMULATOR` — `aapm-farm` and dark controls observed; all seven are source-tested          | `UNVERIFIED` |
| Charts / Maps / Editors / Builders | Web or alternate native strategy | Engine/adapters remain bounded and lazy; no U12 engine bundle                          | `SOURCE` / `TEST` only                                                                    | `UNVERIFIED` |

## 8. Adaptive component matrix

| Contract                                        | Web                  | Native / narrow surface                                                             | U12 result                                                  |
| ----------------------------------------------- | -------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Select                                          | Popup/listbox        | Native sheet or bounded option list with one authoritative trigger                  | `SOURCE` + `TEST` + `EMULATOR`                              |
| Dialog / AlertDialog                            | Modal dialog         | Native Modal with explicit close, alert semantics, and system Back where applicable | `SOURCE` + `TEST` + `EMULATOR`                              |
| Drawer / Sheet                                  | Contextual drawer    | Bottom/side sheet intent on narrow surface                                          | `SOURCE` + `TEST` + `EMULATOR` for bounded sheet            |
| Sidebar / BottomNavigation                      | Dense sidebar        | Bottom navigation / native navigation alternative                                   | `SOURCE` + `TEST` + `EMULATOR` for Lab family navigation    |
| DataTable                                       | Dense table/grid     | Virtualized record list and list/detail; no squeezed desktop table                  | `SOURCE` + `TEST` + `EMULATOR`                              |
| MasterDetail                                    | Two-pane workspace   | List then detail with back/up intent                                                | `SOURCE` + `TEST` + `EMULATOR` at Lab canary scope          |
| DecisionWorkspace / Kanban                      | Workspace/board      | Single-task or alternate list/board composition                                     | `SOURCE` + `TEST`; business behavior remains consumer-owned |
| Date/time, files, charts, maps, editor, builder | Web controls/engines | Alternate native contract or deferred adapter                                       | `SOURCE` / `TEST`; runtime `UNVERIFIED`                     |

Tabs remain navigation; Stepper/ProgressTracker remain process-state patterns. No duplicate mobile primitive family was created.

## 9. Safe-area evidence

`SafeAreaProvider` and `NativeScreen` are part of the renderer source. The Android Lab launched as a native activity with content below the system status region, and the UI hierarchy loaded normally: `SOURCE` + `EMULATOR`. A notched device, inset variation, landscape safe-area edges, and iOS safe-area behavior were not available: `UNVERIFIED`.

## 10. Virtual-keyboard evidence

The Android Forms canary exposed a native `Record name` input. Tapping it produced `mInputShown=true` and `mImeWindowVis=3` in `dumpsys input_method`, with the field focused in the accessibility tree. Password, invalid, textarea, checkbox, radio, switch, and select semantics remained visible. Hardware-keyboard, IME action policy, and iOS keyboard proof are `UNVERIFIED`.

## 11. Native navigation evidence

The Navigation family rendered Overview, Activity, and Settings tabs, a selected route, an explicit sheet action, and a Back/up intent. The sheet opened in the Android activity and the system Back dismissed it while `MainActivity` remained focused: `EMULATOR`. Native stack/deep-link routing and iOS navigation are outside this renderer-only queue: `UNVERIFIED` / consumer-owned.

## 12. Overlay evidence

The bounded native contextual sheet rendered its title, close action, bounded copy, and Done action. System Back dismissed it. The Select canary separately rendered a native option sheet with Daily, Weekly, and Unavailable option states. Dialog, AlertDialog, Drawer, Popover, Tooltip, and HoverCard contracts remain normalized through the shared overlay/layer grammar; only the bounded sheet runtime was exercised on Android.

Focus restoration, scroll lock, z-index/layer ordering, and dismissal semantics are represented in source/tests. TalkBack/VoiceOver and multi-overlay stress proof are `UNVERIFIED`.

## 13. Forms and selection evidence

The Android accessibility hierarchy exposed:

- labelled text input `Record name` with synthetic value;
- password input `Secret value` with password semantics;
- invalid field and correction message;
- long-content `Notes` field;
- checked `Include archived` checkbox;
- selected `Daily cadence` radio;
- enabled `Enabled` switch with ON state;
- `Cadence` button advertising a native selection sheet;
- empty selection state.

This proves the renderer can present shared semantic states; validation, persistence, permissions, and domain values remain consumer-owned. Date/time and file-source runtime APIs were not invoked.

## 14. Data and list/detail evidence

The U12 Lab composition fix makes the canonical `NativeList` own scrolling and places the list/detail header, records, selection, and footer inside that surface. Android displayed `Lot 101`, `Lot 102`, `Lot 103`, and `Open record` actions. Selecting Lot 101 displayed `Ready for review` and `Back to list`. The bounded logcat capture contained no `VirtualizedLists should never be nested` warning after the fix: `EMULATOR`.

The renderer contract still distinguishes DataTable from lightweight Table and does not own sorting, filtering, pagination, query, fetch, or business selection truth. Advanced virtualization remains an engine behavior boundary.

## 15. Workflow evidence

Workflow contracts and adaptive metadata are present and deterministic in source/tests. The Native renderer exposes workflow-capable primitives and the Lab contains a domain-neutral Workflow family, but this run did not claim a full Android workflow mutation, assignment, transition, offline sync, or persistence proof. Those remain consumer-owned and are `SOURCE` + `TEST`, not runtime product evidence.

## 16. Device capabilities

The typed capability plane contains 18 IDs: `safeArea`, `virtualKeyboard`, `camera`, `qrScanner`, `documentPicker`, `photoLibrary`, `permissions`, `location`, `haptics`, `pushEntry`, `deepLink`, `offline`, `sync`, `networkRetry`, `secureStorage`, `backgroundTask`, `orientation`, and `fontScale`.

The Device family rendered the deterministic state vocabulary, including permission-required/denied, unavailable, ready, active, detected, success, error, loading, offline, pending sync, retry, and orientation/font-scale state cards: `SOURCE` + `EMULATOR`. This is presentation proof only. No camera, QR, location, push, secure-storage, background-task, or platform permission API was called.

| Capability class                                                          | Expo mode                                    | U12 decision                                           |
| ------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------ |
| Safe area, keyboard, haptics, orientation, font scale                     | `EXPO_GO` where Expo provides the capability | Renderer/source contract; Android root/IME canary only |
| Permissions and offline/sync/retry presentation                           | `EXPO_GO` for presentation                   | Consumer supplies state/adapter; Lab uses fixtures     |
| Camera, QR scanner, location, push entry, secure storage, background task | `DEV_CLIENT_REQUIRED`                        | Adapter boundary only; no API integration in U12       |
| Document/photo source                                                     | `EXPO_GO` alternate pattern where supported  | Consumer-owned source contract; runtime unverified     |

## 17. Android QA

Environment: Android SDK at `C:\\Users\\user\\AppData\\Local\\Android\\Sdk`, JDK `17.0.20.1+1`, AVD `t7-u12-api37`, Android 17 `x86_64`, 1080x1920, `emulator-5554`, boot completed. CMake `3.22.1`, NDK `27.1.12297006`, and Android build tools were available.

The checkout-root Android assemble reached Expo/RN native compilation but failed before APK creation with repeated long-path warnings and `ninja: error: manifest 'build.ninja' still dirty after 100 tries`. That is classified `INHERITED / ENVIRONMENT`, not a Native renderer assertion.

An isolated physical mirror at `C:\\t7u12` (not a repository artifact) used the same source snapshot and the SDK-aligned Lab dependencies. Its debug development-client build completed, the APK was installed on the AVD, Metro was served on the mirror source, and `adb reverse tcp:8081 tcp:8081` supplied the JavaScript bundle. The activity resumed with `ReactNativeJS: Running "main"`; the Lab UI, forms, sheet, list/detail, dark appearance, AI, and Device state panels were observed. The mirror was removed after evidence collection.

The release-bundle attempt failed after Metro emitted the bundle at the Windows Expo/Hermes command-path step, so no standalone release APK is claimed. This is `INHERITED / ENVIRONMENT`; the valid U12 runtime class is Android emulator + debug development client + Metro.

## 18. iOS evidence

This host is Windows and has no `xcrun`, `simctl`, iOS simulator, or Apple device toolchain. iOS renderer metadata and source strategy remain present, but iOS simulator/device runtime, VoiceOver, safe-area variation, native navigation, sheet, picker, haptics, and font-scale evidence are `UNVERIFIED`.

## 19. Expo Go versus development client

No Expo Go package was installed on the AVD, so an Expo Go launch is `UNVERIFIED`. The renderer-only foundations and presentation contracts are intended to remain Expo Go-compatible where supported. The actual proof used a development client because the bounded Native renderer is a customized native package and the current host needed the native Android build path.

The distinction is explicit: Expo Go capability compatibility is not claimed from the debug client result, and the debug client result is not a production release or physical-device result.

## 20. Accessibility evidence

Android `uiautomator` exposed labelled controls, button roles, text input content descriptions, password semantics, checkbox/radio/switch state, selected tabs, and sheet close actions. The form canary exposed the IME-focused field and state text. Native source includes semantic descriptors, focus/press handling, minimum touch-target tokens, and `allowFontScaling`: `SOURCE` + `TEST` + bounded `EMULATOR` tree evidence.

TalkBack, VoiceOver, physical keyboard traversal, switch access, high-contrast OS mode, and a full automated native accessibility audit were unavailable: `UNVERIFIED`.

## 21. Orientation and font-scale evidence

The Lab configuration declares Expo orientation `default`; the AVD proof ran in its default portrait rotation. `NativeText` uses shared typography and `allowFontScaling`. The Lab exposes orientation and font-scale capability states, but rotation, large-system-font, layout reflow, and reduced-motion runtime toggles were not independently exercised. Those are `SOURCE` + `TEST` with runtime variation `UNVERIFIED`.

## 22. Performance and bundle evidence

The Android emulator canary loaded the Lab and the corrected Data FlatList without the nested-virtualization warning. No native frame benchmark, memory profile, large-data benchmark, or production bundle budget was claimed. The Web export produced the Expo Web bundle (approximately 1.1 MB JavaScript in the prior export output); the full Playground build remained green.

Chart, map, editor, builder, and other heavy engines were not added. Any future engine must remain an adapter/lazy-loading boundary and must not become part of the core Native renderer bundle by default.

## 23. Web regression

| Verification                                         | Result  | Evidence class / note                                                                              |
| ---------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `pnpm --filter @ten4seven/native-lab export:web`     | PASS    | `TEST`; exported current Lab source                                                                |
| Local exported Lab browser render                    | PASS    | `BROWSER`; root loaded with renderer controls, profile/appearance controls, and Foundations family |
| `pnpm typecheck`                                     | PASS    | `TEST`; contracts, Native, agent, and Playground typechecks                                        |
| `pnpm build`                                         | PASS    | `TEST`; Playground Vite production build                                                           |
| `pnpm --filter @ten4seven/native-lab typecheck`      | PASS    | `TEST`                                                                                             |
| `pnpm test:native-expo`                              | PASS    | `TEST`; 7 profiles, 18 capabilities, 179 derived component maturity rows                           |
| `pnpm test:native-mobile`                            | PASS    | `TEST`; shared contract/token/icon/accessibility proof                                             |
| Targeted Prettier check for U12 App/package/evidence | PASS    | `TEST`                                                                                             |
| `git diff --check`                                   | PASS    | `TEST`; exit 0                                                                                     |
| `pnpm format:check`                                  | FAIL    | `INHERITED / ENVIRONMENT`; 529 repository files remain outside the bounded U12 formatting scope    |
| root `pnpm test`                                     | NOT RUN | Intentionally omitted because the root aggregate includes later-queue U13/U14 acceptance suites    |
| checkout-root Android assemble                       | FAIL    | `INHERITED / ENVIRONMENT`; long-path Ninja/CMake failure before APK                                |
| Android development-client emulator canary           | PASS    | `EMULATOR`; current source semantics loaded through Metro                                          |

No typed contract or catalog source changed in U12, so `pnpm contracts:generate` was not rerun and no generated projection was manually edited.

## 24. AI and catalog impact

The existing AI/native projections remain the source of truth: Native component maturity is derived from the catalog and typed Native contract, not from the number of renderer files. The AI / Power Lab canary displayed conversation/tool/approval status and a keyboard-safe PromptComposer surface with synthetic copy; it did not execute an external tool or AI provider call.

No new public AI component API, model/provider contract, tool authorization, side-effect action, hidden reasoning representation, or catalog row was introduced.

## 25. Dependencies and engine impact

Only the private `apps/native-lab` Expo baseline was aligned to the Expo 57 toolchain identified by the bounded Android build: Expo `57.0.22`, React/React DOM `19.2.3`, React Native `0.86.3`, `react-native-safe-area-context` `5.7.0`, `@expo/metro-runtime` `^57.0.15`, and TypeScript `^6.0.3`. The workspace `pnpm-lock.yaml` was regenerated by pnpm for that manifest change.

`packages/native/package.json`, its public peer boundary, and its source renderer were not forked or replaced. No chart/map/editor/builder/DnD engine dependency was added. The package-library peer range remains compatible with the existing renderer boundary; the SDK alignment is Lab-only.

## 26. Known Native gaps

1. Checkout-root Android builds still hit the long pnpm/CMake path and Ninja dirty-manifest failure; the short physical mirror proved the aligned source can compile.
2. A standalone Windows release bundle did not produce a trustworthy APK because the Expo/Hermes command-path step failed; release evidence is not claimed.
3. Expo Go was not installed/launched on the AVD.
4. No iOS simulator/device, physical Android device, TalkBack, VoiceOver, real cutout, orientation variation, font-scale variation, or hardware keyboard proof was available.
5. Camera, QR scanner, document/photo picker, location, permissions API, haptics API, push entry, deep link routing, secure storage, background tasks, offline database, sync engine, conflict resolution, and network retry remain adapter/consumer boundaries.
6. Charts, maps, editors, builders, and rich drag-and-drop engines remain outside the U12 renderer canary.
7. Native DataTable sorting, pagination, filtering, query, and large-data performance are not owned by the renderer.
8. Native maturity remains partial renderer plus bounded functional canary, not mature cross-platform family coverage.

## 27. U13 readiness

| Readiness question                             | Result                                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Is there a CSS-independent Native resolver?    | Yes — shared JS/TS snapshot; `SOURCE` + `TEST`                                                         |
| Is there a real Native foundation renderer?    | Yes — existing React Native renderer; Android canary loaded it                                         |
| Is there a deterministic Native Component Lab? | Yes — Expo Lab with synthetic fixtures                                                                 |
| Are adaptive canaries present?                 | Yes — Select, overlays, navigation, list/detail, forms/IME, AI composer                                |
| Are device capability contracts deterministic? | Yes — 18 typed capabilities and Lab state cards                                                        |
| Is Android runtime proof available?            | Yes — AVD development-client + Metro; not physical/release                                             |
| Is iOS runtime proof available?                | No — host has no Apple toolchain; explicitly `UNVERIFIED`                                              |
| Are consumer boundaries preserved?             | Yes — auth, API, persistence, business rules, permissions, sync, and device APIs remain consumer-owned |

The available Android emulator is sufficient for this bounded renderer canary. Missing iOS, Expo Go, physical-device, platform-API, and assistive-technology evidence is recorded as follow-up rather than represented as parity.

## 28. Baseline debt and preservation

The user-owned worktree began with 86 dirty status entries from accepted earlier queues. U12 preserved them without reset, clean, stash, mass-format, or unrelated repair. Before the evidence update, the U12 implementation added the Lab App, private Lab package manifest, and workspace lockfile; this artifact is the only additional U12 evidence mutation.

Repository-wide `pnpm format:check` still fails on 529 paths, including older docs/tests/configuration and generated or unrelated surfaces. The U12 App, package manifest, and evidence file were checked in the bounded targeted formatting command. `git diff --check` passes. The temporary `C:\\t7u12` diagnostic mirror was verified and removed; it is not part of the worktree.

## 29. Gate

PASS FOR U13

The shared semantic/token plane, CSS-independent Native resolver, existing React Native renderer, deterministic Expo Lab, adaptive canaries, and Android emulator development-client proof satisfy the bounded U12 objective. Native maturity remains honest: iOS, Expo Go, physical devices, release APK, platform capability APIs, and mature all-family parity are not claimed.

**PASS FOR U13**

U13 was not started.
