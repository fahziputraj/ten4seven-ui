/** Who did what, when — approval history, verification trail, record lifecycle log. */
export interface AuditEntry {
  /** What happened, sentence case: "Disetujui oleh Finance Manager". */
  action: React.ReactNode;
  /** Pre-formatted timestamp: "24 Agu 2026 · 14:32". */
  at: React.ReactNode;
  actor?: React.ReactNode;
  role?: React.ReactNode;
  /** Free-text comment, shown in a muted panel. */
  note?: React.ReactNode;
  /** Drives the marker colour via the lifecycle map. */
  state?: "draft" | "submitted" | "in-review" | "verified" | "approved" | "revised" | "rejected" | "completed" | "blocked";
  /** Semantic Icon key; defaults to a dot. */
  icon?: string;
}
export interface AuditTimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  /** Newest last — the trail reads downward in time order. */
  entries: AuditEntry[];
  dense?: boolean;
}
export declare function AuditTimeline(props: AuditTimelineProps): JSX.Element;
