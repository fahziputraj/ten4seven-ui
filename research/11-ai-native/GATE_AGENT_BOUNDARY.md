# Gate — Agent Runtime Boundary

Status: **PASS — bounded slice complete**
Verified: 2026-08-31
Scope: split `entity-list` resolver into pure core and Node loader
Fresh agent context: **NOT VERIFIED**

## Decision

The Adoption Boundary Hardening slice passes. The resolver/composer is now
environment-neutral when used through `@ten4seven/agent/core`; compact
filesystem loading is isolated to `@ten4seven/agent/node`; generated
projections are exposed through `@ten4seven/agent/generated`; and every
environment uses the same core implementation.

This is a PASS for the bounded boundary slice only. It does not promote the
historical [Independent Adoption Benchmark gate](GATE_INDEPENDENT_ADOPTION.md)
from `CONDITIONAL PASS` to `PASS`.

## Criteria

| Criterion                                  | Result       | Evidence                                                                                                                                  |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Pure core accepts normalized contract data | PASS         | `packages/agent/src/core.mjs` exposes `createEntityListResolver`, `resolveEntityListIntent`, and `composeEntityList` with contract input. |
| Core has no Node coupling                  | PASS         | Static source check found no `node:` import, `require`, or filesystem access in `core.mjs`.                                               |
| Node loader owns compact projection access | PASS         | `packages/agent/src/node.mjs` is the only loader and delegates to `core.mjs`.                                                             |
| No duplicate resolver                      | PASS         | `runtime.mjs` is a re-export shim; root and `/node` both use the same Node-bound core instance.                                           |
| Explicit package subpaths                  | PASS         | `@ten4seven/agent/core`, `/node`, `/generated`, and backward-compatible `/runtime` exports are packed.                                    |
| Packed artifact install                    | PASS         | `@ten4seven/contracts` and `@ten4seven/agent` repacked; external `pnpm install --force` passed.                                           |
| `link:` dependencies                       | PASS         | External benchmark package-manifest check: `0`.                                                                                           |
| `workspace:` dependencies                  | PASS         | Packed agent manifest resolves contracts as `0.1.0`; external check: `0`.                                                                 |
| Source workspace resolution                | PASS         | External resolution remains outside `D:\SA\ten4seven-ui`; source imports `0`.                                                             |
| Core/Node parity A/B/C                     | PASS         | All three benchmark scenarios matched composition and full resolution output.                                                             |
| Retrieval regression                       | PASS         | `84,135` compact runtime bytes, `358,487` legacy bytes, `23.47%` compact share, `76.53%` reduction.                                       |
| Full-catalog fallback regression           | PASS         | Compact fallback count remains `0` for A/B/C.                                                                                             |
| Decision ledger regression                 | PASS         | Compact agent-owned anatomy decisions remain `0`.                                                                                         |
| Browser core import                        | PASS         | External Vite browser bundle imports `@ten4seven/agent/core`; production build passed.                                                    |
| Full agent browser execution               | NOT REQUIRED | Build-time/CLI Node path remains primary; no browser-mandatory claim is made.                                                             |
| Fresh agent context                        | NOT VERIFIED | Explicitly remains open and is not remediated by code.                                                                                    |

## Regression evidence

### External benchmark

```text
pnpm install --force      PASS
pnpm benchmark            PASS
pnpm build                PASS
```

The three compositions are byte-for-byte equivalent between the Node loader and
the pure core for:

- Scenario A — operational invoice list;
- Scenario B — reduced customer directory;
- Scenario C — exception queue.

The browser consumer displays `core parity` for the current scenario, proving
that the browser-safe core import and Node/build-time result agree without
importing the filesystem-backed Node loader into the browser entrypoint.

### Root validation

The complete root validation was rerun after the boundary change:

- `pnpm test` — PASS;
- `pnpm typecheck` — PASS;
- `pnpm format:check` — PASS;
- `pnpm test:consistency` — PASS;
- `pnpm test:adoption:static` — PASS;
- `pnpm build` — PASS;
- `pnpm package:verify` — PASS;
- `git diff --check` — PASS.

The production build retains the existing non-blocking chunk-size advisory.

### Browser regression

The external consumer was checked through the in-app browser at
`http://127.0.0.1:4184/`:

- page identity and title: PASS;
- meaningful non-blank screen: PASS;
- framework error overlay: absent;
- visible `core parity`: PASS;
- A quick-detail and bulk interaction: PASS;
- B reduced anatomy and route boundary: PASS;
- C ready, loading, error, filtered-empty: PASS;
- C mobile table wrapper scroll boundary: PASS;
- C tablet viewport: PASS;
- error-level console logs: `0`.

Current boundary screenshots and raw runner output are preserved under
[`evidence/`](evidence/), including the requested desktop, mobile, tablet,
detail, navigation, and state renders.

## Gap disposition

- `BENCHMARK_GAP-01`: historical install failure retained; remediated for
  artifact repack and passed external install with explicit local private
  package override.
- `BENCHMARK_GAP-02`: closed specifically as **Node coupling remediated through
  explicit core/node separation**. This does not claim that the complete agent
  must execute in the browser.
- `FRESH_AGENT_CONTEXT: NOT VERIFIED`: remains open exactly as required.
- Registry publication: remains a future distribution gate.

## Stop rule

This bounded slice is complete. Stop now. Do not begin Brand Profile, migrate
another recipe, publish packages, redesign routes, or commit/push/deploy in the
same run.
