/** Sticky footer that keeps the commit action reachable in a long transaction form. */
export interface ActionFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The green commit action — Simpan, Ajukan, Setujui. Rightmost. */
  primary?: React.ReactNode;
  /** Outline supporting action — Batal, Simpan draft. Sits left of primary. */
  secondary?: React.ReactNode;
  /** Far-left slot: Hapus, Duplikat, ghost extras. */
  tertiary?: React.ReactNode;
  /** Left-aligned status line: unsaved changes, last autosave, validation count. */
  hint?: React.ReactNode;
  sticky?: boolean;
}
export declare function ActionFooter(props: ActionFooterProps): JSX.Element;
