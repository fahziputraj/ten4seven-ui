import { useState } from "react";

import { T7Icon } from "@ten4seven/icons";
import {
  BarChart,
  Button,
  Carousel,
  ChartPanel,
  CtaBlock,
  ContentShowcase,
  FeatureShowcase,
  Hero,
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
                <Typography typeRole="overline">System proof</Typography>
                <Typography as="h2" typeRole="heading-md">
                  One shared language.
                </Typography>
              </div>
              <T7Icon name="check" size={18} />
            </div>
            <div className="public-showcase-preview-metric-row">
              <div>
                <Typography typeRole="caption">Contracts</Typography>
                <strong>129</strong>
              </div>
              <div>
                <Typography typeRole="caption">Themes</Typography>
                <strong>11</strong>
              </div>
              <div>
                <Typography typeRole="caption">Gaps</Typography>
                <strong>0</strong>
              </div>
            </div>
            <ChartPanel
              className="public-showcase-preview-chart"
              description="Last 6 releases"
              title="Adoption by surface"
              chart={
                <BarChart
                  ariaLabel="Adoption by surface chart"
                  data={[
                    { label: "App", value: 82 },
                    { label: "Web", value: 64 },
                    { label: "Docs", value: 48 },
                    { label: "Labs", value: 36 },
                  ]}
                  height={112}
                  summary="App adoption leads at 82 percent, followed by Web at 64 percent."
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
  return (
    <MediaFrame
      aria-label={`${variant} editorial illustration`}
      className={`public-editorial-art public-editorial-art--${variant}`}
      ratio={1.45}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <T7Icon aria-hidden="true" name="components" size={28} />
    </MediaFrame>
  );
}

function ShowcaseProduct({
  category,
  title,
  variant,
}: {
  category: string;
  title: string;
  variant: "signal" | "orbit" | "layers";
}) {
  return (
    <ProductCard
      actions={
        <Button intent="quiet" size="sm" trailingIcon="arrowRight">
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

export function PublicShowcase() {
  const [notice, setNotice] = useState<string | null>(null);
  const { toast } = useToast();

  function notify(title: string, description: string) {
    setNotice(title);
    toast({ description, duration: 3200, title, tone: "success" });
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  return (
    <PublicShell
      actions={
        <Button
          onClick={() =>
            notify(
              "Repository view queued",
              "The local reference remains fixture-only.",
            )
          }
          size="sm"
        >
          View source
        </Button>
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
          legal="© 2026 ten4seven UI · Local reference fixture"
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
      navigation={[
        {
          active: true,
          href: "#showcase-top",
          key: "overview",
          label: "Overview",
        },
        {
          href: "#showcase-features",
          key: "blocks",
          label: "Blocks",
        },
        {
          href: "#showcase-products",
          key: "recipes",
          label: "Recipes",
        },
      ]}
    >
      <div className="public-showcase-page" id="showcase-top">
        <div className="public-showcase-status" aria-live="polite">
          {notice ? <span>{notice}</span> : null}
        </div>

        <Hero
          className="public-showcase-hero"
          description="A shared set of foundations, components, and reusable blocks that keeps operational products and public experiences in the same visual conversation."
          media={<ShowcasePreview />}
          primaryAction={
            <Button
              onClick={() => scrollToSection("showcase-features")}
              size="lg"
            >
              Explore the system
            </Button>
          }
          secondaryAction={
            <Button
              intent="secondary"
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

        <LogoCloud
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
          description="Counts are local catalog proof, not product performance claims."
          id="showcase-stats"
          items={[
            {
              detail: "canonical contracts",
              id: "contracts",
              label: "Components",
              value: "129",
            },
            {
              detail: "reusable page recipes",
              id: "recipes",
              label: "Recipes",
              value: "17",
            },
            {
              detail: "semantic names",
              id: "icons",
              label: "Icons",
              value: "97",
            },
            {
              detail: "separate expressive blocks",
              id: "blocks",
              label: "Blocks",
              value: "12",
            },
          ]}
          title="A system that scales by composition"
        />

        <FeatureShowcase
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
                  ariaLabel="Token adoption trend chart"
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
                  summary="App surfaces rise from 32 to 82, while public surfaces reach 58 by October."
                />
              }
            />
          }
          title="Foundations that stay useful"
        />

        <ContentShowcase
          description="A content-led section uses the same card, media, type, and action contracts without becoming an operational list."
          id="showcase-content"
          items={[
            {
              action: (
                <Button intent="quiet" size="sm" trailingIcon="arrowRight">
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
                <Button intent="quiet" size="sm" trailingIcon="arrowRight">
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
                <Button intent="quiet" size="sm" trailingIcon="arrowRight">
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
          actions={
            <Button
              intent="quiet"
              onClick={() => scrollToSection("showcase-footer")}
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
              title="Tokens that explain themselves"
              variant="signal"
            />
            <ShowcaseProduct
              category="Patterns"
              title="Recipes for real product work"
              variant="orbit"
            />
            <ShowcaseProduct
              category="Blocks"
              title="Public sections with restraint"
              variant="layers"
            />
          </Carousel>
        </ProductShowcase>

        <Testimonials
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
          description="A presentation-only comparison block. Entitlements and billing remain product-owned."
          id="showcase-plans"
          plans={[
            {
              action: (
                <Button
                  intent="secondary"
                  onClick={() =>
                    notify(
                      "Starter selected",
                      "No subscription is created in this fixture.",
                    )
                  }
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
                <Button
                  onClick={() =>
                    notify(
                      "Team selected",
                      "No subscription is created in this fixture.",
                    )
                  }
                  size="sm"
                >
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
                onClick={() =>
                  notify(
                    "Documentation queued",
                    "The local workbench remains the source of truth.",
                  )
                }
                size="lg"
              >
                Read documentation
              </Button>
            </>
          }
          description="Start with a complete recipe, then let the system carry the details through every breakpoint and theme."
          id="showcase-cta"
          title="Ready to build a surface that holds together?"
          tone="accent"
        />
      </div>
    </PublicShell>
  );
}
