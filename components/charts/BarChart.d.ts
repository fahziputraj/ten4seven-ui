/** Categorical comparison over time or across entities. Plain or stacked. */
export interface BarDatum {
  label: React.ReactNode;
  /** Plain mode. */
  value?: number;
  /** Stacked mode — one number per series, in series order. */
  values?: number[];
  tone?: string;
}
export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarDatum[];
  height?: number;
  /** Dashed reference line; bars below it turn terracotta in plain mode. */
  target?: number;
  targetLabel?: string;
  tone?: "green" | "teal" | "orange" | "lime" | "violet";
  stacked?: boolean;
  /** Legend labels for stacked mode, in the same order as `values`. */
  series?: string[];
  /** Formats the on-bar readout. Must produce Indonesian formatting. */
  valueFormat?: (value: number) => string;
  showValues?: boolean;
}
export declare function BarChart(props: BarChartProps): JSX.Element;
