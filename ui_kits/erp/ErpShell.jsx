const { NavItem, Badge, IconButton, Icon, Avatar, Select } = window.AAPMDesignSystem_07e1a3;

const viewMeta = {
  dashboard: { group: "Operasional", label: "Operational Dashboard" },
  list: { group: "Transaksi", label: "Purchase Invoice" },
  transaction: { group: "Transaksi", label: "Purchase Invoice · PI-2026-00841" },
  approval: { group: "Persetujuan", label: "Approval Queue" },
};

function ErpShell({ view, onNavigate, children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const meta = viewMeta[view] || { group: "AAPM ERP", label: "Belum tersedia" };
  return (
    <div style={{ display: "flex", minHeight: 900, background: "var(--background)" }} data-density="default">
      <aside style={{ display: "flex", flexDirection: "column", width: collapsed ? 76 : 264, flex: "none",
        borderRight: "1px solid var(--surface-border)", background: "var(--sidebar-background)", transition: "width var(--duration-normal) var(--ease-out)" }}>
        <div style={{ display: "flex", height: 73, flex: "none", alignItems: "center", gap: 12, padding: collapsed ? "0 8px" : "0 20px",
          justifyContent: collapsed ? "center" : "space-between", borderBottom: "1px solid var(--sidebar-border)" }}>
          <div style={{ minWidth: 0 }}>
            <img src={collapsed ? "../../assets/logos/aapm-icon.svg" : "../../assets/logos/aapm-logo.svg"} alt="AAPM"
              style={{ height: collapsed ? 32 : 36, display: "block" }} />
            {!collapsed && <span style={{ display: "block", marginTop: 3, fontSize: "var(--text-2xs)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted-foreground)" }}>ERP workspace</span>}
          </div>
          <IconButton icon={collapsed ? "chevronRight" : "chevronLeft"} label={collapsed ? "Buka sidebar" : "Ciutkan sidebar"} variant="outline" size="sm" onClick={() => setCollapsed(!collapsed)} style={{ height: 32, width: 32 }} />
        </div>
        {!collapsed && (
          <div style={{ flex: "none", padding: "16px 16px 8px" }}>
            <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)", marginBottom: 6 }}>Entitas aktif</div>
            <Select size="sm" icon="location" defaultValue="blitar" options={[{ value: "blitar", label: "AAPM Blitar" }, { value: "kediri", label: "AAPM Kediri" }]} />
          </div>
        )}
        <nav aria-label="Modul" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "12px 12px 20px" }}>
          {window.ErpData.modules.map((group) => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              {!collapsed && <div style={{ margin: "0 0 8px", padding: "0 12px", fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>{group.label}</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {group.items.map((item) => (
                  <NavItem key={item.id} icon={item.icon} label={item.label} collapsed={collapsed} badge={item.badge} dot={item.dot}
                    active={view === item.id || (item.id === "list" && view === "transaction")} onClick={() => onNavigate(item.id)} />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div style={{ flex: "none", padding: collapsed ? 12 : 16, borderTop: "1px solid var(--sidebar-border)", display: "flex", alignItems: "center", gap: 12, justifyContent: collapsed ? "center" : "flex-start" }}>
          <Avatar name="Dewi Lestari" size="lg" ring />
          {!collapsed && (
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 600 }}>Dewi Lestari</div>
              <div style={{ marginTop: 2, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Finance · Blitar</div>
            </div>
          )}
          {!collapsed && <IconButton icon="logout" label="Keluar" size="sm" />}
        </div>
      </aside>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
        <header style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", height: 73, flex: "none", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", borderBottom: "1px solid hsl(var(--border-hsl) / .7)", background: "hsl(var(--background-hsl) / .9)", backdropFilter: "blur(20px)" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>{meta.group}</div>
            <div style={{ fontSize: "var(--text-md)", fontWeight: 600 }}>{meta.label}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Badge variant="soft" dot style={{ background: "var(--surface-subtle)", color: "var(--muted-foreground)", fontWeight: 500 }}>Periode Agustus 2026</Badge>
            <IconButton icon="search" label="Cari" />
            <IconButton icon="notification" label="Notifikasi" />
            <IconButton icon="themeDark" label="Gunakan mode gelap" />
          </div>
        </header>
        <main style={{ flex: 1, minWidth: 0, padding: "28px 32px 48px" }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", animation: "aapm-rise 520ms var(--ease-out) both" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}
Object.assign(window, { ErpShell });
