import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const toneSx = {
  info:    { hsl: "var(--info-hsl)",    color: "var(--info)",    icon: "info" },
  success: { hsl: "var(--success-hsl)", color: "var(--success)", icon: "success" },
  warning: { hsl: "var(--warning-hsl)", color: "var(--warning)", icon: "warning" },
  danger:  { hsl: "var(--danger-hsl)",  color: "var(--danger)",  icon: "error" },
  neutral: { hsl: "var(--foreground-hsl)", color: "var(--foreground)", icon: "info" },
  brand:   { hsl: "var(--brand-green-hsl)", color: "var(--brand-green)", icon: "info" },
};

export function Alert({ tone = "info", title, children, icon, action, onDismiss, banner = false, style, ...rest }) {
  const t = toneSx[tone] || toneSx.info;
  return (
    <div role={tone === "danger" ? "alert" : "status"} aria-live="polite" style={{
      display: "flex", alignItems: "flex-start", gap: "var(--space-3)",
      borderRadius: banner ? 0 : "var(--radius-panel)",
      border: "1px solid hsl(" + t.hsl + " / .2)", borderLeft: banner ? "none" : undefined, borderRight: banner ? "none" : undefined,
      background: "hsl(" + t.hsl + " / .08)", padding: "var(--space-3) var(--space-4)", ...style,
    }} {...rest}>
      <Icon name={icon || t.icon} size={17} style={{ color: t.color, marginTop: 1 }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        {title && <div style={{ font: "var(--type-label)", color: t.color }}>{title}</div>}
        {children && <div style={{ marginTop: title ? 3 : 0, font: "var(--type-body)", fontSize: "var(--text-sm)", lineHeight: "1.15rem", color: "var(--foreground)" }}>{children}</div>}
        {action && <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "var(--space-2)" }}>{action}</div>}
      </div>
      {onDismiss && <IconButton icon="close" label="Tutup" variant="ghost" size="sm" onClick={onDismiss} />}
    </div>
  );
}
