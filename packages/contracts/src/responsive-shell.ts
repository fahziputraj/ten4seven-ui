import type { ContractOwnership } from "./types.ts";
import { CONTRACT_SCHEMA_VERSION } from "./types.ts";

/**
 * The viewport bands shared by the AppShell and the component contracts.
 * Breakpoints are intentionally authored once here and mirrored by the CSS
 * contract tests; consumer routes do not invent their own shell thresholds.
 */
export const RESPONSIVE_VIEWPORTS = {
  desktop: {
    id: "desktop",
    label: "Desktop",
    minWidth: 861,
    maxWidth: null,
  },
  tablet: {
    id: "tablet",
    label: "Tablet",
    minWidth: 541,
    maxWidth: 860,
  },
  mobile: {
    id: "mobile",
    label: "Mobile",
    minWidth: null,
    maxWidth: 540,
  },
} as const;

export type ResponsiveViewportId = keyof typeof RESPONSIVE_VIEWPORTS;

export type ResponsivePresentationMode =
  | "persistent-sidebar"
  | "collapsed-sidebar"
  | "navigation-drawer"
  | "inline"
  | "wrap"
  | "stack"
  | "table"
  | "table-scroll"
  | "stacked-records"
  | "split"
  | "single-column"
  | "drawer"
  | "priority-order";

export type ResponsiveOverflowStrategy =
  | "bounded"
  | "bounded-horizontal-scroll"
  | "stacked-projection"
  | "wrap"
  | "drawer"
  | "page-scroll";

export type ResponsivePriorityStrategy =
  "preserve-order" | "actions-last" | "primary-first" | "consumer-declared";

export interface ResponsiveViewportBehavior {
  readonly mode: ResponsivePresentationMode;
  readonly overflow: ResponsiveOverflowStrategy;
  readonly priority: ResponsivePriorityStrategy;
  readonly focusOrder: readonly string[];
  readonly notes: string;
}

export interface ResponsiveComponentBehaviorContract {
  readonly id: string;
  readonly displayName: string;
  readonly appliesTo: readonly string[];
  readonly touchTargetToken: "--t7-touch-target-min";
  readonly desktop: ResponsiveViewportBehavior;
  readonly tablet: ResponsiveViewportBehavior;
  readonly mobile: ResponsiveViewportBehavior;
  readonly consumerChoice: string;
}

export interface ResponsiveRecipeBinding {
  readonly shell: "app-shell-responsive";
  readonly behaviorIds: readonly string[];
  readonly note: string;
}

export interface ResponsiveShellContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "app-shell-responsive";
  readonly grammar: readonly [
    "AppShell",
    "navigation/context",
    "PageHeader",
    "bounded route content",
  ];
  readonly viewportBands: typeof RESPONSIVE_VIEWPORTS;
  readonly tokens: {
    readonly contentMax: "--t7-content-max";
    readonly pageGutter: "--t7-page-gutter";
    readonly safeArea: readonly [
      "--t7-safe-area-top",
      "--t7-safe-area-right",
      "--t7-safe-area-bottom",
      "--t7-safe-area-left",
    ];
    readonly sidebarWidth: "--t7-sidebar-width";
    readonly headerHeight: "--t7-header-height";
    readonly touchTargetMin: "--t7-touch-target-min";
    readonly density: "--t7-density";
  };
  readonly slots: {
    readonly navigation: "sidebar | collapsed sidebar | navigation drawer";
    readonly context: "tenant/resource context supplied by the consumer";
    readonly pageHeader: "title, description, metadata, and primary actions";
    readonly secondaryActions: "toolbar, overflow menu, or drawer actions";
    readonly stickyRegions: "header or action footer, when the route declares one";
    readonly routeContent: "bounded tables, filters, forms, cards, or detail";
  };
  readonly desktop: {
    readonly navigation: "persistent-sidebar";
    readonly context: "header-context";
    readonly actions: "page-header-end";
    readonly content: "bounded";
    readonly density: "theme-selected";
    readonly focusOrder: readonly string[];
  };
  readonly tablet: {
    readonly navigation: "collapsed-sidebar";
    readonly context: "header-context";
    readonly actions: "page-header-end-or-wrap";
    readonly content: "bounded";
    readonly density: "theme-selected";
    readonly focusOrder: readonly string[];
  };
  readonly mobile: {
    readonly navigation: "navigation-drawer";
    readonly context: "header-context";
    readonly actions: "primary-first-then-overflow";
    readonly content: "bounded";
    readonly density: "theme-selected";
    readonly focusOrder: readonly string[];
  };
  readonly overflow: {
    readonly page: "no-horizontal-page-overflow";
    readonly route: "consumer-bounded-content";
    readonly table: "consumer-selects-scroll-or-stacked-when-semantics-permit";
    readonly overlay: "viewport-safe-layer-with-owned-scroll";
  };
  readonly keyboard: {
    readonly navigation: "menu trigger controls drawer and destination closes it";
    readonly content: "document order follows visual priority";
    readonly overlays: "focus remains within the active modal or drawer";
    readonly escape: "consumer action closes the active dismissible layer";
  };
  readonly ownership: ContractOwnership;
}

export interface ResponsiveContract {
  readonly schemaVersion: typeof CONTRACT_SCHEMA_VERSION;
  readonly id: "responsive-presentation";
  readonly shell: ResponsiveShellContract;
  readonly components: Readonly<
    Record<string, ResponsiveComponentBehaviorContract>
  >;
  readonly recipes: Readonly<Record<string, ResponsiveRecipeBinding>>;
  readonly ownership: ContractOwnership;
}

const shellOwnership: ContractOwnership = {
  system: [
    "responsive-presentation",
    "accessibility",
    "semantic-tokens",
    "interaction-contract",
    "motion",
  ],
  consumer: [
    "business-data",
    "permissions",
    "entitlements",
    "persistence",
    "routing",
    "handlers",
    "tenant-context",
  ],
  platform: ["principal-context", "effective-access"],
  businessModule: ["module-lifecycle", "audit-authority", "workflow-authority"],
};

const viewport = (
  mode: ResponsivePresentationMode,
  overflow: ResponsiveOverflowStrategy,
  priority: ResponsivePriorityStrategy,
  focusOrder: readonly string[],
  notes: string,
): ResponsiveViewportBehavior => ({
  mode,
  overflow,
  priority,
  focusOrder,
  notes,
});

export const RESPONSIVE_COMPONENT_BEHAVIORS = {
  "data-table": {
    id: "data-table",
    displayName: "DataTable / Table",
    appliesTo: ["DataTable", "Table"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "table",
      "bounded",
      "preserve-order",
      ["caption", "toolbar", "header", "rows", "pagination"],
      "Keep native table semantics when comparison fits the bounded route width.",
    ),
    tablet: viewport(
      "table-scroll",
      "bounded-horizontal-scroll",
      "preserve-order",
      ["caption", "toolbar", "table", "pagination"],
      "Keep the table contract and let the table owner carry horizontal overflow.",
    ),
    mobile: viewport(
      "table-scroll",
      "bounded-horizontal-scroll",
      "consumer-declared",
      ["caption", "toolbar", "table-or-stacked-record", "pagination"],
      "Use bounded scroll by default; select the canonical stacked projection only when row semantics remain complete.",
    ),
    consumerChoice:
      "Consumer selects DataTable responsive=scroll or responsive=stacked from the comparison semantics; no forced table-to-card conversion.",
  },
  "filter-bar": {
    id: "filter-bar",
    displayName: "FilterToolbar / FilterDrawer",
    appliesTo: ["FilterToolbar", "FilterDrawer", "AppliedFilters"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "inline",
      "bounded",
      "preserve-order",
      ["search", "filters", "applied-filters", "actions"],
      "Keep query controls near the collection they shape.",
    ),
    tablet: viewport(
      "wrap",
      "wrap",
      "primary-first",
      ["search", "filters", "actions", "applied-filters"],
      "Wrap controls before reducing their target size.",
    ),
    mobile: viewport(
      "drawer",
      "drawer",
      "primary-first",
      ["page-header", "search", "filter-trigger", "collection"],
      "Move secondary filtering into the canonical FilterDrawer while keeping search and the filter trigger reachable.",
    ),
    consumerChoice:
      "Consumer decides which filters are primary and supplies the filter drawer contents and handlers.",
  },
  "master-detail": {
    id: "master-detail",
    displayName: "Master-detail",
    appliesTo: ["entity-list", "entity-detail", "DetailDrawer"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "split",
      "bounded",
      "preserve-order",
      ["page-header", "master", "detail"],
      "Keep the selected record and collection context visible together when width allows.",
    ),
    tablet: viewport(
      "split",
      "bounded",
      "primary-first",
      ["page-header", "master", "detail"],
      "Reduce secondary chrome before removing the relationship between master and detail.",
    ),
    mobile: viewport(
      "drawer",
      "drawer",
      "primary-first",
      ["page-header", "master", "detail-drawer"],
      "Keep the master list as the route content and present detail in the canonical drawer or an explicitly owned route.",
    ),
    consumerChoice:
      "Consumer owns selected-record state and chooses DetailDrawer versus route detail; the pattern owns only presentation placement.",
  },
  "entity-list": {
    id: "entity-list",
    displayName: "Entity list",
    appliesTo: ["entity-list", "DataTable", "FilterToolbar", "KPICluster"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "table",
      "bounded",
      "preserve-order",
      ["navigation", "page-header", "kpi", "filters", "table", "pagination"],
      "Use a bounded collection surface with actions adjacent to the page header or toolbar.",
    ),
    tablet: viewport(
      "table-scroll",
      "bounded-horizontal-scroll",
      "primary-first",
      ["navigation", "page-header", "filters", "table", "pagination"],
      "Keep collection context and primary query controls ahead of secondary metrics.",
    ),
    mobile: viewport(
      "table-scroll",
      "bounded-horizontal-scroll",
      "primary-first",
      [
        "menu",
        "page-header",
        "search",
        "filter-trigger",
        "collection",
        "pagination",
      ],
      "Use the consumer-selected DataTable projection and keep one primary action visible.",
    ),
    consumerChoice:
      "Consumer supplies rows, columns, business actions, selection policy, and the mobile table projection.",
  },
  "entity-detail": {
    id: "entity-detail",
    displayName: "Entity detail",
    appliesTo: [
      "entity-detail",
      "RecordSummary",
      "KeyValueList",
      "ActivityFeed",
    ],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "split",
      "bounded",
      "preserve-order",
      [
        "navigation",
        "page-header",
        "summary",
        "attributes",
        "activity",
        "actions",
      ],
      "Keep record identity, attributes, and supporting activity in a readable two-region composition.",
    ),
    tablet: viewport(
      "stack",
      "bounded",
      "primary-first",
      [
        "navigation",
        "page-header",
        "summary",
        "actions",
        "attributes",
        "activity",
      ],
      "Stack secondary record evidence after the identity and action region.",
    ),
    mobile: viewport(
      "stack",
      "bounded",
      "primary-first",
      [
        "menu",
        "page-header",
        "summary",
        "primary-actions",
        "attributes",
        "activity",
      ],
      "Preserve the reading order; move secondary actions into overflow or the canonical action footer.",
    ),
    consumerChoice:
      "Consumer supplies record data, permissions, action handlers, and the route or drawer that owns detail lifecycle.",
  },
  "entity-form": {
    id: "entity-form",
    displayName: "Entity form",
    appliesTo: ["entity-form", "FormSection", "FormGrid", "FormActions"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "split",
      "bounded",
      "preserve-order",
      [
        "page-header",
        "validation-summary",
        "primary-fields",
        "secondary-fields",
        "actions",
      ],
      "Use the authored form grid while keeping validation and commit actions in the reading order.",
    ),
    tablet: viewport(
      "single-column",
      "bounded",
      "primary-first",
      ["page-header", "validation-summary", "fields", "actions"],
      "Collapse field columns before shrinking controls below the shared target token.",
    ),
    mobile: viewport(
      "single-column",
      "bounded",
      "primary-first",
      ["menu", "page-header", "validation-summary", "fields", "actions"],
      "Keep fields and errors in document order and make the action group easy to reach.",
    ),
    consumerChoice:
      "Consumer supplies field definitions, validation, values, persistence, and action handlers.",
  },
  "kpi-cluster": {
    id: "kpi-cluster",
    displayName: "KPI cluster / metric cards",
    appliesTo: ["KPICluster", "MetricCard", "Card"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "inline",
      "bounded",
      "preserve-order",
      ["label", "metrics", "trend-or-supporting-signal"],
      "Keep related metrics in one visually aligned group with content-sized cards.",
    ),
    tablet: viewport(
      "wrap",
      "wrap",
      "preserve-order",
      ["label", "metrics", "trend-or-supporting-signal"],
      "Rebalance the group before allowing card content to become cramped.",
    ),
    mobile: viewport(
      "stack",
      "bounded",
      "preserve-order",
      ["label", "metric", "trend-or-supporting-signal"],
      "Stack cards in the authored priority order and keep each card content-sized.",
    ),
    consumerChoice:
      "Consumer declares metric priority and supplies truthful values; the cluster owns alignment and reflow only.",
  },
  "route-action-group": {
    id: "route-action-group",
    displayName: "Route action group",
    appliesTo: ["PageHeader", "ActionBar", "ActionFooter", "ButtonGroup"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "inline",
      "bounded",
      "primary-first",
      ["title", "primary-action", "secondary-actions", "overflow"],
      "Place the primary action at the end of the page header or route toolbar.",
    ),
    tablet: viewport(
      "wrap",
      "wrap",
      "primary-first",
      ["title", "primary-action", "secondary-actions", "overflow"],
      "Wrap secondary controls without changing the action order.",
    ),
    mobile: viewport(
      "stack",
      "bounded",
      "primary-first",
      ["title", "primary-action", "secondary-actions", "overflow"],
      "Keep one clear primary action first; move low-frequency actions into a menu or drawer.",
    ),
    consumerChoice:
      "Consumer owns action applicability, authorization, labels, and handlers; the group owns placement.",
  },
  "long-form-validation": {
    id: "long-form-validation",
    displayName: "Long form / validation summary",
    appliesTo: ["FormSection", "FormGrid", "FieldError", "Alert", "StateView"],
    touchTargetToken: "--t7-touch-target-min",
    desktop: viewport(
      "split",
      "bounded",
      "preserve-order",
      ["page-header", "validation-summary", "fields", "actions"],
      "Keep the validation summary near the page header while field errors remain next to their fields.",
    ),
    tablet: viewport(
      "stack",
      "bounded",
      "primary-first",
      ["page-header", "validation-summary", "fields", "actions"],
      "Stack the summary and fields without hiding error text behind a tooltip.",
    ),
    mobile: viewport(
      "stack",
      "bounded",
      "primary-first",
      ["menu", "page-header", "validation-summary", "fields", "actions"],
      "Keep the summary keyboard reachable and preserve the field-to-error relationship.",
    ),
    consumerChoice:
      "Consumer owns validation rules, error authority, focus-to-error behavior, and persistence.",
  },
} as const satisfies Readonly<
  Record<string, ResponsiveComponentBehaviorContract>
>;

export const RESPONSIVE_RECIPE_BINDINGS = {
  dashboard: {
    shell: "app-shell-responsive",
    behaviorIds: ["kpi-cluster", "route-action-group", "long-form-validation"],
    note: "Dashboard composition keeps metrics, action groups, and supporting data bounded.",
  },
  "entity-list": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "entity-list",
      "data-table",
      "filter-bar",
      "kpi-cluster",
      "route-action-group",
    ],
    note: "Collection routes keep table semantics explicit and move secondary filters into a drawer on mobile.",
  },
  "entity-detail": {
    shell: "app-shell-responsive",
    behaviorIds: ["entity-detail", "master-detail", "route-action-group"],
    note: "Record routes preserve identity and action priority while stacking supporting evidence.",
  },
  "entity-form": {
    shell: "app-shell-responsive",
    behaviorIds: ["entity-form", "long-form-validation", "route-action-group"],
    note: "Forms collapse field columns before reducing shared control geometry.",
  },
  "master-detail": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "master-detail",
      "data-table",
      "filter-bar",
      "route-action-group",
    ],
    note: "The master remains the route content while detail becomes a drawer at mobile widths.",
  },
  settings: {
    shell: "app-shell-responsive",
    behaviorIds: ["entity-form", "long-form-validation", "route-action-group"],
    note: "Settings use the same form and action contracts as entity editing.",
  },
  "approval-queue": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "entity-list",
      "data-table",
      "filter-bar",
      "route-action-group",
    ],
    note: "Queue rows remain comparable and actions stay primary-first across widths.",
  },
  report: {
    shell: "app-shell-responsive",
    behaviorIds: ["data-table", "kpi-cluster", "route-action-group"],
    note: "Reports preserve comparison semantics and use bounded chart/table regions.",
  },
  "readiness-review": {
    shell: "app-shell-responsive",
    behaviorIds: ["kpi-cluster", "entity-detail", "route-action-group"],
    note: "Readiness surfaces keep status evidence and the next action in one responsive reading order.",
  },
  "process-workspace": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "master-detail",
      "route-action-group",
      "long-form-validation",
    ],
    note: "Process workspaces preserve the current work item while secondary context moves below or into a drawer.",
  },
  "decision-workspace": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "master-detail",
      "route-action-group",
      "long-form-validation",
    ],
    note: "Decision workspaces keep evidence, decision controls, and the primary action ordered across widths.",
  },
  "activity-audit": {
    shell: "app-shell-responsive",
    behaviorIds: ["data-table", "entity-detail", "route-action-group"],
    note: "Audit views preserve event order and expose detail without turning the timeline into decorative content.",
  },
  "operational-kanban": {
    shell: "app-shell-responsive",
    behaviorIds: ["kpi-cluster", "master-detail", "route-action-group"],
    note: "Operational boards may scroll within their bounded owner while the page itself remains overflow-safe.",
  },
  "exception-queue": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "entity-list",
      "data-table",
      "filter-bar",
      "route-action-group",
    ],
    note: "Exception queues keep triage filters and next actions primary while preserving row comparison.",
  },
  "control-tower": {
    shell: "app-shell-responsive",
    behaviorIds: ["kpi-cluster", "data-table", "route-action-group"],
    note: "Control towers use bounded metric and data regions with explicit action priority.",
  },
  "load-planning": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "entity-list",
      "data-table",
      "filter-bar",
      "route-action-group",
    ],
    note: "Planning collections preserve comparable rows and move secondary filters into a drawer on mobile.",
  },
  "route-planning": {
    shell: "app-shell-responsive",
    behaviorIds: ["master-detail", "kpi-cluster", "route-action-group"],
    note: "Route planning keeps the selected route context visible while supporting evidence reflows below it.",
  },
  "receiving-console": {
    shell: "app-shell-responsive",
    behaviorIds: [
      "entity-list",
      "data-table",
      "filter-bar",
      "route-action-group",
    ],
    note: "Receiving work keeps scan and commit actions primary while table overflow remains bounded.",
  },
  "resource-forecast": {
    shell: "app-shell-responsive",
    behaviorIds: ["kpi-cluster", "data-table", "route-action-group"],
    note: "Forecast surfaces keep trend signals and comparison data within tokenized bounded regions.",
  },
  "entity-360": {
    shell: "app-shell-responsive",
    behaviorIds: ["entity-detail", "master-detail", "route-action-group"],
    note: "Entity 360 preserves the record identity and moves supporting sections in a stable reading order.",
  },
} as const satisfies Readonly<Record<string, ResponsiveRecipeBinding>>;

export const RESPONSIVE_SHELL_CONTRACT: ResponsiveShellContract = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "app-shell-responsive",
  grammar: [
    "AppShell",
    "navigation/context",
    "PageHeader",
    "bounded route content",
  ],
  viewportBands: RESPONSIVE_VIEWPORTS,
  tokens: {
    contentMax: "--t7-content-max",
    pageGutter: "--t7-page-gutter",
    safeArea: [
      "--t7-safe-area-top",
      "--t7-safe-area-right",
      "--t7-safe-area-bottom",
      "--t7-safe-area-left",
    ],
    sidebarWidth: "--t7-sidebar-width",
    headerHeight: "--t7-header-height",
    touchTargetMin: "--t7-touch-target-min",
    density: "--t7-density",
  },
  slots: {
    navigation: "sidebar | collapsed sidebar | navigation drawer",
    context: "tenant/resource context supplied by the consumer",
    pageHeader: "title, description, metadata, and primary actions",
    secondaryActions: "toolbar, overflow menu, or drawer actions",
    stickyRegions: "header or action footer, when the route declares one",
    routeContent: "bounded tables, filters, forms, cards, or detail",
  },
  desktop: {
    navigation: "persistent-sidebar",
    context: "header-context",
    actions: "page-header-end",
    content: "bounded",
    density: "theme-selected",
    focusOrder: ["navigation", "context", "page-header", "route-content"],
  },
  tablet: {
    navigation: "collapsed-sidebar",
    context: "header-context",
    actions: "page-header-end-or-wrap",
    content: "bounded",
    density: "theme-selected",
    focusOrder: ["menu-trigger", "context", "page-header", "route-content"],
  },
  mobile: {
    navigation: "navigation-drawer",
    context: "header-context",
    actions: "primary-first-then-overflow",
    content: "bounded",
    density: "theme-selected",
    focusOrder: ["menu-trigger", "context", "page-header", "route-content"],
  },
  overflow: {
    page: "no-horizontal-page-overflow",
    route: "consumer-bounded-content",
    table: "consumer-selects-scroll-or-stacked-when-semantics-permit",
    overlay: "viewport-safe-layer-with-owned-scroll",
  },
  keyboard: {
    navigation: "menu trigger controls drawer and destination closes it",
    content: "document order follows visual priority",
    overlays: "focus remains within the active modal or drawer",
    escape: "consumer action closes the active dismissible layer",
  },
  ownership: shellOwnership,
};

export const RESPONSIVE_CONTRACT: ResponsiveContract = {
  schemaVersion: CONTRACT_SCHEMA_VERSION,
  id: "responsive-presentation",
  shell: RESPONSIVE_SHELL_CONTRACT,
  components: RESPONSIVE_COMPONENT_BEHAVIORS,
  recipes: RESPONSIVE_RECIPE_BINDINGS,
  ownership: shellOwnership,
} as const;
