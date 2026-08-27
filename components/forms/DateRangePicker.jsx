import React from "react";
import { Icon } from "../core/Icon.jsx";
import { DatePicker, formatDateId } from "./DatePicker.jsx";

export const datePresets = [
  { id: "7d", label: "7 hari terakhir" },
  { id: "30d", label: "30 hari terakhir" },
  { id: "mtd", label: "Bulan ini" },
  { id: "qtd", label: "Kuartal ini" },
  { id: "ytd", label: "Tahun ini" },
];

export function DateRangePicker({ from, to, onChange, size = "md", presets = datePresets, activePreset, onPreset, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
      {presets.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {presets.map((p) => {
            const on = activePreset === p.id;
            return (
              <button key={p.id} type="button" onClick={() => onPreset?.(p.id)}
                style={{
                  padding: "3px 9px", borderRadius: "var(--radius-full)", cursor: "pointer",
                  border: "1px solid " + (on ? "transparent" : "var(--border)"),
                  background: on ? "var(--tint-green)" : "transparent", color: on ? "var(--tint-green-foreground)" : "var(--muted-foreground)",
                  font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", transition: "background-color var(--duration-fast)",
                }}>{p.label}</button>
            );
          })}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
        <DatePicker value={from} onValueChange={(v) => onChange?.({ from: v, to })} placeholder="Dari" size={size} max={to} long={false} />
        <Icon name="arrowRight" size={15} style={{ flex: "none", color: "var(--muted-foreground)" }} />
        <DatePicker value={to} onValueChange={(v) => onChange?.({ from, to: v })} placeholder="Sampai" size={size} min={from} long={false} />
      </div>
      {from && to && (
        <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
          {formatDateId(from)} – {formatDateId(to)}
        </span>
      )}
    </div>
  );
}
