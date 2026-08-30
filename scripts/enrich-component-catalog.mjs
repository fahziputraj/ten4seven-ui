import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const componentsPath = path.join(
  repoRoot,
  "packages/ai/catalog/components.json",
);
const recipesPath = path.join(repoRoot, "packages/ai/catalog/recipes.json");

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJson = (filePath, value) =>
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);

const components = readJson(componentsPath);
const recipes = readJson(recipesPath);

const newComponents = {
  QuantityControl: {
    status: "implemented",
    category: "commerce",
    purpose:
      "Adjust a bounded numeric quantity with a compact, accessible control.",
    useWhen: ["cart quantities", "small bounded numeric choices"],
    avoidWhen: [
      "unbounded numeric entry",
      "complex calculation or pricing logic",
    ],
    recipes: ["catalog", "cart", "checkout"],
    importantProps: [
      "value",
      "onValueChange",
      "min",
      "max",
      "step",
      "label",
      "allowInput",
    ],
    relatedComponents: ["NumberInput", "CartLineItem", "Input"],
    source: "packages/ui/src/commerce.tsx",
  },
  CartTrigger: {
    status: "implemented",
    category: "commerce",
    purpose:
      "Expose a shared cart entry action while leaving cart state and navigation to the recipe.",
    useWhen: [
      "a storefront needs a cart entry point",
      "showing a live item count",
    ],
    avoidWhen: ["owning cart persistence", "replacing checkout navigation"],
    recipes: ["catalog", "cart"],
    importantProps: ["count", "label", "intent", "size", "onClick"],
    relatedComponents: ["Button", "CartPanel", "OrderSummary"],
    source: "packages/ui/src/commerce.tsx",
  },
  CartLineItem: {
    status: "implemented",
    category: "commerce",
    purpose:
      "Present one cart item with content, price, bounded quantity, and an optional remove action.",
    useWhen: ["cart and mini-cart item lists"],
    avoidWhen: ["product catalog cards", "persisting order state"],
    recipes: ["cart", "checkout"],
    importantProps: [
      "title",
      "media",
      "meta",
      "price",
      "quantity",
      "onQuantityChange",
      "onRemove",
    ],
    relatedComponents: ["QuantityControl", "ProductCard", "CartPanel"],
    source: "packages/ui/src/commerce.tsx",
  },
  CartPanel: {
    status: "implemented",
    category: "pattern",
    purpose:
      "Compose cart lines, empty state, summary, and actions into one shared commerce surface.",
    useWhen: ["cart pages", "anchored mini-cart surfaces"],
    avoidWhen: ["owning cart state", "owning payment or order persistence"],
    recipes: ["cart", "catalog", "checkout"],
    importantProps: [
      "title",
      "itemCount",
      "emptyState",
      "summary",
      "actions",
      "children",
    ],
    relatedComponents: [
      "CartLineItem",
      "OrderSummary",
      "EmptyState",
      "Popover",
    ],
    source: "packages/ui/src/commerce.tsx",
  },
  OrderSummary: {
    status: "implemented",
    category: "pattern",
    purpose:
      "Present application-calculated order rows and a total without owning payment logic.",
    useWhen: ["cart summaries", "checkout review"],
    avoidWhen: ["calculating tax or payment state", "generic KPI display"],
    recipes: ["cart", "checkout"],
    importantProps: ["rows", "total", "totalLabel"],
    relatedComponents: ["CartPanel", "Price", "RecordSummary"],
    source: "packages/ui/src/commerce.tsx",
  },
};

Object.assign(components, newComponents);

const categoryRewrites = {
  AppShell: "pattern",
  ApprovalPanel: "pattern",
  ActionFooter: "pattern",
  DataTable: "table",
  DataTableColumnPicker: "table",
};
for (const [name, category] of Object.entries(categoryRewrites)) {
  if (components[name]) components[name].category = category;
}

components.Select = {
  ...components.Select,
  purpose:
    "Choose one value from a known bounded set through a custom ten4seven popup; use NativeSelect when platform-native behavior is intentional.",
  useWhen: [
    "finite known options",
    "moderate option count",
    "keyboard-friendly custom popup behavior",
  ],
  avoidWhen: [
    "freeform text",
    "huge remote datasets",
    "native platform behavior is intentionally required",
  ],
  importantProps: [
    "label",
    "children",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
  ],
  relatedComponents: ["NativeSelect", "Combobox", "RadioGroup"],
};
components.NativeSelect = {
  ...components.NativeSelect,
  purpose:
    "Render an explicitly native select when platform-native behavior or form integration is the requirement.",
  useWhen: [
    "native mobile selection is preferred",
    "a platform-native form control is required",
  ],
  avoidWhen: ["custom popup semantics are required", "searchable option sets"],
  importantProps: ["children", "value", "defaultValue", "onChange", "disabled"],
  relatedComponents: ["Select", "Field"],
};

const recipeDisplayNames = {
  dashboard: "Dashboard",
  "entity-list": "Entity List",
  "entity-detail": "Entity Detail",
  "entity-form": "Entity Form",
  "master-detail": "Master–Detail",
  "approval-queue": "Approval Queue",
  settings: "Settings",
  report: "Operational Report",
  catalog: "Catalog",
  "product-detail": "Product Detail",
  cart: "Cart",
  checkout: "Checkout",
  "content-list": "Content List",
  "content-detail": "Content Detail",
  "ebook-reader": "Ebook Reader",
  auth: "Authentication",
  "marketing-home": "Marketing Home",
};

recipes.cart = {
  purpose:
    "Review selected products, adjust bounded quantities, and continue to checkout without owning commerce persistence.",
  profiles: ["commerce"],
  components: ["AppShell", "TopNavigation", "CartPanel", "OrderSummary"],
  optional: [
    "CartLineItem",
    "QuantityControl",
    "CartTrigger",
    "Button",
    "EmptyState",
  ],
  icons: ["cart", "checkout", "delete", "plus"],
  displayName: "Cart",
  references: ["Publishing Store"],
};

recipes.catalog.optional = [
  ...new Set([
    ...(recipes.catalog.optional ?? []),
    "CartTrigger",
    "CartPanel",
    "CartLineItem",
    "QuantityControl",
  ]),
];
recipes.checkout.optional = [
  ...new Set([
    ...(recipes.checkout.optional ?? []),
    "CartPanel",
    "OrderSummary",
    "QuantityControl",
  ]),
];
recipes.catalog.references = ["Publishing Store"];
recipes["entity-list"].references = ["Operations Tracker"];
recipes["product-detail"].references = ["Publishing Store"];

const polished = new Set([
  "Ten4SevenProvider",
  "Typography",
  "T7Icon",
  "Button",
  "IconButton",
  "Input",
  "Select",
  "NativeSelect",
  "Combobox",
  "MultiSelect",
  "Checkbox",
  "Radio",
  "Switch",
  "DatePicker",
  "Modal",
  "Drawer",
  "DetailDrawer",
  "Tabs",
  "Accordion",
  "CommandMenu",
  "DataTable",
  "FilterToolbar",
  "ProductCard",
  "ProductGrid",
  "QuantityControl",
  "CartTrigger",
  "CartLineItem",
  "CartPanel",
  "OrderSummary",
]);

const foundationCategories = new Set(["foundation"]);
const primitiveCategories = new Set([
  "action",
  "form",
  "navigation",
  "layout",
  "surface",
  "date-time",
  "file",
  "media",
]);
const componentCategories = new Set([
  "data",
  "table",
  "filter",
  "overlay",
  "feedback",
  "chart",
  "commerce",
]);

const displayNameOverrides = {
  Ten4SevenProvider: "Ten4Seven Provider",
  T7Icon: "T7 Icon",
  KPICluster: "KPI Cluster",
  DataTable: "Data Table",
  DataTableColumnPicker: "Data Table Column Picker",
  DatePicker: "Date Picker",
  DateRangePicker: "Date Range Picker",
  TimeInput: "Time Input",
  DateTimeInput: "Date–Time Input",
  FileUpload: "File Upload",
  AppShell: "App Shell",
  TopNavigation: "Top Navigation",
  MobileSidebar: "Mobile Sidebar",
  CommandMenu: "Command Menu",
  ProductCard: "Product Card",
  ProductGrid: "Product Grid",
  CartLineItem: "Cart Line Item",
  CartPanel: "Cart Panel",
  CartTrigger: "Cart Trigger",
  OrderSummary: "Order Summary",
  EmptyState: "Empty State",
  StateView: "State View",
  ToastProvider: "Toast Provider",
  CircularProgress: "Circular Progress",
  LineChart: "Line Chart",
  BarChart: "Bar Chart",
  DonutChart: "Donut Chart",
};

function humanize(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^T7 /, "T7 ")
    .replace(/\bUi\b/g, "UI");
}

const propTypes = {
  children: "ReactNode",
  className: "string",
  appearance: "Appearance",
  palette: "PaletteName",
  primary: "PaletteName",
  accent: "PaletteName",
  canvas: "CanvasName",
  chartPalette: "ChartPaletteName",
  radius: "RadiusName",
  radiusValue: "number",
  density: "DensityName | TableDensity",
  typography: "TypographyName",
  typeRole: "TypographyRole",
  as: "ElementType",
  label: "string",
  title: "string",
  description: "string",
  content: "ReactNode",
  value: "string | number | boolean",
  defaultValue: "string | number | boolean",
  values: "string[]",
  options: "Option[]",
  items: "Item[]",
  rows: "Row[]",
  columns: "Column[]",
  media: "ReactNode",
  meta: "ReactNode",
  price: "ReactNode",
  summary: "ReactNode",
  actions: "ReactNode",
  emptyState: "ReactNode",
  itemCount: "ReactNode",
  total: "ReactNode",
  totalLabel: "string",
  quantityLabel: "string",
  quantity: "number",
  removeLabel: "string",
  allowInput: "boolean",
  onQuantityChange: "(quantity: number) => void",
  onRemove: "() => void",
  rowKey: "(row) => string",
  icon: "IconName",
  leadingIcon: "IconName",
  trailingIcon: "IconName",
  onChange: "(event) => void",
  onValueChange: "(value) => void",
  onClick: "(event) => void",
  onClose: "() => void",
  onOpenChange: "(open) => void",
  open: "boolean",
  disabled: "boolean",
  loading: "boolean",
  size: "sm | md | lg",
  intent: "primary | secondary | quiet | danger",
  tone: "string",
  min: "number",
  max: "number",
  step: "number",
  orientation: '"horizontal" | "vertical"',
  pressed: "boolean",
  type: '"single" | "multiple"',
  hint: "string",
  error: "string | boolean",
  placeholder: "string",
  revealLabel: "string",
  currency: "string",
  emptyMessage: "string",
  checked: "boolean",
  indeterminate: "boolean",
  legend: "string",
  name: "string",
  minValue: "number",
  maxValue: "number",
  length: "number",
  htmlFor: "string",
  required: "boolean",
  optional: "boolean",
  action: "ReactNode",
  primaryAction: "ReactNode",
  secondaryActions: "ReactNode",
  rangeStart: "DateValue",
  rangeEnd: "DateValue",
  date: "DateValue",
  time: "string",
  accept: "string",
  multiple: "boolean",
  maxFiles: "number",
  maxSize: "number",
  status: "FileStatus",
  progress: "number",
  files: "FileItem[]",
  sidebar: "ReactNode",
  topbar: "ReactNode",
  brand: "ReactNode",
  groups: "SidebarGroupData[]",
  activeKey: "string",
  footer: "ReactNode",
  active: "boolean",
  leading: "ReactNode",
  trailing: "ReactNode",
  defaultOpen: "boolean",
  steps: "StepperItem[]",
  current: "number",
  commands: "CommandItem[]",
  shortcut: "string",
  page: "number",
  pageSize: "number",
  padded: "boolean",
  maxHeight: "number | string",
  overline: "string",
  breadcrumbs: "BreadcrumbItem[]",
  eyebrow: "string",
  columnVisibility: "Record<string, boolean>",
  selectable: "boolean",
  sort: "DataTableSort",
  visibility: "Record<string, boolean>",
  src: "string",
  alt: "string",
  avatars: "Avatar[]",
  change: "ReactNode",
  metadata: "KeyValueItem[] | ReactNode",
  details: "ReactNode",
  minCardWidth: "number | string",
  amount: "number",
  locale: "string",
  originalAmount: "number",
  count: "number",
  filters: "AppliedFilter[]",
  clearLabel: "string",
  selectedCount: "number",
  noun: "string",
  initialFocus: "string",
  id: "string",
  side: '"top" | "right" | "bottom" | "left"',
  confirmLabel: "string",
  trigger: "ReactNode",
  limit: "number",
  toasts: "ToastData[]",
  toast: "ToastData",
  state: "StateKind",
  width: "number | string",
  height: "number | string",
  showValue: "boolean",
  direction: '"up" | "down" | "flat"',
  labels: "string[]",
  series: "ChartSeries[]",
  valueFormatter: "(value: number) => string",
  data: "BarChartDatum[]",
  segments: "DonutSegment[]",
  centerLabel: "string",
  ratio: "number",
  fallbackIcon: "IconName",
  fallbackLabel: "string",
};

const defaultValues = {
  disabled: "false",
  loading: "false",
  open: "false",
  size: '"md"',
  intent: '"primary"',
  orientation: '"horizontal"',
  min: "1",
  step: "1",
};

const propDescriptions = {
  children: "Content rendered inside the contract.",
  label: "Visible or accessible name for the control.",
  title: "Primary heading for the surface.",
  description: "Supporting context announced with the primary content.",
  value: "Current controlled value.",
  defaultValue: "Initial value for uncontrolled usage.",
  values: "Current set of selected values.",
  options: "Finite choices rendered by the control.",
  items: "Structured items rendered by the contract.",
  rows: "Structured rows rendered by the contract.",
  columns: "Column definitions used to render structured data.",
  icon: "Semantic local icon name.",
  leadingIcon: "Semantic icon rendered before the label.",
  trailingIcon: "Semantic icon rendered after the label.",
  onChange: "Callback fired when the value or native event changes.",
  onValueChange: "Callback fired with the next canonical value.",
  onClick: "Callback fired when the action is activated.",
  onClose: "Callback fired when the surface requests dismissal.",
  onOpenChange: "Callback fired when open state changes.",
  open: "Controlled visibility state.",
  disabled: "Prevents interaction while preserving the disabled state.",
  loading: "Communicates pending work and prevents duplicate activation.",
  className: "Additional class hook for recipe-level layout composition.",
  itemCount: "Optional non-zero count displayed in the cart header.",
  emptyState: "Content shown when the cart has no line items.",
  summary: "Application-calculated order summary content.",
  actions: "Recipe-owned actions such as view cart or checkout.",
  media: "Optional product media for the line item.",
  meta: "Supporting product information for the line item.",
  price: "Application-formatted price content.",
  total: "Application-calculated order total.",
  totalLabel: "Label shown beside the order total.",
  quantityLabel: "Accessible name for the bounded quantity control.",
  removeLabel: "Accessible name for the remove action.",
  allowInput: "Allows direct numeric entry inside the bounded control.",
  onQuantityChange: "Callback fired with the next bounded quantity.",
  onRemove: "Callback fired when the line item is removed.",
  rowKey: "Returns the stable key for each data row.",
};

const stateByName = {
  Select: [
    "closed and focused",
    "open listbox",
    "selected option",
    "disabled",
    "invalid with hint",
  ],
  NativeSelect: [
    "closed native control",
    "selected option",
    "disabled",
    "invalid",
  ],
  Combobox: [
    "idle",
    "focused",
    "loading",
    "empty results",
    "selected",
    "disabled",
  ],
  MultiSelect: [
    "collapsed",
    "expanded",
    "selected values",
    "empty results",
    "disabled",
  ],
  Modal: ["closed", "open with focus", "Escape dismissal", "busy content"],
  Drawer: [
    "closed",
    "open side panel",
    "Escape dismissal",
    "mobile full width",
  ],
  DetailDrawer: [
    "closed",
    "open record context",
    "Escape dismissal",
    "mobile full width",
  ],
  DataTable: ["loading", "ready", "empty", "error", "sorted", "selected rows"],
  CartPanel: ["empty", "items present", "quantity changed", "action feedback"],
  QuantityControl: ["minimum", "bounded maximum", "updated", "disabled"],
};

const accessibilityByName = {
  Select: [
    "The custom trigger has one accessible name.",
    "The popup uses listbox and option semantics.",
    "Arrow keys move through options; Enter or Space commits a value.",
    "Escape closes without changing the current value.",
    "The form mirror is aria-hidden and not tabbable.",
  ],
  NativeSelect: [
    "Use a visible label or aria-label for the native select.",
    "Native platform keyboard, touch, and form semantics are preserved.",
  ],
  Combobox: [
    "The text input exposes combobox semantics and controls a listbox.",
    "Loading, empty, selected, and disabled states are announced through the contract.",
    "Arrow keys and Escape remain available for keyboard users.",
  ],
  MultiSelect: [
    "The trigger and expanded list communicate selected values.",
    "Multiple selections expose selected state in the listbox.",
    "Escape dismisses the popup without losing committed values.",
  ],
  Modal: [
    "The native dialog has an accessible title and description.",
    "Focus moves into the dialog, Escape dismisses it, and focus returns to the opener.",
  ],
  Drawer: [
    "The contextual dialog has a labelled close action.",
    "Escape dismisses the drawer and focus returns to the invoking control.",
  ],
  DetailDrawer: [
    "The contextual record surface is labelled and has a keyboard-reachable close action.",
    "The mobile layout remains a full-width dialog without changing the content contract.",
  ],
  DataTable: [
    "Use a semantic table with stable row and column context.",
    "Sortable headers expose aria-sort and selection controls have explicit names.",
    "Loading, empty, and error content remains available to assistive technology.",
  ],
  Accordion: [
    "Each trigger exposes aria-expanded and controls its panel.",
    "Keyboard users can reach and toggle every section.",
  ],
  Tabs: [
    "Tabs and tabpanels expose their relationship.",
    "Arrow-key navigation follows the tablist contract.",
  ],
  CommandMenu: [
    "The command surface is reachable with the documented keyboard shortcut.",
    "The input and results expose labelled listbox semantics and restore focus on close.",
  ],
};

const tokenSets = {
  foundation: ["font-ui", "font-display", "font-optical-sizing", "focus-ring"],
  action: [
    "accent",
    "accent-hover",
    "accent-pressed",
    "control-height",
    "control-radius",
    "focus-ring",
    "motion",
  ],
  form: [
    "input-background",
    "input-border",
    "input-hover-border",
    "input-focus-border",
    "disabled-background",
    "disabled-foreground",
    "control-height",
    "control-radius",
    "focus-ring",
  ],
  navigation: [
    "surface",
    "surface-raised",
    "selected",
    "selected-hover",
    "control-height",
    "focus-ring",
  ],
  layout: ["section-gap", "surface", "border", "radius-panel"],
  pattern: [
    "surface-overlay",
    "shadow-popover",
    "scrim",
    "radius-panel",
    "motion",
  ],
  surface: [
    "surface",
    "surface-raised",
    "border",
    "radius-card",
    "shadow-card",
  ],
  data: [
    "surface",
    "border",
    "selected",
    "selected-hover",
    "muted-foreground",
    "radius-control",
  ],
  table: [
    "surface",
    "border",
    "selected",
    "selected-hover",
    "row-height",
    "focus-ring",
  ],
  filter: [
    "input-background",
    "input-border",
    "accent",
    "selected",
    "control-gap",
    "focus-ring",
  ],
  overlay: [
    "surface-overlay",
    "shadow-popover",
    "shadow-modal",
    "scrim",
    "motion",
  ],
  feedback: [
    "success",
    "warning",
    "danger",
    "info",
    "surface-subtle",
    "motion",
  ],
  "date-time": [
    "input-background",
    "input-border",
    "surface-overlay",
    "shadow-popover",
    "control-height",
    "focus-ring",
  ],
  file: [
    "surface-subtle",
    "border",
    "selected",
    "selected-hover",
    "focus-ring",
  ],
  chart: [
    "chart-1",
    "chart-2",
    "chart-3",
    "chart-4",
    "chart-5",
    "surface",
    "border",
  ],
  media: ["surface-subtle", "surface-raised", "radius-card", "shadow-card"],
  commerce: [
    "surface",
    "surface-subtle",
    "accent",
    "selected",
    "control-height",
    "radius-card",
    "focus-ring",
  ],
};

function descriptionForProp(prop, name) {
  if (propDescriptions[prop]) return propDescriptions[prop];
  if (prop.startsWith("on"))
    return `Callback fired when ${humanize(prop.slice(2)).toLowerCase()} changes.`;
  if (prop.startsWith("aria-"))
    return `Accessible ${prop.slice(5)} relationship for the rendered element.`;
  return `Configures ${humanize(prop).toLowerCase()} for ${displayNameOverrides[name] ?? humanize(name)}.`;
}

function typeForProp(prop, componentName) {
  if (prop === "name" && componentName === "T7Icon") return "IconName";
  if (prop === "density" && componentName === "DataTable")
    return "TableDensity";
  if (prop === "files" && componentName === "FileList") return "FileItem[]";
  if (propTypes[prop]) return propTypes[prop];
  if (prop.startsWith("on")) return "(value: unknown) => void";
  if (prop.startsWith("aria-")) return "string";
  if (prop.startsWith("is") || prop.startsWith("has")) return "boolean";
  return "unknown";
}

function apiFor(name, component) {
  const requiredPropsByComponent = {
    Select: ["label", "children"],
    NativeSelect: ["children"],
    Combobox: ["options", "onValueChange"],
    MultiSelect: ["options", "onValueChange", "label"],
    Modal: ["title", "onClose"],
    DataTable: ["columns", "rows", "rowKey"],
    QuantityControl: ["value", "onValueChange", "label"],
    CartLineItem: ["title", "quantity", "onQuantityChange"],
    CartPanel: ["children"],
    OrderSummary: ["rows", "total"],
  };
  const requiredProps = new Set(requiredPropsByComponent[name] ?? []);
  return component.importantProps.map((prop) => ({
    name: prop,
    type: typeForProp(prop, name),
    defaultValue: defaultValues[prop] ?? "—",
    required: requiredProps.has(prop),
    description: descriptionForProp(prop, name),
  }));
}

const explicitExamples = {
  Select: '<Select label="Status" defaultValue="ready">...</Select>',
  NativeSelect: '<NativeSelect aria-label="Status">...</NativeSelect>',
  DataTable:
    "<DataTable columns={columns} rows={rows} rowKey={(row) => row.id} />",
  QuantityControl:
    '<QuantityControl label="Quantity" value={1} onValueChange={setQuantity} />',
  CartTrigger:
    '<CartTrigger count={cartCount} label="Cart" onClick={openCart} />',
  CartLineItem:
    "<CartLineItem title={book.title} quantity={quantity} onQuantityChange={setQuantity} />",
  CartPanel:
    "<CartPanel summary={<OrderSummary rows={rows} total={total} />}>{lines}</CartPanel>",
  OrderSummary:
    '<OrderSummary rows={[{ label: "Subtotal", value: subtotal }]} total={total} />',
};

for (const [name, component] of Object.entries(components)) {
  const category = component.category;
  const level = foundationCategories.has(category)
    ? "foundation"
    : category === "pattern"
      ? "pattern"
      : primitiveCategories.has(category)
        ? "primitive"
        : componentCategories.has(category)
          ? "component"
          : "component";
  const directRecipes = Object.entries(recipes)
    .filter(([, recipe]) =>
      [...recipe.components, ...(recipe.optional ?? [])].includes(name),
    )
    .map(([recipeName]) => recipeName);
  const related = component.relatedComponents.filter(
    (relatedName) => components[relatedName],
  );

  component.displayName =
    component.displayName ?? displayNameOverrides[name] ?? humanize(name);
  component.level = component.level ?? level;
  component.maturity =
    component.maturity ?? (polished.has(name) ? "polished" : "implemented");
  component.states = component.states ??
    stateByName[name] ?? [
      "default",
      "focused",
      "disabled",
      "loading or pending when applicable",
      "empty or unavailable when applicable",
    ];
  component.accessibility = component.accessibility ??
    accessibilityByName[name] ?? [
      "Expose a stable accessible name and use the semantic element for the interaction.",
      "Preserve visible focus, keyboard reachability, and disabled or pending state semantics.",
    ];
  component.responsive = component.responsive ?? [
    "Reflows within constrained containers without changing the content contract.",
    "Retains shared control geometry and touch-target minimums.",
  ];
  component.motion = component.motion ?? [
    "Uses shared duration and easing variables for state transitions.",
    "Respects prefers-reduced-motion.",
  ];
  component.tokens =
    component.tokens ?? tokenSets[category] ?? tokenSets.surface;
  component.api = apiFor(name, component);
  component.example =
    component.example ?? explicitExamples[name] ?? `<${name} />`;
  component.alternativeTo = component.alternativeTo ?? [];
  component.composesWith = component.composesWith ?? related;
  component.usedByPatterns = component.usedByPatterns ?? directRecipes;
}

components.Select.alternativeTo = ["NativeSelect", "Combobox"];
components.NativeSelect.alternativeTo = ["Select"];
components.Checkbox.alternativeTo = ["Switch"];
components.Switch.alternativeTo = ["Checkbox"];
components.Modal.alternativeTo = ["Drawer"];
components.Tabs.alternativeTo = ["ToggleButtonGroup"];
components.Toast.alternativeTo = ["Alert"];
components.DataTable.alternativeTo = [];

for (const [name, recipe] of Object.entries(recipes)) {
  recipe.displayName =
    recipe.displayName ?? recipeDisplayNames[name] ?? humanize(name);
}

writeJson(componentsPath, components);
writeJson(recipesPath, recipes);
console.log(
  `Enriched ${Object.keys(components).length} component contracts and ${Object.keys(recipes).length} recipes.`,
);
