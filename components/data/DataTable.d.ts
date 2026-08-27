/**
 * The ERP table. Sortable, selectable, sticky-headed, with grouped rows, expandable rows,
 * inline-editable cells, a sticky first column and a summary row.
 * @startingPoint section="Data" subtitle="Sortable, selectable table with totals row" viewport="700x300"
 */
export interface DataColumn {
  key: string;
  label: React.ReactNode;
  /** Right-aligns and applies tabular figures. Set on every money / quantity column. */
  numeric?: boolean;
  sortable?: boolean;
  /** Custom cell — return a StatusChip, Avatar, IconButton group, anything. */
  render?: (row: any, index: number) => React.ReactNode;
  width?: number | string;
  /** Allows the cell to wrap; default is nowrap. */
  wrap?: boolean;
  strong?: boolean;
  muted?: boolean;
  /** Click-to-edit cell. Commits on Enter or blur, cancels on Escape. Requires onCellCommit. */
  editable?: boolean;
  /** Pins the column while the table scrolls horizontally. Only worth it on the identifier column. */
  sticky?: boolean;
}
export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataColumn[];
  rows: any[];
  getRowId?: (row: any, index: number) => string | number;
  selectable?: boolean;
  selectedIds?: (string | number)[];
  onToggleRow?: (id: string | number) => void;
  onToggleAll?: (next: boolean) => void;
  sort?: { key: string; dir: "asc" | "desc" };
  onSort?: (key: string) => void;
  stickyHeader?: boolean;
  /** Totals row keyed by column key. Reconciled totals belong here, not in a card below. */
  summary?: Record<string, React.ReactNode>;
  onRowClick?: (row: any) => void;
  /** Indonesian no-result copy. Distinct from an empty dataset — use StateView for that. */
  emptyLabel?: React.ReactNode;
  /** Supplying this turns on the expand chevron column. Return the drawer content for a row. */
  renderExpanded?: (row: any) => React.ReactNode;
  expandedIds?: (string | number)[];
  onToggleExpand?: (id: string | number) => void;
  /** Returns the group key for a row — turns on grouped rows with a sticky-styled group header. */
  groupBy?: (row: any) => string;
  /** Renders the group header text. */
  groupLabel?: (key: string, rows: any[]) => React.ReactNode;
  /** Right-aligned per-group total in the group header. */
  groupSummary?: (key: string, rows: any[]) => React.ReactNode;
  /** Fired when an editable cell commits. */
  onCellCommit?: (change: { id: string | number; key: string; value: string; row: any }) => void;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
