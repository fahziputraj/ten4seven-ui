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
        className="t7-visually-hidden"
        disabled={disabled}
        id={id}
        multiple={multiple}
        onChange={(event) => {
          acceptFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
        ref={inputRef}
        type="file"
      />
      <div
        aria-describedby={children ? `${id}-description` : undefined}
        aria-disabled={disabled || undefined}
        className="t7-file-dropzone"
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !disabled) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
      >
        <T7Icon aria-hidden="true" name="upload" size={22} />
        <strong>{label}</strong>
        {children ? (
          <span id={`${id}-description`}>{children}</span>
        ) : (
          <span>Drop files here or browse from your device.</span>
        )}
      </div>
    </div>
  );
}

export type FileStatus = "error" | "ready" | "uploading";

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
        {status === "uploading" ? (
          <Progress label="Upload progress" showValue value={progress ?? 0} />
        ) : null}
        {error ? <small>{error}</small> : null}
      </div>
      {status === "ready" ? (
        <StatusChip tone="success">Ready</StatusChip>
      ) : null}
      {status === "uploading" ? (
        <StatusChip tone="info">Uploading</StatusChip>
      ) : null}
      {status === "error" ? <StatusChip tone="danger">Error</StatusChip> : null}
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
