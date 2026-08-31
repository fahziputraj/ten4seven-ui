# Proposed Atomic Commit Plan

Status: **proposal only — no commit has been created**

Verified: 2026-09-01

The current `main` worktree is one commit ahead of `origin/main` and has no
staged changes. The plan below keeps source, generated artifacts, proof, and
visual baselines attributable to the milestone that owns them.

## Staging rules

1. Stage by the explicit path sets below; do not use `git add .`.
2. Never stage `.dev-server*.log`, `artifacts/`, `dist/`, `node_modules/`,
   `.vite/`, or `test-results/`.
3. Stage a canonical source and its generated projection in the same commit.
4. Keep `FRESH_AGENT_CONTEXT: NOT VERIFIED`, the historical Independent
   Adoption `CONDITIONAL PASS`, and the registry-publication caveat unchanged.
5. Review binary screenshot diffs by route and viewport before staging them.
6. Run the listed gate after staging each commit. Do not amend a prior commit
   to absorb an unrelated milestone.

## Ordered commits

### 1. `feat: establish canonical contract and projection plane`

Include:

```text
packages/contracts/**
packages/ai/catalog/components.json
packages/ai/bin/t7ui.mjs
generated/**
packages/agent/generated/**
scripts/generate-contract-projections.mjs
scripts/verify-contracts.mjs
scripts/verify-slice-a.mjs
```

Include the root command additions from `package.json` and the corresponding
lockfile changes only if they are required by these contract/projection
commands. Keep unrelated package-bundle changes out of this commit.

Gate:

```text
node scripts/generate-contract-projections.mjs --check
pnpm test:contracts
pnpm test:slice-a
```

Expected result: typed contracts remain the source of truth; both projection
roots are reproducible; no legacy catalog fallback is reintroduced.

### 2. `feat: isolate agent core and node runtime boundary`

Include:

```text
packages/agent/package.json
packages/agent/src/**
consumer-tests/entity-list-consumer/**
scripts/verify-adoption.mjs
research/11-ai-native/**
```

Keep the boundary evidence and historical gap ledger together. Do not rewrite
`BENCHMARK_GAP-01`, promote the Independent Adoption gate, or claim mandatory
browser execution of the full agent runtime.

Gate:

```text
pnpm typecheck
pnpm test:adoption:static
```

The external packed-artifact install/build benchmark remains the distribution
proof for this commit; the registry is not contacted.

### 3. `feat: add bounded brand and recipe-family proofs`

Include:

```text
apps/playground/src/brand-expression.tsx
apps/playground/public/brand-proof/learning-field.svg
scripts/verify-brand-expression.mjs
scripts/verify-recipe-family.mjs
tests/brand-expression.spec.ts
research/12-brand-expression/**
research/13-recipe-families/**
```

The two allowed profiles remain `neutral-product` and `aapm-academy`. The
recipe-family kernel remains shared and no additional recipe migration is
introduced.

Gate:

```text
pnpm test:brand-expression
pnpm test:recipe-family
```

Expected result: same canonical anatomy with profile-driven expression and
deterministic Entity List/Entity Detail family behavior.

### 4. `feat: bundle private ui package with tokens and motion`

Include:

```text
packages/tokens/**
packages/ui/package.json
packages/ui/src/**
packages/ui/scripts/**
packages/ui/vite.config.ts
packages/ui/LICENSE.md
packages/ui/README.md
packages/ui/THIRD_PARTY_NOTICES.md
```

Include root `package.json`/`pnpm-lock.yaml` entries that belong to package
build and verification in this commit, keeping contract-only command changes
in Commit 1 where possible.

Gate:

```text
pnpm --filter @ten4seven/tokens test
pnpm package:build
pnpm package:verify
```

Expected result: one self-contained private package, bundled tokens/icons/
motion, no workspace runtime dependency, and `UNLICENSED` ownership boundary.
Leave the existing Vite chunk-size advisory unchanged.

### 5. `feat: polish playground theme studio and reference surfaces`

Include:

```text
apps/playground/package.json
apps/playground/src/App.tsx
apps/playground/src/app.css
apps/playground/src/component-proofs.tsx
apps/playground/src/playground-routes.ts
apps/playground/tsconfig.json
docs/ai/THEMING.md
```

Include other AI documentation only when the hunk directly documents the UI
behavior shipped here. The implementation scope is limited to the already
validated semantic Global Controls, role-based live preview, typography
specimens, motion behavior, overlay alignment, public-shell spacing, and
responsive overflow fixes. Do not add a new recipe or profile in this commit.

Gate:

```text
pnpm typecheck
pnpm build
pnpm test:consistency
```

Expected result: human-facing Theme Studio detail remains richer than the
agent-facing profile contract, while the same root tokens drive the reference
surfaces.

### 6. `test: lock interaction and visual regression evidence`

Include:

```text
tests/reference-screen-renders.spec.ts
tests/system-coherence.spec.ts
tests/visual-regression.spec.ts
tests/workbench-interaction.spec.ts
tests/expressive-blocks.spec.ts-snapshots/**
tests/reference-screen-renders.spec.ts-snapshots/**
tests/system-coherence.spec.ts-snapshots/**
tests/visual-regression.spec.ts-snapshots/**
```

Stage the 20 intentionally refreshed baselines with their route changes. The
5 semantic-icon baselines require an explicit review decision and should be
staged here only if the icon-system diff is included in this same commit; they
must not be included by an undifferentiated snapshot glob.

Gate:

```text
pnpm exec playwright test --config=<fresh local config> --workers=1
```

Expected result: the complete current suite remains green, with responsive
geometry, overlay anchors, chart/donut motion, public shell spacing, and cart
surface behavior covered by deterministic tests.

### 7. `docs: record stabilization checkpoint`

Include only the documentation and repository-operation files that remain
after the implementation commits have been staged and reviewed:

```text
AGENTS.md
README.md
llms.txt
docs/ai/AI_QUICKSTART.md
docs/ai/COMPONENT_SELECTION.md
research/05-v1/GATE_V1_FINAL_POLISH.md
.gitignore
.prettierignore
research/14-stabilization/**
```

This commit is optional if the earlier commits already contain the relevant
documentation hunks. The six `research/14-stabilization` files must remain
together if committed.

Gate:

```text
pnpm format:check
git diff --check
```

## Final ordered validation after staging

Only after the selected atomic commits are staged/committed should the full
release check be repeated:

```text
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm package:build
pnpm package:verify
pnpm test:consistency
pnpm test:adoption:static
pnpm exec playwright test --workers=1
git diff --check
```

The in-app browser review at `http://127.0.0.1:4173/theme-studio` remains an
independent visual check. It is not claimed by this plan while the endpoint is
refusing connections.

## Stop rule

This is the end of the stabilization slice. Do not begin Brand Profile work,
migrate another recipe, add visual components, redesign existing routes,
publish packages, optimize the Vite chunk, or commit automatically in the
same run.
