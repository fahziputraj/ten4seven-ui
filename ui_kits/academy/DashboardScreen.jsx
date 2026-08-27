const { Card, CardHeader, CardTitle, CardContent, Button, Badge, Icon, IconTile, Progress, Surface, MetricCard, KPICluster, Avatar } = window.AAPMDesignSystem_07e1a3;

function DashboardWelcome() {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>Senin, 24 Agustus 2026</div>
      <h1 style={{ margin: "8px 0 0", fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "var(--tracking-title)" }}>Selamat datang kembali, Rahmat</h1>
      <p style={{ margin: "8px 0 0", maxWidth: "60ch", fontSize: "var(--text-base)", lineHeight: "1.3rem", color: "var(--muted-foreground)", textWrap: "pretty" }}>
        Anda berada di Level 3 · Layer Management. Selesaikan lesson berikutnya untuk membuka rekomendasi.
      </p>
    </div>
  );
}

function ContinueLearning({ onOpen }) {
  const [hover, setHover] = React.useState(false);
  const m = window.AcademyData.stats().current;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", overflow: "hidden", borderRadius: "var(--card-radius)", border: "1px solid var(--tint-lime-border)",
        background: "var(--card)", boxShadow: hover ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transform: hover ? "translateY(-2px)" : "none", transition: "all var(--duration-normal) var(--ease-out)", marginBottom: 20 }}>
      <span style={{ position: "absolute", inset: "0 0 auto 0", height: 4, background: "var(--brand-lime)" }} />
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "space-between", padding: 24 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <Badge variant="lime" overline>Lanjutkan belajar</Badge>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>Modul {m.n} · Level {m.level}</span>
          </div>
          <h2 style={{ margin: 0, fontSize: "var(--text-2xl)", fontWeight: 600, letterSpacing: "var(--tracking-title)" }}>{m.title}</h2>
          <p style={{ margin: "8px 0 0", maxWidth: "62ch", fontSize: "var(--text-base)", lineHeight: "1.4rem", color: "var(--muted-foreground)" }}>
            Kenali indikator kesiapan flock, atur perubahan pakan dan pencahayaan, lalu pantau minggu pertama bertelur.
          </p>
          <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <Button iconEnd="arrowRight" onClick={onOpen}>Buka lesson</Button>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
              <Icon name="clock" size={14} /> Fokus berikutnya di roadmap
            </span>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", height: 96, width: 96, flex: "none", alignItems: "center", justifyContent: "center",
          borderRadius: "50%", border: "1px solid hsl(var(--brand-lime-hsl) / .4)", background: "var(--tint-lime)", color: "var(--brand-green)" }}>
          <span style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px solid hsl(var(--brand-green-hsl) / .15)" }} />
          <Icon name="play" size={36} style={{ transform: hover ? "scale(1.1)" : "none", transition: "transform var(--duration-slow) var(--ease-out)" }} />
        </div>
      </div>
    </div>
  );
}

function LearningTracks({ onOpen }) {
  return (
    <section style={{ marginTop: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>Learning tracks</h2>
        <Button variant="link" size="sm" iconEnd="arrowRight" onClick={onOpen}>Buka seluruh roadmap</Button>
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4,1fr)" }}>
        {window.AcademyData.tracks.map((t) => {
          const { done, total, percent } = window.AcademyData.trackStats(t);
          return (
            <Surface key={t.key} variant="interactive" tone={t.accent} padding={4} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconTile icon={t.icon} tone={t.accent} />
                <span style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>{t.kicker}</span>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>{t.title}</div>
                <div style={{ marginTop: 4, fontSize: "var(--text-xs)", lineHeight: "1.05rem", color: "var(--muted-foreground)" }}>{t.description}</div>
              </div>
              <div style={{ marginTop: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-2xs)", fontWeight: 600, color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums", marginBottom: 5 }}>
                  <span>Level {t.levels[0]}–{t.levels[t.levels.length - 1]}</span><span>{done}/{total}</span>
                </div>
                <Progress value={percent} tone={t.accent === "orange" ? "orange" : t.accent === "green" ? "lime" : "green"} size="sm" track="hsl(var(--foreground-hsl) / .08)" />
              </div>
            </Surface>
          );
        })}
      </div>
    </section>
  );
}

function DashboardScreen({ onOpenPath, onOpenModule }) {
  const s = window.AcademyData.stats();
  return (
    <>
      <DashboardWelcome />
      <KPICluster items={[
        { icon: "check", label: "Modul selesai", value: s.done + "/" + s.total, caption: "Learning path", accent: "green", tone: "green" },
        { icon: "kpi", label: "Rata-rata skor kuis", value: "92", unit: "%", delta: "+3%", direction: "up", caption: "4 kuis terakhir", tone: "blue", accent: "blue" },
        { icon: "progress", label: "Level aktif", value: "3", status: "Layer Management", tone: "orange", accent: "orange", caption: "Transisi & produksi" },
        { icon: "certificate", label: "Sertifikasi", value: "1/6", caption: "Foundation selesai", tone: "violet", accent: "violet" },
      ]} style={{ marginBottom: 20 }} />
      <ContinueLearning onOpen={onOpenModule} />
      <LearningTracks onOpen={onOpenPath} />
      <div style={{ marginTop: 28, display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1.4fr) minmax(280px,0.8fr)", alignItems: "start" }}>
        <Card>
          <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Up next</CardTitle></CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 0 }}>
            {window.AcademyData.modules.filter((m) => m.n > s.current.n).slice(0, 3).map((m) => <UpNextRow key={m.n} module={m} onOpen={onOpenModule} />)}
            <Button variant="link" size="sm" icon="course" iconEnd="arrowRight" onClick={onOpenPath} style={{ marginTop: 6 }}>Buka seluruh roadmap</Button>
          </CardContent>
        </Card>
        <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <CardHeader style={{ paddingBottom: 12 }}><CardTitle>Alat bantu farm</CardTitle></CardHeader>
            <CardContent style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, paddingTop: 0 }}>
              {[["calculator", "Kalkulator", "green"], ["kpi", "Farm KPI", "blue"], ["ai", "APPI", "violet"], ["report", "Laporan", "slate"]].map(([icon, label, tone]) => (
                <Surface key={label} variant="interactive" padding={3} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <IconTile icon={icon} tone={tone} size="sm" />
                  <span style={{ fontSize: "var(--text-xs)", fontWeight: 600 }}>{label}</span>
                </Surface>
              ))}
            </CardContent>
          </Card>
          <Surface tone="green" padding={5}>
            <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--tint-green-foreground)" }}>Study note</div>
            <p style={{ margin: "8px 0 0", fontSize: "var(--text-base)", lineHeight: "1.5rem", color: "var(--foreground)" }}>
              Gunakan satu sesi untuk satu keputusan operasional. Catat insight yang bisa Anda bawa kembali ke farm.
            </p>
          </Surface>
          <Surface variant="interactive" padding={4} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img src="../../assets/illustrations/aapm-ai-mascot.png" alt="" style={{ height: 56, width: "auto" }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-base)", fontWeight: 600 }}>Tanya APPI</div>
              <div style={{ marginTop: 3, fontSize: "var(--text-xs)", lineHeight: "1.05rem", color: "var(--muted-foreground)" }}>Asisten AAPM untuk pertanyaan operasional kandang.</div>
            </div>
          </Surface>
        </aside>
      </div>
    </>
  );
}

function UpNextRow({ module, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", cursor: "pointer", padding: 12,
        borderRadius: "var(--radius-control)", border: "1px solid " + (hover ? "hsl(var(--brand-green-hsl) / .35)" : "var(--border)"),
        background: hover ? "hsl(var(--brand-green-hsl) / .05)" : "transparent", transition: "all var(--duration-fast)" }}>
      <span style={{ display: "inline-flex", height: 32, width: 32, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: 10,
        background: "var(--muted)", color: "var(--muted-foreground)", fontSize: "var(--text-xs)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{module.n}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: "block", fontSize: "var(--text-base)", fontWeight: 500, color: "var(--foreground)" }}>{module.title}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
          {module.category} · <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={12} /> Lesson</span>
        </span>
      </span>
      <Icon name="chevronRight" size={16} style={{ color: "var(--muted-foreground)", transform: hover ? "translateX(2px)" : "none", transition: "transform var(--duration-fast)" }} />
    </button>
  );
}
Object.assign(window, { DashboardScreen });
