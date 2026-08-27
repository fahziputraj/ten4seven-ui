/** Verification code entry: email confirmation, password reset, approval PIN. */
export interface OtpInputProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  invalid?: boolean;
  autoFocus?: boolean;
}
export declare function OtpInput(props: OtpInputProps): JSX.Element;
