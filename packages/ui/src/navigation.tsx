import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import { overlayGeometry } from "@ten4seven/tokens";

import { Drawer, Input, Modal } from "./components";
import {
  FloatingPortal,
  useExclusiveFloatingLayer,
  useFloatingPosition,
} from "./overlay";
import { cx } from "./utils";

export interface BreadcrumbItem {
  current?: boolean;
  href?: string;
  key: string;
  label: string;
  onSelect?: () => void;
}

export interface BreadcrumbProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  items: BreadcrumbItem[];
  label?: string;
}

export function Breadcrumb({
  className,
  items,
  label = "Breadcrumb",
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-breadcrumb", className)}
    >
      <ol>
        {items.map((item, index) => {
          const current = item.current ?? index === items.length - 1;
          return (
            <li key={item.key}>
              {index > 0 ? (
                <T7Icon aria-hidden="true" name="chevronRight" size={14} />
              ) : null}
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : item.href ? (
                <a href={item.href} onClick={() => item.onSelect?.()}>
                  {item.label}
                </a>
              ) : (
                <button onClick={() => item.onSelect?.()} type="button">
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface SectionNavigationItem {
  id: string;
  label: ReactNode;
}

export interface SectionNavigationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "onChange" | "title"
> {
  /** Consumer-controlled active anchor, for example from a scroll spy. */
  activeId?: string;
  /** Initial active anchor for uncontrolled navigation. */
  defaultActiveId?: string;
  items: SectionNavigationItem[];
  label?: string;
  /** Called after an anchor is selected; it does not own scroll-spy state. */
  onSectionChange?: (id: string) => void;
  /** Keep the page-local navigation below the shared document sticky offset. */
  sticky?: boolean;
}

/** Page-local anchor navigation for long forms and bounded workspaces. */
export function SectionNavigation({
  activeId,
  className,
  defaultActiveId,
  items,
  label = "Section navigation",
  onSectionChange,
  sticky = false,
  ...props
}: SectionNavigationProps) {
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState(
    defaultActiveId ?? items[0]?.id ?? "",
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const selectedId = activeId ?? uncontrolledActiveId;
  const activeItem = items.find((item) => item.id === selectedId) ?? items[0];

  function select(id: string) {
    if (activeId === undefined) setUncontrolledActiveId(id);
    onSectionChange?.(id);
    setMobileOpen(false);
  }

  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-section-navigation", className)}
      data-sticky={sticky || undefined}
    >
      <div className="t7-section-navigation-desktop">
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a
                aria-current={selectedId === item.id ? "location" : undefined}
                data-active={selectedId === item.id || undefined}
                href={`#${item.id}`}
                onClick={() => select(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <details
        className="t7-section-navigation-mobile"
        onToggle={(event) => setMobileOpen(event.currentTarget.open)}
        open={mobileOpen}
      >
        <summary>
          <span className="t7-section-navigation-summary-label">
            Current section
          </span>
          <span className="t7-section-navigation-summary-value">
            {activeItem?.label ?? "Select a section"}
          </span>
          <T7Icon aria-hidden="true" name="chevronDown" size={16} />
        </summary>
        <ol>
          {items.map((item) => (
            <li key={item.id}>
              <a
                aria-current={selectedId === item.id ? "location" : undefined}
                data-active={selectedId === item.id || undefined}
                href={`#${item.id}`}
                onClick={() => select(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

export interface TabItem {
  content: ReactNode;
  disabled?: boolean;
  id: string;
  label: ReactNode;
}

export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  defaultValue?: string;
  items: TabItem[];
  label?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

export function Tabs({
  className,
  defaultValue,
  items,
  label = "Sections",
  onValueChange,
  value,
  ...props
}: TabsProps) {
  const initial =
    defaultValue ?? items.find((item) => !item.disabled)?.id ?? "";
  const [uncontrolledValue, setUncontrolledValue] = useState(initial);
  const selectedValue = value ?? uncontrolledValue;
  const id = useId();
  const active = items.find((item) => item.id === selectedValue) ?? items[0];

  function select(next: string) {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  }

  return (
    <div {...props} className={cx("t7-tabs", className)}>
      <div aria-label={label} className="t7-tab-list" role="tablist">
        {items.map((item) => (
          <button
            aria-controls={`${id}-panel-${item.id}`}
            aria-selected={selectedValue === item.id}
            className="t7-tab"
            disabled={item.disabled}
            id={`${id}-tab-${item.id}`}
            key={item.id}
            onClick={() => select(item.id)}
            onKeyDown={(event) => {
              if (
                !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const enabled = items.filter((candidate) => !candidate.disabled);
              const currentIndex = enabled.findIndex(
                (candidate) => candidate.id === item.id,
              );
              const nextIndex =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? enabled.length - 1
                    : (currentIndex +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        enabled.length) %
                      enabled.length;
              const next = enabled[nextIndex];
              if (!next) return;
              select(next.id);
              event.currentTarget.parentElement
                ?.querySelector<HTMLElement>(
                  `#${CSS.escape(`${id}-tab-${next.id}`)}`,
                )
                ?.focus();
            }}
            role="tab"
            tabIndex={selectedValue === item.id ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      {active ? (
        <TabPanel
          aria-labelledby={`${id}-tab-${active.id}`}
          id={`${id}-panel-${active.id}`}
        >
          {active.content}
        </TabPanel>
      ) : null}
    </div>
  );
}

export function TabPanel({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cx("t7-tab-panel", className)} role="tabpanel">
      {children}
    </div>
  );
}

export interface AccordionItem {
  content: ReactNode;
  disabled?: boolean;
  id: string;
  title: ReactNode;
}

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  defaultValue?: string | string[];
  items: AccordionItem[];
  multiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
  value?: string | string[];
}

export function Accordion({
  className,
  defaultValue,
  items,
  multiple = false,
  onValueChange,
  value,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
    Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [],
  );
  const openItems = Array.isArray(value)
    ? value
    : value
      ? [value]
      : uncontrolledValue;
  const id = useId();
  function change(next: string[]) {
    if (value === undefined) setUncontrolledValue(next);
    onValueChange?.(multiple ? next : (next[0] ?? ""));
  }
  return (
    <div {...props} className={cx("t7-accordion", className)}>
      {items.map((item) => {
        const open = openItems.includes(item.id);
        const triggerId = `${id}-trigger-${item.id}`;
        const panelId = `${id}-panel-${item.id}`;
        return (
          <section
            className="t7-accordion-item"
            data-open={open || undefined}
            key={item.id}
          >
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={open}
                disabled={item.disabled}
                id={triggerId}
                onClick={() => {
                  if (open) change(openItems.filter((key) => key !== item.id));
                  else change(multiple ? [...openItems, item.id] : [item.id]);
                }}
                type="button"
              >
                <span>{item.title}</span>
                <T7Icon aria-hidden="true" name="chevronDown" size={17} />
              </button>
            </h3>
            {open ? (
              <div aria-labelledby={triggerId} id={panelId} role="region">
                {item.content}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

export interface CollapsibleProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  children: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: ReactNode;
}

export function Collapsible({
  children,
  className,
  defaultOpen = false,
  disabled = false,
  onOpenChange,
  open,
  title,
  ...props
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const triggerId = useId();
  const panelId = useId();
  const setOpen = (next: boolean) => {
    if (disabled) return;
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };
  return (
    <div
      {...props}
      className={cx("t7-collapsible", className)}
      data-open={isOpen || undefined}
      data-disabled={disabled || undefined}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        disabled={disabled}
        id={triggerId}
        onClick={() => setOpen(!isOpen)}
        type="button"
      >
        <span>{title}</span>
        <T7Icon aria-hidden="true" name="chevronDown" size={17} />
      </button>
      {isOpen ? (
        <div aria-labelledby={triggerId} id={panelId} role="region">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export interface StepperItem {
  description?: string;
  id: string;
  label: string;
  optional?: boolean;
}

export interface StepperProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  current: string;
  onStepChange?: (step: string) => void;
  steps: StepperItem[];
}

export function Stepper({
  className,
  current,
  onStepChange,
  steps,
  ...props
}: StepperProps) {
  const currentIndex = Math.max(
    steps.findIndex((step) => step.id === current),
    0,
  );
  return (
    <nav
      {...props}
      aria-label="Progress"
      className={cx("t7-stepper", className)}
    >
      <ol>
        {steps.map((step, index) => {
          const state =
            index < currentIndex
              ? "complete"
              : index === currentIndex
                ? "current"
                : "upcoming";
          const interactive = Boolean(onStepChange && index <= currentIndex);
          return (
            <li data-state={state} key={step.id}>
              {interactive ? (
                <button
                  aria-current={state === "current" ? "step" : undefined}
                  onClick={() => onStepChange?.(step.id)}
                  type="button"
                >
                  <span className="t7-stepper-indicator">
                    {state === "complete" ? (
                      <T7Icon aria-hidden="true" name="check" size={14} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span>
                    <strong>{step.label}</strong>
                    {step.description ? (
                      <small>{step.description}</small>
                    ) : step.optional ? (
                      <small>Optional</small>
                    ) : null}
                  </span>
                </button>
              ) : (
                <span aria-current={state === "current" ? "step" : undefined}>
                  <span className="t7-stepper-indicator">
                    {state === "complete" ? (
                      <T7Icon aria-hidden="true" name="check" size={14} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span>
                    <strong>{step.label}</strong>
                    {step.description ? (
                      <small>{step.description}</small>
                    ) : step.optional ? (
                      <small>Optional</small>
                    ) : null}
                  </span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface TopNavigationItem {
  controls?: string;
  expanded?: boolean;
  active?: boolean;
  href?: string;
  icon?: IconName;
  key: string;
  label: string;
  onSelect?: () => void;
}

export interface NavigationMenuItem {
  active?: boolean;
  children?: NavigationMenuItem[];
  href?: string;
  icon?: IconName;
  key: string;
  label: string;
  onSelect?: () => void;
}

function NavigationMenuBranch({
  item,
  onRootKeyDown,
  onOpenChange,
  open,
  rootTabIndex,
}: {
  item: NavigationMenuItem;
  onRootKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  onOpenChange: (key: string | null) => void;
  open: boolean;
  rootTabIndex: number;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const floating = useFloatingPosition(triggerRef, open, {
    preferredWidth: Number.parseFloat(overlayGeometry.menu.sm),
    side: "bottom",
    widthStrategy: "min-trigger",
  });
  const children = item.children ?? [];

  function handlePanelKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    const panel = floating.contentRef.current;
    const menuItems = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('[role="menuitem"]'))
      : [];
    const currentIndex = menuItems.indexOf(event.currentTarget);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      menuItems[
        (currentIndex + offset + menuItems.length) % menuItems.length
      ]?.focus();
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      menuItems[event.key === "Home" ? 0 : menuItems.length - 1]?.focus();
      return;
    }
    if (event.key === "Escape" || event.key === "ArrowLeft") {
      event.preventDefault();
      onOpenChange(null);
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!open) return undefined;
    const frame = window.requestAnimationFrame(() => {
      floating.contentRef.current
        ?.querySelector<HTMLElement>('[role="menuitem"]')
        ?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [floating.contentRef, open]);

  return (
    <li className="t7-navigation-menu-item" role="none">
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-current={item.active ? "page" : undefined}
        className="t7-navigation-menu-trigger"
        data-active={item.active || undefined}
        data-t7-navigation-root-item="true"
        onClick={() => onOpenChange(open ? null : item.key)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onOpenChange(null);
          }
          if (
            event.key === "ArrowDown" ||
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            onOpenChange(item.key);
            return;
          }
          onRootKeyDown(event);
        }}
        ref={triggerRef}
        role="menuitem"
        tabIndex={rootTabIndex}
        type="button"
      >
        {item.icon ? (
          <T7Icon aria-hidden="true" name={item.icon} size={16} />
        ) : null}
        <span>{item.label}</span>
        <T7Icon aria-hidden="true" name="chevronDown" size={14} />
      </button>
      {open ? (
        <FloatingPortal anchorRef={triggerRef}>
          <div
            aria-label={`${item.label} navigation`}
            className="t7-navigation-menu-panel t7-floating-content"
            data-floating-placement={floating.placement}
            id={menuId}
            ref={floating.setContentRef}
            role="menu"
            style={floating.style}
          >
            {children.map((child) =>
              child.href ? (
                <a
                  aria-current={child.active ? "page" : undefined}
                  className="t7-navigation-menu-link"
                  href={child.href}
                  key={child.key}
                  onClick={() => {
                    child.onSelect?.();
                    onOpenChange(null);
                  }}
                  onKeyDown={handlePanelKeyDown}
                  role="menuitem"
                >
                  {child.icon ? (
                    <T7Icon aria-hidden="true" name={child.icon} size={16} />
                  ) : null}
                  <span>{child.label}</span>
                </a>
              ) : (
                <button
                  aria-current={child.active ? "page" : undefined}
                  className="t7-navigation-menu-link"
                  key={child.key}
                  onClick={() => {
                    child.onSelect?.();
                    onOpenChange(null);
                  }}
                  onKeyDown={handlePanelKeyDown}
                  role="menuitem"
                  type="button"
                >
                  {child.icon ? (
                    <T7Icon aria-hidden="true" name={child.icon} size={16} />
                  ) : null}
                  <span>{child.label}</span>
                </button>
              ),
            )}
          </div>
        </FloatingPortal>
      ) : null}
    </li>
  );
}

function NavigationMenuList({ items }: { items: NavigationMenuItem[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useExclusiveFloatingLayer(Boolean(openKey), () => setOpenKey(null));

  function handleRootKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const rootItems = rootRef.current
      ? Array.from(
          rootRef.current.querySelectorAll<HTMLElement>(
            "[data-t7-navigation-root-item]",
          ),
        )
      : [];
    const currentIndex = rootItems.indexOf(event.currentTarget);
    if (currentIndex < 0 || !rootItems.length) return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? rootItems.length - 1
          : (currentIndex + offset + rootItems.length) % rootItems.length;
    rootItems[nextIndex]?.focus();
  }

  useEffect(() => {
    if (!openKey) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (
        rootRef.current?.contains(target) ||
        target?.closest(".t7-navigation-menu-panel")
      )
        return;
      setOpenKey(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openKey]);

  return (
    <div className="t7-navigation-menu-items" ref={rootRef}>
      <ul aria-label="Navigation menu" role="menubar">
        {items.map((item, index) =>
          item.children?.length ? (
            <NavigationMenuBranch
              item={item}
              key={item.key}
              onRootKeyDown={handleRootKeyDown}
              onOpenChange={setOpenKey}
              open={openKey === item.key}
              rootTabIndex={index === 0 ? 0 : -1}
            />
          ) : (
            <li className="t7-navigation-menu-item" key={item.key} role="none">
              {item.href ? (
                <a
                  aria-current={item.active ? "page" : undefined}
                  className="t7-navigation-menu-link"
                  data-active={item.active || undefined}
                  data-t7-navigation-root-item="true"
                  href={item.href}
                  onClick={() => item.onSelect?.()}
                  onKeyDown={handleRootKeyDown}
                  role="menuitem"
                  tabIndex={index === 0 ? 0 : -1}
                >
                  {item.icon ? (
                    <T7Icon aria-hidden="true" name={item.icon} size={16} />
                  ) : null}
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  aria-current={item.active ? "page" : undefined}
                  className="t7-navigation-menu-link"
                  data-active={item.active || undefined}
                  data-t7-navigation-root-item="true"
                  onClick={() => item.onSelect?.()}
                  onKeyDown={handleRootKeyDown}
                  role="menuitem"
                  tabIndex={index === 0 ? 0 : -1}
                  type="button"
                >
                  {item.icon ? (
                    <T7Icon aria-hidden="true" name={item.icon} size={16} />
                  ) : null}
                  <span>{item.label}</span>
                </button>
              )}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/** Accessible one-level public navigation; nested branches share the floating overlay contract. */
export interface NavigationMenuProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  items: NavigationMenuItem[];
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function NavigationMenu({
  className,
  items,
  label = "Primary navigation",
  leading,
  trailing,
  ...props
}: NavigationMenuProps) {
  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-navigation-menu", className)}
    >
      {leading ? (
        <div className="t7-navigation-menu-leading">{leading}</div>
      ) : null}
      <NavigationMenuList items={items} />
      {trailing ? (
        <div className="t7-navigation-menu-trailing">{trailing}</div>
      ) : null}
    </nav>
  );
}

export interface TopNavigationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  items: TopNavigationItem[];
  /** Bottom placement reserves its measured height and includes device safe areas. */
  placement?: "top" | "bottom";
  label?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function TopNavigation({
  className,
  items,
  label = "Primary navigation",
  leading,
  placement = "top",
  trailing,
  ...props
}: TopNavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || placement !== "bottom") return;
    const measure = () => setHeight(nav.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [placement]);
  const navigation = (
    <nav
      {...props}
      ref={navRef}
      data-placement={placement}
      aria-label={label}
      className={cx("t7-top-navigation", className)}
    >
      {leading ? (
        <div className="t7-top-navigation-leading">{leading}</div>
      ) : null}
      <div className="t7-top-navigation-items">
        {items.map((item) =>
          item.href ? (
            <a
              aria-current={item.active ? "page" : undefined}
              data-active={item.active || undefined}
              href={item.href}
              key={item.key}
              onClick={() => item.onSelect?.()}
            >
              {item.icon ? (
                <T7Icon aria-hidden="true" name={item.icon} size={16} />
              ) : null}
              <span>{item.label}</span>
            </a>
          ) : (
            <button
              aria-current={item.active ? "page" : undefined}
              aria-controls={item.controls}
              aria-expanded={item.expanded}
              aria-haspopup={item.controls ? "dialog" : undefined}
              data-active={item.active || undefined}
              key={item.key}
              onClick={() => item.onSelect?.()}
              type="button"
            >
              {item.icon ? (
                <T7Icon aria-hidden="true" name={item.icon} size={16} />
              ) : null}
              <span>{item.label}</span>
            </button>
          ),
        )}
      </div>
      {trailing ? (
        <div className="t7-top-navigation-trailing">{trailing}</div>
      ) : null}
    </nav>
  );
  return placement === "bottom" ? (
    <div
      className={cx("t7-bottom-navigation-slot", className)}
      style={{ height }}
    >
      {navigation}
    </div>
  ) : (
    navigation
  );
}

export interface BottomNavigationItem {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon: IconName;
  key: string;
  label: string;
  onSelect?: () => void;
}

export interface BottomNavigationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "onChange"
> {
  items: BottomNavigationItem[];
  label?: string;
  onValueChange?: (key: string) => void;
  position?: "fixed" | "static";
  value?: string;
}

/** A compact mobile-first navigation landmark for a small set of destinations. */
export function BottomNavigation({
  className,
  items,
  label = "Bottom navigation",
  onValueChange,
  position = "static",
  value,
  ...props
}: BottomNavigationProps) {
  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-bottom-navigation", className)}
      data-position={position}
    >
      {items.map((item) => {
        const active = value ? value === item.key : item.active;
        const handleSelect = () => {
          onValueChange?.(item.key);
          item.onSelect?.();
        };
        return item.href ? (
          <a
            aria-current={active ? "page" : undefined}
            className="t7-bottom-navigation-item"
            data-active={active || undefined}
            href={item.href}
            key={item.key}
            onClick={handleSelect}
          >
            <T7Icon aria-hidden="true" name={item.icon} size={20} />
            <span>{item.label}</span>
          </a>
        ) : (
          <button
            aria-current={active ? "page" : undefined}
            className="t7-bottom-navigation-item"
            data-active={active || undefined}
            disabled={item.disabled}
            key={item.key}
            onClick={handleSelect}
            type="button"
          >
            <T7Icon aria-hidden="true" name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export interface NavigationRailItem {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon: IconName;
  key: string;
  label: string;
  onSelect?: () => void;
}

export interface NavigationRailProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "onChange"
> {
  expanded?: boolean;
  items: NavigationRailItem[];
  label?: string;
  onValueChange?: (key: string) => void;
  value?: string;
}

/** A vertical icon-led navigation surface for secondary or tool-level routes. */
export function NavigationRail({
  className,
  expanded = false,
  items,
  label = "Navigation rail",
  onValueChange,
  value,
  ...props
}: NavigationRailProps) {
  return (
    <nav
      {...props}
      aria-label={label}
      className={cx("t7-navigation-rail", className)}
      data-expanded={expanded || undefined}
    >
      {items.map((item) => {
        const active = value ? value === item.key : item.active;
        const handleSelect = () => {
          onValueChange?.(item.key);
          item.onSelect?.();
        };
        const content = (
          <>
            <T7Icon aria-hidden="true" name={item.icon} size={20} />
            <span>{item.label}</span>
          </>
        );
        return item.href ? (
          <a
            aria-current={active ? "page" : undefined}
            className="t7-navigation-rail-item"
            data-active={active || undefined}
            href={item.href}
            key={item.key}
            onClick={handleSelect}
            title={expanded ? undefined : item.label}
          >
            {content}
          </a>
        ) : (
          <button
            aria-current={active ? "page" : undefined}
            className="t7-navigation-rail-item"
            data-active={active || undefined}
            disabled={item.disabled}
            key={item.key}
            onClick={handleSelect}
            title={expanded ? undefined : item.label}
            type="button"
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}

export interface MobileSidebarProps {
  id?: string;
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  title?: string;
}

/** A compact-screen shell composition over the canonical Drawer. */
export function MobileSidebar({
  id,
  children,
  onClose,
  open,
  title = "Navigation",
}: MobileSidebarProps) {
  return (
    <Drawer
      id={id}
      className="t7-mobile-sidebar"
      onClose={onClose}
      open={open}
      side="left"
      title={title}
    >
      {children}
    </Drawer>
  );
}

export interface CommandItem {
  description?: string;
  group?: string;
  icon?: IconName;
  id: string;
  keywords?: string[];
  label: string;
  onSelect: () => void;
  shortcut?: string;
}

export interface CommandMenuProps {
  defaultOpen?: boolean;
  emptyMessage?: string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  shortcut?: boolean;
  commands: CommandItem[];
}

/** Keyboard-first command surface; set shortcut=false when host owns Cmd/Ctrl+K. */
export function CommandMenu({
  commands,
  defaultOpen = false,
  emptyMessage = "No commands found.",
  onOpenChange,
  open,
  placeholder = "Search commands…",
  shortcut = true,
}: CommandMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);
  const listboxId = useId();
  const isOpen = open ?? uncontrolledOpen;
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) =>
      [command.label, command.description ?? "", ...(command.keywords ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [commands, query]);
  const resolvedActiveIndex = Math.min(
    activeIndex,
    Math.max(filtered.length - 1, 0),
  );
  const activeCommand = filtered[resolvedActiveIndex];
  const activeOptionId = activeCommand
    ? `${listboxId}-${activeCommand.id}`
    : undefined;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setQuery("");
      setActiveIndex(0);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  function moveActive(direction: 1 | -1) {
    if (!filtered.length) return;
    setActiveIndex(
      (resolvedActiveIndex + direction + filtered.length) % filtered.length,
    );
  }

  function selectActive() {
    if (!activeCommand) return;
    activeCommand.onSelect();
    setOpen(false);
  }

  useEffect(() => {
    if (!shortcut) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, open, shortcut]);

  return (
    <Modal
      description="Search and run an available action."
      initialFocus={inputRef}
      onClose={() => setOpen(false)}
      open={isOpen}
      size="command"
      title="Command menu"
    >
      <div className="t7-command-menu">
        <Input
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
          aria-label="Search commands"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          autoFocus
          leadingIcon="search"
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              moveActive(event.key === "ArrowDown" ? 1 : -1);
            } else if (event.key === "Home") {
              event.preventDefault();
              setActiveIndex(0);
            } else if (event.key === "End") {
              event.preventDefault();
              setActiveIndex(Math.max(filtered.length - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              selectActive();
            }
          }}
          placeholder={placeholder}
          ref={inputRef}
          role="combobox"
          value={query}
        />
        <div
          aria-label="Commands"
          className="t7-command-results"
          id={listboxId}
          role="listbox"
        >
          {filtered.length === 0 ? <p>{emptyMessage}</p> : null}
          {filtered.map((command, index) => {
            const groupStart =
              command.group && command.group !== filtered[index - 1]?.group;
            return (
              <div key={command.id}>
                {groupStart ? (
                  <div aria-hidden="true" className="t7-command-group-label">
                    {command.group}
                  </div>
                ) : null}
                <button
                  aria-posinset={index + 1}
                  aria-selected={index === resolvedActiveIndex}
                  aria-setsize={filtered.length}
                  data-active={index === resolvedActiveIndex || undefined}
                  id={`${listboxId}-${command.id}`}
                  onClick={() => {
                    command.onSelect();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                  tabIndex={-1}
                  type="button"
                >
                  {command.icon ? (
                    <T7Icon aria-hidden="true" name={command.icon} size={17} />
                  ) : (
                    <span />
                  )}
                  <span>
                    <strong>{command.label}</strong>
                    {command.description ? (
                      <small>{command.description}</small>
                    ) : null}
                  </span>
                  {command.shortcut ? <kbd>{command.shortcut}</kbd> : null}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export const CommandPalette = CommandMenu;
