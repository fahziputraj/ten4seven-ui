import { useState, type ReactNode } from "react";

import { IconNames, T7Icon, type IconName } from "@ten4seven/icons";
import {
  ActivityFeed,
  Accordion,
  ActionFooter,
  AppShell,
  Alert,
  AlertDialog,
  AppliedFilters,
  ApprovalPanel,
  AspectRatio,
  AvatarGroup,
  BarChart,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CartLineItem,
  CartPanel,
  CartTrigger,
  ChartLegend,
  Checkbox,
  CheckboxGroup,
  CircularProgress,
  Collapsible,
  Combobox,
  CommandMenu,
  ContextMenu,
  DataTable,
  DatePicker,
  DateRangePicker,
  DateTimeInput,
  DetailDrawer,
  DonutChart,
  Drawer,
  DropdownMenu,
  EmptyState,
  Field,
  FieldGroup,
  FileItem,
  FileList,
  FileUpload,
  FilterDrawer,
  FilterToolbar,
  FormActions,
  FormGrid,
  FormSection,
  IconButton,
  Image,
  Input,
  KeyValueList,
  KPICluster,
  LineChart,
  MediaFrame,
  MetricCard,
  MilestoneTracker,
  Modal,
  MobileSidebar,
  MultiSelect,
  NavigationMenu,
  NativeTimeInput,
  NativeSelect,
  NumberInput,
  OtpInput,
  OrderSummary,
  PageHeader,
  Panel,
  Pagination,
  Popover,
  Price,
  ProductCard,
  ProductMeta,
  ProductGrid,
  Progress,
  QuantityControl,
  Radio,
  RadioGroup,
  RangeSlider,
  Rating,
  RecordSummary,
  ScrollArea,
  Section,
  SectionHeader,
  Select,
  Separator,
  Sidebar,
  Slider,
  Skeleton,
  Spinner,
  SplitButton,
  StateView,
  StatusChip,
  Stepper,
  Surface,
  Switch,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  TimePicker,
  TimeInput,
  Toast,
  Toaster,
  ToggleButton,
  ToggleButtonGroup,
  ToastProvider,
  Toolbar,
  Tooltip,
  TrendIndicator,
  Typography,
} from "@ten4seven/ui";

import {
  categoryLabels,
  componentFamilyDefinitions,
  type ComponentContract,
} from "./catalog-model";

const previewRows = [
  {
    detail: "Receiving dock 04 · 09:42",
    label: "Inbound shipment",
    tone: "success" as const,
  },
  {
    detail: "North Dock · A-14-03",
    label: "Stock count updated",
    tone: "info" as const,
  },
  {
    detail: "Needs review today",
    label: "Low stock threshold",
    tone: "warning" as const,
  },
  {
    detail: "Last synced Aug 26, 2026",
    label: "Inventory snapshot",
    tone: "neutral" as const,
  },
];

const sampleOptions = [
  { label: "Ready", value: "ready" },
  { label: "In review", value: "review" },
  { label: "Blocked", value: "blocked" },
];

function PreviewFrame({
  children,
  component,
  icon,
}: {
  children: ReactNode;
  component: ComponentContract;
  icon: IconName;
}) {
  return (
    <div className="catalog-contract-preview">
      <header className="catalog-contract-preview-header">
        <div className="catalog-contract-preview-heading">
          <span className="catalog-contract-preview-icon">
            <T7Icon aria-hidden="true" name={icon} size={19} />
          </span>
          <div>
            <Typography as="strong" typeRole="label">
              {component.displayName}
            </Typography>
            <Typography typeRole="caption">
              Canonical{" "}
              {categoryLabels[component.category] ?? component.category} fixture
            </Typography>
          </div>
        </div>
        <StatusChip icon="check" tone="success">
          Ready
        </StatusChip>
      </header>
      {children}
    </div>
  );
}

function PreviewRows() {
  return (
    <div className="catalog-preview-row-list">
      {previewRows.map((row) => (
        <div className="catalog-preview-row" key={row.label}>
          <span className="catalog-preview-row-icon">
            <T7Icon
              aria-hidden="true"
              name={
                row.tone === "warning"
                  ? "warning"
                  : row.tone === "success"
                    ? "check"
                    : "timeline"
              }
              size={16}
            />
          </span>
          <div>
            <Typography typeRole="label">{row.label}</Typography>
            <Typography typeRole="caption">{row.detail}</Typography>
          </div>
          <StatusChip tone={row.tone}>
            {row.tone === "neutral"
              ? "Synced"
              : row.tone[0].toUpperCase() + row.tone.slice(1)}
          </StatusChip>
        </div>
      ))}
    </div>
  );
}

function PreviewFallback({
  component,
  icon,
}: {
  component: ComponentContract;
  icon: IconName;
}) {
  return (
    <PreviewFrame component={component} icon={icon}>
      <div className="catalog-contract-anatomy">
        <div className="catalog-contract-anatomy-main">
          <T7Icon aria-hidden="true" name={icon} size={23} />
          <div>
            <Typography as="strong" typeRole="heading-sm">
              {component.displayName} anatomy
            </Typography>
            <Typography typeRole="body-sm">{component.purpose}</Typography>
          </div>
        </div>
        <div className="catalog-contract-props" aria-label="Important props">
          {component.importantProps.slice(0, 4).map((prop) => (
            <code key={prop}>{prop}</code>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}

export function ComponentPreview({
  component,
}: {
  component: ComponentContract;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState("grid");
  const [checked, setChecked] = useState(true);
  const [switchOn, setSwitchOn] = useState(true);
  const [team, setTeam] = useState("maya");
  const [tags, setTags] = useState<string[]>(["design"]);
  const [date, setDate] = useState<string | undefined>("2026-08-26");
  const [time, setTime] = useState("09:30");
  const [range, setRange] = useState<{ start?: string; end?: string }>({
    start: "2026-08-26",
    end: "2026-08-30",
  });
  const [rangeValue, setRangeValue] = useState({ max: 84, min: 22 });
  const [files, setFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState([
    { id: "status", label: "Status: active" },
    { id: "team", label: "Team: Design" },
  ]);
  const family = componentFamilyDefinitions.find(
    (item) => item.category === component.category,
  );
  const icon = family?.icon ?? "components";
  const frame = (children: ReactNode) => (
    <PreviewFrame component={component} icon={icon}>
      {children}
    </PreviewFrame>
  );

  if (component.aliasOf) {
    return frame(
      <div className="catalog-preview-alias">
        <T7Icon aria-hidden="true" name="components" size={23} />
        <Typography typeRole="body-sm">
          Compatibility alias. Use the canonical contract linked in the
          documentation.
        </Typography>
      </div>,
    );
  }

  if (
    component.category === "foundation" &&
    component.displayName === "Typography"
  ) {
    return frame(
      <div className="catalog-preview-type">
        <Typography as="h2" typeRole="heading-lg">
          Section title with role hierarchy
        </Typography>
        <Typography typeRole="body">
          Supporting copy stays readable without competing with the title.
        </Typography>
        <Typography typeRole="label">
          Field label · semantic label weight
        </Typography>
        <Typography typeRole="caption">
          Caption and metadata remain deliberately quiet.
        </Typography>
      </div>,
    );
  }
  if (component.displayName === "T7 Icon") {
    return frame(
      <div className="catalog-preview-icon-row">
        {IconNames.slice(0, 5).map((name) => (
          <span key={name}>
            <T7Icon aria-hidden="true" name={name} size={22} />
            <Typography typeRole="caption">{name}</Typography>
          </span>
        ))}
      </div>,
    );
  }
  if (component.category === "foundation") {
    return frame(
      <div className="catalog-preview-profile-grid">
        <div>
          <Typography typeRole="caption">Appearance</Typography>
          <Typography typeRole="label">Light</Typography>
        </div>
        <div>
          <Typography typeRole="caption">Palette</Typography>
          <Typography typeRole="label">Emerald</Typography>
        </div>
        <div>
          <Typography typeRole="caption">Radius</Typography>
          <Typography typeRole="label">Soft</Typography>
        </div>
        <div>
          <Typography typeRole="caption">Density</Typography>
          <Typography typeRole="label">Default</Typography>
        </div>
      </div>,
    );
  }

  if (component.category === "action") {
    if (component.displayName === "Icon Button") {
      return frame(
        <div className="catalog-preview-actions">
          <IconButton icon="edit" label="Edit item" />
          <IconButton icon="more" label="More actions" />
          <IconButton disabled icon="delete" label="Delete item" />
        </div>,
      );
    }
    if (component.displayName === "Button Group") {
      return frame(
        <ButtonGroup label="View actions">
          <Button>Save</Button>
          <Button intent="secondary">Save as draft</Button>
          <Button intent="quiet">Cancel</Button>
        </ButtonGroup>,
      );
    }
    if (component.displayName === "Toggle Button Group") {
      return frame(
        <ToggleButtonGroup
          label="View mode"
          onValueChange={(value) => setToggle(String(value))}
          value={toggle}
        >
          <ToggleButton leadingIcon="components" value="grid">
            Grid
          </ToggleButton>
          <ToggleButton leadingIcon="table" value="list">
            List
          </ToggleButton>
        </ToggleButtonGroup>,
      );
    }
    if (component.displayName === "Toggle Button") {
      return frame(
        <ToggleButton onPressedChange={setChecked} pressed={checked}>
          Included
        </ToggleButton>,
      );
    }
    if (component.displayName === "Split Button") {
      return frame(
        <SplitButton
          items={[{ icon: "download", key: "export", label: "Export CSV" }]}
          label="Save report"
          onClick={() => undefined}
        />,
      );
    }
    return frame(
      <div className="catalog-preview-actions">
        <Button leadingIcon="add">Create item</Button>
        <Button intent="secondary">Review</Button>
        <Button disabled intent="quiet">
          Disabled
        </Button>
      </div>,
    );
  }

  if (component.category === "form") {
    if (
      [
        "Input",
        "Search Input",
        "Password Input",
        "Textarea",
        "Number Input",
        "Currency Input",
        "Percent Input",
      ].includes(component.displayName ?? "")
    ) {
      const displayName = component.displayName ?? "Field";
      if (displayName === "Textarea")
        return frame(
          <Textarea
            hint="Optional supporting context"
            label="Notes"
            placeholder="Add a short note…"
          />,
        );
      if (displayName === "Number Input")
        return frame(<NumberInput label="Quantity" defaultValue="12" />);
      return frame(
        <Input
          hint={
            displayName === "Password Input"
              ? "Use at least 12 characters"
              : "Helper text clarifies the expected value"
          }
          label={displayName}
          leadingIcon={displayName === "Search Input" ? "search" : undefined}
          placeholder={
            displayName === "Password Input"
              ? "Enter password"
              : `Enter ${displayName.toLowerCase()}`
          }
          type={
            displayName === "Password Input"
              ? "password"
              : displayName === "Currency Input" ||
                  displayName === "Percent Input"
                ? "number"
                : "text"
          }
        />,
      );
    }
    if (component.displayName === "Select")
      return frame(
        <Select label="Select" defaultValue="ready">
          {sampleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>,
      );
    if (component.displayName === "Native Select")
      return frame(
        <NativeSelect aria-label="Native status" defaultValue="ready">
          {sampleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>,
      );
    if (component.displayName === "Combobox")
      return frame(
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
          ]}
          value={team}
        />,
      );
    if (component.displayName === "Multi Select")
      return frame(
        <MultiSelect
          label="Workstreams"
          onValueChange={setTags}
          options={[
            { label: "Design", value: "design" },
            { label: "Research", value: "research" },
            { label: "Engineering", value: "engineering" },
          ]}
          values={tags}
        />,
      );
    if (component.displayName === "Checkbox")
      return frame(
        <Checkbox
          checked={checked}
          label="Notify collaborators"
          onChange={(event) => setChecked(event.target.checked)}
        />,
      );
    if (component.displayName === "Checkbox Group")
      return frame(
        <CheckboxGroup legend="Notifications">
          <Checkbox
            checked={checked}
            label="Email"
            onChange={(event) => setChecked(event.target.checked)}
          />
          <Checkbox label="In-app" />
        </CheckboxGroup>,
      );
    if (component.displayName === "Radio")
      return frame(
        <Radio
          checked={toggle === "grid"}
          label="Grid"
          name="preview-view"
          onChange={() => setToggle("grid")}
        />,
      );
    if (component.displayName === "Radio Group")
      return frame(
        <RadioGroup legend="View">
          <Radio
            checked={toggle === "grid"}
            label="Grid"
            name="view"
            onChange={() => setToggle("grid")}
          />
          <Radio
            checked={toggle === "list"}
            label="List"
            name="view"
            onChange={() => setToggle("list")}
          />
        </RadioGroup>,
      );
    if (component.displayName === "Switch")
      return frame(
        <Switch
          checked={switchOn}
          description="Controls notification delivery"
          label="Notify collaborators"
          onChange={(event) => setSwitchOn(event.target.checked)}
        />,
      );
    if (component.displayName === "Slider")
      return frame(
        <Slider
          defaultValue={64}
          hint="0 to 100"
          label="Confidence"
          max={100}
          min={0}
          valueLabel="64"
        />,
      );
    if (component.displayName === "Range Slider")
      return frame(
        <RangeSlider
          label="Confidence range"
          max={100}
          maxValue={rangeValue.max}
          min={0}
          minValue={rangeValue.min}
          onValueChange={setRangeValue}
        />,
      );
    if (component.displayName === "OTP Input")
      return frame(
        <OtpInput
          label="Verification code"
          onValueChange={() => undefined}
          value=""
        />,
      );
    if (
      ["Field", "Label", "Field Description", "Field Error"].includes(
        component.displayName ?? "",
      )
    )
      return frame(
        <Field
          description="Use a concise helper message."
          error={
            component.displayName === "Field Error"
              ? "Review this value."
              : undefined
          }
          label="Project name"
        >
          <Input aria-label="Project name" defaultValue="ten4seven" />
        </Field>,
      );
    if (component.displayName === "Field Group")
      return frame(
        <FieldGroup legend="Delivery settings">
          <Checkbox label="Email updates" />
          <Checkbox label="Weekly digest" />
        </FieldGroup>,
      );
    if (
      component.displayName === "Form Section" ||
      component.displayName === "Form Grid" ||
      component.displayName === "Form Actions"
    )
      return frame(
        <FormSection
          action={
            <Button intent="secondary" size="sm">
              Edit
            </Button>
          }
          description="Group related fields before submitting."
          title="Profile details"
        >
          <FormGrid>
            <Input label="First name" defaultValue="Maya" />
            <Input label="Role" defaultValue="Designer" />
          </FormGrid>
          <FormActions>
            <Button>Save changes</Button>
          </FormActions>
        </FormSection>,
      );
    return frame(
      <div className="catalog-preview-form-summary">
        <Input
          aria-label="Field preview"
          label="Field anatomy"
          placeholder="A labelled field"
        />
        <Typography typeRole="caption">
          Label, value, helper, focus, and error states share one shell.
        </Typography>
      </div>,
    );
  }

  if (component.category === "layout") {
    if (component.displayName === "Scroll Area")
      return frame(
        <>
          <ScrollArea label="Inventory events" maxHeight={176}>
            <PreviewRows />
          </ScrollArea>
          <Typography typeRole="caption">
            Focus the region and scroll to inspect the bounded content without
            changing document flow.
          </Typography>
        </>,
      );
    if (component.displayName === "Separator")
      return frame(
        <div className="catalog-preview-separator-demo">
          <div>
            <Typography typeRole="label">Receiving</Typography>
            <Typography typeRole="caption">08:42</Typography>
          </div>
          <Separator />
          <div>
            <Typography typeRole="label">Putaway</Typography>
            <Typography typeRole="caption">09:16</Typography>
          </div>
        </div>,
      );
    if (component.displayName === "Section")
      return frame(
        <Section
          actions={
            <Button intent="quiet" size="sm">
              View all
            </Button>
          }
          description="A page region with a title, description, actions, and content."
          title="Recent activity"
        >
          <PreviewRows />
        </Section>,
      );
    if (component.displayName === "Section Header")
      return frame(
        <SectionHeader
          actions={<Button size="sm">Create</Button>}
          description="Shared heading anatomy for a bounded region."
          eyebrow="WORKSPACE"
          title="Recent activity"
        />,
      );
    if (
      component.displayName === "Toolbar" ||
      component.displayName === "Action Bar"
    )
      return frame(
        <Toolbar actions={<Button>Apply</Button>}>
          <Input aria-label="Toolbar search" placeholder="Search records…" />
          <Button intent="secondary">Filter</Button>
        </Toolbar>,
      );
    if (component.displayName === "Page Header")
      return frame(
        <PageHeader
          actions={<Button>Save view</Button>}
          description="A contextual page header with actions and supporting metadata."
          overline="OPERATIONS"
          title="Inventory overview"
        />,
      );
  }

  if (component.category === "navigation") {
    if (component.displayName === "Mobile Sidebar") {
      return frame(
        <>
          <Button
            leadingIcon="menu"
            onClick={() => setDrawerOpen(true)}
            intent="secondary"
          >
            Open mobile navigation
          </Button>
          <MobileSidebar
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            title="Workspace navigation"
          >
            <Sidebar
              activeKey="inventory"
              groups={[
                {
                  items: [
                    { icon: "dashboard", key: "overview", label: "Overview" },
                    {
                      icon: "inventory",
                      key: "inventory",
                      label: "Inventory",
                    },
                  ],
                  key: "workspace",
                  label: "Workspace",
                },
              ]}
            />
          </MobileSidebar>
        </>,
      );
    }
    if (
      component.displayName === "Sidebar" ||
      component.displayName === "Sidebar Group" ||
      component.displayName === "Nav Item"
    )
      return frame(
        <Sidebar
          activeKey="inventory"
          brand={<strong>ten4seven UI</strong>}
          groups={[
            {
              items: [
                { icon: "dashboard", key: "overview", label: "Overview" },
                { icon: "inventory", key: "inventory", label: "Inventory" },
                { icon: "table", key: "reports", label: "Reports" },
              ],
              key: "workspace",
              label: "Workspace",
            },
          ]}
        />,
      );
    if (component.displayName === "Breadcrumb")
      return frame(
        <Breadcrumb
          items={[
            { href: "#", key: "workspace", label: "Workspace" },
            { href: "#", key: "inventory", label: "Inventory" },
            { current: true, key: "detail", label: "Item detail" },
          ]}
        />,
      );
    if (
      component.displayName === "Tabs" ||
      component.displayName === "Tab Panel"
    )
      return frame(
        <Tabs
          items={[
            {
              content: "Overview content stays scoped to the selected tab.",
              id: "overview",
              label: "Overview",
            },
            {
              content: "Activity content is a peer panel.",
              id: "activity",
              label: "Activity",
            },
          ]}
        />,
      );
    if (component.displayName === "Accordion")
      return frame(
        <Accordion
          defaultValue="details"
          items={[
            {
              content: "Disclosure content remains close to its heading.",
              id: "details",
              title: "Details",
            },
            {
              content: "Long workflows belong in a route or dialog.",
              id: "history",
              title: "History",
            },
          ]}
        />,
      );
    if (component.displayName === "Collapsible")
      return frame(
        <Collapsible defaultOpen title="Optional details">
          A compact disclosure keeps secondary content available.
        </Collapsible>,
      );
    if (component.displayName === "Stepper")
      return frame(
        <Stepper
          current="review"
          steps={[
            { id: "draft", label: "Draft" },
            { id: "review", label: "Review" },
            { id: "done", label: "Done" },
          ]}
        />,
      );
    if (component.displayName === "Pagination")
      return frame(
        <Pagination
          onPageChange={setPage}
          page={page}
          pageSize={10}
          total={42}
        />,
      );
    if (component.displayName === "Top Navigation")
      return frame(
        <div className="catalog-preview-nav-links">
          <a href="#">Overview</a>
          <a aria-current="page" href="#">
            Inventory
          </a>
          <a href="#">Reports</a>
        </div>,
      );
    if (component.displayName === "Navigation Menu")
      return frame(
        <NavigationMenu
          items={[
            { href: "#", key: "overview", label: "Overview" },
            {
              children: [
                { href: "#", key: "books", label: "Books" },
                { href: "#", key: "collections", label: "Collections" },
              ],
              key: "products",
              label: "Products",
            },
            { href: "#", key: "about", label: "About" },
          ]}
        />,
      );
    if (
      component.displayName === "Command Menu" ||
      component.displayName === "Command Palette"
    )
      return frame(
        <>
          <Button leadingIcon="command" onClick={() => setCommandOpen(true)}>
            Open command menu
          </Button>
          <CommandMenu
            commands={[
              {
                description: "Open inventory contracts",
                icon: "components",
                id: "components",
                label: "Open components",
                onSelect: () => setCommandOpen(false),
              },
              {
                description: "Open theme controls",
                icon: "theme",
                id: "theme",
                label: "Open Theme Studio",
                onSelect: () => setCommandOpen(false),
              },
            ]}
            onOpenChange={setCommandOpen}
            open={commandOpen}
            shortcut={false}
          />
        </>,
      );
    return frame(
      <div className="catalog-preview-nav-links">
        <a href="#">Overview</a>
        <a href="#">Details</a>
        <a href="#">Activity</a>
      </div>,
    );
  }

  if (component.category === "data" || component.category === "table") {
    if (component.displayName === "Milestone Tracker")
      return frame(
        <MilestoneTracker
          items={[
            {
              description: "Signals are captured and ready for review.",
              details: (
                <KeyValueList
                  items={[
                    { label: "Records", value: "8 captured" },
                    { label: "Owner", value: "Operations desk" },
                  ]}
                />
              ),
              icon: "analytics",
              id: "capture",
              label: "Capture",
              meta: "8 of 8 records",
              percentage: 100,
              status: "complete",
            },
            {
              description: "Health and next action are being reviewed.",
              details: (
                <KeyValueList
                  items={[
                    { label: "Ready", value: "6 of 8 records" },
                    { label: "State", value: "In review" },
                  ]}
                />
              ),
              icon: "filter",
              id: "triage",
              label: "Triage",
              meta: "6 of 8 triaged",
              percentage: 75,
              status: "current",
            },
            {
              description: "The next accountable action is queued.",
              details: (
                <KeyValueList
                  items={[{ label: "Ready", value: "5 workstreams" }]}
                />
              ),
              icon: "edit",
              id: "action",
              label: "Next action",
              meta: "5 of 8 ready",
              percentage: 63,
              status: "upcoming",
            },
          ]}
        />,
      );
    if (component.displayName === "Activity Feed")
      return frame(
        <ActivityFeed
          items={[
            {
              description: "Inbound shipment matched purchase order PO-1842.",
              icon: "shipment",
              id: "shipment",
              meta: "Today · 09:42",
              title: "Receiving completed",
            },
            {
              description: "Cycle count adjusted 24 units in aisle A-14.",
              icon: "stockIn",
              id: "count",
              meta: "Yesterday · 16:08",
              title: "Stock count updated",
            },
            {
              description: "Reorder threshold requires an operator review.",
              icon: "warning",
              id: "review",
              meta: "Yesterday · 11:20",
              title: "Low stock flagged",
            },
          ]}
        />,
      );
    if (
      component.displayName === "Data Table" ||
      component.displayName === "Data Table Column Picker"
    )
      return frame(
        <DataTable
          columns={[
            { key: "item", header: "Item" },
            { key: "status", header: "Status" },
          ]}
          rows={[
            { id: "wh-1042", item: "Organic oat milk", status: "Healthy" },
            { id: "wh-1048", item: "Arabica coffee", status: "Low stock" },
          ]}
          rowKey={(row) => row.id}
        />,
      );
    if (
      [
        "Table",
        "Table Header",
        "Table Body",
        "Table Row",
        "Table Head",
        "Table Cell",
      ].includes(component.displayName ?? "")
    )
      return frame(
        <Table aria-label="Inventory summary">
          <TableHeader>
            <TableRow>
              <TableHead>Signal</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Available units</TableCell>
              <TableCell>48,920</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reorder review</TableCell>
              <TableCell>12 items</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );
    if (component.displayName === "Metric Card")
      return frame(
        <div className="catalog-preview-metrics">
          <MetricCard
            description="Across 2 warehouses"
            icon="inventory"
            title="Total SKUs"
            value="1,248"
          />
          <MetricCard
            change={<TrendIndicator direction="up" value="8.4%" />}
            colorway={2}
            emphasis="solid"
            icon="analytics"
            title="Available units"
            tone="success"
            value="48,920"
          />
        </div>,
      );
    if (component.displayName === "KPI Cluster")
      return frame(
        <KPICluster
          items={[
            {
              colorway: 1,
              emphasis: "solid",
              icon: "analytics",
              label: "Active signals",
              note: "Across the current window",
              tone: "info",
              value: "24",
            },
            {
              colorway: 2,
              emphasis: "solid",
              icon: "calendar",
              label: "Due soon",
              note: "Next accountable action",
              tone: "info",
              value: "7",
            },
            {
              colorway: 4,
              emphasis: "solid",
              icon: "check",
              label: "Healthy",
              note: "Within target",
              tone: "success",
              value: "91%",
            },
          ]}
          label="KPI card treatment preview"
          variant="cards"
        />,
      );
    if (
      component.displayName === "Avatar" ||
      component.displayName === "Avatar Group"
    )
      return frame(
        <AvatarGroup
          avatars={[
            { name: "Maya Chen" },
            { name: "Jordan Park" },
            { name: "Lin Wu" },
          ]}
        />,
      );
    if (
      component.displayName === "Status Chip" ||
      component.displayName === "Badge"
    )
      return frame(
        <div className="catalog-preview-actions">
          <StatusChip icon="check" tone="success">
            Healthy
          </StatusChip>
          <StatusChip icon="warning" tone="warning">
            Low stock
          </StatusChip>
          <Badge tone="primary">New</Badge>
        </div>,
      );
    if (
      component.displayName === "Key Value List" ||
      component.displayName === "Description List"
    )
      return frame(
        <KeyValueList
          items={[
            { label: "State", value: "Ready for review" },
            { label: "Updated", value: "Today" },
            { label: "Owner", value: "Maya Chen" },
          ]}
        />,
      );
    if (component.displayName === "Record Summary")
      return frame(
        <RecordSummary
          actions={
            <Button intent="secondary" size="sm">
              Edit
            </Button>
          }
          description="A compact record header for contextual detail."
          metadata={<StatusChip tone="success">Active</StatusChip>}
          title="Organic oat milk 1L"
        />,
      );
    return frame(<PreviewRows />);
  }

  if (component.category === "filter") {
    if (component.displayName === "Filter Toolbar")
      return frame(
        <FilterToolbar
          actions={<Button intent="secondary">Apply</Button>}
          summary="8 matching records"
          title="Inventory query"
        >
          <Input aria-label="Search inventory" placeholder="Search item…" />
          <Select label="Status" defaultValue="ready">
            {sampleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterToolbar>,
      );
    if (component.displayName === "Filter Drawer")
      return frame(
        <>
          <Button
            intent="secondary"
            leadingIcon="filter"
            onClick={() => setDrawerOpen(true)}
          >
            Open filters
          </Button>
          <FilterDrawer onClose={() => setDrawerOpen(false)} open={drawerOpen}>
            <Select label="Status" defaultValue="ready">
              {sampleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FilterDrawer>
        </>,
      );
    if (
      component.displayName === "Applied Filters" ||
      component.displayName === "Filter Chip"
    )
      return frame(
        <AppliedFilters
          filters={filters}
          onClear={() => setFilters([])}
          onRemove={(id) =>
            setFilters((current) =>
              current.filter((filter) => filter.id !== id),
            )
          }
        />,
      );
    if (component.displayName === "Bulk Action Bar")
      return frame(
        <div className="catalog-preview-bulk">
          <Typography typeRole="label">2 records selected</Typography>
          <Button intent="secondary" size="sm">
            Export
          </Button>
          <Button intent="quiet" size="sm">
            Clear
          </Button>
        </div>,
      );
  }

  if (component.category === "overlay") {
    if (component.displayName === "Modal")
      return frame(
        <>
          <Button intent="secondary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal
            description="A live canonical overlay preview."
            onClose={() => setModalOpen(false)}
            open={modalOpen}
            title="Modal preview"
          >
            <Typography typeRole="body-sm">
              Focus remains inside the surface until it closes.
            </Typography>
          </Modal>
        </>,
      );
    if (component.displayName === "Alert Dialog")
      return frame(
        <>
          <Button intent="danger" onClick={() => setAlertOpen(true)}>
            Confirm action
          </Button>
          <AlertDialog
            confirmLabel="Confirm"
            description="This action is reversible in the preview."
            onClose={() => setAlertOpen(false)}
            onConfirm={() => setAlertOpen(false)}
            open={alertOpen}
            title="Confirm this action?"
          />
        </>,
      );
    if (
      component.displayName === "Detail Drawer" ||
      component.displayName === "Drawer"
    )
      return frame(
        <>
          <Button intent="secondary" onClick={() => setDrawerOpen(true)}>
            Open detail drawer
          </Button>
          {component.displayName === "Drawer" ? (
            <Drawer
              description="A reusable side surface for contextual content."
              onClose={() => setDrawerOpen(false)}
              open={drawerOpen}
              title="Contextual surface"
            >
              <Typography typeRole="body-sm">
                Specialized detail and filter drawers compose this base.
              </Typography>
            </Drawer>
          ) : (
            <DetailDrawer
              description="A contextual side surface for the selected record."
              onClose={() => setDrawerOpen(false)}
              open={drawerOpen}
              title="Record detail"
            >
              <KeyValueList
                items={[
                  { label: "Status", value: "Ready" },
                  { label: "Owner", value: "Maya Chen" },
                ]}
              />
            </DetailDrawer>
          )}
        </>,
      );
    if (component.displayName === "Popover")
      return frame(
        <Popover
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          trigger={<Button intent="secondary">Open popover</Button>}
        >
          <Typography typeRole="body-sm">
            Anchored help stays close to its trigger.
          </Typography>
        </Popover>,
      );
    if (component.displayName === "Tooltip")
      return frame(
        <Tooltip content="Supplemental context">
          <IconButton icon="info" label="More information" />
        </Tooltip>,
      );
    if (
      component.displayName === "Dropdown Menu" ||
      component.displayName === "Action Menu"
    )
      return frame(
        <DropdownMenu
          items={[
            { icon: "edit", key: "edit", label: "Edit item" },
            {
              icon: "delete",
              intent: "danger",
              key: "delete",
              label: "Delete item",
            },
          ]}
          trigger={<Button intent="secondary">More actions</Button>}
        />,
      );
    if (component.displayName === "Context Menu")
      return frame(
        <ContextMenu
          items={[{ icon: "edit", key: "edit", label: "Edit item" }]}
        >
          <Button intent="secondary">Right-click this item</Button>
        </ContextMenu>,
      );
  }

  if (component.category === "feedback") {
    if (component.displayName === "Toast")
      return frame(
        <Toast
          onDismiss={() => undefined}
          toast={{
            description: "The notification remains short-lived and contextual.",
            id: "preview-toast",
            title: "Inventory saved",
            tone: "success",
          }}
        />,
      );
    if (component.displayName === "Toaster")
      return frame(
        <Toaster
          onDismiss={() => undefined}
          toasts={[
            {
              description: "The notification viewport owns live feedback.",
              id: "preview-toaster",
              title: "Sync complete",
              tone: "success",
            },
          ]}
        />,
      );
    if (component.displayName === "Toast Provider")
      return frame(
        <ToastProvider>
          <Toaster
            onDismiss={() => undefined}
            toasts={[
              {
                description: "Provider-owned transient feedback.",
                id: "preview-provider-toast",
                title: "Changes saved",
                tone: "success",
              },
            ]}
          />
        </ToastProvider>,
      );
    if (component.displayName === "Alert")
      return frame(
        <Alert
          description="This persistent message remains in context until resolved."
          title="Review needed"
          tone="warning"
        />,
      );
    if (component.displayName === "Empty State")
      return frame(
        <EmptyState
          action={<Button intent="secondary">Create item</Button>}
          description="There are no records in this view yet."
          icon="files"
          title="Nothing here yet"
        />,
      );
    if (component.displayName === "State View")
      return frame(
        <StateView
          description="The requested view is unavailable right now."
          state="error"
          title="Could not load records"
        />,
      );
    if (component.displayName === "Progress")
      return frame(<Progress label="Review progress" showValue value={72} />);
    if (component.displayName === "Circular Progress")
      return frame(<CircularProgress label="Sync progress" value={72} />);
    if (component.displayName === "Spinner")
      return frame(<Spinner label="Loading records" />);
    if (component.displayName === "Skeleton")
      return frame(
        <div className="catalog-preview-skeletons">
          <Skeleton height="1rem" width="70%" />
          <Skeleton height="1rem" width="45%" />
          <Skeleton height="4rem" width="100%" />
        </div>,
      );
    return frame(
      <div className="catalog-preview-actions">
        <StatusChip tone="success">Saved</StatusChip>
        <StatusChip tone="warning">Needs review</StatusChip>
        <StatusChip tone="danger">Blocked</StatusChip>
      </div>,
    );
  }

  if (component.category === "date-time") {
    if (component.displayName === "Calendar")
      return frame(<Calendar onValueChange={setDate} value={date} />);
    if (component.displayName === "Date Picker")
      return frame(
        <DatePicker label="Review date" onValueChange={setDate} value={date} />,
      );
    if (component.displayName === "Date Range Picker")
      return frame(
        <DateRangePicker
          label="Planning range"
          onValueChange={setRange}
          value={range}
        />,
      );
    if (component.displayName === "Date Time Input")
      return frame(
        <DateTimeInput
          date={date}
          onDateChange={setDate}
          onTimeChange={() => undefined}
          time="09:30"
        />,
      );
    if (component.displayName === "Time Picker")
      return frame(
        <TimePicker
          label="Review time"
          onValueChange={(next) => setTime(next ?? "")}
          value={time}
        />,
      );
    if (component.displayName === "Native Time Input")
      return frame(
        <NativeTimeInput label="Review time" defaultValue="09:30" />,
      );
    return frame(<TimeInput label="Review time" defaultValue="09:30" />);
  }

  if (component.category === "file") {
    if (component.displayName === "File Upload")
      return frame(
        <FileUpload
          accept=".pdf,image/*"
          maxFiles={3}
          maxSize={5 * 1024 * 1024}
          onFilesChange={setFiles}
          onReject={() => undefined}
          value={files}
        >
          PDF or image, maximum 5 MB each.
        </FileUpload>,
      );
    if (component.displayName === "File Item")
      return frame(
        <ul className="catalog-preview-file-list">
          <FileItem name="inventory-report.pdf" size={238000} status="ready" />
        </ul>,
      );
    if (component.displayName === "File List")
      return frame(
        <FileList
          files={[
            {
              id: "report",
              name: "inventory-report.pdf",
              size: 238000,
              status: "ready",
            },
          ]}
        />,
      );
  }

  if (component.category === "chart") {
    if (component.displayName === "Chart Legend")
      return frame(
        <ChartLegend
          series={[
            { id: "coverage", label: "Coverage", values: [42, 56, 74] },
            { id: "quality", label: "Quality", values: [36, 58, 70] },
          ]}
        />,
      );
    if (
      component.displayName === "Line Chart" ||
      component.displayName === "Sparkline"
    )
      return frame(
        <LineChart
          labels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
          series={[
            { id: "coverage", label: "Coverage", values: [42, 56, 51, 68, 74] },
          ]}
          title="Weekly coverage"
          valueFormatter={(value) => `${Math.round(value)}%`}
        />,
      );
    if (component.displayName === "Bar Chart")
      return frame(
        <BarChart
          data={[
            { label: "Ready", value: 61 },
            { label: "Review", value: 25 },
            { label: "Blocked", value: 14 },
          ]}
          title="Sample distribution"
        />,
      );
    if (component.displayName === "Donut Chart")
      return frame(
        <DonutChart
          centerLabel="100"
          segments={[
            { label: "Ready", value: 61 },
            { label: "Review", value: 25 },
            { label: "Blocked", value: 14 },
          ]}
          title="Sample distribution"
        />,
      );
    if (component.displayName === "Trend Indicator")
      return frame(<TrendIndicator direction="up" value="8.4%" />);
    return frame(
      <div className="catalog-preview-chart-legend">
        <span>
          <i data-tone="one" /> Coverage
        </span>
        <span>
          <i data-tone="two" /> Quality
        </span>
      </div>,
    );
  }

  if (component.category === "media") {
    if (component.displayName === "Aspect Ratio")
      return frame(
        <AspectRatio className="catalog-preview-media-box" ratio={4 / 3}>
          <T7Icon aria-hidden="true" name="image" size={28} />
          <Typography typeRole="caption">4:3 content ratio</Typography>
        </AspectRatio>,
      );
    if (component.displayName === "Media Frame")
      return frame(
        <MediaFrame
          className="catalog-preview-media-box"
          label="Editorial media frame"
          ratio={3 / 2}
          tone="subtle"
        >
          <T7Icon aria-hidden="true" name="image" size={28} />
          <Typography typeRole="caption">
            Media frame with honest bounds
          </Typography>
        </MediaFrame>,
      );
    if (component.displayName === "Image")
      return frame(
        <Image
          alt="Editorial sample"
          fallbackLabel="Image unavailable"
          src="/publishing-covers/manajemen-strategis.svg"
        />,
      );
    return frame(
      <div className="catalog-preview-media">
        <div className="catalog-preview-media-art">
          <T7Icon aria-hidden="true" name="image" size={28} />
        </div>
        <Typography typeRole="caption">
          Media keeps its ratio and honest fallback behavior.
        </Typography>
      </div>,
    );
  }

  if (component.category === "commerce") {
    if (component.displayName === "Product Card")
      return frame(
        <ProductCard
          actions={
            <Button intent="secondary" size="sm">
              View details
            </Button>
          }
          eyebrow="Management"
          media={<T7Icon aria-hidden="true" name="book" size={28} />}
          meta="Rina Kartika · EPUB · PDF"
          price={<Price amount={95000} />}
          title="Manajemen Strategis"
        />,
      );
    if (component.displayName === "Product Grid")
      return frame(
        <ProductGrid>
          <ProductCard
            media={<T7Icon aria-hidden="true" name="book" size={24} />}
            title="Manajemen Strategis"
          />
          <ProductCard
            media={<T7Icon aria-hidden="true" name="ebook" size={24} />}
            title="Akuntansi Keuangan"
          />
        </ProductGrid>,
      );
    if (component.displayName === "Price")
      return frame(<Price amount={95000} originalAmount={110000} />);
    if (component.displayName === "Product Meta")
      return frame(
        <ProductMeta items={["EPUB", "PDF", "Rina Kartika", "4.8 rating"]} />,
      );
    if (component.displayName === "Rating")
      return frame(<Rating count={48} value={4.8} />);
    if (component.displayName === "Quantity Control")
      return frame(
        <QuantityControl
          label="Quantity"
          onValueChange={setQuantity}
          value={quantity}
        />,
      );
    if (component.displayName === "Cart Trigger")
      return frame(
        <CartTrigger
          count={2}
          label="Cart"
          onClick={() => setDrawerOpen(true)}
        />,
      );
    if (component.displayName === "Cart Line Item")
      return frame(
        <CartLineItem
          media={<T7Icon aria-hidden="true" name="book" size={20} />}
          meta="Rina Kartika · EPUB · PDF"
          onQuantityChange={setQuantity}
          price={<Price amount={95000} />}
          quantity={quantity}
          title="Manajemen Strategis"
        />,
      );
    return frame(
      <div className="catalog-preview-commerce-meta">
        <Typography typeRole="label">Publishing metadata</Typography>
        <Typography typeRole="caption">
          EPUB · Google Play Books · 4.8
        </Typography>
      </div>,
    );
  }

  if (component.category === "pattern") {
    if (component.displayName === "App Shell")
      return frame(
        <div className="catalog-preview-app-shell">
          <AppShell
            contentAs="div"
            sidebar={
              <Sidebar
                activeKey="inventory"
                groups={[
                  {
                    items: [
                      {
                        icon: "inventory",
                        key: "inventory",
                        label: "Inventory",
                      },
                    ],
                    key: "workspace",
                  },
                ]}
              />
            }
            topbar={
              <Typography typeRole="label">ten4seven workspace</Typography>
            }
          >
            <Panel>
              <Typography typeRole="label">Route content</Typography>
              <Typography typeRole="caption">
                Sidebar, topbar, and content remain one shell contract.
              </Typography>
            </Panel>
          </AppShell>
        </div>,
      );
    if (component.displayName === "Cart Panel")
      return frame(
        <CartPanel
          itemCount="1 item"
          summary={
            <OrderSummary
              rows={[{ label: "Subtotal", value: <Price amount={95000} /> }]}
              total={<Price amount={95000} />}
            />
          }
        >
          <CartLineItem
            onQuantityChange={setQuantity}
            price={<Price amount={95000} />}
            quantity={quantity}
            title="Manajemen Strategis"
          />
        </CartPanel>,
      );
    if (component.displayName === "Order Summary")
      return frame(
        <OrderSummary
          rows={[
            { label: "Subtotal", value: <Price amount={95000} /> },
            { label: "Delivery", value: "Calculated later" },
          ]}
          total={<Price amount={95000} />}
        />,
      );
    if (component.displayName === "Approval Panel")
      return frame(
        <ApprovalPanel
          actions={<Button>Approve request</Button>}
          description="A decision checkpoint keeps evidence and actions together."
          metadata={
            <Typography typeRole="caption">
              Status · Ready for approval
            </Typography>
          }
          title="Ready for approval"
        />,
      );
    if (component.displayName === "Action Footer")
      return frame(
        <ActionFooter
          primaryAction={<Button>Continue</Button>}
          secondaryActions={<Button intent="quiet">Back</Button>}
          summary={
            <Typography typeRole="caption">
              All required fields complete
            </Typography>
          }
        />,
      );
    return frame(
      <div className="catalog-preview-pattern-flow">
        <span>Context</span>
        <T7Icon aria-hidden="true" name="chevronRight" size={14} />
        <span>Decision</span>
        <T7Icon aria-hidden="true" name="chevronRight" size={14} />
        <span>Action</span>
      </div>,
    );
  }

  if (component.category === "surface") {
    if (
      component.displayName === "Card" ||
      component.displayName === "Card Header" ||
      component.displayName === "Card Content" ||
      component.displayName === "Card Footer" ||
      component.displayName === "Card Title" ||
      component.displayName === "Card Description"
    )
      return frame(
        <Card>
          <CardHeader>
            <CardTitle>Inventory summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography typeRole="body-sm">
              A contained visual record with semantic surface roles.
            </Typography>
          </CardContent>
        </Card>,
      );
    if (component.displayName === "Panel")
      return frame(
        <Panel>
          <Typography typeRole="label">Inspector panel</Typography>
          <Typography typeRole="body-sm">
            Supporting context stays bounded and secondary.
          </Typography>
        </Panel>,
      );
    return frame(
      <Surface>
        <Typography typeRole="label">Page region surface</Typography>
        <Typography typeRole="body-sm">
          Broad layout surfaces provide semantic grouping without card nesting.
        </Typography>
      </Surface>,
    );
  }

  return <PreviewFallback component={component} icon={icon} />;
}
