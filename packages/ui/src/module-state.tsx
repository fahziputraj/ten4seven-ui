import { useId, type HTMLAttributes, type ReactNode } from "react";

import {
  getModuleStatePattern,
  type ModuleStateId,
} from "@ten4seven/contracts";
import { T7Icon, type IconName } from "@ten4seven/icons";

import { cx } from "./utils";

export interface ModuleStateProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /** Consumer-owned primary action; the renderer never creates a handler. */
  action?: ReactNode;
  description?: ReactNode;
  details?: ReactNode;
  icon?: IconName;
  secondaryAction?: ReactNode;
  state: ModuleStateId;
  title?: ReactNode;
}

/**
 * Render a consumer-supplied module lifecycle or access state.
 *
 * This component is deliberately presentation-only: applicability,
 * authorization, entitlement, resource scope, lifecycle transitions, and all
 * action handlers remain outside the shared UI package.
 */
export function ModuleState({
  action,
  children,
  className,
  description,
  details,
  icon,
  secondaryAction,
  state,
  title,
  ...props
}: ModuleStateProps) {
  const pattern = getModuleStatePattern(state);
  const titleId = useId();
  const descriptionId = `${titleId}-description`;
  const resolvedTitle = title ?? pattern.defaultTitle;
  const resolvedDescription = description ?? pattern.defaultDescription;

  return (
    <section
      {...props}
      aria-describedby={resolvedDescription ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={cx("t7-module-state", className)}
      data-emphasis={pattern.emphasis}
      data-module-state={state}
      data-tone={pattern.tone}
    >
      <span aria-hidden="true" className="t7-module-state-icon">
        <T7Icon name={icon ?? (pattern.icon as IconName)} size={22} />
      </span>
      <div className="t7-module-state-copy">
        <span className="t7-module-state-label">{pattern.label}</span>
        <h3 id={titleId}>{resolvedTitle}</h3>
        {resolvedDescription ? (
          <p id={descriptionId}>{resolvedDescription}</p>
        ) : null}
        {details ? (
          <div className="t7-module-state-details">{details}</div>
        ) : null}
        {children}
      </div>
      {action || secondaryAction ? (
        <div className="t7-module-state-actions">
          {action ? (
            <div className="t7-module-state-primary-action">{action}</div>
          ) : null}
          {secondaryAction ? (
            <div className="t7-module-state-secondary-action">
              {secondaryAction}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
