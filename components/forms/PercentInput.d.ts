/** Percentages with an Indonesian comma decimal. */
export interface PercentInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  /** Comma-decimal string as typed, e.g. "91,8". */
  value?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  max?: number;
}
export declare function PercentInput(props: PercentInputProps): JSX.Element;
