import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  IconifyIcon,
  IconifyBoldDuotoneIconCount,
  IconifyBoldDuotoneIconNames,
  IconNames,
  T7Icon,
  type IconName,
} from "@ten4seven/icons";
import { paletteProfiles } from "@ten4seven/tokens";
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
  StatsSection,
  Testimonials,
  Typography,
  useToast,
  useTen4SevenTheme,
} from "@ten4seven/ui";
import { ComponentProofs } from "./component-proofs";
import { ContentSafetyProof } from "./content-safety-proof";
import { ComponentPreview } from "./component-preview-fixtures";
import {
  blockCatalog,
  blockPath,
  catalogCounts,
  categoryLabels,
  componentCatalog,
  componentFamilyAnchor,
  componentFamilyDefinitions,
  componentPath,
  componentsInCategory,
  iconCatalog,
  recipeCatalog,
  recipePath,
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

function LibraryIntro({
  count,
  description,
  icon,
  title,
}: {
  count: string;
  description: string;
  icon: IconName;
  title: string;
}) {
  return (
    <section className="library-intro">
      <span className="library-intro-icon">
        <T7Icon name={icon} size={22} />
      </span>
      <div>
        <Typography as="h1" typeRole="display-lg">
          {title}
        </Typography>
        <Typography as="p" typeRole="body">
          {description}
        </Typography>
      </div>
      <Typography className="library-intro-count" typeRole="caption">
        {count}
      </Typography>
    </section>
  );
}

export { TokensExplorer } from "./token-foundations";

function CatalogLink({
  children,
  className,
  href,
  onNavigatePath,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  onNavigatePath: (path: string) => void;
}) {
  return (
    <a
      className={className}
      href={href}
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
  query,
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
  query: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const entries = Object.entries(componentCatalog)
    .filter(([name, component]) =>
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
    )
    .slice(0, 12);

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
            {entries.length} matching catalog result
            {entries.length === 1 ? "" : "s"}
          </Typography>
        </div>
      </div>
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
    </section>
  );
}

export function ComponentsExplorer({
  onNavigatePath,
}: {
  onNavigatePath: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeFamily, setActiveFamily] = useState("foundation");
  const catalogDocumentRef = useRef<HTMLDivElement>(null);
  const commonComponents = [
    "Button",
    "Input",
    "Select",
    "Card",
    "Modal",
    "DataTable",
  ];

  useEffect(() => {
    const root = catalogDocumentRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-catalog-family]"),
    );
    const updateActiveFamily = () => {
      const visible = sections
        .filter((section) => section.getBoundingClientRect().top <= 148)
        .at(-1);
      if (visible?.dataset.catalogFamily)
        setActiveFamily(visible.dataset.catalogFamily);
    };
    const observer = new IntersectionObserver(updateActiveFamily, {
      rootMargin: "-96px 0px -62% 0px",
      threshold: [0, 1],
    });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", updateActiveFamily, { passive: true });
    updateActiveFamily();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveFamily);
    };
  }, []);

  const familyDescriptions: Record<string, string> = {
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
    "date-time":
      "Calendar, range, time, and date-time entry with stable values.",
    file: "Client-side file selection, upload affordances, and file records.",
    chart: "Token-led charts and compact trend visualizations.",
    media: "Responsive media frames, thumbnails, and content-safe imagery.",
    commerce:
      "Catalog, cart, pricing, and order composition without a second primitive set.",
    pattern: "Reusable application flows composed from the contracts above.",
  };

  return (
    <div className="library-page">
      <LibraryIntro
        count={`${catalogCounts.canonicalComponents} canonical · ${catalogCounts.components} catalog contracts`}
        description="A compact index of the canonical ten4seven UI library. Choose a family or search for one contract to open its documentation."
        icon="components"
        title="Components"
      />

      <div
        className="library-overview-stats"
        aria-label="Component catalog counts"
      >
        <div>
          <strong>{catalogCounts.canonicalComponents}</strong>
          <span>canonical implementations</span>
        </div>
        <div>
          <strong>{componentFamilyDefinitions.length}</strong>
          <span>component families</span>
        </div>
        <div>
          <strong>
            {catalogCounts.components - catalogCounts.canonicalComponents}
          </strong>
          <span>documented aliases</span>
        </div>
      </div>

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
        <CatalogSearchResults onNavigatePath={onNavigatePath} query={query} />
      ) : (
        <>
          <section className="library-section">
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Common components
                </Typography>
                <Typography typeRole="body-sm">
                  Frequently reached contracts for everyday product work.
                </Typography>
              </div>
            </div>
            <div className="catalog-list catalog-list-compact">
              {commonComponents.map((name) => (
                <CatalogListRow
                  description={componentCatalog[name].purpose}
                  href={componentPath(name)}
                  key={name}
                  onNavigatePath={onNavigatePath}
                >
                  {componentCatalog[name].displayName ?? name}
                </CatalogListRow>
              ))}
            </div>
          </section>

          <section className="library-section">
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Browse by family
                </Typography>
                <Typography typeRole="body-sm">
                  Use the page anchors for a quick scan; every contract remains
                  in this document.
                </Typography>
              </div>
            </div>
            <div className="catalog-family-list">
              {componentFamilyDefinitions.map((family) => (
                <CatalogLink
                  className="catalog-family-row"
                  href={`/components${componentFamilyAnchor(family.category)}`}
                  key={family.category}
                  onNavigatePath={onNavigatePath}
                >
                  <span className="catalog-family-icon">
                    <T7Icon name={family.icon} size={18} />
                  </span>
                  <span>
                    <strong>{family.label}</strong>
                    <small>
                      {componentsInCategory(family.category).length} canonical
                      contracts
                    </small>
                  </span>
                  <T7Icon aria-hidden="true" name="chevronRight" size={15} />
                </CatalogLink>
              ))}
            </div>
          </section>

          <section className="library-section">
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Choose by responsibility
                </Typography>
                <Typography typeRole="body-sm">
                  Start with the layer that matches the job, then compose the
                  canonical contracts into a product screen.
                </Typography>
              </div>
            </div>
            <div className="catalog-layer-list">
              {[
                {
                  detail:
                    "Theme, typography, and icon behavior shared everywhere.",
                  href: `/components${componentFamilyAnchor("foundation")}`,
                  icon: "tokens" as const,
                  label: "Foundations",
                },
                {
                  detail:
                    "Actions, forms, navigation, and layout building blocks.",
                  href: `/components${componentFamilyAnchor("action")}`,
                  icon: "components" as const,
                  label: "Primitives",
                },
                {
                  detail:
                    "Tables, overlays, feedback, files, and data display.",
                  href: `/components${componentFamilyAnchor("table")}`,
                  icon: "table" as const,
                  label: "Composed components",
                },
                {
                  detail:
                    "Reusable flows for inventory, commerce, and other domains.",
                  href: `/components${componentFamilyAnchor("pattern")}`,
                  icon: "dashboard" as const,
                  label: "Patterns",
                },
              ].map((layer) => (
                <CatalogLink
                  className="catalog-layer-row"
                  href={layer.href}
                  key={layer.label}
                  onNavigatePath={onNavigatePath}
                >
                  <span className="catalog-family-icon">
                    <T7Icon aria-hidden="true" name={layer.icon} size={18} />
                  </span>
                  <span>
                    <strong>{layer.label}</strong>
                    <small>{layer.detail}</small>
                  </span>
                  <T7Icon aria-hidden="true" name="chevronRight" size={15} />
                </CatalogLink>
              ))}
            </div>
          </section>

          <section
            aria-label="Canonical component catalog"
            className="catalog-family-document"
            ref={catalogDocumentRef}
          >
            <div className="library-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Canonical component catalog
                </Typography>
                <Typography typeRole="body-sm">
                  One naturally scrolling document for implementation lookup;
                  open a row only when its full contract is needed.
                </Typography>
              </div>
              <span className="studio-section-count">
                {catalogCounts.canonicalComponents} contracts
              </span>
            </div>
            <nav
              aria-label="Component family anchors"
              className="catalog-family-anchors"
            >
              {componentFamilyDefinitions.map((family) => (
                <a
                  aria-current={
                    activeFamily === family.category ? "location" : undefined
                  }
                  className={
                    activeFamily === family.category ? "is-active" : undefined
                  }
                  href={componentFamilyAnchor(family.category)}
                  key={family.category}
                >
                  {family.label}
                </a>
              ))}
            </nav>
            <div className="catalog-family-document-list">
              {componentFamilyDefinitions.map((family) => {
                const entries = componentsInCategory(family.category);
                return (
                  <section
                    aria-labelledby={`component-family-${family.category}-title`}
                    className="catalog-family-document-section"
                    data-catalog-family={family.category}
                    id={`component-family-${family.category}`}
                    key={family.category}
                  >
                    <div className="catalog-family-document-heading">
                      <div>
                        <Typography
                          as="h3"
                          id={`component-family-${family.category}-title`}
                          typeRole="heading-md"
                        >
                          {family.label}
                        </Typography>
                        <Typography typeRole="body-sm">
                          {familyDescriptions[family.category]}
                        </Typography>
                      </div>
                      <span className="catalog-family-document-count">
                        {entries.length} canonical
                      </span>
                    </div>
                    <div className="catalog-list catalog-family-document-rows">
                      {entries.map(([name, component]) => (
                        <CatalogListRow
                          description={component.purpose}
                          href={componentPath(name)}
                          key={name}
                          onNavigatePath={onNavigatePath}
                          trailing={
                            <span className="catalog-list-row-api">
                              {component.importantProps.slice(0, 2).join(" · ")}
                            </span>
                          }
                        >
                          {component.displayName ?? name}
                        </CatalogListRow>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
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
      <LibraryIntro
        count={`${entries.length} canonical contracts`}
        description={`Canonical ${definition?.label.toLowerCase() ?? category} components. Aliases remain available through search and detail documentation.`}
        icon={definition?.icon ?? "components"}
        title={definition?.label ?? category}
      />
      <section className="library-section">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Available contracts
            </Typography>
            <Typography typeRole="body-sm">
              Open one component to inspect its purpose, live preview, API,
              accessibility, tokens, and related contracts.
            </Typography>
          </div>
        </div>
        <div className="catalog-list">
          {entries.map(([name, component]) => (
            <CatalogListRow
              description={component.purpose}
              href={componentPath(name)}
              key={name}
              onNavigatePath={onNavigatePath}
              trailing={
                <span className="catalog-list-row-api">
                  {component.importantProps.slice(0, 2).join(" · ")}
                </span>
              }
            >
              {component.displayName ?? name}
            </CatalogListRow>
          ))}
        </div>
      </section>
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
      <LibraryIntro
        count={
          component.aliasOf
            ? `Alias of ${component.aliasOf}`
            : (categoryLabels[component.category] ?? component.category)
        }
        description={component.purpose}
        icon={family?.icon ?? "components"}
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
    <div className="library-page component-lab-page">
      <LibraryIntro
        count="QA workbench"
        description="Explore canonical components in a calm, interactive workspace."
        icon="components"
        title="Component Lab"
      />
      {contentStress ? <ContentSafetyProof /> : <ComponentProofs />}
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

function hslToHex(value: string, fallback: string) {
  const match = value.match(/(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  if (!match) return fallback;

  const hue = ((Number(match[1]) % 360) + 360) % 360;
  const saturation = Math.max(0, Math.min(100, Number(match[2]))) / 100;
  const lightness = Math.max(0, Math.min(100, Number(match[3]))) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const normalizedHue = hue / 60;
  const second = chroma * (1 - Math.abs((normalizedHue % 2) - 1));
  const matchValue = lightness - chroma / 2;
  const [red, green, blue] =
    normalizedHue < 1
      ? [chroma, second, 0]
      : normalizedHue < 2
        ? [second, chroma, 0]
        : normalizedHue < 3
          ? [0, chroma, second]
          : normalizedHue < 4
            ? [0, second, chroma]
            : normalizedHue < 5
              ? [second, 0, chroma]
              : [chroma, 0, second];
  const toHex = (channel: number) =>
    Math.round((channel + matchValue) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function IconifyCopyButton({
  accentColor,
  name,
  primaryColor,
}: {
  accentColor?: string;
  name: string;
  primaryColor?: string;
}) {
  const { toast } = useToast();
  return (
    <button
      aria-label={`Copy Solar icon ${name}`}
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
          title: "Solar icon copied",
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
  const defaultPrimaryHex = hslToHex(
    paletteProfiles[theme.primary].primary,
    "#17663f",
  );
  const defaultAccentHex = hslToHex(
    paletteProfiles[theme.accent].accent,
    "#8bbf27",
  );
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
      <LibraryIntro
        count={`${IconifyBoldDuotoneIconCount.toLocaleString()} Solar Bold Duotone icons`}
        description="A focused local Iconify family with one cohesive filled-and-layered visual language. No CDN request is needed at runtime."
        icon="components"
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
      <div className="catalog-filter-tabs" aria-label="Icon categories">
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
          Logo palette: {theme.primary} main · {theme.accent} accent · custom
          values stay local to this preview.
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
        <div className="library-icon-grid compact-icon-grid">
          {shownNames.map((name) => (
            <IconCopyButton key={name} name={name} />
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
          <Typography typeRole="body-sm">
            No Solar Bold Duotone icons match “{iconifyQuery}”.
          </Typography>
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
  return (
    <div className="library-page">
      <LibraryIntro
        count={`${Object.keys(recipeCatalog).length} composition recipes`}
        description="Recipes describe composition anatomy so agents choose known structures before inventing local UI."
        icon="table"
        title="Recipes"
      />
      <section className="library-section">
        <div className="library-section-heading">
          <div>
            <Typography as="h2" typeRole="heading-lg">
              Recipe index
            </Typography>
            <Typography typeRole="body-sm">
              Open a recipe to inspect its flow and jump directly to the
              component contracts it names.
            </Typography>
          </div>
        </div>
        <div className="catalog-list">
          {Object.entries(recipeCatalog).map(([name, recipe]) => (
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
      <LibraryIntro
        count={recipe.profiles.join(" · ")}
        description={recipe.purpose}
        icon="table"
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
      <LibraryIntro
        count={`${catalogCounts.blocks} expressive block families`}
        description="Reusable page-level compositions for public, content, commerce, and product surfaces. Blocks compose canonical contracts; they do not replace them."
        icon="components"
        title="Blocks"
      />

      <div className="block-layer-rail" aria-label="Composition hierarchy">
        {[
          "Foundations",
          "Primitives",
          "Components",
          "Patterns",
          "Blocks",
          "Recipes",
        ].map((layer) => (
          <span
            className={layer === "Blocks" ? "is-active" : undefined}
            key={layer}
          >
            {layer}
          </span>
        ))}
      </div>

      <Input
        aria-label="Search expressive blocks"
        className="library-search"
        label="Search blocks"
        leadingIcon="search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Hero, testimonials, carousel…"
        value={query}
      />
      <div aria-label="Block categories" className="catalog-filter-tabs">
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
      <LibraryIntro
        count={`${block.category} · ${block.variants.length} variants`}
        description={block.purpose}
        icon="components"
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
