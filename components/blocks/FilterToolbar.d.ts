/**
 * The standard list-page filter row: search, primary filters, applied chips, clear all.
 * @startingPoint section="Blocks" subtitle="Search, filters, applied chips, clear all" viewport="700x180"
 */
export interface AppliedFilter { key: string; label: React.ReactNode }
export interface FilterToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** Indonesian, names the searchable fields. */
  searchPlaceholder?: string;
  /** Slot for Selects and date-range controls — the primary filters, 2–4 at most. */
  filters?: React.ReactNode;
  /** Chips for everything currently narrowing the list, including advanced-drawer filters. */
  applied?: AppliedFilter[];
  onClearAll?: () => void;
  onRemoveFilter?: (key: string) => void;
  /** Right-aligned slot: density toggle, column chooser, advanced-filter button, export. */
  trailing?: React.ReactNode;
}
export declare function FilterToolbar(props: FilterToolbarProps): JSX.Element;
