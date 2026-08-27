/**
 * Searchable picker. Multi by default; `single` makes it the searchable single-select (the Autocomplete role).
 */
export interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  /** Second line — disambiguates similar names (address, NPWP, kandang). */
  description?: React.ReactNode;
  /** Right-aligned trailing figure — outstanding balance, stock, count. */
  meta?: React.ReactNode;
}
export interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  options: (MultiSelectOption | string)[];
  /** Selected values. Always an array, even when `single`. */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  /** One choice only, radio markers, closes on pick — use for supplier/customer lookups. */
  single?: boolean;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Chips shown before collapsing to "+N lagi". */
  maxVisible?: number;
  emptyLabel?: React.ReactNode;
}
export declare function MultiSelect(props: MultiSelectProps): JSX.Element;
