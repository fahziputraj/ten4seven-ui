# T7-UNIVERSAL-HARDENING-U10 — Editors, Builders, DnD, AI and Power-User Evidence

## 1. Coordinates

- Repository: `fahziputraj/ten4seven-ui`
- Queue executed: `T7-UNIVERSAL-HARDENING-U10`
- Parent: `T7-UNIVERSAL-HARDENING-001`
- Scope: U10 advanced interaction contracts, adapters, projections, Web canaries, native-ready metadata, tests, and evidence only.
- Prerequisite: the U09 workflow/productivity contract gate was already available and passed in the final repository test chain.
- Branch: `codex/icons-curated-solar-style`
- HEAD at final verification: `6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d`
- Starting U10 status: 82 status entries were already present before the scoped U10 verification. The tree contained existing and earlier-queue work; it was not reset, cleaned, normalized, committed, pushed, merged, published, or deployed. The two U10 rendered proof refreshes and this evidence refresh are the only U10-specific working-tree additions from this execution; final status is recorded after verification below.
- U11 and U12 were not executed. The ledgers in sections 32 and 33 are explicitly provisional inputs for their later gates.

The exact final gate for this queue is recorded in section 34.

## 2. Inventory before

The starting audit found the normalized U10 advanced-interaction plane already present in the accepted HEAD: the typed editor/builder/AI contract, generated projections, 11 advanced decisions, five Web canary keys, six CSS-independent native canary descriptors, and the catalog entry for `DiffViewer`. This execution therefore verified the existing bounded plane and refreshed evidence; it did not treat a stale evidence artifact as authority or add a second decision source.

Existing canonical evidence included `EditorSurface`, `PropertyInspector`, `BuilderCanvas`, `PromptComposer`, `ConversationThread`, `CitationList`, `ToolCallCard`, `ApprovalPanel`, `CommandMenu`, `DragHandle`, `TreeView`, `RevisionDiff`, and the U10-lineage `DiffViewer`. The bounded audit confirmed the gap was contract/projection/runtime-proof agreement and cross-platform ownership—not permission to create parallel primitives. `DiffViewer` is the one justified generic line-level comparison addition in the U10 lineage and was already present in the accepted starting HEAD.

Representative consumer surfaces were used as drift evidence only: Theme Studio, Component Lab, Auth, Public Showcase, Publishing Store, Operations, and Farm. The audit confirmed that harness surfaces, public surfaces, commerce/content surfaces, and operational/data-dense surfaces need the same semantic contracts with different composition and platform strategies. No consumer route was broadly rewritten in U10, and no consumer became the owner of a new primitive.

The starting audit therefore focused on three concrete risks:

- advanced surfaces needed agreement between typed classification, generated projections, catalog metadata, and renderer proof;
- DnD and AI behavior needed to remain semantic intent rather than product callbacks, provider terminology, or autonomous mutation;
- native intent needed to remain CSS-independent metadata without implying a native renderer that does not exist.

## 3. Complexity classification

The typed U10 contract defines the universal classification vocabulary exactly once in `packages/contracts/src/editor-builder-ai.ts`:

`FOUNDATION`, `CANONICAL_COMPONENT`, `COMPONENT_VARIANT`, `UTILITY_OR_PROVIDER`, `COMPOSITE_BLOCK`, `RECIPE_OR_PATTERN`, `ENGINE_ADAPTER`, `DOMAIN_COMPOSITION`, `ALIAS`, `WEB_ONLY`, `NATIVE_ONLY`, `ADAPTIVE`, `DEFERRED`, and `REJECTED_DUPLICATE`.

Classification is separate from inventory status. Inventory status records whether an existing canonical surface needs hardening, a canonical surface is missing, a variant/alias is being rejected, or work is deferred. In the typed U10 lineage, ten normalized advanced components are `EXISTING_STABLE` and the single justified `DiffViewer` addition is recorded as `MISSING_CANONICAL`; the accepted starting HEAD already contains its implementation, catalog metadata, and generated projections.

The final typed decision counts are:

| Dimension                    | Result                                                      |
| ---------------------------- | ----------------------------------------------------------- |
| Advanced component decisions | 11                                                          |
| Complexity                   | 7 `L2_COMPOUND`, 3 `L3_COLLECTION`, 1 `L4_ADVANCED_ENGINE`  |
| Component classification     | 10 `CANONICAL_COMPONENT`, 1 `ENGINE_ADAPTER`                |
| Platform                     | 5 `WEB`, 5 `BOTH`, 1 `ADAPTIVE`                             |
| Builder workspace            | `L5_PRODUCT_COMPOSITION`, deliberately not a mega-component |

Global/system ownership remains token-based. U10 uses existing foundation, semantic, layout, and component-semantic token names; composition-local fixture geometry remains local where it has no system-wide reuse obligation. U10 introduces no product profile and no ThemeScope override. Product profiles and scoped overrides remain upstream resolution inputs owned by the U01 contract plane.

## 4. Editor taxonomy

| Editor family | Canonical surface | Classification        | Platform and strategy                                                                 | Contract boundary                                                                                     |
| ------------- | ----------------- | --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `PLAIN_TEXT`  | `EditorSurface`   | `COMPONENT_VARIANT`   | `ADAPTIVE`; Web text control, native text control                                     | Consumer owns value, change intent, validation, and persistence                                       |
| `RICH_TEXT`   | `EditorSurface`   | `ENGINE_ADAPTER`      | `ADAPTIVE`; optional full Web engine, limited/native alternate flow                   | Consumer owns document schema, history, collaboration, and persistence                                |
| `MARKDOWN`    | `EditorSurface`   | `COMPONENT_VARIANT`   | `ADAPTIVE`; source/preview arrangement, native source-first alternate                 | Consumer owns parsing, sanitization, and persistence                                                  |
| `CODE`        | `EditorSurface`   | `ENGINE_ADAPTER`      | `WEB`; native basic/read-only or external editor alternative                          | Consumer owns language services, diagnostics truth, and code persistence                              |
| `JSON`        | `EditorSurface`   | `ENGINE_ADAPTER`      | `ADAPTIVE`; raw/tree Web mode, native basic text or fields                            | Consumer owns schema, validation truth, and persistence; no schema validator is bundled               |
| `DIFF`        | `DiffViewer`      | `CANONICAL_COMPONENT` | `WEB`; inline/split comparison, future native read-only alternative only if justified | Consumer supplies comparison rows and owns source values, computation, audit meaning, and persistence |

Markdown, rich text, code, and JSON are editor families or variants behind the `EditorSurface` intent. They do not create `MarkdownEditor`, `RichTextEditor`, `CodeEditor`, or `JsonEditor` primitive families.

## 5. Editor engine decisions

The typed `EDITOR_ENGINE_DECISIONS` table records capability, complexity, current/candidate engine, license impact, package impact, accessibility, states, platform strategy, and adapter boundary for all six editor families.

- Plain text uses the platform text control and requires no editor engine.
- Rich text, code, and JSON are `L4_ADVANCED_ENGINE` concerns. An optional consumer-selected engine may be lazy-loaded behind a Ten4Seven semantic adapter; no vendor document, language, or schema types appear in the normal Ten4Seven API.
- Markdown may use a consumer-selected parser/preview adapter; sanitization remains a consumer responsibility.
- Diff computation is optional and consumer-owned. The canonical `DiffViewer` presents precomputed rows and does not compute a diff.
- No editor engine, parser, syntax package, schema validator, collaboration runtime, or diff engine was added to the base runtime dependency set.
- The dependency/license matrix is part of the typed contract. `runtimeDependencies` is `[]`; optional engine license review belongs to the consumer or a separately approved adapter.

The resolver and projection rule is inherited and consumed, not redefined: typed theme/profile values resolve through `SYSTEM_DEFAULTS` → `BASE_RECIPE` → `PRODUCT_PROFILE` → `THEME_OVERRIDE` → `SCOPED_OVERRIDE` → `COMPONENT_STATE`. Web CSS variables are a derived projection. A native renderer can consume the resolved semantic value object and the native canary descriptors without parsing CSS.

## 6. Builder architecture

The builder is decomposed into `palette`, `outliner`, `canvas`, `inspector`, `toolbar`, and `preview`. `BUILDER_ARCHITECTURE.noMegaComponent` is `true`.

| Part      | Ten4Seven composition                          | Consumer ownership                                     | Renderer/engine boundary                              |
| --------- | ---------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Palette   | canonical search/list/action composition       | available node types, search data, add/drag intent     | adaptive list/sheet presentation                      |
| Outliner  | U07 `TreeView`                                 | node hierarchy and selection truth                     | Web tree or native list/tree alternative              |
| Canvas    | bounded `BuilderCanvas` stage                  | preview rendering, device data, publish/apply intent   | pointer/keyboard mechanics and optional canvas engine |
| Inspector | `PropertyInspector` plus U05 fields/disclosure | property schema, values, validation, reset/persistence | Web rail or native sheet/screen                       |
| Toolbar   | existing canonical action/menu contracts       | command meaning and permissions                        | platform action presentation                          |
| Preview   | consumer/domain preview slot                   | preview data and publish policy                        | Web preview or native single-task preview             |

Ten4Seven owns bounded anatomy, semantic slots, state/focus presentation, responsive recomposition, and canonical integration. The consumer owns domain schema, available types, placement legality, persistence, undo/redo, permissions, and publish policy.

## 7. Canvas model boundary

`BuilderCanvas` is a presentation and adapter boundary, not a page schema or autonomous editor. The contract intentionally does not define a business node model, serialization format, undo/redo store, collaboration protocol, or publish mutation.

- Consumer: domain node schema, selected node, placement legality, business validation, persistence, history, permissions, and publish/apply meaning.
- Ten4Seven: labelled stage, selected/empty/invalid/read-only presentation, semantic slots, focus guidance, and responsive composition.
- Renderer: pointer and keyboard mechanics, scrolling, viewport/device handling, native navigation/sheets, and optional client-only engine loading.

The Web showroom uses safe synthetic nodes and demonstrates the boundary through palette/outliner/canvas/inspector separation. No product schema or business mutation is embedded in the component contract.

## 8. Outliner / Inspector model

The outliner reuses U07 `TreeView`; it is not a builder-specific tree library. The inspector reuses canonical U05 form and selection primitives, including `Field`, `FormGrid`, disclosure, reset/action slots, and error/empty states. The inspector is a bounded rail on large Web surfaces and an inspector sheet or detail screen on narrow/native surfaces.

The required reading order is labelled builder heading → palette/outliner → canvas selection → inspector properties → state/action feedback. Selection is expressed as text, focus, labelled regions, and actions; hover and tiny resize handles are never required. No separate `BuilderField`, `BuilderTree`, or inspector-only control family was created.

## 9. Drag & Drop architecture

The normalized `DND_INTENT_CONTRACT` exposes these semantic callbacks:

- `onReorderIntent`
- `onMoveIntent`
- `onDropIntent`

The renderer emits a stable item identity, source and target collection identities, `before`/`after`/`inside`/`end` position, and optional source/target indexes for presentation. `createDndIntent()` returns a deterministic normalized payload without adding product meaning.

The contract states `idle`, `dragging`, `validTarget`, `invalidTarget`, `canceled`, and `completed` feedback. Consumer code owns operation legality, workflow validation, persistence, rollback, and conflict handling. Ten4Seven owns intent vocabulary, focus/alternative guidance, and token-led feedback.

Builder reorder is explicitly different from file ingestion: Dropzone/FileUpload remains the U05 file-operation contract. The U09 workflow DnD boundary and U07 `TreeView` are named integrations; no new DnD primitive or engine was introduced.

## 10. Keyboard / touch DnD alternatives

Drag is not the only path for a task-critical move. The Web canary exposes labelled `Move before`, `Move after`, and `Cancel` actions and reports a bounded status. Keyboard users may move up/down or choose a destination; screen-reader users receive labelled movement actions and text status.

On native, long-press/drag is optional renderer behavior. `Move to`, `Move before`, and `Move after` remain first-class press/action-sheet alternatives. The contract disallows a hover-only interaction, tiny mouse-only handles, or a mutation whose only trigger is a pointer event. Scrolling and cancellation are explicit concerns.

## 11. Command / shortcut model

`CommandMenu` is the canonical command surface. `CommandPalette` is an alias, not another component family. The registry contract contains `id`, `label`, `description`, `group`, `keywords`, `shortcut`, `scope`, `enabled`, and `dangerous`.

Supported scopes are `global`, `workspace`, `editor`, `overlay`, and `selection`. Web may enable Cmd/Ctrl+K, arrow/Home/End/Enter/Escape list operation, and focus return. Native may use a search/action surface or command sheet; desktop key chords are not assumed for mobile.

Ten4Seven owns labelled combobox/listbox presentation, keyboard semantics, focus, and empty/disabled/confirming states. The consumer owns command meaning, availability, permissions, and execution. Dangerous actions route through canonical `AlertDialog` or an equivalent confirmation surface; the command menu does not autonomously mutate data.

## 12. AI / Conversation taxonomy

The provider-neutral AI taxonomy defines these canonical presentation surfaces:

- `ConversationThread`
- `PromptComposer`
- `CitationList`
- `ToolCallCard`
- `ApprovalPanel`

Message roles are `user`, `assistant`, `system`, and `tool`; role is data, not a separate `UserMessage` or `AssistantMessage` primitive. Structured content kinds are `text`, `markdown`, `code`, `citation`, `toolActivity`, `attachment`, `artifact`, and `status`.

The taxonomy also records conversation/thread, message variants, composer, citation/source, tool invocation/result/status, approval, streaming/generation, prompt suggestion, attachment, and artifact panel concerns. Attachments use U05 file contracts. Artifacts use a block/workspace slot rather than an AI-only block library.

The AI contract is `providerNeutral: true`. Provider/model choice, credentials, transport, retrieval, source trust, tool authorization/execution, safety policy, persistence, retention, and business permissions remain consumer-owned.

## 13. Message / Composer contracts

`ConversationThread` accepts structured messages with role/kind, consumer-supplied author, content slots, optional timestamp, status, attachments, citations, actions, and streaming/error state. It does not own a provider, transport, persistence, or model.

`PromptComposer` owns presentation of multiline text, send and stop intents, prompt suggestions, attachments through U05 Files, disabled/loading state, keyboard behavior, mobile safe-area intent, and optional consumer context/character hints. Its Web canary proves local `Send locally` and `Stop locally` behavior only; these are synthetic callbacks and do not imply transport or generation authority.

Streaming, waiting, saving, failed, and canceled states are visible as bounded text/status. No unsafe HTML-only model is required by the contract, and structured content slots remain available for code, citations, tools, attachments, and artifacts.

## 14. Citation / Source contracts

`CitationList` is a generic source presentation contract with:

- source label or index;
- source title and metadata;
- optional file/document/page/section/record location;
- optional excerpt;
- preview/open action slots.

The contract does not assume every source is a URL. `Drawer`/`DetailDrawer` and a native sheet/screen are presentation alternatives for preview/detail. The consumer owns source ingestion, retrieval, ranking, trust, citation correctness, and unavailable-source handling. The Web canary uses synthetic source metadata only.

## 15. ToolInvocation / ToolResult contracts

`ToolCallCard` presents a tool name, safe summary, status, optional safe parameter summary, result/error, optional duration, and review/retry/dismiss action slots. Status includes pending, running, completed, failed, waiting approval, and canceled.

The card never executes a tool and never becomes the authorization boundary. Raw credentials, tokens, authorization headers, or sensitive payloads are not shown by default. The consumer owns tool registry, authorization, execution, result truth, persistence, and domain mutations. The Web fixture uses safe synthetic summaries and an approval-pending status.

## 16. Human approval contract

`ApprovalPanel` is a policy-neutral checkpoint before a consumer-defined side effect. It presents action summary, impact, target, details, risk/context, and consumer-supplied approve/reject/cancel/edit action slots.

The consumer owns policy, authorization, eligibility, identity, audit persistence, and actual side effect. Ten4Seven owns readable checkpoint structure, state/focus, responsive/native alternative presentation, and safe status. Approval is not silently inferred from a tool result, and no U10 fixture performs a real mutation.

## 17. Streaming / generation state model

The normalized AI state model covers new conversation, no messages, generating, streaming, paused, complete, failed, canceled, tool failure, source unavailable, retry, and waiting approval. Component-level status mappings additionally cover pending, running, completed, failed, waiting approval, and canceled tool activity.

The renderer presents these states with `aria-busy`/status semantics where applicable, bounded announcements, visible retry or stop action slots, and readable error/source-unavailable text. It does not announce every token through a live region, and it does not invent a transport lifecycle beyond the consumer-provided state.

## 18. Reasoning-status safety boundary

Allowed user-safe progress language is limited to bounded statuses such as `Thinking`, `Analyzing`, `Searching`, `Using tool`, and `Preparing response`. The contract explicitly states that the UI does not infer or reveal private/internal chain-of-thought.

Fixtures and canaries use synthetic content and safe summaries. The UI does not expose provider credentials, passwords, tokens, raw authorization data, or hidden internal reasoning. This is a presentation safety boundary, not a replacement for consumer/provider policy.

## 19. Components hardened

The accepted U10 plane normalizes and exports platform, strategy, complexity, classification, inventory status, states, accessibility, tokens, composition, alternatives, and engine boundary for these 11 surfaces. This execution revalidated those contracts and did not change component source:

`EditorSurface`, `PropertyInspector`, `BuilderCanvas`, `PromptComposer`, `ConversationThread`, `CitationList`, `ToolCallCard`, `ApprovalPanel`, `CommandMenu`, `DragHandle`, and `DiffViewer`.

The bounded hardening present in the starting U10 plane and revalidated here included:

- `EditorSurface` state/read-only metadata and readable editing status;
- `PromptComposer` state, busy behavior, send/stop intent, and stop label;
- message/tool status mappings for paused, canceled, and waiting-approval states;
- the canonical token-led `DiffViewer` presentation;
- explicit Web canary membership and six native-ready canary descriptors;
- public UI exports for the typed U10 contract and native descriptor export without introducing a native component package.

Existing working behavior was preserved. U10 did not replace editor engines, builder schemas, DnD mutation, AI transport, persistence, or business authorization.

## 20. Net-new canonical components

The U10 contract lineage has exactly one justified net-new canonical component: `DiffViewer`. It was already present in the accepted starting HEAD; this bounded audit added no additional canonical component.

`DiffViewer` is a bounded Web presentation surface for consumer-supplied line/context rows in inline or split mode. It uses accessible table structure, text change-kind labels, empty/loading/error/read-only states, and token-led surface/border/focus styling. It performs no diff computation.

It is not a duplicate of the existing `RevisionDiff`. `RevisionDiff` remains the field-level revision/provenance surface with reason, actor, time, and evidence. `DiffViewer` is line-level generic comparison. The distinction is recorded in the typed editor decision, component-platform contract, catalog `alternativeTo` metadata, and U10 verifier.

## 21. Blocks / recipes identified

U10 identifies, but does not reconcile, these composition boundaries:

- AI artifact output belongs in a generic Block/Workspace slot;
- editor workspace belongs to a composition/recipe layer around `EditorSurface`;
- builder workspace belongs to a composition/recipe layer around palette/outliner/canvas/inspector;
- workflow/productivity consumers may compose command, reorder, approval, and editor surfaces through existing recipes.

The existing provisional U11 composition projection contains 27 blocks, 19 recipes, and 7 profiles. U10 did not create a second block or recipe registry, did not edit U11 block/recipe definitions, and did not claim U11 reconciliation. Section 32 records the required provisional follow-up statuses.

## 22. Rejected duplicates / variants

| Candidate                                 | U10 decision                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------------- |
| `CommandPalette`                          | Alias of canonical `CommandMenu`; no new canonical primitive                              |
| Markdown/Rich Text/Code/JSON editor names | `EditorSurface` family variants or engine adapters                                        |
| `UserMessage` / `AssistantMessage`        | Message role variants within `ConversationThread`                                         |
| Source URL card variants                  | `CitationList`/source contract with optional location metadata                            |
| Tool-specific cards                       | `ToolCallCard` status/content variants                                                    |
| Builder mega-component                    | Rejected; compose palette, U07 TreeView, canvas, inspector, toolbar, preview              |
| File drop/reorder                         | Rejected as a merge; U05 Dropzone file operation remains distinct from U10 reorder intent |
| `RevisionDiff` replacement                | Rejected; it is a different field-level audit/provenance contract                         |
| AI-specific Button/Input/Field families   | Reuse canonical action/form/file primitives                                               |

These decisions preserve the universal taxonomy and ensure variants and aliases do not increase canonical primitive count. The only justified U10-lineage addition is the line-level `DiffViewer` gap described above; no new primitive was added during this execution.

## 23. Web canaries

The deterministic Web canary is available at:

`http://127.0.0.1:4173/component-lab#component-lab-u10-advanced-interactions`

It contains five typed canary families:

| Canary      | Required proof                                                                                                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `editor`    | `EditorSurface`, `DiffViewer`, `Toolbar`, `StateView`; dirty/saving/saved/error and narrow measure                                 |
| `builder`   | `BuilderCanvas`, `TreeView`, `PropertyInspector`, `StateView`; palette/outliner/canvas/inspector separation                        |
| `dnd`       | `DragHandle`, `TreeView`, `CommandMenu`; intent, valid/invalid target, cancel, and action alternative                              |
| `ai`        | `ConversationThread`, `PromptComposer`, `CitationList`, `ToolCallCard`, `ApprovalPanel`; bounded status and retry/action structure |
| `powerUser` | `CommandMenu`, `Kbd`, `AlertDialog`; search, shortcuts, empty/disabled, and dangerous-action boundary                              |

All fixtures are synthetic and safe. The canary is a library/harness surface and is not presented as production business UI.

## 24. Native/adaptive canaries

`NATIVE_ADVANCED_CANARY` contains six CSS-independent descriptors:

| ID                | Source                               | Native strategy     | Primitive/presentation                             |
| ----------------- | ------------------------------------ | ------------------- | -------------------------------------------------- |
| `conversation`    | `ConversationThread`                 | `ALTERNATE_PATTERN` | ScrollView ordered message collection              |
| `composer`        | `PromptComposer`                     | `ALTERNATE_PATTERN` | TextInput + Pressable + ScrollView, keyboard-safe  |
| `citationSource`  | `CitationList + Drawer/DetailDrawer` | `ALTERNATE_PATTERN` | FlatList plus native sheet/screen                  |
| `toolApproval`    | `ToolCallCard + ApprovalPanel`       | `ALTERNATE_PATTERN` | View/Pressable plus native sheet/modal             |
| `reorder`         | DnD intent + `DragHandle`            | `ALTERNATE_PATTERN` | FlatList/Pressable plus explicit move action sheet |
| `editorInspector` | `EditorSurface + PropertyInspector`  | `ALTERNATE_PATTERN` | ScrollView/TextInput plus inspector sheet          |

Each descriptor records semantic order, safe-area intent, touch-safe actions, accessibility obligations, and `cssParsing: false`. `packages/native/src/index.ts` exports descriptor resolution only; U10 does not create `@ten4seven/native` components, add React Native dependencies, or claim native runtime parity.

Platform strategies remain explicit: `BOTH` means shared intent with platform presentation; `ADAPTIVE` means responsive/alternate composition; `WEB` means no native implementation claim; `NATIVE` and `NATIVE_ONLY` remain available taxonomy values for later work.

## 25. Showroom

`apps/playground/src/advanced-interaction-proof.tsx` is the U10 showroom composition. It is mounted from Component Lab and linked in the library explorer as `U10 canary`. The section ID and test ID are `component-lab-u10-advanced-interactions`.

The showroom composes existing canonical UI primitives and the one justified `DiffViewer`; it contains no local Button/Input/Card/Menu primitive, no donor UI import, no engine, no provider, no transport, and no business mutation. The earlier `component-lab-editors-builders-ai` proof remains available as a prior surface and was not replaced by an unrelated redesign.

## 26. Component Lab stress proof

The rendered browser proof ran the U10 Playwright suite with a local Vite server at all four required viewport classes:

- desktop: 1440×900;
- intermediate: 1024×768;
- tablet: 768×1024;
- mobile: 390×844.

The suite asserts all five Web canaries, the DiffViewer/TreeView/PropertyInspector/CitationList surfaces, waiting-approval text, approval text, DnD Move before/after/Cancel paths, local prompt Send/Stop, command search/open/select, and `scrollWidth <= clientWidth + 1` at each viewport. Final result: `6 passed (19.2s)`.

Rendered screenshots:

- [U10 desktop 1440×900](D:/SA/ten4seven-ui/output/playwright/u10-advanced-desktop-1440x900.png)
- [U10 mobile 390×844](D:/SA/ten4seven-ui/output/playwright/u10-advanced-mobile-390x844.png)

The desktop proof captures separated editor heading and supporting copy; the mobile proof remained within the viewport with no horizontal overflow.

## 27. AI/catalog projection

The single typed source of truth is `packages/contracts/src/editor-builder-ai.ts`, exported through `packages/contracts/src/index.ts`. It imports the existing U01 `TOKEN_RESOLUTION_ORDER` from `packages/contracts/src/foundation.ts`; it does not define a second token or decision source.

Derived projections were regenerated with `pnpm contracts:generate`, including:

- `generated/editor-builder-ai.json`;
- `packages/agent/generated/editor-builder-ai.json`;
- `generated/components/DiffViewer.json` and its agent projection;
- refreshed compact/index/component-contract projections.

The AI/catalog projection remains the existing catalog system: `packages/ai/catalog/components.json` contains the implemented `DiffViewer` metadata, while the generated agent projections provide retrieval. No `ai-components.json`, editor registry, builder registry, or other second decision manifest was introduced.

Final catalog evidence is 179 total components, 172 canonical components, 7 aliases, 29 recipes, 60 expressive blocks, and 122 semantic icons. The canonical component-system verifier explicitly recognizes `DiffViewer` and the `RevisionDiff` distinction.

Ownership and projection order are explicit:

- typed contracts own intent, states, accessibility, platform strategy, engine boundaries, token role names, and AI metadata;
- product profiles and ThemeScope remain upstream theme-resolution inputs;
- Web projects resolved semantic values into CSS custom properties;
- native-ready code consumes resolved values/descriptors as JS/TS data and never parses CSS;
- AI/documentation projections are generated artifacts and not authorities.

## 28. Tests

Final validation from the accepted U10 source state and this bounded re-audit:

| Command                                                                     | Result                                                                                                                           |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                                   | PASS — 234 contract projections and deterministic theme/DTCG projections regenerated                                             |
| `pnpm test:advanced-interactions`                                           | PASS — 11 components, 6 editor families, 6 native canaries, no engine dependencies                                               |
| `pnpm test`                                                                 | NOT RUN — bounded U10 execution; the aggregate command enters U11+ and later queue verification, so it was intentionally not run |
| `pnpm typecheck`                                                            | PASS — contracts, native, agent, and playground                                                                                  |
| `pnpm package:build`                                                        | PASS — `@ten4seven/ui@1.0.0` and `@ten4seven/agent@0.1.0` artifacts built                                                        |
| `pnpm package:verify`                                                       | PASS — `@ten4seven/ui@1.0.0`; root exports, bundled tokens/icons/motion, and self-contained styles verified                      |
| `pnpm build`                                                                | PASS — playground production build; existing large-chunk warning recorded in section 29                                          |
| `pnpm test:contracts`                                                       | PASS — typed contracts, theme/profile round-trip, resolver order, and generated retrieval                                        |
| `pnpm test:native-mobile`                                                   | PASS — native-ready contract and descriptor boundary without native renderer dependency                                          |
| `pnpm test:native-expo`                                                     | PASS — 7 profiles, 18 capability contracts, 179 derived maturity rows, CSS-independent boundary, Expo Lab source                 |
| `pnpm test:ai`                                                              | PASS — 29 recipes, 179 components, 60 blocks, 122 semantic icons, zero donor reads                                               |
| `pnpm test:component-system`                                                | PASS — 172 canonical components, 7 aliases, singular Select model, explicit taxonomy/relations                                   |
| `pnpm test:consistency`                                                     | PASS — canonical consistency across 28 UI source files                                                                           |
| `pnpm test:token-governance`                                                | PASS — 25 component modules, 16 core semantic variables, no ungoverned component colors/timing                                   |
| `pnpm test:component-coverage`                                              | PASS — 7 high-impact selector families; 1000 raw-pixel occurrences tracked as explicit migration debt                            |
| `pnpm test:contrast`                                                        | PASS — 284 recipe/mode pairs at WCAG AA; lowest exact-source light standard accent foreground 4.67:1                             |
| `pnpm test:dtcg`                                                            | PASS — 3 deterministic DTCG-compatible token exports                                                                             |
| `pnpm exec playwright test tests/q10-editors-builders-dnd-ai-power.spec.ts` | PASS — 6 tests across four viewports, local rendered browser proof                                                               |
| targeted `pnpm exec prettier --check`                                       | PASS — all U10 source, catalog, verifier, test, package, and evidence files checked                                              |
| `git diff --check`                                                          | PASS — no whitespace errors; existing CRLF normalization warnings only                                                           |
| `pnpm format:check`                                                         | FAIL / baseline debt — repository-wide check reports 501 files; no broad formatter rewrite was performed                         |
| `pnpm test:component-system` expected-count update                          | PASS — current catalog is intentionally 172 canonical / 179 total, including the accepted U10-lineage `DiffViewer` addition      |

The scoped contract checks also verified semantic contrast (284 recipe/mode pairs at WCAG AA), token governance, component token coverage (1000 tracked raw-pixel occurrences), package self-containment, and the Tailwind bridge. The repository aggregate `pnpm test` was intentionally omitted because it crosses the U10 boundary into later queues.

## 29. Performance / bundle implications

U10 adds no editor, syntax, JSON-schema, diff, DnD, canvas, model, transport, or virtualization engine dependency to the base runtime. The base package contains only semantic presentation shells and the small precomputed-row DiffViewer. Consumers may lazy-load optional engines behind the documented adapter boundary.

The final package build reported approximately 11,418.72 kB uncompressed ESM and 11,100.85 kB uncompressed CJS for the existing package bundle; no new advanced-engine runtime was bundled. The playground production build reported approximately 22,625.49 kB JavaScript and 713.91 kB CSS and retained the existing greater-than-500 kB chunk warning. The warning is recorded, not silently reclassified as a U10 pass.

Large editor engines, syntax/language packages, diff computation, canvas runtimes, DnD sensors, and long-transcript virtualization remain lazy consumer or separately approved adapter dependencies. A canonical loading state is required when a client-only adapter is loaded.

## 30. Baseline debt

The following baseline conditions remain intentionally untouched:

- `pnpm format:check` reports 501 repository files needing formatting; U10 source files remain bounded and the repository was not mass-formatted;
- token governance tracks 1000 raw-pixel occurrences as explicit migration debt;
- the working tree was already materially dirty (82 status entries at U10 start), including unrelated and earlier-queue artifacts; U10-specific proof outputs and this evidence file were preserved without touching those files. Final status after the scoped refresh is 85 entries (82 inherited entries plus two rendered proof refreshes and this evidence file);
- `git diff --check` reports existing CRLF-to-LF warnings for unrelated files but no whitespace errors;
- the playground retains a large-chunk build warning;
- no branch lifecycle or publication operation was performed.

These conditions do not invalidate the U10 contract, projection, package, or rendered canary proofs, but they remain visible debt for later bounded work.

## 31. Residual legitimate U13 gaps

The following work is intentionally deferred and is not a U10 failure:

- rich-text, Markdown parsing, code language services, JSON tree/schema validation, syntax highlighting, document models, and diff computation;
- editor collaboration, version history, conflict resolution, serialization, persistence, and undo/redo engines;
- page/form/canvas builder schemas, freeform/diagram/node engines, resize mechanics, serialization, collaboration, and builder persistence;
- production DnD sensors, collision algorithms, virtualization, gesture conflict handling, rollback, and conflict resolution;
- full native implementations for Web-only editor/builder/inspector/DiffViewer/DragHandle surfaces;
- provider/model selection, streaming transport, tool execution, retrieval ingestion/ranking, source trust, safety policy, credentials, and conversation persistence;
- domain authorization, business permissions, publish policy, and side-effect execution;
- large transcript virtualization and performance-specific engine adapters.

U13 or a separately authorized engine-adapter queue must establish provider/license, accessibility, keyboard/touch, persistence, performance, and security contracts before any specialized runtime is added.

## 32. U11 provisional reconciliation ledger

This is a provisional ledger emitted by U10 for the later U11 gate. U11 reconciliation was not performed.

| U11 area             | Provisional status        | U10 evidence/meaning                                                                                                  |
| -------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AI blocks            | `NEEDS BLOCK/RECIPE SYNC` | Artifact output is identified as a Block/Workspace slot; no U11 block migration was executed                          |
| Editor workspace     | `NEEDS METADATA SYNC`     | EditorSurface family and state/platform metadata are available; U11 must reconcile the existing workspace composition |
| Builder workspace    | `NEEDS BLOCK/RECIPE SYNC` | Builder anatomy is explicitly decomposed; U11 must reconcile the composition/recipe surface                           |
| Productivity recipes | `NEEDS METADATA SYNC`     | Command, reorder, approval, and editor relationships are available for recipe metadata reconciliation                 |
| platform strategies  | `NEEDS METADATA SYNC`     | Web/native/adaptive strategies and six native canaries are available for U11 metadata sync                            |

Allowed U11 ledger values are restricted to `NO IMPACT`, `NEEDS METADATA SYNC`, `NEEDS BLOCK/RECIPE SYNC`, and `NEEDS CONTRACT MIGRATION`.

## 33. U12 provisional reconciliation ledger

This is a provisional ledger emitted by U10 for the later U12 gate. U12 native implementation and reconciliation were not performed.

| U12 area          | Provisional status           | U10 evidence/meaning                                                                      |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| AI Conversation   | `NATIVE LAB CANARY REQUIRED` | CSS-independent ConversationThread descriptor exists; native lab proof is still required  |
| Composer          | `NATIVE LAB CANARY REQUIRED` | Keyboard-safe TextInput/Pressable intent is described; native lab proof is still required |
| Citation          | `NATIVE LAB CANARY REQUIRED` | FlatList plus native detail strategy is described; native lab proof is still required     |
| Tool Call         | `NATIVE LAB CANARY REQUIRED` | Tool status and safe summary boundary are described; native lab proof is still required   |
| Approval          | `NATIVE LAB CANARY REQUIRED` | Approval checkpoint/action strategy is described; native lab proof is still required      |
| DnD               | `NATIVE METADATA ONLY`       | Explicit move/action-sheet alternative and CSS-independent descriptor are present         |
| Editor            | `NATIVE RENDERER GAP`        | EditorSurface strategy is explicit, but no native editor renderer was created             |
| Builder/Inspector | `NATIVE RENDERER GAP`        | Single-task editing/sheet strategy is explicit, but no native renderer was created        |
| CommandPalette    | `NATIVE METADATA ONLY`       | CommandPalette alias and native search/action-surface strategy are recorded               |

Allowed U12 ledger values are restricted to `NO IMPACT`, `NATIVE METADATA ONLY`, `NATIVE LAB CANARY REQUIRED`, `NATIVE RENDERER GAP`, and `NOT_APPLICABLE`.

## 34. Gate

PASS FOR U11 RECONCILIATION

U10 is complete for the bounded contract, adapter-boundary, projection, canary, catalog, test, and evidence scope. STOP. Owner/ChatGPT gate is required before U11 reconciliation.
