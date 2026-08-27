/**
 * Tinted square that gives an icon category weight in lists, tool grids and metric headers.
 */
export interface IconTileProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  tone?: "neutral" | "green" | "lime" | "orange" | "blue" | "violet" | "slate";
  /** sm 32px · md 40px · lg 48px. */
  size?: "sm" | "md" | "lg";
}
export declare function IconTile(props: IconTileProps): JSX.Element;
