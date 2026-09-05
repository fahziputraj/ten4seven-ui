import { useState, type FormEvent, type ReactNode } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  ActionFooter,
  ActivityFeed,
  Alert,
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
  IconButton,
  KeyValueList,
  KPICluster,
  MetricCard,
  MilestoneTracker,
  PageHeader,
  Progress,
  Radio,
  RadioGroup,
  RecordSummary,
  Sidebar,
  Sparkline,
  StatusChip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Typography,
  type DataTableColumn,
  type StatusTone,
} from "@ten4seven/ui";

type OperationalView =
  "tower" | "process" | "load-route" | "receiving" | "entity";

type ExceptionRecord = {
  age: string;
  id: string;
  nextAction: string;
  object: string;
  owner: string;
  severity: "Critical" | "High" | "Medium";
  state: string;
};

const operationalViews: Array<{
  description: string;
  icon: IconName;
  key: OperationalView;
  label: string;
  overline: string;
  title: string;
}> = [
  {
    description:
      "Prioritize exceptions, forecast resource pressure, and expose accountable next actions without hiding the operating context.",
    icon: "analytics",
    key: "tower",
    label: "Control tower",
    overline: "Control Tower · Exception Queue · Resource Forecast",
    title: "Today’s operational priorities",
  },
  {
    description:
      "Follow one order from approval to delivery while many active objects remain visible in a bounded operational board.",
    icon: "timeline",
    key: "process",
    label: "Process workspace",
    overline: "Process Workspace · Operational Kanban · Activity Stream",
    title: "Order execution workspace",
  },
  {
    description:
      "Make capacity, allocation, remaining load, utilization, manifest, and ordered route stops explicit before dispatch.",
    icon: "logistics",
    key: "load-route",
    label: "Load & route",
    overline: "Load Planner · Route Planner",
    title: "Dispatch planning",
  },
  {
    description:
      "Separate physical arrival from completed receipt, reconcile quantities, and capture the operator decision with evidence.",
    icon: "warehouse",
    key: "receiving",
    label: "Receiving",
    overline: "Receiving Console · Decision Workspace",
    title: "Inbound receiving console",
  },
  {
    description:
      "Bring relationship context, current work, exceptions, decisions, ownership, and an auditable activity trail into one entity view.",
    icon: "users",
    key: "entity",
    label: "Entity 360",
    overline: "Entity 360 · Decision Workspace · Activity Stream",
    title: "Supplier relationship 360",
  },
];

const exceptionRecords: ExceptionRecord[] = [
  {
    age: "46 min",
    id: "EX-260903-07",
    nextAction: "Approve alternate supplier before 10:30",
    object: "Feed stock · Warehouse 02",
    owner: "Procurement Lead",
    severity: "Critical",
    state: "4.6 days of cover",
  },
  {
    age: "28 min",
    id: "EX-260903-11",
    nextAction: "Confirm revised ETA with customer",
    object: "Route RT-18 · East corridor",
    owner: "Dispatch Coordinator",
    severity: "High",
    state: "Stop 3 delayed 52 min",
  },
  {
    age: "12 min",
    id: "EX-260903-14",
    nextAction: "Recount damaged receiving units",
    object: "Receipt RC-3841 · Feed premix",
    owner: "Warehouse QA",
    severity: "Medium",
    state: "3 units quarantined",
  },
];

const processMilestones = [
  {
    description: "Credit and commercial terms accepted.",
    id: "approved",
    label: "Finance approved",
    percentage: 100,
    status: "complete" as const,
  },
  {
    description: "Inventory committed to this order.",
    id: "allocated",
    label: "Allocated",
    percentage: 100,
    status: "complete" as const,
  },
  {
    description: "Warehouse is assembling the dispatch manifest.",
    id: "loading",
    label: "Loading",
    percentage: 62,
    status: "current" as const,
  },
  {
    description: "Dispatch release follows loading confirmation.",
    id: "ready",
    label: "Ready",
    percentage: 0,
    status: "upcoming" as const,
  },
  {
    description: "Vehicle departs the assigned warehouse.",
    id: "dispatched",
    label: "Dispatched",
    percentage: 0,
    status: "upcoming" as const,
  },
  {
    description: "Proof of delivery closes the movement.",
    id: "delivered",
    label: "Delivered",
    percentage: 0,
    status: "upcoming" as const,
  },
];

const receivingMilestones = [
  {
    description: "Vehicle checked in at Gate 2 at 14:02.",
    id: "arrived",
    label: "Arrived",
    percentage: 100,
    status: "complete" as const,
  },
  {
    description: "Physical unloading and count are still in progress.",
    id: "unloading",
    label: "Unloading",
    percentage: 68,
    status: "current" as const,
  },
  {
    description: "Quality checks begin after physical count.",
    id: "quality",
    label: "Quality check",
    percentage: 0,
    status: "upcoming" as const,
  },
  {
    description: "Receipt is posted only after quantity reconciliation.",
    id: "received",
    label: "Received",
    percentage: 0,
    status: "upcoming" as const,
  },
  {
    description: "Accepted stock becomes available inventory.",
    id: "inventory",
    label: "Inventory posted",
    percentage: 0,
    status: "upcoming" as const,
  },
];

const kanbanColumns = [
  {
    id: "approved",
    label: "Approved",
    items: [
      ["SO-260903-022", "PT Berkah Pangan", "Assign warehouse"],
      ["SO-260903-024", "CV Karya Ternak", "Reserve inventory"],
    ],
  },
  {
    id: "loading",
    label: "Loading",
    items: [
      ["SO-260903-018", "PT Sinar Pangan", "Complete loading"],
      ["SO-260903-019", "Koperasi Maju", "Resolve short pick"],
    ],
  },
  {
    id: "ready",
    label: "Ready",
    items: [["SO-260903-015", "UD Kencana", "Release dispatch"]],
  },
  {
    id: "dispatched",
    label: "Dispatched",
    items: [["SO-260903-012", "PT Lintas Agro", "Capture proof"]],
  },
] as const;

const manifestRows = [
  { item: "Layer feed premium", order: "SO-260903-018", quantity: "4,200 kg" },
  { item: "Broiler starter", order: "SO-260903-019", quantity: "2,100 kg" },
  { item: "Mineral premix", order: "SO-260903-021", quantity: "1,000 kg" },
];

const routeStops = [
  {
    eta: "07:45",
    id: "warehouse",
    label: "Warehouse 02",
    meta: "Departed · 7,300 kg",
    state: "complete" as const,
  },
  {
    eta: "09:10",
    id: "sinar",
    label: "PT Sinar Pangan",
    meta: "Current · unload 4,200 kg",
    state: "current" as const,
  },
  {
    eta: "11:35",
    id: "koperasi",
    label: "Koperasi Maju",
    meta: "Next · unload 2,100 kg",
    state: "upcoming" as const,
  },
  {
    eta: "13:20",
    id: "kencana",
    label: "UD Kencana",
    meta: "Future · unload 1,000 kg",
    state: "upcoming" as const,
  },
] as const;

function ReferenceBrand() {
  return (
    <div className="reference-brand">
      <span className="reference-brand-mark">
        <T7Icon name="analytics" size={18} />
      </span>
      <div>
        <Typography as="strong" typeRole="card-title">
          ten4seven UI
        </Typography>
        <Typography as="span" typeRole="caption">
          AAPM adoption fixture
        </Typography>
      </div>
    </div>
  );
}

function OperationalTopbar({
  children,
  context,
  icon,
}: {
  children?: ReactNode;
  context: string;
  icon: IconName;
}) {
  return (
    <div className="reference-topbar">
      <div className="reference-topbar-context">
        <span aria-hidden="true" className="reference-topbar-context-icon">
          <T7Icon name={icon} size={17} />
        </span>
        <div>
          <Typography typeRole="label">{context}</Typography>
          <Typography typeRole="caption">
            Deterministic reference data · not production ERP
          </Typography>
        </div>
      </div>
      <div className="reference-topbar-actions t7-header-actions">
        {children}
      </div>
    </div>
  );
}

function SectionHeading({
  badge,
  description,
  id,
  title,
}: {
  badge?: ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <div className="reference-section-bar">
      <div>
        <Typography as="h2" id={id} typeRole="heading-lg">
          {title}
        </Typography>
        <Typography typeRole="body-sm">{description}</Typography>
      </div>
      {badge}
    </div>
  );
}

function severityTone(severity: ExceptionRecord["severity"]): StatusTone {
  if (severity === "Critical") return "danger";
  if (severity === "High") return "warning";
  return "info";
}

function ControlTower({
  onSelectException,
}: {
  onSelectException: (record: ExceptionRecord) => void;
}) {
  const columns: DataTableColumn<ExceptionRecord>[] = [
    {
      header: "Exception",
      key: "object",
      required: true,
      render: (record) => (
        <div className="operational-table-primary">
          <Typography typeRole="label">{record.id}</Typography>
          <Typography typeRole="body-sm">{record.object}</Typography>
        </div>
      ),
    },
    {
      header: "State",
      key: "state",
      render: (record) => (
        <div className="operational-table-primary">
          <StatusChip tone={severityTone(record.severity)}>
            {record.severity}
          </StatusChip>
          <Typography typeRole="caption">{record.state}</Typography>
        </div>
      ),
    },
    { header: "Age", key: "age" },
    { header: "Owner", key: "owner" },
    { header: "Next action", key: "nextAction", required: true },
    {
      align: "right",
      header: "Open",
      key: "open",
      render: (record) => (
        <Button
          aria-label={`Open ${record.id}`}
          intent="quiet"
          leadingIcon="view"
          onClick={(event) => {
            event.stopPropagation();
            onSelectException(record);
          }}
          size="sm"
        >
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="operational-workspace" data-testid="control-tower-view">
      <Alert
        description="Feed cover is projected to cross the 5-day threshold before the next confirmed inbound load. Procurement Lead owns the decision due at 10:30."
        title="Priority signal · Warehouse 02"
        tone="warning"
      />
      <KPICluster
        items={[
          {
            icon: "inventory",
            label: "Feed cover",
            note: "Threshold · 5.0 days",
            tone: "warning",
            value: "4.6 days",
          },
          {
            icon: "delivery",
            label: "Deliveries active",
            note: "1 route delayed",
            value: "8",
          },
          {
            icon: "fleet",
            label: "Fleet utilized",
            note: "3 vehicles available",
            value: "81%",
          },
          {
            icon: "approve",
            label: "Decisions due",
            note: "2 before noon",
            tone: "warning",
            value: "4",
          },
        ]}
        label="Control tower summary"
      />

      <div className="operational-priority-grid">
        <Card className="operational-forecast-card">
          <CardHeader>
            <div>
              <CardTitle>Resource forecast</CardTitle>
              <CardDescription>
                Feed stock at Warehouse 02 · planning signal, not an ordering
                algorithm.
              </CardDescription>
            </div>
            <StatusChip icon="warning" tone="warning">
              Attention
            </StatusChip>
          </CardHeader>
          <CardContent>
            <div className="operational-forecast-signal">
              <div>
                <Typography typeRole="overline">Time to empty</Typography>
                <Typography as="strong" data-numeric typeRole="metric-lg">
                  4.6 days
                </Typography>
                <Typography typeRole="caption">
                  Based on 10.2 t current stock and 2.2 t/day usage
                </Typography>
              </div>
              <Sparkline
                label="Seven-day feed stock projection"
                values={[18.4, 16.1, 14.3, 12.1, 10.2, 8.0, 5.8]}
              />
            </div>
            <Progress
              label="Stock remaining before threshold"
              max={10}
              showValue
              value={4.6}
            />
            <KeyValueList
              items={[
                { label: "Current", value: "10.2 t" },
                { label: "Daily usage", value: "2.2 t/day" },
                { label: "Incoming", value: "8.0 t · tomorrow 16:00" },
                { label: "Owner", value: "Procurement Lead" },
                { label: "Next action", value: "Approve alternate supplier" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Decision horizon</CardTitle>
              <CardDescription>
                Exceptions ordered by consequence and accountable time window.
              </CardDescription>
            </div>
            <T7Icon aria-hidden="true" name="clock" size={20} />
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                { label: "Now", value: "Feed stock approval · 10:30" },
                { label: "Next", value: "Route ETA confirmation · 11:00" },
                { label: "Later", value: "Receiving recount · 15:15" },
                { label: "Escalation owner", value: "Operations Manager" },
              ]}
            />
            <Alert
              description="No automatic decision is made by this fixture. The operator retains approval authority."
              title="Human decision boundary"
              tone="info"
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="exception-queue-title"
        className="reference-data-section"
      >
        <SectionHeading
          badge={
            <Badge tone="warning">
              <T7Icon name="warning" size={13} />3 open
            </Badge>
          }
          description="Every exception preserves the affected object, current state, age, owner, and concrete next action."
          id="exception-queue-title"
          title="Exception queue"
        />
        <DataTable
          caption="Operational exception queue"
          columns={columns}
          onRowClick={onSelectException}
          responsive="stacked"
          rowKey={(record) => record.id}
          rows={exceptionRecords}
        />
      </section>
    </div>
  );
}

function ProcessWorkspace() {
  return (
    <div className="operational-workspace" data-testid="process-workspace-view">
      <RecordSummary
        description="7,300 kg mixed feed order · delivery window Sep 3, 09:00–14:00"
        eyebrow="Sales order"
        metadata={
          <>
            <StatusChip icon="pending" tone="info">
              Loading
            </StatusChip>
            <Typography typeRole="caption">Customer priority · High</Typography>
          </>
        }
        title="SO-260903-018 · PT Sinar Pangan"
      />

      <section
        aria-label="Current state and accountable next action"
        className="operational-current-next"
      >
        <div>
          <Typography typeRole="overline">Current state</Typography>
          <Typography as="strong" typeRole="heading-sm">
            Loading · 62% complete
          </Typography>
          <Typography typeRole="caption">
            4,520 of 7,300 kg scanned to vehicle BA 8123 XX
          </Typography>
        </div>
        <div>
          <Typography typeRole="overline">Owner</Typography>
          <Typography as="strong" typeRole="heading-sm">
            Warehouse Team 02
          </Typography>
          <Typography typeRole="caption">Shift lead · Ardi Saputra</Typography>
        </div>
        <div>
          <Typography typeRole="overline">Next action</Typography>
          <Typography as="strong" typeRole="heading-sm">
            Complete loading
          </Typography>
          <Typography typeRole="caption">Due today · 10:20</Typography>
        </div>
      </section>

      <section
        aria-labelledby="process-milestone-title"
        className="operations-milestone-section"
      >
        <SectionHeading
          badge={
            <Badge tone="primary">
              <T7Icon name="timeline" size={13} />6 states
            </Badge>
          }
          description="The selected milestone exposes state and movement; completion is never inferred from a color alone."
          id="process-milestone-title"
          title="Process movement"
        />
        <MilestoneTracker
          items={processMilestones}
          label="Sales order process milestones"
        />
      </section>

      <section aria-labelledby="kanban-title">
        <SectionHeading
          badge={<Badge tone="neutral">6 active orders</Badge>}
          description="A finite operational board for many work objects—not a generic sticky-note canvas."
          id="kanban-title"
          title="Operational Kanban"
        />
        <div className="operational-kanban" role="list">
          {kanbanColumns.map((column) => (
            <section
              aria-labelledby={`kanban-${column.id}`}
              className="operational-kanban-column"
              key={column.id}
            >
              <div className="operational-kanban-heading">
                <Typography
                  as="h3"
                  id={`kanban-${column.id}`}
                  typeRole="heading-sm"
                >
                  {column.label}
                </Typography>
                <Badge tone="neutral">{column.items.length}</Badge>
              </div>
              <div className="operational-kanban-items">
                {column.items.map(([id, customer, nextAction]) => (
                  <Card
                    className="operational-kanban-card"
                    key={id}
                    role="listitem"
                  >
                    <CardContent>
                      <Typography typeRole="overline">{id}</Typography>
                      <Typography as="strong" typeRole="label">
                        {customer}
                      </Typography>
                      <Typography typeRole="caption">
                        Next · {nextAction}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Activity and audit stream</CardTitle>
            <CardDescription>
              Human-readable events retain actor, timestamp, action, and object.
            </CardDescription>
          </div>
          <T7Icon aria-hidden="true" name="timeline" size={20} />
        </CardHeader>
        <CardContent>
          <ActivityFeed
            items={[
              {
                actor: "Ardi Saputra · Warehouse Team 02",
                description: "2,100 kg Broiler starter scanned to BA 8123 XX.",
                icon: "package",
                id: "activity-1",
                meta: "Sep 3 · 09:41",
                title: "Loading quantity updated",
              },
              {
                actor: "Siti Rahma · Finance",
                description: "Credit exposure and commercial terms accepted.",
                icon: "approve",
                id: "activity-2",
                meta: "Sep 3 · 08:32",
                title: "Order approved",
              },
              {
                actor: "System trace · inventory allocation",
                description: "7,300 kg reserved across three manifest lines.",
                icon: "inventory",
                id: "activity-3",
                meta: "Sep 3 · 08:36",
                title: "Inventory allocation recorded",
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function LoadAndRoutePlanner() {
  return (
    <div className="operational-workspace" data-testid="load-route-view">
      <Alert
        description="Capacity is a planning constraint. Dispatch remains blocked if allocated weight exceeds the vehicle’s verified capacity."
        title="Vehicle BA 8123 XX · capacity verified"
        tone="info"
      />
      <div className="operational-load-grid">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Load planner</CardTitle>
              <CardDescription>
                Vehicle BA 8123 XX · Wingbox · Warehouse 02
              </CardDescription>
            </div>
            <StatusChip icon="success" tone="success">
              Within capacity
            </StatusChip>
          </CardHeader>
          <CardContent>
            <div className="operational-capacity-grid">
              <MetricCard title="Capacity" value="9,000 kg" />
              <MetricCard title="Allocated" value="7,300 kg" />
              <MetricCard title="Remaining" value="1,700 kg" />
            </div>
            <Progress label="Vehicle utilization" showValue value={81} />
            <KeyValueList
              items={[
                { label: "Owner", value: "Dispatch Coordinator" },
                { label: "Current state", value: "Manifest ready" },
                { label: "Next action", value: "Release dispatch at 07:30" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Route planner</CardTitle>
              <CardDescription>
                RT-18 · four ordered stops · 84 km planned
              </CardDescription>
            </div>
            <StatusChip icon="delivery" tone="info">
              Stop 2 current
            </StatusChip>
          </CardHeader>
          <CardContent>
            <ol
              aria-label="Ordered delivery route"
              className="operational-route-list"
            >
              {routeStops.map((stop, index) => (
                <li
                  aria-current={stop.state === "current" ? "step" : undefined}
                  data-state={stop.state}
                  key={stop.id}
                >
                  <span className="operational-route-marker">
                    <T7Icon
                      aria-hidden="true"
                      name={
                        stop.state === "complete"
                          ? "check"
                          : stop.state === "current"
                            ? "delivery"
                            : "clock"
                      }
                      size={16}
                    />
                  </span>
                  <div>
                    <Typography typeRole="overline">
                      Stop {index + 1} · ETA {stop.eta}
                    </Typography>
                    <Typography as="strong" typeRole="label">
                      {stop.label}
                    </Typography>
                    <Typography typeRole="caption">{stop.meta}</Typography>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="manifest-title">
        <SectionHeading
          badge={<Badge tone="neutral">3 manifest lines</Badge>}
          description="The manifest is the traceable allocation source for capacity and stop quantities."
          id="manifest-title"
          title="Load manifest"
        />
        <Table aria-label="Vehicle load manifest">
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manifestRows.map((row) => (
              <TableRow key={row.order}>
                <TableCell>{row.order}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}

function ReceivingConsole() {
  const [decision, setDecision] = useState("accept");
  const [reason, setReason] = useState("");
  const [decisionNotice, setDecisionNotice] = useState("");

  function submitDecision(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDecisionNotice(
      `${decision === "accept" ? "Accept 373 units" : decision === "quarantine" ? "Quarantine variance" : "Request recount"} recorded in this local fixture.`,
    );
  }

  return (
    <div className="operational-workspace" data-testid="receiving-view">
      <Alert
        description="Vehicle check-in confirms physical presence only. Receipt RC-3841 remains in Unloading until count, quality, and reconciliation are complete."
        title="ARRIVED ≠ RECEIVED"
        tone="warning"
      />

      <RecordSummary
        description="Feed premix · PO-260827-044 · vehicle BA 9451 QA"
        eyebrow="Inbound receipt"
        metadata={
          <>
            <StatusChip icon="delivery" tone="success">
              Arrived · 14:02
            </StatusChip>
            <StatusChip icon="pending" tone="info">
              Current · Unloading
            </StatusChip>
            <StatusChip icon="clock" tone="neutral">
              Received · Not yet
            </StatusChip>
          </>
        }
        title="RC-3841 · PT Tani Makmur"
      />

      <section
        aria-labelledby="receiving-milestone-title"
        className="operations-milestone-section"
      >
        <SectionHeading
          description="Arrival, unload, quality, receipt, and inventory posting remain separate auditable states."
          id="receiving-milestone-title"
          title="Receiving movement"
        />
        <MilestoneTracker
          items={receivingMilestones}
          label="Receiving process milestones"
        />
      </section>

      <section aria-labelledby="quantity-reconciliation-title">
        <SectionHeading
          badge={
            <Badge tone="warning">
              <T7Icon name="warning" size={13} />3 unit variance
            </Badge>
          }
          description="Ordered, delivered, physical, accepted, damaged, and remaining quantities are distinct facts."
          id="quantity-reconciliation-title"
          title="Quantity reconciliation"
        />
        <div className="operational-quantity-grid">
          <MetricCard title="Ordered" value="400 units" />
          <MetricCard title="Delivered" value="400 units" />
          <MetricCard title="Physical count" value="376 units" />
          <MetricCard title="Accepted" tone="success" value="373 units" />
          <MetricCard title="Damaged" tone="warning" value="3 units" />
          <MetricCard title="Remaining to count" value="24 units" />
        </div>
      </section>

      <Card className="operational-decision-card">
        <CardHeader>
          <div>
            <CardTitle>Decision workspace</CardTitle>
            <CardDescription>
              Review evidence, choose one bounded disposition, state the reason,
              and retain the owner and next action.
            </CardDescription>
          </div>
          <StatusChip icon="approve" tone="warning">
            Decision required
          </StatusChip>
        </CardHeader>
        <CardContent>
          <div className="operational-decision-layout">
            <div>
              <Typography typeRole="overline">Evidence</Typography>
              <KeyValueList
                items={[
                  { label: "Seal", value: "Intact · verified 14:06" },
                  { label: "Physical count", value: "376 units" },
                  { label: "Damaged", value: "3 crushed bags" },
                  { label: "Owner", value: "Nadia Putri · Warehouse QA" },
                  { label: "Due", value: "Today · 15:15" },
                ]}
              />
            </div>
            <form onSubmit={submitDecision}>
              <RadioGroup
                description="Only the selected outcome is recorded by this reference fixture."
                legend="Disposition"
              >
                <Radio
                  checked={decision === "accept"}
                  description="Post 373 accepted units; quarantine 3 damaged units."
                  label="Accept reconciled quantity"
                  name="receiving-decision"
                  onChange={() => setDecision("accept")}
                  value="accept"
                />
                <Radio
                  checked={decision === "quarantine"}
                  description="Hold the complete physical count for QA review."
                  label="Quarantine variance"
                  name="receiving-decision"
                  onChange={() => setDecision("quarantine")}
                  value="quarantine"
                />
                <Radio
                  checked={decision === "recount"}
                  description="Keep receipt open and request a second physical count."
                  label="Request recount"
                  name="receiving-decision"
                  onChange={() => setDecision("recount")}
                  value="recount"
                />
              </RadioGroup>
              <Textarea
                hint="Fixture-only note; no production record is changed."
                label="Decision reason"
                onChange={(event) => setReason(event.target.value)}
                placeholder="State the evidence and operational reason…"
                value={reason}
              />
              <ActionFooter
                primaryAction={
                  <Button leadingIcon="approve" type="submit">
                    Record decision
                  </Button>
                }
                summary={
                  <Typography typeRole="caption">
                    Next action · post receipt or continue investigation
                  </Typography>
                }
              />
            </form>
          </div>
          {decisionNotice ? (
            <Alert
              description="No API or production inventory was changed."
              onDismiss={() => setDecisionNotice("")}
              title={decisionNotice}
              tone="success"
            />
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function EntityWorkspace({ onOpenDecision }: { onOpenDecision: () => void }) {
  return (
    <div className="operational-workspace" data-testid="entity-view">
      <RecordSummary
        actions={
          <Button leadingIcon="approve" onClick={onOpenDecision}>
            Review decision
          </Button>
        }
        description="Strategic feed supplier · West Sumatra · active since 2021"
        eyebrow="Supplier entity"
        metadata={
          <>
            <StatusChip icon="success" tone="success">
              Approved supplier
            </StatusChip>
            <Typography typeRole="caption">
              Relationship owner · Dimas Pratama
            </Typography>
          </>
        }
        title="PT Tani Makmur"
      />

      <KPICluster
        items={[
          {
            icon: "package",
            label: "Open purchase orders",
            note: "2 due this week",
            value: "5",
          },
          {
            icon: "success",
            label: "On-time delivery",
            note: "Rolling 90 days",
            value: "94%",
          },
          {
            icon: "warning",
            label: "Open exceptions",
            note: "1 receiving variance",
            tone: "warning",
            value: "2",
          },
          {
            icon: "approve",
            label: "Decisions pending",
            note: "Quality disposition",
            tone: "warning",
            value: "1",
          },
        ]}
        label="Supplier relationship summary"
      />

      <div className="operational-entity-grid">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Current work</CardTitle>
              <CardDescription>
                Active objects remain connected to ownership and next actions.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                {
                  label: "RC-3841 · Unloading",
                  value: "Warehouse QA · reconcile count",
                },
                {
                  label: "PO-260901-008 · Confirmed",
                  value: "Procurement · monitor Sep 5 ETA",
                },
                {
                  label: "QA-260829-03 · Review",
                  value: "Quality Lead · close moisture finding",
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Relationship signals</CardTitle>
              <CardDescription>
                Context supports a decision; it does not replace evidence.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Alert
              description="RC-3841 has a 3-unit damage variance and 24 units still to count."
              title="Receiving exception"
              tone="warning"
            />
            <KeyValueList
              items={[
                { label: "Quality trend", value: "Stable · 96.8% accepted" },
                { label: "Payment terms", value: "Net 30 · current" },
                { label: "Last review", value: "Aug 21 · approved" },
                { label: "Next review", value: "Sep 18 · Procurement Lead" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Entity activity and audit trail</CardTitle>
            <CardDescription>
              Cross-object trace ordered by time with actor and evidence source.
            </CardDescription>
          </div>
          <T7Icon aria-hidden="true" name="timeline" size={20} />
        </CardHeader>
        <CardContent>
          <ActivityFeed
            items={[
              {
                actor: "Nadia Putri · Warehouse QA",
                description: "Three damaged units isolated during RC-3841.",
                icon: "warning",
                id: "entity-activity-1",
                meta: "Sep 3 · 14:28",
                title: "Receiving variance recorded",
              },
              {
                actor: "Dimas Pratama · Procurement",
                description: "Sep 5 delivery ETA reconfirmed with supplier.",
                icon: "delivery",
                id: "entity-activity-2",
                meta: "Sep 3 · 11:16",
                title: "Purchase order follow-up",
              },
              {
                actor: "Rani Yusuf · Quality Lead",
                description: "Moisture finding retained for the Sep 18 review.",
                icon: "approve",
                id: "entity-activity-3",
                meta: "Aug 29 · 16:04",
                title: "Quality decision documented",
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function DecisionDrawerContent() {
  return (
    <div className="operational-drawer-stack">
      <Alert
        description="RC-3841 is still unloading; 24 units remain uncounted. A final supplier quality decision would be premature."
        title="Evidence is incomplete"
        tone="warning"
      />
      <RecordSummary
        description="Quality disposition for receiving variance RC-3841"
        eyebrow="Decision object"
        title="PT Tani Makmur"
      />
      <KeyValueList
        items={[
          { label: "Current state", value: "Awaiting physical count" },
          { label: "Exception", value: "3 damaged · 24 uncounted" },
          { label: "Owner", value: "Nadia Putri · Warehouse QA" },
          { label: "Next action", value: "Complete count by 15:15" },
          { label: "Trace", value: "RC-3841 · PO-260827-044" },
        ]}
      />
      <Typography as="p" typeRole="body-sm">
        The sustainable decision contract keeps evidence, available options,
        reason, accountable owner, and resulting next action together. This
        fixture deliberately does not execute supplier or inventory policy.
      </Typography>
    </div>
  );
}

export interface OperationalReferenceProps {
  onOpenSettings?: () => void;
}

export function OperationalReference({
  onOpenSettings,
}: OperationalReferenceProps) {
  const [activeView, setActiveView] = useState<OperationalView>("tower");
  const [selectedException, setSelectedException] =
    useState<ExceptionRecord | null>(null);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const active =
    operationalViews.find((view) => view.key === activeView) ??
    operationalViews[0];

  const sidebar = (
    <Sidebar
      activeKey={activeView}
      brand={<ReferenceBrand />}
      footer={
        <Typography typeRole="caption">
          Reference fixture · no live AAPM data
        </Typography>
      }
      items={operationalViews.map((view) => ({
        icon: view.icon,
        key: view.key,
        label: view.label,
      }))}
      label="Operational pattern navigation"
      onSelect={(key) => setActiveView(key as OperationalView)}
    />
  );

  return (
    <AppShell
      className="reference-app-shell operations-app-shell operational-reference-shell"
      sidebar={sidebar}
      topbar={
        <OperationalTopbar
          context={`AAPM fixture / ${active.label}`}
          icon={active.icon}
        >
          <IconButton
            icon="settings"
            label="Open operational reference settings"
            onClick={onOpenSettings}
            size="md"
          />
        </OperationalTopbar>
      }
    >
      <div
        className="reference-page operations-reference operational-reference"
        data-profile="enterprise"
        data-view={activeView}
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
          description={active.description}
          meta={
            <>
              <Badge tone="primary">
                <T7Icon name={active.icon} size={13} />
                {active.label}
              </Badge>
              <Typography typeRole="caption">
                Updated Sep 3, 2026 · 09:45 · deterministic fixture
              </Typography>
            </>
          }
          overline={active.overline}
          title={active.title}
        />

        {activeView === "tower" ? (
          <ControlTower onSelectException={setSelectedException} />
        ) : activeView === "process" ? (
          <ProcessWorkspace />
        ) : activeView === "load-route" ? (
          <LoadAndRoutePlanner />
        ) : activeView === "receiving" ? (
          <ReceivingConsole />
        ) : (
          <EntityWorkspace onOpenDecision={() => setDecisionOpen(true)} />
        )}
      </div>

      <DetailDrawer
        description="State, consequence, ownership, next action, and trace for the selected exception."
        onClose={() => setSelectedException(null)}
        open={Boolean(selectedException)}
        title={selectedException ? selectedException.id : "Exception detail"}
      >
        {selectedException ? (
          <div className="operational-drawer-stack">
            <Alert
              description={selectedException.state}
              title={`${selectedException.severity} operational exception`}
              tone={severityTone(selectedException.severity)}
            />
            <RecordSummary
              description={selectedException.object}
              eyebrow="Affected object"
              title={selectedException.id}
            />
            <KeyValueList
              items={[
                { label: "State", value: selectedException.state },
                { label: "Age", value: selectedException.age },
                { label: "Owner", value: selectedException.owner },
                { label: "Next action", value: selectedException.nextAction },
                {
                  label: "Trace",
                  value: `${selectedException.id} · Sep 3, 2026`,
                },
              ]}
            />
          </div>
        ) : null}
      </DetailDrawer>

      <DetailDrawer
        description="Evidence-led supplier decision context; no production action is performed."
        onClose={() => setDecisionOpen(false)}
        open={decisionOpen}
        title="Supplier decision review"
      >
        <DecisionDrawerContent />
      </DetailDrawer>
    </AppShell>
  );
}
