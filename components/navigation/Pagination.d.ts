/** Row-count aware pager for list pages. Works with server-side pagination. */
export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  pageCount: number;
  /** Total row count — enables the "Menampilkan 1–25 dari 482" readout. */
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
