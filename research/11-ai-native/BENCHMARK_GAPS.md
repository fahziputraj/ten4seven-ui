# Independent adoption benchmark gaps

Status: **OPEN — conditional gate**
Verified: 2026-08-31

This ledger records benchmark failures before any remediation. It must not be
rewritten into a clean result after a package or resolver change.

## BENCHMARK_GAP-01 — agent artifact has a workspace-relative dependency

- Category: `package gap`
- First observed: 2026-08-31
- Mode: external packed-artifact install
- Reproduction: install `ten4seven-agent-0.1.0.tgz` and
  `ten4seven-contracts-0.1.0.tgz` from the independent benchmark directory
  with a normal `pnpm install`.
- Observed failure: pnpm resolved the agent tarball's
  `@ten4seven/contracts: file:../contracts` dependency to `D:\SA\contracts`,
  which does not exist.
- Impact: the unmodified agent tarball cannot be installed as a standalone
  external artifact. This blocks the external consumer proof until the
  package metadata is remediated or the final gate records a failure.
- Evidence: external install exit code `1`,
  `ERR_PNPM_LINKED_PKG_DIR_NOT_FOUND`.
- No benchmark result is inferred from this failed setup attempt.

## Remediation policy

The gap was recorded before any package metadata change. If remediation is
attempted, the original failure remains part of this ledger, the changed
artifact is repacked, and the external install is repeated from a clean
benchmark package directory. A passing post-remediation install does not erase
the discovery or claim that the original artifact was independently usable.

## Post-remediation state — 2026-08-31

`packages/agent/package.json` now uses the canonical internal
`workspace:*` dependency declaration. The repacked
`@ten4seven/agent@0.1.0` artifact contains the concrete dependency
`@ten4seven/contracts: 0.1.0`, and a clean external pnpm install succeeded
using the three local packed artifacts plus an explicit workspace-level local
tarball override for the private contracts package.

Therefore BENCHMARK_GAP-01 is **REMEDIATED FOR ARTIFACT REPACK**. It is not
rewritten as if the original artifact had passed, and the benchmark does not
claim a registry-public install because these packages are not currently
published to a registry.

## BENCHMARK_GAP-02 — agent runtime is Node-only when imported into a browser bundle

- Category: `package gap`
- First observed: 2026-08-31
- Mode: external consumer production build
- Reproduction: import `composeEntityList` from `@ten4seven/agent` in the
  browser entrypoint and run `vite build`.
- Observed signal: Vite externalized `node:fs` from the packed agent runtime;
  the browser bundle cannot execute the filesystem-backed resolver directly.
- Impact: the resolver is usable from a Node/build step, but the browser
  consumer must receive serialized resolver output or a future browser-safe
  package export. Direct browser import is not claimed by this benchmark.
- Benchmark handling: keep resolver execution in the external Node benchmark
  script, serialize its output into the consumer fixture, and render that
  output through `@ten4seven/ui`. This preserves package-boundary evidence
  without adding a second resolver or reading ten4seven source.

## BENCHMARK_GAP-02 remediation — 2026-08-31

Status: **CLOSED — Node coupling remediated through explicit core/node separation**

The resolver implementation is now split at an explicit package boundary:

- `@ten4seven/agent/core` contains the single pure resolver/composer and
  accepts normalized contract data as input;
- `@ten4seven/agent/node` loads compact projections with `node:fs` and delegates
  resolution/composition to the core;
- `@ten4seven/agent/generated` exposes the compact projection boundary;
- the root `@ten4seven/agent` export remains a Node/build-time convenience layer;
- `runtime.mjs` remains only as a backward-compatible Node shim and contains no
  duplicate resolver.

The core source has no `node:` import, `require`, or filesystem access. The
external benchmark imported `@ten4seven/agent/core` in the browser bundle,
compared its resolution and composition against the Node loader for A/B/C, and
the Vite production build passed. The full agent runtime is still not claimed
as required to execute in the browser; build-time/CLI resolution remains the
supported primary adoption path.

This closes the Node-coupling gap through separation, not through a claim that
the full agent runtime is browser-mandatory.

## Gate impact

The bounded benchmark is recorded as **CONDITIONAL PASS** in
`GATE_INDEPENDENT_ADOPTION.md`. The remaining conditions are the unverified
fresh-agent context and the pre-registry distribution caveat. Closing
BENCHMARK_GAP-02 does not rewrite the historical benchmark gate as `PASS`.
