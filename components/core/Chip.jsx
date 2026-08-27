import React from "react";
import { Icon } from "./Icon.jsx";

export function Chip({ children, icon, avatar, tone = "neutral", selected = false, onRemove, onClick, size = "md", style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    neutral: { bg: "var(--surface-subtle)", fg: "var(--foreground)", bd: "var(--border)" },
    green: { bg: "var(--tint-green)", fg: "var(--tint-green-foreground)", bd: "var(--tint-green-border)" },
    orange: { bg: "var(--tint-orange)", fg: "var(--tint-orange-foreground)", bd: "var(--tint-orange-border)" },
    blue: { bg: "var(--tint-blue)", fg: "var(--tint-blue-foreground)", bd: "var(--tint-blue-border)" },
    violet: { bg: "var(--tint-violet)", fg: "var(--tint-violet-foreground)", bd: "var(--tint-violet-border)" },
    slate: { bg: "var(--tint-slate)", fg: "var(--tint-slate-foreground)", bd: "var(--tint-slate-border)" },
  };
  const t = selected ? { bg: "hsl(var(--brand-green-hsl) / .1)", fg: "var(--brand-green)", bd: "hsl(var(--brand-green-hsl) / .4)" } : tones[tone];
  const sm = size === "sm";
  const clickable = !!onClick;
  return (
    <span onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      role={clickable ? "button" : undefined} tabIndex={clickable ? 0 : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: sm ? 4 : 6, width: "fit-content", maxWidth: "100%",
        borderRadius: "var(--radius-full)", padding: onRemove ? (sm ? "2px 4px 2px 8px" : "3px 5px 3px 10px") : (sm ? "2px 8px" : "3px 10px"),
        border: "1px solid " + t.bd, background: clickable && hover ? "var(--surface-hover)" : t.bg, color: t.fg,
        fontFamily: "var(--font-body)", fontSize: sm ? "var(--text-2xs)" : "var(--text-xs)",
        fontWeight: "var(--weight-semibold)", cursor: clickable ? "pointer" : "default",
        transition: "background-color var(--duration-fast),border-color var(--duration-fast)", ...style,
      }} {...rest}>
      {avatar}
      {icon && <Icon name={icon} size={sm ? 11 : 12} />}
      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{children}</span>
      {onRemove && (
        <span role="button" tabIndex={0} aria-label="Hapus" onClick={(e) => { e.stopPropagation(); onRemove(); }}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: sm ? 14 : 16, width: sm ? 14 : 16, borderRadius: "var(--radius-full)", cursor: "pointer", color: "inherit", opacity: 0.75 }}>
          <Icon name="close" size={sm ? 10 : 12} />
        </span>
      )}
    </span>
  );
}
