# T7-AAPM-001-Q05 — SaaS Control-Plane Pattern Evidence

**Date:** 2026-09-11  
**Repository:** `D:\SA\ten4seven-ui`  
**Branch:** `feat/icons-aapm-iconify-expansion`  
**Queue reference:** `T7-AAPM-001-Q05-SAAS-CONTROL-PLANE-PATTERNS.md`  
**Scope:** local Ten4Seven UI contract, catalog, agent retrieval, and harness work only

## Gate outcome

**PASS WITH CONSTRAINTS FOR Q06**

Q05 is implemented as a typed, generated, token-aware reference contract for
generic SaaS control-plane presentation patterns. The focused Q05 browser
suite passes across desktop, tablet, and mobile widths. The contract, AI
retrieval, unit, type, build, and focused browser checks pass.

The repository-wide format check and full browser suite remain constrained by
the pre-existing dirty-tree baseline and unrelated expectation/snapshot drift.
Those broad failures were not rewritten or reclassified as Q05 failures. No
snapshot was updated. Q06 has not been started.

The attached queue document was treated as the bounded acceptance reference,
not as authority to change AAPM business logic or platform services. The Q05
implementation does not add tenant/authentication/authorization evaluation,
resource resolution, entitlement evaluation, provisioning, billing, database,
API, or deployment behavior.

## Scope and non-goals

Q05 covers:

- a typed contract for reusable SaaS control-plane presentation patterns;
- generated projections and agent-facing retrieval for those patterns;
- one bounded `/saas-control-plane` reference route;
- static fixtures for context switching, module lifecycle, access/scope,
  audit/import/reconciliation, and the required unavailable states;
- composition from implemented Ten4Seven primitives and shared semantic
  tokens;
- responsive behavior inherited from the Q04 shell and component contracts;
- focused desktop/tablet/mobile browser evidence.

Q05 does not cover:

- tenant, organization, membership, subscription, entitlement, or billing
  persistence;
- permission or resource-scope evaluation;
- tenant/resource/module discovery or API/database fetching;
- activation, provisioning, retry, resume, suspension, or lifecycle
  mutations;
- AAPM application source, backend/schema changes, or product adoption;
- a second authorization, overlay, chart, or component runtime;
- publishing, staging, committing, pushing, merging, or deploying.

## Ownership boundary

The Q05 contract makes the system/consumer split explicit.

The platform/system owns the normalized pattern vocabulary, state vocabulary,
component relationship metadata, accessibility expectations, responsive
presentation rules, token roles, and AI retrieval guidance.

The consumer or host application owns tenant and resource values, registry and
entitlement facts, permission decisions, lifecycle facts, copy, callbacks,
navigation, and business actions. The route receives and presents static
consumer-owned fixture values; it does not compute authority. Verification
also rejects forbidden authority/data-boundary calls in the route source.

## Implementation map

| Area                 | Implementation                                                                                                            | Evidence                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Typed pattern source | `packages/contracts/src/saas-control-plane.ts`                                                                            | `SAAS_CONTROL_PLANE_CONTRACT`, 11 pattern contracts, 5 grouped reference views, shared state coverage                     |
| Contract registry    | `packages/contracts/src/canonical.ts`, `packages/contracts/src/index.ts`                                                  | `CANONICAL_CONTRACTS.saasControlPlane` and public contract export                                                         |
| Generated retrieval  | `scripts/generate-contract-projections.mjs`, `packages/agent/generated/index.mjs`, `packages/agent/generated/index.d.mts` | `generated/saas-control-plane.json`, agent projection, agent index entry                                                  |
| AI CLI retrieval     | `packages/ai/bin/t7ui.mjs`                                                                                                | Control-plane pattern lookup with direct recipe precedence preserved for legacy cold-start queries                        |
| Reference route      | `apps/playground/src/saas-control-plane-reference.tsx`                                                                    | Canonical shell, grouped navigation, static fixture values, semantic callbacks, no backend authority                      |
| Route registration   | `apps/playground/src/playground-routes.ts`, `apps/playground/src/App.tsx`, `apps/playground/src/reference-harness.tsx`    | Refresh-safe `/saas-control-plane` entry and app/harness route mapping                                                    |
| Route styling        | `apps/playground/src/app.css`                                                                                             | Bounded Q05 grouping/layout selectors using existing semantic token variables; canonical primitives own component visuals |
| Reference discovery  | `AGENTS.md`, `llms.txt`, `scripts/verify-reference-cold-start.mjs`                                                        | Q05 route is listed in reference routes and included in the cold-start route contract                                     |
| Static contract gate | `scripts/verify-saas-control-plane.mjs`                                                                                   | Generated parity, exact IDs, component usage, fixture coverage, ownership boundary, route map, and retrieval queries      |
| Browser proof        | `tests/q05-saas-control-plane.spec.ts`                                                                                    | Grouped fixture interaction and responsive overflow/navigation assertions                                                 |

## Pattern contract matrix

The typed source defines exactly eleven reusable patterns. These are
presentation contracts, not platform service contracts.

| Pattern                     | Required canonical components                  | Reference view   | Required states / facts                                                                                                                                             |
| --------------------------- | ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tenant-selector`           | `HierarchyPicker`, `Select`                    | `context`        | loading, error, ready; tenant/org value supplied by consumer                                                                                                        |
| `resource-selector`         | `HierarchyPicker`, `Select`                    | `context`        | empty, loading, disabled, ready; scope value supplied by consumer                                                                                                   |
| `module-catalog`            | `Card`, `Badge`, `Button`, `ModuleState`       | `module-catalog` | empty, loading, error, disabled, read-only, action-required, ready                                                                                                  |
| `module-activation`         | `MilestoneTracker`, `Progress`, `ModuleState`  | `activation`     | provisioning, resuming, suspended, dependency-unavailable, ready                                                                                                    |
| `setup-checklist`           | `MilestoneTracker`, `Progress`, `StatusChip`   | `module-catalog` | action-required, ready; checklist facts supplied by consumer                                                                                                        |
| `module-state-presentation` | `ModuleState`, `StatusChip`                    | `activation`     | not-available, not-entitled, setup-required, provisioning, resuming, suspended, dependency-unavailable, permission-denied, out-of-scope, read-only, action-required |
| `permission-scope`          | `ModuleState`, `HierarchyPicker`, `StatusChip` | `access`         | permission-denied, out-of-scope, read-only; decision supplied by consumer                                                                                           |
| `permission-matrix`         | `DataTable`, `StatusChip`                      | `access`         | empty, loading, error, ready; role/capability facts supplied by consumer                                                                                            |
| `activity-audit`            | `ActivityFeed`, `KeyValueList`                 | `trace`          | empty, loading, error, ready; actor/object/source facts supplied by consumer                                                                                        |
| `import-exception-review`   | `FileUpload`, `Progress`, `DataTable`, `Alert` | `trace`          | empty, loading, error, action-required, ready; import facts supplied by consumer                                                                                    |
| `mapping-reconciliation`    | `DataTable`, `StatusChip`, `Progress`          | `trace`          | empty, loading, error, action-required, ready; mapping/reconciliation facts supplied by consumer                                                                    |

The contract also records optional components, semantic icons, responsive
behavior, accessibility expectations, token roles, intent phrases, and
anti-pattern guidance so consumers and AI retrieval do not need to infer the
composition from a visual-only page.

## Reference route and fixtures

The route is intentionally one bounded reference surface with five grouped
views instead of a long prose catalog:

| View             | Purpose                                                                  | Static fixtures                                                                            |
| ---------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `context`        | Tenant/org and resource context switching                                | `q05-tenant-selector`, `q05-resource-selector`                                             |
| `module-catalog` | Module registry and setup-required → active presentation                 | `q05-module-catalog`, `q05-setup-checklist`                                                |
| `activation`     | Activation/provisioning progress and unavailable lifecycle state         | `q05-activation-progress`, `q05-suspended-module`                                          |
| `access`         | Permission denial, resource-scope denial, and role/capability comparison | `q05-permission-denied`, `q05-out-of-scope`, `q05-resource-scope`, `q05-permission-matrix` |
| `trace`          | Audit/activity, import exception review, and reconciliation status       | `q05-activity-audit`, `q05-import-exception-review`, `q05-mapping-reconciliation`          |

The module catalog toggle and lifecycle actions only change local fixture
feedback. They do not start work, resume work, provision a module, or call an
external service. The file upload is the canonical disabled fixture control;
it is present to show the exception-review contract without accepting a real
file.

## Responsive and interaction contract

Q05 consumes the Q04 viewport bands rather than inventing a route-specific
breakpoint system:

| Viewport           | Shell                                          | Q05 content behavior                                                                                                |
| ------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Desktop `≥ 861px`  | Sidebar and full route content                 | Context, state, and trace groups use bounded two-column layouts where comparison is useful                          |
| Tablet `541–860px` | Collapsed navigation with canonical menu entry | Q05 groups collapse to one column; cards keep their semantic order and bounded width                                |
| Mobile `≤ 540px`   | Drawer navigation and single-column content    | Heading metadata yields space, card heading rows wrap, controls retain document/focus order and touch-target tokens |

The focused browser suite asserts no document/body horizontal overflow at all
three widths, desktop sidebar visibility, narrow-screen mobile menu behavior,
dialog navigation, Escape close behavior, and the minimum mobile menu target.
The canonical `Select`, `HierarchyPicker`, `DataTable`, `FileUpload`, and
navigation/overlay contracts remain the interaction owners.

## Accessibility and state presentation

- Pattern states are named in the typed contract and are not conveyed by
  color alone.
- `ModuleState` owns semantic heading/description relationships and state
  icon/tone mapping.
- Canonical controls provide keyboard behavior, focus handling, and disabled
  semantics.
- The route exposes named navigation, named tables, and status output for
  fixture feedback.
- The mobile shell exposes the canonical menu dialog and Escape behavior.
- Focus order follows document order when Q05 groups stack.
- Permission, scope, lifecycle, import, and reconciliation facts remain
  visible as text and status labels rather than color-only signals.

## Token and visual consistency

Q05 uses the existing Ten4Seven token architecture and canonical component
contracts. The route-level CSS is limited to layout/grouping, text wrapping,
and bounded responsive composition; borders, radii, elevation, typography,
control sizing, state tone, icons, and interaction behavior come from the
shared primitives and semantic variables. No parallel Q05 primitive family or
local visual token layer was introduced.

The route therefore inherits the repository's unified card, status, module
state, table, overlay, icon, and motion language. The static fixture switches
are presentation-only and do not introduce a second motion or state runtime.

## AI and contract retrieval

The generated agent index exposes:

- source of truth: `packages/contracts/src/saas-control-plane.ts`;
- projection: `generated/saas-control-plane.json`;
- reference route: `/saas-control-plane`.

The Q05 retrieval gate proves these nine intent queries resolve to the typed
pattern IDs:

```text
tenant organization selector       → tenant-selector
resource scope selection           → resource-selector
module setup requirements          → setup-checklist
suspended module                   → module-state-presentation
permission denied                  → permission-scope
role permission matrix             → permission-matrix
audit timeline                     → activity-audit
import exceptions                  → import-exception-review
mapping reconciliation             → mapping-reconciliation
```

Direct legacy recipe retrieval retains precedence when a query is clearly a
recipe query, so adding Q05 does not regress the existing cold-start contract.

## Verification matrix

| Check                                                            | Result     | Evidence / note                                                                                                                                  |
| ---------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm contracts:generate`                                        | PASS       | Generated 194 contract projections; Q05 projection and index entries are present                                                                 |
| `pnpm test:contracts`                                            | PASS       | Existing contract parity, typed recipe, theme, and compact retrieval checks pass                                                                 |
| `pnpm test:saas-control-plane`                                   | PASS       | 11 typed patterns, 5 reference views, static ownership-safe fixtures, and 9 AI retrieval queries                                                 |
| `pnpm test:responsive-contracts`                                 | PASS       | Q04 shell/module-state contract remains green and is consumed by Q05                                                                             |
| `pnpm test:ai`                                                   | PASS       | AI catalog and cold-start references pass after preserving direct recipe precedence                                                              |
| `pnpm typecheck`                                                 | PASS       | Contracts, agent package, and playground TypeScript checks pass                                                                                  |
| `pnpm test`                                                      | PASS       | Full repository unit/contract/token/component gates pass, including Q05                                                                          |
| `pnpm build`                                                     | PASS       | Playground production build succeeds; existing advisory remains for chunks larger than 500 kB                                                    |
| `pnpm exec playwright test tests/q05-saas-control-plane.spec.ts` | PASS       | 2 focused Q05 tests passed, including desktop/tablet/mobile assertions                                                                           |
| Full `pnpm test:e2e`                                             | CONSTRAINT | 175 passed, 77 failed, 252 total; failures are unrelated existing baseline/expectation drift, including visual suites; no snapshots were updated |
| `pnpm format:check`                                              | CONSTRAINT | Repository-wide check reports 294 files requiring formatting; Q05 files were formatted and targeted checked                                      |
| `git diff --check`                                               | PASS       | No whitespace errors; Git reported existing CRLF normalization warnings                                                                          |
| Snapshot updates                                                 | NOT DONE   | No visual snapshots were rewritten to hide the broad dirty-tree baseline                                                                         |

## Carried constraints

- The worktree was already dirty; unrelated changes and generated artifacts
  were preserved.
- Q05 remains a local Ten4Seven reference/harness surface and does not prove
  AAPM platform adoption or runtime integration.
- The full e2e and repository format constraints remain open follow-ups and
  are not silently absorbed into Q05.
- No source, schema, API, database, authentication, authorization,
  provisioning, billing, deployment, commit, push, merge, or publish action
  was performed outside this bounded Q05 scope.

## Q05 disposition

**PASS WITH CONSTRAINTS FOR Q06**

Q05 is ready to hand off as a typed, generated, catalogued, token-consistent,
ownership-safe set of SaaS control-plane presentation patterns with focused
responsive browser evidence. Q06 is not started. The next queue must carry the
repository-wide formatting and broad e2e visual-baseline constraints forward.
