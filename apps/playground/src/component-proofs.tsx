import { useMemo, useState } from "react";

import { T7Icon } from "@ten4seven/icons";

import {
  Accordion,
  ActionFooter,
  ActionBar,
  Alert,
  AlertDialog,
  AppliedFilters,
  ApprovalPanel,
  Avatar,
  AvatarGroup,
  BarChart,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CartLineItem,
  CartPanel,
  CartTrigger,
  Combobox,
  CommandMenu,
  ContextMenu,
  DatePicker,
  DateRangePicker,
  DonutChart,
  Drawer,
  DropdownMenu,
  EmptyState,
  FileList,
  FileUpload,
  FormGrid,
  FormSection,
  IconButton,
  KeyValueList,
  KPICluster,
  LineChart,
  MetricCard,
  MultiSelect,
  Modal,
  OtpInput,
  OrderSummary,
  Popover,
  Price,
  Progress,
  RangeSlider,
  Rating,
  SectionHeader,
  ScrollArea,
  Select,
  Skeleton,
  Sparkline,
  Spinner,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TimePicker,
  ToastProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  TrendIndicator,
  Typography,
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
                  <Typography typeRole="caption">Menu stays anchored.</Typography>
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
              <CardDescription>
                Quiet reading surface.
              </CardDescription>
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
            <span
              aria-hidden="true"
              className="surface-expression-kpi-icon"
            >
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
                    <Typography typeRole="caption">
                      Primary actions
                    </Typography>
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
                <Typography typeRole="caption">
                  4 of 5 checks ready.
                </Typography>
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
                <div aria-label="Ownership roster" className="component-proof-owner-list">
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
              <CardDescription>
                Client-side handoff.
              </CardDescription>
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
            <FileList files={fileItems} />
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
                <Button
                  onClick={() =>
                    setCommerceNotice(
                      "Checkout ready.",
                    )
                  }
                >
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
              summary="Coverage and quality."
              title="Coverage trend"
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
              summary="Score by segment."
              title="Segment score"
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
                  <Typography typeRole="caption">
                    Three checkpoints.
                  </Typography>
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
              <Typography typeRole="caption">
                Keep detail close.
              </Typography>
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
      <AlertDialog
        confirmLabel="Close"
        description="This is a live native dialog with focus restoration."
        onClose={() => setModalOpen(false)}
        onConfirm={() => setModalOpen(false)}
        open={modalOpen}
        title="Modal proof"
      />
    </section>
  );
}
