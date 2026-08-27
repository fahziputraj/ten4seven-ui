/** Transient confirmation of something the user just did. Bottom-right, one at a time, 4–6 seconds. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "success" | "danger" | "warning" | "info" | "neutral";
  /** What happened, past tense: "Dokumen disimpan". */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** One recovery action at most — "Batalkan". */
  action?: React.ReactNode;
  onClose?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
