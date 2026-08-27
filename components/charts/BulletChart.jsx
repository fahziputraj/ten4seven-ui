import React from "react";

export function BulletChart({ value = 0, target, max, label, valueLabel, targetLabel = "Target", tone, height = 10, style, ...rest }) {
  const top = max ?? (Math.max(value, target ?? 0) * 1.15 || 1);
  const pct = Math.max(0, Math.min(100, (value / top) * 100));
  const tpct = target != null ? Math.max(0, Math.min(100, (target / top) * 100)) : null;
  const auto = target == null ? "var(--chart-1)" : value >= target ? "var(--success)" : value >= target * 0.9 ? "var(--warning)" : "var(--danger)";
  const fill = tone ? { green: "var(--chart-1)", lime: "var(--brand-lime)", orange: "var(--brand-orange)", danger: "var(--danger)" }[tone] : auto;
  return (
    <div style={style} {...rest}>
      {(label || valueLabel) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-3)", marginBottom: 6 }}>
          {label && <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{label}</span>}
          {valueLabel && <span style={{ font: "var(--type-label)", fontVariantNumeric: "tabular-nums", color: "var(--foreground)" }}>{valueLabel}</span>}
        </div>
      )}
      <div role="meter" aria-valuenow={value} aria-valuemax={top} aria-label={typeof label === "string" ? label : undefined}
        style={{ position: "relative", height, borderRadius: "var(--radius-full)", background: "var(--surface-inset)", overflow: "visible" }}>
        <div style={{ height: "100%", width: pct + "%", borderRadius: "var(--radius-full)", background: fill, transition: "width var(--duration-slow) var(--ease-out)" }} />
        {tpct != null && (
          <span title={targetLabel} style={{ position: "absolute", top: -3, bottom: -3, left: tpct + "%", width: 2, borderRadius: 1, background: "var(--brand-orange)" }} />
        )}
      </div>
    </div>
  );
}
