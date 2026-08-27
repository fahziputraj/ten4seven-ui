import React from "react";
import { FilterToolbar } from "./FilterToolbar.jsx";
import { BulkActionBar } from "./BulkActionBar.jsx";

/**
 * The table page contract: filters first, selection actions second, optional
 * summary/slot last. Product code owns query state and persistence.
 */
export function DataTableToolbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  filters,
  applied = [],
  onClearAll,
  onRemoveFilter,
  actions,
  selectedCount = 0,
  selectedNoun = "baris",
  bulkActions,
  onClearSelection,
  children,
  style,
  ...rest
}) {
  return (
    <div className="aapm-data-table-toolbar" style={{ display: "grid", gap: "var(--space-3)", minWidth: 0, ...style }} {...rest}>
      <FilterToolbar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        filters={filters}
        applied={applied}
        onClearAll={onClearAll}
        onRemoveFilter={onRemoveFilter}
        trailing={actions}
      />
      <BulkActionBar count={selectedCount} noun={selectedNoun} actions={bulkActions} onClear={onClearSelection} floating={false} />
      {children && <div style={{ minWidth: 0 }}>{children}</div>}
    </div>
  );
}
