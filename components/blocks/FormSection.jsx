import React from "react";

export function FormSection({ title, description, columns = 1, actions, children, divider = true, style, ...rest }) {
  return (
    <section style={{ paddingBottom: "var(--space-6)", borderBottom: divider ? "1px solid var(--border-subtle)" : "none", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", marginBottom: "var(--space-4)" }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: 0, font: "var(--type-card-title)", color: "var(--foreground)" }}>{title}</h3>
          {description && <p style={{ margin: "4px 0 0", maxWidth: "60ch", font: "var(--type-caption)", color: "var(--muted-foreground)", textWrap: "pretty" }}>{description}</p>}
        </div>
        {actions}
      </div>
      <div style={{ display: "grid", gap: "var(--space-4) var(--space-5)", gridTemplateColumns: "repeat(" + columns + ",minmax(0,1fr))" }}>{children}</div>
    </section>
  );
}
