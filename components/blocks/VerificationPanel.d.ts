import * as React from "react";

export interface VerificationEvidence {
  id?: string | number;
  label: React.ReactNode;
  value?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  external?: boolean;
  status?: string;
}

export interface VerificationCheck {
  id?: string | number;
  label: React.ReactNode;
  detail?: React.ReactNode;
  state?: "pass" | "fail" | "warn" | "pending";
  icon?: string;
}

export interface VerificationPanelProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  context?: React.ReactNode;
  evidence?: VerificationEvidence[];
  checks?: VerificationCheck[];
  noteValue?: string;
  onNoteChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  noteLabel?: React.ReactNode;
  notePlaceholder?: string;
  onVerify?: () => void;
  onReject?: () => void;
  verifyLabel?: React.ReactNode;
  rejectLabel?: React.ReactNode;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
}

export declare function VerificationPanel(props: VerificationPanelProps): React.ReactElement;
