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

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export function formatDateId(iso, long = true) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return "";
  return long ? d + " " + MONTHS[m - 1] + " " + y : String(d).padStart(2, "0") + "/" + String(m).padStart(2, "0") + "/" + y;
}

export function DatePicker({ value, onValueChange, placeholder = "Pilih tanggal", size = "md", invalid = false, disabled, min, max, long = true, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const [view, setView] = React.useState(() => { const d = value ? new Date(value) : new Date(); return { y: d.getFullYear(), m: d.getMonth() }; });
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const iso = (d) => view.y + "-" + String(view.m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
  const shift = (n) => setView((v) => { const d = new Date(v.y, v.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", ...style }}>
      <button type="button" disabled={disabled} onClick={() => setOpen(!open)} aria-invalid={invalid || undefined} aria-haspopup="dialog" aria-expanded={open}
        style={{ ...fieldShell(open, invalid, disabled, heights[size]), cursor: disabled ? "not-allowed" : "pointer", textAlign: "left", padding: 0, fontFamily: "var(--font-body)" }} {...rest}>
        <Icon name="clock" size={16} style={{ position: "absolute", left: "var(--space-3)", color: "var(--muted-foreground)" }} />
        <span style={{ flex: 1, minWidth: 0, padding: "0 var(--space-3) 0 36px", font: "var(--type-body)", color: value ? "var(--foreground)" : "var(--muted-foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value ? formatDateId(value, long) : placeholder}
        </span>
        <Icon name="chevronDown" size={16} style={{ marginRight: "var(--space-3)", color: "var(--muted-foreground)", flex: "none" }} />
      </button>
      {open && (
        <div role="dialog" style={{
          position: "absolute", zIndex: 40, top: "calc(100% + 6px)", left: 0, width: 268, padding: "var(--space-3)",
          borderRadius: "var(--radius-panel)", border: "1px solid var(--surface-border)", background: "var(--popover)",
          boxShadow: "var(--shadow-2)", animation: "aapm-rise var(--duration-normal) var(--ease-out) both",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-3)" }}>
            <button type="button" aria-label="Bulan sebelumnya" onClick={() => shift(-1)} style={navBtn}><Icon name="chevronLeft" size={15} /></button>
            <span style={{ font: "var(--type-label)", fontVariantNumeric: "tabular-nums" }}>{MONTHS[view.m]} {view.y}</span>
            <button type="button" aria-label="Bulan berikutnya" onClick={() => shift(1)} style={navBtn}><Icon name="chevronRight" size={15} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {DAYS.map((d) => <span key={d} style={{ textAlign: "center", padding: "2px 0", font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", color: "var(--muted-foreground)" }}>{d}</span>)}
            {Array.from({ length: offset }, (_, i) => <span key={"p" + i} />)}
            {Array.from({ length: days }, (_, i) => {
              const d = i + 1, id = iso(d);
              const sel = value === id;
              const off = (min && id < min) || (max && id > max);
              return (
                <button key={d} type="button" disabled={off} onClick={() => { onValueChange?.(id); setOpen(false); }}
                  style={{
                    height: 30, borderRadius: "var(--radius-sm)", border: 0, cursor: off ? "not-allowed" : "pointer",
                    background: sel ? "var(--primary)" : "transparent", color: sel ? "var(--primary-foreground)" : off ? "var(--muted-foreground)" : "var(--foreground)",
                    opacity: off ? 0.35 : 1, font: "var(--type-body)", fontSize: "var(--text-sm)", fontWeight: sel ? "var(--weight-semibold)" : "var(--weight-regular)",
                    fontVariantNumeric: "tabular-nums", transition: "background-color var(--duration-fast)",
                  }}>{d}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn = { height: 28, width: 28, borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: "var(--card)", cursor: "pointer", color: "var(--muted-foreground)", display: "inline-flex", alignItems: "center", justifyContent: "center" };
