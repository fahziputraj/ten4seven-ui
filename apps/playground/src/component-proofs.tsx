import { useMemo, useState } from "react";

import { T7Icon } from "@ten4seven/icons";

import { AdvancedInteractionProof } from "./advanced-interaction-proof";

import {
  Accordion,
  ActionFooter,
  ActionBar,
  ActivityFeed,
  Alert,
  AlertDialog,
  Banner,
  AppliedFilters,
  ApprovalPanel,
  Avatar,
  AvatarGroup,
  BarChart,
  Badge,
  BuilderCanvas,
  BottomNavigation,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CartLineItem,
  CartPanel,
  ColorPicker,
  CartTrigger,
  CitationList,
  Combobox,
  Container,
  CommandMenu,
  ConversationThread,
  ContextMenu,
  DataTable,
  DatePicker,
  DateRangePicker,
  Dialog,
  DonutChart,
  Drawer,
  DragHandle,
  DropdownMenu,
  EditorSurface,
  EmptyState,
  FileList,
  FilePreview,
  FileUpload,
  FormGrid,
  FormSection,
  IconButton,
  KeyValueList,
  KPICluster,
  LineChart,
  MetricCard,
  MilestoneTracker,
  MultiSelect,
  Modal,
  NavigationRail,
  NotificationCenter,
  OtpInput,
  OrderSummary,
  Popover,
  Price,
  Progress,
  PropertyInspector,
  PromptComposer,
  RangeSlider,
  Rating,
  RecordSummary,
  SectionHeader,
  ScrollArea,
  Select,
  Skeleton,
  SpeedDial,
  Sparkline,
  SplitPane,
  Spinner,
  Stepper,
  StatusChip,
  Switch,
  TagsInput,
  Tabs,
  Textarea,
  TimePicker,
  ToolCallCard,
  Transfer,
  ToastProvider,
  TreeView,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Toolbar,
  TrendIndicator,
  Typography,
  type NotificationItem,
  useToast,
} from "@ten4seven/ui";

function ToastAction() {
  const { toast } = useToast();
  return (
    <Button
      intent="secondary"
      onClick={() =>
        toast({
          description:
            "The toast uses the same semantic surface and live region contract.",
          duration: 4500,
          title: "Notification shown",
          tone: "success",
        })
      }
      size="sm"
    >
      Show toast
    </Button>
  );
}

function OverlayStressFixture() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerDate, setDrawerDate] = useState<string>();
  const [nestedStatus, setNestedStatus] = useState("Ready");
  const [owner, setOwner] = useState("maya");

  return (
    <section
      aria-label="Overlay stress fixture"
      className="overlay-stress-fixture"
      id="component-lab-overlays"
    >
      <SectionHeader
        description="Portals, scroll owners, drawers, and viewport-safe anchors."
        eyebrow="Overlays"
        title="Overlay contracts"
      />
      <div className="overlay-stress-grid">
        <Card data-overlay-fixture="card-select">
          <CardHeader>
            <CardTitle>Card → Select</CardTitle>
          </CardHeader>
          <CardContent>
            <Select label="Fulfillment state" defaultValue="ready">
              <option value="ready">Ready to ship</option>
              <option value="hold">On hold</option>
              <option value="backorder">Backorder</option>
            </Select>
          </CardContent>
        </Card>

        <Card data-overlay-fixture="scroll-combobox">
          <CardHeader>
            <CardTitle>Scroll panel → Combobox</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea
              className="overlay-stress-scroll-panel"
              label="Scrollable combobox panel"
              maxHeight={148}
            >
              <Typography typeRole="caption">
                Popup escapes the scroll owner; keyboard focus stays local.
              </Typography>
              <Combobox
                label="Owner"
                onValueChange={setOwner}
                options={[
                  { label: "Maya Chen", value: "maya" },
                  { label: "Jordan Park", value: "jordan" },
                  { label: "Lin Wu", value: "lin" },
                  { label: "Noor Aziz", value: "noor" },
                ]}
                value={owner}
              />
              <div className="overlay-stress-scroll-copy">
                <span>Scroll owner: panel</span>
                <span>Content continues below</span>
                <span>Focus stays in field</span>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card data-overlay-fixture="drawer-date-picker">
          <CardHeader>
            <CardTitle>Drawer → DatePicker</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-stack">
            <Typography typeRole="body-sm">
              Drawer owns scroll; calendar stays viewport-safe.
            </Typography>
            <Button onClick={() => setDrawerOpen(true)} leadingIcon="sidebar">
              Open date drawer
            </Button>
          </CardContent>
        </Card>

        <Card data-overlay-fixture="edge-anchors">
          <CardHeader>
            <div>
              <CardTitle>Edge anchors</CardTitle>
              <CardDescription>
                Actions stay attached to their edge trigger.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="overlay-stress-edge-stage">
            <div className="overlay-stress-edge-preview">
              <div className="overlay-stress-edge-preview-header">
                <div className="overlay-stress-edge-preview-copy">
                  <Typography typeRole="overline">Anchor playground</Typography>
                  <Typography typeRole="caption">
                    Trigger a viewport-safe layer.
                  </Typography>
                </div>
                <Badge tone="success">
                  <T7Icon aria-hidden="true" name="check" size={12} />
                  Viewport safe
                </Badge>
              </div>
              <div className="overlay-stress-edge-demo">
                <div className="overlay-stress-edge-demo-copy">
                  <Typography typeRole="label">Inline actions</Typography>
                  <Typography typeRole="caption">
                    Portal layer stays independent.
                  </Typography>
                </div>
                <div
                  aria-label="Floating layer examples"
                  className="overlay-stress-edge-row"
                >
                  <Popover
                    side="top"
                    trigger={<Button size="sm">Popover</Button>}
                  >
                    <Typography typeRole="body-sm">
                      Flips and shifts inside the viewport.
                    </Typography>
                  </Popover>
                  <DropdownMenu
                    items={[
                      { icon: "edit", key: "edit", label: "Edit record" },
                      { icon: "view", key: "view", label: "View details" },
                    ]}
                    trigger={
                      <Button intent="secondary" size="sm">
                        Menu
                      </Button>
                    }
                  />
                  <Tooltip
                    content="Supplemental context near the edge"
                    side="top"
                  >
                    <Button intent="quiet" size="sm">
                      Tooltip
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div className="overlay-stress-edge-footer">
                <div className="overlay-stress-edge-footer-copy">
                  <Typography typeRole="label">Corner action</Typography>
                  <Typography typeRole="caption">
                    Menu stays anchored.
                  </Typography>
                </div>
                <div className="overlay-stress-edge-corner">
                  <DropdownMenu
                    items={[
                      { icon: "download", key: "export", label: "Export" },
                    ]}
                    trigger={<IconButton icon="more" label="Edge actions" />}
                  />
                </div>
              </div>
            </div>
            <div
              aria-label="Overlay contracts"
              className="overlay-stress-edge-contracts"
            >
              <span>Flips</span>
              <span>Aligns</span>
              <span>Supplements</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        description="Select and tooltip stay usable inside the modal layer."
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Nested overlay proof"
      >
        <div className="component-proof-stack">
          <Select label="Review outcome" defaultValue="ready">
            <option value="ready">Ready for review</option>
            <option value="changes">Changes requested</option>
            <option value="blocked">Blocked</option>
          </Select>
          <Tooltip content="This hint supplements the visible field label.">
            <Button intent="quiet" leadingIcon="info">
              Need context?
            </Button>
          </Tooltip>
          <div className="modal-proof-actions">
            <Button intent="quiet" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setNestedStatus("Saved");
                setModalOpen(false);
              }}
            >
              Save proof
            </Button>
          </div>
          <Typography aria-live="polite" typeRole="caption">
            {nestedStatus}
          </Typography>
        </div>
      </Modal>

      <Drawer
        description="The drawer is the scroll owner for this compact workflow."
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        title="Set review date"
      >
        <div className="component-proof-stack">
          <DatePicker
            label="Review date"
            onValueChange={setDrawerDate}
            value={drawerDate}
          />
          <Typography typeRole="body-sm">
            Choose a date without leaving the drawer context.
          </Typography>
        </div>
      </Drawer>

      <Button
        className="overlay-stress-modal-trigger"
        intent="secondary"
        onClick={() => setModalOpen(true)}
      >
        Open nested modal fixture
      </Button>
    </section>
  );
}

function SurfaceExpressionFixture() {
  return (
    <section
      aria-label="Canonical surface expression"
      className="surface-expression-fixture"
      id="component-lab-surfaces"
    >
      <SectionHeader
        description="Neutral paper with bounded emphasis where it helps."
        eyebrow="Surfaces"
        title="Surface treatments"
      />
      <div className="surface-expression-grid">
        <Card data-surface-treatment="plain" emphasis="plain">
          <CardHeader>
            <div>
              <CardTitle>Plain baseline</CardTitle>
              <CardDescription>Quiet reading surface.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Typography typeRole="body-sm">
              Default reading surface with neutral separation.
            </Typography>
          </CardContent>
        </Card>
        <MetricCard
          data-surface-treatment="soft"
          description="A non-status customer signal"
          emphasis="soft"
          icon="users"
          title="Soft data accent"
          tone="accent"
          value="3"
        />
        <MetricCard
          className="surface-expression-kpi-card"
          chart={
            <Sparkline
              colorway={2}
              label="Review coverage over the last eight periods"
              values={[62, 66, 65, 71, 75, 73, 82, 87]}
            />
          }
          chartPlacement="inline"
          colorway={2}
          data-surface-treatment="solid"
          description="Rolling 30-day review window"
          emphasis="solid"
          icon="analytics"
          title="Solid KPI signal"
          tone="info"
          trend={
            <TrendIndicator
              context="vs prior"
              direction="up"
              label="Increased 5.2 percent compared with the prior period"
              sentiment="positive"
              value="+5.2%"
              variant="soft"
            />
          }
          value="87%"
        />
        <Card
          className="surface-expression-kpi-card surface-expression-inverse-card"
          data-surface-treatment="inverse"
          emphasis="inverse"
        >
          <CardHeader className="surface-expression-kpi-header">
            <div>
              <CardTitle>Inverse focal surface</CardTitle>
              <CardDescription>One deliberate focus surface.</CardDescription>
            </div>
            <span aria-hidden="true" className="surface-expression-kpi-icon">
              <T7Icon name="check" size={32} />
            </span>
          </CardHeader>
          <CardContent className="surface-expression-inverse-content">
            <Typography typeRole="body-sm">
              Use for one deliberate decision or finish.
            </Typography>
            <Button intent="secondary" size="sm">
              Review decision
            </Button>
          </CardContent>
        </Card>
      </div>
      <KPICluster
        aria-label="Chart-linked surface colorways"
        className="surface-colorway-proof"
        columns={5}
        items={[
          {
            chart: (
              <Sparkline
                colorway={1}
                label="Coverage trend across eight review periods"
                values={[72, 76, 74, 81, 83, 86, 88, 91]}
              />
            ),
            colorway: 1,
            emphasis: "solid",
            icon: "dashboard",
            label: "Coverage",
            note: "Rolling 30 days",
            trend: (
              <TrendIndicator
                context="vs prior"
                direction="up"
                label="Coverage increased 6.2 percent compared with the prior period"
                sentiment="positive"
                value="+6.2%"
                variant="soft"
              />
            ),
            value: "91%",
          },
          {
            colorway: 2,
            emphasis: "solid",
            icon: "analytics",
            label: "Throughput",
            note: "Weekly delivery target",
            progress: <Progress label="Target progress" showValue value={72} />,
            value: "72%",
          },
          {
            chart: (
              <Sparkline
                colorway={3}
                label="Attention queue across eight daily periods"
                values={[22, 24, 21, 19, 20, 17, 16, 14]}
              />
            ),
            colorway: 3,
            emphasis: "solid",
            icon: "rating",
            label: "Attention queue",
            note: "Fewer unresolved signals",
            trend: (
              <TrendIndicator
                context="vs 7d"
                direction="down"
                label="Attention queue decreased 18 percent, which is positive"
                sentiment="positive"
                value="-18%"
                variant="soft"
              />
            ),
            value: "14",
          },
          {
            chart: (
              <Sparkline
                colorway={4}
                label="Cycle time across eight delivery periods"
                values={[2.6, 2.5, 2.7, 2.3, 2.2, 2.1, 2, 1.8]}
              />
            ),
            colorway: 4,
            emphasis: "solid",
            icon: "progress",
            label: "Cycle time",
            note: "Median decision latency",
            trend: (
              <TrendIndicator
                context="vs 30d"
                direction="down"
                label="Cycle time decreased 0.4 days, which is positive"
                sentiment="positive"
                value="-0.4d"
                variant="soft"
              />
            ),
            value: "1.8d",
          },
          {
            colorway: 5,
            emphasis: "solid",
            footer: (
              <Typography typeRole="caption">
                Trend only · 184 qualified leads
              </Typography>
            ),
            icon: "category",
            label: "Conversion",
            note: "Qualified next actions",
            trend: (
              <TrendIndicator
                context="vs 30d"
                direction="up"
                label="Conversion increased 3.1 percent compared with the prior period"
                sentiment="positive"
                value="+3.1%"
                variant="soft"
              />
            ),
            value: "42%",
          },
        ]}
        label="Chart-linked surface colorways"
        variant="cards"
      />
    </section>
  );
}

function Q04CoreLayoutActionsProof() {
  const [split, setSplit] = useState(54);
  const [transferValues, setTransferValues] = useState(["quality"]);
  const [tags, setTags] = useState(["core"]);
  const [color, setColor] = useState("#1f8a5b");
  const [selectedNode, setSelectedNode] = useState("inventory");
  const [navigationValue, setNavigationValue] = useState("overview");
  const [dialNotice, setDialNotice] = useState("No quick action selected");

  return (
    <section
      aria-label="Q04 core layout and action proof"
      className="component-proof-q04"
      id="component-lab-core-layout-actions"
    >
      <SectionHeader
        description="Constrained composition, keyboard-safe utilities, and high-signal actions in one responsive proof."
        eyebrow="Q04 · Core layout & actions"
        title="Core system contracts"
      />
      <div className="component-proof-q04-grid">
        <Card className="component-proof-q04-card">
          <CardHeader>
            <div>
              <CardTitle>Split workspace</CardTitle>
              <CardDescription>
                Resize the two rails with pointer or keyboard input.
              </CardDescription>
            </div>
            <Badge tone="primary">Layout</Badge>
          </CardHeader>
          <CardContent>
            <Container className="component-proof-q04-workspace" size="form">
              <SplitPane
                aria-label="Core workspace split"
                defaultSplit={split}
                minEnd={40}
                minPaneMeasure="compact"
                minStart={40}
                onSplitChange={setSplit}
                separatorLabel="Resize core workspace"
              >
                <div className="component-proof-q04-pane">
                  <Typography typeRole="label">Inventory tree</Typography>
                  <TreeView
                    defaultExpandedIds={["inventory"]}
                    label="Inventory hierarchy"
                    onSelectedIdChange={(id) => setSelectedNode(id ?? "")}
                    selectedId={selectedNode}
                    items={[
                      {
                        children: [
                          { id: "quality", label: "Quality checks" },
                          { id: "shipments", label: "Shipments" },
                        ],
                        id: "inventory",
                        label: "Inventory",
                      },
                      { id: "archive", label: "Archive" },
                    ]}
                  />
                </div>
                <div className="component-proof-q04-pane">
                  <Typography typeRole="label">Selected record</Typography>
                  <FilePreview
                    name={`${selectedNode || "record"}.pdf`}
                    onDownload={() => setDialNotice("Record download queued")}
                    size={184320}
                    status="ready"
                    type="application/pdf"
                  />
                </div>
              </SplitPane>
              <output aria-live="polite" className="component-proof-q04-output">
                {Math.round(split)}% master rail · {selectedNode || "No record"}{" "}
                selected
              </output>
            </Container>
          </CardContent>
        </Card>

        <Card className="component-proof-q04-card">
          <CardHeader>
            <div>
              <CardTitle>Bounded inputs</CardTitle>
              <CardDescription>
                Multi-value controls keep their state and token contracts.
              </CardDescription>
            </div>
            <Badge tone="success">Forms</Badge>
          </CardHeader>
          <CardContent>
            <div className="component-proof-q04-form-stack">
              <Transfer
                label="Review signals"
                onValueChange={setTransferValues}
                options={[
                  {
                    description: "Quality gate",
                    label: "Quality",
                    value: "quality",
                  },
                  {
                    description: "Owner handoff",
                    label: "Ownership",
                    value: "ownership",
                  },
                  {
                    description: "Delivery timing",
                    label: "Schedule",
                    value: "schedule",
                  },
                ]}
                searchable
                value={transferValues}
              />
              <ColorPicker
                hint="Use a semantic color value for the preview only."
                label="Accent preview"
                measure="compact"
                onValueChange={setColor}
                presets={["#1f8a5b", "#167c9c", "#6b35cf"]}
                value={color}
              />
              <TagsInput
                hint="Press Enter to commit a tag."
                label="Applied tags"
                measure="compact"
                onValueChange={setTags}
                value={tags}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="component-proof-q04-card">
          <CardHeader>
            <div>
              <CardTitle>Utility actions</CardTitle>
              <CardDescription>
                Compact actions remain discoverable without adding another
                primitive family.
              </CardDescription>
            </div>
            <Badge tone="warning">Actions</Badge>
          </CardHeader>
          <CardContent>
            <div className="component-proof-q04-action-stack">
              <div className="component-proof-q04-action-row">
                <SpeedDial
                  actions={[
                    {
                      icon: "add",
                      id: "add-check",
                      label: "Add check",
                      onSelect: () => setDialNotice("Add check selected"),
                    },
                    {
                      icon: "view",
                      id: "inspect",
                      label: "Inspect",
                      onSelect: () => setDialNotice("Inspect selected"),
                    },
                  ]}
                  label="Core quick actions"
                />
                <DragHandle label="Reorder core proof" />
              </div>
              <NavigationRail
                expanded
                items={[
                  { icon: "dashboard", key: "overview", label: "Overview" },
                  {
                    icon: "components",
                    key: "components",
                    label: "Components",
                  },
                  { icon: "tokens", key: "tokens", label: "Tokens" },
                ]}
                label="Core navigation rail"
                onValueChange={setNavigationValue}
                value={navigationValue}
              />
              <BottomNavigation
                items={[
                  { icon: "dashboard", key: "overview", label: "Overview" },
                  {
                    icon: "components",
                    key: "components",
                    label: "Components",
                  },
                  { icon: "settings", key: "settings", label: "Settings" },
                ]}
                label="Core bottom navigation"
                onValueChange={setNavigationValue}
                value={navigationValue}
              />
              <Typography aria-live="polite" typeRole="caption">
                {dialNotice}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WorkflowProductivityProof() {
  const [approvalState, setApprovalState] = useState<"pending" | "approved">(
    "pending",
  );
  const [notice, setNotice] = useState("No workflow action selected");
  const [selectedStage, setSelectedStage] = useState("review");
  const [selectedQueueRows, setSelectedQueueRows] = useState<string[]>([]);
  const queueRows = [
    {
      id: "release-queue",
      record: "Release candidate",
      state: "Needs review",
      nextAction: "Confirm release note",
    },
    {
      id: "accessibility-queue",
      record: "Accessibility summary",
      state: "Ready",
      nextAction: "Assign reviewer",
    },
  ];

  return (
    <section
      aria-label="Q09 workflow and productivity proof"
      className="component-proof-q09 component-proof-q10"
      data-contract-plane="workflow-productivity"
      id="component-lab-workflow"
    >
      <SectionHeader
        description="Queues, attention work, board movement, lifecycle, context, and next action stay connected without moving business authority into the library."
        eyebrow="Q09 · Workflow & productivity"
        title="Workflow contracts"
      />
      <div className="component-proof-q10-grid">
        <Card className="component-proof-q10-lifecycle">
          <CardHeader>
            <div>
              <CardTitle>Release lifecycle</CardTitle>
              <CardDescription>
                Select a stage to inspect contextual detail.
              </CardDescription>
            </div>
            <StatusChip icon="timeline" tone="info">
              2 of 3
            </StatusChip>
          </CardHeader>
          <CardContent>
            <MilestoneTracker
              detailMode="drawer"
              items={[
                {
                  description: "Contracts and evidence are linked.",
                  details: (
                    <KeyValueList
                      items={[
                        { label: "Owner", value: "Maya Chen" },
                        { label: "Evidence", value: "8 contracts linked" },
                      ]}
                    />
                  ),
                  id: "mapped",
                  label: "Mapped",
                  meta: "8 contracts linked",
                  percentage: 100,
                  status: "complete",
                },
                {
                  description: "A reviewer is checking the next action.",
                  details: (
                    <KeyValueList
                      items={[
                        { label: "Owner", value: "Jordan Park" },
                        { label: "Next action", value: "Confirm release note" },
                      ]}
                    />
                  ),
                  id: "review",
                  label: "Review",
                  meta: "Needs review",
                  percentage: 68,
                  status: "current",
                },
                {
                  description: "Ready after the review decision is recorded.",
                  details: (
                    <KeyValueList
                      items={[
                        { label: "Owner", value: "Release team" },
                        { label: "State", value: "Waiting on review" },
                      ]}
                    />
                  ),
                  id: "ready",
                  label: "Ready",
                  meta: "Ready to ship",
                  percentage: 0,
                  status: "upcoming",
                },
              ]}
              label="Release lifecycle milestones"
              onSelectedIdChange={setSelectedStage}
              selectedId={selectedStage}
            />
          </CardContent>
        </Card>

        <Card className="component-proof-q09-queue">
          <CardHeader>
            <div>
              <CardTitle>Work queue and inbox boundary</CardTitle>
              <CardDescription>
                Operational records, attention work, and notifications keep
                distinct meanings.
              </CardDescription>
            </div>
            <StatusChip icon="table" tone="info">
              Adaptive collection
            </StatusChip>
          </CardHeader>
          <CardContent>
            <div className="component-proof-q09-queue-model">
              <div data-workflow-role="work-queue">
                <strong>Work queue</strong>
                <Typography typeRole="caption">
                  Records available for operational processing.
                </Typography>
              </div>
              <div data-workflow-role="inbox">
                <strong>Inbox / attention</strong>
                <Typography typeRole="caption">
                  Items that need a person&apos;s review or attention.
                </Typography>
              </div>
              <div data-workflow-role="notification-center">
                <strong>Notification Center</strong>
                <Typography typeRole="caption">
                  Informational history, not an operational queue.
                </Typography>
              </div>
            </div>
            <DataTable
              caption="Work queue records"
              columns={[
                {
                  header: "Record",
                  key: "record",
                  priority: "primary",
                  required: true,
                },
                {
                  header: "State",
                  key: "state",
                  priority: "secondary",
                  render: (row) => (
                    <StatusChip
                      icon={row.state === "Ready" ? "check" : "clock"}
                      tone={row.state === "Ready" ? "success" : "warning"}
                    >
                      {row.state}
                    </StatusChip>
                  ),
                },
                {
                  header: "Next action",
                  key: "nextAction",
                  priority: "secondary",
                },
              ]}
              density="compact"
              onRowClick={(row) =>
                setNotice(`Queue detail requested for ${row.record}`)
              }
              onSelectionChange={setSelectedQueueRows}
              responsive="stacked"
              rowKey={(row) => row.id}
              rowLabel={(row) => row.record}
              rows={queueRows}
              selectable
              selectedRowKeys={selectedQueueRows}
              selectionMode="multiple"
            />
            <Typography typeRole="caption">
              {selectedQueueRows.length > 0
                ? `${selectedQueueRows.length} queue record(s) selected`
                : "Select records for a consumer-owned bulk intent."}
            </Typography>
          </CardContent>
        </Card>

        <Card className="component-proof-q10-context">
          <CardHeader>
            <div>
              <CardTitle>Record context</CardTitle>
              <CardDescription>
                Identity and trace stay readable beside the workflow.
              </CardDescription>
            </div>
            <StatusChip icon="check" tone="success">
              Ready for review
            </StatusChip>
          </CardHeader>
          <CardContent>
            <RecordSummary
              actions={
                <Button
                  intent="secondary"
                  onClick={() => setNotice("Context details opened")}
                  size="sm"
                >
                  Open context
                </Button>
              }
              description="A bounded application record with a consumer-owned next action."
              eyebrow="Release candidate"
              media={<T7Icon aria-hidden="true" name="components" size={22} />}
              metadata={
                <StatusChip icon="clock" tone="neutral">
                  Updated 12 min ago
                </StatusChip>
              }
              title="Component contract review"
            >
              <KeyValueList
                items={[
                  { label: "Owner", value: "Maya Chen" },
                  { label: "Selected stage", value: selectedStage },
                ]}
              />
            </RecordSummary>
            <ActivityFeed
              aria-label="Release activity"
              items={[
                {
                  actor: "Maya Chen",
                  description: "Added the accessibility summary.",
                  icon: "check",
                  id: "summary",
                  meta: "12 min ago",
                  title: "Contract updated",
                },
                {
                  actor: "Jordan Park",
                  description: "Requested a final review decision.",
                  icon: "timeline",
                  id: "review-request",
                  meta: "28 min ago",
                  title: "Review requested",
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="component-proof-q10-actions">
          <CardHeader>
            <div>
              <CardTitle>Actions and decision</CardTitle>
              <CardDescription>
                Pointer affordances keep an explicit keyboard path.
              </CardDescription>
            </div>
            <StatusChip icon="keyboard" tone="neutral">
              Keyboard-safe
            </StatusChip>
          </CardHeader>
          <CardContent>
            <Toolbar
              actions={
                <DragHandle
                  label="Reorder review stage"
                  onClick={() =>
                    setNotice(
                      "Reorder affordance selected; consumer owns the mutation",
                    )
                  }
                />
              }
              label="Workflow actions"
            >
              <Button
                onClick={() => setNotice("Move to next stage requested")}
                size="sm"
              >
                Move to next stage
              </Button>
              <Button
                intent="secondary"
                onClick={() => setNotice("Review details requested")}
                size="sm"
              >
                Review details
              </Button>
            </Toolbar>
            <ApprovalPanel
              actions={
                <Button
                  disabled={approvalState === "approved"}
                  onClick={() => {
                    setApprovalState("approved");
                    setNotice("Approval intent recorded in the local proof");
                  }}
                  size="sm"
                >
                  {approvalState === "approved" ? "Approved" : "Approve review"}
                </Button>
              }
              description="The panel presents a decision boundary; the consumer owns its authority and persistence."
              metadata={
                <StatusChip
                  tone={approvalState === "approved" ? "success" : "warning"}
                >
                  {approvalState === "approved"
                    ? "Decision recorded"
                    : "Decision pending"}
                </StatusChip>
              }
              title="Release decision"
              tone={approvalState === "approved" ? "success" : "warning"}
            />
            <output aria-live="polite" className="component-proof-q10-output">
              {notice}
            </output>
          </CardContent>
        </Card>

        <Card className="component-proof-q09-board">
          <CardHeader>
            <div>
              <CardTitle>Kanban and task board</CardTitle>
              <CardDescription>
                Lanes and cards are generic; movement is an explicit intent, not
                a persistence or DnD engine.
              </CardDescription>
            </div>
            <StatusChip icon="components" tone="neutral">
              Non-DnD path
            </StatusChip>
          </CardHeader>
          <CardContent>
            <div
              aria-label="Kanban board lanes"
              className="component-proof-q09-board-lanes"
              role="region"
            >
              <section
                aria-labelledby="q09-lane-ready"
                className="component-proof-q09-lane"
              >
                <div className="component-proof-q09-lane-header">
                  <Typography as="h3" typeRole="heading-sm">
                    <span id="q09-lane-ready">Ready</span>
                  </Typography>
                  <StatusChip tone="success">1</StatusChip>
                </div>
                <div className="component-proof-q09-board-item" role="listitem">
                  <strong>Accessibility summary</strong>
                  <Typography typeRole="caption">
                    Consumer-defined next action: assign reviewer.
                  </Typography>
                  <Button
                    intent="secondary"
                    onClick={() =>
                      setNotice(
                        "Move intent requested for Accessibility summary",
                      )
                    }
                    size="sm"
                  >
                    Move to review
                  </Button>
                </div>
              </section>
              <section
                aria-labelledby="q09-lane-review"
                className="component-proof-q09-lane"
              >
                <div className="component-proof-q09-lane-header">
                  <Typography as="h3" typeRole="heading-sm">
                    <span id="q09-lane-review">Review</span>
                  </Typography>
                  <StatusChip tone="warning">1</StatusChip>
                </div>
                <div className="component-proof-q09-board-item" role="listitem">
                  <strong>Release candidate</strong>
                  <Typography typeRole="caption">
                    Consumer-defined next action: confirm release note.
                  </Typography>
                  <Button
                    intent="quiet"
                    onClick={() =>
                      setNotice("Review detail requested for Release candidate")
                    }
                    size="sm"
                  >
                    Open detail
                  </Button>
                </div>
              </section>
              <section
                aria-labelledby="q09-lane-done"
                className="component-proof-q09-lane"
              >
                <div className="component-proof-q09-lane-header">
                  <Typography as="h3" typeRole="heading-sm">
                    <span id="q09-lane-done">Done</span>
                  </Typography>
                  <StatusChip tone="info">1</StatusChip>
                </div>
                <div className="component-proof-q09-board-item" role="listitem">
                  <strong>Contract inventory</strong>
                  <Typography typeRole="caption">
                    Completed state is supplied by the consumer.
                  </Typography>
                </div>
              </section>
            </div>
            <Typography typeRole="caption">
              Keyboard and touch users use labelled movement actions; an
              optional drag renderer may add an affordance later.
            </Typography>
          </CardContent>
        </Card>

        <Card className="component-proof-q09-wizard">
          <CardHeader>
            <div>
              <CardTitle>Wizard / sequential process</CardTitle>
              <CardDescription>
                Step presentation is shared; validation and completion stay with
                the consumer.
              </CardDescription>
            </div>
            <StatusChip icon="timeline" tone="info">
              Compact on mobile
            </StatusChip>
          </CardHeader>
          <CardContent>
            <Stepper
              current="review"
              steps={[
                {
                  description: "Collect the supplied context.",
                  id: "context",
                  label: "Context",
                },
                {
                  description: "Review the supplied evidence.",
                  id: "review",
                  label: "Review",
                },
                {
                  description: "Record the consumer decision.",
                  id: "complete",
                  label: "Complete",
                },
              ]}
            />
            <Typography typeRole="caption">
              Wizard is sequential; Lifecycle Tracker is an ordered projection
              of one record&apos;s supplied stages.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function EditorsBuildersAiProof() {
  const [draft, setDraft] = useState(
    "The release note stays in a consumer-owned editor adapter.",
  );
  const [prompt, setPrompt] = useState("Summarize the open review blockers.");
  const [notice, setNotice] = useState("No AI transport is connected.");

  return (
    <section
      aria-label="Q11 editors builders and AI power-user proof"
      className="component-proof-q11"
      id="component-lab-editors-builders-ai"
    >
      <SectionHeader
        description="Reusable advanced shells with explicit engine and authority boundaries."
        eyebrow="Q11 · Editors, builders & AI"
        title="Advanced composition contracts"
      />
      <div className="component-proof-q11-grid">
        <Card className="component-proof-q11-authoring">
          <CardHeader>
            <div>
              <CardTitle>Authoring surfaces</CardTitle>
              <CardDescription>
                Editor and prompt shells keep the adapter outside the library.
              </CardDescription>
            </div>
            <StatusChip icon="edit" tone="success">
              Adapter-ready
            </StatusChip>
          </CardHeader>
          <CardContent>
            <EditorSurface
              content={
                <Textarea
                  label="Release note"
                  onChange={(event) => setDraft(event.target.value)}
                  rows={4}
                  value={draft}
                />
              }
              footer={<Button size="sm">Save draft</Button>}
              language="markdown"
              status="Draft · persistence stays consumer-owned"
              title="Release notes"
              toolbar={
                <StatusChip icon="keyboard" tone="neutral">
                  Cmd S
                </StatusChip>
              }
            />
            <PromptComposer
              attachments={<Badge>2 sources</Badge>}
              onSubmit={(value) =>
                setNotice(`Prompt submitted locally: ${value}`)
              }
              onValueChange={setPrompt}
              status={notice}
              toolbar={
                <StatusChip icon="command" tone="neutral">
                  Enter
                </StatusChip>
              }
              value={prompt}
            />
          </CardContent>
        </Card>

        <Card className="component-proof-q11-builder">
          <CardHeader>
            <div>
              <CardTitle>Builder stage</CardTitle>
              <CardDescription>
                Stage and properties stay separate, bounded, and inspectable.
              </CardDescription>
            </div>
            <StatusChip icon="components" tone="info">
              No engine
            </StatusChip>
          </CardHeader>
          <CardContent>
            <BuilderCanvas
              inspector={
                <PropertyInspector
                  sections={[
                    {
                      content: (
                        <Select label="Density" defaultValue="default">
                          <option value="default">Default</option>
                        </Select>
                      ),
                      id: "layout",
                      title: "Layout",
                    },
                    {
                      content: (
                        <Switch
                          checked
                          label="Visible"
                          onChange={() => undefined}
                        />
                      ),
                      defaultOpen: false,
                      id: "visibility",
                      title: "Visibility",
                    },
                  ]}
                  summary="Selected block"
                />
              }
              status="Selection, drag, and persistence remain consumer-owned"
              title="Release builder"
              toolbar={
                <Button intent="secondary" size="sm">
                  Preview
                </Button>
              }
            >
              <div className="component-proof-q11-stage-card">
                <StatusChip icon="check" tone="success">
                  Selected block
                </StatusChip>
                <Typography as="h3" typeRole="heading-sm">
                  Review summary
                </Typography>
                <Typography typeRole="body-sm">
                  Keyboard and labelled controls remain available beside any
                  pointer affordance.
                </Typography>
              </div>
            </BuilderCanvas>
          </CardContent>
        </Card>

        <Card className="component-proof-q11-ai">
          <CardHeader>
            <div>
              <CardTitle>Conversation evidence</CardTitle>
              <CardDescription>
                Messages, sources, and tool status are presentation contracts.
              </CardDescription>
            </div>
            <StatusChip icon="lock" tone="neutral">
              Consumer authority
            </StatusChip>
          </CardHeader>
          <CardContent>
            <ConversationThread
              aria-label="Release conversation"
              messages={[
                {
                  author: "Maya Chen",
                  content: "The review note is ready for a final check.",
                  id: "user-note",
                  role: "user",
                  status: "complete",
                  timestamp: "09:42",
                },
                {
                  author: "Assistant surface",
                  content:
                    "Two blockers remain; source context is attached below.",
                  id: "assistant-summary",
                  role: "assistant",
                  status: "streaming",
                  timestamp: "Now",
                },
              ]}
            />
            <div className="component-proof-q11-ai-detail">
              <CitationList
                citations={[
                  {
                    excerpt: "Source context remains adjacent to the response.",
                    href: "#component-lab-editors-builders-ai",
                    id: "contract",
                    label: "Advanced surface contract",
                    source: "Local proof",
                  },
                  {
                    excerpt:
                      "Model, credential, and tool policy stay outside Ten4Seven.",
                    id: "boundary",
                    label: "Ownership boundary",
                    source: "Q11",
                  },
                ]}
              />
              <ToolCallCard
                input={<code>{'{"record":"release-42"}'}</code>}
                name="Lookup release"
                output={<code>2 blockers · ready for review</code>}
                status="completed"
                summary="Consumer-owned execution result"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <output aria-live="polite" className="component-proof-q11-output">
        {notice}
      </output>
    </section>
  );
}

function NavigationOverlayFeedbackProof() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [notice, setNotice] = useState("No notification selected.");
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      description: "The nightly operations export is ready for review.",
      id: "u06-export-ready",
      read: false,
      timestamp: "2 min ago",
      title: "Export complete",
      tone: "success",
    },
    {
      description: "One approval is waiting for your decision.",
      id: "u06-approval-requested",
      read: true,
      timestamp: "Yesterday",
      title: "Approval requested",
      tone: "warning",
    },
  ]);
  const markRead = (id: string) =>
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );

  return (
    <Card id="component-lab-navigation-overlay-feedback">
      <CardHeader>
        <div>
          <CardTitle>Navigation, overlays &amp; feedback</CardTitle>
          <CardDescription>
            U06 proves adaptive surfaces, dismissal, focus return, and feedback
            lifecycles.
          </CardDescription>
        </div>
        <Badge tone="success">U06 · live</Badge>
      </CardHeader>
      <CardContent className="component-proof-stack">
        {bannerVisible ? (
          <Banner
            action={
              <Button
                onClick={() => setNotice("Reconnect action selected.")}
                size="sm"
              >
                Reconnect
              </Button>
            }
            description="Updates will resume when the connection is available."
            onDismiss={() => setBannerVisible(false)}
            title="Working offline"
            tone="warning"
          />
        ) : (
          <div className="feedback-proof-dismissed" role="status">
            <Typography typeRole="caption">
              Offline banner dismissed.
            </Typography>
            <Button
              intent="quiet"
              onClick={() => setBannerVisible(true)}
              size="sm"
            >
              Show banner
            </Button>
          </div>
        )}
        <div className="component-proof-actions">
          <Button onClick={() => setDialogOpen(true)}>Open U06 dialog</Button>
          <Button intent="secondary" onClick={() => setSheetOpen(true)}>
            Open bottom sheet
          </Button>
        </div>
        <NotificationCenter
          items={notifications}
          label="U06 notification center"
          onClear={() => setNotifications([])}
          onDismiss={(id) =>
            setNotifications((current) =>
              current.filter((item) => item.id !== id),
            )
          }
          onMarkAllRead={() =>
            setNotifications((current) =>
              current.map((item) => ({ ...item, read: true })),
            )
          }
          onMarkRead={markRead}
          onSelect={(id) => setNotice(`Selected ${id}.`)}
        />
        <output aria-live="polite">{notice}</output>
        <Dialog
          description="Escape and the close action dismiss this focused task."
          onClose={() => setDialogOpen(false)}
          open={dialogOpen}
          title="U06 dialog"
        >
          <Typography typeRole="body-sm">
            Focus returns to the opening control after the dialog closes.
          </Typography>
        </Dialog>
        <Drawer
          description="On narrow surfaces this is the shared sheet presentation."
          onClose={() => setSheetOpen(false)}
          open={sheetOpen}
          side="bottom"
          title="U06 bottom sheet"
        >
          <Typography typeRole="body-sm">
            The intent stays Drawer while presentation adapts to the edge.
          </Typography>
        </Drawer>
      </CardContent>
    </Card>
  );
}

export function ComponentProofs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [actionMode, setActionMode] = useState("review");
  const [commandOpen, setCommandOpen] = useState(false);
  const [note, setNote] = useState("");
  const [switchOn, setSwitchOn] = useState(true);
  const [tags, setTags] = useState<string[]>(["design"]);
  const [team, setTeam] = useState("maya");
  const [date, setDate] = useState<string>();
  const [range, setRange] = useState<{ start?: string; end?: string }>({});
  const [time, setTime] = useState("09:30");
  const [otp, setOtp] = useState("");
  const [rangeValue, setRangeValue] = useState({ max: 84, min: 22 });
  const [files, setFiles] = useState<File[]>([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [lastAction, setLastAction] = useState("No action selected");
  const [commerceNotice, setCommerceNotice] = useState(
    "Cart actions report feedback only after an interaction.",
  );
  const [filters, setFilters] = useState([
    { id: "status", label: "Status: active" },
    { id: "team", label: "Team: Design" },
  ]);
  const fileItems = useMemo(
    () =>
      files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        onRemove: () =>
          setFiles((current) => current.filter((item) => item !== file)),
        size: file.size,
      })),
    [files],
  );
  const fileStateProofItems = [
    ...fileItems,
    {
      id: "queued-contract-proof",
      name: "queued-contract-proof.pdf",
      size: 184000,
      status: "queued" as const,
    },
    {
      id: "retrying-contract-proof",
      name: "retrying-contract-proof.jpg",
      progress: 62,
      size: 912000,
      status: "retrying" as const,
    },
    {
      id: "canceled-contract-proof",
      name: "canceled-contract-proof.png",
      size: 403000,
      status: "canceled" as const,
    },
  ];

  return (
    <section
      aria-label="Component interaction checks"
      className="component-proofs"
    >
      <div
        className="component-proof-grid component-proof-grid-form"
        id="component-lab-forms-feedback"
      >
        <FormSection
          className="component-proof-form-section"
          description="Labels, density, selection, and input states."
          title="Forms"
        >
          <div className="component-proof-form-fields" data-t7-rail="form">
            <FormGrid>
              <Combobox
                label="Owner"
                onValueChange={setTeam}
                options={[
                  {
                    description: "Product design",
                    label: "Maya Chen",
                    value: "maya",
                  },
                  {
                    description: "Operations",
                    label: "Jordan Park",
                    value: "jordan",
                  },
                  {
                    description: "Engineering",
                    label: "Lin Wu",
                    value: "lin",
                  },
                ]}
                value={team}
              />
              <MultiSelect
                label="Workstreams"
                onValueChange={setTags}
                options={[
                  { label: "Design", value: "design" },
                  { label: "Research", value: "research" },
                  { label: "Engineering", value: "engineering" },
                ]}
                values={tags}
              />
              <DatePicker
                label="Review date"
                onValueChange={setDate}
                value={date}
              />
              <TimePicker
                label="Review time"
                onValueChange={(next) => setTime(next ?? "")}
                value={time}
              />
              <DateRangePicker
                label="Planning range"
                onValueChange={setRange}
                value={range}
              />
              <Switch
                checked={switchOn}
                description="Controls whether collaborators receive updates."
                label="Notify collaborators"
                onChange={(event) => setSwitchOn(event.target.checked)}
              />
            </FormGrid>
            <Textarea
              label="Notes"
              onChange={(event) => setNote(event.target.value)}
              placeholder="A short component QA note…"
              value={note}
            />
            <RangeSlider
              label="Confidence range"
              max={100}
              maxValue={rangeValue.max}
              min={0}
              minValue={rangeValue.min}
              onValueChange={setRangeValue}
            />
            <OtpInput
              label="Verification sample"
              onValueChange={setOtp}
              value={otp}
            />
          </div>
        </FormSection>

        <ToastProvider>
          <Card className="component-proof-feedback-card">
            <CardHeader>
              <div>
                <CardTitle>Feedback &amp; actions</CardTitle>
                <CardDescription>
                  Status, actions, and overlays in one flow.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="feedback-proof-content">
              <div className="feedback-proof-grid">
                <section
                  aria-labelledby="feedback-proof-feedback"
                  className="feedback-proof-group"
                >
                  <div className="feedback-proof-group-heading">
                    <Typography
                      as="span"
                      className="feedback-proof-group-title"
                      id="feedback-proof-feedback"
                      typeRole="label"
                    >
                      Feedback
                    </Typography>
                    <Typography typeRole="caption">
                      Status &amp; recovery
                    </Typography>
                  </div>
                  {alertVisible ? (
                    <Alert
                      action={
                        <Button
                          intent="quiet"
                          onClick={() => setLastAction("Review opened")}
                          size="sm"
                        >
                          Review issue
                        </Button>
                      }
                      description="One review decision is needed."
                      onDismiss={() => setAlertVisible(false)}
                      title="Review needed"
                      tone="warning"
                    />
                  ) : (
                    <div className="feedback-proof-dismissed" role="status">
                      <Typography typeRole="caption">
                        Warning dismissed.
                      </Typography>
                      <Button
                        intent="quiet"
                        onClick={() => setAlertVisible(true)}
                        size="sm"
                      >
                        Show alert
                      </Button>
                    </div>
                  )}
                  <AppliedFilters
                    className="feedback-proof-filters"
                    filters={filters}
                    onClear={() => setFilters([])}
                    onRemove={(id) =>
                      setFilters((current) =>
                        current.filter((filter) => filter.id !== id),
                      )
                    }
                  />
                  <ApprovalPanel
                    actions={
                      <Button
                        onClick={() => {
                          setActionMode("approved");
                          setLastAction("Approval recorded");
                        }}
                        size="sm"
                      >
                        Approve request
                      </Button>
                    }
                    description="Decision and next action stay together."
                    metadata={
                      <Typography typeRole="caption">
                        Last action: {lastAction}
                      </Typography>
                    }
                    title="Ready for decision"
                    tone={actionMode === "approved" ? "success" : "default"}
                  />
                </section>

                <section
                  aria-labelledby="feedback-proof-actions"
                  className="feedback-proof-group"
                >
                  <div className="feedback-proof-group-heading">
                    <Typography
                      as="span"
                      className="feedback-proof-group-title"
                      id="feedback-proof-actions"
                      typeRole="label"
                    >
                      Actions
                    </Typography>
                    <Typography typeRole="caption">Primary actions</Typography>
                  </div>
                  <ActionBar
                    className="feedback-proof-action-bar"
                    label="Primary sample actions"
                  >
                    <Button
                      leadingIcon="check"
                      onClick={() => setLastAction("Sample saved")}
                    >
                      Save changes
                    </Button>
                    <Button
                      intent="secondary"
                      onClick={() => setLastAction("Preview opened")}
                    >
                      Preview
                    </Button>
                    <DropdownMenu
                      items={[
                        {
                          icon: "edit",
                          key: "edit",
                          label: "Edit sample",
                          onSelect: () => setLastAction("Edit selected"),
                        },
                        {
                          icon: "delete",
                          intent: "danger",
                          key: "delete",
                          label: "Remove sample",
                          onSelect: () => setLastAction("Remove selected"),
                        },
                      ]}
                      label="More sample actions"
                      trigger={
                        <IconButton icon="more" label="Sample actions" />
                      }
                    />
                  </ActionBar>
                  <div className="feedback-proof-control-row">
                    <ButtonGroup label="Record actions">
                      <Button
                        intent="secondary"
                        onClick={() => setLastAction("Draft saved")}
                        size="sm"
                      >
                        Save draft
                      </Button>
                      <Button
                        intent="quiet"
                        onClick={() => setLastAction("Changes cancelled")}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </ButtonGroup>
                    <ToggleButtonGroup
                      label="Review mode"
                      onValueChange={(value) => {
                        const next = String(value);
                        setActionMode(next);
                        setLastAction(`${next} mode selected`);
                      }}
                      value={actionMode}
                    >
                      <ToggleButton leadingIcon="edit" value="review">
                        Review
                      </ToggleButton>
                      <ToggleButton leadingIcon="check" value="approved">
                        Approved
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <ActionFooter
                    primaryAction={
                      <Button
                        onClick={() => setLastAction("Workflow continued")}
                        size="sm"
                      >
                        Continue
                      </Button>
                    }
                    secondaryActions={
                      <Button
                        intent="quiet"
                        onClick={() => setLastAction("Workflow paused")}
                        size="sm"
                      >
                        Pause
                      </Button>
                    }
                    summary={
                      <Typography typeRole="caption">{lastAction}</Typography>
                    }
                  />
                </section>

                <section
                  aria-labelledby="feedback-proof-overlays"
                  className="feedback-proof-group feedback-proof-overlay-group"
                >
                  <div className="feedback-proof-group-heading">
                    <Typography
                      as="span"
                      className="feedback-proof-group-title"
                      id="feedback-proof-overlays"
                      typeRole="label"
                    >
                      Overlays
                    </Typography>
                    <Typography typeRole="caption">
                      Anchored overlays
                    </Typography>
                  </div>
                  <div className="feedback-proof-overlay-grid">
                    <Popover
                      trigger={
                        <Button intent="secondary" leadingIcon="info" size="sm">
                          Open popover
                        </Button>
                      }
                    >
                      <Typography typeRole="body-sm">
                        Context stays with its trigger.
                      </Typography>
                    </Popover>
                    <Tooltip content="Supplemental context for this action.">
                      <IconButton
                        icon="info"
                        label="More information"
                        size="sm"
                      />
                    </Tooltip>
                    <DropdownMenu
                      items={[
                        {
                          icon: "view",
                          key: "details",
                          label: "View details",
                          onSelect: () => setLastAction("Details selected"),
                        },
                        {
                          icon: "download",
                          key: "export",
                          label: "Export sample",
                          onSelect: () => setLastAction("Export selected"),
                        },
                      ]}
                      label="Overlay actions"
                      trigger={
                        <Button
                          intent="quiet"
                          size="sm"
                          trailingIcon="chevronDown"
                        >
                          Menu
                        </Button>
                      }
                    />
                    <ContextMenu
                      items={[
                        {
                          icon: "edit",
                          key: "edit",
                          label: "Edit context",
                          onSelect: () =>
                            setLastAction("Context edit selected"),
                        },
                      ]}
                    >
                      <Button intent="quiet" leadingIcon="more" size="sm">
                        Context menu
                      </Button>
                    </ContextMenu>
                  </div>
                  <div className="feedback-proof-overlay-actions">
                    <Button
                      intent="secondary"
                      onClick={() => setModalOpen(true)}
                      size="sm"
                    >
                      Open modal
                    </Button>
                    <Button
                      intent="danger"
                      onClick={() => setAlertOpen(true)}
                      size="sm"
                    >
                      Confirm action
                    </Button>
                    <ToastAction />
                    <Button
                      intent="quiet"
                      leadingIcon="command"
                      onClick={() => setCommandOpen(true)}
                      size="sm"
                    >
                      Open command menu
                    </Button>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </ToastProvider>
      </div>

      <div className="component-proof-grid" id="component-lab-data-signals">
        <Card className="component-proof-signals-card">
          <CardHeader>
            <div>
              <CardTitle>Data signals</CardTitle>
              <CardDescription>
                Metrics, ownership, progress, and handoff.
              </CardDescription>
            </div>
            <Badge tone="primary">Local proof</Badge>
          </CardHeader>
          <CardContent className="component-proof-signals-layout">
            <div className="component-proof-signals-primary">
              <div className="component-proof-metrics">
                <MetricCard
                  description="Compared with last period"
                  icon="analytics"
                  title="Review coverage"
                  trend={
                    <TrendIndicator
                      context="vs prior"
                      direction="up"
                      sentiment="positive"
                      value="8.4%"
                      variant="soft"
                    />
                  }
                  value="87%"
                />
                <MetricCard
                  chart={
                    <Sparkline
                      label="Sample delivery trend"
                      values={[4, 6, 5, 9, 8, 12]}
                    />
                  }
                  description="A compact embedded signal"
                  icon="progress"
                  title="Delivery trend"
                  trend={
                    <TrendIndicator
                      context="vs 7d"
                      direction="up"
                      sentiment="positive"
                      value="+3"
                    />
                  }
                  value="12"
                />
              </div>
              <div className="component-proof-progress-block">
                <Progress label="Review completion" showValue value={72} />
                <Typography typeRole="caption">4 of 5 checks ready.</Typography>
              </div>
            </div>
            <div className="component-proof-signal-rail">
              <div className="component-proof-signal-block">
                <div className="component-proof-signal-heading">
                  <Typography typeRole="overline">Ownership</Typography>
                  <span>3 collaborators</span>
                </div>
                <AvatarGroup
                  className="component-proof-owner-group"
                  avatars={[
                    { name: "Maya Chen", size: "md" },
                    { name: "Jordan Park", size: "md" },
                    { name: "Lin Wu", size: "md" },
                  ]}
                />
                <div
                  aria-label="Ownership roster"
                  className="component-proof-owner-list"
                >
                  {[
                    { name: "Maya Chen", role: "Design lead" },
                    { name: "Jordan Park", role: "Delivery owner" },
                    { name: "Lin Wu", role: "Quality partner" },
                  ].map((owner) => (
                    <div className="component-proof-owner" key={owner.name}>
                      <Avatar name={owner.name} size="sm" />
                      <span>
                        <strong>{owner.name}</strong>
                        <small>{owner.role}</small>
                      </span>
                    </div>
                  ))}
                </div>
                <Rating count={48} value={4.6} />
              </div>
              <div className="component-proof-signal-block">
                <Typography typeRole="overline">Loading state</Typography>
                <div className="component-proof-loading-row">
                  <Spinner label="Loading sample" size="sm" />
                  <Skeleton width="7rem" />
                </div>
              </div>
            </div>
            <KeyValueList
              className="component-proof-signal-details"
              items={[
                { label: "State", value: "Ready for review" },
                { label: "Updated", value: "Today" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Files</CardTitle>
              <CardDescription>Client-side handoff.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".pdf,image/*"
              maxFiles={3}
              maxSize={5 * 1024 * 1024}
              onFilesChange={setFiles}
              onReject={() => undefined}
              value={files}
            >
              PDF or image · max 5 MB.
            </FileUpload>
            <FileList files={fileStateProofItems} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Commerce</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-stack">
            <div className="component-proof-commerce-head">
              <div>
                <Typography typeRole="label">Cart interaction</Typography>
                <Typography typeRole="caption">
                  Quantity, removal, summary, and checkout.
                </Typography>
              </div>
              <CartTrigger
                count={cartQuantity}
                label="Cart"
                onClick={() =>
                  setCommerceNotice("Cart opened from the shared trigger.")
                }
              />
            </div>
            <CartPanel
              emptyState={
                <EmptyState
                  action={
                    <Button onClick={() => setCartQuantity(1)}>
                      Add sample item
                    </Button>
                  }
                  description="The surface owns its empty state."
                  title="Cart is empty"
                />
              }
              itemCount={`${cartQuantity} item${cartQuantity === 1 ? "" : "s"}`}
              summary={
                <OrderSummary
                  rows={[
                    {
                      label: "Subtotal",
                      value: (
                        <Price amount={95000 * Math.max(cartQuantity, 1)} />
                      ),
                    },
                  ]}
                  total={<Price amount={95000 * Math.max(cartQuantity, 1)} />}
                />
              }
              actions={
                <Button onClick={() => setCommerceNotice("Checkout ready.")}>
                  Continue to checkout
                </Button>
              }
            >
              {cartQuantity > 0 ? (
                <CartLineItem
                  meta="EPUB · PDF · Editorial sample"
                  onQuantityChange={(nextQuantity) => {
                    setCartQuantity(nextQuantity);
                    setCommerceNotice("Quantity updated.");
                  }}
                  onRemove={() => {
                    setCartQuantity(0);
                    setCommerceNotice("Line item removed.");
                  }}
                  price={<Price amount={95000} />}
                  quantity={cartQuantity}
                  title="Manajemen Strategis"
                />
              ) : null}
            </CartPanel>
            <Typography aria-live="polite" typeRole="caption">
              {commerceNotice}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <Q04CoreLayoutActionsProof />

      <OverlayStressFixture />

      <SurfaceExpressionFixture />

      <div
        className="component-proof-grid component-proof-grid-charts"
        id="component-lab-charts"
      >
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Chart contracts</CardTitle>
              <CardDescription>
                Line, bar, and donut share one SVG contract.
              </CardDescription>
            </div>
            <Badge tone="primary">SVG · interactive</Badge>
          </CardHeader>
          <CardContent className="component-proof-chart-stack">
            <LineChart
              className="component-proof-chart-primary"
              height={190}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              series={[
                {
                  id: "coverage",
                  label: "Coverage",
                  values: [42, 56, 51, 68, 74],
                },
                {
                  id: "quality",
                  label: "Quality",
                  values: [36, 44, 62, 58, 70],
                },
              ]}
              accessibleSummary="Coverage moves from 42% on Monday to 74% on Friday; quality moves from 36% to 70%."
              summary="Coverage and quality."
              title="Coverage trend"
              valueFormatter={(value) => `${Math.round(value)}%`}
            />
            <LineChart
              annotations={[
                {
                  id: "coverage-target",
                  kind: "threshold",
                  label: "Target",
                  tone: "threshold",
                  value: 60,
                },
              ]}
              className="component-proof-chart-partial"
              height={150}
              labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              series={[
                {
                  id: "partial-coverage",
                  label: "Partial coverage",
                  values: [42, null, 51, 68, 74],
                },
              ]}
              accessibleSummary="Partial coverage is 42% on Monday, unavailable on Tuesday, 51% on Wednesday, 68% on Thursday, and 74% on Friday. The target is 60%."
              summary="Missing values stay distinct from zero."
              title="Partial data and threshold"
              valueFormatter={(value) => `${Math.round(value)}%`}
            />
            <BarChart
              height={170}
              data={[
                { label: "A", value: 18 },
                { label: "B", value: 31 },
                { label: "C", value: 24 },
                { label: "D", value: 39 },
              ]}
              accessibleSummary="Segment scores are A 18, B 31, C 24, and D 39."
              summary="Score by segment."
              title="Segment score"
            />
            <BarChart
              className="component-proof-chart-partial"
              data={[
                { label: "Zero", value: 0 },
                { label: "Available", value: 4 },
                { label: "Pending", value: null },
              ]}
              accessibleSummary="Zero is a present value for Zero, Available is 4, and Pending is unavailable."
              summary="Zero and unavailable are separate states."
              title="Zero versus unavailable"
            />
            <DonutChart
              className="component-proof-donut"
              centerLabel={
                <>
                  <strong>100</strong>
                  <small>records</small>
                </>
              }
              segments={[
                { label: "Ready", value: 61 },
                { label: "Review", value: 25 },
                { label: "Blocked", value: 14 },
              ]}
              accessibleSummary="Review state mix totals 100 records: Ready 61, Review 25, and Blocked 14."
              summary="Review-state mix."
              title="Review state mix"
            />
          </CardContent>
        </Card>
      </div>

      <Card id="component-lab-navigation">
        <CardHeader>
          <div>
            <CardTitle>Navigation &amp; disclosure</CardTitle>
            <CardDescription>
              Views, steps, and disclosure keep context close.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="component-proof-stack component-proof-navigation-content">
          <div className="component-proof-navigation-grid">
            <section
              aria-labelledby="component-proof-views-title"
              className="component-proof-navigation-panel"
            >
              <div className="component-proof-subheading">
                <div className="component-proof-subheading-line">
                  <Typography
                    as="h3"
                    id="component-proof-views-title"
                    typeRole="label"
                  >
                    Peer views
                  </Typography>
                  <Badge tone="success">
                    <T7Icon aria-hidden="true" name="check" size={12} />
                    Live lens
                  </Badge>
                </div>
                <Typography typeRole="caption">Switch lens.</Typography>
              </div>
              <Tabs
                className="component-proof-tabs"
                items={[
                  {
                    content: (
                      <div className="component-proof-tab-content">
                        <div className="component-proof-tab-heading">
                          <T7Icon
                            aria-hidden="true"
                            name="timeline"
                            size={16}
                          />
                          <Typography typeRole="label">
                            Current handoff
                          </Typography>
                        </div>
                        <Typography typeRole="body-sm">
                          The selected panel stays connected to its tab.
                        </Typography>
                        <Badge tone="success">
                          <T7Icon aria-hidden="true" name="check" size={12} />
                          Ready for review
                        </Badge>
                      </div>
                    ),
                    id: "summary",
                    label: "Summary",
                  },
                  {
                    content: (
                      <div className="component-proof-tab-content">
                        <Typography typeRole="label">
                          Recent activity
                        </Typography>
                        <Typography typeRole="body-sm">
                          Related updates stay close.
                        </Typography>
                      </div>
                    ),
                    id: "activity",
                    label: "Activity",
                  },
                ]}
              />
            </section>

            <section
              aria-labelledby="component-proof-path-title"
              className="component-proof-path-panel"
            >
              <div className="component-proof-path-heading">
                <div className="component-proof-subheading">
                  <Typography
                    as="h3"
                    id="component-proof-path-title"
                    typeRole="label"
                  >
                    Handoff path
                  </Typography>
                  <Typography typeRole="caption">Three checkpoints.</Typography>
                </div>
                <Badge tone="primary">
                  <T7Icon aria-hidden="true" name="check" size={12} />2 of 3
                </Badge>
              </div>
              <Stepper
                className="component-proof-stepper"
                current="review"
                steps={[
                  {
                    description: "8 contracts linked",
                    id: "draft",
                    label: "Mapped",
                  },
                  {
                    description: "Needs review",
                    id: "review",
                    label: "Review",
                  },
                  {
                    description: "Ready to ship",
                    id: "done",
                    label: "Ready",
                  },
                ]}
              />
            </section>
          </div>

          <section
            aria-labelledby="component-proof-disclosure-title"
            className="component-proof-disclosure-panel"
          >
            <div className="component-proof-subheading">
              <Typography
                as="h3"
                id="component-proof-disclosure-title"
                typeRole="label"
              >
                Bounded disclosure
              </Typography>
              <Typography typeRole="caption">Keep detail close.</Typography>
            </div>
            <Accordion
              className="component-proof-accordion"
              defaultValue="scope"
              items={[
                {
                  content:
                    "Use an accordion for short, related context that belongs to this surface.",
                  id: "scope",
                  title: "What belongs in this panel?",
                },
                {
                  content:
                    "Move longer workflows to a dialog or route so the current context stays easy to scan.",
                  id: "route",
                  title: "When should this move to a route?",
                },
              ]}
            />
          </section>
        </CardContent>
      </Card>

      <NavigationOverlayFeedbackProof />

      <WorkflowProductivityProof />

      <EditorsBuildersAiProof />

      <AdvancedInteractionProof />

      <CommandMenu
        commands={[
          {
            description: "Open component documentation",
            icon: "components",
            id: "components",
            label: "Open components",
            onSelect: () => undefined,
          },
          {
            description: "Open theme controls",
            icon: "theme",
            id: "theme",
            label: "Open Theme Studio",
            onSelect: () => undefined,
          },
        ]}
        onOpenChange={setCommandOpen}
        open={commandOpen}
        shortcut={false}
      />
      <AlertDialog
        confirmLabel="Remove sample"
        description="This only exercises the confirmation contract."
        onClose={() => setAlertOpen(false)}
        onConfirm={() => setAlertOpen(false)}
        open={alertOpen}
        title="Remove this sample?"
      />
      <Dialog
        description="This is a live native dialog with focus restoration."
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        title="Modal proof"
      >
        <div className="t7-alert-dialog-content">
          <Typography typeRole="body-sm">
            This proof exercises the dismissible Dialog contract.
          </Typography>
          <div className="t7-alert-dialog-actions">
            <Button intent="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
