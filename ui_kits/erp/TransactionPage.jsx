const { Breadcrumb, RecordSummary, FormSection, DataTable, KeyValueList, Surface, Card, CardHeader, CardTitle, CardContent, ActionFooter, Button, IconButton, Input, Select, FormField, Tabs, AuditTimeline, StatusChip, Alert, Stepper, Modal, Icon, Badge } = window.AAPMDesignSystem_07e1a3;

function TransactionPage({ onBack }) {
  const [tab, setTab] = React.useState("detail");
  const [confirm, setConfirm] = React.useState(false);
  return (
    <>
      <Breadcrumb items={[{ label: "Purchase", href: "#" }, { label: "Purchase Invoice", href: "#" }, { label: "PI-2026-00841" }]} style={{ marginBottom: 12 }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "var(--tracking-title)" }}>PI-2026-00841</h1>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <StatusChip status="in-review" />
            <span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Dibuat 22 Agu 2026 oleh Dewi Lestari · terakhir diubah 14:32</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm" icon="back" onClick={onBack}>Kembali</Button>
          <Button variant="outline" size="sm" icon="print">Cetak</Button>
          <IconButton icon="more" label="Tindakan lain" variant="outline" size="sm" />
        </div>
      </div>
      <Stepper current={1} style={{ marginBottom: 20 }} steps={[
        { label: "Draft", description: "Purchasing" }, { label: "Verifikasi", description: "Finance" },
        { label: "Persetujuan", description: "Manager" }, { label: "Pembayaran", description: "Treasury" }, { label: "Selesai" }]} />
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1.4fr) minmax(320px,0.8fr)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Tabs value={tab} onChange={setTab} items={[{ value: "detail", label: "Detail transaksi" }, { value: "docs", label: "Lampiran", count: 2 }, { value: "audit", label: "Riwayat" }]} />
          {tab === "detail" && (
            <Surface padding={6} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <FormSection title="Informasi dokumen" description="Nomor dan tanggal mengikuti periode akuntansi yang aktif." columns={2}>
                <FormField id="t1" label="Nomor invoice" required><Input id="t1" defaultValue="PI-2026-00841" /></FormField>
                <FormField id="t2" label="Nomor PO" required><Input id="t2" defaultValue="PO-2026-00612" /></FormField>
                <FormField id="t3" label="Supplier" required><Select id="t3" icon="users" defaultValue="a" options={[{ value: "a", label: "CV Sumber Pakan Jaya" }]} /></FormField>
                <FormField id="t4" label="Termin pembayaran"><Select id="t4" defaultValue="30" options={[{ value: "30", label: "Net 30 hari" }, { value: "45", label: "Net 45 hari" }]} /></FormField>
                <FormField id="t5" label="Tanggal dokumen" required><Input id="t5" type="date" defaultValue="2026-08-24" /></FormField>
                <FormField id="t6" label="Jatuh tempo" permission="Terhitung otomatis"><Input id="t6" type="date" defaultValue="2026-09-23" disabled /></FormField>
              </FormSection>
              <FormSection title="Detail item" description="Total harus rekonsiliasi dengan nilai PO sebelum dokumen dapat diajukan."
                actions={<Button variant="outline" size="sm" icon="add">Tambah baris</Button>} divider={false}>
                <div style={{ gridColumn: "1 / -1" }} data-density="compact">
                  <DataTable stickyHeader={false} rows={window.ErpData.lines} getRowId={(r, i) => i}
                    style={{ boxShadow: "none", border: "1px solid var(--border)" }}
                    columns={[
                      { key: "item", label: "Item", wrap: true, strong: true },
                      { key: "qty", label: "Qty", numeric: true },
                      { key: "unit", label: "Satuan", muted: true },
                      { key: "price", label: "Harga", numeric: true },
                      { key: "tax", label: "Pajak", muted: true },
                      { key: "total", label: "Jumlah", numeric: true, strong: true },
                      { key: "act", label: "", width: 40, render: () => <IconButton icon="delete" label="Hapus baris" size="sm" tone="danger" /> },
                    ]}
                    summary={{ item: "4 baris", total: "Rp 482.650.000" }} />
                </div>
              </FormSection>
            </Surface>
          )}
          {tab === "docs" && (
            <Surface padding={6}>
              <Alert tone="warning" title="Lampiran belum lengkap" style={{ marginBottom: 16 }}>Faktur pajak belum diunggah. Dokumen tidak dapat disetujui sebelum lampiran lengkap.</Alert>
              {[["Invoice supplier.pdf", "pdf", "412 KB", true], ["Surat jalan DO-4471.pdf", "pdf", "1,2 MB", true], ["Faktur pajak", "fileCheck", "Belum diunggah", false]].map(([name, icon, meta, ok]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", marginBottom: 8, borderRadius: "var(--radius-control)", border: "1px solid " + (ok ? "var(--border)" : "hsl(var(--warning-hsl) / .35)"), background: ok ? "var(--card)" : "hsl(var(--warning-hsl) / .06)" }}>
                  <Icon name={icon} size={20} style={{ color: ok ? "var(--danger)" : "var(--warning)" }} />
                  <div style={{ minWidth: 0, flex: 1 }}><div style={{ fontSize: "var(--text-base)", fontWeight: 500 }}>{name}</div><div style={{ marginTop: 2, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{meta}</div></div>
                  {ok ? <IconButton icon="download" label="Unduh" variant="outline" size="sm" /> : <Button variant="outline" size="sm" icon="upload">Unggah</Button>}
                </div>
              ))}
            </Surface>
          )}
          {tab === "audit" && (
            <Surface padding={6}>
              <AuditTimeline entries={[
                { action: "Dibuat", at: "22 Agu 2026 · 09:12", actor: "Dewi Lestari", role: "Purchasing", state: "draft", icon: "add" },
                { action: "Diajukan untuk verifikasi", at: "22 Agu 2026 · 16:40", actor: "Dewi Lestari", role: "Purchasing", state: "submitted", icon: "submit" },
                { action: "Diminta revisi", at: "23 Agu 2026 · 10:05", actor: "Budi Santoso", role: "Finance", state: "revised", icon: "edit", note: "Lampiran surat jalan belum sesuai nomor DO." },
                { action: "Diajukan ulang", at: "24 Agu 2026 · 08:22", actor: "Dewi Lestari", role: "Purchasing", state: "submitted", icon: "submit" },
                { action: "Menunggu verifikasi Finance", at: "24 Agu 2026 · 08:22", actor: "Sistem", state: "in-review", icon: "pending" },
              ]} />
            </Surface>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Ringkasan</CardTitle></CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              <KeyValueList items={[
                { label: "Subtotal", value: "Rp 434.820.721", numeric: true },
                { label: "PPN 11%", value: "Rp 47.829.279", numeric: true },
                { label: "Total", value: "Rp 482.650.000", numeric: true, strong: true },
                { label: "Nilai PO", value: "Rp 482.650.000", numeric: true },
                { label: "Selisih", value: "Rp 0", numeric: true },
              ]} />
              <Surface tone="green" padding={3} style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="success" size={16} style={{ color: "var(--success)" }} />
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--tint-green-foreground)" }}>Rekonsiliasi PO seimbang</span>
              </Surface>
            </CardContent>
          </Card>
          <RecordSummary recordId="Supplier" title="CV Sumber Pakan Jaya" tone="accent" columns={1}
            fields={[{ label: "NPWP", value: "01.234.567.8-901.000" }, { label: "Termin", value: "Net 30 hari" }, { label: "Outstanding", value: "Rp 794.650.000", numeric: true }, { label: "Kontak", value: "Pak Hendra · 0812-3456-7890" }]} />
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Berikutnya</CardTitle></CardHeader>
            <CardContent style={{ paddingTop: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-base)" }}><Badge variant="info" icon="pending">Verifikasi</Badge> Finance · Budi Santoso</div>
              <p style={{ margin: 0, fontSize: "var(--text-xs)", lineHeight: "1.05rem", color: "var(--muted-foreground)" }}>Dokumen akan diteruskan ke persetujuan Manager setelah verifikasi Finance selesai.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <ActionFooter style={{ marginTop: 24, marginLeft: -32, marginRight: -32, paddingLeft: 32, paddingRight: 32 }}
        hint="Perubahan terakhir disimpan 14:32"
        tertiary={<Button variant="ghost" size="sm" icon="delete" onClick={() => setConfirm(true)}>Hapus draft</Button>}
        secondary={<Button variant="outline">Simpan draft</Button>}
        primary={<Button icon="submit">Ajukan untuk verifikasi</Button>} />
      {confirm && (
        <Modal open onClose={() => setConfirm(false)} icon="delete" tone="danger" size="sm"
          title="Hapus purchase invoice?" description="Dokumen PI-2026-00841 dan 4 baris detailnya akan dihapus permanen. Riwayat persetujuan tetap tersimpan di audit trail."
          footer={<><Button variant="outline" onClick={() => setConfirm(false)}>Batal</Button><Button variant="destructive" icon="delete" onClick={() => setConfirm(false)}>Hapus dokumen</Button></>} />
      )}
    </>
  );
}
Object.assign(window, { TransactionPage });
