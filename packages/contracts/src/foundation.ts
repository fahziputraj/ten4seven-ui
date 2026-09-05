/** Shared vocabulary for the foundation debugger, documentation and AI retrieval. */
export const FOUNDATION_FAMILIES = [
  ["color", "Color"],
  ["typography", "Typography"],
  ["surfaces", "Surface Expression"],
  ["geometry", "Geometry & Density"],
  ["viewport", "Layout & Viewport"],
  ["interaction", "Interaction"],
  ["motion", "Motion"],
  ["elevation", "Elevation & Layering"],
  ["scroll", "Scroll Ownership"],
  ["icons", "Iconography"],
  ["charts", "Data Visualization"],
] as const;

export const SURFACE_EXPRESSIONS = {
  plain: {
    label: "Paper",
    purpose:
      "Reading, comparison and ordinary work. The plain API name is retained.",
  },
  soft: {
    label: "Soft",
    purpose: "Quiet context and supporting category emphasis.",
  },
  expressive: {
    label: "Expressive",
    purpose:
      "Bounded data emphasis with a stronger tint and readable neutral text.",
  },
  solid: {
    label: "Solid",
    purpose:
      "A strong KPI or decision signal with a centrally paired foreground.",
  },
  inverse: {
    label: "Inverse",
    purpose: "A deliberate neutral contrast chapter or focal decision.",
  },
} as const;

export type SurfaceExpression = keyof typeof SURFACE_EXPRESSIONS;

export const CANVAS_LABELS = {
  balanced: "Balanced paper",
  paper: "Paper",
  monochrome: "Monochrome",
} as const;

/** CSS media queries remain at the component that owns the transformation. */
export const VIEWPORT_RULES = [
  {
    owner: "AppShell / Sidebar",
    at: "860px and below",
    behavior:
      "Persistent rail becomes flowing secondary navigation; use MobileSidebar when a drawer is required.",
  },
  {
    owner: "NavigationMenu",
    at: "700px; PublicShell adds a 540px transformation",
    behavior:
      "Leading content hides at 700px. In PublicShell, links become a bounded horizontal row at 540px with 44px targets.",
  },
  {
    owner: "Table / DataTable",
    at: "consumer-selected stacked mode",
    behavior:
      "Comparable wide data uses a bounded horizontal scroll region or the existing stacked representation.",
  },
  {
    owner: "Composition",
    at: "content pressure",
    behavior:
      "Recipes own grid transformations; use the shared gutters, reading rails and safe-area insets.",
  },
] as const;

export const FOUNDATION_CONTRACT = {
  families: FOUNDATION_FAMILIES,
  surfaceExpressions: SURFACE_EXPRESSIONS,
  canvasLabels: CANVAS_LABELS,
  viewport: VIEWPORT_RULES,
  colorDomains: {
    action: "Brand and action; never evidence of successful state.",
    status: "Fixed semantic meaning accompanied by a label or icon.",
    categorical:
      "Ordered series independent of brand, accent and status; use labels and non-color differentiation.",
  },
  ownership: {
    values: "packages/tokens/src/theme.ts",
    motion: "packages/contracts/src/theme-profile.ts",
    delivery: "Ten4SevenProvider and generated theme-recipes.css",
    scroll:
      "One document scroll unless an explicit bounded region owns scrolling; popup root and native modal body lock remain canonical.",
    composition:
      "Recipes own page arrangement; foundations own the shared language.",
  },
} as const;
