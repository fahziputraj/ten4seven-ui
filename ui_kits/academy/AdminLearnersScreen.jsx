const { PageHeader, Breadcrumb, FilterToolbar, DataTable, StatusChip, Avatar, Progress, Pagination, BulkActionBar, Button, IconButton, KPICluster, Badge, Popover, PopoverItem, Icon } = window.AAPMDesignSystem_07e1a3;

function AdminLearnersScreen() {
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const learners = window.AcademyData.learners;
  const rows = learners.filter((l) => l.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <Breadcrumb items={[{ label: "Panel Admin", href: "#" }, { label: "Learner Management" }]} style={{ marginBottom: 12 }} />
      <PageHeader overline="Admin · Academy" title="Learner Management"
        description="Pantau progress peserta, verifikasi kelayakan sertifikasi, dan kelola akses workspace."
        actions={<><Button variant="outline" size="sm" icon="export">Ekspor</Button><Button size="sm" icon="add">Tambah peserta</Button></>}
        style={{ marginBottom: 20 }} />
      <KPICluster compact items={[
        { icon: "users", label: "Peserta aktif", value: "148", delta: "+12", direction: "up", caption: "30 hari terakhir", tone: "green" },
        { icon: "check", label: "Modul diselesaikan", value: "1.284", delta: "+96", direction: "up", caption: "Seluruh peserta", tone: "blue", accent: "blue" },
        { icon: "certificate", label: "Menunggu verifikasi", value: "9", status: "Tier 3", tone: "orange", accent: "orange", caption: "Sertifikasi" },
        { icon: "kpi", label: "Rata-rata skor", value: "88", unit: "%", delta: "-1%", direction: "down", tone: "slate", accent: "none" },
      ]} style={{ marginBottom: 20 }} />
      <FilterToolbar searchValue={q} onSearchChange={setQ} searchPlaceholder="Cari nama peserta, kandang, atau peran..."
        applied={[{ key: "loc", label: "Lokasi: Blitar" }]} onRemoveFilter={() => {}} onClearAll={() => {}}
        trailing={<><Button variant="outline" size="sm" icon="filter">Filter lanjutan</Button><IconButton icon="settings" label="Atur kolom" variant="outline" size="sm" /></>}
        style={{ marginBottom: sel.length ? 12 : 20 }} />
      {sel.length > 0 && (
        <BulkActionBar count={sel.length} noun="peserta" onClear={() => setSel([])} style={{ marginBottom: 20 }}
          actions={<><Button variant="ghost" size="sm" icon="verify">Verifikasi sertifikasi</Button><Button variant="ghost" size="sm" icon="email">Kirim pengingat</Button><Button variant="ghost" size="sm" icon="archive">Arsipkan</Button></>} />
      )}
      <DataTable selectable selectedIds={sel} rows={rows} getRowId={(r) => r.name}
        onToggleRow={(id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])}
        onToggleAll={(next) => setSel(next ? rows.map((r) => r.name) : [])}
        sort={{ key: "progress", dir: "desc" }} onSort={() => {}} onRowClick={() => {}}
        columns={[
          { key: "name", label: "Peserta", wrap: true, render: (r) => (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <Avatar name={r.name} size="sm" tone={r.progress === 100 ? "green" : r.progress < 30 ? "slate" : "orange"} />
              <span><span style={{ display: "block", fontWeight: 600 }}>{r.name}</span><span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{r.farm}</span></span>
            </span>) },
          { key: "role", label: "Peran", muted: true },
          { key: "level", label: "Level", numeric: true },
          { key: "progress", label: "Progress", width: 150, render: (r) => (
            <span style={{ display: "block" }}>
              <span style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-2xs)", fontWeight: 600, color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums", marginBottom: 4 }}><span>{r.progress}%</span></span>
              <Progress value={r.progress} tone={r.progress === 100 ? "green" : "lime"} size="sm" track="hsl(var(--foreground-hsl) / .08)" />
            </span>) },
          { key: "status", label: "Sertifikasi", render: (r) => <StatusChip status={r.status} size="sm" icon={false} /> },
          { key: "last", label: "Aktivitas", numeric: true, muted: true },
          { key: "act", label: "", width: 44, render: () => (
            <Popover align="end" trigger={<IconButton icon="more" label="Tindakan" size="sm" />}>
              <PopoverItem><Icon name="user" size={15} /> Buka detail peserta</PopoverItem>
              <PopoverItem><Icon name="verify" size={15} /> Verifikasi sertifikasi</PopoverItem>
              <PopoverItem><Icon name="email" size={15} /> Kirim pengingat</PopoverItem>
              <PopoverItem tone="danger"><Icon name="lock" size={15} /> Cabut akses</PopoverItem>
            </Popover>) },
        ]}
        summary={{ name: rows.length + " peserta", level: "8", last: "24 Agu 2026" }} />
      <Pagination page={page} pageCount={30} total={148} pageSize={5} onChange={setPage} />
    </>
  );
}
Object.assign(window, { AdminLearnersScreen });
