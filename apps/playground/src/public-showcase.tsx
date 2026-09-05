import { useEffect, useState } from "react";

import { T7Icon } from "@ten4seven/icons";
import {
  BarChart,
  Badge,
  Button,
  Carousel,
  ChartPanel,
  CtaBlock,
  ContentShowcase,
  FeatureShowcase,
  Hero,
  IconButton,
  LineChart,
  LogoCloud,
  MediaFrame,
  ProductCard,
  ProductShowcase,
  PricingSection,
  PublicFooter,
  PublicShell,
  Rating,
  StatsSection,
  Testimonials,
  Typography,
  useToast,
} from "@ten4seven/ui";
import { catalogCounts } from "./catalog-model";

function ShowcaseBrand() {
  return (
    <a className="public-showcase-brand" href="/public-showcase">
      <span aria-hidden="true" className="public-showcase-brand-mark">
        <T7Icon name="components" size={17} />
      </span>
      <span>
        <strong>ten4seven UI</strong>
        <small>Composable by default</small>
      </span>
    </a>
  );
}

function ShowcasePreview() {
  return (
    <MediaFrame
      className="public-showcase-preview-frame"
      label="A live product surface preview"
      ratio={1.14}
    >
      <div className="public-showcase-preview">
        <div className="public-showcase-preview-topbar">
          <span className="public-showcase-preview-logo">
            <T7Icon name="components" size={13} />
            Foundations
          </span>
          <span className="public-showcase-preview-search">
            <T7Icon name="search" size={12} />
            Search docs…
          </span>
          <span className="public-showcase-preview-dot" />
        </div>
        <div className="public-showcase-preview-body">
          <aside>
            <span className="is-selected">Tokens</span>
            <span>Components</span>
            <span>Patterns</span>
            <span>Recipes</span>
          </aside>
          <div className="public-showcase-preview-content">
            <div className="public-showcase-preview-heading">
              <div>
                <Typography typeRole="overline">Product overview</Typography>
                <Typography as="h2" typeRole="heading-md">
                  One shared language.
                </Typography>
              </div>
              <T7Icon name="check" size={18} />
            </div>
            <div className="public-showcase-preview-metric-row">
              <div>
                <Typography typeRole="caption">Components</Typography>
                <strong>{catalogCounts.canonicalComponents}</strong>
              </div>
              <div>
                <Typography typeRole="caption">Themes</Typography>
                <strong>11</strong>
              </div>
              <div>
                <Typography typeRole="caption">System health</Typography>
                <strong>Ready</strong>
              </div>
            </div>
            <ChartPanel
              className="public-showcase-preview-chart"
              description="Product, web, docs, and learning in one view"
              title="Connected surfaces"
              chart={
                <BarChart
                  ariaLabel="Connected product surfaces chart"
                  data={[
                    { label: "App", value: 82 },
                    { label: "Web", value: 64 },
                    { label: "Docs", value: 48 },
                    { label: "Labs", value: 36 },
                  ]}
                  height={112}
                  summary="A comparative view of product, web, documentation, and learning surfaces."
                />
              }
            />
          </div>
        </div>
      </div>
    </MediaFrame>
  );
}

function EditorialArt({ variant }: { variant: "signal" | "orbit" | "layers" }) {
  const content = {
    layers: {
      icon: "components" as const,
      label: "COMPOSITION",
      title: "Blocks with a point of view",
    },
    orbit: {
      icon: "timeline" as const,
      label: "RECIPES",
      title: "A path from contract to product",
    },
    signal: {
      icon: "type" as const,
      label: "TYPOGRAPHY",
      title: "Hierarchy that breathes",
    },
  }[variant];

  return (
    <MediaFrame
      aria-label={`${content.label.toLowerCase()} surface preview`}
      className={`public-surface-thumbnail public-surface-thumbnail--${variant}`}
      ratio={1.45}
    >
      <div className="public-surface-thumbnail-inner">
        <div className="public-surface-thumbnail-topline">
          <Typography typeRole="overline">{content.label}</Typography>
          <T7Icon aria-hidden="true" name={content.icon} size={19} />
        </div>
        <Typography as="h3" typeRole="heading-md">
          {content.title}
        </Typography>
        <div className="public-surface-thumbnail-pills">
          <Badge tone="primary">Token-led</Badge>
          <Badge>Responsive</Badge>
        </div>
      </div>
    </MediaFrame>
  );
}

function ShowcaseProduct({
  category,
  onOpen,
  title,
  variant,
}: {
  category: string;
  onOpen: () => void;
  title: string;
  variant: "signal" | "orbit" | "layers";
}) {
  return (
    <ProductCard
      actions={
        <Button
          intent="quiet"
          onClick={onOpen}
          size="sm"
          trailingIcon="arrowRight"
        >
          Read guide
        </Button>
      }
      details={<Rating label="Rated 4.9 out of 5" value={4.9} />}
      eyebrow={category}
      media={<EditorialArt variant={variant} />}
      meta="Guide · 8 min read"
      price={
        <Typography typeRole="caption">Included in the reference</Typography>
      }
      title={title}
    />
  );
}

function ShowcaseSectionMap({ activeSection }: { activeSection: string }) {
  const links = [
    {
      description: "Tokens, roles, and responsive foundations",
      id: "showcase-features",
      label: "Foundations",
    },
    {
      description: "Guides and editorial notes for the system",
      id: "showcase-content",
      label: "Guides",
    },
    {
      description: "Reusable blocks ready for composition",
      id: "showcase-products",
      label: "Blocks",
    },
    {
      description: "Specific proof from teams using the language",
      id: "showcase-testimonials",
      label: "Stories",
    },
  ];

  return (
    <nav
      aria-label="Public showcase sections"
      className="public-showcase-section-map"
    >
      <div className="public-showcase-section-map-intro">
        <Typography typeRole="overline">Navigate the system</Typography>
        <Typography typeRole="body-sm">
          Start with the foundation, then move through the reusable work.
        </Typography>
      </div>
      <div className="public-showcase-section-map-links">
        {links.map((link, index) => (
          <a
            aria-current={activeSection === link.id ? "location" : undefined}
            className="public-showcase-section-map-link"
            data-active={activeSection === link.id || undefined}
            href={`#${link.id}`}
            key={link.id}
          >
            <span className="public-showcase-section-map-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <strong>{link.label}</strong>
              <small>{link.description}</small>
            </span>
            <T7Icon aria-hidden="true" name="arrowRight" size={15} />
          </a>
        ))}
      </div>
    </nav>
  );
}

export function PublicShowcase({
  onOpenSettings,
  onNavigatePath,
}: {
  onOpenSettings?: () => void;
  onNavigatePath?: (path: string) => void;
} = {}) {
  const [notice, setNotice] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("showcase-top");
  const { toast } = useToast();

  useEffect(() => {
    const sectionIds = [
      "showcase-top",
      "showcase-stats",
      "showcase-features",
      "showcase-content",
      "showcase-products",
      "showcase-testimonials",
      "showcase-plans",
      "showcase-cta",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || typeof IntersectionObserver === "undefined")
      return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection((visible.target as HTMLElement).id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function notify(title: string, description: string) {
    setNotice(title);
    toast({ description, duration: 3200, title, tone: "success" });
  }

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    window.history.pushState({}, "", `#${id}`);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  function navigateToPath(path: string) {
    if (onNavigatePath) {
      onNavigatePath(path);
      return;
    }
    window.location.assign(path);
  }

  return (
    <PublicShell
      actions={
        <>
          <Button
            leadingIcon="components"
            onClick={() => navigateToPath("/components")}
            size="sm"
          >
            View components
          </Button>
          <IconButton
            icon="settings"
            label="Open settings"
            onClick={onOpenSettings}
            size="md"
          />
        </>
      }
      brand={<ShowcaseBrand />}
      className="public-showcase-shell"
      footer={
        <PublicFooter
          brand={
            <div className="public-showcase-footer-brand">
              <ShowcaseBrand />
              <Typography typeRole="caption">
                A calm, token-led system for product and public interfaces.
              </Typography>
            </div>
          }
          groups={[
            {
              items: [
                { href: "#showcase-features", label: "Foundations" },
                { href: "#showcase-products", label: "Blocks" },
                { href: "#showcase-plans", label: "Recipes" },
              ],
              label: "Explore",
            },
            {
              items: [
                { href: "#showcase-stats", label: "System proof" },
                { href: "#showcase-testimonials", label: "Stories" },
                { href: "#showcase-cta", label: "Contact" },
              ],
              label: "Resources",
            },
            {
              items: [
                { href: "/components", label: "Components" },
                { href: "/tokens", label: "Tokens" },
                { href: "/recipes", label: "Recipes" },
              ],
              label: "Library",
            },
          ]}
          id="showcase-footer"
          legal="© 2026 ten4seven UI"
          social={
            <Button
              intent="quiet"
              size="sm"
              onClick={() =>
                notify(
                  "Feedback noted",
                  "Social links stay outside this local proof.",
                )
              }
            >
              Share feedback
            </Button>
          }
        />
      }
      navigationMenu={[
        {
          active: activeSection === "showcase-top",
          href: "#showcase-top",
          key: "overview",
          label: "Overview",
        },
        {
          children: [
            { href: "#showcase-products", key: "blocks", label: "Blocks" },
            { href: "#showcase-content", key: "guides", label: "Guides" },
            { href: "/recipes", key: "recipes", label: "Recipes" },
          ],
          active: [
            "showcase-content",
            "showcase-plans",
            "showcase-products",
          ].includes(activeSection),
          key: "explore",
          label: "Explore",
        },
        {
          children: [
            {
              href: "#showcase-features",
              key: "foundations",
              label: "Foundations",
            },
            { href: "#showcase-stats", key: "proof", label: "System proof" },
            { href: "/components", key: "components", label: "Components" },
          ],
          active: ["showcase-stats", "showcase-features"].includes(
            activeSection,
          ),
          key: "system",
          label: "System",
        },
        {
          active: activeSection === "showcase-testimonials",
          href: "#showcase-testimonials",
          key: "stories",
          label: "Stories",
        },
      ]}
    >
      <div className="public-showcase-page" id="showcase-top">
        <div className="public-showcase-status" aria-live="polite">
          {notice ? <span>{notice}</span> : null}
        </div>

        <Hero
          className="public-showcase-hero"
          description="A composable system for product surfaces, reference work, and public experiences—connected by the same tokens, contracts, and visual language."
          eyebrow="TEN4SEVEN UI / COMPOSITION SYSTEM"
          media={<ShowcasePreview />}
          primaryAction={
            <Button
              className="public-showcase-hero-primary"
              onClick={() => scrollToSection("showcase-features")}
              size="lg"
            >
              Explore the system
            </Button>
          }
          secondaryAction={
            <Button
              className="public-showcase-hero-secondary"
              intent="quiet"
              onClick={() => scrollToSection("showcase-products")}
              size="lg"
            >
              Browse blocks
            </Button>
          }
          title={<>Build consistent interfaces, faster.</>}
          trust={
            <>
              <span>
                <T7Icon name="check" size={14} /> Semantic by default
              </span>
              <span>
                <T7Icon name="check" size={14} /> Theme-aware
              </span>
              <span>
                <T7Icon name="check" size={14} /> Built for reuse
              </span>
            </>
          }
          variant="product-preview"
        />

        <ShowcaseSectionMap activeSection={activeSection} />

        <LogoCloud
          className="public-showcase-logo-cloud"
          id="showcase-proof"
          items={[
            {
              mark: <T7Icon name="warehouse" size={17} />,
              name: "Product teams",
            },
            { mark: <T7Icon name="book" size={17} />, name: "Content teams" },
            {
              mark: <T7Icon name="analytics" size={17} />,
              name: "Platform teams",
            },
            {
              mark: <T7Icon name="components" size={17} />,
              name: "Design systems",
            },
            { mark: <T7Icon name="tokens" size={17} />, name: "Public teams" },
          ]}
          label="A shared language for teams"
        />

        <StatsSection
          className="public-showcase-stats"
          description="Counts are local catalog proof, not product performance claims."
          id="showcase-stats"
          items={[
            {
              detail: "canonical contracts",
              id: "contracts",
              label: "Components",
              value: String(catalogCounts.canonicalComponents),
            },
            {
              detail: "reusable page recipes",
              id: "recipes",
              label: "Recipes",
              value: String(catalogCounts.recipes),
            },
            {
              detail: "semantic names",
              id: "icons",
              label: "Icons",
              value: String(catalogCounts.icons),
            },
            {
              detail: "separate expressive blocks",
              id: "blocks",
              label: "Blocks",
              value: String(catalogCounts.blocks),
            },
          ]}
          title="A system that scales by composition"
        />

        <FeatureShowcase
          className="public-showcase-features"
          description="The public layer adds section-level composition without changing the contracts that make dense product work predictable."
          id="showcase-features"
          items={[
            {
              description:
                "Semantic roles keep hierarchy calm across headers, fields, data, actions, and public copy.",
              icon: "type",
              id: "typography",
              title: "Typography with a job",
            },
            {
              description:
                "Blocks combine existing surfaces, media frames, controls, and motion tokens instead of inventing variants.",
              icon: "components",
              id: "composition",
              title: "Composition over decoration",
            },
            {
              description:
                "Responsive behavior is part of the contract: stacks, rails, and carousels change geometry intentionally.",
              icon: "sidebar",
              id: "responsive",
              title: "Responsive by design",
            },
          ]}
          leadMedia={
            <ChartPanel
              className="public-showcase-feature-chart"
              description="Five tokenized series · reduced-motion safe"
              title="Signals remain readable"
              chart={
                <LineChart
                  ariaLabel="Coverage trend chart"
                  labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
                  series={[
                    {
                      id: "app",
                      label: "App",
                      values: [32, 44, 51, 63, 72, 82],
                    },
                    {
                      id: "public",
                      label: "Public",
                      values: [14, 24, 29, 38, 47, 58],
                    },
                    {
                      id: "docs",
                      label: "Docs",
                      values: [8, 12, 19, 25, 33, 45],
                    },
                  ]}
                  summary="Coverage signals across app, public, and docs remain readable at a glance."
                />
              }
            />
          }
          title="Foundations that stay useful"
        />

        <ContentShowcase
          className="public-showcase-content"
          description="A content-led section uses the same card, media, type, and action contracts without becoming an operational list."
          id="showcase-content"
          items={[
            {
              action: (
                <Button
                  intent="quiet"
                  onClick={() => navigateToPath("/theme-studio")}
                  size="sm"
                  trailingIcon="arrowRight"
                >
                  Read the guide
                </Button>
              ),
              description:
                "How semantic roles keep a product readable when every surface has a different density.",
              id: "content-typography",
              media: <EditorialArt variant="signal" />,
              meta: "Guide · Foundations",
              title: "Designing hierarchy that breathes",
            },
            {
              action: (
                <Button
                  intent="quiet"
                  onClick={() => navigateToPath("/recipes")}
                  size="sm"
                  trailingIcon="arrowRight"
                >
                  Read the guide
                </Button>
              ),
              description:
                "A practical map from primitive behavior to complete, responsive application recipes.",
              id: "content-composition",
              media: <EditorialArt variant="orbit" />,
              meta: "Field note · Composition",
              title: "The contract is the product",
            },
            {
              action: (
                <Button
                  intent="quiet"
                  onClick={() => navigateToPath("/components")}
                  size="sm"
                  trailingIcon="arrowRight"
                >
                  Read the guide
                </Button>
              ),
              description:
                "Why restrained surfaces, local media, and explicit state make an AI-built interface trustworthy.",
              id: "content-trust",
              media: <EditorialArt variant="layers" />,
              meta: "Essay · Practice",
              title: "Polish without a second system",
            },
          ]}
          title="Made for reading as well as operating"
        />

        <ProductShowcase
          className="public-showcase-products"
          actions={
            <Button
              intent="quiet"
              onClick={() => navigateToPath("/recipes")}
              size="sm"
              trailingIcon="arrowRight"
            >
              View all guides
            </Button>
          }
          description="Product cards remain content-focused; the carousel owns sequencing, controls, and overflow."
          id="showcase-products"
          title="Browse the composition library"
        >
          <Carousel aria-label="Featured ten4seven guides" slideWidth={280}>
            <ShowcaseProduct
              category="Foundations"
              onOpen={() => navigateToPath("/theme-studio")}
              title="Tokens that explain themselves"
              variant="signal"
            />
            <ShowcaseProduct
              category="Patterns"
              onOpen={() => navigateToPath("/recipes")}
              title="Recipes for real product work"
              variant="orbit"
            />
            <ShowcaseProduct
              category="Blocks"
              onOpen={() => navigateToPath("/blocks")}
              title="Public sections with restraint"
              variant="layers"
            />
          </Carousel>
        </ProductShowcase>

        <Testimonials
          className="public-showcase-testimonials"
          description="Proof is useful when it stays specific and readable."
          id="showcase-testimonials"
          items={[
            {
              avatar: "MP",
              company: "Product engineering",
              id: "maya",
              name: "Maya Patel",
              quote:
                "The same contracts let our inventory workbench and public catalog feel related without making them look the same.",
              role: "Design systems lead",
            },
            {
              avatar: "AR",
              company: "Platform team",
              id: "andre",
              name: "Andre Reyes",
              quote:
                "The value is in the decisions an agent can retrieve: hierarchy, composition, state, and the boundary between them.",
              role: "Staff engineer",
            },
          ]}
          title="Built for teams that care about the details"
        />

        <PricingSection
          className="public-showcase-pricing"
          description="A presentation-only comparison block. Entitlements and billing remain product-owned."
          id="showcase-plans"
          plans={[
            {
              action: (
                <Button
                  intent="secondary"
                  onClick={() => navigateToPath("/theme-studio")}
                  size="sm"
                >
                  Start with the system
                </Button>
              ),
              description: "For a focused team proving one product surface.",
              features: ["Canonical components", "Theme axes", "AI contracts"],
              id: "starter",
              name: "Starter",
              price: "Free",
            },
            {
              action: (
                <Button onClick={() => navigateToPath("/recipes")} size="sm">
                  Compose with a team
                </Button>
              ),
              description:
                "For teams shipping across product and public surfaces.",
              features: [
                "Everything in Starter",
                "Reusable blocks",
                "Reference recipes",
              ],
              id: "team",
              name: "Team",
              price: "$19 / member",
              recommended: true,
            },
            {
              action: (
                <Button
                  intent="secondary"
                  onClick={() =>
                    notify(
                      "Enterprise selected",
                      "No sales workflow is created in this fixture.",
                    )
                  }
                  size="sm"
                >
                  Talk to the team
                </Button>
              ),
              description:
                "For organizations standardizing multiple product lines.",
              features: [
                "Everything in Team",
                "Governance guidance",
                "Migration support",
              ],
              id: "enterprise",
              name: "Enterprise",
              price: "Custom",
            },
          ]}
          title="A clear place for every stage"
        />

        <CtaBlock
          className="public-showcase-cta"
          actions={
            <>
              <Button
                onClick={() => scrollToSection("showcase-products")}
                size="lg"
              >
                Browse the blocks
              </Button>
              <Button
                intent="secondary"
                onClick={() => navigateToPath("/components")}
                size="lg"
              >
                Read documentation
              </Button>
            </>
          }
          description="Start with a complete recipe, then let the system carry the details through every breakpoint and theme."
          id="showcase-cta"
          title="Ready to build a surface that holds together?"
          tone="inverse"
        />
      </div>
    </PublicShell>
  );
}
