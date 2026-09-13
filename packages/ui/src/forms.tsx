import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type CSSProperties,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import type { MeasureIntent } from "@ten4seven/contracts";
import { overlayGeometry } from "@ten4seven/tokens";

import { IconButton } from "./actions";
import {
  Button,
  Input,
  type CheckboxProps,
  type InputProps,
  type RadioProps,
  type SelectProps,
} from "./components";
import {
  FloatingPortal,
  useExclusiveFloatingLayer,
  useFloatingPosition,
} from "./overlay";
import { cx } from "./utils";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  optional?: boolean;
  required?: boolean;
}

export function Label({
  children,
  className,
  optional,
  required,
  ...props
}: LabelProps) {
  return (
    <label {...props} className={cx("t7-label", className)}>
      <span>{children}</span>
      {required ? <span aria-hidden="true">*</span> : null}
      {optional ? <span className="t7-label-optional">Optional</span> : null}
    </label>
  );
}

export function FieldDescription({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cx("t7-field-description", className)}>
      {children}
    </p>
  );
}

export function FieldError({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p {...props} className={cx("t7-field-error", className)} role="alert">
      {children}
    </p>
  );
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  htmlFor?: string;
  label?: ReactNode;
  optional?: boolean;
  required?: boolean;
}

/**
 * Field provides labelled anatomy for compound or native controls. The
 * existing Input/Select components remain self-labelling for simple fields.
 */
export function Field({
  children,
  className,
  description,
  error,
  htmlFor,
  label,
  optional,
  required,
  ...props
}: FieldProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div
      {...props}
      className={cx("t7-field-container", className)}
      data-invalid={Boolean(error) || undefined}
    >
      {label ? (
        <Label htmlFor={htmlFor} optional={optional} required={required}>
          {label}
        </Label>
      ) : null}
      {children}
      {description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

export interface FieldGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  description?: ReactNode;
  error?: ReactNode;
  legend: ReactNode;
}

export function FieldGroup({
  children,
  className,
  description,
  error,
  legend,
  ...props
}: FieldGroupProps) {
  return (
    <fieldset
      {...props}
      className={cx("t7-field-group", className)}
      data-invalid={Boolean(error) || undefined}
    >
      <legend>{legend}</legend>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <div className="t7-field-group-content">{children}</div>
      {error ? <FieldError>{error}</FieldError> : null}
    </fieldset>
  );
}

export interface FormSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function FormSection({
  action,
  children,
  className,
  description,
  title,
  ...props
}: FormSectionProps) {
  return (
    <section {...props} className={cx("t7-form-section", className)}>
      <header className="t7-form-section-header">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </header>
      <div className="t7-form-section-content">{children}</div>
    </section>
  );
}

export interface FormGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
}

export function FormGrid({
  children,
  className,
  columns = 2,
  ...props
}: FormGridProps) {
  return (
    <div
      {...props}
      className={cx("t7-form-grid", className)}
      data-columns={columns}
    >
      {children}
    </div>
  );
}

export function FormActions({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("t7-form-actions", className)}>
      {children}
    </div>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  hint?: string;
  label?: string;
  measure?: MeasureIntent;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, error, hint, id, label, measure, ...props },
    ref,
  ) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helpId = `${textareaId}-hint`;
    const describedBy = error || hint ? helpId : props["aria-describedby"];
    return (
      <label
        className="t7-field"
        data-t7-measure={measure}
        htmlFor={textareaId}
      >
        {label ? <span className="t7-field-label">{label}</span> : null}
        <textarea
          {...props}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={error ? true : props["aria-invalid"]}
          className={cx("t7-textarea", className)}
          id={textareaId}
        />
        {error || hint ? (
          <span
            className={cx("t7-field-hint", error && "is-error")}
            id={helpId}
          >
            {error ?? hint}
          </span>
        ) : null}
      </label>
    );
  },
);

export function SearchInput({
  leadingIcon = "search",
  type,
  ...props
}: InputProps) {
  return <Input {...props} leadingIcon={leadingIcon} type={type ?? "search"} />;
}

export interface PasswordInputProps extends Omit<
  InputProps,
  "type" | "leadingIcon"
> {
  revealLabel?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      error,
      hint,
      id,
      label,
      revealLabel = "Show password",
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helpId = `${inputId}-hint`;
    const [visible, setVisible] = useState(false);
    const describedBy =
      [props["aria-describedby"], error || hint ? helpId : undefined]
        .filter(Boolean)
        .join(" ") || undefined;
    return (
      <div className="t7-field">
        {label ? (
          <label className="t7-field-label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <span className={cx("t7-input-wrap", error && "is-error")}>
          <input
            {...props}
            ref={ref}
            aria-describedby={describedBy}
            aria-invalid={error ? true : props["aria-invalid"]}
            className={cx("t7-input", "t7-password-input", className)}
            id={inputId}
            type={visible ? "text" : "password"}
          />
          <button
            aria-label={visible ? "Hide password" : revealLabel}
            aria-pressed={visible}
            className="t7-input-action"
            onClick={(event) => {
              event.preventDefault();
              setVisible((current) => !current);
            }}
            type="button"
          >
            <T7Icon
              aria-hidden="true"
              name={visible ? "eyeOff" : "eye"}
              size={16}
            />
          </button>
        </span>
        {error || hint ? (
          <span
            className={cx("t7-field-hint", error && "is-error")}
            id={helpId}
          >
            {error ?? hint}
          </span>
        ) : null}
      </div>
    );
  },
);

export interface NumberInputProps extends Omit<InputProps, "type"> {
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
}

export function NumberInput({
  inputMode = "decimal",
  ...props
}: NumberInputProps) {
  return <Input {...props} inputMode={inputMode} type="number" />;
}

export interface CurrencyInputProps extends NumberInputProps {
  currency?: string;
}

export function CurrencyInput({
  currency = "IDR",
  hint,
  ...props
}: CurrencyInputProps) {
  return (
    <Input
      {...props}
      data-input-kind="currency"
      hint={hint ?? `Nilai dalam ${currency}`}
      inputMode="decimal"
      type="number"
    />
  );
}

export function PercentInput({ hint, ...props }: NumberInputProps) {
  return (
    <Input
      {...props}
      data-input-kind="percent"
      hint={hint ?? "Masukkan persentase tanpa simbol %"}
      inputMode="decimal"
      type="number"
    />
  );
}

export const NativeSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function NativeSelect({ className, children, ...props }, ref) {
  return (
    <select
      {...props}
      ref={ref}
      className={cx("t7-input", "t7-select", className)}
    >
      {children}
    </select>
  );
});

export interface CheckboxGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  description?: ReactNode;
  error?: ReactNode;
  legend: ReactNode;
}

export function CheckboxGroup({
  children,
  className,
  description,
  error,
  legend,
  ...props
}: CheckboxGroupProps) {
  return (
    <fieldset {...props} className={cx("t7-choice-group", className)}>
      <legend>{legend}</legend>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      <div>{children}</div>
      {error ? <FieldError>{error}</FieldError> : null}
    </fieldset>
  );
}

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  description?: ReactNode;
  error?: ReactNode;
  legend: ReactNode;
}

export const RadioGroup = CheckboxGroup as (
  props: RadioGroupProps & { children: ReactNode },
) => ReactElement;

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  description?: ReactNode;
  label: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, description, label, ...props },
  ref,
) {
  return (
    <label className={cx("t7-switch", className)}>
      <input {...props} ref={ref} className="t7-switch-input" type="checkbox" />
      <span aria-hidden="true" className="t7-switch-track">
        <span className="t7-switch-thumb" />
      </span>
      <span className="t7-switch-copy">
        <span>{label}</span>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
});

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  hint?: string;
  label?: string;
  valueLabel?: ReactNode;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, hint, id, label, valueLabel, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label className="t7-field" htmlFor={inputId}>
      {label ? (
        <span className="t7-field-label">
          <span>{label}</span>
          {valueLabel ? <span>{valueLabel}</span> : null}
        </span>
      ) : null}
      <input
        {...props}
        ref={ref}
        className={cx("t7-slider", className)}
        id={inputId}
        type="range"
      />
      {hint ? <span className="t7-field-hint">{hint}</span> : null}
    </label>
  );
});

export interface RangeSliderProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  max: number;
  maxValue: number;
  min: number;
  minValue: number;
  onValueChange: (next: { min: number; max: number }) => void;
  step?: number;
}

export function RangeSlider({
  className,
  label,
  max,
  maxValue,
  min,
  minValue,
  onValueChange,
  step = 1,
  ...props
}: RangeSliderProps) {
  const rangeSize = Math.max(max - min, 1);
  const minPercent = Math.min(
    100,
    Math.max(0, ((minValue - min) / rangeSize) * 100),
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, ((maxValue - min) / rangeSize) * 100),
  );

  return (
    <div {...props} className={cx("t7-range-slider", className)}>
      <div className="t7-field-label">
        <span>{label}</span>
        <span>
          {minValue}–{maxValue}
        </span>
      </div>
      <div
        className="t7-range-slider-control"
        style={
          {
            "--t7-range-mid": `${(minPercent + maxPercent) / 2}%`,
            "--t7-range-span": `${Math.max(maxPercent - minPercent, 0)}%`,
            "--t7-range-start": `${minPercent}%`,
          } as CSSProperties
        }
      >
        <span aria-hidden="true" className="t7-range-slider-track" />
        <span aria-hidden="true" className="t7-range-slider-selection" />
        <input
          aria-label={`${label} minimum`}
          className="t7-range-slider-input t7-range-slider-input-min"
          max={maxValue}
          min={min}
          onChange={(event) =>
            onValueChange({
              max: maxValue,
              min: Math.min(Number(event.target.value), maxValue),
            })
          }
          step={step}
          type="range"
          value={minValue}
        />
        <input
          aria-label={`${label} maximum`}
          className="t7-range-slider-input t7-range-slider-input-max"
          max={max}
          min={minValue}
          onChange={(event) =>
            onValueChange({
              max: Math.max(Number(event.target.value), minValue),
              min: minValue,
            })
          }
          step={step}
          type="range"
          value={maxValue}
        />
      </div>
    </div>
  );
}

export interface ComboboxOption {
  description?: string;
  disabled?: boolean;
  label: string;
  value: string;
}

export interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  emptyMessage?: string;
  label?: string;
  measure?: MeasureIntent;
  loading?: boolean;
  onInputValueChange?: (value: string) => void;
  onValueChange: (value: string) => void;
  options: ComboboxOption[];
  value?: string;
}

export function Combobox({
  className,
  emptyMessage = "No options found.",
  id,
  label,
  measure,
  loading = false,
  onClick,
  onInputValueChange,
  onValueChange,
  options,
  placeholder = "Search options…",
  value,
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selected = options.find((option) => option.value === value);
  const query = inputValue || (open ? "" : (selected?.label ?? ""));
  const matchingOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    [inputValue, options],
  );
  const floating = useFloatingPosition(inputRef, open, {
    preferredWidth: Number.parseFloat(overlayGeometry.combobox),
    side: "bottom",
    widthStrategy: "min-trigger",
  });
  function closeListbox() {
    setOpen(false);
    setActiveIndex(-1);
  }
  useExclusiveFloatingLayer(open, closeListbox);

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event: PointerEvent) => {
      if (
        !inputRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      )
        closeListbox();
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      closeListbox();
      inputRef.current?.focus();
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  function selectOption(option: ComboboxOption) {
    if (option.disabled) return;
    onValueChange(option.value);
    setInputValue(option.label);
    closeListbox();
  }

  return (
    <label className="t7-field" data-t7-measure={measure} htmlFor={inputId}>
      {label ? <span className="t7-field-label">{label}</span> : null}
      <span className="t7-combobox">
        <input
          {...props}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cx("t7-input", "t7-combobox-input", className)}
          id={inputId}
          onBlur={(event) => {
            onBlur?.(event);
            window.setTimeout(() => closeListbox(), 120);
          }}
          onChange={(event) => {
            setInputValue(event.target.value);
            onInputValueChange?.(event.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) setOpen(true);
          }}
          onFocus={(event) => {
            onFocus?.(event);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((current) =>
                Math.min(current + 1, Math.max(matchingOptions.length - 1, 0)),
              );
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((current) => Math.max(current - 1, 0));
            }
            if (event.key === "Enter" && activeIndex >= 0) {
              event.preventDefault();
              const option = matchingOptions[activeIndex];
              if (option) selectOption(option);
            }
            if (event.key === "Escape" && open) {
              event.preventDefault();
              event.stopPropagation();
              closeListbox();
            }
          }}
          placeholder={placeholder}
          ref={inputRef}
          role="combobox"
          value={query}
        />
        <T7Icon
          aria-hidden="true"
          className="t7-select-chevron"
          name="chevronDown"
          size={16}
        />
        {open ? (
          <FloatingPortal anchorRef={inputRef}>
            <span
              aria-busy={loading || undefined}
              aria-label={`${label ?? props["aria-label"] ?? placeholder} options`}
              className="t7-combobox-list t7-floating-content"
              data-floating-placement={floating.placement}
              id={listboxId}
              ref={floating.setContentRef}
              role="listbox"
              style={floating.style}
            >
              {loading ? (
                <span className="t7-combobox-state">Loading options…</span>
              ) : null}
              {!loading && matchingOptions.length === 0 ? (
                <span className="t7-combobox-state">{emptyMessage}</span>
              ) : null}
              {!loading
                ? matchingOptions.map((option, index) => (
                    <button
                      aria-selected={value === option.value}
                      className="t7-combobox-option"
                      data-active={activeIndex === index || undefined}
                      disabled={option.disabled}
                      id={`${listboxId}-${index}`}
                      key={option.value}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectOption(option)}
                      role="option"
                      tabIndex={-1}
                      type="button"
                    >
                      <span className="t7-combobox-option-copy">
                        <span>{option.label}</span>
                        {option.description ? (
                          <small>{option.description}</small>
                        ) : null}
                      </span>
                      {value === option.value ? (
                        <T7Icon aria-hidden="true" name="check" size={15} />
                      ) : null}
                    </button>
                  ))
                : null}
            </span>
          </FloatingPortal>
        ) : null}
      </span>
    </label>
  );
}

export interface CascaderOption {
  children?: CascaderOption[];
  disabled?: boolean;
  label: string;
  value: string;
}

export interface CascaderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  disabled?: boolean;
  error?: string;
  hint?: string;
  label?: string;
  measure?: MeasureIntent;
  onValueChange: (value: string[]) => void;
  options: CascaderOption[];
  placeholder?: string;
  value?: string[];
}

function getCascaderLevels(
  options: CascaderOption[],
  activePath: string[],
): CascaderOption[][] {
  const levels = [options];
  let current = options;
  for (const value of activePath) {
    const option = current.find((candidate) => candidate.value === value);
    if (!option?.children?.length) break;
    current = option.children;
    levels.push(current);
  }
  return levels;
}

function getCascaderPathLabels(
  options: CascaderOption[],
  path: string[],
): string[] {
  const labels: string[] = [];
  let current = options;
  for (const value of path) {
    const option = current.find((candidate) => candidate.value === value);
    if (!option) break;
    labels.push(option.label);
    current = option.children ?? [];
  }
  return labels;
}

/** Select a path through nested options with menu keyboard semantics. */
export function Cascader({
  className,
  disabled = false,
  error,
  hint,
  label = "Select path",
  measure,
  onValueChange,
  options,
  placeholder = "Select an option",
  value = [],
  ...props
}: CascaderProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [open, setOpen] = useState(false);
  const [activePath, setActivePath] = useState<string[]>(value.slice(0, -1));
  const labelId = `${id}-label`;
  const helpId = `${id}-help`;
  const panelId = `${id}-panel`;
  const levels = getCascaderLevels(options, activePath);
  const selectedLabels = getCascaderPathLabels(options, value);
  const displayValue = selectedLabels.length
    ? selectedLabels.join(" / ")
    : placeholder;
  const floating = useFloatingPosition(triggerRef, open, {
    preferredWidth: Number.parseFloat(overlayGeometry.combobox),
    side: "bottom",
    widthStrategy: "min-trigger",
  });

  useExclusiveFloatingLayer(open, () => {
    setOpen(false);
    triggerRef.current?.focus();
  });

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event: PointerEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [floating.contentRef, open]);

  useEffect(() => {
    if (!open) return undefined;
    const level = Math.min(activePath.length, levels.length - 1);
    const currentValue = value[level] ?? activePath[level];
    const index = Math.max(
      0,
      currentValue
        ? (levels[level]?.findIndex(
            (option) => option.value === currentValue,
          ) ?? -1)
        : (levels[level]?.findIndex((option) => !option.disabled) ?? 0),
    );
    const frame = window.requestAnimationFrame(() => {
      itemRefs.current[`${level}-${index}`]?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activePath, levels, open]);

  function focusItem(level: number, index: number) {
    window.requestAnimationFrame(() => {
      itemRefs.current[`${level}-${index}`]?.focus();
    });
  }

  function findEnabledIndex(
    items: CascaderOption[],
    start: number,
    direction: 1 | -1,
  ) {
    if (!items.length) return -1;
    let index = start;
    for (let count = 0; count < items.length; count += 1) {
      index = (index + direction + items.length) % items.length;
      if (!items[index]?.disabled) return index;
    }
    return -1;
  }

  function choose(option: CascaderOption, level: number) {
    if (option.disabled) return;
    const nextPath = [...activePath.slice(0, level), option.value];
    if (option.children?.length) {
      setActivePath(nextPath);
      return;
    }
    onValueChange(nextPath);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onOptionKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    option: CascaderOption,
    level: number,
    index: number,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    const items = levels[level] ?? [];
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = findEnabledIndex(
        items,
        index,
        event.key === "ArrowDown" ? 1 : -1,
      );
      if (next >= 0) focusItem(level, next);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      let next = -1;
      if (event.key === "Home") {
        next = items.findIndex((item) => !item.disabled);
      } else {
        items.forEach((item, itemIndex) => {
          if (!item.disabled) next = itemIndex;
        });
      }
      if (next >= 0) focusItem(level, next);
      return;
    }
    if (event.key === "ArrowLeft" && level > 0) {
      event.preventDefault();
      const parentValue = activePath[level - 1];
      const parentIndex =
        levels[level - 1]?.findIndex(
          (candidate) => candidate.value === parentValue,
        ) ?? -1;
      setActivePath(activePath.slice(0, level - 1));
      if (parentIndex >= 0) focusItem(level - 1, parentIndex);
      return;
    }
    if (
      (event.key === "ArrowRight" && option.children?.length) ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      choose(option, level);
    }
  }

  return (
    <div
      {...props}
      className={cx("t7-cascader-field", className)}
      data-disabled={disabled || undefined}
      data-invalid={error || undefined}
      data-t7-measure={measure}
    >
      {label ? (
        <span className="t7-field-label" id={labelId}>
          {label}
        </span>
      ) : null}
      <button
        aria-controls={panelId}
        aria-describedby={error || hint ? helpId : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={error ? true : undefined}
        aria-labelledby={label ? labelId : undefined}
        className={cx("t7-cascader-trigger", error && "is-error")}
        disabled={disabled}
        onClick={() => {
          setActivePath(value.slice(0, -1));
          setOpen((current) => !current);
        }}
        ref={triggerRef}
        type="button"
      >
        <span>{displayValue}</span>
        <T7Icon aria-hidden="true" name="chevronDown" size={16} />
      </button>
      {open ? (
        <FloatingPortal anchorRef={triggerRef}>
          <div
            aria-label={`${label} options`}
            className="t7-cascader-popover t7-floating-content"
            data-floating-placement={floating.placement}
            id={panelId}
            ref={floating.setContentRef}
            role="dialog"
            style={floating.style}
          >
            <div className="t7-cascader-menus">
              {levels.map((levelOptions, level) => (
                <div
                  aria-label={`${label}, level ${level + 1}`}
                  className="t7-cascader-menu"
                  key={level}
                  role="menu"
                >
                  {levelOptions.map((option, index) => {
                    const active = activePath[level] === option.value;
                    const hasChildren = Boolean(option.children?.length);
                    return (
                      <button
                        aria-disabled={option.disabled || undefined}
                        aria-expanded={hasChildren ? active : undefined}
                        aria-haspopup={hasChildren ? "menu" : undefined}
                        aria-current={
                          !hasChildren && value[level] === option.value
                            ? "true"
                            : undefined
                        }
                        className="t7-cascader-option"
                        data-active={active || undefined}
                        disabled={option.disabled}
                        id={`${panelId}-${level}-${index}`}
                        key={option.value}
                        onClick={() => choose(option, level)}
                        onKeyDown={(event) =>
                          onOptionKeyDown(event, option, level, index)
                        }
                        ref={(element) => {
                          itemRefs.current[`${level}-${index}`] = element;
                        }}
                        role="menuitem"
                        tabIndex={-1}
                        type="button"
                      >
                        <span>{option.label}</span>
                        {hasChildren ? (
                          <T7Icon
                            aria-hidden="true"
                            name="chevronRight"
                            size={15}
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </FloatingPortal>
      ) : null}
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")} id={helpId}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  );
}

export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
  emptyMessage?: string;
  hint?: string;
  label?: string;
  measure?: MeasureIntent;
  loading?: boolean;
  onValueChange: (values: string[]) => void;
  options: ComboboxOption[];
  placeholder?: string;
  values: string[];
}

export function MultiSelect({
  className,
  emptyMessage = "No options found.",
  error,
  hint,
  label,
  loading = false,
  measure,
  onValueChange,
  options,
  placeholder = "Select options",
  values,
  onBlur,
  onFocus,
  onKeyDown,
  ...props
}: MultiSelectProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedOptions = options.filter((option) =>
    values.includes(option.value),
  );
  const floating = useFloatingPosition(triggerRef, open, {
    preferredWidth: Number.parseFloat(overlayGeometry.select.min),
    side: "bottom",
    widthStrategy: "min-trigger",
  });
  function closeListbox() {
    setOpen(false);
    setActiveIndex(-1);
  }
  useExclusiveFloatingLayer(open, closeListbox);

  useEffect(() => {
    if (!open) return undefined;
    const firstEnabled = options.findIndex((option) => !option.disabled);
    setActiveIndex(firstEnabled);
    const frame = window.requestAnimationFrame(() => {
      floating.contentRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [floating.contentRef, open, options]);

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event: PointerEvent) => {
      if (
        !rootRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      )
        closeListbox();
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      closeListbox();
      triggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  function toggleValue(option: ComboboxOption) {
    if (option.disabled) return;
    onValueChange(
      values.includes(option.value)
        ? values.filter((value) => value !== option.value)
        : [...values, option.value],
    );
  }

  function onListboxKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeListbox();
      triggerRef.current?.focus();
      return;
    }
    if (!options.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      let next = activeIndex;
      for (let count = 0; count < options.length; count += 1) {
        next =
          (next + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
          options.length;
        if (!options[next]?.disabled) {
          setActiveIndex(next);
          return;
        }
      }
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next =
        event.key === "Home"
          ? options.findIndex((option) => !option.disabled)
          : options.reduce(
              (last, option, index) => (option.disabled ? last : index),
              -1,
            );
      if (next >= 0) setActiveIndex(next);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && activeIndex >= 0) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) toggleValue(option);
    }
  }

  return (
    <div
      {...props}
      ref={rootRef}
      className={cx("t7-multiselect-field", className)}
      data-t7-measure={measure}
      onBlur={(event) => {
        onBlur?.(event);
        window.setTimeout(() => {
          if (
            !rootRef.current?.contains(document.activeElement) &&
            !floating.contentRef.current?.contains(document.activeElement)
          )
            closeListbox();
        }, 0);
      }}
      onFocus={(event) => onFocus?.(event)}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!open || event.defaultPrevented || event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        closeListbox();
        triggerRef.current?.focus();
      }}
    >
      {label ? <span className="t7-field-label">{label}</span> : null}
      <button
        aria-controls={`${id}-listbox`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        aria-busy={loading || undefined}
        className={cx("t7-multiselect-trigger", error && "is-error")}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        <span>
          {selectedOptions.length
            ? selectedOptions.map((option) => option.label).join(", ")
            : placeholder}
        </span>
        <T7Icon aria-hidden="true" name="chevronDown" size={16} />
      </button>
      {open ? (
        <FloatingPortal anchorRef={triggerRef}>
          <div
            aria-busy={loading || undefined}
            aria-label={`${label ?? props["aria-label"] ?? placeholder} options`}
            aria-multiselectable="true"
            className="t7-multiselect-list t7-floating-content"
            data-floating-placement={floating.placement}
            id={`${id}-listbox`}
            onKeyDown={onListboxKeyDown}
            ref={floating.setContentRef}
            role="listbox"
            style={floating.style}
            tabIndex={0}
          >
            {loading ? <span>{"Loading options…"}</span> : null}
            {!loading && options.length === 0 ? (
              <span>{emptyMessage}</span>
            ) : null}
            {!loading
              ? options.map((option, index) => (
                  <button
                    aria-selected={values.includes(option.value)}
                    data-active={activeIndex === index || undefined}
                    data-selected={values.includes(option.value) || undefined}
                    disabled={option.disabled}
                    id={`${id}-option-${index}`}
                    key={option.value}
                    onClick={() => toggleValue(option)}
                    role="option"
                    tabIndex={-1}
                    type="button"
                  >
                    <span className="t7-option-copy">
                      <span>{option.label}</span>
                      {option.description ? (
                        <small>{option.description}</small>
                      ) : null}
                    </span>
                    {values.includes(option.value) ? (
                      <T7Icon aria-hidden="true" name="check" size={15} />
                    ) : null}
                  </button>
                ))
              : null}
          </div>
        </FloatingPortal>
      ) : null}
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  );
}

export interface TransferProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  availableLabel?: string;
  label?: string;
  onValueChange: (values: string[]) => void;
  options: ComboboxOption[];
  searchable?: boolean;
  selectedLabel?: string;
  value: string[];
}

/** Move bounded options between two accessible listbox regions. */
export function Transfer({
  availableLabel = "Available",
  className,
  label = "Transfer options",
  onValueChange,
  options,
  searchable = false,
  selectedLabel = "Selected",
  value,
  ...props
}: TransferProps) {
  const [availableSelection, setAvailableSelection] = useState<string[]>([]);
  const [selectedSelection, setSelectedSelection] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const selectedSet = new Set(value);
  const availableOptions = options.filter(
    (option) =>
      !selectedSet.has(option.value) &&
      (!normalizedQuery ||
        option.label.toLowerCase().includes(normalizedQuery)),
  );
  const selectedOptions = value
    .map((selectedValue) =>
      options.find((option) => option.value === selectedValue),
    )
    .filter((option): option is ComboboxOption => Boolean(option));

  function toggleSelection(
    current: string[],
    next: string,
    setSelection: (values: string[]) => void,
  ) {
    setSelection(
      current.includes(next)
        ? current.filter((value) => value !== next)
        : [...current, next],
    );
  }

  function moveToSelected(values: string[]) {
    const moved = new Set(values);
    onValueChange([
      ...value,
      ...options
        .filter(
          (option) => moved.has(option.value) && !selectedSet.has(option.value),
        )
        .map((option) => option.value),
    ]);
    setAvailableSelection([]);
  }

  function moveToAvailable(values: string[]) {
    const moved = new Set(values);
    onValueChange(value.filter((selectedValue) => !moved.has(selectedValue)));
    setSelectedSelection([]);
  }

  return (
    <div {...props} aria-label={label} className={cx("t7-transfer", className)}>
      <div className="t7-transfer-header">
        <span className="t7-field-label">{label}</span>
        {searchable ? (
          <Input
            aria-label={`Filter ${label}`}
            className="t7-transfer-search"
            leadingIcon="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter options"
            value={query}
          />
        ) : null}
      </div>
      <div className="t7-transfer-layout">
        <TransferList
          label={availableLabel}
          onToggle={(next) =>
            toggleSelection(availableSelection, next, setAvailableSelection)
          }
          options={availableOptions}
          selected={availableSelection}
        />
        <div aria-label="Transfer actions" className="t7-transfer-actions">
          <Button
            disabled={!availableSelection.length}
            leadingIcon="arrowRight"
            onClick={() => moveToSelected(availableSelection)}
            size="sm"
          >
            Add
          </Button>
          <Button
            disabled={!selectedSelection.length}
            intent="secondary"
            leadingIcon="arrowLeft"
            onClick={() => moveToAvailable(selectedSelection)}
            size="sm"
          >
            Remove
          </Button>
        </div>
        <TransferList
          label={selectedLabel}
          onToggle={(next) =>
            toggleSelection(selectedSelection, next, setSelectedSelection)
          }
          options={selectedOptions}
          selected={selectedSelection}
        />
      </div>
    </div>
  );
}

function TransferList({
  label,
  onToggle,
  options,
  selected,
}: {
  label: string;
  onToggle: (value: string) => void;
  options: ComboboxOption[];
  selected: string[];
}) {
  const listboxId = useId();
  const [activeIndex, setActiveIndex] = useState(
    options.findIndex((option) => !option.disabled),
  );

  useEffect(() => {
    setActiveIndex((current) => {
      if (
        current >= 0 &&
        current < options.length &&
        !options[current]?.disabled
      )
        return current;
      return options.findIndex((option) => !option.disabled);
    });
  }, [options]);

  function onListboxKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!options.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      let next = activeIndex;
      for (let count = 0; count < options.length; count += 1) {
        next =
          (next + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
          options.length;
        if (!options[next]?.disabled) {
          setActiveIndex(next);
          return;
        }
      }
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next =
        event.key === "Home"
          ? options.findIndex((option) => !option.disabled)
          : options.reduce(
              (last, option, index) => (option.disabled ? last : index),
              -1,
            );
      if (next >= 0) setActiveIndex(next);
      return;
    }
    if (
      (event.key === "Enter" || event.key === " ") &&
      activeIndex >= 0 &&
      options[activeIndex]
    ) {
      event.preventDefault();
      onToggle(options[activeIndex].value);
    }
  }

  return (
    <div className="t7-transfer-list-wrap">
      <div className="t7-transfer-list-heading">
        <span>{label}</span>
        <small>{options.length}</small>
      </div>
      <div
        aria-activedescendant={
          activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        aria-label={label}
        aria-multiselectable="true"
        className="t7-transfer-list"
        onKeyDown={onListboxKeyDown}
        role="listbox"
        tabIndex={0}
      >
        {options.length ? (
          options.map((option, index) => (
            <button
              aria-disabled={option.disabled || undefined}
              aria-selected={selected.includes(option.value)}
              data-active={activeIndex === index || undefined}
              className="t7-transfer-option"
              data-selected={selected.includes(option.value) || undefined}
              disabled={option.disabled}
              id={`${listboxId}-option-${index}`}
              key={option.value}
              onClick={() => onToggle(option.value)}
              role="option"
              tabIndex={-1}
              type="button"
            >
              <span>{option.label}</span>
              {option.description ? <small>{option.description}</small> : null}
            </button>
          ))
        ) : (
          <span className="t7-transfer-empty">No options</span>
        )}
      </div>
    </div>
  );
}

export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  disabled?: boolean;
  hint?: string;
  label?: string;
  measure?: MeasureIntent;
  onValueChange: (value: string) => void;
  presets?: string[];
  value: string;
}

/** A native color control with a text value and optional token-friendly presets. */
export function ColorPicker({
  className,
  disabled = false,
  hint,
  label = "Color",
  measure,
  onValueChange,
  presets = [],
  value,
  ...props
}: ColorPickerProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div
      {...props}
      className={cx("t7-color-picker", className)}
      data-t7-measure={measure}
    >
      <label className="t7-field-label" htmlFor={`${id}-text`}>
        {label}
      </label>
      <div className="t7-color-picker-control">
        <input
          aria-label={`${label} swatch`}
          className="t7-color-picker-native"
          disabled={disabled}
          onChange={(event) => onValueChange(event.target.value)}
          type="color"
          value={value}
        />
        <Input
          aria-describedby={hint ? hintId : undefined}
          aria-label={label}
          disabled={disabled}
          id={`${id}-text`}
          onChange={(event) => onValueChange(event.target.value)}
          value={value}
        />
      </div>
      {presets.length ? (
        <div
          aria-label={`${label} presets`}
          className="t7-color-picker-presets"
        >
          {presets.map((preset) => (
            <button
              aria-label={`Use ${preset}`}
              className="t7-color-picker-preset"
              data-active={
                preset.toLowerCase() === value.toLowerCase() || undefined
              }
              disabled={disabled}
              key={preset}
              onClick={() => onValueChange(preset)}
              style={{ "--t7-color-picker-preset": preset } as CSSProperties}
              type="button"
            />
          ))}
        </div>
      ) : null}
      {hint ? (
        <span className="t7-field-hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export interface TagsInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  allowDuplicates?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  label?: string;
  measure?: MeasureIntent;
  maxTags?: number;
  onInputValueChange?: (value: string) => void;
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  value: string[];
}

/** Tokenized multi-value entry with Enter/comma commit and keyboard removal. */
export function TagsInput({
  allowDuplicates = false,
  className,
  disabled = false,
  error,
  hint,
  label = "Tags",
  maxTags,
  measure,
  onInputValueChange,
  onValueChange,
  placeholder = "Add a tag",
  readOnly = false,
  value,
  ...props
}: TagsInputProps) {
  const id = useId();
  const helpId = `${id}-hint`;
  const [inputValue, setInputValue] = useState("");

  function updateInput(next: string) {
    setInputValue(next);
    onInputValueChange?.(next);
  }

  function commit(rawValue = inputValue) {
    const next = rawValue.trim();
    if (
      disabled ||
      readOnly ||
      !next ||
      (maxTags !== undefined && value.length >= maxTags)
    )
      return;
    if (
      !allowDuplicates &&
      value.some((item) => item.toLowerCase() === next.toLowerCase())
    ) {
      updateInput("");
      return;
    }
    onValueChange([...value, next]);
    updateInput("");
  }

  return (
    <div
      {...props}
      className={cx("t7-tags-input-field", className)}
      data-invalid={error || undefined}
      data-disabled={disabled || undefined}
      data-t7-measure={measure}
    >
      <label className="t7-field-label" htmlFor={id}>
        {label}
      </label>
      <div
        className="t7-tags-input"
        data-disabled={disabled || props["aria-disabled"] || undefined}
      >
        {value.map((tag) => (
          <span className="t7-tag" key={`${tag}-${value.indexOf(tag)}`}>
            <span>{tag}</span>
            <IconButton
              aria-label={`Remove ${tag}`}
              className="t7-tag-remove"
              icon="close"
              label={`Remove ${tag}`}
              onClick={() =>
                onValueChange(
                  value.filter(
                    (item, index) =>
                      item !== tag || index !== value.indexOf(tag),
                  ),
                )
              }
              disabled={disabled || readOnly}
              size="sm"
            />
          </span>
        ))}
        <input
          aria-label={label}
          aria-describedby={error || hint ? helpId : undefined}
          aria-invalid={error ? true : undefined}
          className="t7-tags-input-control"
          disabled={disabled}
          id={id}
          onChange={(event) => updateInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              commit();
            } else if (
              event.key === "Backspace" &&
              !inputValue &&
              value.length &&
              !disabled &&
              !readOnly
            ) {
              onValueChange(value.slice(0, -1));
            }
          }}
          onBlur={() => {
            if (!disabled && !readOnly) commit();
          }}
          placeholder={value.length ? undefined : placeholder}
          readOnly={readOnly}
          value={inputValue}
        />
      </div>
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")} id={helpId}>
          {error ?? hint}
        </span>
      ) : null}
    </div>
  );
}

export interface OtpInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  disabled?: boolean;
  label?: string;
  length?: number;
  onValueChange: (value: string) => void;
  value: string;
}

/** One-time passcode entry with paste distribution and predictable arrow/backspace focus. */
export function OtpInput({
  className,
  disabled = false,
  label = "Verification code",
  length = 6,
  onValueChange,
  value,
  ...props
}: OtpInputProps) {
  const generatedId = useId();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const values = Array.from({ length }, (_, index) => value[index] ?? "");
  function commit(next: string[]) {
    onValueChange(next.join("").slice(0, length));
  }
  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-otp-input", className)}
      role="group"
    >
      {values.map((digit, index) => (
        <input
          aria-label={`${label}, digit ${index + 1} of ${length}`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          className="t7-otp-slot"
          disabled={disabled}
          id={`${generatedId}-${index}`}
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event) => {
            const character = event.target.value.replace(/\D/g, "").slice(-1);
            const next = [...values];
            next[index] = character;
            commit(next);
            if (character && index < length - 1)
              inputRefs.current[index + 1]?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digit && index > 0)
              inputRefs.current[index - 1]?.focus();
            if (event.key === "ArrowLeft" && index > 0) {
              event.preventDefault();
              inputRefs.current[index - 1]?.focus();
            }
            if (event.key === "ArrowRight" && index < length - 1) {
              event.preventDefault();
              inputRefs.current[index + 1]?.focus();
            }
          }}
          onPaste={(event) => {
            event.preventDefault();
            const pasted = event.clipboardData
              .getData("text")
              .replace(/\D/g, "")
              .slice(0, length - index);
            if (!pasted) return;
            const next = [...values];
            pasted.split("").forEach((character, offset) => {
              next[index + offset] = character;
            });
            commit(next);
            inputRefs.current[
              Math.min(index + pasted.length, length - 1)
            ]?.focus();
          }}
          pattern="[0-9]*"
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          value={digit}
        />
      ))}
    </div>
  );
}

export type { CheckboxProps, RadioProps };
