/** Evidence attachment: invoices, surat jalan, faktur pajak, photos. Drop zone plus a reviewable list. */
export interface UploadedFile {
  name: string;
  size?: number;
  /** Pre-formatted size, e.g. "1,2 MB". Overrides the computed KB figure. */
  sizeLabel?: string;
  /** 0–100 while in flight. Omit once complete. */
  progress?: number;
  /** Indonesian failure reason, shown in danger red in place of the size. */
  error?: string;
}
export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  files?: UploadedFile[];
  onAdd?: (files: { name: string; size: number }[]) => void;
  onRemove?: (index: number) => void;
  accept?: string;
  multiple?: boolean;
  /** Constraint line under the label — state the formats and the size cap. */
  hint?: React.ReactNode;
  label?: React.ReactNode;
  invalid?: boolean;
  required?: boolean;
}
export declare function FileUpload(props: FileUploadProps): JSX.Element;
