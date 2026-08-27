import React from "react";

export function Radio({ label, description, checked = false, disabled = false, name, value, onChange, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <label
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: "var(--space-3)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1, padding: "var(--space-3)", borderRadius: "var(--radius-control)",
        border: "1px solid " + (checked ? "hsl(var(--brand-green-hsl) / .5)" : "var(--border)"),
        background: checked ? "hsl(var(--brand-green-hsl) / .05)" : hover && !disabled ? "var(--surface-hover)" : "var(--card)",
        transition: "background-color var(--duration-fast),border-color var(--duration-fast)", ...style,
      }}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} {...rest} />
      <span aria-hidden="true" style={{
        marginTop: 2, height: 18, width: 18, flex: "none", borderRadius: "var(--radius-full)",
        border: "1.5px solid " + (checked ? "var(--primary)" : "var(--input)"),
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        transition: "border-color var(--duration-fast)",
      }}>
        {checked && <span style={{ height: 8, width: 8, borderRadius: "var(--radius-full)", background: "var(--primary)" }} />}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", font: "var(--type-label)", color: "var(--foreground)" }}>{label}</span>
        {description && <span style={{ display: "block", marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</span>}
      </span>
    </label>
  );
}
