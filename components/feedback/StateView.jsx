import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";
import { Skeleton } from "../data/Skeleton.jsx";

const preset = {
  loading:    { icon: "loading",    tone: "green",  title: "Memuat data...", tint: "var(--tint-green)", fg: "var(--tint-green-foreground)" },
  empty:      { icon: "note",       tone: "green",  title: "Belum ada data", tint: "var(--tint-green)", fg: "var(--tint-green-foreground)" },
  "no-result":{ icon: "search",     tone: "slate",  title: "Tidak ada hasil", tint: "var(--tint-slate)", fg: "var(--tint-slate-foreground)" },
  error:      { icon: "error",      tone: "danger", title: "Data belum dapat dimuat", tint: "hsl(var(--danger-hsl) / .1)", fg: "var(--danger)" },
  offline:    { icon: "refresh",    tone: "orange", title: "Koneksi terputus", tint: "var(--tint-orange)", fg: "var(--tint-orange-foreground)" },
  timeout:    { icon: "clock",      tone: "orange", title: "Permintaan terlalu lama", tint: "var(--tint-orange)", fg: "var(--tint-orange-foreground)" },
  partial:    { icon: "warning",    tone: "orange", title: "Data sebagian", tint: "var(--tint-orange)", fg: "var(--tint-orange-foreground)" },
  permission: { icon: "permission", tone: "slate",  title: "Akses terbatas", tint: "var(--tint-slate)", fg: "var(--tint-slate-foreground)" },
  maintenance:{ icon: "settings",   tone: "slate",  title: "Sedang dalam pemeliharaan", tint: "var(--tint-slate)", fg: "var(--tint-slate-foreground)" },
};

export function StateView({ state = "loading", title, description, onRetry, retryLabel = "Coba lagi", action, lines = 2, style, ...rest }) {
  const p = preset[state] || preset.loading;
  if (state === "loading") {
    return (
      <div role="status" aria-busy="true" style={{
        borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)", background: "var(--card)",
        boxShadow: "var(--card-shadow)", padding: "var(--space-6)", ...style,
      }} {...rest}>
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{title || p.title}</span>
        <Skeleton height={20} width="42%" />
        <Skeleton lines={lines} height={12} style={{ marginTop: 14 }} />
      </div>
    );
  }
  return (
    <div role={state === "error" ? "alert" : "status"} style={{
      display: "flex", alignItems: "flex-start", gap: "var(--space-4)",
      borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)", background: "var(--card)",
      boxShadow: "var(--card-shadow)", padding: "var(--space-5)", ...style,
    }} {...rest}>
      <span style={{
        height: 40, width: 40, flex: "none", borderRadius: "var(--radius-control)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: p.tint, color: p.fg,
      }}><Icon name={p.icon} size={20} /></span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ font: "var(--type-card-title)", color: "var(--foreground)" }}>{title || p.title}</div>
        {description && <p style={{ margin: "5px 0 0", font: "var(--type-body)", fontSize: "var(--text-sm)", lineHeight: "1.2rem", color: "var(--muted-foreground)" }}>{description}</p>}
        {(onRetry || action) && (
          <div style={{ marginTop: "var(--space-4)", display: "flex", gap: "var(--space-2)" }}>
            {onRetry && <Button variant="outline" size="sm" icon="refresh" onClick={onRetry}>{retryLabel}</Button>}
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
