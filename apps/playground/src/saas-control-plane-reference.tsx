import { useState, type ReactNode } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  ActivityFeed,
  AppShell,
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  FileUpload,
  HierarchyPicker,
  KeyValueList,
  MilestoneTracker,
  ModuleState,
  PageHeader,
  Progress,
  Select,
  StatusChip,
  Typography,
  type DataTableColumn,
  type HierarchyItem,
  type StatusTone,
} from "@ten4seven/ui";

import { PlaygroundSidebar, PlaygroundTopbar } from "./playground-chrome";

type ControlPlaneView =
  "context" | "module-catalog" | "activation" | "access" | "trace";

const controlPlaneViews: Array<{
  description: string;
  icon: IconName;
  key: ControlPlaneView;
  label: string;
}> = [
  {
    description: "Organization and resource context.",
    icon: "users",
    key: "context",
    label: "Context switching",
  },
  {
    description: "Capabilities and setup requirements.",
    icon: "components",
    key: "module-catalog",
    label: "Module catalog",
  },
  {
    description: "Progress, checkpoints, and lifecycle states.",
    icon: "progress",
    key: "activation",
    label: "Activation progress",
  },
  {
    description: "Scope explanation and role comparison.",
    icon: "lock",
    key: "access",
    label: "Access and scope",
  },
  {
    description: "Audit, import, and reconciliation trace.",
    icon: "timeline",
    key: "trace",
    label: "Trace and review",
  },
];

const resourceItems: HierarchyItem[] = [
  {
    children: [
      {
        description: "Primary operational site",
        id: "site-north-01",
        label: "North site",
      },
      {
        description: "Scope supplied as unavailable in this fixture",
        disabled: true,
        id: "site-north-02",
        label: "North satellite site",
      },
    ],
    description: "Regional resource group",
    id: "region-north",
    label: "North region",
  },
  {
    children: [
      {
        description: "Receiving and storage location",
        id: "facility-central-01",
        label: "Central facility",
      },
      {
        description: "Read-only resource in this fixture",
        id: "facility-central-02",
        label: "Archive facility",
      },
    ],
    description: "Shared facilities",
    id: "region-central",
    label: "Central region",
  },
];

const setupChecklist = [
  {
    description: "Connection details supplied by the consumer.",
    id: "connection",
    label: "Connect source",
    meta: "Verified",
    percentage: 100,
    status: "complete" as const,
  },
  {
    description: "Field mapping is still required before activation.",
    id: "mapping",
    label: "Map fields",
    meta: "Needs review",
    percentage: 58,
    status: "current" as const,
  },
  {
    description: "Consumer-owned validation is not yet supplied.",
    id: "validation",
    label: "Validate sample",
    meta: "Not started",
    percentage: 0,
    status: "upcoming" as const,
  },
];

const activationMilestones = [
  {
    description: "The capability is registered for the current context.",
    id: "registered",
    label: "Registered",
    meta: "Complete",
    percentage: 100,
    status: "complete" as const,
  },
  {
    description: "Consumer-supplied platform progress is in flight.",
    id: "provisioning",
    label: "Provisioning",
    meta: "68% reported",
    percentage: 68,
    status: "current" as const,
  },
  {
    description:
      "The final activation result will be supplied by the consumer.",
    id: "active",
    label: "Active",
    meta: "Waiting",
    percentage: 0,
    status: "upcoming" as const,
  },
];

type PermissionRow = {
  configure: string;
  export: string;
  id: string;
  read: string;
  role: string;
};

const permissionRows: PermissionRow[] = [
  {
    configure: "Allowed",
    export: "Allowed",
    id: "operations-lead",
    read: "Allowed",
    role: "Operations lead",
  },
  {
    configure: "Limited",
    export: "Allowed",
    id: "reviewer",
    read: "Allowed",
    role: "Review partner",
  },
  {
    configure: "Not available",
    export: "Not available",
    id: "observer",
    read: "Read-only",
    role: "Observer",
  },
];

const permissionColumns: DataTableColumn<PermissionRow>[] = [
  { header: "Role", key: "role", required: true },
  {
    header: "Read",
    key: "read",
    render: (row) => <PermissionStatus value={row.read} />,
  },
  {
    header: "Configure",
    key: "configure",
    render: (row) => <PermissionStatus value={row.configure} />,
  },
  {
    header: "Export",
    key: "export",
    render: (row) => <PermissionStatus value={row.export} />,
  },
];

type ImportRow = {
  id: string;
  reason: string;
  row: string;
  state: "Ready" | "Review" | "Blocked";
};

const importRows: ImportRow[] = [
  {
    id: "import-004",
    reason: "External code is not mapped.",
    row: "004",
    state: "Review",
  },
  {
    id: "import-011",
    reason: "Required date is missing.",
    row: "011",
    state: "Blocked",
  },
  {
    id: "import-018",
    reason: "All required fields supplied.",
    row: "018",
    state: "Ready",
  },
];

const importColumns: DataTableColumn<ImportRow>[] = [
  { header: "Row", key: "row", required: true },
  { header: "Reason", key: "reason", overflow: "wrap" },
  {
    header: "State",
    key: "state",
    render: (row) => <ImportStatus value={row.state} />,
  },
];

type ReconciliationRow = {
  id: string;
  mapping: string;
  source: string;
  state: "Matched" | "Unresolved" | "Changed";
  target: string;
};

const reconciliationRows: ReconciliationRow[] = [
  {
    id: "mapping-warehouse",
    mapping: "Exact code",
    source: "WH-NORTH",
    state: "Matched",
    target: "North site",
  },
  {
    id: "mapping-satellite",
    mapping: "Alias review",
    source: "WH-SAT",
    state: "Unresolved",
    target: "North satellite site",
  },
  {
    id: "mapping-archive",
    mapping: "Consumer override",
    source: "WH-ARC",
    state: "Changed",
    target: "Archive facility",
  },
];

const reconciliationColumns: DataTableColumn<ReconciliationRow>[] = [
  { header: "Source", key: "source", required: true },
  { header: "Target", key: "target", overflow: "wrap" },
  { header: "Mapping", key: "mapping", overflow: "wrap" },
  {
    header: "State",
    key: "state",
    render: (row) => <ReconciliationStatus value={row.state} />,
  },
];

function PatternViewHeader({
  description,
  icon,
  title,
}: {
  description: ReactNode;
  icon: IconName;
  title: string;
}) {
  return (
    <div className="q05-pattern-view-header">
      <span aria-hidden="true" className="q05-pattern-view-icon">
        <T7Icon name={icon} size={20} />
      </span>
      <div>
        <Typography as="h2" typeRole="heading-lg">
          {title}
        </Typography>
        <Typography as="p" typeRole="body-sm">
          {description}
        </Typography>
      </div>
    </div>
  );
}

function FixtureBadge() {
  return (
    <Badge tone="primary">
      <T7Icon aria-hidden="true" name="components" size={13} />
      Static consumer fixture
    </Badge>
  );
}

function PermissionStatus({ value }: { value: string }) {
  const tone: StatusTone =
    value === "Allowed"
      ? "success"
      : value === "Limited"
        ? "warning"
        : "neutral";
  return <StatusChip tone={tone}>{value}</StatusChip>;
}

function ImportStatus({ value }: { value: ImportRow["state"] }) {
  const tone: StatusTone =
    value === "Ready" ? "success" : value === "Review" ? "warning" : "danger";
  return <StatusChip tone={tone}>{value}</StatusChip>;
}

function ReconciliationStatus({
  value,
}: {
  value: ReconciliationRow["state"];
}) {
  const tone: StatusTone =
    value === "Matched" ? "success" : value === "Changed" ? "info" : "warning";
  return <StatusChip tone={tone}>{value}</StatusChip>;
}

function ContextView() {
  const [organization, setOrganization] = useState("northstar");
  const [selectedResources, setSelectedResources] = useState(["site-north-01"]);

  return (
    <div className="q05-pattern-view" data-testid="q05-context-view">
      <PatternViewHeader
        description="The consumer supplies opaque context values; the canonical controls only present and return the selection."
        icon="users"
        title="Tenant and resource context"
      />
      <div className="q05-pattern-layout">
        <Card data-testid="q05-tenant-selector">
          <CardHeader>
            <CardTitle>Tenant / organization selector</CardTitle>
            <CardDescription>
              A flat context choice belongs in the shell context slot or route
              header.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              label="Organization"
              onChange={(event) => setOrganization(event.target.value)}
              value={organization}
            >
              <option value="northstar">Northstar Operations</option>
              <option value="civic">Civic Services Group</option>
              <option value="atlas">Atlas Field Services</option>
            </Select>
            <KeyValueList
              aria-label="Selected organization context"
              className="q05-context-facts"
              items={[
                { label: "Selected context", value: "Northstar Operations" },
                { label: "Identifier", value: organization },
                { label: "Next behavior", value: "Consumer-owned refresh" },
              ]}
            />
          </CardContent>
        </Card>
        <Card data-testid="q05-resource-selector">
          <CardHeader>
            <CardTitle>Resource selector</CardTitle>
            <CardDescription>
              Use a hierarchy when ancestry and scope matter; the labels are not
              Farm-specific.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HierarchyPicker
              description="Select the resources supplied for this static fixture."
              items={resourceItems}
              label="Resource scope"
              onSelectionChange={setSelectedResources}
              searchable
              selectedIds={selectedResources}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ModuleCatalogView() {
  const [modulePreview, setModulePreview] = useState<"setup" | "active">(
    "setup",
  );

  return (
    <div className="q05-pattern-view" data-testid="q05-module-catalog-view">
      <PatternViewHeader
        description="The module registry and state are static values supplied by the consumer; the controls below only switch the fixture preview."
        icon="components"
        title="Capability catalog and setup"
      />
      <Card data-testid="q05-module-catalog">
        <CardHeader>
          <div className="q05-card-heading-row">
            <div>
              <CardTitle>Module setup-required → active</CardTitle>
              <CardDescription>
                Inspect both presentations without invoking a provisioning
                command.
              </CardDescription>
            </div>
            <FixtureBadge />
          </div>
        </CardHeader>
        <CardContent>
          <ButtonGroup
            className="q05-preview-switcher"
            label="Module fixture preview"
          >
            <Button
              aria-pressed={modulePreview === "setup"}
              intent={modulePreview === "setup" ? "secondary" : "quiet"}
              onClick={() => setModulePreview("setup")}
              size="sm"
            >
              Setup required
            </Button>
            <Button
              aria-pressed={modulePreview === "active"}
              intent={modulePreview === "active" ? "secondary" : "quiet"}
              onClick={() => setModulePreview("active")}
              size="sm"
            >
              Active
            </Button>
          </ButtonGroup>
          <div className="q05-module-preview">
            {modulePreview === "setup" ? (
              <ModuleState
                action={
                  <Button onClick={() => setModulePreview("active")} size="sm">
                    View setup
                  </Button>
                }
                description="The consumer has supplied a capability that needs configuration before it can be used."
                state="setup-required"
                title="Inventory sync needs setup"
              />
            ) : (
              <Card className="q05-active-module-card" data-state="active">
                <CardContent>
                  <div className="q05-card-heading-row">
                    <div>
                      <Typography as="h3" typeRole="heading-md">
                        Inventory sync
                      </Typography>
                      <Typography typeRole="body-sm">
                        Active for Northstar Operations.
                      </Typography>
                    </div>
                    <StatusChip icon="check" tone="success">
                      Active
                    </StatusChip>
                  </div>
                  <Button
                    intent="quiet"
                    onClick={() => setModulePreview("setup")}
                    size="sm"
                  >
                    Preview setup state
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="q05-pattern-layout">
        <Card data-testid="q05-setup-checklist">
          <CardHeader>
            <CardTitle>Setup checklist</CardTitle>
            <CardDescription>
              Ordered requirements, progress, and the current requirement stay
              together.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MilestoneTracker
              items={setupChecklist}
              label="Inventory sync setup checklist"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Catalog anatomy</CardTitle>
            <CardDescription>
              Every capability keeps its state and next action visible before
              supporting detail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="q05-module-catalog-grid">
              {[
                {
                  description: "Compare inbound records.",
                  icon: "import" as const,
                  name: "Import review",
                  status: "Action required",
                  tone: "warning" as const,
                },
                {
                  description: "View a read-only activity stream.",
                  icon: "timeline" as const,
                  name: "Audit history",
                  status: "Available",
                  tone: "success" as const,
                },
                {
                  description: "Inspect connected resources.",
                  icon: "warehouse" as const,
                  name: "Resource view",
                  status: "Read-only",
                  tone: "info" as const,
                },
              ].map((module) => (
                <div className="q05-module-catalog-item" key={module.name}>
                  <span aria-hidden="true" className="q05-module-catalog-icon">
                    <T7Icon name={module.icon} size={18} />
                  </span>
                  <div>
                    <Typography as="h3" typeRole="label">
                      {module.name}
                    </Typography>
                    <Typography typeRole="caption">
                      {module.description}
                    </Typography>
                  </div>
                  <StatusChip tone={module.tone}>{module.status}</StatusChip>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ActivationView() {
  const [fixtureMessage, setFixtureMessage] = useState(
    "No consumer action has been invoked.",
  );

  return (
    <div className="q05-pattern-view" data-testid="q05-activation-view">
      <PatternViewHeader
        description="Progress and lifecycle states are supplied facts. The fixture demonstrates presentation only and never starts or resumes work."
        icon="progress"
        title="Activation and lifecycle states"
      />
      <div className="q05-pattern-layout">
        <Card data-testid="q05-activation-progress">
          <CardHeader>
            <CardTitle>Module activation progress</CardTitle>
            <CardDescription>
              Use ordered checkpoints with an explicit reported percentage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MilestoneTracker
              items={activationMilestones}
              label="Module activation checkpoints"
            />
            <Progress
              label="Reported activation progress"
              showValue
              value={68}
            />
          </CardContent>
        </Card>
        <Card data-testid="q05-suspended-module">
          <CardHeader>
            <CardTitle>Suspended module</CardTitle>
            <CardDescription>
              A lifecycle explanation remains visible with safe consumer-owned
              actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModuleState
              action={
                <Button
                  onClick={() =>
                    setFixtureMessage("Support handoff selected in fixture.")
                  }
                  size="sm"
                >
                  Open support handoff
                </Button>
              }
              description="The platform supplied a suspended state for this capability. Ten4Seven does not infer the reason or resume it."
              secondaryAction={
                <Button
                  intent="quiet"
                  onClick={() =>
                    setFixtureMessage("Details selected in fixture.")
                  }
                  size="sm"
                >
                  View details
                </Button>
              }
              state="suspended"
              title="Delivery workspace is suspended"
            />
            <output className="q05-fixture-output" role="status">
              {fixtureMessage}
            </output>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AccessView() {
  const [selectedResources, setSelectedResources] = useState(["region-north"]);

  return (
    <div className="q05-pattern-view" data-testid="q05-access-view">
      <PatternViewHeader
        description="The consumer supplies the denial, scope, and role outcomes. The UI system explains them without evaluating access."
        icon="lock"
        title="Permission and resource scope"
      />
      <div className="q05-state-grid">
        <ModuleState
          action={
            <Button onClick={() => undefined} size="sm">
              Request access
            </Button>
          }
          data-testid="q05-permission-denied"
          description="The consumer supplied a permission-denied result for this capability."
          state="permission-denied"
          title="You cannot configure this capability"
        />
        <ModuleState
          data-testid="q05-out-of-scope"
          description="The selected resource is outside the current context supplied by the consumer."
          state="out-of-scope"
          title="Resource is out of scope"
        />
      </div>
      <div className="q05-pattern-layout">
        <Card data-testid="q05-resource-scope">
          <CardHeader>
            <CardTitle>Resource-scope presentation</CardTitle>
            <CardDescription>
              Disabled nodes and selected ancestry are visible without hiding
              the scope context.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HierarchyPicker
              description="The selected region is a static fixture value."
              items={resourceItems}
              label="Current resource scope"
              onSelectionChange={setSelectedResources}
              selectedIds={selectedResources}
            />
          </CardContent>
        </Card>
        <Card data-testid="q05-permission-matrix">
          <CardHeader>
            <CardTitle>Role / capability matrix</CardTitle>
            <CardDescription>
              Comparable outcomes use a labelled table; editing policy stays
              with the consumer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              caption="Role and capability matrix"
              columns={permissionColumns}
              responsive="stacked"
              rowKey={(row) => row.id}
              rows={permissionRows}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TraceView() {
  return (
    <div className="q05-pattern-view" data-testid="q05-trace-view">
      <PatternViewHeader
        description="Audit, import, and reconciliation are separate consumer concepts that share a structured trace language."
        icon="timeline"
        title="Trace and exception review"
      />
      <div className="q05-trace-grid">
        <Card data-testid="q05-activity-audit">
          <CardHeader>
            <CardTitle>Activity / audit timeline</CardTitle>
            <CardDescription>
              Ordered actor, action, object, and timestamp facts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              items={[
                {
                  actor: "Jordan Park",
                  description: "Reviewed the source mapping exception.",
                  icon: "view",
                  id: "activity-1",
                  meta: "Sep 11 · 09:42",
                  title: "Mapping review opened",
                },
                {
                  actor: "Import service",
                  description:
                    "Reported 2 unresolved rows in the fixture batch.",
                  icon: "warning",
                  id: "activity-2",
                  meta: "Sep 11 · 09:36",
                  title: "Import requires review",
                },
                {
                  actor: "Maya Chen",
                  description: "Selected North region for the current context.",
                  icon: "users",
                  id: "activity-3",
                  meta: "Sep 11 · 09:18",
                  title: "Resource context changed",
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card data-testid="q05-import-exception-review">
          <CardHeader>
            <CardTitle>Import progress and exceptions</CardTitle>
            <CardDescription>
              Progress stays above the row-level reasons and review state.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".csv,.xlsx"
              disabled
              label="Source file"
              onFilesChange={() => undefined}
            >
              Fixture input is supplied by the consumer; upload is disabled in
              this reference route.
            </FileUpload>
            <Progress label="Import completion" showValue value={72} />
            <Alert
              description="2 of 18 rows need a consumer-owned review action."
              title="Review required"
              tone="warning"
            />
            <DataTable
              caption="Import exception review"
              columns={importColumns}
              responsive="stacked"
              rowKey={(row) => row.id}
              rows={importRows}
            />
          </CardContent>
        </Card>
        <Card
          className="q05-trace-wide"
          data-testid="q05-mapping-reconciliation"
        >
          <CardHeader>
            <CardTitle>Mapping and reconciliation status</CardTitle>
            <CardDescription>
              Source, target, matching outcome, and unresolved reason remain
              explicit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress label="Mapping completion" showValue value={84} />
            <DataTable
              caption="Mapping and reconciliation status"
              columns={reconciliationColumns}
              responsive="stacked"
              rowKey={(row) => row.id}
              rows={reconciliationRows}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export interface SaasControlPlaneReferenceProps {
  onNavigatePath?: (path: string) => void;
  onOpenSettings?: () => void;
}

export function SaasControlPlaneReference({
  onNavigatePath,
  onOpenSettings,
}: SaasControlPlaneReferenceProps) {
  const [activeView, setActiveView] = useState<ControlPlaneView>("context");
  const navigatePath = onNavigatePath ?? (() => undefined);

  const sidebar = (
    <PlaygroundSidebar
      activePath="/saas-control-plane"
      localNavigation={[
        {
          key: "saas-control-plane",
          label: "Control plane",
          items: controlPlaneViews.map((view) => ({
            active: view.key === activeView,
            icon: view.icon,
            key: view.key,
            label: view.label,
            onSelect: () => setActiveView(view.key),
          })),
        },
      ]}
      footer={
        <Typography typeRole="caption">
          Reference fixture · no SaaS authority
        </Typography>
      }
      label="SaaS control-plane reference navigation"
      onNavigatePath={navigatePath}
    />
  );

  return (
    <AppShell
      className="reference-app-shell q05-control-plane-shell"
      contentWidth="wide"
      data-shell-contract="reference-shell"
      data-shell-variant="contextual"
      navigationLabel="SaaS control-plane reference navigation"
      sidebar={sidebar}
      stickyHeader
      topbar={
        <PlaygroundTopbar
          activeRoute="SaaS Control Plane"
          breadcrumbItems={[{ label: "SaaS Control Plane" }]}
          onNavigatePath={navigatePath}
          onOpenSettings={onOpenSettings}
          settingsLabel="Open reference theme settings"
          showBack={Boolean(onNavigatePath)}
        />
      }
    >
      <div
        className="reference-page q05-control-plane"
        data-view={activeView}
        data-profile="enterprise"
      >
        <PageHeader
          actions={
            <Button
              intent="secondary"
              leadingIcon="settings"
              onClick={onOpenSettings}
              size="sm"
            >
              Theme settings
            </Button>
          }
          description="A bounded reference fixture for context switching, module lifecycle, access scope, audit trace, import review, and reconciliation presentation. All values and decisions are static consumer inputs."
          meta={
            <>
              <FixtureBadge />
              <Typography typeRole="caption">
                Ten4Seven owns presentation; the consumer owns authority.
              </Typography>
            </>
          }
          overline="Q05 · shared control-plane composition"
          title="SaaS control-plane patterns"
        />

        {activeView === "context" ? <ContextView /> : null}
        {activeView === "module-catalog" ? <ModuleCatalogView /> : null}
        {activeView === "activation" ? <ActivationView /> : null}
        {activeView === "access" ? <AccessView /> : null}
        {activeView === "trace" ? <TraceView /> : null}
      </div>
    </AppShell>
  );
}
