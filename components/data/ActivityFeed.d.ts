/**
 * Cross-record activity stream for a dashboard — many actors, many documents, reverse chronological.
 * Distinct from AuditTimeline, which is the lifecycle of ONE record.
 */
export interface ActivityEntry {
  /** Person's name. Renders their initial avatar and bolds the name. Omit for a system event. */
  actor?: string;
  /** The verb phrase, Indonesian, lower case: "menyetujui", "mengirim laporan harian". */
  action: React.ReactNode;
  /** Document or entity acted on — bolded after the action. */
  target?: React.ReactNode;
  /** Pre-formatted time: "14:32". */
  at: React.ReactNode;
  /** Module name shown after the time. */
  module?: React.ReactNode;
  /** Right-aligned value, coloured by tone — an amount, a delta, a count. */
  meta?: React.ReactNode;
  tone?: "neutral" | "progress" | "review" | "approved" | "blocked" | "ai";
  /** Semantic Icon key for system events (no actor). */
  icon?: string;
  /** Day bucket heading, e.g. "Hari ini", "Kemarin", "23 Agustus". */
  day?: string;
  /** Green wash — marks an entry that concerns the current user. */
  highlight?: boolean;
}
export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Newest first — the opposite of AuditTimeline. */
  entries: ActivityEntry[];
  /** Buckets entries under their `day` heading. */
  groupByDay?: boolean;
  dense?: boolean;
  emptyLabel?: React.ReactNode;
}
export declare function ActivityFeed(props: ActivityFeedProps): JSX.Element;
