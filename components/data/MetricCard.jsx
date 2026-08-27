import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconTile } from "../core/IconTile.jsx";

const trendColor = { up: "var(--metric-positive)", down: "var(--metric-negative)", flat: "var(--metric-neutral)" };
const accentColor = { green: "var(--brand-green)", lime: "var(--brand-lime)", orange: "var(--brand-orange)", blue: "var(--info)", violet: "var(--ai)", none: null };

export function MetricCard({
  label, value, unit, delta, direction = "flat", caption, icon, tone = "green", accent = "green",
  status, visualization, compact = false, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const rule = accentColor[accent];
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", overflow: "hidden", borderRadius: "var(--card-radius)",
        border: "1px solid var(--surface-border)", background: "var(--card)",
        boxShadow: hover ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transform: hover ? "translateY(var(--lift-hover))" : "none",
        transition: "box-shadow var(--duration-normal),transform var(--duration-normal),border-color var(--duration-normal)",
        borderColor: hover ? "hsl(var(--brand-green-hsl) / .42)" : "var(--surface-border)",
        padding: compact ? "var(--space-4)" : "var(--space-5)", ...style,
      }} {...rest}>
      {rule && <span aria-hidden="true" style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: rule }} />}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)" }}>
        {icon ? <IconTile icon={icon} tone={tone} size={compact ? "sm" : "md"} /> : <span />}
        {(delta || status) && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4, borderRadius: "var(--radius-full)",
            padding: "0.125rem 0.5rem", background: "hsl(var(--foreground-hsl) / .04)",
            font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums",
            color: delta ? trendColor[direction] : "var(--muted-foreground)",
          }}>
            {delta && <Icon name={direction === "up" ? "trendUp" : direction === "down" ? "trendDown" : "minus"} size={12} />}
            {delta || status}
          </span>
        )}
      </div>
      <div style={{ marginTop: compact ? "var(--space-3)" : "var(--space-4)", display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)",
          fontSize: compact ? "var(--text-2xl)" : "var(--text-3xl)", lineHeight: 1.05,
          letterSpacing: "var(--tracking-metric)", fontVariantNumeric: "tabular-nums", color: "var(--foreground)",
        }}>{value}</span>
        {unit && <span style={{ font: "var(--type-label)", color: "var(--muted-foreground)" }}>{unit}</span>}
      </div>
      <div style={{ marginTop: 6, font: "var(--type-label)", color: "var(--foreground)" }}>{label}</div>
      {caption && <div style={{ marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{caption}</div>}
      {visualization && <div style={{ marginTop: "var(--space-4)" }}>{visualization}</div>}
    </div>
  );
}
