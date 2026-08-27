import React from "react";
import { KeyValueList } from "../data/KeyValueList.jsx";

/** Responsive detail rail; on narrow screens it becomes a normal section. */
export function DetailSidebar({ title, description, actions, fields = [], children, style, ...rest }) {
  return (
    <aside className="aapm-detail-sidebar" style={style} {...rest}>
      {(title || description || actions) && (
        <header className="aapm-detail-sidebar__header">
          <div style={{ minWidth: 0 }}>
            {title && <h2 className="aapm-detail-sidebar__title">{title}</h2>}
            {description && <p style={{ margin: "var(--space-1) 0 0", color: "var(--muted-foreground)", font: "var(--type-caption)" }}>{description}</p>}
          </div>
          {actions && <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>{actions}</div>}
        </header>
      )}
      <div className="aapm-detail-sidebar__body">
        {fields.length > 0 && <KeyValueList items={fields} dense />}
        {children}
      </div>
    </aside>
  );
}
