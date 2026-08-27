/**
 * Determinate progress track. Pill-shaped, 6/8/10px.
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  /** lime = learning progress (the Academy default) · green = completion · success/warning/danger = vs-target. */
  tone?: "lime" | "green" | "success" | "warning" | "danger" | "orange";
  size?: "sm" | "md" | "lg";
  /** Track colour token. Use "hsl(var(--foreground-hsl) / .1)" on tinted surfaces. */
  track?: string;
  /** Accessible name — required when no adjacent visible label states the metric. */
  label?: string;
}
export declare function Progress(props: ProgressProps): JSX.Element;
