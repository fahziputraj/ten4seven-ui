import React from "react";

export function LineChart({
  series = [], labels = [], height = 180, target, targetLabel = "Target", yFormat = (v) => String(Math.round(v)).replace(".", ","),
  area = false, style, ...rest
}) {
  const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
  const all = series.flatMap((s) => s.data).concat(target != null ? [target] : []);
  if (!all.length) return null;
  const pad = { l: 38, r: 8, t: 10, b: 22 };
  const w = 100, h = height;
  const min = Math.min(...all), max = Math.max(...all);
  const lo = min - (max - min || 1) * 0.15, hi = max + (max - min || 1) * 0.15;
  const px = (i, n) => pad.l + (i / Math.max(1, n - 1)) * (w - pad.l - pad.r);
  const py = (v) => pad.t + (1 - (v - lo) / (hi - lo)) * (h - pad.t - pad.b);
  const ticks = [hi, (hi + lo) / 2, lo];
  return (
    <div style={style} {...rest}>
      <svg viewBox={"0 0 " + w + " " + h} preserveAspectRatio="none" width="100%" height={h} role="img" style={{ display: "block", overflow: "visible" }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} y1={py(t)} x2={w - pad.r} y2={py(t)} stroke="var(--border)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
            <text x={pad.l - 5} y={py(t) + 3} textAnchor="end" style={{ font: "600 8px var(--font-body)", fill: "var(--muted-foreground)" }}>{yFormat(t)}</text>
          </g>
        ))}
        {target != null && <line x1={pad.l} y1={py(target)} x2={w - pad.r} y2={py(target)} stroke="var(--brand-orange)" strokeWidth="0.8" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />}
        {series.map((s, si) => {
          const color = s.tone ? "var(--chart-" + s.tone + ")" : palette[si % palette.length];
          const pts = s.data.map((v, i) => px(i, s.data.length) + "," + py(v)).join(" ");
          return (
            <g key={si}>
              {area && si === 0 && <polygon points={pad.l + "," + py(lo) + " " + pts + " " + (w - pad.r) + "," + py(lo)} fill={color} opacity="0.1" />}
              <polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>
          );
        })}
        {labels.map((l, i) => (
          <text key={i} x={px(i, labels.length)} y={h - 6} textAnchor="middle" style={{ font: "8px var(--font-body)", fill: "var(--muted-foreground)" }}>{l}</text>
        ))}
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-2)" }}>
        {series.map((s, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
            <span style={{ height: 2, width: 14, borderRadius: 2, background: s.tone ? "var(--chart-" + s.tone + ")" : palette[i % palette.length] }} />{s.name}
          </span>
        ))}
        {target != null && <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--brand-orange)" }}><span style={{ height: 0, width: 14, borderTop: "1px dashed var(--brand-orange)" }} />{targetLabel}</span>}
      </div>
    </div>
  );
}
