import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
} from "react";

import { cx } from "./utils";

/** A compact keyboard shortcut or platform key label. */
export interface KbdProps extends HTMLAttributes<HTMLElement> {}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, ...props },
  ref,
) {
  return <kbd {...props} className={cx("t7-kbd", className)} ref={ref} />;
});

Kbd.displayName = "Kbd";

/** A semantic link with the shared ten4seven focus and interaction treatment. */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, external = false, rel, target, ...props },
  ref,
) {
  const resolvedTarget = external ? (target ?? "_blank") : target;
  const resolvedRel = external
    ? [rel, resolvedTarget === "_blank" ? "noreferrer" : ""]
        .filter(Boolean)
        .join(" ") || undefined
    : rel;

  return (
    <a
      {...props}
      className={cx("t7-link", className)}
      ref={ref}
      rel={resolvedRel}
      target={resolvedTarget}
    />
  );
});

Link.displayName = "Link";
