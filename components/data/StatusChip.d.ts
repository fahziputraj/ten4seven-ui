/**
 * The record-lifecycle chip. One component for all 16 canonical states — never ApprovedBadge / RejectedBadge / VerifiedBadge.
 */
export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Canonical lifecycle state. Colour is derived, not passed. */
  status?: "draft" | "pending" | "submitted" | "in-review" | "verified" | "approved" | "rejected" | "revised"
    | "completed" | "closed" | "cancelled" | "overdue" | "blocked" | "failed" | "inactive" | "archived";
  /** Override the English label with the Indonesian equivalent where the surface is Indonesian. */
  label?: React.ReactNode;
  /** false swaps the glyph for a dot — use in dense tables. */
  icon?: boolean;
  size?: "sm" | "md";
}
export declare function StatusChip(props: StatusChipProps): JSX.Element;
