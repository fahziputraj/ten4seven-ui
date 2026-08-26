# Production gap ledger

## Summary

- Donor gap events: **1**.
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

No application code imports provider icon strings or donor components.
