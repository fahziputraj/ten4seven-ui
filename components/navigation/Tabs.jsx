import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Tabs({ items = [], value, onChange, variant = "underline", size = "md", style, ...rest }) {
  const pill = variant === "pill";
  return (
    <div role="tablist" style={{
      display: "flex", alignItems: "center", gap: pill ? 4 : "var(--space-5)",
      borderBottom: pill ? "none" : "1px solid var(--border)",
      background: pill ? "var(--surface-muted)" : "transparent",
      borderRadius: pill ? "var(--radius-control)" : 0, padding: pill ? 4 : 0,
      width: pill ? "fit-content" : "100%", overflowX: "auto", ...style,
    }} {...rest}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button key={item.value} role="tab" aria-selected={active} type="button"
            disabled={item.disabled} onClick={() => onChange?.(item.value)}
            style={{
              display: "inline-flex", alignItems: "center", gap: "var(--space-2)", whiteSpace: "nowrap",
              border: "none", cursor: item.disabled ? "not-allowed" : "pointer", opacity: item.disabled ? 0.45 : 1,
              fontFamily: "var(--font-body)", fontSize: size === "sm" ? "var(--text-sm)" : "var(--text-base)",
              fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
              transition: "color var(--duration-fast),background-color var(--duration-fast),border-color var(--duration-fast)",
              ...(pill
                ? { padding: "0.375rem 0.75rem", borderRadius: "var(--radius-sm)", background: active ? "var(--card)" : "transparent",
                    color: active ? "var(--foreground)" : "var(--muted-foreground)", boxShadow: active ? "var(--card-shadow)" : "none" }
                : { padding: "0 0 0.625rem", background: "transparent", marginBottom: -1,
                    borderBottom: "2px solid " + (active ? "var(--primary)" : "transparent"),
                    color: active ? "var(--primary)" : "var(--muted-foreground)" }),
            }}>
            {item.icon && <Icon name={item.icon} size={15} />}
            {item.label}
            {item.count != null && (
              <span style={{
                marginLeft: 2, borderRadius: "var(--radius-full)", padding: "0.0625rem 0.375rem",
                fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums",
                background: active ? "hsl(var(--primary-hsl) / .12)" : "hsl(var(--foreground-hsl) / .06)",
                color: active ? "var(--primary)" : "var(--muted-foreground)",
              }}>{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
