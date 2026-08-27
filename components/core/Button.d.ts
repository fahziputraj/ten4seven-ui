/**
 * Primary action control. One button, six intents — never a bespoke CTA.
 * @startingPoint section="Core" subtitle="Six action intents, four sizes" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** default = the green primary action (one per view). outline/secondary/soft = supporting.
   *  ghost = toolbar. destructive = irreversible. link = inline navigation. */
  variant?: "default" | "destructive" | "outline" | "secondary" | "soft" | "ghost" | "link";
  /** sm 32px (dense tables/toolbars) · md 40px (default) · lg 44px · xl 48px (auth + full-width CTA) · icon 40px square. */
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  /** Leading icon: a semantic Icon registry key. */
  icon?: string;
  /** Trailing icon — use "arrowRight" for forward navigation. */
  iconEnd?: string;
  /** Swaps the leading icon for a spinner and blocks interaction. */
  loading?: boolean;
  fullWidth?: boolean;
}
export declare function Button(props: ButtonProps): JSX.Element;
