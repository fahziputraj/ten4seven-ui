const { NavItem, Badge, IconButton, Icon, Progress, Avatar } = window.AAPMDesignSystem_07e1a3;

const academyNav = [
  { label: "Learn", items: [{ id: "dashboard", icon: "dashboard", label: "Dashboard" }, { id: "path", icon: "course", label: "Learning Path", dot: true }] },
  { label: "Tools", items: [{ id: "calc", icon: "calculator", label: "Farm Calculators" }, { id: "kpi", icon: "kpi", label: "Farm KPI" }, { id: "appi", icon: "ai", label: "APPI" }] },
  { label: "Achievement", items: [{ id: "profile", icon: "user", label: "Profile & Prestasi" }, { id: "cert", icon: "certificate", label: "Certification" }, { id: "exam", icon: "cup", label: "Final Exam" }] },
];
const pageMeta = {
  dashboard: { group: "Learn", label: "Dashboard" }, path: { group: "Learn", label: "Learning Path" },
  module: { group: "Learn", label: "Learning Path" }, admin: { group: "Admin", label: "Learner Management" },
  calc: { group: "Tools", label: "Farm Calculators" }, kpi: { group: "Tools", label: "Farm KPI" }, appi: { group: "Tools", label: "APPI" },
  profile: { group: "Achievement", label: "Profile & Prestasi" }, cert: { group: "Achievement", label: "Certification" }, exam: { group: "Achievement", label: "Final Exam" },
};

function AcademySidebar({ view, onNavigate, collapsed, onToggle, onAdmin }) {
  const s = window.AcademyData.stats();
  return (
    <aside style={{ display: "flex", flexDirection: "column", width: collapsed ? 76 : 264, flex: "none",
      borderRight: "1px solid var(--surface-border)", background: "var(--surface-subtle)", transition: "width var(--duration-normal) var(--ease-out)" }}>
      <div style={{ display: "flex", height: 73, flex: "none", alignItems: "center", gap: 12, padding: collapsed ? "0 8px" : "0 20px",
        justifyContent: collapsed ? "center" : "space-between", borderBottom: "1px solid var(--surface-border)" }}>
        <div style={{ minWidth: 0 }}>
          <img src={collapsed ? "../../assets/logos/academy-icon.svg" : "../../assets/logos/academy-logo-long.svg"} alt="AAPM Layer Academy"
            style={{ height: collapsed ? 32 : 34, maxWidth: collapsed ? 32 : 176, display: "block" }} />
          {!collapsed && <span style={{ display: "block", marginTop: 3, fontSize: "var(--text-2xs)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted-foreground)" }}>Learning workspace</span>}
        </div>
        <IconButton icon={collapsed ? "chevronRight" : "chevronLeft"} label={collapsed ? "Buka sidebar" : "Ciutkan sidebar"} variant="outline" size="sm" onClick={onToggle} style={{ height: 32, width: 32 }} />
      </div>
      <div style={{ flex: "none", padding: collapsed ? "16px 12px" : "20px 16px" }}>
        <div style={{ borderRadius: 16, border: "1px solid var(--tint-green-border)", background: "var(--tint-green)", padding: collapsed ? 8 : 12 }}>
          {collapsed ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-green)", fontVariantNumeric: "tabular-nums" }}>{s.percent}%</div>
              <Progress value={s.percent} tone="lime" size="sm" track="var(--muted)" style={{ marginTop: 8 }} />
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ display: "inline-flex", height: 32, width: 32, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: 10, background: "var(--tint-lime)", color: "var(--tint-lime-foreground)" }}><Icon name="progress" size={16} /></span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, fontSize: "var(--text-xs)" }}>
                    <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Learning progress</span>
                    <Badge variant="soft" style={{ background: "hsl(0 0% 100% / .7)", color: "var(--brand-green)", padding: "2px 8px", fontSize: "var(--text-2xs)", fontVariantNumeric: "tabular-nums" }}>{s.percent}%</Badge>
                  </div>
                  <div style={{ marginTop: 4, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{s.done} dari {s.total} modul selesai</div>
                </div>
              </div>
              <Progress value={s.percent} tone="lime" size="sm" track="hsl(var(--foreground-hsl) / .1)" style={{ marginTop: 12 }} />
            </>
          )}
        </div>
      </div>
      <nav aria-label="Navigasi utama" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "8px 12px 20px" }}>
        {academyNav.map((group) => (
          <div key={group.label} style={{ marginBottom: 24 }}>
            {!collapsed && <div style={{ margin: "0 0 8px", padding: "0 12px", fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>{group.label}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {group.items.map((item) => (
                <NavItem key={item.id} icon={item.icon} label={item.label} collapsed={collapsed} dot={item.dot}
                  active={view === item.id || (item.id === "path" && view === "module")} onClick={() => onNavigate(item.id)} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div style={{ flex: "none", padding: collapsed ? 12 : 16 }}>
        <button type="button" onClick={onAdmin} title="Panel Admin"
          style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 8, width: "100%", marginBottom: 12,
            padding: collapsed ? "10px 0" : "10px 12px", borderRadius: "var(--radius-control)", cursor: "pointer",
            border: "1px solid var(--tint-orange-border)", background: "var(--tint-orange)", color: "var(--tint-orange-foreground)",
            fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 600 }}>
          <Icon name="dashboard" size={16} />{!collapsed && "Panel Admin"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: collapsed ? "center" : "flex-start" }}>
          <Avatar name="Rahmat Hidayat" size="lg" ring />
          {!collapsed && (
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rahmat Hidayat</div>
              <div style={{ marginTop: 2, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Lihat profil &amp; prestasi</div>
            </div>
          )}
          {!collapsed && <IconButton icon="logout" label="Keluar" size="sm" />}
        </div>
      </div>
    </aside>
  );
}

function AcademyHeader({ view }) {
  const meta = pageMeta[view] || pageMeta.dashboard;
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, display: "flex", height: 73, flex: "none", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", borderBottom: "1px solid hsl(var(--border-hsl) / .7)", background: "hsl(var(--background-hsl) / .9)", backdropFilter: "blur(20px)" }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline-wide)", color: "var(--muted-foreground)" }}>{meta.group}</div>
        <div style={{ fontSize: "var(--text-md)", fontWeight: 600, color: "var(--foreground)" }}>{meta.label}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Badge variant="soft" dot style={{ background: "var(--surface-subtle)", color: "var(--muted-foreground)", fontWeight: 500 }}>Academy workspace</Badge>
        <IconButton icon="themeDark" label="Gunakan mode gelap" />
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 10px 0 6px", borderRadius: "var(--radius-control)" }}>
          <Avatar name="Rahmat Hidayat" size="sm" />
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 500 }}>Rahmat Hidayat</span>
          <Icon name="chevronDown" size={14} style={{ color: "var(--muted-foreground)" }} />
        </div>
      </div>
    </header>
  );
}

function AcademyShell({ view, onNavigate, onAdmin, children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div style={{ display: "flex", minHeight: 900, background: "var(--background)" }}>
      <AcademySidebar view={view} onNavigate={onNavigate} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} onAdmin={onAdmin} />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
        <AcademyHeader view={view} />
        <main style={{ flex: 1, minWidth: 0, padding: "28px 32px 48px" }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", animation: "aapm-rise 520ms var(--ease-out) both" }}>{children}</div>
        </main>
      </div>
    </div>
  );
}
Object.assign(window, { AcademyShell });
