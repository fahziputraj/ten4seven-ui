import React from "react";
import { Icon } from "../core/Icon.jsx";

export function EmptyState({ icon = "search", illustration, title, description, action, variant = "dashed", style, ...rest }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
      borderRadius: "var(--card-radius)", padding: "var(--space-10) var(--space-6)",
      border: variant === "dashed" ? "1px dashed var(--border)" : "1px solid var(--surface-border)",
      background: variant === "dashed" ? "var(--surface-subtle)" : "var(--card)",
      boxShadow: variant === "card" ? "var(--card-shadow)" : "none", ...style,
    }} {...rest}>
      {illustration
        ? <img src={illustration} alt="" style={{ height: 96, width: "auto", marginBottom: "var(--space-4)", opacity: 0.95 }} />
        : <span style={{
            height: 48, width: 48, borderRadius: "var(--radius-panel)", marginBottom: "var(--space-4)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "var(--tint-green)", color: "var(--tint-green-foreground)",
          }}><Icon name={icon} size={24} /></span>}
      <div style={{ font: "var(--type-card-title)", fontSize: "var(--text-lg)", color: "var(--foreground)" }}>{title}</div>
      {description && <p style={{ margin: "var(--space-2) 0 0", maxWidth: 440, font: "var(--type-body)", lineHeight: "1.35rem", color: "var(--muted-foreground)" }}>{description}</p>}
      {action && <div style={{ marginTop: "var(--space-5)", display: "flex", gap: "var(--space-2)" }}>{action}</div>}
    </div>
  );
}
