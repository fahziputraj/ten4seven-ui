# T7 Universal Hardening U14 — Final Acceptance Evidence

Repository: fahziputraj/ten4seven-ui  
Parent: T7-UNIVERSAL-HARDENING-001  
Work item: T7-UNIVERSAL-HARDENING-U14  
Execution date: 2026-09-13, Asia/Jakarta  
Execution boundary: U14 final only; U15 was not started.

This is the bounded final distribution, AI-index, and consumer-acceptance
record. It reports source, generated, package, browser, and Native evidence
separately. A passing source or contract check is not presented as a device
runtime or production-adoption proof.

Evidence labels:

- SOURCE — read from typed source, package source, or repository configuration.
- GENERATED — produced by the canonical projection/generation pipeline.
- REGISTRY — read from the current catalog or generated registry.
- TEST — deterministic automated verification passed.
- OBSERVED — rendered local Web/browser behavior was inspected.
- PARTIAL — a bounded portion passed but the complete acceptance obligation did not.
- UNKNOWN / UNVERIFIED — the required proof was unavailable.
- BLOCKER — an unresolved condition that prevents the final gate.

## 1. Coordinates

| Field                                | Evidence                                                                                            |
| ------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Repository                           | D:\SA\ten4seven-ui (fahziputraj/ten4seven-ui)                                                       |
| Parent                               | T7-UNIVERSAL-HARDENING-001                                                                          |
| Work item                            | T7-UNIVERSAL-HARDENING-U14                                                                          |
| DWO                                  | Distribution + AI Index + Final Consumer Acceptance                                                 |
| Branch                               | codex/icons-curated-solar-style                                                                     |
| HEAD at discovery and final          | 6d3a8b6647a43cea4c7b09686cd0e0dd50420d9d                                                            |
| Node                                 | v22.23.2                                                                                            |
| pnpm                                 | 11.22.0                                                                                             |
| TypeScript                           | 5.9.3                                                                                               |
| Playwright                           | 1.62.1                                                                                              |
| Vite used by the playground build    | 8.2.2                                                                                               |
| Expo app dependency                  | 57.0.22                                                                                             |
| Worktree baseline                    | 95 git status entries before U14 changes; the checkout was already materially dirty                 |
| Worktree after implementation checks | 104 entries after bounded U14 package/docs/test corrections; prior queue and user changes preserved |
| Git boundary                         | No reset, clean, stash, commit, push, PR, merge, tag, publish, release, or deploy was performed     |
| Queue boundary                       | U14 only; no U15 work was executed                                                                  |

The branch and HEAD are unchanged because this bounded execution deliberately
stopped at evidence and did not create a release commit.

## 2. Program summary and prerequisite chain

The prior queue evidence was inspected before final acceptance:

| Queue | Prior evidence / result                                                                                                                                |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| U01   | T7-UNIVERSAL-HARDENING-U01-TOKEN-FOUNDATION-EVIDENCE.md — PASS FOR U02                                                                                 |
| U02   | T7-UNIVERSAL-HARDENING-U02-INTRINSIC-LAYOUT-EVIDENCE.md — PASS FOR U03                                                                                 |
| U03   | T7-UNIVERSAL-HARDENING-U03-CROSS-PLATFORM-CONTRACT-EVIDENCE.md — PASS FOR U04                                                                          |
| U04   | T7-UNIVERSAL-HARDENING-U04-FOUNDATIONS-LAYOUT-ACTIONS-EVIDENCE.md — PASS FOR U05                                                                       |
| U05   | T7-UNIVERSAL-HARDENING-U05-FORMS-SELECTION-DATETIME-FILES-EVIDENCE.md — PASS FOR U06                                                                   |
| U06   | T7-UNIVERSAL-HARDENING-U06-NAV-DISCLOSURE-OVERLAY-FEEDBACK-EVIDENCE.md — PASS FOR U07                                                                  |
| U07   | T7-UNIVERSAL-HARDENING-U07-DATA-COLLECTIONS-TABLES-EVIDENCE.md — PASS FOR U08                                                                          |
| U08   | T7-UNIVERSAL-HARDENING-U08-VISUALIZATION-SCHEDULING-MAPS-EVIDENCE.md — PASS FOR U09                                                                    |
| U09   | T7-UNIVERSAL-HARDENING-U09-WORKFLOW-PRODUCTIVITY-PATTERNS-EVIDENCE.md — PASS FOR U10                                                                   |
| U10   | T7-UNIVERSAL-HARDENING-U10-EDITORS-BUILDERS-DND-AI-POWER-EVIDENCE.md — PASS FOR U11 RECONCILIATION                                                     |
| U11   | T7-UNIVERSAL-HARDENING-U11-BLOCKS-RECIPES-PROFILES-EVIDENCE.md — PASS FOR U12                                                                          |
| U12   | T7-UNIVERSAL-HARDENING-U12-NATIVE-EXPO-PARITY-EVIDENCE.md — PASS FOR U13; Android bounded emulator canary accepted, iOS/Expo Go/device limits recorded |
| U13   | T7-UNIVERSAL-HARDENING-U13-CORPUS-EXPANSION-EVIDENCE.md — PASS FOR U14; normalized corpus proved zero legitimate expansion gaps                        |
| U14   | This record; final acceptance completed within the final distribution/consumer boundary                                                                |

The U12 and U13 prerequisite gates were re-read from their current evidence
artifacts and are accepted for this queue. Their explicit runtime limitations
remain recorded below; U14 does not turn an emulator canary into iOS or
production-device parity.

## 3. Final architecture

The accepted architectural shape remains:

```text
typed contracts and token/theme runtime
  -> deterministic generated projections
     -> Web package renderer (DOM/CSS)
     -> Native package adapter/renderer (React Native/Expo)
     -> agent/AI retrieval projections
     -> blocks, recipes, profiles, and consumer compositions
```

Shared at the contract plane:

- semantic component intent and names;
- state vocabulary and accessibility obligations;
- token names, semantic roles, and resolver order;
- adaptive intent and platform strategy;
- engine boundaries and consumer-owned business data;
- AI/catalog metadata, aliases, and retrieval guidance.

Platform-specific at the renderer plane:

- Web DOM, CSS, focus rings, popups, tables, browser upload, and pointer DnD;
- React Native primitives, safe-area handling, press feedback, sheets/native
  pickers, list/detail alternatives, touch-safe movement, and device capability
  adapters.

U14 did not create a second primitive library, add a native component family,
rewrite consumer business logic, or make Web code run directly on Native.

## 4. Package graph

The manifest dependency graph was inspected with a cycle walk:

```text
@ten4seven/native --build-time--> @ten4seven/contracts
@ten4seven/native --build-time--> @ten4seven/tokens
@ten4seven/native --runtime bundle--> shared contracts and token values
@ten4seven/native --peer--> react, react-native, react-native-safe-area-context
cycles: []
```

The complete repository package set is:

```text
@ten4seven/agent
@ten4seven/ai
@ten4seven/contracts
@ten4seven/icons
@ten4seven/native
@ten4seven/tokens
@ten4seven/ui
```

The Web package is intentionally self-contained at distribution time: its
build bundles the internal contract/token/icon sources and leaves React and
React DOM as peers. The Native package now has the same bounded local
distribution shape: its build bundles shared contract/token runtime values and
declarations, while React, React Native, and safe-area context remain peers.
The agent package bundles runtime modules and generated projections. The AI
package is a private local CLI boundary.

Contracts and tokens remain internal typed source layers. The package build
uses those sources as inputs, then verifies that the packed Native artifact no
longer exposes workspace imports. This creates a locally installable private
artifact without making the internal source packages independently publishable.

## 5. Public package responsibilities and export boundaries

“Public” below means a named package/export boundary in the repository. It does
not mean published to a registry.

| Package              | Version / state            | Main responsibility                                                        | Export/distribution result                                                        |
| -------------------- | -------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| @ten4seven/contracts | 0.1.0, private             | Typed semantic, platform, profile, recipe, block, and ownership contracts  | Root points to src/index.ts; source workspace only                                |
| @ten4seven/tokens    | 0.1.0, private             | Renderer-neutral theme resolver, Web CSS projection, native JS/TS snapshot | Root and theme.css; source workspace only                                         |
| @ten4seven/icons     | 0.1.0, private             | Semantic icon registry and local static icon data                          | Root points to src/index.tsx; React peer                                          |
| @ten4seven/ui        | 1.0.0, private, UNLICENSED | Self-contained Web DOM/CSS renderer and internal commercial artifact       | Root plus CSS/token/font/package subpaths; React and React DOM peers              |
| @ten4seven/native    | 0.1.0, private             | CSS-independent native adapter and bounded React Native/Expo renderer      | Root and renderer resolve bundled dist JS/declarations; local pack verified       |
| @ten4seven/agent     | 0.1.0, private             | Generated index, shards, deterministic selective retrieval, Node helpers   | Root, core, retrieval, node, generated, and runtime exports from dist/generated   |
| @ten4seven/ai        | 0.1.0, private             | Local t7ui catalog/retrieval CLI                                           | t7ui binary is available in the workspace; no separate published runtime artifact |

The canonical Web consumer boundary is the packed @ten4seven/ui artifact. The
Native boundary is a private, locally packable partial renderer artifact with
verified peer boundaries; it is not a public registry release or full mobile
product.

## 6. Canonical inventory reconciliation

Current catalog and generated registry counts:

| Inventory                                 | Count | Interpretation                                            |
| ----------------------------------------- | ----: | --------------------------------------------------------- |
| Catalog component entries                 |   179 | packages/ai/catalog/components.json                       |
| Canonical component entries               |   172 | Implemented entries with aliasOf absent                   |
| Compatibility aliases                     |     7 | Aliases do not increase canonical component count         |
| Expressive block catalog entries          |    60 | Block layer, not primitive count                          |
| Typed/migrated composition block entries  |    27 | U11 typed composition projection subset                   |
| Recipe catalog entries                    |    29 | Recipe layer, not primitive count                         |
| Typed/migrated composition recipe entries |    19 | U11 typed composition projection subset                   |
| Product composition profiles              |     7 | generated/composition.json                                |
| Theme recipes                             |     4 | enterprise, product, editorial, commerce                  |
| Semantic icon catalog entries             |   122 | Local semantic registry                                   |
| Device capability contracts               |    18 | Native capability ownership boundary                      |
| Native renderer component IDs             |    35 | Partial renderer inventory, not 35 new catalog components |
| Native alternate component IDs            |     8 | Explicit alternate presentation boundaries                |
| Explicit engine boundaries                |    13 | Advanced/optional engine metadata                         |

The U13 generated corpus ledger remains unchanged by U14:
2,221 raw entries, 2,075 exact-folded entries, 2,073 normalized candidates,
172 current canonical catalog entries, 7 catalog aliases, 60 blocks, 29
recipes, 0 net-new canonical components, 0 legitimate gaps, 3 conditional
gaps, 11 alias dispositions, 91 variants, 869 block dispositions, 71 recipe
or pattern dispositions, 234 domain compositions, 218 deferred candidates,
31 utilities/providers, and 430 rejected duplicates. The two generated ledger copies are byte-identical
with SHA-256
db0351f68eb1147689c8d1dbff61a56c9ad49383562d4de7a42b3116580aad64.

No raw corpus candidate was promoted to a canonical component in U14.

## 7. Platform distribution

For the 172 canonical catalog entries, the generated platform matrix is:

| Platform classification | Count |
| ----------------------- | ----: |
| BOTH                    |    97 |
| WEB                     |    14 |
| NATIVE                  |     0 |
| ADAPTIVE                |    61 |
| Total                   |   172 |

There are no catalog components classified NATIVE. That is an honest current
state: the Native renderer has a partial implementation inventory and a
locally packable renderer artifact, while the catalog still represents Native
maturity through BOTH/ADAPTIVE contracts rather than claiming mature
all-family device parity. This avoids treating source-level or package build
success as iOS/device parity.

## 8. Renderer maturity

| Renderer                     | State                                  | Evidence                                                                                        |
| ---------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Web                          | Implemented and packed                 | UI build, package verification, isolated consumer, Next App Router consumer, and browser tests  |
| Native contract adapter      | Implemented at source/descriptor level | @ten4seven/native, native typecheck, Native Expo contract verifier                              |
| Native React Native renderer | Partial renderer                       | packages/native/src/renderer.tsx, bundled renderer.js/declarations, Native Lab typecheck/export |
| Expo Native Lab              | Source consumer plus Web export        | apps/native-lab, typecheck and export:web passed                                                |
| Android runtime              | Bounded emulator canary                | Accepted U12 AVD + debug development client + Metro/adb proof                                   |
| iOS runtime                  | Unverified on this host                | No simulator/toolchain/device proof on this Windows host                                        |

The generated Native maturity projection remains PARTIAL_RENDERER. The
accepted Android result is a bounded FUNCTIONAL_CANARY at the Lab/family
scope, not MATURE_FAMILY_COVERAGE.

## 9. Export audit

The Web package verifier passed with 24 package/root export entries,
including the root runtime, CSS slices, DTCG token export, font paths, and
package metadata. The UI package contains no source files or workspace
dependencies in its packed file list.

The agent pack contains its dist runtime/declarations plus the complete
generated index, component shards, recipes, composition, native, token, and
corpus projections. The generated package copy is included so retrieval can
work from an installed agent package.

The Native package exports root and renderer through `dist/index.js` and
`dist/renderer.js`, with bundled `.d.ts` projections. `pnpm --filter
@ten4seven/native pack --dry-run` and a temporary `--ignore-workspace`
consumer verified the actual local artifact, with no workspace runtime import.

## 10. Build and package artifacts

Passing build outputs:

- pnpm typecheck — PASS: contracts, Native, agent typecheck/build, and
  playground typecheck.
- pnpm package:build — PASS: @ten4seven/ui emitted 11,406.07 kB ESM and
  11,090.47 kB CJS; gzip sizes were approximately 2,257.91 kB and 2,234.62 kB.
- pnpm package:verify — PASS: 24 package/root exports, bundled
  tokens/icons/motion, self-contained styles.
- pnpm build — PASS: playground production build; Vite reported a large
  application chunk advisory but no build error.
- pnpm --filter @ten4seven/native build — PASS: bundled root/renderer runtime
  entries and declarations from the shared source plane.
- pnpm --filter @ten4seven/native verify — PASS: no workspace contract/token
  imports remain in the Native runtime or declaration artifacts.
- pnpm --filter @ten4seven/native-lab export:web — PASS: Expo Web bundle
  exported successfully; the main Web bundle was approximately 1.1 MB.

The playground production build is Web evidence only. The Native package build
clears local artifact consumability, but it does not promote the partial
renderer to mature all-family Native coverage.

## 11. Dependency and peer audit

Manifest peer boundaries are explicit:

- @ten4seven/ui: react >=18.2.0, react-dom >=18.2.0.
- @ten4seven/icons: react >=18.
- @ten4seven/native: react >=19.1.0, react-native >=0.81.0,
  react-native-safe-area-context >=5.6.0; no runtime dependencies, with
  Contracts/Tokens and build tooling scoped to devDependencies.
- Native Lab owns Expo 57/RN 0.81/RN Web and safe-area dependencies as its app
  environment.

The manifest cycle check found no cycles. No donor UI package import was found
in the canonical Web, Native, contracts, tokens, agent, or AI source. Native
runtime output imports only its declared React Native and safe-area peers at
the renderer boundary; shared Contracts/Tokens are bundled from build-time
inputs.
The UI overlay uses react-dom only within the Web renderer.

The isolated Next consumer emitted a fixture-only engine warning because the
fixture asks for Node >=24.0.0 while this host runs v22.23.2; the root
repository engine is >=22.12.0. The warning did not prevent the consumer
proof, but a release environment should align the fixture/host engine policy.

## 12. Heavy-engine isolation

The explicit engine boundary inventory contains:

- AdvancedDataGrid
- BarChart
- BuilderCanvas
- ChartLegend
- ChartPanel
- DiffViewer
- DonutChart
- EditorSurface
- LineChart
- PromptComposer
- PropertyInspector
- Sparkline
- TrendIndicator

U08, U10, and the generated component contracts classify these as renderer
or consumer-engine boundaries. No chart, map, editor, virtualization, or DnD
engine is added as a runtime dependency to the base UI or Native package.
Optional engine license/maintenance/size/accessibility review remains
consumer-owned.

The Web package intentionally bundles the local Solar icon collection and the
anime.js motion adapter. The UI build is consequently large and emits a
chunk-size advisory; this is an optimization/release backlog item, not an
unrecorded dependency.

## 13. Token and profile distribution

The U01 source-of-truth model remains authoritative:

```text
typed theme/profile contracts
  -> one six-stage resolver
     -> ResolvedTheme semantic roles
        -> Web CSS custom-property projection
        -> Native JS/TS projection
        -> DTCG and AI projections
```

The resolver order is:

```text
SYSTEM_DEFAULTS
  -> BASE_RECIPE
  -> PRODUCT_PROFILE
  -> THEME_OVERRIDE
  -> SCOPED_OVERRIDE
  -> COMPONENT_STATE
```

The U01 ownership layers are explicit: FOUNDATION, SEMANTIC, LAYOUT,
COMPONENT, PRODUCT_PROFILE, and SCOPE. Dimension classes are explicit:
GLOBAL_CUSTOMIZABLE, DERIVED, FIXED_SYSTEM_SEMANTIC,
PRODUCT_PROFILE, COMPONENT_SEMANTIC, and COMPOSITION_LOCAL.

U01 recorded 464 generated root CSS variables in ordered parity with the typed
runtime. Native uses buildNativeThemeSnapshot/resolveNativeTheme and does not
parse CSS. Theme tests cover defaults, recipe/profile/override/scope/state
resolution, light/dark, contrast, reduced motion, typography, density,
radius, semantic status, and chart-related roles. The current projection
contains 4 theme recipes and 7 product/profile canaries.

## 14. Web consumer smoke

The following consumer proofs passed:

- pnpm test:slice-a — isolated entity-list-consumer installed packed UI and
  agent artifacts, typechecked, built, and resolved the canonical recipe
  without workspace/source imports.
- pnpm test:next-consumer — packed UI install, single React runtime
  verification, strict TypeScript, Next.js 16 App Router production build,
  three Playwright tests, and axe smoke all passed.
- pnpm test:tailwind-bridge — isolated Tailwind bridge consumed packaged
  semantic theme CSS and compiled six semantic utilities.
- pnpm package:verify — the self-contained UI package boundary passed.
- pnpm build — playground production Web build passed.

These are package/fixture/local Web proofs. They are not proof that every
external product route has been migrated or deployed.

## 15. Native consumer smoke

Passed source-level checks:

- pnpm --filter @ten4seven/native typecheck.
- pnpm --filter @ten4seven/native build.
- pnpm --filter @ten4seven/native verify.
- pnpm --filter @ten4seven/native pack --dry-run.
- pnpm --filter @ten4seven/native-lab typecheck.
- pnpm --filter @ten4seven/native-lab export:web.
- pnpm test:native-expo.
- A temporary `--ignore-workspace` consumer installed the Native tarball,
  strict-typechecked imports from both `@ten4seven/native` and
  `@ten4seven/native/renderer`, and imported the root runtime successfully.
  The extracted renderer syntax was also checked with Node.
- Native Lab imports `@ten4seven/native/renderer` and the shared contract
  canary at public workspace boundaries; it does not import internal Web UI
  source.

Unavailable or failed checks:

- pnpm --filter @ten4seven/native-lab doctor failed before Expo doctor
  execution with pnpm Unknown option: recursive.
- pnpm --dir apps/native-lab run doctor reached the local Expo CLI, which
  reported that expo doctor is unsupported there and requires npx expo-doctor.
- Native Lab doctor remains a tooling limitation: the package-filter command
  rejects pnpm's `recursive` option and direct `expo doctor` asks for
  `npx expo-doctor`.
- iOS simulator, Expo Go, physical-device, screen-reader, orientation,
  capability-API, haptics, and Native production-install evidence remain
  explicitly unavailable or unverified.

Native source/package/typecheck/Web export is locally consumable. Runtime
maturity remains PARTIAL_RENDERER plus the accepted bounded Android emulator
canary, not full cross-platform product acceptance.

## 16. Adaptive acceptance

The generated Native/Expo contract lists adaptive canaries for:

- Select: Web popup/listbox, Native sheet/native picker strategy.
- DataTable: Web dense comparison table, Native list/detail or justified
  horizontal data surface.
- MasterDetail: Web panes/drawer, Native navigation/list-detail.
- Kanban: Web pointer/keyboard DnD, Native explicit move/action alternative.
- TooltipPopover: Web anchored help, Native contextual press/help surface.
- AIConversation: Web thread/composer, Native stack/list and touch-safe
  action presentation.
- EditorBuilder: Web editor/builder slots, Native partial or alternate
  authoring flow.

U14 AI queries exercised the selection of these existing contracts and their
platform strategy. No adaptive contract was silently flattened into “Web works
everywhere.”

## 17. Registry integrity

The following registry checks passed:

- pnpm test:contracts: 7 aliases, 29 recipes, typed operational metadata,
  ThemeProfile round-trip, and compact retrieval at
  294,129/394,391 bytes.
- node --experimental-strip-types scripts/generate-contract-projections.mjs
  --check: generated projections are fresh.
- pnpm test:ai: 29 recipes, 179 components, 60 expressive blocks, 122
  semantic icons, 15 recipe cold-start tasks, 13 contract/catalog reads, and
  0 donor reads.
- pnpm test:component-system: 172 canonical components, 7 aliases,
  29 recipes, 60 expressive blocks, singular Select model, and explicit
  taxonomy/relationships.
- pnpm test:component-corpus: U13 ledger and deterministic stop evidence agree.
- pnpm test:consistency: canonical consistency across 28 UI source files.
- pnpm test:token-governance: 25 component modules, 16 core semantic
  variables, no raw component colors/palette dependencies/ungoverned timing,
  and 4 documented literal categories.

The generated and packages/agent/generated copies remain derived from the
typed source and are not manually authored decision stores.

## 18. Alias integrity

The current public aliases are:

| Alias           | Canonical target |
| --------------- | ---------------- |
| RadioGroup      | CheckboxGroup    |
| TimeInput       | NativeTimeInput  |
| ActionMenu      | DropdownMenu     |
| CommandPalette  | CommandMenu      |
| DescriptionList | KeyValueList     |
| Timeline        | ActivityFeed     |
| Modal           | Dialog           |

The catalog and component-system verifier preserve 172 canonical components
and 7 compatibility aliases. The U14 CLI recommendations emit canonical
exports and native package boundaries; they do not recommend donor names or
create alias families. Existing aliases remain compatibility surfaces.

## 19. AI index architecture

AI discovery uses the generated index and selective shards:

1. generated/agent-index.json defines typed source paths, default retrieval
   order, fallback catalogs, entry points, and the U14 final-acceptance verifier.
2. generated/index.json defines recipe references, theme/native/component
   projections, shard patterns, corpus link, compatibility projections, and
   generated metrics.
3. generated/components.compact.json remains the retrieval-first component
   index, deliberately kept under the existing compact-size guard.
4. generated/components/{componentId}.json carries the complete selected
   component contract, including useWhen, avoidWhen, public Web export,
   native package boundary, platform status, accessibility, responsive,
   motion, token, and engine metadata.
5. packages/agent/generated/ mirrors the generated projections for installed
   agent use.
6. packages/ai/bin/t7ui.mjs first handles bounded final semantic intents and
   then falls back to existing recipe/control-plane/ERP/catalog retrieval.

The U14 final-acceptance entry points to
pnpm test:final-ai-acceptance and this evidence file. The final semantic
phrase table in the CLI is retrieval guidance only: it selects existing
generated IDs and does not define a component contract, token, state, or
renderer.

## 20. AI positive tests

pnpm test:final-ai-acceptance passed these positive retrieval classes:

| Query intent                     | Canonical result                                     |
| -------------------------------- | ---------------------------------------------------- |
| Single primary action            | Button                                               |
| Searchable selection             | Combobox                                             |
| One bounded choice on Android    | Select                                               |
| Hierarchical selection           | Cascader                                             |
| Comparable financial records     | DataTable                                            |
| Very large interactive records   | AdvancedDataGrid                                     |
| Conversation UI                  | ConversationThread + PromptComposer                  |
| Source evidence                  | CitationList                                         |
| Temporary feedback               | Toast                                                |
| Persistent event history         | NotificationCenter                                   |
| Context help on Android          | Popover                                              |
| Desktop resizable workspace      | SplitPane                                            |
| Product display amount           | Price                                                |
| Rich formatted editing           | EditorSurface, RICH_TEXT                             |
| Source code editing              | EditorSurface, CODE                                  |
| Reorder/move                     | DND intent + DragHandle and Native alternate actions |
| Approval/rejection with evidence | Approval / Review composition                        |

Selected component recommendations include Import: @ten4seven/ui,
canonical export name, Native import: @ten4seven/native/renderer where
applicable, platform, renderer strategy, use/avoid guidance, tokens, and
states.

## 21. AI negative tests

The acceptance verifier checks that intent is not collapsed into a visually
similar but semantically incorrect primitive:

| Request                        | Required negative behavior                                                |
| ------------------------------ | ------------------------------------------------------------------------- |
| Records on phone               | Recommends List; does not recommend DataTable as the export               |
| Persistent event history       | Recommends NotificationCenter; does not recommend Toast                   |
| Context help on Android        | Recommends Popover; does not recommend Tooltip                            |
| Rich formatted content         | Recommends EditorSurface; does not invent RichTextEditor                  |
| Photo input on iOS             | Recommends the photoLibrary capability; does not recommend a Dropzone     |
| Very large interactive records | Recommends AdvancedDataGrid; does not fall back to a plain DataTable line |
| Ordinary route/product queries | Existing recipe fallback remains available and was not removed            |

The selected full shard supplies the use/avoid language. The compact index
remains small enough for retrieval; the verbose guidance is loaded only after
a canonical match.

## 22. AI platform-aware tests

The verifier passed platform-aware cases:

- Select reports ADAPTIVE plus a Native selector-sheet boundary.
- SplitPane reports WEB and a list-detail alternative rather than a false
  Native parity claim.
- qrScanner reports NATIVE, DEV_CLIENT_REQUIRED, explicit capability states,
  and consumer-owned payload/business validation.
- photoLibrary reports ADAPTIVE, EXPO_GO, selected-media and permission
  states, and consumer-owned persistence/upload.
- Reorder reports ADAPTIVE, Web pointer/keyboard DnD, Native explicit move
  actions, and accessibility alternatives.
- RICH_TEXT reports an adaptive Web editor plus partial/alternate Native
  authoring with a consumer-owned engine boundary.
- approve or reject with evidence resolves to the adaptive Approval/Review
  composition with its Native list/sheet strategy.

## 23. AI cold-start result

Two independent cold-start paths passed:

- Existing pnpm test:ai cold-start verification: 15 recipe tasks plus ERP
  density retrieval, 13 contract/catalog reads, and 0 donor reads.
- pnpm test:final-ai-acceptance: starts the CLI by absolute repository
  location from consumer-tests/entity-list-consumer and successfully
  resolves records on phone from generated component shards without an
  app-local decision file.

The installed @ten4seven/agent artifact includes generated index and shards.
The private @ten4seven/ai binary itself remains a workspace CLI rather than
a published AI package.

## 24. Documentation and quickstarts

U14 added bounded distribution/renderer guidance to:

- README.md: contract plane, package graph, Web/native renderer separation,
  private local Native artifact boundary, and explicit runtime/release caveat.
- docs/ai/AI_QUICKSTART.md: Native/Expo initialization through
  @ten4seven/native/renderer, JS/TS theme resolution, adaptive presentation
  guidance, and no-device-proof caveat.
- packages/ui/README.md: existing private Web artifact and licensing boundary
  were retained.
- packages/native/README.md: private local build/verify/pack commands, peer
  boundary, partial renderer maturity, and consumer ownership were documented.

The docs do not claim that Native uses Web CSS or that a Web export is an
Android/iOS device release.

## 25. Web showroom

Direct local routes and existing reference surfaces were used as the Web
showroom evidence set:

- /theme-studio
- /component-lab
- Auth brand-proof routes
- /public-showcase
- /ebook-store
- /operations-tracker
- /farm-reference
- /erp-reference
- /tokens, /components, /blocks, /recipes, /icons

Observed browser results:

- Direct CUA route smoke reached Theme Studio, Component Lab, Public Showcase,
  Publishing Store, Operations Tracker, Farm Reference, ERP Density Reference,
  and the Neutral Auth proof. Each rendered a root surface at 1280px with no
  horizontal overflow; the diagnostic log was empty.
- Auth, Component Lab section navigation, Public Showcase expression, Farm
  reference, and direct route checks reached their expected visible surfaces.
- Publishing Store required-matrix behavior passed at four viewports with no
  console/page errors or horizontal overflow.
- The broader reference screenshot suite exposed inherited visual drift and is
  recorded in Section 29; snapshots were not rewritten.

The showcase routes are local/reference harnesses. They are not production
deployment evidence.

## 26. Component Lab

tests/component-lab-section-navigation.spec.ts passed both desktop and
mobile section-navigation tests. The broader selected browser run also passed
the catalog/component-lab discovery tests and the canonical component registry
checks.

The Component Lab remains a system/harness surface and may expose proof
controls. U14 did not add a parallel feature-level Component Lab or change the
canonical primitive policy.

## 27. Native Lab

apps/native-lab/App.tsx is a public-boundary consumer of
@ten4seven/native/renderer and @ten4seven/contracts. Its source families
cover Foundations, Forms, Navigation, Data, Workflow, AI/Power, Device, and
profile/appearance/density/motion/capability fixture states.

Native Lab evidence:

| Check                     | Result                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------- |
| Native Lab TypeScript     | PASS                                                                                |
| Native contract verifier  | PASS                                                                                |
| Native package build      | PASS                                                                                |
| Native package verifier   | PASS                                                                                |
| Native pack/clean-room    | PASS; tarball installed with `--ignore-workspace`, root and renderer types imported |
| Expo Web export           | PASS                                                                                |
| Expo local doctor wrapper | Tooling failure: pnpm recursive option                                              |
| Direct Expo doctor        | Tooling unavailable in local CLI; asks for npx expo-doctor                          |
| Android APK/runtime       | PASS bounded U12 emulator canary; no production release claim                       |
| iOS/Expo Go/device        | UNKNOWN / UNVERIFIED                                                                |

The Lab is valuable source and Web-export evidence, but cannot be used as a
Native device acceptance substitute.

## 28. Final consumer acceptance matrix

| Consumer / surface    | Result                                                                 | Evidence / limitation                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme Studio          | PASS for bounded stabilization proof                                   | Seven final-stabilization tests passed, including recipe authoring, runtime preferences, live provider state, and Theme Settings navigation |
| Component Lab         | PASS for targeted navigation/discovery                                 | Two section-navigation tests and catalog discovery passed; complete browser suite still has unrelated inherited failures                    |
| Auth                  | PASS                                                                   | Auth/brand-expression browser tests passed across desktop, laptop, tablet, mobile, dark mode, form semantics, and reduced motion            |
| Public Showcase       | PASS for expression test                                               | Public Showcase expression test passed; existing screenshot baselines are separate visual debt                                              |
| Publishing Store      | PASS for bounded runtime matrix; baseline visual debt                  | Four-viewport behavior/console/overflow matrix passed; three reference screenshots and related visual assertions remain failing             |
| Operations            | PASS for bounded workflow/runtime proof; baseline visual debt          | Operational workflow and compact-milestone checks passed; three reference screenshots and one CTA geometry assertion remain failing         |
| Farm                  | PASS for local reference proof                                         | Q06 Farm reference tests passed; this is a local synthetic/reference consumer, not Farm production adoption                                 |
| ERP Density Reference | PASS for source/contract/static readiness and direct local route smoke | test:erp-readiness passed; CUA route smoke rendered the route; Native/production ERP adoption remains unverified                            |
| Native Lab            | PASS for local/package and bounded emulator evidence; partial maturity | Native package clean-room proof, source checks, Web export, and accepted U12 Android canary passed; iOS/device breadth remains unverified   |

“PASS” in this matrix means the bounded local proof named in the evidence
column. It does not mean production deployment, customer adoption, or Native
parity.

## 29. Browser QA matrix

Required Publishing Store runtime matrix:

| Viewport | Result |
| -------- | ------ |
| 1440×900 | PASS   |
| 1024×768 | PASS   |
| 768×1024 | PASS   |
| 390×844  | PASS   |

tests/h01c-ebook-store.spec.ts with the required-matrix filter completed 1/1.
It checked storefront readiness, no horizontal overflow, no console errors, and
no page errors at every viewport.

Selected final stabilization/reference/system suite:

- `tests/final-stabilization.spec.ts`: 7/7 passed, covering Theme Studio
  recipe/state behavior, Operations workflow readability, Public Showcase copy,
  shared Theme Settings, and the workbench route.
- `tests/reference-screen-renders.spec.ts`: 0/6 image assertions passed. The
  inherited mismatches were Operations Tracker at 1440×900, 390×844, and
  360×800 (15,711 / 5,213 / 4,787 differing pixels), and Publishing Store at
  1440×900, 390×844, and 360×800 (219,520 / 80,758 / 58,814 differing
  pixels). No overflow assertion failed, and no snapshot update or UI rewrite
  was performed.

Route-family smoke suite:

- 7 tests executed.
- 6 passed.
- 1 failed because tests/route-contract.spec.ts still expects 306 generated
  inventory entries while the current registry contains 312.
- The complete inventory renderer itself reported
  top-level=14 proofs=3 farm=6 component-families=21 component-details=179
  block-details=60 recipe-details=29 aliases=9 failures=0.
- Alias, 404, direct-entry, refresh-safe route, Auth, Component Lab, Public
  Showcase, Farm, and related consumer assertions passed.

This matrix proves meaningful local browser behavior. The six screenshot
mismatches and one stale route-count expectation are preserved as inherited
baseline/expectation debt, not silently rebaselined in U14.

## 30. Android acceptance

Android is accepted only as the bounded U12 emulator canary, not as a
production release. The accepted evidence records AVD `t7-u12-api37`,
`emulator-5554`, Android 17 x86_64 at 1080×1920, a debug development client,
Metro/adb connection, installed APK, and observed Native Lab forms, sheet,
list/detail, dark appearance, AI, and device-state surfaces. The current ADB
check still reports `emulator-5554 device`.

The checkout-root Android assemble and standalone release-bundle paths remain
environment-limited by Windows path/Ninja and Expo/Hermes command-path issues;
U14 does not represent those failures as a renderer defect or as a production
APK. TalkBack, physical-device, and broad capability/orientation/haptics
coverage remain unverified.

## 31. iOS acceptance

iOS is not accepted.

This Windows host did not have an iOS simulator/toolchain or a recorded
Expo Go/physical-device run. VoiceOver, iOS keyboard, safe-area, picker,
orientation, haptics, and native presentation evidence are therefore
UNKNOWN / UNVERIFIED.

## 32. Accessibility

Web and contract evidence:

- pnpm test:next-consumer passed the isolated route axe check with no critical
  or serious violations.
- ERP and component contracts carry accessible-name, state, keyboard, focus,
  non-color status, and responsive obligations.
- U10/U11/U12 contract verifiers passed the editor, workflow, composition, and
  Native accessibility descriptors.
- The Native renderer metadata enables native screen-reader semantics,
  allowFontScaling, press feedback, system back dismissal, and safe-area
  handling at source level.

Not proven:

- TalkBack or VoiceOver on a real Native runtime.
- Device-specific IME, focus/keyboard traversal, haptics, picker, and
  capability accessibility.
- Complete route-by-route axe acceptance across every Web route.

## 33. Theme, profile, contrast, and motion acceptance

Theme tests and contract gates passed:

- defaults, named recipe, product profile, typed override, scoped override,
  and component-state resolution;
- light and dark semantic roles;
- contrast preference;
- reduced motion;
- density and typography;
- motion role derivation;
- chart/status/focus role resolution;
- Native JS/TS snapshot parity.

The semantic contrast verifier passed 284 recipe/mode pairs at WCAG AA
4.5:1; the lowest exact-source light standard accent foreground was 4.67:1.
The U01 token foundation records 464 generated root CSS variables and the
same resolver feeds the Native snapshot. Browser tests also exercised system
appearance, inverse scope, selected runtime options, and reduced-motion
duration behavior. The current Theme Studio live state was accepted by the
seven-test stabilization run; no second token authority was introduced.

## 34. Responsive and measure acceptance

pnpm test:responsive-contracts and pnpm test:layout-contracts passed:

- 9 responsive behavior contracts;
- 11 module states;
- 6 measure roles;
- 12 layout grammar intents;
- deterministic six-stage measure/layer resolution;
- Web/native layout projections.

The required four-viewport Publishing matrix had no horizontal overflow. The
reference and system suites still expose inherited visual geometry debt in CTA
full-track behavior, Ebook price alignment, and existing screenshots. U14 did
not make a mass layout rewrite or rebaseline those snapshots.

## 35. Engine adapter acceptance

U08 visualization, scheduling, and maps verification passed with 7 linked
components, 4 engine boundaries, and 3 Native canaries. U10
editor/builder/DnD/AI verification passed with 11 linked components, 6 editor
families, 6 Native canaries, and no engine dependencies.

U14 confirms that the distribution/index layer exposes those boundaries
without bundling a second editor, chart, map, DnD, or virtualization library.
Editor retrieval reports EditorSurface and the consumer-owned engine boundary.
DnD retrieval reports explicit keyboard/screen-reader movement alternatives
for Native.

## 36. License, dependency, and security boundary

The Web artifact remains private and internally licensed:

- packages/ui/package.json: private true, license UNLICENSED.
- packages/ui/LICENSE.md: internal commercial license.
- packages/ui/THIRD_PARTY_NOTICES.md: Inter, DM Sans, Source Serif 4, and IBM
  Plex fonts under SIL OFL 1.1; Solar collection under CC BY 4.0; anime.js
  4.5.0 under MIT.
- The package ships attribution/license files in its tarball.

No new donor UI library, donor CSS/theme, remote Iconify runtime, or external
engine dependency was introduced by U14. No secret or credential boundary was
added. Optional consumer engines remain subject to consumer license, size,
maintenance, security, and accessibility review before adoption.

## 37. Pack, install, and release boundary

Web dry-run pack:

- @ten4seven/ui@1.0.0: 28 files including dist, CSS slices, declarations,
  fonts, DTCG tokens, LICENSE.md, README.md, and THIRD_PARTY_NOTICES.md; no
  source or workspace dependency.
- @ten4seven/agent@0.1.0: dist runtime/declarations plus generated
  projections, component shards, recipes, indexes, and corpus ledger.
- Next consumer installation/typecheck/build/Playwright/axe: 3/3 tests passed.
- Entity List isolated consumer install/typecheck/build/runtime proof: passed.
- Tailwind bridge isolated package proof: passed.

Native dry-run pack:

- @ten4seven/native@0.1.0 contains package.json, README.md, and the bundled
  `dist/index.js`, `dist/renderer.js`, source maps, declarations, and
  package-build metadata.
- It has no runtime workspace dependencies; Contracts/Tokens are build-time
  inputs and React/RN/safe-area remain peers.
- A temporary clean-room consumer installed the 687,555-byte tarball with
  `--ignore-workspace`, strict-typechecked root and renderer imports, imported
  the root runtime, and passed Node syntax checks for both runtime entries.

No package was published or released. The Web, Agent, and Native artifacts
remain private local/internal outputs; the Native renderer is still partial
and its platform/device limitations are recorded separately.

Artifact evidence captured during U14:

| Artifact                                              |            Size | SHA-256                                                          |
| ----------------------------------------------------- | --------------: | ---------------------------------------------------------------- |
| artifacts/ten4seven-ui-1.0.0.tgz                      | 8,925,121 bytes | 696812855E0B74D700AAF4D78AEA0E7A5062375ECC00A0B2F4ED1D57283DBEB0 |
| artifacts/consumer-proof/ten4seven-ui-1.0.0.tgz       | 9,816,988 bytes | 210A4517B6DA3D8571C8145240E4DAC9533FA2DB1489FAD5C8F09B582730DF09 |
| artifacts/consumer-proof/ten4seven-agent-0.1.0.tgz    |   483,038 bytes | 0E0560A8904CC2625F7D92B5D4EA1B56833BB5A8B7884EE20774AC991E629A0A |
| temp/t7-native-pack/ten4seven-native-0.1.0.tgz        |   687,555 bytes | 2726DB19896ACC5B48914684EE2743712086372919DA74DEBE7F30A0EE56EDE2 |
| generated/component-corpus-ledger.json                | 2,444,792 bytes | DB0351F68EB1147689C8D1DBFF61A56C9AD49383562D4DE7A42B3116580AAD64 |
| packages/agent/generated/component-corpus-ledger.json | 2,444,792 bytes | DB0351F68EB1147689C8D1DBFF61A56C9AD49383562D4DE7A42B3116580AAD64 |

Artifact sizes are evidence of local generation/install paths. They are not
publication authorization.

## 38. Required test and verification ledger

| Command / check                             | Result                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| pnpm contracts:generate                     | PASS; generated 234 contract projections, theme CSS, and 3 DTCG exports               |
| Projection freshness check                  | PASS; generate-contract-projections.mjs --check                                       |
| pnpm test:contracts                         | PASS                                                                                  |
| pnpm test:final-ai-acceptance               | PASS                                                                                  |
| pnpm test:ai                                | PASS                                                                                  |
| pnpm test                                   | PASS; complete chain includes final AI acceptance                                     |
| pnpm typecheck                              | PASS                                                                                  |
| pnpm package:build                          | PASS                                                                                  |
| pnpm package:verify                         | PASS                                                                                  |
| pnpm build                                  | PASS                                                                                  |
| pnpm test:next-consumer                     | PASS; 3 Playwright/axe tests                                                          |
| pnpm test:slice-a                           | PASS                                                                                  |
| pnpm --filter @ten4seven/native build       | PASS; bundled Native runtime and declarations                                         |
| pnpm --filter @ten4seven/native verify      | PASS; internal imports absent from runtime/declarations                               |
| Native package/Lab typechecks               | PASS; package and Expo Lab                                                            |
| Native Lab Web export                       | PASS                                                                                  |
| Native pack --dry-run + clean-room consumer | PASS; 687,555-byte tarball installed outside workspace and imported                   |
| git diff --check                            | PASS; no whitespace errors                                                            |
| pnpm format:check                           | FAIL; 528 paths reported, outside bounded U14 authored scope and not mass-reformatted |
| Final stabilization browser suite           | PASS; 7/7                                                                             |
| Reference screenshot browser suite          | FAIL baseline only; 0/6 image assertions, no overflow failures                        |
| Route-family browser suite                  | PARTIAL; 6/7 passed, stale 306-versus-312 inventory assertion                         |
| Required Publishing four-viewport matrix    | PASS; 1/1 test across 1440×900, 1024×768, 768×1024, 390×844                           |
| Native Lab doctor                           | UNVERIFIED/tooling unavailable in local wrapper; no device proof                      |
| U12 Android/iOS runtime evidence            | PASS bounded Android emulator canary; iOS/Expo Go/device remains UNVERIFIED           |

The full pnpm test result is a source/contract/package test pass. The remaining
visual mismatches, route-count expectation, repository-wide formatting debt,
and unavailable iOS/Expo Go evidence are explicitly classified as inherited or
environment-limited in Sections 29–33 and do not originate in the U14 package
boundary.

## 39. Final release blockers

No current-queue release blocker remains after the bounded Native package
distribution correction. The final acceptance boundary is satisfied for the
private local Web/Agent/Native artifacts, registry/AI projections, and the
available Web plus bounded Android consumer evidence.

The following remain explicit non-release claims and baseline/environment
limitations rather than U14 blockers: six inherited reference-image mismatches,
one stale 306-versus-312 route expectation, 528 repository-wide formatting
warnings, unavailable iOS/Expo Go/physical-device proof on this Windows host,
and the Native renderer's honest PARTIAL_RENDERER maturity. No package was
published, tagged, released, or deployed.

## 40. Baseline debt and inherited state

The checkout was already dirty before U14. U14 preserved the existing
application, generated, test, lockfile, and evidence changes. The current
working tree had 95 status entries at the U14 starting coordinate and 104 after
the bounded package/docs/test corrections, including large prior queue changes
and user work.

Recorded baseline debt includes:

- 528 paths reported by the repository-wide Prettier check;
- 1,000 raw-pixel occurrences tracked by component-token coverage as explicit
  migration debt;
- large Web/playground and UI bundle advisories;
- stale route-inventory expectation (306 versus generated 312);
- six reference screenshot mismatches and existing visual geometry/status
  expectations;
- the local Expo doctor wrapper mismatch;
- Native renderer partial maturity and platform/device evidence limits from
  U12; the U14 package artifact itself is now locally verified.

No baseline debt was normalized, deleted, or snapshot-rebased in U14.

## 41. Post-U14 backlog

The next owner-controlled remediation backlog is:

- clear the checkout-root Android build and record a fresh installable
  development/release APK trace without the Windows path workaround;
- add iOS simulator/Expo Go/physical-device proof for the Native Lab;
- expand Native from partial renderer plus bounded canary to family-level
  accessibility, IME, capability, orientation, haptics, and performance proof;
- resolve the six browser reference-image mismatches and rebaseline only after
  owner review;
- reconcile the existing route inventory assertion to the generated 312-entry
  source;
- clear the repository-wide formatting debt in a separately authorized cleanup
  queue;
- complete U13 conditional-candidate decisions and only add canonical
  components when a distinct contract is justified;
- add full Native accessibility/IME/capability/orientation/haptics tests;
- measure and improve Web tree-shaking/code splitting without introducing a
  second primitive system;
- keep AI retrieval phrases derived or reconciled with typed search metadata as
  the catalog expands.

No backlog item was executed as U15.

## 42. Release and version recommendation

Recommendation: accept T7 Universal Hardening as complete for private local
consumption, but do not publish or publicly release an artifact from this
checkout without a separate owner authorization and the Native/iOS/device
release policy.

The Web @ten4seven/ui@1.0.0 artifact is locally packable and passed isolated
Web consumer proofs. The agent 0.1.0 artifact is locally packable with
generated projections. Those facts support internal Web/agent consumption
subject to the existing private license; they do not imply universal
release-readiness.

@ten4seven/native@0.1.0 remains a private locally packable partial-renderer
artifact. Its build, install, peer/dependency, and local runtime boundaries are
proven; full Native family/device/accessibility parity and registry publication
remain future owner decisions. No version bump, publish, release, or commit was
authorized or performed.

## 43. Cold-start handoff

Canonical re-entry points for the owner are:

```text
pnpm install
pnpm contracts:generate
pnpm test:final-ai-acceptance
pnpm test
pnpm test:next-consumer
pnpm --filter @ten4seven/native typecheck
pnpm --filter @ten4seven/native build
pnpm --filter @ten4seven/native verify
pnpm --filter @ten4seven/native pack --dry-run
pnpm --filter @ten4seven/native-lab typecheck
pnpm --filter @ten4seven/native-lab export:web
```

Source and projection entry points:

- packages/contracts/src/ — typed semantic/platform/profile source.
- packages/tokens/src/theme.ts — typed theme resolver and Native snapshot.
- packages/ui/src/ — Web renderer source.
- packages/native/src/ — Native adapter and renderer boundary.
- generated/agent-index.json — retrieval order and final-acceptance pointer.
- generated/index.json — generated package projection index.
- generated/components/{componentId}.json — selected full component contracts.
- packages/ai/bin/t7ui.mjs — local semantic retrieval CLI.
- scripts/verify-final-ai-acceptance.mjs — deterministic final AI acceptance.
- docs/ai/AI_QUICKSTART.md and README.md — human/agent distribution guidance.
- docs/aapm/T7-UNIVERSAL-HARDENING-U12-NATIVE-EXPO-PARITY-EVIDENCE.md —
  accepted bounded Native/Android prerequisite and explicit device limits.
- docs/aapm/T7-UNIVERSAL-HARDENING-U13-CORPUS-EXPANSION-EVIDENCE.md —
  accepted normalized-corpus prerequisite and zero-gap decision.

Owner gate required before any subsequent work: review this final evidence and
make an explicit release/publication decision. No U15 or subsequent queue was
started by this execution.

## 44. Gate

PASS — T7 UNIVERSAL HARDENING COMPLETE
