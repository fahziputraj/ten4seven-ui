# Production gap ledger

## Summary

- Historical donor gap events: **1**. Gate C.2 and v1 component completion added **0** donor events.
- AAPM extraction lookup: used for the already-approved generic contracts and interaction expectations.
- A bounded donor source lookup was required only for the missing Checkbox/Radio vocabulary; no donor runtime or dependency was adopted.

## AAPM extraction evidence

The production audit searched the supplied AAPM manifest, extraction map, block prompts, and DataTable prompt. Those sources confirmed the intended vocabulary for `PageHeader`, `FilterToolbar`, `KPICluster`, `BulkActionBar`, `Pagination`, selectable/sortable `DataTable`, numeric alignment, semantic status, `Drawer`, `Checkbox`, and `Radio` behavior. They were treated as extraction evidence, not copied runtime code.

## Canonical result

The missing contracts were re-authored in `packages/ui/src/components.tsx` and `packages/ui/src/styles.css`:

- `AppShell`, `Sidebar`, `PageHeader`, `KPICluster`, `FilterToolbar`, `Pagination`, `BulkActionBar`, `DetailDrawer`, `EmptyState`, and `ProductCard` are now package-owned.
- `Checkbox` and `Radio` were normalized into the package as the first bounded form-control gap event; both preserve native input semantics and ten4seven tokens.
- `DataTable` gained controlled selection, header sorting, row activation, loading, error, empty, and table semantics.
- New operational and commerce meanings were normalized into the local Solar registry and cataloged in `packages/ai/catalog/icons.json`.

No application code imports provider icon strings or donor components. The current v1 provenance breakdown and future event protocol are recorded in `research/05-v1/DONOR_GAP_EVENTS.md`.

## v1 completion gap decisions

The focused component audit checked the existing AAPM extraction and canonical
ten4seven exports before deciding whether a missing capability was generic,
repeated, and worth promoting. The following outcomes are now package-owned:

- `QuantityControl` is a bounded commerce primitive. It owns step/min/max
  interaction and accessible labels; the recipe owns quantity state and
  pricing policy.
- `CartTrigger`, `CartLineItem`, `CartPanel`, and `OrderSummary` are shared
  commerce contracts. They compose the existing Button, Typography, EmptyState,
  Price, and surface language; they do not create a commerce-only primitive
  family or own persistence/payment.
- `DataTable` and `DataTableColumnPicker` are classified under `Tables`.
  `AppShell`, `ApprovalPanel`, `ActionFooter`, `CartPanel`, and `OrderSummary`
  are reusable `Patterns`; `Filtering & Bulk Actions` is separate from both
  `Data Display` and `Tables`.
- `InputGroup`/`InputAddon` are composition responsibilities for the existing
  Input anatomy; `TagInput` is not needed by current recipes; NavigationMenu,
  HoverCard, CopyButton, Kbd, Listbox, TreeView, FilterRail,
  NotificationItem, SearchResultItem, Skeleton patterns, and Carousel are
  either existing contracts, simple composition, or not evidenced by current
  product/reference flows. They are not added speculatively.
- Rich text, Kanban, spreadsheet editing, schedulers, node graphs, GIS, video
  editors, 3D viewers, and code editors remain explicit non-goals.

This completion pass introduced **0 new donor gap events**. Any future donor
lookup must still be recorded as a gap event with source, reason, normalization,
and verification evidence before a consumer uses the resulting contract.
