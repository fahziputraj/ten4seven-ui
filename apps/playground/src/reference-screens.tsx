import { useEffect, useMemo, useState, type ReactNode } from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";
import {
  ActivityFeed,
  AppShell,
  Avatar,
  Badge,
  BulkActionBar,
  Button,
  CartLineItem,
  CartPanel,
  CartTrigger,
  Checkbox,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  DetailDrawer,
  EmptyState,
  FilterToolbar,
  Input,
  IconButton,
  KeyValueList,
  KPICluster,
  MilestoneTracker,
  PageHeader,
  Pagination,
  Popover,
  Price,
  ProductCard,
  ProductGrid,
  ProductMeta,
  Progress,
  PublicShell,
  Radio,
  Rating,
  SearchInput,
  Select,
  Sidebar,
  Sparkline,
  StatusChip,
  TrendIndicator,
  Typography,
  OrderSummary,
  RecordSummary,
  type DataTableColumn,
  type DataTableSort,
  type StatusTone,
} from "@ten4seven/ui";

function ReferenceBrand({
  icon,
  subtitle,
  title,
}: {
  icon: IconName;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="reference-brand">
      <span className="reference-brand-mark">
        <T7Icon name={icon} size={18} />
      </span>
      <div>
        <Typography as="strong" typeRole="card-title">
          {title}
        </Typography>
        <Typography as="span" typeRole="caption">
          {subtitle}
        </Typography>
      </div>
    </div>
  );
}

type WorkstreamStatus = "On track" | "Needs attention" | "Blocked" | "Waiting";
type WorkstreamType =
  "Customer" | "Delivery" | "Supply & QC" | "Finance" | "Fleet";

type OperationsRecord = {
  id: string;
  reference: string;
  subject: string;
  workType: WorkstreamType;
  icon: IconName;
  context: string;
  owner: string;
  ownerTeam: string;
  status: WorkstreamStatus;
  nextAction: string;
  dueDate: string;
  dueRank: number;
  lastActivity: string;
  lastActivityAt: string;
  activityRank: number;
  signal: string;
};

const workstreamTypes: WorkstreamType[] = [
  "Customer",
  "Delivery",
  "Supply & QC",
  "Finance",
  "Fleet",
];

const operationsRecords: OperationsRecord[] = [
  {
    id: "ops-2048",
    reference: "OPS-2048",
    subject: "CV Sinar Tani · feed delivery",
    workType: "Delivery",
    icon: "delivery",
    context: "Makassar → Farm 03",
    owner: "Femi Putri",
    ownerTeam: "Supply chain",
    status: "Needs attention",
    nextAction: "Confirm unload window",
    dueDate: "Today · 14:00",
    dueRank: 1,
    lastActivity: "Driver checked in 42 min ago",
    lastActivityAt: "Aug 26 · 09:12",
    activityRank: 8,
    signal: "72% loaded · 1 checkpoint left",
  },
  {
    id: "ops-2051",
    reference: "OPS-2051",
    subject: "PT Cipta Pakan · account follow-up",
    workType: "Customer",
    icon: "users",
    context: "Feed account · East Java",
    owner: "Rina Kartika",
    ownerTeam: "Account executive",
    status: "On track",
    nextAction: "Review next order",
    dueDate: "Aug 28",
    dueRank: 2,
    lastActivity: "Call note logged today",
    lastActivityAt: "Aug 26 · 08:48",
    activityRank: 7,
    signal: "Last purchase 7 days ago",
  },
  {
    id: "ops-2054",
    reference: "OPS-2054",
    subject: "Mardiati · payment receipt",
    workType: "Finance",
    icon: "payment",
    context: "Transfer · invoice AR-1088",
    owner: "Dona Sari",
    ownerTeam: "Treasury",
    status: "Waiting",
    nextAction: "Match receipt to invoice",
    dueDate: "Aug 28",
    dueRank: 3,
    lastActivity: "Bank transfer imported 1 hr ago",
    lastActivityAt: "Aug 26 · 08:04",
    activityRank: 6,
    signal: "Rp 18.400.000 received",
  },
  {
    id: "ops-2062",
    reference: "OPS-2062",
    subject: "Corn lot JG-882 · quality check",
    workType: "Supply & QC",
    icon: "package",
    context: "North dock → Farm 04",
    owner: "Payon Ibu",
    ownerTeam: "Quality control",
    status: "Blocked",
    nextAction: "Record QC decision",
    dueDate: "Today · 16:00",
    dueRank: 0,
    lastActivity: "Sample logged at receiving",
    lastActivityAt: "Aug 26 · 07:36",
    activityRank: 5,
    signal: "Memo required before routing",
  },
  {
    id: "ops-2068",
    reference: "OPS-2068",
    subject: "Truck B 9124 · brake inspection",
    workType: "Fleet",
    icon: "fleet",
    context: "Fleet · maintenance request",
    owner: "Ardi Pranoto",
    ownerTeam: "Fleet maintenance",
    status: "Needs attention",
    nextAction: "Approve service estimate",
    dueDate: "Aug 29",
    dueRank: 4,
    lastActivity: "Driver submitted inspection",
    lastActivityAt: "Aug 25 · 16:18",
    activityRank: 4,
    signal: "Estimated downtime · 2 days",
  },
  {
    id: "ops-2071",
    reference: "OPS-2071",
    subject: "Egg route 18 · pickup sequence",
    workType: "Delivery",
    icon: "timeline",
    context: "Farm 02 → customer route",
    owner: "Nadia Anindita",
    ownerTeam: "Dispatch",
    status: "On track",
    nextAction: "Confirm farm sequence",
    dueDate: "Aug 29",
    dueRank: 5,
    lastActivity: "Route draft shared with farms",
    lastActivityAt: "Aug 25 · 14:22",
    activityRank: 3,
    signal: "3 farms · 80% vehicle capacity",
  },
  {
    id: "ops-2076",
    reference: "OPS-2076",
    subject: "Budi Santoso · overdue balance",
    workType: "Customer",
    icon: "user",
    context: "Customer profile · payment follow-up",
    owner: "Dwi Prasetyo",
    ownerTeam: "Account executive",
    status: "Waiting",
    nextAction: "Send payment reminder",
    dueDate: "Aug 30",
    dueRank: 6,
    lastActivity: "Outstanding balance reviewed",
    lastActivityAt: "Aug 25 · 10:06",
    activityRank: 2,
    signal: "Open balance · Rp 6.800.000",
  },
  {
    id: "ops-2080",
    reference: "OPS-2080",
    subject: "OVK replenishment · purchase request",
    workType: "Supply & QC",
    icon: "stockIn",
    context: "South farm · safety stock",
    owner: "Femi Putri",
    ownerTeam: "Purchasing",
    status: "On track",
    nextAction: "Release purchase request",
    dueDate: "Sep 01",
    dueRank: 7,
    lastActivity: "Consumption trend updated",
    lastActivityAt: "Aug 24 · 16:40",
    activityRank: 1,
    signal: "12 days of cover remaining",
  },
];

const operationsMilestones = [
  {
    id: "capture",
    label: "Capture",
    icon: "analytics" as IconName,
    percentage: 100,
    status: "complete" as const,
    meta: "8 of 8 records",
    description: "Every active signal is represented in the shared work queue.",
    details: (
      <KeyValueList
        items={[
          {
            label: "Coverage",
            value: "Customer, delivery, supply, finance, fleet",
          },
          { label: "Local fixture", value: "8 operational records" },
          {
            label: "State",
            value: (
              <StatusChip icon="success" tone="success">
                Complete
              </StatusChip>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "triage",
    label: "Triage",
    icon: "filter" as IconName,
    percentage: 75,
    status: "current" as const,
    meta: "6 of 8 triaged",
    description:
      "Health and ownership are visible before the next action is assigned.",
    details: (
      <KeyValueList
        items={[
          { label: "Triaged", value: "6 workstreams" },
          { label: "Waiting", value: "2 workstreams" },
          {
            label: "State",
            value: (
              <StatusChip icon="timeline" tone="info">
                In review
              </StatusChip>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "action",
    label: "Next action",
    icon: "edit" as IconName,
    percentage: 63,
    status: "current" as const,
    meta: "5 of 8 action-ready",
    description:
      "The queue is ready to move workstreams with an accountable next step.",
    details: (
      <KeyValueList
        items={[
          { label: "Action-ready", value: "5 workstreams" },
          { label: "Needs attention", value: "2 workstreams" },
          {
            label: "State",
            value: (
              <StatusChip icon="warning" tone="warning">
                Prioritise
              </StatusChip>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "execution",
    label: "Execution",
    icon: "delivery" as IconName,
    percentage: 38,
    status: "blocked" as const,
    meta: "3 of 8 moving",
    description:
      "Delivery and service work can move once the blocked QC decision is recorded.",
    details: (
      <KeyValueList
        items={[
          { label: "Moving", value: "3 workstreams on track" },
          { label: "Blocker", value: "Corn lot JG-882 · QC decision" },
          {
            label: "State",
            value: (
              <StatusChip icon="danger" tone="danger">
                Blocked
              </StatusChip>
            ),
          },
        ]}
      />
    ),
  },
  {
    id: "follow-up",
    label: "Follow-up",
    icon: "timeline" as IconName,
    percentage: 25,
    status: "upcoming" as const,
    meta: "2 open reviews",
    description:
      "Close the loop with customer, payment, and service follow-up after execution.",
    details: (
      <KeyValueList
        items={[
          { label: "Open reviews", value: "2 workstreams" },
          {
            label: "Next signal",
            value: "Payment receipt and overdue balance",
          },
          {
            label: "State",
            value: (
              <StatusChip icon="clock" tone="neutral">
                Upcoming
              </StatusChip>
            ),
          },
        ]}
      />
    ),
  },
];

const workstreamStatusMeta: Record<
  WorkstreamStatus,
  { icon: IconName; tone: StatusTone }
> = {
  "On track": { icon: "success", tone: "success" },
  "Needs attention": { icon: "warning", tone: "warning" },
  Blocked: { icon: "danger", tone: "danger" },
  Waiting: { icon: "pending", tone: "neutral" },
};

const workstreamTypeMeta: Record<
  WorkstreamType,
  { icon: IconName; tone: StatusTone }
> = {
  Customer: { icon: "users", tone: "info" },
  Delivery: { icon: "delivery", tone: "info" },
  "Supply & QC": { icon: "package", tone: "neutral" },
  Finance: { icon: "payment", tone: "neutral" },
  Fleet: { icon: "fleet", tone: "neutral" },
};

function WorkstreamStatusChip({ status }: { status: WorkstreamStatus }) {
  const meta = workstreamStatusMeta[status];
  return (
    <StatusChip icon={meta.icon} tone={meta.tone}>
      {status}
    </StatusChip>
  );
}

function WorkstreamTypeChip({ workType }: { workType: WorkstreamType }) {
  const meta = workstreamTypeMeta[workType];
  return (
    <StatusChip icon={meta.icon} tone={meta.tone}>
      {workType}
    </StatusChip>
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
          <Typography typeRole="caption">Operations workspace</Typography>
        </div>
      </div>
      <div className="reference-topbar-actions t7-header-actions">
        {children}
      </div>
    </div>
  );
}

function OperationsDrawerContent({
  onAction,
  record,
  onClose,
}: {
  onAction: () => void;
  record: OperationsRecord;
  onClose: () => void;
}) {
  return (
    <div className="reference-drawer-stack operations-drawer-stack">
      <RecordSummary
        description={record.context}
        eyebrow={record.reference}
        media={
          <span className="operations-record-icon" aria-hidden="true">
            <T7Icon name={record.icon} size={22} />
          </span>
        }
        metadata={
          <>
            <WorkstreamTypeChip workType={record.workType} />
            <WorkstreamStatusChip status={record.status} />
          </>
        }
        title={record.subject}
      />

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Next action
        </Typography>
        <div className="operations-next-action">
          <span className="operations-next-action-icon" aria-hidden="true">
            <T7Icon name="calendar" size={17} />
          </span>
          <div>
            <Typography typeRole="label">{record.nextAction}</Typography>
            <Typography typeRole="caption">Due {record.dueDate}</Typography>
          </div>
        </div>
      </section>

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Record context
        </Typography>
        <KeyValueList
          items={[
            { label: "Owner", value: record.owner },
            { label: "Team", value: record.ownerTeam },
            { label: "Signal", value: record.signal },
            { label: "Last activity", value: record.lastActivityAt },
          ]}
        />
      </section>

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Activity
        </Typography>
        <ActivityFeed
          items={[
            {
              actor: record.owner,
              description: record.signal,
              icon: record.icon,
              id: `${record.id}-activity`,
              meta: record.lastActivityAt,
              title: record.lastActivity,
            },
            {
              description: record.nextAction,
              icon: "calendar",
              id: `${record.id}-next`,
              meta: `Due ${record.dueDate}`,
              title: "Next checkpoint",
            },
          ]}
        />
      </section>

      <div className="reference-drawer-actions">
        <Button intent="secondary" leadingIcon="edit" onClick={onAction}>
          Log update
        </Button>
        <Button intent="quiet" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export type OperationsViewState = "ready" | "loading" | "error" | "empty";

type OperationsNavigationKey =
  "work" | "customers" | "deliveries" | "supply" | "fleet" | "reports";

const operationsNavigationWorkTypes: Partial<
  Record<OperationsNavigationKey, WorkstreamType>
> = {
  customers: "Customer",
  deliveries: "Delivery",
  supply: "Supply & QC",
  fleet: "Fleet",
};

const operationsNavigationCopy: Record<
  OperationsNavigationKey,
  { description: string; icon: IconName; title: string }
> = {
  work: {
    description:
      "Follow customer, supply, delivery, and fleet work from signal to next action.",
    icon: "analytics",
    title: "Operations tracker",
  },
  customers: {
    description:
      "Keep customer context, payment posture, and relationship follow-up together.",
    icon: "users",
    title: "Customer intelligence",
  },
  deliveries: {
    description:
      "Coordinate route checkpoints, load readiness, and delivered confirmation.",
    icon: "delivery",
    title: "Delivery tracker",
  },
  supply: {
    description:
      "Move purchase requests through receiving, quality review, and farm routing.",
    icon: "package",
    title: "Supply & QC",
  },
  fleet: {
    description:
      "Keep vehicle readiness, maintenance requests, and downtime visible to operations.",
    icon: "fleet",
    title: "Fleet maintenance",
  },
  reports: {
    description:
      "Read operational closure and the financial trail behind active work.",
    icon: "analytics",
    title: "Operations reports",
  },
};

type CustomerIntelligenceRecord = {
  id: string;
  name: string;
  profile: string;
  owner: string;
  balance: string;
  paymentStatus: string;
  lastOrder: string;
  nextSignal: string;
  health: WorkstreamStatus;
  note: string;
};

const customerIntelligenceRecords: CustomerIntelligenceRecord[] = [
  {
    id: "customer-cipta-pakan",
    name: "PT Cipta Pakan",
    profile: "Feed account · East Java",
    owner: "Rina Kartika",
    balance: "Rp 18.400.000",
    paymentStatus: "Payment pending",
    lastOrder: "7 days ago",
    nextSignal: "Review next order",
    health: "On track",
    note: "The next order is a good point to confirm the payment plan.",
  },
  {
    id: "customer-budi-santoso",
    name: "Budi Santoso",
    profile: "Customer profile · payment follow-up",
    owner: "Dwi Prasetyo",
    balance: "Rp 7.250.000",
    paymentStatus: "Overdue balance",
    lastOrder: "21 days ago",
    nextSignal: "Send payment reminder",
    health: "Waiting",
    note: "Keep the reminder factual and preserve the relationship context.",
  },
  {
    id: "customer-sinar-tani",
    name: "CV Sinar Tani",
    profile: "Multi-stop feed account · South Sulawesi",
    owner: "Femi Putri",
    balance: "Rp 0",
    paymentStatus: "Paid on delivery",
    lastOrder: "Today",
    nextSignal: "Confirm unload window",
    health: "Needs attention",
    note: "One delivery checkpoint remains open before the account is closed.",
  },
  {
    id: "customer-mardiati",
    name: "Mardiati",
    profile: "Feed account · transfer customer",
    owner: "Dona Sari",
    balance: "Rp 0",
    paymentStatus: "Receipt to match",
    lastOrder: "14 days ago",
    nextSignal: "Match receipt to invoice",
    health: "Waiting",
    note: "The bank transfer is recorded; the receipt still needs allocation.",
  },
];

type DeliveryTrackerRecord = {
  id: string;
  route: string;
  loadPercent: number;
  loadLabel: string;
  stops: string;
  owner: string;
  checkpoint: string;
  eta: string;
  status: WorkstreamStatus;
  note: string;
};

const deliveryTrackerRecords: DeliveryTrackerRecord[] = [
  {
    id: "delivery-3108",
    route: "Makassar → Farm 03",
    loadPercent: 82,
    loadLabel: "246 / 300 bags",
    stops: "2 customer stops",
    owner: "Femi Putri",
    checkpoint: "Confirm unload window",
    eta: "Today · 14:00",
    status: "Needs attention",
    note: "Truck is above the minimum load threshold; unload window is not confirmed.",
  },
  {
    id: "delivery-3112",
    route: "North dock → Farm 04",
    loadPercent: 100,
    loadLabel: "180 / 180 bags",
    stops: "1 farm stop",
    owner: "Payon Ibu",
    checkpoint: "Await QC release",
    eta: "Today · 16:00",
    status: "Blocked",
    note: "The route is ready after the corn lot quality decision is recorded.",
  },
  {
    id: "delivery-3094",
    route: "South dock → Farm 02",
    loadPercent: 94,
    loadLabel: "188 / 200 bags",
    stops: "1 farm stop",
    owner: "Ardi Pranoto",
    checkpoint: "Driver en route",
    eta: "Today · 12:30",
    status: "On track",
    note: "Driver checked in and the route has no open exceptions.",
  },
  {
    id: "delivery-3087",
    route: "Makassar → Farm 01",
    loadPercent: 78,
    loadLabel: "156 / 200 bags",
    stops: "3 customer stops",
    owner: "Dwi Prasetyo",
    checkpoint: "Complete loading",
    eta: "Tomorrow · 08:00",
    status: "Waiting",
    note: "The load is below the preferred threshold and needs a final confirmation.",
  },
];

type SupplyQualityRecord = {
  id: string;
  request: string;
  supplier: string;
  destination: string;
  quantity: string;
  safetyStock: number;
  quality: string;
  nextAction: string;
  status: WorkstreamStatus;
  note: string;
};

const supplyQualityRecords: SupplyQualityRecord[] = [
  {
    id: "supply-jg-882",
    request: "Corn lot JG-882",
    supplier: "Petani · Maros",
    destination: "Farm 04",
    quantity: "12.5 ton",
    safetyStock: 42,
    quality: "Review required",
    nextAction: "Record QC decision",
    status: "Blocked",
    note: "Receiving memo says the delivered grade differs from the request.",
  },
  {
    id: "supply-ovk-042",
    request: "OVK replenishment",
    supplier: "Prima Agro Supply",
    destination: "North dock",
    quantity: "84 cartons",
    safetyStock: 68,
    quality: "Approved",
    nextAction: "Release to routing",
    status: "On track",
    note: "The receiving count is complete and the stock cover is healthy.",
  },
  {
    id: "supply-feed-118",
    request: "Concentrate feed",
    supplier: "Pakan Makmur",
    destination: "South dock",
    quantity: "420 bags",
    safetyStock: 31,
    quality: "Receiving",
    nextAction: "Confirm unload count",
    status: "Needs attention",
    note: "Safety stock is below the preferred cover for the next production cycle.",
  },
  {
    id: "supply-spare-017",
    request: "Truck brake parts",
    supplier: "Sumber Teknik",
    destination: "Fleet store",
    quantity: "6 kits",
    safetyStock: 74,
    quality: "Approved",
    nextAction: "Attach to maintenance request",
    status: "Waiting",
    note: "Parts are ready; the related vehicle estimate still needs approval.",
  },
];

type FleetMaintenanceRecord = {
  id: string;
  vehicle: string;
  type: string;
  location: string;
  health: WorkstreamStatus;
  priority: string;
  estimate: string;
  downtime: string;
  nextAction: string;
  note: string;
};

const fleetMaintenanceRecords: FleetMaintenanceRecord[] = [
  {
    id: "fleet-b-9124",
    vehicle: "Truck B 9124",
    type: "Delivery truck",
    location: "Makassar yard",
    health: "Needs attention",
    priority: "High priority",
    estimate: "Rp 4.800.000",
    downtime: "2 days",
    nextAction: "Approve service estimate",
    note: "Brake inspection is complete; service approval is the next gate.",
  },
  {
    id: "fleet-t-1207",
    vehicle: "Truck T 1207",
    type: "Feed hauler",
    location: "Farm 02 route",
    health: "On track",
    priority: "Scheduled",
    estimate: "Rp 1.200.000",
    downtime: "Half day",
    nextAction: "Confirm maintenance slot",
    note: "Preventive service is scheduled after the current delivery run.",
  },
  {
    id: "fleet-m-4402",
    vehicle: "Mobil M 4402",
    type: "Lansir vehicle",
    location: "South dock",
    health: "Waiting",
    priority: "Medium priority",
    estimate: "Rp 2.650.000",
    downtime: "1 day",
    nextAction: "Attach spare parts request",
    note: "The vehicle is usable while the spare parts request is being prepared.",
  },
  {
    id: "fleet-p-0311",
    vehicle: "Pickup P 0311",
    type: "Field vehicle",
    location: "Maros field route",
    health: "On track",
    priority: "Available",
    estimate: "—",
    downtime: "—",
    nextAction: "Review next inspection",
    note: "No active maintenance request is attached to this vehicle.",
  },
];

type OperationsReportRecord = {
  id: string;
  flow: string;
  owner: string;
  value: string;
  status: WorkstreamStatus;
  lastUpdate: string;
  nextAction: string;
};

const operationsReportRecords: OperationsReportRecord[] = [
  {
    id: "report-ar",
    flow: "Receivables",
    owner: "Treasury",
    value: "Rp 25.650.000",
    status: "Needs attention",
    lastUpdate: "2 open customer balances",
    nextAction: "Review payment follow-up",
  },
  {
    id: "report-ap",
    flow: "Payables",
    owner: "Purchasing",
    value: "Rp 12.800.000",
    status: "Waiting",
    lastUpdate: "1 receipt to match",
    nextAction: "Confirm payment record",
  },
  {
    id: "report-delivery",
    flow: "Delivered work",
    owner: "Operations",
    value: "6 / 8 closed",
    status: "On track",
    lastUpdate: "2 checkpoints remain",
    nextAction: "Close delivery confirmations",
  },
  {
    id: "report-qc",
    flow: "Quality decisions",
    owner: "Supply & QC",
    value: "3 decisions",
    status: "Blocked",
    lastUpdate: "1 lot held for review",
    nextAction: "Record JG-882 decision",
  },
];

type OperationsDomainDetailDrawerProps = {
  actionLabel: string;
  activity: Array<{
    actor?: string;
    description?: string;
    icon?: IconName;
    id: string;
    meta?: string;
    title: string;
  }>;
  details: Array<{ label: ReactNode; value: ReactNode }>;
  description: string;
  eyebrow: string;
  icon: IconName;
  onAction: () => void;
  onClose: () => void;
  open: boolean;
  title: string;
};

function OperationsDomainDetailDrawer({
  actionLabel,
  activity,
  description,
  details,
  eyebrow,
  icon,
  onAction,
  onClose,
  open,
  title,
}: OperationsDomainDetailDrawerProps) {
  return (
    <DetailDrawer
      description={description}
      onClose={onClose}
      open={open}
      title={title}
    >
      {open ? (
        <div className="reference-drawer-stack operations-drawer-stack">
          <RecordSummary
            description={description}
            eyebrow={eyebrow}
            media={
              <span className="operations-record-icon" aria-hidden="true">
                <T7Icon name={icon} size={22} />
              </span>
            }
            title={title}
          />
          <section className="reference-drawer-section">
            <Typography as="h3" typeRole="heading-sm">
              Record details
            </Typography>
            <KeyValueList items={details} />
          </section>
          <section className="reference-drawer-section">
            <Typography as="h3" typeRole="heading-sm">
              Activity
            </Typography>
            <ActivityFeed items={activity} />
          </section>
          <div className="reference-drawer-actions">
            <Button leadingIcon="edit" onClick={onAction} intent="secondary">
              {actionLabel}
            </Button>
            <Button onClick={onClose} intent="quiet">
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </DetailDrawer>
  );
}

function CustomerIntelligenceView({
  onNotice,
}: {
  onNotice: (notice: string) => void;
}) {
  const [selected, setSelected] = useState<CustomerIntelligenceRecord | null>(
    null,
  );
  const columns: DataTableColumn<CustomerIntelligenceRecord>[] = [
    {
      header: "Customer",
      key: "customer",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="label">{record.name}</Typography>
          <Typography typeRole="caption">{record.profile}</Typography>
        </div>
      ),
    },
    {
      header: "Payment posture",
      key: "payment",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.balance}</Typography>
          <Typography typeRole="caption">{record.paymentStatus}</Typography>
        </div>
      ),
    },
    {
      header: "Owner",
      key: "owner",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <div className="operations-domain-inline">
            <Avatar name={record.owner} size="sm" />
            <Typography typeRole="table-cell">{record.owner}</Typography>
          </div>
          <Typography typeRole="caption">
            Last order {record.lastOrder}
          </Typography>
        </div>
      ),
    },
    {
      header: "Health",
      key: "health",
      render: (record) => <WorkstreamStatusChip status={record.health} />,
    },
    {
      header: "Next signal",
      key: "nextSignal",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.nextSignal}</Typography>
          <Typography typeRole="caption">Open profile for context</Typography>
        </div>
      ),
    },
  ];

  return (
    <div className="operations-domain-view" data-domain-view="customers">
      <KPICluster
        label="Customer intelligence"
        items={[
          {
            icon: "users",
            label: "Active profiles",
            note: "Across current customer work",
            value: "18",
          },
          {
            icon: "warning",
            label: "Payment signals",
            note: "2 overdue · 1 receipt to match",
            tone: "warning",
            value: "3",
          },
          {
            icon: "calendar",
            label: "Follow-ups due",
            note: "Next 7 days",
            value: "6",
          },
          {
            icon: "analytics",
            label: "Last order gap",
            note: "Customers needing a signal",
            value: "4",
          },
        ]}
      />

      <div className="operations-domain-grid">
        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Customer signals</CardTitle>
              <CardDescription>
                Notes and follow-up cues stay beside the relationship profile.
              </CardDescription>
            </div>
            <StatusChip icon="users" tone="info">
              3 open signals
            </StatusChip>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              items={[
                {
                  actor: "Rina Kartika",
                  description:
                    "Next order review is due before the next feed request.",
                  icon: "users",
                  id: "customer-signal-cipta",
                  meta: "Today · 08:48",
                  title: "PT Cipta Pakan",
                },
                {
                  actor: "Dwi Prasetyo",
                  description:
                    "Payment reminder is waiting on customer confirmation.",
                  icon: "payment",
                  id: "customer-signal-budi",
                  meta: "Yesterday · 10:06",
                  title: "Budi Santoso",
                },
                {
                  actor: "Femi Putri",
                  description:
                    "Delivery confirmation will close the current account signal.",
                  icon: "delivery",
                  id: "customer-signal-sinar",
                  meta: "Today · 09:12",
                  title: "CV Sinar Tani",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Payment posture</CardTitle>
              <CardDescription>
                Payment context informs the next action without stopping every
                order.
              </CardDescription>
            </div>
            <Button
              intent="quiet"
              leadingIcon="export"
              onClick={() =>
                onNotice("Customer payment review prepared for export.")
              }
              size="sm"
            >
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                { label: "Open balance", value: "Rp 25.650.000" },
                { label: "Due after delivery", value: "Rp 18.400.000" },
                { label: "Overdue follow-up", value: "1 customer" },
                { label: "Receipt allocation", value: "1 pending match" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="operations-customer-list-title"
        className="reference-data-section operations-domain-table-section"
      >
        <div className="reference-section-bar">
          <div>
            <Typography
              as="h2"
              id="operations-customer-list-title"
              typeRole="heading-lg"
            >
              Customer profiles
            </Typography>
            <Typography typeRole="body-sm">
              Open a profile to see payment posture, notes, and the next
              relationship signal.
            </Typography>
          </div>
          <Badge tone="neutral">
            <T7Icon name="users" size={13} />
            {customerIntelligenceRecords.length} profiles
          </Badge>
        </div>
        <DataTable
          caption="Customer intelligence profiles"
          columns={columns}
          onRowClick={setSelected}
          responsive="scroll"
          rowKey={(record) => record.id}
          rows={customerIntelligenceRecords}
        />
      </section>

      <OperationsDomainDetailDrawer
        actionLabel="Log customer note"
        activity={[
          {
            actor: selected?.owner,
            description: selected?.note,
            icon: "edit",
            id: `${selected?.id}-note`,
            meta: "Latest profile note",
            title: "Relationship context",
          },
          {
            description: selected?.nextSignal,
            icon: "calendar",
            id: `${selected?.id}-next`,
            meta: "Next action",
            title: "Follow-up signal",
          },
        ]}
        details={
          selected
            ? [
                { label: "Payment status", value: selected.paymentStatus },
                { label: "Open balance", value: selected.balance },
                { label: "Last order", value: selected.lastOrder },
                { label: "Owner", value: selected.owner },
              ]
            : []
        }
        description="Customer profile context, payment posture, and relationship signal."
        eyebrow={selected?.profile ?? "Customer profile"}
        icon="users"
        onAction={() =>
          onNotice(
            selected
              ? `Customer note flow is ready for ${selected.name}.`
              : "Customer note flow is ready.",
          )
        }
        onClose={() => setSelected(null)}
        open={Boolean(selected)}
        title={selected?.name ?? "Customer profile"}
      />
    </div>
  );
}

function DeliveryTrackerView({
  onNotice,
}: {
  onNotice: (notice: string) => void;
}) {
  const [selected, setSelected] = useState<DeliveryTrackerRecord | null>(null);
  const columns: DataTableColumn<DeliveryTrackerRecord>[] = [
    {
      header: "Route",
      key: "route",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="label">{record.route}</Typography>
          <Typography typeRole="caption">{record.stops}</Typography>
        </div>
      ),
    },
    {
      header: "Load readiness",
      key: "load",
      render: (record) => (
        <div className="operations-domain-progress-cell">
          <Progress
            label={record.loadLabel}
            showValue
            value={record.loadPercent}
          />
        </div>
      ),
    },
    {
      header: "Owner",
      key: "owner",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.owner}</Typography>
          <Typography typeRole="caption">ETA {record.eta}</Typography>
        </div>
      ),
    },
    {
      header: "Checkpoint",
      key: "checkpoint",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.checkpoint}</Typography>
          <Typography typeRole="caption">Open route for detail</Typography>
        </div>
      ),
    },
    {
      header: "Health",
      key: "status",
      render: (record) => <WorkstreamStatusChip status={record.status} />,
    },
  ];

  return (
    <div className="operations-domain-view" data-domain-view="deliveries">
      <KPICluster
        label="Delivery control"
        items={[
          {
            icon: "delivery",
            label: "Active routes",
            note: "Across current delivery work",
            value: "4",
          },
          {
            icon: "analytics",
            label: "Load ready",
            note: "At or above 80% threshold",
            value: "3",
          },
          {
            icon: "warning",
            label: "Open checkpoints",
            note: "1 blocked by QC",
            tone: "warning",
            value: "2",
          },
          {
            icon: "check",
            label: "Delivered today",
            note: "Confirmation recorded",
            tone: "success",
            value: "6",
          },
        ]}
      />

      <div className="operations-domain-grid">
        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Route pulse</CardTitle>
              <CardDescription>
                The handoff stays visible from load readiness to delivered
                confirmation.
              </CardDescription>
            </div>
            <StatusChip icon="delivery" tone="info">
              4 active routes
            </StatusChip>
          </CardHeader>
          <CardContent>
            <Progress
              label="Truck B 9124 · 246 of 300 bags loaded"
              showValue
              value={82}
            />
            <ActivityFeed
              className="operations-domain-feed"
              items={[
                {
                  actor: "Warehouse",
                  description:
                    "Minimum load threshold reached for the next route.",
                  icon: "package",
                  id: "delivery-pulse-load",
                  meta: "42 min ago",
                  title: "Load in progress",
                },
                {
                  actor: "Driver",
                  description:
                    "Farm 03 stop is next after the unload window is confirmed.",
                  icon: "delivery",
                  id: "delivery-pulse-route",
                  meta: "18 min ago",
                  title: "Route moving",
                },
                {
                  actor: "Operations",
                  description:
                    "Delivered confirmation closes the customer workstream.",
                  icon: "check",
                  id: "delivery-pulse-close",
                  meta: "Next checkpoint",
                  title: "Close the loop",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Checkpoint handoff</CardTitle>
              <CardDescription>
                Route ownership is explicit before a vehicle leaves the yard.
              </CardDescription>
            </div>
            <Button
              intent="secondary"
              leadingIcon="edit"
              onClick={() =>
                onNotice("Delivery checkpoint log is ready for an update.")
              }
              size="sm"
            >
              Log checkpoint
            </Button>
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                { label: "Next departure", value: "Today · 14:00" },
                { label: "Route owner", value: "Femi Putri" },
                { label: "Minimum load", value: "80% before dispatch" },
                {
                  label: "Open exception",
                  value: (
                    <StatusChip icon="warning" tone="warning">
                      Unload window
                    </StatusChip>
                  ),
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="operations-delivery-list-title"
        className="reference-data-section operations-domain-table-section"
      >
        <div className="reference-section-bar">
          <div>
            <Typography
              as="h2"
              id="operations-delivery-list-title"
              typeRole="heading-lg"
            >
              Delivery routes
            </Typography>
            <Typography typeRole="body-sm">
              Select a route to inspect load, stops, ownership, and the next
              checkpoint.
            </Typography>
          </div>
          <Badge tone="neutral">
            <T7Icon name="delivery" size={13} />
            {deliveryTrackerRecords.length} active routes
          </Badge>
        </div>
        <DataTable
          caption="Delivery route tracker"
          columns={columns}
          onRowClick={setSelected}
          responsive="scroll"
          rowKey={(record) => record.id}
          rows={deliveryTrackerRecords}
        />
      </section>

      <OperationsDomainDetailDrawer
        actionLabel="Log route update"
        activity={[
          {
            actor: selected?.owner,
            description: selected?.note,
            icon: "delivery",
            id: `${selected?.id}-route`,
            meta: selected?.eta,
            title: "Route status",
          },
          {
            description: selected?.checkpoint,
            icon: "check",
            id: `${selected?.id}-checkpoint`,
            meta: "Next checkpoint",
            title: "Handoff",
          },
        ]}
        details={
          selected
            ? [
                { label: "Load", value: selected.loadLabel },
                { label: "Stops", value: selected.stops },
                { label: "Owner", value: selected.owner },
                { label: "ETA", value: selected.eta },
              ]
            : []
        }
        description="Route readiness, handoff ownership, and delivered confirmation."
        eyebrow={selected?.route ?? "Delivery route"}
        icon="delivery"
        onAction={() =>
          onNotice(
            selected
              ? `Delivery update flow is ready for ${selected.route}.`
              : "Delivery update flow is ready.",
          )
        }
        onClose={() => setSelected(null)}
        open={Boolean(selected)}
        title={selected?.checkpoint ?? "Delivery route"}
      />
    </div>
  );
}

function supplyQualityStatusChip(quality: string) {
  if (quality === "Approved") {
    return (
      <StatusChip icon="check" tone="success">
        {quality}
      </StatusChip>
    );
  }
  if (quality === "Review required") {
    return (
      <StatusChip icon="warning" tone="warning">
        {quality}
      </StatusChip>
    );
  }
  return (
    <StatusChip icon="pending" tone="neutral">
      {quality}
    </StatusChip>
  );
}

function SupplyQualityView({
  onNotice,
}: {
  onNotice: (notice: string) => void;
}) {
  const [selected, setSelected] = useState<SupplyQualityRecord | null>(null);
  const columns: DataTableColumn<SupplyQualityRecord>[] = [
    {
      header: "Request",
      key: "request",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="label">{record.request}</Typography>
          <Typography typeRole="caption">{record.supplier}</Typography>
        </div>
      ),
    },
    {
      header: "Destination",
      key: "destination",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.destination}</Typography>
          <Typography typeRole="caption">{record.quantity}</Typography>
        </div>
      ),
    },
    {
      header: "Safety stock",
      key: "safetyStock",
      render: (record) => (
        <div className="operations-domain-progress-cell">
          <Progress
            label={`${record.safetyStock}% cover`}
            showValue
            value={record.safetyStock}
          />
        </div>
      ),
    },
    {
      header: "Quality",
      key: "quality",
      render: (record) => supplyQualityStatusChip(record.quality),
    },
    {
      header: "Next action",
      key: "nextAction",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.nextAction}</Typography>
          <Typography typeRole="caption">Open request for context</Typography>
        </div>
      ),
    },
  ];

  return (
    <div className="operations-domain-view" data-domain-view="supply">
      <KPICluster
        label="Supply and quality control"
        items={[
          {
            icon: "edit",
            label: "Open requests",
            note: "Purchase and replenishment",
            value: "6",
          },
          {
            icon: "filter",
            label: "In quality review",
            note: "Receiving decisions",
            tone: "warning",
            value: "2",
          },
          {
            icon: "delivery",
            label: "Ready to route",
            note: "Approved receiving records",
            tone: "success",
            value: "4",
          },
          {
            icon: "warning",
            label: "Safety stock flags",
            note: "Below preferred cover",
            tone: "warning",
            value: "3",
          },
        ]}
      />

      <div className="operations-domain-grid">
        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Replenishment watch</CardTitle>
              <CardDescription>
                Consumption history and current cover guide the next purchase
                request.
              </CardDescription>
            </div>
            <StatusChip icon="package" tone="info">
              3 below cover
            </StatusChip>
          </CardHeader>
          <CardContent>
            <div className="operations-domain-progress-list">
              {supplyQualityRecords.slice(0, 3).map((record) => (
                <div className="operations-domain-progress-row" key={record.id}>
                  <div>
                    <Typography typeRole="label">{record.request}</Typography>
                    <Typography typeRole="caption">
                      {record.quantity} · {record.destination}
                    </Typography>
                  </div>
                  <Progress
                    label={`${record.safetyStock}%`}
                    showValue
                    value={record.safetyStock}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Quality decisions</CardTitle>
              <CardDescription>
                Receiving is complete only after the quality decision and memo
                are recorded.
              </CardDescription>
            </div>
            <Button
              intent="secondary"
              leadingIcon="edit"
              onClick={() =>
                onNotice("Quality decision flow is ready for an update.")
              }
              size="sm"
            >
              Add memo
            </Button>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              items={[
                {
                  actor: "Payon Ibu",
                  description:
                    "Corn lot JG-882 is held until the delivered grade is confirmed.",
                  icon: "warning",
                  id: "quality-jg-882",
                  meta: "Today · 07:36",
                  title: "Decision required",
                },
                {
                  actor: "Warehouse",
                  description:
                    "OVK replenishment count is complete and ready for routing.",
                  icon: "check",
                  id: "quality-ovk-042",
                  meta: "Yesterday · 15:20",
                  title: "Receiving approved",
                },
                {
                  actor: "Purchasing",
                  description:
                    "A low safety-stock signal created the next purchase request.",
                  icon: "package",
                  id: "quality-feed-118",
                  meta: "Yesterday · 13:04",
                  title: "Replenishment requested",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="operations-supply-list-title"
        className="reference-data-section operations-domain-table-section"
      >
        <div className="reference-section-bar">
          <div>
            <Typography
              as="h2"
              id="operations-supply-list-title"
              typeRole="heading-lg"
            >
              Purchase and quality queue
            </Typography>
            <Typography typeRole="body-sm">
              Select a request to inspect supplier, receiving, safety stock, and
              routing context.
            </Typography>
          </div>
          <Badge tone="neutral">
            <T7Icon name="package" size={13} />
            {supplyQualityRecords.length} requests
          </Badge>
        </div>
        <DataTable
          caption="Supply and quality queue"
          columns={columns}
          onRowClick={setSelected}
          responsive="scroll"
          rowKey={(record) => record.id}
          rows={supplyQualityRecords}
        />
      </section>

      <OperationsDomainDetailDrawer
        actionLabel="Log quality decision"
        activity={[
          {
            actor: "Supply & QC",
            description: selected?.note,
            icon: "filter",
            id: `${selected?.id}-quality`,
            meta: selected?.quality,
            title: "Quality context",
          },
          {
            description: selected?.nextAction,
            icon: "delivery",
            id: `${selected?.id}-route`,
            meta: selected?.destination,
            title: "Routing handoff",
          },
        ]}
        details={
          selected
            ? [
                { label: "Supplier", value: selected.supplier },
                { label: "Quantity", value: selected.quantity },
                {
                  label: "Safety stock",
                  value: `${selected.safetyStock}% cover`,
                },
                { label: "Quality", value: selected.quality },
              ]
            : []
        }
        description="Purchase request, receiving decision, safety stock, and routing context."
        eyebrow={selected?.request ?? "Supply request"}
        icon="package"
        onAction={() =>
          onNotice(
            selected
              ? `Quality memo flow is ready for ${selected.request}.`
              : "Quality memo flow is ready.",
          )
        }
        onClose={() => setSelected(null)}
        open={Boolean(selected)}
        title={selected?.nextAction ?? "Supply request"}
      />
    </div>
  );
}

function FleetMaintenanceView({
  onNotice,
}: {
  onNotice: (notice: string) => void;
}) {
  const [selected, setSelected] = useState<FleetMaintenanceRecord | null>(null);
  const columns: DataTableColumn<FleetMaintenanceRecord>[] = [
    {
      header: "Vehicle",
      key: "vehicle",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="label">{record.vehicle}</Typography>
          <Typography typeRole="caption">
            {record.type} · {record.location}
          </Typography>
        </div>
      ),
    },
    {
      header: "Health",
      key: "health",
      render: (record) => <WorkstreamStatusChip status={record.health} />,
    },
    {
      header: "Priority",
      key: "priority",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.priority}</Typography>
          <Typography typeRole="caption">Downtime {record.downtime}</Typography>
        </div>
      ),
    },
    {
      header: "Estimate",
      key: "estimate",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.estimate}</Typography>
          <Typography typeRole="caption">Maintenance cost</Typography>
        </div>
      ),
    },
    {
      header: "Next action",
      key: "nextAction",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.nextAction}</Typography>
          <Typography typeRole="caption">Open vehicle for context</Typography>
        </div>
      ),
    },
  ];

  return (
    <div className="operations-domain-view" data-domain-view="fleet">
      <KPICluster
        label="Fleet maintenance"
        items={[
          {
            icon: "fleet",
            label: "Active vehicles",
            note: "Delivery, lansir, and field fleet",
            value: "12",
          },
          {
            icon: "check",
            label: "Available now",
            note: "Ready for an assigned route",
            tone: "success",
            value: "9",
          },
          {
            icon: "warning",
            label: "Maintenance queue",
            note: "Requests requiring action",
            tone: "warning",
            value: "2",
          },
          {
            icon: "payment",
            label: "Awaiting estimate",
            note: "Cost or parts not confirmed",
            value: "1",
          },
        ]}
      />

      <div className="operations-domain-grid">
        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Maintenance queue</CardTitle>
              <CardDescription>
                Prioritise safety, estimated cost, and expected downtime before
                assigning a route.
              </CardDescription>
            </div>
            <StatusChip icon="warning" tone="warning">
              2 requests
            </StatusChip>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              items={[
                {
                  actor: "Ardi Pranoto",
                  description:
                    "Brake inspection is complete; service estimate needs approval.",
                  icon: "warning",
                  id: "fleet-activity-b-9124",
                  meta: "High priority · 2 days",
                  title: "Truck B 9124",
                },
                {
                  actor: "Fleet maintenance",
                  description:
                    "Spare parts request is attached to the next workshop slot.",
                  icon: "package",
                  id: "fleet-activity-m-4402",
                  meta: "Medium priority · 1 day",
                  title: "Mobil M 4402",
                },
                {
                  actor: "Operations",
                  description:
                    "Nine vehicles remain available for new delivery assignments.",
                  icon: "fleet",
                  id: "fleet-activity-ready",
                  meta: "Updated today",
                  title: "Fleet readiness",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Readiness and cost</CardTitle>
              <CardDescription>
                Keep reimbursement, parts, and downtime attached to the vehicle
                record.
              </CardDescription>
            </div>
            <Button
              intent="secondary"
              leadingIcon="edit"
              onClick={() =>
                onNotice("Fleet maintenance request is ready to be logged.")
              }
              size="sm"
            >
              New request
            </Button>
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                { label: "Vehicles available", value: "9 of 12" },
                { label: "Open maintenance", value: "2 requests" },
                { label: "Parts request", value: "1 awaiting attachment" },
                { label: "Expected downtime", value: "2 days maximum" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="operations-fleet-list-title"
        className="reference-data-section operations-domain-table-section"
      >
        <div className="reference-section-bar">
          <div>
            <Typography
              as="h2"
              id="operations-fleet-list-title"
              typeRole="heading-lg"
            >
              Fleet register
            </Typography>
            <Typography typeRole="body-sm">
              Select a vehicle to inspect maintenance need, estimate, downtime,
              and next action.
            </Typography>
          </div>
          <Badge tone="neutral">
            <T7Icon name="fleet" size={13} />
            {fleetMaintenanceRecords.length} tracked vehicles
          </Badge>
        </div>
        <DataTable
          caption="Fleet maintenance register"
          columns={columns}
          onRowClick={setSelected}
          responsive="scroll"
          rowKey={(record) => record.id}
          rows={fleetMaintenanceRecords}
        />
      </section>

      <OperationsDomainDetailDrawer
        actionLabel="Log maintenance update"
        activity={[
          {
            actor: "Fleet maintenance",
            description: selected?.note,
            icon: "fleet",
            id: `${selected?.id}-inspection`,
            meta: selected?.health,
            title: "Inspection context",
          },
          {
            description: selected?.nextAction,
            icon: "calendar",
            id: `${selected?.id}-next`,
            meta: selected?.downtime,
            title: "Next action",
          },
        ]}
        details={
          selected
            ? [
                { label: "Vehicle", value: selected.vehicle },
                { label: "Location", value: selected.location },
                { label: "Estimate", value: selected.estimate },
                { label: "Downtime", value: selected.downtime },
              ]
            : []
        }
        description="Vehicle readiness, maintenance request, estimate, and downtime context."
        eyebrow={selected?.type ?? "Fleet vehicle"}
        icon="fleet"
        onAction={() =>
          onNotice(
            selected
              ? `Maintenance update flow is ready for ${selected.vehicle}.`
              : "Maintenance update flow is ready.",
          )
        }
        onClose={() => setSelected(null)}
        open={Boolean(selected)}
        title={selected?.vehicle ?? "Fleet vehicle"}
      />
    </div>
  );
}

function OperationsReportsView({
  onNotice,
}: {
  onNotice: (notice: string) => void;
}) {
  const columns: DataTableColumn<OperationsReportRecord>[] = [
    {
      header: "Flow",
      key: "flow",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="label">{record.flow}</Typography>
          <Typography typeRole="caption">{record.owner}</Typography>
        </div>
      ),
    },
    {
      header: "Value",
      key: "value",
      render: (record) => (
        <div className="operations-domain-record-cell">
          <Typography typeRole="table-cell">{record.value}</Typography>
          <Typography typeRole="caption">{record.lastUpdate}</Typography>
        </div>
      ),
    },
    {
      header: "Health",
      key: "status",
      render: (record) => <WorkstreamStatusChip status={record.status} />,
    },
    {
      header: "Next action",
      key: "nextAction",
      render: (record) => (
        <Typography typeRole="table-cell">{record.nextAction}</Typography>
      ),
    },
  ];

  return (
    <div className="operations-domain-view" data-domain-view="reports">
      <KPICluster
        label="Operations reports"
        items={[
          {
            icon: "analytics",
            label: "Workstreams closed",
            note: "Current operating set",
            value: "6 / 8",
          },
          {
            icon: "payment",
            label: "Open receivables",
            note: "Customer balances in view",
            tone: "warning",
            value: "Rp 25.6m",
          },
          {
            icon: "delivery",
            label: "Delivery closure",
            note: "Confirmed checkpoints",
            value: "75%",
          },
          {
            icon: "filter",
            label: "Quality decisions",
            note: "1 lot held for review",
            tone: "warning",
            value: "3",
          },
        ]}
      />

      <div className="operations-domain-grid">
        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Closure pulse</CardTitle>
              <CardDescription>
                A compact view of what is closed, waiting, and blocked across
                operations.
              </CardDescription>
            </div>
            <StatusChip icon="analytics" tone="info">
              Live summary
            </StatusChip>
          </CardHeader>
          <CardContent>
            <Progress label="Workstream closure" showValue value={75} />
            <ActivityFeed
              className="operations-domain-feed"
              items={[
                {
                  actor: "Operations",
                  description:
                    "Six active records have a confirmed next step or closure.",
                  icon: "check",
                  id: "report-closure",
                  meta: "Updated today",
                  title: "Closure is moving",
                },
                {
                  actor: "Treasury",
                  description:
                    "Two customer balances and one receipt require payment follow-up.",
                  icon: "payment",
                  id: "report-receivables",
                  meta: "3 payment signals",
                  title: "Financial trail needs review",
                },
                {
                  actor: "Supply & QC",
                  description:
                    "One receiving decision is holding a route to Farm 04.",
                  icon: "warning",
                  id: "report-quality",
                  meta: "1 blocked record",
                  title: "Quality gate is visible",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="operations-domain-card">
          <CardHeader>
            <div>
              <CardTitle>Financial trail</CardTitle>
              <CardDescription>
                Receivables and payables stay connected to the operational event
                that created them.
              </CardDescription>
            </div>
            <Button
              intent="secondary"
              leadingIcon="export"
              onClick={() => onNotice("Operations report prepared for export.")}
              size="sm"
            >
              Export report
            </Button>
          </CardHeader>
          <CardContent>
            <KeyValueList
              items={[
                { label: "Receivables", value: "Rp 25.650.000" },
                { label: "Payables", value: "Rp 12.800.000" },
                { label: "Receipt matching", value: "1 pending" },
                { label: "Report period", value: "Aug 20–26, 2026" },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      <section
        aria-labelledby="operations-report-table-title"
        className="reference-data-section operations-domain-table-section"
      >
        <div className="reference-section-bar">
          <div>
            <Typography
              as="h2"
              id="operations-report-table-title"
              typeRole="heading-lg"
            >
              Operational report lines
            </Typography>
            <Typography typeRole="body-sm">
              Follow the next accountable action instead of reading disconnected
              totals.
            </Typography>
          </div>
          <Badge tone="neutral">
            <T7Icon name="analytics" size={13} />
            {operationsReportRecords.length} report lines
          </Badge>
        </div>
        <DataTable
          caption="Operations report lines"
          columns={columns}
          responsive="scroll"
          rowKey={(record) => record.id}
          rows={operationsReportRecords}
        />
      </section>
    </div>
  );
}

function OperationsDomainSurface({
  activeKey,
  onNotice,
}: {
  activeKey: Exclude<OperationsNavigationKey, "work">;
  onNotice: (notice: string) => void;
}) {
  const content =
    activeKey === "customers" ? (
      <CustomerIntelligenceView onNotice={onNotice} />
    ) : activeKey === "deliveries" ? (
      <DeliveryTrackerView onNotice={onNotice} />
    ) : activeKey === "supply" ? (
      <SupplyQualityView onNotice={onNotice} />
    ) : activeKey === "fleet" ? (
      <FleetMaintenanceView onNotice={onNotice} />
    ) : (
      <OperationsReportsView onNotice={onNotice} />
    );

  return (
    <div id="operations-domain-surface" className="operations-domain-surface">
      {content}
    </div>
  );
}

export interface OperationsTrackerProps {
  viewState: OperationsViewState;
  onViewStateChange: (viewState: OperationsViewState) => void;
  onOpenSettings?: () => void;
}

export function OperationsTracker({
  onOpenSettings,
  onViewStateChange,
  viewState,
}: OperationsTrackerProps) {
  const [query, setQuery] = useState("");
  const [workType, setWorkType] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedMilestoneId, setSelectedMilestoneId] = useState("triage");
  const [activeNavigationKey, setActiveNavigationKey] =
    useState<OperationsNavigationKey>("work");
  const [detailRecord, setDetailRecord] = useState<OperationsRecord | null>(
    null,
  );
  const [notice, setNotice] = useState("");
  const [sort, setSort] = useState<DataTableSort>({
    direction: "desc",
    key: "lastActivity",
  });
  const pageSize = 5;
  const attentionCount = operationsRecords.filter(
    (record) =>
      record.status === "Needs attention" || record.status === "Blocked",
  ).length;
  const customerSignalCount = operationsRecords.filter(
    (record) => record.workType === "Customer" || record.workType === "Finance",
  ).length;
  const dueSoonCount = operationsRecords.filter(
    (record) => record.dueRank <= 6,
  ).length;
  const dueSoonShare = Math.round(
    (dueSoonCount / Math.max(operationsRecords.length, 1)) * 100,
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const next = operationsRecords.filter((record) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          record.reference,
          record.subject,
          record.workType,
          record.context,
          record.owner,
          record.nextAction,
          record.lastActivity,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesType = workType === "all" || record.workType === workType;
      const matchesStatus = status === "all" || record.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });

    return [...next].sort((left, right) => {
      const direction = sort.direction === "asc" ? 1 : -1;
      if (sort.key === "workstream")
        return left.reference.localeCompare(right.reference) * direction;
      if (sort.key === "workType")
        return left.workType.localeCompare(right.workType) * direction;
      if (sort.key === "status")
        return left.status.localeCompare(right.status) * direction;
      if (sort.key === "due") return (left.dueRank - right.dueRank) * direction;
      return (left.activityRank - right.activityRank) * direction;
    });
  }, [query, sort, status, workType]);

  const visibleRecords = filteredRecords.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function updateFilter<T>(
    setter: (value: T) => void,
    value: T,
    navigationKey: OperationsNavigationKey = "work",
  ) {
    setter(value);
    setPage(1);
    setSelectedRowKeys([]);
    setActiveNavigationKey(navigationKey);
  }

  function updateSort(key: string) {
    setPage(1);
    setSort((current) => ({
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
      key,
    }));
  }

  function focusOperationsSection(id: string) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function handleOperationsNavigation(key: string) {
    const navigationKey = key as OperationsNavigationKey;
    setActiveNavigationKey(navigationKey);
    setQuery("");
    setStatus("all");
    setPage(1);
    setSelectedRowKeys([]);

    if (navigationKey === "reports") {
      setWorkType("all");
      setNotice("Reports are based on the live health and milestone summary.");
      focusOperationsSection("operations-domain-surface");
      return;
    }

    setWorkType(
      navigationKey === "work"
        ? "all"
        : (operationsNavigationWorkTypes[navigationKey] ?? "all"),
    );
    setNotice("");
    focusOperationsSection(
      navigationKey === "work"
        ? "operations-work-queue"
        : "operations-domain-surface",
    );
  }

  const columns: DataTableColumn<OperationsRecord>[] = [
    {
      header: "Workstream",
      key: "workstream",
      sortable: true,
      render: (record) => (
        <div className="operations-record-cell">
          <div className="operations-record-leading">
            <span className="operations-record-icon" aria-hidden="true">
              <T7Icon name={record.icon} size={17} />
            </span>
            <div>
              <div className="operations-record-heading">
                <Typography typeRole="label">{record.reference}</Typography>
                <WorkstreamTypeChip workType={record.workType} />
              </div>
              <Typography typeRole="body-sm">{record.subject}</Typography>
            </div>
          </div>
          <div className="operations-record-meta">
            <Typography typeRole="caption">{record.context}</Typography>
            <span aria-hidden="true">·</span>
            <Typography typeRole="caption">
              {record.lastActivity} · {record.lastActivityAt}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      header: "Owner",
      key: "owner",
      render: (record) => (
        <div className="operations-owner-cell">
          <div className="operations-owner-heading">
            <Avatar name={record.owner} size="sm" />
            <Typography typeRole="table-cell">{record.owner}</Typography>
          </div>
          <Typography typeRole="caption">{record.ownerTeam}</Typography>
        </div>
      ),
    },
    {
      header: "Health",
      key: "status",
      sortable: true,
      render: (record) => <WorkstreamStatusChip status={record.status} />,
    },
    {
      header: "Next action",
      key: "due",
      sortable: true,
      render: (record) => (
        <div className="operations-next-cell">
          <Typography typeRole="table-cell">{record.nextAction}</Typography>
          <Typography typeRole="caption">Due {record.dueDate}</Typography>
        </div>
      ),
    },
    {
      align: "right",
      header: "Actions",
      key: "actions",
      render: (record) => (
        <div className="reference-table-actions">
          <Button
            aria-label={`View ${record.reference}`}
            intent="quiet"
            leadingIcon="view"
            onClick={(event) => {
              event.stopPropagation();
              setDetailRecord(record);
            }}
            size="sm"
          >
            Open
          </Button>
          <Button
            aria-label={`More actions for ${record.reference}`}
            intent="quiet"
            leadingIcon="more"
            onClick={(event) => {
              event.stopPropagation();
              setNotice(
                `More actions for ${record.reference} are ready for wiring.`,
              );
            }}
            size="sm"
          />
        </div>
      ),
    },
  ];

  const activeNavigation = operationsNavigationCopy[activeNavigationKey];
  const activeNavigationMeta: Record<OperationsNavigationKey, string> = {
    work: `${operationsRecords.length} open workstreams`,
    customers: `${customerIntelligenceRecords.length} profiles in view`,
    deliveries: `${deliveryTrackerRecords.length} active routes`,
    supply: `${supplyQualityRecords.length} requests in view`,
    fleet: `${fleetMaintenanceRecords.length} vehicles tracked`,
    reports: `${operationsReportRecords.length} report lines`,
  };
  const activeDomainKey =
    activeNavigationKey === "work" ? null : activeNavigationKey;

  const operationsSidebar = (
    <Sidebar
      activeKey={activeNavigationKey}
      brand={
        <ReferenceBrand
          icon="analytics"
          subtitle="Operations workspace"
          title="ten4seven UI"
        />
      }
      items={[
        { icon: "table", key: "work", label: "Work queue" },
        { icon: "users", key: "customers", label: "Customers" },
        { icon: "delivery", key: "deliveries", label: "Deliveries" },
        { icon: "package", key: "supply", label: "Supply & QC" },
        { icon: "fleet", key: "fleet", label: "Fleet" },
        { icon: "analytics", key: "reports", label: "Reports" },
      ]}
      onSelect={handleOperationsNavigation}
    />
  );

  return (
    <AppShell
      className="reference-app-shell operations-app-shell"
      sidebar={operationsSidebar}
      topbar={
        <OperationalTopbar
          context={
            activeNavigationKey === "work"
              ? "ten4seven UI / Operations"
              : `ten4seven UI / ${activeNavigation.title}`
          }
          icon={activeNavigation.icon}
        >
          <IconButton
            icon="settings"
            label="Open operations settings"
            onClick={onOpenSettings}
            size="md"
          />
        </OperationalTopbar>
      }
    >
      <div
        className="reference-page operations-reference"
        data-profile="enterprise"
      >
        <PageHeader
          actions={
            <>
              <Button
                intent="secondary"
                leadingIcon="edit"
                onClick={() =>
                  setNotice("Activity log flow is ready for wiring.")
                }
              >
                Log activity
              </Button>
              <Button
                leadingIcon="export"
                onClick={() =>
                  setNotice("Operations export prepared from the active view.")
                }
              >
                Export view
              </Button>
            </>
          }
          description={activeNavigation.description}
          meta={
            <>
              <Badge tone="primary">
                <T7Icon name={activeNavigation.icon} size={13} />
                {activeNavigationMeta[activeNavigationKey]}
              </Badge>
              <Typography typeRole="caption">
                Updated Aug 26, 2026 · 09:45
              </Typography>
            </>
          }
          overline={`Operations · ${activeNavigationKey === "work" ? "Shared work queue" : "Domain workspace"}`}
          title={activeNavigation.title}
        />

        {notice ? (
          <div className="reference-inline-notice" role="status">
            <T7Icon name="check" size={15} />
            <Typography typeRole="caption">{notice}</Typography>
            <Button intent="quiet" onClick={() => setNotice("")} size="sm">
              Dismiss
            </Button>
          </div>
        ) : null}

        {activeDomainKey ? (
          <OperationsDomainSurface
            activeKey={activeDomainKey}
            onNotice={setNotice}
          />
        ) : (
          <>
            <KPICluster
              id="operations-health-summary"
              label="Workstream health"
              variant="cards"
              items={[
                {
                  chart: (
                    <Sparkline
                      colorway={1}
                      label="Open workstreams across the last seven review periods"
                      values={[5, 5, 6, 7, 6, 8, 8]}
                    />
                  ),
                  colorway: 1,
                  emphasis: "solid",
                  icon: "dashboard",
                  label: "Open workstreams",
                  note: "Across 5 operational domains",
                  tone: "primary",
                  trend: (
                    <TrendIndicator
                      context="vs 7d"
                      direction="up"
                      label="Open workstreams increased by 2 versus the prior seven days"
                      sentiment="neutral"
                      value="+2"
                      variant="soft"
                    />
                  ),
                  value: operationsRecords.length.toString(),
                },
                {
                  chart: (
                    <Sparkline
                      colorway={3}
                      label="Workstreams needing attention across the last seven review periods"
                      values={[6, 5, 5, 4, 4, 3, 3]}
                    />
                  ),
                  colorway: 3,
                  emphasis: "solid",
                  icon: "warning",
                  label: "Needs attention",
                  note: "2 attention · 1 blocked",
                  tone: "warning",
                  trend: (
                    <TrendIndicator
                      context="vs yesterday"
                      direction="down"
                      label="Workstreams needing attention decreased by 2 versus yesterday"
                      sentiment="positive"
                      value="-2"
                      variant="soft"
                    />
                  ),
                  value: attentionCount.toString(),
                },
                {
                  colorway: 2,
                  emphasis: "solid",
                  icon: "calendar",
                  label: "Due in 7 days",
                  note: `${dueSoonCount} of ${operationsRecords.length} next actions`,
                  progress: (
                    <Progress
                      label="Share of open queue"
                      showValue
                      value={dueSoonShare}
                    />
                  ),
                  tone: "info",
                  trend: (
                    <TrendIndicator
                      context="vs prior week"
                      direction="up"
                      label="Workstreams due within seven days increased by 1 versus the prior week"
                      sentiment="warning"
                      value="+1"
                      variant="soft"
                    />
                  ),
                  value: dueSoonCount.toString(),
                },
                {
                  footer: (
                    <Typography typeRole="caption">
                      Relationship and payment review
                    </Typography>
                  ),
                  colorway: 4,
                  emphasis: "solid",
                  icon: "users",
                  label: "Customer signals",
                  note: "2 relationship · 1 payment",
                  tone: "accent",
                  trend: (
                    <TrendIndicator
                      context="vs prior week"
                      direction="up"
                      label="Customer signals increased by 1 versus the prior week"
                      sentiment="neutral"
                      value="+1"
                      variant="soft"
                    />
                  ),
                  value: customerSignalCount.toString(),
                },
              ]}
            />

            <section
              aria-labelledby="operations-milestone-title"
              className="operations-milestone-section"
            >
              <div className="reference-section-bar operations-milestone-header">
                <div>
                  <Typography
                    as="h2"
                    id="operations-milestone-title"
                    typeRole="heading-lg"
                  >
                    Workflow progress
                  </Typography>
                  <Typography typeRole="body-sm">
                    Select a workflow stage to inspect the work that is moving
                    the shared queue forward.
                  </Typography>
                </div>
              </div>
              <MilestoneTracker
                items={operationsMilestones}
                label="Operations milestone progress"
                onSelectedIdChange={setSelectedMilestoneId}
                selectedId={selectedMilestoneId}
              />
            </section>

            <FilterToolbar
              className="operations-filter-toolbar"
              summary={`${filteredRecords.length} of ${operationsRecords.length} workstreams`}
              title="Find a workstream"
            >
              <Input
                aria-label="Search workstream"
                label="Search work, customer or route"
                leadingIcon="search"
                onChange={(event) => updateFilter(setQuery, event.target.value)}
                placeholder="Search customer, route, reference…"
                value={query}
              />
              <Select
                label="Work type"
                onChange={(event) =>
                  updateFilter(setWorkType, event.target.value)
                }
                value={workType}
              >
                <option value="all">All work types</option>
                {workstreamTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <Select
                label="Health"
                onChange={(event) =>
                  updateFilter(setStatus, event.target.value)
                }
                value={status}
              >
                <option value="all">All health states</option>
                <option value="On track">On track</option>
                <option value="Needs attention">Needs attention</option>
                <option value="Blocked">Blocked</option>
                <option value="Waiting">Waiting</option>
              </Select>
            </FilterToolbar>

            <section
              id="operations-work-queue"
              className="reference-data-section operations-queue-section"
              aria-labelledby="operations-work-queue-title"
            >
              <div className="reference-section-bar">
                <div>
                  <Typography
                    as="h2"
                    typeRole="heading-lg"
                    id="operations-work-queue-title"
                  >
                    Work queue
                  </Typography>
                  <Typography typeRole="body-sm">
                    Open a row for full context, or select workstreams to
                    assign, review, or export as one operational set.
                  </Typography>
                </div>
                <Badge tone="neutral">
                  <T7Icon name="filter" size={13} />
                  {filteredRecords.length}{" "}
                  {filteredRecords.length === 1 ? "match" : "matches"}
                </Badge>
              </div>

              <BulkActionBar
                actions={
                  <>
                    <Button
                      intent="secondary"
                      leadingIcon="transfer"
                      onClick={() =>
                        setNotice(
                          `${selectedRowKeys.length} workstreams queued for review.`,
                        )
                      }
                      size="sm"
                    >
                      Assign
                    </Button>
                    <Button
                      intent="quiet"
                      leadingIcon="export"
                      onClick={() =>
                        setNotice(
                          `${selectedRowKeys.length} workstreams added to export.`,
                        )
                      }
                      size="sm"
                    >
                      Export
                    </Button>
                  </>
                }
                noun={
                  selectedRowKeys.length === 1 ? "workstream" : "workstreams"
                }
                onClear={() => setSelectedRowKeys([])}
                reserveSpace
                selectedCount={selectedRowKeys.length}
              />

              <DataTable
                caption="Operations work queue"
                columns={columns}
                emptyState={
                  <EmptyState
                    action={
                      <Button
                        intent="secondary"
                        onClick={() => updateFilter(setQuery, "")}
                        size="sm"
                      >
                        Clear search
                      </Button>
                    }
                    description="Try another reference, customer, domain, owner, or health state."
                    icon="search"
                    title="No workstreams match"
                  />
                }
                error={
                  viewState === "error" ? (
                    <div className="reference-table-state-action">
                      <T7Icon name="danger" size={18} />
                      <span>
                        Operations fixture unavailable. Retry the local read.
                      </span>
                      <Button
                        intent="secondary"
                        onClick={() => onViewStateChange("ready")}
                        size="sm"
                      >
                        Retry
                      </Button>
                    </div>
                  ) : undefined
                }
                loading={viewState === "loading"}
                onRowClick={setDetailRecord}
                onSelectionChange={setSelectedRowKeys}
                onSort={updateSort}
                responsive="scroll"
                rowKey={(record) => record.id}
                rows={viewState === "empty" ? [] : visibleRecords}
                selectable
                selectedRowKeys={selectedRowKeys}
                sort={sort}
              />
              <Pagination
                onPageChange={setPage}
                page={page}
                pageSize={pageSize}
                total={viewState === "empty" ? 0 : filteredRecords.length}
              />
            </section>
          </>
        )}
      </div>

      <DetailDrawer
        description="Context, signals, and next action for this workstream."
        onClose={() => setDetailRecord(null)}
        open={Boolean(detailRecord)}
        title={
          detailRecord
            ? `${detailRecord.reference} detail`
            : "Workstream detail"
        }
      >
        {detailRecord ? (
          <OperationsDrawerContent
            onAction={() =>
              setNotice(
                `Activity log flow is ready for ${detailRecord.reference}.`,
              )
            }
            onClose={() => setDetailRecord(null)}
            record={detailRecord}
          />
        ) : null}
      </DetailDrawer>
    </AppShell>
  );
}

const ebookCategories = [
  "Manajemen",
  "Akuntansi",
  "Pendidikan",
  "Kesehatan",
  "Teknologi Informasi",
  "Hukum",
  "Administrasi Publik",
] as const;
type EbookCategory = (typeof ebookCategories)[number];
type EbookCategoryFilter = EbookCategory | "all";
type EbookAvailability = "Google Play Books" | "Ebook" | "Buku cetak";
type EbookPriceRange = "all" | "under-80000" | "80000-100000" | "over-100000";

const ebookAvailabilityOptions: EbookAvailability[] = [
  "Google Play Books",
  "Ebook",
  "Buku cetak",
];

const ebookPriceOptions: Array<{ label: string; value: EbookPriceRange }> = [
  { label: "Semua harga", value: "all" },
  { label: "Di bawah Rp80.000", value: "under-80000" },
  { label: "Rp80.000–Rp100.000", value: "80000-100000" },
  { label: "Di atas Rp100.000", value: "over-100000" },
];

type EbookFormat = "EPUB" | "PDF";

type Ebook = {
  id: string;
  title: string;
  author: string;
  category: EbookCategory;
  price: number;
  rating: number;
  formats: EbookFormat[];
  availability: EbookAvailability;
  cover: string;
  badge?: string;
};

const ebooks: Ebook[] = [
  {
    id: "book-01",
    title: "Manajemen Strategis untuk Organisasi Modern",
    author: "Rina Kartika",
    category: "Manajemen",
    price: 95000,
    rating: 4.9,
    formats: ["EPUB", "PDF"],
    availability: "Google Play Books",
    cover: "/publishing-covers/manajemen-strategis.svg",
    badge: "Pilihan editor",
  },
  {
    id: "book-02",
    title: "Akuntansi Keuangan Berbasis Kas dan Akrual",
    author: "Dwi Prasetyo",
    category: "Akuntansi",
    price: 110000,
    rating: 4.8,
    formats: ["PDF"],
    availability: "Buku cetak",
    cover: "/publishing-covers/akuntansi-keuangan.svg",
  },
  {
    id: "book-03",
    title: "Mendesain Pembelajaran yang Bermakna",
    author: "Nadya Anindita",
    category: "Pendidikan",
    price: 78000,
    rating: 4.7,
    formats: ["EPUB"],
    availability: "Ebook",
    cover: "/publishing-covers/pembelajaran-bermakna.svg",
    badge: "Baru",
  },
  {
    id: "book-04",
    title: "Kesehatan Masyarakat di Tingkat Lokal",
    author: "dr. Bagus Santoso",
    category: "Kesehatan",
    price: 125000,
    rating: 4.9,
    formats: ["EPUB", "PDF"],
    availability: "Buku cetak",
    cover: "/publishing-covers/kesehatan-masyarakat.svg",
  },
  {
    id: "book-05",
    title: "Praktik Aman Data dan Sistem Informasi",
    author: "Fajar Nugroho",
    category: "Teknologi Informasi",
    price: 105000,
    rating: 4.8,
    formats: ["EPUB", "PDF"],
    availability: "Google Play Books",
    cover: "/publishing-covers/aman-data.svg",
  },
  {
    id: "book-06",
    title: "Hukum Perjanjian dalam Praktik Bisnis",
    author: "Maya S. Wibowo",
    category: "Hukum",
    price: 89000,
    rating: 4.6,
    formats: ["PDF"],
    availability: "Ebook",
    cover: "/publishing-covers/hukum-perjanjian.svg",
  },
  {
    id: "book-07",
    title: "Melayani Warga: Administrasi Publik yang Tanggap",
    author: "Arif Rahman Hakim",
    category: "Administrasi Publik",
    price: 99000,
    rating: 4.8,
    formats: ["EPUB", "PDF"],
    availability: "Google Play Books",
    cover: "/publishing-covers/melayani-warga.svg",
  },
  {
    id: "book-08",
    title: "Membaca Laporan Keuangan untuk Pengambilan Keputusan",
    author: "Sari Kurnia",
    category: "Akuntansi",
    price: 75000,
    rating: 4.5,
    formats: ["EPUB"],
    availability: "Ebook",
    cover: "/publishing-covers/laporan-keuangan.svg",
  },
  {
    id: "book-09",
    title: "Teknologi Tepat Guna untuk Layanan Publik",
    author: "Yusuf Maulana",
    category: "Teknologi Informasi",
    price: 82000,
    rating: 4.7,
    formats: ["PDF"],
    availability: "Buku cetak",
    cover: "/publishing-covers/teknologi-layanan.svg",
  },
  {
    id: "book-10",
    title: "Etika Profesi Kesehatan dan Keselamatan Pasien",
    author: "Lestari Wulandari",
    category: "Kesehatan",
    price: 115000,
    rating: 4.8,
    formats: ["EPUB", "PDF"],
    availability: "Google Play Books",
    cover: "/publishing-covers/etika-kesehatan.svg",
  },
];

type EbookCatalogFiltersProps = {
  authorQuery: string;
  availability: EbookAvailability[];
  category: EbookCategoryFilter;
  categorySectionId?: string;
  onAuthorQueryChange: (value: string) => void;
  onAvailabilityToggle: (value: EbookAvailability) => void;
  onCategoryChange: (value: EbookCategoryFilter) => void;
  onClear: () => void;
  onPriceRangeChange: (value: EbookPriceRange) => void;
  priceRange: EbookPriceRange;
};

function EbookCatalogFilters({
  authorQuery,
  availability,
  category,
  categorySectionId,
  onAuthorQueryChange,
  onAvailabilityToggle,
  onCategoryChange,
  onClear,
  onPriceRangeChange,
  priceRange,
}: EbookCatalogFiltersProps) {
  const hasActiveFilters =
    category !== "all" ||
    Boolean(authorQuery) ||
    priceRange !== "all" ||
    availability.length > 0;

  return (
    <div className="ebook-filter-stack">
      <section className="ebook-filter-group" id={categorySectionId}>
        <div className="ebook-filter-group-heading">
          <T7Icon name="category" size={16} />
          <Typography typeRole="label">Jelajahi kategori</Typography>
        </div>
        <nav
          aria-label="Jelajahi kategori buku"
          className="ebook-category-list"
        >
          <Button
            aria-pressed={category === "all"}
            className="ebook-category-link"
            intent="quiet"
            onClick={() => onCategoryChange("all")}
            size="sm"
          >
            Semua buku
          </Button>
          {ebookCategories.map((value) => (
            <Button
              aria-pressed={category === value}
              className="ebook-category-link"
              intent="quiet"
              key={value}
              onClick={() => onCategoryChange(value)}
              size="sm"
            >
              {value}
            </Button>
          ))}
        </nav>
      </section>

      <div className="ebook-filter-group">
        <div className="ebook-filter-group-heading">
          <T7Icon name="author" size={16} />
          <Typography typeRole="label">Penulis</Typography>
        </div>
        <Input
          aria-label="Saring berdasarkan penulis"
          label="Saring berdasarkan penulis"
          onChange={(event) => onAuthorQueryChange(event.target.value)}
          placeholder="Cari penulis"
          value={authorQuery}
        />
      </div>

      <fieldset className="ebook-filter-group ebook-filter-fieldset">
        <legend className="ebook-filter-group-heading">
          <T7Icon name="sort" size={16} />
          <span>Rentang harga</span>
        </legend>
        <div className="ebook-choice-list">
          {ebookPriceOptions.map((option) => (
            <Radio
              checked={priceRange === option.value}
              key={option.value}
              label={option.label}
              name="ebook-price-range"
              onChange={() => onPriceRangeChange(option.value)}
              value={option.value}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="ebook-filter-group ebook-filter-fieldset">
        <legend className="ebook-filter-group-heading">
          <T7Icon name="ebook" size={16} />
          <span>Ketersediaan</span>
        </legend>
        <div className="ebook-choice-list">
          {ebookAvailabilityOptions.map((value) => (
            <Checkbox
              checked={availability.includes(value)}
              key={value}
              label={value}
              onChange={() => onAvailabilityToggle(value)}
            />
          ))}
        </div>
      </fieldset>

      {hasActiveFilters ? (
        <Button intent="quiet" leadingIcon="clear" onClick={onClear} size="sm">
          Hapus filter
        </Button>
      ) : null}
    </div>
  );
}

function EbookCover({
  book,
  isFavorite,
  onToggleFavorite,
}: {
  book: Ebook;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}) {
  return (
    <div className="ebook-cover-frame">
      <div className="ebook-cover">
        <img alt={`Sampul ${book.title}`} src={book.cover} />
      </div>
      {onToggleFavorite ? (
        <Button
          aria-label={`${isFavorite ? "Hapus" : "Simpan"} ${book.title}`}
          aria-pressed={isFavorite}
          className="ebook-favorite-button"
          intent={isFavorite ? "secondary" : "quiet"}
          leadingIcon="favorite"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
          size="sm"
        />
      ) : null}
    </div>
  );
}

export function EbookStoreCatalog({
  onOpenSettings,
}: {
  onOpenSettings?: () => void;
} = {}) {
  const [query, setQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [category, setCategory] = useState<EbookCategoryFilter>("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [isNarrowViewport, setIsNarrowViewport] = useState(false);
  const [priceRange, setPriceRange] = useState<EbookPriceRange>("all");
  const [availability, setAvailability] = useState<EbookAvailability[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [notice, setNotice] = useState("");
  const pageSize = 8;
  const cartItems = ebooks
    .filter((book) => cart[book.id])
    .map((book) => ({ book, quantity: cart[book.id] }));
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setIsNarrowViewport(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedAuthor = authorQuery.trim().toLowerCase();
    const next = ebooks.filter((book) => {
      const matchesQuery =
        !normalizedQuery ||
        `${book.title} ${book.author} ${book.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesAuthor =
        !normalizedAuthor ||
        book.author.toLowerCase().includes(normalizedAuthor);
      const matchesCategory = category === "all" || book.category === category;
      const matchesAvailability =
        availability.length === 0 || availability.includes(book.availability);
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-80000" && book.price < 80000) ||
        (priceRange === "80000-100000" &&
          book.price >= 80000 &&
          book.price <= 100000) ||
        (priceRange === "over-100000" && book.price > 100000);
      return (
        matchesQuery &&
        matchesAuthor &&
        matchesCategory &&
        matchesAvailability &&
        matchesPrice
      );
    });
    return [...next].sort((left, right) => {
      if (sort === "price-low") return left.price - right.price;
      if (sort === "price-high") return right.price - left.price;
      if (sort === "rating") return right.rating - left.rating;
      return (
        ebooks.findIndex((book) => book.id === left.id) -
        ebooks.findIndex((book) => book.id === right.id)
      );
    });
  }, [authorQuery, availability, category, priceRange, query, sort]);

  const visibleBooks = filteredBooks.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const activeFilterCount =
    (category === "all" ? 0 : 1) +
    (authorQuery ? 1 : 0) +
    (priceRange === "all" ? 0 : 1) +
    availability.length;

  function updateCatalogFilter<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
  }

  function clearCatalogFilters() {
    setAuthorQuery("");
    setAvailability([]);
    setCategory("all");
    setPriceRange("all");
    setQuery("");
    setPage(1);
  }

  function toggleAvailability(value: EbookAvailability) {
    updateCatalogFilter(
      setAvailability,
      availability.includes(value)
        ? availability.filter((item) => item !== value)
        : [...availability, value],
    );
  }

  function addToCart(book: Ebook) {
    setCart((current) => ({
      ...current,
      [book.id]: (current[book.id] ?? 0) + 1,
    }));
    setNotice(`${book.title} ditambahkan ke keranjang.`);
  }

  function setCartQuantity(book: Ebook, quantity: number) {
    setCart((current) => {
      if (quantity <= 0) {
        const next = { ...current };
        delete next[book.id];
        return next;
      }
      return { ...current, [book.id]: quantity };
    });
  }

  const cartPanel = (
    <CartPanel
      actions={
        <>
          <Button intent="secondary">Lihat keranjang</Button>
          <Button leadingIcon="checkout">Checkout</Button>
        </>
      }
      aria-label="Keranjang"
      emptyState={
        <EmptyState
          description="Tambahkan judul dari katalog untuk memulai pesanan."
          icon="cart"
          title="Keranjang masih kosong"
        />
      }
      itemCount={cartCount ? `${cartCount} item pilihan` : undefined}
      summary={
        <div>
          <OrderSummary
            rows={[
              { label: "Subtotal", value: <Price amount={cartSubtotal} /> },
            ]}
            total={<Price amount={cartSubtotal} />}
          />
          <Typography typeRole="caption">
            Pajak dan biaya dihitung saat checkout.
          </Typography>
        </div>
      }
      title="Keranjang"
    >
      {cartItems.map(({ book, quantity }) => (
        <CartLineItem
          key={book.id}
          media={<img alt="" src={book.cover} />}
          meta={book.author}
          onQuantityChange={(nextQuantity) =>
            setCartQuantity(book, nextQuantity)
          }
          onRemove={() => setCartQuantity(book, 0)}
          price={<Price amount={book.price} />}
          quantity={quantity}
          quantityLabel={`Jumlah ${book.title}`}
          removeLabel={`Hapus ${book.title} dari keranjang`}
          title={book.title}
        />
      ))}
    </CartPanel>
  );

  const cartTrigger = (
    <CartTrigger
      aria-label={
        cartCount ? `${cartCount} item di keranjang` : "Buka keranjang"
      }
      count={cartCount}
      intent="quiet"
      label="Keranjang"
      size="sm"
    />
  );

  function toggleFavorite(book: Ebook) {
    const isSaved = favorites.includes(book.id);
    setFavorites((current) =>
      isSaved ? current.filter((id) => id !== book.id) : [...current, book.id],
    );
    setNotice(
      isSaved
        ? `${book.title} dihapus dari daftar simpan.`
        : `${book.title} disimpan untuk dibaca nanti.`,
    );
  }

  const filterProps: EbookCatalogFiltersProps = {
    authorQuery,
    availability,
    category,
    onAuthorQueryChange: (value) => updateCatalogFilter(setAuthorQuery, value),
    onAvailabilityToggle: toggleAvailability,
    onCategoryChange: (value) => updateCatalogFilter(setCategory, value),
    onClear: clearCatalogFilters,
    onPriceRangeChange: (value) => updateCatalogFilter(setPriceRange, value),
    priceRange,
  };

  return (
    <PublicShell
      actions={
        <div className="ebook-store-actions t7-header-actions">
          <Button
            className="ebook-publish-button"
            intent="primary"
            leadingIcon="publisher"
            onClick={() =>
              setNotice(
                "Jalur terbitkan siap dihubungkan ke alur penerbitan Anda.",
              )
            }
            size="sm"
          >
            Terbitkan
          </Button>
          {isNarrowViewport ? (
            <span onClick={() => setCartOpen(true)}>{cartTrigger}</span>
          ) : (
            <Popover
              className="ebook-cart-popover"
              onOpenChange={setCartOpen}
              open={cartOpen}
              side="bottom"
              trigger={cartTrigger}
            >
              {cartPanel}
            </Popover>
          )}
          <Button
            className="ebook-account-button"
            intent="quiet"
            onClick={() =>
              setNotice("Akses akun tetap berada pada storefront pengelola.")
            }
            size="sm"
          >
            Akun
          </Button>
          <IconButton
            icon="settings"
            label="Open settings"
            onClick={onOpenSettings}
            size="md"
          />
        </div>
      }
      brand={
        <div className="ebook-store-brand">
          <span className="reference-brand-mark">
            <T7Icon name="book" size={18} />
          </span>
          <div>
            <Typography as="strong" typeRole="card-title">
              ten4seven UI
            </Typography>
            <Typography as="span" typeRole="caption">
              Toko penerbitan
            </Typography>
          </div>
        </div>
      }
      className="reference-app-shell ebook-app-shell"
      navigationMenu={[
        {
          active: true,
          href: "#ebook-catalog",
          key: "books",
          label: "Buku",
        },
        {
          children: [
            isNarrowViewport
              ? {
                  key: "categories",
                  label: "Kategori",
                  onSelect: () => setFilterDrawerOpen(true),
                }
              : {
                  href: "#ebook-categories",
                  key: "categories",
                  label: "Kategori",
                },
            { href: "#ebook-catalog", key: "collection", label: "Koleksi" },
          ],
          key: "explore",
          label: "Jelajahi",
        },
        {
          key: "collaboration",
          label: "Kolaborasi",
          onSelect: () =>
            setNotice("Kolaborasi menghubungkan penulis, editor, dan pembaca."),
        },
      ]}
    >
      <div className="reference-page ebook-reference" data-profile="commerce">
        <PageHeader
          description="Buku pilihan untuk manajemen, ilmu terapan, dan gagasan yang membantu pekerjaan sehari-hari bergerak maju."
          meta={
            <>
              <Badge tone="primary">
                <T7Icon name="catalog" size={13} />
                {ebooks.length} judul
              </Badge>
              <Typography typeRole="caption">
                Ebook, buku cetak, dan Google Play Books
              </Typography>
            </>
          }
          overline="ten4seven UI · Katalog penerbitan"
          title="Buku untuk ide yang bertahan"
        />

        <div className="ebook-catalog-layout" id="ebook-catalog">
          <aside aria-label="Filter katalog" className="ebook-filter-rail">
            <div className="ebook-filter-rail-heading">
              <div>
                <Typography as="h2" typeRole="heading-sm">
                  Filter buku
                </Typography>
                <Typography typeRole="caption">
                  {activeFilterCount
                    ? `${activeFilterCount} filter aktif`
                    : "Jelajahi koleksi"}
                </Typography>
              </div>
              {activeFilterCount ? (
                <Button intent="quiet" onClick={clearCatalogFilters} size="sm">
                  Hapus
                </Button>
              ) : null}
            </div>
            <EbookCatalogFilters
              {...filterProps}
              categorySectionId="ebook-categories"
            />
          </aside>

          <section
            aria-labelledby="ebook-results-title"
            className="ebook-results"
          >
            <div className="ebook-results-search-row">
              <SearchInput
                aria-label="Cari buku"
                className="ebook-catalog-search"
                label="Cari buku"
                leadingIcon="search"
                onChange={(event) =>
                  updateCatalogFilter(setQuery, event.target.value)
                }
                placeholder="Cari judul, penulis, atau kategori"
                value={query}
              />
              <div className="ebook-results-controls">
                <Button
                  aria-expanded={filterDrawerOpen}
                  className="ebook-mobile-filter-button"
                  intent="secondary"
                  leadingIcon="filter"
                  onClick={() => setFilterDrawerOpen(true)}
                  size="sm"
                >
                  Filter{activeFilterCount ? ` (${activeFilterCount})` : ""}
                </Button>
                <Select
                  className="ebook-compact-select"
                  label="Urutkan"
                  onChange={(event) =>
                    updateCatalogFilter(setSort, event.target.value)
                  }
                  value={sort}
                >
                  <option value="featured">Unggulan</option>
                  <option value="rating">Rating tertinggi</option>
                  <option value="price-low">Harga terendah</option>
                  <option value="price-high">Harga tertinggi</option>
                </Select>
                <div
                  aria-label="Tampilan katalog"
                  className="ebook-view-switch"
                  role="group"
                >
                  <Typography typeRole="caption">Tampilan</Typography>
                  <Button
                    aria-label="Tampilan grid"
                    aria-pressed={view === "grid"}
                    className="ebook-view-button"
                    intent={view === "grid" ? "secondary" : "quiet"}
                    leadingIcon="catalog"
                    onClick={() => setView("grid")}
                    size="sm"
                  >
                    Grid
                  </Button>
                  <Button
                    aria-label="Tampilan daftar"
                    aria-pressed={view === "list"}
                    className="ebook-view-button"
                    intent={view === "list" ? "secondary" : "quiet"}
                    leadingIcon="table"
                    onClick={() => setView("list")}
                    size="sm"
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </div>

            {notice ? (
              <div className="reference-inline-notice" role="status">
                <T7Icon name="check" size={15} />
                <Typography typeRole="caption">{notice}</Typography>
                <Button intent="quiet" onClick={() => setNotice("")} size="sm">
                  Tutup
                </Button>
              </div>
            ) : null}

            <div className="ebook-results-heading">
              <div>
                <Typography
                  as="h2"
                  id="ebook-results-title"
                  typeRole="heading-sm"
                >
                  Buku dalam koleksi
                </Typography>
                <Typography typeRole="body-sm">
                  Edisi dengan informasi format dan akses yang jelas.
                </Typography>
              </div>
              <Typography typeRole="caption">
                {filteredBooks.length} judul
              </Typography>
            </div>

            {visibleBooks.length > 0 ? (
              <ProductGrid
                className="ebook-product-grid"
                data-view={view}
                minCardWidth={172}
              >
                {visibleBooks.map((book) => (
                  <ProductCard
                    actions={
                      <>
                        <Button
                          className="ebook-details-action"
                          intent="quiet"
                          leadingIcon="preview"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedBook(book);
                          }}
                          size="sm"
                        >
                          Lihat detail
                        </Button>
                        <Button
                          className="ebook-primary-action"
                          intent="primary"
                          leadingIcon="cart"
                          onClick={(event) => {
                            event.stopPropagation();
                            addToCart(book);
                          }}
                          size="sm"
                        >
                          Tambah ke keranjang
                        </Button>
                      </>
                    }
                    badge={
                      book.badge ? (
                        <Badge tone="primary">{book.badge}</Badge>
                      ) : null
                    }
                    className="ebook-product-card"
                    details={
                      <ProductMeta
                        className="ebook-product-detail-line"
                        items={[
                          book.availability,
                          <Rating
                            key="rating"
                            label={`Rating ${book.rating} dari 5`}
                            value={book.rating}
                          />,
                        ]}
                      />
                    }
                    eyebrow={book.category}
                    key={book.id}
                    media={
                      <EbookCover
                        book={book}
                        isFavorite={favorites.includes(book.id)}
                        onToggleFavorite={() => toggleFavorite(book)}
                      />
                    }
                    meta={
                      <ProductMeta
                        items={[
                          <>
                            <T7Icon name="author" size={14} /> {book.author}
                          </>,
                        ]}
                      />
                    }
                    onClick={(event) => {
                      if ((event.target as HTMLElement).closest("button"))
                        return;
                      setSelectedBook(book);
                    }}
                    price={<Price amount={book.price} />}
                    title={book.title}
                  />
                ))}
              </ProductGrid>
            ) : (
              <EmptyState
                action={
                  <Button
                    intent="secondary"
                    onClick={clearCatalogFilters}
                    size="sm"
                  >
                    Hapus filter katalog
                  </Button>
                }
                description="Coba judul, penulis, kategori, atau ketersediaan lain."
                icon="book"
                title="Tidak ada buku yang sesuai dengan filter ini"
              />
            )}

            <Pagination
              onPageChange={setPage}
              page={page}
              pageSize={pageSize}
              total={filteredBooks.length}
            />
          </section>
        </div>
      </div>

      <DetailDrawer
        description="Gunakan filter katalog yang sama pada layar sempit."
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        side="left"
        title="Filter buku"
      >
        <EbookCatalogFilters
          {...filterProps}
          categorySectionId="ebook-categories-drawer"
        />
        <div className="ebook-filter-drawer-footer">
          <Button onClick={() => setFilterDrawerOpen(false)}>
            Lihat hasil
          </Button>
        </div>
      </DetailDrawer>

      <DetailDrawer
        className="ebook-cart-drawer"
        description={
          cartCount
            ? `${cartCount} item pilihan · Tinjau item, jumlah, dan subtotal sebelum checkout.`
            : "Tinjau item dan subtotal sebelum checkout."
        }
        onClose={() => setCartOpen(false)}
        open={isNarrowViewport && cartOpen}
        title="Keranjang"
      >
        {cartPanel}
      </DetailDrawer>

      <DetailDrawer
        description={
          selectedBook
            ? `${selectedBook.author} · ${selectedBook.category} · ${selectedBook.availability}`
            : undefined
        }
        onClose={() => setSelectedBook(null)}
        open={Boolean(selectedBook)}
        title={selectedBook?.title ?? "Detail buku"}
      >
        {selectedBook ? (
          <div className="ebook-quick-view">
            <EbookCover
              book={selectedBook}
              isFavorite={favorites.includes(selectedBook.id)}
              onToggleFavorite={() => toggleFavorite(selectedBook)}
            />
            <div className="ebook-quick-copy">
              <Typography as="p" typeRole="body">
                Edisi pilihan dari ten4seven UI untuk pembaca profesional dan
                komunitas belajar.
              </Typography>
              <div className="ebook-quick-facts">
                <span>{selectedBook.availability}</span>
                <span>
                  <T7Icon name="rating" size={13} /> {selectedBook.rating}
                </span>
              </div>
              <Price amount={selectedBook.price} />
            </div>
            <div className="reference-drawer-actions">
              <Button
                leadingIcon="cart"
                onClick={() => addToCart(selectedBook)}
              >
                Tambah ke keranjang
              </Button>
              <Button intent="quiet" onClick={() => setSelectedBook(null)}>
                Tutup detail
              </Button>
            </div>
          </div>
        ) : null}
      </DetailDrawer>
    </PublicShell>
  );
}
