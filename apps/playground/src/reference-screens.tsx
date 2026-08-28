import { useEffect, useMemo, useState, type ReactNode } from "react";

import { T7Icon } from "@ten4seven/icons";
import {
  AppShell,
  Badge,
  BulkActionBar,
  Button,
  CartLineItem,
  CartPanel,
  CartTrigger,
  Checkbox,
  DataTable,
  DetailDrawer,
  EmptyState,
  FilterToolbar,
  Input,
  KPICluster,
  PageHeader,
  Pagination,
  Popover,
  Price,
  ProductCard,
  ProductGrid,
  ProductMeta,
  PublicShell,
  Radio,
  Rating,
  SearchInput,
  Select,
  Sidebar,
  Typography,
  OrderSummary,
  type DataTableColumn,
  type DataTableSort,
} from "@ten4seven/ui";

function ReferenceBrand({
  icon,
  subtitle,
  title,
}: {
  icon: "warehouse" | "book";
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

type StockStatus = "Healthy" | "Low stock" | "Out of stock";

type InventoryItem = {
  id: string;
  itemCode: string;
  itemName: string;
  category: "Beverage" | "Pantry" | "Packaging" | "Cleaning";
  warehouse: "North Dock" | "South Dock";
  bin: string;
  onHand: number;
  reserved: number;
  available: number;
  status: StockStatus;
  lastMovement: string;
  movementRank: number;
  reorderPoint: number;
  unitCost: number;
  supplier: string;
};

const inventoryItems: InventoryItem[] = [
  {
    id: "inv-1042",
    itemCode: "WH-1042",
    itemName: "Organic oat milk 1L",
    category: "Beverage",
    warehouse: "North Dock",
    bin: "A-14-03",
    onHand: 1248,
    reserved: 84,
    available: 1164,
    status: "Healthy",
    lastMovement: "Aug 26, 2026 · 09:42",
    movementRank: 6,
    reorderPoint: 320,
    unitCost: 2.84,
    supplier: "Prima Pangan",
  },
  {
    id: "inv-1048",
    itemCode: "WH-1048",
    itemName: "Arabica coffee beans 1kg",
    category: "Beverage",
    warehouse: "North Dock",
    bin: "B-03-11",
    onHand: 214,
    reserved: 46,
    available: 168,
    status: "Low stock",
    lastMovement: "Aug 26, 2026 · 08:17",
    movementRank: 5,
    reorderPoint: 180,
    unitCost: 14.2,
    supplier: "Ridge Roasters",
  },
  {
    id: "inv-1083",
    itemCode: "WH-1083",
    itemName: "Recycled mailer 320mm",
    category: "Packaging",
    warehouse: "South Dock",
    bin: "P-08-04",
    onHand: 9420,
    reserved: 1120,
    available: 8300,
    status: "Healthy",
    lastMovement: "Aug 25, 2026 · 16:08",
    movementRank: 4,
    reorderPoint: 2400,
    unitCost: 0.38,
    supplier: "Loop Packaging",
  },
  {
    id: "inv-1112",
    itemCode: "WH-1112",
    itemName: "Citrus floor cleaner 5L",
    category: "Cleaning",
    warehouse: "South Dock",
    bin: "C-02-07",
    onHand: 76,
    reserved: 12,
    available: 64,
    status: "Low stock",
    lastMovement: "Aug 25, 2026 · 13:31",
    movementRank: 3,
    reorderPoint: 90,
    unitCost: 11.6,
    supplier: "Clearline Supply",
  },
  {
    id: "inv-1130",
    itemCode: "WH-1130",
    itemName: "Canned chickpeas 400g",
    category: "Pantry",
    warehouse: "North Dock",
    bin: "D-11-02",
    onHand: 0,
    reserved: 0,
    available: 0,
    status: "Out of stock",
    lastMovement: "Aug 24, 2026 · 11:54",
    movementRank: 2,
    reorderPoint: 240,
    unitCost: 1.18,
    supplier: "Prima Pangan",
  },
  {
    id: "inv-1157",
    itemCode: "WH-1157",
    itemName: "Corrugated carton 400mm",
    category: "Packaging",
    warehouse: "South Dock",
    bin: "P-02-13",
    onHand: 3420,
    reserved: 420,
    available: 3000,
    status: "Healthy",
    lastMovement: "Aug 23, 2026 · 15:24",
    movementRank: 1,
    reorderPoint: 900,
    unitCost: 1.12,
    supplier: "Loop Packaging",
  },
  {
    id: "inv-1174",
    itemCode: "WH-1174",
    itemName: "Sparkling water 12-pack",
    category: "Beverage",
    warehouse: "North Dock",
    bin: "A-08-09",
    onHand: 486,
    reserved: 120,
    available: 366,
    status: "Healthy",
    lastMovement: "Aug 22, 2026 · 10:45",
    movementRank: 0,
    reorderPoint: 200,
    unitCost: 4.6,
    supplier: "Blue Current",
  },
  {
    id: "inv-1199",
    itemCode: "WH-1199",
    itemName: "Bamboo cutlery set",
    category: "Pantry",
    warehouse: "South Dock",
    bin: "D-04-08",
    onHand: 138,
    reserved: 30,
    available: 108,
    status: "Low stock",
    lastMovement: "Aug 21, 2026 · 09:18",
    movementRank: -1,
    reorderPoint: 160,
    unitCost: 2.1,
    supplier: "Green Table Co.",
  },
];

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function Quantity({ value }: { value: number }) {
  return (
    <span className="reference-quantity">
      <span data-numeric>{formatNumber(value)}</span>
      <span className="reference-unit">pcs</span>
    </span>
  );
}

function StockStatusBadge({ status }: { status: StockStatus }) {
  const tone =
    status === "Healthy"
      ? "success"
      : status === "Low stock"
        ? "warning"
        : "danger";
  const icon =
    status === "Healthy"
      ? "success"
      : status === "Low stock"
        ? "warning"
        : "danger";

  return (
    <Badge tone={tone}>
      <T7Icon name={icon} size={13} />
      {status}
    </Badge>
  );
}

function OperationalTopbar({
  children,
  context,
  icon,
}: {
  children?: ReactNode;
  context: string;
  icon: "warehouse" | "book";
}) {
  return (
    <div className="reference-topbar">
      <div className="reference-topbar-context">
        <T7Icon name={icon} size={18} />
        <div>
          <Typography typeRole="label">{context}</Typography>
          <Typography typeRole="caption">Operations workspace</Typography>
        </div>
      </div>
      <div className="reference-topbar-actions">{children}</div>
    </div>
  );
}

function InventoryDrawerContent({
  item,
  onClose,
}: {
  item: InventoryItem;
  onClose: () => void;
}) {
  return (
    <div className="reference-drawer-stack">
      <div className="reference-drawer-identity">
        <span className="reference-drawer-icon">
          <T7Icon name="item" size={24} />
        </span>
        <div>
          <Typography typeRole="overline">{item.itemCode}</Typography>
          <Typography as="h3" typeRole="heading-md">
            {item.itemName}
          </Typography>
          <Typography typeRole="body-sm">{item.category}</Typography>
        </div>
        <StockStatusBadge status={item.status} />
      </div>

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Stock summary
        </Typography>
        <dl className="reference-detail-list">
          <div>
            <dt>On hand</dt>
            <dd>
              <Quantity value={item.onHand} />
            </dd>
          </div>
          <div>
            <dt>Reserved</dt>
            <dd>
              <Quantity value={item.reserved} />
            </dd>
          </div>
          <div>
            <dt>Available</dt>
            <dd>
              <Quantity value={item.available} />
            </dd>
          </div>
          <div>
            <dt>Reorder point</dt>
            <dd>
              <Quantity value={item.reorderPoint} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Location and movement
        </Typography>
        <dl className="reference-detail-list">
          <div>
            <dt>Warehouse</dt>
            <dd>{item.warehouse}</dd>
          </div>
          <div>
            <dt>Bin</dt>
            <dd>{item.bin}</dd>
          </div>
          <div>
            <dt>Last movement</dt>
            <dd>{item.lastMovement}</dd>
          </div>
          <div>
            <dt>Supplier</dt>
            <dd>{item.supplier}</dd>
          </div>
        </dl>
      </section>

      <section className="reference-drawer-section">
        <Typography as="h3" typeRole="heading-sm">
          Recent movements
        </Typography>
        <div className="reference-movement-list">
          <div>
            <T7Icon name="stockIn" size={16} />
            <span>
              <strong>Received</strong>
              <small>Aug 26, 2026 · 09:42</small>
            </span>
            <b data-numeric>+240</b>
          </div>
          <div>
            <T7Icon name="stockOut" size={16} />
            <span>
              <strong>Allocated</strong>
              <small>Aug 25, 2026 · 14:10</small>
            </span>
            <b data-numeric>-84</b>
          </div>
        </div>
      </section>

      <div className="reference-drawer-actions">
        <Button intent="secondary" leadingIcon="edit">
          Edit item
        </Button>
        <Button intent="quiet" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}

export type WarehouseViewState = "ready" | "loading" | "error" | "empty";

export interface WarehouseInventoryProps {
  viewState: WarehouseViewState;
  onViewStateChange: (viewState: WarehouseViewState) => void;
}

export function WarehouseInventory({
  onViewStateChange,
  viewState,
}: WarehouseInventoryProps) {
  const [query, setQuery] = useState("");
  const [warehouse, setWarehouse] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);
  const [notice, setNotice] = useState("");
  const [sort, setSort] = useState<DataTableSort>({
    direction: "desc",
    key: "lastMovement",
  });
  const pageSize = 5;

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const next = inventoryItems.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        [item.itemCode, item.itemName, item.bin, item.supplier]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesWarehouse =
        warehouse === "all" || item.warehouse === warehouse;
      const matchesCategory = category === "all" || item.category === category;
      const matchesStatus = status === "all" || item.status === status;
      return (
        matchesQuery && matchesWarehouse && matchesCategory && matchesStatus
      );
    });

    return [...next].sort((left, right) => {
      const direction = sort.direction === "asc" ? 1 : -1;
      if (sort.key === "available")
        return (left.available - right.available) * direction;
      if (sort.key === "itemCode")
        return left.itemCode.localeCompare(right.itemCode) * direction;
      if (sort.key === "status")
        return left.status.localeCompare(right.status) * direction;
      return (left.movementRank - right.movementRank) * direction;
    });
  }, [category, query, sort, status, warehouse]);

  const visibleItems = filteredItems.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function updateFilter<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
    setSelectedRowKeys([]);
  }

  function updateSort(key: string) {
    setPage(1);
    setSort((current) => ({
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
      key,
    }));
  }

  const columns: DataTableColumn<InventoryItem>[] = [
    {
      header: "Item",
      key: "itemCode",
      sortable: true,
      render: (item) => (
        <div className="reference-item-cell">
          <Typography typeRole="label">{item.itemCode}</Typography>
          <Typography typeRole="body-sm">{item.itemName}</Typography>
        </div>
      ),
    },
    {
      header: "Warehouse / bin",
      key: "bin",
      render: (item) => (
        <div className="reference-item-cell">
          <Typography typeRole="table-cell">{item.warehouse}</Typography>
          <Typography typeRole="caption">{item.bin}</Typography>
        </div>
      ),
    },
    {
      align: "right",
      header: "On hand",
      key: "onHand",
      render: (item) => <Quantity value={item.onHand} />,
    },
    {
      align: "right",
      header: "Reserved",
      key: "reserved",
      render: (item) => <Quantity value={item.reserved} />,
    },
    {
      align: "right",
      header: "Available",
      key: "available",
      sortable: true,
      render: (item) => <Quantity value={item.available} />,
    },
    {
      header: "Status",
      key: "status",
      sortable: true,
      render: (item) => <StockStatusBadge status={item.status} />,
    },
    {
      header: "Last movement",
      key: "lastMovement",
      sortable: true,
      render: (item) => (
        <Typography typeRole="caption">{item.lastMovement}</Typography>
      ),
    },
    {
      align: "right",
      header: "Actions",
      key: "actions",
      render: (item) => (
        <div className="reference-table-actions">
          <Button
            aria-label={`View ${item.itemCode}`}
            intent="quiet"
            leadingIcon="view"
            onClick={(event) => {
              event.stopPropagation();
              setDetailItem(item);
            }}
            size="sm"
          >
            View
          </Button>
          <Button
            aria-label={`More actions for ${item.itemCode}`}
            intent="quiet"
            leadingIcon="more"
            onClick={(event) => {
              event.stopPropagation();
              setNotice(
                `More actions for ${item.itemCode} are ready for wiring.`,
              );
            }}
            size="sm"
          />
        </div>
      ),
    },
  ];

  const warehouseSidebar = (
    <Sidebar
      activeKey="inventory"
      brand={
        <ReferenceBrand
          icon="warehouse"
          subtitle="Operations workspace"
          title="ten4seven UI"
        />
      }
      items={[
        { icon: "inventory", key: "inventory", label: "Inventory" },
        { icon: "stockIn", key: "inbound", label: "Inbound" },
        { icon: "stockOut", key: "outbound", label: "Outbound" },
        { icon: "warehouse", key: "locations", label: "Locations" },
        { icon: "table", key: "reports", label: "Reports" },
      ]}
    />
  );

  return (
    <AppShell
      className="reference-app-shell warehouse-app-shell"
      sidebar={warehouseSidebar}
      topbar={
        <OperationalTopbar context="ten4seven UI / Inventory" icon="warehouse">
          <Button
            aria-label="Open warehouse settings"
            intent="quiet"
            leadingIcon="settings"
            size="sm"
          />
        </OperationalTopbar>
      }
    >
      <div className="reference-page" data-profile="enterprise">
        <PageHeader
          actions={
            <>
              <Button
                intent="secondary"
                leadingIcon="stockIn"
                onClick={() =>
                  setNotice("Stock movement flow is ready for wiring.")
                }
              >
                Stock movement
              </Button>
              <Button
                leadingIcon="add"
                onClick={() =>
                  setNotice("New inventory item flow is ready for wiring.")
                }
              >
                Add item
              </Button>
            </>
          }
          description="Track available stock across receiving, storage, and fulfillment locations."
          meta={
            <>
              <Badge tone="primary">
                <T7Icon name="inventory" size={13} />
                1,248 SKUs
              </Badge>
              <Typography typeRole="caption">
                Last synced Aug 26, 2026 · 09:45
              </Typography>
            </>
          }
          overline="Operations · Inventory control"
          title="Warehouse inventory"
        />

        <KPICluster
          items={[
            {
              icon: "inventory",
              label: "Total SKUs",
              note: "Across 2 warehouses",
              value: "1,248",
            },
            {
              icon: "package",
              label: "Available units",
              note: "3.8% above plan",
              value: "48,920",
            },
            {
              icon: "warning",
              label: "Low stock",
              note: "Needs review today",
              tone: "warning",
              value: "18",
            },
            {
              icon: "danger",
              label: "Out of stock",
              note: "2 replenishments due",
              tone: "danger",
              value: "4",
            },
          ]}
        />

        <FilterToolbar
          actions={
            <>
              <Button
                intent="quiet"
                leadingIcon="export"
                onClick={() =>
                  setNotice("Inventory export prepared from the active query.")
                }
                size="sm"
              >
                Export
              </Button>
              <Button
                intent="secondary"
                leadingIcon="stockIn"
                onClick={() =>
                  setNotice("Receive stock flow is ready for wiring.")
                }
                size="sm"
              >
                Receive stock
              </Button>
            </>
          }
          summary={`${filteredItems.length} matching inventory items`}
          title="Inventory query"
        >
          <Input
            aria-label="Search item or SKU"
            label="Search item / SKU"
            leadingIcon="search"
            onChange={(event) => updateFilter(setQuery, event.target.value)}
            placeholder="Search item, SKU, bin…"
            value={query}
          />
          <Select
            label="Warehouse"
            onChange={(event) => updateFilter(setWarehouse, event.target.value)}
            value={warehouse}
          >
            <option value="all">All warehouses</option>
            <option value="North Dock">North Dock</option>
            <option value="South Dock">South Dock</option>
          </Select>
          <Select
            label="Category"
            onChange={(event) => updateFilter(setCategory, event.target.value)}
            value={category}
          >
            <option value="all">All categories</option>
            <option value="Beverage">Beverage</option>
            <option value="Pantry">Pantry</option>
            <option value="Packaging">Packaging</option>
            <option value="Cleaning">Cleaning</option>
          </Select>
          <Select
            label="Stock status"
            onChange={(event) => updateFilter(setStatus, event.target.value)}
            value={status}
          >
            <option value="all">All statuses</option>
            <option value="Healthy">Healthy</option>
            <option value="Low stock">Low stock</option>
            <option value="Out of stock">Out of stock</option>
          </Select>
        </FilterToolbar>

        {notice ? (
          <div className="reference-inline-notice" role="status">
            <T7Icon name="check" size={15} />
            <Typography typeRole="caption">{notice}</Typography>
            <Button intent="quiet" onClick={() => setNotice("")} size="sm">
              Dismiss
            </Button>
          </div>
        ) : null}

        <section
          className="reference-data-section"
          aria-labelledby="inventory-items-title"
        >
          <div className="reference-section-bar">
            <div>
              <Typography
                as="h2"
                typeRole="heading-lg"
                id="inventory-items-title"
              >
                Inventory items
              </Typography>
              <Typography typeRole="body-sm">
                Select rows to transfer stock or export a focused operational
                set.
              </Typography>
            </div>
            <Badge tone="neutral">
              <T7Icon name="filter" size={13} />
              {filteredItems.length} shown
            </Badge>
          </div>

          {selectedRowKeys.length > 0 ? (
            <BulkActionBar
              actions={
                <>
                  <Button
                    intent="secondary"
                    leadingIcon="transfer"
                    onClick={() =>
                      setNotice(
                        `${selectedRowKeys.length} items queued for transfer.`,
                      )
                    }
                    size="sm"
                  >
                    Transfer
                  </Button>
                  <Button
                    intent="quiet"
                    leadingIcon="export"
                    onClick={() =>
                      setNotice(
                        `${selectedRowKeys.length} items added to export.`,
                      )
                    }
                    size="sm"
                  >
                    Export
                  </Button>
                </>
              }
              noun={selectedRowKeys.length === 1 ? "item" : "items"}
              onClear={() => setSelectedRowKeys([])}
              selectedCount={selectedRowKeys.length}
            />
          ) : null}

          <DataTable
            caption="Warehouse inventory items"
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
                description="Try another item code, warehouse, category, or status."
                icon="search"
                title="No inventory items match"
              />
            }
            error={
              viewState === "error" ? (
                <div className="reference-table-state-action">
                  <T7Icon name="danger" size={18} />
                  <span>
                    Inventory fixture unavailable. Retry the local read.
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
            onRowClick={setDetailItem}
            onSelectionChange={setSelectedRowKeys}
            onSort={updateSort}
            rowKey={(item) => item.id}
            rows={viewState === "empty" ? [] : visibleItems}
            selectable
            selectedRowKeys={selectedRowKeys}
            sort={sort}
          />
          <Pagination
            onPageChange={setPage}
            page={page}
            pageSize={pageSize}
            total={viewState === "empty" ? 0 : filteredItems.length}
          />
        </section>
      </div>

      <DetailDrawer
        description="Operational stock, location, and movement context."
        onClose={() => setDetailItem(null)}
        open={Boolean(detailItem)}
        title={
          detailItem ? `${detailItem.itemCode} detail` : "Inventory detail"
        }
      >
        {detailItem ? (
          <InventoryDrawerContent
            item={detailItem}
            onClose={() => setDetailItem(null)}
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

type Ebook = {
  id: string;
  title: string;
  author: string;
  category: EbookCategory;
  price: number;
  rating: number;
  format: "EPUB" | "PDF" | "EPUB + PDF";
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
    format: "EPUB + PDF",
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
    format: "PDF",
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
    format: "EPUB",
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
    format: "EPUB + PDF",
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
    format: "EPUB + PDF",
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
    format: "PDF",
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
    format: "EPUB + PDF",
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
    format: "EPUB",
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
    format: "PDF",
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
    format: "EPUB + PDF",
    availability: "Google Play Books",
    cover: "/publishing-covers/etika-kesehatan.svg",
  },
];

type EbookCatalogFiltersProps = {
  authorQuery: string;
  availability: EbookAvailability[];
  category: EbookCategoryFilter;
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
      <section className="ebook-filter-group" id="ebook-categories">
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

export function EbookStoreCatalog() {
  const [query, setQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [category, setCategory] = useState<EbookCategoryFilter>("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileCart, setMobileCart] = useState(false);
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
    const update = () => setMobileCart(media.matches);
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
          meta={`${book.author} · ${book.format}`}
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

  function scrollTo(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div className="ebook-store-actions">
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
          {mobileCart ? (
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
            { href: "#ebook-categories", key: "categories", label: "Kategori" },
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
          actions={
            <Button
              intent="secondary"
              leadingIcon="category"
              onClick={() => scrollTo("ebook-categories")}
            >
              Jelajahi kategori
            </Button>
          }
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
            <EbookCatalogFilters {...filterProps} />
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
                          book.format,
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
        <EbookCatalogFilters {...filterProps} />
        <div className="ebook-filter-drawer-footer">
          <Button onClick={() => setFilterDrawerOpen(false)}>
            Lihat hasil
          </Button>
        </div>
      </DetailDrawer>

      <DetailDrawer
        description="Tinjau item, jumlah, dan subtotal sebelum checkout."
        onClose={() => setCartOpen(false)}
        open={mobileCart && cartOpen}
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
                <span>{selectedBook.format}</span>
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
