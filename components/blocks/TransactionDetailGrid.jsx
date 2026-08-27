import React from "react";
import { Button } from "../core/Button.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { DataTable } from "../data/DataTable.jsx";

export function TransactionDetailGrid({
  title = "Detail transaksi",
  description,
  columns = [],
  rows = [],
  getRowId,
  onAdd,
  addLabel = "Tambah baris",
  onRemove,
  onDuplicate,
  renderRowActions,
  disabled = false,
  style,
  ...tableProps
}) {
  const hasActions = typeof renderRowActions === "function" || typeof onRemove === "function" || typeof onDuplicate === "function";
  const actionColumn = hasActions ? {
    key: "__actions",
    label: "Aksi",
    width: 96,
    render: (row, index) => renderRowActions
      ? renderRowActions(row, index)
      : (
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--space-1)", width: "100%" }}>
          {onDuplicate && <IconButton icon="duplicate" label="Duplikasi baris" size="sm" disabled={disabled} onClick={(event) => { event.stopPropagation(); onDuplicate(row, index); }} />}
          {onRemove && <IconButton icon="delete" label="Hapus baris" size="sm" tone="danger" disabled={disabled} onClick={(event) => { event.stopPropagation(); onRemove(row, index); }} />}
        </span>
      ),
  } : null;

  return (
    <section className="aapm-transaction-detail-grid" style={{ minWidth: 0, ...style }}>
      <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", marginBottom: "var(--space-3)" }}>
        <div style={{ minWidth: 0 }}>
          <h2 style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
          {description && <p style={{ margin: "var(--space-1) 0 0", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</p>}
        </div>
        {onAdd && <Button icon="add" size="sm" disabled={disabled} onClick={onAdd}>{addLabel}</Button>}
      </header>
      <DataTable columns={actionColumn ? [...columns, actionColumn] : columns} rows={rows} getRowId={getRowId} {...tableProps} />
    </section>
  );
}
