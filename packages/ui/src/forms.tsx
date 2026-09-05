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
  type LabelHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { overlayGeometry } from "@ten4seven/tokens";

import {
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
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, hint, id, label, ...props }, ref) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helpId = `${textareaId}-hint`;
    const describedBy = error || hint ? helpId : props["aria-describedby"];
    return (
      <label className="t7-field" htmlFor={textareaId}>
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
    const describedBy = error || hint ? helpId : props["aria-describedby"];
    return (
      <label className="t7-field" htmlFor={inputId}>
        {label ? <span className="t7-field-label">{label}</span> : null}
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
      </label>
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
  return (
    <div {...props} className={cx("t7-range-slider", className)}>
      <div className="t7-field-label">
        <span>{label}</span>
        <span>
          {minValue}–{maxValue}
        </span>
      </div>
      <div>
        <input
          aria-label={`${label} minimum`}
          className="t7-range-slider-input"
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
          className="t7-range-slider-input"
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
    <label className="t7-field" htmlFor={inputId}>
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

export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
  emptyMessage?: string;
  hint?: string;
  label?: string;
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
  }
  useExclusiveFloatingLayer(open, closeListbox);

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

  return (
    <div
      {...props}
      ref={rootRef}
      className={cx("t7-multiselect-field", className)}
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
            ref={floating.setContentRef}
            role="listbox"
            style={floating.style}
          >
            {loading ? <span>{"Loading options…"}</span> : null}
            {!loading && options.length === 0 ? (
              <span>{emptyMessage}</span>
            ) : null}
            {!loading
              ? options.map((option) => (
                  <button
                    aria-selected={values.includes(option.value)}
                    data-selected={values.includes(option.value) || undefined}
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => toggleValue(option)}
                    role="option"
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
