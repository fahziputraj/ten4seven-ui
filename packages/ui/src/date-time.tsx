import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { T7Icon } from "@ten4seven/icons";

import { Button, Input } from "./components";
import { FloatingPortal, useFloatingPosition } from "./overlay";
import { cx } from "./utils";

export type DateValue = string;

function toDate(value: DateValue | undefined) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day, 12);
}

function toDateValue(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(left: Date, right: Date | undefined) {
  return Boolean(right) && toDateValue(left) === toDateValue(right!);
}

function isBetween(
  value: Date,
  start: Date | undefined,
  end: Date | undefined,
) {
  if (!start || !end) return false;
  const time = value.getTime();
  return time > start.getTime() && time < end.getTime();
}

function startOfMonth(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), 1, 12);
}

function addMonths(value: Date, amount: number) {
  const targetMonth = value.getMonth() + amount;
  const lastDay = new Date(
    value.getFullYear(),
    targetMonth + 1,
    0,
    12,
  ).getDate();
  return new Date(
    value.getFullYear(),
    targetMonth,
    Math.min(value.getDate(), lastDay),
    12,
  );
}

function addDays(value: Date, amount: number) {
  const next = new Date(value);
  next.setDate(next.getDate() + amount);
  return next;
}

function compareDates(left: Date, right: Date) {
  return left.getTime() - right.getTime();
}

function isBlocked(value: Date, min: Date | undefined, max: Date | undefined) {
  return Boolean(
    (min && compareDates(value, min) < 0) ||
    (max && compareDates(value, max) > 0),
  );
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  defaultMonth?: Date;
  disabled?: boolean;
  locale?: string;
  max?: DateValue;
  min?: DateValue;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  onValueChange?: (value: DateValue) => void;
  rangeEnd?: DateValue;
  rangeStart?: DateValue;
  value?: DateValue;
}

/**
 * A keyboard-addressable month grid. Values use stable YYYY-MM-DD strings so
 * consumers do not inherit timezone conversion behavior from the component.
 */
export function Calendar({
  className,
  defaultMonth,
  disabled = false,
  locale = "en-US",
  max,
  min,
  month,
  onMonthChange,
  onValueChange,
  rangeEnd,
  rangeStart,
  value,
  ...props
}: CalendarProps) {
  const selectedDate = toDate(value);
  const startDate = toDate(rangeStart);
  const endDate = toDate(rangeEnd);
  const minDate = toDate(min);
  const maxDate = toDate(max);
  const today = useMemo(() => new Date(), []);
  const [uncontrolledMonth, setUncontrolledMonth] = useState(() =>
    startOfMonth(month ?? selectedDate ?? defaultMonth ?? today),
  );
  const visibleMonth = startOfMonth(month ?? uncontrolledMonth);
  const gridId = useId();
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(visibleMonth);
  const dayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const days = useMemo(() => {
    const first = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1,
      12,
    );
    const firstGridDay = addDays(first, -first.getDay());
    return Array.from({ length: 42 }, (_, index) =>
      addDays(firstGridDay, index),
    );
  }, [visibleMonth]);

  function setMonth(next: Date) {
    const normalized = startOfMonth(next);
    if (!month) setUncontrolledMonth(normalized);
    onMonthChange?.(normalized);
  }

  function focusDate(next: Date) {
    const nextMonth = startOfMonth(next);
    if (
      nextMonth.getMonth() !== visibleMonth.getMonth() ||
      nextMonth.getFullYear() !== visibleMonth.getFullYear()
    ) {
      setMonth(nextMonth);
      window.setTimeout(
        () => buttonRefs.current.get(toDateValue(next))?.focus(),
        0,
      );
      return;
    }
    buttonRefs.current.get(toDateValue(next))?.focus();
  }

  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>, day: Date) {
    const key = event.key;
    const move = (amount: number) => {
      event.preventDefault();
      focusDate(addDays(day, amount));
    };
    if (key === "ArrowLeft") move(-1);
    if (key === "ArrowRight") move(1);
    if (key === "ArrowUp") move(-7);
    if (key === "ArrowDown") move(7);
    if (key === "Home") {
      event.preventDefault();
      focusDate(addDays(day, -day.getDay()));
    }
    if (key === "End") {
      event.preventDefault();
      focusDate(addDays(day, 6 - day.getDay()));
    }
    if (key === "PageUp") {
      event.preventDefault();
      focusDate(addMonths(day, event.shiftKey ? -12 : -1));
    }
    if (key === "PageDown") {
      event.preventDefault();
      focusDate(addMonths(day, event.shiftKey ? 12 : 1));
    }
  }

  return (
    <div
      {...props}
      aria-labelledby={`${gridId}-label`}
      className={cx("t7-calendar", className)}
    >
      <div className="t7-calendar-header">
        <button
          aria-label="Previous month"
          className="t7-calendar-nav"
          disabled={disabled}
          onClick={() => setMonth(addMonths(visibleMonth, -1))}
          type="button"
        >
          <T7Icon aria-hidden="true" name="chevronLeft" size={17} />
        </button>
        <strong id={`${gridId}-label`}>{monthLabel}</strong>
        <button
          aria-label="Next month"
          className="t7-calendar-nav"
          disabled={disabled}
          onClick={() => setMonth(addMonths(visibleMonth, 1))}
          type="button"
        >
          <T7Icon aria-hidden="true" name="chevronRight" size={17} />
        </button>
      </div>
      <div className="t7-calendar-weekdays" aria-hidden="true">
        {weekdayLabels.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div
        aria-labelledby={`${gridId}-label`}
        className="t7-calendar-grid"
        role="grid"
      >
        {days.map((day) => {
          const dateValue = toDateValue(day);
          const outside = day.getMonth() !== visibleMonth.getMonth();
          const selected = isSameDay(day, selectedDate);
          const rangeBoundary =
            isSameDay(day, startDate) || isSameDay(day, endDate);
          const blocked = disabled || isBlocked(day, minDate, maxDate);
          const inRange = isBetween(day, startDate, endDate);
          return (
            <div
              key={dateValue}
              role="gridcell"
              aria-selected={selected || rangeBoundary}
            >
              <button
                ref={(element) => {
                  if (element) buttonRefs.current.set(dateValue, element);
                  else buttonRefs.current.delete(dateValue);
                }}
                aria-current={isSameDay(day, today) ? "date" : undefined}
                aria-label={dayFormatter.format(day)}
                className="t7-calendar-day"
                data-in-range={inRange || undefined}
                data-outside={outside || undefined}
                data-selected={selected || rangeBoundary || undefined}
                disabled={blocked}
                onClick={() => onValueChange?.(dateValue)}
                onKeyDown={(event) => onDayKeyDown(event, day)}
                tabIndex={
                  selected || rangeBoundary || isSameDay(day, today) ? 0 : -1
                }
                type="button"
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  clearLabel?: string;
  error?: string;
  hint?: string;
  label?: string;
  max?: DateValue;
  min?: DateValue;
  onValueChange: (value: DateValue | undefined) => void;
  value?: DateValue;
}

export function DatePicker({
  className,
  clearLabel = "Clear date",
  error,
  hint,
  id,
  label,
  max,
  min,
  onValueChange,
  value,
  ...props
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const pickerRef = useRef<HTMLSpanElement>(null);
  const helpId = `${inputId}-hint`;
  const floating = useFloatingPosition(pickerRef, open, {
    minWidth: true,
    side: "bottom",
  });

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event: PointerEvent) => {
      if (
        !pickerRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <label className="t7-field" htmlFor={inputId}>
      {label ? <span className="t7-field-label">{label}</span> : null}
      <span
        className={cx("t7-date-picker", error && "is-error")}
        ref={pickerRef}
      >
        <input
          {...props}
          aria-describedby={error || hint ? helpId : props["aria-describedby"]}
          aria-invalid={error ? true : props["aria-invalid"]}
          className={cx("t7-input", className)}
          id={inputId}
          inputMode="numeric"
          onBlur={(event) => {
            props.onBlur?.(event);
            window.setTimeout(() => {
              if (
                !pickerRef.current?.contains(document.activeElement) &&
                !floating.contentRef.current?.contains(document.activeElement)
              )
                setOpen(false);
            }, 100);
          }}
          onChange={(event) => {
            setDraft(event.target.value);
            if (event.target.value === "") onValueChange(undefined);
            if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.value))
              onValueChange(event.target.value);
          }}
          placeholder="YYYY-MM-DD"
          value={value ?? draft}
        />
        <button
          aria-label="Open calendar"
          className="t7-input-action"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <T7Icon aria-hidden="true" name="calendar" size={16} />
        </button>
        {open ? (
          <FloatingPortal>
            <div
              className="t7-date-picker-popover t7-floating-content"
              data-floating-placement={floating.placement}
              id={`${inputId}-calendar`}
              ref={floating.setContentRef}
              style={floating.style}
            >
              <Calendar
                max={max}
                min={min}
                onValueChange={(next) => {
                  setDraft(next);
                  onValueChange(next);
                  setOpen(false);
                }}
                value={value}
              />
              {value ? (
                <Button
                  intent="quiet"
                  onClick={() => {
                    setDraft("");
                    onValueChange(undefined);
                  }}
                  size="sm"
                >
                  {clearLabel}
                </Button>
              ) : null}
            </div>
          </FloatingPortal>
        ) : null}
      </span>
      {error || hint ? (
        <span className={cx("t7-field-hint", error && "is-error")} id={helpId}>
          {error ?? hint}
        </span>
      ) : null}
    </label>
  );
}

export interface DateRangeValue {
  end?: DateValue;
  start?: DateValue;
}

export interface DateRangePickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  clearLabel?: string;
  disabled?: boolean;
  label?: ReactNode;
  max?: DateValue;
  min?: DateValue;
  onValueChange: (value: DateRangeValue) => void;
  value: DateRangeValue;
}

export function DateRangePicker({
  className,
  clearLabel = "Clear range",
  disabled,
  label,
  max,
  min,
  onValueChange,
  value,
  ...props
}: DateRangePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const start = toDate(value.start);
  const end = toDate(value.end);
  const display =
    value.start && value.end
      ? `${value.start} to ${value.end}`
      : (value.start ?? "Select dates");
  const floating = useFloatingPosition(pickerRef, open, {
    minWidth: true,
    side: "bottom",
  });

  useEffect(() => {
    if (!open) return undefined;
    const dismiss = (event: PointerEvent) => {
      if (
        !pickerRef.current?.contains(event.target as Node) &&
        !floating.contentRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function choose(next: DateValue) {
    const nextDate = toDate(next)!;
    if (!start || end) {
      onValueChange({ start: next });
      return;
    }
    if (compareDates(nextDate, start) < 0) {
      onValueChange({ end: value.start, start: next });
    } else {
      onValueChange({ end: next, start: value.start });
    }
  }

  return (
    <div {...props} className={cx("t7-date-range-field", className)}>
      {label ? <span className="t7-field-label">{label}</span> : null}
      <div className="t7-date-range-picker" ref={pickerRef}>
        <button
          aria-expanded={open}
          className="t7-date-range-trigger"
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <T7Icon aria-hidden="true" name="calendar" size={16} />
          <span>{display}</span>
        </button>
        {open ? (
          <FloatingPortal>
            <div
              className="t7-date-picker-popover t7-floating-content"
              data-floating-placement={floating.placement}
              id={`${id}-calendar`}
              ref={floating.setContentRef}
              style={floating.style}
            >
              <Calendar
                disabled={disabled}
                max={max}
                min={min}
                onValueChange={choose}
                rangeEnd={value.end}
                rangeStart={value.start}
                value={value.start}
              />
              <Button
                disabled={!value.start && !value.end}
                intent="quiet"
                onClick={() => onValueChange({})}
                size="sm"
              >
                {clearLabel}
              </Button>
            </div>
          </FloatingPortal>
        ) : null}
      </div>
    </div>
  );
}

export interface TimeInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  error?: string;
  hint?: string;
  label?: string;
}

export function TimeInput(props: TimeInputProps) {
  return <Input {...props} type="time" />;
}

export interface DateTimeInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  date: DateValue | undefined;
  dateLabel?: string;
  onDateChange: (value: DateValue | undefined) => void;
  onTimeChange: (value: string) => void;
  time: string;
  timeLabel?: string;
}

export function DateTimeInput({
  className,
  date,
  dateLabel = "Date",
  onDateChange,
  onTimeChange,
  time,
  timeLabel = "Time",
  ...props
}: DateTimeInputProps) {
  return (
    <div {...props} className={cx("t7-date-time-input", className)}>
      <DatePicker label={dateLabel} onValueChange={onDateChange} value={date} />
      <TimeInput
        label={timeLabel}
        onChange={(event) => onTimeChange(event.target.value)}
        value={time}
      />
    </div>
  );
}
