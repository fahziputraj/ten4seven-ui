import React from "react";
import { Button } from "../core/Button.jsx";
import { Modal } from "../overlay/Modal.jsx";

/** Confirmation pattern for destructive or irreversible actions. */
export function ConfirmDialog({
  open = false,
  onClose,
  onConfirm,
  title = "Konfirmasi tindakan",
  description = "Tindakan ini tidak dapat dibatalkan.",
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  tone = "danger",
  loading = false,
  children,
  ...rest
}) {
  const confirm = async () => onConfirm?.();
  return (
    <Modal
      {...rest}
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      description={description}
      icon={tone === "warning" ? "warning" : "delete"}
      tone={tone}
      footer={(
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>{cancelLabel}</Button>
          <Button variant={tone === "warning" ? "default" : "destructive"} loading={loading} onClick={confirm}>{confirmLabel}</Button>
        </>
      )}
    >
      {children && <div className="aapm-confirm-copy">{children}</div>}
    </Modal>
  );
}
