# Gate P0 — AI-native contract normalization

Status: **PASS**
Verified: 2026-08-31
Scope: typed contract normalization and the first `entity-list` decision slice only.

## Decision

The repository now has a canonical contract plane for the work that is in scope
for P0. The contract plane owns the normalized `ThemeProfile`, motion role
profiles, the `entity-list` decision contract, the alias map, and ownership
rules. It generates compact agent projections without changing the existing
runtime provider, reference routes, component APIs, or human catalog behavior.

The full human catalog remains a compatibility surface for recipes that have
not yet been migrated. `entity-list` is the only recipe with full decision
metadata in this slice. That boundary is intentional and prevents a broad
recipe migration from becoming an unverified second source of visual behavior.

## P0 implementation

| Area                          | Result | Evidence                                                                                                                                                                 |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Canonical typed contracts     | PASS   | `packages/contracts/src/types.ts`, `theme-profile.ts`, `entity-list.ts`, and `canonical.ts`                                                                              |
| ThemeProfile aggregate        | PASS   | `appearance`, `palette`, `action`, `accent`, `canvas`, `chart`, `radius`, `density`, `typography`, `motion`, and `elevation` are normalized together                     |
| Legacy compatibility          | PASS   | `normalizeThemeProfile()` and `themeProfileToLegacyConfig()` round-trip the default profile while retaining `primary`, `radiusValue`, and `motionDuration` compatibility |
| Semantic motion               | PASS   | `minimal`, `calm`, `balanced`, and `lively` resolve to `fast`, `interaction`, `state`, `enter`, `exit`, `reveal`, `chart`, and `loop` role timings                       |
| Entity List decision metadata | PASS   | Required, conditional, forbidden, state, responsive, intent, and rationale decisions live in `packages/contracts/src/entity-list.ts`                                     |
| Generated projections         | PASS   | `generated/agent-index.json`, `components.compact.json`, `recipes.compact.json`, `aliases.json`, and `ownership-rules.json`                                              |
| Compact retrieval             | PASS   | `63,229` bytes compact component/recipe projection vs `275,790` bytes full component/recipe catalog (`22.9%` of the full size)                                           |
| Reproducibility               | PASS   | `pnpm test:contracts` compares every generated file byte-for-byte with the current typed source and adapter inputs                                                       |

## Automated gate evidence

The following checks passed after the P0 changes:

- `pnpm test`
  - contract gate;
  - token tests: 6 tests;
  - AI catalog and cold-start checks;
  - component-system checks.
- `pnpm --filter @ten4seven/contracts typecheck`
- `pnpm typecheck`
- `pnpm format:check`
- `pnpm test:consistency`
- `pnpm test:adoption:static`
- `pnpm build`
- `pnpm package:verify`
- `git diff --check`

The production build still reports the existing non-blocking Vite chunk-size
advisory. No route, visual surface, component API, or screenshot baseline was
changed by P0.

## Explicit checks covered by `pnpm test:contracts`

- alias targets exist and are implemented;
- the compatibility catalog agrees with the canonical alias map;
- recipe component references resolve to implemented contracts;
- `required`, `conditional`, and `forbid` decisions do not overlap;
- entity-list state vocabulary is closed and valid;
- entity-list responsive modes are closed and valid;
- typed `ThemeProfile` round-trips through the legacy provider config;
- compact projections remain materially smaller than the full catalog;
- all generated projections remain reproducible.

## Deliberate non-goals

P0 does not add a brand-profile system, migrate the other recipes, redesign
Theme Studio or the reference routes, add new visual components, or introduce
consumer-owned business behavior. Those remain outside this gate.

## Next approved slice

With this gate passed, the next bounded step is Slice A:

```text
typed entity-list intent
  → deterministic resolver
  → canonical scaffold
  → isolated consumer proof
```

The resolver must read compact projections by default, keep domain data and
handlers consumer-owned, and expose `t7ui recipe inspect entity-list` plus
`t7ui compose entity-list`. No further recipe or brand-profile work should
start until the Slice A gate exists.
