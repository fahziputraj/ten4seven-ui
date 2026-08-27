import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const toneColor = { success: "var(--success)", danger: "var(--danger)", warning: "var(--warning)", info: "var(--info)", neutral: "var(--foreground)" };
const toneIcon = { success: "success", danger: "error", warning: "warning", info: "info", neutral: "info" };

export function Toast({ tone = "success", title, description, action, onClose, style, ...rest }) {
  return (
    <div role={tone === "danger" ? "alert" : "status"} aria-live={tone === "danger" ? "assertive" : "polite"} style={{
      display: "flex", alignItems: "flex-start", gap: "var(--space-3)", minWidth: 280, maxWidth: 380,
      borderRadius: "var(--radius-panel)", border: "1px solid var(--surface-border)", background: "var(--popover)",
      boxShadow: "var(--shadow-3)", padding: "var(--space-4)", ...style,
    }} {...rest}>
      <Icon name={toneIcon[tone]} size={18} style={{ color: toneColor[tone], marginTop: 1 }} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ font: "var(--type-label)", color: "var(--foreground)" }}>{title}</div>
        {description && <div style={{ marginTop: 3, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</div>}
        {action && <div style={{ marginTop: "var(--space-3)" }}>{action}</div>}
      </div>
      {onClose && <IconButton icon="close" label="Tutup notifikasi" variant="ghost" size="sm" onClick={onClose} />}
    </div>
  );
}
