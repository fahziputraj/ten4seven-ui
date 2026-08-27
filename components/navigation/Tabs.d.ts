/** Switches the view inside one record or one page. Not for navigating between pages. */
export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: string;
  /** Count badge — queue sizes, row counts. */
  count?: number;
  disabled?: boolean;
}
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  /** underline = page sections. pill = a segmented switch inside a card or toolbar. */
  variant?: "underline" | "pill";
  size?: "sm" | "md";
}
export declare function Tabs(props: TabsProps): JSX.Element;
