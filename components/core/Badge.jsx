import React from "react";
import { Icon } from "./Icon.jsx";

export const badgeVariantSx = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "transparent" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "transparent" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", borderColor: "transparent" },
  outline: { background: "transparent", color: "var(--foreground)", borderColor: "var(--border)" },
  soft: { background: "var(--surface-subtle)", color: "var(--foreground)", borderColor: "transparent" },
  success: { background: "hsl(var(--success-hsl) / .1)", color: "var(--success)", borderColor: "transparent" },
  warning: { background: "hsl(var(--warning-hsl) / .1)", color: "var(--warning)", borderColor: "transparent" },
  danger: { background: "hsl(var(--danger-hsl) / .1)", color: "var(--danger)", borderColor: "transparent" },
  info: { background: "hsl(var(--info-hsl) / .1)", color: "var(--info)", borderColor: "transparent" },
  ai: { background: "hsl(var(--ai-hsl) / .1)", color: "var(--ai)", borderColor: "transparent" },
  lime: { background: "var(--tint-lime)", color: "var(--tint-lime-foreground)", borderColor: "transparent" },
  green: { background: "var(--tint-green)", color: "var(--tint-green-foreground)", borderColor: "transparent" },
  orange: { background: "var(--tint-orange)", color: "var(--tint-orange-foreground)", borderColor: "transparent" },
};

export function Badge({ variant = "default", icon, dot = false, overline = false, children, style, ...rest }) {
  const sx = {
    display: "inline-flex", width: "fit-content", alignItems: "center", gap: "0.375rem",
    borderRadius: "var(--radius-full)", border: "1px solid transparent",
    padding: "0.25rem 0.625rem", fontFamily: "var(--font-body)",
    fontSize: overline ? "var(--text-2xs)" : "var(--text-sm)",
    fontWeight: "var(--weight-semibold)", lineHeight: 1.25,
    letterSpacing: overline ? "var(--tracking-overline)" : "0",
    textTransform: overline ? "uppercase" : "none",
    transition: "background-color var(--duration-fast)",
    ...badgeVariantSx[variant], ...style,
  };
  return (
    <span style={sx} {...rest}>
      {dot && <span style={{ height: 6, width: 6, borderRadius: "var(--radius-full)", background: "currentColor", flex: "none" }} />}
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}
