/**
 * Top of every page: what this is, and the one primary action.
 * @startingPoint section="Blocks" subtitle="Overline, title, description, primary action" viewport="700x180"
 */
export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Module or group name, uppercase-tracked automatically. "PURCHASE · INVOICE". */
  overline?: React.ReactNode;
  title: React.ReactNode;
  /** One sentence of context, Indonesian. Optional on list pages. */
  description?: React.ReactNode;
  /** Slot for a Breadcrumb, rendered above the title. */
  breadcrumb?: React.ReactNode;
  /** Buttons. Exactly one default (green) button. */
  actions?: React.ReactNode;
  /** Row below the title for StatusChips, counts, last-updated stamps. */
  meta?: React.ReactNode;
}
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
