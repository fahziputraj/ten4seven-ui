import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Canonical record lifecycle. Colour is fixed by state — never chosen for variety. */
export const statusMap = Object.freeze({
  draft:      { label: "Draft",       tone: "neutral",  icon: "note" },
  pending:    { label: "Pending",     tone: "progress", icon: "pending" },
  submitted:  { label: "Submitted",   tone: "progress", icon: "submit" },
  "in-review":{ label: "In review",   tone: "review",   icon: "search" },
  verified:   { label: "Verified",    tone: "approved", icon: "verified" },
  approved:   { label: "Approved",    tone: "approved", icon: "approve" },
  rejected:   { label: "Rejected",    tone: "blocked",  icon: "reject" },
  revised:    { label: "Revised",     tone: "progress", icon: "edit" },
  completed:  { label: "Completed",   tone: "approved", icon: "check" },
  closed:     { label: "Closed",      tone: "neutral",  icon: "archive" },
  cancelled:  { label: "Cancelled",   tone: "neutral",  icon: "cancel" },
  overdue:    { label: "Overdue",     tone: "blocked",  icon: "clock" },
  blocked:    { label: "Blocked",     tone: "blocked",  icon: "blocked" },
  failed:     { label: "Failed",      tone: "blocked",  icon: "error" },
  inactive:   { label: "Inactive",    tone: "neutral",  icon: "inactive" },
  archived:   { label: "Archived",    tone: "neutral",  icon: "archive" },
});

const toneColor = {
  neutral: "var(--state-neutral)", progress: "var(--state-progress)",
  review: "var(--state-review)", approved: "var(--state-approved)", blocked: "var(--state-blocked)",
};
const toneHsl = {
  neutral: "var(--state-neutral-hsl)", progress: "var(--state-progress-hsl)",
  review: "var(--state-review-hsl)", approved: "var(--state-approved-hsl)", blocked: "var(--state-blocked-hsl)",
};

export function StatusChip({ status = "draft", label, icon = true, size = "md", style, ...rest }) {
  const entry = statusMap[status] || statusMap.draft;
  const c = toneColor[entry.tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.375rem", width: "fit-content",
      borderRadius: "var(--radius-full)", padding: size === "sm" ? "0.125rem 0.5rem" : "0.25rem 0.625rem",
      fontFamily: "var(--font-body)", fontSize: size === "sm" ? "var(--text-xs)" : "var(--text-sm)",
      fontWeight: "var(--weight-semibold)", lineHeight: 1.3, whiteSpace: "nowrap",
      background: "hsl(" + toneHsl[entry.tone] + " / .1)", color: c, ...style,
    }} {...rest}>
      {icon ? <Icon name={entry.icon} size={size === "sm" ? 11 : 13} />
        : <span style={{ height: 6, width: 6, borderRadius: "var(--radius-full)", background: "currentColor", flex: "none" }} />}
      {label || entry.label}
    </span>
  );
}
