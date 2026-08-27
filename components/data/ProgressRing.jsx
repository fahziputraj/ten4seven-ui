import React from "react";

export function ProgressRing({ value = 0, size = 48, thickness = 5, label, track = "var(--surface-inset)", color = "var(--primary)", className = "", style, ...rest }) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeValue / 100) * circumference;
  return (
    <div className={`aapm-progress-ring ${className}`.trim()} style={{ position: "relative", display: "inline-flex", width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue} aria-label={label}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={thickness} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset var(--duration-slow) var(--ease-out)" }} />
      </svg>
      {label && <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--foreground)", font: "var(--type-label)", fontSize: "var(--text-xs)" }}>{label}</span>}
    </div>
  );
}
