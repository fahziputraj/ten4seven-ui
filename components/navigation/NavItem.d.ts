/**
 * One row in the app sidebar. Handles the collapsed rail, the active green fill, counts and attention dots.
 */
export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic Icon key. Duotone glyphs are inverted to solid white when active. */
  icon: string;
  label: React.ReactNode;
  active?: boolean;
  /** 76px rail: icon only, label moves to the title attribute. */
  collapsed?: boolean;
  /** Right-aligned count — pending approvals, unread items. */
  badge?: React.ReactNode;
  /** Right-aligned attention dot; lime when active, terracotta otherwise. */
  dot?: boolean;
  as?: "button" | "a";
  href?: string;
}
export declare function NavItem(props: NavItemProps): JSX.Element;
