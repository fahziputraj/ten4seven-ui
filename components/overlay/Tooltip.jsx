import React from "react";

export function Tooltip({ label, side = "top", children, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
  }[side];
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} {...rest}>
      {children}
      {open && (
        <span role="tooltip" style={{
          position: "absolute", zIndex: 40, ...pos, whiteSpace: "nowrap", pointerEvents: "none",
          borderRadius: "var(--radius-sm)", padding: "0.3125rem 0.5rem",
          background: "var(--foreground)", color: "var(--background)",
          fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)",
          boxShadow: "var(--shadow-2)", animation: "aapm-rise var(--duration-fast) var(--ease-out) both",
        }}>{label}</span>
      )}
    </span>
  );
}
