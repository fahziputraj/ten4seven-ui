import React from "react";

const progressToneSx = { lime: "var(--brand-lime)", green: "var(--brand-green)", success: "var(--success)", warning: "var(--warning)", danger: "var(--danger)", orange: "var(--brand-orange)" };

export function Progress({ value = 0, max = 100, tone = "green", size = "md", track = "var(--muted)", label, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, max ? (value / max) * 100 : 0));
  const h = size === "sm" ? 6 : size === "lg" ? 10 : 8;
  return (
    <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={label}
      style={{ position: "relative", height: h, width: "100%", overflow: "hidden", borderRadius: "var(--radius-full)", background: track, ...style }} {...rest}>
      <div style={{ height: "100%", width: pct + "%", borderRadius: "var(--radius-full)", background: progressToneSx[tone], transition: "width var(--duration-slow) var(--ease-out)" }} />
    </div>
  );
}
