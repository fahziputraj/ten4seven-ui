/**
 * Single-line text control. 44px tall, 12px radius, subtle-elevated fill that turns white on focus.
 * @startingPoint section="Forms" subtitle="Text, currency, search and invalid states" viewport="700x220"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Leading semantic Icon key — "mail", "search", "location". */
  icon?: string;
  iconEnd?: string;
  /** Danger border + focus ring, and sets aria-invalid. */
  invalid?: boolean;
  /** sm 36px (table filters) · md 44px (default) · lg 48px (auth). */
  size?: "sm" | "md" | "lg";
  /** "right" also switches the field to tabular numerals — use for currency and quantity. */
  align?: "left" | "right";
}
export declare function Input(props: InputProps): JSX.Element;
