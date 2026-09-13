import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cx } from "./utils";

export type ListSelectionMode = "none" | "single" | "multiple";
export type ListInteractionMode = "select" | "activate" | "select-and-activate";
export type ListDensity = "compact" | "regular" | "comfortable";

export interface ListRenderContext {
  readonly index: number;
  readonly selected: boolean;
  readonly disabled: boolean;
}

export interface ListProps<Row> extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "children" | "onSelect"
> {
  /** Stable semantic name for the collection. */
  label?: string;
  /** Ordered records supplied by the consumer. */
  items: Row[];
  /** Stable opaque identity for selection, focus, and reconciliation. */
  rowKey: (row: Row) => string;
  /** Render only row content; the collection owns list semantics and state. */
  renderItem: (row: Row, context: ListRenderContext) => ReactNode;
  density?: ListDensity;
  selectionMode?: ListSelectionMode;
  /** Explicitly separates selection from activation when both are present. */
  interactionMode?: ListInteractionMode;
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  onItemActivate?: (row: Row) => void;
  rowLabel?: (row: Row) => string;
  disabled?: boolean | ((row: Row) => boolean);
  loading?: boolean;
  loadingMessage?: ReactNode;
  error?: ReactNode;
  emptyMessage?: ReactNode;
  filteredEmptyMessage?: ReactNode;
  hasActiveFilter?: boolean;
  loadingMore?: boolean;
  endOfResults?: boolean;
  endOfResultsMessage?: ReactNode;
}

function isNestedInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("a,button,input,select,textarea,[role='button']"))
  );
}

/**
 * A generic ordered collection. It owns list semantics, selection state
 * exposure, keyboard movement, and collection states; the consumer owns data,
 * business rules, fetching, and row content. Use DataTable when columns and
 * cross-record comparison are the primary intent.
 */
export function List<Row>({
  className,
  density = "regular",
  disabled = false,
  emptyMessage = "No records yet.",
  endOfResults = false,
  endOfResultsMessage = "End of results.",
  error,
  filteredEmptyMessage = "No results match the current filter.",
  hasActiveFilter = false,
  interactionMode,
  items,
  label,
  loading = false,
  loadingMessage = "Loading records…",
  loadingMore = false,
  onItemActivate,
  onSelectionChange,
  renderItem,
  rowKey,
  rowLabel,
  selectedRowKeys = [],
  selectionMode = "none",
  ...props
}: ListProps<Row>) {
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const [focusedKey, setFocusedKey] = useState<string | undefined>();
  const keys = items.map(rowKey);
  const selectedSet = new Set(selectedRowKeys);
  const isSelectable = selectionMode !== "none";
  const resolvedInteractionMode =
    interactionMode ?? (isSelectable ? "select" : "activate");
  const canSelect =
    isSelectable &&
    (resolvedInteractionMode === "select" ||
      resolvedInteractionMode === "select-and-activate");
  const canActivate =
    Boolean(onItemActivate) &&
    (resolvedInteractionMode === "activate" ||
      resolvedInteractionMode === "select-and-activate");
  const activeKey =
    focusedKey && keys.includes(focusedKey) ? focusedKey : keys[0];
  const listRole = isSelectable ? "listbox" : undefined;

  useEffect(() => {
    if (focusedKey && !keys.includes(focusedKey)) setFocusedKey(keys[0]);
  }, [focusedKey, keys]);

  function itemIsDisabled(row: Row) {
    return typeof disabled === "function" ? disabled(row) : disabled;
  }

  function commitSelection(row: Row, nextSelected: boolean) {
    if (!onSelectionChange || !isSelectable || itemIsDisabled(row)) return;
    const key = rowKey(row);
    const next = new Set(selectedRowKeys);
    if (selectionMode === "single") next.clear();
    if (nextSelected) next.add(key);
    else next.delete(key);
    onSelectionChange(keys.filter((itemKey) => next.has(itemKey)));
  }

  function activate(row: Row) {
    if (itemIsDisabled(row) || !onItemActivate) return;
    onItemActivate(row);
  }

  function focusItem(key: string | undefined) {
    if (!key) return;
    setFocusedKey(key);
    itemRefs.current.get(key)?.focus();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLLIElement>,
    row: Row,
    index: number,
  ) {
    if (event.defaultPrevented || itemIsDisabled(row)) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      focusItem(keys[(index + offset + keys.length) % keys.length]);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      focusItem(keys[event.key === "Home" ? 0 : keys.length - 1]);
      return;
    }
    if (event.key === " " && canSelect) {
      event.preventDefault();
      commitSelection(row, !selectedSet.has(rowKey(row)));
      return;
    }
    if (event.key === "Enter" && canActivate) {
      event.preventDefault();
      activate(row);
    }
  }

  function handleClick(event: MouseEvent<HTMLLIElement>, row: Row) {
    if (itemIsDisabled(row) || isNestedInteractiveTarget(event.target)) return;
    if (canSelect) commitSelection(row, !selectedSet.has(rowKey(row)));
    if (canActivate) activate(row);
  }

  const rowContent = items.map((row, index) => {
    const key = rowKey(row);
    const rowDisabled = itemIsDisabled(row);
    const selected = selectedSet.has(key);
    return (
      <li
        aria-disabled={rowDisabled || undefined}
        aria-selected={isSelectable ? selected : undefined}
        className="t7-list-item"
        data-disabled={rowDisabled || undefined}
        data-selected={selected || undefined}
        key={key}
        onClick={(event) => handleClick(event, row)}
        onFocus={() => setFocusedKey(key)}
        onKeyDown={(event) => handleKeyDown(event, row, index)}
        ref={(element) => {
          if (element) itemRefs.current.set(key, element);
          else itemRefs.current.delete(key);
        }}
        role={listRole === "listbox" ? "option" : undefined}
        tabIndex={rowDisabled ? -1 : activeKey === key ? 0 : -1}
      >
        <div className="t7-list-item-content">
          {renderItem(row, { disabled: rowDisabled, index, selected })}
        </div>
        {isSelectable && rowLabel ? (
          <span className="t7-visually-hidden">
            {selected ? "Selected" : "Not selected"}: {rowLabel(row)}
          </span>
        ) : null}
      </li>
    );
  });

  const stateItem = (
    content: ReactNode,
    stateClass?: string,
    role?: "status" | "alert",
  ) => (
    <li className={cx("t7-list-state", stateClass)} role={role ?? "status"}>
      {content}
    </li>
  );

  const hasRows = items.length > 0;
  const showLoadingState = loading && !hasRows;
  const showErrorState = Boolean(error) && !hasRows;
  const showEmptyState = !loading && !error && !hasRows;

  return (
    <ul
      {...props}
      aria-busy={loading || loadingMore || undefined}
      aria-label={props["aria-label"] ?? label}
      aria-multiselectable={selectionMode === "multiple" || undefined}
      className={cx("t7-list", className)}
      data-density={density}
      data-selection-mode={selectionMode}
      role={listRole}
    >
      {showLoadingState ? stateItem(loadingMessage, "is-loading") : null}
      {showErrorState ? stateItem(error, "is-error", "alert") : null}
      {showEmptyState
        ? stateItem(
            hasActiveFilter ? filteredEmptyMessage : emptyMessage,
            "is-empty",
          )
        : null}
      {hasRows ? rowContent : null}
      {hasRows && error ? stateItem(error, "is-error", "alert") : null}
      {loadingMore ? stateItem(loadingMessage, "is-loading-more") : null}
      {endOfResults && hasRows && !loadingMore
        ? stateItem(endOfResultsMessage, "is-end")
        : null}
    </ul>
  );
}
