# T7-AAPM-001-Q08 — Ecosystem Readiness

Date: 2026-09-11  
Checkout: `D:\\SA\\ten4seven-ui`  
Branch: `feat/icons-aapm-iconify-expansion`  
HEAD at execution start: `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`

## Executive verdict

**T7-AAPM-001 READY WITH CONSTRAINTS**

Q08 closes the bounded Ten4Seven ecosystem-readiness slice for ERP/data-dense
presentation. The repository now has a typed ERP density contract, generated
agent retrieval, a deterministic `/erp-reference` fixture, canonical dense
collection and editor composition, explicit state/responsive boundaries, and
reproducible package/performance measurements.

This is a design-system and reference-readiness result, not a claim that a
live AAPM ERP consumer has been adopted. The next step remains a separate,
bounded real AAPM ERP consumer adoption pilot. No live AAPM API, database,
posting, reconciliation, approval authority, or production ERP data was
changed or asserted by this work.

## Scope and safety boundary

The Q08 queue document was treated as the bounded execution contract. Existing
Q02–Q07 work and unrelated dirty files were preserved. Q08 changes are limited
to the shared typed contract/projection, AI retrieval, reference route,
verification scripts, focused browser coverage, package measurement, route
registry/docs, and this evidence report.

No Q08 action:

- mutates an AAPM backend, database, API, ledger, posting, or approval state;
- publishes to a public registry or changes package versions/licensing;
- creates an ERP-specific primitive parallel to Ten4Seven components;
- introduces a spreadsheet/grid engine, virtualized data strategy, or domain
  calculation authority;
- commits, pushes, merges, deletes, resets, or stages the worktree.

## Q01–Q08 lineage

| Queue | Prior evidence / outcome                                                                              | Q08 continuation                                                                                                                  |
| ----- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Q01   | `T7-AAPM-001-Q01-CURRENT-TARGET-FIT.md`; PASS WITH CONSTRAINTS FOR Q02                                | Keeps generic Ten4Seven ownership separate from AAPM consumer authority and adds ERP presentation readiness without domain logic. |
| Q02   | `T7-AAPM-001-Q02-CONTRACT-PLANE-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q03                           | Extends the same typed contract plane with `erp-density.ts`; no second handwritten decision manifest.                             |
| Q02A  | `T7-AAPM-001-Q02A-SURFACE-MATURITY-QUALITY-BAR.md`; PASS WITH CONSTRAINTS FOR Q02B                    | Uses cards only for decision metrics, named charts, explicit density, and state/a11y checks.                                      |
| Q02B  | `T7-AAPM-001-Q02B-STUDIO-HARDENING-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q02C                       | Reuses canonical shell, header, navigation, cards, controls, and motion/token contracts.                                          |
| Q02C  | `T7-AAPM-001-Q02C-LIBRARY-HARDENING-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q02D                      | Resolves only implemented catalog components for the ERP patterns.                                                                |
| Q02D  | `T7-AAPM-001-Q02D-REFERENCE-LAB-NAV-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q03                       | Registers `/erp-reference` in the existing route/maturity registry as a Labs / Proofs reference, not as a production consumer.    |
| Q02E  | `T7-AAPM-001-Q02E-RUNTIME-PACKAGE-MANAGER-REPRODUCIBILITY-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q03 | Re-measures the existing package boundary and keeps the client-only root/no-server-entry constraint explicit.                     |
| Q03   | `T7-AAPM-001-Q03-AAPM-PROFILES-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q04                            | Consumes the generated `aapm-erp` profile through `ThemeScope`; the route does not redefine AAPM brand decisions.                 |
| Q04   | `T7-AAPM-001-Q04-RESPONSIVE-SHELL-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q05                         | Uses AppShell and the typed desktop/tablet/mobile dense-table contract; focused Q08 overflow/shell tests pass.                    |
| Q05   | `T7-AAPM-001-Q05-SAAS-PATTERNS-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q06                            | Keeps lifecycle, permission, and authority presentation-only in the reference route.                                              |
| Q06   | `T7-AAPM-001-Q06-FARM-REFERENCE-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q07                           | Farm remains a separate reference slice; Q08 does not add Inventory or Farm-local ERP abstractions.                               |
| Q07   | `T7-AAPM-001-Q07-NATIVE-PROOF-EVIDENCE.md`; PASS WITH CONSTRAINTS FOR Q08                             | Native/shared semantic boundaries remain verified statically; no native renderer/device claim is made.                            |
| Q08   | This report                                                                                           | ERP density, performance, distribution, retrieval, compatibility, and architecture fitness are recorded below.                    |

## Implemented Q08 contract plane

Source of truth:

- `packages/contracts/src/erp-density.ts`
- `packages/contracts/src/canonical.ts`
- `packages/contracts/src/index.ts`

Generated outputs:

- `generated/erp-density.json`
- `packages/agent/generated/erp-density.json`
- `generated/index.json` (`erpDensity.path = erp-density.json`)
- `generated/agent-index.json` (`entryPoints.erp-density`)

The contract contains five bounded patterns:

| Pattern                 | Canonical composition                                                                                                              | Responsive contract                           | Explicit unsupported boundary                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| `collection`            | `PageHeader`, `FilterToolbar`, `DataTable`, `Pagination`; optional KPI, column picker, bulk actions, drawer, filter drawer, status | desktop table; tablet/mobile table-scroll     | virtualized/server-windowed grid; tree-grid, pivot, formula, spreadsheet behavior |
| `transaction-detail`    | `RecordSummary`, `KeyValueList`, `ActivityFeed`, `RevisionDiff`; optional drawer/table/status/footer                               | desktop inline; tablet stacked; mobile drawer | automatic reconciliation/posting; domain transaction state machines               |
| `editable-entry`        | `FormGrid`, `Input`, `Select`, `ActionFooter`; optional typed grid/currency/status/alert                                           | desktop inline; tablet/mobile stacked         | formula recalculation; fill handle, cell range, spreadsheet interaction           |
| `approval-queue`        | `ApprovalPanel`, `StatusChip`, `ActionFooter`; optional table/summary/activity/confirmation                                        | desktop inline; tablet/mobile stacked         | automatic approval policy; posting, entitlement, workflow mutation                |
| `operational-dashboard` | `KPICluster`, `LineChart`, `BarChart`, `DonutChart`; optional `ChartPanel`, table, status                                          | desktop inline; tablet/mobile stacked         | unsourced KPI calculation; marketing hero/decorative chart wall                   |

Shared states are typed once: `loading`, `ready`, `empty`, `error`, `stale`,
`conflicted`, `read-only`, `permission-limited`, and `pending`.

Shared token roles are canonical foundation roles only: `surface`,
`surface-raised`, `surface-subtle`, `border`, `selected`, `focus-ring`,
`control-height`, `row-height`, `radius-panel`, `shadow-card`, `motion`, and
the existing `chart-1` through `chart-5` roles. No ERP-specific color, radius,
shadow, height, or motion token family was added.

## Reference route and capability proof

Route: `http://localhost:4173/erp-reference`

Implementation: [erp-data-dense-reference.tsx](/D:/SA/ten4seven-ui/apps/playground/src/erp-data-dense-reference.tsx)

The fixture is static and read-only from a domain-authority perspective. It
composes:

- `AppShell`, `Sidebar`, `PageHeader`, and `SectionNavigation`;
- `ThemeScope` with the generated `aapm-erp` profile;
- a three-card `KPICluster` for records, review amount, and ready-to-post
  presentation;
- `FilterToolbar`, `SearchInput`, `Select`, `DataTableColumnPicker`, compact
  `DataTable`, `Pagination`, and `BulkActionBar`;
- keyboard-openable `DetailDrawer` with `RecordSummary`, `KeyValueList`,
  `ActivityFeed`, and `RevisionDiff`;
- bounded `AdvancedDataGrid` and a `FormGrid` entry alternative;
- `ApprovalPanel`, `StateView`, `ModuleState`, `RevisionDiff`, and
  `ActivityFeed` for review/state/trace;
- named-question `ChartPanel` compositions using `LineChart`, `BarChart`, and
  `DonutChart`.

The route owns only fixture interaction state (query, sort, selection, page,
drawer, and local editor state). It does not fetch, authorize, persist, post,
reconcile, or evaluate business rules.

## Workstream A — ERP density and state matrix

| Capability                    | Evidence                                                                                                  | Result                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------- |
| Comparable records            | Compact `DataTable` with stable reference/owner/amount/status columns                                     | PASS                  |
| Sort                          | Amount column carries semantic `aria-sort`; focused test clicks the canonical sort control                | PASS                  |
| Pagination                    | `Pagination` reports `1–5 of 7` and exposes previous/next controls                                        | PASS                  |
| Selection and bulk            | Native row checkboxes feed `BulkActionBar`; focused test verifies selected count and export action        | PASS                  |
| Column visibility             | Canonical `DataTableColumnPicker` controls optional columns                                               | PASS                  |
| Sticky/overflow behavior      | Required reference column uses canonical sticky support; `responsive="scroll"` keeps the table bounded    | PASS WITH CONSTRAINTS |
| Query/filter                  | Canonical `FilterToolbar`, `SearchInput`, and `Select` reset the fixture page                             | PASS                  |
| Master/detail                 | Enter on the focused first row opens `DetailDrawer` without losing collection context                     | PASS                  |
| Editable density              | `AdvancedDataGrid` is limited to typed journal rows and a separate bounded `FormGrid`                     | PASS WITH CONSTRAINTS |
| Validation/conflict boundary  | One row exposes consumer-supplied validation copy; the contract records conflict/read-only states         | PASS WITH CONSTRAINTS |
| Approval/action queue         | `ApprovalPanel` keeps evidence and next action together; no authority is implemented                      | PASS WITH CONSTRAINTS |
| Totals/footer                 | Explicit footer says totals/persistence remain consumer-owned                                             | PASS WITH CONSTRAINTS |
| Audit/activity/diff           | `ActivityFeed` and `RevisionDiff` present trace facts without audit authority                             | PASS                  |
| Keyboard/focus                | Row Enter opens detail; canonical component focus behavior is covered by Q08 and existing component tests | PASS                  |
| Loading/empty/error/read-only | `StateView` empty/error, loading/conflict labels, and `ModuleState` read-only examples are visible        | PASS                  |
| Operational charts            | Line, bar, and donut charts answer named operational questions and share chart contracts                  | PASS WITH CONSTRAINTS |

Known density limitation: Ten4Seven does not yet provide a virtualized or
server-windowed grid, tree grid, pivot, formula engine, or spreadsheet editing
model. Those are recorded as bounded gaps, not silently implied by
`AdvancedDataGrid`.

## Workstream B — performance and package measures

Measurement command: `pnpm measure:erp-readiness` after package and playground
builds.

| Measure                  |                                 Baseline before Q08 |                         Current Q08 | Delta / interpretation                                                                  |
| ------------------------ | --------------------------------------------------: | ----------------------------------: | --------------------------------------------------------------------------------------- |
| `packages/ui/dist` total |                                        46,885,015 B |                        46,910,781 B | +25,766 B; source-map/contract metadata movement, runtime JS unchanged                  |
| UI combined ESM+CJS JS   |                                        21,555,590 B |                        21,555,590 B | No runtime JS increase in the UI package                                                |
| Playground `dist` total  |                                        22,827,196 B |                        22,856,871 B | +29,675 B for the new route, registry, and route CSS                                    |
| Playground JS            |                                        22,022,400 B |                        22,049,099 B | +26,699 B; existing Vite single application bundle                                      |
| Playground CSS           |                                           568,885 B |                           571,861 B | +2,976 B; route composition-only layout rules                                           |
| Playground fonts         |                                           220,800 B |                           220,800 B | No font increase                                                                        |
| UI ESM raw / zlib gzip   | Raw 10,899,506 B; pre-change zlib gzip not captured |          10,899,506 B / 2,075,525 B | Current package runtime output; Vite’s displayed gzip uses a different reporting method |
| UI CJS raw / zlib gzip   | Raw 10,656,084 B; pre-change zlib gzip not captured |          10,656,084 B / 2,058,538 B | Current package runtime output                                                          |
| Icon source inventory    |                                        10,469,150 B |                        10,469,150 B | Existing Solar catalog is 10,311,383 B and remains the dominant source-risk signal      |
| Package boundary         |                 root `use client`; no server export | root `use client`; no server export | Boundary preserved; no unsafe `@ten4seven/ui/server` invented                           |

The published-style package build reports the existing Vite package output at
approximately 10.90 MB ESM and 2.15 MB Vite-reported gzip, while the playground
reports approximately 22.05 MB JS and 4.42 MB Vite-reported gzip. The new route
does not justify a package split by itself. Repeat the same measurement against
a real ERP consumer before changing exports, icon loading, or route chunking.

## Workstream C — distribution and consumer compatibility

| Consumer / boundary                | Evidence                                                                                                                                                   | Result                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Local UI package build             | `pnpm package:build`                                                                                                                                       | PASS                         |
| Local package verification         | `pnpm package:verify`; 17 root exports, bundled tokens/icons/motion/styles                                                                                 | PASS                         |
| Packed local artifact              | `test-next-consumer` packed `ten4seven-ui-1.0.0.tgz` at 9,045,703 B                                                                                        | PASS WITH CONSTRAINTS        |
| Next App Router consumer           | `pnpm test:next-consumer`; 2 of 3 Playwright checks pass, one existing focus-token expectation fails (`expected 216 70% 72%`, received `126 44.94% 66.9%`) | PARTIAL / PRE-EXISTING DRIFT |
| Public registry/release            | Not attempted; package remains private `UNLICENSED`                                                                                                        | GOVERNANCE BLOCKER           |
| Native package dependency boundary | Q07 `verify-native-mobile` and Q08 static verification; native package has no `@ten4seven/ui` or icon DOM dependency                                       | PASS WITH CONSTRAINTS        |

The Next consumer failure is outside the Q08 route: it is an existing fixture
expectation for the shared focus token. The Q08 route and package type/build
checks do not change that assertion. It must be reconciled in the existing
token/consumer follow-up before calling the full compatibility gate green.

## Workstream D — AI/agent retrieval

The existing generated retrieval system was extended; no second handwritten
manifest was added.

```text
pnpm t7ui find "ERP dense table"
→ ERP density pattern: ERP collection (collection)
→ Contract: generated/erp-density.json
→ Reference: /erp-reference
→ Responsive: desktop=table, tablet=table-scroll, mobile=table-scroll
```

`pnpm t7ui recipe inspect entity-list` and `pnpm t7ui compose entity-list`
resolve the canonical `AppShell`, `PageHeader`, `DataTable`, `Sidebar`,
`KPICluster`, `FilterToolbar`, `Pagination`, `BulkActionBar`, and
`DetailDrawer` scaffold. The Q08 static route uses that composition and the
generated ERP contract adds only the bounded density-specific decisions.

`pnpm test:ai` passes, including the cold-start reference check with 0 donor
reads. The contract verification reports compact/full retrieval measures of
198,757 / 332,635 bytes for the existing agent index projection set.

## Workstream E — architecture fitness invariants

|   # | Invariant                                                        | Status                | Evidence / constraint                                                                                             |
| --: | ---------------------------------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------- |
|   1 | Generic Ten4Seven remains usable outside AAPM                    | PASS WITH CONSTRAINTS | Q01 contract lineage and generic canonical components remain intact; real external adoption is not claimed here.  |
|   2 | AAPM Brand Core is consumed, not redefined                       | PASS                  | Route consumes generated `aapm-erp` profile via `ThemeScope`; no route-local brand palette.                       |
|   3 | Product expressions stay separate from primitive implementations | PASS                  | ERP reference composes catalogued components and route layout only.                                               |
|   4 | Web is no longer the conceptual boundary of shared semantics     | PASS WITH CONSTRAINTS | Platform-neutral/native contracts exist; only Web is rendered in this repository.                                 |
|   5 | Native consumes shared semantics without DOM                     | PASS WITH CONSTRAINTS | Q07 static adapter/contract proof passes; native runtime/device proof remains unverified.                         |
|   6 | SaaS lifecycle/authz/resource states are presentation-only       | PASS                  | Q05 contract and reference evidence keep authority with the consumer.                                             |
|   7 | Responsive behavior is contract-driven                           | PASS                  | Q04 contract plus Q06/Q08 desktop/tablet/mobile browser proof.                                                    |
|   8 | Farm remains without Inventory coupling                          | PASS WITH CONSTRAINTS | Q06 Farm reference is separate; Q08 introduces no Farm-local Inventory model.                                     |
|   9 | Inventory/module states avoid Farm-local duplicates              | PASS WITH CONSTRAINTS | Shared `ModuleState` and typed module states are reused; live module authority is not present.                    |
|  10 | ERP dense support is bounded and gaps are known                  | PASS WITH CONSTRAINTS | Five typed patterns are covered; virtualization, spreadsheet, pivot, formula, and domain authority remain gaps.   |
|  11 | Performance/package costs are measured                           | PASS WITH CONSTRAINTS | Before/after measures are reproducible; the existing Solar catalog and monolithic Vite bundle remain known costs. |
|  12 | Existing consumers are protected by reproducible tests           | PASS WITH CONSTRAINTS | Static/unit/adoption/package checks pass; full E2E and Next consumer retain pre-existing visual/token drift.      |
|  13 | Codex resolves contracts without donor lookup                    | PASS                  | Generated ERP entry and CLI query resolve with 0 donor reads.                                                     |

## Validation ledger

| Command / proof                                                                                              | Result                     | Notes                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm format:check`                                                                                          | FAIL / baseline partial    | Prettier reports 295 pre-existing files across the dirty checkout, including prior Q02–Q07 and unrelated surfaces. Q08-owned new TS/JS files were formatted selectively; repository-wide reformat was intentionally not performed. |
| `pnpm contracts:generate`                                                                                    | PASS                       | 196 projections plus theme/DTCG exports generated deterministically.                                                                                                                                                               |
| `pnpm typecheck`                                                                                             | PASS                       | Contracts, native adapter, agent, and playground typechecks pass after Q08 changes.                                                                                                                                                |
| `pnpm test`                                                                                                  | PASS                       | Static/unit chain passes, including contracts, native, ERP readiness, AI, package slice, and tokens.                                                                                                                               |
| `pnpm build`                                                                                                 | PASS                       | Playground production build passes; Vite warns that the existing monolithic JS chunk exceeds 500 KB.                                                                                                                               |
| `pnpm package:build`                                                                                         | PASS                       | UI ESM/CJS package builds pass.                                                                                                                                                                                                    |
| `pnpm package:verify`                                                                                        | PASS                       | Self-contained package and 17 root exports verified.                                                                                                                                                                               |
| `pnpm test:e2e`                                                                                              | FAIL / stopped at baseline | First failures are pre-existing `action-availability` and `advanced-data-grid` screenshot drift; snapshots were not rewritten.                                                                                                     |
| `pnpm test:adoption`                                                                                         | PASS                       | 4 adoption tests pass.                                                                                                                                                                                                             |
| `pnpm test:next-consumer`                                                                                    | PARTIAL                    | Next build and 2/3 consumer tests pass; one pre-existing focus-token expectation fails.                                                                                                                                            |
| `pnpm test:ai`                                                                                               | PASS                       | Catalog and cold-start retrieval pass; 0 donor reads.                                                                                                                                                                              |
| `pnpm t7ui recipe inspect entity-list`                                                                       | PASS                       | Canonical entity-list decision contract resolved.                                                                                                                                                                                  |
| `pnpm t7ui compose entity-list`                                                                              | PASS                       | Canonical scaffold resolved with no full-catalog fallback.                                                                                                                                                                         |
| `pnpm test:erp-readiness`                                                                                    | PASS                       | Typed projection, route, implementation, package, and retrieval assertions pass.                                                                                                                                                   |
| `pnpm exec playwright test tests/q06-farm-reference.spec.ts tests/q08-erp-readiness.spec.ts --reporter=line` | PASS                       | 4/4 rendered Farm + ERP tests pass.                                                                                                                                                                                                |
| Q08 browser proof                                                                                            | PASS                       | Desktop/tablet/mobile overflow, sidebar/mobile menu, sort, selection, detail drawer, state coverage, charts, and serious/critical axe audit pass.                                                                                  |
| Q07 native proof                                                                                             | PASS WITH CONSTRAINTS      | Static native contract/token/accessibility verification passes; no actual native renderer/device is claimed.                                                                                                                       |
| `git diff --check`                                                                                           | PASS                       | No whitespace errors; Git only reports existing CRLF/LF conversion warnings for dirty files.                                                                                                                                       |

## SOURCE / RUNTIME / DB / OBSERVED / UNKNOWN

| Evidence class       | Q08 statement                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SOURCE               | Typed ERP contract, generated projection, route composition, package manifests, and verification scripts are present and typechecked.                                                              |
| RUNTIME              | Local Vite route rendered and focused Playwright interactions passed at 1440, 840, and 390 widths.                                                                                                 |
| DB                   | No database was connected, queried, mutated, or reconciled.                                                                                                                                        |
| OBSERVED             | The route exposes static fixture records, explicit state examples, canonical dense controls, and named charts.                                                                                     |
| UNKNOWN / UNVERIFIED | Real AAPM ERP consumer adoption, live data shape/performance, production authorization, posting/reconciliation, native renderer/device behavior, and license resolution remain outside this slice. |

## Remaining design-system gaps and rollback

Known gaps are explicit and bounded:

1. Measure a real ERP consumer before considering UI package/icon splitting or
   route-level code-splitting.
2. Resolve the existing Next consumer focus-token expectation and pre-existing
   visual snapshots in their owning follow-up.
3. Decide whether a future canonical virtualized/server-windowed grid, pivot,
   formula, or spreadsheet contract is warranted; do not hide it inside
   `AdvancedDataGrid`.
4. Obtain governance/licensing resolution before any registry distribution.
5. Run a separate real AAPM ERP consumer adoption pilot with live authority
   boundaries and a production data/performance budget.

Rollback is straightforward: remove the Q08 route registration/reference and
Q08 verification/measurement files, then regenerate projections from the
typed source after reverting the Q08 contract. No database, external service,
package registry, version, or consumer runtime state was changed.

## Next work item

**Next work item: bounded real AAPM ERP consumer adoption pilot** — select one
read-only ERP collection/detail workflow, connect it through the consumer’s
existing authority/data contracts, measure route and package cost against this
Q08 baseline, and preserve the same Ten4Seven density/state/responsive
boundaries. Stop before posting, reconciliation, approval authority, or
production rollout until its separate governance and runtime evidence is
recorded.
