import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

export type FloatingSide = "bottom" | "left" | "right" | "top";
export type FloatingAlign = "start" | "center" | "end";

export interface FloatingPositionOptions {
  align?: FloatingAlign;
  minWidth?: boolean;
  offset?: number;
  padding?: number;
  side?: FloatingSide;
}

export interface FloatingPositionResult {
  contentRef: RefObject<HTMLElement | null>;
  placement: FloatingSide;
  setContentRef: (node: HTMLElement | null) => void;
  style: CSSProperties;
}

/** Position non-modal content in viewport space and keep it inside the viewport. */
export function useFloatingPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  {
    align = "start",
    minWidth = false,
    offset = 6,
    padding = 8,
    side = "bottom",
  }: FloatingPositionOptions = {},
): FloatingPositionResult {
  const contentRef = useRef<HTMLElement | null>(null);
  const [contentVersion, setContentVersion] = useState(0);
  const setContentRef = useCallback((node: HTMLElement | null) => {
    contentRef.current = node;
    setContentVersion((current) => current + 1);
  }, []);
  const [placement, setPlacement] = useState<FloatingSide>(side);
  const [style, setStyle] = useState<CSSProperties>({
    position: "fixed",
    visibility: "hidden",
  });

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const content = contentRef.current;
    const anchorRect = anchor.getBoundingClientRect();
    const contentRect = content?.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const width = contentRect?.width || (minWidth ? anchorRect.width : 240);
    const safeWidth = Math.min(width, viewportWidth - padding * 2);
    const height = contentRect?.height || 160;
    let nextSide = side;
    let left = anchorRect.left;
    let top = anchorRect.bottom + offset;

    if (side === "top") {
      top = anchorRect.top - height - offset;
      if (
        top < padding &&
        anchorRect.bottom + height + offset <= viewportHeight - padding
      ) {
        nextSide = "bottom";
        top = anchorRect.bottom + offset;
      }
    } else if (
      side === "bottom" &&
      top + height > viewportHeight - padding &&
      anchorRect.top - height - offset >= padding
    ) {
      nextSide = "top";
      top = anchorRect.top - height - offset;
    } else if (side === "left") {
      left = anchorRect.left - width - offset;
      top = anchorRect.top;
      if (
        left < padding &&
        anchorRect.right + width + offset <= viewportWidth - padding
      ) {
        nextSide = "right";
        left = anchorRect.right + offset;
      }
    } else if (side === "right") {
      left = anchorRect.right + offset;
      top = anchorRect.top;
      if (
        left + width > viewportWidth - padding &&
        anchorRect.left - width - offset >= padding
      ) {
        nextSide = "left";
        left = anchorRect.left - width - offset;
      }
    }

    if (nextSide === "bottom" || nextSide === "top") {
      if (align === "center")
        left = anchorRect.left + (anchorRect.width - width) / 2;
      if (align === "end") left = anchorRect.right - width;
    } else if (align === "center") {
      top = anchorRect.top + (anchorRect.height - height) / 2;
    } else if (align === "end") {
      top = anchorRect.bottom - height;
    }

    left = Math.min(
      Math.max(left, padding),
      Math.max(padding, viewportWidth - safeWidth - padding),
    );
    top = Math.min(
      Math.max(top, padding),
      Math.max(padding, viewportHeight - height - padding),
    );
    const availableHeight =
      nextSide === "top"
        ? anchorRect.top - offset - padding
        : viewportHeight - (anchorRect.bottom + offset) - padding;

    setPlacement(nextSide);
    setStyle({
      left: Math.round(left),
      boxSizing: "border-box",
      maxHeight: `${Math.max(96, Math.round(availableHeight))}px`,
      maxWidth: `calc(100vw - ${padding * 2}px)`,
      minWidth: minWidth ? Math.round(safeWidth) : undefined,
      position: "fixed",
      top: Math.round(top),
      visibility: "visible",
      width: minWidth ? Math.round(safeWidth) : undefined,
    });
  }, [align, anchorRef, minWidth, offset, padding, side]);

  useLayoutEffect(() => {
    if (!open) {
      setStyle({ position: "fixed", visibility: "hidden" });
      setPlacement(side);
      return undefined;
    }

    updatePosition();
    const initialFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(updatePosition);
    });
    const initialTimer = window.setTimeout(updatePosition, 0);
    const scheduleUpdate = () => window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", scheduleUpdate);
    document.addEventListener("scroll", scheduleUpdate, true);
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(scheduleUpdate);
    if (anchorRef.current) resizeObserver?.observe(anchorRef.current);
    if (contentRef.current) resizeObserver?.observe(contentRef.current);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.clearTimeout(initialTimer);
      window.removeEventListener("resize", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate, true);
      resizeObserver?.disconnect();
    };
  }, [anchorRef, contentVersion, open, side, updatePosition]);

  return { contentRef, placement, setContentRef, style };
}

/** All non-modal floating content is mounted outside clipping app surfaces. */
export function FloatingPortal({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<HTMLElement | null>(() =>
    typeof document === "undefined"
      ? null
      : document.getElementById("t7-overlay-root"),
  );

  useLayoutEffect(() => {
    const nextTarget =
      document.getElementById("t7-overlay-root") ?? document.body;
    setTarget((currentTarget) =>
      currentTarget === nextTarget ? currentTarget : nextTarget,
    );
  }, []);

  return target ? createPortal(children, target) : null;
}

let nativeDialogLockCount = 0;
let previousBodyOverflow = "";
let previousBodyPaddingRight = "";

/**
 * Native modal dialogs provide focus trapping, Escape behavior, backdrop
 * inertness, scroll locking, and focus restoration without exposing another
 * overlay runtime to ten4seven consumers.
 */
export function useNativeDialog(
  open: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => initialFocus?.current?.focus());
      return;
    }

    if (!open && dialog.open) dialog.close();
  }, [initialFocus, open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;
    if (nativeDialogLockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousBodyPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0)
        document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    nativeDialogLockCount += 1;
    return () => {
      nativeDialogLockCount = Math.max(0, nativeDialogLockCount - 1);
      if (nativeDialogLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.paddingRight = previousBodyPaddingRight;
      }
    };
  }, [open]);

  return dialogRef;
}
