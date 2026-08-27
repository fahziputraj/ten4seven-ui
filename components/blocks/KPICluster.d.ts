/**
 * The dashboard snapshot row — 3 or 4 MetricCards answering "what is happening?" at a glance.
 * @startingPoint section="Blocks" subtitle="Three or four KPI tiles in one responsive row" viewport="700x200"
 */
export interface KPIClusterProps extends React.HTMLAttributes<HTMLElement> {
  /** MetricCard prop objects, in reading priority order. Three or four; six is the hard ceiling. */
  items: Array<Record<string, any>>;
  /** Target columns at desktop width. The grid is auto-fit, so this is a hint. */
  columns?: number;
  compact?: boolean;
  /** Optional uppercase section label above the row. */
  title?: React.ReactNode;
  /** Right-aligned slot beside the title — usually a period Tabs switch. */
  action?: React.ReactNode;
}
export declare function KPICluster(props: KPIClusterProps): JSX.Element;
