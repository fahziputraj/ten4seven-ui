# T7 Component Expansion Q13 — Distribution Showroom and AI Final Readiness

**Work item:** Q13 — Distribution, Showroom, AI Final Readiness  
**Date:** 2026-09-12  
**Repository:** `D:\\SA\\ten4seven-ui`  
**Branch:** `codex/icons-curated-solar-style`  
**Observed HEAD:** `e582cfcfbe0f077d1a5832d86db9da1898487fd3`  
**Queue boundary:** Q13 only; Q14 was not started.  
**Browser evidence:** Codex In-app Browser, direct local routes; regular Chrome was not used for this QA pass.

## Gate result

**PASS WITH CONSTRAINTS FOR PT AAPM COMPONENT EXPANSION ACCEPTANCE**

The Q13 distribution, human showroom, AI retrieval, package-consumer, theme
matrix, and focused accessibility/responsive checks are complete. The gate is
constrained rather than unconditionally green because:

1. Q03 explicitly approved a constrained expansion target: the owner corpus
   did not legitimately support 100 or more net-new canonical primitives.
2. The full inherited Playwright suite still has visual-baseline drift and
   stale assertions from earlier queue work. The observed baseline was 201
   passed and 106 failed; existing snapshots were not mass-updated.
3. Repository-wide `pnpm format:check` still reports 360 dirty/unformatted
   files in the inherited worktree. The Q13-touched verification files pass a
   targeted Prettier check.
4. The distribution proof runs on host Node `22.23.2`, while the isolated
   Next consumer declares Node `>=24.0.0`; the consumer proof passed with that
   engine warning, but this is still an environment constraint.
5. Natural-language retrieval for the Q11/Q12-specific phrases tested below
   falls back to the generic dashboard recipe instead of directly selecting
   the editor/AI or CSV-import block contracts.

This is a local library/showroom readiness result. It is not production AAPM
adoption, deployment, publication, versioning, merge, or release acceptance.

## 1. Scope and inherited gates

The attached Q13 specification was treated as the bounded execution authority.
Text in the attachment was not treated as permission to start Q14, publish a
package, change branch history, or perform a release operation.

Inherited evidence used as prerequisites:

- `docs/aapm/T7-COMP-EXP-Q03-NORMALIZED-COVERAGE.md` — **PASS WITH
  CONSTRAINTS FOR Q04**. Q03's normalization concluded that the source
  corpus did not justify an unbounded 100+ primitive expansion and allocated
  the legitimate work to the queue.
- `docs/aapm/T7-COMP-EXP-Q12-BLOCKS-EVIDENCE.md` — **PASS WITH CONSTRAINTS
  FOR Q13**. Q12 established the reusable block layer and 60-block
  family-aware showroom.

No reset, clean, stash operation, commit, push, merge, tag, publish, or
release was performed. The pre-existing dirty worktree was preserved.

## 2. Registry and distribution counts

The counts distinguish canonical component contracts from aliases, blocks,
recipes, and semantic icons. A catalog entry with a different name is not
counted as a new primitive unless it has its own reusable typed API,
interaction semantics, accessibility model, and multi-surface value.

| Measure                          | Q03 normalized baseline | Q13 observed | Q13 interpretation                                                                   |
| -------------------------------- | ----------------------: | -----------: | ------------------------------------------------------------------------------------ |
| Canonical implemented components |                     145 |      **167** | 22 legitimate net-new contracts were delivered across the queued Q04 and Q11 slices. |
| Total component catalog entries  |                     151 |      **173** | 6 aliases remain compatibility entries and are not counted as new primitives.        |
| Aliases                          |                       6 |        **6** | Stable compatibility aliases; no duplicate canonical system was introduced.          |
| Expressive blocks                |                      12 |       **60** | Q12 block compositions, not 48 additional primitive components.                      |
| Recipes                          |                      29 |       **29** | Named recipes/presets remain recipe decisions, not component rows.                   |
| Semantic icons                   |                     122 |      **122** | The indexed Solar semantic icon set remains stable.                                  |

The 22 net-new component contracts are the 15 high-confidence Q04 contracts
(`Kbd`, `Link`, `Container`, `Stack`, `SpeedDial`, `DragHandle`,
`BottomNavigation`, `NavigationRail`, `Transfer`, `Cascader`, `ColorPicker`,
`TagsInput`, `TreeView`, `FilePreview`, `SplitPane`) and the 7 Q11
editor/builder/AI contracts (`EditorSurface`, `PropertyInspector`,
`BuilderCanvas`, `PromptComposer`, `ConversationThread`, `CitationList`,
`ToolCallCard`).

The constrained count is intentional. Q12's 48 additions are reusable block
compositions backed by one semantic block shell and canonical primitives; they
are not a disguised primitive-count inflation.

## 3. Human Components showroom

The human-facing library is no longer a flat text dump. It exposes the
catalog as family-aware, searchable, inspectable contracts while keeping the
route content bounded and using the canonical shell/components.

| Route / surface         | Observed evidence                                                                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/components`           | `Components` heading, search control, 17 responsibility-family entry points, and 167 canonical contract entries; aliases are excluded from the canonical family index. |
| `/components/forms`     | `Forms` heading and 33 rendered `[data-component-contract]` entries, including Q04 selection/input contracts.                                                          |
| Component detail routes | Preview, usage/API, states, responsive guidance, motion, tokens, and relationship metadata are available from the human index model.                                   |
| `/blocks`               | `Blocks` heading, 60 detail links/previews, six family groupings, and family filtering.                                                                                |
| `/theme-studio`         | `Theme Studio` heading, four curated recipe choices, five short axis sections, live preview, family canaries, config transfer, and responsive/module-state proof.      |

Direct Codex In-app Browser checks reached `/components`,
`/components/forms`, `/blocks`, and `/theme-studio` by URL and observed the
expected headings and rendered content without route crashes. The browser AX
tree for Theme Studio exposed the shared navigation, four recipes, runtime
preference axes, five Theme Studio sections, live preview table, component
canaries, and Q04 behavior contracts.

The showroom implementation remains in the existing explorer/catalog model:

- `apps/playground/src/library-explorers.tsx` — family-aware index, search,
  previews, and details;
- `apps/playground/src/catalog-model.ts` — typed family/count/relationship
  projection;
- `apps/playground/src/app.css` — composition/layout rules using existing
  semantic tokens;
- `generated/agent-index.json` and compact projections — the retrieval-facing
  contract surface.

No second primitive library, local color palette, raw provider icon string, or
parallel navigation system was introduced for the showroom.

## 4. AI index and retrieval acceptance

`pnpm contracts:generate` completed with **220 generated contract
projections**. The generated retrieval surface is the typed source plus
compact projections, not a manually maintained second decision manifest.

Observed generated metrics:

| Projection                          |     Observed size / count |
| ----------------------------------- | ------------------------: |
| Full agent/catalog projection       |             383,554 bytes |
| Compact component/recipe projection |             222,541 bytes |
| Selective recipe shard              |              43,720 bytes |
| Selective component shard           |             303,084 bytes |
| Recipes                             |                        29 |
| Components                          | 173 total / 167 canonical |
| Blocks                              |                        60 |
| Semantic icons                      |                       122 |

`pnpm test:ai` passed with 15 cold-start recipe tasks, 13 contract/catalog
reads, and 0 donor reads.

Representative CLI retrievals:

| Query                                            | Result                                                                                                                                                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operations tracker work queue`                  | `entity-list`; enterprise/dashboard profiles; AppShell; Sidebar, PageHeader, KPICluster, FilterToolbar, DataTable, Pagination, DetailDrawer, filters, status, activity, milestone, and action contracts. |
| `ebook store catalog`                            | `catalog`; commerce/content profiles; PublicShell; NavigationMenu, SearchInput, ProductGrid/ProductCard, filters, commerce/cart contracts.                                                               |
| responsive form controls                         | `entity-form`; canonical Field/Input/Select/ActionFooter/DatePicker/TimePicker/FileUpload/Combobox contracts.                                                                                            |
| public marketing hero                            | `marketing-home`; PublicShell; hero-split/cta-contained/public-footer plus the block recommendations for logo cloud, feature showcase, stats, content showcase, and testimonials.                        |
| `AI conversation with citations and tool status` | Falls back to generic `dashboard` retrieval; it did not directly select the Q11 conversation/citation/tool-card contracts.                                                                               |
| `CSV import validation and review`               | Falls back to generic `dashboard` retrieval; it did not directly select the Q12 CSV-import block contract.                                                                                               |

The last two rows are recorded as retrieval constraints, not silently counted
as direct Q11/Q12 AI success. The catalog remains indexed and searchable by
canonical name/family; the natural-language intent-to-contract training/query
coverage needs a later bounded improvement.

## 5. Theme Studio matrix and token coherence

The Codex browser AX inspection of `/theme-studio` observed a single live
matrix with:

- four curated recipes: Enterprise, Product, Editorial, Commerce;
- appearance: System, Light, Dark;
- density: Dense, Compact, Regular, Comfortable;
- contrast: Standard, More;
- motion: Full, Reduced;
- five progressive sections: Base, Style, Experience, Data, Advanced;
- surface treatment, chart colorway, shape/radius, elevation, content rail,
  focus/interaction, iconography, and motion controls;
- live component canaries for Button, Input, Card, DataTable row, Modal, and
  Sidebar item;
- versioned config import/export and a live preview table.

The token/source checks passed:

- semantic contrast: 284 recipe/mode pairs at WCAG AA 4.5:1;
- token governance: 24 component modules, no raw component palette/color
  dependencies or ungoverned timing;
- component system: 167 canonical components, 6 aliases, 29 recipes, 60
  blocks, singular Select model, and explicit taxonomy/relationships;
- component token coverage verifier: 962 raw-pixel occurrences remain
  explicitly tracked as migration debt rather than hidden as new token names.

The Q13 result therefore confirms a unified token and catalog projection; it
does not claim that every historical raw-pixel occurrence in the dirty branch
has already been removed.

## 6. Package and consumer distribution proof

| Check                          | Result      | Evidence                                                                                                                                                              |
| ------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm contracts:generate`      | PASS        | 220 generated projections and theme/DTCG outputs.                                                                                                                     |
| `pnpm package:build`           | PASS        | UI ESM 10,966.53 kB (gzip 2,163.54 kB); CJS 10,707.77 kB (gzip 2,146.41 kB).                                                                                          |
| `pnpm package:verify`          | PASS        | 17 root exports; bundled tokens, icons, motion, and self-contained styles.                                                                                            |
| `pnpm test:next-consumer`      | PASS        | Tarball 9,157,685 bytes; Next 16.3.4 production build; strict typecheck; 3 Playwright/axe tests passed; single React 19.2.8 runtime.                                  |
| `pnpm test:adoption:static`    | PASS        | 2 isolated consumers, legacy compatibility, v2 recipe, CSS-first consumer, 0 new primitives, 0 parallel systems, 0 raw external icon imports, 0 local color literals. |
| `pnpm test:adoption`           | PASS        | 4/4 behavior/theme adoption tests passed in 21.4s.                                                                                                                    |
| `pnpm typecheck`               | PASS        | Contracts, native, agent build/typecheck, and playground typecheck passed.                                                                                            |
| `pnpm test`                    | PASS        | Contract, responsive, SaaS, Farm, mobile, ERP, DTCG, contrast, token, coverage, slice, brand, recipe, token unit, AI, component, and Tailwind gates passed.           |
| `pnpm build`                   | PASS        | Playground Vite production build completed; existing large-chunk warning remains.                                                                                     |
| `git diff --check`             | PASS        | No whitespace errors; only existing CRLF conversion warnings.                                                                                                         |
| targeted Prettier check        | PASS        | Q13-touched focused test/primitive files match Prettier.                                                                                                              |
| repository `pnpm format:check` | CONSTRAINED | 360 inherited dirty/generated/source files are not formatted; no mass format-write was performed.                                                                     |

The emitted UI package CSS remains token-owned and is explicitly exported:
`base.css` 9,073 bytes, `components.css` 269,879 bytes, `styles.css`
433,894 bytes, `tailwind.css` 1,906 bytes, `theme.css` 163,936 bytes, and
`themes.css` 154,861 bytes. This is package-boundary evidence; an independent
consumer tree-shaking benchmark is not claimed here.

The isolated consumer emitted the expected Node warning because the current
host is Node `v22.23.2` while the consumer package declares `>=24.0.0`.

## 7. Accessibility, responsive, and tooltip/overlay follow-up

Focused checks after Q13 verification changes:

| Focused check                                                                             | Result         |
| ----------------------------------------------------------------------------------------- | -------------- |
| Q04 family/index, Q11 canonical index, Solar icon family, Component Lab card/chart proofs | **5/5 passed** |
| `tests/public-interactions.spec.ts` Chromium subset                                       | **4/4 passed** |
| public showcase carousel + chart tooltip                                                  | **1/1 passed** |

The focused public showcase assertion now follows the actual canonical
overlay contract. Chart tooltips render through `FloatingPortal` so they can
escape clipped chart/card ancestors. The proof checks the portal tooltip is
visible, horizontally aligned to the highlighted point within 4px, and has a
viewport-safe vertical gap of at least 4px. This preserves the requested
“tooltip anchored to the highlighted point” behavior without requiring the
tooltip to remain a descendant of the chart card.

The earlier focused axe failures were hardened in the canonical primitives:

- `MilestoneTracker` no longer adds list-position ARIA attributes to buttons
  when the surrounding ordered list/list items already provide list semantics;
- `SpeedDial` now exposes a menu trigger and menu items instead of the invalid
  `aria-haspopup="group"` relationship.

The complete inherited E2E run remains a constraint. Its observed result was
**201 passed / 106 failed**. The failures were dominated by stale visual
snapshots and older count/default expectations across the previously changed
Q01–Q12 surfaces. The focused count, accessibility, tooltip, chart, and
interaction checks above pass after the bounded corrections. Existing visual
baselines were not overwritten, and a clean full-suite result after those
focused corrections is not claimed.

## 8. Gate constraints and next boundary

Q13 is ready for the PT AAPM component-expansion acceptance review with the
following explicit constraints:

1. Accept the Q03-approved constrained component target rather than requiring
   an artificial 100+ primitive count.
2. Treat the inherited 106 full-E2E failures as visual-baseline/stale
   assertion debt until a separately authorized stabilization job reviews each
   snapshot; do not use mass snapshot regeneration as Q13 evidence.
3. Run distribution acceptance on a Node 24 host before calling the package
   environment fully supported.
4. Improve direct AI intent retrieval for Q11 editor/AI and Q12 CSV-import
   phrases in a future bounded job; the current canonical index and direct
   name/family lookup are still valid.
5. Resolve the repository-wide formatting backlog in a separately scoped
   cleanup, preserving the existing dirty-worktree ownership boundary.

No Q14 work was started. No publish, tag, merge, release, or production AAPM
adoption was performed.

PASS WITH CONSTRAINTS FOR PT AAPM COMPONENT EXPANSION ACCEPTANCE
