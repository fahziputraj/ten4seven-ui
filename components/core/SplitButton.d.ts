/** One obvious action plus its variants. Keeps the common path a single click. */
export interface SplitAction {
  label: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
}
export interface SplitButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The default action's label — the thing 80% of users want. */
  label: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  /** The variants behind the caret. */
  actions: SplitAction[];
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  align?: "start" | "end";
}
export declare function SplitButton(props: SplitButtonProps): JSX.Element;
