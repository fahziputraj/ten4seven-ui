import { useMemo, useState } from "react";

import { brandProfiles } from "@ten4seven/agent/generated";
import {
  ERP_DENSITY_CONTRACT,
  type BrandProfile,
  type BrandProfileId,
  type ErpDensityState,
} from "@ten4seven/contracts";
import { T7Icon } from "@ten4seven/icons";
import {
  ActionFooter,
  ActivityFeed,
  AdvancedDataGrid,
  AppShell,
  ApprovalPanel,
  Badge,
  BarChart,
  BulkActionBar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartPanel,
  DataTable,
  DataTableColumnPicker,
  DetailDrawer,
  DonutChart,
  FilterToolbar,
  FormGrid,
  Input,
  KeyValueList,
  KPICluster,
  LineChart,
  ModuleState,
  PageHeader,
  Pagination,
  RecordSummary,
  RevisionDiff,
  SearchInput,
  SectionNavigation,
  Select,
  StateView,
  StatusChip,
  ThemeScope,
  TrendIndicator,
  Typography,
  type AdvancedDataGridColumn,
  type AdvancedDataGridRowState,
  type DataTableColumn,
  type DataTableSort,
  type StatusTone,
} from "@ten4seven/ui";

import { PlaygroundSidebar, PlaygroundTopbar } from "./playground-chrome";
import { playgroundRoutePaths } from "./playground-routes";

type ErpRecordStatus = "Ready" | "Review" | "Blocked";

type ErpRecord = {
  amount: number;
  id: string;
  owner: string;
  reference: string;
  status: ErpRecordStatus;
  type: "Invoice" | "Receipt" | "Adjustment";
};

type JournalLine = {
  account: string;
  amount: string;
  description: string;
  id: string;
  status: "Ready" | "Review";
};

const profiles = brandProfiles as unknown as Readonly<
  Record<BrandProfileId, BrandProfile>
>;
const erpProfile = profiles["aapm-erp"];

const erpRecords: ErpRecord[] = [
  {
    amount: 18400,
    id: "txn-1042",
    owner: "Maya Chen",
    reference: "JV-260911-1042",
    status: "Review",
    type: "Adjustment",
  },
  {
    amount: 12600,
    id: "txn-1038",
    owner: "Jordan Park",
    reference: "RC-260911-1038",
    status: "Ready",
    type: "Receipt",
  },
  {
    amount: 8420,
    id: "txn-1034",
    owner: "Nadia Putri",
    reference: "IV-260910-1034",
    status: "Blocked",
    type: "Invoice",
  },
  {
    amount: 6720,
    id: "txn-1028",
    owner: "Maya Chen",
    reference: "RC-260910-1028",
    status: "Ready",
    type: "Receipt",
  },
  {
    amount: 4580,
    id: "txn-1024",
    owner: "Dimas Pratama",
    reference: "IV-260909-1024",
    status: "Review",
    type: "Invoice",
  },
  {
    amount: 3120,
    id: "txn-1018",
    owner: "Jordan Park",
    reference: "JV-260909-1018",
    status: "Ready",
    type: "Adjustment",
  },
  {
    amount: 2160,
    id: "txn-1012",
    owner: "Nadia Putri",
    reference: "RC-260908-1012",
    status: "Ready",
    type: "Receipt",
  },
];

const journalLines: JournalLine[] = [
  {
    account: "6100 · Feed expense",
    amount: "11200",
    description: "September feed issue",
    id: "line-1",
    status: "Ready",
  },
  {
    account: "2100 · Supplier payable",
    amount: "11200",
    description: "Offsetting supplier liability",
    id: "line-2",
    status: "Ready",
  },
  {
    account: "7990 · Review variance",
    amount: "0",
    description: "Reserved for consumer review",
    id: "line-3",
    status: "Review",
  },
];

const statusTone: Record<ErpRecordStatus, StatusTone> = {
  Blocked: "danger",
  Ready: "success",
  Review: "warning",
};

const erpSections = [
  { icon: "table", id: "collection", label: "Collection" },
  { icon: "edit", id: "entry", label: "Entry" },
  { icon: "approve", id: "review", label: "Review & trace" },
  { icon: "chart", id: "charts", label: "Operational charts" },
] as const;

function formatAmount(value: number | string) {
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? `$${numeric.toLocaleString("en-US")}` : "—";
}

function statusChip(status: ErpRecordStatus) {
  return (
    <StatusChip
      icon={status === "Ready" ? "check" : "warning"}
      tone={statusTone[status]}
    >
      {status}
    </StatusChip>
  );
}

const recordColumns: DataTableColumn<ErpRecord>[] = [
  {
    header: "Reference",
    key: "reference",
    overflow: "nowrap",
    required: true,
    sortable: true,
    sticky: "left",
    render: (record) => (
      <div className="erp-reference-primary">
        <strong>{record.reference}</strong>
        <span>{record.type}</span>
      </div>
    ),
  },
  { header: "Owner", key: "owner", sortable: true },
  {
    align: "right",
    header: "Amount",
    key: "amount",
    overflow: "nowrap",
    sortable: true,
    render: (record) => formatAmount(record.amount),
  },
  {
    header: "Status",
    key: "status",
    sortable: true,
    render: (record) => statusChip(record.status),
  },
];

const journalColumns: AdvancedDataGridColumn<JournalLine>[] = [
  {
    editor: { type: "text", inputMode: "text" },
    header: "Account",
    key: "account",
    overflow: "nowrap",
    required: true,
  },
  {
    editor: { type: "text" },
    header: "Description",
    key: "description",
    overflow: "clamp",
  },
  {
    align: "right",
    editor: { type: "currency", currency: "USD", min: 0, step: 1 },
    header: "Amount",
    key: "amount",
    overflow: "nowrap",
  },
  {
    editor: {
      options: [
        { label: "Ready", value: "Ready" },
        { label: "Review", value: "Review" },
      ],
      type: "select",
    },
    header: "State",
    key: "status",
    render: (line) => (
      <StatusChip
        icon={line.status === "Ready" ? "check" : "warning"}
        tone={line.status === "Ready" ? "success" : "warning"}
      >
        {line.status}
      </StatusChip>
    ),
  },
];

function compareRecords(
  left: ErpRecord,
  right: ErpRecord,
  sort: DataTableSort,
) {
  const leftValue = left[sort.key as keyof ErpRecord];
  const rightValue = right[sort.key as keyof ErpRecord];
  const comparison =
    typeof leftValue === "number" && typeof rightValue === "number"
      ? leftValue - rightValue
      : String(leftValue).localeCompare(String(rightValue));
  return sort.direction === "asc" ? comparison : -comparison;
}

function nextSort(
  current: DataTableSort | undefined,
  key: string,
): DataTableSort {
  return current?.key === key
    ? { direction: current.direction === "asc" ? "desc" : "asc", key }
    : { direction: "asc", key };
}

function StateCoverage() {
  const states: Array<{
    description: string;
    id: ErpDensityState;
    label: string;
  }> = [
    {
      description: "Skeleton or progress belongs to the consumer route.",
      id: "loading",
      label: "Loading",
    },
    {
      description: "No records is distinct from an unavailable source.",
      id: "empty",
      label: "Empty",
    },
    {
      description: "The source error remains actionable and labelled.",
      id: "error",
      label: "Error",
    },
    {
      description: "The consumer supplies the conflict and recovery path.",
      id: "conflicted",
      label: "Conflict",
    },
    {
      description: "Actions are withheld without hiding readable facts.",
      id: "read-only",
      label: "Read-only",
    },
  ];

  return (
    <Card data-testid="erp-state-coverage">
      <CardHeader>
        <div>
          <CardTitle>State coverage</CardTitle>
          <CardDescription>
            State meaning stays explicit and consumer-owned.
          </CardDescription>
        </div>
        <Badge tone="primary">{states.length} states</Badge>
      </CardHeader>
      <CardContent>
        <div className="erp-state-grid">
          <div className="erp-state-item">
            <StatusChip icon="pending" tone="info">
              Loading
            </StatusChip>
            <Typography typeRole="caption">
              Consumer-supplied progress.
            </Typography>
          </div>
          <StateView
            aria-label="Empty state example"
            state="empty"
            title="No matching records"
            description="Search and filter semantics stay with the collection owner."
          />
          <StateView
            aria-label="Error state example"
            state="error"
            title="Source unavailable"
            description="The consumer supplies retry and fallback meaning."
          />
          <div className="erp-state-item">
            <StatusChip icon="warning" tone="warning">
              Conflict
            </StatusChip>
            <Typography typeRole="caption">
              Two revisions need consumer resolution.
            </Typography>
          </div>
          <ModuleState
            data-testid="erp-read-only-state"
            description="The consumer supplied a read-only presentation for this review surface."
            state="read-only"
            title="Read-only view"
          />
        </div>
        <div className="erp-state-contract-note">
          <T7Icon aria-hidden="true" name="info" size={16} />
          <Typography typeRole="caption">
            {states.map((state) => state.label).join(" · ")} use shared
            presentation vocabulary; no ERP policy is embedded here.
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

function RecordDetail({
  record,
  onClose,
}: {
  onClose: () => void;
  record: ErpRecord;
}) {
  return (
    <DetailDrawer
      description="Consumer-supplied transaction facts and trace; no posting or reconciliation is performed."
      onClose={onClose}
      open
      title={record.reference}
    >
      <div className="erp-detail-stack">
        <RecordSummary
          description={`${record.type} · ${record.owner}`}
          eyebrow="Transaction record"
          media={
            <span className="erp-detail-icon">
              <T7Icon aria-hidden="true" name="invoice" size={22} />
            </span>
          }
          metadata={statusChip(record.status)}
          title={record.reference}
        />
        <KeyValueList
          aria-label="Transaction facts"
          items={[
            { label: "Amount", value: formatAmount(record.amount) },
            { label: "Owner", value: record.owner },
            { label: "Source", value: "Reference fixture" },
            { label: "Freshness", value: "As supplied · Sep 11" },
          ]}
        />
        <ActivityFeed
          aria-label="Transaction activity"
          items={[
            {
              actor: record.owner,
              description: "Opened the record for bounded review.",
              icon: "view",
              id: `${record.id}-opened`,
              meta: "Today · 09:42",
              title: "Review opened",
            },
            {
              actor: "Reference fixture",
              description: "Record remains local and read-only.",
              icon: "timeline",
              id: `${record.id}-source`,
              meta: "Today · 09:40",
              title: "Source context retained",
            },
          ]}
        />
        <RevisionDiff
          actor={record.owner}
          evidence={`${record.reference} · fixture evidence`}
          items={[
            {
              after: record.status,
              before: "Pending review",
              change: "changed",
              label: "Review state",
            },
            {
              after: formatAmount(record.amount),
              change: "added",
              label: "Amount presented",
            },
          ]}
          reason="Reference review context"
        />
      </div>
    </DetailDrawer>
  );
}

export interface ErpDataDenseReferenceProps {
  onNavigatePath?: (path: string) => void;
  onOpenSettings?: () => void;
}

/**
 * A compact, fixture-only reference for the Q08 ERP density contract. It
 * exercises existing canonical components rather than creating an ERP UI
 * primitive or owning domain data, validation, persistence, or authority.
 */
export function ErpDataDenseReference({
  onNavigatePath,
  onOpenSettings,
}: ErpDataDenseReferenceProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ErpRecordStatus>("all");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<DataTableSort>({
    direction: "desc",
    key: "amount",
  });
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () => Object.fromEntries(recordColumns.map((column) => [column.key, true])),
  );
  const [detailRecord, setDetailRecord] = useState<ErpRecord>();
  const [lines, setLines] = useState(journalLines);
  const [lineStates, setLineStates] = useState<
    Record<string, AdvancedDataGridRowState>
  >({
    "line-1": "clean",
    "line-2": "clean",
    "line-3": "error",
  });
  const [formSaved, setFormSaved] = useState(false);
  const [formAccount, setFormAccount] = useState("1100 · Cash clearing");
  const [activeSection, setActiveSection] =
    useState<(typeof erpSections)[number]["id"]>("collection");

  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return erpRecords
      .filter((record) => status === "all" || record.status === status)
      .filter((record) =>
        normalized
          ? [record.reference, record.owner, record.type, record.status].some(
              (value) => value.toLowerCase().includes(normalized),
            )
          : true,
      )
      .sort((left, right) => compareRecords(left, right, sort));
  }, [query, sort, status]);
  const pageSize = 5;
  const pagedRecords = filteredRecords.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function updateSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateStatus(value: string) {
    setStatus(value as "all" | ErpRecordStatus);
    setPage(1);
  }

  function updateLine(rowKey: string, columnKey: string, value: string) {
    setLines((current) =>
      current.map((line) =>
        line.id === rowKey
          ? ({ ...line, [columnKey]: value } as JournalLine)
          : line,
      ),
    );
    setLineStates((current) => ({ ...current, [rowKey]: "dirty" }));
  }

  function selectSection(section: (typeof erpSections)[number]["id"]) {
    setActiveSection(section);
    document.getElementById(`erp-${section}`)?.scrollIntoView({
      block: "start",
    });
  }

  const sidebar = (
    <PlaygroundSidebar
      activePath={playgroundRoutePaths["ERP Density Reference"]}
      localNavigation={[
        {
          key: "erp-density",
          label: "ERP density",
          items: erpSections.map((section) => ({
            active: section.id === activeSection,
            icon: section.icon,
            key: section.id,
            label: section.label,
            onSelect: () => selectSection(section.id),
          })),
        },
      ]}
      footer={
        <Typography typeRole="caption">
          Reference fixture · no ERP authority
        </Typography>
      }
      label="ERP density reference navigation"
      onNavigatePath={onNavigatePath ?? (() => undefined)}
    />
  );

  return (
    <ThemeScope
      className="erp-reference-theme-scope"
      data-brand-profile="aapm-erp"
      data-testid="erp-reference-theme-scope"
      preferences={{ density: erpProfile.density }}
      theme={erpProfile.themeRecipe}
    >
      <AppShell
        className="reference-app-shell erp-reference-shell"
        contentWidth="wide"
        data-shell-contract="reference-shell"
        data-shell-variant="wide"
        navigationLabel="ERP density reference navigation"
        sidebar={sidebar}
        stickyHeader
        topbar={
          <PlaygroundTopbar
            activeRoute="ERP Density Reference"
            breadcrumbItems={[{ label: "ERP Density Reference" }]}
            onNavigatePath={onNavigatePath ?? (() => undefined)}
            onOpenSettings={onOpenSettings}
            settingsLabel="Open reference theme settings"
            showBack={Boolean(onNavigatePath)}
          />
        }
      >
        <div
          className="erp-reference"
          data-contract={ERP_DENSITY_CONTRACT.id}
          data-testid="erp-data-dense-reference"
        >
          <PageHeader
            actions={
              <>
                <Button
                  intent="secondary"
                  leadingIcon="table"
                  onClick={() => onNavigatePath?.("/recipes/entity-list")}
                  size="sm"
                >
                  Inspect collection recipe
                </Button>
                <Button
                  intent="quiet"
                  leadingIcon="settings"
                  onClick={onOpenSettings}
                  size="sm"
                >
                  Theme settings
                </Button>
              </>
            }
            className="erp-reference-header"
            description="A bounded proof of dense records, transaction entry, review, trace, and operational charts."
            meta={
              <>
                <Badge tone="primary">ERP / data-dense</Badge>
                <Typography typeRole="caption">
                  Static reference fixture · no production authority
                </Typography>
              </>
            }
            overline="Ecosystem readiness · Q08"
            title="ERP density reference"
          />

          <SectionNavigation
            items={[
              { id: "erp-collection", label: "Collection" },
              { id: "erp-entry", label: "Entry" },
              { id: "erp-review", label: "Review & trace" },
              { id: "erp-charts", label: "Operational charts" },
            ]}
            label="ERP density sections"
            sticky
          />

          <KPICluster
            columns={3}
            items={[
              {
                colorway: 1,
                emphasis: "solid",
                icon: "table",
                label: "Records in view",
                note: "Searchable fixture collection",
                value: filteredRecords.length,
              },
              {
                colorway: 2,
                emphasis: "solid",
                icon: "payment",
                label: "Review amount",
                note: "Consumer-defined time window",
                trend: (
                  <TrendIndicator
                    context="vs prior"
                    direction="up"
                    value="4.8%"
                  />
                ),
                value: "$18.4k",
              },
              {
                colorway: 3,
                emphasis: "solid",
                icon: "check",
                label: "Ready to post",
                note: "Presentation only",
                value: "61%",
              },
            ]}
            label="ERP operational summary"
            variant="cards"
          />

          <section className="erp-reference-section" id="erp-collection">
            <div className="erp-reference-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Collection
                </Typography>
                <Typography typeRole="body-sm">
                  Comparable records with explicit query, selection, pagination,
                  and detail behavior.
                </Typography>
              </div>
              <StatusChip icon="table" tone="info">
                DataTable · compact
              </StatusChip>
            </div>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Transaction register</CardTitle>
                  <CardDescription>
                    Sticky reference column, sortable values, and bounded
                    horizontal overflow.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <FilterToolbar
                  actions={
                    <DataTableColumnPicker
                      aria-label="ERP table columns"
                      columns={recordColumns}
                      onVisibilityChange={setVisibleColumns}
                      visibility={visibleColumns}
                    />
                  }
                  className="erp-filter-row"
                  summary={`${filteredRecords.length} matches`}
                  title="Search and filter"
                >
                  <SearchInput
                    aria-label="Search ERP records"
                    label="Search records"
                    onChange={(event) => updateSearch(event.target.value)}
                    placeholder="Reference, owner, type…"
                    value={query}
                  />
                  <Select
                    label="Status"
                    onChange={(event) => updateStatus(event.target.value)}
                    value={status}
                  >
                    <option value="all">All states</option>
                    <option value="Ready">Ready</option>
                    <option value="Review">Review</option>
                    <option value="Blocked">Blocked</option>
                  </Select>
                </FilterToolbar>
                <BulkActionBar
                  actions={
                    <Button intent="secondary" leadingIcon="export" size="sm">
                      Export selection
                    </Button>
                  }
                  onClear={() => setSelectedKeys([])}
                  reserveSpace
                  selectedCount={selectedKeys.length}
                />
                <DataTable
                  caption="ERP transaction register"
                  columnVisibility={visibleColumns}
                  columns={recordColumns}
                  data-testid="erp-record-table"
                  density="compact"
                  emptyMessage="No records match the current query."
                  onRowClick={setDetailRecord}
                  onSelectionChange={setSelectedKeys}
                  onSort={(key) => setSort((current) => nextSort(current, key))}
                  responsive="scroll"
                  rowKey={(record) => record.id}
                  rows={pagedRecords}
                  selectable
                  selectedRowKeys={selectedKeys}
                  sort={sort}
                />
                <Pagination
                  label="ERP register pagination"
                  onPageChange={setPage}
                  page={page}
                  pageSize={pageSize}
                  total={filteredRecords.length}
                />
              </CardContent>
            </Card>
          </section>

          <section className="erp-reference-section" id="erp-entry">
            <div className="erp-reference-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Entry
                </Typography>
                <Typography typeRole="body-sm">
                  Use the smallest canonical editor that preserves validation
                  and ownership boundaries.
                </Typography>
              </div>
              <StatusChip icon="edit" tone="info">
                Bounded edit
              </StatusChip>
            </div>
            <div className="erp-entry-grid">
              <Card>
                <CardHeader>
                  <div>
                    <CardTitle>Journal line editor</CardTitle>
                    <CardDescription>
                      AdvancedDataGrid is limited to typed repeated rows and
                      consumer-owned row state.
                    </CardDescription>
                  </div>
                  <Badge tone="warning">1 needs attention</Badge>
                </CardHeader>
                <CardContent>
                  <AdvancedDataGrid
                    caption="Journal line editor"
                    cellErrors={{
                      "line-3": {
                        amount: "Amount must be reviewed before save.",
                      },
                    }}
                    columns={journalColumns}
                    density="compact"
                    footer={
                      <Typography typeRole="caption">
                        Totals and persistence remain outside this component
                        contract.
                      </Typography>
                    }
                    onCellChange={updateLine}
                    onRowCancel={(line) =>
                      setLineStates((current) => ({
                        ...current,
                        [line.id]: "clean",
                      }))
                    }
                    onRowSave={(line) =>
                      setLineStates((current) => ({
                        ...current,
                        [line.id]: "saved",
                      }))
                    }
                    rowKey={(line) => line.id}
                    rowLabel={(line) => line.account}
                    rowState={lineStates}
                    rows={lines}
                  />
                </CardContent>
              </Card>
              <Card data-testid="erp-form-density">
                <CardHeader>
                  <div>
                    <CardTitle>Bounded transaction form</CardTitle>
                    <CardDescription>
                      FormGrid stays readable when a line editor would be
                      excessive.
                    </CardDescription>
                  </div>
                  <T7Icon aria-hidden="true" name="edit" size={21} />
                </CardHeader>
                <CardContent>
                  <FormGrid columns={2} data-t7-rail="form">
                    <Input
                      error={formAccount ? undefined : "Account is required."}
                      label="Account"
                      onChange={(event) => {
                        setFormAccount(event.target.value);
                        setFormSaved(false);
                      }}
                      value={formAccount}
                    />
                    <Select label="Entry state" defaultValue="Review">
                      <option value="Review">Needs review</option>
                      <option value="Ready">Ready</option>
                    </Select>
                    <Input label="Reference" defaultValue="JV-260911-1042" />
                    <Input
                      label="Amount"
                      inputMode="decimal"
                      defaultValue="18400"
                    />
                  </FormGrid>
                  <ActionFooter
                    primaryAction={
                      <Button
                        leadingIcon="check"
                        onClick={() => setFormSaved(true)}
                        size="sm"
                      >
                        Save fixture entry
                      </Button>
                    }
                    secondaryActions={
                      <Button
                        intent="quiet"
                        onClick={() => setFormSaved(false)}
                        size="sm"
                      >
                        Reset
                      </Button>
                    }
                    summary={
                      formSaved ? (
                        <StatusChip icon="check" tone="success">
                          Fixture entry ready
                        </StatusChip>
                      ) : (
                        <Typography typeRole="caption">
                          Validation and persistence are consumer-owned.
                        </Typography>
                      )
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="erp-reference-section" id="erp-review">
            <div className="erp-reference-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Review & trace
                </Typography>
                <Typography typeRole="body-sm">
                  Evidence, decision boundary, activity, revision context, and
                  state coverage remain separate but related.
                </Typography>
              </div>
              <StatusChip icon="timeline" tone="warning">
                Consumer decision
              </StatusChip>
            </div>
            <div className="erp-review-grid">
              <ApprovalPanel
                actions={
                  <div className="erp-approval-actions">
                    <Button intent="secondary" leadingIcon="view" size="sm">
                      Review evidence
                    </Button>
                    <Button leadingIcon="approve" size="sm">
                      Approve fixture
                    </Button>
                  </div>
                }
                data-testid="erp-approval-panel"
                description="The consumer supplies the disposition, reason, permission, and audit submission."
                metadata={
                  <StatusChip icon="warning" tone="warning">
                    Decision required
                  </StatusChip>
                }
                title="Journal adjustment needs review"
                tone="warning"
              />
              <StateCoverage />
            </div>
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Trace for JV-260911-1042</CardTitle>
                  <CardDescription>
                    Audit and revision components present the facts; they do not
                    create an audit authority.
                  </CardDescription>
                </div>
                <Badge tone="neutral">Read-only trace</Badge>
              </CardHeader>
              <CardContent>
                <div className="erp-trace-grid">
                  <RevisionDiff
                    actor="Maya Chen · Finance"
                    evidence="JV-260911-1042 · local fixture"
                    items={[
                      {
                        after: "$18,400",
                        before: "$17,600",
                        change: "changed",
                        context: "USD",
                        label: "Adjustment amount",
                      },
                      {
                        after: "Review",
                        change: "added",
                        label: "Review state",
                      },
                    ]}
                    reason="Variance requires evidence review"
                  />
                  <ActivityFeed
                    aria-label="Journal adjustment activity"
                    items={[
                      {
                        actor: "Maya Chen",
                        description: "Submitted the adjustment for review.",
                        icon: "edit",
                        id: "erp-trace-1",
                        meta: "Sep 11 · 09:42",
                        title: "Adjustment submitted",
                      },
                      {
                        actor: "Reference fixture",
                        description:
                          "Validation state remains local and deterministic.",
                        icon: "check",
                        id: "erp-trace-2",
                        meta: "Sep 11 · 09:40",
                        title: "Fixture loaded",
                      },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="erp-reference-section" id="erp-charts">
            <div className="erp-reference-section-heading">
              <div>
                <Typography as="h2" typeRole="heading-lg">
                  Operational charts
                </Typography>
                <Typography typeRole="body-sm">
                  Named questions use shared chart geometry, colorway, motion,
                  and tooltip tokens.
                </Typography>
              </div>
              <StatusChip icon="chart" tone="info">
                Chart contracts
              </StatusChip>
            </div>
            <div className="erp-chart-grid">
              <ChartPanel
                chart={
                  <LineChart
                    ariaLabel="Posting volume and review amount by day"
                    labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
                    series={[
                      {
                        id: "posting-volume",
                        label: "Posting volume",
                        values: [38, 46, 42, 61, 67],
                      },
                      {
                        id: "review-amount",
                        label: "Review amount",
                        values: [24, 31, 28, 45, 39],
                      },
                    ]}
                  />
                }
                description="How much work entered review?"
                title="Posting volume by day"
              />
              <ChartPanel
                chart={
                  <BarChart
                    ariaLabel="Records by processing state"
                    data={[
                      { label: "Ready", value: 61 },
                      { label: "Review", value: 25 },
                      { label: "Blocked", value: 14 },
                    ]}
                  />
                }
                description="Which state needs the next action?"
                title="Processing state"
              />
              <ChartPanel
                chart={
                  <DonutChart
                    ariaLabel="Review state distribution"
                    centerLabel={
                      <>
                        <strong>100</strong>
                        <span>records</span>
                      </>
                    }
                    segments={[
                      { label: "Ready", value: 61 },
                      { label: "Review", value: 25 },
                      { label: "Blocked", value: 14 },
                    ]}
                  />
                }
                description="Distribution remains labelled beside the visual."
                title="Review state mix"
              />
            </div>
          </section>

          {detailRecord ? (
            <RecordDetail
              onClose={() => setDetailRecord(undefined)}
              record={detailRecord}
            />
          ) : null}
        </div>
      </AppShell>
    </ThemeScope>
  );
}
