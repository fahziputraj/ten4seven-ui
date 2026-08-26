import { useEffect, useMemo, useState } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DataTable,
  Input,
  Modal,
  NavItem,
  Select,
  Ten4SevenProvider,
  Typography,
  useTen4SevenTheme,
  Badge,
  type DataTableColumn,
} from "@ten4seven/ui";
import type {
  Appearance,
  DensityName,
  PaletteName,
  RadiusName,
  TypographyName,
} from "@ten4seven/tokens";
import {
  EbookStoreCatalog,
  referenceRouteFromPath,
  referenceRoutePaths,
  WarehouseInventory,
  type ReferenceRoute,
} from "./reference-screens";

type StudioSettings = {
  appearance: Appearance;
  palette: PaletteName;
  radius: RadiusName;
  density: DensityName;
  typography: TypographyName;
};

type InventoryRow = {
  id: string;
  component: string;
  layer: string;
  status: "Ready" | "In review";
};

const inventoryRows: InventoryRow[] = [
  {
    id: "tokens",
    component: "Semantic tokens",
    layer: "L1 foundation",
    status: "Ready",
  },
  { id: "button", component: "Button", layer: "L4 canonical", status: "Ready" },
  {
    id: "table",
    component: "DataTable",
    layer: "L4 canonical",
    status: "In review",
  },
];

const columns: DataTableColumn<InventoryRow>[] = [
  { key: "component", header: "Surface" },
  { key: "layer", header: "Layer" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge tone={row.status === "Ready" ? "success" : "warning"}>
        {row.status}
      </Badge>
    ),
  },
];

const navItems: Array<{ label: StudioRoute; icon: IconName }> = [
  { label: "Theme Studio", icon: "theme" },
  { label: "Warehouse Inventory", icon: "warehouse" },
  { label: "Ebook Store", icon: "book" },
  { label: "Tokens", icon: "tokens" },
  { label: "Components", icon: "components" },
];

type StudioRoute = ReferenceRoute | "Tokens" | "Components";

function StudioMark() {
  return (
    <span className="studio-mark">
      <T7Icon name="theme" size={18} />
    </span>
  );
}

function TypographySpecimen() {
  return (
    <section className="studio-type-section">
      <div className="studio-section-heading">
        <div>
          <h2>Typography specimen</h2>
          <p>One live hierarchy, resolved from the active typography preset.</p>
        </div>
        <span className="studio-section-count">Inter variable / opsz auto</span>
      </div>

      <Card className="typography-specimen">
        <CardContent>
          <div className="type-specimen-hero">
            <div>
              <Typography typeRole="overline">Display</Typography>
              <Typography typeRole="display-lg" as="h2">
                Make the system legible.
              </Typography>
              <Typography typeRole="body-lg" as="p">
                Hierarchy comes from size, space, color, tracking, and limited
                emphasis—not a wall of bold text.
              </Typography>
            </div>
            <div className="type-specimen-metric">
              <Typography typeRole="metric-lg" as="strong" data-numeric>
                12,480
              </Typography>
              <Typography typeRole="caption">Indexed surfaces</Typography>
            </div>
          </div>

          <div className="type-specimen-grid">
            <div className="type-specimen-group">
              <Typography typeRole="overline">Headings</Typography>
              <Typography typeRole="heading-lg" as="h3">
                Section title
              </Typography>
              <Typography typeRole="card-title" as="h3">
                Card title
              </Typography>
              <Typography typeRole="heading-sm" as="h3">
                Supporting heading
              </Typography>
            </div>

            <div className="type-specimen-group">
              <Typography typeRole="overline">Body and labels</Typography>
              <Typography typeRole="body" as="p">
                Body text stays readable and calm at the default UI size.
              </Typography>
              <Typography typeRole="body-sm" as="p">
                Small body text carries supporting context without competing.
              </Typography>
              <Typography typeRole="label">Form label / 500</Typography>
              <Typography typeRole="caption">Helper text / 400</Typography>
            </div>

            <div className="type-specimen-group">
              <Typography typeRole="overline">Controls</Typography>
              <div className="type-specimen-control-row">
                <Button size="sm">Primary action</Button>
                <Button intent="secondary" size="sm">
                  Secondary
                </Button>
              </div>
              <div
                className="type-specimen-tabs"
                aria-label="Typography tab sample"
              >
                <span data-active="true">Overview</span>
                <span>Activity</span>
                <span>Settings</span>
              </div>
              <NavItem active icon="theme" label="Navigation item" />
            </div>

            <div className="type-specimen-group type-specimen-data">
              <Typography typeRole="overline">Data</Typography>
              <div className="type-specimen-data-row">
                <Typography typeRole="table-header">Amount</Typography>
                <Typography typeRole="table-cell" data-numeric>
                  $48,920.00
                </Typography>
              </div>
              <div className="type-specimen-data-row">
                <Typography typeRole="table-header">Change</Typography>
                <Typography typeRole="table-cell" data-numeric>
                  +18.4%
                </Typography>
              </div>
              <div className="type-specimen-data-row">
                <Typography typeRole="table-header">Updated</Typography>
                <Typography typeRole="table-cell">Aug 26, 2026</Typography>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Studio() {
  const { theme } = useTen4SevenTheme();
  const [activeNav, setActiveNav] = useState<StudioRoute>(() =>
    typeof window === "undefined"
      ? "Theme Studio"
      : referenceRouteFromPath(window.location.pathname),
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setActiveNav(referenceRouteFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const titles: Record<StudioRoute, string> = {
      "Theme Studio": "ten4seven UI — Theme Studio",
      "Warehouse Inventory": "ten4seven UI — Warehouse Inventory",
      "Ebook Store": "Leaf & Letter — Ebook Store",
      Tokens: "ten4seven UI — Tokens",
      Components: "ten4seven UI — Components",
    };
    document.title = titles[activeNav];
  }, [activeNav]);

  function navigateTo(route: StudioRoute) {
    const referenceRoute: ReferenceRoute =
      route === "Tokens" || route === "Components" ? "Theme Studio" : route;
    const nextPath = referenceRoutePaths[referenceRoute];
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setActiveNav(route);
  }

  const axisRows = useMemo(
    () => [
      ["Appearance", theme.appearance],
      ["Palette", theme.palette],
      ["Radius", theme.radius],
      ["Density", theme.density],
      ["Typography", theme.typography],
    ],
    [theme],
  );

  if (activeNav === "Warehouse Inventory") {
    return <WarehouseInventory onNavigate={navigateTo} />;
  }
  if (activeNav === "Ebook Store") {
    return <EbookStoreCatalog onNavigate={navigateTo} />;
  }

  return (
    <div className="studio-shell">
      <aside className="studio-sidebar">
        <div className="studio-brand">
          <StudioMark />
          <div>
            <strong>ten4seven</strong>
            <span>UI system</span>
          </div>
        </div>

        <div className="studio-nav-group">
          <span className="studio-nav-label">Workspace</span>
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              active={activeNav === item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => navigateTo(item.label)}
            />
          ))}
        </div>

        <div className="studio-sidebar-note">
          <span className="studio-nav-label">Proof scope</span>
          <p>Six representative surfaces. One token contract.</p>
          <span className="studio-sidebar-version">v0.1 foundation</span>
        </div>
      </aside>

      <main className="studio-main">
        <header className="studio-topbar">
          <div className="studio-breadcrumb">
            <span>ten4seven UI</span>
            <T7Icon name="chevronDown" size={13} />
            <strong>{activeNav}</strong>
          </div>
          <div className="studio-top-actions">
            <span className="studio-live-dot">
              <i /> Local proof
            </span>
            <button
              aria-label="Open settings"
              className="studio-top-icon"
              type="button"
            >
              <T7Icon name="settings" size={17} />
            </button>
            <span className="studio-avatar">T7</span>
          </div>
        </header>

        <div className="studio-content">
          <section className="studio-intro">
            <div>
              <Typography typeRole="display-lg" as="h1">
                Theme Studio
              </Typography>
              <p>
                Adjust the system axes, then inspect how the same surfaces
                respond without local restyling.
              </p>
            </div>
            <div className="studio-intro-actions">
              <Badge tone="primary">
                <T7Icon name="check" size={13} /> Gate B proof
              </Badge>
              <span className="studio-last-updated">
                Changes are local to this preview
              </span>
            </div>
          </section>

          <section className="studio-control-row">
            <Card className="studio-controls-card">
              <CardHeader>
                <div>
                  <CardTitle>Global controls</CardTitle>
                  <CardDescription>
                    Every control below writes semantic variables at the
                    provider root.
                  </CardDescription>
                </div>
                <T7Icon className="studio-card-icon" name="palette" size={24} />
              </CardHeader>
              <CardContent className="studio-controls-grid">
                <SettingSelect
                  label="Appearance"
                  value={theme.appearance}
                  options={["light", "dark"]}
                />
                <SettingSelect
                  label="Palette"
                  value={theme.palette}
                  options={["emerald", "blue", "violet", "slate"]}
                />
                <SettingSelect
                  label="Radius"
                  value={theme.radius}
                  options={["sharp", "soft", "rounded"]}
                />
                <SettingSelect
                  label="Density"
                  value={theme.density}
                  options={["comfortable", "default", "compact", "dense"]}
                />
                <SettingSelect
                  label="Typography"
                  value={theme.typography}
                  options={["modern", "humanist", "mono"]}
                />
              </CardContent>
            </Card>

            <Card className="studio-axis-card" tone="accent">
              <CardHeader>
                <div>
                  <CardTitle>Active profile</CardTitle>
                  <CardDescription>
                    Resolved values in this render.
                  </CardDescription>
                </div>
                <span className="studio-axis-value">{theme.palette}</span>
              </CardHeader>
              <CardContent>
                <dl className="studio-axis-list">
                  {axisRows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd data-numeric={label === "Density" ? undefined : true}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
              <CardFooter>
                <span className="studio-axis-line" />
                <span>Root variables active</span>
              </CardFooter>
            </Card>
          </section>

          <TypographySpecimen />

          <section className="studio-section-heading">
            <div>
              <h2>Component proof</h2>
              <p>
                Six surfaces are intentionally rendered together so global
                changes stay visible.
              </p>
            </div>
            <span className="studio-section-count">6 surfaces / 5 axes</span>
          </section>

          <section className="proof-grid">
            <Card className="proof-panel">
              <CardHeader>
                <div>
                  <CardTitle>Button</CardTitle>
                  <CardDescription>
                    Intent and size consume the same control height.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="components" size={20} />
              </CardHeader>
              <CardContent className="proof-button-stack">
                <Button leadingIcon="plus">Create recipe</Button>
                <Button intent="secondary">Inspect API</Button>
                <Button intent="quiet" size="sm">
                  Quiet action
                </Button>
              </CardContent>
            </Card>

            <Card className="proof-panel">
              <CardHeader>
                <div>
                  <CardTitle>Input</CardTitle>
                  <CardDescription>
                    Focus treatment stays semantic across palettes.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="search" size={20} />
              </CardHeader>
              <CardContent className="proof-form">
                <Input
                  label="Search components"
                  defaultValue="DataTable"
                  leadingIcon="search"
                  hint="Semantic field / local value"
                />
              </CardContent>
            </Card>

            <Card className="proof-panel" tone="success">
              <CardHeader>
                <div>
                  <CardTitle>Card</CardTitle>
                  <CardDescription>
                    Surface elevation follows the global profile.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="check" size={20} />
              </CardHeader>
              <CardContent>
                <div className="mini-record">
                  <span className="mini-record-label">Tokens indexed</span>
                  <strong data-numeric>476</strong>
                  <span className="mini-record-foot">
                    <T7Icon name="check" size={13} /> Ready for extraction
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="proof-panel proof-table-panel">
              <CardHeader>
                <div>
                  <CardTitle>DataTable row</CardTitle>
                  <CardDescription>
                    Declared density changes rows, not readability.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="table" size={20} />
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  rows={inventoryRows}
                  rowKey={(row) => row.id}
                />
              </CardContent>
            </Card>

            <Card className="proof-panel">
              <CardHeader>
                <div>
                  <CardTitle>Modal</CardTitle>
                  <CardDescription>
                    Overlay surface uses the same radius and elevation family.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="modal" size={20} />
              </CardHeader>
              <CardContent className="proof-modal-content">
                <Button
                  intent="secondary"
                  leadingIcon="modal"
                  onClick={() => setModalOpen(true)}
                >
                  Open dialog
                </Button>
                <span>
                  {isModalOpen ? "Open and keyboard-dismissable" : "Closed"}
                </span>
              </CardContent>
            </Card>

            <Card className="proof-panel">
              <CardHeader>
                <div>
                  <CardTitle>Sidebar item</CardTitle>
                  <CardDescription>
                    Navigation state uses semantic foregrounds.
                  </CardDescription>
                </div>
                <T7Icon className="proof-icon" name="sidebar" size={20} />
              </CardHeader>
              <CardContent className="proof-nav-content">
                <NavItem active icon="theme" label="Theme Studio" />
                <NavItem icon="components" label="Components" />
              </CardContent>
            </Card>
          </section>

          <section className="studio-footer-card">
            <div>
              <T7Icon name="check" size={18} />
              <strong>Gate B ready for extension</strong>
              <span>
                Change green → blue, soft → sharp, default → compact, font, and
                light → dark from the controls above.
              </span>
            </div>
            <Button
              intent={saved ? "secondary" : "primary"}
              size="sm"
              onClick={() => setSaved(true)}
            >
              {saved ? "Proof saved" : "Save local proof"}
            </Button>
          </section>
        </div>

        <Modal
          description="This is a local interaction proof. No server action is performed."
          onClose={() => setModalOpen(false)}
          open={isModalOpen}
          title="Theme engine response"
        >
          <div className="modal-proof-copy">
            <span className="modal-proof-icon">
              <T7Icon name="check" size={22} />
            </span>
            <div>
              <strong>Global variables are active.</strong>
              <p>
                Radius, density, palette, typography, and appearance are
                resolved at the provider root. Escape closes this dialog.
              </p>
            </div>
          </div>
          <div className="modal-proof-actions">
            <Button intent="quiet" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
                setSaved(true);
              }}
            >
              Confirm proof
            </Button>
          </div>
        </Modal>
      </main>
    </div>
  );
}

function SettingSelect({
  label,
  options,
  value,
}: {
  label: string;
  options: string[];
  value: string;
}) {
  const { setTheme } = useTen4SevenTheme();
  return (
    <Select
      label={label}
      value={value}
      onChange={(event) => {
        const next = event.target.value;
        setTheme({ [label.toLowerCase()]: next } as Partial<StudioSettings>);
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

export default function App() {
  const [settings] = useState<StudioSettings>({
    appearance: "light",
    palette: "emerald",
    radius: "soft",
    density: "default",
    typography: "modern",
  });

  return (
    <Ten4SevenProvider {...settings}>
      <Studio />
    </Ten4SevenProvider>
  );
}
