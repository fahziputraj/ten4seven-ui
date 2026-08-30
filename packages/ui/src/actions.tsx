import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
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
