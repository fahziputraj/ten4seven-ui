import React from "react";
import { Label } from "./Label.jsx";
import { Icon } from "../core/Icon.jsx";

export function FormField({ id, label, hint, error, required = false, permission, span = 1, children, style, ...rest }) {
  const locked = !!permission;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", minWidth: 0, gridColumn: span > 1 ? `span ${span}` : undefined, ...style }} {...rest}>
      {label && <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-2)" }}>
        <Label htmlFor={id} required={required}>{label}</Label>
        {locked && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "var(--type-caption)", color: "var(--muted-foreground)" }}><Icon name="lock" size={12} />{permission}</span>}
      </div>}
      {children}
      {error
        ? <div role="alert" id={id ? id + "-error" : undefined} style={{ display: "flex", alignItems: "flex-start", gap: "0.375rem", font: "var(--type-caption)", color: "var(--danger)" }}><Icon name="error" size={13} style={{ marginTop: 1 }} />{error}</div>
        : hint ? <div style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{hint}</div> : null}
    </div>
  );
}
