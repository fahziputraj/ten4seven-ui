import { type HTMLAttributes, type ReactNode } from "react";

import { Typography } from "./components";
import { cx } from "./utils";

export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "div" | "section";
  tone?: "base" | "raised" | "subtle" | "accent";
}

/** A broad page-region surface. Prefer Card for one contained visual record. */
export function Surface({
  as = "section",
  children,
  className,
  tone = "base",
  ...props
}: SurfaceProps) {
  const Element = as;
  return (
    <Element
      {...props}
      className={cx("t7-surface", className)}
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

/** A keyboard-focusable constrained area; it deliberately leaves native scrollbars intact. */
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
