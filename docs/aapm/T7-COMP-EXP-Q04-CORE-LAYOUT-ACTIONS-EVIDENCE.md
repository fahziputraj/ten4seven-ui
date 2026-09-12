# T7 Component Expansion Q04 — Core, Layout and Actions Evidence

Status: PASS WITH CONSTRAINTS FOR Q05  
Queue: `Q04-CORE-LAYOUT-ACTIONS.md`  
Mode: BOUNDED-WIDE  
Risk: R2  
Date: 2026-09-11

## 1. Scope and authority

Q04 was executed against the attached Q04 work specification and the Q03
normalized coverage ledger. Q03 is the backlog authority; this queue did not
invent additional component names to reach a target count.

Q03 entered Q04 with `PASS WITH CONSTRAINTS FOR Q04` and identified the
following high-confidence Q04 work:

- Core/foundation utilities: `Kbd`, `Link`.
- Layout/composition: `Container`, `Stack`, `SplitPane`.
- Distinct actions: `SpeedDial`, `DragHandle`.
- Navigation: `BottomNavigation`, `NavigationRail`, `TreeView`.
- Forms/data entry: `Transfer`, `ColorPicker`, `TagsInput`.
- File presentation: `FilePreview`.

The net-new canonical addition is exactly 14 components. The catalog now
contains 165 entries: 159 canonical implemented components and 6 existing
aliases. The count is a result of the accepted Q03 allocation, not a new
expansion rule.

The following candidates remain outside this queue because Q03 did not make
them unconditional P0/P1 additions: `Cascader` (P2), conditional `Menubar`,
conditional `Knob`, conditional `GaugeChart`, and non-canonical utility or
pattern-engine proposals. No new sticky, masonry, scroll-owner, drag-and-drop
engine, upload transport, or business workflow was introduced; existing
`ScrollArea`, `FileUpload`, and overlay contracts remain the owners of those
behaviors.

## 2. Source and delivery map

| Contract                               | Canonical source                 | Public surface                    | Responsibility                                              |
| -------------------------------------- | -------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| `Kbd`, `Link`                          | `packages/ui/src/core.tsx`       | `packages/ui/src/index.ts`        | Native keyboard and anchor semantics                        |
| `Container`, `Stack`, `SplitPane`      | `packages/ui/src/layout.tsx`     | existing layout barrel export     | Content rails, token spacing, two-pane resize               |
| `SpeedDial`, `DragHandle`              | `packages/ui/src/actions.tsx`    | existing actions barrel export    | Grouped quick actions and consumer-owned reorder affordance |
| `BottomNavigation`, `NavigationRail`   | `packages/ui/src/navigation.tsx` | existing navigation barrel export | Mobile and secondary route navigation                       |
| `Transfer`, `ColorPicker`, `TagsInput` | `packages/ui/src/forms.tsx`      | existing forms barrel export      | Bounded selection and multi-value entry                     |
| `TreeView`                             | `packages/ui/src/hierarchy.tsx`  | existing hierarchy barrel export  | Single-selection hierarchy navigation                       |
| `FilePreview`                          | `packages/ui/src/files.tsx`      | existing files barrel export      | Bounded file preview/status/actions                         |

No donor UI library or second interaction runtime was added. New components
compose existing Ten4Seven primitives such as `Button`, `IconButton`, `Input`,
`Card`, `StatusChip`, `T7Icon`, and the existing portal/scroll infrastructure.

## 3. Token and theme contract

The implementation follows a primitive → semantic → component token model. New
component CSS reads the existing Ten4Seven custom properties for surfaces,
borders, selected states, focus rings, radii, shadows, motion, touch targets,
safe-area insets, rails, and reference spacing. It does not introduce a local
palette, radius scale, shadow runtime, or animation engine.

Q04 also made the geometry roles explicit in the typed foundation contract:

- `content-rail` resolves to the reading, form, application, data, and content
  maximum rails.
- `gutter` resolves to page and viewport gutter variables.
- `ref-space` resolves to the stable reference spacing scale.
- `safe-area` resolves to the four platform inset variables.
- `primary-hover` resolves to the existing action palette hover variable.

The catalog token arrays now use only roles present in the canonical role map.
Examples include `content-rail` rather than component-local `rail-form`,
`input-background` rather than `field-background`, and `surface-raised` /
`selected-hover` rather than ad hoc names.

The Q04 matrix was checked against the existing Theme Studio axes:

| Axis              | Resolved by the shared provider                           | Q04 expectation                                                               |
| ----------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Appearance        | system, light, dark                                       | Surfaces, borders, icons, and text remain readable                            |
| Density           | dense, compact, regular, comfortable                      | Control, panel, rail, and list geometry remaps centrally                      |
| Contrast          | standard, more                                            | Focus and boundary roles remain semantic                                      |
| Motion            | full, reduced                                             | SpeedDial/reveal feedback uses global motion roles; reduced motion is honored |
| Canvas/surface    | balanced paper, paper, monochrome plus surface treatments | Plain components remain neutral; emphasis is consumer-selected                |
| Content rail      | reading, form, application, data, full                    | Container constrains content without duplicating the shell                    |
| Chart/color roles | existing theme chart colorways                            | Q04 components do not claim chart/status colors                               |

Theme Studio was rendered after the addition and continued to show the live
recipe controls, provider preview, component canaries, and existing Q04
responsive/module-state section.

## 4. Component contract decisions

### Foundation

- `Kbd` renders the native `kbd` element and keeps shortcut text supplementary
  to its owning action.
- `Link` renders a native anchor. The optional `external` contract sets a safe
  new browsing context and `noreferrer` relationship without changing normal
  route-link behavior.

### Layout

- `Container` selects the canonical `data-t7-rail` values without becoming a
  second page shell.
- `Stack` exposes direction, gap, alignment, justification, and wrapping as
  token-backed composition decisions.
- `SplitPane` owns exactly two panes, clamps the percentage split to the
  declared minimums, supports pointer capture, and exposes a keyboardable
  `role="separator"` with orientation and value attributes. Home, End, and
  directional keys update the split without a local drag library.

### Actions and navigation

- `SpeedDial` has one labelled trigger, controlled/uncontrolled open state,
  grouped labelled actions, Escape close, Home/End, and directional action
  focus movement.
- `DragHandle` reuses `IconButton`, retains a visible accessible label, and
  marks the consumer-owned sortable affordance with `aria-roledescription`.
- `BottomNavigation` is a labelled navigation landmark with native links or
  buttons, active/current state, touch-target minimums, fixed/static position,
  and safe-area padding.
- `NavigationRail` is a labelled vertical navigation landmark with collapsed
  and expanded modes; collapsed items retain accessible labels and native
  titles instead of adding another tooltip runtime.

### Forms, hierarchy, and files

- `Transfer` provides two labelled multiselect listboxes, optional filtering,
  bounded Add/Remove actions, and disabled movement when no option is selected.
- `ColorPicker` composes the platform-native color input with the canonical
  text `Input` and optional preset controls.
- `TagsInput` commits on Enter/comma or blur, prevents duplicate values by
  default, and supports Backspace removal plus labelled remove controls.
- `TreeView` separates hierarchy navigation from bulk-selection semantics and
  supports expanded/selected controlled state, tree/treeitem roles, level and
  position information, and Arrow/Home/End/Enter/Space keyboard behavior.
- `FilePreview` keeps media/file fallback, status, metadata, and optional
  preview/download/remove actions in one bounded article. It does not own file
  transport or persistence.

## 5. Showroom and proof surfaces

The family showroom uses the canonical component catalog rather than a second
registry. Q04 entries were grouped in:

- `apps/playground/src/library-explorers.tsx` — Foundations, Actions, Forms,
  Navigation, Layout, and Files family sections.
- `apps/playground/src/component-preview-fixtures.tsx` — live previews for all
  14 Q04 contracts using existing primitives and shared frame anatomy.
- `apps/playground/src/component-proofs.tsx` — `#component-lab-core-layout-actions`,
  a compact stress proof covering SplitPane, TreeView, FilePreview, Transfer,
  ColorPicker, TagsInput, SpeedDial, DragHandle, NavigationRail, and
  BottomNavigation.
- `apps/playground/src/library-explorers.tsx` — Component Lab now exposes seven
  sections and a direct `Core` anchor; the existing Forms, Data, Overlays,
  Surfaces, Charts, and Flow proofs remain intact.

The Q04 proof intentionally groups related behavior into three cards instead of
adding a long catalog-like narrative to the workbench: split workspace,
bounded inputs, and utility actions.

## 6. Registry, AI projection, and generated artifacts

The 14 contracts were added to `packages/ai/catalog/components.json` with
`implemented` status, display names, levels, maturity, API properties, states,
accessibility, responsive behavior, motion, token roles, alternatives,
composition relationships, and source paths.

`pnpm contracts:generate` was run after catalog and foundation changes. The
generated agent index, compact projection, foundation projection, component
shards, package-agent copies, theme recipe CSS, and DTCG exports are therefore
derived outputs, not manually authored duplicates. The generated set reports
210 contract projections.

## 7. Verification record

| Check                                                             | Result        | Evidence                                                                                                                         |
| ----------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                                                  | PASS          | Contracts, native, agent build, and playground typecheck completed                                                               |
| `pnpm test`                                                       | PASS          | All chained contract, domain, token, AI, component-system, and Tailwind bridge gates completed                                   |
| `pnpm test:ai`                                                    | PASS          | 29 recipes, 165 components, 12 blocks, 122 semantic icons; cold-start references pass                                            |
| `pnpm test:component-system`                                      | PASS          | 159 canonical components, 6 aliases, 29 recipes, 12 expressive blocks                                                            |
| `pnpm package:build` / `pnpm package:verify`                      | PASS          | Published UI package builds and remains self-contained                                                                           |
| `pnpm build`                                                      | PASS          | Playground production build completed; Vite emitted only the existing large-chunk advisory                                       |
| `pnpm test:component-coverage`                                    | PASS          | Seven high-impact families verified; report tracks 935 literal pixel occurrences as migration debt                               |
| `pnpm exec playwright test tests/q04-core-layout-actions.spec.ts` | PASS          | 2 focused browser tests passed: family indexing and interactive proof                                                            |
| Codex browser `/components/layout`                                | OBSERVED PASS | Layout showroom rendered 10 canonical contracts including Container, Stack, Split Pane                                           |
| Codex browser `/component-lab#component-lab-core-layout-actions`  | OBSERVED PASS | Seven-section navigation and Q04 proof rendered; pointer split movement visibly updated the separator and rail proportion        |
| Codex browser `/theme-studio`                                     | OBSERVED PASS | Live recipe controls, token preview, component canaries, and responsive/module-state contracts remained renderable               |
| `pnpm format:check`                                               | CONSTRAINT    | Repository-wide Prettier check reports 368 files requiring formatting; targeted Q04 files were formatted and pass focused checks |

The focused test also verified the keyboard split transition from 54 to 56,
TreeView selection, Transfer movement, SpeedDial open/action feedback, and the
two Q04 navigation landmarks. The broader Playwright suite was not used to
reclassify unrelated visual-baseline or legacy expectation drift; the focused
Q04 suite is the runtime acceptance evidence for this bounded queue.

## 8. Evidence classification and boundary

- **SOURCE:** typed UI APIs, token role map, catalog entries, generated
  projections, family grouping, previews, proof fixture, and Q04 test source.
- **RUNTIME:** package build, package verification, playground production
  build, full repository test chain, and the local Vite route render.
- **OBSERVED:** Codex browser route inspections and visible Q04 interaction
  behavior described above.
- **UNKNOWN / UNVERIFIED:** production consumer adoption, native renderer
  integration, backend/data persistence, upload transport, and downstream app
  visual acceptance. Q04 intentionally remains a canonical library and proof
  delivery; it is not a claim of product-wide migration.

The worktree was already dirty with prior queue and branch changes. No reset,
clean, commit, push, merge, branch deletion, or deployment was performed. The
current branch/SHA at evidence time is:

```text
codex/icons-curated-solar-style
e582cfcfbe0f077d1a5832d86db9da1898487fd3
feat(q14): restore fluid navigation and responsive shell hardening
```

The Q04 changes are intentionally left in the shared worktree for the user to
review and commit according to the existing branch plan.

PASS WITH CONSTRAINTS FOR Q05
