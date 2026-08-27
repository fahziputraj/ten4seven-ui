import React from "react";

export function Stat({ label, value, unit, caption, trend, align = "left", size = "md", divider = false, style, ...rest }) {
  const big = size === "lg";
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 3, minWidth: 0, textAlign: align,
      alignItems: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
      paddingLeft: divider ? "var(--space-5)" : 0,
      borderLeft: divider ? "1px solid var(--border-subtle)" : "none", ...style,
    }} {...rest}>
      <span style={{
        font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)",
      }}>{label}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)",
          fontSize: big ? "var(--text-3xl)" : "var(--text-xl)", lineHeight: 1.05,
          letterSpacing: big ? "var(--tracking-metric)" : "var(--tracking-title)",
          fontVariantNumeric: "tabular-nums", color: "var(--foreground)",
        }}>{value}</span>
        {unit && <span style={{ font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", color: "var(--muted-foreground)" }}>{unit}</span>}
        {trend}
      </span>
      {caption && <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{caption}</span>}
    </div>
  );
}
