/**
 * The decision block. Always last on the page — Record context, Evidence, Validation, Notes, then Decision.
 * @startingPoint section="Blocks" subtitle="Validation checks, note, approve / revise / reject" viewport="700x360"
 */
export interface ApprovalCheck {
  label: React.ReactNode;
  /** pass = green, warn = amber, fail = red, pending = grey. */
  state?: "pass" | "warn" | "fail" | "pending";
  detail?: React.ReactNode;
}
export interface ApprovalPanelProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Automated validation results the approver should see before deciding. */
  checks?: ApprovalCheck[];
  noteValue?: string;
  onNoteChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  noteLabel?: React.ReactNode;
  notePlaceholder?: React.ReactNode;
  /** Omit any handler to hide that action — a single-approval flow has no onRevise. */
  onApprove?: () => void;
  onReject?: () => void;
  onRevise?: () => void;
  approveLabel?: React.ReactNode;
  rejectLabel?: React.ReactNode;
  reviseLabel?: React.ReactNode;
  disabled?: boolean;
  /** Required whenever disabled — an unexplained dead approve button is forbidden. */
  disabledReason?: React.ReactNode;
}
export declare function ApprovalPanel(props: ApprovalPanelProps): JSX.Element;
