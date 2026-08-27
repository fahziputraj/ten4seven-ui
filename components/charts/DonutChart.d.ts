/** Composition of a whole — grade mix, cost breakdown, status distribution. Five slices maximum. */
export interface DonutSlice {
  label: React.ReactNode;
  value: number;
  /** Pre-formatted legend readout. Defaults to a rounded percentage. */
  display?: React.ReactNode;
  tone?: 1 | 2 | 3 | 4 | 5;
}
export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  /** The number in the hole — usually the total. */
  centerValue?: React.ReactNode;
  centerLabel?: React.ReactNode;
}
export declare function DonutChart(props: DonutChartProps): JSX.Element;
