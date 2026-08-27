const { PageHeader, FilterToolbar, Tabs, DataTable, StatusChip, Avatar, Badge, Button, IconButton, RecordSummary, ApprovalPanel, AuditTimeline, Surface, Card, CardHeader, CardTitle, CardContent, KPICluster, Icon, Toast } = window.AAPMDesignSystem_07e1a3;

function ApprovalQueuePage() {
  const [sel, setSel] = React.useState("PI-2026-00841");
  const [note, setNote] = React.useState("");
  const [toast, setToast] = React.useState(null);
  const [q, setQ] = React.useState("");
  const queue = window.ErpData.queue.filter((r) => (r.id + r.entity).toLowerCase().includes(q.toLowerCase()));
  const active = window.ErpData.queue.find((r) => r.id === sel) || window.ErpData.queue[0];
  const decide = (label) => { setToast(label); setNote(""); setTimeout(() => setToast(null), 4000); };
  return (
    <>
      <PageHeader overline="Persetujuan · Finance" title="Approval Queue"
        description="Dokumen yang menunggu keputusan Anda, diurutkan dari yang paling lama tertahan."
        actions={<><Button variant="outline" size="sm" icon="export">Ekspor</Button><Button variant="outline" size="sm" icon="settings">Aturan delegasi</Button></>}
        meta={<><Badge variant="warning" icon="clock">2 dokumen tertahan &gt; 2 hari</Badge><span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Diperbarui 14:32 WIB</span></>}
        style={{ marginBottom: 20 }} />
      <KPICluster compact items={[
        { icon: "pending", label: "Menunggu keputusan", value: "5", unit: "dok", tone: "orange", accent: "orange", caption: "Semua modul" },
        { icon: "approve", label: "Disetujui minggu ini", value: "38", delta: "+6", direction: "up", tone: "green", caption: "vs minggu lalu" },
        { icon: "clock", label: "Rata-rata waktu keputusan", value: "9,4", unit: "jam", delta: "-1,2 jam", direction: "up", tone: "blue", accent: "blue" },
        { icon: "wallet", label: "Nilai tertahan", value: "Rp 1,81 M", tone: "slate", accent: "none", caption: "5 dokumen" },
      ]} style={{ marginBottom: 20 }} />
      <Tabs value="menunggu" onChange={() => {}} style={{ marginBottom: 16 }} items={[
        { value: "menunggu", label: "Menunggu saya", count: 5 }, { value: "delegasi", label: "Didelegasikan", count: 2 },
        { value: "riwayat", label: "Riwayat keputusan" }]} />
      <FilterToolbar searchValue={q} onSearchChange={setQ} searchPlaceholder="Cari nomor dokumen, entitas, atau PIC..."
        applied={[{ key: "stage", label: "Tahap: Finance" }]} onRemoveFilter={() => {}} onClearAll={() => {}} style={{ marginBottom: 20 }} />
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1fr) minmax(380px,0.85fr)", alignItems: "start" }}>
        <DataTable rows={queue} onRowClick={(r) => setSel(r.id)} selectedIds={[sel]} getRowId={(r) => r.id}
          sort={{ key: "age", dir: "desc" }} onSort={() => {}}
          columns={[
            { key: "id", label: "Dokumen", strong: true, render: (r) => (
              <span><span style={{ display: "block", fontWeight: 600 }}>{r.id}</span><span style={{ display: "block", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{r.type}</span></span>) },
            { key: "entity", label: "Entitas", wrap: true },
            { key: "amount", label: "Nilai", numeric: true },
            { key: "age", label: "Tertahan", numeric: true, render: (r) => <span style={{ fontWeight: r.risk === "high" ? 600 : 400, color: r.risk === "high" ? "var(--danger)" : "var(--muted-foreground)" }}>{r.age}</span> },
            { key: "owner", label: "PIC", render: (r) => <Avatar name={r.owner} size="xs" /> },
            { key: "stage", label: "Tahap", render: (r) => <StatusChip status="in-review" label={r.stage} size="sm" icon={false} /> },
          ]} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RecordSummary recordId={active.id} title={active.entity} status="in-review" tone="accent" columns={1}
            fields={[{ label: "Jenis dokumen", value: active.type }, { label: "Nilai", value: active.amount, numeric: true },
              { label: "Diajukan oleh", value: active.owner }, { label: "Tertahan", value: active.age, numeric: true },
              { label: "Tahap saat ini", value: active.stage }]}
            actions={<Button variant="outline" size="sm" icon="externalLink">Buka dokumen</Button>} />
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Bukti &amp; riwayat</CardTitle></CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              <AuditTimeline dense entries={[
                { action: "Diajukan untuk verifikasi", at: "22 Agu · 16:40", actor: active.owner, state: "submitted", icon: "submit" },
                { action: "Diminta revisi", at: "23 Agu · 10:05", actor: "Budi Santoso", role: "Finance", state: "revised", icon: "edit", note: "Lampiran surat jalan belum sesuai nomor DO." },
                { action: "Diajukan ulang", at: "24 Agu · 08:22", actor: active.owner, state: "submitted", icon: "submit" },
              ]} />
            </CardContent>
          </Card>
          <ApprovalPanel description="Periksa kelengkapan dokumen dan rekonsiliasi nilai sebelum menyetujui."
            checks={[
              { state: "pass", label: "Nilai dokumen sesuai PO", detail: "Selisih Rp 0" },
              { state: "pass", label: "Supplier aktif dan tidak diblokir", detail: "Outstanding Rp 794.650.000" },
              { state: "warn", label: "Surat jalan discan sebagian", detail: "2 dari 3 lampiran" },
              { state: "fail", label: "Faktur pajak belum diunggah" },
            ]}
            noteValue={note} onNoteChange={(e) => setNote(e.target.value)}
            onApprove={() => decide("Dokumen disetujui")} onRevise={() => decide("Revisi diminta")} onReject={() => decide("Dokumen ditolak")} />
        </div>
      </div>
      {toast && (
        <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 60 }}>
          <Toast tone={toast === "Dokumen ditolak" ? "danger" : "success"} title={toast} description={active.id + " diteruskan ke " + active.owner + "."} onClose={() => setToast(null)} />
        </div>
      )}
    </>
  );
}
Object.assign(window, { ApprovalQueuePage });
