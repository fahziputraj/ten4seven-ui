import {
  useId,
  useRef,
  useState,
  type DragEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { IconButton } from "./actions";
import { StatusChip } from "./data-display";
import { Progress } from "./feedback";
import { cx, formatFileSize } from "./utils";

export interface FileUploadProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  accept?: string;
  children?: ReactNode;
  disabled?: boolean;
  label?: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  onReject?: (file: File, reason: "maxFiles" | "maxSize" | "type") => void;
  value?: File[];
}

/** Client-side file selection and validation only; it does not imply storage. */
export function FileUpload({
  accept,
  children,
  className,
  disabled = false,
  label = "Upload files",
  maxFiles,
  maxSize,
  multiple = true,
  onFilesChange,
  onReject,
  value = [],
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const id = useId();
  const acceptedTypes =
    accept
      ?.split(",")
      .map((part) => part.trim())
      .filter(Boolean) ?? [];

  function fileMatches(file: File) {
    if (acceptedTypes.length === 0) return true;
    return acceptedTypes.some((type) => {
      if (type.startsWith("."))
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      if (type.endsWith("/*")) return file.type.startsWith(type.slice(0, -1));
      return file.type === type;
    });
  }

  function acceptFiles(nextFiles: File[]) {
    const accepted: File[] = [];
    for (const file of nextFiles) {
      if (!fileMatches(file)) {
        onReject?.(file, "type");
        continue;
      }
      if (maxSize && file.size > maxSize) {
        onReject?.(file, "maxSize");
        continue;
      }
      if (maxFiles && value.length + accepted.length >= maxFiles) {
        onReject?.(file, "maxFiles");
        continue;
      }
      accepted.push(file);
    }
    if (accepted.length > 0)
      onFilesChange(multiple ? [...value, ...accepted] : accepted.slice(0, 1));
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) acceptFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <div {...props} className={cx("t7-file-upload", className)}>
      <input
        accept={accept}
        aria-label={label}
        aria-hidden="true"
        className="t7-visually-hidden"
        disabled={disabled}
        id={id}
        multiple={multiple}
        onChange={(event) => {
          acceptFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
      <button
        aria-describedby={children ? `${id}-description` : undefined}
        className="t7-file-dropzone"
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        type="button"
      >
        <T7Icon aria-hidden="true" name="upload" size={22} />
        <strong>{label}</strong>
        {children ? (
          <span id={`${id}-description`}>{children}</span>
        ) : (
          <span>Drop files here or browse from your device.</span>
        )}
      </button>
    </div>
  );
}

/** Presentation-only file lifecycle; transport and retry policy stay consumer-owned. */
export type FileStatus =
  | "queued"
  | "uploading"
  | "retrying"
  | "ready"
  | "success"
  | "error"
  | "canceled";

export interface FileItemProps extends HTMLAttributes<HTMLLIElement> {
  error?: ReactNode;
  icon?: IconName;
  name: string;
  onRemove?: () => void;
  progress?: number;
  size?: number;
  status?: FileStatus;
}

export function FileItem({
  className,
  error,
  icon = "file",
  name,
  onRemove,
  progress,
  size,
  status = "ready",
  ...props
}: FileItemProps) {
  return (
    <li
      {...props}
      className={cx("t7-file-item", className)}
      data-status={status}
    >
      <span aria-hidden="true" className="t7-file-item-icon">
        <T7Icon name={icon} size={18} />
      </span>
      <div>
        <strong>{name}</strong>
        <span>
          {size === undefined ? "Size unavailable" : formatFileSize(size)}
        </span>
        {status === "uploading" || status === "retrying" ? (
          <Progress label="Upload progress" showValue value={progress ?? 0} />
        ) : null}
        {error ? <small>{error}</small> : null}
      </div>
      {status === "queued" ? (
        <StatusChip tone="neutral">Queued</StatusChip>
      ) : null}
      {status === "ready" ? (
        <StatusChip tone="success">Ready</StatusChip>
      ) : null}
      {status === "uploading" ? (
        <StatusChip tone="info">Uploading</StatusChip>
      ) : null}
      {status === "retrying" ? (
        <StatusChip tone="warning">Retrying</StatusChip>
      ) : null}
      {status === "success" ? (
        <StatusChip tone="success">Uploaded</StatusChip>
      ) : null}
      {status === "error" ? <StatusChip tone="danger">Error</StatusChip> : null}
      {status === "canceled" ? (
        <StatusChip tone="neutral">Canceled</StatusChip>
      ) : null}
      {onRemove ? (
        <IconButton
          icon="delete"
          label={`Remove ${name}`}
          onClick={onRemove}
          size="sm"
        />
      ) : null}
    </li>
  );
}

export interface FileListProps extends Omit<
  HTMLAttributes<HTMLOListElement>,
  "children"
> {
  files: Array<Omit<FileItemProps, "className"> & { id: string }>;
}

export function FileList({ className, files, ...props }: FileListProps) {
  if (files.length === 0) return null;
  return (
    <ol {...props} className={cx("t7-file-list", className)}>
      {files.map((file) => (
        <FileItem {...file} key={file.id} />
      ))}
    </ol>
  );
}

export type FilePreviewStatus = "error" | "processing" | "ready";

export interface FilePreviewProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  alt?: string;
  name: string;
  onDownload?: () => void;
  onPreview?: () => void;
  onRemove?: () => void;
  size?: number;
  src?: string;
  status?: FilePreviewStatus;
  type?: string;
}

/** A bounded file record with optional media preview and explicit actions. */
export function FilePreview({
  alt,
  className,
  name,
  onDownload,
  onPreview,
  onRemove,
  size,
  src,
  status = "ready",
  type,
  ...props
}: FilePreviewProps) {
  const isImage = Boolean(src && type?.startsWith("image/"));
  const icon = type?.includes("pdf") ? "pdf" : isImage ? "image" : "file";
  return (
    <article
      {...props}
      className={cx("t7-file-preview", className)}
      data-status={status}
    >
      <div className="t7-file-preview-media">
        {isImage ? (
          <img alt={alt ?? name} src={src} />
        ) : (
          <T7Icon aria-hidden="true" name={icon} size={30} />
        )}
      </div>
      <div className="t7-file-preview-copy">
        <strong title={name}>{name}</strong>
        <span>
          {type || "File"}
          {size === undefined ? "" : ` · ${formatFileSize(size)}`}
        </span>
      </div>
      <StatusChip tone={status === "error" ? "danger" : "neutral"}>
        {status === "processing"
          ? "Processing"
          : status === "error"
            ? "Needs attention"
            : "Ready"}
      </StatusChip>
      <div aria-label={`${name} actions`} className="t7-file-preview-actions">
        {onPreview ? (
          <IconButton
            icon="preview"
            label={`Preview ${name}`}
            onClick={onPreview}
            size="sm"
          />
        ) : null}
        {onDownload ? (
          <IconButton
            icon="download"
            label={`Download ${name}`}
            onClick={onDownload}
            size="sm"
          />
        ) : null}
        {onRemove ? (
          <IconButton
            icon="delete"
            label={`Remove ${name}`}
            onClick={onRemove}
            size="sm"
          />
        ) : null}
      </div>
    </article>
  );
}
