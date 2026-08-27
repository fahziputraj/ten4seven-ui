const { PageHeader, Badge, Button, Icon, IconTile, Progress, Surface, EmptyState } = window.AAPMDesignSystem_07e1a3;

const stateMeta = {
  completed: { label: "Selesai", icon: "checkRead", chip: { background: "hsl(var(--success-hsl) / .1)", color: "var(--success)" } },
  current: { label: "Lanjutkan", icon: "play", chip: { background: "var(--tint-orange)", color: "var(--tint-orange-foreground)" } },
  available: { label: "Tersedia", icon: "unlock", chip: { background: "var(--tint-blue)", color: "var(--tint-blue-foreground)" } },
  locked: { label: "Terkunci", icon: "lock", chip: { background: "var(--muted)", color: "var(--muted-foreground)" } },
};

function ModuleTile({ module, onOpen }) {
  const [hover, setHover] = React.useState(false);
  const meta = stateMeta[module.state];
  const isCurrent = module.state === "current";
  const locked = module.state === "locked";
  const badgeBg = module.state === "completed" ? { background: "var(--tint-green)", color: "var(--brand-green)" }
    : isCurrent ? { background: "var(--brand-orange)", color: "#fff" }
    : module.state === "available" ? { background: "var(--tint-blue)", color: "var(--tint-blue-foreground)" }
    : { background: "var(--muted)", color: "var(--muted-foreground)" };
  return (
    <div onClick={locked ? undefined : onOpen} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", overflow: "hidden", minWidth: 0, padding: 16, borderRadius: "var(--radius-control)",
        cursor: locked ? "not-allowed" : "pointer",
        border: "1px solid " + (isCurrent ? "hsl(var(--brand-orange-hsl) / .45)" : locked ? "hsl(var(--border-hsl) / .75)" : module.state === "available" ? "var(--tint-blue-border)" : "var(--border)"),
        background: isCurrent ? "var(--tint-orange)" : locked ? "hsl(var(--surface-subtle-hsl) / .65)" : "var(--background)",
        boxShadow: isCurrent ? "0 10px 30px hsl(var(--brand-orange-hsl) / .1)" : hover && !locked ? "var(--card-shadow-hover)" : "none",
        transform: hover && !locked ? "translateY(-2px)" : "none",
        transition: "all var(--duration-normal) var(--ease-out)" }}>
      {isCurrent && <span style={{ position: "absolute", inset: "0 auto 0 0", width: 4, background: "var(--brand-orange)" }} />}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
        <span style={{ display: "inline-flex", height: 40, width: 40, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: 12,
          fontSize: "var(--text-base)", fontWeight: 600, fontVariantNumeric: "tabular-nums", ...badgeBg }}>
          {module.state === "completed" ? <Icon name="checkRead" size={20} /> : locked ? <Icon name="lock" size={16} /> : String(module.n).padStart(2, "0")}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "var(--text-base)", fontWeight: 600, color: locked ? "var(--muted-foreground)" : "var(--foreground)" }}>{module.title}</div>
              <div style={{ marginTop: 3, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Level {module.level} · {module.category}</div>
            </div>
            <span style={{ display: "inline-flex", flex: "none", alignItems: "center", gap: 4, borderRadius: "var(--radius-full)", padding: "3px 8px",
              fontSize: "var(--text-2xs)", fontWeight: 600, ...meta.chip }}>
              <Icon name={meta.icon} size={11} /> {meta.label}
            </span>
          </div>
          {module.score && <div style={{ marginTop: 8, fontSize: "var(--text-xs)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>Skor kuis {module.score}</div>}
        </div>
      </div>
    </div>
  );
}

function LearningPathScreen({ onOpenModule }) {
  const [open, setOpen] = React.useState("foundation");
  const D = window.AcademyData;
  const s = D.stats();
  return (
    <>
      <PageHeader overline="Learning path" title="Jalur pembelajaran"
        description="Kuasai keputusan farm secara bertahap—dari fondasi flock sampai kepemimpinan operasional."
        actions={<Badge variant="soft" icon="modules" style={{ background: "var(--surface-subtle)", color: "var(--muted-foreground)", padding: "8px 12px", fontWeight: 500 }}>22 modul · 14 level</Badge>}
        style={{ marginBottom: 24 }} />
      <section style={{ overflow: "hidden", borderRadius: "var(--card-radius)", border: "1px solid hsl(var(--brand-orange-hsl) / .2)", background: "var(--background)", boxShadow: "var(--shadow-1)", marginBottom: 24 }}>
        <div style={{ height: 4, background: "var(--brand-orange)" }} />
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "0.65fr 1.35fr", alignItems: "center", padding: 20 }}>
          <div>
            <p style={{ margin: 0, fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>Progress keseluruhan</p>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-3xl)", fontWeight: 600, letterSpacing: "var(--tracking-metric)", fontVariantNumeric: "tabular-nums" }}>{s.percent}%</p>
            <p style={{ margin: "4px 0 0", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{s.done} dari {s.total} modul selesai</p>
          </div>
          <div style={{ minWidth: 0, borderRadius: 12, background: "var(--tint-orange)", padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
              <span style={{ display: "inline-flex", height: 36, width: 36, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: 12, background: "var(--brand-orange)", color: "#fff" }}><Icon name="play" size={20} /></span>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "hsl(var(--tint-orange-foreground-hsl) / .75)" }}>Berikutnya untuk Anda</p>
                <p style={{ margin: "4px 0 0", fontSize: "var(--text-base)", fontWeight: 600 }}>{s.current.title}</p>
                <p style={{ margin: "4px 0 0", fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>Modul {s.current.n} · {s.current.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {D.tracks.map((track) => {
          const { mods, done, percent } = D.trackStats(track);
          const isOpen = open === track.key;
          return (
            <section key={track.key} style={{ borderRadius: "var(--card-radius)", border: "1px solid var(--tint-" + track.accent + "-border)", background: "hsl(var(--tint-" + track.accent + "-hsl) / .3)", overflow: "hidden" }}>
              <button type="button" onClick={() => setOpen(isOpen ? null : track.key)}
                style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", textAlign: "left", cursor: "pointer", border: "none", background: "transparent", padding: 18 }}>
                <IconTile icon={track.icon} tone={track.accent} size="lg" />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: "var(--text-2xs)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "var(--tracking-overline)", color: "var(--muted-foreground)" }}>{track.kicker}</div>
                  <div style={{ marginTop: 3, fontSize: "var(--text-xl)", fontWeight: 600, letterSpacing: "var(--tracking-title)" }}>{track.title}</div>
                  <div style={{ marginTop: 4, fontSize: "var(--text-base)", color: "var(--muted-foreground)" }}>{track.description}</div>
                </div>
                <div style={{ flex: "none", width: 132 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-2xs)", fontWeight: 600, color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums", marginBottom: 5 }}>
                    <span>Modul</span><span>{done}/{mods.length}</span>
                  </div>
                  <Progress value={percent} tone={track.accent === "orange" ? "orange" : "green"} size="sm" track="hsl(var(--foreground-hsl) / .08)" />
                </div>
                <Icon name={isOpen ? "collapse" : "expand"} size={18} style={{ color: "var(--muted-foreground)" }} />
              </button>
              {isOpen && (
                mods.length ? (
                  <div style={{ padding: "0 18px 18px", display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                    {mods.map((m) => <ModuleTile key={m.n} module={m} onOpen={onOpenModule} />)}
                  </div>
                ) : (
                  <div style={{ padding: "0 18px 18px" }}>
                    <EmptyState variant="dashed" icon="lock" title="Modul bab ini belum dipublikasikan"
                      description={"Materi Level " + track.levels[0] + "–" + track.levels[track.levels.length - 1] + " akan muncul di sini saat sudah tersedia untuk akun Anda."}
                      style={{ padding: "24px 16px" }} />
                  </div>
                )
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
Object.assign(window, { LearningPathScreen });
