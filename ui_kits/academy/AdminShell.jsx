const { NavItem, Button, IconButton, Icon, Avatar, Surface } = window.AAPMDesignSystem_07e1a3;

/* Recreated from src/components/layout/AdminShell.jsx + src/components/admin/adminNavigationItems.js.
   The admin shell differs from the learner shell on purpose: no collapse rail, no progress puck,
   a solid (not blurred) header on --surface-default, and a planned-capabilities note in the rail. */
const adminPrimary = [
  { id: "overview", icon: "dashboard", label: "Ringkasan" },
  { id: "courses", icon: "course", label: "Manajemen course" },
  { id: "admin", icon: "users", label: "Manajemen pengguna" },
  { id: "ai", icon: "ai", label: "Pengaturan AI" },
];
const adminSecondary = [{ id: "workspace", icon: "opname", label: "Status ruang kerja" }];
const plannedCapabilities = [
  { icon: "certificate", label: "Sertifikat", detail: "Data sertifikat dapat dibaca per learner; penerbitan global memerlukan endpoint baru." },
  { icon: "media", label: "Pustaka media", detail: "Upload dan manajemen media perlu penyimpanan server terpisah." },
  { icon: "analytics", label: "Analitik", detail: "Ringkasan live tersedia di Overview; laporan terjadwal belum memiliki API native." },
];

function AdminSidebar({ view, onNavigate, onExit }) {
  return (
    <aside style={{ display: "flex", flexDirection: "column", width: 264, flex: "none", borderRight: "1px solid var(--surface-border)", background: "var(--surface-subtle)" }}>
      <div style={{ display: "flex", height: 73, flex: "none", flexDirection: "column", justifyContent: "center", gap: 3, padding: "0 20px", borderBottom: "1px solid var(--surface-border)" }}>
        <img src="../../assets/logos/aapm-logo.svg" alt="AAPM" style={{ width: 150, height: "auto", display: "block" }} />
        <span style={{ fontSize: "var(--text-2xs)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted-foreground)" }}>Ruang admin</span>
      </div>
      <nav aria-label="Navigasi admin" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "16px 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {adminPrimary.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={view === item.id} onClick={() => onNavigate(item.id)} />
          ))}
        </div>
        <div style={{ margin: "20px 0 8px", padding: "0 12px", fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>Operasional</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {adminSecondary.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={view === item.id} onClick={() => onNavigate(item.id)} />
          ))}
        </div>
        <div style={{ margin: "20px 0 8px", padding: "0 12px", fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>Belum tersedia</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {plannedCapabilities.map((c) => (
            <Surface key={c.label} variant="dashed" padding={3} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
              <Icon name={c.icon} size={15} style={{ color: "var(--muted-foreground)", marginTop: 1 }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: "var(--text-xs)", fontWeight: 600 }}>{c.label}</span>
                <span style={{ display: "block", marginTop: 2, fontSize: "var(--text-2xs)", lineHeight: "0.95rem", color: "var(--muted-foreground)" }}>{c.detail}</span>
              </span>
            </Surface>
          ))}
        </div>
      </nav>
      <div style={{ flex: "none", borderTop: "1px solid var(--surface-border)", padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: "var(--radius-control)", background: "hsl(var(--background-hsl) / .7)" }}>
          <Avatar name="Dewi Lestari" size="sm" ring />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Dewi Lestari</div>
            <div style={{ fontSize: "var(--text-2xs)", color: "var(--muted-foreground)" }}>Admin Academy</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
          <Button variant="outline" size="sm" icon="dashboard" onClick={onExit} style={{ height: 36, fontSize: "var(--text-xs)", padding: "0 var(--space-2)" }}>Academy</Button>
          <Button variant="ghost" size="sm" icon="logout" style={{ height: 36, fontSize: "var(--text-xs)", padding: "0 var(--space-2)", color: "var(--muted-foreground)" }}>Keluar</Button>
        </div>
        <p style={{ margin: "8px 4px 0", fontSize: "var(--text-2xs)", lineHeight: "1rem", color: "var(--muted-foreground)" }}>Data dan kontrol mengikuti API native.</p>
      </div>
    </aside>
  );
}

const adminTitles = { overview: "Ringkasan", courses: "Manajemen Academy", admin: "Manajemen Academy", ai: "Manajemen Academy", workspace: "Manajemen Academy" };

function AdminShell({ view, onNavigate, onExit, children }) {
  return (
    <div style={{ display: "flex", minHeight: 900, background: "var(--background)", color: "var(--foreground)" }}>
      <AdminSidebar view={view} onNavigate={onNavigate} onExit={onExit} />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
        <header style={{ display: "flex", height: 73, flex: "none", alignItems: "center", justifyContent: "space-between", padding: "0 32px", borderBottom: "1px solid var(--surface-border)", background: "var(--surface-default)" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>Ruang admin</div>
            <div style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>{adminTitles[view] || "Manajemen Academy"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Button variant="ghost" size="sm" icon="dashboard" onClick={onExit}>Buka Academy</Button>
            <IconButton icon="themeDark" label="Gunakan mode gelap" />
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 10px 0 6px", borderRadius: "var(--radius-control)" }}>
              <Avatar name="Dewi Lestari" size="sm" />
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 500 }}>Dewi Lestari</span>
              <Icon name="chevronDown" size={14} style={{ color: "var(--muted-foreground)" }} />
            </div>
          </div>
        </header>
        <main style={{ flex: 1, minWidth: 0, padding: "28px 32px 48px" }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", animation: "aapm-rise 520ms var(--ease-out) both" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}
Object.assign(window, { AdminShell });
