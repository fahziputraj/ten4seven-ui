The list-page and transaction-detail table. Set page density on an ancestor with `data-density="compact"` for long tables.

```jsx
<DataTable
  selectable selectedIds={sel} onToggleRow={toggle} onToggleAll={toggleAll}
  sort={{ key: "total", dir: "desc" }} onSort={setSort}
  columns={[
    { key: "no", label: "Nomor", strong: true, sortable: true, sticky: true },
    { key: "supplier", label: "Supplier", wrap: true },
    { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} size="sm" icon={false} /> },
    { key: "qty", label: "Qty", numeric: true, editable: true },
    { key: "total", label: "Total", numeric: true, sortable: true },
  ]}
  rows={rows}
  onCellCommit={({ id, key, value }) => patch(id, key, value)}
  groupBy={(r) => r.supplier} groupSummary={(k, rs) => rs.length + " dokumen"}
  renderExpanded={(r) => <KeyValueList columns={2} items={detailsOf(r)} />}
  expandedIds={open} onToggleExpand={toggleOpen}
  summary={{ supplier: "Total 24 dokumen", total: "Rp 4.826.500.000" }}
/>
```

- Every money or quantity column sets `numeric` — right-aligned tabular figures are not optional.
- Header is 11px uppercase at weight 650 on `--surface-subtle`; row dividers are `--border-subtle`, not full-strength.
- Selection tints the row green at 5%. Pair with `BulkActionBar`.
- `editable` cells show a dashed underline at rest, a 2px green inset ring while editing. Commit on Enter/blur, cancel on Escape.
- `sticky` belongs on the identifier column only — pinning more than one defeats the horizontal scroll.
- `emptyLabel` is the *no-result* case (filters too narrow). A genuinely empty dataset uses `StateView state="empty"`.
