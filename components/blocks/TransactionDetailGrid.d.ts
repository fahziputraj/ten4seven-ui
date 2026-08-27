import * as React from "react";

export interface TransactionDetailGridProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  columns?: Array<Record<string, unknown>>;
  rows?: Array<Record<string, unknown>>;
  getRowId?: (row: Record<string, unknown>, index: number) => string | number;
  onAdd?: () => void;
  addLabel?: React.ReactNode;
  onRemove?: (row: Record<string, unknown>, index: number) => void;
  onDuplicate?: (row: Record<string, unknown>, index: number) => void;
  renderRowActions?: (row: Record<string, unknown>, index: number) => React.ReactNode;
  disabled?: boolean;
}

export declare function TransactionDetailGrid(props: TransactionDetailGridProps): React.ReactElement;
