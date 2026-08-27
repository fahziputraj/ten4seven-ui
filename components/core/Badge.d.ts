/**
 * Small non-interactive label. Pill shaped, always.
 * @startingPoint section="Core" subtitle="Semantic label pills" viewport="700x150"
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "soft" | "success" | "warning" | "danger" | "info" | "ai" | "lime" | "green" | "orange";
  /** Semantic Icon key rendered at 13px. */
  icon?: string;
  /** Leading 6px dot in the current colour — for live/status indicators. */
  dot?: boolean;
  /** 10px uppercase with wide tracking — the AAPM eyebrow treatment. */
  overline?: boolean;
}
export declare function Badge(props: BadgeProps): JSX.Element;
