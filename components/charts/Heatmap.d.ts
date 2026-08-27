/** Two-dimensional density — house × week, operator × shift, item × month. */
export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Row labels, top to bottom. */
  rows: React.ReactNode[];
  /** Column labels, left to right. */
  columns: React.ReactNode[];
  /** data[row][column]. null / undefined renders a dashed "no data" cell, never a zero. */
  data: (number | null | undefined)[][];
  tone?: "green" | "orange" | "danger" | "teal";
  cell?: number;
  gap?: number;
  valueFormat?: (value: number) => string;
  legend?: boolean;
}
export declare function Heatmap(props: HeatmapProps): JSX.Element;
