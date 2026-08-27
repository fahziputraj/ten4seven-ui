import React from "react";
import { Icon } from "./Icon.jsx";

const iconBtnSizeSx = { sm: 32, md: 40, lg: 44 };

export function IconButton({ icon, label, variant = "ghost", size = "md", tone, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const px = iconBtnSizeSx[size];
  const shell = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: px, width: px, borderRadius: "var(--radius-control)", cursor: "pointer",
    border: variant === "outline" ? "1px solid var(--input)" : "1px solid transparent",
    background: variant === "soft" ? "var(--surface-subtle)" : variant === "outline" ? "var(--card)" : "transparent",
    color: tone ? `var(--${tone})` : "var(--muted-foreground)",
    transition: "background-color var(--duration-fast),color var(--duration-fast),border-color var(--duration-fast)",
    ...(hover && !disabled ? { background: "var(--surface-hover)", color: tone ? `var(--${tone})` : "var(--foreground)" } : null),
    ...(disabled ? { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } : null),
    ...style,
  };
  return (
    <button type="button" aria-label={label} title={label} style={shell} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} {...rest}>
      <Icon name={icon} size={size === "sm" ? 16 : 18} />
    </button>
  );
}
