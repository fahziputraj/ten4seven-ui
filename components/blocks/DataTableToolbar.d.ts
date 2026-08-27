import * as React from "react";

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filters?: React.ReactNode;
  applied?: Array<{ key: string; label: string }>;
  onClearAll?: () => void;
  onRemoveFilter?: (key: string) => void;
  actions?: React.ReactNode;
  selectedCount?: number;
  selectedNoun?: string;
  bulkActions?: React.ReactNode;
  onClearSelection?: () => void;
  children?: React.ReactNode;
}

export declare function DataTableToolbar(props: DataTableToolbarProps): React.ReactElement;
