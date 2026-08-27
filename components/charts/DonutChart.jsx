import React from "react";

export function DonutChart({ data = [], size = 140, thickness = 16, centerValue, centerLabel, style, ...rest }) {
  const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const r = (size - thickness) / 2, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", ...style }} {...rest}>
      <div style={{ position: "relative", flex: "none", width: size, height: size }}>
        <svg width={size} height={size} role="img" style={{ display: "block", transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-inset)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const len = (d.value / total) * c;
            const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={d.tone ? "var(--chart-" + d.tone + ")" : palette[i % palette.length]} strokeWidth={thickness}
              strokeDasharray={len + " " + (c - len)} strokeDashoffset={-acc} strokeLinecap="butt" />;
            acc += len;
            return el;
          })}
        </svg>
        {(centerValue || centerLabel) && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            {centerValue && <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--text-2xl)", letterSpacing: "var(--tracking-metric)", fontVariantNumeric: "tabular-nums" }}>{centerValue}</span>}
            {centerLabel && <span style={{ marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{centerLabel}</span>}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        {data.map((d, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, font: "var(--type-body)", fontSize: "var(--text-sm)" }}>
            <span style={{ height: 9, width: 9, flex: "none", borderRadius: 2, background: d.tone ? "var(--chart-" + d.tone + ")" : palette[i % palette.length] }} />
            <span style={{ minWidth: 0, flex: 1, color: "var(--foreground)" }}>{d.label}</span>
            <span style={{ fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums", color: "var(--muted-foreground)" }}>{d.display ?? Math.round((d.value / total) * 100) + "%"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
