import type { ActivityItem, HierarchyItem, MilestoneItem } from "@ten4seven/ui";

export type FarmP1View =
  "overview" | "daily-operations" | "context" | "flocks" | "inventory";

export type FarmP1InventoryState =
  "not-entitled" | "setup-required" | "active" | "suspended";

export type FarmP1FlockStatus = "On track" | "Review";

export type FarmP1Context = {
  cycle: string;
  eggs: string;
  feed: string;
  flock: string;
  fcr: string;
  henDay: string;
  id: string;
  mortality: string;
  name: string;
  owner: string;
  population: string;
  region: string;
  snapshot: string;
  tenant: string;
};

export type FarmP1Flock = {
  age: string;
  caretaker: string;
  cycle: string;
  flock: string;
  house: string;
  id: string;
  lastEntry: string;
  mortality: string;
  population: string;
  status: FarmP1FlockStatus;
};

export const farmP1Navigation = [
  {
    description: "What needs attention today",
    icon: "analytics" as const,
    id: "overview" as const,
    label: "Farm overview",
  },
  {
    description: "Capture the daily record",
    icon: "egg" as const,
    id: "daily-operations" as const,
    label: "Daily operations",
  },
  {
    description: "Tenant, farm, and flock",
    icon: "farm" as const,
    id: "context" as const,
    label: "Farm context",
  },
  {
    description: "Flocks and active cycles",
    icon: "chicken" as const,
    id: "flocks" as const,
    label: "Flocks & cycles",
  },
  {
    description: "Optional capability state",
    icon: "inventory" as const,
    id: "inventory" as const,
    label: "Inventory capability",
  },
] as const;

export const farmP1Contexts: FarmP1Context[] = [
  {
    cycle: "Layer cycle 24-A",
    eggs: "42,860",
    feed: "112 g / bird",
    flock: "House A · Flock 01",
    fcr: "1.72",
    henDay: "88.7%",
    id: "farm-north",
    mortality: "0.8%",
    name: "Farm North",
    owner: "Sari Wulandari",
    population: "48,240",
    region: "Kediri · Unit 01",
    snapshot: "Today · 09:20",
    tenant: "Ayu Poultry Group",
  },
  {
    cycle: "Layer cycle 24-B",
    eggs: "38,410",
    feed: "109 g / bird",
    flock: "House C · Flock 03",
    fcr: "1.76",
    henDay: "85.4%",
    id: "farm-central",
    mortality: "0.6%",
    name: "Farm Central",
    owner: "Dewi Lestari",
    population: "44,980",
    region: "Blitar · Unit 02",
    snapshot: "Today · 09:12",
    tenant: "Ayu Poultry Group",
  },
];

export const farmP1Flocks: FarmP1Flock[] = [
  {
    age: "42 weeks",
    caretaker: "Maya Chen",
    cycle: "Layer cycle 24-A",
    flock: "Flock 01",
    house: "House A",
    id: "flock-01",
    lastEntry: "Today · 09:20",
    mortality: "0.8%",
    population: "24,120",
    status: "On track",
  },
  {
    age: "39 weeks",
    caretaker: "Jordan Park",
    cycle: "Layer cycle 24-A",
    flock: "Flock 02",
    house: "House B",
    id: "flock-02",
    lastEntry: "Today · 09:05",
    mortality: "0.7%",
    population: "24,120",
    status: "Review",
  },
  {
    age: "35 weeks",
    caretaker: "Lina Wibowo",
    cycle: "Layer cycle 24-B",
    flock: "Flock 03",
    house: "House C",
    id: "flock-03",
    lastEntry: "Yesterday · 16:40",
    mortality: "0.6%",
    population: "22,490",
    status: "On track",
  },
  {
    age: "31 weeks",
    caretaker: "Rafi Pranoto",
    cycle: "Layer cycle 24-B",
    flock: "Flock 04",
    house: "House D",
    id: "flock-04",
    lastEntry: "Yesterday · 15:55",
    mortality: "1.1%",
    population: "22,490",
    status: "Review",
  },
];

export const farmP1Hierarchy: HierarchyItem[] = [
  {
    description: "Kediri · Unit 01",
    id: "farm-north",
    label: "Farm North",
    children: [
      {
        description: "Current production cycle",
        id: "cycle-24-a",
        label: "Layer cycle 24-A",
        children: [
          { id: "flock-01", label: "House A · Flock 01" },
          { id: "flock-02", label: "House B · Flock 02" },
        ],
      },
    ],
  },
  {
    description: "Blitar · Unit 02",
    id: "farm-central",
    label: "Farm Central",
    children: [
      {
        description: "Current production cycle",
        id: "cycle-24-b",
        label: "Layer cycle 24-B",
        children: [
          { id: "flock-03", label: "House C · Flock 03" },
          { id: "flock-04", label: "House D · Flock 04" },
        ],
      },
    ],
  },
];

export const farmP1JourneyMilestones: MilestoneItem[] = [
  {
    description: "Signed-in fixture session",
    icon: "check",
    id: "authenticate",
    label: "Authenticate",
    meta: "Ready",
    percentage: 100,
    status: "complete",
  },
  {
    description: "Ayu Poultry Group",
    icon: "users",
    id: "tenant",
    label: "Tenant context",
    meta: "Selected",
    percentage: 100,
    status: "complete",
  },
  {
    description: "Farm North",
    icon: "farm",
    id: "farm",
    label: "Farm",
    meta: "Selected",
    percentage: 100,
    status: "complete",
  },
  {
    description: "Layer cycle 24-A · House A",
    icon: "chicken",
    id: "flock",
    label: "Flock & cycle",
    meta: "Selected",
    percentage: 100,
    status: "complete",
  },
  {
    description: "Eggs, feed, population, mortality",
    icon: "egg",
    id: "daily-operations",
    label: "Daily entry",
    meta: "Next action",
    percentage: 35,
    status: "current",
  },
  {
    description: "Signals become a clear decision",
    icon: "analytics",
    id: "overview",
    label: "Farm overview",
    meta: "Upcoming",
    percentage: 0,
    status: "upcoming",
  },
];

export const farmP1OverviewActivity: ActivityItem[] = [
  {
    actor: "Maya Chen",
    description: "Daily production record captured for House A.",
    icon: "egg",
    id: "activity-eggs",
    meta: "Today · 09:20",
    title: "Egg collection recorded",
  },
  {
    actor: "Jordan Park",
    description: "Feed issue reconciled against the morning count.",
    icon: "package",
    id: "activity-feed",
    meta: "Today · 08:45",
    title: "Feed issue confirmed",
  },
  {
    actor: "Lina Wibowo",
    description: "Population count is ready for the next review.",
    icon: "users",
    id: "activity-population",
    meta: "Yesterday · 16:40",
    title: "Flock count updated",
  },
];

export const farmP1InventoryStates: Array<{
  description: string;
  icon: "inventory" | "settings" | "check" | "warning";
  label: string;
  state: FarmP1InventoryState;
  title: string;
}> = [
  {
    description: "This customer reference does not include Inventory yet.",
    icon: "inventory",
    label: "Unavailable",
    state: "not-entitled",
    title: "Inventory is not part of this starter workspace",
  },
  {
    description: "A workspace administrator must complete the first setup.",
    icon: "settings",
    label: "Setup required",
    state: "setup-required",
    title: "Inventory needs a one-time setup",
  },
  {
    description: "Stock movements and current balances are ready to review.",
    icon: "check",
    label: "Active",
    state: "active",
    title: "Inventory is connected",
  },
  {
    description: "The capability is paused while its source is reviewed.",
    icon: "warning",
    label: "Suspended",
    state: "suspended",
    title: "Inventory is temporarily suspended",
  },
];

export const farmP1InventoryStateLabels: Record<FarmP1InventoryState, string> =
  {
    active: "Active",
    "not-entitled": "Unavailable",
    "setup-required": "Setup required",
    suspended: "Suspended",
  };
