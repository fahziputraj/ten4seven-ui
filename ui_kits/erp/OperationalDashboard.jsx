const { PageHeader, KPICluster, Surface, Card, CardHeader, CardTitle, CardContent, Button, Badge, Icon, IconTile, Progress, DataTable, StatusChip, Tabs, Alert, AuditTimeline } = window.AAPMDesignSystem_07e1a3;

function ExceptionPanel({ onOpenList }) {
  return (
    <Card>
      <CardHeader style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
        <CardTitle>Perlu tindakan</CardTitle>
        <Badge variant="warning" icon="warning">4 item</Badge>
      </CardHeader>
      <CardContent style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 0 }}>
        {window.ErpData.exceptions.map((e, i) => (
          <Surface key={i} variant="interactive" padding={3} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <IconTile icon={e.icon} tone={e.tone} size="sm" />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: "var(--text-base)", fontWeight: 500 }}>{e.title}</div>
              <div style={{ marginTop: 2, fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{e.detail}</div>
            </div>
            <Button variant="link" size="sm" iconEnd="arrowRight" onClick={onOpenList}>{e.action}</Button>
          </Surface>
        ))}
      </CardContent>
    </Card>
  );
}

function ProductionChart() {
  const bars = [86, 88, 91, 92, 90, 93, 92, 94, 91, 89, 92, 93];
  const days = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  return (
    <Card>
      <CardHeader style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
        <div><CardTitle>Hen-day production</CardTitle><div style={{ marginTop: 3, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Seluruh kandang · 12 hari terakhir</div></div>
        <Tabs variant="pill" size="sm" value="12d" onChange={() => {}} items={[{ value: "12d", label: "12 hari" }, { value: "30d", label: "30 hari" }]} />
      </CardHeader>
      <CardContent style={{ paddingTop: 0 }}>
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 8, height: 150, paddingTop: 8 }}>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, borderTop: "1px dashed hsl(var(--brand-orange-hsl) / .5)" }}>
            <span style={{ position: "absolute", right: 0, top: -16, fontSize: "var(--text-2xs)", fontWeight: 600, color: "var(--brand-orange)" }}>Target 90%</span>
          </div>
          {bars.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <div style={{ height: (v - 80) * 9 + "px", borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
                background: v >= 90 ? "var(--chart-1)" : "hsl(var(--chart-3-hsl) / .75)" }} />
              <div style={{ marginTop: 6, textAlign: "center", fontSize: "var(--text-2xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{days[i]}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function OperationalDashboard({ onOpenList, onOpenApproval }) {
  return (
    <>
      <PageHeader overline="Operasional · AAPM Blitar" title="Operational Dashboard"
        description="Apa yang perlu ditindaklanjuti hari ini di seluruh kandang, gudang, dan dokumen berjalan."
        actions={<><Button variant="outline" size="sm" icon="export">Ekspor</Button><Button size="sm" icon="add">Catat produksi harian</Button></>}
        meta={<><StatusChip status="verified" label="Data terverifikasi" size="sm" /><span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Diperbarui 24 Agustus 2026 · 14:32 WIB</span></>}
        style={{ marginBottom: 20 }} />
      <Alert tone="warning" title="Data sebagian" style={{ marginBottom: 20 }}>
        Kandang 4 dan Kandang 7 belum mengirim laporan harian. Angka agregat masih dapat berubah setelah data masuk.
      </Alert>
      <KPICluster title="Snapshot hari ini" items={[
        { icon: "egg", label: "Hen-day production", value: "91,8", unit: "%", delta: "+2,4%", direction: "up", caption: "Target 90,0%", visualization: <Progress value={92} tone="lime" size="sm" track="hsl(var(--foreground-hsl) / .08)" /> },
        { icon: "mortality", label: "Mortalitas harian", value: "0,08", unit: "%", delta: "-0,01%", direction: "up", tone: "orange", accent: "orange", caption: "Ambang 0,10%" },
        { icon: "feed", label: "Konsumsi pakan", value: "114", unit: "g/ekor", delta: "+1,8%", direction: "down", tone: "blue", accent: "blue", caption: "Standar 112 g" },
        { icon: "wallet", label: "Penjualan telur", value: "Rp 482,6 jt", delta: "+6,1%", direction: "up", caption: "vs rata-rata 7 hari" },
      ]} style={{ marginBottom: 20 }} />
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1.35fr) minmax(320px,0.85fr)", alignItems: "start", marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <ProductionChart />
          <Card>
            <CardHeader style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
              <div><CardTitle>Performa per kandang</CardTitle><div style={{ marginTop: 3, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Data 24 Agustus 2026</div></div>
              <Button variant="link" size="sm" iconEnd="arrowRight">Lihat semua</Button>
            </CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              <div data-density="compact">
                <DataTable stickyHeader={false} rows={window.ErpData.production} getRowId={(r) => r.house} onRowClick={() => {}}
                  style={{ boxShadow: "none", border: "1px solid var(--border)" }}
                  columns={[
                    { key: "house", label: "Kandang", strong: true },
                    { key: "flock", label: "Flock", muted: true },
                    { key: "population", label: "Populasi", numeric: true },
                    { key: "hd", label: "HD %", numeric: true, sortable: true, render: (r) => <span style={{ fontWeight: 600, color: Number(r.hd.replace(",", ".")) >= 90 ? "var(--success)" : "var(--warning)" }}>{r.hd}</span> },
                    { key: "feed", label: "Pakan g", numeric: true },
                    { key: "mortality", label: "Mort %", numeric: true },
                    { key: "status", label: "Status", render: (r) => <StatusChip status={r.status} size="sm" icon={false} /> },
                  ]}
                  summary={{ house: "4 kandang", population: "93.270", hd: "89,4", feed: "116" }} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <ExceptionPanel onOpenList={onOpenList} />
          <Card>
            <CardHeader style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 12 }}>
              <CardTitle>Menunggu persetujuan Anda</CardTitle>
              <Badge variant="default">5</Badge>
            </CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 0 }}>
              {window.ErpData.queue.slice(0, 3).map((q) => (
                <Surface key={q.id} variant="interactive" padding={3} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "var(--tracking-tight)" }}>{q.id}</div>
                    <div style={{ marginTop: 2, fontSize: "var(--text-base)", fontWeight: 500 }}>{q.entity}</div>
                    <div style={{ marginTop: 2, fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{q.amount} · {q.age}</div>
                  </div>
                  <Icon name="chevronRight" size={16} style={{ color: "var(--muted-foreground)" }} />
                </Surface>
              ))}
              <Button variant="soft" size="sm" fullWidth iconEnd="arrowRight" onClick={onOpenApproval} style={{ marginTop: 4 }}>Buka approval queue</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Aktivitas terakhir</CardTitle></CardHeader>
            <CardContent style={{ paddingTop: 0 }}>
              <AuditTimeline dense entries={[
                { action: "Laporan harian Kandang 2 dikirim", at: "14:12", actor: "Rahmat Hidayat", state: "submitted", icon: "submit" },
                { action: "PI-2026-00840 disetujui", at: "11:48", actor: "Dewi Lestari", role: "Finance", state: "approved", icon: "approve" },
                { action: "SA-2026-00219 diminta revisi", at: "09:20", actor: "Budi Santoso", state: "revised", icon: "edit" },
              ]} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
Object.assign(window, { OperationalDashboard });
