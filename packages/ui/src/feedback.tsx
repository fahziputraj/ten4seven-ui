import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { Button, type SurfaceEmphasis } from "./components";
import { IconButton } from "./actions";
import { FloatingPortal } from "./overlay";
import { cx, clamp } from "./utils";

export type FeedbackTone =
  "info" | "success" | "warning" | "danger" | "neutral";

const feedbackIcons: Record<FeedbackTone, IconName> = {
  danger: "blocked",
  info: "info",
  neutral: "info",
  success: "check",
  warning: "warning",
};

export interface AlertProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action?: ReactNode;
  description?: ReactNode;
  /** Defaults to a soft semantic callout; reserve solid and inverse for rare focal moments. */
  emphasis?: SurfaceEmphasis;
  onDismiss?: () => void;
  title: ReactNode;
  tone?: FeedbackTone;
}

/** Persistent, in-context feedback. Use a Toast only for transient outcomes. */
export function Alert({
  action,
  children,
  className,
  description,
  emphasis = "soft",
  onDismiss,
  title,
  tone = "info",
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      className={cx("t7-alert", className)}
      data-emphasis={emphasis}
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
    >
      <T7Icon
        aria-hidden="true"
        className="t7-alert-icon"
        name={feedbackIcons[tone]}
        size={18}
      />
      <div className="t7-alert-copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
        {children}
      </div>
      {action ? <div className="t7-alert-action">{action}</div> : null}
      {onDismiss ? (
        <IconButton
          icon="close"
          label="Dismiss alert"
          onClick={onDismiss}
          size="sm"
        />
      ) : null}
    </div>
  );
}

export type StateKind = "empty" | "error" | "permission" | "unavailable";

const stateIcons: Record<StateKind, IconName> = {
  empty: "files",
  error: "blocked",
  permission: "lock",
  unavailable: "pending",
};

export interface StateViewProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  action?: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  state: StateKind;
  title: ReactNode;
}

export function StateView({
  action,
  className,
  description,
  icon,
  state,
  title,
  ...props
}: StateViewProps) {
  return (
    <div
      {...props}
      className={cx("t7-state-view", className)}
      data-state={state}
    >
      <span aria-hidden="true" className="t7-state-view-icon">
        <T7Icon name={icon ?? stateIcons[state]} size={22} />
      </span>
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  height?: string | number;
  width?: string | number;
}

export function Skeleton({
  className,
  height,
  style,
  width,
  ...props
}: SkeletonProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cx("t7-skeleton", className)}
      style={{ height, width, ...style }}
    />
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({
  className,
  label = "Loading",
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <span
      {...props}
      aria-label={label}
      className={cx("t7-spinner", className)}
      data-size={size}
      role="status"
    >
      <span aria-hidden="true" />
      <span className="t7-visually-hidden">{label}</span>
    </span>
  );
}

export interface ProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "value"
> {
  indeterminate?: boolean;
  label?: ReactNode;
  max?: number;
  showValue?: boolean;
  value?: number;
}

export function Progress({
  className,
  indeterminate = false,
  label,
  max = 100,
  showValue = false,
  value = 0,
  ...props
}: ProgressProps) {
  const normalized = clamp(value, 0, max);
  const percentage = max > 0 ? Math.round((normalized / max) * 100) : 0;
  return (
    <div
      {...props}
      className={cx("t7-progress", className)}
      data-indeterminate={indeterminate || undefined}
    >
      {label || showValue ? (
        <div className="t7-progress-label">
          <span>{label}</span>
          {showValue ? <span>{percentage}%</span> : null}
        </div>
      ) : null}
      <div
        aria-label={typeof label === "string" ? label : "Progress"}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={indeterminate ? undefined : normalized}
        className="t7-progress-track"
        role="progressbar"
      >
        <span style={indeterminate ? undefined : { width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export interface CircularProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "value"
> {
  label?: string;
  max?: number;
  size?: number;
  value?: number;
}

export function CircularProgress({
  className,
  label = "Progress",
  max = 100,
  size = 42,
  value = 0,
  ...props
}: CircularProgressProps) {
  const normalized = clamp(value, 0, max);
  const percentage = max > 0 ? normalized / max : 0;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      {...props}
      aria-label={label}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={normalized}
      className={cx("t7-circular-progress", className)}
      role="progressbar"
      style={{ height: size, width: size, ...props.style }}
    >
      <svg aria-hidden="true" viewBox="0 0 40 40">
        <circle
          className="t7-circular-progress-track"
          cx="20"
          cy="20"
          fill="none"
          r={radius}
        />
        <circle
          className="t7-circular-progress-value"
          cx="20"
          cy="20"
          fill="none"
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - percentage),
          }}
        />
      </svg>
      <span>{Math.round(percentage * 100)}%</span>
    </div>
  );
}

export interface ToastData {
  action?: { label: string; onAction: () => void };
  description?: ReactNode;
  duration?: number;
  id: string;
  title: ReactNode;
  tone?: FeedbackTone;
}

export interface ToastInput extends Omit<ToastData, "id"> {
  id?: string;
}

interface ToastContextValue {
  dismiss: (id: string) => void;
  toast: (input: ToastInput) => string;
  toasts: ToastData[];
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export interface ToastProviderProps {
  children: ReactNode;
  limit?: number;
}

export function ToastProvider({ children, limit = 4 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const sequence = useRef(0);
  const dismiss = (id: string) =>
    setToasts((current) => current.filter((toast) => toast.id !== id));
  const toast = (input: ToastInput) => {
    const id = input.id ?? `t7-toast-${++sequence.current}`;
    setToasts((current) =>
      [...current.filter((item) => item.id !== id), { ...input, id }].slice(
        -limit,
      ),
    );
    return id;
  };
  const context = useMemo(() => ({ dismiss, toast, toasts }), [toasts]);
  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider.");
  return context;
}

export interface ToastProps {
  onDismiss: (id: string) => void;
  toast: ToastData;
}

export function Toast({ onDismiss, toast }: ToastProps) {
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return undefined;
    const timeout = window.setTimeout(
      () => onDismiss(toast.id),
      toast.duration,
    );
    return () => window.clearTimeout(timeout);
  }, [onDismiss, toast.duration, toast.id]);
  const tone = toast.tone ?? "neutral";
  return (
    <article
      aria-atomic="true"
      className="t7-toast"
      data-tone={tone}
      role={tone === "danger" ? "alert" : "status"}
    >
      <span aria-hidden="true" className="t7-toast-icon">
        <T7Icon name={feedbackIcons[tone]} size={18} />
      </span>
      <div>
        <strong>{toast.title}</strong>
        {toast.description ? <p>{toast.description}</p> : null}
      </div>
      {toast.action ? (
        <Button intent="quiet" onClick={toast.action.onAction} size="sm">
          {toast.action.label}
        </Button>
      ) : null}
      <IconButton
        icon="close"
        label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        size="sm"
      />
    </article>
  );
}

export interface ToasterProps extends HTMLAttributes<HTMLDivElement> {
  toasts?: ToastData[];
  onDismiss?: (id: string) => void;
}

export function Toaster({
  className,
  toasts: suppliedToasts,
  onDismiss: suppliedDismiss,
  ...props
}: ToasterProps) {
  const context = useContext(ToastContext);
  const toasts = suppliedToasts ?? context?.toasts ?? [];
  const dismiss = suppliedDismiss ?? context?.dismiss ?? (() => undefined);
  if (toasts.length === 0) return null;
  return (
    <FloatingPortal>
      <div
        {...props}
        aria-label="Notifications"
        className={cx("t7-toaster", className)}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} onDismiss={dismiss} toast={toast} />
        ))}
      </div>
    </FloatingPortal>
  );
}
