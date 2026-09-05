# Operational UX DWO Execution Log

Work: Ten4Seven master + operational UX DWO continuation  
Execution mode: **STRICT / BOUNDED**  
Date: 2026-09-03  
Branch: `codex/t7ui-next-001-next-app-router-compat`

## Guardrails applied

- Preserved the already-dirty worktree and continued the existing implementation.
- No reset, broad refactor, donor import, Farm repository, ERP/API/database,
  public package publish, push, merge, deployment, or license change.
- Used canonical Ten4Seven components, semantic tokens, theme runtime, and
  `T7Icon` contracts.
- Treated the AAPM route as a deterministic reference fixture only.
- Paired automated screenshot checks with direct rendered-image review.

## Source and contract inventory

The cold-start read covered the repository/package entry points, generated AI
index and compact projections, package catalogs, provider/public barrel,
operational/overlay/form/navigation/date/chart areas, consumer tests, ADRs,
adoption research, and the two user-supplied DWO documents. Existing Universal
v2 and final-stabilization evidence was retained as historical evidence, not
misreported as the current gate.

## Decisions

1. Model operational UX as eleven mature **recipes**, not eleven new
   mega-components.
2. Use five related reference views so patterns demonstrate real composition.
3. Keep product calculations, permissions, routes, APIs, and mutations
   consumer-owned.
4. Add rich operational metadata to generated projections and recipe detail
   pages; keep one typed/catalog source.
5. Route natural operational intent through `t7ui find`, with query-relevant
   semantic icons prioritized before recipe fallback icons.
6. Correct the danger-chip contrast at the semantic token owner.
7. Preserve the Next package's existing root import contract while marking the
   mixed interactive root as an explicit Client Component boundary.

## Implementation ledger

| Layer                 | Result                                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| operational reference | new `/operational-patterns` production-looking fixture with five views and all eleven patterns        |
| recipes               | 11 rich mature entries; catalog total 28                                                              |
| agent projection      | operational metadata/icons generated; agent index includes operational retrieval path                 |
| CLI                   | operational hints, full operational inspect output, query-first icon priority                         |
| documentation UI      | recipe pages render use/avoid, semantics, responsive, accessibility, AI, anti-patterns, and relations |
| tokens/a11y           | semantic danger badge foreground for light/dark; contrast test coverage                               |
| Next consumer         | standalone App Router consumer installs the packed tarball and tests the explicit client boundary     |
| human docs            | operational guide, Next integration contract, ADR-012, and this evidence pack                         |

## Verification ledger

| Gate                              | Current result                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `pnpm contracts:generate`         | PASS — 181 projections, recipe CSS, 3 DTCG exports                                               |
| `pnpm tokens:coverage`            | PASS — report regenerated                                                                        |
| `pnpm format:check`               | PASS                                                                                             |
| `pnpm typecheck`                  | PASS                                                                                             |
| `pnpm test`                       | PASS — contracts/token/DTCG/contrast/governance/AI/component system/Tailwind bridge              |
| `pnpm build`                      | PASS serial; Vite large-chunk advisory only                                                      |
| `pnpm package:build`              | PASS                                                                                             |
| `pnpm package:verify`             | PASS — `@ten4seven/ui@1.0.0`, 13 root exports, self-contained styles                             |
| `pnpm package:release`            | PASS as part of Next proof — local tarball only, no registry publish                             |
| `pnpm test:next-consumer`         | PASS — strict tsc, Next 16.3.4 production build, single React 19.2.8 runtime, 3/3 Playwright/axe |
| `pnpm test:adoption:static`       | PASS — 2 isolated consumers; no parallel primitives/icons/colors                                 |
| `pnpm test:adoption --workers=1`  | PASS — 4/4                                                                                       |
| `pnpm test:consistency`           | PASS — 21 UI source files                                                                        |
| focused operational suite         | PASS — 15/15 update run and 15/15 ordinary rerun                                                 |
| existing visual suite             | PASS — bounded 41/41 update run, inspected diffs, final normal suite coverage                    |
| final `pnpm test:e2e --workers=1` | PASS — 163/163 in 11.7m                                                                          |

## Failure classification

### Expected evidence invariant

The first `pnpm test` stopped because `verify-component-system.mjs` still fixed
the historical recipe count at 17. Actual count was 28, exactly the eleven
authorized operational recipes. The assertion was deliberately updated to 28,
an additional invariant now requires exactly 11 mature operational recipes,
and the evidence-backed reference allowlist includes the AAPM reference. The
complete test command then passed.

### Orchestration contention

Running `pnpm build` concurrently with `pnpm package:build` allowed the package
builder to replace `packages/ui/dist` while Vite resolved
`@ten4seven/ui/styles.css`. The parallel playground build failed after emitting
assets. The package build passed, and a serial playground build against the
completed artifact passed. This is recorded as command contention, not a source
regression.

### Authorized visual differences

The pre-refresh full suite passed 147/163; its 16 failures were all inspected
and mapped to the new nav item or recipe count. The controlled refresh passed
41/41. One subsequent `icons-wide` line-wrap mismatch passed 3/3 in isolated
fresh browser processes without a baseline change. The final ordinary full
suite passed 163/163. See `VISUAL_REGRESSION_REVIEW.md`.

## Local/release boundary

The local package tarball was created solely for the external consumer proof.
No npm publication, commit, push, PR, merge, deployment, or Farm repository was
created. Final hygiene and exact git status are recorded in the work handoff.
