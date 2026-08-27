import React from "react";

export function Textarea({ invalid = false, rows = 4, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea rows={rows} disabled={disabled} aria-invalid={invalid || undefined}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        width: "100%", minHeight: "5rem", padding: "var(--space-3)", resize: "vertical",
        borderRadius: "var(--radius-control)", outline: "none",
        border: "1px solid " + (invalid ? "var(--danger)" : focus ? "hsl(var(--brand-green-hsl) / .65)" : "var(--input)"),
        background: focus ? "var(--card)" : "var(--surface-elevated)",
        boxShadow: focus ? "0 0 0 3px hsl(var(--ring-hsl) / .25)" : "none",
        font: "var(--type-body)", color: "var(--foreground)", opacity: disabled ? 0.5 : 1,
        transition: "border-color var(--duration-fast),box-shadow var(--duration-fast),background-color var(--duration-fast)",
        ...style,
      }} {...rest} />
  );
}
