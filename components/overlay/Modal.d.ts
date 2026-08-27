/**
 * Focused decision or short form that must not lose the page behind it. Also the confirmation dialog.
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Escape and backdrop click both call this. Omit only for a blocking dialog. */
  onClose?: () => void;
  title: React.ReactNode;
  /** The consequence, stated plainly. Required on any destructive confirmation. */
  description?: React.ReactNode;
  /** Semantic Icon key, shown in a tinted tile beside the title. */
  icon?: string;
  /** Tints the icon tile. Use "danger" for irreversible actions. */
  tone?: "brand" | "warning" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  /** Action row — right-aligned on a subtle footer bar. */
  footer?: React.ReactNode;
}
export declare function Modal(props: ModalProps): JSX.Element;
