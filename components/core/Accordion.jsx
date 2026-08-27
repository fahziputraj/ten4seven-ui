import React from "react";
import { Icon } from "./Icon.jsx";

export function Accordion({ items = [], value, onChange, multiple = false, variant = "card", style, ...rest }) {
  const [internal, setInternal] = React.useState(() => (multiple ? [] : null));
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const isOpen = (id) => (multiple ? (current || []).includes(id) : current === id);
  const toggle = (id) => {
    const next = multiple
      ? ((current || []).includes(id) ? current.filter((x) => x !== id) : [...(current || []), id])
      : (current === id ? null : id);
    controlled ? onChange?.(next) : setInternal(next);
  };
  const boxed = variant === "card";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: boxed ? "var(--space-2)" : 0, ...style }} {...rest}>
      {items.map((item) => {
        const on = isOpen(item.id);
        return (
          <section key={item.id} style={{
            borderRadius: boxed ? "var(--radius-panel)" : 0,
            border: boxed ? "1px solid " + (on ? "hsl(var(--brand-green-hsl) / .3)" : "var(--surface-border)") : "none",
            borderBottom: boxed ? undefined : "1px solid var(--border-subtle)",
            background: boxed ? "var(--card)" : "transparent",
            boxShadow: boxed && on ? "var(--card-shadow)" : "none",
            overflow: "hidden", transition: "border-color var(--duration-normal),box-shadow var(--duration-normal)",
          }}>
            <button type="button" aria-expanded={on} onClick={() => toggle(item.id)} disabled={item.disabled}
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%", textAlign: "left",
                padding: boxed ? "var(--space-4)" : "var(--space-3) 0", border: 0, background: "transparent",
                cursor: item.disabled ? "not-allowed" : "pointer", opacity: item.disabled ? 0.5 : 1, fontFamily: "var(--font-body)",
              }}>
              {item.icon && <Icon name={item.icon} size={18} style={{ flex: "none", color: on ? "var(--primary)" : "var(--muted-foreground)" }} />}
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: "block", font: "var(--type-card-title)", color: "var(--foreground)" }}>{item.title}</span>
                {item.description && <span style={{ display: "block", marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{item.description}</span>}
              </span>
              {item.meta && <span style={{ flex: "none", font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{item.meta}</span>}
              <Icon name="chevronDown" size={16} style={{ flex: "none", color: "var(--muted-foreground)", transform: on ? "rotate(180deg)" : "none", transition: "transform var(--duration-normal) var(--ease-out)" }} />
            </button>
            {on && (
              <div style={{ padding: boxed ? "0 var(--space-4) var(--space-4)" : "0 0 var(--space-4)", font: "var(--type-body)", animation: "aapm-rise var(--duration-normal) var(--ease-out) both" }}>
                {item.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
