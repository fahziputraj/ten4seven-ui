export interface SidebarItem { key: string; label: React.ReactNode; icon?: string; href?: string; badge?: React.ReactNode; dot?: boolean; disabled?: boolean; active?: boolean; }
export interface SidebarSection { key?: string; label?: React.ReactNode; items: SidebarItem[]; }
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> { brand?: React.ReactNode; collapsedBrand?: React.ReactNode; sections?: SidebarSection[]; footer?: React.ReactNode; collapsed?: boolean; activeKey?: string; onNavigate?: (key: string, item: SidebarItem, event: React.SyntheticEvent) => void; onToggle?: () => void; }
export declare function Sidebar(props: SidebarProps): JSX.Element;
