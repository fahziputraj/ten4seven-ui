import React from "react";

export function Heatmap({ rows = [], columns = [], data = [], tone = "green", cell = 26, gap = 3, valueFormat = (v) => String(v).replace(".", ","), legend = true, style, ...rest }) {
  const flat = data.flat().filter((v) => typeof v === "number");
  const min = Math.min(...flat, 0), max = Math.max(...flat, 1);
  const hsl = { green: "var(--chart-1-hsl)", orange: "var(--chart-3-hsl)", danger: "var(--danger-hsl)", teal: "var(--chart-2-hsl)" }[tone];
  const alpha = (v) => typeof v !== "number" ? 0 : 0.08 + ((v - min) / (max - min || 1)) * 0.85;
  return (
    <div style={style} {...rest}>
      <div style={{ display: "grid", gridTemplateColumns: "auto repeat(" + columns.length + ",minmax(0,1fr))", gap, alignItems: "center" }}>
        <span />
        {columns.map((c, i) => <span key={i} style={{ textAlign: "center", font: "var(--type-caption)", fontSize: "var(--text-2xs)", color: "var(--muted-foreground)" }}>{c}</span>)}
        {rows.map((r, ri) => (
          <React.Fragment key={ri}>
            <span style={{ paddingRight: "var(--space-3)", font: "var(--type-caption)", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{r}</span>
            {columns.map((_, ci) => {
              const v = data[ri]?.[ci];
              const a = alpha(v);
              return (
                <span key={ci} title={typeof v === "number" ? valueFormat(v) : "Tidak ada data"}
                  style={{
                    height: cell, borderRadius: "var(--radius-xs,4px)", display: "flex", alignItems: "center", justifyContent: "center",
                    background: typeof v === "number" ? "hsl(" + hsl + " / " + a + ")" : "var(--surface-inset)",
                    border: typeof v === "number" ? "none" : "1px dashed var(--border)",
                    font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
                    fontVariantNumeric: "tabular-nums", color: a > 0.55 ? "var(--primary-foreground)" : "var(--foreground)",
                  }}>{typeof v === "number" ? valueFormat(v) : "—"}</span>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {legend && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "var(--space-3)", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
          <span>{valueFormat(min)}</span>
          {[0.12, 0.3, 0.5, 0.7, 0.9].map((a) => <span key={a} style={{ height: 10, width: 22, borderRadius: 2, background: "hsl(" + hsl + " / " + a + ")" }} />)}
          <span>{valueFormat(max)}</span>
        </div>
      )}
    </div>
  );
}
