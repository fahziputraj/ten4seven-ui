import React from "react";
import { Icon } from "./Icon.jsx";

export const iconTileToneSx = {
  neutral: { background: "var(--surface-inset)", color: "var(--muted-foreground)", borderColor: "transparent" },
  green: { background: "var(--tint-green)", color: "var(--tint-green-foreground)", borderColor: "hsl(var(--tint-green-border-hsl) / .6)" },
  lime: { background: "var(--tint-lime)", color: "var(--tint-lime-foreground)", borderColor: "hsl(var(--tint-lime-border-hsl) / .7)" },
  orange: { background: "var(--tint-orange)", color: "var(--tint-orange-foreground)", borderColor: "transparent" },
  blue: { background: "var(--tint-blue)", color: "var(--tint-blue-foreground)", borderColor: "transparent" },
  violet: { background: "var(--tint-violet)", color: "var(--tint-violet-foreground)", borderColor: "transparent" },
  slate: { background: "var(--tint-slate)", color: "var(--tint-slate-foreground)", borderColor: "transparent" },
};

const tileSize = { sm: [32, 16], md: [40, 18], lg: [48, 20] };

export function IconTile({ icon, tone = "neutral", size = "md", style, ...rest }) {
  const [px, glyph] = tileSize[size];
  return (
    <span style={{ display: "inline-flex", flex: "none", alignItems: "center", justifyContent: "center", height: px, width: px, borderRadius: "var(--radius-control)", border: "1px solid", transition: "background-color var(--duration-fast)", ...iconTileToneSx[tone], ...style }} {...rest}>
      <Icon name={icon} size={glyph} />
    </span>
  );
}
