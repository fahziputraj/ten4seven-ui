import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Breadcrumb({ items = [], style, ...rest }) {
  return (
    <nav aria-label="Breadcrumb" style={{ minWidth: 0, ...style }} {...rest}>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, minWidth: 0 }}>
              {last
                ? <span aria-current="page" style={{ font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", color: "var(--foreground)", whiteSpace: "nowrap" }}>{item.label}</span>
                : <a href={item.href || "#"} style={{ font: "var(--type-caption)", color: "var(--muted-foreground)", textDecoration: "none", whiteSpace: "nowrap" }}>{item.label}</a>}
              {!last && <Icon name="chevronRight" size={11} style={{ color: "var(--muted-foreground)", opacity: 0.7 }} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
