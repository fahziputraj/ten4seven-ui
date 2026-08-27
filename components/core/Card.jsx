import React from "react";

export function Card({ children, style, ...rest }) {
  return <div style={{ borderRadius: "var(--card-radius)", border: "1px solid hsl(var(--border-hsl) / .8)", background: "var(--card)", color: "var(--card-foreground)", boxShadow: "var(--card-shadow)", ...style }} {...rest}>{children}</div>;
}

export function CardHeader({ children, style, ...rest }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", padding: "var(--card-padding)", paddingBottom: "var(--space-3)", ...style }} {...rest}>{children}</div>;
}

export function CardTitle({ children, style, ...rest }) {
  return <div style={{ font: "var(--type-card-title)", letterSpacing: "var(--tracking-tight)", ...style }} {...rest}>{children}</div>;
}

export function CardDescription({ children, style, ...rest }) {
  return <div style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-base)", color: "var(--muted-foreground)", ...style }} {...rest}>{children}</div>;
}

export function CardContent({ children, style, ...rest }) {
  return <div style={{ padding: "var(--card-padding)", paddingTop: 0, ...style }} {...rest}>{children}</div>;
}

export function CardFooter({ children, style, ...rest }) {
  return <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", padding: "var(--card-padding)", paddingTop: 0, ...style }} {...rest}>{children}</div>;
}
