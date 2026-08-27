import React from "react";

export function Sparkline({ data = [], width = 120, height = 32, tone = "green", area = true, showLast = true, target, style, ...rest }) {
  const color = { green: "var(--chart-1)", teal: "var(--chart-2)", orange: "var(--chart-3)", lime: "var(--chart-4)", violet: "var(--chart-5)", danger: "var(--danger)" }[tone] || "var(--chart-1)";
  if (data.length < 2) return <span style={{ display: "inline-block", width, height, ...style }} />;
  const min = Math.min(...data, target ?? Infinity), max = Math.max(...data, target ?? -Infinity);
  const span = max - min || 1;
  const x = (i) => (i / (data.length - 1)) * width;
  const y = (v) => height - 2 - ((v - min) / span) * (height - 4);
  const pts = data.map((v, i) => x(i) + "," + y(v)).join(" ");
  const id = React.useId().replace(/:/g, "");
  return (
    <svg width={width} height={height} viewBox={"0 0 " + width + " " + height} role="img" aria-hidden="true"
      style={{ display: "block", overflow: "visible", ...style }} {...rest}>
      {area && <><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      <polygon points={"0," + height + " " + pts + " " + width + "," + height} fill={"url(#" + id + ")"} /></>}
      {target != null && <line x1="0" y1={y(target)} x2={width} y2={y(target)} stroke="var(--brand-orange)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {showLast && <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="2.5" fill={color} stroke="var(--card)" strokeWidth="1.5" />}
    </svg>
  );
}
