import {
  createContext,
  useContext,
  useEffect,
  useId,
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

export type BannerUrgency = "polite" | "assertive" | "consumer-controlled";

export interface BannerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  action?: ReactNode;
  description?: ReactNode;
  onDismiss?: () => void;
  title: ReactNode;
  tone?: FeedbackTone;
  urgency?: BannerUrgency;
}

/** Page or shell-level feedback; use Alert for in-context surface feedback. */
export function Banner({
  action,
  children,
  className,
  description,
  onDismiss,
  title,
  tone = "info",
  urgency = "polite",
  ...props
}: BannerProps) {
  const isAssertive = urgency === "assertive" || tone === "danger";
  return (
    <aside
      {...props}
      aria-atomic="true"
      aria-live={urgency === "consumer-controlled" ? undefined : urgency}
      className={cx("t7-banner", className)}
      data-tone={tone}
      data-urgency={urgency}
      role={isAssertive ? "alert" : "status"}
    >
      <T7Icon
        aria-hidden="true"
        className="t7-banner-icon"
        name={feedbackIcons[tone]}
        size={18}
      />
      <div className="t7-banner-copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
        {children}
      </div>
      {action ? <div className="t7-banner-action">{action}</div> : null}
      {onDismiss ? (
        <IconButton
          icon="close"
          label="Dismiss banner"
          onClick={onDismiss}
          size="sm"
        />
      ) : null}
    </aside>
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
  description,
  icon,
  state,
  title,
  ...props
}: StateViewProps) {
  const titleId = useId();
  return (
    <div
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? undefined : (ariaLabelledby ?? titleId)}
      className={cx("t7-state-view", className)}
      data-state={state}
      role={state === "error" ? "alert" : "status"}
    >
      <span aria-hidden="true" className="t7-state-view-icon">
        <T7Icon name={icon ?? stateIcons[state]} size={22} />
      </span>
      <h2 id={titleId}>{title}</h2>
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
  indeterminate = false,
  label,
  max = 100,
  showValue = false,
  value = 0,
  ...props
}: ProgressProps) {
  const labelId = useId();
  const normalized = clamp(value, 0, max);
  const percentage = max > 0 ? Math.round((normalized / max) * 100) : 0;
  const hasLabel = label !== undefined && label !== null;
  return (
    <div
      {...props}
      className={cx("t7-progress", className)}
      data-indeterminate={indeterminate || undefined}
    >
      {hasLabel || showValue ? (
        <div className="t7-progress-label" id={hasLabel ? labelId : undefined}>
          <span>{label}</span>
          {showValue ? <span>{percentage}%</span> : null}
        </div>
      ) : null}
      <div
        aria-label={ariaLabel ?? (!hasLabel ? "Progress" : undefined)}
        aria-labelledby={
          ariaLabel
            ? undefined
            : (ariaLabelledby ?? (hasLabel ? labelId : undefined))
        }
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
  label = "Progress",
  max = 100,
  size = 42,
  value = 0,
  ...props
}: CircularProgressProps) {
  const labelId = useId();
  const normalized = clamp(value, 0, max);
  const percentage = max > 0 ? normalized / max : 0;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  return (
    <div
      {...props}
      aria-label={ariaLabel}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={normalized}
      aria-labelledby={ariaLabel ? undefined : (ariaLabelledby ?? labelId)}
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
      <span className="t7-visually-hidden" id={labelId}>
        {label}
      </span>
      <span aria-hidden="true">{Math.round(percentage * 100)}%</span>
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

export interface NotificationItem {
  action?: { label: string; onAction: () => void };
  description?: ReactNode;
  id: string;
  read?: boolean;
  timestamp?: ReactNode;
  title: ReactNode;
  tone?: FeedbackTone;
}

export interface NotificationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  notification: NotificationItem;
  onDismiss?: (id: string) => void;
  onMarkRead?: (id: string) => void;
  onSelect?: (id: string) => void;
}

/** One persisted/inspectable notification. Persistence remains consumer-owned. */
export function Notification({
  className,
  notification,
  onDismiss,
  onMarkRead,
  onSelect,
  ...props
}: NotificationProps) {
  const titleId = useId();
  const tone = notification.tone ?? "neutral";
  const isUnread = !notification.read;
  return (
    <article
      {...props}
      aria-labelledby={titleId}
      className={cx("t7-notification", className)}
      data-read={notification.read ? "true" : "false"}
      data-tone={tone}
      role="listitem"
    >
      <span aria-hidden="true" className="t7-notification-icon">
        <T7Icon name={feedbackIcons[tone]} size={17} />
      </span>
      <div className="t7-notification-copy">
        <div className="t7-notification-heading">
          <strong id={titleId}>{notification.title}</strong>
          {notification.timestamp ? (
            <span className="t7-notification-time">
              {notification.timestamp}
            </span>
          ) : null}
        </div>
        {notification.description ? <p>{notification.description}</p> : null}
        <div className="t7-notification-actions">
          {notification.action ? (
            <Button
              intent="quiet"
              onClick={notification.action.onAction}
              size="sm"
            >
              {notification.action.label}
            </Button>
          ) : null}
          {onSelect ? (
            <Button
              intent="quiet"
              onClick={() => onSelect(notification.id)}
              size="sm"
            >
              View
            </Button>
          ) : null}
          {isUnread && onMarkRead ? (
            <Button
              intent="quiet"
              onClick={() => onMarkRead(notification.id)}
              size="sm"
            >
              Mark read
            </Button>
          ) : null}
          {onDismiss ? (
            <IconButton
              icon="close"
              label="Dismiss notification"
              onClick={() => onDismiss(notification.id)}
              size="sm"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

export interface NotificationCenterProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  emptyMessage?: ReactNode;
  items: readonly NotificationItem[];
  label?: string;
  maxVisible?: number;
  onClear?: () => void;
  onDismiss?: (id: string) => void;
  onMarkAllRead?: () => void;
  onMarkRead?: (id: string) => void;
  onSelect?: (id: string) => void;
}

/** Bounded inspectable notification history; transport and persistence stay outside. */
export function NotificationCenter({
  className,
  emptyMessage = "You’re all caught up.",
  items,
  label = "Notification center",
  maxVisible,
  onClear,
  onDismiss,
  onMarkAllRead,
  onMarkRead,
  onSelect,
  ...props
}: NotificationCenterProps) {
  const titleId = useId();
  const visibleItems = maxVisible ? items.slice(0, maxVisible) : items;
  const unreadCount = items.filter((item) => !item.read).length;
  return (
    <section
      {...props}
      aria-labelledby={titleId}
      className={cx("t7-notification-center", className)}
    >
      <div className="t7-notification-center-header">
        <div>
          <h2 className="t7-notification-center-title" id={titleId}>
            {label}
          </h2>
          <span className="t7-notification-center-count">
            {unreadCount} unread
          </span>
        </div>
        <div className="t7-notification-center-actions">
          {onMarkAllRead && unreadCount > 0 ? (
            <Button intent="quiet" onClick={onMarkAllRead} size="sm">
              Mark all read
            </Button>
          ) : null}
          {onClear && items.length > 0 ? (
            <Button intent="quiet" onClick={onClear} size="sm">
              Clear
            </Button>
          ) : null}
        </div>
      </div>
      {visibleItems.length > 0 ? (
        <div className="t7-notification-list" role="list">
          {visibleItems.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onDismiss={onDismiss}
              onMarkRead={onMarkRead}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="t7-notification-empty" role="status">
          <T7Icon aria-hidden="true" name="check" size={18} />
          <span>{emptyMessage}</span>
        </div>
      )}
    </section>
  );
}
