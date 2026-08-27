/** Progressive disclosure for grouped content — form sections, roadmap chapters, FAQ, grouped settings. */
export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned count or progress readout, e.g. "4/6". */
  meta?: React.ReactNode;
  icon?: string;
  content?: React.ReactNode;
  disabled?: boolean;
}
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Controlled: string for single mode, string[] for multiple. Omit for self-managed. */
  value?: string | string[] | null;
  onChange?: (value: string | string[] | null) => void;
  multiple?: boolean;
  /** card = separated bordered panels. flush = divider-separated rows inside an existing card. */
  variant?: "card" | "flush";
}
export declare function Accordion(props: AccordionProps): JSX.Element;
