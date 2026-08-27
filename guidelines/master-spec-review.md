# Master spec review — AAPM ERP & Operational Design System

This is the acceptance review of the user-supplied `AAPM_ERP_Operational_Design_System_Master_Spec (1).md` against the standalone package at `D:/SA/ASSET/AAPM Design System 0826`. The spec is treated as a design brief and review checklist; it does not overwrite existing repository governance or authorize changes to the Academy production app.

## Decision

**ACCEPTED WITH REVISION.** The foundation and operational composition layer are usable as a general AAPM UI package. The remaining work is deliberately bounded: domain components, richer automated behavior tests and a final visual regression pass remain follow-up work rather than being hidden inside this foundation patch.

## Evidence reviewed

- 90 React component modules across 10 groups, one public entrypoint in `index.js`, one CSS entrypoint in `styles.css` and a manifest with the package surface.
- Three-layer token files for palette, semantic states, typography, spacing/density, elevation, motion, layout and dark theme; default theme is light and the default canvas is white.
- `Inter Variable` is shipped locally with a system fallback stack; numeric roles and Indonesian formatters are part of the public contract.
- `Icon` owns a 290-key semantic registry. React rendering uses local `@iconify/react` data and curated Solar, Phosphor, MingCute, MDI, Healthicons, Game Icons plus the AAPM-owned Solar-like domain set; unknown keys have a visible local fallback.
- Core, forms, navigation, data, feedback, overlay, chart and layout components are exported. `DataTable` supports sorting, selection, sticky header/columns, expandable/grouped rows, editable cells and summary rows.
- Operational compositions include `ProcessBoard`, `MilestoneTimeline`, `TransactionDetailGrid`, `VerificationPanel`, `DataTableToolbar`, `ExceptionCard`, `TrendCard`, `DetailSidebar` and `PermissionGate`.
- Runnable Academy, ERP and foundation/catalog surfaces exist under `ui_kits/` and `showcase/`.

## Requirement matrix

| Spec area | Evidence in package | Status / decision |
| --- | --- | --- |
| Governance | `guidelines/governance.md`, manifest and public index | **Accepted** — package governance is additive and preserves product governance |
| Color, typography, spacing, density, shape, elevation, motion | `tokens/`, `styles.css`, foundation cards | **Accepted** — primitive → semantic → component layering is retained |
| Local Iconify infrastructure | `components/core/Icon.jsx`, `solarIconData.js`, `domainIconData.js` | **Accepted with revision** — no CDN in React; static HTML catalog remains a documented preview exception |
| Core actions and surfaces | `core/`, `layout/` | **Accepted** — `SplitButton`, `IconButton`, `Surface`, `Card`, `Accordion` cover the named patterns |
| Form controls | `forms/`, `FormField`, `DateRangePicker`, `TimePicker`, `DateTimePicker` | **Accepted** — validation and business rules stay with consumers |
| Navigation and overlays | `navigation/`, `overlay/`, `BottomNav`, `CommandMenu` | **Accepted by composition** — `Popover`/`Select` cover dropdown behavior; `Drawer` covers sheet behavior |
| Data display and lifecycle | `DataTable`, `StatusChip`, `KeyValueList`, `ActivityFeed`, `AuditTimeline` | **Accepted** — table states compose with `StateView` and permission contracts |
| Feedback/system states | `Alert`, `ToastProvider`, `ConfirmDialog`, `EmptyState`, `StateView`, `PermissionGate` | **Accepted** — no browser alert/confirm contract |
| Reusable blocks | `blocks/` plus component matrix | **Accepted with revision** — named high-value blocks exist; `RecordHeader`/`StatusHeader` map to `PageHeader`/`RecordSummary` instead of duplicate components |
| Puzzle composition model | `guidelines/component-matrix.md`, `instant-composition.md`, kit examples | **Accepted** — shell → page chrome → block → pattern → template is documented |
| CRUD/lifecycle/approval/verification/master-detail/filter/bulk/exception | `operational-composition.md`, ERP kit and block APIs | **Accepted** — persistence, authorization and server validation remain product-owned |
| First-class table | `DataTable`, `DataTableToolbar`, `TransactionDetailGrid` | **Accepted** — server pagination/querying is an explicit consumer concern |
| Visualization/dashboard patterns | seven SVG charts, `KPICluster`, `DashboardGrid`, `TrendCard`, ERP dashboard | **Accepted with revision** — `LineChart area` and `BarChart stacked` cover area/stacked variants; advanced distribution/tree visualizations are deferred |
| Page templates | ERP and Academy kits plus `page-templates.md` | **Accepted** — recipes are documented; not every domain route is generated |
| Permission/access UI | `PermissionGate`, `StateView state="permission"`, disabled/action contracts | **Accepted** — frontend visibility is not authorization |
| Responsive/accessibility/motion/content/localization | existing guidelines, CSS media rules, formatters and state contracts | **Accepted baseline** — consuming products still need visual regression at their actual content lengths |
| Engineering/package architecture | React package, local assets, public exports | **Accepted with revision** — no lockfile is committed yet; `npm test` is dependency-light and consumer CI should own the lockfile |
| HeroUI ownership | `readme.md`, `instant-composition.md` | **Decision locked** — HeroUI is an interaction/accessibility reference, not an additional runtime framework |
| Domain components | Academy/ERP recipes, generic blocks and semantic icons | **Deferred** — farm/inventory/sales/finance/academy domain APIs need real product data contracts before being stabilized |

## Decisions locked

- Keep React 18/19-compatible peer support and the current lightweight architecture.
- Keep Inter Variable and the light/white default canvas.
- Keep Minimal UI as visual reference, HeroUI as behavior/accessibility reference, and AAPM UI as the owned implementation.
- Keep one semantic Icon registry with local data, visible fallback and no runtime CDN requirement for React.
- Keep operational data behavior in product code: data fetching, permissions, optimistic updates, validation, persistence and business rules.
- Prefer composition and documented aliases over duplicate `RecordHeader`, `StatusHeader`, `Panel`, `Sheet` or `Dropdown` implementations.

## Decisions deferred / backlog

1. Add a lockfile and consumer CI matrix once the package's distribution target is chosen (workspace, npm package or copied asset bundle).
2. Add interaction tests for keyboard navigation, selection/edit commit, focus restoration, dialogs and responsive shell behavior.
3. Add visual regression snapshots for light/dark, compact/comfortable and 320/390/768/1440px widths.
4. Decide whether to publish domain packages for farm, inventory, sales, finance and Academy; do not put domain business logic in core.
5. Add optional server-state adapters for paginated tables only when a product contract is agreed.
6. Replace the static catalog's CDN icon preview with a generated local SVG gallery if the catalog must run fully offline.

## Phase-appropriate acceptance

This package is ready for review as a reusable foundation and operational pattern library. It is not a claim that every Academy production page has been migrated or that domain APIs are final. The next safe step is consumer-by-consumer adoption with visual and behavior evidence.
