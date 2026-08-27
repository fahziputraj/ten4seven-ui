import React from "react";

export function Switch({ checked = false, onChange, label, description, disabled, id, style, ...rest }) {
  return (
    <label htmlFor={id} style={{ display: "inline-flex", alignItems: description ? "flex-start" : "center", gap: "var(--space-3)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{ position: "relative", display: "inline-flex", flex: "none", height: 22, width: 40, marginTop: description ? 1 : 0 }}>
        <input id={id} type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled}
          style={{ position: "absolute", inset: 0, opacity: 0, margin: 0, cursor: "inherit" }} {...rest} />
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-full)", background: checked ? "var(--primary)" : "var(--surface-inset)", border: "1px solid " + (checked ? "var(--primary)" : "var(--input)"), transition: "background-color var(--duration-normal),border-color var(--duration-normal)" }} />
        <span aria-hidden="true" style={{ position: "absolute", top: 3, left: checked ? 21 : 3, height: 16, width: 16, borderRadius: "var(--radius-full)", background: "var(--neutral-0)", boxShadow: "0 1px 2px rgba(19,64,35,.25)", transition: "left var(--duration-normal) var(--ease-out)" }} />
      </span>
      {label && <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)", color: "var(--foreground)" }}>{label}</span>
        {description && <span style={{ display: "block", marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</span>}
      </span>}
    </label>
  );
}
