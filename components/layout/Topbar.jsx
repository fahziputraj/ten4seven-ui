import React from "react";
import { Icon } from "../core/Icon.jsx";

function renderBreadcrumb(breadcrumb) {
  if (!breadcrumb) return null;
  if (React.isValidElement(breadcrumb)) return breadcrumb;
  const items = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];
  return (
    <nav className="aapm-shell-topbar__breadcrumb" aria-label="Breadcrumb">
      <ol className="aapm-breadcrumb-list">
        {items.map((item, index) => (
          <li key={item.key || item.label || item || index}>
            {item.href ? <a href={item.href}>{item.label || item}</a> : <span>{item.label || item}</span>}
            {index < items.length - 1 && <span aria-hidden="true" className="aapm-breadcrumb-separator">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Sticky page header. Keep actions short; put dense controls in the page body. */
export function Topbar({
  overline,
  title,
  breadcrumb,
  actions,
  account,
  children,
  onMobileMenu,
  mobileMenuLabel = "Buka navigasi",
  onSearch,
  searchLabel = "Cari",
  className = "",
  style,
}) {
  return (
    <header className={`aapm-shell-topbar ${className}`.trim()} style={style}>
      {onMobileMenu && (
        <button type="button" className="aapm-shell-topbar__menu" aria-label={mobileMenuLabel} onClick={onMobileMenu}>
          <Icon name="menu" size={20} />
        </button>
      )}
      <div className="aapm-shell-topbar__heading">
        {overline && <div className="aapm-shell-topbar__overline">{overline}</div>}
        {title && <h1 className="aapm-shell-topbar__title">{title}</h1>}
        {renderBreadcrumb(breadcrumb)}
      </div>
      <div className="aapm-shell-topbar__actions">
        {onSearch && (
          <button type="button" className="aapm-shell-topbar__search" aria-label={searchLabel} onClick={onSearch}>
            <Icon name="search" size={18} />
            <span>{searchLabel}</span>
          </button>
        )}
        {children}
        {actions}
        {account && <div className="aapm-shell-topbar__account">{account}</div>}
      </div>
    </header>
  );
}
