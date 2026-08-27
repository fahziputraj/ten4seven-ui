const { Breadcrumb, PageHeader, Button, Badge, Icon, IconTile, Progress, Surface, Card, CardHeader, CardTitle, CardContent, Tabs, Alert, Stepper, KeyValueList, Radio } = window.AAPMDesignSystem_07e1a3;

function ModuleDetailScreen({ onBack }) {
  const [tab, setTab] = React.useState("materi");
  const [answer, setAnswer] = React.useState(null);
  const lessons = window.AcademyData.lessons;
  return (
    <>
      <Breadcrumb items={[{ label: "Learning Path", href: "#" }, { label: "Level 3 · Layer Management", href: "#" }, { label: "Modul 5" }]} style={{ marginBottom: 12 }} />
      <PageHeader overline="Modul 05 · Layer Management" title="Transisi rearing ke layer"
        description="Kenali indikator kesiapan flock, atur perubahan pakan dan pencahayaan, lalu pantau minggu pertama bertelur."
        actions={<><Button variant="ghost" size="sm" icon="back" onClick={onBack}>Kembali</Button><Button size="sm" iconEnd="arrowRight">Lanjutkan lesson</Button></>}
        meta={<><Badge variant="orange" icon="play">Sedang berjalan</Badge><span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>2 dari 5 lesson selesai · terakhir dibuka 23 Agu 2026</span></>}
        style={{ marginBottom: 24 }} />
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1.45fr) minmax(300px,0.75fr)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Tabs value={tab} onChange={setTab} items={[{ value: "materi", label: "Materi" }, { value: "kuis", label: "Kuis", count: 10 }, { value: "catatan", label: "Catatan" }]} />
          {tab === "materi" && (
            <>
              <Surface padding={6}>
                <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--brand-green)" }}>Lesson 03</div>
                <h2 style={{ margin: "8px 0 0", fontSize: "var(--text-xl)", fontWeight: 600, letterSpacing: "var(--tracking-title)" }}>Perubahan pakan dan pencahayaan</h2>
                <p style={{ margin: "12px 0 0", fontSize: "var(--text-md)", lineHeight: "var(--leading-md)", color: "var(--foreground)", maxWidth: "62ch" }}>
                  Transisi pakan dari grower ke pre-layer dilakukan bertahap agar konsumsi kalsium naik tanpa menekan intake. Program pencahayaan ditambah 30 menit per minggu sampai mencapai target 16 jam, dan setiap perubahan dicatat pada log kandang.
                </p>
                <Alert tone="brand" icon="note" title="Catatan operasional" style={{ marginTop: 20 }}>
                  Jangan menaikkan pencahayaan dan mengganti pakan pada hari yang sama. Beri jeda minimal tiga hari agar sinyal penyebab mudah dibaca.
                </Alert>
                <div style={{ marginTop: 20, display: "flex", gap: 16, alignItems: "center", padding: 16, borderRadius: "var(--radius-panel)", background: "var(--surface-muted)" }}>
                  <img src="../../assets/illustrations/feed-dispenser.png" alt="" style={{ height: 88 }} />
                  <div>
                    <div style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>Jadwal transisi pakan</div>
                    <KeyValueList dense style={{ marginTop: 8 }} items={[
                      { label: "Minggu 16", value: "Grower 100%" },
                      { label: "Minggu 17", value: "Grower 60% · Pre-layer 40%" },
                      { label: "Minggu 18", value: "Pre-layer 100%" },
                    ]} />
                  </div>
                </div>
              </Surface>
              <Surface padding={6}>
                <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)", marginBottom: 12 }}>Cek pemahaman</div>
                <div style={{ fontSize: "var(--text-md)", fontWeight: 500, marginBottom: 12 }}>Apa risiko utama menaikkan pencahayaan terlalu cepat pada minggu 17?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[["a", "Bobot badan turun karena intake naik", "Intake yang naik tidak menurunkan bobot."],
                    ["b", "Ayam bertelur terlalu dini dengan telur kecil", "Produksi dimulai sebelum bobot target tercapai."],
                    ["c", "Konsumsi air berhenti meningkat", "Konsumsi air mengikuti suhu, bukan pencahayaan."]].map(([v, label, desc]) => (
                    <Radio key={v} name="q" value={v} checked={answer === v} onChange={() => setAnswer(v)} label={label} description={desc} />
                  ))}
                </div>
                <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
                  <Button size="sm" disabled={!answer}>Periksa jawaban</Button>
                  {answer === "b" && <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--success)" }}><Icon name="success" size={14} /> Benar</span>}
                  {answer && answer !== "b" && <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--danger)" }}><Icon name="error" size={14} /> Belum tepat</span>}
                </div>
              </Surface>
            </>
          )}
          {tab === "kuis" && (
            <Surface padding={6}>
              <Stepper current={1} steps={[{ label: "Materi", description: "5 lesson" }, { label: "Kuis modul", description: "10 pertanyaan" }, { label: "Sertifikasi", description: "Tier 2" }]} />
              <Alert tone="info" title="Kuis terbuka setelah semua lesson selesai" style={{ marginTop: 20 }}>Selesaikan tiga lesson yang tersisa untuk membuka kuis modul ini.</Alert>
            </Surface>
          )}
          {tab === "catatan" && (
            <Surface padding={6}>
              <div style={{ fontSize: "var(--text-base)", fontWeight: 600, marginBottom: 8 }}>Catatan Anda</div>
              <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "1.35rem", color: "var(--muted-foreground)" }}>Belum ada catatan pada modul ini. Catatan tersimpan otomatis dan hanya terlihat oleh Anda.</p>
            </Surface>
          )}
        </div>
        <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Daftar lesson</CardTitle></CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 0 }}>
              {lessons.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: "var(--radius-control)",
                  border: "1px solid " + (l.current ? "hsl(var(--brand-orange-hsl) / .45)" : "transparent"),
                  background: l.current ? "var(--tint-orange)" : l.done ? "transparent" : "transparent" }}>
                  <span style={{ display: "inline-flex", height: 24, width: 24, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: "50%",
                    background: l.done ? "var(--tint-green)" : l.current ? "var(--brand-orange)" : "var(--muted)",
                    color: l.done ? "var(--brand-green)" : l.current ? "#fff" : "var(--muted-foreground)", fontSize: "var(--text-2xs)", fontWeight: 600 }}>
                    {l.done ? <Icon name="check" size={13} /> : i + 1}
                  </span>
                  <span style={{ minWidth: 0, flex: 1, fontSize: "var(--text-xs)", fontWeight: l.current ? 600 : 400, color: l.done ? "var(--muted-foreground)" : "var(--foreground)" }}>{l.title}</span>
                </div>
              ))}
              <Progress value={40} tone="lime" size="sm" track="hsl(var(--foreground-hsl) / .08)" style={{ marginTop: 8 }} />
              <div style={{ marginTop: 6, fontSize: "var(--text-2xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>2 dari 5 lesson selesai · 40%</div>
            </CardContent>
          </Card>
          <Surface tone="blue" padding={5}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <IconTile icon="certificate" tone="blue" size="sm" />
              <div>
                <div style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>Tier 2 · Layer Farm Operator</div>
                <div style={{ marginTop: 4, fontSize: "var(--text-xs)", lineHeight: "1.05rem", color: "var(--muted-foreground)" }}>Modul ini termasuk syarat sertifikasi Layer Farm Operator.</div>
              </div>
            </div>
          </Surface>
        </aside>
      </div>
    </>
  );
}
Object.assign(window, { ModuleDetailScreen });
