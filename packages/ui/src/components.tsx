import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import type * as React from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import type { TypographyRole } from "@ten4seven/tokens";

import {
  FloatingPortal,
  useExclusiveFloatingLayer,
  useFloatingPosition,
  useNativeDialog,
} from "./overlay";
import { updatePointerPosition } from "./utils";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export type ButtonIntent = "primary" | "secondary" | "quiet" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  size?: ButtonSize;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      intent = "primary",
      size = "md",
      leadingIcon,
      loading = false,
      onPointerMove,
      trailingIcon,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        className={cx("t7-button", className)}
        data-intent={intent}
        data-loading={loading || undefined}
        data-size={size}
        aria-busy={loading || undefined}
        disabled={props.disabled || loading}
        onPointerMove={(event) => {
          updatePointerPosition(
            event.currentTarget,
            event.clientX,
            event.clientY,
          );
          onPointerMove?.(event);
        }}
        type={type}
      >
        {loading ? (
          <span aria-hidden="true" className="t7-button-spinner" />
        ) : leadingIcon ? (
          <T7Icon name={leadingIcon} size={16} />
        ) : null}
        <span>{children}</span>
        {!loading && trailingIcon ? (
          <T7Icon name={trailingIcon} size={16} />
        ) : null}
      </button>
    );
  },
);

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  typeRole: TypographyRole;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "strong";
}

export function Typography({
  as = "span",
  children,
  className,
  style,
  typeRole,
  ...props
}: TypographyProps) {
  const Element = as;
  const roleVariables = {
    "--t7-type-family": `var(--t7-type-${typeRole}-family)`,
    "--t7-type-size": `var(--t7-type-${typeRole}-size)`,
    "--t7-type-line-height": `var(--t7-type-${typeRole}-line-height)`,
    "--t7-type-weight": `var(--t7-type-${typeRole}-weight)`,
    "--t7-type-tracking": `var(--t7-type-${typeRole}-tracking)`,
  } as React.CSSProperties;

  return (
    <Element
      {...props}
      className={cx("t7-typography", className)}
      data-t7-type={typeRole}
      style={{ ...roleVariables, ...style }}
    >
      {children}
    </Element>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Opt in to elevated pointer feedback for cards that are actual actions. */
  interactive?: boolean;
  tone?: "default" | "subtle" | "accent" | "success";
}

export function Card({
  children,
  className,
  interactive,
  onClick,
  tone = "default",
  ...props
}: CardProps) {
  const isInteractive = interactive ?? Boolean(onClick);
  return (
    <section
      {...props}
      className={cx("t7-card", className)}
      data-interactive={isInteractive ? "true" : undefined}
      data-tone={tone}
      onClick={onClick}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("t7-card-header", className)}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Use the page's semantic heading level without changing the card anatomy. */
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  as: Heading = "h3",
  children,
  className,
  ...props
}: CardTitleProps) {
  return (
    <Heading {...props} className={cx("t7-card-title", className)}>
      {children}
    </Heading>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cx("t7-card-description", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("t7-card-content", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("t7-card-footer", className)}>
      {children}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: IconName;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, id, label, leadingIcon, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const describedBy = error || hint ? hintId : props["aria-describedby"];

  return (
    <label className="t7-field" htmlFor={inputId}>
      {label ? <span className="t7-field-label">{label}</span> : null}
      <span className={cx("t7-input-wrap", error && "is-error")}>
        {leadingIcon ? (
          <T7Icon className="t7-input-icon" name={leadingIcon} size={17} />
        ) : null}
        <input
          {...props}
          aria-describedby={describedBy}
          aria-invalid={error ? true : props["aria-invalid"]}
          className={cx(
            "t7-input",
            leadingIcon && "has-leading-icon",
            className,
          )}
          id={inputId}
          ref={ref}
        />
      </span>
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")} id={hintId}>
          {error ?? hint}
        </span>
      ) : null}
    </label>
  );
});

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { children, className, description, indeterminate, label, ...props },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current)
        inputRef.current.indeterminate = Boolean(indeterminate);
    }, [indeterminate]);

    return (
      <label className={cx("t7-choice", "t7-checkbox-choice", className)}>
        <input
          {...props}
          aria-checked={indeterminate ? "mixed" : props["aria-checked"]}
          className="t7-choice-input"
          data-indeterminate={indeterminate || undefined}
          ref={(element) => {
            inputRef.current = element;
            if (typeof ref === "function") ref(element);
            else if (ref) ref.current = element;
          }}
          type="checkbox"
        />
        <span aria-hidden="true" className="t7-choice-control">
          <T7Icon className="t7-choice-check" name="check" size={12} />
        </span>
        {label || description || children ? (
          <span className="t7-choice-copy">
            {label ?? children}
            {description ? (
              <span className="t7-choice-description">{description}</span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, description, label, ...props },
  ref,
) {
  return (
    <label className={cx("t7-choice", "t7-radio-choice", className)}>
      <input {...props} className="t7-choice-input" ref={ref} type="radio" />
      <span aria-hidden="true" className="t7-choice-control">
        <span className="t7-choice-dot" />
      </span>
      <span className="t7-choice-copy">
        {label}
        {description ? (
          <span className="t7-choice-description">{description}</span>
        ) : null}
      </span>
    </label>
  );
});

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export function Select({
  children,
  className,
  error,
  hint,
  id,
  label,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = `${selectId}-label`;
  const listboxId = `${selectId}-listbox`;
  const hintId = `${selectId}-hint`;
  const describedBy = error || hint ? hintId : props["aria-describedby"];
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nativeRef = useRef<HTMLSelectElement>(null);
  const options = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<React.OptionHTMLAttributes<HTMLOptionElement>>(child))
      return [];
    return [
      {
        disabled: Boolean(child.props.disabled),
        label: String(child.props.children ?? child.props.value ?? ""),
        value: String(child.props.value ?? child.props.children ?? ""),
      },
    ];
  });
  const controlledValue =
    props.value === undefined ? undefined : String(props.value);
  const [internalValue, setInternalValue] = useState(
    () =>
      controlledValue ?? String(props.defaultValue ?? options[0]?.value ?? ""),
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === internalValue),
    ),
  );
  const floating = useFloatingPosition(triggerRef, open, {
    minWidth: true,
    side: "bottom",
  });
  useExclusiveFloatingLayer(open, () => setOpen(false));
  const selectedValue = controlledValue ?? internalValue;
  const selected = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        !rootRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function choose(nextValue: string) {
    if (controlledValue === undefined) setInternalValue(nextValue);
    const native = nativeRef.current;
    if (native) {
      native.value = nextValue;
      native.dispatchEvent(new Event("change", { bubbles: true }));
    }
    setOpen(false);
  }

  function move(direction: 1 | -1) {
    if (!options.length) return;
    let next = activeIndex;
    do next = (next + direction + options.length) % options.length;
    while (options[next]?.disabled && next !== activeIndex);
    setActiveIndex(next);
  }

  return (
    <div className="t7-field t7-select-field" ref={rootRef}>
      {label ? (
        <span className="t7-field-label" id={labelId}>
          {label}
        </span>
      ) : null}
      <span className="t7-select-wrap">
        <select
          {...props}
          aria-describedby={describedBy}
          aria-hidden="true"
          aria-invalid={error ? true : props["aria-invalid"]}
          className="t7-native-control"
          id={selectId}
          ref={nativeRef}
          tabIndex={-1}
        >
          {children}
        </select>
        <button
          aria-controls={listboxId}
          aria-describedby={describedBy}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={error ? true : undefined}
          aria-labelledby={label ? labelId : undefined}
          className={cx(
            "t7-input t7-select-trigger",
            error && "is-error",
            className,
          )}
          disabled={props.disabled}
          ref={triggerRef}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              move(event.key === "ArrowDown" ? 1 : -1);
            } else if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (open && options[activeIndex])
                choose(options[activeIndex].value);
              else setOpen(true);
            } else if (event.key === "Escape" && open) {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
            }
          }}
          type="button"
        >
          <span>{selected?.label ?? "Select an option"}</span>
          <T7Icon aria-hidden="true" name="chevronDown" size={16} />
        </button>
        {open ? (
          <FloatingPortal anchorRef={triggerRef}>
            <span
              className="t7-select-list t7-floating-content"
              data-floating-placement={floating.placement}
              id={listboxId}
              ref={floating.setContentRef}
              role="listbox"
              style={floating.style}
            >
              {options.map((option, index) => (
                <button
                  aria-selected={option.value === selectedValue}
                  className="t7-option-row"
                  data-active={index === activeIndex || undefined}
                  disabled={option.disabled}
                  key={option.value}
                  onClick={() => choose(option.value)}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  type="button"
                >
                  <span>{option.label}</span>
                  {option.value === selectedValue ? (
                    <T7Icon aria-hidden="true" name="check" size={15} />
                  ) : null}
                </button>
              ))}
            </span>
          </FloatingPortal>
        ) : null}
      </span>
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")} id={hintId}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  );
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "primary" | "success" | "warning" | "danger";
}

export function Badge({
  children,
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span {...props} className={cx("t7-badge", className)} data-tone={tone}>
      {children}
    </span>
  );
}

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  active?: boolean;
  label: string;
}

export function NavItem({
  active,
  className,
  icon,
  label,
  onPointerMove,
  ...props
}: NavItemProps) {
  return (
    <button
      {...props}
      className={cx("t7-nav-item", className)}
      data-active={active ? "true" : undefined}
      onPointerMove={(event) => {
        updatePointerPosition(
          event.currentTarget,
          event.clientX,
          event.clientY,
        );
        onPointerMove?.(event);
      }}
      type="button"
    >
      <T7Icon name={icon} size={18} />
      <span>{label}</span>
    </button>
  );
}

export interface DataTableColumn<Row> {
  key: string;
  header: string;
  align?: "left" | "right";
  /** A required column cannot be hidden through a visibility control. */
  required?: boolean;
  sortable?: boolean;
  sticky?: "left" | "right";
  render?: (row: Row) => ReactNode;
}

export type DataTableSortDirection = "asc" | "desc";
export type DataTableDensity = "comfortable" | "default" | "compact" | "dense";
export type DataTableResponsive = "scroll" | "stacked";

export interface DataTableSort {
  key: string;
  direction: DataTableSortDirection;
}

export interface DataTableProps<
  Row,
> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<Row>[];
  columnVisibility?: Record<string, boolean>;
  density?: DataTableDensity;
  rows: Row[];
  rowKey: (row: Row) => string;
  responsive?: DataTableResponsive;
  emptyMessage?: string;
  emptyState?: ReactNode;
  error?: ReactNode;
  loading?: boolean;
  caption?: string;
  selectable?: boolean;
  selectedRowKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  onRowClick?: (row: Row) => void;
  sort?: DataTableSort;
  onSort?: (key: string) => void;
}

export function DataTable<Row>({
  caption,
  columnVisibility,
  columns,
  density,
  emptyMessage = "No records yet.",
  emptyState,
  error,
  loading = false,
  rows,
  rowKey,
  responsive = "scroll",
  selectable = false,
  selectedRowKeys = [],
  onRowClick,
  onSelectionChange,
  onSort,
  sort,
  className,
  ...props
}: DataTableProps<Row>) {
  const visibleColumns = columns.filter(
    (column) => column.required || columnVisibility?.[column.key] !== false,
  );
  const visibleKeys = rows.map(rowKey);
  const selectedSet = new Set(selectedRowKeys);
  const allVisibleSelected =
    visibleKeys.length > 0 && visibleKeys.every((key) => selectedSet.has(key));
  const someVisibleSelected = visibleKeys.some((key) => selectedSet.has(key));
  const selectionColumnCount = selectable ? 1 : 0;

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

  return (
    <div
      {...props}
      aria-busy={loading || undefined}
      className={cx("t7-table-wrap", className)}
      data-density={density}
      data-responsive={responsive}
    >
      <table aria-label={caption} className="t7-table">
        <thead>
          <tr>
            {selectable ? (
              <th className="t7-table-checkbox-cell" scope="col">
                <input
                  aria-label="Select all records"
                  checked={allVisibleSelected}
                  className="t7-checkbox"
                  disabled={loading || rows.length === 0}
                  onChange={(event) => updateAllSelection(event.target.checked)}
                  ref={(element) => {
                    if (element)
                      element.indeterminate =
                        someVisibleSelected && !allVisibleSelected;
                  }}
                  type="checkbox"
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
                    className="t7-table-sort-button"
                    onClick={() => onSort(column.key)}
                    type="button"
                  >
                    <span>{column.header}</span>
                    <T7Icon
                      name="sort"
                      size={14}
                      data-active={sort?.key === column.key || undefined}
                    />
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                className="t7-table-state"
                colSpan={visibleColumns.length + selectionColumnCount}
              >
                <span className="t7-state-indicator" aria-hidden="true" />
                Loading records…
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                className="t7-table-state is-error"
                colSpan={visibleColumns.length + selectionColumnCount}
              >
                {error}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                className="t7-table-state"
                colSpan={visibleColumns.length + selectionColumnCount}
              >
                {emptyState ?? emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                data-selected={selectedSet.has(rowKey(row)) || undefined}
                data-clickable={onRowClick ? "true" : undefined}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {selectable ? (
                  <td className="t7-table-checkbox-cell">
                    <input
                      aria-label={`Select ${rowKey(row)}`}
                      checked={selectedSet.has(rowKey(row))}
                      className="t7-checkbox"
                      onChange={(event) =>
                        updateSelection(rowKey(row), event.target.checked)
                      }
                      onClick={(event) => event.stopPropagation()}
                      type="checkbox"
                    />
                  </td>
                ) : null}
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    data-align={column.align ?? "left"}
                    data-column-key={column.key}
                    data-sticky={column.sticky}
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                          (row as Record<string, unknown>)[column.key] ?? "",
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {responsive === "stacked" ? (
        <div aria-label={caption} className="t7-table-stacked" role="list">
          {selectable ? (
            <div className="t7-table-stacked-select-all">
              <input
                aria-label="Select all records"
                checked={allVisibleSelected}
                className="t7-checkbox"
                disabled={loading || rows.length === 0}
                onChange={(event) => updateAllSelection(event.target.checked)}
                ref={(element) => {
                  if (element)
                    element.indeterminate =
                      someVisibleSelected && !allVisibleSelected;
                }}
                type="checkbox"
              />
              <span>Select all records</span>
            </div>
          ) : null}
          {loading ? (
            <div className="t7-table-stacked-state">
              <span className="t7-state-indicator" aria-hidden="true" />
              Loading records…
            </div>
          ) : error ? (
            <div className="t7-table-stacked-state is-error">{error}</div>
          ) : rows.length === 0 ? (
            <div className="t7-table-stacked-state">
              {emptyState ?? emptyMessage}
            </div>
          ) : (
            rows.map((row) => {
              const key = rowKey(row);
              return (
                <article
                  key={key}
                  className="t7-table-stacked-row"
                  data-clickable={onRowClick ? "true" : undefined}
                  data-selected={selectedSet.has(key) || undefined}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                  role="listitem"
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {selectable ? (
                    <input
                      aria-label={`Select ${key}`}
                      checked={selectedSet.has(key)}
                      className="t7-checkbox t7-table-stacked-checkbox"
                      onChange={(event) =>
                        updateSelection(key, event.target.checked)
                      }
                      onClick={(event) => event.stopPropagation()}
                      type="checkbox"
                    />
                  ) : null}
                  <div className="t7-table-stacked-fields">
                    {visibleColumns.map((column) => (
                      <div
                        key={column.key}
                        className="t7-table-stacked-field"
                        data-align={column.align ?? "left"}
                        data-column-key={column.key}
                      >
                        <span className="t7-table-stacked-label">
                          {column.header}
                        </span>
                        <div className="t7-table-stacked-value">
                          {column.render
                            ? column.render(row)
                            : String(
                                (row as Record<string, unknown>)[column.key] ??
                                  "",
                              )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
}

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  initialFocus?: React.RefObject<HTMLElement | null>;
}

export function Modal({
  children,
  description,
  initialFocus,
  onClose,
  open,
  title,
}: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = `${titleId}-description`;
  const dialogRef = useNativeDialog(open, onClose, initialFocus ?? closeRef);

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className="t7-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
    >
      <section className="t7-modal">
        <div className="t7-modal-header">
          <div>
            <h2 className="t7-modal-title" id={titleId}>
              {title}
            </h2>
            {description ? (
              <p className="t7-modal-description" id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            aria-label="Close dialog"
            className="t7-icon-button"
            onClick={onClose}
            type="button"
          >
            <T7Icon name="close" size={18} />
          </button>
        </div>
        <div className="t7-modal-body">{children}</div>
      </section>
    </dialog>
  );
}

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * App Shell owns the document main landmark by default. Embedded previews can
   * opt into a neutral content wrapper so a catalog page never nests landmarks.
   */
  contentAs?: "div" | "main";
  sidebar?: ReactNode;
  topbar?: ReactNode;
}

export function AppShell({
  children,
  className,
  contentAs: Content = "main",
  sidebar,
  topbar,
  ...props
}: AppShellProps) {
  return (
    <div
      {...props}
      className={cx("t7-app-shell", className)}
      data-sidebar={sidebar ? "true" : undefined}
    >
      {sidebar ? <aside className="t7-app-sidebar">{sidebar}</aside> : null}
      <div className="t7-app-main">
        {topbar ? <header className="t7-app-topbar">{topbar}</header> : null}
        <Content className="t7-app-content">{children}</Content>
      </div>
    </div>
  );
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: IconName;
  badge?: ReactNode;
}

export interface SidebarGroupData {
  key: string;
  label?: ReactNode;
  items: SidebarItem[];
}

export interface SidebarGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  activeKey?: string;
  items: SidebarItem[];
  label?: ReactNode;
  onSelect?: (key: string) => void;
}

/** A labelled navigation group; combine with Collapsible when groups are long. */
export function SidebarGroup({
  activeKey,
  className,
  items,
  label,
  onSelect,
  ...props
}: SidebarGroupProps) {
  return (
    <div {...props} className={cx("t7-sidebar-group", className)}>
      {label ? <span className="t7-sidebar-group-label">{label}</span> : null}
      <div className="t7-sidebar-group-items">
        {items.map((item) => (
          <div className="t7-sidebar-item" key={item.key}>
            <NavItem
              active={activeKey === item.key}
              icon={item.icon}
              label={item.label}
              onClick={() => onSelect?.(item.key)}
            />
            {item.badge ? (
              <span className="t7-sidebar-badge">{item.badge}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface SidebarProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onSelect"
> {
  brand?: ReactNode;
  groups?: SidebarGroupData[];
  items?: SidebarItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
  footer?: ReactNode;
  label?: string;
}

export function Sidebar({
  activeKey,
  brand,
  className,
  footer,
  groups,
  items,
  label = "Application navigation",
  onSelect,
  ...props
}: SidebarProps) {
  return (
    <div {...props} className={cx("t7-sidebar", className)}>
      {brand ? <div className="t7-sidebar-brand">{brand}</div> : null}
      <nav
        aria-label={label}
        className={cx(
          "t7-sidebar-nav",
          Boolean(groups?.length) && "has-groups",
        )}
      >
        {groups?.length ? (
          groups.map((group) => (
            <SidebarGroup
              activeKey={activeKey}
              items={group.items}
              key={group.key}
              label={group.label}
              onSelect={onSelect}
            />
          ))
        ) : (
          <SidebarGroup
            activeKey={activeKey}
            items={items ?? []}
            onSelect={onSelect}
          />
        )}
      </nav>
      {footer ? <div className="t7-sidebar-footer">{footer}</div> : null}
    </div>
  );
}

export interface PageHeaderProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  overline?: ReactNode;
  breadcrumbs?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({
  actions,
  breadcrumbs,
  children,
  className,
  description,
  meta,
  overline,
  title,
  ...props
}: PageHeaderProps) {
  return (
    <section {...props} className={cx("t7-page-header", className)}>
      <div className="t7-page-header-copy">
        {breadcrumbs ? (
          <div className="t7-page-header-breadcrumbs">{breadcrumbs}</div>
        ) : null}
        {overline ? (
          <span className="t7-page-header-overline">{overline}</span>
        ) : null}
        <Typography as="h1" typeRole="display-lg">
          {title}
        </Typography>
        {description ? (
          <Typography
            as="p"
            className="t7-page-header-description"
            typeRole="body"
          >
            {description}
          </Typography>
        ) : null}
        {meta ? <div className="t7-page-header-meta">{meta}</div> : null}
        {children}
      </div>
      {actions ? <div className="t7-page-header-actions">{actions}</div> : null}
    </section>
  );
}

export interface KPIItem {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: IconName;
  tone?: BadgeProps["tone"];
}

export interface KPIClusterProps extends React.HTMLAttributes<HTMLElement> {
  items: KPIItem[];
  label?: string;
}

export function KPICluster({
  className,
  items,
  label = "Key metrics",
  ...props
}: KPIClusterProps) {
  return (
    <section
      {...props}
      aria-label={label}
      className={cx("t7-kpi-cluster", className)}
    >
      {items.map((item) => (
        <article className="t7-kpi-item" data-tone={item.tone} key={item.label}>
          <div className="t7-kpi-item-heading">
            <Typography typeRole="label">{item.label}</Typography>
            {item.icon ? <T7Icon name={item.icon} size={17} /> : null}
          </div>
          <Typography as="strong" data-numeric typeRole="metric-md">
            {item.value}
          </Typography>
          {item.note ? (
            <Typography
              as="span"
              className="t7-kpi-item-note"
              typeRole="caption"
            >
              {item.note}
            </Typography>
          ) : null}
        </article>
      ))}
    </section>
  );
}

export interface FilterToolbarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
}

export function FilterToolbar({
  actions,
  children,
  className,
  summary,
  title,
  ...props
}: FilterToolbarProps) {
  return (
    <div
      {...props}
      aria-label="List filters"
      className={cx("t7-filter-toolbar", className)}
      role="region"
    >
      <div className="t7-filter-toolbar-main">
        {title || summary ? (
          <div className="t7-filter-toolbar-heading">
            {title ? <Typography typeRole="label">{title}</Typography> : null}
            {summary ? (
              <Typography typeRole="caption">{summary}</Typography>
            ) : null}
          </div>
        ) : null}
        <div className="t7-filter-toolbar-controls">{children}</div>
      </div>
      {actions ? (
        <div className="t7-filter-toolbar-actions">{actions}</div>
      ) : null}
    </div>
  );
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  label?: string;
}

export function Pagination({
  className,
  label = "Pagination",
  onPageChange,
  page,
  pageSize,
  total,
  ...props
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-pagination", className)}
    >
      <Typography typeRole="caption">
        {total === 0 ? "No records" : `Showing ${start}–${end} of ${total}`}
      </Typography>
      <div className="t7-pagination-controls">
        <Button
          aria-label="Previous page"
          disabled={page <= 1}
          intent="quiet"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          size="sm"
          leadingIcon="arrowLeft"
        >
          Previous
        </Button>
        <Typography aria-live="polite" typeRole="caption">
          Page {Math.min(page, pageCount)} of {pageCount}
        </Typography>
        <Button
          aria-label="Next page"
          disabled={page >= pageCount}
          intent="quiet"
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          size="sm"
          trailingIcon="arrowRight"
        >
          Next
        </Button>
      </div>
    </nav>
  );
}

export interface BulkActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedCount: number;
  noun?: string;
  onClear: () => void;
  actions?: ReactNode;
}

export function BulkActionBar({
  actions,
  children,
  className,
  noun = "records",
  onClear,
  selectedCount,
  ...props
}: BulkActionBarProps) {
  return (
    <div
      {...props}
      className={cx("t7-bulk-action-bar", className)}
      role="status"
    >
      <div className="t7-bulk-action-summary">
        <T7Icon name="check" size={16} />
        <Typography typeRole="label">
          {selectedCount} {noun} selected
        </Typography>
      </div>
      <div className="t7-bulk-action-actions">
        {actions ?? children}
        <Button intent="quiet" onClick={onClear} size="sm" leadingIcon="clear">
          Clear
        </Button>
      </div>
    </div>
  );
}

export interface DrawerProps {
  className?: string;
  closeLabel?: string;
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  side?: "left" | "right";
  initialFocus?: React.RefObject<HTMLElement | null>;
}

/** Generic modal side surface; specialized drawers should compose this contract. */
export function Drawer({
  className,
  children,
  closeLabel = "Close drawer",
  description,
  initialFocus,
  onClose,
  open,
  side = "right",
  title,
}: DrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = `${titleId}-description`;
  const dialogRef = useNativeDialog(open, onClose, initialFocus ?? closeRef);

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className="t7-drawer-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onClose();
        }
      }}
    >
      <aside className={cx("t7-drawer", className)} data-side={side}>
        <div className="t7-drawer-header">
          <div>
            <Typography as="h2" typeRole="heading-lg" id={titleId}>
              {title}
            </Typography>
            {description ? (
              <Typography
                as="p"
                className="t7-drawer-description"
                id={descriptionId}
                typeRole="body-sm"
              >
                {description}
              </Typography>
            ) : null}
          </div>
          <button
            ref={closeRef}
            aria-label={closeLabel}
            className="t7-icon-button"
            onClick={onClose}
            type="button"
          >
            <T7Icon name="close" size={18} />
          </button>
        </div>
        <div className="t7-drawer-body">{children}</div>
      </aside>
    </dialog>
  );
}

export interface DetailDrawerProps extends DrawerProps {}

/** Record-focused composition over the generic Drawer contract. */
export function DetailDrawer(props: DetailDrawerProps) {
  return (
    <Drawer {...props} closeLabel={props.closeLabel ?? "Close detail drawer"} />
  );
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: IconName;
  action?: ReactNode;
}

export function EmptyState({
  action,
  className,
  description,
  icon = "inventory",
  title,
  ...props
}: EmptyStateProps) {
  return (
    <div {...props} className={cx("t7-empty-state", className)}>
      <span className="t7-empty-state-icon">
        <T7Icon name={icon} size={22} />
      </span>
      <Typography as="strong" typeRole="heading-sm">
        {title}
      </Typography>
      {description ? (
        <Typography as="p" typeRole="body-sm">
          {description}
        </Typography>
      ) : null}
      {action ? <div className="t7-empty-state-action">{action}</div> : null}
    </div>
  );
}

export interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  eyebrow?: ReactNode;
  meta?: ReactNode;
  media?: ReactNode;
  badge?: ReactNode;
  price?: ReactNode;
  details?: ReactNode;
  actions?: ReactNode;
}

export function ProductCard({
  actions,
  badge,
  className,
  details,
  eyebrow,
  media,
  meta,
  price,
  title,
  ...props
}: ProductCardProps) {
  return (
    <article {...props} className={cx("t7-product-card", className)}>
      <div className="t7-product-media">
        {media ?? <T7Icon name="package" size={28} />}
        {badge ? <div className="t7-product-badge">{badge}</div> : null}
      </div>
      <div className="t7-product-content">
        {eyebrow ? (
          <Typography typeRole="overline">{eyebrow}</Typography>
        ) : null}
        <Typography as="h2" typeRole="card-title">
          {title}
        </Typography>
        {meta ? (
          <Typography as="div" className="t7-product-meta" typeRole="body-sm">
            {meta}
          </Typography>
        ) : null}
        {details ? <div className="t7-product-details">{details}</div> : null}
        {price ? <div className="t7-product-price">{price}</div> : null}
        {actions ? <div className="t7-product-actions">{actions}</div> : null}
      </div>
    </article>
  );
}
