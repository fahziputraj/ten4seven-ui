import { createPortal } from "react-dom";
import {
  createElement,
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
export type OverlayWidthStrategy =
  "content" | "trigger" | "min-trigger" | "fixed" | "viewport";

export interface FloatingPositionOptions {
  align?: FloatingAlign;
  /** Preferred component-owned width in pixels for the fixed strategy. */
  preferredWidth?: number;
  /** Explicitly describe whether the surface owns or follows trigger width. */
  widthStrategy?: OverlayWidthStrategy;
  /** @deprecated Use widthStrategy="min-trigger" for legacy callers. */
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
    preferredWidth,
    side = "bottom",
    widthStrategy,
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
    const measuredWidth = contentRect?.width ?? 0;
    const availableWidth = Math.max(0, viewportWidth - padding * 2);
    const strategy = widthStrategy ?? (minWidth ? "min-trigger" : "content");
    const intrinsicWidth = measuredWidth || preferredWidth || 240;
    const width =
      strategy === "trigger"
        ? anchorRect.width
        : strategy === "min-trigger"
          ? Math.max(anchorRect.width, intrinsicWidth)
          : strategy === "fixed"
            ? (preferredWidth ?? intrinsicWidth)
            : strategy === "viewport"
              ? availableWidth
              : intrinsicWidth;
    const safeWidth = Math.max(0, Math.min(width, availableWidth));
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
      position: "fixed",
      top: Math.round(top),
      visibility: "visible",
      width:
        strategy === "trigger" ||
        strategy === "min-trigger" ||
        strategy === "viewport"
          ? Math.round(safeWidth)
          : undefined,
    });
  }, [
    align,
    anchorRef,
    minWidth,
    offset,
    padding,
    preferredWidth,
    side,
    widthStrategy,
  ]);

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

const floatingLayerDismissers = new Set<() => void>();

/** Keep interactive floating surfaces mutually exclusive across one provider. */
export function useExclusiveFloatingLayer(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const dismiss = () => onCloseRef.current();
    for (const current of floatingLayerDismissers) current();
    floatingLayerDismissers.add(dismiss);
    return () => {
      floatingLayerDismissers.delete(dismiss);
    };
  }, [open]);
}

export interface FloatingPortalProps {
  /** Resolve the nearest open native dialog when the anchor lives in one. */
  anchorRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}

type FloatingScopeContract = {
  attributes: Record<`data-t7-${string}`, string>;
  scope: HTMLElement;
  variables: Record<`--t7-${string}`, string>;
};

/**
 * A portal keeps React context but leaves the DOM subtree where CSS custom
 * properties inherit. Copy the resolved contract from the nearest ThemeScope
 * onto a display-contents bridge in the existing portal root so a scoped
 * Select, Popover, or menu retains its authored tokens without giving up the
 * provider-level clipping and stacking behavior.
 */
function readFloatingScopeContract(
  anchorRef?: RefObject<HTMLElement | null>,
): FloatingScopeContract | null {
  const scope = anchorRef?.current?.closest<HTMLElement>(".t7-theme-scope");
  if (!scope || typeof window === "undefined") return null;

  const computed = window.getComputedStyle(scope);
  const variables = {} as FloatingScopeContract["variables"];
  for (let index = 0; index < computed.length; index += 1) {
    const name = computed.item(index);
    if (name.startsWith("--t7-"))
      variables[name as `--t7-${string}`] = computed
        .getPropertyValue(name)
        .trim();
  }

  const attributes = {} as FloatingScopeContract["attributes"];
  for (const attribute of Array.from(scope.attributes)) {
    if (attribute.name.startsWith("data-t7-"))
      attributes[attribute.name as `data-t7-${string}`] = attribute.value;
  }

  return { attributes, scope, variables };
}

function sameFloatingScopeContract(
  current: FloatingScopeContract | null,
  next: FloatingScopeContract | null,
) {
  if (current === next) return true;
  if (!current || !next || current.scope !== next.scope) return false;

  const sameRecord = (
    left: Record<string, string>,
    right: Record<string, string>,
  ) => {
    const leftKeys = Object.keys(left);
    return (
      leftKeys.length === Object.keys(right).length &&
      leftKeys.every((key) => left[key] === right[key])
    );
  };

  return (
    sameRecord(current.attributes, next.attributes) &&
    sameRecord(current.variables, next.variables)
  );
}

function resolveFloatingTarget(anchorRef?: RefObject<HTMLElement | null>) {
  if (typeof document === "undefined") return null;
  const dialog = anchorRef?.current?.closest("dialog[open]");
  return (
    (dialog as HTMLElement | null) ??
    document.getElementById("t7-overlay-root") ??
    document.body
  );
}

/** Mount floating content outside clipping surfaces, or inside its open native dialog. */
export function FloatingPortal({ anchorRef, children }: FloatingPortalProps) {
  const [target, setTarget] = useState<HTMLElement | null>(() =>
    resolveFloatingTarget(anchorRef),
  );
  const [scopeContract, setScopeContract] =
    useState<FloatingScopeContract | null>(null);

  useLayoutEffect(() => {
    const nextTarget = resolveFloatingTarget(anchorRef);
    setTarget((currentTarget) =>
      currentTarget === nextTarget ? currentTarget : nextTarget,
    );
  }, [anchorRef]);

  useLayoutEffect(() => {
    const updateScopeContract = () => {
      const nextContract = readFloatingScopeContract(anchorRef);
      setScopeContract((currentContract) =>
        sameFloatingScopeContract(currentContract, nextContract)
          ? currentContract
          : nextContract,
      );
    };

    updateScopeContract();
    const scope = anchorRef?.current?.closest<HTMLElement>(".t7-theme-scope");
    if (!scope || typeof MutationObserver === "undefined") return undefined;

    const observer = new MutationObserver(updateScopeContract);
    observer.observe(scope, {
      attributeFilter: ["class", "style"],
      attributes: true,
    });
    return () => observer.disconnect();
  }, [anchorRef]);

  const content = scopeContract
    ? createElement(
        "div",
        {
          ...scopeContract.attributes,
          className: "t7-floating-scope-bridge",
          style: scopeContract.variables as CSSProperties,
        },
        children,
      )
    : children;

  return target ? createPortal(content, target) : null;
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

  // The visual viewport shrinks when a mobile keyboard opens; dvh alone does
  // not reflect that in every browser. Keep the native top layer in that space.
  useEffect(() => {
    const dialog = dialogRef.current;
    const viewport = window.visualViewport;
    if (!open || !dialog || !viewport) return;
    const update = () => {
      dialog.style.setProperty(
        "--t7-dialog-viewport-height",
        `${viewport.height}px`,
      );
      dialog.style.setProperty(
        "--t7-dialog-viewport-top",
        `${viewport.offsetTop}px`,
      );
    };
    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      dialog.style.removeProperty("--t7-dialog-viewport-height");
      dialog.style.removeProperty("--t7-dialog-viewport-top");
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      const frame = requestAnimationFrame(() =>
        initialFocus?.current?.focus({ preventScroll: true }),
      );
      return () => cancelAnimationFrame(frame);
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
    // Native modality makes the page inert, but browsers may send Tab from an
    // edge control into browser chrome. Cycle explicitly within the top dialog.
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || event.defaultPrevented || !dialog.open) return;
      if ((event.target as Element).closest("dialog") !== dialog) return;
      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
        ),
      ).filter(
        (node) =>
          node.tabIndex >= 0 &&
          !node.matches(":disabled") &&
          !node.closest("[inert]") &&
          node.getClientRects().length > 0 &&
          getComputedStyle(node).visibility !== "hidden",
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("keydown", handleTab);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("keydown", handleTab);
    };
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
