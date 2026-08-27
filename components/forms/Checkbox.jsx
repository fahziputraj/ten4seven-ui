import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Checkbox({ checked, indeterminate = false, onChange, label, description, disabled, id, style, ...rest }) {
  const on = indeterminate || checked;
  const box = {
    display: "inline-flex", flex: "none", alignItems: "center", justifyContent: "center",
    height: 18, width: 18, borderRadius: "0.3125rem", cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid " + (on ? "var(--primary)" : "var(--input)"),
    background: on ? "var(--primary)" : "var(--surface-elevated)",
    color: "var(--primary-foreground)",
    transition: "background-color var(--duration-fast),border-color var(--duration-fast)",
  };
  return (
    <label htmlFor={id} style={{ display: "inline-flex", alignItems: description ? "flex-start" : "center", gap: "var(--space-2)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <span style={{ position: "relative", display: "inline-flex", marginTop: description ? 1 : 0 }}>
        <input id={id} type="checkbox" checked={!!checked} onChange={onChange} disabled={disabled}
          style={{ position: "absolute", inset: 0, opacity: 0, margin: 0, cursor: "inherit" }} {...rest} />
        <span style={box} aria-hidden="true">{indeterminate ? <Icon name="minus" size={12} /> : checked ? <Icon name="check" size={12} /> : null}</span>
      </span>
      {label && <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: description ? "var(--weight-medium)" : "var(--weight-regular)", color: "var(--foreground)" }}>{label}</span>
        {description && <span style={{ display: "block", marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</span>}
      </span>}
    </label>
  );
}
