/** Side panel for filters, record detail preview, and the mobile navigation. */
export interface DrawerProps extends React.HTMLAttributes<HTMLElement> {
  open?: boolean;
  onClose?: () => void;
  /** right = detail / filters. left = mobile navigation. */
  side?: "right" | "left";
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Max width in px. 420 for filters, 560+ for a record preview. */
  width?: number;
  footer?: React.ReactNode;
}
export declare function Drawer(props: DrawerProps): JSX.Element;
