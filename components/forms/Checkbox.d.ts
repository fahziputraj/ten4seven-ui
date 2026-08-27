/** Boolean / multi-select control. 18px box, 5px radius, green fill when on. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  /** Partial selection — renders a dash. Use for "select all" in a table header. */
  indeterminate?: boolean;
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
