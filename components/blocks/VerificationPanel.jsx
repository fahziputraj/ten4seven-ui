import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import { Textarea } from "../forms/Textarea.jsx";
import { StatusChip } from "../data/StatusChip.jsx";

const checkMeta = Object.freeze({
  pass: { icon: "success", color: "var(--success)" },
  fail: { icon: "error", color: "var(--danger)" },
  warn: { icon: "warning", color: "var(--warning)" },
  pending: { icon: "pending", color: "var(--muted-foreground)" },
});

export function VerificationPanel({
  title = "Verifikasi",
  description,
  context,
  evidence = [],
  checks = [],
  noteValue = "",
  onNoteChange,
  noteLabel = "Catatan verifikasi",
  notePlaceholder = "Tambahkan catatan untuk reviewer berikutnya.",
  onVerify,
  onReject,
  verifyLabel = "Tandai terverifikasi",
  rejectLabel = "Kembalikan",
  disabled = false,
  disabledReason,
  style,
  ...rest
}) {
  return (
    <section className="aapm-verification-panel" style={{
      borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)",
      background: "var(--card)", boxShadow: "var(--card-shadow)", overflow: "hidden", ...style,
    }} {...rest}>
      <div style={{ padding: "var(--space-5) var(--space-5) var(--space-4)" }}>
        <h2 style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
        {description && <p style={{ margin: "var(--space-1) 0 0", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</p>}

        {context && <div style={{ marginTop: "var(--space-4)", padding: "var(--space-3)", borderRadius: "var(--radius-control)", background: "var(--surface-subtle)" }}>{context}</div>}

        {evidence.length > 0 && (
          <div style={{ marginTop: "var(--space-4)" }}>
            <h3 style={{ margin: 0, font: "var(--type-overline)", color: "var(--muted-foreground)" }}>Bukti yang diperiksa</h3>
            <dl className="aapm-verification-panel__evidence" style={{ margin: 0 }}>
              {evidence.map((item, index) => (
                <div key={item.id ?? index} style={{ minWidth: 0 }}>
                  <dt style={{ font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{item.label}</dt>
                  <dd style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)", margin: "var(--space-1) 0 0", font: "var(--type-label)", color: "var(--foreground)" }}>
                    {item.href ? <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} style={{ color: "var(--primary)", textUnderlineOffset: "0.2em" }}>{item.value ?? "—"}</a> : item.value ?? "—"}
                    {item.status && <StatusChip status={item.status} size="sm" />}
                  </dd>
                  {item.description && <div style={{ marginTop: "var(--space-1)", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{item.description}</div>}
                </div>
              ))}
            </dl>
          </div>
        )}

        {checks.length > 0 && (
          <div style={{ marginTop: "var(--space-5)" }}>
            <h3 style={{ margin: 0, font: "var(--type-overline)", color: "var(--muted-foreground)" }}>Pemeriksaan</h3>
            <ul style={{ display: "grid", gap: "var(--space-2)", margin: "var(--space-3) 0 0", padding: 0, listStyle: "none" }}>
              {checks.map((check, index) => {
                const meta = checkMeta[check.state] || checkMeta.pending;
                return (
                  <li key={check.id ?? index} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)", padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-control)", background: "var(--surface-muted)" }}>
                    <Icon name={check.icon || meta.icon} size={15} color={meta.color} />
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)" }}>{check.label}</span>
                      {check.detail && <span style={{ display: "block", marginTop: "var(--space-1)", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{check.detail}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "var(--space-5)" }}>
          <label style={{ display: "block", marginBottom: "var(--space-2)", font: "var(--type-label)" }}>{noteLabel}</label>
          <Textarea value={noteValue} onChange={onNoteChange} placeholder={notePlaceholder} rows={3} disabled={disabled} />
        </div>
      </div>

      <div className="aapm-verification-panel__footer">
        {onReject && <Button variant="destructive" icon="reject" disabled={disabled} onClick={onReject}>{rejectLabel}</Button>}
        <span style={{ flex: 1 }} />
        {disabled && disabledReason && <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", font: "var(--type-caption)", color: "var(--muted-foreground)" }}><Icon name="permission" size={14} /> {disabledReason}</span>}
        {onVerify && <Button icon="verify" disabled={disabled} onClick={onVerify}>{verifyLabel}</Button>}
      </div>
    </section>
  );
}
