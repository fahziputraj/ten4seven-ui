import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  IconifyIcon,
  IconifyBoldDuotoneIconCount,
  IconifyBoldDuotoneIconNames,
  IconifyCuratedIconCount,
  IconifyCuratedIconNames,
  IconNames,
  T7Icon,
  type IconName,
  type IconifyIconName,
} from "@ten4seven/icons";
import { buildThemeVariables, hslToHex } from "@ten4seven/tokens";
import {
  AnnouncementBar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CtaBlock,
  Carousel,
  ChartPanel,
  ContentShowcase,
  EmptyState,
  FeatureShowcase,
  Hero,
  Input,
  LineChart,
  LogoCloud,
  MediaFrame,
  PricingSection,
  ProductCard,
  ProductShowcase,
  PublicFooter,
  PageHeader,
  SectionNavigation,
  StatsSection,
  Testimonials,
  Typography,
  useToast,
  useTen4SevenTheme,
} from "@ten4seven/ui";
import { ComponentProofs } from "./component-proofs";
import { ContentSafetyProof } from "./content-safety-proof";
import { ComponentPreview } from "./component-preview-fixtures";
import { LibraryPageHeader } from "./library-page-header";
import {
  blockCatalog,
  blockPath,
  catalogCounts,
  categoryLabels,
  componentCatalog,
  componentFamilyPath,
  componentFamilyDefinitions,
  componentPath,
  componentsInCategory,
  iconCatalog,
  recipeCatalog,
  recipePath,
  slugify,
  type ComponentContract,
} from "./catalog-model";

const iconGroups: Array<{ label: string; names: IconName[] }> = [
  {
    label: "Actions",
    names: [
      "add",
      "approve",
      "clear",
      "close",
      "delete",
      "download",
      "edit",
      "export",
      "import",
      "more",
      "plus",
      "refresh",
      "upload",
      "view",
    ],
  },
  {
    label: "Navigation & system",
    names: [
      "arrowLeft",
      "arrowRight",
      "chevronDown",
      "chevronLeft",
      "chevronRight",
      "chevronUp",
      "command",
      "components",
      "dashboard",
      "keyboard",
      "menu",
      "settings",
      "sidebar",
      "theme",
      "tokens",
    ],
  },
  {
    label: "State & feedback",
    names: [
      "blocked",
      "check",
      "danger",
      "eye",
      "eyeOff",
      "filter",
      "info",
      "lock",
      "notification",
      "pending",
      "progress",
      "modal",
      "moon",
      "search",
      "sort",
      "success",
      "sun",
      "unlock",
      "warning",
    ],
  },
  {
    label: "Data & signals",
    names: [
      "analytics",
      "calendar",
      "chart",
      "clock",
      "density",
      "kpi",
      "palette",
      "table",
      "timeline",
      "trendDown",
      "trendUp",
      "type",
    ],
  },
  {
    label: "People & files",
    names: [
      "file",
      "fileCheck",
      "files",
      "folder",
      "image",
      "pdf",
      "user",
      "users",
    ],
  },
  {
    label: "Warehouse & operations",
    names: [
      "delivery",
      "fleet",
      "inventory",
      "item",
      "package",
      "shipment",
      "stockIn",
      "stockOut",
      "stock",
      "transfer",
      "warehouse",
    ],
  },
  {
    label: "Business domains",
    names: [
      "accounting",
      "admin",
      "communication",
      "farm",
      "finance",
      "invoice",
      "logistics",
      "payment",
    ],
  },
  {
    label: "Publishing & commerce",
    names: [
      "author",
      "book",
      "cart",
      "catalog",
      "category",
      "checkout",
      "ebook",
      "favorite",
      "publisher",
      "preview",
      "rating",
    ],
  },
];

export { TokensExplorer } from "./token-foundations";

function CatalogLink({
  ariaCurrent,
  children,
  className,
  href,
  id,
  onNavigatePath,
}: {
  ariaCurrent?: "page" | "location";
  children: ReactNode;
  className?: string;
  href: string;
  id?: string;
  onNavigatePath: (path: string) => void;
}) {
  return (
    <a
      aria-current={ariaCurrent}
      className={className}
      href={href}
      id={id}
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
        onNavigatePath(href);
      }}
    >
      {children}
    </a>
  );
}

type RecipeBlockRole = "required" | "recommended" | "optional";

const recipeBlockRoleCopy: Record<
  RecipeBlockRole,
  { description: string; label: string }
> = {
  optional: {
    description: "Add when the product story or interaction needs it.",
    label: "Optional blocks",
  },
  recommended: {
    description: "Use when the page needs additional proof or explanation.",
    label: "Recommended blocks",
  },
  required: {
    description: "The minimum expressive structure for this recipe.",
    label: "Required blocks",
  },
};

function RecipeBlockRoleList({
  names,
  onNavigatePath,
  role,
}: {
  names: string[];
  onNavigatePath: (path: string) => void;
  role: RecipeBlockRole;
}) {
  if (!names.length) return null;
  const copy = recipeBlockRoleCopy[role];
  return (
    <div className="catalog-recipe-role">
      <div className="catalog-recipe-role-heading">
        <Typography as="h3" typeRole="heading-sm">
          {copy.label}
        </Typography>
        <Typography typeRole="caption">{copy.description}</Typography>
      </div>
      <ul className="catalog-recipe-flow">
        {names.map((blockName) => (
          <li key={blockName}>
            <span aria-hidden="true">
              <T7Icon name="arrowRight" size={15} />
            </span>
            <CatalogLink
              href={blockCatalog[blockName] ? blockPath(blockName) : "#"}
              onNavigatePath={onNavigatePath}
            >
              {blockCatalog[blockName]?.displayName ?? blockName}
            </CatalogLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CatalogListRow({
  children,
  description,
  href,
  onNavigatePath,
  trailing,
}: {
  children: ReactNode;
  description?: ReactNode;
  href: string;
  onNavigatePath: (path: string) => void;
  trailing?: ReactNode;
}) {
  return (
    <CatalogLink
      className="catalog-list-row"
      href={href}
      onNavigatePath={onNavigatePath}
    >
      <span className="catalog-list-row-copy">
        <strong>{children}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {trailing ? (
        <span className="catalog-list-row-trailing">{trailing}</span>
      ) : null}
      <T7Icon aria-hidden="true" name="chevronRight" size={15} />
    </CatalogLink>
  );
}

function CatalogSearchResults({
  onClear,
  query,
  onNavigatePath,
}: {
  onClear: () => void;
  onNavigatePath: (path: string) => void;
  query: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const matchingEntries = Object.entries(componentCatalog).filter(
    ([name, component]) =>
      [
        name,
        component.displayName ?? "",
        component.category,
        component.purpose,
        component.aliasOf ?? "",
        ...component.useWhen,
        ...component.relatedComponents,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
  );
  const entries = matchingEntries.slice(0, 12);

  return (
    <section
      className="library-section catalog-search-results"
      aria-live="polite"
    >
      <div className="library-section-heading">
        <div>
          <Typography as="h2" typeRole="heading-lg">
            Search results
          </Typography>
          <Typography typeRole="caption">
            {matchingEntries.length} matching catalog result
            {matchingEntries.length === 1 ? "" : "s"}
          </Typography>
        </div>
      </div>
      {entries.length ? (
        <div className="catalog-list">
          {entries.map(([name, component]) => (
            <CatalogListRow
              description={
                component.aliasOf
                  ? `Alias of ${component.aliasOf}`
                  : component.purpose
              }
              href={componentPath(name)}
              key={name}
              onNavigatePath={onNavigatePath}
              trailing={
                <span className="catalog-list-row-category">
                  {categoryLabels[component.category] ?? component.category}
                </span>
              }
            >
              {component.displayName ?? name}
            </CatalogListRow>
          ))}
        </div>
      ) : (
        <EmptyState
          action={
            <Button intent="quiet" onClick={onClear} size="sm">
              Clear search
            </Button>
          }
          description="Try a contract name, family, or interaction concern."
          icon="search"
          title="No matching components"
        />
      )}
    </section>
  );
}

const componentFamilyDescriptions: Record<string, string> = {
  foundation:
    "Theme, typography, icon, and provider contracts shared by every screen.",
  action: "Intent-bearing actions and compact controls for committing work.",
  form: "Inputs and selection controls for collecting clear, valid values.",
  navigation:
    "Wayfinding, disclosure, and command surfaces for moving through an app.",
  layout:
    "Structural primitives that define page, panel, and responsive composition.",
  surface:
    "Cards, panels, separators, and containers that establish hierarchy.",
  data: "Metrics, status, lists, and visual signals for readable information.",
  table:
    "Dense tabular records with selection, sorting, and responsive overflow.",
  filter:
    "Applied filters, filter drawers, and bulk operations around collections.",
  overlay: "Focused modal, drawer, popover, menu, and tooltip layers.",
  feedback:
    "Status, progress, loading, and recovery feedback with live semantics.",
  "date-time": "Calendar, range, time, and date-time entry with stable values.",
  file: "Client-side file selection, upload affordances, and file records.",
  chart: "Token-led charts and compact trend visualizations.",
  media: "Responsive media frames, thumbnails, and content-safe imagery.",
  commerce:
    "Catalog, cart, pricing, and order composition without a second primitive set.",
  pattern: "Reusable application flows composed from the contracts above.",
};

type ComponentShowroomMode =
  "comparison" | "gallery" | "grouped" | "sequence" | "stack";

type ComponentShowroomGroup = {
  description: string;
  entries: Array<[string, ComponentContract]>;
  label: string;
};

const componentShowroomModes: Record<string, ComponentShowroomMode> = {
  action: "comparison",
  chart: "gallery",
  data: "gallery",
  feedback: "gallery",
  form: "grouped",
  overlay: "sequence",
  table: "comparison",
};

const componentShowroomGroupDefinitions: Record<
  string,
  Array<{ description: string; label: string; names: string[] }>
> = {
  action: [
    {
      description:
        "Commit work, express intent, and expose compact action states.",
      label: "Action controls",
      names: [
        "Button",
        "Icon Button",
        "Button Group",
        "Toggle Button",
        "Toggle Button Group",
        "Split Button",
      ],
    },
  ],
  chart: [
    {
      description: "Compact signals for trends, comparisons, and composition.",
      label: "Chart signals",
      names: ["Trend Indicator", "Sparkline", "Chart Legend"],
    },
    {
      description: "Full chart surfaces for visualizing a question or measure.",
      label: "Chart surfaces",
      names: ["Line Chart", "Bar Chart", "Donut Chart", "Chart Panel"],
    },
  ],
  data: [
    {
      description:
        "Metrics, records, people, and status signals for product work.",
      label: "Signals and records",
      names: [
        "Milestone Tracker",
        "Badge",
        "Status Chip",
        "Key Value List",
        "Metric Card",
        "KPI Cluster",
        "Activity Feed",
        "Record Summary",
        "Revision Diff",
      ],
    },
    {
      description: "People and ownership context for collaborative surfaces.",
      label: "People and ownership",
      names: ["Avatar", "Avatar Group"],
    },
  ],
  feedback: [
    {
      description: "Explain status, recovery, and empty or unavailable states.",
      label: "Status and recovery",
      names: ["Alert", "Empty State", "State View", "Module State"],
    },
    {
      description: "Show progress without taking attention away from the task.",
      label: "Progress and loading",
      names: ["Skeleton", "Spinner", "Progress", "Circular Progress"],
    },
    {
      description:
        "Deliver transient feedback through one shared notification model.",
      label: "Notifications",
      names: ["Toast Provider", "Toaster", "Toast"],
    },
  ],
  form: [
    {
      description:
        "Collect text, credentials, and free-form values with clear labels.",
      label: "Text entry",
      names: [
        "Input",
        "Search Input",
        "Password Input",
        "Textarea",
        "Field",
        "Label",
        "Field Description",
        "Field Error",
      ],
    },
    {
      description:
        "Capture quantities and constrained numeric values without ambiguity.",
      label: "Numeric entry",
      names: [
        "Number Input",
        "Currency Input",
        "Percent Input",
        "Slider",
        "Range Slider",
        "Otp Input",
      ],
    },
    {
      description:
        "Choose one or more values while preserving keyboard and state semantics.",
      label: "Choice and selection",
      names: [
        "Select",
        "Native Select",
        "Combobox",
        "Multi Select",
        "Hierarchy Picker",
        "Checkbox",
        "Checkbox Group",
        "Radio",
        "Radio Group",
        "Switch",
      ],
    },
    {
      description:
        "Compose fields into repeatable form structure and action rows.",
      label: "Form composition",
      names: ["Field Group", "Form Section", "Form Grid", "Form Actions"],
    },
  ],
  navigation: [
    {
      description: "Move through product surfaces and keep context visible.",
      label: "Wayfinding",
      names: [
        "Sidebar",
        "Sidebar Group",
        "Nav Item",
        "Navigation Menu",
        "Top Navigation",
        "Mobile Sidebar",
        "Breadcrumb",
        "Section Navigation",
      ],
    },
    {
      description: "Reveal hierarchy, command, and step-by-step progress.",
      label: "Disclosure and command",
      names: [
        "Tabs",
        "Accordion",
        "Collapsible",
        "Stepper",
        "Command Menu",
        "Pagination",
        "Tab Panel",
        "Carousel",
      ],
    },
  ],
  overlay: [
    {
      description: "Anchor lightweight context to the action that opened it.",
      label: "Anchored context",
      names: ["Popover", "Tooltip", "Dropdown Menu", "Context Menu"],
    },
    {
      description:
        "Give focused tasks and record inspection a viewport-safe surface.",
      label: "Focused surfaces",
      names: ["Modal", "Drawer", "Detail Drawer", "Alert Dialog"],
    },
  ],
  table: [
    {
      description:
        "Readable table anatomy for comparison and lightweight records.",
      label: "Table foundations",
      names: [
        "Table",
        "Table Header",
        "Table Body",
        "Table Row",
        "Table Head",
        "Table Cell",
      ],
    },
    {
      description:
        "Data-heavy workflows with selection, sorting, and column control.",
      label: "Data workflows",
      names: ["Data Table", "Advanced Data Grid", "Data Table Column Picker"],
    },
  ],
};

function groupComponentEntries(
  category: string,
  entries: Array<[string, ComponentContract]>,
): ComponentShowroomGroup[] {
  const definitions = componentShowroomGroupDefinitions[category];
  if (!definitions) {
    const family = componentFamilyDefinitions.find(
      (item) => item.category === category,
    );
    return [
      {
        description:
          componentFamilyDescriptions[category] ??
          "Canonical contracts in this family.",
        entries,
        label: family?.label ?? category,
      },
    ];
  }

  const entryByName = new Map(
    entries.map(([name, component]) => [
      component.displayName ?? name,
      [name, component] as [string, ComponentContract],
    ]),
  );
  const claimed = new Set<string>();
  const groups: ComponentShowroomGroup[] = definitions.flatMap((definition) => {
    const groupedEntries = definition.names.flatMap((name) => {
      const entry = entryByName.get(name);
      if (!entry) return [];
      claimed.add(entry[0]);
      return [entry];
    });
    return groupedEntries.length
      ? [
          {
            description: definition.description,
            entries: groupedEntries,
            label: definition.label,
          },
        ]
      : [];
  });
  const remainder = entries.filter(([name]) => !claimed.has(name));
  if (remainder.length) {
    groups.push({
      description: "Additional contracts in this family.",
      entries: remainder,
      label: "More contracts",
    });
  }
  return groups;
}

function ComponentShowroom({
  category,
  entries,
  onNavigatePath,
}: {
  category: string;
  entries: Array<[string, ComponentContract]>;
  onNavigatePath: (path: string) => void;
}) {
  const definition = componentFamilyDefinitions.find(
    (item) => item.category === category,
  );
  const groups = groupComponentEntries(category, entries);
  const mode = componentShowroomModes[category] ?? "stack";

  return (
    <section
      aria-label={`${definition?.label ?? category} component showroom`}
      className={`component-showroom component-showroom-${mode}`}
    >
      <div className="component-showroom-heading">
        <div>
          <Typography as="h2" typeRole="heading-lg">
            Compare the family
          </Typography>
          <Typography typeRole="body-sm">
            Live specimens first. Open a contract only when you need the full
            API, accessibility notes, or implementation detail.
          </Typography>
        </div>
        <span className="component-showroom-count">
          {entries.length} canonical{" "}
          {entries.length === 1 ? "contract" : "contracts"}
        </span>
      </div>

      {groups.length > 1 ? (
        <nav
          aria-label={`${definition?.label ?? category} showroom sections`}
          className="component-showroom-group-nav"
        >
          {groups.map((group) => (
            <a
              href={`#showroom-group-${slugify(group.label)}`}
              key={group.label}
            >
              <span>{group.label}</span>
              <small>{group.entries.length}</small>
            </a>
          ))}
        </nav>
      ) : null}

      <div className="component-showroom-groups">
        {groups.map((group) => (
          <section
            aria-labelledby={`showroom-group-${slugify(group.label)}-title`}
            className="component-showroom-group"
            id={`showroom-group-${slugify(group.label)}`}
            key={group.label}
          >
            <div className="component-showroom-group-heading">
              <div>
                <Typography
                  as="h2"
                  id={`showroom-group-${slugify(group.label)}-title`}
                  typeRole="heading-md"
                >
                  {group.label}
                </Typography>
                <Typography typeRole="body-sm">{group.description}</Typography>
              </div>
              <span className="component-showroom-group-count">
                {group.entries.length}
              </span>
            </div>

            <div className="component-showroom-specimens">
              {group.entries.map(([name, component], index) => {
                const displayName = component.displayName ?? name;
                const states = (component.states ?? [])
                  .filter((state) => !state.endsWith("when applicable"))
                  .slice(0, 5);
                return (
                  <article
                    className="component-showroom-specimen"
                    data-component-contract={name}
                    id={`showroom-${slugify(name)}`}
                    key={name}
                  >
                    <div className="component-showroom-specimen-copy">
                      <div className="component-showroom-specimen-meta">
                        <span className="component-showroom-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="component-showroom-status">
                          {component.status}
                        </span>
                      </div>
                      <Typography as="h3" typeRole="heading-md">
                        {displayName}
                      </Typography>
                      <Typography typeRole="body-sm">
                        {component.purpose}
                      </Typography>
                      {states.length ? (
                        <div
                          aria-label={`${displayName} supported states`}
                          className="component-showroom-states"
                        >
                          {states.map((state) => (
                            <span key={state}>{state}</span>
                          ))}
                        </div>
                      ) : null}
                      <CatalogLink
                        className="component-showroom-detail-link"
                        href={componentPath(name)}
                        onNavigatePath={onNavigatePath}
                      >
                        Open API &amp; detail
                        <T7Icon
                          aria-hidden="true"
                          name="chevronRight"
                          size={14}
                        />
                      </CatalogLink>
                    </div>
                    <div className="component-showroom-specimen-preview">
                      <ComponentPreview component={component} />
                    </div>
                    <details className="component-showroom-guidance">
                      <summary>Usage and accessibility</summary>
                      <div className="component-showroom-guidance-grid">
                        <div>
                          <Typography typeRole="overline">Use when</Typography>
                          <ul>
                            {component.useWhen.slice(0, 2).map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Typography typeRole="overline">
                            Accessibility
                          </Typography>
                          <ul>
                            {(component.accessibility ?? [])
                              .slice(0, 2)
                              .map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export function ComponentsExplorer({
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
}) {
  const [query, setQuery] = useState("");

  return (
    <div className="library-page">
      <LibraryPageHeader
        count={`${catalogCounts.canonicalComponents} canonical · ${catalogCounts.components} catalog contracts`}
        description="A visual entry point for comparing canonical components by family. Browse the specimen first; open detail only when the full contract is needed."
        icon="components"
        overline="Library · canonical contracts"
        title="Components"
      />

      <Input
        aria-label="Search canonical components"
        className="library-search"
        label="Search components"
        leadingIcon="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Button, form, table, overlay…"
        value={query}
      />

      {query.trim() ? (
        <CatalogSearchResults
          onClear={() => setQuery("")}
          onNavigatePath={onNavigatePath}
          query={query}
        />
      ) : (
        <>
          <section
            aria-labelledby="component-family-browser-title"
            className="library-section component-family-browser"
          >
            <div className="library-section-heading">
              <div>
                <Typography
                  as="h2"
                  id="component-family-browser-title"
                  typeRole="heading-lg"
                >
                  Families
                </Typography>
                <Typography typeRole="body-sm">
                  Choose one family to compare its live components, variants,
                  states, and guidance together.
                </Typography>
              </div>
              <span className="component-showroom-count">
                {componentFamilyDefinitions.length} families ·{" "}
                {catalogCounts.canonicalComponents} contracts
              </span>
            </div>
            <nav
              aria-label="Component families"
              className="catalog-family-anchors component-family-chooser"
            >
              {componentFamilyDefinitions.map((family) => {
                const entries = componentsInCategory(family.category);
                const highlights = entries
                  .slice(0, 3)
                  .map(([name, component]) => component.displayName ?? name)
                  .join(" · ");
                return (
                  <CatalogLink
                    className="component-family-chooser-link"
                    href={componentFamilyPath(family.category)}
                    id={`component-family-${family.category}`}
                    key={family.category}
                    onNavigatePath={onNavigatePath}
                  >
                    <span className="catalog-family-icon">
                      <T7Icon aria-hidden="true" name={family.icon} size={18} />
                    </span>
                    <span className="component-family-chooser-copy">
                      <strong>{family.label}</strong>
                      <small>
                        {componentFamilyDescriptions[family.category]}
                      </small>
                      <small
                        aria-label={`${family.label} indexed component examples`}
                        className="component-family-chooser-components"
                      >
                        {highlights}
                      </small>
                    </span>
                    <span className="component-family-chooser-count">
                      {entries.length}
                    </span>
                    <T7Icon aria-hidden="true" name="chevronRight" size={15} />
                  </CatalogLink>
                );
              })}
            </nav>
          </section>
          <details className="component-index-details">
            <summary>
              <span>View all indexed contracts</span>
              <span className="component-index-summary-count">
                {catalogCounts.canonicalComponents}
              </span>
            </summary>
            <div className="component-index-groups">
              {componentFamilyDefinitions.map((family) => {
                const entries = componentsInCategory(family.category);
                return (
                  <section
                    aria-labelledby={`component-index-${family.category}-title`}
                    className="component-index-group"
                    key={family.category}
                  >
                    <div className="component-index-group-heading">
                      <Typography
                        as="h3"
                        id={`component-index-${family.category}-title`}
                        typeRole="label"
                      >
                        {family.label}
                      </Typography>
                      <span>{entries.length}</span>
                    </div>
                    <div className="component-index-links">
                      {entries.map(([name, component]) => (
                        <CatalogLink
                          href={componentPath(name)}
                          key={name}
                          onNavigatePath={onNavigatePath}
                        >
                          {component.displayName ?? name}
                        </CatalogLink>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </details>
          <section
            aria-label="Library roles"
            className="component-library-role-note"
          >
            <span className="component-library-role-note-icon">
              <T7Icon aria-hidden="true" name="components" size={18} />
            </span>
            <div>
              <Typography as="strong" typeRole="label">
                Need edge-case proof?
              </Typography>
              <Typography typeRole="body-sm">
                Components is for discovery and comparison. Use Component Lab
                for responsive stress, unusual states, and implementation QA.
              </Typography>
            </div>
            <CatalogLink
              className="component-showroom-secondary-link"
              href="/component-lab"
              onNavigatePath={onNavigatePath}
            >
              Open Component Lab
              <T7Icon aria-hidden="true" name="chevronRight" size={14} />
            </CatalogLink>
          </section>
        </>
      )}
    </div>
  );
}

export function ComponentFamilyExplorer({
  category,
  onNavigatePath,
}: {
  category: string;
  onNavigatePath: (path: string) => void;
}) {
  const definition = componentFamilyDefinitions.find(
    (item) => item.category === category,
  );
  const entries = componentsInCategory(category);

  return (
    <div className="library-page">
      <LibraryPageHeader
        count={`${entries.length} canonical contracts`}
        description={`Compare the ${definition?.label.toLowerCase() ?? category} family in one visual showroom. Canonical contracts stay separate underneath.`}
        icon={definition?.icon ?? "components"}
        overline={`Components · ${definition?.label ?? category}`}
        title={definition?.label ?? category}
        actions={
          <div className="component-family-header-actions">
            <CatalogLink
              className="component-showroom-secondary-link"
              href="/components"
              onNavigatePath={onNavigatePath}
            >
              All families
            </CatalogLink>
            <CatalogLink
              className="component-showroom-secondary-link"
              href="/component-lab"
              onNavigatePath={onNavigatePath}
            >
              Open Component Lab
            </CatalogLink>
          </div>
        }
      />
      <ComponentShowroom
        category={category}
        entries={entries}
        onNavigatePath={onNavigatePath}
      />
    </div>
  );
}

export function ComponentDetailExplorer({
  name,
  onNavigatePath,
}: {
  name: string;
  onNavigatePath: (path: string) => void;
}) {
  const component = componentCatalog[name];
  if (!component) return null;
  const family = componentFamilyDefinitions.find(
    (item) => item.category === component.category,
  );
  const related = component.relatedComponents.filter(
    (relatedName) => componentCatalog[relatedName],
  );
  const alternatives = (component.alternativeTo ?? []).filter(
    (relatedName) => componentCatalog[relatedName],
  );
  const composesWith = (component.composesWith ?? []).filter(
    (relatedName) => componentCatalog[relatedName],
  );
  const maturityLabel = component.aliasOf
    ? `Compatibility alias · ${component.aliasOf}`
    : component.maturity && component.maturity !== component.status
      ? `${component.status} · ${component.maturity}`
      : component.status;
  const apiRows =
    component.api ??
    component.importantProps.map((prop) => ({
      name: prop,
      type: "unknown",
      defaultValue: "—",
      required: false,
      description: `Configures ${prop} for this contract.`,
    }));

  return (
    <div className="library-page component-detail-page">
      <LibraryPageHeader
        count={maturityLabel}
        description={component.purpose}
        icon={family?.icon ?? "components"}
        overline={`Components · ${categoryLabels[component.category] ?? component.category}`}
        title={component.displayName ?? name}
      />
      <div className="catalog-detail-layout">
        <div className="catalog-detail-main">
          <section
            className="catalog-doc-section catalog-preview-section"
            id="component-preview"
          >
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Preview
                </Typography>
                <Typography typeRole="body-sm">
                  A focused live example of the canonical implementation.
                </Typography>
              </div>
            </div>
            <div className="catalog-preview">
              <ComponentPreview component={component} />
            </div>
          </section>
          <section className="catalog-doc-section" id="component-usage">
            <Typography as="h2" typeRole="heading-lg">
              Usage
            </Typography>
            <div className="catalog-guidance-grid">
              <div>
                <Typography typeRole="overline">Use when</Typography>
                <ul>
                  {component.useWhen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Avoid when</Typography>
                <ul>
                  {component.avoidWhen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="catalog-doc-section" id="component-api">
            <Typography as="h2" typeRole="heading-lg">
              API
            </Typography>
            <div className="catalog-api-table-wrap">
              <table
                aria-label={`${component.displayName ?? name} API properties`}
                className="catalog-api-table"
              >
                <thead>
                  <tr>
                    <th scope="col">Prop</th>
                    <th scope="col">Type</th>
                    <th scope="col">Default</th>
                    <th scope="col">Required</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiRows.map((prop) => (
                    <tr key={prop.name}>
                      <th scope="row">{prop.name}</th>
                      <td>{prop.type}</td>
                      <td>{prop.defaultValue ?? "—"}</td>
                      <td>{prop.required ? "Yes" : "No"}</td>
                      <td>{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="catalog-code-example">
              <Typography typeRole="overline">Minimal example</Typography>
              <pre>
                <code>{component.example ?? `<${name} />`}</code>
              </pre>
            </div>
          </section>
          <section className="catalog-doc-section" id="component-accessibility">
            <Typography as="h2" typeRole="heading-lg">
              Accessibility
            </Typography>
            <ul className="catalog-doc-list">
              {(component.accessibility ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="catalog-doc-section" id="component-states">
            <Typography as="h2" typeRole="heading-lg">
              Critical states
            </Typography>
            <ul className="catalog-doc-list">
              {(component.states ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section
            className="catalog-doc-section"
            id="component-responsive-motion"
          >
            <Typography as="h2" typeRole="heading-lg">
              Responsive and motion
            </Typography>
            <div className="catalog-guidance-grid">
              <div>
                <Typography typeRole="overline">Responsive</Typography>
                <ul>
                  {(component.responsive ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Motion</Typography>
                <ul>
                  {(component.motion ?? []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <aside className="catalog-detail-aside">
          <nav aria-label="On this page" className="catalog-on-this-page">
            <Typography typeRole="overline">On this page</Typography>
            {[
              ["component-preview", "Preview"],
              ["component-usage", "Usage"],
              ["component-api", "API"],
              ["component-accessibility", "Accessibility"],
              ["component-states", "Critical states"],
              ["component-responsive-motion", "Responsive and motion"],
            ].map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          {component.aliasOf ? (
            <section className="catalog-doc-section">
              <Typography as="h2" typeRole="heading-lg">
                Canonical contract
              </Typography>
              <p className="catalog-doc-copy">
                This entry is a compatibility alias. New work should use the
                canonical contract below.
              </p>
              <CatalogLink
                href={componentPath(component.aliasOf)}
                onNavigatePath={onNavigatePath}
              >
                {componentCatalog[component.aliasOf]?.displayName ??
                  component.aliasOf}
              </CatalogLink>
            </section>
          ) : null}
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Tokens
            </Typography>
            <div className="catalog-token-list">
              {(component.tokens ?? []).map((token) => (
                <span key={token}>{token}</span>
              ))}
            </div>
          </section>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Recipes
            </Typography>
            <div className="catalog-related-list">
              {component.recipes.map((recipe) =>
                recipeCatalog[recipe] ? (
                  <CatalogLink
                    href={recipePath(recipe)}
                    key={recipe}
                    onNavigatePath={onNavigatePath}
                  >
                    {recipeCatalog[recipe].displayName ?? recipe}
                  </CatalogLink>
                ) : (
                  <span className="catalog-doc-copy" key={recipe}>
                    {recipe === "all" ? "All composition recipes" : recipe}
                  </span>
                ),
              )}
            </div>
          </section>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Related
            </Typography>
            <div className="catalog-related-list">
              {related.length ? (
                related.map((relatedName) => (
                  <CatalogLink
                    href={componentPath(relatedName)}
                    key={relatedName}
                    onNavigatePath={onNavigatePath}
                  >
                    {componentCatalog[relatedName]?.displayName ?? relatedName}
                  </CatalogLink>
                ))
              ) : (
                <span className="catalog-doc-copy">
                  No related contracts listed.
                </span>
              )}
            </div>
          </section>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Alternatives
            </Typography>
            <div className="catalog-related-list">
              {alternatives.length ? (
                alternatives.map((relatedName) => (
                  <CatalogLink
                    href={componentPath(relatedName)}
                    key={relatedName}
                    onNavigatePath={onNavigatePath}
                  >
                    {componentCatalog[relatedName]?.displayName ?? relatedName}
                  </CatalogLink>
                ))
              ) : (
                <span className="catalog-doc-copy">
                  No semantic alternatives.
                </span>
              )}
            </div>
          </section>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Composes with
            </Typography>
            <div className="catalog-related-list">
              {composesWith.length ? (
                composesWith.map((relatedName) => (
                  <CatalogLink
                    href={componentPath(relatedName)}
                    key={relatedName}
                    onNavigatePath={onNavigatePath}
                  >
                    {componentCatalog[relatedName]?.displayName ?? relatedName}
                  </CatalogLink>
                ))
              ) : (
                <span className="catalog-doc-copy">
                  No composition links listed.
                </span>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export function ComponentLabExplorer() {
  const contentStress =
    new URLSearchParams(window.location.search).get("stress") === "content";
  return (
    <div
      className="library-page component-lab-page"
      data-lab-mode="interactive"
    >
      <PageHeader
        className="component-lab-page-header"
        description="Inspect canonical states, composition, and responsive behavior."
        meta={
          <span className="component-lab-page-meta">
            Local proof · no product state
          </span>
        }
        overline={
          <span className="component-lab-page-overline">
            <span aria-hidden="true" className="component-lab-page-icon">
              <T7Icon name="components" size={16} />
            </span>
            Component workbench · local proof
          </span>
        }
        title="Component Lab"
      />
      {contentStress ? (
        <ContentSafetyProof />
      ) : (
        <>
          <div
            aria-label="Component Lab mode"
            className="component-lab-context-bar"
          >
            <div className="component-lab-context-main">
              <span aria-hidden="true" className="component-lab-context-icon">
                <T7Icon name="components" size={17} />
              </span>
              <div>
                <Typography as="p" typeRole="overline">
                  Component patterns
                </Typography>
                <strong>Shared behavior in context.</strong>
                <small>
                  State, behavior, accessibility, and responsive checks.
                </small>
              </div>
            </div>
            <div
              className="component-lab-context-signals"
              aria-label="Lab signals"
            >
              <span>6 sections</span>
              <span>client-side</span>
              <span>local proof</span>
            </div>
          </div>
          <SectionNavigation
            className="component-lab-section-navigation"
            items={[
              { id: "component-lab-forms-feedback", label: "Forms" },
              { id: "component-lab-data-signals", label: "Data" },
              { id: "component-lab-overlays", label: "Overlays" },
              { id: "component-lab-surfaces", label: "Surfaces" },
              { id: "component-lab-charts", label: "Charts" },
              { id: "component-lab-navigation", label: "Flow" },
            ]}
            label="Component Lab sections"
            sticky
          />
          <ComponentProofs />
        </>
      )}
    </div>
  );
}

function IconCopyButton({ name }: { name: IconName }) {
  const { toast } = useToast();
  return (
    <button
      aria-label={`Copy semantic icon ${name}`}
      className="library-icon-tile"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(name);
        } catch {
          // The toast still confirms the semantic value when clipboard access is unavailable.
        }
        toast({
          description: `Copied ${name}`,
          duration: 2200,
          title: "Semantic icon copied",
          tone: "success",
        });
      }}
      type="button"
    >
      <span aria-hidden="true">
        <T7Icon name={name} size={22} />
      </span>
      <Typography typeRole="label">{name}</Typography>
    </button>
  );
}

function IconifyCopyButton({
  accentColor,
  familyLabel = "Solar",
  name,
  primaryColor,
}: {
  accentColor?: string;
  familyLabel?: string;
  name: IconifyIconName;
  primaryColor?: string;
}) {
  const { toast } = useToast();
  return (
    <button
      aria-label={`Copy ${familyLabel} icon ${name}`}
      className="library-icon-tile iconify-icon-tile"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(name);
        } catch {
          // Clipboard permissions can be unavailable in a local preview.
        }
        toast({
          description: `Copied ${name}`,
          duration: 2200,
          title: `${familyLabel} icon copied`,
          tone: "success",
        });
      }}
      title={`Copy ${name}`}
      type="button"
    >
      <span aria-hidden="true">
        <IconifyIcon
          accentColor={accentColor}
          name={name}
          primaryColor={primaryColor}
          size={24}
        />
      </span>
      <Typography typeRole="label">{name}</Typography>
    </button>
  );
}

export function IconsExplorer() {
  const [iconifyQuery, setIconifyQuery] = useState("");
  const [semanticQuery, setSemanticQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [customAccent, setCustomAccent] = useState<string>();
  const [customPrimary, setCustomPrimary] = useState<string>();
  const [visibleIconifyCount, setVisibleIconifyCount] = useState(96);
  const { theme } = useTen4SevenTheme();
  const normalizedIconifyQuery = iconifyQuery.trim().toLowerCase();
  const normalizedSemanticQuery = semanticQuery.trim().toLowerCase();
  const groupNames = new Set(
    activeGroup === "All"
      ? IconNames
      : (iconGroups.find((group) => group.label === activeGroup)?.names ?? []),
  );
  const shownNames = IconNames.filter((name) => {
    const contract = iconCatalog[name];
    return (
      groupNames.has(name) &&
      (!normalizedSemanticQuery ||
        [name, ...(contract?.useWhen ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSemanticQuery))
    );
  });
  const themeVariables = buildThemeVariables(theme);
  const defaultPrimaryHex = hslToHex(themeVariables["--t7-primary-hsl"]);
  const defaultAccentHex = hslToHex(themeVariables["--t7-accent-hsl"]);
  const filteredIconifyNames = useMemo(() => {
    return IconifyBoldDuotoneIconNames.filter((name) => {
      return (
        !normalizedIconifyQuery ||
        name.toLowerCase().includes(normalizedIconifyQuery)
      );
    });
  }, [normalizedIconifyQuery]);
  useEffect(() => {
    setVisibleIconifyCount(96);
  }, [normalizedIconifyQuery]);
  const visibleIconifyNames = filteredIconifyNames.slice(
    0,
    visibleIconifyCount,
  );
  const remainingIconifyCount =
    filteredIconifyNames.length - visibleIconifyNames.length;
  const featuredIconifyNames = [
    "home-angle-bold-duotone",
    "palette-bold-duotone",
    "chart-square-bold-duotone",
    "box-bold-duotone",
  ];

  return (
    <div className="library-page">
      <LibraryPageHeader
        count={`${IconifyBoldDuotoneIconCount.toLocaleString()} Solar Bold Duotone icons`}
        description="A focused local Iconify family with one cohesive filled-and-layered visual language. No CDN request is needed at runtime."
        icon="components"
        overline="Library · semantic assets"
        title="Icons"
      />
      <Input
        aria-label="Search semantic icons"
        className="library-search"
        label="Search icons"
        leadingIcon="search"
        onChange={(event) => setSemanticQuery(event.target.value)}
        placeholder="warehouse, export, cart…"
        value={semanticQuery}
      />
      <div
        aria-label="Icon categories"
        className="catalog-filter-tabs"
        role="group"
      >
        {["All", ...iconGroups.map((group) => group.label)].map((label) => (
          <button
            aria-pressed={activeGroup === label}
            className="catalog-filter-tab"
            key={label}
            onClick={() => setActiveGroup(label)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <Typography className="icon-registry-proof" typeRole="caption">
        {IconNames.length} semantic icons · {iconGroups.length} intent families
      </Typography>
      <section className="library-section iconify-theme-section">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Theme-aware duotone
            </Typography>
            <Typography typeRole="body-sm">
              The logo palette is the default: duotone layers use the active
              primary and accent theme tokens. Pick custom colors to preview an
              asset-specific variant without changing the shell.
            </Typography>
          </div>
          <span className="iconify-family-count">
            {IconifyBoldDuotoneIconCount.toLocaleString()} family glyphs
          </span>
        </div>
        <div className="iconify-theme-layout">
          <div className="iconify-theme-preview" data-iconify-preview>
            {featuredIconifyNames.map((name) => (
              <span aria-hidden="true" key={name}>
                <IconifyIcon
                  accentColor={customAccent}
                  name={name}
                  primaryColor={customPrimary}
                  size={38}
                />
              </span>
            ))}
          </div>
          <div className="iconify-theme-controls">
            <Input
              aria-label="Duotone main color"
              className="iconify-color-input"
              label="Main / primary"
              onChange={(event) => setCustomPrimary(event.target.value)}
              type="color"
              value={customPrimary ?? defaultPrimaryHex}
            />
            <Input
              aria-label="Duotone accent color"
              className="iconify-color-input"
              label="Accent / secondary"
              onChange={(event) => setCustomAccent(event.target.value)}
              type="color"
              value={customAccent ?? defaultAccentHex}
            />
            <Button
              intent="quiet"
              onClick={() => {
                setCustomAccent(undefined);
                setCustomPrimary(undefined);
              }}
              size="sm"
            >
              Use theme colors
            </Button>
          </div>
        </div>
        <Typography className="iconify-theme-note" typeRole="caption">
          Logo palette:{" "}
          {typeof theme.primarySource === "string"
            ? theme.primarySource
            : theme.primarySource.value}{" "}
          main ·{" "}
          {typeof theme.accentSource === "string"
            ? theme.accentSource
            : theme.accentSource.value}{" "}
          accent · custom values stay local to this preview.
        </Typography>
      </section>
      <section className="library-section">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Semantic glyphs
            </Typography>
            <Typography typeRole="body-sm">
              {shownNames.length} result{shownNames.length === 1 ? "" : "s"}.
              Provider identifiers stay an implementation detail.
            </Typography>
          </div>
        </div>
        {shownNames.length ? (
          <div className="library-icon-grid compact-icon-grid">
            {shownNames.map((name) => (
              <IconCopyButton key={name} name={name} />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Try a semantic intent, domain, or action."
            icon="search"
            title="No semantic icons match"
          />
        )}
      </section>
      <section
        className="library-section iconify-curated-section"
        data-iconify-count={IconifyCuratedIconCount}
        data-iconify-family="ten4seven-curated"
      >
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Curated farm &amp; operations
            </Typography>
            <Typography typeRole="body-sm">
              A small, governed Iconify extension for farm nouns, money, and
              directional controls. Every glyph is bundled locally, normalized
              to the 24px canvas, and rendered with theme-aware paints.
            </Typography>
          </div>
          <Typography className="icon-registry-proof" typeRole="caption">
            {IconifyCuratedIconCount} curated glyphs
          </Typography>
        </div>
        <div
          aria-label="Curated farm and operations icons"
          className="library-icon-grid iconify-icon-grid"
        >
          {IconifyCuratedIconNames.map((name) => (
            <IconifyCopyButton
              accentColor={customAccent}
              familyLabel="Curated"
              key={name}
              name={name}
              primaryColor={customPrimary}
            />
          ))}
        </div>
      </section>
      <section
        className="library-section iconify-catalog-section"
        data-iconify-count={IconifyBoldDuotoneIconCount}
        data-iconify-family="bold-duotone"
      >
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Solar Bold Duotone library
            </Typography>
            <Typography typeRole="body-sm">
              Browse one cohesive 24px glyph family. Copy a local Solar name for
              use with <code>IconifyIcon</code>.
            </Typography>
          </div>
          <Typography className="icon-registry-proof" typeRole="caption">
            {filteredIconifyNames.length.toLocaleString()} matches
          </Typography>
        </div>
        <Input
          aria-label="Search Solar Bold Duotone icons"
          className="library-search"
          label="Search Solar Bold Duotone icons"
          leadingIcon="search"
          onChange={(event) => setIconifyQuery(event.target.value)}
          placeholder="home, arrow, calendar…"
          value={iconifyQuery}
        />
        <div aria-label="Solar icon family" className="iconify-family-badge">
          <span>Family</span>
          <strong>Bold Duotone</strong>
          <span>{IconifyBoldDuotoneIconCount.toLocaleString()} glyphs</span>
        </div>
        {visibleIconifyNames.length > 0 ? (
          <div className="library-icon-grid iconify-icon-grid">
            {visibleIconifyNames.map((name) => (
              <IconifyCopyButton
                accentColor={customAccent}
                key={name}
                name={name}
                primaryColor={customPrimary}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            description="Try a shorter name or browse the full bundled family."
            icon="search"
            title="No Solar icons match"
          />
        )}
        {remainingIconifyCount > 0 ? (
          <div className="iconify-load-more">
            <Button
              intent="secondary"
              onClick={() =>
                setVisibleIconifyCount((count) =>
                  Math.min(count + 96, filteredIconifyNames.length),
                )
              }
              size="sm"
            >
              Show 96 more · {remainingIconifyCount.toLocaleString()} left
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export function RecipesExplorer({
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeProfile, setActiveProfile] = useState("All");
  const profiles = [
    "All",
    ...new Set(
      Object.values(recipeCatalog).flatMap((recipe) => recipe.profiles),
    ),
  ];
  const normalizedQuery = query.trim().toLowerCase();
  const entries = Object.entries(recipeCatalog).filter(([name, recipe]) => {
    const profileMatches =
      activeProfile === "All" || recipe.profiles.includes(activeProfile);
    const queryMatches =
      !normalizedQuery ||
      [
        name,
        recipe.displayName ?? "",
        recipe.purpose,
        ...recipe.profiles,
        ...recipe.components,
        ...(recipe.references ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    return profileMatches && queryMatches;
  });

  return (
    <div className="library-page">
      <LibraryPageHeader
        count={`${Object.keys(recipeCatalog).length} composition recipes`}
        description="Recipes describe composition anatomy so agents choose known structures before inventing local UI."
        icon="table"
        overline="Library · composition recipes"
        title="Recipes"
      />
      <Input
        aria-label="Search recipes"
        className="library-search"
        label="Search recipes"
        leadingIcon="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Entity list, catalog, approval…"
        value={query}
      />
      <div
        aria-label="Recipe profiles"
        className="catalog-filter-tabs"
        role="group"
      >
        {profiles.map((profile) => (
          <button
            aria-pressed={activeProfile === profile}
            className="catalog-filter-tab"
            key={profile}
            onClick={() => setActiveProfile(profile)}
            type="button"
          >
            {profile === "All"
              ? profile
              : profile.charAt(0).toUpperCase() + profile.slice(1)}
          </button>
        ))}
      </div>
      <section className="library-section">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Recipe index
            </Typography>
            <Typography typeRole="body-sm">
              {entries.length} of {Object.keys(recipeCatalog).length} recipes ·
              open one to inspect its flow and jump directly to the component
              contracts it names.
            </Typography>
          </div>
        </div>
        {entries.length ? (
          <div className="catalog-list">
            {entries.map(([name, recipe]) => (
              <CatalogListRow
                description={recipe.purpose}
                href={recipePath(name)}
                key={name}
                onNavigatePath={onNavigatePath}
                trailing={
                  <span className="catalog-list-row-category">
                    {recipe.profiles.join(" · ")}
                  </span>
                }
              >
                {recipe.displayName ?? name}
              </CatalogListRow>
            ))}
          </div>
        ) : (
          <EmptyState
            action={
              <Button
                intent="quiet"
                onClick={() => {
                  setActiveProfile("All");
                  setQuery("");
                }}
                size="sm"
              >
                Clear filters
              </Button>
            }
            description="Try another recipe name, profile, or composition concern."
            icon="search"
            title="No matching recipes"
          />
        )}
      </section>
    </div>
  );
}

function recipeRelationshipPath(relationship: string) {
  const target = relationship.split("→").at(-1)?.trim();
  const entry = Object.entries(recipeCatalog).find(
    ([id, recipe]) => id === target || recipe.displayName === target,
  );
  return entry ? recipePath(entry[0]) : "#";
}

export function RecipeDetailExplorer({
  name,
  onNavigatePath,
}: {
  name: string;
  onNavigatePath: (path: string) => void;
}) {
  const recipe = recipeCatalog[name];
  if (!recipe) return null;
  const blockRoles = recipe.blockRoles;
  const operational = recipe.operational;
  return (
    <div className="library-page recipe-detail-page">
      <LibraryPageHeader
        count={recipe.profiles.join(" · ")}
        description={recipe.purpose}
        icon="table"
        overline="Recipes · composition contract"
        title={recipe.displayName ?? name}
      />
      <div className="catalog-detail-layout">
        <div className="catalog-detail-main">
          {recipe.shell ? (
            <section className="catalog-doc-section" id="recipe-shell">
              <Typography as="h2" typeRole="heading-lg">
                Shell selection
              </Typography>
              <p className="catalog-doc-copy">
                Prefer the canonical {recipe.shell.preferred} contract for this
                composition. {recipe.shell.selectionRule}
              </p>
              {recipe.shell.alternatives?.length ? (
                <div className="catalog-related-list">
                  {recipe.shell.alternatives.map((shell) => (
                    <CatalogLink
                      href={
                        componentCatalog[shell] ? componentPath(shell) : "#"
                      }
                      key={shell}
                      onNavigatePath={onNavigatePath}
                    >
                      Alternative:{" "}
                      {componentCatalog[shell]?.displayName ?? shell}
                    </CatalogLink>
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}
          {recipe.blocks?.length ? (
            <section className="catalog-doc-section" id="recipe-blocks">
              <Typography as="h2" typeRole="heading-lg">
                Blocks
              </Typography>
              {blockRoles ? (
                <div className="catalog-recipe-role-stack">
                  <RecipeBlockRoleList
                    names={blockRoles.required}
                    onNavigatePath={onNavigatePath}
                    role="required"
                  />
                  <RecipeBlockRoleList
                    names={blockRoles.recommended}
                    onNavigatePath={onNavigatePath}
                    role="recommended"
                  />
                  <RecipeBlockRoleList
                    names={blockRoles.optional}
                    onNavigatePath={onNavigatePath}
                    role="optional"
                  />
                </div>
              ) : (
                <ol className="catalog-recipe-flow">
                  {recipe.blocks.map((block, index) => (
                    <li key={block}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <CatalogLink
                        href={blockCatalog[block] ? blockPath(block) : "#"}
                        onNavigatePath={onNavigatePath}
                      >
                        {blockCatalog[block]?.displayName ?? block}
                      </CatalogLink>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ) : null}
          <section className="catalog-doc-section" id="recipe-components">
            <Typography as="h2" typeRole="heading-lg">
              {recipe.blocks?.length ? "Supporting components" : "Anatomy"}
            </Typography>
            <ol className="catalog-recipe-flow">
              {recipe.components.map((component, index) => (
                <li key={component}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <CatalogLink
                    href={
                      componentCatalog[component]
                        ? componentPath(component)
                        : "#"
                    }
                    onNavigatePath={onNavigatePath}
                  >
                    {componentCatalog[component]?.displayName ?? component}
                  </CatalogLink>
                </li>
              ))}
            </ol>
          </section>
          <section className="catalog-doc-section" id="recipe-optional">
            <Typography as="h2" typeRole="heading-lg">
              {recipe.blocks?.length ? "Optional components" : "Optional"}
            </Typography>
            <div className="catalog-related-list">
              {recipe.optional?.length ? (
                recipe.optional.map((component) => (
                  <CatalogLink
                    href={
                      componentCatalog[component]
                        ? componentPath(component)
                        : "#"
                    }
                    key={component}
                    onNavigatePath={onNavigatePath}
                  >
                    {componentCatalog[component]?.displayName ?? component}
                  </CatalogLink>
                ))
              ) : (
                <span className="catalog-doc-copy">
                  No optional contracts listed.
                </span>
              )}
            </div>
          </section>
          {operational ? (
            <>
              <section
                className="catalog-doc-section"
                id="recipe-operational-guidance"
              >
                <Typography as="h2" typeRole="heading-lg">
                  Use and avoid
                </Typography>
                <div className="catalog-guidance-grid">
                  <div>
                    <Typography typeRole="overline">Use when</Typography>
                    <ul>
                      {operational.useWhen.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography typeRole="overline">Avoid when</Typography>
                    <ul>
                      {operational.avoidWhen.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section
                className="catalog-doc-section"
                id="recipe-operational-semantics"
              >
                <Typography as="h2" typeRole="heading-lg">
                  Operational semantics
                </Typography>
                <Typography as="p" typeRole="body-sm">
                  The pattern is mature only when its object, state, movement,
                  exception, owner, next action, and trace remain explicit.
                </Typography>
                <div className="catalog-guidance-grid">
                  <div>
                    <Typography typeRole="overline">Anatomy</Typography>
                    <ul>
                      {operational.anatomy.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography typeRole="overline">
                      Required semantics
                    </Typography>
                    <ul>
                      {operational.requiredSemantics.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {operational.optionalSemantics?.length ? (
                  <div>
                    <Typography typeRole="overline">
                      Optional semantics
                    </Typography>
                    <ul className="catalog-doc-list">
                      {operational.optionalSemantics.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>

              <section
                className="catalog-doc-section"
                id="recipe-operational-responsive"
              >
                <Typography as="h2" typeRole="heading-lg">
                  Responsive behavior
                </Typography>
                <dl className="catalog-operational-responsive">
                  {Object.entries(operational.responsive).map(
                    ([viewport, guidance]) => (
                      <div key={viewport}>
                        <dt>{viewport}</dt>
                        <dd>{guidance}</dd>
                      </div>
                    ),
                  )}
                </dl>
              </section>

              <section
                className="catalog-doc-section"
                id="recipe-operational-ai"
              >
                <Typography as="h2" typeRole="heading-lg">
                  Accessibility and AI guidance
                </Typography>
                <p className="catalog-doc-copy">{operational.aiGuidance}</p>
                <div className="catalog-guidance-grid">
                  <div>
                    <Typography typeRole="overline">Accessibility</Typography>
                    <ul>
                      {operational.accessibility.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography typeRole="overline">Anti-patterns</Typography>
                    <ul>
                      {operational.antiPatterns.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {operational.relationships?.length ? (
                  <div>
                    <Typography typeRole="overline">
                      Related operational patterns
                    </Typography>
                    <div className="catalog-related-list">
                      {operational.relationships.map((relationship) => (
                        <CatalogLink
                          href={recipeRelationshipPath(relationship)}
                          key={relationship}
                          onNavigatePath={onNavigatePath}
                        >
                          {recipeCatalog[relationship]?.displayName ??
                            relationship}
                        </CatalogLink>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            </>
          ) : null}
        </div>
        <aside className="catalog-detail-aside">
          <nav aria-label="On this page" className="catalog-on-this-page">
            <Typography typeRole="overline">On this page</Typography>
            {recipe.shell ? <a href="#recipe-shell">Shell selection</a> : null}
            {recipe.blocks?.length ? <a href="#recipe-blocks">Blocks</a> : null}
            <a href="#recipe-components">
              {recipe.blocks?.length ? "Supporting components" : "Anatomy"}
            </a>
            <a href="#recipe-optional">
              {recipe.blocks?.length ? "Optional components" : "Optional"}
            </a>
            {operational ? (
              <>
                <a href="#recipe-operational-guidance">Use and avoid</a>
                <a href="#recipe-operational-semantics">Semantics</a>
                <a href="#recipe-operational-responsive">Responsive</a>
                <a href="#recipe-operational-ai">Accessibility and AI</a>
              </>
            ) : null}
          </nav>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Reference graph
            </Typography>
            <p className="catalog-doc-copy">
              This recipe is a composition contract. Product references
              demonstrate it in context; they are not additional component
              implementations.
            </p>
            <div className="catalog-related-list">
              {recipe.references?.length ? (
                recipe.references.map((reference) => (
                  <CatalogLink
                    href={
                      reference === "Operations Tracker"
                        ? "/operations-tracker"
                        : reference === "Publishing Store"
                          ? "/ebook-store"
                          : reference === "AAPM Operational Reference"
                            ? "/operational-patterns"
                            : "#"
                    }
                    key={reference}
                    onNavigatePath={onNavigatePath}
                  >
                    {reference}
                  </CatalogLink>
                ))
              ) : (
                <span className="catalog-doc-copy">
                  No product reference is attached to this recipe.
                </span>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function BlockCatalogMedia({ variant = "signal" }: { variant?: string }) {
  return (
    <MediaFrame
      aria-label={`${variant} block preview media`}
      className={`block-catalog-media block-catalog-media--${variant}`}
      ratio={1.55}
      tone="subtle"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <T7Icon aria-hidden="true" name="components" size={24} />
    </MediaFrame>
  );
}

function BlockPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "hero-split":
      return (
        <Hero
          description="Lead with a proposition, then support it with useful proof."
          headingLevel="h2"
          media={<BlockCatalogMedia variant="hero" />}
          primaryAction={<Button size="sm">Get started</Button>}
          title="A clear starting point"
          variant="split"
        />
      );
    case "cta-contained":
      return (
        <CtaBlock
          actions={<Button size="sm">Continue</Button>}
          description="One next step, with enough context to choose it."
          title="Ready for the next step?"
        />
      );
    case "feature-showcase":
      return (
        <FeatureShowcase
          items={[
            {
              description: "A concise supporting capability.",
              icon: "check",
              id: "one",
              title: "Useful by default",
            },
            {
              description: "An explicit contract keeps the edge clear.",
              icon: "components",
              id: "two",
              title: "Composed, not forked",
            },
          ]}
          leadMedia={
            <ChartPanel
              description="A small tokenized trend"
              title="Readable signal"
              chart={
                <LineChart
                  ariaLabel="Block preview trend"
                  labels={["A", "B", "C", "D"]}
                  series={[
                    { id: "preview", label: "Usage", values: [18, 25, 22, 34] },
                  ]}
                />
              }
            />
          }
          title="Support the proposition"
        />
      );
    case "stats-section":
      return (
        <StatsSection
          items={[
            {
              detail: "shared contracts",
              id: "one",
              label: "Components",
              value: String(catalogCounts.canonicalComponents),
            },
            {
              detail: "known structures",
              id: "two",
              label: "Recipes",
              value: String(catalogCounts.recipes),
            },
            {
              detail: "semantic names",
              id: "three",
              label: "Icons",
              value: String(IconNames.length),
            },
          ]}
          title="Proof with context"
        />
      );
    case "logo-cloud":
      return (
        <LogoCloud
          items={[
            {
              mark: <T7Icon name="components" size={15} />,
              name: "Product teams",
            },
            {
              mark: <T7Icon name="book" size={15} />,
              name: "Publishing teams",
            },
            {
              mark: <T7Icon name="analytics" size={15} />,
              name: "Signal House",
            },
          ]}
          label="A quiet trust row"
        />
      );
    case "testimonials":
      return (
        <Testimonials
          items={[
            {
              avatar: "MP",
              company: "Platform team",
              id: "one",
              name: "Maya Patel",
              quote: "Specific proof reads better than decorative noise.",
              role: "Design systems lead",
            },
          ]}
          title="A useful point of view"
        />
      );
    case "pricing-section":
      return (
        <PricingSection
          plans={[
            {
              action: <Button size="sm">Choose plan</Button>,
              description: "A focused starting point.",
              features: ["Tokens", "Components"],
              id: "preview",
              name: "Starter",
              price: "Free",
            },
          ]}
          title="Compare clearly"
        />
      );
    case "content-showcase":
      return (
        <ContentShowcase
          items={[
            {
              action: (
                <Button intent="quiet" size="sm" trailingIcon="arrowRight">
                  Read more
                </Button>
              ),
              description: "A content card with a useful, bounded action.",
              id: "preview",
              media: <BlockCatalogMedia variant="content" />,
              meta: "Guide · Foundations",
              title: "Read the rationale",
            },
          ]}
          title="Content with structure"
        />
      );
    case "product-showcase":
      return (
        <ProductShowcase
          description="Reuse product anatomy in a content-led section."
          title="Browse a set"
        >
          <div className="block-catalog-product-preview">
            <ProductCard
              actions={
                <Button intent="quiet" size="sm">
                  View guide
                </Button>
              }
              eyebrow="Guide"
              media={<BlockCatalogMedia variant="product" />}
              meta="8 min read"
              title="A considered product surface"
            />
          </div>
        </ProductShowcase>
      );
    case "announcement-bar":
      return (
        <AnnouncementBar dismissible>
          A short update can sit above the page without taking over the page.
        </AnnouncementBar>
      );
    case "carousel":
      return (
        <Carousel label="Block preview carousel" slideWidth={220}>
          <Card>
            <CardContent>
              <Typography as="h3" typeRole="heading-md">
                First slide
              </Typography>
              <Typography typeRole="body-sm">
                Native scroll remains available.
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography as="h3" typeRole="heading-md">
                Second slide
              </Typography>
              <Typography typeRole="body-sm">
                Controls and indicators are shared.
              </Typography>
            </CardContent>
          </Card>
        </Carousel>
      );
    case "public-footer":
      return (
        <PublicFooter
          brand={<Typography typeRole="label">ten4seven UI</Typography>}
          groups={[
            { items: [{ href: "#", label: "Components" }], label: "Explore" },
            { items: [{ href: "#", label: "Recipes" }], label: "Learn" },
          ]}
          legal="A concise footer keeps the ending useful."
        />
      );
    default:
      return (
        <Card>
          <CardContent>
            <Typography as="h3" typeRole="heading-md">
              Preview unavailable
            </Typography>
          </CardContent>
        </Card>
      );
  }
}

export function BlocksExplorer({
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(Object.values(blockCatalog).map((block) => block.category)),
  ];
  const normalizedQuery = query.trim().toLowerCase();
  const entries = Object.entries(blockCatalog).filter(([slug, block]) => {
    const categoryMatches =
      activeCategory === "All" || block.category === activeCategory;
    const queryMatches =
      !normalizedQuery ||
      [slug, block.displayName, block.category, block.purpose, ...block.useWhen]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    return categoryMatches && queryMatches;
  });

  return (
    <div className="library-page blocks-explorer-page">
      <LibraryPageHeader
        count={`${catalogCounts.blocks} expressive block families`}
        description="Reusable page-level compositions for public, content, commerce, and product surfaces. Blocks compose canonical contracts; they do not replace them."
        icon="components"
        overline="Library · expressive composition"
        title="Blocks"
      />

      <nav aria-label="Composition hierarchy" className="block-layer-rail">
        {[
          { href: "/tokens", label: "Foundations" },
          { href: "/components/actions", label: "Primitives" },
          { href: "/components", label: "Components" },
          { href: "/components/patterns", label: "Patterns" },
          { href: "/blocks", label: "Blocks" },
          { href: "/recipes", label: "Recipes" },
        ].map((layer) => (
          <CatalogLink
            ariaCurrent={layer.label === "Blocks" ? "page" : undefined}
            className={layer.label === "Blocks" ? "is-active" : undefined}
            href={layer.href}
            key={layer.label}
            onNavigatePath={onNavigatePath}
          >
            {layer.label}
          </CatalogLink>
        ))}
      </nav>

      <Input
        aria-label="Search expressive blocks"
        className="library-search"
        label="Search blocks"
        leadingIcon="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Hero, testimonials, carousel…"
        value={query}
      />
      <div
        aria-label="Block categories"
        className="catalog-filter-tabs"
        role="group"
      >
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className="catalog-filter-tab"
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <section aria-live="polite" className="block-catalog-grid">
        {entries.map(([slug, block]) => (
          <article className="block-catalog-card" key={slug}>
            <div className="block-catalog-card-heading">
              <div>
                <Typography typeRole="overline">{block.category}</Typography>
                <Typography as="h2" typeRole="heading-md">
                  {block.displayName}
                </Typography>
              </div>
              <span>{block.variants.length} variants</span>
            </div>
            <Typography className="block-catalog-purpose" typeRole="body-sm">
              {block.purpose}
            </Typography>
            <div className="block-catalog-preview">
              <BlockPreview slug={slug} />
            </div>
            <div className="block-catalog-card-footer">
              <span>{block.requiredComponents.slice(0, 2).join(" · ")}</span>
              <CatalogLink
                href={blockPath(block.displayName)}
                onNavigatePath={onNavigatePath}
              >
                Inspect contract{" "}
                <T7Icon aria-hidden="true" name="arrowRight" size={14} />
              </CatalogLink>
            </div>
          </article>
        ))}
      </section>
      {entries.length === 0 ? (
        <EmptyState
          description="Try another block name or category."
          icon="search"
          title="No matching blocks"
        />
      ) : null}
    </div>
  );
}

export function BlockDetailExplorer({
  name,
  onNavigatePath,
}: {
  name: string;
  onNavigatePath: (path: string) => void;
}) {
  const block = blockCatalog[name];
  if (!block) return null;
  const componentLink = (componentName: string) =>
    componentCatalog[componentName] ? componentPath(componentName) : "#";
  const blockSlug = name;

  return (
    <div className="library-page block-detail-page">
      <LibraryPageHeader
        count={`${block.category} · ${block.variants.length} variants`}
        description={block.purpose}
        icon="components"
        overline="Blocks · composition contract"
        title={block.displayName}
      />
      <div className="catalog-detail-layout">
        <div className="catalog-detail-main">
          <section
            className="catalog-doc-section catalog-preview-section"
            id="block-preview"
          >
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Preview
                </Typography>
                <Typography typeRole="body-sm">
                  A live composition preview using the canonical ten4seven UI
                  contracts.
                </Typography>
              </div>
            </div>
            <div className="block-catalog-detail-preview">
              <BlockPreview slug={blockSlug ?? ""} />
            </div>
          </section>
          <section className="catalog-doc-section" id="block-usage">
            <Typography as="h2" typeRole="heading-lg">
              Usage
            </Typography>
            <div className="catalog-guidance-grid">
              <div>
                <Typography typeRole="overline">Use when</Typography>
                <ul>
                  {block.useWhen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Avoid when</Typography>
                <ul>
                  {block.avoidWhen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="catalog-doc-section" id="block-anatomy">
            <Typography as="h2" typeRole="heading-lg">
              Anatomy and content
            </Typography>
            <div className="block-detail-columns">
              <div>
                <Typography typeRole="overline">Required contracts</Typography>
                <div className="catalog-related-list">
                  {block.requiredComponents.map((componentName) => (
                    <CatalogLink
                      href={componentLink(componentName)}
                      key={componentName}
                      onNavigatePath={onNavigatePath}
                    >
                      {componentCatalog[componentName]?.displayName ??
                        componentName}
                    </CatalogLink>
                  ))}
                </div>
              </div>
              <div>
                <Typography typeRole="overline">Optional contracts</Typography>
                <div className="catalog-related-list">
                  {block.optionalComponents.length ? (
                    block.optionalComponents.map((componentName) => (
                      <CatalogLink
                        href={componentLink(componentName)}
                        key={componentName}
                        onNavigatePath={onNavigatePath}
                      >
                        {componentCatalog[componentName]?.displayName ??
                          componentName}
                      </CatalogLink>
                    ))
                  ) : (
                    <span className="catalog-doc-copy">
                      No optional contracts listed.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="block-content-slots">
              <Typography typeRole="overline">Content slots</Typography>
              <div className="catalog-token-list">
                {block.contentSlots.map((slot) => (
                  <span key={slot}>{slot}</span>
                ))}
              </div>
            </div>
          </section>
          <section className="catalog-doc-section" id="block-quality">
            <Typography as="h2" typeRole="heading-lg">
              Quality contract
            </Typography>
            <div className="catalog-guidance-grid block-quality-grid">
              <div>
                <Typography typeRole="overline">Responsive</Typography>
                <ul>
                  {block.responsive.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Motion</Typography>
                <ul>
                  {block.motion.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Accessibility</Typography>
                <ul>
                  {block.accessibility.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Typography typeRole="overline">Performance</Typography>
                <ul>
                  {block.performance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="catalog-doc-section" id="block-example">
            <Typography as="h2" typeRole="heading-lg">
              Minimal example
            </Typography>
            <div className="catalog-code-example">
              <pre>
                <code>{block.example}</code>
              </pre>
            </div>
          </section>
        </div>
        <aside className="catalog-detail-aside">
          <nav aria-label="On this page" className="catalog-on-this-page">
            <Typography typeRole="overline">On this page</Typography>
            {[
              ["block-preview", "Preview"],
              ["block-usage", "Usage"],
              ["block-anatomy", "Anatomy and content"],
              ["block-quality", "Quality contract"],
              ["block-example", "Minimal example"],
            ].map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Recommended recipes
            </Typography>
            <div className="catalog-related-list">
              {block.recommendedRecipes.map((recipeName) => (
                <CatalogLink
                  href={
                    recipeCatalog[recipeName] ? recipePath(recipeName) : "#"
                  }
                  key={recipeName}
                  onNavigatePath={onNavigatePath}
                >
                  {recipeCatalog[recipeName]?.displayName ?? recipeName}
                </CatalogLink>
              ))}
            </div>
          </section>
          <section className="catalog-doc-section">
            <Typography as="h2" typeRole="heading-lg">
              Layer boundary
            </Typography>
            <p className="catalog-doc-copy">
              This is a block-level composition. Product routes choose its
              content and business behavior; canonical primitives keep its
              interaction language stable.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
