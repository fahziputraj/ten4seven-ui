/** Twelve-point trend inside a MetricCard. Shape only — no axes, no labels, no tooltip. */
export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** Raw numbers, oldest first. Fewer than 2 renders nothing. */
  data: number[];
  width?: number;
  height?: number;
  tone?: "green" | "teal" | "orange" | "lime" | "violet" | "danger";
  /** Soft gradient fill under the line. */
  area?: boolean;
  /** Dot on the most recent point. */
  showLast?: boolean;
  /** Dashed terracotta target line. */
  target?: number;
}
export declare function Sparkline(props: SparklineProps): JSX.Element;
