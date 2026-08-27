import React from "react";
import { KeyValueList } from "../data/KeyValueList.jsx";
import { StatusChip } from "../data/StatusChip.jsx";

export function RecordSummary({ recordId, title, status, statusLabel, fields = [], columns = 2, actions, footer, tone = "default", style, ...rest }) {
  return (
    <section style={{
      borderRadius: "var(--card-radius)", border: "1px solid " + (tone === "accent" ? "var(--surface-accent-border)" : "var(--surface-border)"),
      background: tone === "accent" ? "var(--surface-accent)" : "var(--card)",
      boxShadow: tone === "accent" ? "none" : "var(--card-shadow)", overflow: "hidden", ...style,
    }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap", padding: "var(--space-5) var(--space-5) var(--space-4)" }}>
        <div style={{ minWidth: 0 }}>
          {recordId && <div style={{
            font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)",
            letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: 5,
          }}>{recordId}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <h2 style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-xl)", letterSpacing: "var(--tracking-title)" }}>{title}</h2>
            {status && <StatusChip status={status} label={statusLabel} />}
          </div>
        </div>
        {actions && <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>{actions}</div>}
      </div>
      {fields.length > 0 && (
        <div style={{ padding: "0 var(--space-5) var(--space-5)", borderTop: "1px solid var(--border-subtle)", paddingTop: "var(--space-4)" }}>
          <KeyValueList items={fields} columns={columns} dense />
        </div>
      )}
      {footer && <div style={{ padding: "var(--space-4) var(--space-5)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)" }}>{footer}</div>}
    </section>
  );
}
