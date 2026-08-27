import React from "react";
import { Icon } from "../core/Icon.jsx";

export function CommandMenu({
  open = false, onClose, groups = [], onSelect, placeholder = "Cari modul, dokumen, atau tindakan...",
  emptyLabel = "Tidak ada hasil.", footerHint = "↑↓ untuk memilih · Enter untuk membuka · Esc untuk menutup", style, ...rest
}) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const filtered = groups
    .map((g) => ({ ...g, items: g.items.filter((it) => (String(it.label) + " " + (it.keywords || "")).toLowerCase().includes(q.toLowerCase())) }))
    .filter((g) => g.items.length);
  const flat = filtered.flatMap((g) => g.items);
  React.useEffect(() => { setActive(0); }, [q]);
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(flat.length - 1, a + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
      if (e.key === "Enter" && flat[active]) { onSelect?.(flat[active]); onClose?.(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, flat, active, onClose, onSelect]);
  if (!open) return null;
  let idx = -1;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", justifyContent: "center", paddingTop: "12vh", background: "hsl(var(--aapm-green-950-hsl) / .45)" }}>
      <div role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 560, maxHeight: "64vh", display: "flex", flexDirection: "column",
          borderRadius: "var(--radius-shell)", border: "1px solid var(--surface-border)", background: "var(--popover)",
          boxShadow: "var(--shadow-3)", overflow: "hidden", animation: "aapm-rise var(--duration-normal) var(--ease-out) both", ...style,
        }} {...rest}>
        <div style={{ position: "relative", flex: "none", borderBottom: "1px solid var(--border)" }}>
          <Icon name="search" size={18} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder}
            style={{ width: "100%", height: 54, border: 0, outline: "none", background: "transparent", padding: "0 var(--space-5) 0 48px", font: "var(--type-body)", fontSize: "var(--text-md)", color: "var(--foreground)" }} />
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "var(--space-2)" }}>
          {flat.length === 0 && <div style={{ padding: "var(--space-8)", textAlign: "center", font: "var(--type-body)", color: "var(--muted-foreground)" }}>{emptyLabel}</div>}
          {filtered.map((g) => (
            <div key={g.label} style={{ marginBottom: "var(--space-2)" }}>
              <div style={{ padding: "var(--space-2) var(--space-3) 4px", font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{g.label}</div>
              {g.items.map((it) => {
                idx += 1;
                const on = idx === active;
                return (
                  <button key={it.id} type="button" onMouseEnter={() => setActive(idx)} onClick={() => { onSelect?.(it); onClose?.(); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%", textAlign: "left",
                      padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-control)", border: 0, cursor: "pointer",
                      background: on ? "hsl(var(--brand-green-hsl) / .08)" : "transparent", fontFamily: "var(--font-body)",
                    }}>
                    <Icon name={it.icon || "module"} size={17} style={{ flex: "none", color: on ? "var(--primary)" : "var(--muted-foreground)" }} />
                    <span style={{ minWidth: 0, flex: 1 }}>
                      <span style={{ display: "block", font: "var(--type-body)", fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)", color: "var(--foreground)" }}>{it.label}</span>
                      {it.description && <span style={{ display: "block", marginTop: 1, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{it.description}</span>}
                    </span>
                    {it.shortcut && <span style={{ flex: "none", padding: "2px 6px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--card)", font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", color: "var(--muted-foreground)" }}>{it.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ flex: "none", padding: "var(--space-2) var(--space-4)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{footerHint}</div>
      </div>
    </div>
  );
}
