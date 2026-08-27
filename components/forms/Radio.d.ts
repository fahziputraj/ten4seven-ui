/** Single choice from a small mutually exclusive set. Renders as a bordered, selectable row — not a bare dot. */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  /** Second line, Indonesian sentence case. */
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
}
export declare function Radio(props: RadioProps): JSX.Element;
