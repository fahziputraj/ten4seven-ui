/** Progress through a multi-step process: a long form, a multi-level approval, an onboarding flow. */
export interface StepperStep {
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Replaces the step number on the active/pending marker. */
  icon?: string;
}
export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** Zero-based index of the current step. Earlier steps render as complete. */
  current?: number;
  orientation?: "horizontal" | "vertical";
}
export declare function Stepper(props: StepperProps): JSX.Element;
