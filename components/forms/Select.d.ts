/** Single-choice dropdown, styled to match Input exactly. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Strings, or { value, label } objects. */
  options?: Array<string | { value: string; label: string }>;
  /** Renders as an empty-valued first option. */
  placeholder?: string;
  invalid?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
