# Stabilization Change Inventory

Status: pre-commit inventory checkpoint; no commit, push, deploy, redesign,
recipe migration, profile addition, chunk-size work, or cleanup was performed
at inventory time.

Verified: 2026-09-01

Repository: `D:/SA/ten4seven-ui`

Branch: `main`

HEAD: `6fd6bd9 feat: finalize v1 motion and interaction polish`

Remote comparison: `HEAD` is one commit ahead of `origin/main` and is not
behind it. There are no staged changes.

## Working-tree totals

| State                       |                  Count | Interpretation                                                                                                    |
| --------------------------- | ---------------------: | ----------------------------------------------------------------------------------------------------------------- |
| Tracked files modified      |                     61 | Existing files changed in the current dirty milestone stack                                                       |
| Staged files                |                      0 | Nothing is prepared for commit yet                                                                                |
| Non-ignored untracked files |                    438 | New contracts, runtime artifacts, generated projections, evidence, tests, six audit documents, and two local logs |
| Ignored files/directories   | 39,015 observed by Git | Dependency trees, build output, caches, local artifacts, and test metadata; not commit candidates                 |

The count is a point-in-time inventory. Running builds or Playwright can change
ignored output and test metadata without changing the product source set.

## Tracked changes

### Root and operating documentation — 7 files

```text
.gitignore
.prettierignore
AGENTS.md
README.md
llms.txt
package.json
pnpm-lock.yaml
```

These changes add the contract/build/package validation commands, ignore local
build artifacts, and document the canonical AI-first/runtime boundaries.

### Playground and reference surfaces — 6 files

```text
apps/playground/package.json
apps/playground/src/App.tsx
apps/playground/src/app.css
apps/playground/src/component-proofs.tsx
apps/playground/src/playground-routes.ts
apps/playground/tsconfig.json
```

This is the Theme Studio, Component Lab, Public Showcase, Operations Tracker,
Ebook Store, and shared visual/motion polish surface. No new route family was
introduced during this stabilization audit.

### AI/application documentation — 3 files

```text
docs/ai/AI_QUICKSTART.md
docs/ai/COMPONENT_SELECTION.md
docs/ai/THEMING.md
```

These files align agent-facing guidance with semantic roles, compact retrieval,
theme profiles, and the human-versus-agent granularity boundary.

### Canonical AI and token sources — 5 files

```text
packages/ai/bin/t7ui.mjs
packages/ai/catalog/components.json
packages/tokens/src/theme.css
packages/tokens/src/theme.test.ts
packages/tokens/src/theme.ts
```

The token changes cover independent palette roles, exact radius values, motion
duration steps, and typography presets. The CLI/catalog changes support the
typed contract and compact retrieval surfaces.

### Bundled UI package — 8 files

```text
packages/ui/package.json
packages/ui/src/blocks.tsx
packages/ui/src/charts.tsx
packages/ui/src/data-display.tsx
packages/ui/src/index.ts
packages/ui/src/motion.ts
packages/ui/src/provider.tsx
packages/ui/src/styles.css
```

This is the private `@ten4seven/ui@1.0.0` package surface, including the
shared Anime.js-backed motion adapter, bundled token/style behavior, and
canonical component exports.

### Existing gate documentation — 1 file

```text
research/05-v1/GATE_V1_FINAL_POLISH.md
```

This remains historical gate evidence; it is not rewritten as a replacement
for the later bounded gates.

### Verification scripts — 2 files

```text
scripts/verify-adoption.mjs
scripts/verify-reference-cold-start.mjs
```

These preserve the compact retrieval, adoption-boundary, and cold-start proof
paths.

### Regression tests and screenshot baselines — 29 files

Test source changes:

```text
tests/reference-screen-renders.spec.ts
tests/system-coherence.spec.ts
tests/visual-regression.spec.ts
tests/workbench-interaction.spec.ts
```

Modified screenshot baselines: 25 files.

- Public Showcase expressive renders: 6 viewports.
- Ebook Store reference renders: 3 viewports.
- Publishing cart: 1 desktop state.
- Ebook Store system baselines: 5 viewports.
- Semantic icon baselines: 5 viewports.
- Theme Studio system baselines: 5 viewports.

The 20 Public Showcase/Ebook/cart/Theme Studio baselines were refreshed by the
targeted reduced-motion screenshot command after intentional shell spacing and
Theme Studio revisions. The 5 semantic-icon baselines were already modified
when this audit began and were not touched by the latest targeted refresh;
they must remain an explicit part of the icon-system commit rather than being
silently included in a visual-polish commit.

## Non-ignored untracked changes

| Area                       |   Count | Files/meaning                                                                                                                                        |
| -------------------------- | ------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Local server logs          |       2 | `.dev-server.log`, `.dev-server-error.log`; temporary and excluded from commits                                                                      |
| Brand proof surface        |       2 | `apps/playground/src/brand-expression.tsx`, `apps/playground/public/brand-proof/learning-field.svg`                                                  |
| External adoption consumer |       5 | `consumer-tests/entity-list-consumer/**` isolated consumer fixture and runner                                                                        |
| Root generated projections |     169 | `generated/` compact index, aliases, brand profile, 145 component shards, 17 recipe shards, compatibility projections                                |
| Agent package              |     182 | `packages/agent/package.json`, source JS/declarations, and 171 package-generated files                                                               |
| Contract package           |      10 | `packages/contracts/package.json`, `tsconfig.json`, and 8 typed contract sources                                                                     |
| UI package support         |       6 | private package legal docs, build/verify scripts, and Vite bundle config                                                                             |
| AI-native research         |      39 | `research/11-ai-native/**`, including boundary/adoption gates, benchmark ledgers, and evidence archive                                               |
| Brand research             |       4 | `research/12-brand-expression/**`                                                                                                                    |
| Recipe-family research     |       7 | `research/13-recipe-families/**`, including retrieval evidence JSON                                                                                  |
| Stabilization audit        |       6 | `research/14-stabilization/**` — inventory, audit, commit plan, gate, staging ledger, and boundary check                                             |
| Projection/proof scripts   |       5 | `scripts/generate-contract-projections.mjs`, `verify-contracts.mjs`, `verify-slice-a.mjs`, `verify-brand-expression.mjs`, `verify-recipe-family.mjs` |
| Brand regression test      |       1 | `tests/brand-expression.spec.ts`                                                                                                                     |
| **Total**                  | **438** | Non-ignored untracked files at final pre-staging review, including this six-file audit package                                                       |

The generated root and package projections deliberately contain the same 169
projection files. The package generated directory adds only
`index.mjs` and `index.d.mts` as package entry modules; it does not represent a
second resolver or a second contract source.

## Ignored local outputs

These were observed but are not part of the non-ignored commit inventory:

| Path                                                            | Observed state                                   | Decision                                                                                              |
| --------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `artifacts/ten4seven-ui-1.0.0.tgz`                              | 695,362 bytes                                    | Valid local packed artifact; keep as distribution evidence, do not publish or commit as a source file |
| `apps/playground/dist/`                                         | 23 files, 1,471,182 bytes after the latest build | Reproducible build output; do not stage                                                               |
| `apps/adoption-operational/dist/`, `apps/adoption-public/dist/` | Existing ignored build output                    | Do not stage                                                                                          |
| `node_modules/`, package-local `node_modules/`, `.vite/`        | Dependency/cache output                          | Do not stage                                                                                          |
| `test-results/`                                                 | Playwright metadata and runner output            | Do not stage                                                                                          |

No destructive cleanup was performed. The two non-ignored server logs are
explicitly named in the pre-commit exclusion list below.

## Ownership map

| Milestone                   | Canonical source                                                                      | Generated/evidence surface                         | Primary validation                                                      |
| --------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| P0 contract plane           | `packages/contracts/src/**`, typed catalog adapters                                   | `generated/**`                                     | `pnpm test:contracts`, projection check                                 |
| Slice A / adoption          | `packages/agent/src/**`, `packages/agent/package.json`                                | `packages/agent/generated/**`, `consumer-tests/**` | `pnpm test:slice-a`, adoption static proof, external benchmark evidence |
| Brand expression            | `packages/contracts/src/brand-profile.ts`, `apps/playground/src/brand-expression.tsx` | `research/12-brand-expression/**`                  | brand-expression gate and Playwright proof                              |
| Recipe family               | entity-list/entity-detail typed contracts and shared resolver kernel                  | `research/13-recipe-families/**`                   | recipe-family gate and retrieval evidence                               |
| Theme/token/motion          | `packages/tokens/**`, `packages/ui/src/**`                                            | package `dist/` and screenshot baselines           | token tests, package build/verify, E2E                                  |
| Playground/reference polish | `apps/playground/src/**`                                                              | visual baselines                                   | system coherence, workbench interaction, visual E2E                     |

The mapping is intended for staging review. It does not stage or alter files.
