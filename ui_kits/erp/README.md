# UI kit — AAPM ERP (operational patterns)

**No ERP source was supplied.** No repository, design file or screenshot of the AAPM ERP existed in the provided material. These four screens are therefore *canonical pattern implementations* built from the written specification and from the Academy admin console's visual language — not recreations. Treat them as the reference every real ERP module should follow, and replace them with recreations once the real screens exist.

**Flow:** `index.html` opens on the Operational Dashboard → any exception or *Purchase Invoice* in the sidebar → list page (tabs, filters, bulk selection, advanced-filter drawer) → click a row → master-detail transaction (tabs, line-item grid, sticky action footer, delete confirmation) → *Approval Queue* → select a document and decide.

**Screens**

| File | Pattern | Spec reference |
| --- | --- | --- |
| `ErpShell.jsx` | AppShell: module sidebar with entity selector, blurred sticky header, period badge | §22 responsive strategy, §35 composition |
| `OperationalDashboard.jsx` | "What requires action now?" — snapshot KPIs, exception panel, hen-day chart vs target, per-house table, approval inbox, activity feed | §17 dashboard patterns, §14.8 exception handling |
| `InvoiceListPage.jsx` | List page: PageHeader → tabs → FilterToolbar → selectable DataTable → Pagination, with BulkActionBar and an advanced-filter Drawer | §18 page templates, §14.6 filtering, §14.7 bulk actions |
| `TransactionPage.jsx` | Master-detail: Stepper → RecordSummary → FormSection header → line-item grid with totals reconciliation → summary panel → sticky ActionFooter → destructive confirmation | §14.5 master detail, §19 forms |
| `ApprovalQueuePage.jsx` | Approval queue + decision: queue table, RecordSummary, evidence timeline, ApprovalPanel with validation checks, Toast confirmation | §14.3 approval, §14.4 verification |

**Composition proof.** Every screen is assembled from this design system's exported components only. No screen defines a button, card, chip, table, dialog or icon of its own — which is the acceptance criterion in §36.

**Domain content** is realistic AAPM layer-farm data (pakan LP-2, hen-day production, kandang/flock identifiers, Indonesian number formatting) so density and formatting are tested against real string lengths.
