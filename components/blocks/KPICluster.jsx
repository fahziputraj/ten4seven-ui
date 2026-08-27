import React from "react";
import { MetricCard } from "../data/MetricCard.jsx";

export function KPICluster({ items = [], columns = 4, compact = false, title, action, style, ...rest }) {
  return (
    <section style={style} {...rest}>
      {(title || action) && (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-4)", marginBottom: "var(--space-3)" }}>
          {title && <h2 style={{
            margin: 0, font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
            letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)",
          }}>{title}</h2>}
          {action}
        </div>
      )}
      <div style={{ display: "grid", gap: "var(--space-3)", gridTemplateColumns: "repeat(auto-fit,minmax(" + (compact ? 180 : 210) + "px,1fr))" }}>
        {items.slice(0, columns * 2).map((item, i) => <MetricCard key={i} compact={compact} {...item} />)}
      </div>
    </section>
  );
}
