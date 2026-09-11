import { useMemo, useState, type CSSProperties } from "react";

import { brandAdapter, brandProfiles } from "@ten4seven/agent/generated";
import type {
  BrandAdapterContract,
  BrandProfile,
  BrandProfileId,
} from "@ten4seven/contracts";
import { T7Icon } from "@ten4seven/icons";
import {
  ActivityFeed,
  AppShell,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  DetailDrawer,
  FilterToolbar,
  FormActions,
  FormGrid,
  HierarchyPicker,
  Input,
  KPICluster,
  KeyValueList,
  MilestoneTracker,
  ModuleState,
  PageHeader,
  Progress,
  RecordSummary,
  SearchInput,
  Select,
  StatusChip,
  ThemeScope,
  Typography,
  type DataTableColumn,
} from "@ten4seven/ui";

import { PlaygroundSidebar, PlaygroundTopbar } from "./playground-chrome";

import {
  farmP1Contexts,
  farmP1Flocks,
  farmP1Hierarchy,
  farmP1InventoryStates,
  farmP1InventoryStateLabels,
  farmP1JourneyMilestones,
  farmP1Navigation,
  farmP1OverviewActivity,
  type FarmP1Context,
  type FarmP1Flock,
  type FarmP1FlockStatus,
  type FarmP1InventoryState,
  type FarmP1View,
} from "./farm-p1-reference-data";
import { farmP1ReferenceRoutePaths } from "./playground-routes";

const profiles = brandProfiles as unknown as Readonly<
  Record<BrandProfileId, BrandProfile>
>;
const adapter = brandAdapter as unknown as BrandAdapterContract;
const farmProfile = profiles["aapm-farm"];

function roleColor(slot: "primary" | "accent") {
  const role = farmProfile.brandRoles?.[slot];
  return role ? adapter.semantic[role].value.value : "transparent";
}

function viewFromPath(pathname: string): FarmP1View {
  const match = Object.entries(farmP1ReferenceRoutePaths).find(
    ([, path]) => path === pathname,
  );
  return (match?.[0] as FarmP1View | undefined) ?? "overview";
}

function FarmP1RouteHeader({
  view,
  onOpenSettings,
}: {
  view: FarmP1View;
  onOpenSettings?: () => void;
}) {
  const copy: Record<FarmP1View, { description: string; title: string }> = {
    overview: {
      description:
        "Today’s production signals and the next action for the farm team.",
      title: "Farm overview",
    },
    "daily-operations": {
      description: "Capture one clean daily record without an ERP-sized form.",
      title: "Daily operations",
    },
    context: {
      description:
        "Keep tenant, farm, cycle, and flock context visible before entry.",
      title: "Farm context",
    },
    flocks: {
      description:
        "Review active flocks and open one record for focused detail.",
      title: "Flocks & cycles",
    },
    inventory: {
      description:
        "Show how an optional capability arrives, pauses, or becomes ready.",
      title: "Inventory capability",
    },
  };
  return (
    <PageHeader
      actions={
        <Button
          intent="secondary"
          leadingIcon="settings"
          onClick={onOpenSettings}
        >
          Theme settings
        </Button>
      }
      description={copy[view].description}
      meta={
        <>
          <Badge tone="primary">AAPM Farm profile</Badge>
          <StatusChip icon="info">Static fixture</StatusChip>
        </>
      }
      overline="Farm customer platform · P1 reference slice"
      title={copy[view].title}
    />
  );
}

function FarmP1JourneyCard({
  onNavigate,
}: {
  onNavigate: (view: FarmP1View) => void;
}) {
  return (
    <Card className="farm-p1-card farm-p1-journey-card">
      <CardHeader>
        <div>
          <CardTitle>First-value journey</CardTitle>
          <CardDescription>
            One path from context to a useful daily decision.
          </CardDescription>
        </div>
        <StatusChip tone="success" icon="check">
          Ready
        </StatusChip>
      </CardHeader>
      <CardContent>
        <MilestoneTracker
          items={farmP1JourneyMilestones}
          label="Farm first-value journey"
          onSelectedIdChange={(id) => {
            if (id === "daily-operations") onNavigate("daily-operations");
            if (id === "overview") onNavigate("overview");
          }}
        />
      </CardContent>
    </Card>
  );
}

function FarmP1Overview({
  context,
  onNavigate,
}: {
  context: FarmP1Context;
  onNavigate: (view: FarmP1View) => void;
}) {
  return (
    <div className="farm-p1-view" data-testid="farm-p1-overview">
      <KPICluster
        className="farm-p1-kpi"
        columns={4}
        items={[
          {
            emphasis: "soft",
            icon: "egg",
            label: "Eggs collected",
            note: "today",
            tone: "success",
            value: context.eggs,
          },
          {
            emphasis: "soft",
            icon: "analytics",
            label: "Hen day",
            note: "production rate",
            tone: "primary",
            value: context.henDay,
          },
          {
            emphasis: "soft",
            icon: "package",
            label: "Feed intake",
            note: "per bird / day",
            value: context.feed,
          },
          {
            emphasis: "soft",
            icon: "warning",
            label: "Mortality",
            note: "today’s rate",
            tone: "warning",
            value: context.mortality,
          },
        ]}
        label="Farm production signals"
        variant="cards"
      />

      <div className="farm-p1-grid farm-p1-grid-wide">
        <FarmP1JourneyCard onNavigate={onNavigate} />
        <Card className="farm-p1-card">
          <CardHeader>
            <div>
              <CardTitle>Today’s snapshot</CardTitle>
              <CardDescription>
                {context.flock} · {context.snapshot}
              </CardDescription>
            </div>
            <T7Icon aria-hidden="true" name="analytics" size={22} />
          </CardHeader>
          <CardContent>
            <KeyValueList
              aria-label="Today’s farm snapshot"
              items={[
                { label: "Population", value: context.population },
                { label: "Feed conversion", value: context.fcr },
                { label: "Owner", value: context.owner },
                { label: "Region", value: context.region },
              ]}
            />
            <Button
              intent="secondary"
              leadingIcon="arrowRight"
              onClick={() => onNavigate("daily-operations")}
            >
              Open daily entry
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="farm-p1-grid farm-p1-grid-wide">
        <Card className="farm-p1-card">
          <CardHeader>
            <div>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>
                Latest entries from this farm fixture.
              </CardDescription>
            </div>
            <T7Icon aria-hidden="true" name="timeline" size={22} />
          </CardHeader>
          <CardContent>
            <ActivityFeed items={farmP1OverviewActivity} />
          </CardContent>
        </Card>
        <Card className="farm-p1-card farm-p1-inventory-preview">
          <CardHeader>
            <div>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                Optional capability, kept outside the first action.
              </CardDescription>
            </div>
            <StatusChip icon="lock">Unavailable</StatusChip>
          </CardHeader>
          <CardContent>
            <ModuleState
              description="The starter workspace stays useful without stock movements."
              icon="inventory"
              state="not-entitled"
              title="Connect Inventory when the farm is ready"
              action={
                <Button
                  intent="secondary"
                  onClick={() => onNavigate("inventory")}
                  size="sm"
                >
                  View capability
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FarmP1ContextView({
  context,
  farmId,
  onFarmChange,
  selectedHierarchyIds,
  onHierarchyChange,
}: {
  context: FarmP1Context;
  farmId: string;
  onFarmChange: (id: string) => void;
  selectedHierarchyIds: string[];
  onHierarchyChange: (ids: string[]) => void;
}) {
  return (
    <div className="farm-p1-view" data-testid="farm-p1-context">
      <div className="farm-p1-grid farm-p1-grid-wide">
        <Card className="farm-p1-card">
          <CardHeader>
            <div>
              <CardTitle>Choose context</CardTitle>
              <CardDescription>
                Make scope visible before entering a number.
              </CardDescription>
            </div>
            <T7Icon aria-hidden="true" name="farm" size={22} />
          </CardHeader>
          <CardContent>
            <div className="farm-p1-form">
              <Select
                id="farm-p1-tenant"
                label="Tenant"
                value="ayu-poultry"
                onChange={() => undefined}
              >
                <option value="ayu-poultry">Ayu Poultry Group</option>
              </Select>
              <Select
                id="farm-p1-farm"
                label="Farm"
                value={farmId}
                onChange={(event) => onFarmChange(event.target.value)}
              >
                {farmP1Contexts.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name}
                  </option>
                ))}
              </Select>
            </div>
            <HierarchyPicker
              data-testid="farm-p1-context-picker"
              defaultExpandedIds={[
                "farm-north",
                "farm-central",
                "cycle-24-a",
                "cycle-24-b",
              ]}
              description="Select a farm, cycle, or flock from the supplied fixture tree."
              items={farmP1Hierarchy}
              label="Farm and flock"
              onSelectionChange={onHierarchyChange}
              searchable
              searchPlaceholder="Find a flock"
              selectedIds={selectedHierarchyIds}
            />
          </CardContent>
        </Card>
        <Card className="farm-p1-card farm-p1-context-summary">
          <CardHeader>
            <div>
              <CardTitle>Current context</CardTitle>
              <CardDescription>
                Every next action inherits this scope.
              </CardDescription>
            </div>
            <StatusChip tone="success" icon="check">
              Selected
            </StatusChip>
          </CardHeader>
          <CardContent>
            <RecordSummary
              description={context.region + " · " + context.cycle}
              eyebrow="Farm"
              media={
                <span className="farm-p1-card-icon">
                  <T7Icon aria-hidden="true" name="farm" size={24} />
                </span>
              }
              title={context.name}
            />
            <KeyValueList
              aria-label="Current farm context"
              items={[
                { label: "Tenant", value: context.tenant },
                { label: "Flock", value: context.flock },
                { label: "Owner", value: context.owner },
                { label: "Last snapshot", value: context.snapshot },
              ]}
            />
            <Typography typeRole="caption">
              Selected nodes:{" "}
              {selectedHierarchyIds.length
                ? selectedHierarchyIds.join(", ")
                : "none"}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <FarmP1JourneyCard onNavigate={() => undefined} />
    </div>
  );
}

function FarmP1DailyOperations({
  context,
  operationValues,
  onChange,
  operationStatus,
  onSave,
  onFlag,
  onNavigate,
}: {
  context: FarmP1Context;
  operationValues: Record<string, string>;
  onChange: (key: string, value: string) => void;
  operationStatus: "idle" | "saved" | "correction";
  onSave: () => void;
  onFlag: () => void;
  onNavigate: (view: FarmP1View) => void;
}) {
  return (
    <div className="farm-p1-view" data-testid="farm-p1-daily-operations">
      <div className="farm-p1-grid farm-p1-grid-wide">
        <Card className="farm-p1-card">
          <CardHeader>
            <div>
              <CardTitle>Daily production entry</CardTitle>
              <CardDescription>
                {context.name} · {context.flock} · local fixture only
              </CardDescription>
            </div>
            <StatusChip icon="calendar">Today</StatusChip>
          </CardHeader>
          <CardContent>
            <FormGrid className="farm-p1-form" columns={2}>
              <Input
                id="farm-p1-operation-date"
                label="Operation date"
                onChange={(event) => onChange("date", event.target.value)}
                type="date"
                value={operationValues.date}
              />
              <Select
                id="farm-p1-operation-flock"
                label="Flock"
                value="flock-01"
                onChange={() => undefined}
              >
                <option value="flock-01">House A · Flock 01</option>
                <option value="flock-02">House B · Flock 02</option>
              </Select>
              <Input
                id="farm-p1-eggs"
                label="Eggs collected"
                onChange={(event) => onChange("eggs", event.target.value)}
                type="number"
                value={operationValues.eggs}
              />
              <Input
                id="farm-p1-feed"
                label="Feed issued (kg)"
                onChange={(event) => onChange("feed", event.target.value)}
                type="number"
                value={operationValues.feed}
              />
              <Input
                id="farm-p1-population"
                label="Population count"
                onChange={(event) => onChange("population", event.target.value)}
                type="number"
                value={operationValues.population}
              />
              <Input
                id="farm-p1-mortality"
                label="Mortality count"
                onChange={(event) => onChange("mortality", event.target.value)}
                type="number"
                value={operationValues.mortality}
              />
            </FormGrid>
            <FormActions className="farm-p1-form-actions">
              <Button intent="primary" leadingIcon="check" onClick={onSave}>
                Save fixture entry
              </Button>
              <Button intent="secondary" leadingIcon="warning" onClick={onFlag}>
                Flag correction
              </Button>
            </FormActions>
            {operationStatus === "saved" ? (
              <div aria-live="polite" className="farm-p1-status-output">
                <StatusChip tone="success" icon="check">
                  Fixture entry ready
                </StatusChip>
                <Typography typeRole="caption">
                  The record is shown as ready for a future consumer submission.
                </Typography>
              </div>
            ) : null}
            {operationStatus === "correction" ? (
              <div aria-live="polite" className="farm-p1-status-output">
                <StatusChip tone="warning" icon="warning">
                  Correction flagged
                </StatusChip>
                <Typography typeRole="caption">
                  The fixture keeps the correction visible without changing
                  source data.
                </Typography>
              </div>
            ) : null}
          </CardContent>
        </Card>
        <Card className="farm-p1-card">
          <CardHeader>
            <div>
              <CardTitle>Entry guidance</CardTitle>
              <CardDescription>
                Keep the field set small and reviewable.
              </CardDescription>
            </div>
            <T7Icon aria-hidden="true" name="info" size={22} />
          </CardHeader>
          <CardContent>
            <KeyValueList
              aria-label="Daily operation guidance"
              items={[
                { label: "Selected farm", value: context.name },
                { label: "Selected cycle", value: context.cycle },
                { label: "Expected output", value: "Production snapshot" },
                { label: "Data source", value: "Static reference fixture" },
              ]}
            />
            <Progress label="Entry completeness" showValue value={68} />
            <Button
              intent="quiet"
              leadingIcon="inventory"
              onClick={() => onNavigate("inventory")}
            >
              Check optional Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const flockColumns: DataTableColumn<FarmP1Flock>[] = [
  {
    key: "flock",
    header: "Flock",
    render: (row) => (
      <div className="farm-p1-table-primary">
        <strong>{row.flock}</strong>
        <span>{row.house}</span>
      </div>
    ),
  },
  { key: "cycle", header: "Cycle" },
  { key: "population", header: "Population" },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <StatusChip
        icon={row.status === "On track" ? "check" : "warning"}
        tone={row.status === "On track" ? "success" : "warning"}
      >
        {row.status}
      </StatusChip>
    ),
  },
  { key: "lastEntry", header: "Last entry" },
];

function FarmP1FlockDetail({
  flock,
  onClose,
}: {
  flock: FarmP1Flock;
  onClose: () => void;
}) {
  return (
    <DetailDrawer
      className="farm-p1-detail-drawer"
      description="Consumer-owned record summary from the reference fixture."
      onClose={onClose}
      open
      title={flock.flock}
    >
      <div className="farm-p1-detail-stack">
        <RecordSummary
          description={flock.house + " · " + flock.cycle}
          eyebrow="Flock record"
          media={
            <span className="farm-p1-card-icon">
              <T7Icon aria-hidden="true" name="chicken" size={24} />
            </span>
          }
          metadata={
            <StatusChip
              icon={flock.status === "On track" ? "check" : "warning"}
              tone={flock.status === "On track" ? "success" : "warning"}
            >
              {flock.status}
            </StatusChip>
          }
          title={flock.flock}
        />
        <KeyValueList
          aria-label="Flock details"
          items={[
            { label: "Population", value: flock.population },
            { label: "Age", value: flock.age },
            { label: "Mortality", value: flock.mortality },
            { label: "Caretaker", value: flock.caretaker },
            { label: "Last entry", value: flock.lastEntry },
          ]}
        />
        <ActivityFeed
          aria-label="Flock activity"
          items={[
            {
              actor: flock.caretaker,
              description: "Daily record remains available for review.",
              icon: "timeline",
              id: flock.id + "-review",
              meta: flock.lastEntry,
              title: "Latest fixture checkpoint",
            },
          ]}
        />
      </div>
    </DetailDrawer>
  );
}

function FarmP1FlocksView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | FarmP1FlockStatus>("all");
  const [selectedFlock, setSelectedFlock] = useState<FarmP1Flock>();
  const filteredFlocks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return farmP1Flocks.filter((flock) => {
      const matchesQuery =
        !normalizedQuery ||
        [flock.flock, flock.house, flock.cycle, flock.caretaker].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      return matchesQuery && (status === "all" || flock.status === status);
    });
  }, [query, status]);

  return (
    <div className="farm-p1-view" data-testid="farm-p1-flocks">
      <Card className="farm-p1-card">
        <CardHeader>
          <div>
            <CardTitle>Flock register</CardTitle>
            <CardDescription>
              Read-oriented list with a focused detail drawer.
            </CardDescription>
          </div>
          <StatusChip icon="table">{filteredFlocks.length} records</StatusChip>
        </CardHeader>
        <CardContent>
          <FilterToolbar
            className="farm-p1-filter"
            summary="Search the static flock fixture."
            title="Find a flock"
          >
            <SearchInput
              aria-label="Search flocks"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Flock, house, cycle, or caretaker"
              value={query}
            />
            <Select
              aria-label="Filter flock status"
              onChange={(event) =>
                setStatus(event.target.value as "all" | FarmP1FlockStatus)
              }
              value={status}
            >
              <option value="all">All statuses</option>
              <option value="On track">On track</option>
              <option value="Review">Review</option>
            </Select>
          </FilterToolbar>
          <DataTable
            aria-label="Farm flock and cycle records"
            caption="Farm flock and cycle records"
            className="farm-p1-table"
            columns={flockColumns}
            emptyMessage="No flocks match this fixture filter."
            onRowClick={setSelectedFlock}
            responsive="scroll"
            rowKey={(row) => row.id}
            rows={filteredFlocks}
          />
        </CardContent>
      </Card>
      {selectedFlock ? (
        <FarmP1FlockDetail
          flock={selectedFlock}
          onClose={() => setSelectedFlock(undefined)}
        />
      ) : null}
    </div>
  );
}

function FarmP1InventoryView() {
  const [state, setState] = useState<FarmP1InventoryState>("not-entitled");
  const [feedback, setFeedback] = useState("");
  const current = farmP1InventoryStates.find((item) => item.state === state);
  return (
    <div className="farm-p1-view" data-testid="farm-p1-inventory">
      <Card className="farm-p1-card">
        <CardHeader>
          <div>
            <CardTitle>Capability state</CardTitle>
            <CardDescription>
              The consumer owns applicability and lifecycle meaning; the shared
              module state owns presentation.
            </CardDescription>
          </div>
          <StatusChip icon="inventory">
            {farmP1InventoryStateLabels[state]}
          </StatusChip>
        </CardHeader>
        <CardContent>
          <Select
            data-testid="farm-p1-inventory-state"
            label="Fixture state"
            onChange={(event) => {
              setState(event.target.value as FarmP1InventoryState);
              setFeedback("");
            }}
            value={state}
          >
            {farmP1InventoryStates.map((item) => (
              <option key={item.state} value={item.state}>
                {item.label}
              </option>
            ))}
          </Select>
          {current && state !== "active" ? (
            <ModuleState
              description={current.description}
              icon={current.icon}
              state={state as "not-entitled" | "setup-required" | "suspended"}
              title={current.title}
              action={
                state === "not-entitled" ? (
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setFeedback("Capability request noted in fixture.")
                    }
                    size="sm"
                  >
                    Request review
                  </Button>
                ) : state === "setup-required" ? (
                  <Button
                    intent="primary"
                    onClick={() =>
                      setFeedback("Setup handoff noted in fixture.")
                    }
                    size="sm"
                  >
                    Start setup
                  </Button>
                ) : state === "suspended" ? (
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setFeedback("Resume review noted in fixture.")
                    }
                    size="sm"
                  >
                    Review resume
                  </Button>
                ) : (
                  <Button
                    intent="primary"
                    onClick={() =>
                      setFeedback("Inventory review opened in fixture.")
                    }
                    size="sm"
                  >
                    Review inventory
                  </Button>
                )
              }
            />
          ) : null}
          {state === "active" ? (
            <Card className="farm-p1-card farm-p1-active-module-card">
              <CardHeader>
                <div>
                  <CardTitle>Connected stock view</CardTitle>
                  <CardDescription>
                    Example active capability content.
                  </CardDescription>
                </div>
                <StatusChip tone="success" icon="check">
                  Ready
                </StatusChip>
              </CardHeader>
              <CardContent>
                <KeyValueList
                  aria-label="Inventory summary"
                  items={[
                    { label: "Feed stock", value: "18.4 t" },
                    { label: "Tracked items", value: "24" },
                    { label: "Last sync", value: "Today · 08:45" },
                  ]}
                />
                <Progress label="Setup coverage" showValue value={92} />
              </CardContent>
            </Card>
          ) : null}
          {feedback ? (
            <div aria-live="polite" className="farm-p1-status-output">
              <StatusChip tone="success" icon="check">
                Fixture feedback
              </StatusChip>
              <Typography typeRole="caption">{feedback}</Typography>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export interface FarmP1ReferenceProps {
  onNavigatePath?: (path: string) => void;
  onOpenSettings?: () => void;
  pathname: string;
}

export function FarmP1Reference({
  onNavigatePath,
  onOpenSettings,
  pathname,
}: FarmP1ReferenceProps) {
  const view = viewFromPath(pathname);
  const [farmId, setFarmId] = useState("farm-north");
  const [selectedHierarchyIds, setSelectedHierarchyIds] = useState([
    "flock-01",
  ]);
  const [operationValues, setOperationValues] = useState({
    date: "2026-09-11",
    eggs: "42860",
    feed: "112",
    mortality: "18",
    population: "48240",
  });
  const [operationStatus, setOperationStatus] = useState<
    "idle" | "saved" | "correction"
  >("idle");
  const context =
    farmP1Contexts.find((item) => item.id === farmId) ?? farmP1Contexts[0];
  const navigatePath = onNavigatePath ?? (() => undefined);

  function navigate(nextView: FarmP1View) {
    onNavigatePath?.(farmP1ReferenceRoutePaths[nextView]);
  }

  function updateOperationValue(key: string, value: string) {
    setOperationValues((current) => ({ ...current, [key]: value }));
    setOperationStatus("idle");
  }

  const shellStyle = {
    "--farm-p1-brand-accent": roleColor("accent"),
    "--farm-p1-brand-primary": roleColor("primary"),
  } as CSSProperties;

  return (
    <ThemeScope
      className="farm-p1-theme-scope"
      data-brand-profile="aapm-farm"
      data-testid="farm-p1-theme-scope"
      preferences={{ density: farmProfile.density }}
      style={shellStyle}
      theme={farmProfile.themeRecipe}
    >
      <AppShell
        className="farm-p1-shell"
        contentWidth="wide"
        data-shell-contract="reference-shell"
        data-shell-variant="contextual"
        navigationLabel="Farm starter navigation"
        sidebar={
          <PlaygroundSidebar
            activePath={pathname}
            localNavigation={[
              {
                key: "farm-p1",
                label: "Starter journey",
                items: farmP1Navigation.map((item) => ({
                  active: item.id === view,
                  icon: item.icon,
                  key: item.id,
                  label: item.label,
                  onSelect: () => navigate(item.id),
                })),
              },
            ]}
            footer={
              <Typography typeRole="caption">
                Reference fixture · no live Farm authority
              </Typography>
            }
            label="Farm starter navigation"
            onNavigatePath={navigatePath}
          />
        }
        stickyHeader
        topbar={
          <PlaygroundTopbar
            activeRoute="Farm P1 Reference"
            breadcrumbItems={[{ label: "Farm P1 Reference" }]}
            onNavigatePath={navigatePath}
            onOpenSettings={onOpenSettings}
            settingsLabel="Open Farm reference settings"
            showBack={Boolean(onNavigatePath)}
          />
        }
      >
        <div className="farm-p1-page" data-testid="farm-p1-reference">
          <FarmP1RouteHeader onOpenSettings={onOpenSettings} view={view} />
          {view === "overview" ? (
            <FarmP1Overview context={context} onNavigate={navigate} />
          ) : view === "context" ? (
            <FarmP1ContextView
              context={context}
              farmId={farmId}
              onFarmChange={setFarmId}
              onHierarchyChange={setSelectedHierarchyIds}
              selectedHierarchyIds={selectedHierarchyIds}
            />
          ) : view === "daily-operations" ? (
            <FarmP1DailyOperations
              context={context}
              onChange={updateOperationValue}
              onFlag={() => setOperationStatus("correction")}
              onNavigate={navigate}
              onSave={() => setOperationStatus("saved")}
              operationStatus={operationStatus}
              operationValues={operationValues}
            />
          ) : view === "flocks" ? (
            <FarmP1FlocksView />
          ) : (
            <FarmP1InventoryView />
          )}
        </div>
      </AppShell>
    </ThemeScope>
  );
}
