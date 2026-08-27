/**
 * The system-state panel: one component for the nine states every page family has to consider.
 * Replaces per-feature Loading / Empty / Error trios.
 */
export interface StateViewProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: "loading" | "empty" | "no-result" | "error" | "offline" | "timeout" | "partial" | "permission" | "maintenance";
  /** Overrides the preset Indonesian title. */
  title?: React.ReactNode;
  /** Cause plus the way forward. Required for error, permission and partial. */
  description?: React.ReactNode;
  onRetry?: () => void;
  retryLabel?: React.ReactNode;
  /** Extra Buttons beside the retry. */
  action?: React.ReactNode;
  /** loading only: number of placeholder body lines. */
  lines?: number;
}
export declare function StateView(props: StateViewProps): JSX.Element;
