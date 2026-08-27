import React from "react";

export function PageHeader({ overline, title, description, breadcrumb, actions, meta, style, ...rest }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", ...style }} {...rest}>
      {breadcrumb}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-5)", flexWrap: "wrap" }}>
        <div style={{ minWidth: 0, flex: "1 1 320px" }}>
          {overline && <div style={{
            font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
            letterSpacing: "var(--tracking-overline-wide)", textTransform: "uppercase",
            color: "var(--muted-foreground)", marginBottom: 6,
          }}>{overline}</div>}
          <h1 style={{
            margin: 0, fontFamily: "var(--font-heading)", fontWeight: "var(--weight-semibold)",
            fontSize: "var(--text-2xl)", lineHeight: 1.15, letterSpacing: "var(--tracking-title)", color: "var(--foreground)",
          }}>{title}</h1>
          {description && <p style={{
            margin: "var(--space-2) 0 0", maxWidth: "58ch", font: "var(--type-body)",
            lineHeight: "1.3rem", color: "var(--muted-foreground)", textWrap: "pretty",
          }}>{description}</p>}
        </div>
        {actions && <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>{actions}</div>}
      </div>
      {meta && <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>{meta}</div>}
    </header>
  );
}
