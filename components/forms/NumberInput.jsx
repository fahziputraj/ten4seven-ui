import React from "react";
import { Icon } from "../core/Icon.jsx";

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

export function NumberInput({
  value, onValueChange, min, max, step = 1, precision = 0, unit, prefix,
  align = "right", size = "md", invalid = false, disabled, steppers = true, style, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const clamp = (n) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, n));
  const bump = (d) => onValueChange?.(clamp((Number(value) || 0) + d * step));
  return (
    <div style={{ ...fieldShell(focus, invalid, disabled, heights[size]), ...style }}>
      {prefix && <span style={{ paddingLeft: "var(--space-3)", font: "var(--type-body)", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{prefix}</span>}
      <input type="text" inputMode="decimal" value={value ?? ""} disabled={disabled} aria-invalid={invalid || undefined}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onChange={(e) => onValueChange?.(e.target.value.replace(/[^\d,.-]/g, ""))}
        style={{ ...inner, padding: "0 var(--space-3)", textAlign: align, fontVariantNumeric: "tabular-nums" }} {...rest} />
      {unit && <span style={{ paddingRight: steppers ? 0 : "var(--space-3)", font: "var(--type-label)", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>{unit}</span>}
      {steppers && !disabled && (
        <span style={{ display: "flex", flexDirection: "column", flex: "none", height: "100%", borderLeft: "1px solid var(--border)", marginLeft: "var(--space-2)" }}>
          {[["collapse", 1], ["expand", -1]].map(([icon, d]) => (
            <button key={icon} type="button" tabIndex={-1} aria-label={d > 0 ? "Tambah" : "Kurangi"} onClick={() => bump(d)}
              style={{ flex: 1, width: 30, display: "inline-flex", alignItems: "center", justifyContent: "center", border: 0,
                borderTop: d < 0 ? "1px solid var(--border)" : "none", background: "transparent", cursor: "pointer", color: "var(--muted-foreground)" }}>
              <Icon name={icon} size={12} />
            </button>
          ))}
        </span>
      )}
    </div>
  );
}
