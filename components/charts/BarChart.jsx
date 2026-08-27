import React from "react";

export function BarChart({
  data = [], height = 160, target, tone = "green", stacked = false, series = [],
  valueFormat = (v) => String(v).replace(".", ","), targetLabel = "Target", showValues = false, style, ...rest
}) {
  const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  const base = { green: "var(--chart-1)", teal: "var(--chart-2)", orange: "var(--chart-3)", lime: "var(--chart-4)", violet: "var(--chart-5)" }[tone];
  const totals = data.map((d) => stacked ? (d.values || []).reduce((a, b) => a + b, 0) : d.value);
  const top = Math.max(...totals, target ?? 0) * 1.1 || 1;
  const [hover, setHover] = React.useState(null);
  return (
    <div style={style} {...rest}>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 8, height }}>
        {target != null && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 20 + ((target / top) * (height - 20)), borderTop: "1px dashed hsl(var(--brand-orange-hsl) / .55)" }}>
            <span style={{ position: "absolute", right: 0, top: -15, font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", color: "var(--brand-orange)" }}>{targetLabel}</span>
          </div>
        )}
        {data.map((d, i) => {
          const h = (totals[i] / top) * (height - 20);
          const on = hover === i;
          return (
            <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", cursor: "default" }}>
              {showValues && <div style={{ textAlign: "center", marginBottom: 4, font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums", color: on ? "var(--foreground)" : "var(--muted-foreground)" }}>{valueFormat(totals[i])}</div>}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: h, borderRadius: "var(--radius-sm) var(--radius-sm) 0 0", overflow: "hidden", opacity: hover == null || on ? 1 : 0.55, transition: "opacity var(--duration-fast)" }}>
                {stacked
                  ? (d.values || []).map((v, s) => <div key={s} style={{ height: (v / (totals[i] || 1)) * 100 + "%", background: palette[s % palette.length] }} />)
                  : <div style={{ height: "100%", background: d.tone ? palette[0] : target != null && d.value < target ? "hsl(var(--chart-3-hsl) / .8)" : base }} />}
              </div>
              <div style={{ marginTop: 6, textAlign: "center", font: "var(--type-caption)", fontSize: "var(--text-2xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.label}</div>
            </div>
          );
        })}
      </div>
      {stacked && series.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
          {series.map((s, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
              <span style={{ height: 8, width: 8, borderRadius: 2, background: palette[i % palette.length] }} />{s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
