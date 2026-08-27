import React from "react";
import { Icon } from "../core/Icon.jsx";

export function ActionFooter({ primary, secondary, tertiary, hint, sticky = true, style, ...rest }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap",
      padding: "var(--space-4) var(--space-5)",
      borderTop: "1px solid var(--border)", background: "hsl(var(--background-hsl) / .92)",
      backdropFilter: sticky ? "blur(12px)" : "none",
      position: sticky ? "sticky" : "static", bottom: 0, zIndex: 20, ...style,
    }} {...rest}>
      {tertiary}
      {hint && (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
          <Icon name="info" size={14} /> {hint}
        </span>
      )}
      <span style={{ flex: 1 }} />
      {secondary}
      {primary}
    </div>
  );
}
