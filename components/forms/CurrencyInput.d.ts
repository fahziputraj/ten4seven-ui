/** Rupiah amounts. Groups thousands with periods as the user types; stores a plain digit string. */
export interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  /** Unformatted digits, e.g. "482650000". The component owns the display formatting. */
  value?: string | number;
  /** Receives unformatted digits only — never the grouped display string. */
  onValueChange?: (digits: string) => void;
  /** Symbol shown inside the field. "Rp" for IDR. */
  currency?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
}
export declare function CurrencyInput(props: CurrencyInputProps): JSX.Element;
