/** Anchored panel: row actions, column chooser, saved views, account menu. */
export interface PopoverProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The clickable element — usually an IconButton or a ghost Button. */
  trigger: React.ReactNode;
  /** start aligns to the trigger's left edge, end to its right. */
  align?: "start" | "end";
  width?: number;
  /** Controlled mode; omit for self-managed open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export interface PopoverItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render an Icon as a child instead — this slot exists for symmetry with menu items. */
  icon?: string;
  tone?: "default" | "danger";
}
export declare function Popover(props: PopoverProps): JSX.Element;
export declare function PopoverItem(props: PopoverItemProps): JSX.Element;
