import React from "react";
import { IconButton } from "../core/IconButton.jsx";

export function Pagination({ page = 1, pageCount = 1, total, pageSize = 25, onChange, style, ...rest }) {
  const from = total ? (page - 1) * pageSize + 1 : null;
  const to = total ? Math.min(page * pageSize, total) : null;
  const pages = [];
  const push = (p) => pages.push(p);
  if (pageCount <= 7) { for (let p = 1; p <= pageCount; p++) push(p); }
  else {
    push(1);
    if (page > 3) push("…");
    for (let p = Math.max(2, page - 1); p <= Math.min(pageCount - 1, page + 1); p++) push(p);
    if (page < pageCount - 2) push("…");
    push(pageCount);
  }
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)",
      flexWrap: "wrap", padding: "var(--space-3) 0", ...style,
    }} {...rest}>
      <div style={{ font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>
        {total != null ? "Menampilkan " + from + "–" + to + " dari " + total : "Halaman " + page + " dari " + pageCount}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <IconButton icon="chevronLeft" label="Halaman sebelumnya" variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange?.(page - 1)} />
        {pages.map((p, i) => p === "…"
          ? <span key={"e" + i} style={{ padding: "0 4px", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>…</span>
          : <button key={p} type="button" onClick={() => onChange?.(p)} aria-current={p === page ? "page" : undefined}
              style={{
                minWidth: 32, height: 32, borderRadius: "var(--radius-md)", cursor: "pointer",
                border: "1px solid " + (p === page ? "transparent" : "var(--input)"),
                background: p === page ? "var(--primary)" : "var(--card)",
                color: p === page ? "var(--primary-foreground)" : "var(--foreground)",
                fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
                fontVariantNumeric: "tabular-nums", transition: "background-color var(--duration-fast)",
              }}>{p}</button>)}
        <IconButton icon="chevronRight" label="Halaman berikutnya" variant="outline" size="sm" disabled={page >= pageCount} onClick={() => onChange?.(page + 1)} />
      </div>
    </div>
  );
}
