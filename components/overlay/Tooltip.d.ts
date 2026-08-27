/** Names an icon-only control or explains a truncated / restricted value. Never holds essential copy alone. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** One short line. No sentences, no links. */
  label: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
