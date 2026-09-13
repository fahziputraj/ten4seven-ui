# T7-AAPM-001-Q04 — Responsive Shell and Module-State Evidence

**Date:** 2026-09-11  
**Repository:** `D:\SA\ten4seven-ui`  
**Queue reference:** `T7-AAPM-001-Q04-RESPONSIVE-SHELL-AND-MODULE-STATES.md`  
**Scope:** local Ten4Seven UI contract and harness work only

## Gate outcome

**PASS WITH CONSTRAINTS FOR Q05**

Q04 is implemented as a typed, generated, tokenized responsive-shell and
module-state contract. The focused Q04 browser suite passes at desktop, tablet,
and mobile widths. The full repository browser suite remains constrained by
the current dirty-tree visual baseline and several unrelated expectation
mismatches; those snapshots were not rewritten. Q05 has not been started.

The attached queue document was treated as the bounded scope and acceptance
reference. It was not treated as authorization to change AAPM business logic,
authentication, tenant/resource resolution, backend/API behavior, deployment,
or repository history. None of those changes were made.

## Scope and non-goals

Q04 covers:

- one shared `AppShell → navigation/context → PageHeader → bounded route
  content` grammar;
- explicit desktop, tablet, and mobile presentation behavior for the required
  component and pattern families;
- bounded overflow, keyboard/focus, sticky-region, density, and touch-target
  contracts;
- a generic `ModuleState` renderer for lifecycle and access presentation;
- generated agent-facing projections so the contracts are discoverable by
  routes, recipes, and AI tooling;
- a compact Theme Studio workbench that exposes the contracts without adding a
  second page-sized prose surface;
- focused browser evidence for the Theme Studio contract workbench and a
  representative private application shell.

Q04 does not cover:

- evaluating permissions, entitlements, tenant membership, resource scope, or
  business authorization;
- fetching tenant, resource, dependency, or lifecycle data;
- activation, provisioning, retry, resume, suspension, or other lifecycle
  mutations;
- routing decisions or backend/API/schema changes;
- redesigning the AAPM product shell or claiming AAPM adoption;
- publishing, staging, committing, pushing, merging, or deploying.

## Implementation map

The contract source is typed and is projected into the generated agent-facing
manifests. The implementation is deliberately split between contract data,
canonical UI, and the Theme Studio proof surface.

| Area | Implementation | Evidence |
| --- | --- | --- |
| Responsive shell and component behavior | `packages/contracts/src/responsive-shell.ts` | `RESPONSIVE_SHELL_CONTRACT`, `RESPONSIVE_COMPONENT_BEHAVIORS`, `RESPONSIVE_RECIPE_BINDINGS` |
| Generic module states | `packages/contracts/src/module-state.ts` | `MODULE_STATE_CONTRACT`, `MODULE_STATE_PATTERNS`, `MODULE_STATE_IDS` |
| Canonical contract registry | `packages/contracts/src/canonical.ts` | `CANONICAL_CONTRACTS.responsive`, `CANONICAL_CONTRACTS.moduleStates` |
| Generated retrieval | `scripts/generate-contract-projections.mjs`, `packages/agent/generated/index.mjs` | `generated/responsive-shell.json`, `generated/module-states.json` and agent exports |
| Canonical renderer | `packages/ui/src/module-state.tsx` | semantic state surface with consumer-provided copy and actions |
| Shell extension points | `packages/ui/src/components.tsx` | context slot, sticky topbar metadata, content-width metadata, mobile navigation label |
| Shared visual language | `packages/ui/src/styles.css` | tokenized module-state surface, action area, touch target, shell slots |
| Contract workbench | `apps/playground/src/responsive-contract-workbench.tsx`, `apps/playground/src/App.tsx` | progressive-disclosure viewport matrix and module-state proof |
| Workbench presentation | `apps/playground/src/app.css` | compact grouped panels, responsive matrix, no large prose wall |
| Catalog contract | `packages/ai/catalog/components.json` | implemented `ModuleState` component entry |
| Contract verification | `scripts/verify-contracts.mjs`, `scripts/verify-responsive-contracts.mjs` | generated parity, ownership, threshold, source, and token checks |
| Browser proof | `tests/q04-responsive-shell.spec.ts` | focused desktop/tablet/mobile behavior assertions |

## Shared shell contract

The shell contract is one shared grammar for private application surfaces:

```text
AppShell
  → navigation/context
  → PageHeader
  → bounded route content
```

The shell exposes these explicit slots and controls:

- sidebar navigation for desktop information-dense application contexts;
- tablet collapse at the contract boundary and mobile drawer navigation;
- a tenant/resource context slot owned by the consumer;
- a route-level page header slot with primary and secondary action placement;
- sticky-header metadata for surfaces that intentionally pin a topbar;
- bounded content-width metadata (`full`, `wide`, or `readable`);
- safe-area, page-gutter, sidebar-width, header-height, minimum touch-target,
  and density token references;
- document-order and overlay-focus rules owned by the canonical shell and
  overlay components.

The renderer does not decide whether a user may see or act on a surface. The
consumer supplies the context, route content, actions, and any state that the
surface should present.

## Viewport contract

The Q04 viewport bands are explicit and non-overlapping:

| Viewport | Width range | Shell behavior | Primary narrow-screen rule |
| --- | ---: | --- | --- |
| Desktop | `≥ 861px` | Sidebar and full route content | Use the declared desktop layout; do not manufacture a second shell |
| Tablet | `541–860px` | Collapsed navigation with a controlled menu entry | Preserve content semantics; use declared wrap, scroll, stack, or drawer behavior |
| Mobile | `≤ 540px` | Drawer navigation and single-column route content | Keep page overflow bounded; preserve focus order and minimum touch targets |

The threshold assertions are checked by `scripts/verify-responsive-contracts.mjs`
and by the focused Playwright suite. The shell contract names the viewport
bands rather than leaving responsive behavior to incidental media queries.

## Component and pattern behavior matrix

The following nine behavior contracts are the canonical Q04 decisions. They
describe presentation and interaction ownership; they do not prescribe domain
data or business rules.

| Contract | Desktop | Tablet | Mobile | Overflow / priority decision |
| --- | --- | --- | --- | --- |
| `data-table` | `table` | `table-scroll` | `table-scroll` | Preserve table semantics; bounded horizontal scroll is preferred where stacking would lose comparison meaning |
| `filter-bar` | `inline` | `wrap` | `drawer` | Keep applied filters visible; move secondary controls into the canonical filter drawer on mobile |
| `master-detail` | `split` | `split` | `drawer` | Keep the selected record connected to the list; mobile detail is a controlled drawer |
| `entity-list` | `table` | `table-scroll` | `table-scroll` | Preserve list/table semantics and use bounded scrolling rather than a silent card rewrite |
| `entity-detail` | `split` | `stack` | `stack` | Stack detail regions in document order when the split no longer has enough width |
| `entity-form` | `split` | `single-column` | `single-column` | Keep labels, errors, and summaries in a predictable sequence |
| `kpi-cluster` | `inline` | `wrap` | `stack` | Center the group while allowing cards to wrap or stack without edge-stretching |
| `route-action-group` | `inline` | `wrap` | `stack` | Keep the primary action first in reading and focus order |
| `long-form-validation` | `split` | `stack` | `stack` | Keep the validation summary discoverable before the affected fields |

Every behavior contract includes a focus-order declaration, a narrow-screen
note, the shared `--t7-touch-target-min` token, and an explicit consumer-choice
boundary. A route may choose among a contract's declared strategies when the
content semantics require it, but it may not invent an undocumented responsive
mode.

### Recipe bindings

The responsive projection contains bindings for the following canonical recipe
families. These bindings connect a recipe to the behavior contracts without
duplicating the full component matrix in every recipe projection.

| Recipe family | Bound behavior contracts |
| --- | --- |
| `dashboard` | `kpi-cluster`, `route-action-group`, `data-table` |
| `entity-list` | `entity-list`, `filter-bar`, `route-action-group` |
| `entity-detail` | `entity-detail`, `route-action-group` |
| `entity-form` | `entity-form`, `long-form-validation`, `route-action-group` |
| `master-detail` | `master-detail`, `filter-bar`, `route-action-group` |
| `settings` | `entity-form`, `long-form-validation`, `route-action-group` |
| `approval-queue` | `data-table`, `filter-bar`, `route-action-group`, `module-state` |
| `report` | `kpi-cluster`, `data-table`, `route-action-group`, `module-state` |
| `readiness-review` | `kpi-cluster`, `entity-detail`, `route-action-group`, `module-state` |
| `process-workspace` | `master-detail`, `entity-detail`, `route-action-group`, `module-state` |
| `decision-workspace` | `master-detail`, `entity-detail`, `route-action-group`, `module-state` |
| `activity-audit` | `data-table`, `filter-bar`, `module-state` |
| `operational-kanban` | `entity-list`, `filter-bar`, `module-state` |
| `exception-queue` | `data-table`, `filter-bar`, `route-action-group`, `module-state` |
| `control-tower` | `kpi-cluster`, `data-table`, `route-action-group`, `module-state` |
| `load-planning` | `master-detail`, `kpi-cluster`, `route-action-group`, `module-state` |
| `route-planning` | `master-detail`, `entity-detail`, `route-action-group`, `module-state` |
| `receiving-console` | `entity-list`, `filter-bar`, `route-action-group`, `module-state` |
| `resource-forecast` | `kpi-cluster`, `data-table`, `route-action-group`, `module-state` |
| `entity-360` | `entity-detail`, `master-detail`, `route-action-group`, `module-state` |

The generated recipe projection stays compact. The shared responsive shell
projection owns the reusable matrices and binding map, avoiding a redundant
copy of the full contract in every recipe.

## Module-state contract

`ModuleState` is a canonical presentation component. It receives a normalized
state from its consumer and renders an accessible, tokenized surface. The
consumer owns applicability, data, copy overrides, actions, and event
handlers.

### Supported state patterns

| State id | Tone | Semantic icon | Default emphasis |
| --- | --- | --- | --- |
| `not-available` | `neutral` | `info` | `quiet` |
| `not-entitled` | `neutral` | `lock` | `quiet` |
| `setup-required` | `warning` | `settings` | `attention` |
| `provisioning` | `info` | `pending` | `quiet` |
| `resuming` | `info` | `pending` | `quiet` |
| `suspended` | `warning` | `blocked` | `attention` |
| `dependency-unavailable` | `danger` | `info` | `attention` |
| `permission-denied` | `danger` | `lock` | `attention` |
| `out-of-scope` | `neutral` | `view` | `quiet` |
| `read-only` | `info` | `lock` | `quiet` |
| `action-required` | `warning` | `warning` | `attention` |

The component API is intentionally small:

```ts
type ModuleStateProps = {
  state: ModuleStateId;
  title?: React.ReactNode;
  description?: React.ReactNode;
  details?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  icon?: ModuleStateIconName;
};
```

The component also accepts normal section attributes except for the native
`title` attribute, which is reserved for the visible state heading. The
consumer provides action elements so event ownership stays outside the
renderer.

### Ownership boundary

The system owns:

- the normalized state vocabulary and default presentation metadata;
- semantic icon selection and tone mapping;
- accessible heading and description wiring;
- tokenized surface, spacing, typography, action layout, and narrow-screen
  behavior.

The consumer owns:

- whether the state applies to the current tenant, user, resource, or route;
- title, description, details, and any domain-specific explanation;
- primary and secondary actions and their handlers;
- the data used to decide whether a dependency is available or a process is
  provisioning, suspended, or resumable;
- route and permission behavior.

The renderer explicitly does not perform entitlement evaluation, permission
evaluation, tenant/resource fetching, lifecycle mutation, route decisions, or
business calculations. Verification checks guard this boundary in both the
typed contract and the implementation source.

## Accessibility, focus, and overlay behavior

Q04 keeps the interaction contract explicit:

- `ModuleState` renders a semantic section with `aria-labelledby` and
  `aria-describedby` connections to its visible content;
- state meaning is not conveyed by color alone: every state has a text label,
  description, and semantic icon;
- consumer-provided actions remain real canonical buttons or links, preserving
  their own keyboard and disabled/loading contracts;
- the shared `AppShell` mobile trigger exposes expanded state and controls the
  canonical navigation drawer through `aria-expanded` and `aria-controls`;
- document order is the focus order for stacked narrow layouts;
- primary route actions remain first when action groups stack;
- overlays remain owned by the canonical Drawer/Modal/AlertDialog contracts;
  bounded scroll owners do not become a second overlay runtime;
- touch-sized controls use `--t7-touch-target-min` rather than a local pixel
  value;
- no responsive mode is allowed to create page-level horizontal overflow.

## Token and visual consistency

Q04 uses the existing Ten4Seven token architecture rather than adding local
visual values. The responsive and module-state contracts reference shared
semantic/component roles for:

- content max width and page gutters;
- sidebar and header dimensions;
- safe-area insets;
- touch target minimum;
- density;
- surface, border, radius, and card elevation;
- state tone and emphasis;
- typography and action spacing.

The module-state proof surface uses the same canonical `Badge`, `Button`,
`Collapsible`, `DataTable`, and `Typography` contracts used elsewhere in the
harness. The Theme Studio workbench is progressive disclosure: a compact
summary is visible first, with the viewport matrix and state examples behind
two explicit panels. This keeps the system surface organized and avoids
presenting the contract as a long editorial/news-post page.

## Browser evidence

### Focused Q04 suite

Command:

```text
pnpm exec playwright test tests/q04-responsive-shell.spec.ts
```

Result:

```text
2 passed (6.6s)
```

The focused suite proves:

1. Theme Studio exposes the generated three-band viewport contract, nine
   behavior contracts, eleven module states, and one shared shell grammar;
   both panels are collapsed by default and expand to reveal the canonical
   matrix and state proof; the desktop table/stacked projection contract is
   present; the page has no horizontal overflow.
2. Operations Tracker remains bounded at `1440px`, `840px`, and `390px`; the
   sidebar/mobile navigation transition follows the `861px` boundary; the
   mobile trigger meets the minimum touch target; Theme Studio proves the
   table/stacked narrow projection at tablet width; and mobile content stays
   within the viewport.

### Rendered route inspection

The existing local browser tab was inspected at:

- `http://localhost:4173/theme-studio`

The route rendered without an error overlay. The accessibility tree showed the
shared shell, Theme Studio content, the Q03 adapter section, and the Q04
`Responsive shell & module states` workbench with its compact summary and
collapsed disclosure controls.

The representative application route used by the focused Playwright proof was:

- `http://127.0.0.1:4173/operations-tracker`

The broad Component Lab route remains compatible with the existing harness and
was not converted into a second responsive contract renderer.

## Verification matrix

| Check | Result | Evidence / note |
| --- | --- | --- |
| `pnpm contracts:generate` | PASS | Generated 193 contract projections; responsive shell and module-state projections are present |
| `pnpm test:responsive-contracts` | PASS | Viewport thresholds, shell props, component behavior, module-state ownership, and CSS token checks pass |
| `pnpm test:component-system` | PASS | 145 canonical components, 6 aliases, 29 recipes, 12 expressive blocks |
| `pnpm typecheck` | PASS | Contracts, agent package, and playground TypeScript checks pass |
| `pnpm test` | PASS | Full repository unit/contract/token/component gates pass, including the responsive gate |
| `pnpm build` | PASS | Playground build succeeds; existing advisory remains for chunks larger than 500 kB |
| `pnpm exec playwright test tests/q04-responsive-shell.spec.ts` | PASS | 2 focused Q04 tests passed |
| Full `pnpm test:e2e` equivalent (`pnpm exec playwright test`) | CONSTRAINT | 173 passed, 77 failed, 250 total; failures are outside the focused Q04 assertions and include current visual-baseline drift and unrelated expectation mismatches |
| `pnpm format:check` | CONSTRAINT | Repository-wide check reports 299 files requiring formatting; targeted Q04 files were formatted and checked |
| `git diff --check` | PASS | No whitespace errors; existing CRLF warnings were reported by Git |
| Snapshot updates | NOT DONE | No visual snapshots were rewritten to hide the current baseline drift |

### Full browser-suite constraint detail

The broad suite's failures are not being reclassified as Q04 passes. They
include existing visual snapshot differences across unrelated surfaces and a
small set of non-snapshot expectations involving current styling or fixture
content. Examples include content-safety focus styling, static-card transform
expectations, a KPI cue expectation, a shape-editor expectation, profile-count
and recipe-copy expectations, and multiple visual baselines. The focused Q04
tests pass independently, and no broad snapshot was updated.

The current token coverage report records 908 raw-pixel occurrences as explicit
migration debt. That debt is visible to the governance checks and was not
silently removed as part of Q04.

## Compatibility and carried constraints

- Generated manifests remain the source consumed by the agent package; the
  responsive and module-state projections are additive and do not duplicate
  recipe decision payloads.
- Existing canonical component and recipe contracts remain in place. The
  implemented `ModuleState` catalog entry updates the component-system count
  from 144 to 145 canonical components.
- The existing AppShell API remains compatible; Q04 adds optional context,
  navigation-label, sticky-header, and content-width metadata.
- No business state or data fetching was added to the renderer.
- Q04 did not alter AAPM routes, backend/API contracts, authentication,
  authorization, tenant resolution, or deployment configuration.
- Full repository formatting and broad visual-browser stability remain
  constraints for the next bounded work item.
- No commit, push, merge, publish, stage, or deployment was performed.

## Q04 disposition

**PASS WITH CONSTRAINTS FOR Q05**

The responsive shell and module-state contracts are implemented, generated,
tokenized, catalogued, unit/contract tested, built, and proven by the focused
desktop/tablet/mobile browser suite. Proceeding beyond this gate requires
carrying the repository-wide format and broad visual-baseline constraints into
Q05 planning. Q05 execution has not begun.
