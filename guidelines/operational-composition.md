# AAPM UI operational composition

Operational screens are assembled around the work that must move, be checked, or be decided. The system already includes the low-level controls and data surfaces; this guide maps them into repeatable ERP and operational patterns.

## Coverage map

| Job to be done | Primary composition | Supporting components |
| --- | --- | --- |
| See what requires action | `AppShell` → `PageHeader` → `KPICluster` → `DashboardGrid` | `MetricCard`, `TrendCard`, charts, `ExceptionCard`, `ActivityFeed`, `StateView` |
| Move work through stages | `ProcessBoard` | `StatusChip`, `Avatar`, `Popover`, `Drawer`, `Toast` |
| Track a lifecycle or handoff | `MilestoneTimeline` | `RecordSummary`, `StatusChip`, `AuditTimeline`, `ActionFooter` |
| Find and triage records | `DataTableToolbar` → tabs → `DataTable` | `Combobox`, `DateRangePicker`, `BulkActionBar`, `Pagination`, `StateView` |
| Enter or edit a record | `FormSection` → `FormField` grid → `ActionFooter` | `Input`, `NumberInput`, `CurrencyInput`, `DateTimePicker`, `Select`, `FileUpload`, `Alert` |
| Edit transaction lines | `TransactionDetailGrid` | `DataTable` editing, row actions, summary, `ConfirmDialog` |
| Verify and approve | `RecordSummary` → `VerificationPanel` → `ApprovalPanel` | `AuditTimeline`, `ConfirmDialog`, `ToastProvider` |
| Inspect a record in depth | master/detail shell | `DetailSidebar`, `Tabs`, `KeyValueList`, `DataTable`, `Drawer`, `Modal` |

## ERP page recipes

### Work queue

Use a page header with one primary action, a `FilterToolbar` for search and filters, and a compact `DataTable` for the queue. Add `BulkActionBar` only after selection; keep the table readable when no rows are selected. Use `StatusChip` for lifecycle and `ActivityFeed` for recent movement.

### Master/detail transaction

Use `MilestoneTimeline` or `Stepper` for the lifecycle, `RecordSummary` for identity and key fields, `FormSection` for editable metadata, and `TransactionDetailGrid` for line items. Finish with one `ActionFooter`; consequential actions open `ConfirmDialog`.

### Approval and exception handling

Lead with the record identity and the reason it needs attention. Show validation checks before decision buttons. `ApprovalPanel` owns approve/reject/revise actions; `AuditTimeline` preserves who changed what and when. Failure feedback must remain visible and actionable through the global toast contract.

### Process / kanban

Use `ProcessBoard` when stage context is more important than a wide field matrix: content publishing, purchase lifecycle, maintenance, recruitment, or farm issue resolution. Keep card text concise and put the full record in a detail route or drawer. Persistence, permissions, optimistic updates and drag rules stay in the product layer.

### Exceptions and dashboard signals

Use `TrendCard` for a number plus a comparison or small series, and `ExceptionCard` for a deviation that needs a decision. Do not turn every KPI into an alert: an exception needs a reason, an owner/context and a next action. `PermissionGate` may disable or hide the action in the UI, but server authorization remains mandatory.

## Responsive and density contract

- Tables and horizontal boards scroll inside their own region; the page itself never gains horizontal overflow.
- Forms collapse to one column below the layout breakpoint; labels and error/help text remain adjacent to the control.
- A timeline may be horizontal on wide screens, but it becomes vertical on mobile.
- Use `data-density="compact"` for table-first pages and dense queues; use default or comfortable density for data entry and review.
- Status always has text plus a glyph or structural cue. Colour never carries the meaning alone.
- Motion explains a state transition; it never hides a record update, blocks keyboard use, or becomes the only progress signal.
- `VerificationPanel` keeps context and evidence visible before a decision; do not place approve/reject controls before the checks.
