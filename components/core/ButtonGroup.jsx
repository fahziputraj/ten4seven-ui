import React from "react";
import { Icon } from "./Icon.jsx";

export function ButtonGroup({ items = [], value, onChange, size = "md", fullWidth = false, style, ...rest }) {
  const h = { sm: "2rem", md: "2.5rem", lg: "2.75rem" }[size];
  return (
    <div role="group" style={{
      display: "inline-flex", width: fullWidth ? "100%" : "fit-content",
      borderRadius: "var(--radius-control)", border: "1px solid var(--input)",
      background: "var(--card)", overflow: "hidden", ...style,
    }} {...rest}>
      {items.map((item, i) => {
        const on = item.value === value;
        return (
          <button key={item.value} type="button" disabled={item.disabled} onClick={() => onChange?.(item.value)}
            aria-pressed={on} title={item.label && !item.showLabel ? undefined : item.title}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
              flex: fullWidth ? 1 : "none", height: h, padding: item.icon && !item.label ? "0 " + (size === "sm" ? "8px" : "10px") : "0 var(--space-4)",
              border: 0, borderLeft: i > 0 ? "1px solid var(--input)" : "none", cursor: item.disabled ? "not-allowed" : "pointer",
              background: on ? "var(--primary)" : "transparent",
              color: on ? "var(--primary-foreground)" : "var(--foreground)",
              opacity: item.disabled ? 0.45 : 1,
              fontFamily: "var(--font-body)", fontSize: size === "sm" ? "var(--text-sm)" : "var(--text-base)",
              fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)", whiteSpace: "nowrap",
              transition: "background-color var(--duration-fast),color var(--duration-fast)",
            }}>
            {item.icon && <Icon name={item.icon} size={size === "sm" ? 14 : 16} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
