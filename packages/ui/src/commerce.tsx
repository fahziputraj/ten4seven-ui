import {
  Children,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon } from "@ten4seven/icons";

import { Button, type ButtonProps, Typography } from "./components";
import { cx } from "./utils";

function clampQuantity(value: number, min: number, max?: number) {
  const bounded = Math.max(min, value);
  return max === undefined ? bounded : Math.min(max, bounded);
}

export interface QuantityControlProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  allowInput?: boolean;
  disabled?: boolean;
}

/** A bounded quantity control for cart lines and other small numeric choices. */
export function QuantityControl({
  allowInput = false,
  className,
  disabled = false,
  label,
  max,
  min = 1,
  onValueChange,
  step = 1,
  value,
  ...props
}: QuantityControlProps) {
  const safeValue = clampQuantity(value, min, max);
  const update = (nextValue: number) =>
    onValueChange(clampQuantity(nextValue, min, max));

  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-quantity-control", className)}
      role="group"
    >
      <Button
        aria-label={`Decrease ${label}`}
        disabled={disabled || safeValue <= min}
        intent="quiet"
        onClick={() => update(safeValue - step)}
        size="sm"
      >
        −
      </Button>
      {allowInput ? (
        <input
          aria-label={label}
          className="t7-input t7-quantity-input"
          disabled={disabled}
          inputMode="numeric"
          max={max}
          min={min}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            if (Number.isFinite(parsed)) update(parsed);
          }}
          step={step}
          type="number"
          value={safeValue}
        />
      ) : (
        <output aria-live="polite" className="t7-quantity-value">
          {safeValue}
        </output>
      )}
      <Button
        aria-label={`Increase ${label}`}
        disabled={disabled || (max !== undefined && safeValue >= max)}
        intent="quiet"
        onClick={() => update(safeValue + step)}
        size="sm"
      >
        +
      </Button>
    </div>
  );
}

export interface CartTriggerProps extends Omit<ButtonProps, "children"> {
  count?: number;
  label?: string;
  children?: ReactNode;
}

/** Shared cart entry action; cart state remains owned by the consuming recipe. */
export function CartTrigger({
  children,
  count = 0,
  label = "Cart",
  ...props
}: CartTriggerProps) {
  const countLabel = count > 0 ? `${count} item${count === 1 ? "" : "s"}` : "";
  return (
    <Button
      {...props}
      aria-label={
        props["aria-label"] ??
        (countLabel
          ? `${countLabel} in ${label.toLowerCase()}`
          : `Open ${label.toLowerCase()}`)
      }
      leadingIcon={props.leadingIcon ?? "cart"}
    >
      {children ?? `${label}${count > 0 ? ` (${count})` : ""}`}
    </Button>
  );
}

export interface CartLineItemProps extends HTMLAttributes<HTMLElement> {
  media?: ReactNode;
  title: string;
  meta?: ReactNode;
  price?: ReactNode;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove?: () => void;
  quantityLabel?: string;
  removeLabel?: string;
  min?: number;
  max?: number;
  step?: number;
}

/** A content-first cart line that delegates quantity bounds to QuantityControl. */
export function CartLineItem({
  className,
  max,
  media,
  meta,
  min = 1,
  onQuantityChange,
  onRemove,
  price,
  quantity,
  title,
  removeLabel,
  step = 1,
  quantityLabel,
  ...props
}: CartLineItemProps) {
  const resolvedQuantityLabel = quantityLabel ?? `Quantity for ${title}`;
  const resolvedRemoveLabel = removeLabel ?? `Remove ${title} from cart`;
  return (
    <article {...props} className={cx("t7-cart-line-item", className)}>
      {media ? <div className="t7-cart-line-item-media">{media}</div> : null}
      <div className="t7-cart-line-item-copy">
        <Typography as="h3" typeRole="label">
          {title}
        </Typography>
        {meta ? (
          <Typography as="div" typeRole="caption">
            {meta}
          </Typography>
        ) : null}
        {price ? <div className="t7-cart-line-item-price">{price}</div> : null}
        <QuantityControl
          label={resolvedQuantityLabel}
          max={max}
          min={min}
          onValueChange={onQuantityChange}
          step={step}
          value={quantity}
        />
      </div>
      {onRemove ? (
        <Button
          aria-label={resolvedRemoveLabel}
          intent="quiet"
          leadingIcon="delete"
          onClick={onRemove}
          size="sm"
        />
      ) : null}
    </article>
  );
}

export interface CartPanelProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  itemCount?: ReactNode;
  emptyState?: ReactNode;
  summary?: ReactNode;
  actions?: ReactNode;
}

/** Shared cart surface; item ownership and order actions stay in the recipe. */
export function CartPanel({
  actions,
  children,
  className,
  emptyState,
  itemCount,
  summary,
  title = "Cart",
  ...props
}: CartPanelProps) {
  const hasItems = Children.count(children) > 0;
  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? title}
      className={cx("t7-cart-panel", className)}
    >
      <header className="t7-cart-panel-header">
        <div>
          <Typography as="h2" typeRole="card-title">
            {title}
          </Typography>
          {itemCount ? (
            <Typography typeRole="caption">{itemCount}</Typography>
          ) : null}
        </div>
      </header>
      <div className="t7-cart-panel-items">
        {hasItems ? children : emptyState}
      </div>
      {hasItems && (summary || actions) ? (
        <div className="t7-cart-panel-footer">
          {summary}
          {actions ? (
            <div className="t7-cart-panel-actions">{actions}</div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export type OrderSummaryRow = {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
};

export interface OrderSummaryProps extends HTMLAttributes<HTMLDListElement> {
  rows: OrderSummaryRow[];
  total: ReactNode;
  totalLabel?: string;
}

/** Order arithmetic presentation; calculations and payment remain application-owned. */
export function OrderSummary({
  className,
  rows,
  total,
  totalLabel = "Total",
  ...props
}: OrderSummaryProps) {
  return (
    <dl {...props} className={cx("t7-order-summary", className)}>
      {rows.map((row) => (
        <div
          className={row.emphasis ? "is-emphasis" : undefined}
          key={row.label}
        >
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
      <div className="t7-order-summary-total">
        <dt>{totalLabel}</dt>
        <dd>{total}</dd>
      </div>
    </dl>
  );
}

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  minCardWidth?: number;
}

/** Generic content-first catalog layout; its data and merchandising stay in the recipe. */
export function ProductGrid({
  children,
  className,
  minCardWidth = 172,
  style,
  ...props
}: ProductGridProps) {
  return (
    <div
      {...props}
      className={cx("t7-product-grid", className)}
      style={
        {
          "--t7-product-grid-min": `${minCardWidth}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  amount: number;
  currency?: string;
  locale?: string;
  originalAmount?: number;
}

export function Price({
  amount,
  className,
  currency = "IDR",
  locale = "id-ID",
  originalAmount,
  ...props
}: PriceProps) {
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 0,
  });
  return (
    <span {...props} className={cx("t7-price", className)}>
      <strong>{formatter.format(amount)}</strong>
      {originalAmount && originalAmount > amount ? (
        <s>{formatter.format(originalAmount)}</s>
      ) : null}
    </span>
  );
}

export interface RatingProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  label?: string;
  value: number;
}

export function Rating({
  className,
  count,
  label,
  value,
  ...props
}: RatingProps) {
  const score = Math.max(0, Math.min(5, value));
  return (
    <span
      {...props}
      aria-label={label ?? `${score} out of 5`}
      className={cx("t7-rating", className)}
    >
      <T7Icon aria-hidden="true" name="rating" size={15} />
      <span>{score.toFixed(1)}</span>
      {count === undefined ? null : (
        <span className="t7-rating-count">({count})</span>
      )}
    </span>
  );
}

export interface ProductMetaProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
}

export function ProductMeta({ className, items, ...props }: ProductMetaProps) {
  return (
    <div {...props} className={cx("t7-product-meta-list", className)}>
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
}
