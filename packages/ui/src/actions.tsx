import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { cx, updatePointerPosition } from "./utils";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: IconName;
  label: string;
  intent?: "secondary" | "quiet" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      className,
      icon,
      intent = "quiet",
      label,
      loading = false,
      onPointerMove,
      size = "md",
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        aria-busy={loading || undefined}
        aria-label={label}
        className={cx("t7-icon-button", className)}
        data-intent={intent}
        data-loading={loading || undefined}
        data-size={size}
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
        ) : (
          <T7Icon aria-hidden="true" name={icon} size={18} />
        )}
      </button>
    );
  },
);

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: "horizontal" | "vertical";
}

export function ButtonGroup({
  children,
  className,
  label = "Button group",
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-button-group", className)}
      data-orientation={orientation}
      role="group"
    >
      {children}
    </div>
  );
}

export interface ToggleButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value"
> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  leadingIcon?: IconName;
  value?: string;
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(
    {
      children,
      className,
      leadingIcon,
      onClick,
      onPressedChange,
      onPointerMove,
      pressed = false,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        aria-pressed={pressed}
        className={cx("t7-toggle-button", className)}
        data-pressed={pressed || undefined}
        onPointerMove={(event) => {
          updatePointerPosition(
            event.currentTarget,
            event.clientX,
            event.clientY,
          );
          onPointerMove?.(event);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) onPressedChange?.(!pressed);
        }}
        type={type}
      >
        {leadingIcon ? (
          <T7Icon aria-hidden="true" name={leadingIcon} size={16} />
        ) : null}
        {children}
      </button>
    );
  },
);

export interface ToggleButtonGroupProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  children: ReactNode;
  label?: string;
  type?: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
}

export function ToggleButtonGroup({
  children,
  className,
  label = "Toggle options",
  onValueChange,
  type = "single",
  value,
  ...props
}: ToggleButtonGroupProps) {
  const values = Array.isArray(value) ? value : [value];

  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-toggle-button-group", className)}
      data-type={type}
      role="group"
    >
      {Children.map(children, (child) => {
        if (!isValidElement<ToggleButtonProps>(child)) return child;
        const childValue = child.props.value;
        if (!childValue) return child;
        const pressed = values.includes(childValue);
        return cloneElement(child as ReactElement<ToggleButtonProps>, {
          onPressedChange: (nextPressed) => {
            child.props.onPressedChange?.(nextPressed);
            if (type === "single") {
              if (nextPressed) onValueChange(childValue);
              return;
            }
            const nextValues = nextPressed
              ? [...values, childValue]
              : values.filter((item) => item !== childValue);
            onValueChange(nextValues);
          },
          pressed,
        });
      })}
    </div>
  );
}

export interface SpeedDialAction {
  disabled?: boolean;
  icon: IconName;
  id: string;
  label: string;
  onSelect: () => void;
}

export interface SpeedDialProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  actions: SpeedDialAction[];
  defaultOpen?: boolean;
  label?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placement?: "bottom" | "left" | "right" | "top";
  triggerLabel?: string;
}

/** A bounded cluster of related icon actions with one discoverable trigger. */
export function SpeedDial({
  actions,
  className,
  defaultOpen = false,
  label = "Quick actions",
  onOpenChange,
  open,
  placement = "top",
  triggerLabel = "Open quick actions",
  ...props
}: SpeedDialProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const actionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isOpen = open ?? uncontrolledOpen;
  const menuId = useId();

  function setOpen(next: boolean) {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  function focusAction(index: number) {
    const nextIndex = (index + actions.length) % Math.max(actions.length, 1);
    actionRefs.current[nextIndex]?.focus();
  }

  function handleActionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (!actions.length) return;
    if (event.key === "Home") {
      event.preventDefault();
      focusAction(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusAction(actions.length - 1);
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusAction(index + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusAction(index - 1);
    }
  }

  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-speed-dial", className)}
      data-open={isOpen || undefined}
      data-placement={placement}
    >
      {isOpen ? (
        <div
          aria-label={label}
          className="t7-speed-dial-actions"
          id={menuId}
          role="menu"
        >
          {actions.map((action, index) => (
            <span className="t7-speed-dial-action-wrap" key={action.id}>
              <IconButton
                className="t7-speed-dial-action"
                disabled={action.disabled}
                icon={action.icon}
                label={action.label}
                onClick={() => {
                  action.onSelect();
                  setOpen(false);
                }}
                onKeyDown={(event) => handleActionKeyDown(event, index)}
                ref={(node) => {
                  actionRefs.current[index] = node;
                }}
                role="menuitem"
              />
              <span aria-hidden="true" className="t7-speed-dial-action-label">
                {action.label}
              </span>
            </span>
          ))}
        </div>
      ) : null}
      <IconButton
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="t7-speed-dial-trigger"
        icon={isOpen ? "close" : "add"}
        label={isOpen ? "Close quick actions" : triggerLabel}
        onClick={() => setOpen(!isOpen)}
      />
    </div>
  );
}

export interface DragHandleProps extends Omit<
  IconButtonProps,
  "icon" | "label"
> {
  label?: string;
}

/** A compact sortable affordance; drag state remains owned by the consumer. */
export function DragHandle({
  className,
  label = "Drag to reorder",
  ...props
}: DragHandleProps) {
  return (
    <IconButton
      {...props}
      aria-roledescription="sortable"
      className={cx("t7-drag-handle", className)}
      icon="menu"
      label={label}
      size={props.size ?? "sm"}
    />
  );
}
