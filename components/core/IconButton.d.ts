/**
 * Icon-only action with a mandatory label — the accessible way to compress a toolbar.
 */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Semantic Icon registry key. */
  icon: string;
  /** Required. Becomes aria-label AND the hover tooltip. */
  label: string;
  variant?: "ghost" | "soft" | "outline";
  /** sm 32px · md 40px · lg 44px (mobile touch target). */
  size?: "sm" | "md" | "lg";
  /** Semantic colour token name, e.g. "danger" or "brand-green". */
  tone?: string;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
