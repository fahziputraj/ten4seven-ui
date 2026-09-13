# T7-UNIVERSAL-HARDENING-U05 — Forms, Selection, Date/Time & Files Evidence

Status: U05 implementation was already present in the current HEAD and was
revalidated in this bounded execution. No additional U05 component family or
U06+ implementation was started.

## 1. Coordinates

| Field                    | Evidence                                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Repository               | `fahziputraj/ten4seven-ui` · `D:\\SA\\ten4seven-ui`                                                                                 |
| Queue                    | `T7-UNIVERSAL-HARDENING-U05` — Forms + Selection + Date/Time + Files Enrichment                                                     |
| Branch                   | `codex/icons-curated-solar-style`                                                                                                   |
| HEAD at evidence capture | `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`                                                                                          |
| Date                     | 2026-09-13, Asia/Jakarta                                                                                                            |
| U01 prerequisite         | `PASS FOR U02` — `docs/aapm/T7-UNIVERSAL-HARDENING-U01-TOKEN-FOUNDATION-EVIDENCE.md`                                                |
| U02 prerequisite         | `PASS FOR U03` — `docs/aapm/T7-UNIVERSAL-HARDENING-U02-INTRINSIC-LAYOUT-EVIDENCE.md`                                                |
| U03 prerequisite         | `PASS FOR U04` — `docs/aapm/T7-UNIVERSAL-HARDENING-U03-CROSS-PLATFORM-CONTRACT-EVIDENCE.md`                                         |
| U04 prerequisite         | `docs/aapm/T7-UNIVERSAL-HARDENING-U04-FOUNDATIONS-LAYOUT-ACTIONS-EVIDENCE.md`, `PASS FOR U05`. No U04 redesign was reopened in U05. |
| Scope                    | U05 only. No U06+ implementation was started.                                                                                       |
| Publication boundary     | No commit, push, PR, merge, tag, publish, or deploy was performed.                                                                  |

The worktree was already materially dirty before this queue. Existing user-owned,
previous-queue, generated, and unrelated changes were preserved; no reset, clean,
mass formatting pass, or broad consumer migration was performed. The current
execution revalidated the existing U05 implementation in HEAD and did not
overwrite the dirty U04 artifacts.

The authoritative U05 source is the typed contract plane in
`packages/contracts/src/input-contracts.ts`. It enriches the existing component
registry and consumes the U01 token ownership contract plus the U03 component
platform contract. It is not a second UI component registry.

## 2. Inventory before

The pre-U05 audit used the existing catalog, current Web exports, the old
forms/selection/date-time/files evidence, generated compact projections, and
representative consumer surfaces. The old Q06 evidence already covered
Cascader, MultiSelect, Transfer, DateRangePicker, and FileUpload as existing
canonical Web contracts; those identities were preserved.

| Family    | Existing canonical surface before U05                                                                                                                                                       | Observed gap or risk                                                                                                                                                                                     | U05 disposition                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Forms     | Input, Textarea, PasswordInput, NumberInput, CurrencyInput, PercentInput, OtpInput, SearchInput, Field, Label, FieldDescription, FieldError, FieldGroup, FormSection, FormGrid, FormActions | Field anatomy and composition were not represented in one cross-platform typed enrichment plane; PasswordInput and TagsInput state semantics were incomplete in the runtime API.                         | Added typed Form contracts and bounded runtime/a11y hardening.                                           |
| Selection | Checkbox, CheckboxGroup, Radio, RadioGroup, Switch, Slider, RangeSlider, Select, NativeSelect, Combobox, MultiSelect, HierarchyPicker, Cascader, Transfer, TagsInput, ColorPicker           | Select family distinctions, hierarchy semantics, data boundaries, and native alternatives were implicit across catalog/runtime files. TreeSelect was a likely duplicate request.                         | Added explicit taxonomy, platform intent, measures, states, and gap decisions.                           |
| Date/Time | Calendar, DatePicker, DateRangePicker, NativeTimeInput, TimePicker, DateTimeInput                                                                                                           | DateInput was a possible duplicate; local date/time value and time-zone ownership were not expressed in the new input plane. DatePicker focus restoration and described-by composition needed hardening. | Added typed value boundary, resolver metadata, and bounded DatePicker focus/a11y correction.             |
| Files     | FileUpload, FileItem, FileList, FilePreview                                                                                                                                                 | File lifecycle statuses, device sources, Dropzone/UploadQueue ownership, and Signature defer rules were not explicit.                                                                                    | Added presentation-only lifecycle states, device-source contracts, and explicit gap/ownership decisions. |

### Representative consumer drift audit

| Surface                 | Evidence observed                                                                                                                                  | U05 boundary                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Theme Studio            | `ThemeScope`, theme recipe/profile controls, and generated token projections are already used as the system harness.                               | No local token source was introduced; U05 consumes U01 resolution.                               |
| Component Lab           | Canonical Combobox, MultiSelect, DatePicker, DateRangePicker, OtpInput, TagsInput, FileUpload, and FileList are composed in the interaction proof. | Added only bounded stress fixtures for file statuses; no product state or transport was added.   |
| Auth / brand expression | PasswordInput is consumed from `@ten4seven/ui` within the existing branded composition.                                                            | Added `aria-pressed` to the existing visibility action; no auth behavior or persistence changed. |
| Public Showcase         | Public route composition remains block/component based and does not receive a parallel form or file primitive family.                              | No public-surface redesign was attempted.                                                        |
| Publishing Store        | Commerce/store surfaces continue to use shared UI exports and product composition.                                                                 | No commerce-specific input primitive was added.                                                  |
| Operations              | Operational/reference surfaces use shared forms, tables, and file affordances where present.                                                       | No operational data, validation, or transport was migrated.                                      |
| Farm                    | Farm reference remains a scoped profile/composition proof using shared contracts.                                                                  | No Farm product implementation or native capture behavior was claimed.                           |

## 3. Form gap analysis

The bounded runtime corrections were selected from observed contract gaps, not a
visual redesign:

| Finding                                                                                                             | Source/runtime evidence                                                                                              | Correction                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Password visibility state was visually understandable but did not expose an explicit pressed state.                 | Existing `PasswordInput` visibility action in `packages/ui/src/forms.tsx`.                                           | Added `aria-pressed={visible}` while preserving the existing Web API and local visibility behavior.                                                    |
| TagsInput did not expose a complete disabled/read-only/invalid contract.                                            | Existing `TagsInput` accepted values and keyboard commit/removal but lacked the full state boundary required by U05. | Added `disabled`, `readOnly`, and `error`; guarded commit/removal/blur; connected invalid/error relationships and data-state attributes.               |
| DatePicker could replace a consumer-provided described-by value and did not consistently return focus after Escape. | Existing popup input/calendar behavior in `packages/ui/src/date-time.tsx`.                                           | Preserved consumer `aria-describedby`, appended component help text, added Escape dismissal, and restored focus to the input.                          |
| FileItem only communicated a narrow ready/uploading/error model.                                                    | Existing file item/list presentation.                                                                                | Added queued, retrying, success, canceled, and explicit uploading states; retrying renders progress. Transport and retry policy remain consumer-owned. |
| FieldGroup was present in the catalog but absent from the initial typed U05 enrichment.                             | Audit of existing catalog versus the new typed definitions caught the omission before evidence lock.                 | Added `FieldGroup` to the same typed plane; no new UI component identity was created.                                                                  |

Form validation is intentionally split at the contract boundary:

- the consumer owns requiredness, domain rules, server validation, code
  verification, persistence, and submit authority;
- Ten4Seven owns field anatomy, relationship IDs, state vocabulary, error
  presentation, keyboard/touch obligations, and semantic token roles;
- native renderers will retain the same value/state/a11y intent while using
  platform controls and virtual-keyboard behavior.

### Token ownership and dimension matrix used by U05

U05 does not create a token source. It references the U01 source in
`packages/contracts/src/foundation.ts`:

1. system defaults;
2. base recipe;
3. product profile;
4. theme override;
5. scoped override;
6. component state.

The U05 typed definitions consume token roles rather than raw colors, CSS
variable strings, ad-hoc radii, or local motion values. The explicit U05
dimension classification is:

| Token layer     | Canonical owner                                      | Examples used by U05                                                                                                                        | Web projection                                  | Native-ready projection                          |
| --------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Foundation      | U01 typed foundation contract                        | Primitive ramps, spacing, type, raw radius/elevation, motion, foundational sizing.                                                          | Generated CSS/theme assets.                     | Resolved JS/TS values; no CSS parsing.           |
| Semantic        | U01 semantic roles                                   | Foreground, background, surface, border, focus, action, selected, destructive, warning, success, information, disabled, data visualization. | CSS variables consumed by components.           | Resolved semantic values consumed by a renderer. |
| Layout          | U02 layout/measure contract                          | Page gutter, section rhythm, content/reading/compact/control/wide measure, minimum useful surface.                                          | Layout tokens and component measure attributes. | Numeric resolved measures and adaptive intent.   |
| Component       | U01 component token contract plus component metadata | Field/control, selection, overlay, card, navigation, collection roles; U05 `tokenRoles` arrays.                                             | Existing component CSS projection.              | Token-role identifiers and resolved values.      |
| Product profile | Existing typed theme/profile contracts               | Neutral, AAPM, Academy, Publishing, Farm, Operations only where already justified.                                                          | Theme recipe/profile CSS projection.            | Resolved profile values; no new U05 profile.     |
| Scope           | Existing `ThemeScope`/scoped override contract       | Local semantic overrides with the U01 resolver order.                                                                                       | Scoped CSS variables.                           | Scoped resolved semantic object.                 |

| Dimension                              | Ownership classification                | U05 rule                                                                                           |
| -------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Control measure                        | `GLOBAL_CUSTOMIZABLE` / layout-resolved | Use the U02 control measure and component `measure` field; do not repeat arbitrary control widths. |
| Collection/content measure             | `GLOBAL_CUSTOMIZABLE` / layout-resolved | Use content or compact measure according to the collection intent.                                 |
| Touch target minimum                   | `FIXED_SYSTEM_SEMANTIC`                 | Shared interaction minimum; native and Web renderers must preserve it.                             |
| State colors, focus, disabled, invalid | `SEMANTIC` plus component role          | Resolve from semantic/component token roles; never from consumer-local hex values.                 |
| Product-profile expression             | `PRODUCT_PROFILE`                       | Remains in existing theme/profile contracts; U05 adds no new product profile.                      |
| One-off arrangement                    | `COMPOSITION_LOCAL`                     | A consumer may retain exceptional layout arrangement when it is not a reusable control contract.   |

The resolver order is projected into `INPUT_CONTRACT_PLANE` and is identical to
the U01 `TOKEN_RESOLUTION_ORDER`. Light/dark, contrast, and reduced-motion
behavior remain properties of the shared theme resolver and motion roles; U05
does not add a parallel CSS or native theme.

## 4. Selection taxonomy

The typed plane contains 16 existing Selection contracts. The distinctions are
deliberate and are also projected into the AI catalog metadata:

| Contract        | Selection intent                                                      | Data boundary                            | Web presentation                              | Native intent                                            |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Checkbox        | Boolean or independent item selection, including indeterminate state. | Consumer boolean/selection value.        | Native checkbox semantics.                    | Pressable/checkbox renderer with the same state meaning. |
| CheckboxGroup   | Related boolean choices with group anatomy.                           | Consumer array of values.                | Fieldset/group semantics.                     | Native group/press semantics.                            |
| Radio           | One choice from a small mutually exclusive set.                       | Consumer single value.                   | Radio group semantics.                        | Native radio/press semantics.                            |
| RadioGroup      | Grouped mutually exclusive choices.                                   | Consumer single value.                   | Fieldset/roving group semantics.              | Native group semantics.                                  |
| Switch          | Immediate boolean preference.                                         | Consumer boolean.                        | Switch/checkbox semantics.                    | Native switch/press feedback.                            |
| Slider          | One bounded numeric value.                                            | Consumer number.                         | Native range control.                         | Native slider.                                           |
| RangeSlider     | Coordinated lower/upper bounded values.                               | Consumer range object.                   | Two coordinated ranges.                       | Native range/gesture equivalent.                         |
| Select          | One bounded value through the canonical custom popup/listbox.         | Consumer single value.                   | Popup/listbox with one authoritative trigger. | Picker or sheet while retaining Select intent.           |
| NativeSelect    | Intentional platform-native select behavior.                          | Consumer single value.                   | Native HTML select.                           | Native picker/select.                                    |
| Combobox        | Search and choose one bounded option.                                 | Consumer query plus selected value.      | Input/listbox popup.                          | Searchable sheet/list or native picker alternative.      |
| MultiSelect     | Choose multiple bounded options.                                      | Consumer string array.                   | Multiselect listbox popup.                    | Sheet/list with multi-selection.                         |
| HierarchyPicker | Select nested hierarchy nodes, including mixed ancestors.             | Consumer node IDs/selection.             | Tree/list hierarchy.                          | Hierarchy list or sheet.                                 |
| Cascader        | Select one final leaf through a path.                                 | Consumer path/leaf value.                | Cascading path popup.                         | Hierarchy sheet/path navigation.                         |
| Transfer        | Move values between available and selected listboxes.                 | Consumer available/selected collections. | Two listboxes plus transfer actions.          | Adaptive list/detail transfer surface.                   |
| TagsInput       | Collect normalized text tags.                                         | Consumer string array and draft text.    | Tokenized text input.                         | Native text input with token/list presentation.          |
| ColorPicker     | Capture an authored color value and optional preset.                  | Consumer color value.                    | Native color input plus readable value.       | Native color picker or platform equivalent.              |

`TreeSelect` is not a new canonical component. It is a
`REJECTED_DUPLICATE` gap decision targeting `HierarchyPicker` for node
selection and `Cascader` for path/leaf selection.

## 5. Date/time taxonomy

The typed plane contains six existing Date/Time contracts:

| Contract        | Role                                         | Value boundary                                               | Platform strategy                                             |
| --------------- | -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| Calendar        | Calendar display/selection surface.          | Date value supplied by consumer.                             | Web calendar; native calendar/picker renderer later.          |
| DatePicker      | Date field plus calendar popup.              | `YYYY-MM-DD`; no implicit UTC conversion.                    | Adaptive popup to native picker/sheet.                        |
| DateRangePicker | Start/end date selection.                    | `{ start?: YYYY-MM-DD; end?: YYYY-MM-DD }`.                  | Adaptive range calendar to native range sheet/picker.         |
| NativeTimeInput | Explicit platform-native time input variant. | `HH:mm` local wall-clock value.                              | Web native time input; native platform time control.          |
| TimePicker      | Shared bounded time listbox.                 | `HH:mm` local wall-clock value.                              | Web popup/listbox; native picker/list.                        |
| DateTimeInput   | Composition of date and time controls.       | Date and time values remain separate; no implicit time zone. | Renderer composes DatePicker/TimePicker or platform controls. |

`DateInput` is `DEFERRED` to `DatePicker`. A separate public identity would
duplicate the parsing and validation boundary unless a distinct approved parser
contract is introduced. The U05 contract deliberately does not own time zones,
locale persistence, business calendars, or server date validation.

## 6. File/source taxonomy

### File presentation and ownership

| Contract    | Classification                    | Owns                                                                                                                 | Does not own                                                                                |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| FileUpload  | `CANONICAL_COMPONENT`, `ADAPTIVE` | One authoritative Web trigger, browser file selection, accept/max-size/max-files hints, rejection callback boundary. | Upload transport, retry policy, persistence, authorization, or business attachment meaning. |
| FileItem    | `CANONICAL_COMPONENT`, `ADAPTIVE` | File metadata presentation and lifecycle status/progress display.                                                    | Network requests, queue scheduling, retry/cancel mutation, persistence.                     |
| FileList    | `CANONICAL_COMPONENT`, `ADAPTIVE` | Ordered collection presentation of FileItem records.                                                                 | Transport queue or server synchronization.                                                  |
| FilePreview | `CANONICAL_COMPONENT`, `ADAPTIVE` | Optional preview/media/document representation and presentation actions.                                             | Preview engine, download authority, media persistence, or authorization.                    |

The shared file metadata contract uses optional `uri`, `name`, `mimeType`,
`size`, `lastModified`, and `permissionState`, with `captureSource` where a
capture source makes it meaningful. Presentation statuses are `queued`,
`uploading`, `retrying`, `success`, `ready`, `error`, and `canceled`.

### Explicit gap decisions

| Candidate   | Decision                   | Canonical target or reason                                                                                                        |
| ----------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| FileInput   | `REJECTED_DUPLICATE`       | FileUpload owns the authoritative browser input/trigger.                                                                          |
| Dropzone    | `REJECTED_DUPLICATE`       | Web-only drop behavior is a FileUpload presentation behavior; it is not a second cross-platform intent.                           |
| UploadQueue | `DEFERRED`                 | FileList/FileItem are presentation-only; transport, retry, cancellation, and persistence remain consumer/engine-owned.            |
| Signature   | `ENGINE_ADAPTER`, deferred | Requires an approved drawing/signature engine plus consent/persistence policy. No canvas or signature product behavior was added. |

## 7. Components hardened

No visual primitive family was rewritten. The bounded changes are:

| Area                    | Bounded implementation                                                                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed contract plane    | Added `packages/contracts/src/input-contracts.ts`, exported through the contracts/UI package surfaces, and linked into `CANONICAL_CONTRACTS`. It defines taxonomy, ownership, measures, states, value boundaries, a11y obligations, async/virtualization boundaries, compatibility, gaps, and device sources. |
| Existing form runtime   | Added PasswordInput pressed semantics and TagsInput disabled/read-only/invalid/error behavior without changing the existing consumer value/event API.                                                                                                                                                         |
| Existing date runtime   | Preserved consumer described-by IDs and restored DatePicker input focus after Escape.                                                                                                                                                                                                                         |
| Existing file runtime   | Expanded FileStatus and FileItem/FileList presentation to queued, retrying, uploading, success, error, canceled, and progress states.                                                                                                                                                                         |
| Native-ready projection | Added CSS-independent `resolveNativeInputContract` and `resolveNativeInputSource` projections to `packages/native/src/index.ts`; no Expo/React Native components or dependencies were created.                                                                                                                |
| AI projection           | Generated `generated/input-contracts.json`, full input metadata in component shards, compact `inputContractRef` values, agent-index routing, and mirrored agent projections.                                                                                                                                  |
| Showroom proof          | Added synthetic file lifecycle records to the system-only Component Lab proof and added `tests/q05-input-contracts.spec.ts`.                                                                                                                                                                                  |

All additions use existing semantic token roles and package exports. No donor CSS,
donor theme, donor brand, donor radius, donor typography, or donor public API was
introduced.

## 8. Net-new components

| Result                         | Evidence                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Canonical UI components added  | **0**                                                                                                  |
| Component variants added       | **0**; NativeSelect and NativeTimeInput remain existing compatibility variants.                        |
| Composite UI blocks added      | **0**; DateTimeInput remains an existing composition contract.                                         |
| Typed enrichment records added | 42 records for existing catalog components; this is contract metadata, not a second component library. |

Because there are zero new rendered components, the per-new-component fields
(unique intent, platform, native strategy, measure, tokens, accessibility, and
states) are not applicable. The existing components received those fields in
the typed enrichment plane and continue to be the public implementation
identities.

## 9. Rejected duplicates and compatibility variants

| Candidate       | Classification/status            | Canonical contract             | Compatibility note                                                                              |
| --------------- | -------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| NativeSelect    | `COMPONENT_VARIANT`, implemented | Select family                  | Retained only when intentional platform-native behavior or native form integration is required. |
| NativeTimeInput | `COMPONENT_VARIANT`, implemented | TimePicker family              | Retained as an explicit native-control choice; it is not a second time semantics model.         |
| DateTimeInput   | `COMPOSITE_BLOCK`, implemented   | DatePicker + TimePicker        | Composes existing contracts and does not own time-zone or persistence semantics.                |
| TreeSelect      | `REJECTED_DUPLICATE`             | HierarchyPicker/Cascader       | Node selection and path selection already have canonical identities.                            |
| DateInput       | `DEFERRED`                       | DatePicker                     | Revisit only if distinct parsing/validation behavior is approved.                               |
| FileInput       | `REJECTED_DUPLICATE`             | FileUpload                     | Would create a competing authoritative file-selection API.                                      |
| Dropzone        | `REJECTED_DUPLICATE`             | FileUpload                     | Web presentation behavior only.                                                                 |
| UploadQueue     | `DEFERRED`                       | FileList/FileItem presentation | No network behavior belongs in the UI package.                                                  |
| Signature       | `ENGINE_ADAPTER`, deferred       | None yet                       | Requires engine and consent boundary; not implemented.                                          |

The old Q06 decisions for RangeCalendar, ColorArea/Slider/SwatchPicker,
UploadQueue, Dropzone, and Signature were not reopened as duplicate public
identities in U05.

## 10. Adaptive Web/Native matrix

The current Native column is a contract projection, not a claim that an Expo or
React Native renderer exists today.

| Intent/family                       | Platform                     | Web renderer                                                          | Native renderer strategy                                   | Native presentation/status                                         |
| ----------------------------------- | ---------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------ |
| Text/password/OTP fields            | `BOTH`                       | DOM controls with field anatomy and browser keyboard/focus semantics. | `NATIVE_RENDERER` / same intent.                           | Native text/secure/OTP controls; status `planned`.                 |
| Boolean/radio/switch/range controls | `BOTH`                       | Native semantic inputs with shared token/state roles.                 | `NATIVE_RENDERER` / same intent.                           | Pressable/native controls; status `planned`.                       |
| Select                              | `ADAPTIVE`                   | Custom popup/listbox with one trigger.                                | `ALTERNATE_PATTERN`.                                       | Sheet/native picker; status `planned`.                             |
| Combobox/MultiSelect                | `ADAPTIVE`                   | Search/listbox or multiselect popup.                                  | `ALTERNATE_PATTERN`.                                       | Searchable sheet/list; status `planned`.                           |
| HierarchyPicker/Cascader            | `ADAPTIVE`                   | Tree/path popup and keyboard hierarchy navigation.                    | `ALTERNATE_PATTERN`.                                       | Hierarchy list/sheet; status `planned`.                            |
| DatePicker/DateRangePicker          | `ADAPTIVE`                   | Calendar popup anchored to the field.                                 | `NATIVE_RENDERER` or adaptive sheet according to platform. | Native date/range picker; status `planned`.                        |
| TimePicker/NativeTimeInput          | `ADAPTIVE`                   | Bounded listbox or intentional native time input.                     | `NATIVE_RENDERER`.                                         | Native time picker/control; status `planned`.                      |
| TagsInput/ColorPicker               | `BOTH`/adaptive presentation | Tokenized text input or color input with readable value.              | Same intent with native input/color affordance.            | Native input/picker; status `planned`.                             |
| FileUpload                          | `ADAPTIVE`                   | Browser file input and optional drop presentation.                    | `NATIVE_RENDERER`.                                         | Document picker, image picker, or camera source; status `planned`. |
| FileItem/FileList/FilePreview       | `ADAPTIVE`                   | List/preview/action presentation.                                     | `ALTERNATE_PATTERN`.                                       | Native list/detail or preview surface; status `planned`.           |

The native adapter consumes resolved semantic values and metadata as JS/TS data;
it does not parse CSS variables and does not import Web DOM/CSS code.

## 11. Device source capability mapping

| Source         | Classification | Platform/status                          | Web alternative | Capabilities                                               | Shared metadata                                                         | Consumer ownership                                |
| -------------- | -------------- | ---------------------------------------- | --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------- |
| DocumentPicker | `NATIVE_ONLY`  | `NATIVE` / `planned` / `NATIVE_RENDERER` | FileUpload      | document-library read, multiple selection, document filter | uri, name, mimeType, size, lastModified, permissionState                | business data, handlers, permissions, persistence |
| ImagePicker    | `NATIVE_ONLY`  | `NATIVE` / `planned` / `NATIVE_RENDERER` | FileUpload      | photo-library read, multiple selection, image filter       | uri, name, mimeType, size, lastModified, permissionState                | business data, handlers, permissions, persistence |
| CameraCapture  | `NATIVE_ONLY`  | `NATIVE` / `planned` / `NATIVE_RENDERER` | FileUpload      | camera capture, image/video capture, capture metadata      | uri, name, mimeType, size, lastModified, permissionState, captureSource | business data, handlers, permissions, persistence |

No device permission prompt, camera operation, upload, or persistence was
performed by U05.

## 12. Native canary

The canary was executed against the CSS-independent adapter with the existing
component catalog entry supplied to the U03 platform resolver:

| Contract           | Resolved platform | Renderer strategy   | Native presentation       | Status  |
| ------------------ | ----------------- | ------------------- | ------------------------- | ------- |
| Input              | `BOTH`            | `NATIVE_RENDERER`   | `native-platform-control` | planned |
| Select             | `ADAPTIVE`        | `ALTERNATE_PATTERN` | `native-picker`           | planned |
| DatePicker         | `ADAPTIVE`        | `NATIVE_RENDERER`   | `native-picker`           | planned |
| FileUpload         | `ADAPTIVE`        | `NATIVE_RENDERER`   | `native-document-picker`  | planned |
| ImagePicker source | `NATIVE`          | `NATIVE_RENDERER`   | `native-picker`           | planned |

`pnpm test:native-mobile` passed. It verifies the shared contract/token/icon/
accessibility boundary and existing Farm presentation proof without a native
renderer dependency. No `@ten4seven/native` component, Expo component, React
Native component, or native persistence layer was created.

## 13. Showroom

### Canonical family showroom

The existing local browser tab was used; no additional browser window or tab was
opened for U05.

| Route                                        | Evidence                                                      | Result                                                                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http://127.0.0.1:4173/components/forms`     | Codex browser AX tree and `tests/q05-input-contracts.spec.ts` | `Forms` route rendered 33 canonical contracts, including Input, Password Input, Select, Multi Select, Tags Input, Field Group, and form composition. |
| `http://127.0.0.1:4173/components/date-time` | Focused U05 Playwright route assertion                        | `Date & Time` and `Date Picker` rendered.                                                                                                            |
| `http://127.0.0.1:4173/components/files`     | Focused U05 Playwright route assertion                        | `Files`, `File Upload`, and `File Preview` rendered.                                                                                                 |

The package was rebuilt before runtime verification so the local playground
served the current FileItem lifecycle presentation.

### Component Lab rendered proof

The existing local browser tab at
`http://127.0.0.1:4173/component-lab` rendered the named
`Component interaction checks` region and the Files card. After a full reload,
the AX tree and DOM showed:

- `queued-contract-proof.pdf` with `Queued`;
- `retrying-contract-proof.jpg` with `Retrying` and `Upload progress 62%`;
- `canceled-contract-proof.png` with `Canceled`.

The browser retained two historical Vite HMR messages from the moment the UI
package was rebuilt (`12:24:47Z`, one for the JS bundle and one for styles). A
full reload rendered the route and all U05 proof states; no new HMR timestamp was
emitted during the reload. This is recorded as transient local dev-server
observation, not hidden as a clean-console claim.

## 14. Component Lab stress proof

`tests/q05-input-contracts.spec.ts` and the Component Lab proof cover the bounded
state set without introducing product data:

| Stress area    | Runtime proof                                                                                                                                        |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form anatomy   | Owner Combobox, Workstreams MultiSelect, Review date, Planning range, Switch, Notes, and Verification sample are rendered in one interaction region. |
| Selection      | Combobox and MultiSelect remain labelled; the existing Q06 suite continues to cover Cascader, MultiSelect, and Transfer listbox semantics.           |
| Date/time      | DatePicker and DateRangePicker are in the interaction proof; route showroom covers DatePicker family discovery.                                      |
| OTP            | Verification sample renders six keyboard-addressable slots.                                                                                          |
| File lifecycle | Queued, Retrying, 62% progress, and Canceled states are visible.                                                                                     |
| Accessibility  | Named region, field labels, listbox/combobox roles, progressbar name, and file state text are asserted.                                              |

## 15. AI projection

The source/projection chain is singular and deterministic:

```text
packages/contracts/src/input-contracts.ts
        |
        +--> generated/input-contracts.json
        +--> generated/components/{component}.json (full inputContract)
        +--> generated/components.compact.json (inputContractRef)
        +--> generated/agent-index.json + packages/agent/generated/*
        +--> @ten4seven/ui exports
        +--> @ten4seven/native CSS-independent resolver
```

Current generated projection facts:

| Projection            | Evidence                                                                                                                                                       |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typed source          | `packages/contracts/src/input-contracts.ts`                                                                                                                    |
| Full input projection | `generated/input-contracts.json`, `sourceOfTruth = packages/contracts/src/input-contracts.ts`                                                                  |
| Component count       | 42: 16 Form, 16 Selection, 6 Date/Time, 4 Files                                                                                                                |
| Classification count  | 39 `CANONICAL_COMPONENT`, 2 `COMPONENT_VARIANT`, 1 `COMPOSITE_BLOCK`                                                                                           |
| Platform count        | 23 `BOTH`, 19 `ADAPTIVE`; Web status implemented for all 42; Native status planned for all 42                                                                  |
| Agent retrieval       | `generated/input-contracts.json` is in `defaultRetrieval` and has an `input-contracts` entry point referencing `/components/forms`.                            |
| Compact retrieval     | Each input component has `inputContractRef: { path: "input-contracts.json", id: ... }`; the compact component projection does not duplicate the full contract. |
| Catalog validation    | `pnpm test:ai` passed: 29 recipes, 179 components, 60 expressive blocks, 122 semantic icons, and 0 donor reads in cold-start verification.                     |

The human catalog remains a compatibility/documentation surface. No second input
manifest, native decision manifest, platform map, or consumer-local primitive
library was created.

## 16. Tests

### U05-focused and affected checks

| Command                                                                      | Gate | Evidence                                                                                                                                                               |
| ---------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                                    | PASS | 234 deterministic contract projections, theme CSS, and 3 DTCG exports generated.                                                                                       |
| `pnpm test:contracts`                                                        | PASS | Typed/generated parity, ownership/taxonomy/resolution checks, input projection, gap decisions, device sources; compact retrieval `294209/394391` bytes.                |
| `pnpm test:ai`                                                               | PASS | Input contract refs and full projection metadata verified; cold-start retrieval passed with 0 donor reads.                                                             |
| `pnpm --filter @ten4seven/contracts typecheck`                               | PASS | Typed U05 contract plane compiles.                                                                                                                                     |
| `pnpm typecheck`                                                             | PASS | Contracts, Native, Agent, Agent build, and Playground typecheck completed sequentially after package artifacts were stable.                                            |
| `pnpm --filter @ten4seven/tokens test`                                       | PASS | 2 files, 34 tests; defaults, recipe/profile/override/scope/component state, light/dark, contrast, full/reduced motion, and Web/native numeric projection coverage.     |
| `pnpm test:native-mobile`                                                    | PASS | Shared Native boundary and CSS-independent projection remain valid without a native renderer dependency.                                                               |
| `pnpm test:native-expo`                                                      | PASS | Seven profiles, 18 capability contracts, 179 derived component maturity rows, and the CSS-independent Expo boundary remain valid; device runtime is separate evidence. |
| `pnpm test:consistency`                                                      | PASS | Canonical consistency verified across 28 UI source files.                                                                                                              |
| `pnpm test:token-governance`                                                 | PASS | 25 component modules; no raw component colors, palette dependencies, or ungoverned timing.                                                                             |
| `pnpm test:component-system`                                                 | PASS | 172 canonical components, 7 aliases, 29 recipes, singular Select model, taxonomy/relations.                                                                            |
| `pnpm test:dtcg`                                                             | PASS | 3 deterministic DTCG-compatible outputs and exact-source snapshots.                                                                                                    |
| `pnpm test:contrast`                                                         | PASS | 284 recipe/mode pairs at WCAG AA 4.5:1; lowest exact-source result 4.67:1.                                                                                             |
| `pnpm package:build`                                                         | PASS | `@ten4seven/ui` rebuilt in ESM/CJS forms so the local showroom consumed the new file states.                                                                           |
| `pnpm package:verify`                                                        | PASS | 24 root exports, bundled tokens/icons/motion, and self-contained styles.                                                                                               |
| `pnpm build`                                                                 | PASS | Playground TypeScript and Vite production build; existing large-chunk advisory only.                                                                                   |
| `pnpm exec playwright test tests/q05-input-contracts.spec.ts`                | PASS | 2/2 U05 tests passed, including Component Lab stress and Forms/Date & Time/Files showroom routes.                                                                      |
| `pnpm exec playwright test tests/q06-forms-selection-datetime-files.spec.ts` | PASS | 3/3 inherited Q06 regression tests passed.                                                                                                                             |
| Targeted Prettier check on U05 source/catalog/tests/evidence                 | PASS | All matched U05-scoped files use Prettier code style; unrelated repository files were not mass-formatted.                                                              |
| `git diff --check`                                                           | PASS | Exit code 0; only existing CRLF-to-LF warnings in unrelated dirty files.                                                                                               |

## 17. Baseline debt

The required repository-wide checks are recorded here as a bounded baseline,
separate from the U05-focused test passes above.

| Command             | Result                   | Classification                                                                                                                                                             |
| ------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test`         | PASS                     | Full repository static/package chain passed, including the U05 input contracts and existing later-queue verification scripts; no later queue implementation was performed. |
| `pnpm format:check` | FAIL; 501 files reported | **INHERITED BASELINE**, broad repository/app/research/generated drift. U05 used targeted formatting checks and did not mass-format unrelated files.                        |

## 18. Deferred gaps for U06/U07+

The following remain explicitly outside U05:

- the repository-wide component-token coverage debt: 1000 raw-pixel occurrences
  remain explicitly tracked, plus broad formatting drift;
- an Expo/React Native/Android/iOS renderer package and platform components;
- native sheet/picker implementations and platform permission prompts;
- remote async option loading, caching, persistence, and virtualization engines;
- upload transport, retry scheduling, cancellation, persistence, authorization,
  and server attachment validation;
- Signature/canvas engine integration and consent policy;
- a standalone DateInput parser contract or time-zone/business-calendar policy;
- consumer/product migrations across Auth, Public Showcase, Publishing Store,
  Operations, or Farm beyond the system-only proof updates;
- U06 overlays, feedback, display, media, or later queues.

These are deferred contract/renderer/engine decisions, not silently promoted to
implemented components. The existing catalog count remains the source for public
component identity; variants and aliases do not increase the canonical count.

## 19. Gate

PASS FOR U06
