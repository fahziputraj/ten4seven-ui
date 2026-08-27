/**
 * A removable or selectable token: applied filters, tags, selected entities, quick categories.
 * Distinct from Badge (a read-only label or count) and StatusChip (record lifecycle).
 */
export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: string;
  /** Slot for a small Avatar. */
  avatar?: React.ReactNode;
  tone?: "neutral" | "green" | "orange" | "blue" | "violet" | "slate";
  /** Overrides tone with the brand-green selected treatment. */
  selected?: boolean;
  /** Adds the trailing ✕. Present = the chip is removable. */
  onRemove?: () => void;
  onClick?: () => void;
  size?: "sm" | "md";
}
export declare function Chip(props: ChipProps): JSX.Element;
