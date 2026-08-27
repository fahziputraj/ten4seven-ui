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

export function SearchInput({ value = "", onValueChange, placeholder = "Cari...", size = "md", loading = false, shortcut, disabled, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ ...fieldShell(focus, false, disabled, heights[size]), background: focus ? "var(--card)" : "var(--surface-subtle)", ...style }}>
      <Icon name={loading ? "loading" : "search"} size={16}
        style={{ position: "absolute", left: 11, color: "var(--muted-foreground)", pointerEvents: "none", animation: loading ? "aapm-spin 1s linear infinite" : "none" }} />
      <input type="search" role="searchbox" value={value} placeholder={placeholder} disabled={disabled} aria-label={placeholder}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onValueChange?.(e.target.value)}
        style={{ ...inner, padding: "0 var(--space-3) 0 36px", appearance: "none" }} {...rest} />
      {value ? (
        <button type="button" aria-label="Kosongkan pencarian" onClick={() => onValueChange?.("")}
          style={{ flex: "none", marginRight: 6, height: 26, width: 26, borderRadius: "var(--radius-sm)", border: 0, background: "transparent", cursor: "pointer", color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="close" size={14} />
        </button>
      ) : shortcut ? (
        <span style={{ flex: "none", marginRight: 8, padding: "2px 6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--card)", font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", color: "var(--muted-foreground)" }}>{shortcut}</span>
      ) : null}
    </div>
  );
}
