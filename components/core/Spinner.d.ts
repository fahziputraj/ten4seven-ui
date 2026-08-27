/** Indeterminate wait for an action already in progress. Never for first page load — that is Skeleton. */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  tone?: "primary" | "muted" | "inverse" | "danger";
  /** Indonesian wait reason. Without it an sr-only "Memuat" is used. */
  label?: React.ReactNode;
  thickness?: number;
}
export declare function Spinner(props: SpinnerProps): JSX.Element;
