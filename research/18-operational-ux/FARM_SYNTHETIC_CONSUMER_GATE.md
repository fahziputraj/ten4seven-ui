# T7-FARM-COMPOSE-001 — Farm Synthetic Consumer Completeness Proof

Status: **scoped PASS — COMPOSED + PROVEN**
Date: 2026-09-06
Parent runner: **T7-AAPM-AGENTIC-001 / Issue #3**
Executable gate: **Gate 12 — Farm synthetic consumer completeness proof**
Stacked base: **T7-CONTRACT-OPS-004 / `d5410dd`**

## Gate decision

The bounded Farm consumer target from the AAPM continuation handoff is now
proven in the existing playground without creating a Farm repository or adding
Farm behavior to `@ten4seven/ui`:

```text
AppShell
    ↓
Authorized Farms
    ↓
Farm context selector
    ↓
Farm Overview
    ├ Eggs
    ├ Population
    ├ Mortality
    ├ Hen Day
    ├ Feed Intake
    └ FCR
```

The route is a deterministic synthetic consumer surface at
`/farm-synthetic-proof`. It composes implemented ten4seven contracts for the
shell, navigation, selection, identity context, metrics, loading, and safe
recovery states. The route is intentionally hidden from the main library and
reference navigation so that a proof fixture cannot be mistaken for a Farm
product route.

No new generic component was justified. `AppShell`, `Sidebar`, `Select`,
`PageHeader`, `RecordSummary`, `KeyValueList`, `KPICluster`, `Alert`,
`Spinner`, `StateView`, `Badge`, and `Button` express the complete bounded
behavior with the existing canonical APIs.

## Classification matrix

| Requirement                                                                                   | Classification                | Completion state              | Evidence                                                                                                                           |
| --------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Shared application frame for the Farm consumer                                                | COMPOSE                       | COMPOSED + PROVEN             | `AppShell` with canonical sidebar, topbar, and bounded content; desktop/mobile browser proof                                       |
| Authorized Farms navigation                                                                   | COMPOSE                       | COMPOSED + PROVEN             | `Sidebar` group labelled `Authorized Farms`, three synthetic authorized contexts, active state, responsive drawer/navigation proof |
| Farm context selector                                                                         | COMPOSE                       | COMPOSED + PROVEN             | Canonical `Select` labelled `Farm context selector`; context switch updates only supplied fixture values                           |
| Farm Overview identity and ownership context                                                  | COMPOSE                       | COMPOSED + PROVEN             | `RecordSummary` and `KeyValueList` expose farm identity, region, owner, and snapshot time                                          |
| Eggs, Population, Mortality, Hen Day, Feed Intake, and FCR                                    | COMPOSE                       | COMPOSED + PROVEN             | Six-item canonical `KPICluster`; values are static consumer-supplied strings, with no UI calculation                               |
| Loading state                                                                                 | COMPOSE                       | COMPOSED + PROVEN             | Canonical `Spinner` with live loading copy and no network request                                                                  |
| Current state                                                                                 | COMPOSE                       | COMPOSED + PROVEN             | Six metrics and current snapshot alert rendered for each authorized synthetic farm                                                 |
| No-data state                                                                                 | COMPOSE                       | COMPOSED + PROVEN             | Canonical `StateView state="empty"` with non-destructive recovery action                                                           |
| Error state                                                                                   | COMPOSE                       | COMPOSED + PROVEN             | Canonical `StateView state="error"` with local synthetic retry action                                                              |
| Out-of-scope / not-found safe state                                                           | COMPOSE                       | COMPOSED + PROVEN             | Canonical permission/unavailable `StateView` variants; no unauthorized data is rendered                                            |
| New Farm-specific generic primitive                                                           | READY                         | READY / not required          | Existing implemented contracts cover the repeated behavior; no component gap was found                                             |
| Farm API, data fetching, authorization policy, calculations, persistence, and ERP integration | PRODUCT OWNED                 | PRODUCT OWNED                 | Explicitly absent from this proof; consumer must provide these at the future Farm boundary                                         |
| AAPM brand/license and production Farm distribution                                           | DEFERRED WITH EXPLICIT REASON | DEFERRED WITH EXPLICIT REASON | Adoption remains conditional on owner authorization and ECO-ADR-004; no publication or Farm repository is created here             |

## Source and ownership boundary

**SOURCE:** the continuation handoff's Farm Web adoption gate requires a
synthetic consumer smoke for exactly the bounded composition above and states
that it must not connect ERP, implement Farm business API in ten4seven, or
create a permanent Farm implementation repository.

**SOURCE:** the AAPM reference-adoption decision says the existing operational
patterns are design-system building blocks, while actual Farm entities, data
volumes, roles, permissions, latency, optimistic updates, offline behavior,
and audit storage remain unknown until the future product repository.

Ten4Seven owns the generic shell, navigation semantics, selection behavior,
layout, responsive behavior, metric presentation contract, and safe state
surfaces. A Farm consumer owns the authorized farm list, entity truth, metric
meaning and freshness, API/data fetching, authorization, business
calculations, route transitions, actions, and persistence. This proof supplies
only static synthetic strings and local state transitions.

## Implementation path

| Plane                      | Evidence                                                                  | Result                                                                                      |
| -------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Synthetic consumer surface | `apps/playground/src/farm-synthetic-proof.tsx`                            | Added a bounded Farm-shaped consumer composition using only implemented canonical exports   |
| Refresh-safe entry point   | `apps/playground/src/playground-routes.ts`, `apps/playground/src/App.tsx` | Added hidden deterministic `/farm-synthetic-proof` route with title/description metadata    |
| Responsive composition     | `apps/playground/src/app.css`                                             | Added token-driven context grid, control layout, loading surface, and mobile collapse rules |
| Browser proof              | `tests/farm-synthetic-proof.spec.ts`                                      | Added current/context-switch, state matrix, mobile navigation/overflow, and axe assertions  |

No contract, catalog, generated projection, or package API was changed in this
gate. The Entity 360 typed contract from Gate 11 remains the reusable
relationship-context contract; this route is its synthetic consumer proof, not
a new Farm recipe.

## Runtime and browser evidence

Runtime URL: `http://127.0.0.1:4185/farm-synthetic-proof`

- Desktop `1440×900`: the `Authorized Farms` navigation, context selector,
  selected farm identity, and six Farm Overview metrics are visible. Switching
  to Farm Central replaces the supplied fixture values and keeps the state
  `current`.
- Mobile `390×844`: `AppShell` moves the sidebar into its canonical mobile
  navigation drawer. Farm South selection remains reachable, the metric grid
  remains readable, and the route has no document overflow.
- Loading renders a live-labelled spinner and explanatory copy.
- No data renders an empty state; an error renders an error state; out-of-scope
  renders a permission-safe state; not-found renders an unavailable safe state.
- Recovery actions only return to the local current fixture. No action calls an
  API, evaluates authorization, changes a metric, or persists data.
- The route contains no ERP, Farm API, real credentials, production records, or
  external Farm distribution behavior.

## Verification matrix

### Scoped PASS

- `pnpm typecheck` — PASS after the canonical package artifact was built.
- `pnpm package:build` — PASS (ESM/CJS `@ten4seven/ui` artifact).
- Isolated Chromium run against `http://127.0.0.1:4185` with
  `tests/farm-synthetic-proof.spec.ts` — PASS; **3 tests passed**:
  - current authorized composition, context switching, six metrics, and
    serious/critical axe assertions;
  - loading, no-data, error, out-of-scope, and not-found state matrix;
  - mobile authorized navigation, context switching, error state, and overflow.
- A repository-default Playwright attempt was not used as gate evidence because
  `reuseExistingServer` attached to an older `127.0.0.1:4173` checkout whose
  route table did not contain this hidden proof route; the isolated server above
  served the committed worktree and passed all assertions.
- `pnpm build` — PASS (playground production build).
- Targeted Prettier check over the changed app, route, CSS, and test files —
  PASS.

### Baseline debt / not a gate blocker

- Repository-wide `pnpm format:check` remains the existing baseline failure
  from CRLF/formatting drift; changed files pass targeted formatting.
- Repository-wide `pnpm test` stops at the pre-existing generated-contract
  verifier because the fresh Windows checkout presents
  `generated/agent-index.json` with CRLF while the deterministic projection is
  LF; this is an EOL baseline issue before `pnpm test:slice-a`, not a Gate 12
  route failure. Gate 11 already recorded contract parity PASS after its
  explicit generation step.
- The subsequent component-token-coverage CRLF/LF mismatch remains an existing
  baseline blocker when the root suite reaches that stage.
- `pnpm test:consistency` retains the known `styles.css:4232 raw shadow`
  violation from earlier SectionNavigation work; this proof does not alter
  unrelated component CSS.

## Stop-condition audit and handoff

No donor lookup, runtime dependency, breaking public API, semantic recipe
rewrite, business calculation, authorization implementation, ERP/API access,
production data, `aapm_prod` access, or permanent Farm repository was needed.
Generic versus product ownership is explicit, and no component gap remains in
the bounded synthetic target.

Gate 12 is safe to close as **COMPOSED + PROVEN**. The next action is not
another generic component build: production Farm adoption remains conditional
and must stop at evidence if it requires real Farm API/business behavior,
permissions, license authorization, or repository creation.
