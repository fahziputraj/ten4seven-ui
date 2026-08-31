# Gate — Brand Expression Plane / Slice B

Status: **PASS — bounded slice complete**
Verified: 2026-08-31
Scope: canonical Authentication recipe and exactly two initial BrandProfiles
Fresh agent context: **NOT VERIFIED**

## Decision

Slice B passes its bounded objective: the same canonical Authentication recipe
and canonical UI contracts resolve into two materially different visual
expressions through explicit `BrandProfile` data, without a second design
system or agent-owned brand direction decisions.

This gate does not promote the historical Independent Adoption gate. That gate
remains **CONDITIONAL PASS**. Registry publication remains a future
distribution concern.

## Criteria

| Criterion                            | Result           | Evidence                                                                                                                             |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Exactly two initial profiles         | PASS             | `neutral-product` and `aapm-academy` are the only `BRAND_PROFILE_IDS` and generated profile entries.                                 |
| One canonical Authentication recipe  | PASS             | `packages/contracts/src/authentication.ts` defines `auth` once; both routes consume the same compact recipe.                         |
| Same required component anatomy      | PASS             | Both resolutions return `Surface`, `Input`, `PasswordInput`, `ActionFooter`; `scripts/verify-brand-expression.mjs` asserts equality. |
| Material visual difference           | PASS             | Desktop proof geometry differs: centered vs split composition, low vs high media prominence, and distinct media filter/layout.       |
| No second design system              | PASS             | BrandProfile contains expression metadata only; route uses existing `@ten4seven/ui` primitives and semantic tokens.                  |
| Zero agent-owned brand decisions     | PASS             | Nine-entry decision ledger reports `agentOwned: 0`; both core and Node outputs report `agentOwnedDecisionCount: 0`.                  |
| Pure core boundary                   | PASS             | `packages/agent/src/core.mjs` receives normalized data and has no Node or filesystem coupling.                                       |
| Node convenience boundary            | PASS             | `packages/agent/src/node.mjs` loads compact projections and delegates to the same core resolver.                                     |
| Generated projection freshness       | PASS             | `pnpm test:brand-expression` compares both generated roots with `buildProjections()`.                                                |
| CLI package path                     | PASS             | `t7ui brand resolve auth --profile=aapm-academy` returns the compact Node resolution.                                                |
| Responsive boundedness               | PASS             | `tests/brand-expression.spec.ts` checks both profiles at 1440x900, 840x900, 390x844, and 360x800 with no horizontal overflow.        |
| Canonical form interaction           | PASS             | E2E checks password reveal, local demo status, and profile switch navigation.                                                        |
| Other recipe migration               | PASS             | Not performed; only `auth` receives expression metadata and proof routes.                                                            |
| Generic component/fork scope         | PASS             | No new package primitive or Button/Input/Card/Form fork was added.                                                                   |
| Package publication                  | NOT RUN          | Explicitly out of scope for this slice.                                                                                              |
| Commit/push/deploy                   | NOT RUN          | Explicitly out of scope for this slice.                                                                                              |
| Historical Independent Adoption gate | CONDITIONAL PASS | Retained unchanged; this slice does not rewrite historical evidence.                                                                 |
| FRESH_AGENT_CONTEXT                  | NOT VERIFIED     | Remains open exactly as required.                                                                                                    |

## Validation commands

```text
pnpm test                                   PASS
pnpm exec playwright test                   PASS (103 tests)
pnpm test:brand-expression                  PASS
pnpm exec playwright test tests/brand-expression.spec.ts  PASS (6 tests)
pnpm typecheck                              PASS
pnpm format:check                           PASS
git diff --check                            PASS
pnpm build                                   PASS
pnpm package:verify                          PASS
pnpm test:consistency                        PASS
pnpm test:adoption:static                    PASS
```

The full E2E run covered existing catalog, expressive blocks, public showcase,
operations tracker, Theme Studio, overlay, interaction, visual baseline, and
the new Brand Expression proof. The two proof routes were also checked directly
in the local browser: image loading, page identity, no horizontal overflow, and
zero warning/error console entries.

The existing root and external development servers remain available for
continued manual inspection at `http://127.0.0.1:4173` and
`http://127.0.0.1:4184`. No deployment or registry publication is implied by a
local browser pass.

## Stop rule

STOP after this bounded Slice B gate. Do not begin BrandProfile expansion,
Marketing Home, Entity List migration, another recipe, package publication,
commit, push, or deploy in the same run.
