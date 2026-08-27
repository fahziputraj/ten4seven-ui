/** Groups related fields in a business or long form. The section, not the field, carries the explanation. */
export interface FormSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: React.ReactNode;
  /** Why this group exists or what rule applies to it. Indonesian. */
  description?: React.ReactNode;
  /** 1 for simple forms and mobile, 2 for business forms at desktop width. */
  columns?: 1 | 2;
  /** Right-aligned slot — "Tambah baris", "Salin dari dokumen sebelumnya". */
  actions?: React.ReactNode;
  divider?: boolean;
}
export declare function FormSection(props: FormSectionProps): JSX.Element;
