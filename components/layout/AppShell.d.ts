export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  mobileNav?: React.ReactNode;
  sidebarCollapsed?: boolean;
  sidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  density?: "comfortable" | "default" | "compact";
  hasSidebar?: boolean;
  ariaLabel?: string;
}
export declare function AppShell(props: AppShellProps): JSX.Element;
