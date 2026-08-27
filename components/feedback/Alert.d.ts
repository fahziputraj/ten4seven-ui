/** Inline message tied to the surface it sits on — form errors, permission notices, data caveats. */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "info" | "success" | "warning" | "danger" | "neutral" | "brand";
  /** One line, sentence case. Coloured to the tone. */
  title?: React.ReactNode;
  /** Explanation in Indonesian, up to three sentences, always with a way forward. */
  children?: React.ReactNode;
  /** Overrides the tone's default glyph. */
  icon?: string;
  /** Slot for Buttons. */
  action?: React.ReactNode;
  onDismiss?: () => void;
  /** Full-bleed page banner: square corners, no side borders. */
  banner?: boolean;
}
export declare function Alert(props: AlertProps): JSX.Element;
