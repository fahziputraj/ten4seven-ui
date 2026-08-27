import React from "react";
import { Icon } from "../core/Icon.jsx";

export function Stepper({ steps = [], current = 0, orientation = "horizontal", style, ...rest }) {
  const vertical = orientation === "vertical";
  return (
    <ol style={{
      listStyle: "none", margin: 0, padding: 0, display: "flex",
      flexDirection: vertical ? "column" : "row", alignItems: vertical ? "stretch" : "flex-start",
      gap: vertical ? "var(--space-4)" : 0, ...style,
    }} {...rest}>
      {steps.map((step, i) => {
        const done = i < current, active = i === current;
        const color = done ? "var(--state-approved)" : active ? "var(--primary)" : "var(--state-neutral)";
        return (
          <li key={i} style={{ display: "flex", flexDirection: vertical ? "row" : "column", gap: vertical ? "var(--space-3)" : 0, flex: vertical ? "none" : 1, minWidth: 0 }}>
            {!vertical && (
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                <Marker done={done} active={active} color={color} index={i} icon={step.icon} />
                {i < steps.length - 1 && <span aria-hidden="true" style={{ flex: 1, height: 2, background: done ? "var(--state-approved)" : "var(--border)", marginLeft: 6 }} />}
              </div>
            )}
            {vertical && <Marker done={done} active={active} color={color} index={i} icon={step.icon} />}
            <div style={{ minWidth: 0, paddingRight: "var(--space-4)", marginTop: vertical ? 2 : "var(--space-3)" }}>
              <div style={{ font: "var(--type-label)", color: active || done ? "var(--foreground)" : "var(--muted-foreground)" }}>{step.label}</div>
              {step.description && <div style={{ marginTop: 2, font: "var(--type-caption)", color: "var(--muted-foreground)" }}>{step.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Marker({ done, active, color, index, icon }) {
  return (
    <span style={{
      height: 28, width: 28, flex: "none", borderRadius: "var(--radius-full)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: done ? "var(--state-approved)" : active ? "var(--primary)" : "var(--surface-muted)",
      color: done || active ? "var(--primary-foreground)" : "var(--muted-foreground)",
      border: "1px solid " + (done || active ? "transparent" : "var(--border)"),
      fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
      fontVariantNumeric: "tabular-nums",
    }}>{done ? <Icon name="check" size={15} /> : icon ? <Icon name={icon} size={14} /> : index + 1}</span>
  );
}
