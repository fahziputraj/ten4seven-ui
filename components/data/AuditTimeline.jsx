import React from "react";
import { Icon } from "../core/Icon.jsx";

const toneFor = {
  draft: "var(--state-neutral)", submitted: "var(--state-progress)", revised: "var(--state-progress)",
  "in-review": "var(--state-review)", verified: "var(--state-approved)", approved: "var(--state-approved)",
  completed: "var(--state-approved)", rejected: "var(--state-blocked)", blocked: "var(--state-blocked)",
};

export function AuditTimeline({ entries = [], dense = false, style, ...rest }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", ...style }} {...rest}>
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        const color = toneFor[e.state] || "var(--state-neutral)";
        return (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr", gap: "var(--space-3)", paddingBottom: last ? 0 : dense ? "var(--space-4)" : "var(--space-5)" }}>
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <span style={{
                position: "relative", zIndex: 1, height: 26, width: 26, borderRadius: "var(--radius-full)",
                display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none",
                background: "hsl(var(--background-hsl) / 1)", border: "1px solid " + color, color,
              }}><Icon name={e.icon || "circle"} size={13} /></span>
              {!last && <span aria-hidden="true" style={{ position: "absolute", top: 26, bottom: dense ? -16 : -20, width: 1, background: "var(--border)" }} />}
            </div>
            <div style={{ minWidth: 0, paddingTop: 2 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "var(--space-2)" }}>
                <span style={{ font: "var(--type-label)", color: "var(--foreground)" }}>{e.action}</span>
                <span style={{ font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{e.at}</span>
              </div>
              {e.actor && <div style={{ marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{e.actor}{e.role ? " · " + e.role : ""}</div>}
              {e.note && <div style={{
                marginTop: "var(--space-2)", padding: "var(--space-3)", borderRadius: "var(--radius-control)",
                background: "var(--surface-muted)", font: "var(--type-body)", fontSize: "var(--text-sm)", color: "var(--foreground)",
              }}>{e.note}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
