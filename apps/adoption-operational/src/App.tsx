import { useEffect, useMemo, useState, type FormEvent } from "react";

import { T7Icon } from "@ten4seven/icons";
import type {
  Appearance,
  DensityName,
  PaletteName,
  RadiusName,
} from "@ten4seven/tokens";
import {
  AppShell,
  Avatar,
  Button,
  Card,
  CardContent,
  DataTable,
  DetailDrawer,
  FormActions,
  FormGrid,
  Input,
  KPICluster,
  KeyValueList,
  MobileSidebar,
  PageHeader,
  SearchInput,
  Select,
  Sidebar,
  StatusChip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Ten4SevenProvider,
  Textarea,
  Typography,
  type DataTableColumn,
  type StatusTone,
} from "@ten4seven/ui";

import {
  buildReceipt,
  countReceiptsByStatus,
  filterReceipts,
  initialReceipts,
  markReceiptReceived,
  receiptStatuses,
  type Receipt,
  type ReceiptInput,
  type ReceiptStatus,
} from "./domain";

type Route = "inventory" | "new" | "receipts";

type SupportedAppearance = Exclude<Appearance, "system">;

function queryValue<T extends string>(
  params: URLSearchParams,
  key: string,
  values: readonly T[],
  fallback: T,
): T {
  const value = params.get(key);
  return values.some((candidate) => candidate === value)
    ? (value as T)
    : fallback;
}

function themeFromQuery() {
  const params = new URLSearchParams(window.location.search);

  return {
    appearance: queryValue<SupportedAppearance>(
      params,
      "appearance",
      ["light", "dark"],
      "light",
    ),
    density: queryValue<DensityName>(
      params,
      "density",
      ["comfortable", "default", "compact", "dense"],
      "default",
    ),
    palette: queryValue<PaletteName>(
      params,
      "palette",
      [
        "slate",
        "emerald",
        "teal",
        "cyan",
        "blue",
        "indigo",
        "violet",
        "rose",
        "red",
        "orange",
        "amber",
      ],
      "emerald",
    ),
    radius: queryValue<RadiusName>(
      params,
      "radius",
      ["sharp", "soft", "rounded"],
      "soft",
    ),
  };
}

function routeFromPath(pathname: string): Route {
  if (pathname === "/inventory") return "inventory";
  if (pathname === "/operations/receipts/new") return "new";
  return "receipts";
}

function navigate(pathname: string) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const receiptStatusTone: Record<ReceiptStatus, StatusTone> = {
  Received: "success",
  Receiving: "info",
  Scheduled: "warning",
};

const receiptStatusIcon: Record<
  ReceiptStatus,
  "calendar" | "pending" | "success"
> = {
  Received: "success",
  Receiving: "pending",
  Scheduled: "calendar",
};

function ReceiptStatusChip({ status }: { status: ReceiptStatus }) {
  return (
    <StatusChip
      icon={receiptStatusIcon[status]}
      tone={receiptStatusTone[status]}
    >
      {status}
    </StatusChip>
  );
}

function OperationsSidebar({
  activeKey,
  onNavigate,
}: {
  activeKey: string;
  onNavigate: (key: string) => void;
}) {
  return (
    <Sidebar
      activeKey={activeKey}
      brand={
        <div className="adoption-sidebar-brand">
          <span className="adoption-brand-mark">
            <T7Icon name="inventory" size={18} />
          </span>
          <span>
            <Typography typeRole="label">Ledgerly</Typography>
            <Typography typeRole="caption">Operations</Typography>
          </span>
        </div>
      }
      groups={[
        {
          key: "workspace",
          label: "Workspace",
          items: [
            { icon: "stockIn", key: "receipts", label: "Receipts" },
            { icon: "inventory", key: "inventory", label: "Inventory" },
          ],
        },
        {
          key: "account",
          label: "Account",
          items: [{ icon: "settings", key: "settings", label: "Settings" }],
        },
      ]}
      footer={
        <div className="adoption-sidebar-profile">
          <Avatar name="Maya Chen" size="sm" />
          <span>
            <Typography typeRole="label">Maya Chen</Typography>
            <Typography typeRole="caption">Operations lead</Typography>
          </span>
        </div>
      }
      label="Operations navigation"
      onSelect={onNavigate}
    />
  );
}

function ReceiptForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (input: ReceiptInput) => void;
}) {
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("Jakarta Hub");
  const [expected, setExpected] = useState("2026-09-02");
  const [units, setUnits] = useState("1");
  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supplier.trim() || Number(units) < 1) return;
    onSubmit({
      expected,
      notes: notes.trim(),
      supplier: supplier.trim(),
      units: Number(units),
      warehouse,
    });
  }

  return (
    <div className="adoption-route-stack">
      <PageHeader
        breadcrumbs={<span>Operations / Receipts / New</span>}
        description="Register an expected delivery before the dock team starts scanning."
        overline="Entity form"
        title="Create inbound receipt"
      />
      <Card className="adoption-form-card">
        <CardContent>
          <form aria-label="Create receipt form" onSubmit={handleSubmit}>
            <FormGrid>
              <Input
                aria-label="Supplier"
                label="Supplier"
                onChange={(event) => setSupplier(event.target.value)}
                placeholder="e.g. Northstar Components"
                required
                value={supplier}
              />
              <Select
                aria-label="Warehouse"
                label="Warehouse"
                onChange={(event) => setWarehouse(event.target.value)}
                value={warehouse}
              >
                <option>Jakarta Hub</option>
                <option>Bandung Depot</option>
                <option>Surabaya Crossdock</option>
              </Select>
              <Input
                aria-label="Expected date"
                label="Expected date"
                onChange={(event) => setExpected(event.target.value)}
                type="date"
                value={expected}
              />
              <Input
                aria-label="Unit count"
                label="Unit count"
                min="1"
                onChange={(event) => setUnits(event.target.value)}
                type="number"
                value={units}
              />
              <Textarea
                aria-label="Dock notes"
                className="adoption-form-wide"
                label="Dock notes"
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Add handling notes"
                value={notes}
              />
            </FormGrid>
            <FormActions>
              <Button intent="quiet" onClick={onCancel} type="button">
                Cancel
              </Button>
              <Button type="submit">Save receipt</Button>
            </FormActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function InventoryPage() {
  const inventory = [
    ["SKU-481", "Wireless scanner", "Jakarta Hub", "142", "Healthy"],
    ["SKU-218", "Packing tape", "Bandung Depot", "38", "Watch"],
    ["SKU-704", "Thermal labels", "Surabaya Crossdock", "216", "Healthy"],
  ];

  return (
    <div className="adoption-route-stack" data-testid="inventory-page">
      <PageHeader
        description="Keep a quick view of the items that support the receiving workflow."
        overline="Operations / Stock"
        title="Inventory"
      />
      <Card>
        <CardContent>
          <Table aria-label="Inventory levels">
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Signal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map(([sku, item, location, available, signal]) => (
                <TableRow key={sku}>
                  <TableCell>{sku}</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{available}</TableCell>
                  <TableCell>
                    <StatusChip
                      tone={signal === "Healthy" ? "success" : "warning"}
                    >
                      {signal}
                    </StatusChip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function ReceiptDetails({
  onClose,
  onReceive,
  receipt,
}: {
  onClose: () => void;
  onReceive: () => void;
  receipt: Receipt;
}) {
  return (
    <DetailDrawer
      description="Review ownership, timing, and receiving status without leaving the queue."
      onClose={onClose}
      open
      title={receipt.id}
    >
      <div className="adoption-drawer-stack">
        <KeyValueList
          items={[
            { label: "Supplier", value: receipt.supplier },
            { label: "Warehouse", value: receipt.warehouse },
            { label: "Expected", value: receipt.expected },
            { label: "Units", value: receipt.units.toLocaleString() },
            {
              label: "Status",
              value: <ReceiptStatusChip status={receipt.status} />,
            },
            { label: "Owner", value: receipt.owner },
          ]}
        />
        <Card tone="subtle">
          <CardContent>
            <Typography typeRole="body-sm">{receipt.notes}</Typography>
          </CardContent>
        </Card>
        <div className="adoption-drawer-actions">
          <Button
            disabled={receipt.status === "Received"}
            leadingIcon="approve"
            onClick={onReceive}
          >
            Mark as received
          </Button>
        </div>
      </div>
    </DetailDrawer>
  );
}

function ReceiptsPage({
  onCreate,
  onOpen,
  receipts,
}: {
  onCreate: () => void;
  onOpen: (id: string) => void;
  receipts: Receipt[];
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ReceiptStatus | "all">("all");
  const visibleReceipts = useMemo(
    () => filterReceipts(receipts, query, status),
    [query, receipts, status],
  );
  const counts = countReceiptsByStatus(receipts);
  const columns: DataTableColumn<Receipt>[] = [
    {
      header: "Receipt",
      key: "id",
      render: (receipt) => <strong>{receipt.id}</strong>,
      required: true,
      sortable: true,
    },
    { header: "Supplier", key: "supplier", sortable: true },
    { header: "Warehouse", key: "warehouse" },
    { header: "Expected", key: "expected", sortable: true },
    {
      align: "right",
      header: "Units",
      key: "units",
      render: (receipt) => receipt.units.toLocaleString(),
    },
    {
      header: "Status",
      key: "status",
      render: (receipt) => <ReceiptStatusChip status={receipt.status} />,
    },
    {
      align: "right",
      header: "Action",
      key: "action",
      render: (receipt) => (
        <Button
          aria-label={`Open ${receipt.id}`}
          intent="quiet"
          leadingIcon="view"
          onClick={(event) => {
            event.stopPropagation();
            onOpen(receipt.id);
          }}
          size="sm"
        >
          Open
        </Button>
      ),
    },
  ];

  return (
    <div className="adoption-route-stack" data-testid="receipts-page">
      <PageHeader
        actions={
          <Button
            data-testid="create-receipt"
            leadingIcon="add"
            onClick={onCreate}
          >
            New receipt
          </Button>
        }
        description="Coordinate expected deliveries and keep the receiving queue moving."
        overline="Operations / Inbound"
        title="Inbound receipts"
      />
      <KPICluster
        items={[
          {
            icon: "calendar",
            label: "Scheduled",
            tone: "warning",
            value: counts.Scheduled,
          },
          {
            icon: "pending",
            label: "Receiving",
            tone: "primary",
            value: counts.Receiving,
          },
          {
            icon: "success",
            label: "Received",
            tone: "success",
            value: counts.Received,
          },
        ]}
        label="Receipt summary"
      />
      <div className="adoption-filter-stack">
        <div className="adoption-filter-toolbar">
          <SearchInput
            aria-label="Search receipts"
            label="Search receipts"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ID, supplier, warehouse"
            value={query}
          />
          <Select
            aria-label="Status filter"
            label="Status"
            onChange={(event) =>
              setStatus(event.target.value as ReceiptStatus | "all")
            }
            value={status}
          >
            <option value="all">All statuses</option>
            {receiptStatuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Typography
            aria-live="polite"
            className="adoption-filter-result"
            typeRole="caption"
          >
            {visibleReceipts.length} of {receipts.length} receipts
          </Typography>
        </div>
      </div>
      <DataTable
        caption="Inbound receipts"
        columns={columns}
        data-testid="receipt-table"
        density="compact"
        emptyMessage="No receipts match the current filters."
        onRowClick={(receipt) => onOpen(receipt.id)}
        rowKey={(receipt) => receipt.id}
        rows={visibleReceipts}
      />
    </div>
  );
}

function OperationsApp() {
  const [route, setRoute] = useState<Route>(() =>
    routeFromPath(window.location.pathname),
  );
  const [receipts, setReceipts] = useState(initialReceipts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () =>
      setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function go(pathname: string) {
    setSelectedId(null);
    setMobileNavigationOpen(false);
    navigate(pathname);
  }

  function handleCreate(input: ReceiptInput) {
    const receipt = buildReceipt(receipts, input);
    setReceipts((current) => [receipt, ...current]);
    setNotice(`${receipt.id} created`);
    go("/operations");
  }

  const activeKey = route === "inventory" ? "inventory" : "receipts";
  const selectedReceipt = selectedId
    ? receipts.find((receipt) => receipt.id === selectedId)
    : undefined;
  const sidebar = (
    <OperationsSidebar
      activeKey={activeKey}
      onNavigate={(key) => {
        if (key === "inventory") go("/inventory");
        if (key === "receipts") go("/operations");
      }}
    />
  );

  return (
    <AppShell
      sidebar={sidebar}
      topbar={
        <div className="adoption-topbar">
          <Button
            aria-label="Open navigation"
            className="adoption-mobile-nav-button"
            intent="quiet"
            leadingIcon="menu"
            onClick={() => setMobileNavigationOpen(true)}
            size="sm"
          >
            Menu
          </Button>
          <Typography typeRole="label">Ledgerly Operations</Typography>
          <Typography className="adoption-topbar-context" typeRole="caption">
            Receiving workspace
          </Typography>
        </div>
      }
    >
      {route === "new" ? (
        <ReceiptForm
          onCancel={() => go("/operations")}
          onSubmit={handleCreate}
        />
      ) : route === "inventory" ? (
        <InventoryPage />
      ) : (
        <ReceiptsPage
          onCreate={() => go("/operations/receipts/new")}
          onOpen={setSelectedId}
          receipts={receipts}
        />
      )}
      <MobileSidebar
        onClose={() => setMobileNavigationOpen(false)}
        open={mobileNavigationOpen}
        title="Operations navigation"
      >
        {sidebar}
      </MobileSidebar>
      {selectedReceipt ? (
        <ReceiptDetails
          onClose={() => setSelectedId(null)}
          onReceive={() => {
            setReceipts((current) =>
              markReceiptReceived(current, selectedReceipt.id),
            );
            setNotice(`${selectedReceipt.id} marked received`);
          }}
          receipt={selectedReceipt}
        />
      ) : null}
      {notice ? (
        <div aria-live="polite" className="adoption-notice" role="status">
          {notice}
        </div>
      ) : null}
    </AppShell>
  );
}

export default function App() {
  const legacyTheme = themeFromQuery();

  return (
    <Ten4SevenProvider
      overrides={{
        config: {
          palette: legacyTheme.palette,
          radius: legacyTheme.radius,
        },
      }}
      preferences={{
        appearance: legacyTheme.appearance,
        density: legacyTheme.density,
      }}
      theme="enterprise"
    >
      <OperationsApp />
    </Ten4SevenProvider>
  );
}
