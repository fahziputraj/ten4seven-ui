/** Quantities and counts. Right-aligned tabular figures with optional unit and steppers. */
export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number | string;
  onValueChange?: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Decimal places the caller intends to keep. Documented for the caller's formatter — the component does not round. */
  precision?: number;
  /** Trailing unit rendered inside the field: "kg", "butir", "g/ekor". */
  unit?: React.ReactNode;
  /** Leading prefix rendered inside the field. */
  prefix?: React.ReactNode;
  align?: "left" | "right";
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Hide the +/- column for very dense grids. */
  steppers?: boolean;
}
export declare function NumberInput(props: NumberInputProps): JSX.Element;
