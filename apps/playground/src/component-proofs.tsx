import { useMemo, useState } from "react";

import {
  Accordion,
  ActionBar,
  Alert,
  AlertDialog,
  AppliedFilters,
  AvatarGroup,
  BarChart,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CartLineItem,
  CartPanel,
  CartTrigger,
  Combobox,
  CommandMenu,
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
  SplitButton,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  TimeInput,
  ToastProvider,
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
    >
      <SectionHeader
        description="The same floating contracts are exercised inside cards, bounded scroll regions, drawers, dialogs, and viewport edges."
        eyebrow="Interaction integrity"
        title="Overlay stress fixture"
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
                The popup must escape this bounded scroll owner while the panel
                remains keyboard-scrollable.
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
                <span>Scroll ownership remains explicit.</span>
                <span>Content continues below the field.</span>
                <span>Focus stays inside the combobox.</span>
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
              A modal drawer owns its scroll; the calendar remains
              viewport-safe.
            </Typography>
            <Button onClick={() => setDrawerOpen(true)} leadingIcon="sidebar">
              Open date drawer
            </Button>
          </CardContent>
        </Card>

        <Card data-overlay-fixture="edge-anchors">
          <CardHeader>
            <CardTitle>Edge anchors</CardTitle>
          </CardHeader>
          <CardContent className="overlay-stress-edge-stage">
            <div className="overlay-stress-edge-row">
              <Popover side="top" trigger={<Button size="sm">Popover</Button>}>
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
              <Tooltip content="Supplemental context near the edge" side="top">
                <Button intent="quiet" size="sm">
                  Tooltip
                </Button>
              </Tooltip>
            </div>
            <div className="overlay-stress-edge-corner">
              <DropdownMenu
                items={[{ icon: "download", key: "export", label: "Export" }]}
                trigger={<IconButton icon="more" label="Edge actions" />}
              />
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

export function ComponentProofs() {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
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
    <section className="component-proofs" aria-label="Live component proofs">
      <SectionHeader
        description="Interactive fixtures for the exported contracts. They are intentionally neutral examples, not a third application domain."
        title="Live component proofs"
      />

      <div className="component-proof-grid component-proof-grid-form">
        <Card>
          <CardHeader>
            <CardTitle>Form anatomy and date entry</CardTitle>
          </CardHeader>
          <CardContent>
            <FormSection
              description="Labels, helper text, error space, selection, and numeric controls share token-led density."
              title="Editable sample"
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
                <TimeInput
                  label="Review time"
                  onChange={(event) => setTime(event.target.value)}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback, actions, and overlays</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-stack">
            <Alert
              description="This persistent message uses status semantics and can carry a recovery action."
              title="Review needed"
              tone="warning"
            />
            <AppliedFilters
              filters={filters}
              onClear={() => setFilters([])}
              onRemove={(id) =>
                setFilters((current) =>
                  current.filter((filter) => filter.id !== id),
                )
              }
            />
            <ActionBar>
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
              <Button intent="secondary" onClick={() => setAlertOpen(true)}>
                Confirm action
              </Button>
              <Popover trigger={<Button intent="quiet">Open popover</Button>}>
                <p className="component-proof-popover-copy">
                  Non-modal help remains close to its trigger.
                </p>
              </Popover>
              <Tooltip content="Use a text label as well as this hint.">
                <IconButton icon="info" label="More information" />
              </Tooltip>
              <DropdownMenu
                items={[
                  { icon: "edit", key: "edit", label: "Edit sample" },
                  {
                    icon: "delete",
                    intent: "danger",
                    key: "delete",
                    label: "Remove sample",
                  },
                ]}
                trigger={<IconButton icon="more" label="Sample actions" />}
              />
            </ActionBar>
            <SplitButton
              items={[{ icon: "download", key: "export", label: "Export" }]}
              label="Save sample"
              onClick={() => undefined}
            />
            <ToastProvider>
              <ToastAction />
            </ToastProvider>
            <Button
              intent="quiet"
              onClick={() => setCommandOpen(true)}
              leadingIcon="command"
            >
              Open command menu
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="component-proof-grid">
        <Card>
          <CardHeader>
            <CardTitle>Data, progress, and media signals</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-stack">
            <div className="component-proof-metrics">
              <MetricCard
                change={<TrendIndicator direction="up" value="8.4%" />}
                description="Compared with last period"
                icon="analytics"
                title="Sample coverage"
                value="87%"
              />
              <MetricCard
                change={
                  <Sparkline
                    label="Sample delivery trend"
                    values={[4, 6, 5, 9, 8, 12]}
                  />
                }
                description="A compact embedded signal"
                icon="progress"
                title="Delivery trend"
                value="12"
              />
            </div>
            <Progress label="Review progress" showValue value={72} />
            <div className="component-proof-data-row">
              <AvatarGroup
                avatars={[
                  { name: "Maya Chen" },
                  { name: "Jordan Park" },
                  { name: "Lin Wu" },
                ]}
              />
              <Rating count={48} value={4.6} />
              <Spinner label="Loading sample" size="sm" />
              <Skeleton width="7rem" />
            </div>
            <KeyValueList
              items={[
                { label: "State", value: "Ready for review" },
                { label: "Updated", value: "Today" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Native file selection</CardTitle>
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
              PDF or image, maximum 5 MB each.
            </FileUpload>
            <FileList files={fileItems} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Commerce contracts</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-stack">
            <div className="component-proof-commerce-head">
              <div>
                <Typography typeRole="label">Cart interaction</Typography>
                <Typography typeRole="caption">
                  Shared cart primitives keep quantity, removal, summary, and
                  checkout actions in one recipe-owned flow.
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
                  description="The same surface owns its empty state."
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
                      "Checkout action is ready for the recipe.",
                    )
                  }
                >
                  Continue to checkout
                </Button>
              }
            >
              {cartQuantity > 0 ? (
                <CartLineItem
                  meta="EPUB + PDF · Editorial sample"
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

      <div className="component-proof-grid component-proof-grid-charts">
        <Card>
          <CardHeader>
            <CardTitle>SVG chart contracts</CardTitle>
          </CardHeader>
          <CardContent className="component-proof-chart-stack">
            <LineChart
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
              title="Sample trend"
              valueFormatter={(value) => `${Math.round(value)}%`}
            />
            <BarChart
              data={[
                { label: "A", value: 18 },
                { label: "B", value: 31 },
                { label: "C", value: 24 },
                { label: "D", value: 39 },
              ]}
              title="Sample comparison"
            />
            <DonutChart
              centerLabel="100"
              segments={[
                { label: "Ready", value: 61 },
                { label: "Review", value: 25 },
                { label: "Blocked", value: 14 },
              ]}
              title="Sample distribution"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Navigation and disclosure</CardTitle>
        </CardHeader>
        <CardContent className="component-proof-stack">
          <Tabs
            items={[
              {
                content:
                  "The selected panel is managed with tab and tabpanel semantics.",
                id: "overview",
                label: "Overview",
              },
              {
                content: "Tabs are for peer content, not page navigation.",
                id: "details",
                label: "Details",
              },
            ]}
          />
          <Accordion
            items={[
              {
                content:
                  "Accordion behavior stays within one bounded content group.",
                id: "one",
                title: "What is included?",
              },
              {
                content: "Use a dialog or route for longer workflows.",
                id: "two",
                title: "What is deliberately excluded?",
              },
            ]}
          />
          <Stepper
            current="review"
            steps={[
              { id: "draft", label: "Draft" },
              { id: "review", label: "Review" },
              { id: "done", label: "Done" },
            ]}
          />
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
