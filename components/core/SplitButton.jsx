import React from "react";
import { Icon } from "./Icon.jsx";

export function SplitButton({ label, icon, onClick, actions = [], variant = "default", size = "md", disabled, loading, align = "end", style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(null);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const h = { sm: "2rem", md: "2.5rem", lg: "2.75rem" }[size];
  const skin = variant === "outline"
    ? { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--input)", divider: "var(--input)", hover: "var(--accent)" }
    : { background: "var(--primary)", color: "var(--primary-foreground)", border: "1px solid transparent", divider: "hsl(0 0% 100% / .22)", hover: "hsl(var(--primary-hsl) / .9)" };
  const off = disabled || loading;
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex", ...style }} {...rest}>
      <span style={{
        display: "inline-flex", height: h, borderRadius: "var(--radius-control)", overflow: "hidden",
        background: skin.background, border: skin.border, boxShadow: "var(--surface-shadow)",
        opacity: off ? 0.5 : 1, pointerEvents: off ? "none" : "auto",
      }}>
        <button type="button" onClick={onClick} onMouseEnter={() => setHover("main")} onMouseLeave={() => setHover(null)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "var(--space-2)", height: "100%", padding: "0 var(--space-4)",
            border: 0, cursor: "pointer", background: hover === "main" ? skin.hover : "transparent", color: skin.color,
            fontFamily: "var(--font-body)", fontSize: size === "sm" ? "var(--text-sm)" : "var(--text-base)",
            fontWeight: "var(--weight-semibold)", whiteSpace: "nowrap", transition: "background-color var(--duration-normal)",
          }}>
          {loading ? <Icon name="loading" size={16} style={{ animation: "aapm-spin 1s linear infinite" }} /> : icon ? <Icon name={icon} size={16} /> : null}
          {label}
        </button>
        <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label="Tindakan lain" onClick={() => setOpen(!open)}
          onMouseEnter={() => setHover("caret")} onMouseLeave={() => setHover(null)}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", height: "100%", width: size === "sm" ? 26 : 32,
            border: 0, borderLeft: "1px solid " + skin.divider, cursor: "pointer",
            background: hover === "caret" ? skin.hover : "transparent", color: skin.color,
            transition: "background-color var(--duration-normal)",
          }}>
          <Icon name="chevronDown" size={14} />
        </button>
      </span>
      {open && (
        <div role="menu" style={{
          position: "absolute", zIndex: 40, top: "calc(100% + 6px)", [align === "end" ? "right" : "left"]: 0, minWidth: 208,
          padding: "var(--space-2)", borderRadius: "var(--radius-panel)", border: "1px solid var(--surface-border)",
          background: "var(--popover)", boxShadow: "var(--shadow-2)", animation: "aapm-rise var(--duration-normal) var(--ease-out) both",
        }}>
          {actions.map((a, i) => (
            <button key={i} type="button" role="menuitem" disabled={a.disabled}
              onClick={() => { setOpen(false); a.onClick?.(); }}
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-2)", width: "100%", textAlign: "left",
                padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-sm)", border: 0,
                cursor: a.disabled ? "not-allowed" : "pointer", background: "transparent",
                color: a.tone === "danger" ? "var(--danger)" : "var(--foreground)", opacity: a.disabled ? 0.45 : 1,
                fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)",
              }}
              onMouseEnter={(e) => { if (!a.disabled) e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              {a.icon && <Icon name={a.icon} size={15} />}
              <span style={{ minWidth: 0, flex: 1 }}>{a.label}</span>
            </button>
          ))}
        </div>
      )}
    </span>
  );
}
