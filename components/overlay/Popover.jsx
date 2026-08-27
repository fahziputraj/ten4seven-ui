import React from "react";

export function Popover({ trigger, children, align = "start", width = 260, open: controlled, onOpenChange, style, ...rest }) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const open = controlled != null ? controlled : uncontrolled;
  const set = (v) => { onOpenChange ? onOpenChange(v) : setUncontrolled(v); };
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) set(false); };
    const onKey = (e) => { if (e.key === "Escape") set(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  });
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex", ...style }} {...rest}>
      <span onClick={() => set(!open)} style={{ display: "inline-flex" }}>{trigger}</span>
      {open && (
        <div role="menu" style={{
          position: "absolute", top: "calc(100% + 6px)", zIndex: 40, width,
          [align === "end" ? "right" : "left"]: 0,
          borderRadius: "var(--radius-panel)", border: "1px solid var(--surface-border)",
          background: "var(--popover)", boxShadow: "var(--shadow-2)", padding: "var(--space-2)",
          font: "var(--type-body)", color: "var(--popover-foreground)",
          animation: "aapm-rise var(--duration-normal) var(--ease-out) both",
        }}>{children}</div>
      )}
    </span>
  );
}

export function PopoverItem({ icon, children, tone, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" role="menuitem" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "var(--space-2)", width: "100%", textAlign: "left",
        border: "none", cursor: "pointer", padding: "0.4375rem var(--space-3)", borderRadius: "var(--radius-sm)",
        background: hover ? "var(--surface-hover)" : "transparent",
        color: tone === "danger" ? "var(--danger)" : "var(--foreground)",
        fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)",
        transition: "background-color var(--duration-fast)", ...style,
      }} {...rest}>{children}</button>
  );
}
