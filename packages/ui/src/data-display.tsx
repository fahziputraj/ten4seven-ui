import {
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import {
  Badge,
  Card,
  CardContent,
  Checkbox,
  Typography,
  type BadgeProps,
  type DataTableColumn,
} from "./components";
import { cx } from "./utils";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface StatusChipProps extends Omit<BadgeProps, "tone"> {
  icon?: IconName;
  tone?: StatusTone;
}

/** Compact status semantics; use Badge for a plain category or tag. */
export function StatusChip({
  children,
  className,
  icon,
  tone = "neutral",
  ...props
}: StatusChipProps) {
  const badgeTone = tone === "info" ? "primary" : tone;
  return (
    <Badge
      {...props}
      className={cx("t7-status-chip", className)}
      tone={badgeTone}
    >
      {icon ? <T7Icon aria-hidden="true" name={icon} size={13} /> : null}
      {children}
    </Badge>
  );
}

function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  alt?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  src?: string;
}

export function Avatar({
  alt,
  className,
  name,
  size = "md",
  src,
  ...props
}: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <span
      {...props}
      aria-label={alt ?? name}
      className={cx("t7-avatar", className)}
      data-size={size}
      role="img"
    >
      {src && !imageFailed ? (
        <img alt={alt ?? ""} onError={() => setImageFailed(true)} src={src} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: AvatarProps[];
  max?: number;
}

export function AvatarGroup({
  avatars,
  className,
  max = 4,
  ...props
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remainder = avatars.length - visible.length;
  return (
    <div
      {...props}
      aria-label={`${avatars.length} people`}
      className={cx("t7-avatar-group", className)}
    >
      {visible.map((avatar) => (
        <Avatar {...avatar} key={avatar.name} />
      ))}
      {remainder > 0 ? (
        <span
          aria-label={`${remainder} more`}
          className="t7-avatar t7-avatar-more"
        >
          +{remainder}
        </span>
      ) : null}
    </div>
  );
}

export interface KeyValueItem {
  label: ReactNode;
  value: ReactNode;
}

export interface KeyValueListProps extends HTMLAttributes<HTMLDListElement> {
  items: KeyValueItem[];
}

export function KeyValueList({
  className,
  items,
  ...props
}: KeyValueListProps) {
  return (
    <dl {...props} className={cx("t7-key-value-list", className)}>
      {items.map((item, index) => (
        <div key={`${String(item.label)}-${index}`}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export const DescriptionList = KeyValueList;

export interface MetricCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  change?: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  title: ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
  value: ReactNode;
}

export function MetricCard({
  change,
  className,
  description,
  icon,
  title,
  tone = "default",
  value,
  ...props
}: MetricCardProps) {
  return (
    <Card
      {...props}
      className={cx("t7-metric-card", className)}
      data-metric-tone={tone}
    >
      <CardContent>
        <div className="t7-metric-card-head">
          <Typography typeRole="label">{title}</Typography>
          {icon ? <T7Icon aria-hidden="true" name={icon} size={18} /> : null}
        </div>
        <Typography as="strong" typeRole="metric-lg">
          {value}
        </Typography>
        {description || change ? (
          <div className="t7-metric-card-meta">
            {description ? (
              <Typography typeRole="caption">{description}</Typography>
            ) : null}
            {change ? <span>{change}</span> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export interface ActivityItem {
  actor?: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  id: string;
  meta?: ReactNode;
  title: ReactNode;
}

export interface ActivityFeedProps extends Omit<
  HTMLAttributes<HTMLOListElement>,
  "children"
> {
  items: ActivityItem[];
}

export function ActivityFeed({
  className,
  items,
  ...props
}: ActivityFeedProps) {
  return (
    <ol {...props} className={cx("t7-activity-feed", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <span aria-hidden="true" className="t7-activity-marker">
            <T7Icon name={item.icon ?? "clock"} size={15} />
          </span>
          <div>
            <strong>{item.title}</strong>
            {item.description ? <p>{item.description}</p> : null}
            {item.actor || item.meta ? (
              <small>
                {item.actor}
                {item.actor && item.meta ? " · " : null}
                {item.meta}
              </small>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export const Timeline = ActivityFeed;

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="t7-table-wrap">
      <table
        {...props}
        className={cx("t7-table", "t7-semantic-table", className)}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} className={cx("t7-table-header", className)} />;
}

export function TableBody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={cx("t7-table-body", className)} />;
}

export function TableRow({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} className={cx("t7-table-row", className)} />;
}

export function TableHead({
  className,
  scope = "col",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th {...props} className={cx("t7-table-head", className)} scope={scope} />
  );
}

export function TableCell({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cx("t7-table-cell", className)} />;
}

export interface RecordSummaryProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  actions?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  media?: ReactNode;
  metadata?: ReactNode;
  title: ReactNode;
}

/** A compact, contextual record header; it intentionally has no domain nouns. */
export function RecordSummary({
  actions,
  children,
  className,
  description,
  eyebrow,
  media,
  metadata,
  title,
  ...props
}: RecordSummaryProps) {
  return (
    <section {...props} className={cx("t7-record-summary", className)}>
      {media ? <div className="t7-record-summary-media">{media}</div> : null}
      <div className="t7-record-summary-copy">
        {eyebrow ? (
          <Typography typeRole="overline">{eyebrow}</Typography>
        ) : null}
        <Typography as="h2" typeRole="heading-lg">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-sm">
            {description}
          </Typography>
        ) : null}
        {metadata ? (
          <div className="t7-record-summary-meta">{metadata}</div>
        ) : null}
        {children}
      </div>
      {actions ? (
        <div className="t7-record-summary-actions">{actions}</div>
      ) : null}
    </section>
  );
}

export type TableDensity = "comfortable" | "default" | "compact" | "dense";

export interface DataTableColumnPickerProps<
  Row,
> extends HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<Row>[];
  onVisibilityChange: (visibility: Record<string, boolean>) => void;
  visibility: Record<string, boolean>;
}

/** Controlled companion for DataTable's visibility map, not a second table. */
export function DataTableColumnPicker<Row>({
  className,
  columns,
  onVisibilityChange,
  visibility,
  ...props
}: DataTableColumnPickerProps<Row>) {
  const entries = useMemo(
    () => columns.filter((column) => !column.required),
    [columns],
  );
  return (
    <div {...props} className={cx("t7-column-picker", className)}>
      <span>Columns</span>
      <div>
        {entries.map((column) => (
          <Checkbox
            checked={visibility[column.key] !== false}
            key={column.key}
            label={column.header}
            onChange={(event) =>
              onVisibilityChange({
                ...visibility,
                [column.key]: event.target.checked,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
