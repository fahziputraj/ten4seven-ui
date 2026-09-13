import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  Avatar,
  Badge,
  Button,
  CommandMenu,
  DropdownMenu,
  IconButton,
  NavItem,
  Popover,
  Sidebar,
  Typography,
} from "@ten4seven/ui";

import {
  adoptionProofNavigationLabels,
  adoptionProofRoutePaths,
  libraryNavigation,
  playgroundNavigationGroups,
  playgroundRoutePaths,
  type AdoptionProofRoute,
  type PlaygroundRoute,
} from "./playground-routes";
import {
  categoryLabels,
  componentCatalog,
  componentFamilyDefinitions,
  componentFamilyPath,
  componentPath,
  iconCatalog,
  recipeCatalog,
  recipePath,
} from "./catalog-model";

export const playgroundRouteIcons: Record<PlaygroundRoute, IconName> = {
  "Theme Studio": "theme",
  "Component Lab": "components",
  Tokens: "tokens",
  Components: "components",
  Blocks: "components",
  Icons: "category",
  Recipes: "table",
  "Operations Tracker": "analytics",
  "Operational Patterns": "logistics",
  "SaaS Control Plane": "admin",
  "ERP Density Reference": "table",
  "Farm P1 Reference": "farm",
  "Publishing Store": "book",
  "Public Showcase": "dashboard",
};

const adoptionProofIcons: Record<AdoptionProofRoute, IconName> = {
  "Farm Synthetic": "farm",
  "Auth · Neutral": "user",
  "Auth · AAPM Academy": "book",
};

export type PlaygroundBreadcrumbItem = {
  label: string;
  path?: string;
};

/** One route-owned item in the shared contextual navigation composition. */
export type PlaygroundLocalNavigationItem = {
  active?: boolean;
  badge?: ReactNode;
  icon: IconName;
  key: string;
  label: string;
  onSelect?: () => void;
};

/** One labelled group in the shared contextual navigation composition. */
export type PlaygroundLocalNavigationGroup = {
  items: PlaygroundLocalNavigationItem[];
  key: string;
  label: string;
};

/** @deprecated Use PlaygroundLocalNavigationItem in new compositions. */
export type PlaygroundSidebarContextItem = PlaygroundLocalNavigationItem;

/** @deprecated Use PlaygroundLocalNavigationGroup in new compositions. */
export type PlaygroundSidebarContextGroup = PlaygroundLocalNavigationGroup;

function isPlaygroundNavigationActive(
  route: PlaygroundRoute,
  activePath: string,
) {
  const routePath = playgroundRoutePaths[route];
  return activePath === routePath || activePath.startsWith(`${routePath}/`);
}

function LibraryMenu({
  activePath,
  onNavigatePath,
}: {
  activePath: string;
  onNavigatePath: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const goRoute = (route: PlaygroundRoute) => {
    setOpen(false);
    onNavigatePath(playgroundRoutePaths[route]);
  };
  const goPath = (path: string) => {
    setOpen(false);
    onNavigatePath(path);
  };

  return (
    <Popover
      aria-label="Library menu"
      className="studio-library-popover"
      onOpenChange={setOpen}
      open={open}
      side="right"
      trigger={<NavItem icon="components" label="Browse library…" />}
    >
      <div className="studio-library-menu">
        <div className="studio-library-menu-heading">
          <div>
            <Typography typeRole="overline">Library</Typography>
            <Typography as="h2" typeRole="heading-sm">
              Browse contracts
            </Typography>
          </div>
          <span>{componentFamilyDefinitions.length} families</span>
        </div>

        <section className="studio-library-menu-section">
          <div className="studio-library-menu-section-heading">
            <Typography typeRole="label">Components</Typography>
            <span>Direct family access</span>
          </div>
          <NavItem
            active={activePath.startsWith("/components")}
            icon="components"
            label="Components"
            onClick={() => goPath("/components")}
          />
          <div
            aria-label="Component families"
            className="studio-library-family-grid"
          >
            {componentFamilyDefinitions.map((family) => (
              <button
                className="studio-library-family-link"
                key={family.category}
                onClick={() => goPath(componentFamilyPath(family.category))}
                type="button"
              >
                <T7Icon name={family.icon} size={16} />
                <span>{family.label}</span>
                <T7Icon aria-hidden="true" name="arrowRight" size={13} />
              </button>
            ))}
          </div>
        </section>

        <section className="studio-library-menu-section">
          <Typography typeRole="label">Other library contracts</Typography>
          <div className="studio-library-route-grid">
            {libraryNavigation
              .filter((route) => route !== "Components")
              .map((route) => (
                <NavItem
                  active={activePath === playgroundRoutePaths[route]}
                  icon={playgroundRouteIcons[route]}
                  key={route}
                  label={route}
                  onClick={() => goRoute(route)}
                />
              ))}
          </div>
        </section>
      </div>
    </Popover>
  );
}

function PlaygroundNavigation({
  activePath,
  localNavigation,
  mode,
  onlyLocalNavigation = false,
  onNavigatePath,
}: {
  activePath: string;
  localNavigation?: PlaygroundLocalNavigationGroup[];
  mode: "mobile" | "sidebar";
  onlyLocalNavigation?: boolean;
  onNavigatePath: (path: string) => void;
}) {
  const academyIdentityId = useId();
  const navigationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (mode !== "sidebar") return;

    const navigation = navigationRef.current;
    const scrollContainer =
      navigation?.closest<HTMLElement>(".studio-nav-groups");
    if (!scrollContainer) return;

    let cancelled = false;
    const alignActiveItem = () => {
      const activeItem = navigation?.querySelector<HTMLElement>(
        '[data-active="true"]',
      );
      if (cancelled || !activeItem) return;

      const containerRect = scrollContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const topOverflow = itemRect.top - containerRect.top;
      const bottomOverflow = itemRect.bottom - containerRect.bottom;

      if (topOverflow < 0) {
        scrollContainer.scrollTop += topOverflow;
      } else if (bottomOverflow > 0) {
        scrollContainer.scrollTop += bottomOverflow;
      }
    };

    alignActiveItem();
    const frame = window.requestAnimationFrame(alignActiveItem);
    document.fonts?.ready.then(alignActiveItem);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [activePath, mode]);

  return (
    <div className="studio-navigation-tree" ref={navigationRef}>
      {!onlyLocalNavigation
        ? playgroundNavigationGroups.map((group) => (
            <div
              aria-label={group.label}
              className="studio-nav-group"
              data-surface-maturity={group.maturity}
              key={group.label}
              role="group"
            >
              <span className="studio-nav-label">{group.label}</span>
              {group.routes.map((route) => {
                const isActive = isPlaygroundNavigationActive(
                  route,
                  activePath,
                );
                return (
                  <NavItem
                    active={isActive}
                    aria-current={isActive ? "page" : undefined}
                    icon={playgroundRouteIcons[route]}
                    key={route}
                    label={route}
                    onClick={() => onNavigatePath(playgroundRoutePaths[route])}
                  />
                );
              })}
              {group.id === "library" && mode === "sidebar" ? (
                <LibraryMenu
                  activePath={activePath}
                  onNavigatePath={onNavigatePath}
                />
              ) : null}
              {group.adoptionProofRoutes?.map((route) => {
                const isActive = activePath === adoptionProofRoutePaths[route];
                const isAcademy = route === "Auth · AAPM Academy";
                return (
                  <NavItem
                    active={isActive}
                    aria-describedby={isAcademy ? academyIdentityId : undefined}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={isAcademy ? route : undefined}
                    icon={adoptionProofIcons[route]}
                    key={route}
                    label={adoptionProofNavigationLabels[route]}
                    onClick={() =>
                      onNavigatePath(adoptionProofRoutePaths[route])
                    }
                    title={isAcademy ? route : undefined}
                  />
                );
              })}
              {group.adoptionProofRoutes ? (
                <span className="sr-only" id={academyIdentityId}>
                  Canonical identity: AAPM Academy.
                </span>
              ) : null}
            </div>
          ))
        : null}

      {onlyLocalNavigation
        ? localNavigation?.map((group) => (
            <div
              aria-label={group.label}
              className="studio-nav-group studio-context-nav-group"
              data-navigation-context={group.key}
              data-navigation-scope="local"
              key={group.key}
              role="group"
            >
              <span className="studio-nav-label">{group.label}</span>
              {group.items.map((item) => (
                <div className="t7-sidebar-item" key={item.key}>
                  <NavItem
                    active={item.active}
                    aria-current={item.active ? "page" : undefined}
                    data-navigation-item="local"
                    icon={item.icon}
                    label={item.label}
                    onClick={item.onSelect}
                  />
                  {item.badge ? (
                    <span className="t7-sidebar-badge">{item.badge}</span>
                  ) : null}
                </div>
              ))}
            </div>
          ))
        : null}
    </div>
  );
}

export interface PlaygroundLocalNavigationProps {
  activePath: string;
  groups: PlaygroundLocalNavigationGroup[];
  label?: string;
  mode?: "mobile" | "sidebar";
  onNavigatePath: (path: string) => void;
}

/**
 * Shared route-local navigation for reference and proof workspaces.
 *
 * The route supplies meaning and state; this composition owns the common
 * landmark, item geometry, active semantics, and compact-screen placement.
 */
export function PlaygroundLocalNavigation({
  activePath,
  groups,
  label = "Local navigation",
  mode = "sidebar",
  onNavigatePath,
}: PlaygroundLocalNavigationProps) {
  if (!groups.length) return null;

  return (
    <nav
      aria-label={label}
      className="playground-context-navigation t7-sidebar-nav has-groups"
      data-navigation-mode={mode}
      data-navigation-scope="local"
    >
      <PlaygroundNavigation
        activePath={activePath}
        localNavigation={groups}
        mode={mode}
        onNavigatePath={onNavigatePath}
        onlyLocalNavigation
      />
    </nav>
  );
}

function Ten4SevenWordmark() {
  return (
    <span
      aria-label="ten4seven UI system"
      className="studio-wordmark"
      role="img"
    >
      <span aria-hidden="true" className="studio-mark">
        <T7Icon name="theme" size={18} />
      </span>
      <span className="studio-wordmark-copy">
        <span aria-hidden="true" className="studio-wordmark-name">
          ten4seven
        </span>
        <span aria-hidden="true" className="studio-wordmark-subtitle">
          UI system
        </span>
      </span>
    </span>
  );
}

export interface PlaygroundSidebarProps {
  activePath: string;
  element?: "aside" | "div";
  footer?: ReactNode;
  label?: string;
  localNavigation?: PlaygroundLocalNavigationGroup[];
  localNavigationLabel?: string;
  mode?: "mobile" | "sidebar";
  onNavigatePath: (path: string) => void;
  className?: string;
}

export function PlaygroundSidebar({
  activePath,
  className,
  element = "div",
  footer,
  label = "ten4seven UI navigation",
  localNavigation,
  localNavigationLabel,
  mode = "sidebar",
  onNavigatePath,
}: PlaygroundSidebarProps) {
  const [scrollState, setScrollState] = useState({
    canScrollDown: false,
    canScrollUp: false,
    isScrolling: false,
  });
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mode !== "sidebar") return undefined;
    const navigation = navigationRef.current;
    if (!navigation) return undefined;

    let cancelled = false;
    let frame = 0;
    let settleTimer: number | undefined;
    const updateScrollState = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (cancelled) return;
        const maxScrollTop = Math.max(
          0,
          navigation.scrollHeight - navigation.clientHeight,
        );
        const nextState = {
          canScrollDown: maxScrollTop - navigation.scrollTop > 2,
          canScrollUp: navigation.scrollTop > 2,
        };
        setScrollState((current) =>
          current.canScrollDown === nextState.canScrollDown &&
          current.canScrollUp === nextState.canScrollUp
            ? current
            : { ...current, ...nextState },
        );
      });
    };
    const handleScroll = () => {
      setScrollState((current) =>
        current.isScrolling ? current : { ...current, isScrolling: true },
      );
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        setScrollState((current) =>
          current.isScrolling ? { ...current, isScrolling: false } : current,
        );
      }, 650);
      updateScrollState();
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(updateScrollState);

    navigation.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    resizeObserver?.observe(navigation);
    if (navigation.firstElementChild)
      resizeObserver?.observe(navigation.firstElementChild);
    updateScrollState();
    document.fonts?.ready.then(updateScrollState);

    return () => {
      cancelled = true;
      navigation.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
    };
  }, [mode]);

  const classNames = [
    "playground-sidebar",
    mode === "sidebar" ? "studio-sidebar" : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Sidebar
      as={element}
      brand={
        <div className="studio-brand">
          <Ten4SevenWordmark />
        </div>
      }
      className={classNames}
      footer={
        footer ?? (
          <>
            <span className="studio-nav-label">Explore</span>
            <p>Canonical UI surfaces, recipes, and practical previews.</p>
            <span className="studio-sidebar-version">Ten4Seven UI</span>
          </>
        )
      }
      label={label}
    >
      <div className="studio-nav-scroll-shell">
        <nav
          aria-label={
            localNavigation?.length ? "ten4seven UI navigation" : label
          }
          className="studio-nav-groups t7-sidebar-nav has-groups"
          data-scroll-can-scroll-down={
            scrollState.canScrollDown ? "true" : undefined
          }
          data-scroll-can-scroll-up={
            scrollState.canScrollUp ? "true" : undefined
          }
          data-scroll-scrolling={scrollState.isScrolling ? "true" : undefined}
          ref={navigationRef}
        >
          <PlaygroundNavigation
            activePath={activePath}
            mode={mode}
            onNavigatePath={onNavigatePath}
          />
        </nav>
        {mode === "sidebar" && scrollState.canScrollUp ? (
          <span
            aria-hidden="true"
            className="studio-nav-scroll-cue studio-nav-scroll-cue-up"
          >
            <T7Icon name="chevronUp" size={13} />
            <span>More above</span>
          </span>
        ) : null}
        {mode === "sidebar" && scrollState.canScrollDown ? (
          <span
            aria-hidden="true"
            className="studio-nav-scroll-cue studio-nav-scroll-cue-down"
          >
            <span>More below</span>
            <T7Icon name="chevronDown" size={13} />
          </span>
        ) : null}
      </div>

      <PlaygroundLocalNavigation
        activePath={activePath}
        groups={localNavigation ?? []}
        label={localNavigationLabel ?? label}
        mode={mode}
        onNavigatePath={onNavigatePath}
      />
    </Sidebar>
  );
}

function WorkbenchSearch({
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const commands = useMemo(
    () => [
      ...Object.entries(componentCatalog).map(([name, component]) => ({
        description: categoryLabels[component.category] ?? component.category,
        group: "Components",
        icon: "components" as IconName,
        id: `component-${name}`,
        keywords: [
          component.displayName ?? "",
          ...component.useWhen,
          ...component.relatedComponents,
          component.aliasOf ?? "",
        ],
        label: component.displayName ?? name,
        onSelect: () => onNavigatePath(componentPath(name)),
      })),
      ...Object.keys(iconCatalog).map((name) => ({
        description: "Semantic icon",
        group: "Icons",
        icon: "category" as IconName,
        id: `icon-${name}`,
        keywords: iconCatalog[name].useWhen,
        label: name,
        onSelect: () => onNavigatePath("/icons"),
      })),
      ...Object.entries(recipeCatalog).map(([name, recipe]) => ({
        description: recipe.purpose,
        group: "Recipes",
        icon: "table" as IconName,
        id: `recipe-${name}`,
        keywords: recipe.components,
        label: name,
        onSelect: () => onNavigatePath(recipePath(name)),
      })),
    ],
    [onNavigatePath],
  );

  return (
    <>
      <Button
        aria-label="Search ten4seven catalog"
        className="studio-search-trigger"
        intent="quiet"
        leadingIcon="search"
        onClick={() => setOpen(true)}
        size="sm"
      >
        <span>Search catalog</span>
        <kbd>Ctrl K</kbd>
      </Button>
      <CommandMenu
        commands={commands}
        onOpenChange={setOpen}
        open={open}
        placeholder="Search components, tokens, icons, recipes…"
        shortcut
      />
    </>
  );
}

function StudioLiveMenu() {
  return (
    <Popover
      aria-label="Live preview status"
      className="studio-live-menu"
      side="bottom"
      trigger={
        <button className="studio-live-trigger" type="button">
          <span aria-hidden="true" className="studio-live-indicator" />
          <span>Live</span>
          <T7Icon aria-hidden="true" name="chevronDown" size={13} />
        </button>
      }
    >
      <div className="studio-live-menu-content">
        <div className="studio-live-menu-heading">
          <span aria-hidden="true" className="studio-live-menu-icon">
            <T7Icon name="check" size={16} />
          </span>
          <div>
            <strong>Live preview active</strong>
            <span>Theme changes resolve across the current specimen.</span>
          </div>
        </div>
        <div className="studio-live-menu-meta">
          <span>Local sandbox</span>
          <Badge tone="success">Synced</Badge>
        </div>
      </div>
    </Popover>
  );
}

function StudioAccountMenu({
  onNavigatePath,
  onOpenSettings,
}: {
  onNavigatePath: (path: string) => void;
  onOpenSettings: () => void;
}) {
  return (
    <DropdownMenu
      aria-label="ten4seven workspace menu"
      className="studio-account-menu"
      items={[
        {
          description: "Adjust the live token sandbox",
          icon: "theme",
          key: "theme-settings",
          label: "Theme settings",
          onSelect: onOpenSettings,
        },
        {
          description: "Inspect canonical component behavior",
          icon: "components",
          key: "component-lab",
          label: "Component Lab",
          onSelect: () => onNavigatePath("/component-lab"),
        },
        {
          description: "Browse the semantic token contract",
          icon: "tokens",
          key: "tokens",
          label: "Tokens",
          onSelect: () => onNavigatePath("/tokens"),
        },
      ]}
      label="ten4seven workspace"
      trigger={
        <button className="studio-account-trigger" type="button">
          <Avatar alt="ten4seven workspace" name="T7" size="sm" />
          <span className="studio-account-copy">
            <strong>ten4seven</strong>
            <small>UI workspace</small>
          </span>
          <T7Icon aria-hidden="true" name="chevronDown" size={13} />
        </button>
      }
    />
  );
}

export interface PlaygroundTopbarProps {
  activeRoute: PlaygroundRoute;
  backLabel?: string;
  breadcrumbItems?: PlaygroundBreadcrumbItem[];
  mobileMenuLabel?: string;
  mobileNavigationId?: string;
  onNavigatePath: (path: string) => void;
  onOpenMobileNavigation?: () => void;
  onOpenSettings?: () => void;
  isMobileNavOpen?: boolean;
  showBack?: boolean;
  settingsLabel?: string;
  className?: string;
}

export function PlaygroundTopbar({
  activeRoute,
  backLabel = "Back to Theme Studio",
  breadcrumbItems = [{ label: activeRoute }],
  className,
  isMobileNavOpen = false,
  mobileMenuLabel = "Open design system navigation",
  mobileNavigationId,
  onNavigatePath,
  onOpenMobileNavigation,
  onOpenSettings,
  settingsLabel = "Open settings",
  showBack = false,
}: PlaygroundTopbarProps) {
  const classNames = ["playground-topbar", "studio-topbar", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      <div className="studio-topbar-leading">
        {onOpenMobileNavigation ? (
          <IconButton
            className="studio-mobile-menu"
            icon="menu"
            label={mobileMenuLabel}
            aria-expanded={isMobileNavOpen}
            aria-controls={mobileNavigationId}
            aria-haspopup="dialog"
            onClick={onOpenMobileNavigation}
            size="md"
          />
        ) : null}
        <div className="studio-breadcrumb">
          <span>ten4seven UI</span>
          <T7Icon aria-hidden="true" name="chevronRight" size={13} />
          {breadcrumbItems.map((item, index, items) => (
            <span className="studio-breadcrumb-item" key={item.label}>
              {index === items.length - 1 ? (
                <T7Icon
                  aria-hidden="true"
                  className="studio-breadcrumb-route-icon"
                  name={playgroundRouteIcons[activeRoute]}
                  size={14}
                />
              ) : null}
              {item.path ? (
                <a
                  href={item.path}
                  onClick={(event) => {
                    if (
                      event.defaultPrevented ||
                      event.button !== 0 ||
                      event.metaKey ||
                      event.ctrlKey ||
                      event.shiftKey ||
                      event.altKey
                    ) {
                      return;
                    }
                    event.preventDefault();
                    onNavigatePath(item.path!);
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <strong>{item.label}</strong>
              )}
              {index < items.length - 1 ? (
                <T7Icon aria-hidden="true" name="chevronRight" size={13} />
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className="studio-top-actions t7-header-actions">
        {showBack ? (
          <IconButton
            className="playground-topbar-back"
            icon="arrowLeft"
            label={backLabel}
            onClick={() => onNavigatePath("/theme-studio")}
            size="md"
          />
        ) : null}
        <WorkbenchSearch onNavigatePath={onNavigatePath} />
        <StudioLiveMenu />
        {onOpenSettings ? (
          <IconButton
            className="studio-top-icon"
            icon="settings"
            label={settingsLabel}
            onClick={onOpenSettings}
            size="md"
          />
        ) : null}
        <StudioAccountMenu
          onNavigatePath={onNavigatePath}
          onOpenSettings={onOpenSettings ?? (() => undefined)}
        />
      </div>
    </div>
  );
}
