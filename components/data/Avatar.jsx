import React from "react";

const sizes = { xs: 24, sm: 28, md: 36, lg: 44, xl: 64 };

export function Avatar({ name = "", src, size = "md", tone = "green", ring = false, style, ...rest }) {
  const px = sizes[size] || sizes.md;
  const initial = String(name).trim().slice(0, 1).toUpperCase() || "?";
  const bg = tone === "orange" ? "hsl(var(--brand-orange-hsl) / .1)" : tone === "slate" ? "var(--tint-slate)" : "hsl(var(--brand-green-hsl) / .1)";
  const fg = tone === "orange" ? "var(--brand-orange)" : tone === "slate" ? "var(--tint-slate-foreground)" : "var(--brand-green)";
  return (
    <span title={name || undefined} style={{
      height: px, width: px, flex: "none", borderRadius: "var(--radius-full)", overflow: "hidden",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: bg, color: fg, fontFamily: "var(--font-body)", fontWeight: "var(--weight-semibold)",
      fontSize: px <= 28 ? "var(--text-2xs)" : px <= 36 ? "var(--text-xs)" : "var(--text-base)",
      boxShadow: ring ? "0 0 0 2px var(--background),0 0 0 3px hsl(var(--brand-green-hsl) / .3)" : "none",
      ...style,
    }} {...rest}>
      {src ? <img src={src} alt={name} style={{ height: "100%", width: "100%", objectFit: "cover" }} /> : initial}
    </span>
  );
}
