import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  Button,
  Carousel,
  ChartPanel,
  CtaBlock,
  Hero,
  LineChart,
  MediaFrame,
  PublicFooter,
  PublicShell,
  StatusChip,
  Typography,
  observeT7InView,
} from "@ten4seven/ui";
import { catalogCounts } from "./catalog-model";

type SurfaceId =
  "operations" | "farm" | "commerce" | "authentication" | "public";

type StatusTone = "info" | "success" | "warning" | "neutral";

const surfaceOptions: Array<{
  description: string;
  icon: IconName;
  id: SurfaceId;
  label: string;
}> = [
  {
    description: "Decision work with density and accountability.",
    icon: "warehouse",
    id: "operations",
    label: "Operations",
  },
  {
    description: "Field context with room for the real world.",
    icon: "farm",
    id: "farm",
    label: "Farm",
  },
  {
    description: "A browse-first surface with a clear next step.",
    icon: "cart",
    id: "commerce",
    label: "Commerce",
  },
  {
    description: "Focused entry with no unnecessary ceremony.",
    icon: "lock",
    id: "authentication",
    label: "Authentication",
  },
  {
    description: "Editorial space that lets the proposition breathe.",
    icon: "book",
    id: "public",
    label: "Public",
  },
];

const systemSteps: Array<{
  description: string;
  icon: IconName;
  label: string;
}> = [
  {
    description: "Name the problem and the outcome before the pixels.",
    icon: "approve",
    label: "Intent",
  },
  {
    description: "Turn the intent into a repeatable product path.",
    icon: "file",
    label: "Recipe",
  },
  {
    description: "Assemble the primitives that carry the behavior.",
    icon: "components",
    label: "Components",
  },
  {
    description: "Give hierarchy, state, and meaning one vocabulary.",
    icon: "tokens",
    label: "Semantic tokens",
  },
  {
    description: "Tune the expression for the context and the audience.",
    icon: "theme",
    label: "Theme/profile",
  },
  {
    description: "Ship a surface that feels made for its job.",
    icon: "preview",
    label: "Product surface",
  },
];

const approvalRows: Array<{
  item: string;
  owner: string;
  status: string;
  tone: StatusTone;
}> = [
  {
    item: "Field equipment purchase",
    owner: "Avery Ross",
    status: "In review",
    tone: "info",
  },
  {
    item: "Seed supplier contract",
    owner: "Taylor Kim",
    status: "Pending",
    tone: "warning",
  },
  {
    item: "Irrigation schedule change",
    owner: "Morgan Lee",
    status: "Approved",
    tone: "success",
  },
  {
    item: "New team member access",
    owner: "Jordan Patel",
    status: "Ready",
    tone: "success",
  },
];

function ShowcaseBrand() {
  return (
    <a className="public-showcase-brand" href="/public-showcase">
      <span aria-hidden="true" className="public-showcase-brand-mark">
        <T7Icon name="components" size={17} />
      </span>
      <Typography as="strong" typeRole="label">
        ten4seven UI
      </Typography>
    </a>
  );
}

function ProductWindow({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`public-showcase-product-window ${className}`.trim()}
    >
      <div className="public-showcase-window-chrome">
        <span aria-hidden="true" className="public-showcase-window-dots">
          <i />
          <i />
          <i />
        </span>
        <Typography typeRole="caption">{title}</Typography>
        <T7Icon aria-hidden="true" name="more" size={14} />
      </div>
      {children}
    </div>
  );
}

function WindowSidebar({ active, items }: { active: string; items: string[] }) {
  return (
    <aside className="public-showcase-window-sidebar">
      <div className="public-showcase-window-product-mark">
        <span aria-hidden="true">
          <T7Icon name="components" size={13} />
        </span>
        <Typography typeRole="label">ten4seven</Typography>
      </div>
      <div className="public-showcase-window-sidebar-items">
        {items.map((item) => (
          <span
            className={item === active ? "is-selected" : undefined}
            key={item}
          >
            <T7Icon
              aria-hidden="true"
              name={item === active ? "check" : "chevronRight"}
              size={11}
            />
            {item}
          </span>
        ))}
      </div>
    </aside>
  );
}

function WindowMetricRail({
  items,
}: {
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="public-showcase-window-metrics">
      {items.map((item) => (
        <div key={item.label}>
          <Typography typeRole="caption">{item.label}</Typography>
          <Typography as="strong" typeRole="label">
            {item.value}
          </Typography>
        </div>
      ))}
    </div>
  );
}

function MiniBars() {
  return (
    <div aria-hidden="true" className="public-showcase-mini-bars">
      {[42, 68, 53, 81, 64, 90, 58, 74, 49, 86, 66, 78].map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

function ApprovalRows({ compact = false }: { compact?: boolean }) {
  return (
    <div className="public-showcase-approval-rows">
      <div className="public-showcase-approval-row public-showcase-approval-row--header">
        <span>Item</span>
        <span>Owner</span>
        <span>Status</span>
      </div>
      {approvalRows.slice(0, compact ? 3 : approvalRows.length).map((row) => (
        <div className="public-showcase-approval-row" key={row.item}>
          <span>{row.item}</span>
          <span>{row.owner}</span>
          <StatusChip tone={row.tone}>{row.status}</StatusChip>
        </div>
      ))}
    </div>
  );
}

function OperationsWindow({ compact = false }: { compact?: boolean }) {
  return (
    <ProductWindow
      className={compact ? "public-showcase-product-window--compact" : ""}
      title="Operations / Decision workspace"
    >
      <div className="public-showcase-window-layout">
        <WindowSidebar
          active="Approvals"
          items={["Overview", "Approvals", "Workflow", "People", "Reports"]}
        />
        <div className="public-showcase-window-main">
          <div className="public-showcase-window-heading">
            <div>
              <Typography as="h3" typeRole="heading-md">
                Operational approvals
              </Typography>
              <Typography typeRole="caption">
                Keep decisions moving with a clear next action.
              </Typography>
            </div>
            <StatusChip icon="check" tone="success">
              Ready to ship
            </StatusChip>
          </div>
          <WindowMetricRail
            items={[
              { label: "Queue", value: "In motion" },
              { label: "Next action", value: "Review" },
              { label: "Surface", value: "Operations" },
            ]}
          />
          <div className="public-showcase-window-signal-row">
            <div className="public-showcase-window-signal">
              <Typography typeRole="label">Approval activity</Typography>
              <MiniBars />
            </div>
            <div className="public-showcase-window-next">
              <Typography typeRole="caption">Next action</Typography>
              <Typography as="strong" typeRole="heading-sm">
                Review queue
              </Typography>
              <span>
                <T7Icon aria-hidden="true" name="arrowRight" size={12} />4 items
                need a decision
              </span>
            </div>
          </div>
          <ApprovalRows compact={compact} />
        </div>
      </div>
    </ProductWindow>
  );
}

function FarmWindow() {
  return (
    <ProductWindow
      className="public-showcase-product-window--farm"
      title="Farm / Field activity"
    >
      <div className="public-showcase-window-layout public-showcase-window-layout--farm">
        <WindowSidebar
          active="Field activity"
          items={["Field activity", "Harvest", "Teams"]}
        />
        <div className="public-showcase-window-main">
          <div className="public-showcase-window-heading">
            <div>
              <Typography as="h3" typeRole="heading-md">
                Field activity
              </Typography>
              <Typography typeRole="caption">
                A wider canvas for work in motion.
              </Typography>
            </div>
            <StatusChip icon="success" tone="success">
              Live
            </StatusChip>
          </div>
          <div className="public-showcase-field-map">
            <span className="public-showcase-field-map-grid" />
            <span className="public-showcase-field-marker public-showcase-field-marker--one" />
            <span className="public-showcase-field-marker public-showcase-field-marker--two" />
            <span className="public-showcase-field-marker public-showcase-field-marker--three" />
            <div>
              <T7Icon aria-hidden="true" name="farm" size={15} />
              <Typography typeRole="caption">North field</Typography>
            </div>
          </div>
          <div className="public-showcase-window-list">
            <span>
              <T7Icon aria-hidden="true" name="check" size={12} />
              Planting window
            </span>
            <span>
              <T7Icon aria-hidden="true" name="timeline" size={12} />
              Crew route
            </span>
            <span>
              <T7Icon aria-hidden="true" name="warning" size={12} />
              Weather note
            </span>
          </div>
        </div>
      </div>
    </ProductWindow>
  );
}

function CommerceWindow() {
  return (
    <ProductWindow
      className="public-showcase-product-window--commerce"
      title="Commerce / Product catalog"
    >
      <div className="public-showcase-commerce-main">
        <div className="public-showcase-window-heading">
          <div>
            <Typography as="h3" typeRole="heading-md">
              Product catalog
            </Typography>
            <Typography typeRole="caption">Browse with confidence.</Typography>
          </div>
          <T7Icon aria-hidden="true" name="cart" size={17} />
        </div>
        <div className="public-showcase-commerce-grid">
          {(
            [
              ["Everyday backpack", "Available", "package" as IconName],
              ["Canvas tote", "New", "item" as IconName],
              ["Field cap", "Ready", "farm" as IconName],
            ] satisfies Array<[string, string, IconName]>
          ).map(([name, state, icon]) => (
            <div key={name}>
              <span aria-hidden="true" className="public-showcase-commerce-art">
                <T7Icon name={icon} size={20} />
              </span>
              <Typography as="strong" typeRole="label">
                {name}
              </Typography>
              <Typography typeRole="caption">{state}</Typography>
            </div>
          ))}
        </div>
        <span className="public-showcase-window-action">Add to cart</span>
      </div>
    </ProductWindow>
  );
}

function AuthenticationWindow() {
  return (
    <ProductWindow
      className="public-showcase-product-window--authentication"
      title="Authentication / Focused entry"
    >
      <div className="public-showcase-auth-window">
        <T7Icon aria-hidden="true" name="lock" size={18} />
        <Typography as="h3" typeRole="heading-md">
          Welcome back
        </Typography>
        <Typography typeRole="caption">
          A focused entry point for the people behind the work.
        </Typography>
        <div className="public-showcase-auth-field">
          <Typography typeRole="caption">Email</Typography>
          <span>you@company.com</span>
        </div>
        <div className="public-showcase-auth-field">
          <Typography typeRole="caption">Password</Typography>
          <span>••••••••••</span>
        </div>
        <span className="public-showcase-window-action">Sign in</span>
      </div>
    </ProductWindow>
  );
}

function PublicWindow() {
  return (
    <ProductWindow
      className="public-showcase-product-window--public"
      title="Public / Editorial surface"
    >
      <div className="public-showcase-public-window">
        <div className="public-showcase-public-window-mark">
          <T7Icon aria-hidden="true" name="components" size={18} />
        </div>
        <Typography as="h3" typeRole="heading-md">
          A clear point of view.
        </Typography>
        <Typography typeRole="body-sm">
          Let the proposition lead. Let the system carry the details.
        </Typography>
        <div className="public-showcase-public-window-line" />
        <div className="public-showcase-public-window-links">
          <span>Explore</span>
          <span>Stories</span>
          <span>About</span>
        </div>
      </div>
    </ProductWindow>
  );
}

function HeroProductVisual() {
  return (
    <MediaFrame
      className="public-showcase-hero-media-frame"
      label="Layered Ten4Seven product surface"
      ratio={1.08}
    >
      <div className="public-showcase-hero-stage">
        <div className="public-showcase-hero-layer public-showcase-hero-layer--auth">
          <AuthenticationWindow />
        </div>
        <div className="public-showcase-hero-layer public-showcase-hero-layer--commerce">
          <CommerceWindow />
        </div>
        <div className="public-showcase-hero-layer public-showcase-hero-layer--main">
          <OperationsWindow compact />
        </div>
        <div className="public-showcase-hero-stage-caption">
          <span>Live product surface</span>
          <span>
            <T7Icon aria-hidden="true" name="check" size={13} />
            Code native
          </span>
        </div>
      </div>
    </MediaFrame>
  );
}

function RevealSection({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "visible">("idle");

  useEffect(() => {
    setState("armed");
    const element = ref.current;
    if (!element) return undefined;
    return observeT7InView(element, () => setState("visible"), {
      rootMargin: "0px 0px -12% 0px",
    });
  }, []);

  return (
    <section
      {...props}
      className={`public-showcase-reveal ${className}`.trim()}
      data-reveal-state={state}
      data-motion-role="supporting"
      ref={ref}
    >
      {children}
    </section>
  );
}

function SurfaceSelector({
  activeSurface,
  onChange,
}: {
  activeSurface: SurfaceId;
  onChange: (surface: SurfaceId) => void;
}) {
  return (
    <div className="public-showcase-surface-selector">
      <Typography typeRole="label">Choose a surface</Typography>
      <div
        aria-label="Product surfaces"
        className="public-showcase-surface-options"
        role="group"
      >
        {surfaceOptions.map((surface) => (
          <Button
            aria-pressed={activeSurface === surface.id}
            className="public-showcase-surface-option"
            intent={activeSurface === surface.id ? "primary" : "quiet"}
            key={surface.id}
            leadingIcon={surface.icon}
            onClick={() => onChange(surface.id)}
            size="sm"
          >
            {surface.label}
          </Button>
        ))}
      </div>
      <Typography typeRole="caption">
        Typography, controls, semantic states, motion, and accessibility stay
        shared. The composition changes with the job.
      </Typography>
    </div>
  );
}

function SurfaceWindow({ surface }: { surface: SurfaceId }) {
  switch (surface) {
    case "farm":
      return <FarmWindow />;
    case "commerce":
      return <CommerceWindow />;
    case "authentication":
      return <AuthenticationWindow />;
    case "public":
      return <PublicWindow />;
    case "operations":
    default:
      return <OperationsWindow />;
  }
}

function SurfaceStage({ surface }: { surface: SurfaceId }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, [surface]);

  const label = surfaceOptions.find((option) => option.id === surface)?.label;
  return (
    <div
      aria-label={`${label} product surface visual`}
      className="public-showcase-surface-stage"
      data-motion-role="supporting"
      data-surface-state={entered ? "entered" : "entering"}
      role="img"
    >
      <div className="public-showcase-surface-stage-line">
        <span>Shared grammar</span>
        <span>{label}</span>
      </div>
      <SurfaceWindow surface={surface} />
    </div>
  );
}

function SystemPath() {
  return (
    <ol className="public-showcase-system-path">
      {systemSteps.map((step, index) => (
        <li className="public-showcase-system-step" key={step.label}>
          <div className="public-showcase-system-step-index">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="public-showcase-system-step-icon">
            <T7Icon aria-hidden="true" name={step.icon} size={21} />
          </div>
          <Typography as="h3" typeRole="heading-md">
            {step.label}
          </Typography>
          <Typography as="p" typeRole="body-sm">
            {step.description}
          </Typography>
        </li>
      ))}
    </ol>
  );
}

function DarkSystemGraph() {
  return (
    <div aria-hidden="true" className="public-showcase-dark-graph">
      <svg viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 180 C 120 175, 132 120, 228 135 S 340 98, 430 82 S 540 54, 610 18" />
        <path d="M10 204 C 110 190, 155 175, 228 173 S 343 142, 430 128 S 548 94, 610 62" />
        <path d="M112 168V58M306 116V28M500 68V4" />
        <circle cx="10" cy="180" r="5" />
        <circle cx="228" cy="135" r="5" />
        <circle cx="430" cy="82" r="5" />
        <circle cx="610" cy="18" r="5" />
      </svg>
    </div>
  );
}

function PublicShowcaseProofChart() {
  return (
    <ChartPanel
      className="public-showcase-proof-chart"
      description="Illustrative coverage signal across three product contexts."
      title="Signals stay readable"
      chart={
        <LineChart
          ariaLabel="Coverage trend chart"
          labels={["May", "Jun", "Jul", "Aug", "Sep", "Oct"]}
          series={[
            { id: "app", label: "App", values: [32, 44, 51, 63, 72, 82] },
            { id: "public", label: "Public", values: [14, 24, 29, 38, 47, 58] },
            { id: "docs", label: "Docs", values: [8, 12, 19, 25, 33, 45] },
          ]}
          summary="Illustrative coverage signals remain readable at a glance."
        />
      }
    />
  );
}

export function PublicShowcase({
  onNavigatePath,
  onOpenSettings,
}: {
  onNavigatePath?: (path: string) => void;
  onOpenSettings?: () => void;
} = {}) {
  const [activeSection, setActiveSection] = useState("showcase-top");
  const [activeSurface, setActiveSurface] = useState<SurfaceId>("operations");

  // The app shell still passes the shared settings callback to every route. The
  // public flagship intentionally does not render that internal QA control.
  void onOpenSettings;

  useEffect(() => {
    const sectionIds = [
      "showcase-top",
      "showcase-content",
      "showcase-features",
      "showcase-products",
      "showcase-scale",
      "showcase-workflow",
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
        <Button
          className="public-showcase-nav-cta"
          onClick={() => scrollToSection("showcase-features")}
          size="sm"
          trailingIcon="arrowRight"
        >
          Explore the system
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
                Interfaces for what comes next.
              </Typography>
            </div>
          }
          groups={[
            {
              items: [
                { href: "#showcase-content", label: "Surfaces" },
                { href: "#showcase-features", label: "System story" },
                { href: "#showcase-products", label: "Product proof" },
              ],
              label: "Explore",
            },
            {
              items: [
                { href: "#showcase-scale", label: "Scale" },
                { href: "#showcase-workflow", label: "Workflow" },
                { href: "#showcase-cta", label: "Start here" },
              ],
              label: "Story",
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
        />
      }
      navigationMenu={[
        {
          active: activeSection === "showcase-features",
          href: "#showcase-features",
          key: "system",
          label: "System",
        },
        {
          active: activeSection === "showcase-content",
          href: "#showcase-content",
          key: "surfaces",
          label: "Surfaces",
        },
        {
          active: activeSection === "showcase-products",
          href: "#showcase-products",
          key: "proof",
          label: "Proof",
        },
        {
          active: activeSection === "showcase-top",
          href: "#showcase-top",
          key: "showcase",
          label: "Showcase",
        },
      ]}
    >
      <div className="public-showcase-page" id="showcase-top">
        <Hero
          className="public-showcase-hero"
          description="One system that turns intent into reusable product UI. Design, build, and ship with consistency—from idea to production."
          media={<HeroProductVisual />}
          primaryAction={
            <Button
              className="public-showcase-hero-primary"
              onClick={() => scrollToSection("showcase-features")}
              size="lg"
              trailingIcon="arrowRight"
            >
              Explore the system
            </Button>
          }
          secondaryAction={
            <Button
              className="public-showcase-hero-secondary"
              intent="quiet"
              onClick={() => scrollToSection("showcase-content")}
              size="lg"
              trailingIcon="arrowRight"
            >
              See the system in action
            </Button>
          }
          title={
            <>
              Build better
              <br />
              <span className="public-showcase-hero-accent">
                product surfaces.
              </span>
            </>
          }
          variant="product-preview"
        />

        <RevealSection
          className="public-showcase-surfaces"
          id="showcase-content"
        >
          <header className="public-showcase-section-heading">
            <Typography as="h2" typeRole="display-lg">
              One system. Many surfaces.
            </Typography>
            <Typography as="p" typeRole="body-lg">
              Same system grammar. Different product expression.
            </Typography>
          </header>
          <div className="public-showcase-surfaces-layout">
            <SurfaceSelector
              activeSurface={activeSurface}
              onChange={setActiveSurface}
            />
            <SurfaceStage key={activeSurface} surface={activeSurface} />
          </div>
        </RevealSection>

        <RevealSection
          className="public-showcase-system-story"
          id="showcase-features"
        >
          <header className="public-showcase-section-heading public-showcase-section-heading--split">
            <div>
              <Typography as="h2" typeRole="display-lg">
                From intent to product.
              </Typography>
              <Typography as="p" typeRole="body-lg">
                A connected path from an idea to a real-world experience—built
                on a shared system, not separate solutions.
              </Typography>
            </div>
            <Typography typeRole="caption">
              The system carries the decisions forward.
            </Typography>
          </header>
          <SystemPath />
        </RevealSection>

        <RevealSection className="public-showcase-proof" id="showcase-products">
          <header className="public-showcase-section-heading public-showcase-section-heading--split">
            <div>
              <Typography as="h2" typeRole="display-lg">
                Selected product proof.
              </Typography>
              <Typography as="p" typeRole="body-lg">
                Real surfaces. A shared foundation. Read the behavior in
                context.
              </Typography>
            </div>
            <Button
              className="public-showcase-inline-action"
              intent="quiet"
              onClick={() => navigateToPath("/recipes")}
              size="sm"
              trailingIcon="arrowRight"
            >
              Explore all recipes
            </Button>
          </header>
          <div className="public-showcase-proof-layout">
            <div className="public-showcase-proof-carousel">
              <Carousel aria-label="Selected product proofs" slideWidth={800}>
                <div className="public-showcase-proof-slide">
                  <OperationsWindow />
                </div>
                <div className="public-showcase-proof-slide">
                  <AuthenticationWindow />
                </div>
                <div className="public-showcase-proof-slide">
                  <CommerceWindow />
                </div>
              </Carousel>
            </div>
            <aside className="public-showcase-proof-aside">
              <PublicShowcaseProofChart />
              <div className="public-showcase-proof-note">
                <T7Icon aria-hidden="true" name="check" size={16} />
                <Typography as="p" typeRole="body-sm">
                  The proof is in the relationship: the same states and controls
                  can support an operational queue, a focused entry point, or a
                  browse-first catalog.
                </Typography>
              </div>
            </aside>
          </div>
        </RevealSection>

        <RevealSection className="public-showcase-dark" id="showcase-scale">
          <div className="public-showcase-dark-intro">
            <div>
              <Typography as="h2" typeRole="display-lg">
                Built for systems that have to scale.
              </Typography>
              <Typography as="p" typeRole="body-lg">
                Shared contracts carry decisions from intent to shipped product.
              </Typography>
            </div>
            <DarkSystemGraph />
          </div>
          <div className="public-showcase-capabilities">
            <article>
              <span aria-hidden="true" />
              <Typography as="h3" typeRole="heading-lg">
                Semantic by default.
              </Typography>
              <Typography as="p" typeRole="body-sm">
                A shared language for people and machines across every surface.
              </Typography>
            </article>
            <article>
              <span aria-hidden="true" />
              <Typography as="h3" typeRole="heading-lg">
                Responsive by composition.
              </Typography>
              <Typography as="p" typeRole="body-sm">
                Adaptable building blocks that change geometry with the context.
              </Typography>
            </article>
            <article>
              <span aria-hidden="true" />
              <Typography as="h3" typeRole="heading-lg">
                Accessible at every state.
              </Typography>
              <Typography as="p" typeRole="body-sm">
                Inclusive by design, from the first interaction to the final
                detail.
              </Typography>
            </article>
          </div>
          <div className="public-showcase-dark-stats">
            <div>
              <Typography as="strong" data-numeric typeRole="metric-lg">
                {catalogCounts.canonicalComponents}
              </Typography>
              <Typography typeRole="caption">
                implemented component contracts
              </Typography>
            </div>
            <div>
              <Typography as="strong" data-numeric typeRole="metric-lg">
                {catalogCounts.recipes}
              </Typography>
              <Typography typeRole="caption">retrievable recipes</Typography>
            </div>
            <div>
              <Typography as="strong" data-numeric typeRole="metric-lg">
                {catalogCounts.blocks}
              </Typography>
              <Typography typeRole="caption">expressive blocks</Typography>
            </div>
          </div>
        </RevealSection>

        <RevealSection
          className="public-showcase-workflow"
          id="showcase-workflow"
        >
          <header className="public-showcase-section-heading">
            <Typography as="h2" typeRole="display-lg">
              Make the path obvious.
            </Typography>
            <Typography as="p" typeRole="body-lg">
              Show how a real intent becomes a product surface without losing
              the decisions in between.
            </Typography>
          </header>
          <div className="public-showcase-workflow-track">
            <article className="public-showcase-workflow-intent">
              <span className="public-showcase-workflow-number">01</span>
              <T7Icon aria-hidden="true" name="approve" size={24} />
              <Typography as="h3" typeRole="heading-lg">
                Review and approve operational work.
              </Typography>
              <Typography as="p" typeRole="body-sm">
                A decision needs context, accountable states, and one clear next
                action.
              </Typography>
            </article>
            <div aria-hidden="true" className="public-showcase-workflow-arrow">
              <T7Icon name="arrowRight" size={20} />
            </div>
            <article className="public-showcase-workflow-recipe">
              <span className="public-showcase-workflow-number">02</span>
              <Typography typeRole="overline">Recipe composition</Typography>
              <Typography as="h3" typeRole="heading-lg">
                Decision Workspace
              </Typography>
              <ul>
                <li>
                  <T7Icon aria-hidden="true" name="components" size={14} />
                  Approval panel
                </li>
                <li>
                  <T7Icon aria-hidden="true" name="chart" size={14} />
                  Signal and trend
                </li>
                <li>
                  <T7Icon aria-hidden="true" name="check" size={14} />
                  Explicit state
                </li>
              </ul>
            </article>
            <div aria-hidden="true" className="public-showcase-workflow-arrow">
              <T7Icon name="arrowRight" size={20} />
            </div>
            <div
              aria-label="Finished operational decision workspace visual"
              className="public-showcase-workflow-surface"
              role="img"
            >
              <span className="public-showcase-workflow-number">03</span>
              <OperationsWindow compact />
            </div>
          </div>
        </RevealSection>

        <CtaBlock
          actions={
            <>
              <Button
                className="public-showcase-cta-primary"
                onClick={() => scrollToSection("showcase-content")}
                size="lg"
                trailingIcon="arrowRight"
              >
                Explore the system
              </Button>
              <Button
                className="public-showcase-cta-secondary"
                intent="quiet"
                onClick={() => navigateToPath("/recipes")}
                size="lg"
              >
                View recipes
              </Button>
            </>
          }
          className="public-showcase-cta"
          description="Start with a complete recipe. Let the system carry the details through every breakpoint and theme."
          id="showcase-cta"
          title="Make the next surface feel inevitable."
          tone="subtle"
        />
      </div>
    </PublicShell>
  );
}
