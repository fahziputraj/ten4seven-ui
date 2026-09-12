# T7-UNIVERSAL-HARDENING-U02 — Intrinsic Layout, Measure & Responsive Evidence

## 1. Coordinates

| Field                | Evidence                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Program              | `T7-UNIVERSAL-HARDENING-001`                                                                 |
| Queue                | `T7-UNIVERSAL-HARDENING-U02`                                                                 |
| Objective            | Intrinsic layout, measure, responsive/adaptive grammar, and cross-platform layout contract   |
| Repository           | `fahziputraj/ten4seven-ui`                                                                   |
| Workspace            | `D:\\SA\\ten4seven-ui`                                                                       |
| Branch               | `codex/icons-curated-solar-style`                                                            |
| HEAD at verification | `e582cfcfbe0f077d1a5832d86db9da1898487fd3`                                                   |
| Execution mode       | Strict / bounded-wide; U02 only                                                              |
| Prerequisite         | `docs/aapm/T7-UNIVERSAL-HARDENING-U01-TOKEN-FOUNDATION-EVIDENCE.md` ends with `PASS FOR U02` |
| Publication boundary | No commit, push, PR, merge, tag, publish, or deploy performed                                |

The worktree was already materially dirty before U02. Existing user-owned and
earlier-queue changes were preserved; no reset, clean, broad formatting pass,
or unrelated consumer rewrite was performed. `git status --short` reported 363
paths at the end of this queue, including pre-existing work and generated
projections. This report is the only U02 evidence file created.

## 2. Problem classes observed

The audit used representative consumers from Component Lab, Auth, Public
Showcase, Publishing Store, Operations, and Farm. The findings were contract
and ownership problems, not a request for screenshot-by-screenshot restyling.

| Problem class                                | Observed evidence                                                                                                                                                             | Bounded U02 response                                                                                                                                                |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Measure intent was implicit                  | Existing `Container.size` rails were meaningful, but components and repeated collections had no small shared vocabulary for compact, default-control, wide, or fill behavior. | Added the typed `MeasureContractEntry` vocabulary and the additive `MeasureIntent` API.                                                                             |
| Global versus local geometry drift           | `FormGrid` contained a repeated raw `16px` gap; `ProductGrid` accepted raw `minCardWidth`; Q04 used local `fit-content` sizing for short controls.                            | Reused the existing reference-space token for the form gap, added semantic `minItemMeasure`, and removed Q04's local width authoring while retaining compatibility. |
| Percentage-only split sizing                 | `SplitPane` preserved percentage resizing and keyboard bounds but did not state a minimum useful pane measure or a narrow-width alternate.                                    | Added `minPaneMeasure`, token-owned grid minimums, and a narrow Web stacking rule; the native contract points to MasterDetail instead of a DOM split.               |
| Stretch and min-content risk                 | Dense form rows and intrinsic collections could inherit stretch or min-content pressure when content became longer.                                                           | `FormGrid` aligns rows to start; grids and panes use `minmax(0, ...)`, bounded item minimums, and explicit region overflow.                                         |
| Responsive shrink was the default risk       | A desktop two-pane arrangement is not automatically useful when squeezed into a phone width.                                                                                  | Recorded responsive intent in the grammar contract and recomposed horizontal SplitPane to one ordered column below the shared narrow breakpoint.                    |
| Page versus region overflow was not explicit | Carousels, illustrations, tables, milestone lists, and bounded collection regions can legitimately clip or scroll internally, while document overflow is a defect.            | Defined a page-level overflow gate and retained internal overflow only where the owning component/recipe declares it.                                               |
| Cross-platform source risk                   | CSS custom properties are useful for Web delivery but cannot be the Native source of truth.                                                                                   | Added numeric Native measure projection from the typed runtime; Native does not parse CSS.                                                                          |

No mass visual redesign was performed. Existing shell, route, business, state,
and accessibility behavior was preserved.

## 3. Vocabulary

### 3.1 Ownership layers

| Layer           | Owning contract/source                                                                                           | Dimension classification                                  | Platform strategy                                           | Scope                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| FOUNDATION      | `packages/tokens/src/theme.ts` plus typed foundation contracts                                                   | `GLOBAL_CUSTOMIZABLE`, `DERIVED`, `FIXED_SYSTEM_SEMANTIC` | `BOTH` / `SAME_INTENT`                                      | Primitive color ramps, reference spacing, type roles, raw radius/elevation/motion, sizing and accessibility floors                |
| SEMANTIC        | `packages/contracts/src/theme-profile.ts` and `packages/tokens/src/theme.ts`                                     | `DERIVED`, `FIXED_SYSTEM_SEMANTIC`                        | `BOTH` / `SAME_INTENT`                                      | Foreground, background, surfaces, border, focus, action, selected, status, disabled, chart and data-visualization meaning         |
| LAYOUT          | `packages/contracts/src/foundation.ts`, `packages/contracts/src/theme-recipe.ts`, `packages/tokens/src/theme.ts` | `DERIVED`, `PRODUCT_PROFILE`, `COMPOSITION_LOCAL`         | `ADAPTIVE` / `ALTERNATE_PATTERN` where presentation changes | Page gutter, section rhythm, content/reading/compact/control/wide measures, minimum useful surface, and systemic shell dimensions |
| COMPONENT       | `packages/contracts/src/foundation.ts` and `packages/tokens/src/theme.ts`                                        | `COMPONENT_SEMANTIC`, `FIXED_SYSTEM_SEMANTIC`             | `BOTH` / `NATIVE_RENDERER`                                  | Control, field, card, overlay, navigation, collection, row, touch-target and component interaction geometry                       |
| PRODUCT_PROFILE | `packages/contracts/src/theme-recipe.ts` and `packages/contracts/src/brand-profile.ts`                           | `PRODUCT_PROFILE`                                         | `BOTH` / `SAME_INTENT`                                      | Named neutral, AAPM, Academy, Publishing, Farm, and Operations selections only where already justified                            |
| SCOPE           | `packages/ui/src/provider.tsx` `ThemeScope`                                                                      | `COMPONENT_SEMANTIC`, `COMPOSITION_LOCAL`                 | `ADAPTIVE` / `SAME_INTENT`                                  | Bounded semantic/contextual overrides that re-resolve the same system; not a second token source                                  |

### 3.2 Dimension classifications

| Classification          | Ownership rule                                                                                        | Examples in this queue                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `GLOBAL_CUSTOMIZABLE`   | Named system axes may be selected by a product or user; do not create a new value for every consumer. | Palette, density, typography, radius, motion profile                  |
| `DERIVED`               | Computed from typed foundation, semantic roles, recipe, or runtime preference.                        | Content and wide bounds, projected CSS values, chart/surface geometry |
| `FIXED_SYSTEM_SEMANTIC` | Stable system obligation; meaning does not vary by route.                                             | Touch-target minimum, status meaning, safe-area contract              |
| `PRODUCT_PROFILE`       | Approved product or brand choice; never a generic primitive override.                                 | AAPM/Academy/Publishing/Farm/Operations profile axes                  |
| `COMPONENT_SEMANTIC`    | Shared value owned by the canonical component contract.                                               | Control measure, collection minimum, card padding, row height         |
| `COMPOSITION_LOCAL`     | One-off arrangement value with no system-wide reuse obligation.                                       | Hero artwork offset or domain-specific plot annotation                |

Composition-local values may remain local when they are genuinely local. A
global/system dimension may not be repeated as a route-specific pixel value.

## 4. Shared measure contract

`packages/contracts/src/foundation.ts` now owns `MEASURE_CONTRACT`,
`MEASURE_NAMES`, `MeasureName`, `MeasureIntent`, and
`MEASURE_INTENT_TO_NAME`. The values are semantic numeric bounds; CSS is only
one projection.

| Canonical measure | Minimum useful surface | Preferred surface | Maximum surface | Mode    | Intended use                                               | Explicitly avoid                                    |
| ----------------- | ---------------------: | ----------------: | --------------: | ------- | ---------------------------------------------------------- | --------------------------------------------------- |
| `compact`         |                  172px |             208px |           256px | bounded | Short fields, compact cards, small repeated items          | Prose, wide data comparison, editor canvases        |
| `control`         |                  224px |             320px |           480px | bounded | Default form controls, bounded search, focused tasks       | Long-form reading, dense table columns              |
| `content`         |                  320px |             720px |          1200px | bounded | Route content, detail surfaces, standard cards             | Single short controls, full-width data surfaces     |
| `wide`            |                  480px |             960px |          1440px | bounded | Multi-column workspaces, catalog grids, broad compositions | Reading measure, single short controls              |
| `reading`         |                  280px |             680px |           880px | bounded | Prose, public descriptions, product explanations           | Tables, charts, operations grids, editor workspaces |
| `fluid`           |                    0px |                 — |               — | fluid   | Explicit fill behavior and shell-owned surfaces            | Unbounded prose or a replacement for a content rail |

The component API intentionally stays smaller than the canonical vocabulary:

| Public intent       | Canonical role |
| ------------------- | -------------- |
| `measure="compact"` | `compact`      |
| `measure="default"` | `control`      |
| `measure="wide"`    | `wide`         |
| `measure="fill"`    | `fluid`        |

The minimum useful measure is a contract for the owning surface. A surface may
be narrower than the nominal minimum when its containing block is narrower;
the Web projection uses `min(100%, ...)` to prevent the measure contract from
creating document overflow. Collection/grid and split-pane tracks apply the
minimum role directly where a minimum track is meaningful.

The existing reading rails remain compatible with their recipe-authored Web
`ch` projection. The contract records the same semantic intent and exposes a
numeric bound for Native rather than forcing Native to interpret a CSS unit.

## 5. Layout grammar

`LAYOUT_GRAMMAR_CONTRACT` is a renderer-neutral grammar over existing
components and recipes. It is not a second primitive library.

| Grammar                | Classification        | Platform   | Native strategy     | Minimum useful measure | Responsive/adaptive intent                                                                                 |
| ---------------------- | --------------------- | ---------- | ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Stack                  | `CANONICAL_COMPONENT` | `BOTH`     | `SAME_INTENT`       | —                      | Preserve axis and token gap; wrap or stack only when the composition says order remains clear.             |
| Cluster                | `RECIPE_OR_PATTERN`   | `BOTH`     | `SAME_INTENT`       | `compact`              | Keep peer actions together when they fit; wrap at content pressure.                                        |
| Inline                 | `RECIPE_OR_PATTERN`   | `BOTH`     | `SAME_INTENT`       | `compact`              | Keep short related content inline; wrap or stack at a natural boundary.                                    |
| Grid                   | `RECIPE_OR_PATTERN`   | `BOTH`     | `SAME_INTENT`       | `compact`              | Use intrinsic columns, reduce columns before compressing useful item content.                              |
| AutoGrid               | `CANONICAL_COMPONENT` | `BOTH`     | `SAME_INTENT`       | `compact`              | ProductGrid auto-fills useful columns and uses the remaining useful count on narrow surfaces.              |
| Split                  | `CANONICAL_COMPONENT` | `WEB`      | `NOT_APPLICABLE`    | `compact`              | Resizable side-by-side panes on wide Web surfaces; stack in the narrow Web renderer.                       |
| Sidebar                | `CANONICAL_COMPONENT` | `ADAPTIVE` | `ALTERNATE_PATTERN` | `compact`              | Persistent secondary navigation becomes MobileSidebar, drawer, or native navigation.                       |
| Rail                   | `CANONICAL_COMPONENT` | `BOTH`     | `SAME_INTENT`       | `content`              | Center a bounded rail, remain fluid below its maximum, preserve safe gutters.                              |
| MasterDetail           | `RECIPE_OR_PATTERN`   | `ADAPTIVE` | `ALTERNATE_PATTERN` | `compact`              | Show both regions when useful; use list/detail navigation, drawer, or sheet on narrow Native/Web patterns. |
| CenteredBoundedContent | `CANONICAL_COMPONENT` | `BOTH`     | `SAME_INTENT`       | `content`              | Center within a named rail; use available width after shell gutters on narrow surfaces.                    |
| ScrollRegion           | `CANONICAL_COMPONENT` | `BOTH`     | `NATIVE_RENDERER`   | `compact`              | Declare the owning scroll region; prefer document scroll unless bounded internal scrolling is justified.   |
| OverlayRegion          | `ADAPTIVE`            | `ADAPTIVE` | `ALTERNATE_PATTERN` | `compact`              | Web popup/drawer/modal can become a sheet or platform surface while preserving task intent.                |

The grammar explicitly distinguishes Stack, Cluster, Inline, Grid, AutoGrid,
Split, Sidebar, Rail, MasterDetail, CenteredBoundedContent, ScrollRegion, and
OverlayRegion. No new native components were created in U02.

## 6. Token ownership and source of truth

The source and projection boundary is now explicit:

```text
typed foundation/profile/theme contract
  -> resolveTokenLayers / resolveThemeConfigLayers
  -> resolved semantic runtime
     -> buildThemeVariables       -> Web CSS custom properties
     -> buildNativeThemeSnapshot  -> numeric JS/TS Native projection
     -> contracts:generate        -> AI/catalog/DTCG documentation projections
```

The resolution order is one shared constant,
`TOKEN_RESOLUTION_ORDER`:

```text
SYSTEM_DEFAULTS
  -> BASE_RECIPE
  -> PRODUCT_PROFILE
  -> THEME_OVERRIDE
  -> SCOPED_OVERRIDE
  -> COMPONENT_STATE
```

The default measure is `control`. `resolveMeasureLayers` applies the same six
stages and the deterministic fallback. `resolveThemeConfigLayers` applies the
same order to the existing theme axes, so measures do not introduce a second
resolver or a competing profile model.

Ownership is recorded in `TOKEN_OWNERSHIP_CONTRACT`, including the typed source
paths, Web projection, Native projection, AI projection, legacy CSS
compatibility, and ThemeScope boundary. `COMPONENT_TOKEN_ROLE_CONTRACT.targets.measure`
maps the six measures and their minimum variables to the component role set.

Generated files were refreshed with `pnpm contracts:generate`; generated JSON,
theme CSS, and agent projections are outputs and were not hand-edited. No CSS
variable syntax is used as the Native source of truth.

## 7. Component APIs affected

The changes are additive and semantic:

| Canonical API                                                                                    | Change                                                   | Contract effect                                                                                                                   |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `Container`                                                                                      | `measure?: "compact"                                     | "default"                                                                                                                         | "wide"                     | "fill"`                                                                                                                                | Adds an optional named measure without removing existing `size="reading | form | application | data | full"` rails. |
| `Input`, `Select`, `Textarea`, `Combobox`, `Cascader`, `MultiSelect`, `ColorPicker`, `TagsInput` | Optional `measure` prop and `data-t7-measure` projection | Allows a canonical control to state its measure intent without local width scales.                                                |
| `SplitPane`                                                                                      | `minPaneMeasure?: "compact"                              | "default"                                                                                                                         | "wide"`, default `compact` | Keeps `split`, `minStart`, `minEnd`, pointer resize, keyboard resize, and existing percentage behavior; adds a semantic minimum track. |
| `ProductGrid`                                                                                    | `minItemMeasure?: "compact"                              | "default"                                                                                                                         | "wide"`, default `compact` | Intrinsic auto-fill uses a named useful item minimum.                                                                                  |
| `ProductGrid.minCardWidth`                                                                       | Retained and marked deprecated                           | Existing consumers remain compatible; legacy raw width remains an explicit escape hatch while new consumers use `minItemMeasure`. |
| `FormGrid` CSS                                                                                   | `align-items: start` and reference-space gap             | Rows remain intrinsically sized and no repeated raw system gap is added.                                                          |

Component-level measure props are optional. Existing consumers that do not need
an explicit measure continue to use their existing component/rail behavior.

Representative Q04 usage now classifies ColorPicker and TagsInput as
`measure="compact"`, and SplitPane as `minPaneMeasure="compact"`. The initial
default-control choice was intentionally tested; it made the short controls
about 420px wide at 1440px and failed the established Q04 bound. The final
compact classification renders 256px controls and passes the existing suite.

## 8. Compatibility

Compatibility rules are deliberately narrow:

- Existing `Container.size` rails, route shells, business behavior, state,
  validation, and events remain intact.
- Existing SplitPane percentage and accessibility APIs remain intact. The new
  minimum measure is additive and does not replace `minStart` or `minEnd`.
- Existing `ProductGrid.minCardWidth` is accepted, maps to the same CSS custom
  property, and is documented as deprecated rather than silently removed.
- Existing Web CSS custom properties remain a delivery surface. They are not
  accepted as Native input and are not promoted to source-of-truth status.
- Existing recipe-authored reading rails may keep their `ch` Web projection;
  the shared numeric contract remains available to Native.
- Existing ThemeScope behavior remains a bounded contextual resolver. Scoped
  overrides re-resolve the same layers and do not create a second provider or
  primitive library.
- Existing catalogs remain compatibility surfaces; measure metadata was added
  through the catalog enrichment path and regenerated projections.
- No donor CSS, donor theme, donor brand, donor spacing, or donor public API
  was introduced.

## 9. Cross-platform / Native strategy

### Web

Web components emit semantic data attributes. `packages/ui/src/styles.css`
consumes generated variables from the token package:

- `[data-t7-measure="compact|default|wide|fill"]` maps intent to the named
  measure variables without a JavaScript measurement loop.
- ProductGrid maps its semantic item minimum to CSS Grid `minmax` tracks.
- SplitPane uses the compact/control/wide minimum variables for its tracks and
  retains pointer and keyboard interaction.
- A shared narrow media rule stacks horizontal SplitPane regions in source
  order. The native strategy is recorded as MasterDetail, not assumed to be
  the same DOM implementation.
- FormGrid and collection surfaces use intrinsic sizing, `min-width: 0`,
  `minmax(0, ...)`, start alignment, and explicit overflow ownership.

### Native-ready projection

`packages/contracts/src/native-mobile.ts` now includes the `layout` token
layer, `NativeResolvedMeasure`, and
`NativeResolvedThemeVariant.layout.measures`. `NATIVE_MOBILE_TOKEN_REFERENCES.layout`
references `layout.measure.compact`, `control`, `content`, `wide`, `reading`,
and `fluid`.

`buildNativeThemeSnapshot` in `packages/tokens/src/theme.ts` reads the typed
`MEASURE_CONTRACT` and returns numeric `minimumPx`, `preferredPx`,
`maximumPx`, and `fluid` values. It does not parse CSS variables, CSS unit
strings, Web DOM output, or Web renderer state. The existing Native boundary
remains renderer-neutral and dependency-free.

| Shared intent   | Web presentation                              | Native-ready presentation                                |
| --------------- | --------------------------------------------- | -------------------------------------------------------- |
| Split workspace | Resizable CSS Grid SplitPane                  | Adaptive MasterDetail/list-detail pattern                |
| Sidebar         | Persistent Sidebar or MobileSidebar/drawer    | Native navigation/drawer/tab surface                     |
| OverlayRegion   | Popup, drawer, modal                          | Sheet, native modal, or contextual press surface         |
| ScrollRegion    | Native overflow region owned by the recipe    | ScrollView, FlatList, or SectionList chosen by semantics |
| AutoGrid        | CSS Grid auto-fill with semantic item minimum | Native collection layout with the same item intent       |
| Measure role    | CSS projection of a numeric semantic bound    | Direct numeric JS/TS value                               |

No `@ten4seven/native` components were created or claimed complete in U02.

## 10. Representative before/after proof

| Surface                           | Before/audit condition                                                                                     | After U02 proof                                                                                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Component Lab Q04 short controls  | ColorPicker and TagsInput relied on local `fit-content` sizing and had no semantic measure attribute.      | Both render `data-t7-measure="compact"`; CUA measured 256px at the wide, desktop, tablet, and mobile test widths. Existing Q04 Playwright bound remains green (`<320px` at 1440px). |
| Component Lab Q04 split workspace | SplitPane exposed percentage geometry without a named minimum useful pane measure or narrow recomposition. | Renders `data-min-pane-measure="compact"`; wide CUA columns were `316.062px 8px 261.266px`, tablet columns `368.266px 8px 305.734px`, and mobile columns became one `304px` track.  |
| Publishing Store ProductGrid      | Grid accepted a raw `minCardWidth` escape hatch as the only minimum vocabulary.                            | ProductGrid defaults to `data-t7-item-measure="compact"`; the ebook-store route emitted that attribute at all four tested widths while retaining the deprecated compatibility prop. |
| FormGrid                          | Repeated literal gap and default stretch could make rows appear tied to neighboring content height.        | Gap consumes `var(--t7-ref-space-4)` and rows align to start; no business or route behavior changed.                                                                                |
| Page overflow                     | Internal clipped content and document overflow were not expressed by one explicit gate.                    | The final matrix recorded equal document/body/client widths for all 24 route/viewport checks; internal region clipping remains owned by its component/recipe.                       |

## 11. Responsive matrix

The matrix was executed against the existing local Vite server at
`http://127.0.0.1:4173` using the existing browser tab and explicit viewport
metrics. Each cell is `documentScrollWidth/bodyScrollWidth = clientWidth`;
every cell passed the page-overflow assertion.

| Requested viewport | `/component-lab` | `/brand-proof/auth-aapm-academy` | `/public-showcase` |   `/ebook-store` | `/operations-tracker` | `/farm-reference` |
| ------------------ | ---------------: | -------------------------------: | -----------------: | ---------------: | --------------------: | ----------------: |
| 1440x900           | PASS `1430/1430` |                 PASS `1440/1440` |   PASS `1430/1430` | PASS `1430/1430` |      PASS `1430/1430` |  PASS `1430/1430` |
| 1024x768           | PASS `1014/1014` |                 PASS `1024/1024` |   PASS `1014/1014` | PASS `1014/1014` |      PASS `1014/1014` |  PASS `1014/1014` |
| 768x1024           |   PASS `758/758` |                   PASS `768/768` |     PASS `758/758` |   PASS `758/758` |        PASS `758/758` |    PASS `758/758` |
| 390x844            |   PASS `380/380` |                   PASS `380/380` |     PASS `380/380` |   PASS `380/380` |        PASS `380/380` |    PASS `380/380` |

The 10px difference on most routes is the browser's vertical scrollbar; it is
not page overflow. Auth routes without a visible scrollbar reported the full
requested client width.

## 12. Overflow verification

The page-level gate used the following equivalent condition on every route and
viewport:

```js
document.documentElement.scrollWidth <= document.documentElement.clientWidth &&
  document.body.scrollWidth <= document.documentElement.clientWidth;
```

Results:

- 24/24 CUA route/viewport checks passed with document and body widths equal
  to the active client width.
- Q04's existing Playwright suite passed its pane overflow checks at the
  required widths; its bounded panes remain usable and do not create document
  overflow.
- Intentional internal clipping/scroll ownership was not converted into a
  false page failure. Examples include public showcase carousel/reveal regions,
  ebook navigation, operation/farm milestone or collection regions, and the
  auth illustration boundary. These regions do not expand the document.
- No JavaScript measurement runtime, resize observer loop, or route-local
  breakpoint runtime was added.

## 13. Tests

### Current-queue and affected checks

| Command                                                                                     | Result | Evidence/classification                                                                                                                                               |
| ------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`                                                                   | PASS   | Generated 220 contract projections, theme CSS, and 3 DTCG-compatible exports; rerun was deterministic.                                                                |
| `pnpm test:contracts`                                                                       | PASS   | Contract gate verified 6 aliases, 29 recipes, typed operational recipes, ThemeProfile round-trip, and compact retrieval.                                              |
| `pnpm test:responsive-contracts`                                                            | PASS   | 9 behavior contracts, 11 module states, and tokenized AppShell slots.                                                                                                 |
| `pnpm test:layout-contracts`                                                                | PASS   | 6 measures, 12 grammar intents, deterministic six-stage resolution, and Web/Native projections.                                                                       |
| `pnpm test:native-mobile`                                                                   | PASS   | Shared Native boundary, token resolution, icons, accessibility descriptors, and Farm presentation proof remain consistent without a Native renderer dependency.       |
| `pnpm --filter @ten4seven/tokens test`                                                      | PASS   | 2 test files; 34 tests passed, including defaults, all six resolution stages, light/dark, contrast, full/reduced motion, CSS projection, and numeric Native measures. |
| `pnpm test:token-governance`                                                                | PASS   | 24 component modules; no raw component colors, palette dependencies, or ungoverned timing.                                                                            |
| `pnpm test:consistency`                                                                     | PASS   | Canonical consistency verified across 27 UI source files.                                                                                                             |
| `pnpm test:component-system`                                                                | PASS   | 167 canonical components, 6 aliases, 29 recipes, 60 blocks, explicit taxonomy/relations.                                                                              |
| `pnpm test:ai`                                                                              | PASS   | 29 recipes, 173 components, 60 blocks, 122 semantic icons; cold-start references verified with 0 donor reads.                                                         |
| `pnpm test:recipe-family`                                                                   | PASS   | Shared recipe kernel and selective retrieval remained intact.                                                                                                         |
| `pnpm test:dtcg`                                                                            | PASS   | 3 deterministic DTCG outputs and exact-source runtime snapshots.                                                                                                      |
| `pnpm test:contrast`                                                                        | PASS   | 284 recipe/mode pairs at WCAG AA 4.5:1; lowest exact-source light standard accent foreground 4.67:1.                                                                  |
| `pnpm test:tailwind-bridge`                                                                 | PASS   | 6 semantic utilities compiled from published theme and Tailwind bridge output.                                                                                        |
| `pnpm typecheck`                                                                            | PASS   | Contracts, Native, Agent, Agent build, and Playground typecheck completed.                                                                                            |
| `pnpm package:build`                                                                        | PASS   | `@ten4seven/ui` package rebuilt so the local playground served the current semantic measure renderer.                                                                 |
| `pnpm build`                                                                                | PASS   | Playground TypeScript build and Vite production build completed.                                                                                                      |
| `pnpm exec playwright test tests/q04-core-layout-actions.spec.ts`                           | PASS   | 6/6 Q04 tests passed after the compact-control classification correction.                                                                                             |
| Targeted Prettier check for U02 contract/runtime/UI TypeScript/JavaScript and package files | PASS   | All targeted source files matched Prettier; no mass formatting was applied.                                                                                           |
| `git diff --check`                                                                          | PASS   | Exit code 0; Git emitted two existing CRLF-to-LF working-copy warnings in unrelated files, with no whitespace errors.                                                 |

The token tests explicitly prove:

- default resolution returns `control`;
- base recipe, product profile, theme override, scoped override, and
  component-state values are all applied in order;
- component state wins when all six stages provide a value;
- `default` and `fill` map deterministically to `control` and `fluid`;
- light/dark semantic values and full/reduced-motion Native projections remain
  equivalent to the Web projection where the roles are comparable;
- Native measure data is numeric and CSS-independent.

### Inherited baseline / non-U02 blockers

| Command                                                                 | Result                                 | Classification and handling                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test`                                                             | FAIL at `pnpm test:component-coverage` | `INHERITED BASELINE`. The coverage report was already modified before U02 (`HEAD` report count 911, working report count 962); the current dirty stylesheet derives 976. The suite passed all gates through token governance, then stopped on the stale report assertion. The user-owned report was not overwritten and `pnpm tokens:coverage` was not run. No U02 layout contract assertion failed. |
| `pnpm format:check`                                                     | FAIL; 355 files reported               | `INHERITED BASELINE`. The repository contains broad pre-existing formatting drift, including dirty app/CSS/catalog/research files. U02 used targeted source checks and did not rewrite unrelated files.                                                                                                                                                                                              |
| Targeted Prettier check including `packages/ai/catalog/components.json` | WARN/FAIL for that file                | `INHERITED BASELINE`. Catalog enrichment was applied through the existing generator path; the file already participates in the repository's broader formatting debt. The catalog and generated contract checks pass.                                                                                                                                                                                 |

These inherited failures are recorded rather than hidden. They are outside the
bounded U02 layout contract and do not block the U02 gate under the DWO rule
that inherited baseline failures must be classified separately.

## 14. Browser evidence

Browser verification used the existing local browser tab; no new tab or window
was opened. The local Vite server remained running on port 4173. Explicit CDP
viewport metrics were used for the four required dimensions and cleared after
the matrix.

Fresh DOM evidence after rebuilding `@ten4seven/ui`:

```json
{
  "route": "/component-lab#component-lab-core-layout-actions",
  "measures": [
    { "value": "compact", "width": 256 },
    { "value": "compact", "width": 256 }
  ],
  "split": {
    "minimum": "compact",
    "mobileColumns": "304px"
  }
}
```

The 24-row matrix in section 11 was taken after the final compact-control
correction. It is DOM/geometry evidence rather than an assertion based only on
source inspection. Existing Q04 Playwright interaction tests provide the
additional keyboard, pointer, focus, option, and bounded-control proof.

## 15. Baseline debt retained

The following remain deliberately visible for later bounded work:

- The component-token coverage report needs an owner-authorized regeneration
  against the dirty stylesheet before the repository-wide `pnpm test` chain can
  continue past that inherited assertion.
- Broad repository formatting drift remains; no mass Prettier rewrite was
  authorized in U02.
- `ProductGrid.minCardWidth` remains as a documented compatibility escape hatch
  until consumers have migrated to `minItemMeasure`.
- Existing recipe-specific reading rails retain their Web compatibility shape;
  the shared numeric role is ready for Native projection.
- All consumers are not mass-migrated in this queue. Representative drift was
  audited and the shared contracts were corrected where the evidence required
  it.
- Internal clipping in bounded presentation regions remains a declared
  component/recipe concern; the page-level overflow gate is the universal
  regression invariant.

## 16. Deferred questions for U03

U03 was not executed. Questions intentionally left for that queue include:

- Which Native renderer/adapters should implement the already-defined intent
  contracts for Expo/React Native without exposing Web DOM APIs?
- Which adaptive recipes need a tested list/detail, sheet, drawer, or native
  navigation implementation beyond the current contract descriptions?
- Where should container-query behavior be extended for nested reusable
  surfaces after the current intrinsic CSS grammar is exercised by more
  consumers?
- Which remaining consumer-local widths are genuinely composition-local versus
  ready for migration to `measure`, `minItemMeasure`, or a component semantic
  role?
- How should DataTable and other dense collection contracts express their
  Native alternate representation while preserving selection, sorting,
  pagination, and accessibility semantics?

## 17. Gate

PASS FOR U03
