import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";

export function FilterToolbar({
  searchValue = "", onSearchChange, searchPlaceholder = "Cari dokumen, supplier, nomor...",
  filters, applied = [], onClearAll, onRemoveFilter, trailing, style, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{
      borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)",
      background: "var(--card)", boxShadow: "var(--card-shadow)", padding: "var(--space-4)", ...style,
    }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
        <div style={{
          position: "relative", flex: "1 1 260px", minWidth: 200, display: "flex", alignItems: "center",
          height: "var(--control-height-md)", borderRadius: "var(--radius-control)",
          border: "1px solid " + (focus ? "var(--border-focus)" : "var(--input)"),
          background: focus ? "var(--card)" : "var(--surface-subtle)",
          boxShadow: focus ? "var(--focus-ring)" : "none",
          transition: "background-color var(--duration-fast),border-color var(--duration-fast),box-shadow var(--duration-fast)",
        }}>
          <Icon name="search" size={16} style={{ position: "absolute", left: 11, color: "var(--muted-foreground)" }} />
          <input value={searchValue} onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder} aria-label="Cari"
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            style={{
              width: "100%", height: "100%", border: "none", outline: "none", background: "transparent",
              padding: "0 var(--space-3) 0 36px", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--foreground)",
            }} />
        </div>
        {filters}
        {trailing && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>{trailing}</div>}
      </div>
      {applied.length > 0 && (
        <div style={{ marginTop: "var(--space-3)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
          <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>Filter aktif</span>
          {applied.map((f) => (
            <span key={f.key} style={{
              display: "inline-flex", alignItems: "center", gap: 6, borderRadius: "var(--radius-full)",
              padding: "0.1875rem 0.5rem 0.1875rem 0.625rem", background: "var(--tint-green)",
              border: "1px solid var(--tint-green-border)", color: "var(--tint-green-foreground)",
              font: "var(--type-caption)", fontWeight: "var(--weight-semibold)",
            }}>
              {f.label}
              <button type="button" onClick={() => onRemoveFilter?.(f.key)} aria-label={"Hapus filter " + f.label}
                style={{ display: "inline-flex", border: "none", background: "transparent", cursor: "pointer", color: "inherit", padding: 0 }}>
                <Icon name="close" size={12} />
              </button>
            </span>
          ))}
          {onClearAll && <Button variant="link" size="sm" onClick={onClearAll} style={{ marginLeft: 2 }}>Hapus semua</Button>}
        </div>
      )}
    </div>
  );
}
