import React from "react";
import { Icon } from "../core/Icon.jsx";

const cellBase = {
  padding: "var(--cell-padding-y) var(--cell-padding-x)",
  fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--foreground)",
  borderBottom: "1px solid var(--border-subtle)", verticalAlign: "middle",
};
const stick = (on, offset, bg) => on ? { position: "sticky", left: offset, zIndex: 2, background: bg, boxShadow: "1px 0 0 var(--border)" } : null;

export function DataTable({
  columns = [], rows = [], getRowId = (r, i) => r.id ?? i,
  selectable = false, selectedIds = [], onToggleRow, onToggleAll,
  sort, onSort, stickyHeader = true, summary, onRowClick, emptyLabel = "Tidak ada data yang cocok.",
  renderExpanded, expandedIds = [], onToggleExpand,
  groupBy, groupLabel = (key) => key, groupSummary,
  onCellCommit, style, ...rest
}) {
  const allSelected = selectable && rows.length > 0 && rows.every((r, i) => selectedIds.includes(getRowId(r, i)));
  const expandable = typeof renderExpanded === "function";
  const lead = (selectable ? 40 : 0) + (expandable ? 36 : 0);
  const span = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);
  const groups = groupBy
    ? rows.reduce((acc, row) => { const k = groupBy(row); (acc[k] = acc[k] || []).push(row); return acc; }, {})
    : null;

  const headCell = (col, i) => {
    const active = sort?.key === col.key;
    return (
      <th key={col.key} style={{
        ...cellBase, borderBottomColor: "var(--border)", whiteSpace: "nowrap",
        textAlign: col.numeric ? "right" : "left", width: col.width,
        fontSize: "var(--text-xs)", fontWeight: "var(--weight-table-head)",
        letterSpacing: "var(--tracking-tight)", color: "var(--muted-foreground)",
        textTransform: "uppercase", cursor: col.sortable ? "pointer" : "default", userSelect: "none",
        ...stick(col.sticky, i === 0 ? lead : 0, "var(--surface-subtle)"),
      }} onClick={col.sortable ? () => onSort?.(col.key) : undefined}
        aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, justifyContent: col.numeric ? "flex-end" : "flex-start" }}>
          {col.label}
          {col.sortable && <Icon name={active ? (sort.dir === "asc" ? "collapse" : "expand") : "sort"} size={12}
            style={{ opacity: active ? 1 : 0.4, color: active ? "var(--primary)" : "inherit" }} />}
        </span>
      </th>
    );
  };

  const bodyRow = (row, i) => {
    const id = getRowId(row, i);
    const isSel = selectedIds.includes(id);
    const isOpen = expandedIds.includes(id);
    return (
      <React.Fragment key={id}>
        <Row selected={isSel} onClick={onRowClick ? () => onRowClick(row) : undefined}>
          {expandable && (
            <td style={{ ...cellBase, width: 36 }} onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-expanded={isOpen} aria-label={isOpen ? "Tutup detail baris" : "Buka detail baris"}
                onClick={() => onToggleExpand?.(id)}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 24, width: 24, borderRadius: "var(--radius-sm)", border: 0, background: "transparent", cursor: "pointer", color: "var(--muted-foreground)" }}>
                <Icon name="chevronRight" size={14} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform var(--duration-fast)" }} />
              </button>
            </td>
          )}
          {selectable && (
            <td style={{ ...cellBase, width: 40 }} onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" checked={isSel} onChange={() => onToggleRow?.(id)}
                aria-label="Pilih baris" style={{ accentColor: "var(--primary)", width: 15, height: 15, cursor: "pointer" }} />
            </td>
          )}
          {columns.map((col, ci) => (
            <td key={col.key} style={{
              ...cellBase, textAlign: col.numeric ? "right" : "left",
              fontVariantNumeric: col.numeric ? "tabular-nums" : "normal",
              fontWeight: col.strong ? "var(--weight-semibold)" : "var(--weight-regular)",
              whiteSpace: col.wrap ? "normal" : "nowrap",
              color: col.muted ? "var(--muted-foreground)" : "var(--foreground)",
              padding: col.editable ? 0 : cellBase.padding,
              ...stick(col.sticky, ci === 0 ? lead : 0, isSel ? "hsl(141 43% 96%)" : "var(--card)"),
            }} onClick={col.editable ? (e) => e.stopPropagation() : undefined}>
              {col.editable
                ? <EditableCell row={row} col={col} onCommit={(v) => onCellCommit?.({ id, key: col.key, value: v, row })} />
                : col.render ? col.render(row, i) : row[col.key] ?? "—"}
            </td>
          ))}
        </Row>
        {expandable && isOpen && (
          <tr>
            <td colSpan={span} style={{ padding: 0, borderBottom: "1px solid var(--border)", background: "var(--surface-subtle)" }}>
              <div style={{ padding: "var(--space-4) var(--space-5)", animation: "aapm-rise var(--duration-normal) var(--ease-out) both" }}>{renderExpanded(row)}</div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div style={{
      borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)",
      background: "var(--card)", boxShadow: "var(--card-shadow)", overflow: "hidden", ...style,
    }} {...rest}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
          <thead style={stickyHeader ? { position: "sticky", top: 0, zIndex: 3 } : undefined}>
            <tr style={{ background: "var(--surface-subtle)" }}>
              {expandable && <th style={{ ...cellBase, width: 36, borderBottomColor: "var(--border)" }} />}
              {selectable && (
                <th style={{ ...cellBase, width: 40, borderBottomColor: "var(--border)" }}>
                  <input type="checkbox" checked={allSelected} onChange={() => onToggleAll?.(!allSelected)}
                    aria-label="Pilih semua baris" style={{ accentColor: "var(--primary)", width: 15, height: 15, cursor: "pointer" }} />
                </th>
              )}
              {columns.map(headCell)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={span}
                style={{ ...cellBase, textAlign: "center", padding: "var(--space-10)", color: "var(--muted-foreground)" }}>{emptyLabel}</td></tr>
            )}
            {groups
              ? Object.entries(groups).map(([key, groupRows]) => (
                  <React.Fragment key={key}>
                    <tr>
                      <td colSpan={span} style={{
                        padding: "var(--space-2) var(--cell-padding-x)", background: "var(--surface-muted)",
                        borderBottom: "1px solid var(--border)", borderTop: "1px solid var(--border)",
                        font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
                        letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)",
                      }}>
                        <span style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
                          <span>{groupLabel(key, groupRows)}</span>
                          {groupSummary && <span style={{ fontVariantNumeric: "tabular-nums", textTransform: "none", letterSpacing: 0 }}>{groupSummary(key, groupRows)}</span>}
                        </span>
                      </td>
                    </tr>
                    {groupRows.map((row) => bodyRow(row, rows.indexOf(row)))}
                  </React.Fragment>
                ))
              : rows.map(bodyRow)}
          </tbody>
          {summary && (
            <tfoot><tr style={{ background: "var(--surface-subtle)" }}>
              {expandable && <td style={{ ...cellBase, borderBottom: "none", borderTop: "1px solid var(--border)" }} />}
              {selectable && <td style={{ ...cellBase, borderBottom: "none", borderTop: "1px solid var(--border)" }} />}
              {columns.map((col) => (
                <td key={col.key} style={{
                  ...cellBase, borderBottom: "none", borderTop: "1px solid var(--border)",
                  textAlign: col.numeric ? "right" : "left", fontWeight: "var(--weight-semibold)",
                  fontVariantNumeric: col.numeric ? "tabular-nums" : "normal",
                }}>{summary[col.key] ?? ""}</td>
              ))}
            </tr></tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

function EditableCell({ row, col, onCommit }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState("");
  const raw = row[col.key];
  const start = () => { setDraft(raw == null ? "" : String(raw)); setEditing(true); };
  const commit = () => { setEditing(false); if (draft !== String(raw ?? "")) onCommit?.(draft); };
  if (editing) {
    return (
      <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
        aria-label={typeof col.label === "string" ? col.label : undefined}
        style={{
          width: "100%", height: "var(--row-height)", border: 0, outline: "none",
          padding: "0 var(--cell-padding-x)", background: "var(--card)",
          boxShadow: "inset 0 0 0 2px hsl(var(--brand-green-hsl) / .55)",
          font: "var(--type-body)", color: "var(--foreground)",
          textAlign: col.numeric ? "right" : "left", fontVariantNumeric: col.numeric ? "tabular-nums" : "normal",
        }} />
    );
  }
  return (
    <button type="button" onClick={start}
      style={{
        display: "block", width: "100%", height: "var(--row-height)", border: 0, cursor: "text",
        padding: "0 var(--cell-padding-x)", background: "transparent", textAlign: col.numeric ? "right" : "left",
        font: "var(--type-body)", fontWeight: col.strong ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: raw == null || raw === "" ? "var(--muted-foreground)" : "var(--foreground)",
        fontVariantNumeric: col.numeric ? "tabular-nums" : "normal",
        borderBottom: "1px dashed hsl(var(--foreground-hsl) / .18)",
      }}>
      {col.render ? col.render(row) : (raw == null || raw === "" ? "—" : raw)}
    </button>
  );
}

function Row({ selected, onClick, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <tr onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        height: "var(--row-height)", cursor: onClick ? "pointer" : "default",
        background: selected ? "hsl(var(--brand-green-hsl) / .05)" : hover && onClick ? "var(--surface-hover)" : "transparent",
        transition: "background-color var(--duration-fast)",
      }}>{children}</tr>
  );
}
