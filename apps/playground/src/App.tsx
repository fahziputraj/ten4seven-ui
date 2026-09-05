import { CANVAS_LABELS } from "@ten4seven/contracts";
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  THEME_RECIPES,
  type RuntimePreferences,
  type ThemeRecipeName,
} from "@ten4seven/contracts";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  DataTable,
  Drawer,
  Input,
  IconButton,
  CommandMenu,
  MobileSidebar,
  TopNavigation,
  Modal,
  NavItem,
  Popover,
  Select,
  Slider,
  Ten4SevenProvider,
  ThemeScope,
  Typography,
  useTen4SevenTheme,
  ToastProvider,
  Badge,
  type DataTableColumn,
} from "@ten4seven/ui";
import type {
  Appearance,
  CanvasName,
  ChartPaletteName,
  DensityName,
  PaletteName,
  RadiusName,
  ResolvedTheme,
  TypographyName,
} from "@ten4seven/tokens";
import {
  buildRadiusProfile,
  canvasProfiles,
  motionDurationRange,
  paletteProfiles,
  radiusProfiles,
  radiusValueRange,
  typographyProfiles,
} from "@ten4seven/tokens";
import {
  EbookStoreCatalog,
  OperationsTracker,
  type OperationsViewState,
} from "./reference-screens";
import {
  BlockDetailExplorer,
  BlocksExplorer,
  ComponentsExplorer,
  ComponentDetailExplorer,
  ComponentFamilyExplorer,
  ComponentLabExplorer,
  IconsExplorer,
  RecipeDetailExplorer,
  RecipesExplorer,
  TokensExplorer,
} from "./library-explorers";
import { PublicShowcase } from "./public-showcase";
import { OperationalReference } from "./operational-reference";
import { BrandExpressionProof } from "./brand-expression";
import {
  blockCatalog,
  categoryLabels,
  componentCatalog,
  componentFamilyDefinitions,
  componentFamilyPath,
  componentPath,
  iconCatalog,
  recipeCatalog,
  recipePath,
} from "./catalog-model";
import {
  libraryNavigation,
  brandProofRouteTitles,
  playgroundRoutePaths,
  playgroundRouteDescriptions,
  playgroundRouteTitles,
  referenceNavigation,
  routeFromPath,
  studioNavigation,
  type PlaygroundRoute,
  type RouteMatch,
} from "./playground-routes";
import { ReferenceHarness, type ReferenceViewState } from "./reference-harness";

type StudioSettings = {
  appearance: Appearance;
  palette: PaletteName;
  primary: PaletteName;
  accent: PaletteName;
  canvas: CanvasName;
  chartPalette: ChartPaletteName;
  radius: RadiusName;
  density: DensityName;
  motionDuration: number;
  typography: TypographyName;
};

type StudioThemeChange = {
  label: string;
  value: string;
};

const runtimePreferencesStorageKey =
  "ten4seven.playground.runtime-preferences.v1";

function readRuntimePreferences(): RuntimePreferences {
  if (typeof window === "undefined") return {};
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(runtimePreferencesStorageKey) ?? "{}",
    );
    if (!stored || typeof stored !== "object" || Array.isArray(stored))
      return {};
    const candidate = stored as Record<string, unknown>;
    return {
      appearance:
        candidate.appearance === "light" ||
        candidate.appearance === "dark" ||
        candidate.appearance === "system"
          ? candidate.appearance
          : undefined,
      contrast:
        candidate.contrast === "standard" || candidate.contrast === "more"
          ? candidate.contrast
          : undefined,
      density:
        candidate.density === "dense" ||
        candidate.density === "compact" ||
        candidate.density === "default" ||
        candidate.density === "comfortable"
          ? candidate.density
          : undefined,
      motion:
        candidate.motion === "full" || candidate.motion === "reduced"
          ? candidate.motion
          : undefined,
    };
  } catch {
    return {};
  }
}

function formatRadiusSetting(
  theme: Pick<ResolvedTheme, "radius" | "radiusValue">,
) {
  return theme.radiusValue === undefined
    ? theme.radius
    : `${theme.radiusValue}px`;
}

function getThemeChange(
  previous: ResolvedTheme,
  next: ResolvedTheme,
): StudioThemeChange | null {
  const axes: Array<[string, string, string]> = [
    ["Appearance", previous.appearance, next.appearance],
    ["Base palette", previous.palette, next.palette],
    ["Main action color", previous.primary, next.primary],
    ["Accent color", previous.accent, next.accent],
    ["Canvas", previous.canvas, next.canvas],
    ["Chart colorway", previous.chartPalette, next.chartPalette],
    ["Radius", formatRadiusSetting(previous), formatRadiusSetting(next)],
    ["Density", previous.density, next.density],
    [
      "Motion duration",
      formatMotionDuration(previous.motionDuration),
      formatMotionDuration(next.motionDuration),
    ],
    ["Typography", previous.typography, next.typography],
  ];
  const changed = axes.find(
    ([, previousValue, nextValue]) => previousValue !== nextValue,
  );
  return changed ? { label: changed[0], value: changed[2] } : null;
}

type InventoryRow = {
  id: string;
  component: string;
  layer: string;
  status: "Ready" | "In review";
};

const inventoryRows: InventoryRow[] = [
  {
    id: "tokens",
    component: "Semantic tokens",
    layer: "L1 foundation",
    status: "Ready",
  },
  { id: "button", component: "Button", layer: "L4 canonical", status: "Ready" },
  {
    id: "table",
    component: "DataTable",
    layer: "L4 canonical",
    status: "In review",
  },
];

const columns: DataTableColumn<InventoryRow>[] = [
  { key: "component", header: "Surface" },
  { key: "layer", header: "Layer" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge tone={row.status === "Ready" ? "success" : "warning"}>
        {row.status}
      </Badge>
    ),
  },
];

const routeIcons: Record<PlaygroundRoute, IconName> = {
  "Theme Studio": "theme",
  "Component Lab": "components",
  Tokens: "tokens",
  Components: "components",
  Blocks: "components",
  Icons: "category",
  Recipes: "table",
  "Operations Tracker": "analytics",
  "Operational Patterns": "logistics",
  "Publishing Store": "book",
  "Public Showcase": "dashboard",
};

const studioNavGroups: Array<{
  label: string;
  routes: PlaygroundRoute[];
}> = [
  { label: "Studio", routes: studioNavigation },
  { label: "Library", routes: libraryNavigation },
  { label: "References", routes: referenceNavigation },
];

function LibraryMenu({
  activePath,
  onNavigate,
  onNavigatePath,
}: {
  activePath: string;
  onNavigate: (route: PlaygroundRoute) => void;
  onNavigatePath: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isLibraryActive = libraryNavigation.some(
    (route) =>
      activePath === playgroundRoutePaths[route] ||
      (route === "Components" && activePath.startsWith("/components")),
  );

  const goRoute = (route: PlaygroundRoute) => {
    setOpen(false);
    onNavigate(route);
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
      trigger={
        <NavItem active={isLibraryActive} icon="components" label="Library" />
      }
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
                  icon={routeIcons[route]}
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

function WorkbenchNavigation({
  activePath,
  mode = "sidebar",
  onNavigate,
  onNavigatePath,
}: {
  activePath: string;
  mode?: "mobile" | "sidebar";
  onNavigate: (route: PlaygroundRoute) => void;
  onNavigatePath: (path: string) => void;
}) {
  return (
    <div className="studio-navigation-tree">
      {studioNavGroups.map((group) => (
        <div
          aria-label={group.label}
          className="studio-nav-group"
          key={group.label}
          role="group"
        >
          {group.label === "Library" && mode === "sidebar" ? (
            <>
              <span className="studio-nav-label">{group.label}</span>
              <LibraryMenu
                activePath={activePath}
                onNavigate={onNavigate}
                onNavigatePath={onNavigatePath}
              />
            </>
          ) : (
            <>
              <span className="studio-nav-label">{group.label}</span>
              {group.routes.map((route) => {
                const isActive = activePath === playgroundRoutePaths[route];
                return (
                  <NavItem
                    active={isActive}
                    aria-current={isActive ? "page" : undefined}
                    icon={routeIcons[route]}
                    key={route}
                    label={route}
                    onClick={() => onNavigate(route)}
                  />
                );
              })}
            </>
          )}
        </div>
      ))}
    </div>
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

function StudioMark() {
  return (
    <span className="studio-mark">
      <T7Icon name="theme" size={18} />
    </span>
  );
}

function TypographySpecimen() {
  const { theme } = useTen4SevenTheme();

  return (
    <section className="studio-type-section">
      <div className="studio-section-heading">
        <div>
          <h2>Typography specimen</h2>
          <p>One live hierarchy, resolved from the active typography preset.</p>
        </div>
        <span className="studio-section-count">
          {typographyPresetLabels[theme.typography]} · 22 roles
        </span>
      </div>

      <Card className="typography-specimen">
        <CardContent>
          <div className="type-specimen-hero">
            <div className="type-specimen-hero-copy">
              <Typography typeRole="overline">Display</Typography>
              <Typography typeRole="display-lg" as="h2">
                Make the system legible.
              </Typography>
              <Typography typeRole="body-lg" as="p">
                Hierarchy comes from size, space, color, tracking, and limited
                emphasis—not a wall of bold text.
              </Typography>
            </div>
            <div className="type-specimen-meta">
              <Typography typeRole="overline">Active type system</Typography>
              <Typography typeRole="label" as="strong">
                Role-led hierarchy
              </Typography>
              <Typography typeRole="caption">Optical sizing enabled</Typography>
              <Typography typeRole="caption">
                {typographyPresetDetails[theme.typography]} · opsz auto
              </Typography>
            </div>
          </div>

          <div className="type-specimen-grid">
            <div className="type-specimen-group">
              <Typography typeRole="overline">Heading roles</Typography>
              <Typography typeRole="heading-lg" as="h3">
                Section title
              </Typography>
              <Typography typeRole="card-title" as="h3">
                Card title
              </Typography>
              <Typography typeRole="heading-sm" as="h3">
                Supporting heading
              </Typography>
            </div>

            <div className="type-specimen-group">
              <Typography typeRole="overline">Reading roles</Typography>
              <Typography typeRole="body" as="p">
                Body text stays readable and calm at the default UI size.
              </Typography>
              <Typography typeRole="body-sm" as="p">
                Small body text carries supporting context without competing.
              </Typography>
              <Typography typeRole="label">Form label</Typography>
              <Typography typeRole="caption">Helper text</Typography>
            </div>

            <div className="type-specimen-group type-specimen-controls">
              <Typography typeRole="overline">Controls</Typography>
              <div className="type-specimen-control-row">
                <Button size="sm">Primary action</Button>
                <Button intent="secondary" size="sm">
                  Secondary
                </Button>
              </div>
              <div
                className="type-specimen-tabs"
                aria-label="Typography tab sample"
              >
                <span data-active="true">Overview</span>
                <span>Activity</span>
                <span>Settings</span>
              </div>
              <NavItem active icon="theme" label="Navigation item" />
            </div>

            <div className="type-specimen-group type-specimen-data">
              <Typography typeRole="overline">Data roles</Typography>
              <div className="type-specimen-data-rows">
                <div className="type-specimen-data-row">
                  <Typography typeRole="table-header">Amount</Typography>
                  <Typography typeRole="table-cell" data-numeric>
                    $48,920.00
                  </Typography>
                </div>
                <div className="type-specimen-data-row">
                  <Typography typeRole="table-header">Change</Typography>
                  <Typography typeRole="table-cell" data-numeric>
                    +18.4%
                  </Typography>
                </div>
                <div className="type-specimen-data-row">
                  <Typography typeRole="table-header">Updated</Typography>
                  <Typography typeRole="table-cell">Aug 26, 2026</Typography>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-label="Additional typography roles"
            className="type-specimen-role-strip"
          >
            <div className="type-specimen-role-card">
              <Typography typeRole="overline">Metric</Typography>
              <Typography typeRole="metric-lg" data-numeric>
                12,480
              </Typography>
              <Typography typeRole="caption">metric-lg</Typography>
            </div>
            <div className="type-specimen-role-card">
              <Typography typeRole="overline">Navigation</Typography>
              <Typography typeRole="nav">Operations tracker</Typography>
              <Typography typeRole="caption">nav</Typography>
            </div>
            <div className="type-specimen-role-card">
              <Typography typeRole="overline">Input</Typography>
              <Typography typeRole="input">Search records…</Typography>
              <Typography typeRole="caption">input</Typography>
            </div>
            <div className="type-specimen-role-card">
              <Typography typeRole="overline">Code</Typography>
              <code>--t7-focus-hsl</code>
              <Typography typeRole="caption">mono family</Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Studio({
  activeRoute,
  activePath,
  breadcrumbItems,
  contentOverride,
  onNavigate,
  onNavigatePath,
  onOpenSettings,
  onThemePreferencesChange,
  onThemeRecipeChange,
  themePreferences,
  themeRecipe,
}: {
  activeRoute: Exclude<
    PlaygroundRoute,
    | "Operations Tracker"
    | "Operational Patterns"
    | "Publishing Store"
    | "Public Showcase"
  >;
  activePath: string;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  contentOverride?: ReactNode;
  onNavigate: (route: PlaygroundRoute) => void;
  onNavigatePath: (path: string) => void;
  onOpenSettings: () => void;
  onThemePreferencesChange: (preferences: RuntimePreferences) => void;
  onThemeRecipeChange: (recipe: ThemeRecipeName | undefined) => void;
  themePreferences: RuntimePreferences;
  themeRecipe: ThemeRecipeName | undefined;
}) {
  const { appearanceSetting, resetTheme, theme } = useTen4SevenTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavigationId = useId();
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileNavOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => setMobileNavOpen(false), [activePath]);
  const [saved, setSaved] = useState(false);
  const previousThemeRef = useRef(theme);
  const didMountThemeRef = useRef(false);
  const [lastChange, setLastChange] = useState<StudioThemeChange | null>(null);

  useEffect(() => {
    if (!didMountThemeRef.current) {
      didMountThemeRef.current = true;
      previousThemeRef.current = theme;
      return;
    }
    const change = getThemeChange(previousThemeRef.current, theme);
    if (change) setLastChange(change);
    previousThemeRef.current = theme;
  }, [theme]);

  const axisRows = useMemo(
    () => [
      [
        "Appearance",
        appearanceSetting === "system"
          ? `system · ${theme.appearance}`
          : theme.appearance,
      ],
      ["Base palette", theme.palette],
      ["Main action", theme.primary],
      ["Accent color", theme.accent],
      ["Canvas", theme.canvas],
      ["Chart colorway", theme.chartPalette],
      [
        "Radius",
        theme.radiusValue === undefined
          ? theme.radius
          : `${theme.radiusValue}px`,
      ],
      ["Density", theme.density],
      ["Motion duration", formatMotionDuration(theme.motionDuration)],
      ["Typography", theme.typography],
    ],
    [appearanceSetting, theme],
  );

  return (
    <div className="studio-shell">
      <aside className="studio-sidebar">
        <div className="studio-brand">
          <StudioMark />
          <div>
            <strong>ten4seven</strong>
            <span>UI system</span>
          </div>
        </div>

        <nav aria-label="ten4seven UI navigation" className="studio-nav-groups">
          <WorkbenchNavigation
            activePath={activePath}
            onNavigate={onNavigate}
            onNavigatePath={onNavigatePath}
          />
        </nav>

        <div className="studio-sidebar-note">
          <span className="studio-nav-label">Explore</span>
          <p>Canonical foundations, recipes, and practical previews.</p>
          <span className="studio-sidebar-version">Theme workbench</span>
        </div>
      </aside>

      <main className="studio-main">
        <header className="studio-topbar">
          <div className="studio-topbar-leading">
            <IconButton
              className="studio-mobile-menu"
              icon="menu"
              label="Open design system navigation"
              aria-expanded={isMobileNavOpen}
              aria-controls={mobileNavigationId}
              aria-haspopup="dialog"
              onClick={() => setMobileNavOpen(true)}
              size="md"
            />
            <div className="studio-breadcrumb">
              <span>ten4seven UI</span>
              <T7Icon aria-hidden="true" name="chevronRight" size={13} />
              {(breadcrumbItems ?? [{ label: activeRoute }]).map(
                (item, index, items) => (
                  <span className="studio-breadcrumb-item" key={item.label}>
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
                      <T7Icon
                        aria-hidden="true"
                        name="chevronRight"
                        size={13}
                      />
                    ) : null}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="studio-top-actions t7-header-actions">
            <WorkbenchSearch onNavigatePath={onNavigatePath} />
            <span aria-label="Live preview active" className="studio-live-dot">
              <i /> Live
            </span>
            <IconButton
              className="studio-top-icon"
              icon="settings"
              label="Open settings"
              onClick={onOpenSettings}
              size="md"
            />
            <span className="studio-avatar">T7</span>
          </div>
        </header>

        <MobileSidebar
          id={mobileNavigationId}
          onClose={() => setMobileNavOpen(false)}
          open={isMobileNavOpen}
          title="Design system navigation"
        >
          <div className="studio-mobile-navigation">
            <WorkbenchNavigation
              activePath={activePath}
              mode="mobile"
              onNavigate={(route) => {
                setMobileNavOpen(false);
                onNavigate(route);
              }}
              onNavigatePath={(path) => {
                setMobileNavOpen(false);
                onNavigatePath(path);
              }}
            />
          </div>
        </MobileSidebar>

        {activeRoute === "Theme Studio" && !contentOverride ? (
          <>
            <div className="studio-content">
              <section className="studio-intro">
                <div>
                  <Typography typeRole="display-lg" as="h1">
                    Theme Studio
                  </Typography>
                  <p>
                    Start with a curated recipe, then inspect how runtime
                    preferences and advanced tokens affect the same surfaces.
                  </p>
                </div>
                <div className="studio-intro-actions">
                  <span className="studio-last-updated">
                    Preview changes as you adjust the workbench.
                  </span>
                </div>
              </section>

              <section
                aria-label="Theme recipe, runtime preferences, and live preview"
                className="studio-workbench-layout"
              >
                <div className="studio-control-rail">
                  <ThemeRecipePicker
                    onPreferencesChange={onThemePreferencesChange}
                    onSelect={onThemeRecipeChange}
                    preferences={themePreferences}
                    value={themeRecipe}
                  />
                </div>

                <aside className="studio-preview-rail">
                  <StudioLivePreview lastChange={lastChange} />
                </aside>
              </section>

              <Collapsible
                className="studio-advanced-authoring"
                defaultOpen
                title={
                  <span className="studio-advanced-authoring-title">
                    <span>Advanced theme authoring</span>
                    <small>
                      Fine-tune authored tokens when a recipe needs it
                    </small>
                  </span>
                }
              >
                <div className="studio-advanced-authoring-content">
                  <Card className="studio-controls-card">
                    <CardHeader>
                      <div className="studio-controls-header-copy">
                        <CardTitle as="h2">Authoring tokens</CardTitle>
                        <CardDescription>
                          Fine-tune authored tokens after choosing a recipe and
                          runtime preference. These settings travel with the
                          provider without replacing user preferences.
                        </CardDescription>
                      </div>
                      <T7Icon
                        className="studio-card-icon"
                        name="palette"
                        size={24}
                      />
                    </CardHeader>
                    <CardContent className="studio-controls-content">
                      <div
                        aria-label="How global controls relate"
                        className="studio-control-guide"
                        data-testid="studio-control-guide"
                        role="note"
                      >
                        <div className="studio-control-guide-copy">
                          <Typography
                            as="h3"
                            className="studio-control-guide-title"
                            typeRole="label"
                          >
                            How the controls relate
                          </Typography>
                          <p>
                            <strong>Base palette</strong> sets the default hue.{" "}
                            <strong>Main action</strong> colors buttons, links,
                            and selected states. <strong>Accent color</strong>{" "}
                            drives supporting emphasis. Focus uses a dedicated
                            accessible role. <strong>Canvas</strong> controls
                            neutral surfaces; <strong>Chart</strong> controls
                            data series and explicitly colorway-linked Card,
                            KPI, or bounded Surface regions.
                          </p>
                        </div>
                        <div className="studio-control-guide-roles">
                          <span data-role="base">Base</span>
                          <span data-role="role">UI roles</span>
                          <span data-role="surface">Surfaces</span>
                          <span data-role="motion">Motion</span>
                        </div>
                      </div>
                      <div className="studio-controls-grid">
                        <section
                          aria-labelledby="studio-type-heading"
                          className="studio-control-group studio-control-group-type"
                        >
                          <div className="studio-control-group-heading">
                            <Typography
                              as="h3"
                              className="studio-control-group-title"
                              id="studio-type-heading"
                              typeRole="label"
                            >
                              Typography
                            </Typography>
                            <p>Choose the shared family and role hierarchy.</p>
                          </div>
                          <TypographyPicker value={theme.typography} />
                        </section>

                        <section
                          aria-labelledby="studio-color-heading"
                          className="studio-control-group studio-control-group-color"
                        >
                          <div className="studio-control-group-heading">
                            <Typography
                              as="h3"
                              className="studio-control-group-title"
                              id="studio-color-heading"
                              typeRole="label"
                            >
                              Color roles
                            </Typography>
                            <p>
                              Set the base hue, then tune each semantic role.
                              The labels below tell you exactly where each value
                              appears.
                            </p>
                          </div>
                          <PalettePicker value={theme.palette} />
                          <div
                            aria-label="Color role map"
                            className="studio-color-role-map"
                            data-testid="studio-color-role-map"
                          >
                            <div data-role="main">
                              <span aria-hidden="true" />
                              <div>
                                <strong>Main action</strong>
                                <small>Buttons · links · selected</small>
                              </div>
                            </div>
                            <div data-role="accent">
                              <span aria-hidden="true" />
                              <div>
                                <strong>Accent color</strong>
                                <small>Supporting emphasis · expression</small>
                              </div>
                            </div>
                            <div data-role="surface">
                              <span aria-hidden="true" />
                              <div>
                                <strong>Canvas</strong>
                                <small>Neutral page surfaces</small>
                              </div>
                            </div>
                            <div data-role="data">
                              <span aria-hidden="true" />
                              <div>
                                <strong>Chart</strong>
                                <small>
                                  Data series · opted-in solid surfaces
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="studio-control-subgrid">
                            <PaletteRoleSelect
                              hint="Primary actions, links, and selected states."
                              label="Main action color"
                              settingKey="primary"
                              value={theme.primary}
                            />
                            <PaletteRoleSelect
                              hint="Supporting emphasis uses this accent. Focus color is independently resolved for visibility."
                              label="Accent color"
                              settingKey="accent"
                              value={theme.accent}
                            />
                            <CanvasPicker
                              appearance={theme.appearance}
                              value={theme.canvas}
                            />
                            <ChartPalettePicker
                              accent={theme.accent}
                              palette={theme.palette}
                              primary={theme.primary}
                              value={theme.chartPalette}
                            />
                          </div>
                        </section>

                        <section
                          aria-labelledby="studio-rhythm-heading"
                          className="studio-control-group studio-control-group-rhythm"
                        >
                          <div className="studio-control-group-heading">
                            <Typography
                              as="h3"
                              className="studio-control-group-title"
                              id="studio-rhythm-heading"
                              typeRole="label"
                            >
                              Shape
                            </Typography>
                            <p>
                              Adjust shared geometry. Density remains a runtime
                              preference in the recipe rail above.
                            </p>
                          </div>
                          <RadiusSlider value={theme.radius} />
                        </section>

                        <section
                          aria-labelledby="studio-motion-heading"
                          className="studio-control-group studio-control-group-motion"
                        >
                          <div className="studio-control-group-heading">
                            <Typography
                              as="h3"
                              className="studio-control-group-title"
                              id="studio-motion-heading"
                              typeRole="label"
                            >
                              Motion timing
                            </Typography>
                            <p>
                              Tune authored reveal and interaction timing. The
                              runtime motion preference remains above.
                            </p>
                          </div>
                          <MotionSlider value={theme.motionDuration} />
                        </section>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        intent="quiet"
                        leadingIcon="refresh"
                        onClick={resetTheme}
                      >
                        Reset authored changes
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="studio-axis-card" tone="accent">
                    <CardHeader>
                      <div>
                        <CardTitle as="h2">Active profile</CardTitle>
                        <CardDescription>
                          Current values written to the provider root.
                        </CardDescription>
                      </div>
                      <span
                        aria-label={`Base palette: ${theme.palette}`}
                        className="studio-axis-value"
                      >
                        {theme.palette}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <dl className="studio-axis-list">
                        {axisRows.map(([label, value]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd
                              data-numeric={
                                label === "Density" ? undefined : true
                              }
                            >
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                    <CardFooter>
                      <span className="studio-axis-line" />
                      <span>Root variables active</span>
                    </CardFooter>
                  </Card>
                </div>
              </Collapsible>

              <Collapsible
                className="studio-developer-delivery"
                title={
                  <span className="studio-developer-delivery-title">
                    <span>Developer delivery</span>
                    <small>
                      CSS-first selector proof and implementation reference
                    </small>
                  </span>
                }
              >
                <CssFirstThemeProof />
              </Collapsible>

              <TypographySpecimen />

              <section className="studio-section-heading">
                <div>
                  <h2>Component proof</h2>
                  <p>
                    Six surfaces are intentionally rendered together so global
                    changes stay visible.
                  </p>
                </div>
                <span className="studio-section-count">
                  6 surfaces / 10 axes
                </span>
              </section>

              <section className="proof-grid">
                <Card className="proof-panel">
                  <CardHeader>
                    <div>
                      <CardTitle>Button</CardTitle>
                      <CardDescription>
                        Intent and size consume the same control height.
                      </CardDescription>
                    </div>
                    <T7Icon
                      className="proof-icon"
                      name="components"
                      size={20}
                    />
                  </CardHeader>
                  <CardContent className="proof-button-stack">
                    <Button leadingIcon="plus">Create recipe</Button>
                    <Button intent="secondary">Inspect API</Button>
                    <Button intent="quiet" size="sm">
                      Quiet action
                    </Button>
                  </CardContent>
                </Card>

                <Card className="proof-panel">
                  <CardHeader>
                    <div>
                      <CardTitle>Input</CardTitle>
                      <CardDescription>
                        Focus treatment stays semantic across palettes.
                      </CardDescription>
                    </div>
                    <T7Icon className="proof-icon" name="search" size={20} />
                  </CardHeader>
                  <CardContent className="proof-form">
                    <Input
                      label="Search components"
                      defaultValue="DataTable"
                      leadingIcon="search"
                      hint="Semantic field / local value"
                    />
                  </CardContent>
                </Card>

                <Card className="proof-panel" tone="success">
                  <CardHeader>
                    <div>
                      <CardTitle>Card</CardTitle>
                      <CardDescription>
                        Surface elevation follows the global profile.
                      </CardDescription>
                    </div>
                    <T7Icon className="proof-icon" name="check" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="mini-record">
                      <span className="mini-record-label">Tokens indexed</span>
                      <strong data-numeric>476</strong>
                      <span className="mini-record-foot">
                        <T7Icon name="check" size={13} /> Ready for extraction
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="proof-panel proof-table-panel">
                  <CardHeader>
                    <div>
                      <CardTitle>DataTable row</CardTitle>
                      <CardDescription>
                        Declared density changes rows, not readability.
                      </CardDescription>
                    </div>
                    <T7Icon className="proof-icon" name="table" size={20} />
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={columns}
                      rows={inventoryRows}
                      rowKey={(row) => row.id}
                    />
                  </CardContent>
                </Card>

                <Card className="proof-panel">
                  <CardHeader>
                    <div>
                      <CardTitle>Modal</CardTitle>
                      <CardDescription>
                        Overlay surface uses the same radius and elevation
                        family.
                      </CardDescription>
                    </div>
                    <T7Icon className="proof-icon" name="modal" size={20} />
                  </CardHeader>
                  <CardContent className="proof-modal-content">
                    <Button
                      intent="secondary"
                      leadingIcon="modal"
                      onClick={() => setModalOpen(true)}
                    >
                      Open dialog
                    </Button>
                    <span>
                      {isModalOpen ? "Open and keyboard-dismissable" : "Closed"}
                    </span>
                  </CardContent>
                </Card>

                <Card className="proof-panel">
                  <CardHeader>
                    <div>
                      <CardTitle>Sidebar item</CardTitle>
                      <CardDescription>
                        Navigation state uses semantic foregrounds.
                      </CardDescription>
                    </div>
                    <T7Icon className="proof-icon" name="sidebar" size={20} />
                  </CardHeader>
                  <CardContent className="proof-nav-content">
                    <NavItem active icon="theme" label="Theme Studio" />
                    <NavItem icon="components" label="Components" />
                  </CardContent>
                </Card>
              </section>

              <section className="studio-footer-card">
                <div>
                  <T7Icon name="check" size={18} />
                  <strong>System coherence verified</strong>
                  <span>
                    Change green → blue, soft → sharp, default → compact, font,
                    and light → dark from the controls above.
                  </span>
                </div>
                <Button
                  intent={saved ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => setSaved(true)}
                >
                  {saved ? "Proof saved" : "Save local proof"}
                </Button>
              </section>
            </div>

            <Modal
              description="This is a local interaction proof. No server action is performed."
              onClose={() => setModalOpen(false)}
              open={isModalOpen}
              title="Theme engine response"
            >
              <div className="modal-proof-copy">
                <span className="modal-proof-icon">
                  <T7Icon name="check" size={22} />
                </span>
                <div>
                  <strong>Global variables are active.</strong>
                  <p>
                    Radius, density, palette, typography, and appearance are
                    resolved at the provider root. Escape closes this dialog.
                  </p>
                </div>
              </div>
              <div className="modal-proof-actions">
                <Button intent="quiet" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    setSaved(true);
                  }}
                >
                  Confirm proof
                </Button>
              </div>
            </Modal>
          </>
        ) : (
          <div className="studio-content">
            {contentOverride ? (
              contentOverride
            ) : activeRoute === "Component Lab" ? (
              <ComponentLabExplorer />
            ) : activeRoute === "Tokens" ? (
              <TokensExplorer />
            ) : activeRoute === "Components" ? (
              <ComponentsExplorer onNavigatePath={onNavigatePath} />
            ) : activeRoute === "Blocks" ? (
              <BlocksExplorer onNavigatePath={onNavigatePath} />
            ) : activeRoute === "Icons" ? (
              <IconsExplorer />
            ) : (
              <RecipesExplorer onNavigatePath={onNavigatePath} />
            )}
          </div>
        )}
        <TopNavigation
          className="studio-bottom-navigation"
          placement="bottom"
          label="Mobile shortcuts"
          items={[
            {
              key: "studio",
              label: "Studio",
              icon: "theme",
              active: activeRoute === "Theme Studio",
              onSelect: () => onNavigatePath("/theme-studio"),
            },
            {
              key: "tokens",
              label: "Tokens",
              icon: "tokens",
              active: activeRoute === "Tokens",
              onSelect: () => onNavigatePath("/tokens"),
            },
            {
              key: "components",
              label: "Components",
              icon: "components",
              active: activePath.startsWith("/components"),
              onSelect: () => onNavigatePath("/components"),
            },
            {
              key: "menu",
              label: "Menu",
              icon: "menu",
              controls: mobileNavigationId,
              expanded: isMobileNavOpen,
              onSelect: () => setMobileNavOpen(true),
            },
          ]}
        />
      </main>
    </div>
  );
}

function RadiusSlider({ value }: { value: RadiusName }) {
  const { recipe, setTheme, theme } = useTen4SevenTheme();
  const namedProfile = radiusProfiles[value];
  const currentValue =
    theme.radiusValue ?? Number.parseFloat(namedProfile.base);
  const activeProfile =
    theme.radiusValue === undefined
      ? namedProfile
      : buildRadiusProfile(currentValue);
  const activePreset = theme.radiusValue === undefined ? theme.radius : null;
  const authoredRadius = recipe
    ? THEME_RECIPES[recipe].profile.radius
    : { preset: "soft" as RadiusName };

  function choosePreset(next: RadiusName) {
    // A named preset is an authored decision. Clearing radiusValue here is
    // important: the provider must resolve the preset scale instead of
    // retaining an earlier exact-value override.
    setTheme({ radius: next, radiusValue: undefined });
  }

  function resetShape() {
    // Keep every other authored axis and all runtime preferences intact. The
    // recipe profile is the source of truth for a named shape; custom Studio
    // configuration falls back to the playground's authored default.
    setTheme({
      radius: authoredRadius.preset,
      radiusValue: authoredRadius.basePx,
    });
  }

  function radiusPresetForValue(next: number): RadiusName {
    const sharpBase = Number.parseFloat(radiusProfiles.sharp.base);
    const softBase = Number.parseFloat(radiusProfiles.soft.base);
    const roundedBase = Number.parseFloat(radiusProfiles.rounded.base);
    const softRoundedBoundary = Math.round((softBase + roundedBase) / 2);
    return next <= sharpBase
      ? "sharp"
      : next <= softRoundedBoundary
        ? "soft"
        : "rounded";
  }

  return (
    <div
      className="studio-shape-editor"
      data-radius-mode={activePreset ?? "custom"}
      data-testid="studio-shape-editor"
    >
      <fieldset
        aria-describedby="studio-shape-preset-description"
        className="studio-choice-picker studio-radius-presets"
      >
        <legend className="t7-field-label">Preset</legend>
        <p className="studio-choice-help" id="studio-shape-preset-description">
          Start from a named radius profile, or use Base radius for an exact
          custom geometry.
        </p>
        <div className="studio-radius-preset-options">
          {radiusNames.map((option) => {
            const profile = radiusProfiles[option];
            return (
              <Button
                aria-describedby={`studio-radius-${option}-description`}
                aria-label={radiusPresetLabels[option]}
                aria-pressed={activePreset === option}
                className="studio-choice-option studio-radius-preset"
                data-radius-preset={option}
                intent={activePreset === option ? "secondary" : "quiet"}
                key={option}
                onClick={() => choosePreset(option)}
                size="sm"
                trailingIcon={activePreset === option ? "check" : undefined}
              >
                <span
                  aria-hidden="true"
                  className="studio-radius-preset-shape"
                  style={
                    { "--studio-radius-preview": profile.base } as CSSProperties
                  }
                />
                <span className="studio-choice-option-copy">
                  <strong>{radiusPresetLabels[option]}</strong>
                  <small id={`studio-radius-${option}-description`}>
                    {profile.base} base · {radiusPresetDescriptors[option]}
                  </small>
                </span>
              </Button>
            );
          })}
        </div>
      </fieldset>

      <div className="studio-radius-editor-row">
        <div className="studio-axis-slider studio-radius-control">
          <Slider
            aria-describedby="studio-base-radius-description"
            aria-label="Base radius"
            aria-valuetext={[
              currentValue,
              "px base radius; exact 1 px step;",
              activeProfile.control,
              "control ·",
              activeProfile.panel,
              "panel",
            ].join(" ")}
            label="Base radius"
            max={radiusValueRange.max}
            min={radiusValueRange.min}
            onChange={(event) => {
              const next = Math.min(
                radiusValueRange.max,
                Math.max(
                  radiusValueRange.min,
                  Number(event.currentTarget.value),
                ),
              );
              setTheme({
                radius: radiusPresetForValue(next),
                radiusValue: next,
              });
            }}
            step={1}
            value={currentValue}
            valueLabel={String(currentValue) + " px"}
          />
          <p
            className="studio-radius-description"
            id="studio-base-radius-description"
          >
            Exact 0–24 px control. Moving this slider creates a Custom shape
            override while preserving the selected recipe.
          </p>
          <div aria-hidden="true" className="studio-axis-slider-scale">
            {["0 px", "12 px", "24 px"].map((stop, index) => (
              <span
                data-active={
                  (index === 0 && currentValue === 0) ||
                  (index === 1 && currentValue === 12) ||
                  (index === 2 && currentValue === 24)
                }
                key={stop}
              >
                {stop}
              </span>
            ))}
          </div>
        </div>

        <div className="studio-radius-status" aria-live="polite">
          <strong>
            {activePreset
              ? `${radiusPresetLabels[activePreset]} shape`
              : "Custom shape"}
          </strong>
          <span>
            {theme.radiusValue === undefined
              ? "Recipe-authored geometry"
              : "Exact override · recipe preserved"}
          </span>
        </div>
      </div>

      <dl
        aria-label="Derived geometry preview"
        className="studio-radius-derived"
        data-testid="studio-radius-derived"
      >
        {(["control", "panel", "card", "shell"] as const).map((role) => (
          <div data-radius-role={role} key={role}>
            <dt>{role}</dt>
            <dd>{activeProfile[role]}</dd>
          </div>
        ))}
      </dl>
      <p className="studio-radius-supporting-roles">
        Indicator {activeProfile.indicator} · Base {activeProfile.base} · Full
        9999px
      </p>
      <Button
        className="studio-radius-reset"
        intent="quiet"
        leadingIcon="refresh"
        onClick={resetShape}
        size="sm"
      >
        Reset recipe shape
      </Button>
    </div>
  );
}

function StudioLivePreview({
  lastChange,
}: {
  lastChange: StudioThemeChange | null;
}) {
  const { theme } = useTen4SevenTheme();

  return (
    <section
      aria-labelledby="studio-live-preview-title"
      className="studio-live-preview"
      data-testid="studio-live-preview"
    >
      <div className="studio-live-preview-heading">
        <div>
          <Typography
            as="h2"
            className="studio-live-preview-title"
            id="studio-live-preview-title"
            typeRole="heading-sm"
          >
            Live visual preview
          </Typography>
          <Typography as="p" typeRole="body-sm">
            Recipe, runtime preferences, and authored tokens resolve into one
            small product surface.
          </Typography>
        </div>
        <div
          aria-atomic="true"
          aria-label={
            lastChange
              ? `Updated live. ${lastChange.label}: ${lastChange.value}`
              : "Live. Ready to preview"
          }
          aria-live="polite"
          className="studio-controls-live-state"
          data-testid="studio-controls-live-state"
        >
          <span className="studio-controls-live-badge">
            <i aria-hidden="true" />
            {lastChange ? "Updated live" : "Live"}
          </span>
          <span className="studio-controls-live-copy">
            {lastChange
              ? `${lastChange.label} · ${lastChange.value}`
              : "Ready to preview"}
          </span>
        </div>
      </div>
      <Card className="studio-live-preview-product">
        <CardContent className="studio-live-preview-product-content">
          <div className="studio-live-preview-product-header">
            <div>
              <Typography as="span" typeRole="overline">
                Customer workspace
              </Typography>
              <Typography as="h3" typeRole="heading-md">
                Release readiness
              </Typography>
              <Typography as="p" typeRole="body-sm">
                Keep customer work moving with focused actions, status, form,
                data, and scoped context.
              </Typography>
            </div>
            <Badge tone="success">Healthy</Badge>
          </div>

          <div className="studio-live-preview-action-row">
            <Button leadingIcon="check" size="sm">
              Apply
            </Button>
            <Button intent="secondary" size="sm">
              Review
            </Button>
          </div>

          <div className="studio-live-preview-field">
            <Input
              aria-label="Live theme preview field"
              className="studio-live-preview-focus-input"
              defaultValue="Ready"
              label="Release note"
            />
          </div>

          <div className="studio-live-preview-product-grid">
            <div
              className="studio-live-preview-surface"
              data-live-value="surface"
            >
              <div>
                <span className="studio-live-preview-label">
                  Canvas surface
                </span>
                <strong>{theme.canvas}</strong>
              </div>
              <Badge tone="primary">{formatRadiusSetting(theme)} radius</Badge>
            </div>
            <div className="studio-live-preview-chart-region">
              <span className="studio-live-preview-label">Chart colorway</span>
              <div
                aria-label={`Chart preview: ${theme.chartPalette} colorway`}
                className="studio-live-preview-chart"
                data-live-value="chart"
                role="img"
              >
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <DataTable
            caption="Previewed component health"
            className="studio-live-preview-table"
            columns={columns}
            density={theme.density}
            responsive="scroll"
            rowKey={(row) => row.id}
            rows={inventoryRows.slice(0, 2)}
          />
        </CardContent>
      </Card>

      <details className="studio-live-preview-diagnostics">
        <summary>Semantic diagnostics</summary>
        <div className="studio-live-preview-diagnostic-grid">
          <span className="studio-live-preview-meta" data-live-value="primary">
            {theme.primary} · primary role
          </span>
          <span className="studio-live-preview-meta" data-live-value="accent">
            {theme.accent} · supporting emphasis
          </span>
          <span className="studio-live-preview-meta" data-live-value="density">
            {theme.density} density · shared surface scale
          </span>
          <span
            className="studio-live-preview-meta"
            data-live-value="chart-palette"
          >
            {theme.chartPalette} · {theme.palette} base hue
          </span>
        </div>
      </details>

      <div className="studio-live-preview-scopes">
        <ThemeScope
          aria-label="Inverse theme scope proof"
          className="studio-live-preview-scope studio-live-preview-inverse"
          tone="inverse"
        >
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">
              Inverse ThemeScope
            </span>
            <span className="studio-live-preview-role-note">
              Nested semantic contrast · same component contract
            </span>
          </div>
          <Button intent="secondary" size="sm">
            Scoped action
          </Button>
          <span className="studio-live-preview-meta">
            ThemeScope · inverse tone
          </span>
          <ThemeScope
            aria-label="Nested ThemeScope composition proof"
            className="studio-live-preview-nested-scope"
            tone="inverse"
          >
            Nested inverse returns to the parent contrast contract.
          </ThemeScope>
        </ThemeScope>
        <ThemeScope
          aria-label="Editorial recipe scope proof"
          className="studio-live-preview-scope"
          theme="editorial"
        >
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">Recipe scope</span>
            <span className="studio-live-preview-role-note">
              Authored editorial geometry and type, bounded to this surface
            </span>
          </div>
          <Button intent="secondary" size="sm">
            Scoped editorial action
          </Button>
          <Select defaultValue="authored" label="Editorial scoped options">
            <option value="authored">Authored editorial context</option>
            <option value="inherited">Provider context</option>
          </Select>
          <span className="studio-live-preview-meta">
            ThemeScope · editorial recipe defaults
          </span>
        </ThemeScope>
      </div>
    </section>
  );
}

/**
 * Deliberately receives no provider-generated inline variables. It proves the
 * shipped CSS selector contract can theme a bounded non-React consumer.
 */
function CssFirstThemeProof() {
  return (
    <section
      aria-labelledby="css-first-theme-proof-title"
      className="studio-css-first-proof"
    >
      <div>
        <Typography as="p" typeRole="overline">
          CSS-first delivery
        </Typography>
        <Typography
          as="h3"
          id="css-first-theme-proof-title"
          typeRole="heading-md"
        >
          Static recipe selectors work without provider calculation
        </Typography>
      </div>
      <div
        className="studio-css-first-proof-surface"
        data-t7-contrast="more"
        data-t7-density="compact"
        data-t7-mode="dark"
        data-t7-motion-preference="reduced"
        data-t7-theme="editorial"
        data-testid="css-first-theme-proof"
      >
        <span>Editorial · dark · compact</span>
        <Badge tone="primary">static tokens</Badge>
        <Button size="sm">CSS-first action</Button>
      </div>
    </section>
  );
}

function formatMotionDuration(value: number) {
  return `${Number(value.toFixed(2))}s`;
}

function MotionSlider({ value }: { value: number }) {
  const { setTheme } = useTen4SevenTheme();
  const activeValue = Math.min(
    motionDurationRange.max,
    Math.max(motionDurationRange.min, value),
  );
  const valueLabel = formatMotionDuration(activeValue);

  return (
    <div className="studio-axis-slider studio-motion-control">
      <Slider
        aria-label="Motion duration"
        aria-valuetext={`${valueLabel}; shared viewport reveal and interaction timing; 0.25 second steps`}
        label="Motion duration"
        max={motionDurationRange.max}
        min={motionDurationRange.min}
        onChange={(event) => {
          const next = Math.min(
            motionDurationRange.max,
            Math.max(
              motionDurationRange.min,
              Number(event.currentTarget.value),
            ),
          );
          setTheme({ motionDuration: next });
        }}
        step={motionDurationRange.step}
        value={activeValue}
        valueLabel={valueLabel}
      />
      <span className="studio-axis-slider-detail">
        0.25s anchor steps · bounded interactions · scaled reveals
      </span>
      <div
        aria-hidden="true"
        className="studio-axis-slider-scale studio-motion-scale"
      >
        {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5].map((stop) => (
          <span data-active={activeValue === stop} key={stop}>
            {formatMotionDuration(stop)}
          </span>
        ))}
      </div>
    </div>
  );
}

function PaletteRoleSelect({
  label,
  hint,
  settingKey,
  value,
}: {
  label: string;
  hint: string;
  settingKey: "primary" | "accent";
  value: PaletteName;
}) {
  const { setTheme } = useTen4SevenTheme();
  const swatch =
    settingKey === "primary"
      ? paletteProfiles[value].primary
      : paletteProfiles[value].accent;

  function updateProfile(next: PaletteName) {
    if (settingKey === "primary") setTheme({ primary: next });
    else setTheme({ accent: next });
  }

  return (
    <div
      className="studio-setting-select"
      style={
        {
          "--studio-setting-swatch": `hsl(${swatch})`,
        } as CSSProperties
      }
    >
      <Select
        hint={hint}
        label={label}
        value={value}
        onChange={(event) => updateProfile(event.target.value as PaletteName)}
      >
        {paletteNames.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}

const paletteNames = Object.keys(paletteProfiles) as PaletteName[];
const typographyNames = Object.keys(typographyProfiles) as TypographyName[];
const canvasNames: CanvasName[] = ["balanced", "paper", "monochrome"];
const canvasLabels: Record<CanvasName, string> = CANVAS_LABELS;
const canvasDetails: Record<CanvasName, string> = {
  balanced: "White canvas, soft neutral separation",
  paper: "White canvas, neutral contrast",
  monochrome: "Hue-free grayscale",
};
const chartPaletteNames: ChartPaletteName[] = [
  "spectrum",
  "four",
  "monochrome",
];
const chartPaletteLabels: Record<ChartPaletteName, string> = {
  spectrum: "Spectrum",
  four: "Four colors",
  monochrome: "Monochrome",
};
const chartPaletteDetails: Record<ChartPaletteName, string> = {
  spectrum: "Five distinct data series",
  four: "Tighter operational set",
  monochrome: "One-hue comparison",
};
const typographyPresetLabels: Record<TypographyName, string> = {
  modern: "Modern",
  humanist: "Humanist",
  editorial: "Editorial",
  technical: "Technical",
  mono: "Mono",
};
const typographyPresetDetails: Record<TypographyName, string> = {
  modern: "Inter · balanced UI + display",
  humanist: "DM Sans · warmer rhythm",
  editorial: "Serif display · calm reading tone",
  technical: "Mono UI · precise operator tone",
  mono: "IBM Plex Mono · fully technical",
};
const themeRecipeIntents: Record<ThemeRecipeName, string> = {
  enterprise: "Quiet operational surfaces",
  product: "Balanced application rhythm",
  editorial: "Reading-led hierarchy",
  commerce: "Discovery and buying clarity",
};

const radiusNames = [
  "sharp",
  "soft",
  "rounded",
] as const satisfies readonly RadiusName[];
const radiusPresetLabels: Record<RadiusName, string> = {
  sharp: "Sharp",
  soft: "Soft",
  rounded: "Rounded",
};
const radiusPresetDescriptors: Record<RadiusName, string> = {
  sharp: "restrained corners",
  soft: "balanced corners",
  rounded: "generous corners",
};

function ThemeRecipePicker({
  onPreferencesChange,
  onSelect,
  preferences,
  value,
}: {
  onPreferencesChange: (preferences: RuntimePreferences) => void;
  onSelect: (recipe: ThemeRecipeName | undefined) => void;
  preferences: RuntimePreferences;
  value: ThemeRecipeName | undefined;
}) {
  const { resetTheme } = useTen4SevenTheme();

  function selectRecipe(recipe: ThemeRecipeName | undefined) {
    resetTheme();
    onSelect(recipe);
  }

  return (
    <section
      aria-labelledby="theme-recipe-heading"
      className="studio-recipe-workbench"
      data-testid="theme-recipe-workbench"
    >
      <div className="studio-recipe-workbench-copy">
        <Typography as="p" typeRole="overline">
          Theme Workbench
        </Typography>
        <Typography as="h2" id="theme-recipe-heading" typeRole="heading-md">
          Choose the authored language first
        </Typography>
        <Typography as="p" typeRole="body-sm">
          Recipes coordinate color, canvas, typography, geometry, and rhythm.
          Appearance and density remain runtime preferences; detailed axes are
          available below for advanced authoring.
        </Typography>
      </div>
      <div aria-label="Theme recipes" className="studio-recipe-options">
        <div
          aria-label="Curated theme recipes"
          className="studio-curated-recipe-options"
        >
          {Object.values(THEME_RECIPES).map((recipe) => (
            <Button
              aria-describedby={`theme-recipe-${recipe.id}-intent`}
              aria-label={recipe.label}
              aria-pressed={value === recipe.id}
              className="studio-recipe-option"
              data-recipe={recipe.id}
              intent={value === recipe.id ? "secondary" : "quiet"}
              key={recipe.id}
              onClick={() => selectRecipe(recipe.id)}
              size="sm"
              title={recipe.description}
              trailingIcon={value === recipe.id ? "check" : undefined}
            >
              <span className="studio-recipe-option-copy">
                <strong>{recipe.label}</strong>
                <small id={`theme-recipe-${recipe.id}-intent`}>
                  {themeRecipeIntents[recipe.id]}
                </small>
              </span>
            </Button>
          ))}
        </div>
        <div className="studio-custom-recipe">
          <Typography as="span" typeRole="caption">
            Advanced / custom
          </Typography>
          <Button
            aria-pressed={value === undefined}
            intent={value === undefined ? "secondary" : "quiet"}
            onClick={() => selectRecipe(undefined)}
            size="sm"
          >
            Custom
          </Button>
        </div>
      </div>
      <div
        aria-label="Runtime preferences"
        className="studio-runtime-preferences"
      >
        <RuntimePreferenceOptions
          label="Appearance"
          onChange={(appearance) =>
            onPreferencesChange({
              ...preferences,
              appearance: appearance as RuntimePreferences["appearance"],
            })
          }
          options={[
            ["system", "System"],
            ["light", "Light"],
            ["dark", "Dark"],
          ]}
          value={preferences.appearance ?? "system"}
        />
        <RuntimePreferenceOptions
          label="Density"
          onChange={(density) =>
            onPreferencesChange({
              ...preferences,
              density: density as RuntimePreferences["density"],
            })
          }
          options={[
            ["dense", "Dense"],
            ["compact", "Compact"],
            ["default", "Regular"],
            ["comfortable", "Comfortable"],
          ]}
          value={preferences.density ?? "default"}
        />
        <RuntimePreferenceOptions
          label="Contrast"
          onChange={(contrast) =>
            onPreferencesChange({
              ...preferences,
              contrast: contrast as RuntimePreferences["contrast"],
            })
          }
          options={[
            ["standard", "Standard"],
            ["more", "More"],
          ]}
          value={preferences.contrast ?? "standard"}
        />
        <RuntimePreferenceOptions
          label="Motion"
          onChange={(motion) =>
            onPreferencesChange({
              ...preferences,
              motion: motion as RuntimePreferences["motion"],
            })
          }
          options={[
            ["full", "Full"],
            ["reduced", "Reduced"],
          ]}
          value={preferences.motion ?? "full"}
        />
      </div>
      <Typography className="studio-recipe-active" typeRole="caption">
        {value
          ? `${THEME_RECIPES[value].label} recipe · ${THEME_RECIPES[value].expression} expression`
          : "Custom advanced configuration · no named recipe selected"}
      </Typography>
    </section>
  );
}

function RuntimePreferenceOptions({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  value: string;
}) {
  return (
    <fieldset className="studio-runtime-preference">
      <legend>{label}</legend>
      <div>
        {options.map(([optionValue, optionLabel]) => (
          <Button
            aria-pressed={value === optionValue}
            intent={value === optionValue ? "secondary" : "quiet"}
            key={optionValue}
            onClick={() => onChange(optionValue)}
            size="sm"
          >
            {optionLabel}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

function ThemeSettingsSheet({
  onClose,
  onNavigatePath,
  onPreferencesChange,
  onRecipeChange,
  open,
  preferences,
  recipe,
}: {
  onClose: () => void;
  onNavigatePath: (path: string) => void;
  onPreferencesChange: (preferences: RuntimePreferences) => void;
  onRecipeChange: (recipe: ThemeRecipeName | undefined) => void;
  open: boolean;
  preferences: RuntimePreferences;
  recipe: ThemeRecipeName | undefined;
}) {
  const { resetTheme, setTheme, theme } = useTen4SevenTheme();
  const activeRadius =
    theme.radiusValue === undefined ? theme.radius : undefined;

  function updatePreference(key: keyof RuntimePreferences, value: string) {
    onPreferencesChange({ ...preferences, [key]: value });
  }

  function selectRecipe(nextRecipe: ThemeRecipeName | undefined) {
    resetTheme();
    onRecipeChange(nextRecipe);
  }

  function resetSettings() {
    resetTheme();
    onRecipeChange(undefined);
    onPreferencesChange({});
  }

  return (
    <Drawer
      className="theme-settings-drawer"
      closeLabel="Close theme settings"
      description="Tune the shared environment without leaving the current surface."
      onClose={onClose}
      open={open}
      side="right"
      title="Theme settings"
    >
      <div
        aria-label="Global theme settings"
        className="theme-settings-panel"
        data-testid="theme-settings-panel"
      >
        <div className="theme-settings-summary">
          <Typography as="p" typeRole="body-sm">
            Everyday choices apply live to this route and every surface in the
            playground. Advanced token authoring stays in Theme Studio.
          </Typography>
        </div>

        <section
          aria-labelledby="theme-settings-recipe-heading"
          className="theme-settings-section"
        >
          <div className="theme-settings-section-heading">
            <Typography
              as="h3"
              id="theme-settings-recipe-heading"
              typeRole="label"
            >
              Recipe
            </Typography>
            <span>{recipe ? THEME_RECIPES[recipe].label : "Custom"}</span>
          </div>
          <div
            aria-label="Theme recipes"
            className="theme-settings-recipe-options"
          >
            {Object.values(THEME_RECIPES).map((option) => (
              <Button
                aria-pressed={recipe === option.id}
                className="theme-settings-choice"
                intent={recipe === option.id ? "secondary" : "quiet"}
                key={option.id}
                onClick={() => selectRecipe(option.id)}
                size="sm"
              >
                {option.label}
              </Button>
            ))}
            <Button
              aria-pressed={recipe === undefined}
              className="theme-settings-choice"
              intent={recipe === undefined ? "secondary" : "quiet"}
              onClick={() => selectRecipe(undefined)}
              size="sm"
            >
              Custom
            </Button>
          </div>
        </section>

        <section
          aria-label="Runtime preferences"
          className="theme-settings-section theme-settings-runtime"
        >
          <RuntimePreferenceOptions
            label="Appearance"
            onChange={(value) => updatePreference("appearance", value)}
            options={[
              ["system", "System"],
              ["light", "Light"],
              ["dark", "Dark"],
            ]}
            value={preferences.appearance ?? "system"}
          />
          <RuntimePreferenceOptions
            label="Density"
            onChange={(value) => updatePreference("density", value)}
            options={[
              ["dense", "Dense"],
              ["compact", "Compact"],
              ["default", "Regular"],
              ["comfortable", "Comfortable"],
            ]}
            value={preferences.density ?? "default"}
          />
          <RuntimePreferenceOptions
            label="Contrast"
            onChange={(value) => updatePreference("contrast", value)}
            options={[
              ["standard", "Standard"],
              ["more", "More"],
            ]}
            value={preferences.contrast ?? "standard"}
          />
          <RuntimePreferenceOptions
            label="Motion"
            onChange={(value) => updatePreference("motion", value)}
            options={[
              ["full", "Full"],
              ["reduced", "Reduced"],
            ]}
            value={preferences.motion ?? "full"}
          />
        </section>

        <section
          aria-labelledby="theme-settings-basics-heading"
          className="theme-settings-section theme-settings-authored"
        >
          <div className="theme-settings-section-heading">
            <Typography
              as="h3"
              id="theme-settings-basics-heading"
              typeRole="label"
            >
              Authored basics
            </Typography>
            <span>Keep the detailed axes in Studio</span>
          </div>
          <fieldset className="theme-settings-shape">
            <legend>Shape</legend>
            <div className="theme-settings-shape-options">
              {radiusNames.map((option) => (
                <Button
                  aria-label={radiusPresetLabels[option]}
                  aria-pressed={activeRadius === option}
                  intent={activeRadius === option ? "secondary" : "quiet"}
                  key={option}
                  onClick={() =>
                    setTheme({ radius: option, radiusValue: undefined })
                  }
                  size="sm"
                >
                  {radiusPresetLabels[option]}
                </Button>
              ))}
            </div>
          </fieldset>
          <Select
            label="Typography"
            value={theme.typography}
            onChange={(event) =>
              setTheme({ typography: event.target.value as TypographyName })
            }
          >
            {typographyNames.map((option) => (
              <option key={option} value={option}>
                {typographyPresetLabels[option]}
              </option>
            ))}
          </Select>
          <Select
            label="Brand color"
            value={theme.palette}
            onChange={(event) => {
              const nextPalette = event.target.value as PaletteName;
              setTheme({
                accent: nextPalette,
                palette: nextPalette,
                primary: nextPalette,
              });
            }}
          >
            {paletteNames.map((option) => (
              <option key={option} value={option}>
                {option[0].toUpperCase() + option.slice(1)}
              </option>
            ))}
          </Select>
        </section>

        <div className="theme-settings-actions">
          <Button
            leadingIcon="theme"
            onClick={() => {
              onClose();
              onNavigatePath("/theme-studio");
            }}
          >
            Open Theme Studio
          </Button>
          <Button intent="quiet" leadingIcon="refresh" onClick={resetSettings}>
            Reset settings
          </Button>
        </div>
        <Typography className="theme-settings-footnote" typeRole="caption">
          Advanced scopes, semantic overrides, diagnostics, and export remain in
          the Theme Studio workbench.
        </Typography>
      </div>
    </Drawer>
  );
}

function TypographyPicker({ value }: { value: TypographyName }) {
  const { setTheme } = useTen4SevenTheme();

  return (
    <fieldset className="studio-choice-picker studio-typography-picker">
      <legend className="t7-field-label">Typography style</legend>
      <p className="studio-choice-help">
        Each preset changes the full role hierarchy, not only the display face.
      </p>
      <div className="studio-choice-options studio-typography-options">
        {typographyNames.map((option) => (
          <button
            aria-pressed={value === option}
            className="studio-choice-option studio-typography-option"
            key={option}
            onClick={() => setTheme({ typography: option })}
            type="button"
          >
            <span
              aria-hidden="true"
              className="studio-typography-option-sample"
              style={
                {
                  "--studio-preset-font": typographyProfiles[option].display,
                } as CSSProperties
              }
            >
              Aa
            </span>
            <span className="studio-choice-option-copy">
              <strong>{typographyPresetLabels[option]}</strong>
              <small>{typographyPresetDetails[option]}</small>
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function CanvasPicker({
  appearance,
  value,
}: {
  appearance: Exclude<Appearance, "system">;
  value: CanvasName;
}) {
  const { setTheme } = useTen4SevenTheme();

  return (
    <fieldset className="studio-choice-picker studio-canvas-picker">
      <legend className="t7-field-label">Canvas</legend>
      <p className="studio-choice-help">
        Controls page and card neutrals independently from brand color.
      </p>
      <div className="studio-choice-options">
        {canvasNames.map((option) => {
          const profile = canvasProfiles[option][appearance];
          return (
            <button
              aria-pressed={value === option}
              className="studio-choice-option studio-canvas-option"
              key={option}
              onClick={() => setTheme({ canvas: option })}
              type="button"
            >
              <span
                aria-hidden="true"
                className="studio-choice-swatch studio-canvas-swatch"
                style={
                  {
                    "--studio-choice-background": `hsl(${profile.background})`,
                    "--studio-choice-border": `hsl(${profile.borderStrong})`,
                    "--studio-choice-surface": `hsl(${profile.surfaceMuted})`,
                  } as CSSProperties
                }
              >
                <i />
              </span>
              <span className="studio-choice-option-copy">
                <strong>{canvasLabels[option]}</strong>
                <small>{canvasDetails[option]}</small>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ChartPalettePicker({
  accent,
  palette,
  primary,
  value,
}: {
  accent: PaletteName;
  palette: PaletteName;
  primary: PaletteName;
  value: ChartPaletteName;
}) {
  const { setTheme } = useTen4SevenTheme();
  const baseProfile = paletteProfiles[palette];
  const primaryProfile = paletteProfiles[primary];
  const accentProfile = paletteProfiles[accent];

  const optionColors: Record<ChartPaletteName, string[]> = {
    spectrum: baseProfile.chart.map((color) => `hsl(${color})`),
    four: [
      `hsl(${primaryProfile.primary})`,
      `hsl(${accentProfile.accent})`,
      `hsl(${baseProfile.chart[2]})`,
      `hsl(${baseProfile.chart[3]})`,
    ],
    monochrome: [
      `hsl(${primaryProfile.primary})`,
      `hsl(${primaryProfile.primaryHover})`,
      `hsl(${primaryProfile.primaryActive})`,
    ],
  };

  return (
    <fieldset className="studio-choice-picker studio-chart-picker">
      <legend className="t7-field-label">Chart colorway</legend>
      <p className="studio-choice-help">
        Affects data series and explicitly colorway-linked Card, KPI, or bounded
        Surface regions; semantic UI roles remain independent.
      </p>
      <div className="studio-choice-options">
        {chartPaletteNames.map((option) => (
          <button
            aria-pressed={value === option}
            className="studio-choice-option studio-chart-option"
            key={option}
            onClick={() => setTheme({ chartPalette: option })}
            type="button"
          >
            <span
              aria-hidden="true"
              className="studio-choice-swatch studio-chart-swatch"
            >
              {optionColors[option].map((color, index) => (
                <i
                  key={`${option}-${index}`}
                  style={
                    {
                      "--studio-chart-choice-color": color,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <span className="studio-choice-option-copy">
              <strong>{chartPaletteLabels[option]}</strong>
              <small>{chartPaletteDetails[option]}</small>
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PalettePicker({ value }: { value: PaletteName }) {
  const { setTheme } = useTen4SevenTheme();
  return (
    <fieldset className="studio-palette-picker">
      <legend className="t7-field-label">Base palette</legend>
      <p className="studio-palette-help">
        Sets the default hue for UI and chart colors. Choosing a swatch also
        resets Main action and Accent color to that family.
      </p>
      <div className="studio-palette-options">
        {paletteNames.map((palette) => (
          <button
            aria-label={`Use ${palette} palette`}
            aria-pressed={value === palette}
            className="studio-palette-option"
            key={palette}
            onClick={() =>
              setTheme({
                palette,
                primary: palette,
                accent: palette,
              })
            }
            type="button"
          >
            <span
              aria-hidden="true"
              style={
                {
                  "--palette-swatch": `hsl(${paletteProfiles[palette].primary})`,
                } as CSSProperties
              }
            />
            <Typography as="span" typeRole="caption">
              {palette}
            </Typography>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function NotFoundSurface({
  onNavigate,
  pathname,
}: {
  onNavigate: (route: PlaygroundRoute) => void;
  pathname: string;
}) {
  return (
    <main className="not-found-shell">
      <span className="not-found-icon">
        <T7Icon name="danger" size={24} />
      </span>
      <Typography as="p" typeRole="overline">
        404 · Route not found
      </Typography>
      <Typography as="h1" typeRole="display-lg">
        This playground route does not exist.
      </Typography>
      <Typography as="p" typeRole="body">
        <code>{pathname}</code> is not a registered ten4seven UI route.
      </Typography>
      <Button leadingIcon="theme" onClick={() => onNavigate("Theme Studio")}>
        Return to Theme Studio
      </Button>
    </main>
  );
}

function isConsumerReferenceRoute(route: PlaygroundRoute | undefined) {
  return (
    route === "Operations Tracker" ||
    route === "Operational Patterns" ||
    route === "Publishing Store"
  );
}

function isReferenceQaMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("mode") === "qa";
}

export default function App() {
  const [settings] = useState<StudioSettings>({
    appearance: "system",
    palette: "emerald",
    primary: "emerald",
    accent: "emerald",
    canvas: "balanced",
    chartPalette: "spectrum",
    radius: "soft",
    density: "default",
    motionDuration: 1.5,
    typography: "modern",
  });
  const [themeRecipe, setThemeRecipe] = useState<ThemeRecipeName>();
  const [themePreferences, setThemePreferences] = useState<RuntimePreferences>(
    readRuntimePreferences,
  );
  const [themeSettingsOpen, setThemeSettingsOpen] = useState(false);
  const [routeMatch, setRouteMatch] = useState<RouteMatch>(() =>
    typeof window === "undefined"
      ? { kind: "known", route: "Theme Studio" }
      : routeFromPath(window.location.pathname),
  );
  const [operationsViewState, setOperationsViewState] =
    useState<ReferenceViewState>("ready");

  useLayoutEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
        return;
      }
    }
    window.scrollTo({ behavior: "instant", top: 0 });
  }, [routeMatch]);

  useEffect(() => {
    const syncRoute = () => {
      if (window.location.pathname === "/") {
        window.history.replaceState(
          {},
          "",
          playgroundRoutePaths["Theme Studio"],
        );
        setRouteMatch({ kind: "known", route: "Theme Studio" });
        return;
      }
      setRouteMatch(routeFromPath(window.location.pathname));
    };
    syncRoute();
    const handlePopState = () => syncRoute();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const routeTitle =
      routeMatch.kind === "known"
        ? playgroundRouteTitles[routeMatch.route]
        : routeMatch.kind === "brand-proof"
          ? brandProofRouteTitles[routeMatch.profileId]
          : routeMatch.kind === "component-family"
            ? `ten4seven UI — ${categoryLabels[routeMatch.category] ?? routeMatch.category}`
            : routeMatch.kind === "component-detail"
              ? `ten4seven UI — ${componentCatalog[routeMatch.name].displayName ?? routeMatch.name}`
              : routeMatch.kind === "recipe-detail"
                ? `ten4seven UI — ${recipeCatalog[routeMatch.name].displayName ?? routeMatch.name}`
                : routeMatch.kind === "block-detail"
                  ? `ten4seven UI — ${blockCatalog[routeMatch.name].displayName ?? routeMatch.name}`
                  : "ten4seven UI — Route not found";
    document.title = routeTitle;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      routeMatch.kind === "known"
        ? playgroundRouteDescriptions[routeMatch.route]
        : routeMatch.kind === "brand-proof"
          ? "Brand expression proof for the canonical Authentication recipe in ten4seven UI."
          : routeMatch.kind === "component-family"
            ? `Canonical ${categoryLabels[routeMatch.category] ?? routeMatch.category} components in the ten4seven UI catalog.`
            : routeMatch.kind === "component-detail"
              ? componentCatalog[routeMatch.name].purpose
              : routeMatch.kind === "recipe-detail"
                ? recipeCatalog[routeMatch.name].purpose
                : routeMatch.kind === "block-detail"
                  ? blockCatalog[routeMatch.name].purpose
                  : "The requested ten4seven UI playground route does not exist.",
    );
  }, [routeMatch]);

  function navigateTo(route: PlaygroundRoute) {
    navigateToPath(playgroundRoutePaths[route]);
  }

  function updateThemePreferences(preferences: RuntimePreferences) {
    setThemePreferences(preferences);
    try {
      window.localStorage.setItem(
        runtimePreferencesStorageKey,
        JSON.stringify(preferences),
      );
    } catch {
      // Runtime preferences still apply for the active session if storage is unavailable.
    }
  }

  function openThemeSettings() {
    setThemeSettingsOpen(true);
  }

  function closeThemeSettings() {
    setThemeSettingsOpen(false);
  }

  function navigateToPath(nextPath: string) {
    const nextLocation = new URL(nextPath, window.location.origin);
    const nextRoute = routeFromPath(nextLocation.pathname);
    const currentRoute =
      routeMatch.kind === "known" ? routeMatch.route : undefined;

    // Reference routes render consumer-clean by default. Keep the explicit QA
    // context while moving between those routes so fixture controls do not
    // unexpectedly disappear during an internal inspection.
    if (
      isReferenceQaMode() &&
      isConsumerReferenceRoute(currentRoute) &&
      nextRoute.kind === "known" &&
      isConsumerReferenceRoute(nextRoute.route)
    ) {
      nextLocation.searchParams.set("mode", "qa");
    }

    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextLocationString = `${nextLocation.pathname}${nextLocation.search}${nextLocation.hash}`;
    if (currentLocation !== nextLocationString) {
      window.history.pushState({}, "", nextLocationString);
    }
    setRouteMatch(routeFromPath(nextLocation.pathname));
  }

  const activeKnownRoute =
    routeMatch.kind === "known" ? routeMatch.route : undefined;
  const showReferenceHarness =
    activeKnownRoute !== undefined &&
    (isConsumerReferenceRoute(activeKnownRoute)
      ? isReferenceQaMode()
      : activeKnownRoute !== "Public Showcase");

  let routeContent: ReactNode;
  if (routeMatch.kind === "not-found") {
    routeContent = (
      <NotFoundSurface onNavigate={navigateTo} pathname={routeMatch.pathname} />
    );
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Operations Tracker"
  ) {
    routeContent = (
      <OperationsTracker
        onOpenSettings={openThemeSettings}
        onViewStateChange={setOperationsViewState}
        viewState={operationsViewState as OperationsViewState}
      />
    );
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Publishing Store"
  ) {
    routeContent = <EbookStoreCatalog onOpenSettings={openThemeSettings} />;
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Operational Patterns"
  ) {
    routeContent = <OperationalReference onOpenSettings={openThemeSettings} />;
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Public Showcase"
  ) {
    routeContent = (
      <PublicShowcase
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
      />
    );
  } else if (routeMatch.kind === "brand-proof") {
    routeContent = (
      <BrandExpressionProof
        onNavigatePath={navigateToPath}
        profileId={routeMatch.profileId}
      />
    );
  } else {
    const activeRoute: Exclude<
      PlaygroundRoute,
      | "Operations Tracker"
      | "Operational Patterns"
      | "Publishing Store"
      | "Public Showcase"
    > =
      routeMatch.kind === "known" &&
      routeMatch.route !== "Operations Tracker" &&
      routeMatch.route !== "Operational Patterns" &&
      routeMatch.route !== "Publishing Store" &&
      routeMatch.route !== "Public Showcase"
        ? routeMatch.route
        : routeMatch.kind === "component-family" ||
            routeMatch.kind === "component-detail"
          ? "Components"
          : routeMatch.kind === "block-detail"
            ? "Blocks"
            : "Recipes";
    const activePath =
      routeMatch.kind === "known"
        ? playgroundRoutePaths[routeMatch.route]
        : routeMatch.pathname;
    const breadcrumbItems =
      routeMatch.kind === "component-family"
        ? [
            { label: "Components", path: "/components" },
            {
              label: categoryLabels[routeMatch.category] ?? routeMatch.category,
            },
          ]
        : routeMatch.kind === "component-detail"
          ? [
              { label: "Components", path: "/components" },
              {
                label:
                  categoryLabels[componentCatalog[routeMatch.name].category] ??
                  componentCatalog[routeMatch.name].category,
                path: componentFamilyPath(
                  componentCatalog[routeMatch.name].category,
                ),
              },
              {
                label:
                  componentCatalog[routeMatch.name].displayName ??
                  routeMatch.name,
              },
            ]
          : routeMatch.kind === "recipe-detail"
            ? [
                { label: "Recipes", path: "/recipes" },
                {
                  label:
                    recipeCatalog[routeMatch.name].displayName ??
                    routeMatch.name,
                },
              ]
            : routeMatch.kind === "block-detail"
              ? [
                  { label: "Blocks", path: "/blocks" },
                  { label: blockCatalog[routeMatch.name].displayName },
                ]
              : [{ label: activeRoute }];
    const contentOverride =
      routeMatch.kind === "component-family" ? (
        <ComponentFamilyExplorer
          category={routeMatch.category}
          onNavigatePath={navigateToPath}
        />
      ) : routeMatch.kind === "component-detail" ? (
        <ComponentDetailExplorer
          name={routeMatch.name}
          onNavigatePath={navigateToPath}
        />
      ) : routeMatch.kind === "recipe-detail" ? (
        <RecipeDetailExplorer
          name={routeMatch.name}
          onNavigatePath={navigateToPath}
        />
      ) : routeMatch.kind === "block-detail" ? (
        <BlockDetailExplorer
          name={routeMatch.name}
          onNavigatePath={navigateToPath}
        />
      ) : undefined;
    routeContent = (
      <Studio
        activePath={activePath}
        activeRoute={activeRoute}
        breadcrumbItems={breadcrumbItems}
        contentOverride={contentOverride}
        onNavigate={navigateTo}
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
        onThemePreferencesChange={updateThemePreferences}
        onThemeRecipeChange={setThemeRecipe}
        themePreferences={themePreferences}
        themeRecipe={themeRecipe}
      />
    );
  }

  return (
    <Ten4SevenProvider
      {...settings}
      persistenceKey="ten4seven.playground.theme.v1"
      preferences={themePreferences}
      theme={themeRecipe}
    >
      <ToastProvider>
        {routeContent}
        {showReferenceHarness && activeKnownRoute ? (
          <ReferenceHarness
            activeRoute={activeKnownRoute}
            onNavigate={navigateTo}
            onOperationsViewStateChange={setOperationsViewState}
            operationsViewState={operationsViewState}
          />
        ) : null}
        {themeSettingsOpen ? (
          <ThemeSettingsSheet
            onClose={closeThemeSettings}
            onNavigatePath={navigateToPath}
            onPreferencesChange={updateThemePreferences}
            onRecipeChange={setThemeRecipe}
            open
            preferences={themePreferences}
            recipe={themeRecipe}
          />
        ) : null}
      </ToastProvider>
    </Ten4SevenProvider>
  );
}
