# AAPM Reference Adoption

Status: **reference-ready; production adoption remains conditional**  
Reference route: `/operational-patterns`

## What the route is

The AAPM operational route is a deterministic design-system reference. It
shows how generic Ten4Seven contracts can express Farm-shaped operations
without creating Farm application code.

Its fixture language includes Warehouse 02, an order, vehicle capacity,
delivery stops, receiving reconciliation, a supplier relationship, accountable
owners, and decision evidence. These records exist only to make state and
workflow semantics inspectable.

## What the route is not

- not `farm.aapm.co.id`;
- not an ERP client;
- not a source of forecasts, route optimization, inventory truth, SLA logic,
  approval policy, or authorization;
- not a database/API contract;
- not a second AAPM design system;
- not permission to publish or redistribute `@ten4seven/ui`.

The route explicitly labels itself as an AAPM fixture and says it is not
production ERP. Its decision action updates local fixture state only and states
that no API or production inventory changed.

## Adoption architecture

```text
AAPM Brand Core
  → AAPM semantic theme/profile adapter
    → generic @ten4seven/ui tokens, components, and operational recipes
      → Farm-owned records, permissions, validation, routing, APIs, and events
```

**SOURCE:** Ten4Seven already supports semantic primary/accent configuration,
theme recipes, runtime preferences, scoped themes, and bounded variable
overrides.

**PROPOSED:** the Farm adapter may map AAPM Green `#318139` to the semantic
primary role and AAPM Orange `#D4451A` to the semantic accent role. The mapping
belongs in an AAPM/Farm profile adapter, not in generic primitives or the
operational recipe catalog. No such hardcoded mapping was added in this work.

## Farm integration decision

**INFERRED:** the eleven mature operational recipes are sufficient design-system
building blocks for Farm discovery and architecture work. Farm should select a
small subset per route and retain the shared semantic model:

```text
OBJECT + STATE + MOVEMENT + EXCEPTION + OWNER + NEXT ACTION + TRACE
```

**UNKNOWN:** actual Farm entities, data volumes, roles, permissions, API
latency, optimistic-update behavior, offline behavior, and audit-storage
guarantees. These require the future product repository and cannot be inferred
from the fixture.

## Next.js consumer dependency

The separate `T7UI-NEXT-001` artifact proof validates Next.js `16.3.4`, React
and React DOM `19.2.8`, TypeScript `5.9.3`, App Router, a Server Component route,
an explicit client provider boundary, package CSS/fonts/icons, overlays,
hydration, one React runtime, and axe smoke. The complete contract is
`docs/integration/NEXTJS_APP_ROUTER_COMPATIBILITY.md` and the architecture
decision is `docs/adr/ADR-012-next-app-router-client-boundary.md`.

## License boundary

**OBSERVED:** the repository is public while the package remains `private` and
`UNLICENSED` under `packages/ui/LICENSE.md`, which describes an internal
commercial license and restricts unrelated redistribution/publication.

**UNKNOWN:** whether PT AAPM is already the controlling licensee or has a
written authorization covering the Farm deployment.

**PROPOSED:** record the authorized-use/distribution decision in
`ECO-ADR-004 — Shared Design System Implementation` before creating the Farm
repository. This work does not relicense, publish, or transfer ownership.

## Handoff decision

```text
Is ten4seven-ui suitable for farm.aapm.co.id?
CONDITIONAL

Design-system capability:
PASS — operational patterns and the Next artifact contract are verified.

Production/Farm business behavior:
UNVERIFIED — intentionally outside this repository and work item.

License authorization:
UNKNOWN — owner decision required.

AAPM Pre-Repository Gate:
CONDITIONAL — record the license/authorization decision in ECO-ADR-004 first.
```
