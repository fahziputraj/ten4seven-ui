# T7-AAPM-001-Q06 — Farm P1 Reference Evidence

**Date:** 2026-09-11  
**Repository:** `D:\SA\ten4seven-ui`  
**Branch:** `feat/icons-aapm-iconify-expansion`  
**Queue reference:** `T7-AAPM-001-Q06-FARM-P1-REFERENCE-SLICE.md`  
**Predecessor gate:** `PASS WITH CONSTRAINTS FOR Q06` from Q05  
**Scope:** local Ten4Seven reference experience, route registration, static
fixtures, verification, and browser evidence only

## Gate outcome

**PASS WITH CONSTRAINTS FOR Q07**

Q06 delivers a deterministic, production-looking Farm P1 reference slice for
the first customer-platform value journey:

`Authenticate → Tenant Context → Farm → Flock/Cycle → Daily Operations → Farm Overview`

The route is a local presentation proof. It uses the generated `aapm-farm`
brand profile through the existing `ThemeScope` and composes implemented
Ten4Seven primitives and patterns. It does not add Farm business logic,
authentication, authorization, tenant resolution, API/database access, ERP
writes, or production AAPM adoption.

The queue document was treated as the bounded Q06 acceptance and evidence
reference, not as authority to change Farm services or business rules. Q05's
carried constraints remain open and are recorded separately below. Q07 was not
started.

## Scope and non-goals

Q06 covers:

- one refresh-safe Farm P1 reference route family;
- a simple first-value overview for a customer migrating from paper or Excel;
- Farm, flock, cycle, and tenant context presentation;
- safe fixture-only daily operation entry with local feedback;
- one Farm entity list/detail flow;
- Inventory as an optional attachable capability with lifecycle states;
- responsive desktop, tablet, and phone web composition;
- canonical component composition, token consumption, and focused browser
  accessibility evidence;
- a static verifier and focused Playwright suite for the route contract.

Q06 does not cover:

- real authentication, tenant/resource authorization, entitlements, or
  subscription evaluation;
- API, database, SQL, ERP, Farm service, or production AAPM source changes;
- persistence, synchronization, or real Farm writes;
- business-rule simulation beyond deterministic fixture presentation;
- a native application replacement or a new Farm-local primitive family;
- a giant all-modules dashboard or mandatory Inventory adoption;
- deployment, publishing, committing, pushing, merging, or snapshot rewriting.

## Route inventory

All paths are deterministic Vite entry points and are handled by the existing
playground shell. Direct refresh is supported for each path.

| Path                               | View                 | Purpose                                                                                                       |
| ---------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `/farm-reference`                  | Route entry          | Stable route-family entry; resolves to the overview view                                                      |
| `/farm-reference/overview`         | Farm overview        | First-value dashboard with KPI signals, today snapshot, journey, activity, and optional Inventory state       |
| `/farm-reference/daily-operations` | Daily operations     | Fixture-only entry form for eggs, feed, population, mortality, and date with correction/status feedback       |
| `/farm-reference/context`          | Farm context         | Tenant, farm, flock, and cycle context selection/display using canonical selectors and hierarchy presentation |
| `/farm-reference/flocks`           | Flocks & cycles      | Search/filterable Farm entity list with canonical `DataTable` and `DetailDrawer` inspection                   |
| `/farm-reference/inventory`        | Inventory capability | Optional capability presentation for not-entitled, setup-required, active, and suspended states               |

The route is registered in the playground route matcher, application render
branch, reference harness, route guidance, and reference cold-start checks.

## First-value journey

The overview leads with the customer value instead of a prose-heavy catalog:

1. The current Farm context is visible in the shell.
2. Four KPI signals summarize the current day: eggs, hen-day production, feed
   intake, and mortality.
3. A three-step milestone journey shows the handoff from context to today’s
   operation to review.
4. Today’s operation snapshot keeps the next action visible.
5. Activity and optional Inventory context are available without making
   Inventory a prerequisite for understanding the Farm journey.

Daily operations keeps entry fields grouped by the production facts a Farm
customer already understands: operation date, eggs collected, feed intake,
population, and mortality. Save is explicitly fixture-local and returns a
visible status/correction message rather than implying persistence.

## Component and pattern map

The route follows the canonical shell grammar:

`ThemeScope → AppShell → Sidebar → PageHeader → bounded route content`

| Route area       | Canonical composition                                                                                                                | Local responsibility                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Shell/navigation | `ThemeScope`, `AppShell`, `Sidebar`, `PageHeader`, `Button`, `T7Icon`                                                                | Route grouping, active-path navigation, and Farm reference identity  |
| Overview         | `KPICluster`, `Card`, `MilestoneTracker`, `ActivityFeed`, `ModuleState`, `Progress`, `StatusChip`                                    | Arrange first-value signals and optional capability context          |
| Daily operations | `FormGrid`, `Input`, `Select`, `FormActions`, `Progress`, `Card`                                                                     | Present fixture facts and local save/correction feedback             |
| Context          | `Select`, `HierarchyPicker`, `RecordSummary`, `KeyValueList`, `Card`                                                                 | Present tenant/farm/flock/cycle context without resolving authority  |
| Flocks & cycles  | `FilterToolbar`, `SearchInput`, `Select`, `DataTable`, `StatusChip`, `DetailDrawer`, `RecordSummary`, `ActivityFeed`, `KeyValueList` | Provide a readable list and one inspectable entity detail path       |
| Inventory        | `Select`, `ModuleState`, `Card`, `Progress`, `StatusChip`, `Button`                                                                  | Present optional module lifecycle fixtures and local review feedback |

No `Button`, `Input`, `Card`, `Select`, `DataTable`, `Drawer`, `ModuleState`,
navigation primitive, chart, icon provider, or overlay was recreated locally.
The route uses semantic `T7Icon` names and existing component contracts.

## Ownership and safety boundary

The fixture module owns only display values, route-local selection, and local
feedback state. Ten4Seven owns the canonical primitive contracts, semantic
tokens, shell behavior, responsive behavior, and accessibility behavior.

The Q06 route intentionally contains no `fetch`, `apiClient`, database,
`localStorage`, authorization, subscription, or permission-evaluation path.
Inventory states are selected from static fixtures; they do not claim to
represent a real entitlement decision. Daily operation save and correction
feedback are local presentation states; they do not write to Farm or ERP
systems.

No Farm business authority was moved into Ten4Seven. This is a reference slice
for composition and customer-facing interaction, not a production integration
or a replacement for Farm's existing domain ownership.

## Brand, theme, and assets

The route consumes the generated `aapm-farm` profile and its existing semantic
brand adapter through `ThemeScope`:

- profile: `aapm-farm`;
- theme recipe: the generated profile recipe;
- density: the generated profile density;
- role colors: resolved through the adapter's semantic values;
- geometry, elevation, typography, focus, control sizing, and motion: inherited
  from Ten4Seven tokens and canonical components.

The route does not introduce a Farm-local color palette or a second token
layer. Local selectors are structural composition hooks only.

The canonical AAPM asset collection was not present at
`docs/design-system/brand/assets` in this checkout. No logo or artwork was
invented, copied from an unverified source, or added to the route. Asset
distribution remains a documented follow-up constraint for a future governed
integration.

## Responsive evidence and observations

Q06 consumes the Q04 responsive shell bands rather than introducing a route
specific breakpoint system.

| Viewport           | Shell                                       | Farm P1 behavior                                                                                                                     |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Desktop `≥ 861px`  | Persistent canonical sidebar                | Two-column bounded content where comparison is useful; KPI cluster remains grouped and readable                                      |
| Tablet `541–860px` | Canonical collapsed/mobile navigation entry | Content groups collapse to a single readable column; controls and cards retain document order                                        |
| Phone `≤ 540px`    | Canonical AppShell navigation drawer        | Page metadata yields space, forms/actions stack, table content stays inside its scroll owner, and no document overflow is introduced |

The focused browser suite asserts desktop, tablet, and phone shell rendering,
mobile navigation drawer behavior, route navigation, bounded table behavior,
and no horizontal document/body overflow. The rendered local browser proof at
`http://localhost:4173/farm-reference/overview` shows the route title, five
named navigation items, four KPI values, the first-value journey, and the
optional Inventory state in one bounded composition.

## Accessibility and state presentation

- The focused Q06 axe check reports zero scoped `critical` or `serious`
  violations on the route's primary rendered surfaces.
- Navigation has an accessible name and five explicit route buttons.
- Form fields use visible semantic labels and retain normal document/focus
  order as layouts stack.
- `DataTable` exposes a named list surface and `DetailDrawer` owns inspection
  focus/close behavior through the canonical overlay contract.
- Fixture feedback uses live status semantics and visible text, not color
  alone.
- Inventory states are named as `Not entitled`, `Setup required`, `Active`,
  and `Suspended`; the state is not communicated only through tone or icon.
- Loading/empty/error/permission/setup/suspended concerns remain explicit at
  the generic component-contract boundary. Q06 presents the applicable
  optional-capability states with `ModuleState`; it does not simulate an
  external service response.

## Local override inventory

The Q06 CSS additions use `farm-p1-*` selectors for route layout and grouping:

- shell/content sizing and responsive grid composition;
- route-local card grouping and KPI layout;
- form, filter, table, detail, inventory, and feedback arrangement;
- bounded table text-width handling;
- small-screen stacking and overflow ownership.

These selectors do not define local colors, border radii, shadows, control
heights, typography scales, focus rings, animation keyframes, or a second
motion runtime. Those concerns remain owned by semantic variables and
canonical Ten4Seven components. The table text-width bound is a content-layout
override, not a new visual token.

## Design-system gap assessment

**Blocking gap:** none for the Q06 reference acceptance slice. Existing
implemented contracts cover the required shell, KPI, form, hierarchy, list,
detail, activity, milestone, module-state, and responsive behavior.

**Recorded constraint:** the local checkout does not contain the canonical AAPM
asset distribution. Q06 therefore uses the generated brand profile and
semantic adapter without claiming final logo/artwork adoption.

**No donor lookup:** no donor UI library or raw provider icon string was needed.

## KEEP / ADD / FIX

| Decision | Q06 disposition                                                                                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KEEP     | Canonical Ten4Seven primitives, shared token architecture, Q04 responsive shell behavior, Q05 control-plane presentation boundary, and the existing Farm Synthetic proof remain intact |
| ADD      | The deterministic Farm P1 route family, static journey fixtures, route verifier, focused Playwright suite, and this evidence record                                                    |
| FIX      | No shared contract or token fix was required to satisfy Q06; no duplicate Farm primitive family was introduced                                                                         |
| FUTURE   | Governed AAPM asset distribution, real consumer integration, and any production data/authority wiring remain future work and are not silently pulled into Q06                          |

## Verification matrix

| Check                                                        | Result     | Evidence / constraint                                                                                                                                                                                       |
| ------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:farm-reference`                                   | PASS       | Static route, canonical-component, profile, ownership-boundary, and forbidden-authority checks pass                                                                                                         |
| `pnpm test`                                                  | PASS       | Repository unit, contract, token, component, AI, responsive, and Q06 static gates pass                                                                                                                      |
| `pnpm typecheck`                                             | PASS       | Playground, contracts, agent package, and Q06 route types pass                                                                                                                                              |
| `pnpm build`                                                 | PASS       | Production Vite build succeeds; existing large-chunk advisory remains                                                                                                                                       |
| `pnpm exec playwright test tests/q06-farm-reference.spec.ts` | PASS       | 2 focused tests passed, including desktop/tablet/phone assertions, route interactions, drawer state, Inventory states, and scoped axe checks                                                                |
| Full `pnpm test:e2e`                                         | CONSTRAINT | 177 passed, 77 failed, 254 total; failures are outside the Q06 route and are existing baseline/expectation or visual-snapshot drift across unrelated suites; no Q06 test failed and no snapshot was updated |
| `pnpm format:check`                                          | CONSTRAINT | Repository-wide check reports 294 files requiring formatting; the new Q06 files were targeted-formatted and were not the reason for the broad warning set                                                   |
| `git diff --check`                                           | PASS       | No whitespace errors; Git emitted existing CRLF-normalization warnings for dirty tracked files                                                                                                              |
| Snapshot updates                                             | NOT DONE   | No snapshot was rewritten to absorb unrelated repository-wide visual drift                                                                                                                                  |
| Commit/push/merge/deploy                                     | NOT DONE   | No publication or integration action was authorized or performed                                                                                                                                            |

## Carried constraints and handoff

- The checkout was already materially dirty from the preceding governed work;
  unrelated edits, generated files, and snapshot state were preserved.
- Q05's broad full-e2e and format constraints remain open and are not silently
  reclassified as Q06 failures.
- Q06 is a local reference/harness proof. It does not prove AAPM runtime
  adoption, Farm API compatibility, tenant authority, database behavior, or
  production deployment.
- The missing canonical AAPM asset distribution is explicitly recorded instead
  of being replaced with invented or unverified artwork.
- Q07 has not been started.

PASS WITH CONSTRAINTS FOR Q07
