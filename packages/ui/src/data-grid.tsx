import {
  useRef,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { T7Icon } from "@ten4seven/icons";

import { IconButton } from "./actions";
import {
  Checkbox,
  Input,
  Select,
  type DataTableColumn,
  type DataTableDensity,
  type DataTableSort,
} from "./components";
import { CurrencyInput, NumberInput } from "./forms";
import { cx } from "./utils";

/** A semantic option for a bounded inline select editor. */
export interface AdvancedDataGridSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface AdvancedDataGridEditorBase {
  disabled?: boolean;
}

export type AdvancedDataGridEditor =
  | (AdvancedDataGridEditorBase & {
      type: "text";
      placeholder?: string;
      inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
    })
  | (AdvancedDataGridEditorBase & {
      type: "number";
      min?: number;
      max?: number;
      step?: number;
    })
  | (AdvancedDataGridEditorBase & {
      type: "currency";
      currency?: string;
      min?: number;
      max?: number;
      step?: number;
    })
  | (AdvancedDataGridEditorBase & {
      type: "select";
      options: AdvancedDataGridSelectOption[];
    });

export interface AdvancedDataGridColumn<Row> extends DataTableColumn<Row> {
  /** Optional controlled editor. The consumer remains the value authority. */
  editor?: AdvancedDataGridEditor;
  /** Reads the editor value when a row is not a simple record of strings. */
  getValue?: (row: Row) => string | number | null | undefined;
}

export type AdvancedDataGridRowState =
  "clean" | "dirty" | "saving" | "saved" | "error";

export interface AdvancedDataGridProps<
  Row,
> extends HTMLAttributes<HTMLDivElement> {
  /** Stable accessible name for the native table. */
  caption: string;
  columns: AdvancedDataGridColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  rowLabel?: (row: Row) => string;
  columnVisibility?: Record<string, boolean>;
  density?: DataTableDensity;
  loading?: boolean;
  error?: ReactNode;
  emptyMessage?: string;
  selectable?: boolean;
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sort?: DataTableSort;
  onSort?: (key: string) => void;
  /** Receives the opaque editor value; validation and persistence stay outside. */
  onCellChange?: (rowKey: string, columnKey: string, value: string) => void;
  rowState?: Record<string, AdvancedDataGridRowState>;
  cellErrors?: Record<string, Record<string, string | undefined>>;
  onRowSave?: (row: Row) => void;
  onRowCancel?: (row: Row) => void;
  /** Consumer-owned summary, pagination, or batch-action region. */
  footer?: ReactNode;
}

const rowStateLabels: Record<AdvancedDataGridRowState, string> = {
  clean: "Ready",
  dirty: "Unsaved changes",
  saving: "Saving",
  saved: "Saved",
  error: "Needs attention",
};

function valueFor<Row>(row: Row, column: AdvancedDataGridColumn<Row>) {
  const value = column.getValue
    ? column.getValue(row)
    : (row as Record<string, unknown>)[column.key];
  return value === null || value === undefined ? "" : String(value);
}

function isCaretAtBoundary(
  target: EventTarget | null,
  direction: "start" | "end",
) {
  if (!(target instanceof HTMLInputElement)) return true;
  if (target.selectionStart === null || target.selectionEnd === null)
    return true;
  return direction === "start"
    ? target.selectionStart === 0 && target.selectionEnd === 0
    : target.selectionStart === target.value.length &&
        target.selectionEnd === target.value.length;
}

/**
 * A bounded editable table for repeated operational line items. It deliberately
 * stops at cell editing, row state presentation, and keyboard traversal; the
 * consumer owns business validation, persistence, permissions, totals, and
 * large-data architecture.
 */
export function AdvancedDataGrid<Row>({
  caption,
  cellErrors,
  className,
  columnVisibility,
  columns,
  density,
  emptyMessage = "No records yet.",
  error,
  footer,
  loading = false,
  onCellChange,
  onRowCancel,
  onRowSave,
  onSelectionChange,
  onSort,
  rowKey,
  rowLabel,
  rowState,
  rows,
  selectable = false,
  selectedRowKeys = [],
  sort,
  ...props
}: AdvancedDataGridProps<Row>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleColumns = columns.filter(
    (column) => column.required || columnVisibility?.[column.key] !== false,
  );
  const editableColumns = visibleColumns.filter((column) =>
    Boolean(column.editor && onCellChange),
  );
  const selectedSet = new Set(selectedRowKeys);
  const visibleKeys = rows.map(rowKey);
  const allVisibleSelected =
    visibleKeys.length > 0 && visibleKeys.every((key) => selectedSet.has(key));
  const someVisibleSelected = visibleKeys.some((key) => selectedSet.has(key));
  const hasRowActions = Boolean(onRowSave || onRowCancel);
  const hasRowState = rowState !== undefined;
  const columnCount =
    visibleColumns.length +
    (selectable ? 1 : 0) +
    (hasRowState ? 1 : 0) +
    (hasRowActions ? 1 : 0);

  function updateSelection(key: string, checked: boolean) {
    if (!onSelectionChange) return;
    const next = new Set(selectedRowKeys);
    if (checked) next.add(key);
    else next.delete(key);
    onSelectionChange([...next]);
  }

  function updateAllSelection(checked: boolean) {
    if (!onSelectionChange) return;
    if (!checked) {
      onSelectionChange(
        selectedRowKeys.filter((key) => !visibleKeys.includes(key)),
      );
      return;
    }
    onSelectionChange([...new Set([...selectedRowKeys, ...visibleKeys])]);
  }

  function focusEditor(index: number) {
    const wrapper = rootRef.current?.querySelector<HTMLElement>(
      `[data-t7-advanced-grid-editor-index="${index}"]`,
    );
    const target = wrapper?.querySelector<HTMLElement>(
      'input, button, select, [tabindex="0"]',
    );
    target?.focus();
  }

  function handleEditorKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    rowIndex: number,
    editorColumnIndex: number,
    row: Row,
  ) {
    if (event.defaultPrevented) return;

    const target = event.target;
    if (event.key === "ArrowLeft" && !isCaretAtBoundary(target, "start"))
      return;
    if (event.key === "ArrowRight" && !isCaretAtBoundary(target, "end")) return;

    const rowEditorCount = editableColumns.length;
    if (!rowEditorCount) return;
    const currentIndex = rowIndex * rowEditorCount + editorColumnIndex;
    let nextIndex: number | undefined;

    if (event.key === "ArrowLeft" && editorColumnIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (
      event.key === "ArrowRight" &&
      editorColumnIndex < rowEditorCount - 1
    ) {
      nextIndex = currentIndex + 1;
    } else if (event.key === "ArrowUp" && rowIndex > 0) {
      nextIndex = currentIndex - rowEditorCount;
    } else if (event.key === "ArrowDown" && rowIndex < rows.length - 1) {
      nextIndex = currentIndex + rowEditorCount;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      focusEditor(nextIndex);
      return;
    }
    if (event.key === "Escape") {
      if (onRowCancel) {
        event.preventDefault();
        onRowCancel(row);
      }
      return;
    }
    if (
      event.key === "Enter" &&
      (event.ctrlKey || event.metaKey) &&
      onRowSave
    ) {
      event.preventDefault();
      onRowSave(row);
    }
  }

  function renderEditor(
    row: Row,
    rowKeyValue: string,
    column: AdvancedDataGridColumn<Row>,
    cellError: string | undefined,
    editorIndex: number,
  ) {
    const editor = column.editor;
    if (!editor || !onCellChange) return null;
    const value = valueFor(row, column);
    const label = `${column.header}, ${rowLabel?.(row) ?? rowKeyValue}`;
    const onChange = (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => onCellChange(rowKeyValue, column.key, event.target.value);
    const common = {
      "aria-label": label,
      disabled: editor.disabled,
      error: cellError,
      id: `advanced-grid-${rowKeyValue}-${column.key}`,
      value,
    };

    return (
      <div
        className="t7-advanced-data-grid-editor"
        data-editor-kind={editor.type}
        data-t7-advanced-grid-editor-index={editorIndex}
      >
        {editor.type === "text" ? (
          <Input
            {...common}
            hint=""
            inputMode={editor.inputMode}
            onChange={onChange}
            placeholder={editor.placeholder}
          />
        ) : editor.type === "number" ? (
          <NumberInput
            {...common}
            hint=""
            max={editor.max}
            min={editor.min}
            onChange={onChange}
            step={editor.step}
          />
        ) : editor.type === "currency" ? (
          <CurrencyInput
            {...common}
            currency={editor.currency}
            hint=""
            max={editor.max}
            min={editor.min}
            onChange={onChange}
            step={editor.step}
          />
        ) : (
          <Select {...common} onChange={onChange}>
            {editor.options.map((option) => (
              <option
                disabled={option.disabled}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </div>
    );
  }

  return (
    <div
      {...props}
      aria-busy={loading || undefined}
      className={cx("t7-advanced-data-grid", className)}
      data-density={density}
      ref={rootRef}
    >
      <div className="t7-advanced-data-grid-scroll">
        <table className="t7-advanced-data-grid-table">
          <caption className="t7-visually-hidden">{caption}</caption>
          <thead>
            <tr>
              {selectable ? (
                <th className="t7-advanced-data-grid-checkbox-cell" scope="col">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allVisibleSelected}
                    disabled={loading || rows.length === 0}
                    indeterminate={someVisibleSelected && !allVisibleSelected}
                    onChange={(event) =>
                      updateAllSelection(event.target.checked)
                    }
                  />
                </th>
              ) : null}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  aria-sort={
                    sort?.key === column.key
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : column.sortable
                        ? "none"
                        : undefined
                  }
                  data-align={column.align ?? "left"}
                  data-column-key={column.key}
                  data-sticky={column.sticky}
                  scope="col"
                >
                  {column.sortable && onSort ? (
                    <button
                      aria-label={`Sort by ${column.header}`}
                      className="t7-table-sort-button"
                      onClick={() => onSort(column.key)}
                      type="button"
                    >
                      <span>{column.header}</span>
                      <T7Icon
                        aria-hidden="true"
                        data-active={sort?.key === column.key || undefined}
                        name="sort"
                        size={14}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {hasRowState ? (
                <th data-column-key="row-state" scope="col">
                  Row state
                </th>
              ) : null}
              {hasRowActions ? (
                <th
                  data-column-key="row-actions"
                  data-sticky="right"
                  scope="col"
                >
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  aria-live="polite"
                  className="t7-advanced-data-grid-state"
                  colSpan={columnCount}
                >
                  <span aria-hidden="true" className="t7-state-indicator" />
                  Loading records…
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  aria-live="assertive"
                  className="t7-advanced-data-grid-state is-error"
                  colSpan={columnCount}
                  role="alert"
                >
                  {error}
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  aria-live="polite"
                  className="t7-advanced-data-grid-state"
                  colSpan={columnCount}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
                const key = rowKey(row);
                const label = rowLabel?.(row) ?? key;
                const state = rowState?.[key] ?? "clean";
                const rowErrors = cellErrors?.[key];
                return (
                  <tr
                    data-row-state={state}
                    data-selected={selectedSet.has(key) || undefined}
                    key={key}
                  >
                    {selectable ? (
                      <td className="t7-advanced-data-grid-checkbox-cell">
                        <Checkbox
                          aria-label={`Select ${label}`}
                          checked={selectedSet.has(key)}
                          onChange={(event) =>
                            updateSelection(key, event.target.checked)
                          }
                        />
                      </td>
                    ) : null}
                    {visibleColumns.map((column) => {
                      const editorColumnIndex = editableColumns.findIndex(
                        (item) => item.key === column.key,
                      );
                      const editorIndex =
                        editorColumnIndex < 0
                          ? -1
                          : rowIndex * editableColumns.length +
                            editorColumnIndex;
                      const cellError = rowErrors?.[column.key];
                      const content = column.render
                        ? column.render(row)
                        : valueFor(row, column);
                      return (
                        <td
                          data-align={column.align ?? "left"}
                          data-column-key={column.key}
                          data-overflow={column.overflow}
                          data-sticky={column.sticky}
                          key={column.key}
                          onKeyDown={
                            editorColumnIndex >= 0
                              ? (event) =>
                                  handleEditorKeyDown(
                                    event,
                                    rowIndex,
                                    editorColumnIndex,
                                    row,
                                  )
                              : undefined
                          }
                        >
                          {editorColumnIndex >= 0 ? (
                            renderEditor(
                              row,
                              key,
                              column,
                              cellError,
                              editorIndex,
                            )
                          ) : column.overflow ? (
                            <div className="t7-table-cell-content">
                              {content}
                            </div>
                          ) : (
                            content
                          )}
                          {editorColumnIndex < 0 && cellError ? (
                            <span className="t7-advanced-data-grid-cell-error">
                              {cellError}
                            </span>
                          ) : null}
                        </td>
                      );
                    })}
                    {hasRowState ? (
                      <td data-column-key="row-state">
                        <span
                          className="t7-advanced-data-grid-row-state"
                          data-state={state}
                        >
                          {rowStateLabels[state]}
                        </span>
                      </td>
                    ) : null}
                    {hasRowActions ? (
                      <td
                        className="t7-advanced-data-grid-actions"
                        data-column-key="row-actions"
                        data-sticky="right"
                      >
                        {onRowSave ? (
                          <IconButton
                            disabled={state === "saving"}
                            icon="check"
                            label={`Save ${label}`}
                            loading={state === "saving"}
                            onClick={() => onRowSave(row)}
                            size="sm"
                          />
                        ) : null}
                        {onRowCancel ? (
                          <IconButton
                            disabled={state === "saving"}
                            icon="close"
                            label={`Cancel ${label}`}
                            onClick={() => onRowCancel(row)}
                            size="sm"
                          />
                        ) : null}
                      </td>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {footer ? (
        <div className="t7-advanced-data-grid-footer">{footer}</div>
      ) : null}
    </div>
  );
}
