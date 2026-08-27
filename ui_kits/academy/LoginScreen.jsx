const { Button, Input, Label, Alert, Icon } = window.AAPMDesignSystem_07e1a3;

function BrandPanel() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % window.AcademyData.insights.length), 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <aside style={{ position: "relative", overflow: "hidden", background: "linear-gradient(165deg,var(--hero-start),var(--hero-end) 62%,var(--aapm-green-950))" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-photo)" }} />
      <div style={{ position: "absolute", left: "50%", top: "32%", transform: "translate(-50%,-50%)", height: 150, width: 150, borderRadius: "50%", background: "hsl(var(--brand-foreground-hsl) / .5)", filter: "blur(46px)" }} />
      <img src="../../assets/logos/aapm-icon-dark.svg" alt="AAPM"
        style={{ position: "absolute", left: "50%", top: "32%", transform: "translate(-50%,-50%)", height: 104, filter: "drop-shadow(0 6px 20px rgba(0,0,0,.76))" }} />
      <div style={{ position: "absolute", inset: "auto 0 0 0", padding: "0 34px 44px", display: "flex", justifyContent: "center" }}>
        <div key={i} style={{ maxWidth: 520, textAlign: "center", animation: "aapm-rise 1.4s var(--ease-emphasis) both" }}>
          <p style={{ margin: 0, fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontWeight: 500, fontSize: 21, lineHeight: 1.55, color: "hsl(0 0% 100% / .95)", textShadow: "0 3px 24px rgba(0,0,0,.55)" }}>
            &ldquo;{window.AcademyData.insights[i]}&rdquo;
          </p>
          <img src="../../assets/logos/academy-logo-long-dark.svg" alt="AAPM Layer Academy"
            style={{ marginTop: 22, height: 28, opacity: 0.9, filter: "drop-shadow(0 3px 12px rgba(0,0,0,.56))" }} />
        </div>
      </div>
    </aside>
  );
}

function LoginScreen({ onSignIn }) {
  const [email, setEmail] = React.useState("rahmat@aapm.co.id");
  const [password, setPassword] = React.useState("••••••••••");
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Email atau password salah"); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); onSignIn(); }, 700);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "44% 56%", minHeight: 780, background: "var(--background)" }}>
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 64px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <img src="../../assets/logos/aapm-logo-stacked.svg" alt="AAPM" style={{ height: 96, width: "auto", maxWidth: 160, filter: "drop-shadow(0 12px 24px hsl(var(--aapm-green-700-hsl) / .12))" }} />
          </div>
          <h1 style={{ margin: 0, fontSize: "var(--text-4xl)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-display)", color: "var(--foreground)" }}>Sign in</h1>
          <p style={{ margin: "12px 0 0", maxWidth: 360, fontSize: "var(--text-md)", lineHeight: "1.75rem", color: "var(--muted-foreground)" }}>Continue your learning journey.</p>
          {error && <Alert tone="danger" title={error} style={{ marginTop: 24 }} />}
          <form onSubmit={submit} style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label htmlFor="email">Email address</Label>
              <Input id="email" icon="mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ height: "3rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label htmlFor="pw">Password</Label>
              <div style={{ position: "relative" }}>
                <Input id="pw" icon="lock" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: "3rem", paddingRight: 44 }} />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                  style={{ position: "absolute", right: 6, top: 6, height: 36, width: 36, borderRadius: "var(--radius-sm)", border: "none", background: "transparent", color: "var(--muted-foreground)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={show ? "eyeOff" : "eye"} size={17} />
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 4 }}>
                <a href="#" style={{ fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)", color: "var(--brand-green)", textDecoration: "none" }}>Forgot password?</a>
              </div>
            </div>
            <Button type="submit" size="xl" fullWidth loading={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
          </form>
          <div style={{ margin: "28px 0", display: "flex", alignItems: "center", gap: 12, fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>
            <span style={{ height: 1, flex: 1, background: "var(--border)" }} /><span>or continue with</span><span style={{ height: 1, flex: 1, background: "var(--border)" }} />
          </div>
          <Button variant="outline" size="xl" fullWidth style={{ background: "var(--surface-subtle)", boxShadow: "none", fontWeight: "var(--weight-medium)" }}>Continue with Google</Button>
          <p style={{ marginTop: 32, textAlign: "center", fontSize: "var(--text-base)", color: "var(--muted-foreground)" }}>
            New to the Academy? <a href="#" style={{ fontWeight: "var(--weight-semibold)", color: "var(--brand-green)", textDecoration: "none" }}>Create an account</a>
          </p>
        </div>
      </main>
      <BrandPanel />
    </div>
  );
}
Object.assign(window, { LoginScreen });
