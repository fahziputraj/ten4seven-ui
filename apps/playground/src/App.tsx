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
  exactColor,
  Input,
  IconButton,
  MobileSidebar,
  TopNavigation,
  Modal,
  NavItem,
  PageHeader,
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
  SurfaceTreatment,
  ThemeColorSource,
  TypographyName,
} from "@ten4seven/tokens";
import {
  buildThemeVariables,
  buildRadiusProfile,
  canvasProfiles,
  hslToHex,
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
import { SaasControlPlaneReference } from "./saas-control-plane-reference";
import { BrandExpressionProof } from "./brand-expression";
import { AapmProfileWorkbench } from "./aapm-profile-workbench";
import { ResponsiveContractWorkbench } from "./responsive-contract-workbench";
import { FarmSyntheticProof } from "./farm-synthetic-proof";
import { FarmP1Reference } from "./farm-p1-reference";
import { ErpDataDenseReference } from "./erp-data-dense-reference";
import {
  blockCatalog,
  categoryLabels,
  componentCatalog,
  componentFamilyPath,
  recipeCatalog,
} from "./catalog-model";
import {
  brandProofRouteTitles,
  farmSyntheticProofDescription,
  farmSyntheticProofTitle,
  playgroundRoutePaths,
  playgroundRouteDescriptions,
  playgroundShellVariants,
  playgroundRouteTitles,
  routeFromPath,
  type PlaygroundRoute,
  type RouteMatch,
} from "./playground-routes";
import { ReferenceHarness, type ReferenceViewState } from "./reference-harness";
import { PlaygroundSidebar, PlaygroundTopbar } from "./playground-chrome";

type StudioSettings = {
  appearance: Appearance;
  palette: PaletteName;
  primary: ThemeColorSource;
  accent: ThemeColorSource;
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
const playgroundHistoryStateKey = "__ten4seven_playground";

type ScrollPosition = {
  left: number;
  top: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getBrowserLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function readRouteScrollPosition(state: unknown): ScrollPosition | null {
  if (!isRecord(state)) return null;
  const routeState = state[playgroundHistoryStateKey];
  if (!isRecord(routeState) || !isRecord(routeState.scroll)) return null;

  const { left, top } = routeState.scroll;
  if (
    typeof left !== "number" ||
    typeof top !== "number" ||
    !Number.isFinite(left) ||
    !Number.isFinite(top)
  ) {
    return null;
  }

  return {
    left: Math.max(0, left),
    top: Math.max(0, top),
  };
}

function withRouteScrollPosition(
  state: unknown,
  scroll: ScrollPosition,
): Record<string, unknown> {
  return {
    ...(isRecord(state) ? state : {}),
    [playgroundHistoryStateKey]: {
      scroll: {
        left: Math.max(0, scroll.left),
        top: Math.max(0, scroll.top),
      },
    },
  };
}

function getCurrentScrollPosition(): ScrollPosition {
  return {
    left: Math.max(0, window.scrollX),
    top: Math.max(0, window.scrollY),
  };
}

function focusRouteSurface() {
  const routeFocusTarget = document.querySelector<HTMLElement>(
    '[data-route-focus="main"]',
  );
  routeFocusTarget?.focus({ preventScroll: true });
}

function writeCurrentRouteScrollPosition(scroll: ScrollPosition) {
  window.history.replaceState(
    withRouteScrollPosition(window.history.state, scroll),
    "",
    getBrowserLocation(),
  );
}

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

function RouteSurface({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"entering" | "ready">("entering");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPhase("ready"));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="playground-route-surface" data-route-phase={phase}>
      {children}
    </div>
  );
}

function describeColorSource(source: ThemeColorSource) {
  return typeof source === "string"
    ? `${source} · preset`
    : `${source.value} · exact source`;
}

function getThemeChange(
  previous: ResolvedTheme,
  next: ResolvedTheme,
): StudioThemeChange | null {
  const axes: Array<[string, string, string]> = [
    ["Appearance", previous.appearance, next.appearance],
    ["Base palette", previous.palette, next.palette],
    [
      "Main action color",
      describeColorSource(previous.primarySource),
      describeColorSource(next.primarySource),
    ],
    [
      "Accent color",
      describeColorSource(previous.accentSource),
      describeColorSource(next.accentSource),
    ],
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
                Hierarchy is scale, space, and limited emphasis.
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
                Calm body text for the default UI size.
              </Typography>
              <Typography typeRole="body-sm" as="p">
                Supporting context without competition.
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
              <div className="type-specimen-role-heading">
                <T7Icon aria-hidden="true" name="kpi" size={15} />
                <Typography typeRole="overline">Metric</Typography>
              </div>
              <Typography typeRole="metric-lg" data-numeric>
                12,480
              </Typography>
              <Typography typeRole="caption">metric-lg</Typography>
            </div>
            <div className="type-specimen-role-card">
              <div className="type-specimen-role-heading">
                <T7Icon aria-hidden="true" name="dashboard" size={15} />
                <Typography typeRole="overline">Navigation</Typography>
              </div>
              <Typography typeRole="nav">Operations tracker</Typography>
              <Typography typeRole="caption">nav</Typography>
            </div>
            <div className="type-specimen-role-card">
              <div className="type-specimen-role-heading">
                <T7Icon aria-hidden="true" name="type" size={15} />
                <Typography typeRole="overline">Input</Typography>
              </div>
              <Typography typeRole="input">Search records…</Typography>
              <Typography typeRole="caption">input</Typography>
            </div>
            <div className="type-specimen-role-card">
              <div className="type-specimen-role-heading">
                <T7Icon aria-hidden="true" name="file" size={15} />
                <Typography typeRole="overline">Code</Typography>
              </div>
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
  onNavigatePath,
  onOpenReferenceQa,
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
    | "ERP Density Reference"
    | "Publishing Store"
    | "Public Showcase"
  >;
  activePath: string;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  contentOverride?: ReactNode;
  onNavigatePath: (path: string) => void;
  onOpenReferenceQa: () => void;
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
      ["Main action", describeColorSource(theme.primarySource)],
      ["Accent color", describeColorSource(theme.accentSource)],
      ["Canvas", theme.canvas],
      ["Surface treatment", theme.surfaceTreatment],
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
    <div
      className="studio-shell"
      data-active-route={activeRoute}
      data-shell-contract="reference-shell"
      data-shell-variant={playgroundShellVariants[activeRoute]}
    >
      <PlaygroundSidebar
        activePath={activePath}
        className="studio-sidebar"
        element="aside"
        label="ten4seven UI navigation"
        onNavigatePath={onNavigatePath}
      />

      <main className="studio-main" data-route-focus="main" tabIndex={-1}>
        <PlaygroundTopbar
          activeRoute={activeRoute}
          breadcrumbItems={breadcrumbItems}
          isMobileNavOpen={isMobileNavOpen}
          mobileMenuLabel="Open design system navigation"
          mobileNavigationId={mobileNavigationId}
          onNavigatePath={onNavigatePath}
          onOpenMobileNavigation={() => setMobileNavOpen(true)}
          onOpenSettings={onOpenSettings}
          settingsLabel="Open settings"
        />

        <MobileSidebar
          id={mobileNavigationId}
          onClose={() => setMobileNavOpen(false)}
          open={isMobileNavOpen}
          title="Design system navigation"
        >
          <div className="studio-mobile-navigation">
            <PlaygroundSidebar
              activePath={activePath}
              label="ten4seven UI navigation"
              mode="mobile"
              onNavigatePath={(path) => {
                setMobileNavOpen(false);
                onNavigatePath(path);
              }}
            />
            <Button
              className="studio-mobile-reference-qa"
              intent="secondary"
              leadingIcon="components"
              onClick={onOpenReferenceQa}
              size="sm"
            >
              Open reference QA
            </Button>
          </div>
        </MobileSidebar>

        {activeRoute === "Theme Studio" && !contentOverride ? (
          <>
            <div className="studio-content">
              <PageHeader
                className="studio-page-header"
                description="Tune shared tokens and preview their effect."
                meta={
                  <span className="studio-last-updated">
                    Local preview · live tokens
                  </span>
                }
                overline="Theme workbench · live token preview"
                title="Theme Studio"
              />

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

              <AapmProfileWorkbench />

              <ResponsiveContractWorkbench />

              <Collapsible
                className="studio-advanced-authoring"
                title={
                  <span className="studio-advanced-authoring-title">
                    <span>Advanced theme authoring</span>
                    <small>Shared token controls</small>
                  </span>
                }
              >
                <div className="studio-advanced-authoring-content">
                  <Card className="studio-controls-card">
                    <CardHeader>
                      <div className="studio-controls-header-copy">
                        <CardTitle as="h2">Authoring tokens</CardTitle>
                        <CardDescription>
                          Tune the active palette, type, geometry, and motion
                          axes.
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
                            Palette sets hue. Main action covers UI. Accent
                            supports emphasis. Canvas controls neutrals; Chart
                            controls data colorways.
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
                            <div className="studio-control-group-title-row">
                              <span
                                aria-hidden="true"
                                className="studio-control-group-icon"
                              >
                                <T7Icon name="type" size={16} />
                              </span>
                              <Typography
                                as="h3"
                                className="studio-control-group-title"
                                id="studio-type-heading"
                                typeRole="label"
                              >
                                Typography
                              </Typography>
                            </div>
                            <p>Shared family and role hierarchy.</p>
                          </div>
                          <TypographyPicker value={theme.typography} />
                        </section>

                        <section
                          aria-labelledby="studio-color-heading"
                          className="studio-control-group studio-control-group-color"
                        >
                          <div className="studio-control-group-heading">
                            <div className="studio-control-group-title-row">
                              <span
                                aria-hidden="true"
                                className="studio-control-group-icon"
                              >
                                <T7Icon name="palette" size={16} />
                              </span>
                              <Typography
                                as="h3"
                                className="studio-control-group-title"
                                id="studio-color-heading"
                                typeRole="label"
                              >
                                Color roles
                              </Typography>
                            </div>
                            <p>Base hue and semantic roles.</p>
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
                                <small>Supporting emphasis</small>
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
                                <small>Data series and colorways</small>
                              </div>
                            </div>
                          </div>
                          <div className="studio-control-subgrid">
                            <ColorSourceControl
                              hint="Buttons, links, selected states."
                              label="Main action color"
                              settingKey="primary"
                              source={theme.primarySource}
                            />
                            <ColorSourceControl
                              hint="Supporting emphasis; focus stays semantic."
                              label="Accent color"
                              settingKey="accent"
                              source={theme.accentSource}
                            />
                            <CanvasPicker
                              appearance={theme.appearance}
                              value={theme.canvas}
                            />
                            <ChartPalettePicker value={theme.chartPalette} />
                          </div>
                        </section>

                        <section
                          aria-labelledby="studio-rhythm-heading"
                          className="studio-control-group studio-control-group-rhythm"
                        >
                          <div className="studio-control-group-heading">
                            <div className="studio-control-group-title-row">
                              <span
                                aria-hidden="true"
                                className="studio-control-group-icon"
                              >
                                <T7Icon name="components" size={16} />
                              </span>
                              <Typography
                                as="h3"
                                className="studio-control-group-title"
                                id="studio-rhythm-heading"
                                typeRole="label"
                              >
                                Shape
                              </Typography>
                            </div>
                            <p>Shared geometry; density stays above.</p>
                          </div>
                          <RadiusSlider value={theme.radius} />
                        </section>

                        <section
                          aria-labelledby="studio-motion-heading"
                          className="studio-control-group studio-control-group-motion"
                        >
                          <div className="studio-control-group-heading">
                            <div className="studio-control-group-title-row">
                              <span
                                aria-hidden="true"
                                className="studio-control-group-icon"
                              >
                                <T7Icon name="clock" size={16} />
                              </span>
                              <Typography
                                as="h3"
                                className="studio-control-group-title"
                                id="studio-motion-heading"
                                typeRole="label"
                              >
                                Motion timing
                              </Typography>
                            </div>
                            <p>
                              Authored timing; motion preference stays above.
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
                          Current provider values.
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
                    <small>CSS-first selector proof</small>
                  </span>
                }
              >
                <CssFirstThemeProof />
              </Collapsible>

              <TypographySpecimen />

              <section className="studio-section-heading">
                <div>
                  <h2>Component proof</h2>
                  <p>A compact set of canonical controls for visual checks.</p>
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
                        Intent and size share one height.
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
                        Focus follows the semantic ring.
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
                        Elevation follows the active profile.
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
                        Density changes rows, not readability.
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
                        Radius and elevation stay shared.
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
                        State uses semantic foregrounds.
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
                    Review the live specimen, then save a local proof snapshot
                    for this experiment.
                  </span>
                </div>
                <Button
                  className="studio-footer-card-action"
                  intent={saved ? "secondary" : "primary"}
                  leadingIcon={saved ? "fileCheck" : "export"}
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
        <legend className="t7-field-label studio-choice-legend">
          <T7Icon aria-hidden="true" name="components" size={15} />
          <span>Preset</span>
        </legend>
        <p className="studio-choice-help" id="studio-shape-preset-description">
          Named profile or exact Base radius.
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
            0–24 px control; custom values preserve the recipe.
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
            One compact surface for the active theme.
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
                Actions, status, form, and data in one surface.
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
            {describeColorSource(theme.primarySource)} · primary role
          </span>
          <span className="studio-live-preview-meta" data-live-value="accent">
            {describeColorSource(theme.accentSource)} · supporting emphasis
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
              Nested contrast · shared contract
            </span>
          </div>
          <Button intent="secondary" size="sm">
            Scoped action
          </Button>
          <span className="studio-live-preview-meta">ThemeScope · inverse</span>
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
              Authored geometry and type
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
            ThemeScope · editorial
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
        0.25s steps · bounded transitions
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

function ColorSourceControl({
  label,
  hint,
  settingKey,
  source,
}: {
  label: string;
  hint: string;
  settingKey: "primary" | "accent";
  source: ThemeColorSource;
}) {
  const { setTheme, theme } = useTen4SevenTheme();
  const variables = buildThemeVariables(theme);
  const swatch =
    settingKey === "primary"
      ? variables["--t7-primary-hsl"]
      : variables["--t7-accent-hsl"];
  const sourcePalette = settingKey === "primary" ? theme.primary : theme.accent;
  const inputValue =
    typeof source === "string" ? hslToHex(swatch) : source.value.toLowerCase();

  function updateSource(next: ThemeColorSource) {
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
        value={typeof source === "string" ? source : ""}
        onChange={(event) => {
          const next = event.target.value as PaletteName;
          if (paletteNames.includes(next)) updateSource(next);
        }}
      >
        {typeof source === "string" ? null : (
          <option disabled value="">
            Exact custom source
          </option>
        )}
        {paletteNames.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Input
        data-testid={`exact-${settingKey}-source`}
        hint={`Exact ${
          settingKey === "primary" ? "action" : "supporting"
        } source; presets restore the curated family.`}
        label={`Exact ${label.toLowerCase()} source`}
        onChange={(event) =>
          updateSource(exactColor(event.currentTarget.value))
        }
        type="color"
        value={inputValue}
      />
      <Typography typeRole="caption">
        {typeof source === "string"
          ? `Using ${sourcePalette} preset.`
          : `Using exact source ${source.value}.`}
      </Typography>
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
const themeRecipeIcons: Record<ThemeRecipeName, IconName> = {
  enterprise: "dashboard",
  product: "components",
  editorial: "book",
  commerce: "cart",
};
const surfaceTreatmentOptions: Array<{
  value: SurfaceTreatment;
  label: string;
  description: string;
  icon: IconName;
}> = [
  {
    value: "quiet",
    label: "Quiet canvas",
    description: "Soft tonal separation",
    icon: "view",
  },
  {
    value: "low-contrast",
    label: "Low contrast",
    description: "Subtle field edges",
    icon: "tokens",
  },
  {
    value: "outlined",
    label: "Outlined regions",
    description: "Clear region edges",
    icon: "components",
  },
];

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
  const { resetTheme, setTheme, theme } = useTen4SevenTheme();

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
        <div className="studio-sandbox-context">
          <span aria-hidden="true" className="studio-sandbox-context-icon">
            <T7Icon name="theme" size={16} />
          </span>
          <span className="studio-sandbox-context-copy">
            <strong>Live sandbox</strong>
            <small>Preview tokens in context.</small>
          </span>
        </div>
        <Typography as="p" typeRole="overline">
          Theme recipe
        </Typography>
        <Typography as="h2" id="theme-recipe-heading" typeRole="heading-md">
          Choose a recipe
        </Typography>
        <Typography as="p" typeRole="body-sm">
          Start with a preset, then tune runtime preferences.
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
              leadingIcon={themeRecipeIcons[recipe.id]}
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
            Custom
          </Typography>
          <Button
            aria-pressed={value === undefined}
            intent={value === undefined ? "secondary" : "quiet"}
            leadingIcon="palette"
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
          icon="theme"
          label="Appearance"
          onChange={(appearance) =>
            onPreferencesChange({
              ...preferences,
              appearance: appearance as RuntimePreferences["appearance"],
            })
          }
          options={[
            ["system", "System", "settings"],
            ["light", "Light", "sun"],
            ["dark", "Dark", "moon"],
          ]}
          value={preferences.appearance ?? "system"}
        />
        <RuntimePreferenceOptions
          icon="density"
          label="Density"
          onChange={(density) =>
            onPreferencesChange({
              ...preferences,
              density: density as RuntimePreferences["density"],
            })
          }
          options={[
            ["dense", "Dense", "density"],
            ["compact", "Compact", "table"],
            ["default", "Regular", "view"],
            ["comfortable", "Comfortable", "components"],
          ]}
          value={preferences.density ?? "default"}
        />
        <RuntimePreferenceOptions
          icon="eye"
          label="Contrast"
          onChange={(contrast) =>
            onPreferencesChange({
              ...preferences,
              contrast: contrast as RuntimePreferences["contrast"],
            })
          }
          options={[
            ["standard", "Standard", "view"],
            ["more", "More", "eye"],
          ]}
          value={preferences.contrast ?? "standard"}
        />
        <RuntimePreferenceOptions
          icon="clock"
          label="Motion"
          onChange={(motion) =>
            onPreferencesChange({
              ...preferences,
              motion: motion as RuntimePreferences["motion"],
            })
          }
          options={[
            ["full", "Full", "trendUp"],
            ["reduced", "Reduced", "clock"],
          ]}
          value={preferences.motion ?? "full"}
        />
      </div>
      <SurfaceTreatmentOptions
        onChange={(surfaceTreatment) => setTheme({ surfaceTreatment })}
        value={theme.surfaceTreatment}
      />
      <Typography className="studio-recipe-active" typeRole="caption">
        {value
          ? `${THEME_RECIPES[value].label} · ${THEME_RECIPES[value].expression}`
          : "Custom recipe · no preset selected"}
      </Typography>
    </section>
  );
}

function SurfaceTreatmentOptions({
  onChange,
  value,
}: {
  onChange: (value: SurfaceTreatment) => void;
  value: SurfaceTreatment;
}) {
  return (
    <fieldset className="studio-surface-treatment">
      <legend>Surface treatment</legend>
      <p>Container chrome for dense surfaces.</p>
      <div
        aria-label="Surface treatment"
        className="studio-surface-treatment-options"
        role="group"
      >
        {surfaceTreatmentOptions.map((option) => (
          <Button
            aria-pressed={value === option.value}
            className="studio-surface-treatment-option"
            intent={value === option.value ? "secondary" : "quiet"}
            key={option.value}
            leadingIcon={option.icon}
            onClick={() => onChange(option.value)}
            size="sm"
          >
            <span className="studio-surface-treatment-option-copy">
              <strong>{option.label}</strong>
              <small>{option.description}</small>
            </span>
          </Button>
        ))}
      </div>
    </fieldset>
  );
}

function RuntimePreferenceOptions({
  icon,
  label,
  onChange,
  options,
  value,
}: {
  icon: IconName;
  label: string;
  onChange: (value: string) => void;
  options: Array<[string, string, IconName]>;
  value: string;
}) {
  return (
    <fieldset className="studio-runtime-preference">
      <legend>
        <span className="studio-runtime-preference-heading">
          <span aria-hidden="true" className="studio-runtime-preference-icon">
            <T7Icon name={icon} size={15} />
          </span>
          <span>{label}</span>
        </span>
      </legend>
      <div>
        {options.map(([optionValue, optionLabel, optionIcon]) => (
          <Button
            aria-pressed={value === optionValue}
            className="studio-runtime-option"
            data-option={optionValue}
            intent="quiet"
            key={optionValue}
            leadingIcon={optionIcon}
            onClick={() => onChange(optionValue)}
            size="sm"
            trailingIcon={value === optionValue ? "check" : undefined}
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
            icon="theme"
            label="Appearance"
            onChange={(value) => updatePreference("appearance", value)}
            options={[
              ["system", "System", "settings"],
              ["light", "Light", "sun"],
              ["dark", "Dark", "moon"],
            ]}
            value={preferences.appearance ?? "system"}
          />
          <RuntimePreferenceOptions
            icon="density"
            label="Density"
            onChange={(value) => updatePreference("density", value)}
            options={[
              ["dense", "Dense", "density"],
              ["compact", "Compact", "table"],
              ["default", "Regular", "view"],
              ["comfortable", "Comfortable", "components"],
            ]}
            value={preferences.density ?? "default"}
          />
          <RuntimePreferenceOptions
            icon="eye"
            label="Contrast"
            onChange={(value) => updatePreference("contrast", value)}
            options={[
              ["standard", "Standard", "view"],
              ["more", "More", "eye"],
            ]}
            value={preferences.contrast ?? "standard"}
          />
          <RuntimePreferenceOptions
            icon="clock"
            label="Motion"
            onChange={(value) => updatePreference("motion", value)}
            options={[
              ["full", "Full", "trendUp"],
              ["reduced", "Reduced", "clock"],
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
      <legend className="t7-field-label studio-choice-legend">
        <T7Icon aria-hidden="true" name="type" size={15} />
        <span>Typography style</span>
      </legend>
      <p className="studio-choice-help">
        Full role hierarchy, not display face alone.
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
      <legend className="t7-field-label studio-choice-legend">
        <T7Icon aria-hidden="true" name="view" size={15} />
        <span>Canvas</span>
      </legend>
      <p className="studio-choice-help">
        Page and card neutrals, independent from brand color.
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

function ChartPalettePicker({ value }: { value: ChartPaletteName }) {
  const { setTheme, theme } = useTen4SevenTheme();
  const variables = buildThemeVariables(theme);
  const baseProfile = paletteProfiles[theme.palette];

  const optionColors: Record<ChartPaletteName, string[]> = {
    spectrum: baseProfile.chart.map((color) => `hsl(${color})`),
    four: [
      `hsl(${variables["--t7-primary-hsl"]})`,
      `hsl(${variables["--t7-accent-hsl"]})`,
      `hsl(${baseProfile.chart[2]})`,
      `hsl(${baseProfile.chart[3]})`,
    ],
    monochrome: [
      `hsl(${variables["--t7-primary-hsl"]})`,
      `hsl(${variables["--t7-primary-hover-hsl"]})`,
      `hsl(${variables["--t7-primary-active-hsl"]})`,
    ],
  };

  return (
    <fieldset className="studio-choice-picker studio-chart-picker">
      <legend className="t7-field-label studio-choice-legend">
        <T7Icon aria-hidden="true" name="chart" size={15} />
        <span>Chart colorway</span>
      </legend>
      <p className="studio-choice-help">
        Data series and colorway-linked surfaces only.
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
      <legend className="t7-field-label studio-choice-legend">
        <T7Icon aria-hidden="true" name="palette" size={15} />
        <span>Base palette</span>
      </legend>
      <p className="studio-palette-help">
        Default hue for UI and chart colors.
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
    route === "SaaS Control Plane" ||
    route === "ERP Density Reference" ||
    route === "Farm P1 Reference" ||
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
  const [referenceHarnessOpen, setReferenceHarnessOpen] = useState(false);
  const [routeMatch, setRouteMatch] = useState<RouteMatch>(() =>
    typeof window === "undefined"
      ? { kind: "known", route: "Theme Studio" }
      : routeFromPath(window.location.pathname),
  );
  const [routeLocation, setRouteLocation] = useState(() =>
    typeof window === "undefined" ? "/theme-studio" : getBrowserLocation(),
  );
  const pendingScrollPositionRef = useRef<ScrollPosition | null>(
    typeof window === "undefined"
      ? null
      : readRouteScrollPosition(window.history.state),
  );
  const scrollFrameRef = useRef<number | null>(null);
  const currentScrollPositionRef = useRef<ScrollPosition>({ left: 0, top: 0 });
  const [operationsViewState, setOperationsViewState] =
    useState<ReferenceViewState>("ready");

  useLayoutEffect(() => {
    const pending = pendingScrollPositionRef.current ?? {
      left: 0,
      top: 0,
    };
    pendingScrollPositionRef.current = null;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash));
      if (target) {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      } else {
        window.scrollTo({ behavior: "instant", left: 0, top: 0 });
      }
    } else {
      const maxLeft = Math.max(
        0,
        document.documentElement.scrollWidth - window.innerWidth,
      );
      const maxTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      window.scrollTo({
        behavior: "instant",
        left: Math.min(pending.left, maxLeft),
        top: Math.min(pending.top, maxTop),
      });
    }

    focusRouteSurface();
  }, [routeLocation]);

  useEffect(() => {
    // A browser may apply native fragment focus after React's layout effect on
    // a deep link. Re-assert the route landmark on the next frame so direct
    // links and client-side navigation share the same focus contract.
    const frame = window.requestAnimationFrame(focusRouteSurface);
    return () => window.cancelAnimationFrame(frame);
  }, [routeLocation]);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const storedPosition = readRouteScrollPosition(window.history.state);
    currentScrollPositionRef.current =
      storedPosition ?? getCurrentScrollPosition();
    if (!storedPosition) {
      writeCurrentRouteScrollPosition(currentScrollPositionRef.current);
    }

    const handleScroll = () => {
      currentScrollPositionRef.current = getCurrentScrollPosition();
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        writeCurrentRouteScrollPosition(currentScrollPositionRef.current);
      });
    };

    const flushScrollPosition = () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      currentScrollPositionRef.current = getCurrentScrollPosition();
      writeCurrentRouteScrollPosition(currentScrollPositionRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", flushScrollPosition);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", flushScrollPosition);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const syncRoute = (restoredPosition?: ScrollPosition | null) => {
      if (restoredPosition !== undefined) {
        pendingScrollPositionRef.current = restoredPosition ?? {
          left: 0,
          top: 0,
        };
      }

      if (window.location.pathname === "/") {
        window.history.replaceState(
          window.history.state,
          "",
          playgroundRoutePaths["Theme Studio"],
        );
      }
      setRouteLocation(getBrowserLocation());
      setRouteMatch(routeFromPath(window.location.pathname));
    };
    syncRoute();
    const handlePopState = (event: PopStateEvent) => {
      syncRoute(readRouteScrollPosition(event.state));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const routeTitle =
      routeMatch.kind === "known"
        ? playgroundRouteTitles[routeMatch.route]
        : routeMatch.kind === "farm-synthetic"
          ? farmSyntheticProofTitle
          : routeMatch.kind === "farm-reference"
            ? playgroundRouteTitles["Farm P1 Reference"]
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
        : routeMatch.kind === "farm-synthetic"
          ? farmSyntheticProofDescription
          : routeMatch.kind === "farm-reference"
            ? playgroundRouteDescriptions["Farm P1 Reference"]
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
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      currentScrollPositionRef.current = getCurrentScrollPosition();
      writeCurrentRouteScrollPosition(currentScrollPositionRef.current);
      window.history.pushState(
        withRouteScrollPosition(window.history.state, { left: 0, top: 0 }),
        "",
        nextLocationString,
      );
      pendingScrollPositionRef.current = { left: 0, top: 0 };
      setRouteLocation(nextLocationString);
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
        onNavigatePath={navigateToPath}
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
    routeContent = (
      <OperationalReference
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
      />
    );
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "SaaS Control Plane"
  ) {
    routeContent = (
      <SaasControlPlaneReference
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
      />
    );
  } else if (
    routeMatch.kind === "known" &&
    routeMatch.route === "ERP Density Reference"
  ) {
    routeContent = (
      <ErpDataDenseReference
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
      />
    );
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
  } else if (routeMatch.kind === "farm-synthetic") {
    routeContent = (
      <FarmSyntheticProof
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
      />
    );
  } else if (routeMatch.kind === "farm-reference") {
    routeContent = (
      <FarmP1Reference
        onNavigatePath={navigateToPath}
        onOpenSettings={openThemeSettings}
        pathname={routeMatch.pathname}
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
      | "SaaS Control Plane"
      | "ERP Density Reference"
      | "Farm P1 Reference"
      | "Publishing Store"
      | "Public Showcase"
    > =
      routeMatch.kind === "known" &&
      routeMatch.route !== "Operations Tracker" &&
      routeMatch.route !== "Operational Patterns" &&
      routeMatch.route !== "SaaS Control Plane" &&
      routeMatch.route !== "ERP Density Reference" &&
      routeMatch.route !== "Farm P1 Reference" &&
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
        onNavigatePath={navigateToPath}
        onOpenReferenceQa={() => setReferenceHarnessOpen(true)}
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
        <RouteSurface key={routeLocation}>{routeContent}</RouteSurface>
        {showReferenceHarness && activeKnownRoute ? (
          <ReferenceHarness
            activeRoute={activeKnownRoute}
            onNavigate={navigateTo}
            onOpenChange={setReferenceHarnessOpen}
            onOperationsViewStateChange={setOperationsViewState}
            open={referenceHarnessOpen}
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
