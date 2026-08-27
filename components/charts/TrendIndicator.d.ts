/** Direction + magnitude chip. The standard way period-over-period change is shown. */
export interface TrendIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Number (formatted to Indonesian decimals and suffixed %) or a pre-formatted string. */
  value: number | React.ReactNode;
  /** Overrides the sign-derived direction. */
  direction?: "up" | "down" | "flat";
  /** "inverse" makes DOWN the good outcome — mortality, cost, downtime, overdue. */
  sentiment?: "normal" | "inverse";
  /** Trailing basis, e.g. "vs minggu lalu". */
  caption?: React.ReactNode;
  size?: "sm" | "md";
}
export declare function TrendIndicator(props: TrendIndicatorProps): JSX.Element;
