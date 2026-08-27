/** Description list for record metadata — the readable half of a detail page. */
export interface KeyValueItem {
  label: React.ReactNode;
  /** null / "" renders an em dash. Never render "N/A". */
  value?: React.ReactNode;
  /** Right-aligns and applies tabular figures. */
  numeric?: boolean;
  strong?: boolean;
}
export interface KeyValueListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: KeyValueItem[];
  /** 1 for a sidebar, 2 for a full-width record header. */
  columns?: 1 | 2;
  /** Drops dividers and tightens rows — for inside a popover or card footer. */
  dense?: boolean;
}
export declare function KeyValueList(props: KeyValueListProps): JSX.Element;
