import React from "react";
import { Icon } from "../core/Icon.jsx";

export function BottomNav({ items = [], value, onChange, centerKey, ariaLabel = "Navigasi bawah", className = "", style }) {
  if (!items.length) return null;
  return (
    <div className={`aapm-bottom-nav__items ${className}`.trim()} style={style} role="list">
      {items.map((item) => {
        const active = value === item.key || item.active;
        const center = centerKey === item.key || item.center;
        return (
          <button
            key={item.key || item.label}
            type="button"
            role="listitem"
            className="aapm-bottom-nav__item"
            data-active={active ? "true" : "false"}
            data-center={center ? "true" : "false"}
            aria-current={active ? "page" : undefined}
            aria-label={item.label}
            disabled={item.disabled}
            onClick={() => onChange?.(item.key, item)}
          >
            <Icon name={item.icon || "module"} size={center ? 20 : 18} />
            <span>{item.label}</span>
            {item.badge != null && <span className="aapm-bottom-nav__badge">{item.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
