import React from "react";

export function Skeleton({ width = "100%", height = 16, radius = "var(--radius-control)", lines = 1, gap = 8, style, ...rest }) {
  const bar = (w, i) => (
    <span key={i} aria-hidden="true" style={{
      display: "block", width: w, height,
      borderRadius: radius, background: "hsl(var(--foreground-hsl) / .07)",
      animation: "aapm-pulse 1.6s ease-in-out infinite",
    }} />
  );
  if (lines <= 1) return <span role="status" aria-busy="true" style={{ display: "block", ...style }} {...rest}>{bar(width, 0)}</span>;
  return (
    <span role="status" aria-busy="true" style={{ display: "flex", flexDirection: "column", gap, ...style }} {...rest}>
      {Array.from({ length: lines }, (_, i) => bar(i === lines - 1 ? "62%" : width, i))}
    </span>
  );
}
