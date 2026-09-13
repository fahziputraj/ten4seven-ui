import type {
  AccessibilityObligationId,
  ComponentLayoutIntent,
  ComponentPlatformContract,
  ComponentRendererStrategy,
  ComponentTokenFamily,
  EngineBoundary,
  InputModality,
  RendererContract,
} from "./component-platform.ts";
import type { NativeTokenStrategy, TokenPlatform } from "./foundation.ts";
import type { MotionRole } from "./types.ts";
import { resolveComponentPlatformContract } from "./component-platform.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

/**
 * U08 is the semantic contract plane for advanced visualization. It describes
 * intent, state, accessibility, ownership, and renderer boundaries; it does
 * not become a charting, scheduling, mapping, or geospatial engine.
 */

export const VISUALIZATION_FAMILIES = Object.freeze([
  "CHART",
  "VISUALIZATION_SUPPORT",
  "SCHEDULING",
  "MAP",
] as const);
export type VisualizationFamily = (typeof VISUALIZATION_FAMILIES)[number];

/** U08 keeps the DWO classification vocabulary independent of catalog counts. */
export const VISUALIZATION_CLASSIFICATIONS = Object.freeze([
  "FOUNDATION",
  "CANONICAL_COMPONENT",
  "COMPONENT_VARIANT",
  "UTILITY_OR_PROVIDER",
  "COMPOSITE_BLOCK",
  "RECIPE",
  "ENGINE_ADAPTER",
  "DOMAIN_COMPOSITION",
  "ALIAS",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
] as const);
export type VisualizationClassification =
  (typeof VISUALIZATION_CLASSIFICATIONS)[number];

export const VISUALIZATION_INVENTORY_STATUSES = Object.freeze([
  "EXISTING_STABLE",
  "EXISTING_NEEDS_HARDENING",
  "MISSING_CANONICAL",
  "VARIANT",
  "BLOCK",
  "RECIPE",
  "ENGINE_ADAPTER",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
] as const);
export type VisualizationInventoryStatus =
  (typeof VISUALIZATION_INVENTORY_STATUSES)[number];

export const CHART_TYPES = Object.freeze([
  "line",
  "area",
  "bar",
  "column",
  "stacked-bar",
  "donut",
  "pie",
  "scatter",
  "bubble",
  "radar",
  "radial",
  "sparkline",
  "combo",
  "histogram",
  "gauge",
  "heatmap",
] as const);
export type ChartType = (typeof CHART_TYPES)[number];

export const CHART_DATA_SHAPES = Object.freeze([
  "ordered-series",
  "categorical-values",
  "whole-to-part",
  "x-y-pairs",
  "x-y-size-triples",
  "matrix-values",
  "bounded-progress",
  "mixed-series",
] as const);
export type ChartDataShape = (typeof CHART_DATA_SHAPES)[number];

export const CHART_DATA_STATES = Object.freeze([
  "ready",
  "loading",
  "noData",
  "filteredEmpty",
  "partialData",
  "error",
] as const);
export type ChartDataState = (typeof CHART_DATA_STATES)[number];

export const CHART_COLOR_SEMANTICS = Object.freeze([
  "categorical",
  "semantic",
  "sequential",
  "diverging",
] as const);
export type ChartColorSemantic = (typeof CHART_COLOR_SEMANTICS)[number];

export const CHART_SEMANTIC_TONES = Object.freeze([
  "comparison",
  "threshold",
  "positive",
  "negative",
  "noData",
] as const);
export type ChartSemanticTone = (typeof CHART_SEMANTIC_TONES)[number];

export const CHART_FORMAT_INTENTS = Object.freeze([
  "number",
  "currency",
  "percent",
  "date",
  "time",
  "compact",
  "duration",
] as const);
export type ChartFormatIntent = (typeof CHART_FORMAT_INTENTS)[number];

export const CHART_INTERACTIONS = Object.freeze([
  "none",
  "hover",
  "focus",
  "press",
  "selection",
  "filter",
  "pan",
  "zoom",
] as const);
export type ChartInteraction = (typeof CHART_INTERACTIONS)[number];

export const CHART_RESPONSIVE_STRATEGIES = Object.freeze([
  "reflow",
  "reduce-ticks",
  "simplify-labels",
  "wrap-legend",
  "legend-below",
  "preserve-primary-series",
  "press-callout",
  "bounded-horizontal-scroll",
] as const);
export type ChartResponsiveStrategy =
  (typeof CHART_RESPONSIVE_STRATEGIES)[number];

export const VISUALIZATION_PERFORMANCE_CLASSES = Object.freeze([
  "bounded-small",
  "bounded-medium",
  "large-windowed",
  "high-frequency",
] as const);
export type VisualizationPerformanceClass =
  (typeof VISUALIZATION_PERFORMANCE_CLASSES)[number];

export const VISUALIZATION_ENGINE_LEVELS = Object.freeze([
  "L2-bounded-renderer",
  "L3-interactive-renderer",
  "L4-advanced-engine-adapter",
] as const);
export type VisualizationEngineLevel =
  (typeof VISUALIZATION_ENGINE_LEVELS)[number];

export const VISUALIZATION_TOKEN_ROLES = Object.freeze([
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "chart-comparison",
  "chart-threshold",
  "chart-positive",
  "chart-negative",
  "chart-no-data",
  "chart-axis",
  "chart-grid",
  "chart-label",
  "chart-tooltip",
  "chart-focus",
  "surface",
  "surface-raised",
  "border",
  "focus-ring",
  "motion-chart",
  "measure-content",
  "measure-wide",
  "minimum-useful-surface",
] as const);
export type VisualizationTokenRole = (typeof VISUALIZATION_TOKEN_ROLES)[number];

export type ChartValue = number | null;
export type ChartValueState = "value" | "zero" | "missing" | "invalid";

/**
 * Null/undefined is missing data. Zero is a present measurement and must not
 * be collapsed into an empty or missing state by a renderer.
 */
export function classifyChartValue(value: unknown): ChartValueState {
  if (value === null || value === undefined) return "missing";
  if (typeof value !== "number" || !Number.isFinite(value)) return "invalid";
  return value === 0 ? "zero" : "value";
}

export function isPresentChartValue(value: unknown): value is number {
  return (
    classifyChartValue(value) === "value" ||
    classifyChartValue(value) === "zero"
  );
}

export function hasPartialChartData(values: readonly unknown[]): boolean {
  return (
    values.some((value) => isPresentChartValue(value)) &&
    values.some((value) => {
      const state = classifyChartValue(value);
      return state === "missing" || state === "invalid";
    })
  );
}

/** Resolve an explicit state first, otherwise preserve partial versus empty. */
export function resolveChartDataState(
  requested: ChartDataState | undefined,
  values: readonly unknown[],
): ChartDataState {
  if (requested) return requested;
  if (!values.some((value) => isPresentChartValue(value))) return "noData";
  return hasPartialChartData(values) ? "partialData" : "ready";
}

export interface VisualizationSeries {
  readonly id: string;
  readonly label: string;
  readonly values: readonly ChartValue[];
  readonly colorway?: 1 | 2 | 3 | 4 | 5;
  readonly tone?: ChartSemanticTone;
}

export interface ChartAnnotation {
  readonly id: string;
  readonly kind:
    | "reference-line"
    | "threshold"
    | "reference-area"
    | "event-marker"
    | "highlight";
  readonly label: string;
  readonly value?: number;
  readonly tone?: ChartSemanticTone;
}

export interface VisualizationTokenMapping {
  readonly classification: "DERIVED" | "FIXED_SYSTEM_SEMANTIC";
  readonly roles: readonly VisualizationTokenRole[];
  readonly sourcePaths: readonly string[];
  readonly note: string;
}

/** One meaning-to-token mapping; renderer projections never author these roles. */
export const VISUALIZATION_TOKEN_MAPPING = {
  categorical: {
    classification: "DERIVED",
    roles: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
    sourcePaths: [
      "semantic.color.chart.1",
      "semantic.color.chart.2",
      "semantic.color.chart.3",
      "semantic.color.chart.4",
      "semantic.color.chart.5",
    ],
    note: "Use stable series identity; do not use categorical hue to communicate status.",
  },
  semantic: {
    classification: "FIXED_SYSTEM_SEMANTIC",
    roles: [
      "chart-comparison",
      "chart-threshold",
      "chart-positive",
      "chart-negative",
      "chart-no-data",
    ],
    sourcePaths: [
      "semantic.color.chart.comparison",
      "semantic.color.chart.threshold",
      "semantic.color.status.success",
      "semantic.color.status.danger",
      "semantic.color.chart.noData",
    ],
    note: "Semantic tones are explicit intent and require text, labels, or shape in addition to color.",
  },
  sequential: {
    classification: "DERIVED",
    roles: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
    sourcePaths: ["semantic.color.chart.1..5"],
    note: "A sequential scale is a documented ordered use of the active chart ramp; it is not a second palette source.",
  },
  diverging: {
    classification: "DERIVED",
    roles: ["chart-negative", "chart-comparison", "chart-positive"],
    sourcePaths: [
      "semantic.color.chart.negative",
      "semantic.color.chart.comparison",
      "semantic.color.chart.positive",
    ],
    note: "The neutral midpoint and text labels remain available so direction is not inferred from hue alone.",
  },
  geometry: {
    classification: "FIXED_SYSTEM_SEMANTIC",
    roles: [
      "surface",
      "surface-raised",
      "border",
      "focus-ring",
      "motion-chart",
      "measure-content",
      "measure-wide",
      "minimum-useful-surface",
    ],
    sourcePaths: [
      "semantic.color.surface.default",
      "semantic.color.surface.raised",
      "semantic.color.border.subtle",
      "semantic.color.focus",
      "behavior.motion.role.chart",
      "layout.measure.content",
      "layout.measure.wide",
      "layout.minimum-useful-surface",
    ],
    note: "Geometry and motion are shared roles; charts do not author local radius, shadow, timing, or measure systems.",
  },
} as const satisfies Readonly<Record<string, VisualizationTokenMapping>>;

export interface VisualizationAiMetadata {
  readonly useWhen: readonly string[];
  readonly avoidWhen: readonly string[];
  readonly dataShape: readonly ChartDataShape[];
  readonly platform: TokenPlatform;
  readonly engineLevel: VisualizationEngineLevel;
  readonly adaptiveStrategy: readonly string[];
  readonly interaction: readonly ChartInteraction[];
  readonly accessibilityAlternative: string;
  readonly performanceClass: VisualizationPerformanceClass;
  readonly alternatives: readonly string[];
}

export interface VisualizationComponentDefinition {
  readonly canonicalComponent: string;
  readonly displayName: string;
  readonly family: "CHART" | "VISUALIZATION_SUPPORT";
  readonly classification: VisualizationClassification;
  readonly inventoryStatus: VisualizationInventoryStatus;
  readonly chartType: ChartType | null;
  readonly intent: string;
  readonly states: readonly ChartDataState[];
  readonly accessibility: readonly AccessibilityObligationId[];
  readonly inputModalities: readonly InputModality[];
  readonly responsive: readonly ChartResponsiveStrategy[];
  readonly tokenFamilies: readonly ComponentTokenFamily[];
  readonly layoutIntents: readonly ComponentLayoutIntent[];
  readonly motionRoles: readonly MotionRole[];
  readonly interaction: readonly ChartInteraction[];
  readonly engineBoundary: EngineBoundary;
  readonly engineLevel: VisualizationEngineLevel;
  readonly consumerOwns: readonly string[];
  readonly ten4sevenOwns: readonly string[];
  readonly ai: VisualizationAiMetadata;
}

const chartAccessibility = [
  "accessible-name",
  "data-summary",
  "non-color-status",
  "focus-or-press-feedback",
] as const satisfies readonly AccessibilityObligationId[];

const chartModalities = [
  "pointer",
  "touch",
  "screenReader",
  "focus",
] as const satisfies readonly InputModality[];

const chartResponsive = [
  "reflow",
  "reduce-ticks",
  "simplify-labels",
  "wrap-legend",
  "legend-below",
  "preserve-primary-series",
  "press-callout",
] as const satisfies readonly ChartResponsiveStrategy[];

const chartTokens = [
  "color",
  "typography",
  "spacing",
  "radius",
  "focus",
  "motion",
  "density",
  "measure",
  "data-visualization",
] as const satisfies readonly ComponentTokenFamily[];

const chartLayout = [
  "measure-content",
  "measure-wide",
  "minimum-useful-surface",
  "density-adaptive",
] as const satisfies readonly ComponentLayoutIntent[];

const chartMotion = [
  "state",
  "chart",
  "reveal",
] as const satisfies readonly MotionRole[];

const commonChartAi = {
  useWhen: [
    "consumer-calculated data needs a bounded visual comparison or trend",
    "a concise chart plus a textual summary improves a decision surface",
  ],
  avoidWhen: [
    "a table or list is the clearer primary representation",
    "business formulas, fetching, or export authorization would be hidden in the renderer",
  ],
  platform: "BOTH",
  adaptiveStrategy: [
    "reflow within a bounded measure",
    "reduce ticks and wrap or move the legend below on narrow surfaces",
    "use native press/selection callouts rather than hover",
  ],
  interaction: ["hover", "focus", "press", "selection"],
  accessibilityAlternative:
    "Expose an accessible name and concise data summary; provide a list or table alternative when point-level access matters.",
  performanceClass: "bounded-medium",
  alternatives: ["DataTable", "List", "MetricCard"],
} as const;

export const VISUALIZATION_COMPONENT_DEFINITIONS = {
  LineChart: {
    canonicalComponent: "LineChart",
    displayName: "Line Chart",
    family: "CHART",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: "line",
    intent: "Show change across an ordered dimension with one or more series.",
    states: CHART_DATA_STATES,
    accessibility: chartAccessibility,
    inputModalities: chartModalities,
    responsive: chartResponsive,
    tokenFamilies: chartTokens,
    layoutIntents: chartLayout,
    motionRoles: chartMotion,
    interaction: ["hover", "focus", "press", "selection"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: [
      "ordered labels, calculated series values, formatter, and business meaning",
      "selection, filtering, and export authorization",
    ],
    ten4sevenOwns: [
      "series identity, state grammar, token mapping, responsive presentation, and accessible fallback",
      "bounded SVG rendering and pointer/focus inspection behavior",
    ],
    ai: {
      ...commonChartAi,
      dataShape: ["ordered-series"],
      engineLevel: "L2-bounded-renderer",
    },
  },
  BarChart: {
    canonicalComponent: "BarChart",
    displayName: "Bar Chart",
    family: "CHART",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: "bar",
    intent: "Compare a small set of categorical magnitudes.",
    states: CHART_DATA_STATES,
    accessibility: chartAccessibility,
    inputModalities: chartModalities,
    responsive: chartResponsive,
    tokenFamilies: chartTokens,
    layoutIntents: chartLayout,
    motionRoles: chartMotion,
    interaction: ["hover", "focus", "press", "selection"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: [
      "categorical labels, calculated values, formatter, and business meaning",
      "selection, filtering, and export authorization",
    ],
    ten4sevenOwns: [
      "categorical identity, state grammar, token mapping, responsive presentation, and accessible fallback",
      "bounded SVG rendering and pointer/focus inspection behavior",
    ],
    ai: {
      ...commonChartAi,
      dataShape: ["categorical-values"],
      engineLevel: "L2-bounded-renderer",
    },
  },
  DonutChart: {
    canonicalComponent: "DonutChart",
    displayName: "Donut Chart",
    family: "CHART",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: "donut",
    intent: "Show a small whole-to-part distribution with an explicit total.",
    states: CHART_DATA_STATES,
    accessibility: chartAccessibility,
    inputModalities: chartModalities,
    responsive: ["reflow", "legend-below", "press-callout"] as const,
    tokenFamilies: chartTokens,
    layoutIntents: chartLayout,
    motionRoles: chartMotion,
    interaction: ["hover", "focus", "press", "selection"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: [
      "non-negative segment values, total meaning, formatter, and status labels",
      "selection, filtering, and export authorization",
    ],
    ten4sevenOwns: [
      "segment identity, state grammar, token mapping, responsive legend, and accessible fallback",
      "bounded SVG rendering and pointer/focus inspection behavior",
    ],
    ai: {
      ...commonChartAi,
      dataShape: ["whole-to-part"],
      engineLevel: "L2-bounded-renderer",
      performanceClass: "bounded-small",
      alternatives: ["BarChart", "DataTable"],
    },
  },
  Sparkline: {
    canonicalComponent: "Sparkline",
    displayName: "Sparkline",
    family: "CHART",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: "sparkline",
    intent:
      "Show a compact historical trend cue inside an existing metric surface.",
    states: CHART_DATA_STATES,
    accessibility: chartAccessibility,
    inputModalities: chartModalities,
    responsive: ["reflow", "press-callout"] as const,
    tokenFamilies: chartTokens,
    layoutIntents: [
      "measure-compact",
      "measure-content",
      "minimum-useful-surface",
      "density-adaptive",
    ] as const,
    motionRoles: chartMotion,
    interaction: ["hover", "focus", "press"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: ["ordered values, label, formatter, and business context"],
    ten4sevenOwns: [
      "compact geometry, state grammar, token mapping, motion, and keyboard point inspection",
      "the requirement for an accessible summary when detail is not visible",
    ],
    ai: {
      ...commonChartAi,
      dataShape: ["ordered-series"],
      engineLevel: "L2-bounded-renderer",
      performanceClass: "bounded-small",
      alternatives: ["LineChart", "TrendIndicator", "MetricCard"],
    },
  },
  TrendIndicator: {
    canonicalComponent: "TrendIndicator",
    displayName: "Trend Indicator",
    family: "VISUALIZATION_SUPPORT",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: null,
    intent:
      "Show a compact directional comparison without encoding business sentiment implicitly.",
    states: ["ready", "noData", "error"] as const,
    accessibility: ["accessible-name", "non-color-status"] as const,
    inputModalities: ["screenReader", "focus"] as const,
    responsive: ["reflow"] as const,
    tokenFamilies: ["color", "typography", "spacing", "motion"] as const,
    layoutIntents: ["measure-compact", "density-adaptive"] as const,
    motionRoles: ["state"] as const,
    interaction: ["none", "focus"],
    engineBoundary: "none",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: [
      "direction, value, comparison context, and sentiment meaning",
    ],
    ten4sevenOwns: ["text, icon, and non-color direction semantics"],
    ai: {
      ...commonChartAi,
      dataShape: ["bounded-progress"],
      engineLevel: "L2-bounded-renderer",
      performanceClass: "bounded-small",
      alternatives: ["MetricCard", "Sparkline"],
    },
  },
  ChartLegend: {
    canonicalComponent: "ChartLegend",
    displayName: "Chart Legend",
    family: "VISUALIZATION_SUPPORT",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    chartType: null,
    intent: "Identify series and their current visibility or semantic meaning.",
    states: ["ready", "noData", "filteredEmpty"] as const,
    accessibility: ["accessible-name", "non-color-status"] as const,
    inputModalities: ["screenReader", "focus", "touch"] as const,
    responsive: ["wrap-legend", "legend-below"] as const,
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "focus",
      "density",
    ] as const,
    layoutIntents: ["measure-content", "density-adaptive"] as const,
    motionRoles: ["state"] as const,
    interaction: ["none", "focus", "press", "selection"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: ["series labels, visibility policy, and semantic meaning"],
    ten4sevenOwns: ["stable identity, readable layout, and non-color labels"],
    ai: {
      ...commonChartAi,
      dataShape: ["ordered-series", "categorical-values"],
      engineLevel: "L2-bounded-renderer",
      performanceClass: "bounded-small",
      alternatives: ["DataTable", "List"],
    },
  },
  ChartPanel: {
    canonicalComponent: "ChartPanel",
    displayName: "Chart Panel",
    family: "VISUALIZATION_SUPPORT",
    classification: "COMPOSITE_BLOCK",
    inventoryStatus: "EXISTING_STABLE",
    chartType: null,
    intent:
      "Bound a chart with a readable heading, description, and shared surface.",
    states: CHART_DATA_STATES,
    accessibility: [
      "labelled-surface",
      "data-summary",
      "non-color-status",
    ] as const,
    inputModalities: chartModalities,
    responsive: ["reflow", "legend-below"] as const,
    tokenFamilies: [
      "color",
      "typography",
      "spacing",
      "radius",
      "focus",
      "motion",
      "measure",
    ] as const,
    layoutIntents: [
      "measure-content",
      "measure-wide",
      "minimum-useful-surface",
      "density-adaptive",
    ] as const,
    motionRoles: ["state", "reveal"] as const,
    interaction: ["none", "focus", "press"],
    engineBoundary: "renderer-implementation",
    engineLevel: "L2-bounded-renderer",
    consumerOwns: ["heading, description, chart data, and actions"],
    ten4sevenOwns: [
      "surface, measure, chart composition, and state presentation",
    ],
    ai: {
      ...commonChartAi,
      dataShape: ["ordered-series", "categorical-values", "whole-to-part"],
      platform: "ADAPTIVE",
      engineLevel: "L2-bounded-renderer",
      performanceClass: "bounded-medium",
      alternatives: ["Card", "DataTable"],
    },
  },
} as const satisfies Readonly<Record<string, VisualizationComponentDefinition>>;

export interface ResolvedVisualizationComponentContract extends VisualizationComponentDefinition {
  readonly canonicalId: string;
  readonly platform: TokenPlatform;
  readonly rendererStrategy: ComponentRendererStrategy;
  readonly web: RendererContract;
  readonly native: RendererContract;
  readonly nativeAlternative?: string;
  readonly webAlternative?: string;
}

export function resolveVisualizationComponentContract(
  name: string,
  component: ComponentPlatformContract,
): ResolvedVisualizationComponentContract | undefined {
  const definition = (
    VISUALIZATION_COMPONENT_DEFINITIONS as Readonly<
      Record<string, VisualizationComponentDefinition>
    >
  )[name];
  if (!definition) return undefined;
  return {
    ...definition,
    canonicalId: component.canonicalId,
    platform: component.platform,
    rendererStrategy: component.rendererStrategy,
    web: component.web,
    native: component.native,
    ...(component.nativeAlternative
      ? { nativeAlternative: component.nativeAlternative }
      : {}),
    ...(component.webAlternative
      ? { webAlternative: component.webAlternative }
      : {}),
  };
}

export function resolveVisualizationFromRegistry(
  name: string,
  entry: {
    readonly status: string;
    readonly category: string;
    readonly aliasOf?: string;
    readonly displayName?: string;
  },
  aliases: readonly string[] = [],
) {
  const platform = resolveComponentPlatformContract(name, entry, aliases);
  return resolveVisualizationComponentContract(name, platform);
}

export interface VisualizationGapDecision {
  readonly id: string;
  readonly classification: VisualizationClassification;
  readonly inventoryStatus: VisualizationInventoryStatus;
  readonly canonicalComponent?: string;
  readonly reason: string;
  readonly aiGuidance: string;
}

export const VISUALIZATION_GAP_DECISIONS = {
  AreaChart: {
    id: "AreaChart",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "LineChart",
    reason:
      "Area fill is a rendering mode of an ordered trend; the existing LineChart already owns the series, state, tooltip, and accessibility contract.",
    aiGuidance:
      "Use LineChart with an area presentation option when a bounded implementation exposes it; do not add AreaChart as another primitive.",
  },
  ColumnChart: {
    id: "ColumnChart",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "BarChart",
    reason:
      "Column orientation changes presentation, not categorical comparison intent.",
    aiGuidance:
      "Use BarChart with an orientation variant only after the renderer supports it; do not create a second API.",
  },
  PieChart: {
    id: "PieChart",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    canonicalComponent: "DonutChart",
    reason:
      "A pie is the same bounded whole-to-part contract without the center treatment.",
    aiGuidance:
      "Prefer DonutChart or a future presentation variant; do not create a duplicate distribution primitive.",
  },
  StackedBar: {
    id: "StackedBar",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    canonicalComponent: "BarChart",
    reason:
      "Part-to-whole stacking needs a deliberate series/axis/accessibility contract and must remain behind an approved renderer boundary.",
    aiGuidance:
      "Use BarChart only for the current bounded single-value contract; defer stacked rendering until an adapter is approved.",
  },
  Scatter: {
    id: "Scatter",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "Point density, axes, selection, and accessible alternatives require a chart engine contract.",
    aiGuidance:
      "Do not recreate a scatter engine in consumer code; use the future normalized adapter after engine, performance, and accessibility review.",
  },
  Bubble: {
    id: "Bubble",
    classification: "DEFERRED",
    inventoryStatus: "DEFERRED",
    reason:
      "Magnitude encoded by area needs a tested scale, labels, collision strategy, and non-visual alternative.",
    aiGuidance:
      "Defer Bubble until the advanced visualization adapter and data-list alternative are proven.",
  },
  Radar: {
    id: "Radar",
    classification: "DEFERRED",
    inventoryStatus: "DEFERRED",
    reason:
      "Radial axes and dense labels are not justified by the current bounded chart renderer.",
    aiGuidance:
      "Prefer a table or grouped BarChart until a specific advanced adapter is approved.",
  },
  Gauge: {
    id: "Gauge",
    classification: "DEFERRED",
    inventoryStatus: "DEFERRED",
    reason:
      "A gauge needs explicit bounds, target meaning, status semantics, and a textual value; it is not a decorative progress ring.",
    aiGuidance:
      "Use Progress or MetricCard for current bounded signals; defer Gauge until its semantic contract is approved.",
  },
  Heatmap: {
    id: "Heatmap",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "A matrix intensity surface needs scale, missing-cell, keyboard, contrast, and large-data behavior behind an adapter.",
    aiGuidance:
      "Do not use arbitrary gradients or hardcoded cells; defer to an approved heatmap adapter with a table alternative.",
  },
  ComboChart: {
    id: "ComboChart",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    reason:
      "Mixed series and multiple axes materially increase scale, legend, and accessibility complexity.",
    aiGuidance:
      "Prefer separate bounded charts or a future normalized combo adapter; never hide multiple business units in a consumer-local chart.",
  },
  SalesLineChart: {
    id: "SalesLineChart",
    classification: "REJECTED_DUPLICATE",
    inventoryStatus: "REJECTED_DUPLICATE",
    canonicalComponent: "LineChart",
    reason: "Business subject does not create a new chart primitive.",
    aiGuidance:
      "Use LineChart and keep sales data, calculation, and labeling in the consumer recipe.",
  },
  FarmBarChart: {
    id: "FarmBarChart",
    classification: "REJECTED_DUPLICATE",
    inventoryStatus: "REJECTED_DUPLICATE",
    canonicalComponent: "BarChart",
    reason:
      "Farm is a product profile/domain composition, not a chart renderer.",
    aiGuidance:
      "Use BarChart inside the Farm recipe; do not add a Farm-specific chart component.",
  },
  RevenueDonut: {
    id: "RevenueDonut",
    classification: "REJECTED_DUPLICATE",
    inventoryStatus: "REJECTED_DUPLICATE",
    canonicalComponent: "DonutChart",
    reason:
      "Revenue meaning belongs to consumer data and profile composition, not a new visual primitive.",
    aiGuidance:
      "Use DonutChart with consumer-owned currency formatting and accessible summary.",
  },
  ChartTooltip: {
    id: "ChartTooltip",
    classification: "UTILITY_OR_PROVIDER",
    inventoryStatus: "MISSING_CANONICAL",
    canonicalComponent: "ChartLegend",
    reason:
      "Tooltip behavior is a chart support contract and should remain shared with overlay positioning, not a donor API.",
    aiGuidance:
      "Use the chart's shared tooltip behavior; future public tooltip exports must be normalized through Ten4Seven.",
  },
  ChartToolbar: {
    id: "ChartToolbar",
    classification: "UTILITY_OR_PROVIDER",
    inventoryStatus: "DEFERRED",
    reason:
      "Export, zoom, and filter controls need consumer authorization and an explicit interaction contract.",
    aiGuidance:
      "Compose existing Toolbar and actions when needed; do not add chart-specific controls until the behavior is bounded.",
  },
  DataLabel: {
    id: "DataLabel",
    classification: "UTILITY_OR_PROVIDER",
    inventoryStatus: "DEFERRED",
    reason:
      "Labels are an annotation policy that must not collide or duplicate the accessible summary.",
    aiGuidance:
      "Prefer formatter, legend, tooltip, or data-list alternatives until an engine adapter owns label placement.",
  },
} as const satisfies Readonly<Record<string, VisualizationGapDecision>>;

export const SCHEDULER_VIEWS = Object.freeze([
  "month",
  "week",
  "day",
  "agenda",
  "timeGrid",
  "resource",
  "timeline",
  "availability",
] as const);
export type SchedulerView = (typeof SCHEDULER_VIEWS)[number];

export const SCHEDULER_STATES = Object.freeze([
  "ready",
  "loading",
  "empty",
  "error",
  "permissionDenied",
  "partial",
  "selected",
  "disabled",
] as const);
export type SchedulerState = (typeof SCHEDULER_STATES)[number];

export const SCHEDULER_RESPONSIVE_STRATEGIES = Object.freeze([
  "month-to-agenda",
  "week-to-day",
  "resource-to-agenda",
  "time-grid-when-justified",
  "event-detail-sheet",
  "bounded-horizontal-scroll",
] as const);
export type SchedulerResponsiveStrategy =
  (typeof SCHEDULER_RESPONSIVE_STRATEGIES)[number];

export interface SchedulerEventContract {
  readonly id: string;
  readonly title: string;
  readonly start: string;
  readonly end: string;
  readonly allDay?: boolean;
  readonly status?: string;
  readonly category?: string;
  readonly resource?: string;
  readonly description?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SchedulerTaxonomyEntry {
  readonly id: string;
  readonly kind: "date-selection" | "scheduler" | "support";
  readonly classification: VisualizationClassification;
  readonly inventoryStatus: VisualizationInventoryStatus;
  readonly platform: TokenPlatform;
  readonly nativeStrategy: NativeTokenStrategy;
  readonly view: SchedulerView | null;
  readonly purpose: string;
  readonly states: readonly SchedulerState[];
  readonly responsive: readonly SchedulerResponsiveStrategy[];
  readonly engineBoundary: EngineBoundary;
  readonly systemOwns: readonly string[];
  readonly consumerOwns: readonly string[];
  readonly accessibility: readonly string[];
}

const schedulerAccessibility = [
  "named scheduling region",
  "view and date-range announcement",
  "event title and time text",
  "keyboard date/view navigation",
  "selected and disabled state",
  "list or detail alternative when grid interaction is unavailable",
] as const;

const schedulerStates = SCHEDULER_STATES;
const schedulerResponsive = SCHEDULER_RESPONSIVE_STRATEGIES;

export const SCHEDULER_TAXONOMY = {
  Calendar: {
    id: "Calendar",
    kind: "date-selection",
    classification: "CANONICAL_COMPONENT",
    inventoryStatus: "EXISTING_STABLE",
    platform: "BOTH",
    nativeStrategy: "NATIVE_RENDERER",
    view: "month",
    purpose: "Select or inspect dates in a keyboard-addressable month grid.",
    states: [
      "ready",
      "empty",
      "loading",
      "error",
      "selected",
      "disabled",
    ] as const,
    responsive: ["event-detail-sheet"] as const,
    engineBoundary: "renderer-implementation",
    systemOwns: [
      "date-grid semantics, focus movement, month navigation, and min/max presentation",
    ],
    consumerOwns: [
      "selected date, range meaning, locale, timezone policy, and persistence",
    ],
    accessibility: [
      "named date grid",
      "selected date",
      "keyboard grid navigation",
      "disabled date state",
    ] as const,
  },
  Scheduler: {
    id: "Scheduler",
    kind: "scheduler",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "timeGrid",
    purpose:
      "Coordinate events across time, views, and optional resources behind an approved engine adapter.",
    states: schedulerStates,
    responsive: schedulerResponsive,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "generic event presentation, view/date navigation contract, state grammar, responsive intent, and accessibility obligations",
    ],
    consumerOwns: [
      "event truth, permissions, availability, conflict policy, booking, persistence, and timezone decisions",
    ],
    accessibility: schedulerAccessibility,
  },
  MonthView: {
    id: "MonthView",
    kind: "scheduler",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "month",
    purpose:
      "Month presentation mode for a scheduler, not a second calendar engine.",
    states: schedulerStates,
    responsive: ["month-to-agenda", "event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: ["view semantics and event summary presentation"],
    consumerOwns: ["event data and date policy"],
    accessibility: schedulerAccessibility,
  },
  WeekView: {
    id: "WeekView",
    kind: "scheduler",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "week",
    purpose:
      "Week presentation mode for a scheduler, with a mobile day/agenda alternative.",
    states: schedulerStates,
    responsive: ["week-to-day", "event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "view semantics, responsive reduction, and event summary presentation",
    ],
    consumerOwns: ["event data and timezone policy"],
    accessibility: schedulerAccessibility,
  },
  DayView: {
    id: "DayView",
    kind: "scheduler",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "day",
    purpose: "Day presentation mode for a scheduler or native task surface.",
    states: schedulerStates,
    responsive: ["event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: ["time ordering, event summary, and focus contract"],
    consumerOwns: ["event truth and actions"],
    accessibility: schedulerAccessibility,
  },
  Agenda: {
    id: "Agenda",
    kind: "scheduler",
    classification: "ADAPTIVE",
    inventoryStatus: "DEFERRED",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "agenda",
    purpose:
      "Ordered event list alternative when a grid is too dense or unavailable.",
    states: schedulerStates,
    responsive: [
      "month-to-agenda",
      "resource-to-agenda",
      "event-detail-sheet",
    ] as const,
    engineBoundary: "renderer-implementation",
    systemOwns: [
      "ordered event semantics, date grouping, state presentation, and focus/press behavior",
    ],
    consumerOwns: ["event data, actions, filtering, and permissions"],
    accessibility: [
      "named ordered event list",
      "event title/time/status",
      "empty/loading/error announcement",
    ] as const,
  },
  TimeGrid: {
    id: "TimeGrid",
    kind: "scheduler",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "WEB",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "timeGrid",
    purpose:
      "Dense time-slot placement for desktop Web when the task justifies it.",
    states: schedulerStates,
    responsive: [
      "week-to-day",
      "time-grid-when-justified",
      "event-detail-sheet",
    ] as const,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "slot and event semantics, labels, states, and alternate pattern",
    ],
    consumerOwns: [
      "event truth, drag/resize authorization, conflicts, and timezone policy",
    ],
    accessibility: schedulerAccessibility,
  },
  ResourceScheduler: {
    id: "ResourceScheduler",
    kind: "scheduler",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "resource",
    purpose:
      "Coordinate events across named resources without shrinking a dense resource grid onto a phone.",
    states: schedulerStates,
    responsive: ["resource-to-agenda", "event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "resource identity, event semantics, responsive alternative, and accessibility contract",
    ],
    consumerOwns: [
      "resource data, availability, permissions, conflicts, and persistence",
    ],
    accessibility: schedulerAccessibility,
  },
  TimelineScheduler: {
    id: "TimelineScheduler",
    kind: "scheduler",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "timeline",
    purpose:
      "Coordinate long-running events on an ordered timeline behind an approved engine.",
    states: schedulerStates,
    responsive: ["resource-to-agenda", "event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "event ordering, labels, state grammar, and alternate list/detail presentation",
    ],
    consumerOwns: ["event truth, grouping, dependencies, and persistence"],
    accessibility: schedulerAccessibility,
  },
  Availability: {
    id: "Availability",
    kind: "scheduler",
    classification: "ADAPTIVE",
    inventoryStatus: "DEFERRED",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    view: "availability",
    purpose:
      "Present consumer-calculated available or unavailable windows; it does not calculate booking policy.",
    states: schedulerStates,
    responsive: ["month-to-agenda", "event-detail-sheet"] as const,
    engineBoundary: "consumer-engine",
    systemOwns: [
      "window presentation, selection states, and accessible explanation",
    ],
    consumerOwns: [
      "availability truth, permissions, booking, conflicts, and timezones",
    ],
    accessibility: schedulerAccessibility,
  },
  EventCard: {
    id: "EventCard",
    kind: "support",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "DEFERRED",
    platform: "BOTH",
    nativeStrategy: "NATIVE_RENDERER",
    view: null,
    purpose:
      "Generic event summary used by scheduler views and agenda alternatives.",
    states: schedulerStates,
    responsive: ["event-detail-sheet"] as const,
    engineBoundary: "renderer-implementation",
    systemOwns: [
      "generic event anatomy, state, and accessible time/status text",
    ],
    consumerOwns: ["domain meaning, actions, and metadata"],
    accessibility: [
      "event title",
      "explicit start/end",
      "status text",
      "action labels",
    ] as const,
  },
} as const satisfies Readonly<Record<string, SchedulerTaxonomyEntry>>;

export const SCHEDULER_OWNERSHIP = {
  system: [
    "generic event shape and presentation semantics",
    "view/date navigation vocabulary",
    "loading, empty, error, partial, selected, and disabled states",
    "responsive reduction from grid to agenda/day/detail",
    "keyboard/focus/press obligations and reduced-motion behavior",
  ],
  consumer: [
    "event truth, fetching, and business calculations",
    "permissions, availability, conflicts, booking, and persistence",
    "stored timezone, business timezone, display timezone, and locale policy",
    "drag/resize authorization and DnD mutation semantics",
  ],
  renderer: [
    "DOM or native primitives",
    "slot placement, overlap measurement, and virtualization behind an approved engine",
    "popup versus sheet/detail presentation",
  ],
} as const;

export const SCHEDULER_TIME_BOUNDARY = {
  storedValue: "consumer-defined canonical instant or local business value",
  businessTimezone: "consumer-defined and explicit",
  displayTimezone: "consumer-defined and explicit",
  locale: "consumer-defined and explicit",
  silentConversion: false,
  note: "A renderer must not silently convert or relabel event times across timezones.",
} as const;

export const MAP_PRIMITIVES = Object.freeze([
  "Map",
  "Marker",
  "Cluster",
  "Popup",
  "Polyline",
  "Polygon",
  "Circle",
  "Heatmap",
  "GeoLayer",
  "LocationPicker",
  "MapControls",
  "MapLegend",
] as const);
export type MapPrimitive = (typeof MAP_PRIMITIVES)[number];

export interface MapTaxonomyEntry {
  readonly id: MapPrimitive;
  readonly classification: VisualizationClassification;
  readonly inventoryStatus: VisualizationInventoryStatus;
  readonly platform: TokenPlatform;
  readonly nativeStrategy: NativeTokenStrategy;
  readonly purpose: string;
  readonly engineBoundary: EngineBoundary;
  readonly systemOwns: readonly string[];
  readonly consumerOwns: readonly string[];
  readonly accessibility: readonly string[];
  readonly responsive: readonly string[];
}

const mapAccessibility = [
  "named map region",
  "marker/list alternative",
  "selected location text",
  "keyboard focus for available markers or list items",
  "visible status text for loading, error, unavailable, and selected states",
] as const;

export const MAP_TAXONOMY = {
  Map: {
    id: "Map",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Render a provider-backed geospatial surface behind a normalized Ten4Seven adapter.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "semantic map surface, overlay states, responsive map/list strategy, and accessibility alternative",
    ],
    consumerOwns: [
      "coordinates, provider choice, permissions, geocoding, route truth, and business geography",
    ],
    accessibility: mapAccessibility,
    responsive: [
      "desktop map plus detail panel",
      "mobile major map surface plus sheet/list",
      "preserve list alternative",
    ],
  },
  Marker: {
    id: "Marker",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose: "Represent one consumer-supplied coordinate or place identity.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "marker identity, selected/status presentation, label, and focus contract",
    ],
    consumerOwns: ["coordinate truth, title, status meaning, and actions"],
    accessibility: mapAccessibility,
    responsive: [
      "marker plus list alternative",
      "selected marker detail sheet",
    ],
  },
  Cluster: {
    id: "Cluster",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Group nearby points when density requires provider or engine support.",
    engineBoundary: "consumer-engine",
    systemOwns: ["cluster count label, selected state, and list alternative"],
    consumerOwns: ["point data and cluster selection meaning"],
    accessibility: mapAccessibility,
    responsive: [
      "cluster plus list",
      "press cluster to zoom or list according to adapter capability",
    ],
  },
  Popup: {
    id: "Popup",
    classification: "COMPONENT_VARIANT",
    inventoryStatus: "VARIANT",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    purpose:
      "Present selected map context using the shared overlay contract or a native sheet.",
    engineBoundary: "renderer-implementation",
    systemOwns: [
      "accessible selected context, dismissal, focus/press feedback, and responsive presentation",
    ],
    consumerOwns: ["content, actions, and selected item meaning"],
    accessibility: mapAccessibility,
    responsive: ["desktop popup", "mobile bottom sheet or detail surface"],
  },
  Polyline: {
    id: "Polyline",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose: "Show a consumer-supplied ordered path or route geometry.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "semantic line style, selected/status treatment, and textual route alternative",
    ],
    consumerOwns: ["coordinates, route meaning, distance, and ETA truth"],
    accessibility: mapAccessibility,
    responsive: [
      "map plus ordered route list",
      "preserve text route when map unavailable",
    ],
  },
  Polygon: {
    id: "Polygon",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose: "Show a consumer-supplied bounded area or boundary.",
    engineBoundary: "consumer-engine",
    systemOwns: ["semantic fill/border and selected/status presentation"],
    consumerOwns: ["geometry, area meaning, and validation"],
    accessibility: mapAccessibility,
    responsive: ["map plus area summary/list"],
  },
  Circle: {
    id: "Circle",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose: "Show a consumer-supplied radius or bounded area.",
    engineBoundary: "consumer-engine",
    systemOwns: ["semantic area treatment and readable radius text"],
    consumerOwns: ["center, radius, units, and business meaning"],
    accessibility: mapAccessibility,
    responsive: ["map plus area summary/list"],
  },
  Heatmap: {
    id: "Heatmap",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Show provider/engine-backed spatial intensity with a non-color alternative.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "sequential/diverging token intent, legend, no-data state, and table/list alternative",
    ],
    consumerOwns: ["values, scale meaning, thresholds, and privacy policy"],
    accessibility: mapAccessibility,
    responsive: ["map plus legend/list", "preserve tabular summary"],
  },
  GeoLayer: {
    id: "GeoLayer",
    classification: "ENGINE_ADAPTER",
    inventoryStatus: "ENGINE_ADAPTER",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Represent a provider-backed base or data layer without exposing provider objects.",
    engineBoundary: "consumer-engine",
    systemOwns: ["layer visibility, status, legend, and semantic token intent"],
    consumerOwns: ["source data, provider configuration, and entitlements"],
    accessibility: mapAccessibility,
    responsive: ["preserve active layer explanation"],
  },
  LocationPicker: {
    id: "LocationPicker",
    classification: "ADAPTIVE",
    inventoryStatus: "DEFERRED",
    platform: "ADAPTIVE",
    nativeStrategy: "ALTERNATE_PATTERN",
    purpose:
      "Select a location with map, search, or native picker presentation when a consumer location contract exists.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "coordinate field semantics, selected state, error/loading/unavailable presentation, and mobile sheet strategy",
    ],
    consumerOwns: [
      "GPS permission, picker truth, reverse geocoding, validation, and persistence",
    ],
    accessibility: mapAccessibility,
    responsive: [
      "desktop map plus search/detail",
      "mobile fullscreen map plus sheet/list",
    ],
  },
  MapControls: {
    id: "MapControls",
    classification: "UTILITY_OR_PROVIDER",
    inventoryStatus: "DEFERRED",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Expose only approved map capabilities such as zoom, recenter, or layer selection.",
    engineBoundary: "consumer-engine",
    systemOwns: [
      "button labels, touch targets, focus/press feedback, and capability disclosure",
    ],
    consumerOwns: ["authorization and available provider capabilities"],
    accessibility: mapAccessibility,
    responsive: ["touch-safe control grouping", "native control placement"],
  },
  MapLegend: {
    id: "MapLegend",
    classification: "UTILITY_OR_PROVIDER",
    inventoryStatus: "DEFERRED",
    platform: "ADAPTIVE",
    nativeStrategy: "NATIVE_RENDERER",
    purpose:
      "Explain categorical, semantic, sequential, or diverging map encodings.",
    engineBoundary: "renderer-implementation",
    systemOwns: [
      "token mapping, labels, non-color explanation, and responsive placement",
    ],
    consumerOwns: ["data meaning, labels, and visibility policy"],
    accessibility: mapAccessibility,
    responsive: ["side legend on desktop", "sheet/list explanation on mobile"],
  },
} as const satisfies Readonly<Record<MapPrimitive, MapTaxonomyEntry>>;

export const MAP_OWNERSHIP = {
  system: [
    "normalized coordinate and overlay vocabulary",
    "marker/cluster/selection/status presentation",
    "responsive map/list/detail strategy",
    "accessibility alternative and token mapping",
  ],
  consumer: [
    "coordinates, geocoding, route and geography truth",
    "provider selection, API keys, entitlements, and licensing",
    "GPS/location permission, privacy, persistence, and business validation",
  ],
  renderer: [
    "tiles, projections, gestures, clustering, hit testing, and native/Web engine integration",
  ],
} as const;

export interface VisualizationEngineAdapterDecision {
  readonly id: string;
  readonly status: "existing" | "deferred";
  readonly capability: string;
  readonly dependency: string;
  readonly license: string;
  readonly bundleImplication: string;
  readonly platform: TokenPlatform;
  readonly isolationBoundary: string;
  readonly vendorApiPolicy: string;
}

/** Existing bounded renderer plus explicit future boundaries; no heavy package is added in U08. */
export const VISUALIZATION_ENGINE_ADAPTERS = {
  "t7-svg-charts": {
    id: "t7-svg-charts",
    status: "existing",
    capability:
      "bounded LineChart, BarChart, DonutChart, Sparkline, legend, tooltip, and lifecycle states",
    dependency: "packages/ui/src/charts.tsx and packages/tokens/src/theme.ts",
    license: "repository-owned Ten4Seven implementation",
    bundleImplication:
      "already included in the existing @ten4seven/ui Web bundle; U08 adds no chart dependency",
    platform: "WEB",
    isolationBoundary:
      "renderer implementation behind semantic chart props; consumers pass data and formatters only",
    vendorApiPolicy:
      "No vendor API is exposed; engineOptions is not accepted by the current bounded renderer.",
  },
  "native-chart-renderer": {
    id: "native-chart-renderer",
    status: "deferred",
    capability:
      "native chart rendering from the shared series/state/token intent with press callouts and data-list alternative",
    dependency:
      "future native consumer or approved native chart engine; none selected in U08",
    license: "not assessed until a concrete engine is proposed",
    bundleImplication:
      "must be lazy/optional for native consumers and must not inflate @ten4seven/ui Web consumers",
    platform: "NATIVE",
    isolationBoundary:
      "@ten4seven/native descriptor/projection boundary; no React Native component is created in U08",
    vendorApiPolicy:
      "Any future engineOptions stays inside the adapter and is never part of the Ten4Seven semantic contract.",
  },
  "scheduler-engine-adapter": {
    id: "scheduler-engine-adapter",
    status: "deferred",
    capability:
      "event placement, overlap, resource headers, time grids, navigation, and optional drag/resize support",
    dependency:
      "no scheduler dependency selected; current Calendar remains a date-selection renderer",
    license: "not assessed until a concrete engine is proposed",
    bundleImplication:
      "must be a lazy optional boundary; no scheduler code is added to the current UI package in U08",
    platform: "ADAPTIVE",
    isolationBoundary:
      "normalized scheduler event/view/state contract with consumer-owned truth and timezone policy",
    vendorApiPolicy:
      "No FullCalendar, donor, or provider API is canonical; adapter-only options remain private to a future engine wrapper.",
  },
  "map-engine-adapter": {
    id: "map-engine-adapter",
    status: "deferred",
    capability:
      "tiles, projection, markers, clustering, routes, polygons, heatmaps, and provider controls",
    dependency:
      "no map dependency selected; no production geolocation or provider integration in U08",
    license:
      "not assessed until provider, tiles, privacy, and licensing are approved",
    bundleImplication:
      "must be lazy/optional and provider-isolated; no map dependency is added to Web or native packages in U08",
    platform: "ADAPTIVE",
    isolationBoundary:
      "normalized map overlays/coordinates plus list alternative; provider objects never cross the contract plane",
    vendorApiPolicy:
      "No Mapbox, Leaflet, MapLibre, or provider object/API is canonical; provider options remain inside a future adapter.",
  },
} as const satisfies Readonly<
  Record<string, VisualizationEngineAdapterDecision>
>;

export interface NativeVisualizationCanary {
  readonly id: "chart" | "scheduler" | "map";
  readonly sourceContract: string;
  readonly presentation: string;
  readonly strategy: NativeTokenStrategy;
  readonly states: readonly string[];
  readonly semanticInputs: readonly string[];
  readonly adaptiveStrategy: readonly string[];
  readonly accessibilityAlternative: string;
  readonly performanceClass: VisualizationPerformanceClass;
  readonly consumerOwns: readonly string[];
}

export const NATIVE_VISUALIZATION_CANARY = {
  chart: {
    id: "chart",
    sourceContract:
      "LineChart/BarChart/DonutChart/Sparkline semantic series and chart state contract",
    presentation: "native-visualization",
    strategy: "NATIVE_RENDERER",
    states: CHART_DATA_STATES,
    semanticInputs: [
      "series identity and values",
      "formatter intent",
      "categorical versus semantic color intent",
      "annotations and threshold meaning",
      "loading/noData/filteredEmpty/partialData/error",
    ],
    adaptiveStrategy: [
      "native chart renderer",
      "press/selection callout",
      "data-list alternative",
    ],
    accessibilityAlternative:
      "Native chart summary plus an ordered data list or table when point-level inspection is required.",
    performanceClass: "bounded-medium",
    consumerOwns: [
      "calculated values, business meaning, selection, and export policy",
    ],
  },
  scheduler: {
    id: "scheduler",
    sourceContract: "Scheduler event/view/timezone ownership contract",
    presentation: "native-agenda-or-day-detail",
    strategy: "ALTERNATE_PATTERN",
    states: SCHEDULER_STATES,
    semanticInputs: [
      "generic event fields",
      "selected date/view",
      "explicit display timezone",
      "availability/status text",
    ],
    adaptiveStrategy: [
      "agenda list",
      "day detail",
      "event sheet",
      "native navigation",
    ],
    accessibilityAlternative:
      "Ordered agenda with event title, explicit start/end, status, resource, and action labels.",
    performanceClass: "bounded-medium",
    consumerOwns: [
      "event truth, permissions, availability, conflicts, booking, persistence, and timezone policy",
    ],
  },
  map: {
    id: "map",
    sourceContract: "Map coordinate/overlay/selection contract",
    presentation: "native-map-with-list-detail-alternative",
    strategy: "NATIVE_RENDERER",
    states: [
      "ready",
      "loading",
      "empty",
      "error",
      "permissionDenied",
      "selected",
      "disabled",
    ],
    semanticInputs: [
      "coordinates",
      "marker/cluster/route/area intent",
      "selected/status state",
      "legend and accessible summary",
    ],
    adaptiveStrategy: [
      "native map surface",
      "selected-item sheet",
      "ordered marker/list alternative",
    ],
    accessibilityAlternative:
      "Named map region with a synchronized accessible marker or route list; selected locations are stated in text.",
    performanceClass: "large-windowed",
    consumerOwns: [
      "coordinates, provider, permissions, geocoding, route truth, privacy, and business geography",
    ],
  },
} as const satisfies Readonly<Record<string, NativeVisualizationCanary>>;

export interface VisualizationPlane {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "visualization-scheduling-maps";
  readonly sourceOfTruth: "packages/contracts/src/visualization.ts";
  readonly platformSourceOfTruth: "packages/contracts/src/component-platform.ts";
  readonly tokenSourceOfTruth: "packages/tokens/src/theme.ts and packages/contracts/src/foundation.ts";
  readonly taxonomy: {
    readonly families: typeof VISUALIZATION_FAMILIES;
    readonly classifications: typeof VISUALIZATION_CLASSIFICATIONS;
    readonly inventoryStatuses: typeof VISUALIZATION_INVENTORY_STATUSES;
    readonly chartTypes: typeof CHART_TYPES;
    readonly chartDataShapes: typeof CHART_DATA_SHAPES;
    readonly chartStates: typeof CHART_DATA_STATES;
    readonly chartColorSemantics: typeof CHART_COLOR_SEMANTICS;
    readonly chartFormatIntents: typeof CHART_FORMAT_INTENTS;
    readonly schedulerViews: typeof SCHEDULER_VIEWS;
    readonly schedulerStates: typeof SCHEDULER_STATES;
    readonly mapPrimitives: typeof MAP_PRIMITIVES;
  };
  readonly ownership: {
    readonly visualization: {
      readonly system: readonly string[];
      readonly consumer: readonly string[];
      readonly renderer: readonly string[];
    };
    readonly scheduler: typeof SCHEDULER_OWNERSHIP;
    readonly map: typeof MAP_OWNERSHIP;
  };
  readonly tokenMapping: typeof VISUALIZATION_TOKEN_MAPPING;
  readonly components: typeof VISUALIZATION_COMPONENT_DEFINITIONS;
  readonly scheduler: typeof SCHEDULER_TAXONOMY;
  readonly maps: typeof MAP_TAXONOMY;
  readonly gapDecisions: typeof VISUALIZATION_GAP_DECISIONS;
  readonly engineAdapters: typeof VISUALIZATION_ENGINE_ADAPTERS;
  readonly nativeCanary: typeof NATIVE_VISUALIZATION_CANARY;
  readonly timezone: typeof SCHEDULER_TIME_BOUNDARY;
  readonly compatibility: readonly string[];
}

export const VISUALIZATION_SCHEDULING_MAPS_PLANE = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "visualization-scheduling-maps",
  sourceOfTruth: "packages/contracts/src/visualization.ts",
  platformSourceOfTruth: "packages/contracts/src/component-platform.ts",
  tokenSourceOfTruth:
    "packages/tokens/src/theme.ts and packages/contracts/src/foundation.ts",
  taxonomy: {
    families: VISUALIZATION_FAMILIES,
    classifications: VISUALIZATION_CLASSIFICATIONS,
    inventoryStatuses: VISUALIZATION_INVENTORY_STATUSES,
    chartTypes: CHART_TYPES,
    chartDataShapes: CHART_DATA_SHAPES,
    chartStates: CHART_DATA_STATES,
    chartColorSemantics: CHART_COLOR_SEMANTICS,
    chartFormatIntents: CHART_FORMAT_INTENTS,
    schedulerViews: SCHEDULER_VIEWS,
    schedulerStates: SCHEDULER_STATES,
    mapPrimitives: MAP_PRIMITIVES,
  },
  ownership: {
    visualization: {
      system: [
        "semantic chart intent, series identity, state grammar, responsive strategy, token mapping, and accessibility obligations",
        "annotation representation, tooltip/legend contract, and renderer-neutral performance boundary",
      ],
      consumer: [
        "data fetching, calculations, formatting meaning, permissions, filters, selection, and export authorization",
      ],
      renderer: [
        "DOM/native primitives, drawing engine, geometry, hit testing, and platform-specific popup/callout presentation",
      ],
    },
    scheduler: SCHEDULER_OWNERSHIP,
    map: MAP_OWNERSHIP,
  },
  tokenMapping: VISUALIZATION_TOKEN_MAPPING,
  components: VISUALIZATION_COMPONENT_DEFINITIONS,
  scheduler: SCHEDULER_TAXONOMY,
  maps: MAP_TAXONOMY,
  gapDecisions: VISUALIZATION_GAP_DECISIONS,
  engineAdapters: VISUALIZATION_ENGINE_ADAPTERS,
  nativeCanary: NATIVE_VISUALIZATION_CANARY,
  timezone: SCHEDULER_TIME_BOUNDARY,
  compatibility: [
    "LineChart, BarChart, DonutChart, and Sparkline remain the existing bounded chart family; variants do not increase canonical component count.",
    "Calendar and DatePicker remain date-selection contracts and are not Scheduler implementations.",
    "ActivityFeed and Timeline remain chronological narrative display; they are not TimelineScheduler or event-placement engines.",
    "No domain-specific SalesLineChart, FarmBarChart, RevenueDonut, CustomerMap, DeliveryMap, or FarmMap component is permitted.",
    "Missing data is not zero: null/undefined/invalid values remain distinguishable from a present zero and may resolve to partialData.",
    "Web may project the same roles to CSS variables; native consumes resolved typed values and canary metadata without parsing CSS.",
    "No Recharts, ECharts, FullCalendar, Mapbox, Leaflet, MapLibre, or other donor/provider API is exposed by this contract.",
    "U08 adds no heavy visualization, scheduler, map, native UI, geolocation, or DnD dependency.",
  ],
} as const satisfies VisualizationPlane;
