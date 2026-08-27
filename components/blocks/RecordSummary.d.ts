/**
 * Context before action: identifies the record and its state before anything asks the user to decide.
 * @startingPoint section="Blocks" subtitle="Record id, title, status and key fields" viewport="700x240"
 */
export interface RecordSummaryProps extends React.HTMLAttributes<HTMLElement> {
  /** Document number as an overline: "PI-2026-00841". */
  recordId?: React.ReactNode;
  /** The human name of the record — supplier, farm, learner, course. */
  title: React.ReactNode;
  /** Canonical lifecycle state, rendered as a StatusChip beside the title. */
  status?: string;
  /** Indonesian override for the chip label. */
  statusLabel?: React.ReactNode;
  /** KeyValueList items — the 4–8 fields a reviewer needs before deciding. */
  fields?: Array<{ label: React.ReactNode; value?: React.ReactNode; numeric?: boolean; strong?: boolean }>;
  columns?: 1 | 2;
  actions?: React.ReactNode;
  /** Slot below the fields, on a subtle bar — totals, attachments count, next approver. */
  footer?: React.ReactNode;
  /** accent drops the shadow and washes the card green — for the record being approved. */
  tone?: "default" | "accent";
}
export declare function RecordSummary(props: RecordSummaryProps): JSX.Element;
