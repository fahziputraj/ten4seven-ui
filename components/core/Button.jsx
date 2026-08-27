import React from "react";
import { Icon } from "./Icon.jsx";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
  whiteSpace: "nowrap", fontFamily: "var(--font-body)", fontWeight: "var(--weight-semibold)",
  borderRadius: "var(--radius-control)", border: "1px solid transparent", cursor: "pointer",
  transition: "background-color var(--duration-normal),border-color var(--duration-normal),color var(--duration-normal),box-shadow var(--duration-normal),transform var(--duration-normal)",
};

const buttonVariantSx = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "var(--surface-shadow)" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", boxShadow: "var(--shadow-1)" },
  outline: { background: "var(--card)", color: "var(--foreground)", borderColor: "var(--input)" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", boxShadow: "var(--shadow-1)" },
  soft: { background: "var(--surface-subtle)", color: "var(--foreground)" },
  ghost: { background: "transparent", color: "var(--foreground)" },
  link: { background: "transparent", color: "var(--primary)", padding: 0, height: "auto", textUnderlineOffset: "4px" },
};

const buttonHoverSx = {
  default: { background: "hsl(var(--primary-hsl) / .9)" },
  destructive: { background: "hsl(var(--destructive-hsl) / .9)" },
  outline: { borderColor: "hsl(var(--brand-green-hsl) / .35)", background: "var(--accent)" },
  secondary: { background: "hsl(var(--secondary-hsl) / .8)" },
  soft: { background: "var(--surface-hover)" },
  ghost: { background: "var(--accent)" },
  link: { textDecoration: "underline" },
};

const buttonSizeSx = {
  sm: { height: "2rem", padding: "0 var(--space-3)", fontSize: "var(--text-sm)", borderRadius: "var(--radius-md)" },
  md: { height: "2.5rem", padding: "0 var(--space-4)", fontSize: "var(--text-base)" },
  lg: { height: "2.75rem", padding: "0 var(--space-6)", fontSize: "var(--text-md)" },
  xl: { height: "3rem", padding: "0 var(--space-6)", fontSize: "var(--text-md)" },
  icon: { height: "2.5rem", width: "2.5rem", padding: 0 },
};

export function Button({
  variant = "default", size = "md", icon, iconEnd, loading = false, disabled = false,
  fullWidth = false, children, style, ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const off = disabled || loading;
  const sx = {
    ...base, ...buttonSizeSx[size], ...buttonVariantSx[variant],
    ...(hover && !off ? buttonHoverSx[variant] : null),
    ...(fullWidth ? { width: "100%" } : null),
    ...(off ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : null),
    ...style,
  };
  return (
    <button type="button" style={sx} disabled={off} aria-busy={loading || undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      {loading ? <Icon name="loading" size={16} style={{ animation: "aapm-spin 1s linear infinite" }} />
        : icon ? <Icon name={icon} size={16} /> : null}
      {children}
      {iconEnd && !loading ? <Icon name={iconEnd} size={16} /> : null}
    </button>
  );
}
