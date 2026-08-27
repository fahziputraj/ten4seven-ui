/** Field label. 12px semibold by default — AAPM forms label small and tight. */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a danger-coloured asterisk. */
  required?: boolean;
  size?: "sm" | "base";
}
export declare function Label(props: LabelProps): JSX.Element;
