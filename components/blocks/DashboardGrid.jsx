import React from "react";

/** Responsive dashboard grid. Use twelve columns only when the dashboard needs explicit spans. */
export function DashboardGrid({ twelve = false, density, minItemWidth, children, className = "", style, ...rest }) {
  const gridStyle = minItemWidth ? { "--dashboard-min-item-width": minItemWidth, ...style } : style;
  return (
    <div
      className={`aapm-dashboard-grid${twelve ? " aapm-dashboard-grid--twelve" : ""} ${className}`.trim()}
      data-density={density}
      style={gridStyle}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DashboardPanel({ title, description, action, children, className = "", style, ...rest }) {
  return (
    <section className={`aapm-dashboard-panel ${className}`.trim()} style={style} {...rest}>
      {(title || description || action) && (
        <div className="aapm-dashboard-panel__header">
          <div className="aapm-dashboard-panel__heading">
            {title && <h2 className="aapm-dashboard-panel__title">{title}</h2>}
            {description && <p className="aapm-dashboard-panel__description">{description}</p>}
          </div>
          {action && <div className="aapm-dashboard-panel__action">{action}</div>}
        </div>
      )}
      <div className="aapm-dashboard-panel__body">{children}</div>
    </section>
  );
}
