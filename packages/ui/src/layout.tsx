import {
  Children,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

import {
  type SurfaceColorway,
  type SurfaceEmphasis,
  Typography,
} from "./components";
import type { MeasureIntent } from "@ten4seven/contracts";
import { cx } from "./utils";

export type ContainerSize =
  "reading" | "form" | "application" | "data" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "aside" | "div" | "main" | "section";
  /** Selects the canonical content rail; the shell still owns page gutters. */
  size?: ContainerSize;
  /** Optional semantic width intent; omit it to retain the selected rail. */
  measure?: MeasureIntent;
}

/** Constrains route content without creating a second page shell. */
export function Container({
  as = "div",
  children,
  className,
  measure,
  size = "application",
  ...props
}: ContainerProps) {
  const Element = as;
  return (
    <Element
      {...props}
      className={cx("t7-container", className)}
      data-t7-measure={measure}
      data-t7-rail={size}
    >
      {children}
    </Element>
  );
}

export type StackDirection = "column" | "row";
export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  align?: "baseline" | "center" | "end" | "start" | "stretch";
  direction?: StackDirection;
  gap?: StackGap;
  justify?: "around" | "between" | "center" | "end" | "start";
  wrap?: boolean;
}

/** A token-spaced composition helper for horizontal and vertical groups. */
export function Stack({
  align = "stretch",
  children,
  className,
  direction = "column",
  gap = "md",
  justify = "start",
  wrap = false,
  ...props
}: StackProps) {
  return (
    <div
      {...props}
      className={cx("t7-stack", className)}
      data-align={align}
      data-direction={direction}
      data-gap={gap}
      data-justify={justify}
      data-wrap={wrap || undefined}
    >
      {children}
    </div>
  );
}

export type SplitPaneOrientation = "horizontal" | "vertical";
export type SplitPaneMinimumMeasure = Exclude<MeasureIntent, "fill">;

export interface SplitPaneProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> {
  children: ReactNode;
  defaultSplit?: number;
  minEnd?: number;
  /** Shared minimum useful measure for each pane; percentage bounds remain compatible. */
  minPaneMeasure?: SplitPaneMinimumMeasure;
  minStart?: number;
  onSplitChange?: (split: number) => void;
  orientation?: SplitPaneOrientation;
  separatorLabel?: string;
  split?: number;
}

/** A keyboard and pointer-resizable two-pane workspace. Values are percentages. */
export function SplitPane({
  children,
  className,
  defaultSplit = 50,
  minEnd = 20,
  minPaneMeasure = "compact",
  minStart = 20,
  onSplitChange,
  orientation = "horizontal",
  separatorLabel = "Resize panes",
  split,
  ...props
}: SplitPaneProps) {
  const paneChildren = Children.toArray(children);
  const [uncontrolledSplit, setUncontrolledSplit] = useState(() =>
    clampSplit(defaultSplit, minStart, minEnd),
  );
  const [dragging, setDragging] = useState(false);
  const resolvedSplit = clampSplit(
    split ?? uncontrolledSplit,
    minStart,
    minEnd,
  );

  function commitSplit(next: number) {
    const clamped = clampSplit(next, minStart, minEnd);
    if (split === undefined) setUncontrolledSplit(clamped);
    onSplitChange?.(clamped);
  }

  function updateFromPointer(event: PointerEvent<HTMLDivElement>) {
    const root = event.currentTarget.parentElement;
    if (!root) return;
    const bounds = root.getBoundingClientRect();
    const size = orientation === "horizontal" ? bounds.width : bounds.height;
    const offset =
      orientation === "horizontal"
        ? event.clientX - bounds.left
        : event.clientY - bounds.top;
    if (size <= 0) return;
    commitSplit((offset / size) * 100);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const increment = event.shiftKey ? 10 : 2;
    const positive =
      orientation === "horizontal"
        ? event.key === "ArrowRight"
        : event.key === "ArrowDown";
    const negative =
      orientation === "horizontal"
        ? event.key === "ArrowLeft"
        : event.key === "ArrowUp";
    if (event.key === "Home") {
      event.preventDefault();
      commitSplit(minStart);
    } else if (event.key === "End") {
      event.preventDefault();
      commitSplit(100 - minEnd);
    } else if (positive || negative) {
      event.preventDefault();
      commitSplit(resolvedSplit + (positive ? increment : -increment));
    }
  }

  return (
    <div
      {...props}
      className={cx("t7-split-pane", className)}
      data-dragging={dragging || undefined}
      data-min-pane-measure={minPaneMeasure}
      data-orientation={orientation}
      style={
        {
          ...props.style,
          "--t7-split-position": `${resolvedSplit}%`,
        } as CSSProperties
      }
    >
      <div className="t7-split-pane-start">{paneChildren[0]}</div>
      <div
        aria-label={separatorLabel}
        aria-orientation={orientation}
        aria-valuemax={100 - minEnd}
        aria-valuemin={minStart}
        aria-valuenow={Math.round(resolvedSplit)}
        className="t7-split-pane-separator"
        onKeyDown={handleKeyDown}
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updateFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (dragging) updateFromPointer(event);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
          setDragging(false);
        }}
        role="separator"
        tabIndex={0}
      >
        <span aria-hidden="true" className="t7-split-pane-grip" />
      </div>
      <div className="t7-split-pane-end">{paneChildren[1]}</div>
    </div>
  );
}

function clampSplit(value: number, minStart: number, minEnd: number) {
  const lower = Math.min(Math.max(minStart, 0), 100);
  const upper = Math.max(lower, Math.min(100 - Math.max(minEnd, 0), 100));
  return Math.min(Math.max(value, lower), upper);
}

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section";
  /** Select an active Theme Studio chart-series hue for solid categorical emphasis. */
  colorway?: SurfaceColorway;
  emphasis?: SurfaceEmphasis;
  tone?:
    | "base"
    | "raised"
    | "subtle"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info";
}

/** A broad page-region surface. Prefer Card for one contained visual record. */
export function Surface({
  as = "section",
  children,
  className,
  colorway,
  emphasis,
  tone = "base",
  ...props
}: SurfaceProps) {
  const Element = as;
  return (
    <Element
      {...props}
      className={cx("t7-surface", className)}
      data-colorway={colorway}
      data-emphasis={emphasis}
      data-tone={tone}
    >
      {children}
    </Element>
  );
}

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: "aside" | "div" | "section";
  padded?: boolean;
}

/** A bounded supporting region, suitable for settings or a side inspector. */
export function Panel({
  as = "section",
  children,
  className,
  padded = true,
  ...props
}: PanelProps) {
  const Element = as;
  return (
    <Element
      {...props}
      className={cx("t7-panel", className)}
      data-padded={padded || undefined}
    >
      {children}
    </Element>
  );
}

export interface SectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  actions?: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  title?: ReactNode;
}

export function Section({
  actions,
  children,
  className,
  description,
  title,
  ...props
}: SectionProps) {
  return (
    <section {...props} className={cx("t7-section", className)}>
      {title || description || actions ? (
        <header className="t7-section-header">
          <div>
            {title ? (
              <Typography as="h2" typeRole="heading-sm">
                {title}
              </Typography>
            ) : null}
            {description ? (
              <Typography as="p" typeRole="body-sm">
                {description}
              </Typography>
            ) : null}
          </div>
          {actions ? <div className="t7-section-actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="t7-section-content">{children}</div>
    </section>
  );
}

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      {...props}
      aria-orientation={orientation}
      className={cx("t7-separator", className)}
      data-orientation={orientation}
      role="separator"
    />
  );
}

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  maxHeight?: string | number;
}

/** A keyboard-focusable constrained area with native scrolling and shared rail styling. */
export function ScrollArea({
  children,
  className,
  label,
  maxHeight,
  style,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-scroll-area", className)}
      style={{ maxHeight, ...style }}
      tabIndex={props.tabIndex ?? 0}
    >
      {children}
    </div>
  );
}
