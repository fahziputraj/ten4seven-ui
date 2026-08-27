/** ⌘K palette: jump to any module, document or action without leaving the keyboard. */
export interface CommandItem {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  icon?: string;
  /** Extra search terms — Indonesian and English synonyms, document prefixes. */
  keywords?: string;
  shortcut?: string;
}
export interface CommandGroup { label: string; items: CommandItem[] }
export interface CommandMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  /** Order matters: put navigation first, actions second, recent records last. */
  groups: CommandGroup[];
  onSelect?: (item: CommandItem) => void;
  placeholder?: string;
  emptyLabel?: React.ReactNode;
  footerHint?: React.ReactNode;
}
export declare function CommandMenu(props: CommandMenuProps): JSX.Element;
