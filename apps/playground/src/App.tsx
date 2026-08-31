import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DataTable,
  Input,
  CommandMenu,
  MobileSidebar,
  Modal,
  NavItem,
  Popover,
  Select,
  Slider,
  Ten4SevenProvider,
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
  densityProfiles,
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
  onNavigate,
  onNavigatePath,
}: {
  activePath: string;
  onNavigate: (route: PlaygroundRoute) => void;
  onNavigatePath: (path: string) => void;
}) {
  return (
    <div className="studio-navigation-tree">
      {studioNavGroups.map((group) => (
        <div className="studio-nav-group" key={group.label}>
          {group.label === "Library" ? (
            <LibraryMenu
              activePath={activePath}
              onNavigate={onNavigate}
              onNavigatePath={onNavigatePath}
            />
          ) : (
            <>
              <span className="studio-nav-label">{group.label}</span>
              {group.routes.map((route) => (
                <NavItem
                  active={activePath === playgroundRoutePaths[route]}
                  icon={routeIcons[route]}
                  key={route}
                  label={route}
                  onClick={() => onNavigate(route)}
                />
              ))}
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
}: {
  activeRoute: Exclude<
    PlaygroundRoute,
    "Operations Tracker" | "Publishing Store" | "Public Showcase"
  >;
  activePath: string;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  contentOverride?: ReactNode;
  onNavigate: (route: PlaygroundRoute) => void;
  onNavigatePath: (path: string) => void;
}) {
  const { resetTheme, theme } = useTen4SevenTheme();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
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
      ["Appearance", theme.appearance],
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
    [theme],
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
          <span className="studio-nav-label">Proof scope</span>
          <p>One catalog source. Deep links for every canonical contract.</p>
          <span className="studio-sidebar-version">v1 workbench</span>
        </div>
      </aside>

      <main className="studio-main">
        <header className="studio-topbar">
          <div className="studio-topbar-leading">
            <Button
              aria-label="Open library navigation"
              className="studio-mobile-menu"
              intent="quiet"
              leadingIcon="menu"
              onClick={() => setMobileNavOpen(true)}
              size="sm"
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
          <div className="studio-top-actions">
            <WorkbenchSearch onNavigatePath={onNavigatePath} />
            <span className="studio-live-dot">
              <i /> Local proof
            </span>
            <button
              aria-label="Open settings"
              className="studio-top-icon"
              type="button"
            >
              <T7Icon name="settings" size={17} />
            </button>
            <span className="studio-avatar">T7</span>
          </div>
        </header>

        <MobileSidebar
          onClose={() => setMobileNavOpen(false)}
          open={isMobileNavOpen}
          title="Library navigation"
        >
          <div className="studio-mobile-navigation">
            <WorkbenchNavigation
              activePath={activePath}
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
                    Adjust the system axes, then inspect how the same surfaces
                    respond without local restyling.
                  </p>
                </div>
                <div className="studio-intro-actions">
                  <Badge tone="primary">
                    <T7Icon name="check" size={13} /> System coherence
                  </Badge>
                  <span className="studio-last-updated">
                    Theme Studio controls the active ten4seven theme
                  </span>
                </div>
              </section>

              <section className="studio-control-row">
                <Card className="studio-controls-card">
                  <CardHeader>
                    <div className="studio-controls-header-copy">
                      <CardTitle>Global controls</CardTitle>
                      <CardDescription>
                        Choose the base system, then tune the roles that travel
                        with it. Every change writes the same provider tokens
                        used by previews and reference routes.
                      </CardDescription>
                    </div>
                    <div className="studio-controls-header-side">
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
                      <T7Icon
                        className="studio-card-icon"
                        name="palette"
                        size={24}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="studio-controls-content">
                    <StudioLivePreview />
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
                          drives focus rings, focused fields, and emphasis.{" "}
                          <strong>Canvas</strong> controls neutral surfaces;{" "}
                          <strong>Chart</strong> controls data series only.
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
                        aria-labelledby="studio-environment-heading"
                        className="studio-control-group studio-control-group-environment"
                      >
                        <div className="studio-control-group-heading">
                          <Typography
                            as="h3"
                            className="studio-control-group-title"
                            id="studio-environment-heading"
                            typeRole="label"
                          >
                            Environment
                          </Typography>
                          <p>
                            Set the overall appearance mode for the provider.
                          </p>
                        </div>
                        <SettingSelect
                          hint="Light or dark surfaces across every route."
                          label="Appearance"
                          settingKey="appearance"
                          value={theme.appearance}
                          options={["light", "dark"]}
                        />
                      </section>

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
                        <SettingSelect
                          hint="Changes the UI, display, and mono families used by every type role."
                          label="Typography style"
                          optionLabels={typographyPresetLabels}
                          settingKey="typography"
                          value={theme.typography}
                          options={typographyNames}
                        />
                        <div
                          className="studio-typography-current"
                          data-preset={theme.typography}
                          data-testid="studio-typography-current"
                        >
                          <span
                            aria-hidden="true"
                            className="studio-typography-current-sample"
                          >
                            Aa
                          </span>
                          <div>
                            <strong>
                              {typographyPresetLabels[theme.typography]}
                            </strong>
                            <span>
                              {typographyPresetDetails[theme.typography]}
                            </span>
                          </div>
                        </div>
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
                            Set the base hue, then tune each semantic role. The
                            labels below tell you exactly where each value
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
                              <small>Focus ring · focused fields</small>
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
                              <small>Data series only</small>
                            </div>
                          </div>
                        </div>
                        <div className="studio-control-subgrid">
                          <SettingSelect
                            hint="Primary actions, links, and selected states."
                            label="Main action color"
                            settingKey="primary"
                            value={theme.primary}
                            options={paletteNames}
                          />
                          <SettingSelect
                            hint="Focus rings, focused inputs, and supporting emphasis use this accent."
                            label="Accent color"
                            settingKey="accent"
                            value={theme.accent}
                            options={paletteNames}
                          />
                          <SettingSelect
                            hint="Neutral surfaces, independent from hue."
                            label="Canvas"
                            optionLabels={{
                              balanced: "Balanced",
                              monochrome: "Monochrome",
                              paper: "Paper white",
                            }}
                            settingKey="canvas"
                            value={theme.canvas}
                            options={["balanced", "paper", "monochrome"]}
                          />
                          <SettingSelect
                            hint="Data-series colors; UI roles stay unchanged."
                            label="Chart colorway"
                            optionLabels={{
                              four: "Four colors",
                              monochrome: "Monochrome",
                              spectrum: "Spectrum",
                            }}
                            settingKey="chartPalette"
                            value={theme.chartPalette}
                            options={["spectrum", "four", "monochrome"]}
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
                            Shape &amp; density
                          </Typography>
                          <p>Adjust shared geometry and vertical rhythm.</p>
                        </div>
                        <div className="studio-control-subgrid">
                          <RadiusSlider value={theme.radius} />
                          <DensitySlider value={theme.density} />
                        </div>
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
                            Motion
                          </Typography>
                          <p>
                            One shared duration for viewport reveals, hover,
                            expand, and chart animation. Steps are 0.25 seconds.
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
                      Reset to defaults
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="studio-axis-card" tone="accent">
                  <CardHeader>
                    <div>
                      <CardTitle>Active profile</CardTitle>
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
              </section>

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
      </main>
    </div>
  );
}

type StudioAxisStop<Name extends string> = {
  detail: string;
  label: string;
  name: Name;
  value: number;
};

const densityStops = [
  {
    detail: `${densityProfiles.dense.control} control · ${densityProfiles.dense.row} row`,
    label: "32 px",
    name: "dense",
    value: 32,
  },
  {
    detail: `${densityProfiles.compact.control} control · ${densityProfiles.compact.row} row`,
    label: "36 px",
    name: "compact",
    value: 36,
  },
  {
    detail: `${densityProfiles.default.control} control · ${densityProfiles.default.row} row`,
    label: "40 px",
    name: "default",
    value: 40,
  },
  {
    detail: `${densityProfiles.comfortable.control} control · ${densityProfiles.comfortable.row} row`,
    label: "44 px",
    name: "comfortable",
    value: 44,
  },
] as const satisfies readonly StudioAxisStop<DensityName>[];

function StudioAxisSlider<Name extends string>({
  axisClassName,
  label,
  onChange,
  stops,
  value,
}: {
  axisClassName: string;
  label: string;
  onChange: (name: Name) => void;
  stops: readonly StudioAxisStop<Name>[];
  value: Name;
}) {
  const activeIndex = Math.max(
    0,
    stops.findIndex((stop) => stop.name === value),
  );
  const active = stops[activeIndex] ?? stops[0];

  return (
    <div className={`studio-axis-slider ${axisClassName}`}>
      <Slider
        aria-label={label}
        aria-valuetext={`${active.name}, ${active.label}; ${active.detail}`}
        label={label}
        max={stops.length - 1}
        min={0}
        onChange={(event) => {
          const next = stops[Number(event.currentTarget.value)];
          if (next) onChange(next.name);
        }}
        value={activeIndex}
        valueLabel={active.label}
      />
      <span className="studio-axis-slider-detail">{active.detail}</span>
      <div aria-hidden="true" className="studio-axis-slider-scale">
        {stops.map((stop) => (
          <span data-active={stop.name === value} key={stop.name}>
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function RadiusSlider({ value }: { value: RadiusName }) {
  const { setTheme, theme } = useTen4SevenTheme();
  const namedProfile = radiusProfiles[value];
  const currentValue =
    theme.radiusValue ?? Number.parseFloat(namedProfile.base);
  const activeProfile =
    theme.radiusValue === undefined
      ? namedProfile
      : buildRadiusProfile(currentValue);

  return (
    <div className="studio-axis-slider studio-radius-control">
      <Slider
        aria-label="Radius"
        aria-valuetext={[
          currentValue,
          "px base radius; exact 1 px step;",
          activeProfile.control,
          "control ·",
          activeProfile.panel,
          "panel",
        ].join(" ")}
        label="Radius"
        max={radiusValueRange.max}
        min={radiusValueRange.min}
        onChange={(event) => {
          const next = Math.min(
            radiusValueRange.max,
            Math.max(radiusValueRange.min, Number(event.currentTarget.value)),
          );
          const radius: RadiusName =
            next <= 8 ? "sharp" : next <= 14 ? "soft" : "rounded";
          setTheme({ radius, radiusValue: next });
        }}
        step={1}
        value={currentValue}
        valueLabel={String(currentValue) + " px"}
      />
      <span className="studio-axis-slider-detail">
        {activeProfile.base} base · {activeProfile.control} control ·{" "}
        {activeProfile.panel} panel
      </span>
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
  );
}

function StudioLivePreview() {
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
            as="h3"
            className="studio-live-preview-title"
            id="studio-live-preview-title"
            typeRole="label"
          >
            See the roles update in place
          </Typography>
          <Typography as="p" typeRole="caption">
            Change a setting below and watch the same root tokens reach the
            controls, surfaces, focus treatment, and data colorways here.
          </Typography>
        </div>
        <span className="studio-live-preview-source">root tokens · live</span>
      </div>
      <div className="studio-live-preview-grid">
        <div className="studio-live-preview-sample" data-role="primary">
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">Primary action</span>
            <span className="studio-live-preview-role-note">
              Buttons · links · selected states
            </span>
          </div>
          <Button leadingIcon="check" size="sm">
            Apply
          </Button>
          <span className="studio-live-preview-meta" data-live-value="primary">
            {theme.primary} · primary role
          </span>
        </div>
        <div className="studio-live-preview-sample" data-role="accent">
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">Accent color</span>
            <span className="studio-live-preview-role-note">
              Focus ring · focused fields
            </span>
          </div>
          <Input
            aria-label="Live theme preview field"
            className="studio-live-preview-focus-input"
            defaultValue="Ready"
          />
          <span className="studio-live-preview-meta" data-live-value="accent">
            {theme.accent} · shared focus role
          </span>
        </div>
        <div className="studio-live-preview-sample" data-role="surface">
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">Canvas surface</span>
            <span className="studio-live-preview-role-note">
              Neutral page surfaces
            </span>
          </div>
          <div
            className="studio-live-preview-surface"
            data-live-value="surface"
          >
            <span>
              Canvas <strong>{theme.canvas}</strong>
            </span>
            <Badge tone="primary">{formatRadiusSetting(theme)} radius</Badge>
          </div>
          <span className="studio-live-preview-meta" data-live-value="density">
            {theme.density} density · shared surface scale
          </span>
        </div>
        <div className="studio-live-preview-sample" data-role="data">
          <div className="studio-live-preview-role-heading">
            <span className="studio-live-preview-label">Chart colorway</span>
            <span className="studio-live-preview-role-note">
              Data series only
            </span>
          </div>
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
          <span className="studio-live-preview-meta">
            {theme.chartPalette} · {theme.palette} base hue
          </span>
        </div>
      </div>
    </section>
  );
}

function DensitySlider({ value }: { value: DensityName }) {
  const { setTheme } = useTen4SevenTheme();
  return (
    <StudioAxisSlider
      axisClassName="studio-density-control"
      label="Density"
      onChange={(density) => setTheme({ density })}
      stops={densityStops}
      value={value}
    />
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
        0.25s steps · shared reveal · interaction timing
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

function SettingSelect({
  label,
  hint,
  optionLabels,
  options,
  settingKey,
  value,
}: {
  label: string;
  hint?: string;
  optionLabels?: Record<string, string>;
  options: string[];
  settingKey: keyof StudioSettings;
  value: string;
}) {
  const { setTheme } = useTen4SevenTheme();
  return (
    <Select
      hint={hint}
      label={label}
      value={value}
      onChange={(event) => {
        const next = event.target.value;
        setTheme({ [settingKey]: next } as Partial<StudioSettings>);
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {optionLabels?.[option] ?? option}
        </option>
      ))}
    </Select>
  );
}

const paletteNames = Object.keys(paletteProfiles) as PaletteName[];
const typographyNames = Object.keys(typographyProfiles) as TypographyName[];
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
              setTheme({ palette, primary: palette, accent: palette })
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

  function navigateToPath(nextPath: string) {
    const nextLocation = new URL(nextPath, window.location.origin);
    const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const nextLocationString = `${nextLocation.pathname}${nextLocation.search}${nextLocation.hash}`;
    if (currentLocation !== nextLocationString) {
      window.history.pushState({}, "", nextLocationString);
    }
    setRouteMatch(routeFromPath(nextLocation.pathname));
  }

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
        onViewStateChange={setOperationsViewState}
        viewState={operationsViewState as OperationsViewState}
      />
    );
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Publishing Store"
  ) {
    routeContent = <EbookStoreCatalog />;
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "Public Showcase"
  ) {
    routeContent = <PublicShowcase onNavigatePath={navigateToPath} />;
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
      "Operations Tracker" | "Publishing Store" | "Public Showcase"
    > =
      routeMatch.kind === "known" &&
      routeMatch.route !== "Operations Tracker" &&
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
      />
    );
  }

  return (
    <Ten4SevenProvider
      {...settings}
      persistenceKey="ten4seven.playground.theme.v1"
    >
      <ToastProvider>
        {routeContent}
        {routeMatch.kind === "known" &&
        routeMatch.route !== "Public Showcase" ? (
          <ReferenceHarness
            activeRoute={routeMatch.route}
            onNavigate={navigateTo}
            onOperationsViewStateChange={setOperationsViewState}
            operationsViewState={operationsViewState}
          />
        ) : null}
      </ToastProvider>
    </Ten4SevenProvider>
  );
}
