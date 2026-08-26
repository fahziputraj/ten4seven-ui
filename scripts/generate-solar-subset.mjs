import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const repoRoot = path.resolve(import.meta.dirname, "..");
const iconsRequire = createRequire(
  path.join(repoRoot, "packages/icons/package.json"),
);
const solar = iconsRequire("@iconify-json/solar/icons.json");

const selected = {
  dashboard: "home-angle-bold-duotone",
  tokens: "layers-bold-duotone",
  components: "widget-5-bold-duotone",
  theme: "palette-bold-duotone",
  settings: "settings-bold-duotone",
  sun: "sun-2-bold-duotone",
  moon: "moon-stars-bold-duotone",
  check: "check-circle-bold",
  approve: "check-circle-bold",
  chevronDown: "alt-arrow-down-linear",
  arrowLeft: "alt-arrow-left-bold",
  arrowRight: "alt-arrow-right-bold",
  search: "card-search-bold-duotone",
  filter: "filter-bold-duotone",
  sort: "sort-vertical-bold-duotone",
  export: "file-download-bold-duotone",
  add: "add-circle-bold",
  edit: "pen-new-square-bold",
  view: "eye-bold-duotone",
  more: "menu-dots-bold-duotone",
  transfer: "transfer-horizontal-bold-duotone",
  warning: "danger-triangle-bold-duotone",
  danger: "danger-circle-bold-duotone",
  success: "check-circle-bold-duotone",
  clear: "close-bold",
  invoice: "bill-list-bold-duotone",
  payment: "card-transfer-bold-duotone",
  warehouse: "buildings-bold-duotone",
  inventory: "widget-add-bold-duotone",
  stock: "widget-add-bold-duotone",
  stockIn: "inbox-in-bold-duotone",
  stockOut: "inbox-out-bold-duotone",
  item: "box-minimalistic-bold-duotone",
  package: "box-bold-duotone",
  farm: "home-add-bold-duotone",
  delivery: "delivery-bold-duotone",
  shipment: "delivery-bold-duotone",
  book: "book-2-bold-duotone",
  ebook: "book-minimalistic-bold-duotone",
  author: "user-circle-bold-duotone",
  publisher: "library-bold-duotone",
  catalog: "library-bold-duotone",
  category: "tag-bold-duotone",
  cart: "cart-2-bold-duotone",
  checkout: "cart-check-bold-duotone",
  favorite: "heart-angle-bold-duotone",
  rating: "star-bold-duotone",
  preview: "eye-bold-duotone",
  download: "download-bold-duotone",
  table: "checklist-bold-duotone",
  type: "text-bold-duotone",
  palette: "palette-bold-duotone",
  modal: "window-frame-bold-duotone",
  sidebar: "sidebar-minimalistic-bold-duotone",
  density: "sort-vertical-bold-duotone",
  close: "close-circle-bold",
  plus: "add-circle-bold",
};

const missing = Object.values(selected).filter((name) => !solar.icons[name]);
if (missing.length > 0)
  throw new Error(`Missing Solar glyphs: ${missing.join(", ")}`);

const bodies = Object.fromEntries(
  Object.entries(selected).map(([semanticName, providerName]) => [
    semanticName,
    solar.icons[providerName].body,
  ]),
);

const output = [
  "/**",
  " * Generated from the local @iconify-json/solar package.",
  " * Do not edit by hand; update scripts/generate-solar-subset.mjs instead.",
  " */",
  `export const solarBodies = ${JSON.stringify(bodies, null, 2)} as const;`,
  "",
].join("\n");

fs.writeFileSync(
  path.join(repoRoot, "packages/icons/src/solar-data.ts"),
  output,
);
console.log(`Generated ${Object.keys(bodies).length} local Solar glyphs.`);
