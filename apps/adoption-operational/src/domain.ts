export const receiptStatuses = ["Scheduled", "Receiving", "Received"] as const;

export type ReceiptStatus = (typeof receiptStatuses)[number];

export type Receipt = {
  expected: string;
  id: string;
  notes: string;
  owner: string;
  status: ReceiptStatus;
  supplier: string;
  units: number;
  warehouse: string;
};

export type ReceiptInput = Pick<
  Receipt,
  "expected" | "notes" | "supplier" | "units" | "warehouse"
>;

export const initialReceipts: Receipt[] = [
  {
    id: "RCV-1042",
    supplier: "Northstar Components",
    warehouse: "Jakarta Hub",
    expected: "2026-08-29",
    units: 480,
    status: "Receiving",
    owner: "Maya Chen",
    notes: "Serials need a second scan before putaway.",
  },
  {
    id: "RCV-1041",
    supplier: "Bumi Office Supply",
    warehouse: "Bandung Depot",
    expected: "2026-08-30",
    units: 126,
    status: "Scheduled",
    owner: "Rafi Pratama",
    notes: "Dock appointment confirmed for the morning window.",
  },
  {
    id: "RCV-1039",
    supplier: "Awan Packaging",
    warehouse: "Jakarta Hub",
    expected: "2026-08-27",
    units: 920,
    status: "Received",
    owner: "Maya Chen",
    notes: "Count reconciled with the purchase order.",
  },
  {
    id: "RCV-1038",
    supplier: "Sagara Logistics",
    warehouse: "Surabaya Crossdock",
    expected: "2026-08-31",
    units: 275,
    status: "Scheduled",
    owner: "Dimas Wibowo",
    notes: "Carrier will call on arrival.",
  },
];

export function filterReceipts(
  records: Receipt[],
  query: string,
  status: ReceiptStatus | "all",
) {
  const normalized = query.trim().toLowerCase();
  return records.filter((record) => {
    const matchesQuery =
      !normalized ||
      [record.id, record.supplier, record.warehouse, record.owner].some(
        (value) => value.toLowerCase().includes(normalized),
      );
    return matchesQuery && (status === "all" || record.status === status);
  });
}

export function buildReceipt(records: Receipt[], input: ReceiptInput): Receipt {
  const highestId = records.reduce((highest, record) => {
    const number = Number(record.id.replace("RCV-", ""));
    return Number.isFinite(number) ? Math.max(highest, number) : highest;
  }, 1000);

  return {
    ...input,
    id: `RCV-${highestId + 1}`,
    owner: "You",
    status: "Scheduled",
  };
}

export function markReceiptReceived(records: Receipt[], id: string) {
  return records.map((record) =>
    record.id === id ? { ...record, status: "Received" as const } : record,
  );
}

export function countReceiptsByStatus(records: Receipt[]) {
  return receiptStatuses.reduce(
    (counts, status) => ({
      ...counts,
      [status]: records.filter((record) => record.status === status).length,
    }),
    {} as Record<ReceiptStatus, number>,
  );
}
