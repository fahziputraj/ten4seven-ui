/** Person mark: the Academy's illustrated avatar SVG, or a tinted initial. */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — first letter becomes the fallback, and the title attribute. */
  name?: string;
  /** An uploaded photo. Leave unset for the tinted-initial fallback, which is what the products ship. */
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  tone?: "green" | "orange" | "slate";
  /** Green halo — marks the signed-in user only. */
  ring?: boolean;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
