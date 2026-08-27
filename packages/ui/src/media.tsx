import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { cx } from "./utils";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

/** Holds media proportion without relying on page-local sizing rules. */
export function AspectRatio({
  children,
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) {
  return (
    <div
      {...props}
      className={cx("t7-aspect-ratio", className)}
      style={{ "--t7-aspect-ratio": ratio, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface MediaFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
  ratio?: number;
  tone?: "default" | "subtle";
}

export function MediaFrame({
  children,
  className,
  label,
  ratio = 16 / 9,
  tone = "default",
  ...props
}: MediaFrameProps) {
  return (
    <AspectRatio
      {...props}
      aria-label={label}
      className={cx("t7-media-frame", className)}
      data-tone={tone}
      ratio={ratio}
    >
      {children}
    </AspectRatio>
  );
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: IconName;
  fallbackLabel?: string;
}

/** Native image with an honest fallback when a supplied URL cannot load. */
export function Image({
  alt,
  className,
  fallbackIcon = "image",
  fallbackLabel = "Image unavailable",
  onError,
  src,
  ...props
}: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span
        aria-label={alt || fallbackLabel}
        className={cx("t7-image-fallback", className)}
        role="img"
      >
        <T7Icon aria-hidden="true" name={fallbackIcon} size={22} />
        <span>{fallbackLabel}</span>
      </span>
    );
  }
  return (
    <img
      {...props}
      alt={alt}
      className={cx("t7-image", className)}
      onError={(event) => {
        onError?.(event);
        if (!event.defaultPrevented) setFailed(true);
      }}
      src={src}
    />
  );
}
