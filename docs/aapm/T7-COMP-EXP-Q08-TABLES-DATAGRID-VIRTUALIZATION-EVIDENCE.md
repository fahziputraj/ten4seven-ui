# T7 Component Expansion Q08 — Tables, DataGrid, and Virtualization Evidence

Status: **PASS WITH CONSTRAINTS FOR Q09**

Date: 2026-09-11  
Repository: `D:\SA\ten4seven-ui`  
Branch: `codex/icons-curated-solar-style`  
HEAD observed at start and end of Q08: `e582cfcfbe0f077d1a5832d86db9da1898487fd3`  
Worktree: already dirty before Q08; no reset, cleanup, commit, merge, or push was performed.

## 1. Authority and bounded scope

This evidence records the Q08 attachment `Q08-TABLES-DATAGRID-VIRTUALIZATION.md`, interpreted together with the repository agent contract, the Q03 normalized coverage decision, the Q07 predecessor gate, and the existing operational UX data-grid spike.

The Q08 implementation boundary is deliberately the table/data-grid presentation and interaction contract:

- Native `DataTable` semantics, names, state announcements, selection labels, sorting labels, density, visibility, and responsive stacked presentation.
- `DataTableColumnPicker` as the controlled companion for column visibility, not a second table or a second state owner.
- `Pagination` input normalization and `FilterToolbar` label preservation at the shared primitive boundary.
- The existing bounded `AdvancedDataGrid` slice: typed cell editors, row state, validation feedback, keyboard traversal, selection, sorting, density, and bounded horizontal scroll.
- Catalog/library specimens and generated AI metadata so these contracts are discoverable through the Tables family.

The Q08 implementation does **not** introduce a spreadsheet runtime, pivot engine, tree/grid engine, remote-query layer, persistence layer, permission model, transaction model, or consumer-owned validation/calculation logic. Those remain consumer concerns or deferred design-system work.

## 2. Delivered source changes

### DataTable

`packages/ui/src/components.tsx` now:

- renders a native hidden `caption` with a stable fallback name (`Data table`);
- accepts `rowLabel` so selection controls do not expose opaque row keys when the consumer can provide a readable label;
- gives sortable headers explicit `Sort by …` names while retaining `aria-sort`;
- exposes loading and empty states with polite live updates and error state with assertive alert semantics;
- uses the same accessible name for the responsive stacked companion;
- preserves a consumer-provided `FilterToolbar` accessible name instead of overwriting it;
- clamps invalid pagination input to safe page and page-size values, including the empty-result range.

### DataTableColumnPicker

`packages/ui/src/data-display.tsx` now exposes the optional-column control as a labelled semantic `role="group"` with the default accessible name `Table columns`. It continues to report a controlled visibility map to the consumer.

### AdvancedDataGrid

`packages/ui/src/data-grid.tsx` now:

- renders a native hidden caption from the required `caption` contract;
- names sortable controls consistently with `DataTable`;
- keeps loading, empty, and error state content available to assistive technology;
- preserves the existing typed editor, row-state, error, selection, save/cancel, and keyboard contracts.

`packages/ui/src/styles.css` maps `comfortable`, `default`, `compact`, and `dense` AdvancedDataGrid states to the existing `--t7-row-height` token through `--t7-table-row-height`. Header, body-row, and state geometry use that shared value. No Q08 palette, radius, shadow, or motion literal was added.

### Library specimen

`apps/playground/src/component-preview-fixtures.tsx` now renders the Data Table Column Picker together with a controlled DataTable and a visible column-visibility relationship. The Data Table specimen uses the named `Inventory records` caption and the stacked responsive contract.

`packages/ai/catalog/components.json` and generated projections now describe `caption`, `rowLabel`, the native table name, and the labelled column-picker group. The catalog remains the typed/generated source path; no second decision manifest was created.

## 3. Catalog and public-boundary evidence

The `pnpm test:ai` run reported:

| Catalog surface                | Observed count |
| ------------------------------ | -------------: |
| Total components               |            166 |
| Canonical components           |            160 |
| Aliases                        |              6 |
| Recipes                        |             29 |
| Expressive blocks              |             12 |
| Semantic icons                 |            122 |
| Generated contract projections |            211 |

No new public root export was added in Q08. The existing UI package boundary remains verified at 17 root exports. `DataTable`, `DataTableColumnPicker`, `Pagination`, and `AdvancedDataGrid` remain the canonical implementations and are not duplicated in the consumer application.

## 4. Virtualization and heavy-engine decision

### Decision

Virtualization, pivot/matrix behavior, tree/grouped rows, arbitrary column resize/pinning, async remote editors, formula/totals, and server-side query orchestration are **DEFERRED WITH EXPLICIT CONSTRAINT**. Q08 does not claim them as implemented.

The repository's existing `research/18-operational-ux/DATAGRID_SPIKE.md` already records that virtualization and very large row counts require a quantitative workload and performance proof. The current contracts do not provide a row budget, scroll/focus retention acceptance criteria, server query contract, grouping/tree contract, formula/total ownership model, or a product decision for a heavy engine. Implementing an engine without those inputs would turn the base package into an unbounded spreadsheet system.

### Heavy-engine gate

| Gate item                     | Q08 evidence                                                                                                                                                                                                                      | Classification              |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| License evidence              | No new grid/virtualization vendor selected or imported.                                                                                                                                                                           | PASS / NOT TRIGGERED        |
| Bundle delta                  | Current packed UI artifact is 9,125,261 bytes; `dist/index.js` is 10,952,414 bytes and `dist/styles.css` is 422,756 bytes. A clean-base delta is not claimed because the worktree contained prior Q01–Q07/Q14 changes before Q08. | OBSERVED / DELTA UNVERIFIED |
| Tree-shaking or lazy strategy | Not applicable: no heavy engine was added.                                                                                                                                                                                        | PASS / NOT TRIGGERED        |
| SSR/browser boundary          | The delivered table behavior is native React/DOM table behavior; no engine-specific browser boundary was added.                                                                                                                   | PASS                        |
| Vendor API isolation          | No vendor grid API exists in the package or consumer surface.                                                                                                                                                                     | PASS                        |
| Package-consumer proof        | Packed tarball and isolated consumer proof passed.                                                                                                                                                                                | PASS                        |
| Vendor styling                | No vendor styling was imported.                                                                                                                                                                                                   | PASS                        |

The heavy-engine gate is therefore not a failure of the bounded Q08 slice; it is the reason virtualization remains a named constraint for the next gate.

## 5. Theme and density matrix

The table contracts consume the existing global theme runtime rather than introducing a table-local theme. Q08 exercised the following matrix through the existing Theme Studio/provider contract:

| Axis            | Contract used by Q08                                                                        | Evidence                                                                               |
| --------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Appearance      | light/dark/system theme resolution remains provider-owned                                   | SOURCE: existing ThemeProfile and global provider tests                                |
| Density         | comfortable/default/compact/dense map to shared row-height tokens                           | SOURCE: `--t7-row-height` and AdvancedDataGrid selectors; RUNTIME: compact ERP fixture |
| Contrast        | standard/more remains semantic-theme-owned                                                  | SOURCE/RUNTIME: existing semantic contrast and global foundation gates                 |
| Motion          | full/reduced remains global motion-role-owned                                               | SOURCE/RUNTIME: existing motion and reduced-motion contracts                           |
| Surface         | quiet table canvas keeps border and row dividers without semantic hue                       | OBSERVED: existing quiet-canvas accessibility hardening test                           |
| Responsive mode | DataTable stacked mode and AdvancedDataGrid bounded scroll are explicit component contracts | RUNTIME: Q08 Playwright tests and Codex Browser route snapshot                         |

## 6. Responsive and accessibility evidence

The focused Q08 test file is `tests/q08-tables-datagrid-virtualization.spec.ts` and passed all 3 tests:

1. `DataTable` exposes a native `Inventory records` caption/name, readable rows, serious/critical axe violations equal to zero, stacked records at 390px, and no document overflow.
2. `DataTableColumnPicker` exposes a named column-control group; changing `Status` removes the corresponding table column while leaving the record visible; serious/critical axe violations equal to zero.
3. `AdvancedDataGrid` exposes a native `Journal line editor` caption/name, bounded typed editing, compact density through the ERP reference, serious/critical axe violations equal to zero, and horizontal scroll contained by the grid owner at 390px.

The existing `tests/advanced-data-grid.spec.ts`, `tests/q08-erp-readiness.spec.ts`, and `tests/canonical-component-a11y-hardening.spec.ts` also ran. Their behavioral and accessibility assertions passed. Two existing AdvancedDataGrid screenshot assertions remain baseline mismatches because the current branch's rendered theme/layout differs from their stored snapshots; the mismatch is recorded below and was not silently rebaselined.

## 7. Verification ledger

| Check                                                                        | Result                                                                                                                                               | Evidence classification              |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `pnpm typecheck`                                                             | PASS                                                                                                                                                 | SOURCE/build                         |
| `pnpm contracts:generate`                                                    | PASS; 211 projections generated                                                                                                                      | SOURCE                               |
| `pnpm test:ai`                                                               | PASS; 166 components, 29 recipes, 12 blocks, 122 icons                                                                                               | SOURCE/catalog                       |
| `pnpm tokens:coverage`                                                       | PASS; coverage report generated                                                                                                                      | SOURCE                               |
| `pnpm test:component-coverage`                                               | PASS; 7 high-impact selector families; 945 tracked raw-pixel debt occurrences                                                                        | SOURCE                               |
| `pnpm package:build`                                                         | PASS                                                                                                                                                 | BUILD                                |
| `pnpm package:verify`                                                        | PASS; 17 root exports, bundled tokens/icons/motion                                                                                                   | PACKAGE                              |
| `pnpm test:slice-a`                                                          | PASS; isolated packed consumer resolved entity-list and public boundaries                                                                            | PACKED CONSUMER                      |
| `pnpm test`                                                                  | PASS                                                                                                                                                 | REPOSITORY STATIC/UNIT/CONTRACT      |
| `pnpm build`                                                                 | PASS; playground production build completed                                                                                                          | BUILD                                |
| `pnpm exec playwright test tests/q08-tables-datagrid-virtualization.spec.ts` | PASS; 3 passed                                                                                                                                       | RUNTIME                              |
| Focused Q08-related existing Playwright behavior/axe tests                   | PASS; 5 passed, 2 screenshot assertions mismatched                                                                                                   | RUNTIME / VISUAL BASELINE CONSTRAINT |
| Codex Browser `/components/tables`                                           | OBSERVED; Tables family showed 9 canonical contracts, 6 foundations, 3 data workflows, live DataTable, AdvancedDataGrid, and Column Picker specimens | OBSERVED                             |
| `pnpm format:check`                                                          | FAIL; 364 repository files report pre-existing formatting drift, including unrelated generated, research, app, and test files                        | REPOSITORY BASELINE CONSTRAINT       |
| Focused Prettier check for Q08 source/test files                             | PASS                                                                                                                                                 | SOURCE                               |
| `git diff --check`                                                           | PASS; only pre-existing CRLF/LF warnings were reported for unrelated dirty files                                                                     | SOURCE                               |

## 8. Known constraints and follow-up boundary

- Do not treat the current 9.1 MB packed artifact as a clean Q08 bundle delta; isolate Q08 from the pre-existing dirty branch before making a size claim.
- Do not add virtualization or a vendor grid engine at Q09 without a measured row/workload budget, scroll and keyboard acceptance criteria, license evidence, package-size delta, lazy/SSR strategy, and consumer ownership contract.
- Do not rebaseline the two existing AdvancedDataGrid screenshots as part of Q08 without first deciding whether the stored green theme is still the intended branch baseline; the current Codex Browser rendering is blue/purple on this branch.
- The full repository format gate remains blocked by 364 files of existing formatting drift. Q08 files themselves pass targeted formatting.
- Worktree state remains intentionally preserved; no unrelated dirty changes were staged or normalized.

## Gate

PASS WITH CONSTRAINTS FOR Q09
