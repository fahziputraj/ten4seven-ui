import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";

export function BulkActionBar({ count = 0, noun = "baris", actions, onClear, floating = true, style, ...rest }) {
  if (!count) return null;
  return (
    <div role="region" aria-live="polite" style={{
      display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap",
      borderRadius: "var(--radius-panel)", padding: "var(--space-3) var(--space-4)",
      background: "var(--foreground)", color: "var(--background)",
      boxShadow: floating ? "var(--shadow-4)" : "none",
      animation: "aapm-rise var(--duration-normal) var(--ease-out) both", ...style,
    }} {...rest}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", font: "var(--type-label)", fontVariantNumeric: "tabular-nums" }}>
        <Icon name="checkRead" size={16} style={{ color: "var(--brand-lime)" }} />
        {count} {noun} dipilih
      </span>
      <span style={{ width: 1, height: 20, background: "hsl(0 0% 100% / .18)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>{actions}</div>
      {onClear && (
        <Button variant="link" size="sm" onClick={onClear} style={{ marginLeft: "auto", color: "hsl(0 0% 100% / .7)" }}>Batalkan pilihan</Button>
      )}
    </div>
  );
}
