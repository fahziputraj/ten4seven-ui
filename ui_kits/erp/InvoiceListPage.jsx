const { PageHeader, FilterToolbar, DataTable, StatusChip, Avatar, Pagination, BulkActionBar, Button, IconButton, Popover, PopoverItem, Icon, Select, Tabs, Drawer, FormField, StateView } = window.AAPMDesignSystem_07e1a3;

function InvoiceListPage({ onOpenRecord }) {
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [tab, setTab] = React.useState("semua");
  const [drawer, setDrawer] = React.useState(false);
  const [applied, setApplied] = React.useState([{ key: "period", label: "Periode: Agustus 2026" }, { key: "loc", label: "Entitas: AAPM Blitar" }]);
  const all = window.ErpData.invoices;
  const rows = all.filter((r) => (tab === "semua" || (tab === "review" && r.status === "in-review") || (tab === "overdue" && r.status === "overdue") || (tab === "draft" && r.status === "draft")))
    .filter((r) => (r.id + r.supplier).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader overline="Transaksi · Purchase" title="Purchase Invoice"
        description="Kelola tagihan supplier, verifikasi dokumen, dan ajukan pembayaran."
        actions={<><Button variant="ghost" size="sm" icon="print">Cetak</Button><Button variant="outline" size="sm" icon="export">Ekspor</Button><Button size="sm" icon="add">Buat invoice</Button></>}
        style={{ marginBottom: 16 }} />
      <Tabs value={tab} onChange={setTab} style={{ marginBottom: 16 }} items={[
        { value: "semua", label: "Semua", count: all.length },
        { value: "review", label: "Menunggu verifikasi", count: 1 },
        { value: "overdue", label: "Jatuh tempo", count: 1 },
        { value: "draft", label: "Draft", count: 1 },
      ]} />
      <FilterToolbar searchValue={q} onSearchChange={setQ} searchPlaceholder="Cari nomor invoice, supplier, atau nomor PO..."
        filters={<><div style={{ width: 158 }}><Select size="sm" placeholder="Semua status" options={["In review", "Approved", "Overdue", "Draft"]} /></div>
          <div style={{ width: 150 }}><Select size="sm" placeholder="Agustus 2026" options={["Juli 2026", "Agustus 2026"]} /></div>
          <div style={{ width: 158 }}><Select size="sm" placeholder="Semua supplier" options={["CV Sumber Pakan Jaya", "PT Agro Nusantara"]} /></div></>}
        applied={applied} onRemoveFilter={(k) => setApplied((a) => a.filter((f) => f.key !== k))} onClearAll={() => setApplied([])}
        trailing={<><Button variant="outline" size="sm" icon="filter" onClick={() => setDrawer(true)}>Filter lanjutan</Button><IconButton icon="settings" label="Atur kolom" variant="outline" size="sm" /></>}
        style={{ marginBottom: sel.length ? 12 : 20 }} />
      {sel.length > 0 && (
        <BulkActionBar count={sel.length} noun="dokumen" onClear={() => setSel([])} style={{ marginBottom: 20 }}
          actions={<><Button variant="ghost" size="sm" icon="approve">Setujui</Button><Button variant="ghost" size="sm" icon="submit">Ajukan verifikasi</Button><Button variant="ghost" size="sm" icon="export">Ekspor</Button><Button variant="ghost" size="sm" icon="archive">Arsipkan</Button></>} />
      )}
      {rows.length === 0
        ? <StateView state="no-result" description="Tidak ada dokumen yang cocok dengan filter saat ini. Kurangi filter atau ubah periode." onRetry={() => { setQ(""); setTab("semua"); }} retryLabel="Reset filter" />
        : <DataTable selectable selectedIds={sel} rows={rows} onRowClick={onOpenRecord}
            onToggleRow={(id) => setSel((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])}
            onToggleAll={(next) => setSel(next ? rows.map((r) => r.id) : [])}
            sort={{ key: "date", dir: "desc" }} onSort={() => {}}
            columns={[
              { key: "id", label: "Nomor", strong: true, sortable: true },
              { key: "supplier", label: "Supplier", wrap: true },
              { key: "po", label: "Nomor PO", muted: true },
              { key: "date", label: "Tanggal", numeric: true, sortable: true },
              { key: "due", label: "Jatuh tempo", numeric: true, render: (r) => <span style={{ color: r.status === "overdue" ? "var(--danger)" : "var(--foreground)", fontWeight: r.status === "overdue" ? 600 : 400 }}>{r.due}</span> },
              { key: "owner", label: "PIC", render: (r) => <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Avatar name={r.owner} size="xs" /><span style={{ fontSize: "var(--text-xs)" }}>{r.owner}</span></span> },
              { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} size="sm" icon={false} /> },
              { key: "total", label: "Total", numeric: true, sortable: true, strong: true },
              { key: "act", label: "", width: 44, render: () => (
                <Popover align="end" trigger={<IconButton icon="more" label="Tindakan" size="sm" />}>
                  <PopoverItem><Icon name="edit" size={15} /> Ubah dokumen</PopoverItem>
                  <PopoverItem><Icon name="duplicate" size={15} /> Duplikat</PopoverItem>
                  <PopoverItem><Icon name="print" size={15} /> Cetak</PopoverItem>
                  <PopoverItem tone="danger"><Icon name="delete" size={15} /> Hapus</PopoverItem>
                </Popover>) },
            ]}
            summary={{ supplier: rows.length + " dokumen", total: "Rp 1.127.070.000" }} />}
      <Pagination page={page} pageCount={20} total={482} pageSize={7} onChange={setPage} />
      {drawer && (
        <Drawer open onClose={() => setDrawer(false)} title="Filter lanjutan" description="Terapkan untuk memperbarui daftar"
          footer={<><Button variant="ghost" size="sm" onClick={() => setApplied([])}>Hapus semua</Button><Button size="sm" icon="filter" onClick={() => setDrawer(false)}>Terapkan</Button></>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <FormField id="f1" label="Rentang nilai"><Select id="f1" placeholder="Semua nilai" options={["< Rp 50 jt", "Rp 50–500 jt", "> Rp 500 jt"]} /></FormField>
            <FormField id="f2" label="Kandang / lokasi"><Select id="f2" placeholder="Semua lokasi" options={["Kandang 1", "Kandang 3", "Gudang Blitar"]} /></FormField>
            <FormField id="f3" label="PIC dokumen"><Select id="f3" placeholder="Semua PIC" options={["Dewi Lestari", "Siti Aminah", "Budi Santoso"]} /></FormField>
            <FormField id="f4" label="Kelengkapan lampiran" hint="Dokumen tanpa faktur pajak tidak dapat disetujui."><Select id="f4" placeholder="Semua" options={["Lengkap", "Belum lengkap"]} /></FormField>
          </div>
        </Drawer>
      )}
    </>
  );
}
Object.assign(window, { InvoiceListPage });
