import React from "react";

export function Label({ children, required = false, size = "sm", htmlFor, style, ...rest }) {
  return (
    <label htmlFor={htmlFor} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontFamily: "var(--font-body)", fontSize: size === "base" ? "var(--text-base)" : "var(--text-sm)", fontWeight: "var(--weight-semibold)", lineHeight: 1.4, color: "var(--foreground)", ...style }} {...rest}>
      {children}
      {required && <span aria-hidden="true" style={{ color: "var(--danger)" }}>*</span>}
    </label>
  );
}
