import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import { Textarea } from "../forms/Textarea.jsx";

export function ApprovalPanel({
  title = "Keputusan", description, checks = [], noteValue = "", onNoteChange,
  noteLabel = "Catatan keputusan", notePlaceholder = "Wajib diisi jika menolak atau meminta revisi.",
  onApprove, onReject, onRevise, approveLabel = "Setujui", rejectLabel = "Tolak", reviseLabel = "Minta revisi",
  disabled = false, disabledReason, style, ...rest
}) {
  return (
    <section style={{
      borderRadius: "var(--card-radius)", border: "1px solid var(--surface-border)",
      background: "var(--card)", boxShadow: "var(--card-shadow)", overflow: "hidden", ...style,
    }} {...rest}>
      <div style={{ padding: "var(--space-5) var(--space-5) var(--space-4)" }}>
        <h2 style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
        {description && <p style={{ margin: "5px 0 0", font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{description}</p>}
        {checks.length > 0 && (
          <ul style={{ listStyle: "none", margin: "var(--space-4) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            {checks.map((c, i) => {
              const color = c.state === "pass" ? "var(--success)" : c.state === "fail" ? "var(--danger)" : c.state === "warn" ? "var(--warning)" : "var(--muted-foreground)";
              const icon = c.state === "pass" ? "success" : c.state === "fail" ? "error" : c.state === "warn" ? "warning" : "pending";
              return (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "var(--space-2)",
                  padding: "var(--space-2) var(--space-3)", borderRadius: "var(--radius-control)", background: "var(--surface-muted)",
                }}>
                  <Icon name={icon} size={15} style={{ color, marginTop: 1 }} />
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)" }}>{c.label}</span>
                    {c.detail && <span style={{ display: "block", marginTop: 1, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{c.detail}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <div style={{ marginTop: "var(--space-4)" }}>
          <label style={{ display: "block", font: "var(--type-label)", marginBottom: "var(--space-2)" }}>{noteLabel}</label>
          <Textarea value={noteValue} onChange={onNoteChange} placeholder={notePlaceholder} rows={3} />
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap",
        padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)",
      }}>
        {onReject && <Button variant="destructive" icon="reject" disabled={disabled} onClick={onReject}>{rejectLabel}</Button>}
        {onRevise && <Button variant="outline" icon="edit" disabled={disabled} onClick={onRevise}>{reviseLabel}</Button>}
        <span style={{ flex: 1 }} />
        {disabled && disabledReason && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>
            <Icon name="permission" size={14} /> {disabledReason}
          </span>
        )}
        {onApprove && <Button icon="approve" disabled={disabled} onClick={onApprove}>{approveLabel}</Button>}
      </div>
    </section>
  );
}
