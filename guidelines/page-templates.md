# AAPM UI page templates

Templates are composition recipes, not new component families. Start with `AppShell` and `PageContainer`, then choose the smallest page pattern that matches the work.

| Page | Composition | Primary states / notes |
| --- | --- | --- |
| Dashboard | `PageHeader` → `KPICluster`/`TrendCard` → `DashboardGrid` → charts/exceptions | loading, partial data, exception and permission states stay visible |
| List / queue | `PageHeader` → `DataTableToolbar` → `DataTable` → `Pagination` | empty/no-result/error, selection and bulk actions |
| Master data | list recipe + create/edit `FormSection` | duplicate validation, archive/restore and permission boundaries |
| Detail | `PageHeader`/`RecordSummary` → content + `DetailSidebar` | loading, restricted record and audit history |
| Create / edit form | `PageHeader` → `FormSection` groups → `ActionFooter` | field errors, dirty state, save failure and disabled submit |
| Master-detail transaction | `RecordSummary` → `MilestoneTimeline` → `FormSection` → `TransactionDetailGrid` → `ActionFooter` | line validation, totals, lifecycle and confirmation |
| Approval queue | `DataTableToolbar` → `DataTable` → `BulkActionBar` | `PermissionGate` for approval, `ConfirmDialog` for consequential actions |
| Verification queue/detail | `RecordSummary` → `VerificationPanel` → `ApprovalPanel` | evidence and checks precede decision controls |
| Monitoring | KPI/`TrendCard` → `LineChart`/`BarChart`/`Heatmap` → `ExceptionCard` | stale/partial/offline states and last-updated context |
| Report | filters → summary metrics → chart/table → export action | numeric formatting, target/variance and print/export responsibility |
| Settings | `PageHeader` → `Tabs`/`FormSection` → `ActionFooter` | permission, reset/unsaved state, provider or integration health |
| Admin management | `DataTableToolbar` → `DataTable` → `DetailSidebar`/`Drawer` | roles, disabled actions, audit and destructive confirmation |
| Authentication | product auth shell + `FormField` controls + `StateView`/`Alert` | white canvas, clear errors, focus restoration and mobile stack |

## Responsive rule

The shell owns geometry. Below the layout breakpoint, side navigation becomes a drawer/bottom navigation, multi-column forms become one column, process boards either stack or scroll inside their board region, and tables retain their own horizontal scroll rather than widening the page. `DetailSidebar` becomes a normal section.

## State rule

Every template must decide what the user sees for loading, empty, no-result, error, offline, timeout, partial data, no permission and maintenance. Use `StateView` and `PermissionGate`; do not silently render an empty white panel or rely on browser dialogs.

## Product ownership

Templates do not decide routes, API shape, authorization, caching, domain labels or validation rules. A product may compose these recipes in `ui_kits/<product>/` and add domain components only after the data contract is stable.
