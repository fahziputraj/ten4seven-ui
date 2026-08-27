import React from "react";
import { Icon } from "../core/Icon.jsx";

export function NavItem({ icon, label, active = false, collapsed = false, badge, dot = false, as = "button", href, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const Tag = as === "a" ? "a" : "button";
  return (
    <Tag href={as === "a" ? href : undefined} type={as === "a" ? undefined : "button"} onClick={onClick}
      title={collapsed ? String(label) : undefined} aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
        justifyContent: collapsed ? "center" : "flex-start", textDecoration: "none",
        padding: collapsed ? "0.625rem 0" : "0.625rem var(--space-3)",
        borderRadius: "var(--radius-control)", border: "none", cursor: "pointer",
        fontFamily: "var(--font-body)", fontSize: "var(--text-base)",
        fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
        background: active ? "var(--brand-green)" : hover ? "var(--surface-hover)" : "transparent",
        color: active ? "var(--primary-foreground)" : hover ? "var(--foreground)" : "var(--muted-foreground)",
        boxShadow: active ? "var(--shadow-1)" : "none",
        transition: "background-color var(--duration-fast),color var(--duration-fast)", ...style,
      }} {...rest}>
      <Icon name={icon} size={19} style={{ filter: active ? "brightness(0) invert(1)" : "none" }} />
      {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>}
      {!collapsed && badge != null && (
        <span style={{
          marginLeft: "auto", borderRadius: "var(--radius-full)", padding: "0.0625rem 0.375rem",
          fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums",
          background: active ? "hsl(0 0% 100% / .2)" : "hsl(var(--foreground-hsl) / .06)",
          color: active ? "var(--primary-foreground)" : "var(--muted-foreground)",
        }}>{badge}</span>
      )}
      {!collapsed && dot && <span style={{ marginLeft: "auto", height: 6, width: 6, borderRadius: "var(--radius-full)", background: active ? "var(--brand-lime)" : "var(--brand-orange)" }} />}
    </Tag>
  );
}
