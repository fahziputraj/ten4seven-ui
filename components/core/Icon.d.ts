/**
 * Canonical icon surface. Semantic name in, Solar (Iconify) glyph out.
 * @startingPoint section="Foundations" subtitle="Semantic Solar icon registry" viewport="700x260"
 */
export interface IconProps {
  /** Semantic registry key ("approve", "warehouse", "mortality", "library") or a raw Iconify name ("ph:egg-duotone"). */
  name?: string;
  /** Square px size. 16 dense / 20 default / 24 emphasis. */
  size?: number;
  /** Overrides currentColor. Prefer inheriting from the parent. */
  color?: string;
  /** Accessible label. Omit for decorative icons — the icon is then aria-hidden. */
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
export declare const IconRegistry: Readonly<Record<string, string>>;
export declare const IconNames: readonly string[];
export declare function ensureIconify(): void;
