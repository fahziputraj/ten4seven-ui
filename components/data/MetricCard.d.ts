/**
 * One business number with its context. Domain-neutral: no farm, finance or academy logic inside.
 */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** What the number is, sentence case. */
  label: React.ReactNode;
  /** Pre-formatted value — the component never formats. "Rp 482.650.000", "91,8", "3/12". */
  value: React.ReactNode;
  /** Trailing unit: "%", "kg", "butir". */
  unit?: React.ReactNode;
  /** Pre-formatted change, e.g. "+2,4%". Pair with direction. */
  delta?: React.ReactNode;
  direction?: "up" | "down" | "flat";
  /** Third line — comparison basis or period. */
  caption?: React.ReactNode;
  /** Semantic Icon registry key, rendered in an IconTile. */
  icon?: string;
  tone?: "green" | "lime" | "orange" | "blue" | "violet" | "slate";
  /** The 1px top rule. "none" removes it. */
  accent?: "green" | "lime" | "orange" | "blue" | "violet" | "none";
  /** Text chip shown when there is no delta — e.g. "Level 2". */
  status?: React.ReactNode;
  /** Slot for a sparkline, progress bar or bullet chart. */
  visualization?: React.ReactNode;
  compact?: boolean;
}
export declare function MetricCard(props: MetricCardProps): JSX.Element;
