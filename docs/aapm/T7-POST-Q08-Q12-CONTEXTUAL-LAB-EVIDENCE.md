# T7-POST-Q08-Q12 — Contextual Workspace and Lab Harmonization Evidence

Status: `PASS WITH CONSTRAINTS FOR Q13`

Execution date: 2026-09-11

Repository: `D:\SA\ten4seven-ui`

Branch: `feat/icons-aapm-iconify-expansion`

Observed HEAD at execution: `2bf29ad2e250edc3c70b63a0e34e3f4da3d72e2a`

Queue boundary: Q12 only. Q13 was not started.

## Scope and boundary

Q12 harmonizes the operational, reference, and adoption-proof workspaces that
already exist in the playground. It does not turn a proof route into a product
template, replace route-owned business behavior, or create a second component
library. The checkout was already materially dirty from the preceding queue
items. Those changes were preserved; no reset, clean, broad reformat, commit,
push, merge, or deployment was performed.

The Q12 implementation is intentionally app-composition work:

- one shared `PlaygroundLocalNavigation` composition now owns the local
  navigation landmark, active semantics, item geometry, and local-navigation
  scope markers;
- every route supplies only its own local meaning, labels, icons, active state,
  and view-selection callback;
- the global navigation remains the canonical `NavItem`-based navigation;
- the same `Sidebar` instance continues to be consumed by `AppShell` on desktop
  and by its canonical left-side `Drawer` on compact screens;
- local navigation uses the existing semantic and control tokens for spacing,
  typography, focus, active treatment, and touch-target geometry;
- page-local ERP anchors remain the canonical `SectionNavigation` pattern rather
  than becoming another sidebar system.

## Contextual lab inventory

| Route                   | Shell variant                    | Shared local navigation model                                                                               | Interaction model retained                                                                                                                                                | Authority boundary                                  |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `/operations-tracker`   | `reference-shell` + `wide`       | `Operations`: Work queue, Customers, Deliveries, Supply & QC, Fleet, Reports                                | Queue signal → workflow milestone → dense work table. Local selections update the route-owned view and preserve the same shell.                                           | Reference fixture; no live AAPM data.               |
| `/operational-patterns` | `reference-shell` + `contextual` | `Pattern library`: Control tower, Process workspace, Readiness review, Load & route, Receiving, Entity 360  | View selection matches the question: exception queue/control tower, process board, readiness decision, dispatch planning, receiving reconciliation, or entity inspection. | Reference fixture; no live AAPM data.               |
| `/saas-control-plane`   | `reference-shell` + `contextual` | `Control plane`: Context switching, Module catalog, Activation progress, Access and scope, Trace and review | Context and hierarchy selection, capability/lifecycle states, access explanation, and trace/reconciliation views stay route-owned.                                        | Reference fixture; no SaaS authority.               |
| `/erp-reference`        | `reference-shell` + `wide`       | `ERP density`: Collection, Entry, Review & trace, Operational charts                                        | Dense records use `DataTable`; entry/review and charts remain grouped by page-local `SectionNavigation`.                                                                  | Static ERP density fixture; no ERP authority.       |
| `/farm-reference`       | `reference-shell` + `contextual` | `Starter journey`: Farm overview, Daily operations, Farm context, Flocks & cycles, Inventory capability     | First-value journey and milestone progression remain process-oriented; flocks use focused record inspection through the existing canonical detail drawer.                 | Farm P1 reference fixture; no live Farm authority.  |
| `/farm-synthetic-proof` | `reference-shell` + `contextual` | `Authorized Farms`: Farm North, Farm Central, Farm South                                                    | Authorized-context selection and recovery-state proof remain consumer-owned fixture behavior.                                                                             | Synthetic proof only; not a target Farm product UX. |

The separate brand/profile proof routes remain intentionally outside this
contextual workspace inventory. They demonstrate authentication and brand
expression boundaries, not a private operational navigation model.

## Shell and navigation harmonization

The route composition now follows the same grammar across the inventory:

`AppShell → Sidebar → global navigation + route-local navigation → PageHeader → bounded route content`

`PlaygroundLocalNavigation` is the single local-navigation composition in
`apps/playground/src/playground-chrome.tsx`. It renders a named `nav` with
`data-navigation-scope="local"`; its items are canonical `NavItem` instances
marked with `data-navigation-item="local"`. A selected item exposes
`aria-current="page"` and the route remains responsible for the selected view.
This keeps local navigation visually secondary to global navigation while
retaining the same active, focus, icon, indentation, and control-height grammar.

The local group separator and label use muted semantic foreground and border
tokens. Local items inherit canonical navigation geometry and use tokenized
control gaps and inline padding. No route introduces a local raw color, local
radius, local shadow, or local motion runtime for this pattern.

The desktop sidebar and compact Drawer are deliberately the same composition.
`AppShell` owns the compact trigger and left-side Drawer; the route does not
render a second mobile sidebar. This also means route-local selections dismiss
the Drawer through the existing AppShell event contract and leave the trigger
available for reopening.

## Interaction judgment

The harmonization preserves the appropriate interaction model instead of
flattening every route into a Component Lab content feed:

- operations work is a wide workboard because the user must compare signals,
  progression, and records in one operating surface;
- process work stays a process/workboard model, while readiness and receiving
  stay review/exception models with evidence and next action together;
- entity-oriented views use master/detail behavior and the canonical
  `DetailDrawer` where the user needs focused inspection without losing the
  workspace context;
- ERP density remains a table/grid-oriented reference with page-local anchors;
- Farm P1 keeps its first-value journey and milestone semantics; Farm Synthetic
  remains a consumer-proof fixture and is not promoted to the product target.

## Route integrity evidence

### SOURCE

- All six contextual lab/reference routes use the same `PlaygroundSidebar`
  contract and the new `localNavigation` input.
- The old `contextGroups`/`onlyContext` call-site API is gone. The previous
  exported context type names remain only as deprecated aliases to avoid an
  unnecessary compatibility break for existing local consumers.
- Local active state is supplied by each route. The navigation composition adds
  the shared `aria-current` and scope semantics rather than duplicating route
  state.
- Existing canonical primitives remain in use: `AppShell`, `Sidebar`,
  `NavItem`, `Drawer`, `SectionNavigation`, `DataTable`, `MilestoneTracker`,
  and `DetailDrawer`.

### RUNTIME

The focused Playwright matrix passed with 3/3 tests in
`tests/q12-contextual-lab-harmonization.spec.ts`:

- desktop route matrix: all six routes rendered the expected `reference-shell`
  variant, header, main content, local navigation, one active local item after
  load, and the same active item after reload;
- desktop geometry: local and global canonical navigation item heights matched,
  and horizontal document overflow stayed within one CSS pixel;
- compact route matrix: the desktop sidebar was replaced by the existing
  AppShell mobile trigger and left-side Drawer, local navigation remained
  reachable inside the Drawer, all local targets were at least 44 CSS pixels,
  and overflow stayed within one CSS pixel;
- representative route-owned interactions: Operations → Customers,
  Operational Patterns → Process workspace, SaaS Control Plane → Trace and
  review, and Farm P1 → Flocks & cycles all retained their expected behavior.

Additional repository gates passed after the Q12 changes:

- `pnpm typecheck`
- `pnpm test` (all chained contract, token, package, slice, AI, component,
  and consumer gates)
- `pnpm build`
- targeted Prettier check for the Q12 TypeScript source and regression test
- `git diff --check` produced no whitespace errors

The final local-browser refresh of `/operations-tracker` reported zero console
errors after the package rebuild. The only informational message was the
standard React DevTools notice.

Rendered evidence captured with the local Playwright browser:

- [Operations Tracker desktop](../../output/playwright/q12-contextual-lab-operations-desktop.png)
- [Farm P1 mobile Drawer](../../output/playwright/q12-contextual-lab-farm-mobile-drawer.png)
- [Farm P1 mobile local navigation after scroll](../../output/playwright/q12-contextual-lab-farm-mobile-local-nav.png)
- [ERP Density Reference desktop](../../output/playwright/q12-contextual-lab-erp-desktop.png)

### OBSERVED

- Operations Tracker retains its wide four-signal workboard, workflow progress,
  and bounded content rather than inheriting the Component Lab’s long-form
  catalog layout.
- ERP Density Reference retains its dense table-oriented content and local
  section navigation while sharing the same global header/sidebar treatment.
- Farm P1 exposes one global navigation surface followed by one visually
  secondary Starter journey group inside the same Drawer on mobile.
- Local navigation labels and active treatments remain readable across the
  checked enterprise, ERP, and Farm theme scopes.

### UNKNOWN / RETAINED CONSTRAINTS

- These routes use deterministic local fixtures. Runtime success is not proof of
  production API, permission, or persistence behavior.
- Farm Synthetic remains an authorized-consumer proof and is explicitly not a
  production Farm UX adoption claim.
- Operations, Operational Patterns, and SaaS local view selections are
  route-owned in-memory selections; they are not asserted as deep-linkable URLs
  by this Q12 scope. Farm P1 deep links remain covered by its existing route
  contract and the Q12 representative selection check.
- `pnpm format:check` remains red at the repository level: Prettier reported
  314 files. The warning set includes the already dirty repository, generated
  artifacts, and Playwright snapshot YAML. The Q12 TypeScript source and test
  pass the targeted check; no broad formatting sweep was performed because it
  would cross the queue boundary and rewrite unrelated work.
- `pnpm build` reports the existing large-chunk advisory after a successful
  build; no bundling redesign is part of Q12.

## Q12 gate

`PASS WITH CONSTRAINTS FOR Q13`

The contextual lab/reference surfaces now share one local-navigation contract,
one AppShell/sidebar/header grammar, canonical compact-screen transformation,
route-owned interaction models, and explicit proof boundaries. The remaining
constraints are the documented fixture/deep-link boundaries and repository-wide
formatting debt, not a failure of the Q12 harmonization checks.

STOP. Q12 is complete. Do not start Q13 from this evidence record.
