import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CANVAS_LABELS,
  FOUNDATION_FAMILIES,
  SURFACE_EXPRESSIONS,
  VIEWPORT_RULES,
} from "@ten4seven/contracts";
import {
  iconGeometry,
  typographyProfiles,
  type TypographyRole,
} from "@ten4seven/tokens";
import { T7Icon } from "@ten4seven/icons";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  IconButton,
  Input,
  LineChart,
  MetricCard,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
  resolveT7Motion,
  useTen4SevenTheme,
  useToast,
} from "@ten4seven/ui";

type TokenRow = readonly [label: string, variable: string];
type TokenValues = Record<string, string>;

const colors: TokenRow[] = [
  ["Canvas", "--t7-background-hsl"],
  ["Paper surface", "--t7-surface-hsl"],
  ["Raised", "--t7-surface-raised-hsl"],
  ["Subtle", "--t7-surface-subtle-hsl"],
  ["Foreground", "--t7-foreground-hsl"],
  ["Muted text", "--t7-muted-foreground-hsl"],
  ["Primary action", "--t7-primary-hsl"],
  ["Accent", "--t7-accent-hsl"],
  ["Success", "--t7-success-hsl"],
  ["Warning", "--t7-warning-hsl"],
  ["Danger", "--t7-danger-hsl"],
  ["Info", "--t7-info-hsl"],
];

const motionRows = [
  ["Micro feedback", "--t7-duration-instant", "--t7-ease-standard"],
  ["State interaction", "--t7-duration-standard", "--t7-ease-standard"],
  ["Popup / tooltip", "--t7-duration-popup", "--t7-ease-enter"],
  ["Modal / drawer", "--t7-duration-overlay", "--t7-ease-enter"],
  ["Layout transition", "--t7-duration-layout", "--t7-ease-enter"],
  ["Public reveal", "--t7-duration-reveal", "--t7-ease-enter"],
  ["Chart drawing", "--t7-duration-chart", "--t7-ease-enter"],
  ["Slow choreography", "--t7-duration-slow", "--t7-ease-enter"],
  ["Exit", "--t7-duration-exit", "--t7-ease-exit"],
] as const;

const typographyGroups: Array<{
  label: string;
  roles: Array<[TypographyRole, string]>;
}> = [
  {
    label: "Display",
    roles: [
      ["display-xl", "Clarity at scale"],
      ["display-lg", "A clear direction"],
      ["display-md", "Designed for meaning"],
    ],
  },
  {
    label: "Headings",
    roles: [
      ["heading-xl", "Overview and decisions"],
      ["heading-lg", "A shared point of view"],
      ["heading-md", "The work ahead"],
      ["heading-sm", "Details that matter"],
    ],
  },
  {
    label: "Reading and context",
    roles: [
      ["body-lg", "Give important ideas room to breathe."],
      ["body", "A familiar rhythm makes information easier to read."],
      ["body-sm", "Supporting detail stays legible."],
      ["label", "Account name"],
      ["caption", "Updated just now"],
      ["overline", "Weekly overview"],
    ],
  },
  {
    label: "Actions and data",
    roles: [
      ["button", "Save changes"],
      ["nav", "Overview"],
      ["nav-active", "Active workspace"],
      ["card-title", "Monthly activity"],
      ["table-header", "Description · Amount"],
      ["table-cell", "Invoice 1042 · $1,280.00"],
      ["input", "Search records…"],
    ],
  },
  {
    label: "Metrics",
    roles: [
      ["metric-lg", "24,680"],
      ["metric-md", "98.4%"],
    ],
  },
];

function CopyToken({ variable }: { variable: string }) {
  const { toast } = useToast();
  return (
    <IconButton
      label={`Copy CSS variable ${variable}`}
      icon="export"
      intent="quiet"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(variable);
          toast({
            title: "Token copied",
            description: variable,
            tone: "success",
          });
        } catch {
          toast({
            title: "Copy unavailable",
            description: "Select the displayed variable to copy it manually.",
            tone: "warning",
          });
        }
      }}
    />
  );
}

function TokenRows({
  rows,
  values,
  label,
}: {
  rows: readonly TokenRow[];
  values: TokenValues;
  label: string;
}) {
  return (
    <dl aria-label={label} className="foundation-token-rows">
      {rows.map(([name, variable]) => (
        <div data-token-row={variable} key={variable}>
          <dt>
            <Typography typeRole="label">{name}</Typography>
            <code>{variable}</code>
          </dt>
          <dd>
            <output aria-live="off" data-resolved-token={variable}>
              {values[variable] || "Resolving…"}
            </output>
            <CopyToken variable={variable} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Swatches({
  rows,
  values,
}: {
  rows: readonly TokenRow[];
  values: TokenValues;
}) {
  return (
    <div className="foundation-swatches">
      {rows.map(([name, variable]) => (
        <article className="foundation-swatch" key={variable}>
          <span
            aria-hidden="true"
            className="foundation-color-sample"
            style={{ backgroundColor: `hsl(var(${variable}))` }}
          />
          <div className="foundation-swatch-heading">
            <Typography typeRole="label">{name}</Typography>
            <CopyToken variable={variable} />
          </div>
          <code>{variable}</code>
          <output aria-live="off" data-resolved-token={variable}>
            {values[variable] || "Resolving…"}
          </output>
        </article>
      ))}
    </div>
  );
}

/** Inspect the actual scope, including expert overrides, CSS aliases and OS preferences. */
function useResolvedFoundation() {
  const { theme, preferences, recipe } = useTen4SevenTheme();
  const root = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<TokenValues>({});
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const update = () => {
      const styles = getComputedStyle(element);
      const probe = document.createElement("span");
      probe.setAttribute("aria-hidden", "true");
      probe.style.cssText =
        "position:absolute;visibility:hidden;pointer-events:none;contain:strict;";
      element.append(probe);
      const next: TokenValues = {};
      for (const name of Array.from(styles).filter((name) =>
        name.startsWith("--t7-"),
      )) {
        const value = styles.getPropertyValue(name).trim();
        next[name] = name.endsWith("-hsl") ? `hsl(${value})` : value;
        if (
          name.startsWith("--t7-duration-") ||
          name === "--t7-motion-duration"
        ) {
          probe.style.transitionDuration = `var(${name})`;
          next[name] =
            `${Number((parseFloat(getComputedStyle(probe).transitionDuration) * 1000).toFixed(2))}ms`;
        } else if (
          name.startsWith("--t7-shadow-") ||
          name === "--t7-focus-ring" ||
          name === "--t7-focus-halo"
        ) {
          // Read the resolved custom-property payload directly. Shadow values
          // are already authored as complete CSS values; routing them through
          // a probe's `box-shadow` shorthand can collapse distinct layers in
          // some browsers when a nested HSL variable is involved. The direct
          // value is the authoritative runtime token and preserves the
          // elevation distinction for this inspector.
          next[name] = value;
        } else if (
          /^(?:calc|clamp|max|min|env)\(/.test(value) &&
          !name.includes("motion") &&
          !name.includes("transition")
        ) {
          probe.style.width = `var(${name})`;
          next[name] = getComputedStyle(probe).width;
        }
      }
      probe.remove();
      next["motion:js-popup"] =
        `${resolveT7Motion(element, "enterFast").duration}ms`;
      for (const sample of element.querySelectorAll<HTMLElement>(
        ".foundation-type-sample",
      )) {
        const type = getComputedStyle(sample);
        next[`type:${sample.dataset.t7Type}`] =
          `${type.fontSize} / ${type.lineHeight} · weight ${type.fontWeight} · ${type.letterSpacing} tracking`;
      }
      next["font:ui"] = styles
        .getPropertyValue("--t7-font-ui")
        .split(",")[0]
        .replaceAll('"', "");
      setValues((previous) =>
        JSON.stringify(previous) === JSON.stringify(next) ? previous : next,
      );
    };
    const frame = requestAnimationFrame(update);
    let active = true;
    void document.fonts.ready.then(() => {
      if (active) update();
    });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.addEventListener("change", update);
    window.addEventListener("resize", update);
    const observer = new MutationObserver(update);
    const scope = element.closest("[data-t7-theme]");
    if (scope)
      observer.observe(scope, {
        attributes: true,
        attributeFilter: [
          "style",
          "data-t7-mode",
          "data-t7-contrast",
          "data-t7-motion-preference",
        ],
      });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [theme, preferences, recipe]);
  return { root, values };
}

export function TokensExplorer() {
  const { theme, preferences, recipe } = useTen4SevenTheme();
  const { root, values } = useResolvedFoundation();
  const [replay, setReplay] = useState(0);
  const reduced = values["--t7-motion-preference"] === "reduced";
  const profileRows = [
    ["Appearance", theme.appearance],
    [
      "Palette / primary / accent",
      `${theme.palette} / ${theme.primary} / ${theme.accent}`,
    ],
    ["Canvas", `${CANVAS_LABELS[theme.canvas]} (${theme.canvas})`],
    ["Chart palette", theme.chartPalette],
    [
      "Radius",
      `${theme.radius}${theme.radiusValue === undefined ? "" : ` · ${theme.radiusValue}px override`}`,
    ],
    ["Density", theme.density],
    ["Typography", `${theme.typography} · ${values["font:ui"] || "…"}`],
    ["Elevation", theme.elevation],
    ["Contrast", preferences.contrast],
    [
      "Motion",
      `${preferences.motion} preference · ${reduced ? "reduced" : "full"} effective`,
    ],
    ["Authored motion anchor", `${theme.motionDuration}s`],
    ["Recipe", recipe ?? "Custom"],
  ];
  const sections: Record<(typeof FOUNDATION_FAMILIES)[number][0], ReactNode> = {
    color: (
      <>
        <Typography as="p" typeRole="body">
          Action identifies what you can do. Status identifies a condition.
          Categorical color identifies a series. A hue alone never establishes
          status.
        </Typography>
        <Swatches rows={colors} values={values} />
        <div
          className="foundation-example-row"
          aria-label="Non-color status and action examples"
        >
          <Button>Primary action</Button>
          <Badge tone="success">
            <T7Icon name="check" size="var(--t7-icon-status)" />
            Completed
          </Badge>
          <Badge tone="warning">
            <T7Icon name="warning" size="var(--t7-icon-status)" />
            Needs attention
          </Badge>
          <Badge tone="danger">
            <T7Icon name="danger" size="var(--t7-icon-status)" />
            Blocked
          </Badge>
          <Typography typeRole="body-sm">
            Series 1 denotes a category, not a positive outcome.
          </Typography>
        </div>
        <Typography as="h3" typeRole="heading-md">
          Boundary hierarchy
        </Typography>
        <TokenRows
          label="Boundary hierarchy"
          values={values}
          rows={[
            ["Subtle — internal grouping", "--t7-border-subtle-hsl"],
            ["Default — surface separation", "--t7-border-hsl"],
            ["Strong — essential edges", "--t7-border-strong-hsl"],
            [
              "Interactive — actionable boundary",
              "--t7-interactive-border-hsl",
            ],
          ]}
        />
      </>
    ),
    typography: (
      <>
        <Typography as="p" typeRole="body">
          Size, weight, leading, tracking and family resolve together. Density
          changes spacing, never type size. Semantic roles may resolve
          identically in one profile and diverge in another.
        </Typography>
        <Typography typeRole="body-sm">
          The active UI family is {values["font:ui"] || theme.typography};
          display roles may use another family. Optical sizing follows the
          active font. Metadata below is measured from each rendered specimen.
        </Typography>
        {typographyGroups.map((group) => (
          <div className="foundation-type-group" key={group.label}>
            <Typography as="h3" typeRole="heading-md">
              {group.label}
            </Typography>
            <div
              className={`foundation-type-grid${group.label === "Display" ? " foundation-type-grid-display" : ""}`}
            >
              {group.roles.map(([role, text]) => (
                <article className="foundation-type-row" key={role}>
                  <code>{role}</code>
                  <Typography
                    className="foundation-type-sample"
                    typeRole={role}
                    data-numeric={role.startsWith("metric") || undefined}
                  >
                    {text}
                  </Typography>
                  <Typography typeRole="caption">
                    {values[`type:${role}`] ||
                      typographyProfiles[theme.typography].roles[role].size}
                  </Typography>
                </article>
              ))}
            </div>
          </div>
        ))}
      </>
    ),
    surfaces: (
      <>
        <Typography as="p" typeRole="body">
          Meaning selects the color family; expression selects intensity. Use a
          quiet canvas and give a small number of important signals visual
          weight.
        </Typography>
        <div className="foundation-surface-grid">
          {Object.entries(SURFACE_EXPRESSIONS).map(([emphasis, spec]) => (
            <div key={emphasis}>
              <MetricCard
                data-testid={`foundation-expression-${emphasis}`}
                emphasis={emphasis as keyof typeof SURFACE_EXPRESSIONS}
                tone="accent"
                title={spec.label}
                value="42"
                description="Example signal"
                icon="analytics"
              />
              <code>emphasis="{emphasis}"</code>
              <Typography as="p" typeRole="body-sm">
                {spec.purpose}
              </Typography>
            </div>
          ))}
        </div>
        <Typography as="h3" typeRole="heading-md">
          Semantic foreground pairs
        </Typography>
        <Typography as="p" typeRole="body-sm">
          Solid primary, success, warning, danger and info preserve hue and
          saturation, reducing lightness until white text reaches at least 6:1
          on the base fill. The 8% categorical highlight retains AA text.
          Inverse uses a separate neutral pair. Soft and expressive use the
          normal readable foreground. Status “foreground” tokens for subtle
          badges are not solid-fill pairs.
        </Typography>
        <div className="foundation-pair-grid">
          {(
            [
              "primary",
              "success",
              "warning",
              "danger",
              "info",
              "inverse",
            ] as const
          ).map((tone) => {
            const prefix =
              tone === "inverse"
                ? "--t7-surface-emphasis-inverse"
                : `--t7-surface-emphasis-solid${tone === "primary" ? "" : `-${tone}`}`;
            return (
              <div key={tone}>
                <Card
                  data-testid={`foundation-pair-${tone}`}
                  emphasis={tone === "inverse" ? "inverse" : "solid"}
                  tone={tone === "inverse" ? "neutral" : tone}
                >
                  <CardContent>
                    <Typography typeRole="label">{tone} surface</Typography>
                    <Typography as="p" typeRole="body">
                      Readable paired content
                    </Typography>
                  </CardContent>
                </Card>
                <code>{prefix}-hsl</code>
                <output aria-live="off">
                  {values[`${prefix}-hsl`]} /{" "}
                  {values[`${prefix}-foreground-hsl`]}
                </output>
              </div>
            );
          })}
        </div>
      </>
    ),
    geometry: (
      <>
        <Typography as="p" typeRole="body">
          Named Sharp, Soft and Rounded profiles retain their hierarchy. Data
          surfaces have a 16px ceiling, reduced to 10px at compact or dense
          density; public cards retain the expressive card role.
        </Typography>
        <div className="foundation-two-columns">
          <TokenRows
            label="Radius roles"
            values={values}
            rows={[
              "indicator",
              "control",
              "base",
              "panel",
              "data",
              "card",
              "shell",
            ].map((role) => [role, `--t7-radius-${role}`])}
          />
          <TokenRows
            label="Density geometry"
            values={values}
            rows={[
              ["Control height", "--t7-control-height"],
              ["Row height", "--t7-row-height"],
              ["Control inset", "--t7-control-padding-inline"],
              ["Field inset", "--t7-field-padding-inline"],
              ["Card inset", "--t7-card-padding"],
              ["Content gap", "--t7-card-content-gap"],
              ["Table cell inset", "--t7-table-cell-padding-inline"],
            ]}
          />
        </div>
        <Typography as="p" typeRole="body-sm">
          Optical values such as 13, 14, 17, 18 and 21px are intentional:
          small/default/large controls and adjacent field text have different
          optical insets. They belong to density profiles; do not round them
          mechanically to a 4px grid.
        </Typography>
      </>
    ),
    viewport: (
      <>
        <Typography as="p" typeRole="body">
          Recipes own composition; global layout roles own shared measurements.
          Breakpoints belong to the component that changes behavior, not a
          global phone/tablet label. CSS custom properties cannot parameterize
          native media queries.
        </Typography>
        <TokenRows
          label="Layout and viewport roles"
          values={values}
          rows={[
            ["Page gutter", "--t7-page-gutter"],
            ["Mobile gutter", "--t7-gutter-mobile"],
            ["Content maximum", "--t7-content-max"],
            ["Prose measure", "--t7-reading-measure"],
            ["Sidebar width", "--t7-sidebar-width"],
            ["Header height", "--t7-header-height"],
            ["Aside width", "--t7-aside-width"],
            ["Grid gap", "--t7-grid-gap"],
            ["Section rhythm", "--t7-section-default"],
            ["Safe area top", "--t7-safe-area-top"],
            ["Safe area right", "--t7-safe-area-right"],
            ["Safe area bottom", "--t7-safe-area-bottom"],
            ["Safe area left", "--t7-safe-area-left"],
          ]}
        />
        <Table aria-label="Responsive ownership">
          <TableHeader>
            <TableRow>
              <TableHead>Owner / trigger</TableHead>
              <TableHead>Transformation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VIEWPORT_RULES.map((rule) => (
              <TableRow key={rule.owner}>
                <TableCell>
                  {rule.owner}
                  <br />
                  {rule.at}
                </TableCell>
                <TableCell>{rule.behavior}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    ),
    interaction: (
      <>
        <Typography as="p" typeRole="body">
          Focus uses a dedicated moderated color, an opaque edge and a neutral
          separation halo. Increased contrast strengthens its thickness;
          changing the accent never makes focus neon.
        </Typography>
        <div className="foundation-example-row">
          <Button data-testid="foundation-focus-action">
            Focus this action
          </Button>
          <Input label="Focus field" placeholder="Use Tab to inspect focus" />
          <Button disabled>Unavailable action</Button>
        </div>
        <TokenRows
          label="Focus and interaction roles"
          values={values}
          rows={[
            ["Focus color", "--t7-focus-hsl"],
            ["Focus thickness", "--t7-focus-width"],
            ["Focus offset", "--t7-focus-offset"],
            ["Neutral halo", "--t7-focus-halo"],
            ["Composed ring", "--t7-focus-ring"],
            ["Field focus border", "--t7-input-focus-border-hsl"],
            ["Selection", "--t7-selected-hsl"],
            ["Selection hover", "--t7-selected-hover-hsl"],
            ["Input boundary", "--t7-input-border-hsl"],
            ["Input hover", "--t7-input-hover-border-hsl"],
            ["Disabled fill", "--t7-disabled-background-hsl"],
            ["Disabled text", "--t7-disabled-foreground-hsl"],
          ]}
        />
      </>
    ),
    motion: (
      <>
        <Typography as="p" typeRole="body">
          Authored anchor: {theme.motionDuration}s. Effective behavior:{" "}
          {reduced ? "reduced motion" : "full motion"}. Short roles use a
          bounded 0.75–1.25 multiplier; public reveal, chart drawing and slow
          choreography retain separate timing.
        </Typography>
        <Table aria-label="Resolved motion roles">
          <TableHeader>
            <TableRow>
              <TableHead>Role / CSS variable</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Easing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {motionRows.map(([name, duration, easing]) => (
              <TableRow key={duration}>
                <TableCell>
                  {name}
                  <code>{duration}</code>
                </TableCell>
                <TableCell>
                  <output aria-live="off" data-resolved-token={duration}>
                    {values[duration] || "Resolving…"}
                  </output>
                </TableCell>
                <TableCell>
                  <output aria-live="off">{values[easing]}</output>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography typeRole="body-sm">
          The OS reduced-motion preference takes precedence over full motion.
          CSS transitions and the shared JS motion resolver honor it. A 0.01ms
          CSS duration is effectively immediate; JS resolves to 0ms.
        </Typography>
        <Typography as="p" typeRole="body-sm">
          Shared JS popup resolver:{" "}
          <span data-resolved-motion="js-popup">
            {values["motion:js-popup"]}
          </span>
          .
        </Typography>
        <Button
          intent="secondary"
          onClick={() => setReplay((value) => value + 1)}
        >
          Replay chart timing
        </Button>
      </>
    ),
    elevation: (
      <>
        <Typography as="p" typeRole="body">
          Elevation separates layers by purpose. Flat, Soft and Standard
          profiles keep a single z-index hierarchy; native modal top-layer
          behavior remains authoritative over document stacking.
        </Typography>
        <TokenRows
          label="Resolved shadows"
          values={values}
          rows={[
            ["Surface", "--t7-shadow-surface"],
            ["Raised", "--t7-shadow-raised"],
            ["Card", "--t7-shadow-card"],
            ["Popup", "--t7-shadow-popover"],
            ["Modal", "--t7-shadow-modal"],
          ]}
        />
        <TokenRows
          label="Resolved layering"
          values={values}
          rows={[
            "base",
            "sticky",
            "focus",
            "dropdown",
            "popover",
            "tooltip",
            "drawer",
            "overlay",
            "modal",
            "toast",
            "command",
          ].map((role) => [role, `--t7-z-${role}`])}
        />
      </>
    ),
    scroll: (
      <>
        <Typography as="p" typeRole="body">
          One document scroll unless a bounded region explicitly owns scrolling.
          Viewport transformations do not grant new scroll ownership.
        </Typography>
        <Table aria-label="Scroll ownership">
          <TableHeader>
            <TableRow>
              <TableHead>Context</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              [
                "Page / workbench",
                "Browser document; no second full-page scroller.",
              ],
              [
                "Bounded content",
                "ScrollArea or Table wrapper; explicit size and overflow in the affected axis.",
              ],
              [
                "Non-modal popup",
                "Shared #t7-overlay-root; collision bounds and internal popup scrolling.",
              ],
              [
                "Modal / drawer",
                "Native dialog top layer, body lock, focus return and internal long-content region.",
              ],
              [
                "Sticky regions",
                "Use the shared header offset and keep focused content clear.",
              ],
            ].map(([context, owner]) => (
              <TableRow key={context}>
                <TableCell>{context}</TableCell>
                <TableCell>{owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TokenRows
          label="Scroll offsets"
          values={values}
          rows={[
            ["Document sticky offset", "--t7-doc-sticky-offset"],
            ["Focus clearance", "--t7-focus-clearance"],
            ["Scrollbar size", "--t7-scrollbar-size"],
          ]}
        />
      </>
    ),
    icons: (
      <>
        <Typography as="p" typeRole="body">
          Use T7Icon semantic names. The 24-unit optical box is centered inside
          a role-sized box; controls align icons with inline-flex, while reading
          text uses a middle-aligned glyph. Preserve the glyph proportions.
        </Typography>
        <div className="foundation-icon-roles">
          {Object.keys(iconGeometry).map((role) => (
            <div key={role}>
              <T7Icon name="analytics" size={`var(--t7-icon-${role})`} />
              <Typography typeRole="label">{role}</Typography>
              <code>--t7-icon-{role}</code>
              <output aria-live="off">{values[`--t7-icon-${role}`]}</output>
            </div>
          ))}
        </div>
        <Typography as="p" typeRole="body-sm">
          Default paint inherits the containing foreground. Active navigation
          uses the selected foreground; semantic and solid surfaces supply their
          paired color. Duotone is an optical layer, never extra status meaning.
          Decorative glyphs are hidden from assistive technology; standalone
          meaningful icons require a label.
        </Typography>
      </>
    ),
    charts: (
      <>
        <Typography as="p" typeRole="body">
          Spectrum and Four colors are categorical palettes independent of
          primary and accent. Monochrome intentionally follows the primary hue;
          use a single series or explicit labels and other non-color
          distinctions. Slot 5 repeats slot 4 in Four for compatibility.
        </Typography>
        <Swatches
          rows={[1, 2, 3, 4, 5].map((index) => [
            `Series ${index}`,
            `--t7-chart-${index}-hsl`,
          ])}
          values={values}
        />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Category comparison</CardTitle>
              <CardDescription>
                Illustrative data. Focus a mark to read its series, period and
                value.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <LineChart
              key={replay}
              ariaLabel="Illustrative category comparison"
              labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                { id: "research", label: "Research", values: [12, 18, 15, 24] },
                { id: "delivery", label: "Delivery", values: [8, 12, 20, 16] },
              ]}
            />
          </CardContent>
        </Card>
        <TokenRows
          label="Data visualization roles"
          values={values}
          rows={[
            ["Axis", "--t7-chart-axis-hsl"],
            ["Grid", "--t7-chart-grid-hsl"],
            ["Labels", "--t7-chart-label-hsl"],
            ["Tooltip", "--t7-chart-tooltip-hsl"],
            ["Tooltip foreground", "--t7-chart-tooltip-foreground-hsl"],
            ["Focus", "--t7-chart-focus-hsl"],
            ["Selection", "--t7-chart-selection-hsl"],
            ["Muted comparison", "--t7-chart-comparison-hsl"],
            ["Neutral threshold", "--t7-chart-threshold-hsl"],
            ["No data", "--t7-chart-no-data-hsl"],
            ["Explicit positive meaning", "--t7-chart-positive-hsl"],
            ["Explicit negative meaning", "--t7-chart-negative-hsl"],
          ]}
        />
        <Typography typeRole="body-sm">
          Thresholds are neutral unless an explicit business rule gives them
          status. Empty data needs a textual no-data state. Legends, mark labels
          and summaries carry meaning when colors cannot be distinguished.
        </Typography>
      </>
    ),
  };
  return (
    <div className="library-page foundation-page" ref={root}>
      <PageHeader
        overline="Global foundation"
        title="Tokens"
        description="The shared language, measured in the active theme. Inspect meaning, resolved values and propagation from one place."
      />
      <nav aria-label="Token families" className="token-family-nav">
        {FOUNDATION_FAMILIES.map(([id, label]) => (
          <a key={id} href={`#token-${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <Card>
        <CardHeader>
          <div>
            <CardTitle as="h2">Active profile</CardTitle>
            <CardDescription>
              Actual provider settings and effective runtime preferences.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="foundation-profile">
            {profileRows.map(([name, value]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
      {FOUNDATION_FAMILIES.map(([id, label]) => (
        <section
          className="foundation-section"
          id={`token-${id}`}
          key={id}
          aria-labelledby={`foundation-heading-${id}`}
        >
          <Typography
            as="h2"
            id={`foundation-heading-${id}`}
            typeRole="heading-lg"
          >
            {label}
          </Typography>
          {sections[id]}
        </section>
      ))}
    </div>
  );
}
