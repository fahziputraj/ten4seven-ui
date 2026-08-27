/**
 * Label + control + hint/error in one vertical stack. The unit AAPM forms are built from.
 * @startingPoint section="Forms" subtitle="Label, control, hint, error, restricted" viewport="700x260"
 */
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Control id — wired into the label and the error's id (`{id}-error`). */
  id?: string;
  label?: React.ReactNode;
  /** Shown when there is no error. */
  hint?: React.ReactNode;
  /** Replaces the hint, coloured danger, with role="alert". */
  error?: React.ReactNode;
  required?: boolean;
  /** Explains a read-only/restricted field, e.g. "Finance only". Never leave a disabled field unexplained. */
  permission?: string;
  /** Grid column span inside a FormSection grid. */
  span?: 1 | 2 | 3;
}
export declare function FormField(props: FormFieldProps): JSX.Element;
