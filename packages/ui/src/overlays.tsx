import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type KeyboardEventHandler,
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
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [contentRef, onOpenChange, open, rootRef]);
}

function dismissEscape(
  event: ReactKeyboardEvent<HTMLElement>,
  onDismiss: () => void,
) {
  if (event.key !== "Escape") return false;
  event.preventDefault();
  event.stopPropagation();
  onDismiss();
  return true;
}

type TriggerProps = {
  "aria-describedby"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-haspopup"?: "dialog" | "menu";
  onClick?: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
};

function OverlayTrigger({
  children,
  controls,
  expanded,
  hasPopup,
  onClick,
  onKeyDown,
}: {
  children: ReactNode;
  controls: string;
  expanded: boolean;
  hasPopup: "dialog" | "menu";
  onClick: MouseEventHandler<HTMLElement>;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
}) {
  const props: TriggerProps = {
    "aria-controls": controls,
    "aria-expanded": expanded,
    "aria-haspopup": hasPopup,
    onClick,
    onKeyDown,
  };
  if (isValidElement<TriggerProps>(children)) {
    const child = children as ReactElement<TriggerProps>;
    return cloneElement(child, {
      ...props,
      onClick: (event) => {
        child.props.onClick?.(event);
        if (!event.defaultPrevented) onClick(event);
      },
      onKeyDown: (event) => {
        child.props.onKeyDown?.(event);
        if (!event.defaultPrevented) onKeyDown?.(event);
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
  const popoverLabel =
    props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Popover");

  function focusTrigger() {
    window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLElement>('[aria-haspopup="dialog"]')
        ?.focus();
    });
  }

  function closePopoverAndRestoreFocus() {
    setOpen(false);
    focusTrigger();
  }

  useExclusiveFloatingLayer(isOpen, () => setOpen(false));
  useDismissibleLayer(isOpen, setOpen, rootRef, floating.contentRef);

  return (
    <div
      {...props}
      className={cx("t7-popover-root", className)}
      ref={rootRef}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (isOpen && !event.defaultPrevented)
          dismissEscape(event, closePopoverAndRestoreFocus);
      }}
    >
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
            aria-label={popoverLabel}
            aria-labelledby={props["aria-labelledby"]}
            className={cx("t7-popover", "t7-floating-content", className)}
            data-floating-placement={floating.placement}
            data-side={floating.placement}
            id={contentId}
            onKeyDown={(event) =>
              dismissEscape(event, closePopoverAndRestoreFocus)
            }
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

type MenuInitialFocus = "first" | "last";

function findEnabledMenuItem(
  items: readonly MenuItem[],
  startIndex: number,
  direction: 1 | -1,
) {
  if (items.length === 0) return -1;
  for (let offset = 0; offset < items.length; offset += 1) {
    const index =
      (startIndex + direction * offset + items.length) % items.length;
    if (!items[index]?.disabled) return index;
  }
  return -1;
}

function findMenuItemByTypeahead(
  items: readonly MenuItem[],
  query: string,
  activeIndex: number,
) {
  if (items.length === 0) return -1;
  const startIndex = activeIndex < 0 ? 0 : (activeIndex + 1) % items.length;
  for (let offset = 0; offset < items.length; offset += 1) {
    const index = (startIndex + offset) % items.length;
    const item = items[index];
    if (
      item &&
      !item.disabled &&
      item.label.toLocaleLowerCase().startsWith(query)
    )
      return index;
  }
  return -1;
}

function useMenuKeyboard(
  items: readonly MenuItem[],
  open: boolean,
  onEscape: () => void,
  contentRef: RefObject<HTMLElement | null>,
) {
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const itemsRef = useRef(items);
  const requestedInitialFocusRef = useRef<MenuInitialFocus>("first");
  const typeaheadRef = useRef({ query: "", timestamp: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);

  itemsRef.current = items;

  function focusItem(index: number) {
    if (index < 0) return;
    setActiveIndex(index);
    itemRefs.current[index]?.focus();
  }

  function focusBoundary(target: MenuInitialFocus) {
    const currentItems = itemsRef.current;
    const index =
      target === "first"
        ? findEnabledMenuItem(currentItems, 0, 1)
        : findEnabledMenuItem(currentItems, currentItems.length - 1, -1);
    focusItem(index);
  }

  function requestInitialFocus(target: MenuInitialFocus) {
    requestedInitialFocusRef.current = target;
  }

  useLayoutEffect(() => {
    if (!open) {
      requestedInitialFocusRef.current = "first";
      typeaheadRef.current = { query: "", timestamp: 0 };
      setActiveIndex(-1);
      return undefined;
    }

    const target = requestedInitialFocusRef.current;
    const currentItems = itemsRef.current;
    const index =
      target === "first"
        ? findEnabledMenuItem(currentItems, 0, 1)
        : findEnabledMenuItem(currentItems, currentItems.length - 1, -1);
    requestedInitialFocusRef.current = "first";
    setActiveIndex(index);
    // A click can restore focus to its trigger after this layout pass. Queue the
    // menu focus after the event completes so first-item focus wins consistently.
    const frame = window.requestAnimationFrame(() => {
      if (index >= 0) itemRefs.current[index]?.focus();
      else contentRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [contentRef, open]);

  function onMenuKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (dismissEscape(event, onEscape)) return;

    const currentItems = itemsRef.current;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(
        findEnabledMenuItem(
          currentItems,
          activeIndex < 0 ? 0 : activeIndex + 1,
          1,
        ),
      );
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(
        findEnabledMenuItem(
          currentItems,
          activeIndex < 0 ? currentItems.length - 1 : activeIndex - 1,
          -1,
        ),
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusBoundary("first");
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      focusBoundary("last");
      return;
    }
    if (
      event.key.length === 1 &&
      event.key !== " " &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      const character = event.key.toLocaleLowerCase();
      const now = Date.now();
      const previous = typeaheadRef.current;
      const accumulatedQuery =
        now - previous.timestamp < 500
          ? `${previous.query}${character}`
          : character;
      const query = accumulatedQuery
        .split("")
        .every((current) => current === character)
        ? character
        : accumulatedQuery;
      typeaheadRef.current = { query, timestamp: now };
      focusItem(findMenuItemByTypeahead(currentItems, query, activeIndex));
    }
  }

  return {
    activeIndex,
    focusBoundary,
    focusItem,
    itemRefs,
    onItemFocus: setActiveIndex,
    onMenuKeyDown,
    requestInitialFocus,
  };
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
  function focusTrigger() {
    window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLElement>('[aria-haspopup="menu"]')
        ?.focus();
    });
  }

  function closeMenuAndRestoreFocus() {
    setOpen(false);
    focusTrigger();
  }

  const menu = useMenuKeyboard(
    items,
    isOpen,
    closeMenuAndRestoreFocus,
    floating.contentRef,
  );

  function openMenu(initialFocus: MenuInitialFocus) {
    menu.requestInitialFocus(initialFocus);
    if (isOpen) menu.focusBoundary(initialFocus);
    else setOpen(true);
  }

  useExclusiveFloatingLayer(isOpen, () => setOpen(false));
  useDismissibleLayer(isOpen, setOpen, rootRef, floating.contentRef);
  return (
    <div
      {...props}
      className={cx("t7-menu-root", className)}
      ref={rootRef}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (isOpen && !event.defaultPrevented)
          dismissEscape(event, closeMenuAndRestoreFocus);
      }}
    >
      <OverlayTrigger
        controls={menuId}
        expanded={isOpen}
        hasPopup="menu"
        onClick={() => {
          menu.requestInitialFocus("first");
          setOpen(!isOpen);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu("first");
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu("last");
          }
        }}
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
            onKeyDown={menu.onMenuKeyDown}
            ref={floating.setContentRef}
            role="menu"
            style={floating.style}
            tabIndex={-1}
          >
            {items.map((item, index) => (
              <button
                className="t7-menu-item"
                data-intent={item.intent ?? "default"}
                disabled={item.disabled}
                key={item.key}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
                onFocus={() => menu.onItemFocus(index)}
                ref={(node) => {
                  menu.itemRefs.current[index] = node;
                }}
                role="menuitem"
                tabIndex={
                  item.disabled ? -1 : menu.activeIndex === index ? 0 : -1
                }
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
  const previousFocusRef = useRef<HTMLElement | null>(null);

  function closeContextMenu() {
    setPosition(undefined);
  }

  function closeContextMenuAndRestoreFocus() {
    const previousFocus = previousFocusRef.current;
    setPosition(undefined);
    window.requestAnimationFrame(() => {
      if (previousFocus?.isConnected) previousFocus.focus();
    });
  }

  const menu = useMenuKeyboard(
    items,
    Boolean(position),
    closeContextMenuAndRestoreFocus,
    contentRef,
  );

  function openContextMenu(left: number, top: number) {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    menu.requestInitialFocus("first");
    setPosition({
      left: Math.max(8, Math.min(left, Math.max(8, window.innerWidth - 224))),
      top: Math.max(8, Math.min(top, Math.max(8, window.innerHeight - 180))),
    });
  }

  useExclusiveFloatingLayer(Boolean(position), () => setPosition(undefined));
  useDismissibleLayer(Boolean(position), closeContextMenu, rootRef, contentRef);
  return (
    <div
      {...props}
      className={cx("t7-context-menu-root", className)}
      onContextMenu={(event) => {
        props.onContextMenu?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        openContextMenu(event.clientX, event.clientY);
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (
          event.key === "ContextMenu" ||
          (event.key === "F10" && event.shiftKey)
        ) {
          event.preventDefault();
          const anchor = event.target as HTMLElement;
          const rect = anchor.getBoundingClientRect();
          openContextMenu(rect.left, rect.bottom);
          return;
        }
        if (position) dismissEscape(event, closeContextMenuAndRestoreFocus);
      }}
      ref={rootRef}
    >
      {children}
      {position ? (
        <FloatingPortal anchorRef={rootRef}>
          <div
            aria-label={label}
            className="t7-menu t7-context-menu t7-floating-content"
            onKeyDown={menu.onMenuKeyDown}
            ref={contentRef}
            role="menu"
            style={position}
            tabIndex={-1}
          >
            {items.map((item, index) => (
              <button
                className="t7-menu-item"
                data-intent={item.intent ?? "default"}
                disabled={item.disabled}
                key={item.key}
                onClick={() => {
                  item.onSelect?.();
                  setPosition(undefined);
                }}
                onFocus={() => menu.onItemFocus(index)}
                ref={(node) => {
                  menu.itemRefs.current[index] = node;
                }}
                role="menuitem"
                tabIndex={
                  item.disabled ? -1 : menu.activeIndex === index ? 0 : -1
                }
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
