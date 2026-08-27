import React from "react";
import { Icon } from "../core/Icon.jsx";

export function TrendIndicator({ value, direction, sentiment, caption, size = "md", style, ...rest }) {
  const dir = direction || (typeof value === "number" ? (value > 0 ? "up" : value < 0 ? "down" : "flat") : "flat");
  const good = sentiment === "inverse" ? (dir === "down") : (dir === "up");
  const color = dir === "flat" ? "var(--metric-neutral)" : good ? "var(--metric-positive)" : "var(--metric-negative)";
  const sm = size === "sm";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content",
      borderRadius: "var(--radius-full)", padding: sm ? "1px 6px" : "2px 8px",
      background: "hsl(var(--foreground-hsl) / .04)", color,
      fontFamily: "var(--font-body)", fontSize: sm ? "var(--text-2xs)" : "var(--text-xs)",
      fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", ...style,
    }} {...rest}>
      <Icon name={dir === "up" ? "trendUp" : dir === "down" ? "trendDown" : "minus"} size={sm ? 11 : 12} />
      {typeof value === "number" ? (value > 0 ? "+" : "") + String(value).replace(".", ",") + "%" : value}
      {caption && <span style={{ marginLeft: 2, fontWeight: "var(--weight-regular)", color: "var(--muted-foreground)" }}>{caption}</span>}
    </span>
  );
}
