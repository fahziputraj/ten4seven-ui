/** Single date, Indonesian month names and Monday-first weeks. */
export interface DatePickerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ISO `YYYY-MM-DD`. The wire format is always ISO; only the display is localised. */
  value?: string;
  onValueChange?: (iso: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** ISO bounds — dates outside are disabled, e.g. locking to the open accounting period. */
  min?: string;
  max?: string;
  /** true → "24 Agustus 2026". false → "24/08/2026" for dense grids. */
  long?: boolean;
}
export declare function DatePicker(props: DatePickerProps): JSX.Element;
/** Formats an ISO date the AAPM way. Exported so tables and read-only views match the picker. */
export declare function formatDateId(iso: string, long?: boolean): string;
