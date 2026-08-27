/**
 * The product-level surface vocabulary. Pick a treatment instead of recreating shadows, tints and borders.
 * @startingPoint section="Core" subtitle="Surface treatments and category tones" viewport="700x260"
 */
export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  /** default = resting card · muted = inset panel · accent = brand wash · inverse = ink block ·
   *  interactive = hover-lift target · selected = chosen row/card · dashed = placeholder slot. */
  variant?: "default" | "muted" | "accent" | "inverse" | "interactive" | "selected" | "dashed";
  /** Category wash. Green/lime/orange are brand; blue/violet/slate extend for non-brand categories. */
  tone?: "neutral" | "green" | "lime" | "orange" | "blue" | "violet" | "slate";
  /** Spacing-scale step, e.g. 4 → var(--space-4). */
  padding?: 2 | 3 | 4 | 5 | 6 | 8;
  as?: keyof JSX.IntrinsicElements;
}
export declare function Surface(props: SurfaceProps): JSX.Element;
