# TransactionDetailGrid

Purpose: compose line-item editing into the canonical `DataTable` without creating a second table implementation.

```jsx
<TransactionDetailGrid
  title="Rincian pembelian"
  columns={columns}
  rows={lines}
  onAdd={addLine}
  onRemove={removeLine}
  onDuplicate={duplicateLine}
  onCellCommit={commitCell}
  summary={{ quantity: "120", total: "Rp 24.500.000" }}
/>
```

The underlying table retains sorting, selection, grouped/expanded rows, sticky headers, editable cells, summary rows, and its own scroll region. Keep duplicate prevention, row validation, totals reconciliation, and server persistence in the product layer.
