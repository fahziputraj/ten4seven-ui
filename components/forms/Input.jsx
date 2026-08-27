import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Input({ icon, iconEnd, invalid = false, size = "md", align, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "2.25rem" : size === "lg" ? "3rem" : "2.75rem";
  const shell = {
    position: "relative", display: "flex", alignItems: "center", height: h, width: "100%",
    borderRadius: "var(--radius-control)", border: "1px solid " + (invalid ? "var(--danger)" : focus ? "hsl(var(--brand-green-hsl) / .65)" : "var(--input)"),
    background: focus ? "var(--card)" : "var(--surface-elevated)",
    boxShadow: focus ? (invalid ? "0 0 0 3px hsl(var(--danger-hsl) / .18)" : "0 0 0 3px hsl(var(--ring-hsl) / .25)") : "none",
    transition: "border-color var(--duration-fast),box-shadow var(--duration-fast),background-color var(--duration-fast)",
    opacity: disabled ? 0.5 : 1,
  };
  const field = {
    flex: 1, minWidth: 0, height: "100%", border: 0, outline: "none", background: "transparent",
    padding: "0 var(--space-3)", paddingLeft: icon ? "2.25rem" : "var(--space-3)", paddingRight: iconEnd ? "2.25rem" : "var(--space-3)",
    font: "var(--type-body)", color: "var(--foreground)",
    textAlign: align || "left",
    fontVariantNumeric: align === "right" ? "tabular-nums" : "normal",
  };
  return (
    <div style={{ ...shell, ...style }}>
      {icon && <Icon name={icon} size={16} style={{ position: "absolute", left: "var(--space-3)", color: "var(--muted-foreground)", pointerEvents: "none" }} />}
      <input style={field} disabled={disabled} aria-invalid={invalid || undefined}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} {...rest} />
      {iconEnd && <Icon name={iconEnd} size={16} style={{ position: "absolute", right: "var(--space-3)", color: "var(--muted-foreground)", pointerEvents: "none" }} />}
    </div>
  );
}
