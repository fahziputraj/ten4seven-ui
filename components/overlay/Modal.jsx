import React from "react";
import { IconButton } from "../core/IconButton.jsx";
import { Icon } from "../core/Icon.jsx";

const widths = { sm: 400, md: 520, lg: 680, xl: 880 };

export function Modal({ open = true, onClose, title, description, icon, tone, size = "md", footer, children, style, ...rest }) {
  const dialogRef = React.useRef(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  React.useEffect(() => {
    if (!open) return undefined;
    const previousActive = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusableSelector = "button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";
    const focusInitial = () => {
      const first = dialogRef.current?.querySelector(focusableSelector);
      (first || dialogRef.current)?.focus();
    };
    const frame = window.requestAnimationFrame ? window.requestAnimationFrame(focusInitial) : window.setTimeout(focusInitial, 0);
    const onKey = (e) => {
      if (e.key === "Escape") { onClose?.(); return; }
      if (e.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) || []);
      if (!focusable.length) { e.preventDefault(); dialogRef.current?.focus(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      if (window.cancelAnimationFrame && typeof frame === "number") window.cancelAnimationFrame(frame);
      else window.clearTimeout(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previousActive && typeof previousActive.focus === "function") previousActive.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  const tint = tone === "danger" ? { bg: "hsl(var(--danger-hsl) / .1)", fg: "var(--danger)" }
    : tone === "warning" ? { bg: "var(--tint-orange)", fg: "var(--tint-orange-foreground)" }
    : { bg: "var(--tint-green)", fg: "var(--tint-green-foreground)" };
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center",
      padding: "var(--space-6)", background: "hsl(var(--aapm-green-950-hsl) / .45)",
      animation: "aapm-rise var(--duration-slow) var(--ease-out) both",
    }} onClick={onClose}>
      <div ref={dialogRef} role="dialog" tabIndex={-1} aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descriptionId : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: widths[size], maxHeight: "86vh", display: "flex", flexDirection: "column",
          borderRadius: "var(--radius-shell)", border: "1px solid var(--surface-border)",
          background: "var(--popover)", boxShadow: "var(--shadow-3)", overflow: "hidden", ...style,
        }} {...rest}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", padding: "var(--space-6) var(--space-6) var(--space-4)" }}>
          {icon && <span style={{
            height: 40, width: 40, flex: "none", borderRadius: "var(--radius-control)",
            display: "inline-flex", alignItems: "center", justifyContent: "center", background: tint.bg, color: tint.fg,
          }}><Icon name={icon} size={20} /></span>}
          <div style={{ minWidth: 0, flex: 1 }}>
            <h2 id={titleId} style={{ margin: 0, font: "var(--type-card-title)", fontSize: "var(--text-lg)", letterSpacing: "var(--tracking-title)", color: "var(--foreground)" }}>{title}</h2>
            {description && <p id={descriptionId} style={{ margin: "6px 0 0", font: "var(--type-body)", fontSize: "var(--text-sm)", lineHeight: "1.2rem", color: "var(--muted-foreground)" }}>{description}</p>}
          </div>
          {onClose && <IconButton icon="close" label="Tutup" variant="ghost" size="sm" onClick={onClose} />}
        </div>
        {children != null && <div style={{ padding: "0 var(--space-6) var(--space-6)", overflowY: "auto", font: "var(--type-body)" }}>{children}</div>}
        {footer && (
          <div style={{
            display: "flex", justifyContent: "flex-end", gap: "var(--space-2)", flexWrap: "wrap",
            padding: "var(--space-4) var(--space-6)", borderTop: "1px solid var(--border)", background: "var(--surface-subtle)",
          }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
