/** Continuous trend over time, one to five series. */
export interface LineSeries {
  name: React.ReactNode;
  data: number[];
  /** Chart palette slot 1–5. Defaults to series order. */
  tone?: 1 | 2 | 3 | 4 | 5;
}
export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: LineSeries[];
  /** X labels, same length as the longest series. */
  labels?: React.ReactNode[];
  height?: number;
  target?: number;
  targetLabel?: string;
  /** Y-axis tick formatter. Must produce Indonesian formatting. */
  yFormat?: (value: number) => string;
  /** Soft fill under the first series. Only for a single-series chart. */
  area?: boolean;
}
export declare function LineChart(props: LineChartProps): JSX.Element;
