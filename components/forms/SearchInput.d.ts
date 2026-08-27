/** The standard search field: leading glyph, clear button, optional keyboard hint. */
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Indonesian, names the searchable fields: "Cari nomor invoice, supplier, atau PO...". */
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  /** Swaps the glyph for a spinner while a server query is in flight. */
  loading?: boolean;
  /** Keyboard hint chip, e.g. "⌘K". Hidden once there is a value. */
  shortcut?: string;
}
export declare function SearchInput(props: SearchInputProps): JSX.Element;
