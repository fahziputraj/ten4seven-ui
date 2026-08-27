/** A labelled number with no card around it — for inside a header, footer, summary strip or popover. */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase-tracked automatically. */
  label: React.ReactNode;
  /** Pre-formatted. The component never formats. */
  value: React.ReactNode;
  unit?: React.ReactNode;
  caption?: React.ReactNode;
  /** Slot for a TrendIndicator. */
  trend?: React.ReactNode;
  align?: "left" | "center" | "right";
  /** md 20px value · lg 30px for a hero figure. */
  size?: "md" | "lg";
  /** Left rule — use on all but the first in a horizontal strip. */
  divider?: boolean;
}
export declare function Stat(props: StatProps): JSX.Element;
