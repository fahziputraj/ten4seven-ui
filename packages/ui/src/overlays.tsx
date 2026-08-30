import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { Button, Modal } from "./components";
import {
  FloatingPortal,
  useExclusiveFloatingLayer,
  useFloatingPosition,
} from "./overlay";
import { cx } from "./utils";

type OpenChange = (open: boolean) => void;

function useOpenState(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange?: OpenChange,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  function setOpen(next: boolean) {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }
  return [isOpen, setOpen] as const;
}

function useDismissibleLayer(
  open: boolean,
  onOpenChange: OpenChange,
  rootRef: RefObject<HTMLElement | null>,
  contentRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (
        !rootRef.current?.contains(event.target as Node) &&
        !contentRef?.current?.contains(event.target as Node)
      )
        onOpenChange(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [contentRef, onOpenChange, open, rootRef]);
}

type TriggerProps = {
  "aria-describedby"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "dialog" | "menu";
  onClick?: MouseEventHandler<HTMLElement>;
};

function OverlayTrigger({
  children,
  controls,
  expanded,
  hasPopup,
  onClick,
}: {
  children: ReactNode;
  controls: string;
  expanded: boolean;
  hasPopup: "dialog" | "menu";
  onClick: MouseEventHandler<HTMLElement>;
}) {
  const props: TriggerProps = {
    "aria-controls": controls,
    "aria-expanded": expanded,
    "aria-haspopup": hasPopup,
    onClick,
  };
  if (isValidElement<TriggerProps>(children)) {
    const child = children as ReactElement<TriggerProps>;
    return cloneElement(child, {
      ...props,
      onClick: (event) => {
        child.props.onClick?.(event);
        if (!event.defaultPrevented) onClick(event);
      },
    });
  }
  return (
    <button {...props} className="t7-overlay-plain-trigger" type="button">
      {children}
    </button>
  );
}

export interface PopoverProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> {
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: OpenChange;
  side?: "bottom" | "left" | "right" | "top";
  trigger: ReactNode;
}

/** A non-modal, dismissible anchored content surface. */
export function Popover({
  children,
  className,
  defaultOpen = false,
  open,
  onOpenChange,
  side = "bottom",
  trigger,
  ...props
}: PopoverProps) {
  const [isOpen, setOpen] = useOpenState(open, defaultOpen, onOpenChange);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentId = useId();
  const floating = useFloatingPosition(rootRef, isOpen, { side });
  useExclusiveFloatingLayer(isOpen, () => setOpen(false));
  useDismissibleLayer(isOpen, setOpen, rootRef, floating.contentRef);

  return (
    <div {...props} className={cx("t7-popover-root", className)} ref={rootRef}>
      <OverlayTrigger
        controls={contentId}
        expanded={isOpen}
        hasPopup="dialog"
        onClick={() => setOpen(!isOpen)}
      >
        {trigger}
      </OverlayTrigger>
      {isOpen ? (
        <FloatingPortal anchorRef={rootRef}>
          <div
            className={cx("t7-popover", "t7-floating-content", className)}
            data-floating-placement={floating.placement}
            data-side={floating.placement}
            id={contentId}
            ref={floating.setContentRef}
            role="dialog"
            style={floating.style}
          >
            {children}
          </div>
        </FloatingPortal>
      ) : null}
    </div>
  );
}

export interface TooltipProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "content"
> {
  children: ReactNode;
  content: ReactNode;
  side?: "bottom" | "left" | "right" | "top";
}

/** Supplemental hover/focus information; never use as the only control label. */
export function Tooltip({
  children,
  className,
  content,
  side = "top",
  ...props
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const floating = useFloatingPosition(rootRef, open, { side });
  return (
    <span
      {...props}
      className={cx("t7-tooltip-root", className)}
      ref={rootRef}
      onBlur={(event) => {
        props.onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
      onFocus={(event) => {
        props.onFocus?.(event);
        setOpen(true);
      }}
      onMouseEnter={(event) => {
        props.onMouseEnter?.(event);
        setOpen(true);
      }}
      onMouseLeave={(event) => {
        props.onMouseLeave?.(event);
        setOpen(false);
      }}
    >
      {isValidElement<TriggerProps>(children)
        ? cloneElement(
            children as ReactElement<TriggerProps>,
            {
              "aria-describedby": id,
            } as TriggerProps,
          )
        : children}
      {open ? (
        <FloatingPortal anchorRef={rootRef}>
          <span
            className="t7-tooltip t7-floating-content"
            data-floating-placement={floating.placement}
            data-side={side}
            id={id}
            ref={floating.setContentRef}
            role="tooltip"
            style={floating.style}
          >
            {content}
          </span>
        </FloatingPortal>
      ) : null}
    </span>
  );
}

export interface MenuItem {
  description?: string;
  disabled?: boolean;
  icon?: IconName;
  intent?: "default" | "danger";
  key: string;
  label: string;
  onSelect?: () => void;
  shortcut?: string;
}

export interface DropdownMenuProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  defaultOpen?: boolean;
  items: MenuItem[];
  label?: string;
  onOpenChange?: OpenChange;
  open?: boolean;
  trigger: ReactNode;
}

/** One semantic overflow/action menu for row, page, and card actions. */
export function DropdownMenu({
  className,
  defaultOpen = false,
  items,
  label = "Actions",
  onOpenChange,
  open,
  trigger,
  ...props
}: DropdownMenuProps) {
  const [isOpen, setOpen] = useOpenState(open, defaultOpen, onOpenChange);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const floating = useFloatingPosition(rootRef, isOpen, {
    align: "end",
    side: "bottom",
  });
  useExclusiveFloatingLayer(isOpen, () => setOpen(false));
  useDismissibleLayer(isOpen, setOpen, rootRef, floating.contentRef);
  return (
    <div {...props} className={cx("t7-menu-root", className)} ref={rootRef}>
      <OverlayTrigger
        controls={menuId}
        expanded={isOpen}
        hasPopup="menu"
        onClick={() => setOpen(!isOpen)}
      >
        {trigger}
      </OverlayTrigger>
      {isOpen ? (
        <FloatingPortal anchorRef={rootRef}>
          <div
            aria-label={label}
            className="t7-menu t7-floating-content"
            data-floating-placement={floating.placement}
            id={menuId}
            ref={floating.setContentRef}
            role="menu"
            style={floating.style}
          >
            {items.map((item) => (
              <button
                className="t7-menu-item"
                data-intent={item.intent ?? "default"}
                disabled={item.disabled}
                key={item.key}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                role="menuitem"
                type="button"
              >
                {item.icon ? (
                  <T7Icon aria-hidden="true" name={item.icon} size={16} />
                ) : (
                  <span />
                )}
                <span className="t7-menu-item-copy">
                  <span>{item.label}</span>
                  {item.description ? <small>{item.description}</small> : null}
                </span>
                {item.shortcut ? <kbd>{item.shortcut}</kbd> : null}
              </button>
            ))}
          </div>
        </FloatingPortal>
      ) : null}
    </div>
  );
}

/** Semantic alias for a DropdownMenu used specifically as an action overflow. */
export const ActionMenu = DropdownMenu;

export interface SplitButtonProps {
  disabled?: boolean;
  intent?: "primary" | "secondary" | "quiet" | "danger";
  items: MenuItem[];
  label: ReactNode;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

/** One primary action plus an adjacent canonical overflow menu. */
export function SplitButton({
  disabled,
  intent = "primary",
  items,
  label,
  onClick,
  size = "md",
}: SplitButtonProps) {
  return (
    <span className="t7-split-button">
      <Button disabled={disabled} intent={intent} onClick={onClick} size={size}>
        {label}
      </Button>
      <DropdownMenu
        items={items}
        trigger={
          <button
            aria-label="More actions"
            className="t7-split-button-trigger"
            data-intent={intent}
            disabled={disabled}
            type="button"
          >
            <T7Icon aria-hidden="true" name="chevronDown" size={16} />
          </button>
        }
      />
    </span>
  );
}

export interface ContextMenuProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: ReactNode;
  items: MenuItem[];
  label?: string;
}

export function ContextMenu({
  children,
  className,
  items,
  label = "Context actions",
  ...props
}: ContextMenuProps) {
  const [position, setPosition] = useState<{ left: number; top: number }>();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useExclusiveFloatingLayer(Boolean(position), () => setPosition(undefined));
  useDismissibleLayer(
    Boolean(position),
    () => setPosition(undefined),
    rootRef,
    contentRef,
  );
  return (
    <div
      {...props}
      className={cx("t7-context-menu-root", className)}
      onContextMenu={(event) => {
        props.onContextMenu?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        setPosition({
          left: Math.min(event.clientX, window.innerWidth - 224),
          top: Math.min(event.clientY, window.innerHeight - 180),
        });
      }}
      ref={rootRef}
    >
      {children}
      {position ? (
        <FloatingPortal anchorRef={rootRef}>
          <div
            aria-label={label}
            className="t7-menu t7-context-menu t7-floating-content"
            ref={contentRef}
            role="menu"
            style={position}
          >
            {items.map((item) => (
              <button
                className="t7-menu-item"
                data-intent={item.intent ?? "default"}
                disabled={item.disabled}
                key={item.key}
                onClick={() => {
                  item.onSelect?.();
                  setPosition(undefined);
                }}
                role="menuitem"
                type="button"
              >
                {item.icon ? (
                  <T7Icon aria-hidden="true" name={item.icon} size={16} />
                ) : (
                  <span />
                )}
                <span className="t7-menu-item-copy">
                  <span>{item.label}</span>
                </span>
                {item.shortcut ? <kbd>{item.shortcut}</kbd> : null}
              </button>
            ))}
          </div>
        </FloatingPortal>
      ) : null}
    </div>
  );
}

export interface AlertDialogProps {
  cancelLabel?: string;
  children?: ReactNode;
  confirmLabel: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}

/** Confirmation dialog for irreversible or consequential operations. */
export function AlertDialog({
  cancelLabel = "Cancel",
  children,
  confirmLabel,
  description,
  onClose,
  onConfirm,
  open,
  title,
}: AlertDialogProps) {
  return (
    <Modal
      description={description}
      onClose={onClose}
      open={open}
      title={title}
    >
      <div className="t7-alert-dialog-content">
        {children}
        <div className="t7-alert-dialog-actions">
          <Button intent="secondary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button intent="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
