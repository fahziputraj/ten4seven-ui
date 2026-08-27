/** Nothing here yet — and why. Never the words "No data". */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic Icon key, shown in a green tinted tile. */
  icon?: string;
  /** Path into assets/illustrations/ — preferred over an icon for a whole-page empty. */
  illustration?: string;
  title: React.ReactNode;
  /** Indonesian, explains the cause and what will change it. */
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** dashed = inside an otherwise complete layout. card = a section that stands alone. */
  variant?: "dashed" | "card";
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
