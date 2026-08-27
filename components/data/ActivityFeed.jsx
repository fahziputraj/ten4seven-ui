import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Avatar } from "./Avatar.jsx";

const toneColor = {
  neutral: "var(--state-neutral)", progress: "var(--state-progress)", review: "var(--state-review)",
  approved: "var(--state-approved)", blocked: "var(--state-blocked)", ai: "var(--ai)",
};

export function ActivityFeed({ entries = [], groupByDay = true, dense = false, emptyLabel = "Belum ada aktivitas hari ini.", style, ...rest }) {
  if (entries.length === 0) {
    return <div style={{ padding: "var(--space-6)", textAlign: "center", font: "var(--type-body)", color: "var(--muted-foreground)", ...style }}>{emptyLabel}</div>;
  }
  const groups = groupByDay
    ? entries.reduce((acc, e) => { const k = e.day || "Hari ini"; (acc[k] = acc[k] || []).push(e); return acc; }, {})
    : { "": entries };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: dense ? "var(--space-3)" : "var(--space-4)", ...style }} {...rest}>
      {Object.entries(groups).map(([day, list]) => (
        <div key={day}>
          {day && (
            <div style={{ marginBottom: "var(--space-2)", font: "var(--type-caption)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-overline)", textTransform: "uppercase", color: "var(--muted-foreground)" }}>{day}</div>
          )}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: dense ? 2 : 4 }}>
            {list.map((e, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", padding: dense ? "var(--space-2)" : "var(--space-2) var(--space-3)", borderRadius: "var(--radius-control)", background: e.highlight ? "hsl(var(--brand-green-hsl) / .05)" : "transparent" }}>
                {e.actor
                  ? <Avatar name={e.actor} size="sm" tone={e.tone === "blocked" ? "orange" : e.tone === "ai" ? "slate" : "green"} />
                  : <span style={{ display: "inline-flex", height: 28, width: 28, flex: "none", alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-full)", background: "var(--surface-muted)", color: toneColor[e.tone] || "var(--muted-foreground)" }}><Icon name={e.icon || "circle"} size={14} /></span>}
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--text-sm)", lineHeight: "1.15rem", color: "var(--foreground)" }}>
                    {e.actor && <strong style={{ fontWeight: "var(--weight-semibold)" }}>{e.actor} </strong>}
                    {e.action}
                    {e.target && <strong style={{ fontWeight: "var(--weight-semibold)" }}> {e.target}</strong>}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>
                    {e.at}
                    {e.module && <><span>·</span><span>{e.module}</span></>}
                  </span>
                </span>
                {e.meta && <span style={{ flex: "none", font: "var(--type-caption)", fontWeight: "var(--weight-semibold)", color: toneColor[e.tone] || "var(--muted-foreground)", fontVariantNumeric: "tabular-nums" }}>{e.meta}</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
