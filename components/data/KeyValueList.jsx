import React from "react";

export function KeyValueList({ items = [], columns = 1, dense = false, style, ...rest }) {
  return (
    <dl style={{
      margin: 0, display: "grid", gridTemplateColumns: "repeat(" + columns + ",minmax(0,1fr))",
      columnGap: "var(--space-8)", rowGap: dense ? "var(--space-2)" : "var(--space-3)", ...style,
    }} {...rest}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "minmax(96px,38%) 1fr", gap: "var(--space-3)",
          alignItems: "baseline", paddingBottom: dense ? 0 : "var(--space-3)",
          borderBottom: dense ? "none" : "1px solid var(--border-subtle)",
        }}>
          <dt style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{item.label}</dt>
          <dd style={{
            margin: 0, font: "var(--type-body)", fontWeight: item.strong ? "var(--weight-semibold)" : "var(--weight-medium)",
            color: item.value == null || item.value === "" ? "var(--muted-foreground)" : "var(--foreground)",
            fontVariantNumeric: item.numeric ? "tabular-nums" : "normal",
            textAlign: item.numeric ? "right" : "left", wordBreak: "break-word",
          }}>{item.value == null || item.value === "" ? "—" : item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
