import React from "react";
import { Icon } from "../core/Icon.jsx";

export function MultiSelect({
  options = [], value = [], onValueChange, placeholder = "Pilih...", searchPlaceholder = "Cari pilihan...",
  single = false, size = "md", invalid = false, disabled, maxVisible = 3, emptyLabel = "Tidak ada pilihan yang cocok.", style, ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const ref = React.useRef(null);
  const norm = options.map((o) => typeof o === "string" ? { value: o, label: o } : o);
  const sel = norm.filter((o) => value.includes(o.value));
  const shown = norm.filter((o) => String(o.label).toLowerCase().includes(q.toLowerCase()));
  const h = { sm: "2.25rem", md: "2.75rem", lg: "3rem" }[size];
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setQ(""); } };
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); setQ(""); } };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const toggle = (v) => {
    if (single) { onValueChange?.([v]); setOpen(false); setQ(""); return; }
    onValueChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", ...style }} {...rest}>
      <button type="button" disabled={disabled} onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open} aria-invalid={invalid || undefined}
        style={{
          display: "flex", alignItems: "center", gap: 6, width: "100%", minHeight: h, padding: "5px var(--space-3)",
          borderRadius: "var(--radius-control)", cursor: disabled ? "not-allowed" : "pointer", textAlign: "left",
          border: "1px solid " + (invalid ? "var(--danger)" : open ? "hsl(var(--brand-green-hsl) / .65)" : "var(--input)"),
          background: open ? "var(--card)" : "var(--surface-elevated)",
          boxShadow: open ? "0 0 0 3px hsl(var(--ring-hsl) / .25)" : "none",
          opacity: disabled ? 0.5 : 1, flexWrap: "wrap", fontFamily: "var(--font-body)",
          transition: "border-color var(--duration-fast),box-shadow var(--duration-fast)",
        }}>
        {sel.length === 0 && <span style={{ flex: 1, font: "var(--type-body)", color: "var(--muted-foreground)" }}>{placeholder}</span>}
        {sel.slice(0, maxVisible).map((o) => (
          <span key={o.value} style={{
            display: "inline-flex", alignItems: "center", gap: 5, borderRadius: "var(--radius-full)", padding: "2px 4px 2px 9px",
            background: "var(--tint-green)", border: "1px solid var(--tint-green-border)", color: "var(--tint-green-foreground)",
            font: "var(--type-caption)", fontWeight: "var(--weight-semibold)",
          }}>
            {o.label}
            {!single && <span role="button" tabIndex={-1} aria-label={"Hapus " + o.label}
              onClick={(e) => { e.stopPropagation(); toggle(o.value); }}
              style={{ display: "inline-flex", cursor: "pointer", color: "inherit" }}><Icon name="close" size={12} /></span>}
          </span>
        ))}
        {sel.length > maxVisible && <span style={{ font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>+{sel.length - maxVisible} lagi</span>}
        <Icon name="chevronDown" size={16} style={{ marginLeft: "auto", flex: "none", color: "var(--muted-foreground)" }} />
      </button>
      {open && (
        <div role="listbox" style={{
          position: "absolute", zIndex: 40, top: "calc(100% + 6px)", left: 0, right: 0, maxHeight: 260, display: "flex", flexDirection: "column",
          borderRadius: "var(--radius-panel)", border: "1px solid var(--surface-border)", background: "var(--popover)",
          boxShadow: "var(--shadow-2)", overflow: "hidden", animation: "aapm-rise var(--duration-normal) var(--ease-out) both",
        }}>
          <div style={{ position: "relative", flex: "none", padding: "var(--space-2)", borderBottom: "1px solid var(--border)" }}>
            <Icon name="search" size={14} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder}
              style={{ width: "100%", height: 32, border: 0, outline: "none", background: "transparent", padding: "0 var(--space-2) 0 30px", font: "var(--type-body)", color: "var(--foreground)" }} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-2)" }}>
            {shown.length === 0 && <div style={{ padding: "var(--space-4)", textAlign: "center", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{emptyLabel}</div>}
            {shown.map((o) => {
              const on = value.includes(o.value);
              return (
                <button key={o.value} type="button" role="option" aria-selected={on} onClick={() => toggle(o.value)}
                  style={{
                    display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%", textAlign: "left", border: 0, cursor: "pointer",
                    padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-sm)",
                    background: on ? "hsl(var(--brand-green-hsl) / .06)" : "transparent",
                    font: "var(--type-body)", color: "var(--foreground)", fontFamily: "var(--font-body)",
                  }}>
                  <span style={{
                    height: 16, width: 16, flex: "none", borderRadius: single ? "var(--radius-full)" : 4,
                    border: "1.5px solid " + (on ? "var(--primary)" : "var(--input)"), background: on ? "var(--primary)" : "transparent",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--primary-foreground)",
                  }}>{on && <Icon name="check" size={11} />}</span>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: "block" }}>{o.label}</span>
                    {o.description && <span style={{ display: "block", marginTop: 1, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{o.description}</span>}
                  </span>
                  {o.meta && <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{o.meta}</span>}
                </button>
              );
            })}
          </div>
          {!single && sel.length > 0 && (
            <div style={{ flex: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--space-2) var(--space-3)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)" }}>
              <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{sel.length} dipilih</span>
              <span role="button" tabIndex={0} onClick={() => onValueChange?.([])}
                style={{ cursor: "pointer", font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", color: "var(--primary)" }}>Hapus semua</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
