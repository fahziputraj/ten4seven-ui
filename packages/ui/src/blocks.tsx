import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { IconButton } from "./actions";
import {
  AppShell,
  Button,
  Card,
  CardContent,
  Drawer,
  Typography,
} from "./components";
import {
  NavigationMenu,
  TopNavigation,
  type NavigationMenuItem,
  type TopNavigationItem,
} from "./navigation";
import { cx } from "./utils";

export interface SectionHeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}

export function SectionHeader({
  actions,
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeaderProps) {
  return (
    <header {...props} className={cx("t7-section-header-block", className)}>
      <div>
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
      </div>
      {actions ? <div>{actions}</div> : null}
    </header>
  );
}

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode;
  children?: ReactNode;
  label?: string;
}

export function Toolbar({
  actions,
  children,
  className,
  label = "Toolbar",
  ...props
}: ToolbarProps) {
  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-toolbar", className)}
      role="toolbar"
    >
      <div className="t7-toolbar-main">{children}</div>
      {actions ? <div className="t7-toolbar-actions">{actions}</div> : null}
    </div>
  );
}

export interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
}

export function ActionBar({
  children,
  className,
  label = "Actions",
  ...props
}: ActionBarProps) {
  return (
    <div
      {...props}
      aria-label={label}
      className={cx("t7-action-bar", className)}
      role="toolbar"
    >
      {children}
    </div>
  );
}

export interface ActionFooterProps extends HTMLAttributes<HTMLDivElement> {
  primaryAction: ReactNode;
  secondaryActions?: ReactNode;
  summary?: ReactNode;
}

/** Generic form/workflow action boundary; pages decide persistence behavior. */
export function ActionFooter({
  className,
  primaryAction,
  secondaryActions,
  summary,
  ...props
}: ActionFooterProps) {
  return (
    <footer {...props} className={cx("t7-action-footer", className)}>
      {summary ? (
        <div className="t7-action-footer-summary">{summary}</div>
      ) : (
        <span />
      )}
      <div className="t7-action-footer-actions">
        {secondaryActions}
        {primaryAction}
      </div>
    </footer>
  );
}

export interface ApprovalPanelProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  actions?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  metadata?: ReactNode;
  title: ReactNode;
  tone?: "default" | "warning" | "success";
}

/** A neutral decision checkpoint, not an approval workflow implementation. */
export function ApprovalPanel({
  actions,
  children,
  className,
  description,
  icon = "check",
  metadata,
  title,
  tone = "default",
  ...props
}: ApprovalPanelProps) {
  return (
    <section
      {...props}
      className={cx("t7-approval-panel", className)}
      data-tone={tone}
    >
      <span aria-hidden="true" className="t7-approval-panel-icon">
        <T7Icon name={icon} size={19} />
      </span>
      <div>
        <Typography as="h2" typeRole="heading-sm">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-sm">
            {description}
          </Typography>
        ) : null}
        {metadata ? (
          <div className="t7-approval-panel-meta">{metadata}</div>
        ) : null}
        {children}
      </div>
      {actions ? (
        <div className="t7-approval-panel-actions">{actions}</div>
      ) : null}
    </section>
  );
}

export interface FilterChipProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  onRemove?: () => void;
}

export function FilterChip({
  className,
  label,
  onRemove,
  ...props
}: FilterChipProps) {
  return (
    <span {...props} className={cx("t7-filter-chip", className)}>
      <span>{label}</span>
      {onRemove ? (
        <button
          aria-label={`Remove filter ${typeof label === "string" ? label : ""}`}
          onClick={onRemove}
          type="button"
        >
          <T7Icon aria-hidden="true" name="close" size={14} />
        </button>
      ) : null}
    </span>
  );
}

export interface AppliedFilter {
  id: string;
  label: ReactNode;
}

export interface AppliedFiltersProps extends HTMLAttributes<HTMLDivElement> {
  clearLabel?: string;
  filters: AppliedFilter[];
  onClear?: () => void;
  onRemove?: (id: string) => void;
}

export function AppliedFilters({
  className,
  clearLabel = "Clear filters",
  filters,
  onClear,
  onRemove,
  ...props
}: AppliedFiltersProps) {
  if (filters.length === 0) return null;
  return (
    <div
      {...props}
      aria-label="Applied filters"
      className={cx("t7-applied-filters", className)}
    >
      {filters.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          onRemove={onRemove ? () => onRemove(filter.id) : undefined}
        />
      ))}
      {onClear ? (
        <Button intent="quiet" onClick={onClear} size="sm">
          {clearLabel}
        </Button>
      ) : null}
    </div>
  );
}

export interface FilterDrawerProps {
  applyLabel?: string;
  children: ReactNode;
  clearLabel?: string;
  description?: string;
  onApply?: () => void;
  onClear?: () => void;
  onClose: () => void;
  open: boolean;
  title?: string;
}

/** A composition of the canonical Drawer plus action vocabulary for compact filters. */
export function FilterDrawer({
  applyLabel = "Apply filters",
  children,
  clearLabel = "Clear all",
  description = "Refine the current result set.",
  onApply,
  onClear,
  onClose,
  open,
  title = "Filters",
}: FilterDrawerProps) {
  return (
    <Drawer
      description={description}
      onClose={onClose}
      open={open}
      title={title}
    >
      <div className="t7-filter-drawer-content">{children}</div>
      <ActionFooter
        primaryAction={
          <Button
            onClick={() => {
              onApply?.();
              onClose();
            }}
          >
            {applyLabel}
          </Button>
        }
        secondaryActions={
          onClear ? (
            <Button intent="quiet" onClick={onClear}>
              {clearLabel}
            </Button>
          ) : undefined
        }
      />
    </Drawer>
  );
}

export type HeroVariant =
  | "centered"
  | "split"
  | "media-left"
  | "media-right"
  | "product-preview"
  | "editorial";

type BlockSectionAttributes = Omit<HTMLAttributes<HTMLElement>, "title">;

export interface HeroProps extends BlockSectionAttributes {
  description?: ReactNode;
  eyebrow?: ReactNode;
  media?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  stats?: ReactNode;
  title: ReactNode;
  trust?: ReactNode;
  variant?: HeroVariant;
}

/** A restrained public proposition that composes semantic display type and canonical actions. */
export function Hero({
  className,
  description,
  eyebrow,
  media,
  primaryAction,
  secondaryAction,
  stats,
  title,
  trust,
  variant = "split",
  ...props
}: HeroProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-hero", `t7-hero--${variant}`, className)}
      data-variant={variant}
    >
      <div className="t7-hero-copy">
        {eyebrow ? (
          <Typography typeRole="overline">{eyebrow}</Typography>
        ) : null}
        <Typography as="h1" id={headingId} typeRole="display-xl">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-lg">
            {description}
          </Typography>
        ) : null}
        {primaryAction || secondaryAction ? (
          <div className="t7-hero-actions">
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}
        {trust ? <div className="t7-hero-trust">{trust}</div> : null}
      </div>
      {media ? <div className="t7-hero-media">{media}</div> : null}
      {stats ? <div className="t7-hero-stats">{stats}</div> : null}
    </section>
  );
}

export type CtaTone = "accent" | "inverse" | "subtle";

export interface CtaBlockProps extends BlockSectionAttributes {
  actions?: ReactNode;
  description?: ReactNode;
  media?: ReactNode;
  title: ReactNode;
  tone?: CtaTone;
}

/** A section-level action boundary with one dominant action and optional support. */
export function CtaBlock({
  actions,
  className,
  description,
  media,
  title,
  tone = "accent",
  ...props
}: CtaBlockProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-cta-block", className)}
      data-has-media={media ? "true" : "false"}
      data-tone={tone}
    >
      <div className="t7-cta-copy">
        <Typography as="h2" id={headingId} typeRole="heading-xl">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-lg">
            {description}
          </Typography>
        ) : null}
        {actions ? <div className="t7-cta-actions">{actions}</div> : null}
      </div>
      {media ? <div className="t7-cta-media">{media}</div> : null}
    </section>
  );
}

export interface FeatureItem {
  action?: ReactNode;
  description: ReactNode;
  icon?: IconName;
  id: string;
  media?: ReactNode;
  title: ReactNode;
}

export interface FeatureShowcaseProps extends BlockSectionAttributes {
  description?: ReactNode;
  items: FeatureItem[];
  leadMedia?: ReactNode;
  title: ReactNode;
}

/** A stable lead-and-support composition for product capabilities and editorial highlights. */
export function FeatureShowcase({
  className,
  description,
  items,
  leadMedia,
  title,
  ...props
}: FeatureShowcaseProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-feature-showcase", className)}
    >
      <header className="t7-block-heading">
        <Typography as="h2" id={headingId} typeRole="heading-xl">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-sm">
            {description}
          </Typography>
        ) : null}
      </header>
      <div className="t7-feature-layout">
        {leadMedia ? <div className="t7-feature-lead">{leadMedia}</div> : null}
        <div className="t7-feature-list">
          {items.map((item) => (
            <article className="t7-feature-item" key={item.id}>
              {item.icon ? (
                <span aria-hidden="true" className="t7-feature-icon">
                  <T7Icon name={item.icon} size={19} />
                </span>
              ) : null}
              <div className="t7-feature-item-copy">
                <Typography as="h3" typeRole="heading-md">
                  {item.title}
                </Typography>
                <Typography as="p" typeRole="body-sm">
                  {item.description}
                </Typography>
                {item.action ? (
                  <div className="t7-feature-item-action">{item.action}</div>
                ) : null}
              </div>
              {item.media ? (
                <div className="t7-feature-item-media">{item.media}</div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface StatsItem {
  detail?: ReactNode;
  id: string;
  label: ReactNode;
  value: ReactNode;
}

export interface StatsSectionProps extends BlockSectionAttributes {
  description?: ReactNode;
  items: StatsItem[];
  title?: ReactNode;
}

/** Public outcome proof, intentionally separate from the operational KPICluster. */
export function StatsSection({
  className,
  description,
  items,
  title,
  ...props
}: StatsSectionProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={title ? headingId : undefined}
      className={cx("t7-stats-section", className)}
    >
      {title || description ? (
        <header className="t7-block-heading">
          {title ? (
            <Typography as="h2" id={headingId} typeRole="heading-xl">
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography as="p" typeRole="body-sm">
              {description}
            </Typography>
          ) : null}
        </header>
      ) : null}
      <div className="t7-stats-grid">
        {items.map((item) => (
          <div className="t7-stat-item" key={item.id}>
            <Typography as="strong" data-numeric typeRole="metric-lg">
              {item.value}
            </Typography>
            <Typography typeRole="label">{item.label}</Typography>
            {item.detail ? (
              <Typography typeRole="caption">{item.detail}</Typography>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export interface LogoCloudItem {
  mark?: ReactNode;
  name: string;
}

export interface LogoCloudProps extends HTMLAttributes<HTMLElement> {
  items: LogoCloudItem[];
  label?: string;
}

/** A low-chrome proof strip; names remain text-accessible even when marks are supplied. */
export function LogoCloud({
  className,
  items,
  label = "Trusted by teams",
  ...props
}: LogoCloudProps) {
  return (
    <section
      {...props}
      aria-label={label}
      className={cx("t7-logo-cloud", className)}
    >
      <Typography typeRole="overline">{label}</Typography>
      <div className="t7-logo-cloud-items">
        {items.map((item) => (
          <div className="t7-logo-cloud-item" key={item.name}>
            {item.mark ? (
              <span aria-hidden="true" className="t7-logo-cloud-mark">
                {item.mark}
              </span>
            ) : null}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export interface TestimonialItem {
  avatar?: ReactNode;
  company?: ReactNode;
  id: string;
  quote: ReactNode;
  role?: ReactNode;
  name: ReactNode;
}

export interface TestimonialsProps extends BlockSectionAttributes {
  description?: ReactNode;
  items: TestimonialItem[];
  title?: ReactNode;
}

/** Legible customer proof without decorative testimonial chrome. */
export function Testimonials({
  className,
  description,
  items,
  title,
  ...props
}: TestimonialsProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={title ? headingId : undefined}
      className={cx("t7-testimonials", className)}
    >
      {title || description ? (
        <header className="t7-block-heading">
          {title ? (
            <Typography as="h2" id={headingId} typeRole="heading-xl">
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography as="p" typeRole="body-sm">
              {description}
            </Typography>
          ) : null}
        </header>
      ) : null}
      <div className="t7-testimonial-grid">
        {items.map((item) => (
          <figure className="t7-testimonial" key={item.id}>
            <blockquote>
              <Typography as="p" typeRole="body-lg">
                “{item.quote}”
              </Typography>
            </blockquote>
            <figcaption>
              {item.avatar ? (
                <span aria-hidden="true" className="t7-testimonial-avatar">
                  {item.avatar}
                </span>
              ) : null}
              <span>
                <Typography as="strong" typeRole="label">
                  {item.name}
                </Typography>
                {item.role || item.company ? (
                  <Typography typeRole="caption">
                    {item.role}
                    {item.role && item.company ? " · " : null}
                    {item.company}
                  </Typography>
                ) : null}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export interface PricingPlan {
  action: ReactNode;
  description: ReactNode;
  features: ReactNode[];
  id: string;
  name: ReactNode;
  price: ReactNode;
  recommended?: boolean;
}

export interface PricingSectionProps extends BlockSectionAttributes {
  description?: ReactNode;
  plans: PricingPlan[];
  title: ReactNode;
}

/** Presentation-only plan comparison; billing and entitlement logic stay with the product. */
export function PricingSection({
  className,
  description,
  plans,
  title,
  ...props
}: PricingSectionProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-pricing-section", className)}
    >
      <header className="t7-block-heading">
        <Typography as="h2" id={headingId} typeRole="heading-xl">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-sm">
            {description}
          </Typography>
        ) : null}
      </header>
      <div className="t7-pricing-grid">
        {plans.map((plan) => (
          <Card
            className="t7-pricing-plan"
            data-recommended={plan.recommended || undefined}
            key={plan.id}
          >
            <CardContent>
              {plan.recommended ? (
                <Typography typeRole="overline">Recommended</Typography>
              ) : null}
              <Typography as="h3" typeRole="heading-md">
                {plan.name}
              </Typography>
              <Typography as="p" typeRole="body-sm">
                {plan.description}
              </Typography>
              <div className="t7-pricing-price">{plan.price}</div>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <T7Icon aria-hidden="true" name="check" size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="t7-pricing-action">{plan.action}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export interface ContentShowcaseItem {
  action?: ReactNode;
  description: ReactNode;
  id: string;
  media?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
}

export interface ContentShowcaseProps extends BlockSectionAttributes {
  description?: ReactNode;
  items: ContentShowcaseItem[];
  title: ReactNode;
}

/** Editorial content cards with optional media, kept separate from ProductCard purchase anatomy. */
export function ContentShowcase({
  className,
  description,
  items,
  title,
  ...props
}: ContentShowcaseProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-content-showcase", className)}
    >
      <header className="t7-block-heading">
        <Typography as="h2" id={headingId} typeRole="heading-xl">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="body-sm">
            {description}
          </Typography>
        ) : null}
      </header>
      <div className="t7-content-grid">
        {items.map((item) => (
          <Card className="t7-content-card" key={item.id}>
            {item.media ? (
              <div className="t7-content-media">{item.media}</div>
            ) : null}
            <CardContent>
              {item.meta ? (
                <Typography typeRole="overline">{item.meta}</Typography>
              ) : null}
              <Typography as="h3" typeRole="heading-md">
                {item.title}
              </Typography>
              <Typography as="p" typeRole="body-sm">
                {item.description}
              </Typography>
              {item.action ? (
                <div className="t7-content-action">{item.action}</div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export interface ProductShowcaseProps extends BlockSectionAttributes {
  actions?: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  title: ReactNode;
}

/** Product presentation block; product anatomy remains owned by ProductCard/ProductGrid. */
export function ProductShowcase({
  actions,
  children,
  className,
  description,
  title,
  ...props
}: ProductShowcaseProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-product-showcase", className)}
    >
      <header className="t7-block-heading">
        <div>
          <Typography as="h2" id={headingId} typeRole="heading-xl">
            {title}
          </Typography>
          {description ? (
            <Typography as="p" typeRole="body-sm">
              {description}
            </Typography>
          ) : null}
        </div>
        {actions ? <div>{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}

export interface AnnouncementBarProps extends HTMLAttributes<HTMLElement> {
  action?: ReactNode;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

/** Public communication surface, distinct from application Alert semantics. */
export function AnnouncementBar({
  action,
  children,
  className,
  dismissible = false,
  onDismiss,
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <aside {...props} className={cx("t7-announcement-bar", className)}>
      <T7Icon aria-hidden="true" name="info" size={16} />
      <Typography typeRole="body-sm">{children}</Typography>
      {action ? <div className="t7-announcement-action">{action}</div> : null}
      {dismissible ? (
        <IconButton
          icon="close"
          label="Dismiss announcement"
          onClick={() => {
            setDismissed(true);
            onDismiss?.();
          }}
          size="sm"
        />
      ) : null}
    </aside>
  );
}

export interface FooterLinkGroup {
  items: Array<{ href: string; label: string }>;
  label: string;
}

export interface PublicFooterProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  groups?: FooterLinkGroup[];
  legal?: ReactNode;
  social?: ReactNode;
}

/** Shared public footer anatomy for brand, link groups, legal copy, and optional social actions. */
export function PublicFooter({
  brand,
  className,
  groups = [],
  legal,
  social,
  ...props
}: PublicFooterProps) {
  return (
    <footer {...props} className={cx("t7-public-footer", className)}>
      <div className="t7-public-footer-main">
        <div className="t7-public-footer-brand">{brand}</div>
        {groups.map((group) => (
          <div className="t7-public-footer-group" key={group.label}>
            <Typography typeRole="label">{group.label}</Typography>
            <nav aria-label={group.label}>
              {group.items.map((item) => (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ))}
      </div>
      <div className="t7-public-footer-bottom">
        <Typography typeRole="caption">{legal}</Typography>
        {social ? (
          <div className="t7-public-footer-social">{social}</div>
        ) : null}
      </div>
    </footer>
  );
}

export interface CarouselProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  label?: string;
  showIndicators?: boolean;
  slideWidth?: number;
}

/** Accessible, non-autoplay carousel backed by bounded native scroll snap. */
export function Carousel({
  children,
  className,
  label = "Carousel",
  showIndicators = true,
  slideWidth = 320,
  ...props
}: CarouselProps) {
  const slides = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselId = useId();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const index = Number(
            (visible.target as HTMLElement).dataset.carouselIndex,
          );
          if (Number.isFinite(index)) setActiveIndex(index);
        }
      },
      { root: viewport, threshold: [0.55, 0.8] },
    );
    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });
    return () => observer.disconnect();
  }, [slides.length]);

  function goTo(index: number) {
    if (slides.length === 0) return;
    const next = Math.min(Math.max(index, 0), slides.length - 1);
    setActiveIndex(next);
    slideRefs.current[next]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return (
    <section
      {...props}
      aria-label={label}
      aria-roledescription="carousel"
      className={cx("t7-carousel", className)}
      data-slide-count={slides.length}
    >
      <div className="t7-carousel-controls">
        <Typography typeRole="caption">
          <span className="t7-visually-hidden">Slide </span>
          {slides.length ? activeIndex + 1 : 0} of {slides.length}
        </Typography>
        <div>
          <IconButton
            disabled={activeIndex === 0 || slides.length < 2}
            icon="arrowLeft"
            label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
            size="sm"
          />
          <IconButton
            disabled={activeIndex >= slides.length - 1 || slides.length < 2}
            icon="arrowRight"
            label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
            size="sm"
          />
        </div>
      </div>
      <div
        aria-label={`${label} slides`}
        className="t7-carousel-viewport"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(activeIndex + 1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            goTo(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            goTo(slides.length - 1);
          }
        }}
        ref={viewportRef}
        role="group"
        tabIndex={0}
      >
        <div
          className="t7-carousel-track"
          style={
            { "--t7-carousel-slide-width": `${slideWidth}px` } as CSSProperties
          }
        >
          {slides.map((slide, index) => (
            <div
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-roledescription="slide"
              className="t7-carousel-slide"
              data-carousel-index={index}
              id={`${carouselId}-slide-${index}`}
              key={`${carouselId}-${index}`}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              role="group"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showIndicators && slides.length > 1 ? (
        <div aria-label="Choose slide" className="t7-carousel-indicators">
          {slides.map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={activeIndex === index}
              className="t7-carousel-indicator"
              key={index}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
      <span aria-live="polite" className="t7-visually-hidden">
        Slide {slides.length ? activeIndex + 1 : 0} of {slides.length}
      </span>
    </section>
  );
}

export interface ChartPanelProps extends BlockSectionAttributes {
  chart: ReactNode;
  description?: ReactNode;
  title: ReactNode;
}

/** A bounded chart presentation surface that keeps chart semantics separate from raw SVG. */
export function ChartPanel({
  chart,
  className,
  description,
  title,
  ...props
}: ChartPanelProps) {
  const headingId = useId();
  return (
    <section
      {...props}
      aria-labelledby={headingId}
      className={cx("t7-chart-panel", className)}
    >
      <header className="t7-block-heading">
        <Typography as="h2" id={headingId} typeRole="heading-md">
          {title}
        </Typography>
        {description ? (
          <Typography as="p" typeRole="caption">
            {description}
          </Typography>
        ) : null}
      </header>
      {chart}
    </section>
  );
}

export interface PublicShellProps extends HTMLAttributes<HTMLDivElement> {
  actions?: ReactNode;
  brand: ReactNode;
  footer?: ReactNode;
  navigation?: TopNavigationItem[];
  navigationMenu?: NavigationMenuItem[];
}

/** Public/content shell composition; it reuses AppShell geometry and TopNavigation semantics. */
export function PublicShell({
  actions,
  brand,
  children,
  className,
  footer,
  navigation,
  navigationMenu,
  ...props
}: PublicShellProps) {
  return (
    <AppShell
      {...props}
      className={cx("t7-public-shell", className)}
      topbar={
        navigationMenu?.length ? (
          <NavigationMenu
            items={navigationMenu}
            leading={brand}
            trailing={actions}
          />
        ) : (
          <TopNavigation
            items={navigation ?? []}
            leading={brand}
            trailing={actions}
          />
        )
      }
    >
      {children}
      {footer}
    </AppShell>
  );
}
