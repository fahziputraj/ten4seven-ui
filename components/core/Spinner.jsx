import React from "react";

export function Spinner({ size = 20, tone = "primary", label, thickness = 2, style, ...rest }) {
  const color = { primary: "var(--primary)", muted: "var(--muted-foreground)", inverse: "var(--primary-foreground)", danger: "var(--danger)" }[tone] || tone;
  return (
    <span role="status" aria-live="polite" style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", ...style }} {...rest}>
      <span aria-hidden="true" style={{
        display: "inline-block", height: size, width: size, flex: "none", borderRadius: "50%",
        border: thickness + "px solid hsl(var(--foreground-hsl) / .12)", borderTopColor: color,
        animation: "aapm-spin .7s linear infinite",
      }} />
      {label && <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{label}</span>}
      {!label && <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Memuat</span>}
    </span>
  );
}
