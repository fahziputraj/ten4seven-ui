/** Shape-preserving loading placeholder. Mirrors the real element's geometry, never a spinner in a card. */
export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  radius?: string;
  /** >1 renders a paragraph stack; the last line is short. */
  lines?: number;
  gap?: number;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
