import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import type * as React from "react";
import type { SurfaceExpression } from "@ten4seven/contracts";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { overlayGeometry, type TypographyRole } from "@ten4seven/tokens";

import {
  FloatingPortal,
  useExclusiveFloatingLayer,
  useFloatingPosition,
  useNativeDialog,
} from "./overlay";
import { updatePointerPosition } from "./utils";
import { IconButton } from "./actions";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

const nestedInteractiveSelector = [
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "label",
  "[contenteditable]:not([contenteditable='false'])",
  "[role='button']",
  "[role='checkbox']",
  "[role='combobox']",
  "[role='link']",
  "[role='menuitem']",
  "[role='option']",
  "[role='radio']",
  "[role='switch']",
  "[role='tab']",
  "[role='textbox']",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function isNestedInteractiveTarget(
  target: EventTarget | null,
  currentTarget: Element,
) {
  if (!(target instanceof Element)) return false;
  const interactiveTarget = target.closest(nestedInteractiveSelector);
  return interactiveTarget !== null && interactiveTarget !== currentTarget;
}

type InteractiveChildProps = {
  children?: ReactNode;
  contentEditable?: boolean | string;
  href?: unknown;
  onClick?: unknown;
  role?: unknown;
  tabIndex?: number | string;
};

const interactiveNativeElements = new Set([
  "button",
  "input",
  "label",
  "select",
  "summary",
  "textarea",
]);

const interactiveRoles = new Set([
  "button",
  "checkbox",
  "combobox",
  "link",
  "menuitem",
  "option",
  "radio",
  "switch",
  "tab",
  "textbox",
]);

export type ButtonIntent = "primary" | "secondary" | "quiet" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  size?: ButtonSize;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  /** Intentionally wrap a long CTA; ordinary actions stay bounded single-line. */
  wrap?: boolean;
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
      wrap = false,
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
        data-wrap={wrap || undefined}
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
        <span className="t7-button-label">{children}</span>
        {!loading && trailingIcon ? (
          <T7Icon name={trailingIcon} size={16} />
        ) : null}
      </button>
    );
  },
);

function hasDeclaredInteractiveDescendant(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement<InteractiveChildProps>(child)) return false;

    const { contentEditable, href, onClick, role, tabIndex } = child.props;
    const hasInteractiveRole =
      typeof role === "string" && interactiveRoles.has(role);
    const hasTabStop =
      typeof tabIndex === "number"
        ? tabIndex >= 0
        : tabIndex !== undefined && tabIndex !== "-1";
    const isNativeInteractive =
      typeof child.type === "string" &&
      (interactiveNativeElements.has(child.type) ||
        (child.type === "a" && href !== undefined));

    if (
      child.type === Button ||
      isNativeInteractive ||
      hasInteractiveRole ||
      hasTabStop ||
      contentEditable === true ||
      (typeof contentEditable === "string" && contentEditable !== "false") ||
      typeof onClick === "function"
    )
      return true;

    return hasDeclaredInteractiveDescendant(child.props.children);
  });
}

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

/**
 * Bounded visual emphasis for a contained surface. It intentionally leaves the
 * application canvas neutral: colour is reserved for the object that needs
 * attention, confirmation, or inversion.
 */
export type SurfaceEmphasis = SurfaceExpression;

/** Semantic object colour used only when a surface opts into emphasis. */
export type SurfaceTone =
  "neutral" | "primary" | "accent" | "success" | "warning" | "danger" | "info";

/** Opt-in series hue shared with the active Theme Studio chart colorway. */
export type SurfaceColorway = 1 | 2 | 3 | 4 | 5;

export type CardTone = "default" | "subtle" | SurfaceTone;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Opt in to elevated pointer feedback for cards that are actual actions.
   *
   * An actionable Card must not wrap controls, links, or other focusable
   * descendants. When a nested interactive descendant is detected, Card keeps
   * that descendant usable and disables its own button semantics instead of
   * creating an invalid nested-interactive tree.
   */
  /** Select an active Theme Studio chart-series hue for solid categorical emphasis. */
  colorway?: SurfaceColorway;
  /** Opt in to a bounded surface treatment; the default remains plain. */
  emphasis?: SurfaceEmphasis;
  interactive?: boolean;
  /**
   * Backwards-compatible legacy tones remain available. New semantic tones
   * take visual effect with an explicit `emphasis` treatment.
   */
  tone?: CardTone;
}

export function Card({
  children,
  className,
  colorway,
  emphasis,
  interactive,
  onClick,
  onKeyDown,
  onKeyUp,
  tone = "default",
  ...props
}: CardProps) {
  const isActionable = Boolean(onClick);
  const cardRef = useRef<HTMLElement>(null);
  const declaredInteractiveDescendant =
    hasDeclaredInteractiveDescendant(children);
  const [mountedInteractiveDescendant, setMountedInteractiveDescendant] =
    useState(false);
  const hasInteractiveDescendant =
    declaredInteractiveDescendant || mountedInteractiveDescendant;
  const canActivate = isActionable && !hasInteractiveDescendant;
  const isInteractive =
    (interactive ?? isActionable) &&
    !(isActionable && hasInteractiveDescendant);

  useLayoutEffect(() => {
    if (!isActionable) {
      setMountedInteractiveDescendant(false);
      return undefined;
    }

    const root = cardRef.current;
    if (!root) return undefined;
    const synchronizeActionability = () => {
      const nextValue = root.querySelector(nestedInteractiveSelector) !== null;
      setMountedInteractiveDescendant((currentValue) =>
        currentValue === nextValue ? currentValue : nextValue,
      );
    };

    synchronizeActionability();
    const observer = new MutationObserver(synchronizeActionability);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["contenteditable", "href", "role", "tabindex"],
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [isActionable]);

  return (
    <section
      {...props}
      ref={cardRef}
      className={cx("t7-card", className)}
      data-colorway={colorway}
      data-interactive={isInteractive ? "true" : undefined}
      data-actionable={
        isActionable ? (canActivate ? "true" : "blocked") : undefined
      }
      data-emphasis={emphasis}
      data-tone={tone}
      onClick={
        canActivate
          ? (event) => {
              if (isNestedInteractiveTarget(event.target, event.currentTarget))
                return;
              onClick(event);
            }
          : undefined
      }
      onKeyDown={
        canActivate || onKeyDown
          ? (event) => {
              onKeyDown?.(event);
              if (
                event.defaultPrevented ||
                !canActivate ||
                isNestedInteractiveTarget(event.target, event.currentTarget)
              )
                return;
              if (event.key === "Enter") {
                event.preventDefault();
                event.currentTarget.click();
              } else if (event.key === " ") {
                event.preventDefault();
              }
            }
          : undefined
      }
      onKeyUp={
        canActivate || onKeyUp
          ? (event) => {
              onKeyUp?.(event);
              if (
                event.defaultPrevented ||
                !canActivate ||
                event.key !== " " ||
                isNestedInteractiveTarget(event.target, event.currentTarget)
              )
                return;
              event.preventDefault();
              event.currentTarget.click();
            }
          : undefined
      }
      role={canActivate ? "button" : undefined}
      tabIndex={canActivate ? 0 : undefined}
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
    preferredWidth: Number.parseFloat(overlayGeometry.select.min),
    side: "bottom",
    widthStrategy: "min-trigger",
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
          aria-label={label ? undefined : props["aria-label"]}
          aria-controls={listboxId}
          aria-describedby={describedBy}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={error ? true : undefined}
          aria-labelledby={label ? labelId : props["aria-labelledby"]}
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
      {Children.map(children, (child) =>
        typeof child === "string" || typeof child === "number" ? (
          <span className="t7-badge-label">{child}</span>
        ) : (
          child
        ),
      )}
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
      <span className="t7-nav-label">{label}</span>
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
  /** Explicit text policy; interactive/action columns should use nowrap. */
  overflow?: "wrap" | "nowrap" | "ellipsis" | "clamp";
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
            rows.map((row) => {
              const key = rowKey(row);
              return (
                <tr
                  key={key}
                  data-selected={selectedSet.has(key) || undefined}
                  data-clickable={onRowClick ? "true" : undefined}
                  onClick={
                    onRowClick
                      ? (event) => {
                          if (
                            isNestedInteractiveTarget(
                              event.target,
                              event.currentTarget,
                            )
                          )
                            return;
                          onRowClick(row);
                        }
                      : undefined
                  }
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (
                            event.defaultPrevented ||
                            isNestedInteractiveTarget(
                              event.target,
                              event.currentTarget,
                            )
                          )
                            return;
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {selectable ? (
                    <td className="t7-table-checkbox-cell">
                      <input
                        aria-label={`Select ${key}`}
                        checked={selectedSet.has(key)}
                        className="t7-checkbox"
                        onChange={(event) =>
                          updateSelection(key, event.target.checked)
                        }
                        onClick={(event) => event.stopPropagation()}
                        type="checkbox"
                      />
                    </td>
                  ) : null}
                  {visibleColumns.map((column) => {
                    const content = column.render
                      ? column.render(row)
                      : String(
                          (row as Record<string, unknown>)[column.key] ?? "",
                        );
                    return (
                      <td
                        key={column.key}
                        data-align={column.align ?? "left"}
                        data-column-key={column.key}
                        data-sticky={column.sticky}
                        data-overflow={column.overflow}
                      >
                        {column.overflow ? (
                          <div className="t7-table-cell-content">{content}</div>
                        ) : (
                          content
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
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
                  onClick={
                    onRowClick
                      ? (event) => {
                          if (
                            isNestedInteractiveTarget(
                              event.target,
                              event.currentTarget,
                            )
                          )
                            return;
                          onRowClick(row);
                        }
                      : undefined
                  }
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          if (
                            event.defaultPrevented ||
                            isNestedInteractiveTarget(
                              event.target,
                              event.currentTarget,
                            )
                          )
                            return;
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
                        <div
                          className="t7-table-stacked-value"
                          data-overflow={column.overflow}
                        >
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
  /** Component-owned modal geometry; the default preserves the standard dialog. */
  size?: "sm" | "md" | "lg" | "command";
}

export function Modal({
  children,
  description,
  initialFocus,
  onClose,
  open,
  size = "md",
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
      <section className="t7-modal" data-size={size}>
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
  const [navigationOpen, setNavigationOpen] = useState(false);
  const navigationId = useId();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setNavigationOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  return (
    <div
      {...props}
      className={cx("t7-app-shell", className)}
      data-sidebar={sidebar ? "true" : undefined}
    >
      {sidebar ? <aside className="t7-app-sidebar">{sidebar}</aside> : null}
      <div className="t7-app-main">
        {sidebar || topbar ? (
          <header className="t7-app-topbar">
            {sidebar ? (
              <IconButton
                className="t7-app-mobile-menu"
                icon="menu"
                label="Open application navigation"
                aria-expanded={navigationOpen}
                aria-controls={navigationId}
                aria-haspopup="dialog"
                onClick={() => setNavigationOpen(true)}
              />
            ) : null}
            {topbar}
          </header>
        ) : null}
        <Content className="t7-app-content">{children}</Content>
      </div>
      {sidebar ? (
        <Drawer
          id={navigationId}
          className="t7-mobile-sidebar"
          title="Application navigation"
          open={navigationOpen}
          onClose={() => setNavigationOpen(false)}
          side="left"
        >
          <div
            onClick={(event) => {
              if (
                (event.target as Element).closest("a[href], button.t7-nav-item")
              )
                setNavigationOpen(false);
            }}
          >
            {sidebar}
          </div>
        </Drawer>
      ) : null}
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
  /** Optional action aligned with the label and icon. */
  action?: ReactNode;
  /** Compact historical visual, normally a canonical Sparkline. */
  chart?: ReactNode;
  /** Keep the historical cue at the base, or compose it beside the value. */
  chartPlacement?: KPIChartPlacement;
  /** Optional chart-series hue for a solid, categorical KPI surface. */
  colorway?: SurfaceColorway;
  emphasis?: SurfaceEmphasis;
  /** Optional separated supporting content or link. */
  footer?: ReactNode;
  label: string;
  value: ReactNode;
  note?: ReactNode;
  icon?: IconName;
  /** Goal or capacity cue, normally a canonical Progress component. */
  progress?: ReactNode;
  tone?: SurfaceTone;
  /** Direction and comparison context, normally a TrendIndicator. */
  trend?: ReactNode;
}

export type KPIClusterVariant = "segmented" | "cards";
export type KPIClusterOrientation = "horizontal" | "vertical";
export type KPIClusterColumns = 1 | 2 | 3 | 4 | 5;
export type KPIChartPlacement = "bottom" | "inline";

export interface KPIClusterProps extends React.HTMLAttributes<HTMLElement> {
  /** Maximum wide-layout columns. Responsive collapse remains package-owned. */
  columns?: KPIClusterColumns;
  items: KPIItem[];
  label?: string;
  orientation?: KPIClusterOrientation;
  /** Keep related metrics joined, or present them as individually bounded cards. */
  variant?: KPIClusterVariant;
}

export function KPICluster({
  className,
  columns,
  items,
  label = "Key metrics",
  orientation = "horizontal",
  style,
  variant = "segmented",
  ...props
}: KPIClusterProps) {
  const clusterId = useId();
  const resolvedColumns =
    orientation === "vertical"
      ? 1
      : (columns ??
        (Math.min(Math.max(items.length, 1), 4) as KPIClusterColumns));
  const hasVisual = items.some((item) => item.chart || item.progress);
  const hasTrend = items.some((item) => item.trend);
  return (
    <section
      {...props}
      aria-label={label}
      className={cx("t7-kpi-cluster", className)}
      data-has-trend={hasTrend ? "true" : undefined}
      data-has-visual={hasVisual ? "true" : undefined}
      data-orientation={orientation}
      data-variant={variant}
      style={
        {
          "--t7-kpi-cluster-columns": resolvedColumns,
          ...style,
        } as React.CSSProperties
      }
    >
      {items.map((item, index) => (
        <article
          aria-labelledby={`${clusterId}-${index}-label ${clusterId}-${index}-value`}
          className="t7-kpi-item"
          data-chart-placement={
            item.chart ? (item.chartPlacement ?? "bottom") : undefined
          }
          data-colorway={item.colorway}
          data-emphasis={item.emphasis}
          data-has-chart={item.chart ? "true" : undefined}
          data-has-footer={item.footer ? "true" : undefined}
          data-has-progress={item.progress ? "true" : undefined}
          data-tone={item.tone}
          key={`${item.label}-${index}`}
        >
          <dl className="t7-kpi-item-definition">
            <div className="t7-kpi-item-definition-group">
              <dt
                className="t7-kpi-item-heading"
                id={`${clusterId}-${index}-label`}
              >
                <Typography typeRole="label">{item.label}</Typography>
                {item.icon || item.action ? (
                  <div className="t7-kpi-item-heading-rail">
                    {item.icon ? (
                      <span className="t7-kpi-item-icon">
                        <T7Icon aria-hidden="true" name={item.icon} size={24} />
                      </span>
                    ) : null}
                    {item.action ? (
                      <span className="t7-kpi-item-action">{item.action}</span>
                    ) : null}
                  </div>
                ) : null}
              </dt>
              <dd className="t7-kpi-item-primary">
                <div
                  className="t7-kpi-item-value"
                  id={`${clusterId}-${index}-value`}
                >
                  <Typography as="strong" data-numeric typeRole="metric-lg">
                    {item.value}
                  </Typography>
                </div>
                {hasTrend ? (
                  <div className="t7-kpi-item-trend">{item.trend}</div>
                ) : null}
              </dd>
              {item.note ? (
                <dd className="t7-kpi-item-note">
                  <Typography as="span" typeRole="caption">
                    {item.note}
                  </Typography>
                </dd>
              ) : null}
              {item.progress ? (
                <dd className="t7-kpi-item-progress">{item.progress}</dd>
              ) : null}
              {item.chart ? (
                <dd className="t7-kpi-item-chart">{item.chart}</dd>
              ) : null}
              {item.footer ? (
                <dd className="t7-kpi-item-footer">{item.footer}</dd>
              ) : null}
            </div>
          </dl>
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
  /** Keep the bar's layout slot stable while no records are selected. */
  reserveSpace?: boolean;
}

export function BulkActionBar({
  actions,
  children,
  className,
  noun = "records",
  onClear,
  reserveSpace = false,
  selectedCount,
  ...props
}: BulkActionBarProps) {
  const active = selectedCount > 0;
  return (
    <div
      {...props}
      aria-hidden={reserveSpace && !active ? true : undefined}
      className={cx("t7-bulk-action-bar", className)}
      data-active={active || undefined}
      data-empty={reserveSpace && !active ? true : undefined}
      data-selected-count={selectedCount}
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
  id?: string;
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
  id,
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
      id={id}
      data-side={side}
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
