/** Actual against target, on one bar. Answers "how far from target?" — the variance question. */
export interface BulletChartProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  /** Draws the terracotta target tick. Also drives the automatic colour: at/above target green, within 10% amber, below red. */
  target?: number;
  /** Scale ceiling. Defaults to 115% of the larger of value/target. */
  max?: number;
  label?: React.ReactNode;
  /** Pre-formatted readout, e.g. "91,8% / 90,0%". */
  valueLabel?: React.ReactNode;
  targetLabel?: string;
  /** Forces a colour and disables the automatic target-based colouring. */
  tone?: "green" | "lime" | "orange" | "danger";
  height?: number;
}
export declare function BulletChart(props: BulletChartProps): JSX.Element;
