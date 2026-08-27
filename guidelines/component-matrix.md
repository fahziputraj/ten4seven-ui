# AAPM UI component matrix

This is the practical selection guide for product teams building a web, dashboard, admin console or operational workspace with AAPM UI. Compose from the outside in: shell → page chrome → content blocks → feedback/overlays. Do not style a product page by reaching directly for token values when an existing component contract covers the job.

## Page composition

```text
AppShell
├── Sidebar + Topbar + (mobile) BottomNav
└── shell main
    └── PageContainer
        ├── PageHeader
        ├── DataTableToolbar / tabs / breadcrumbs
        ├── DashboardGrid → DashboardPanel / MetricCard / TrendCard / charts
        ├── DataTable or record cards
        ├── MilestoneTimeline / ProcessBoard
        ├── TransactionDetailGrid / VerificationPanel / DetailSidebar
        └── ToastViewport / Modal / Drawer (portals or app-level regions)
```

`AppShell` owns geometry and responsive behavior. `PageContainer` owns readable content width and gutters. A page should not recreate sidebar widths, mobile bottom navigation, sticky header offsets or safe-area padding.

## Choose by intent

| Need | Use | Contract |
| --- | --- | --- |
| Global product frame | `AppShell` | `aria-label` landmarks, responsive sidebar, mobile bottom nav |
| Primary route navigation | `Sidebar`, `NavItem`, `BottomNav` | One active route, one active visual treatment |
| Page identity | `Topbar`, `PageHeader`, `Breadcrumb` | Overline → title → optional description/actions |
| Dashboard grouping | `DashboardGrid`, `DashboardPanel` | Responsive columns; panel title and action stay aligned |
| One high-signal number | `MetricCard` or `Stat` | `MetricCard` for a tile; `Stat` inside an existing surface |
| Value plus comparison series | `TrendCard` | Composes `MetricCard` and optional `Sparkline`; text remains primary |
| Progress to completion | `Progress`, `ProgressRing` | Always expose a text value; ring is not the only signal |
| Ordered operational checkpoints | `MilestoneTimeline` | Use explicit complete/current/upcoming/blocked states; keep labels short on horizontal layouts |
| Work in process stages | `ProcessBoard` | Use for queues and kanban-like workflows; stack columns on mobile unless horizontal board scrolling is intentional |
| Record list with many fields | `DataTable` | Use compact density only when the page is table-first |
| Search/filter/selection actions around a table | `DataTableToolbar` | Composes `FilterToolbar` and conditional `BulkActionBar` |
| An exception needing attention | `ExceptionCard` | Use a semantic tone, explanation, metadata and one next action |
| Record lifecycle | `StatusChip` | Use the fixed lifecycle vocabulary; do not invent colour meanings |
| Searchable choice | `Combobox` | Label, result count/listbox semantics and keyboard navigation |
| Small fixed choice set | `Select` | Prefer this under seven options |
| Form grouping | `FormField`, `FormSection` | Labels and validation stay adjacent to their controls |
| Transaction line items | `TransactionDetailGrid` | Compose editable `DataTable` with add/duplicate/remove actions and totals |
| Evidence before decision | `VerificationPanel` | Context → evidence → checks → notes → decision |
| Contextual record rail | `DetailSidebar` | Key/value metadata beside detail; becomes a section on mobile |
| Non-blocking outcome | `ToastProvider` / `useToast` | One global viewport; actionable errors include retry/destination |
| Destructive or consequential action | `ConfirmDialog` | Explain consequence; focus returns to the trigger |
| Blocking task | `Modal` | Use for a contained task, not a whole page |
| Mobile side task | `Drawer` | Use for filters, navigation or contextual detail |
| No result / loading / error | `StateView` | State has a reason and a next action |
| Access behavior | `PermissionGate` | Explicit hide, disable-with-explanation or permission state |

## Layout rules

- Keep the default canvas white/light. Use tinted surfaces to communicate a category or state, not to decorate every card.
- Use the declared `data-density` on the page root: `comfortable` for learner/task flows, default for forms and mixed dashboards, `compact` for data-heavy tables.
- Let the shell switch to its mobile drawer and bottom navigation below the layout breakpoint. Do not hide navigation with ad-hoc media queries inside a page.
- Place wide tables inside `.aapm-scroll-region` or the table component's own scroll wrapper. The page itself must remain horizontally clipped.
- Use the AAPM green/orange/lime palette through semantic tokens and tint variants. A component should not contain a raw hex colour.
- Prefer a top accent rule for card state. Do not stack a tint, gradient, left rail and heavy shadow on the same surface.

## Typography and fonts

AAPM UI ships the Academy typeface locally as **Inter Variable** (`100–900`, normal and italic). It is the Helvetica-like choice used by the Academy and is the canonical family for display, headings, body copy, controls and numbers. `tokens/fonts.css` loads it with `font-display: swap`; the fallback stack is `Inter`, system UI, `Segoe UI`, `Helvetica Neue`, `Arial`, sans-serif. The single exception is editorial/login quotation copy, which may use the system serif stack in italic.

Consumers should import `styles.css` once. Do not add a second web-font provider or redefine `--font-body` at component level. If a product needs a brand-specific display face later, add it as a documented theme decision and retain Inter for operational UI and numeric data.

## Accessibility baseline

- Every icon-only action needs an accessible label; decorative icons use `aria-hidden="true"`.
- Every form control has a visible label or an explicit accessible name and a connected error/help message.
- Focus-visible treatment is provided globally and should not be removed for visual polish.
- Toasts use polite status messaging by default and assertive alerts for failures; confirmations trap focus and restore it.
- Colour is never the only status signal. Pair lifecycle colours with text and/or an Iconify glyph.
- Honor `prefers-reduced-motion`; layout and task completion must not depend on animation.
