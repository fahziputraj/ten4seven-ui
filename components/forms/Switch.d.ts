/** Immediate on/off setting. Use for settings that apply at once, not for form values you submit. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
}
export declare function Switch(props: SwitchProps): JSX.Element;
