/** Appears only when rows are selected. Inverse bar so it reads as a mode, not part of the table. */
export interface BulkActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected row count. 0 renders nothing. */
  count?: number;
  /** Indonesian noun for what is selected: "baris", "dokumen", "peserta". */
  noun?: string;
  /** Buttons — use ghost/outline variants; the bar is already inverse. */
  actions?: React.ReactNode;
  onClear?: () => void;
  /** Level-4 shadow for a floating bar over the table; false when docked in a toolbar. */
  floating?: boolean;
}
export declare function BulkActionBar(props: BulkActionBarProps): JSX.Element;
