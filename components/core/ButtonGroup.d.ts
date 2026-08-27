/** Segmented control for a mutually exclusive view choice — density, layout, period. */
export interface ButtonGroupItem {
  value: string;
  /** Omit for an icon-only segment; then `title` becomes the accessible name. */
  label?: React.ReactNode;
  icon?: string;
  title?: string;
  disabled?: boolean;
  showLabel?: boolean;
}
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ButtonGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}
export declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
