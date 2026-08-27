import React from "react";

const fieldShell = (focus, invalid, disabled, h) => ({
  position: "relative", display: "flex", alignItems: "center", height: h, width: "100%",
  borderRadius: "var(--radius-control)",
  border: "1px solid " + (invalid ? "var(--danger)" : focus ? "hsl(var(--brand-green-hsl) / .65)" : "var(--input)"),
  background: focus ? "var(--card)" : "var(--surface-elevated)",
  boxShadow: focus ? (invalid ? "0 0 0 3px hsl(var(--danger-hsl) / .18)" : "0 0 0 3px hsl(var(--ring-hsl) / .25)") : "none",
  transition: "border-color var(--duration-fast),box-shadow var(--duration-fast),background-color var(--duration-fast)",
  opacity: disabled ? 0.5 : 1,
});
const heights = { sm: "2.25rem", md: "2.75rem", lg: "3rem" };
const inner = { flex: 1, minWidth: 0, height: "100%", border: 0, outline: "none", background: "transparent", font: "var(--type-body)", color: "var(--foreground)" };

export function PercentInput({ value, onValueChange, size = "md", invalid = false, disabled, max = 100, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ ...fieldShell(focus, invalid, disabled, heights[size]), ...style }}>
      <input type="text" inputMode="decimal" disabled={disabled} aria-invalid={invalid || undefined}
        value={value ?? ""} placeholder="0,0"
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onChange={(e) => onValueChange?.(e.target.value.replace(/[^\d,]/g, ""))}
        style={{ ...inner, padding: "0 var(--space-2) 0 var(--space-3)", textAlign: "right", fontVariantNumeric: "tabular-nums" }} {...rest} />
      <span style={{ paddingRight: "var(--space-3)", font: "var(--type-label)", color: "var(--muted-foreground)", flex: "none" }}>%</span>
    </div>
  );
}
