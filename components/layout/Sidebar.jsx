import React from "react";
import { Icon } from "../core/Icon.jsx";
import { NavItem } from "../navigation/NavItem.jsx";

function renderBrand(brand, collapsedBrand, collapsed) {
  if (collapsed && collapsedBrand != null) return collapsedBrand;
  return brand;
}

/** Sidebar model shared by the general shell and product kits. */
export function Sidebar({
  brand,
  collapsedBrand,
  sections = [],
  footer,
  collapsed = false,
  activeKey,
  onNavigate,
  onToggle,
  ariaLabel = "Navigasi samping",
  className = "",
  style,
}) {
  return (
    <aside
      className={`aapm-shell-sidebar ${className}`.trim()}
      data-collapsed={collapsed ? "true" : "false"}
      aria-label={ariaLabel}
      style={style}
    >
      <div className="aapm-shell-sidebar__brand">
        {renderBrand(brand, collapsedBrand, collapsed)}
        {onToggle && (
          <button
            type="button"
            className="aapm-sidebar-toggle"
            aria-label={collapsed ? "Perluas navigasi" : "Ringkas navigasi"}
            title={collapsed ? "Perluas navigasi" : "Ringkas navigasi"}
            onClick={onToggle}
          >
            <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={18} />
          </button>
        )}
      </div>
      <div className="aapm-shell-sidebar__scroll">
        {sections.map((section, sectionIndex) => (
          <section className="aapm-shell-sidebar__section" key={section.key || section.label || sectionIndex}>
            {section.label && <div className="aapm-shell-sidebar__section-label">{section.label}</div>}
            <div className="aapm-shell-sidebar__nav">
              {(section.items || []).map((item) => {
                const active = activeKey === item.key || item.active;
                const handleClick = (event) => {
                  item.onClick?.(event);
                  if (!item.disabled) onNavigate?.(item.key, item, event);
                };
                const as = item.href && !onNavigate ? "a" : "button";
                return (
                  <NavItem
                    key={item.key || item.label}
                    as={as}
                    href={item.href}
                    icon={item.icon || "module"}
                    label={item.label}
                    active={active}
                    collapsed={collapsed}
                    badge={item.badge}
                    dot={item.dot}
                    disabled={item.disabled}
                    aria-disabled={item.disabled ? "true" : undefined}
                    onClick={handleClick}
                    style={item.disabled ? { opacity: 0.48, cursor: "not-allowed" } : undefined}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {footer && <div className="aapm-shell-sidebar__footer">{footer}</div>}
    </aside>
  );
}
