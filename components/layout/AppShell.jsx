import React from "react";

/**
 * Neutral application frame for learner, admin, ERP and operations products.
 * The shell owns responsive geometry; product code owns the navigation model.
 */
export function AppShell({
  sidebar,
  header,
  children,
  mobileNav,
  sidebarCollapsed = false,
  sidebarOpen: controlledSidebarOpen,
  onSidebarOpenChange,
  density = "default",
  hasSidebar = true,
  ariaLabel = "Aplikasi",
  className = "",
  style,
}) {
  const [uncontrolledSidebarOpen, setUncontrolledSidebarOpen] = React.useState(false);
  const sidebarOpen = controlledSidebarOpen ?? uncontrolledSidebarOpen;
  const setSidebarOpen = (next) => {
    if (controlledSidebarOpen == null) setUncontrolledSidebarOpen(next);
    onSidebarOpenChange?.(next);
  };

  return (
    <div
      className={`aapm-app-shell ${className}`.trim()}
      data-density={density}
      data-has-sidebar={hasSidebar ? "true" : "false"}
      data-sidebar-collapsed={sidebarCollapsed ? "true" : "false"}
      data-sidebar-open={sidebarOpen ? "true" : "false"}
      style={style}
    >
      {hasSidebar && (
        <button
          type="button"
          className="aapm-shell-overlay"
          aria-label="Tutup navigasi"
          aria-hidden={!sidebarOpen}
          tabIndex={sidebarOpen ? 0 : -1}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {hasSidebar && sidebar}
      <div className="aapm-shell-main">
        {header}
        <main className="aapm-shell-content">{children}</main>
      </div>
      {mobileNav && <nav className="aapm-bottom-nav" aria-label="Navigasi utama">{mobileNav}</nav>}
    </div>
  );
}
