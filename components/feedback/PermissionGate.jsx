import React from "react";
import { Icon } from "../core/Icon.jsx";
import { StateView } from "./StateView.jsx";

/**
 * Makes permission behavior explicit: hide, disable with an explanation, or
 * replace with the standard permission state. Use at page, action or field
 * boundaries; authorization remains a product/backend responsibility.
 */
export function PermissionGate({
  allowed = true,
  mode = "message",
  reason = "Anda tidak memiliki izin untuk melihat bagian ini.",
  children,
  fallback,
  style,
  ...rest
}) {
  if (allowed) return children;
  if (fallback) return fallback;
  if (mode === "hide") return null;
  if (mode === "disable") {
    return (
      <div aria-disabled="true" style={{ minWidth: 0, ...style }} {...rest}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)", marginBottom: "var(--space-2)", color: "var(--muted-foreground)", font: "var(--type-caption)" }}>
          <Icon name="permission" size={15} />
          <span>{reason}</span>
        </div>
        <fieldset disabled style={{ minWidth: 0, margin: 0, padding: 0, border: 0, opacity: 0.62 }}>{children}</fieldset>
      </div>
    );
  }
  return <StateView state="permission" description={reason} style={style} {...rest} />;
}
