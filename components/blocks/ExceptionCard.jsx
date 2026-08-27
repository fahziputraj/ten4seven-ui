import React from "react";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";
import { StatusChip } from "../data/StatusChip.jsx";

const toneMeta = Object.freeze({
  warning: { color: "var(--warning)", hsl: "var(--warning-hsl)", icon: "warning" },
  danger: { color: "var(--danger)", hsl: "var(--danger-hsl)", icon: "error" },
  info: { color: "var(--info)", hsl: "var(--info-hsl)", icon: "info" },
  success: { color: "var(--success)", hsl: "var(--success-hsl)", icon: "success" },
});

/** A compact, actionable exception surface for queues and dashboards. */
export function ExceptionCard({
  title,
  description,
  tone = "warning",
  icon,
  status,
  meta,
  action,
  actionLabel = "Tinjau",
  onAction,
  onDismiss,
  footer,
  style,
  ...rest
}) {
  const t = toneMeta[tone] || toneMeta.warning;
  return (
    <section className="aapm-exception-card" role={tone === "danger" ? "alert" : "status"} aria-live="polite" style={style} {...rest}>
      <div className="aapm-exception-card__body">
        <span className="aapm-exception-card__icon" style={{ background: "hsl(" + t.hsl + " / .12)", color: t.color }} aria-hidden="true">
          <Icon name={icon || t.icon} size={20} />
        </span>
        <div className="aapm-exception-card__content">
          <div className="aapm-exception-card__header">
            <h2 className="aapm-exception-card__title">{title}</h2>
            {status && <StatusChip status={status} size="sm" />}
            {onDismiss && <IconButton icon="close" label="Tutup pengecualian" size="sm" onClick={onDismiss} />}
          </div>
          {description && <p className="aapm-exception-card__description">{description}</p>}
          {meta && <div className="aapm-exception-card__meta">{meta}</div>}
        </div>
      </div>
      {(action || onAction || footer) && (
        <div className="aapm-exception-card__footer">
          {footer}
          {(action || onAction) && (action || <Button size="sm" variant="outline" icon="externalLink" onClick={onAction}>{actionLabel}</Button>)}
        </div>
      )}
    </section>
  );
}
