import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Select({ options = [], placeholder, invalid = false, size = "md", icon, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "sm" ? "2.25rem" : size === "lg" ? "3rem" : "2.75rem";
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", height: h, width: "100%", borderRadius: "var(--radius-control)", border: "1px solid " + (invalid ? "var(--danger)" : focus ? "hsl(var(--brand-green-hsl) / .65)" : "var(--input)"), background: focus ? "var(--card)" : "var(--surface-elevated)", boxShadow: focus ? "0 0 0 3px hsl(var(--ring-hsl) / .25)" : "none", transition: "border-color var(--duration-fast),box-shadow var(--duration-fast)", opacity: disabled ? 0.5 : 1, ...style }}>
      {icon && <Icon name={icon} size={16} style={{ position: "absolute", left: "var(--space-3)", color: "var(--muted-foreground)", pointerEvents: "none" }} />}
      <select disabled={disabled} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, minWidth: 0, height: "100%", appearance: "none", border: 0, outline: "none", background: "transparent", paddingLeft: icon ? "2.25rem" : "var(--space-3)", paddingRight: "2.25rem", font: "var(--type-body)", color: "var(--foreground)", cursor: disabled ? "not-allowed" : "pointer" }} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: o } : o;
          return <option key={opt.value} value={opt.value}>{opt.label}</option>;
        })}
      </select>
      <Icon name="chevronDown" size={16} style={{ position: "absolute", right: "var(--space-3)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
    </div>
  );
}
