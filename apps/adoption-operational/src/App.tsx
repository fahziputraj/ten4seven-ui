import { useEffect, useMemo, useState } from "react";

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

function routeFromPath(pathname: string): Route {
  if (pathname === "/inventory") return "inventory";
  if (pathname === "/operations/receipts/new") return "new";
  return "receipts";
}

function navigate(pathname: string) {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function LegacyStatus({ status }: { status: ReceiptStatus }) {
  return (
    <span className={`legacy-status legacy-status-${status.toLowerCase()}`}>
      {status}
    </span>
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    <section aria-labelledby="new-receipt-title" className="legacy-page">
      <div className="legacy-breadcrumb">Operations / Receipts / New</div>
      <div className="legacy-page-heading">
        <div>
          <h1 id="new-receipt-title">Create inbound receipt</h1>
          <p>
            Register an expected delivery before the dock team starts scanning.
          </p>
        </div>
      </div>
      <form
        aria-label="Create receipt form"
        className="legacy-form"
        onSubmit={handleSubmit}
      >
        <label>
          Supplier
          <input
            aria-label="Supplier"
            onChange={(event) => setSupplier(event.target.value)}
            placeholder="e.g. Northstar Components"
            required
            value={supplier}
          />
        </label>
        <label>
          Warehouse
          <select
            aria-label="Warehouse"
            onChange={(event) => setWarehouse(event.target.value)}
            value={warehouse}
          >
            <option>Jakarta Hub</option>
            <option>Bandung Depot</option>
            <option>Surabaya Crossdock</option>
          </select>
        </label>
        <label>
          Expected date
          <input
            aria-label="Expected date"
            onChange={(event) => setExpected(event.target.value)}
            type="date"
            value={expected}
          />
        </label>
        <label>
          Unit count
          <input
            aria-label="Unit count"
            min="1"
            onChange={(event) => setUnits(event.target.value)}
            type="number"
            value={units}
          />
        </label>
        <label className="legacy-form-wide">
          Dock notes
          <textarea
            aria-label="Dock notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add handling notes"
            value={notes}
          />
        </label>
        <div className="legacy-form-actions">
          <button
            className="legacy-button legacy-button-secondary"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button className="legacy-button" type="submit">
            Save receipt
          </button>
        </div>
      </form>
    </section>
  );
}

function InventoryPage() {
  const inventory = [
    ["SKU-481", "Wireless scanner", "Jakarta Hub", "142", "Healthy"],
    ["SKU-218", "Packing tape", "Bandung Depot", "38", "Watch"],
    ["SKU-704", "Thermal labels", "Surabaya Crossdock", "216", "Healthy"],
  ];

  return (
    <section
      aria-labelledby="inventory-title"
      className="legacy-page"
      data-testid="inventory-page"
    >
      <div className="legacy-page-heading">
        <div>
          <div className="legacy-eyebrow">Operations / Stock</div>
          <h1 id="inventory-title">Inventory</h1>
          <p>
            Keep a quick view of the items that support the receiving workflow.
          </p>
        </div>
      </div>
      <div className="legacy-panel">
        <table aria-label="Inventory levels">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item</th>
              <th>Location</th>
              <th>Available</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(([sku, item, location, available, signal]) => (
              <tr key={sku}>
                <td>{sku}</td>
                <td>{item}</td>
                <td>{location}</td>
                <td>{available}</td>
                <td>
                  <span
                    className={`legacy-status legacy-status-${signal.toLowerCase()}`}
                  >
                    {signal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
    <dialog
      aria-label={`${receipt.id} details`}
      className="legacy-dialog"
      data-testid="receipt-detail"
      open
    >
      <div className="legacy-dialog-card">
        <div className="legacy-dialog-header">
          <div>
            <div className="legacy-eyebrow">Inbound receipt</div>
            <h2>{receipt.id}</h2>
          </div>
          <button
            aria-label="Close receipt details"
            className="legacy-icon-button"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="legacy-detail-grid">
          <div>
            <span>Supplier</span>
            <strong>{receipt.supplier}</strong>
          </div>
          <div>
            <span>Warehouse</span>
            <strong>{receipt.warehouse}</strong>
          </div>
          <div>
            <span>Expected</span>
            <strong>{receipt.expected}</strong>
          </div>
          <div>
            <span>Units</span>
            <strong>{receipt.units.toLocaleString()}</strong>
          </div>
          <div>
            <span>Status</span>
            <LegacyStatus status={receipt.status} />
          </div>
          <div>
            <span>Owner</span>
            <strong>{receipt.owner}</strong>
          </div>
        </div>
        <p className="legacy-detail-note">{receipt.notes}</p>
        <div className="legacy-form-actions">
          <button
            className="legacy-button legacy-button-secondary"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
          <button
            className="legacy-button"
            disabled={receipt.status === "Received"}
            onClick={onReceive}
            type="button"
          >
            Mark as received
          </button>
        </div>
      </div>
    </dialog>
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

  return (
    <section
      aria-labelledby="receipts-title"
      className="legacy-page"
      data-testid="receipts-page"
    >
      <div className="legacy-page-heading">
        <div>
          <div className="legacy-eyebrow">Operations / Inbound</div>
          <h1 id="receipts-title">Inbound receipts</h1>
          <p>
            Coordinate expected deliveries and keep the receiving queue moving.
          </p>
        </div>
        <button
          className="legacy-button"
          data-testid="create-receipt"
          onClick={onCreate}
          type="button"
        >
          + New receipt
        </button>
      </div>
      <div className="legacy-metrics" aria-label="Receipt summary">
        <div>
          <span>Scheduled</span>
          <strong>{counts.Scheduled}</strong>
        </div>
        <div>
          <span>Receiving</span>
          <strong>{counts.Receiving}</strong>
        </div>
        <div>
          <span>Received</span>
          <strong>{counts.Received}</strong>
        </div>
      </div>
      <div
        className="legacy-toolbar"
        role="region"
        aria-label="Receipt filters"
      >
        <label className="legacy-search">
          Search receipts
          <input
            aria-label="Search receipts"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ID, supplier, warehouse"
            value={query}
          />
        </label>
        <label>
          Status
          <select
            aria-label="Status filter"
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
          </select>
        </label>
        <span className="legacy-results" role="status">
          {visibleReceipts.length} of {receipts.length} receipts
        </span>
      </div>
      <div className="legacy-panel legacy-table-wrap">
        <table aria-label="Inbound receipts">
          <thead>
            <tr>
              <th>Receipt</th>
              <th>Supplier</th>
              <th>Warehouse</th>
              <th>Expected</th>
              <th>Units</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {visibleReceipts.length ? (
              visibleReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>
                    <strong>{receipt.id}</strong>
                  </td>
                  <td>{receipt.supplier}</td>
                  <td>{receipt.warehouse}</td>
                  <td>{receipt.expected}</td>
                  <td>{receipt.units.toLocaleString()}</td>
                  <td>
                    <LegacyStatus status={receipt.status} />
                  </td>
                  <td>
                    <button
                      aria-label={`Open ${receipt.id}`}
                      className="legacy-text-button"
                      onClick={() => onOpen(receipt.id)}
                      type="button"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="legacy-empty">
                    No receipts match the current filters.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    routeFromPath(window.location.pathname),
  );
  const [receipts, setReceipts] = useState(initialReceipts);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const handlePopState = () =>
      setRoute(routeFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function go(pathname: string) {
    setSelectedId(null);
    navigate(pathname);
  }

  function handleCreate(input: ReceiptInput) {
    const receipt = buildReceipt(receipts, input);
    setReceipts((current) => [receipt, ...current]);
    setNotice(`${receipt.id} created`);
    go("/operations");
  }

  const selectedReceipt = selectedId
    ? receipts.find((receipt) => receipt.id === selectedId)
    : undefined;

  return (
    <div className="legacy-app-shell">
      <aside className="legacy-sidebar">
        <div className="legacy-brand">
          <span className="legacy-brand-mark">L</span>
          <span>
            Ledgerly<small>Operations</small>
          </span>
        </div>
        <nav aria-label="Application navigation">
          <div className="legacy-nav-label">Workspace</div>
          <a
            className={
              route === "receipts" || route === "new" ? "is-active" : undefined
            }
            href="/operations"
            onClick={(event) => {
              event.preventDefault();
              go("/operations");
            }}
          >
            <span>▣</span>Receipts
          </a>
          <a
            className={route === "inventory" ? "is-active" : undefined}
            href="/inventory"
            onClick={(event) => {
              event.preventDefault();
              go("/inventory");
            }}
          >
            <span>◫</span>Inventory
          </a>
          <a href="/settings" onClick={(event) => event.preventDefault()}>
            <span>⚙</span>Settings
          </a>
        </nav>
        <div className="legacy-sidebar-foot">
          <span className="legacy-avatar">MC</span>
          <span>
            <strong>Maya Chen</strong>
            <small>Operations lead</small>
          </span>
        </div>
      </aside>
      <main className="legacy-main">
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
      </main>
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
        <div
          aria-live="polite"
          className="legacy-notice"
          onAnimationEnd={() => setNotice("")}
        >
          {notice}
        </div>
      ) : null}
    </div>
  );
}
