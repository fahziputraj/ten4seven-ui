import React from "react";
import { Icon as IconifyIcon } from "@iconify/react";
import { solarIconData } from "./solarIconData.js";
import { domainIconData } from "./domainIconData.js";

/* AAPM canonical icon surface.
   The product icon language is the Solar family on Iconify, reached only through
   this component so features never hard-code provider strings. Semantic keys come
   first; a raw "solar:*" name is accepted only when its local data is available.

   Families, in order of precedence:
     1. solar:*-bold-duotone / -bold / -linear  — everything Solar draws.
     2. aapm:*-bold-duotone                     — owned Solar-like domain glyphs
        for chicken and egg where the visual meaning needs control.
     3. ph:*-duotone (Phosphor duotone)         — physical and biological nouns
        Solar has no glyph for: bird, barn, tractor, virus, microscope, scales,
        coins, percent, truck, factory, storefront.
     4. MingCute egg/chicken data is retained only as a compatibility escape
        hatch for consumers that used the earlier provider pair.
     5. Six named provider exceptions, and no more — the poultry-industrial nouns
        neither family draws: healthicons:animal-chicken, game-icons:rooster,
        game-icons:egg-clutch, mdi:silo, mdi:corn, mdi:forklift.
   Provider glyphs are verified against the Iconify API; the AAPM-owned glyph is
   verified as part of the local contract and is intentionally not a CDN lookup. */

/* Kept as a compatibility export for consumers that called the old web-component
   loader. React consumers now ship local Iconify data and do not need a runtime
   network request. */
export function ensureIconify() {}

export const IconRegistry = Object.freeze({
  /* --- navigation --- */
  dashboard: "solar:home-angle-bold-duotone",
  module: "solar:widget-5-bold-duotone",
  modules: "solar:notes-bold-duotone",
  course: "solar:notebook-bold-duotone",
  menu: "solar:list-bold",
  sidebar: "solar:sidebar-minimalistic-bold-duotone",
  home: "solar:home-2-bold-duotone",
  back: "solar:alt-arrow-left-linear",
  forward: "solar:alt-arrow-right-linear",
  chevronLeft: "solar:alt-arrow-left-linear",
  chevronRight: "solar:alt-arrow-right-linear",
  chevronDown: "solar:alt-arrow-down-linear",
  chevronUp: "solar:alt-arrow-up-linear",
  arrowLeft: "solar:alt-arrow-left-linear",
  arrowRight: "solar:alt-arrow-right-linear",
  externalLink: "solar:arrow-right-up-bold",
  /* --- actions --- */
  add: "solar:add-circle-bold",
  edit: "solar:pen-new-square-bold",
  delete: "solar:trash-bin-trash-bold",
  archive: "solar:archive-bold-duotone",
  restore: "solar:restart-bold",
  duplicate: "solar:copy-bold-duotone",
  copy: "solar:copy-bold-duotone",
  save: "solar:diskette-bold-duotone",
  submit: "solar:plain-2-bold-duotone",
  approve: "solar:check-circle-bold",
  reject: "solar:close-circle-bold",
  verify: "solar:verified-check-bold",
  close: "solar:close-circle-bold",
  cancel: "solar:close-square-bold-duotone",
  refresh: "solar:restart-bold",
  retry: "solar:restart-circle-bold-duotone",
  upload: "solar:upload-minimalistic-bold",
  download: "solar:download-minimalistic-bold",
  export: "solar:file-download-bold-duotone",
  import: "solar:upload-minimalistic-bold",
  print: "solar:printer-bold-duotone",
  share: "solar:share-bold",
  filter: "solar:filter-bold-duotone",
  search: "solar:card-search-bold-duotone",
  sort: "solar:sort-vertical-bold-duotone",
  reorder: "solar:sort-vertical-bold-duotone",
  expand: "solar:alt-arrow-down-linear",
  collapse: "solar:alt-arrow-up-linear",
  more: "solar:menu-dots-bold",
  settings: "solar:settings-bold-duotone",
  logout: "solar:logout-3-bold",
  /* --- status --- */
  success: "solar:check-circle-bold",
  check: "solar:check-circle-bold",
  checkRead: "solar:check-read-bold-duotone",
  warning: "solar:danger-triangle-bold",
  alert: "solar:danger-triangle-bold",
  error: "solar:danger-circle-bold",
  alertCircle: "solar:danger-circle-bold",
  info: "solar:info-circle-bold",
  pending: "solar:clock-circle-bold",
  clock: "solar:clock-circle-bold",
  blocked: "solar:lock-keyhole-minimalistic-bold-duotone",
  active: "solar:record-circle-bold-duotone",
  circle: "solar:record-circle-bold-duotone",
  inactive: "solar:minus-circle-bold",
  minus: "solar:minus-circle-bold",
  verified: "solar:verified-check-bold",
  flag: "solar:flag-2-bold",
  /* --- data / analytics --- */
  chart: "solar:chart-square-bold-duotone",
  analytics: "solar:chart-square-bold-duotone",
  kpi: "solar:chart-2-bold-duotone",
  progress: "solar:chart-square-bold-duotone",
  trendUp: "solar:graph-up-bold-duotone",
  trendDown: "solar:graph-down-bold-duotone",
  trend: "solar:graph-up-bold-duotone",
  metric: "solar:chart-2-bold-duotone",
  target: "solar:target-bold-duotone",
  comparison: "solar:chart-bold-duotone",
  timeline: "solar:history-bold-duotone",
  report: "solar:document-text-bold-duotone",
  calculator: "solar:calculator-bold-duotone",
  /* --- finance --- */
  wallet: "solar:wallet-money-bold-duotone",
  money: "solar:money-bag-bold-duotone",
  finance: "solar:wallet-money-bold-duotone",
  invoice: "solar:bill-list-bold-duotone",
  receipt: "solar:bill-check-bold-duotone",
  journal: "solar:notebook-bookmark-bold-duotone",
  debit: "solar:arrow-right-down-bold-duotone",
  credit: "solar:arrow-right-up-bold-duotone",
  bank: "ph:bank-duotone",
  payment: "solar:card-transfer-bold-duotone",
  /* --- inventory --- */
  warehouse: "solar:garage-bold-duotone",
  stock: "solar:widget-add-bold-duotone",
  item: "solar:box-minimalistic-bold-duotone",
  package: "solar:box-bold-duotone",
  transfer: "solar:transfer-horizontal-bold-duotone",
  mutation: "solar:refresh-square-bold-duotone",
  adjustment: "solar:tuning-square-2-bold-duotone",
  opname: "solar:clipboard-check-bold-duotone",
  /* --- farm / production --- */
  farm: "solar:home-add-bold-duotone",
  house: "solar:home-smile-bold-duotone",
  flock: "solar:users-group-two-rounded-bold-duotone",
  egg: "aapm:egg-bold-duotone",
  feed: "solar:bag-4-bold-duotone",
  medicine: "solar:pill-bold-duotone",
  vaccine: "solar:syringe-bold-duotone",
  mortality: "solar:danger-triangle-bold-duotone",
  production: "ph:factory-duotone",
  weight: "solar:scale-bold-duotone",
  /* --- logistics --- */
  truck: "solar:bus-bold-duotone",
  delivery: "solar:box-bold-duotone",
  route: "solar:routing-2-bold-duotone",
  location: "solar:map-point-bold-duotone",
  dispatch: "solar:delivery-bold-duotone",
  /* --- users / access --- */
  user: "solar:user-circle-bold-duotone",
  users: "solar:users-group-rounded-bold-duotone",
  role: "solar:user-id-bold-duotone",
  permission: "solar:shield-keyhole-bold-duotone",
  lock: "solar:lock-keyhole-minimalistic-bold-duotone",
  unlock: "solar:lock-keyhole-unlocked-bold-duotone",
  shield: "solar:shield-check-bold",
  /* --- content / files --- */
  file: "solar:file-bold-duotone",
  folder: "solar:folder-bold-duotone",
  pdf: "solar:file-text-bold",
  spreadsheet: "solar:document-text-bold-duotone",
  attachment: "solar:paperclip-bold",
  image: "solar:gallery-wide-bold",
  media: "solar:gallery-wide-bold",
  note: "solar:notes-minimalistic-bold-duotone",
  fileCheck: "solar:file-check-bold-duotone",
  /* --- communication --- */
  notification: "solar:bell-bold-duotone",
  message: "solar:chat-round-dots-bold-duotone",
  email: "solar:letter-bold-duotone",
  mail: "solar:letter-bold-duotone",
  phone: "solar:phone-bold-duotone",
  announcement: "solar:volume-loud-bold-duotone",
  /* --- academy / achievement --- */
  assessment: "solar:file-text-bold",
  certificate: "solar:verified-check-bold",
  award: "solar:medal-ribbon-star-bold",
  graduation: "solar:medal-star-bold",
  cup: "solar:cup-star-bold",
  play: "solar:play-circle-bold",

  /* --- general web / publishing --- */
  library: "solar:book-2-bold-duotone",
  book: "solar:book-2-bold-duotone",
  bookOpen: "solar:book-bookmark-bold-duotone",
  bookmark: "solar:bookmark-bold-duotone",
  bookmarks: "solar:bookmark-opened-bold-duotone",
  reading: "solar:notebook-bold-duotone",
  article: "solar:document-text-bold-duotone",
  text: "solar:text-bold-duotone",
  quote: "solar:chat-round-dots-bold-duotone",
  audio: "solar:headphones-round-bold-duotone",
  video: "solar:play-circle-bold",
  category: "solar:widget-5-bold-duotone",
  tag: "solar:tag-price-bold-duotone",
  global: "solar:global-bold-duotone",
  link: "solar:link-bold",
  favorite: "solar:heart-bold-duotone",
  like: "solar:like-bold-duotone",
  help: "solar:question-circle-bold",
  login: "solar:login-3-bold",
  /* --- ai + theme + form --- */
  ai: "solar:cpu-bolt-bold-duotone",
  themeLight: "solar:sun-2-bold-duotone",
  themeDark: "solar:moon-bold-duotone",
  eye: "solar:eye-bold",
  eyeOff: "solar:eye-closed-bold",
  loading: "solar:restart-bold",
  grip: "solar:sort-vertical-bold-duotone",

  /* ══ DOMAIN: poultry shop corporate ══════════════════════════════════════ */

  /* --- corporate / company --- */
  company: "solar:buildings-2-bold-duotone",
  group: "solar:buildings-3-bold-duotone",
  branch: "solar:city-bold-duotone",
  department: "solar:layers-minimalistic-bold-duotone",
  board: "solar:case-round-bold-duotone",
  contract: "solar:document-add-bold-duotone",
  policy: "solar:notebook-minimalistic-bold-duotone",
  regulation: "solar:book-2-bold-duotone",
  compliance: "solar:shield-check-bold-duotone",
  audit: "solar:clipboard-list-bold-duotone",
  checklist: "solar:checklist-minimalistic-bold-duotone",
  fixedAsset: "solar:buildings-bold-duotone",

  /* --- shop / sales --- */
  shop: "solar:shop-bold-duotone",
  storefront: "solar:shop-minimalistic-bold-duotone",
  outlet: "solar:shop-2-bold-duotone",
  cart: "solar:cart-large-2-bold-duotone",
  order: "solar:cart-check-bold-duotone",
  addOrder: "solar:cart-plus-bold-duotone",
  salesOrder: "ph:clipboard-text-duotone",
  pos: "solar:cash-out-bold-duotone",
  price: "solar:tag-price-bold-duotone",
  discount: "solar:sale-bold-duotone",
  customer: "solar:bag-smile-bold-duotone",
  sales: "solar:graph-new-bold-duotone",
  commission: "solar:hand-money-bold-duotone",
  cash: "solar:wad-of-money-bold-duotone",
  banknote: "solar:banknote-2-bold-duotone",
  moneyIn: "solar:card-recive-bold-duotone",
  moneyOut: "solar:card-send-bold-duotone",
  safe: "solar:safe-2-bold-duotone",
  vault: "solar:safe-square-bold-duotone",

  /* --- procurement --- */
  supplier: "ph:storefront-duotone",
  purchase: "ph:basket-duotone",
  goodsReceipt: "solar:recive-square-bold-duotone",
  goodsIssue: "solar:send-square-bold-duotone",

  /* --- farm site / housing --- */
  farmSite: "solar:home-smile-angle-bold-duotone",
  barn: "ph:barn-duotone",
  tractor: "ph:tractor-duotone",
  field: "ph:plant-duotone",
  grain: "ph:grains-duotone",
  silo: "mdi:silo",
  corn: "mdi:corn",
  feedMill: "ph:factory-duotone",
  water: "solar:water-bold-duotone",
  waterIntake: "solar:waterdrops-bold-duotone",
  temperature: "solar:temperature-bold-duotone",
  thermometer: "solar:thermometer-bold-duotone",
  humidity: "solar:sun-fog-bold-duotone",
  ventilation: "ph:fan-duotone",
  wind: "solar:wind-bold-duotone",
  lighting: "solar:lightbulb-bold-duotone",
  lightProgram: "solar:lightbulb-bolt-bold-duotone",
  weather: "solar:cloud-sun-2-bold-duotone",
  organic: "solar:leaf-bold-duotone",
  biosecurity: "solar:shield-keyhole-bold-duotone",

  /* --- chickens / flock --- */
  chicken: "aapm:chicken-bold-duotone",
  rooster: "game-icons:rooster",
  bird: "ph:bird-duotone",
  doc: "ph:egg-crack-duotone",
  population: "solar:users-group-two-rounded-bold-duotone",
  culling: "solar:trash-bin-trash-bold",
  bodyWeight: "ph:scales-duotone",
  uniformity: "ph:chart-donut-duotone",
  flockAge: "solar:calendar-date-bold-duotone",
  productionRate: "ph:percent-duotone",

  /* --- eggs --- */
  eggCracked: "ph:egg-crack-duotone",
  eggTray: "game-icons:egg-clutch",
  grading: "ph:stack-duotone",
  packing: "ph:package-duotone",
  carton: "ph:cube-duotone",

  /* --- veterinary --- */
  vet: "ph:stethoscope-duotone",
  health: "solar:health-bold-duotone",
  vitals: "solar:heart-pulse-bold-duotone",
  dosage: "ph:pill-duotone",
  treatment: "ph:first-aid-kit-duotone",
  sample: "solar:test-tube-bold-duotone",
  lab: "ph:microscope-duotone",
  disease: "ph:virus-duotone",
  quarantine: "solar:hospital-bold-duotone",

  /* --- warehouse --- */
  rack: "solar:layers-minimalistic-bold-duotone",
  bin: "solar:archive-minimalistic-bold-duotone",
  forklift: "mdi:forklift",
  inbound: "solar:recive-square-bold-duotone",
  outbound: "solar:send-square-bold-duotone",
  scan: "solar:scanner-bold-duotone",
  barcode: "solar:code-scan-bold-duotone",
  qr: "solar:qr-code-bold-duotone",
  expiry: "solar:hourglass-bold-duotone",
  uom: "solar:ruler-cross-pen-bold-duotone",
  weighbridge: "solar:weigher-bold-duotone",
  reorderPoint: "solar:cart-3-bold-duotone",

  /* --- logistics --- */
  fleet: "solar:bus-bold-duotone",
  driver: "solar:user-id-bold-duotone",
  trip: "solar:routing-3-bold-duotone",
  tracking: "solar:gps-bold-duotone",
  geofence: "solar:map-point-wave-bold-duotone",
  fuel: "solar:fuel-bold-duotone",
  fuelStation: "solar:gas-station-bold-duotone",
  shipment: "ph:truck-duotone",
  manifest: "ph:clipboard-text-duotone",

  /* --- economics --- */
  budget: "solar:wallet-2-bold-duotone",
  revenue: "solar:dollar-minimalistic-bold-duotone",
  cashflow: "solar:transfer-vertical-bold-duotone",
  cost: "solar:banknote-bold-duotone",
  cogs: "solar:calculator-minimalistic-bold-duotone",
  forecast: "solar:diagram-up-bold-duotone",
  composition: "solar:pie-chart-2-bold-duotone",
  savings: "ph:piggy-bank-duotone",
  coins: "ph:coins-duotone",
  currency: "ph:currency-circle-dollar-duotone",
  subsidy: "ph:hand-coins-duotone",
  depreciation: "solar:graph-down-new-bold-duotone",

  /* --- accounting --- */
  ledger: "solar:book-bookmark-bold-duotone",
  chartOfAccounts: "solar:folder-with-files-bold-duotone",
  balanceSheet: "solar:scale-bold-duotone",
  tax: "ph:receipt-duotone",
  payable: "solar:bill-cross-bold-duotone",
  receivable: "solar:card-recive-bold-duotone",
  reconcile: "solar:checklist-minimalistic-bold-duotone",
  closing: "solar:lock-password-bold-duotone",
  archived: "solar:archive-check-bold-duotone",
  period: "solar:calendar-date-bold-duotone",
  accountBank: "ph:bank-duotone",

  /* --- people --- */
  employee: "solar:user-id-bold-duotone",
  payroll: "solar:wallet-bold-duotone",
  training: "solar:notebook-bold-duotone",
});

export const IconNames = Object.freeze(Object.keys(IconRegistry));

const localFallback = solarIconData["solar:info-circle-bold"];

function resolveLocalIcon(name) {
  const icon = IconRegistry[name] || (typeof name === "string" && name.includes(":") ? name : IconRegistry.info);
  return {
    source: icon,
    data: solarIconData[icon] || domainIconData[icon] || localFallback,
    fallback: !solarIconData[icon] && !domainIconData[icon],
  };
}

export function Icon({ name = "dashboard", size = 20, color, title, className = "", style, ...rest }) {
  const resolved = resolveLocalIcon(name);
  return (
    <IconifyIcon
      ssr
      icon={resolved.data}
      width={size}
      height={size}
      className={className}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      data-icon-source={resolved.source}
      data-icon-fallback={resolved.fallback ? "true" : undefined}
      style={{ display: "inline-flex", flex: "none", color: color || "inherit", verticalAlign: "-0.15em", ...style }}
      {...rest}
    />
  );
}
