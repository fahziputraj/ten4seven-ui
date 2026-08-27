import React from "react";
import { IconButton } from "../core/IconButton.jsx";

export function Drawer({ open = true, onClose, side = "right", title, description, width = 420, footer, children, style, ...rest }) {
  React.useEffect(() => {
    if (!open || !onClose) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const isRight = side === "right";
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: isRight ? "flex-end" : "flex-start", background: "hsl(var(--aapm-green-950-hsl) / .45)" }} onClick={onClose}>
      <aside role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: width, height: "100%", display: "flex", flexDirection: "column",
          background: "var(--popover)", boxShadow: "var(--shadow-3)",
          borderLeft: isRight ? "1px solid var(--surface-border)" : "none",
          borderRight: isRight ? "none" : "1px solid var(--surface-border)", ...style,
        }} {...rest}>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "var(--space-3)", flex: "none",
          padding: "var(--space-5) var(--space-5) var(--space-4)", borderBottom: "1px solid var(--border)",
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
            {description && <p style={{ margin: "5px 0 0", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</p>}
          </div>
          {onClose && <IconButton icon="close" label="Tutup panel" variant="ghost" size="sm" onClick={onClose} />}
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-5)", font: "var(--type-body)" }}>{children}</div>
        {footer && (
          <div style={{
            flex: "none", display: "flex", gap: "var(--space-2)", justifyContent: "flex-end", flexWrap: "wrap",
            padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)",
          }}>{footer}</div>
        )}
      </aside>
    </div>
  );
}
