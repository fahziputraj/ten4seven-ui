import React from "react";

export const surfaceVariantSx = {
  default: { borderColor: "var(--surface-border)", background: "var(--surface-default)", boxShadow: "var(--surface-shadow)" },
  muted: { borderColor: "var(--surface-border)", background: "var(--surface-muted)", boxShadow: "none" },
  accent: { borderColor: "var(--surface-accent-border)", background: "var(--surface-accent)", boxShadow: "none" },
  inverse: { borderColor: "var(--foreground)", background: "var(--foreground)", color: "var(--background)", boxShadow: "none" },
  interactive: { borderColor: "var(--surface-border)", background: "var(--surface-default)", boxShadow: "none" },
  selected: { borderColor: "hsl(var(--brand-green-hsl) / .5)", background: "hsl(var(--brand-green-hsl) / .05)", boxShadow: "inset 0 0 0 1px hsl(var(--brand-green-hsl) / .1)" },
  dashed: { borderColor: "var(--border)", borderStyle: "dashed", background: "var(--surface-subtle)", boxShadow: "none" },
};

export const surfaceToneSx = {
  neutral: null,
  green: { borderColor: "var(--tint-green-border)", background: "var(--tint-green)" },
  lime: { borderColor: "var(--tint-lime-border)", background: "var(--tint-lime)" },
  orange: { borderColor: "var(--tint-orange-border)", background: "var(--tint-orange)" },
  blue: { borderColor: "var(--tint-blue-border)", background: "var(--tint-blue)" },
  violet: { borderColor: "var(--tint-violet-border)", background: "var(--tint-violet)" },
  slate: { borderColor: "var(--tint-slate-border)", background: "var(--tint-slate)" },
};

export function Surface({ variant = "default", tone = "neutral", padding, as = "div", children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;
  const sx = {
    borderRadius: "var(--card-radius)", border: "1px solid", color: "var(--foreground)",
    transition: "background-color var(--duration-normal),border-color var(--duration-normal),box-shadow var(--duration-normal),transform var(--duration-normal)",
    transitionTimingFunction: "var(--ease-out)",
    ...surfaceVariantSx[variant], ...surfaceToneSx[tone],
    ...(padding ? { padding: `var(--space-${padding})` } : null),
    ...(variant === "interactive" && hover ? { borderColor: "hsl(var(--brand-green-hsl) / .42)", boxShadow: "var(--card-shadow-hover)", transform: "translateY(var(--lift-hover))" } : null),
    ...style,
  };
  const handlers = variant === "interactive" ? { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) } : null;
  return <Tag style={sx} {...handlers} {...rest}>{children}</Tag>;
}
