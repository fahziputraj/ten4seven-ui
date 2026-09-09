import {
  forwardRef,
  memo,
  useId,
  type CSSProperties,
  type SVGProps,
} from "react";

import {
  solarIconAliases,
  solarIconBodies,
  solarIconNames,
} from "./solar-catalog";
import { solarBodies } from "./solar-data";
import {
  curatedIconBodies,
  curatedIconMetadata,
  curatedIconNames,
} from "./curated-data";

export const IconRegistry = Object.freeze({
  dashboard: {
    provider: "solar:home-angle-bold-duotone",
    body: solarBodies.dashboard,
  },
  tokens: { provider: "solar:layers-bold-duotone", body: solarBodies.tokens },
  components: {
    provider: "solar:widget-5-bold-duotone",
    body: solarBodies.components,
  },
  theme: { provider: "solar:palette-bold-duotone", body: solarBodies.theme },
  settings: {
    provider: "solar:settings-bold-duotone",
    body: solarBodies.settings,
  },
  sun: { provider: "solar:sun-2-bold-duotone", body: solarBodies.sun },
  moon: { provider: "solar:moon-stars-bold-duotone", body: solarBodies.moon },
  check: { provider: "solar:check-circle-bold", body: solarBodies.check },
  approve: {
    provider: "solar:check-circle-bold",
    body: solarBodies.approve,
  },
  chevronDown: {
    provider: "solar:alt-arrow-down-linear",
    body: solarBodies.chevronDown,
  },
  arrowLeft: {
    provider: "solar:alt-arrow-left-bold",
    body: solarBodies.arrowLeft,
  },
  arrowRight: {
    provider: "solar:alt-arrow-right-bold",
    body: solarBodies.arrowRight,
  },
  search: {
    provider: "solar:card-search-bold-duotone",
    body: solarBodies.search,
  },
  filter: {
    provider: "solar:filter-bold-duotone",
    body: solarBodies.filter,
  },
  sort: {
    provider: "solar:sort-vertical-bold-duotone",
    body: solarBodies.sort,
  },
  export: {
    provider: "solar:file-download-bold-duotone",
    body: solarBodies.export,
  },
  add: { provider: "solar:add-circle-bold", body: solarBodies.add },
  edit: {
    provider: "solar:pen-new-square-bold",
    body: solarBodies.edit,
  },
  view: { provider: "solar:eye-bold-duotone", body: solarBodies.view },
  more: {
    provider: "solar:menu-dots-bold-duotone",
    body: solarBodies.more,
  },
  transfer: {
    provider: "solar:transfer-horizontal-bold-duotone",
    body: solarBodies.transfer,
  },
  warning: {
    provider: "solar:danger-triangle-bold-duotone",
    body: solarBodies.warning,
  },
  danger: {
    provider: "solar:danger-circle-bold-duotone",
    body: solarBodies.danger,
  },
  success: {
    provider: "solar:check-circle-bold-duotone",
    body: solarBodies.success,
  },
  clear: { provider: "solar:close-bold", body: solarBodies.clear },
  invoice: {
    provider: "solar:bill-list-bold-duotone",
    body: solarBodies.invoice,
  },
  payment: {
    provider: "solar:card-transfer-bold-duotone",
    body: solarBodies.payment,
  },
  warehouse: {
    provider: "solar:buildings-bold-duotone",
    body: solarBodies.warehouse,
  },
  inventory: {
    provider: "solar:widget-add-bold-duotone",
    body: solarBodies.inventory,
  },
  stock: {
    provider: "solar:widget-add-bold-duotone",
    body: solarBodies.stock,
  },
  stockIn: {
    provider: "solar:inbox-in-bold-duotone",
    body: solarBodies.stockIn,
  },
  stockOut: {
    provider: "solar:inbox-out-bold-duotone",
    body: solarBodies.stockOut,
  },
  item: {
    provider: "solar:box-minimalistic-bold-duotone",
    body: solarBodies.item,
  },
  package: { provider: "solar:box-bold-duotone", body: solarBodies.package },
  farm: {
    provider: "solar:home-add-bold-duotone",
    body: solarBodies.farm,
  },
  fleet: {
    provider: "solar:bus-bold-duotone",
    body: solarBodies.fleet,
  },
  delivery: {
    provider: "solar:delivery-bold-duotone",
    body: solarBodies.delivery,
  },
  shipment: {
    provider: "solar:delivery-bold-duotone",
    body: solarBodies.shipment,
  },
  book: { provider: "solar:book-2-bold-duotone", body: solarBodies.book },
  ebook: {
    provider: "solar:book-minimalistic-bold-duotone",
    body: solarBodies.ebook,
  },
  author: {
    provider: "solar:user-circle-bold-duotone",
    body: solarBodies.author,
  },
  publisher: {
    provider: "solar:library-bold-duotone",
    body: solarBodies.publisher,
  },
  catalog: {
    provider: "solar:library-bold-duotone",
    body: solarBodies.catalog,
  },
  category: {
    provider: "solar:tag-bold-duotone",
    body: solarBodies.category,
  },
  cart: { provider: "solar:cart-2-bold-duotone", body: solarBodies.cart },
  checkout: {
    provider: "solar:cart-check-bold-duotone",
    body: solarBodies.checkout,
  },
  favorite: {
    provider: "solar:heart-angle-bold-duotone",
    body: solarBodies.favorite,
  },
  rating: {
    provider: "solar:star-bold-duotone",
    body: solarBodies.rating,
  },
  preview: { provider: "solar:eye-bold-duotone", body: solarBodies.preview },
  download: {
    provider: "solar:download-bold-duotone",
    body: solarBodies.download,
  },
  table: { provider: "solar:checklist-bold-duotone", body: solarBodies.table },
  type: { provider: "solar:text-bold-duotone", body: solarBodies.type },
  palette: {
    provider: "solar:palette-bold-duotone",
    body: solarBodies.palette,
  },
  modal: {
    provider: "solar:window-frame-bold-duotone",
    body: solarBodies.modal,
  },
  sidebar: {
    provider: "solar:sidebar-minimalistic-bold-duotone",
    body: solarBodies.sidebar,
  },
  density: {
    provider: "solar:sort-vertical-bold-duotone",
    body: solarBodies.density,
  },
  close: { provider: "solar:close-circle-bold", body: solarBodies.close },
  plus: { provider: "solar:add-circle-bold", body: solarBodies.plus },
  menu: { provider: "solar:list-bold", body: solarBodies.menu },
  chevronLeft: {
    provider: "solar:alt-arrow-left-linear",
    body: solarBodies.chevronLeft,
  },
  chevronRight: {
    provider: "solar:alt-arrow-right-linear",
    body: solarBodies.chevronRight,
  },
  chevronUp: {
    provider: "solar:alt-arrow-up-linear",
    body: solarBodies.chevronUp,
  },
  delete: {
    provider: "solar:trash-bin-trash-bold",
    body: solarBodies.delete,
  },
  upload: {
    provider: "solar:upload-minimalistic-bold",
    body: solarBodies.upload,
  },
  import: {
    provider: "solar:inbox-in-bold-duotone",
    body: solarBodies.import,
  },
  info: { provider: "solar:info-circle-bold", body: solarBodies.info },
  pending: {
    provider: "solar:clock-circle-bold",
    body: solarBodies.pending,
  },
  clock: { provider: "solar:clock-circle-bold", body: solarBodies.clock },
  blocked: {
    provider: "solar:lock-keyhole-minimalistic-bold-duotone",
    body: solarBodies.blocked,
  },
  lock: {
    provider: "solar:lock-keyhole-minimalistic-bold-duotone",
    body: solarBodies.lock,
  },
  unlock: {
    provider: "solar:lock-keyhole-unlocked-bold-duotone",
    body: solarBodies.unlock,
  },
  calendar: {
    provider: "solar:calendar-date-bold-duotone",
    body: solarBodies.calendar,
  },
  command: {
    provider: "solar:command-bold-duotone",
    body: solarBodies.command,
  },
  keyboard: {
    provider: "solar:keyboard-bold-duotone",
    body: solarBodies.keyboard,
  },
  refresh: {
    provider: "solar:refresh-bold-duotone",
    body: solarBodies.refresh,
  },
  chart: {
    provider: "solar:chart-square-bold-duotone",
    body: solarBodies.chart,
  },
  analytics: {
    provider: "solar:chart-square-bold-duotone",
    body: solarBodies.analytics,
  },
  kpi: { provider: "solar:chart-2-bold-duotone", body: solarBodies.kpi },
  progress: {
    provider: "solar:chart-square-bold-duotone",
    body: solarBodies.progress,
  },
  graph: {
    provider: "solar:graph-bold-duotone",
    body: solarBodies.graph,
  },
  trendUp: {
    provider: "solar:graph-up-bold-duotone",
    body: solarBodies.trendUp,
  },
  trendDown: {
    provider: "solar:graph-down-bold-duotone",
    body: solarBodies.trendDown,
  },
  timeline: {
    provider: "solar:history-bold-duotone",
    body: solarBodies.timeline,
  },
  user: {
    provider: "solar:user-circle-bold-duotone",
    body: solarBodies.user,
  },
  users: {
    provider: "solar:users-group-rounded-bold-duotone",
    body: solarBodies.users,
  },
  file: { provider: "solar:file-bold-duotone", body: solarBodies.file },
  folder: {
    provider: "solar:folder-bold-duotone",
    body: solarBodies.folder,
  },
  pdf: { provider: "solar:file-text-bold", body: solarBodies.pdf },
  image: {
    provider: "solar:gallery-wide-bold",
    body: solarBodies.image,
  },
  fileCheck: {
    provider: "solar:file-check-bold-duotone",
    body: solarBodies.fileCheck,
  },
  notification: {
    provider: "solar:bell-bold-duotone",
    body: solarBodies.notification,
  },
  eye: { provider: "solar:eye-bold", body: solarBodies.eye },
  eyeOff: { provider: "solar:eye-closed-bold", body: solarBodies.eyeOff },
  finance: {
    provider: "solar:wallet-money-bold-duotone",
    body: solarBodies.finance,
  },
  accounting: {
    provider: "solar:calculator-bold-duotone",
    body: solarBodies.accounting,
  },
  logistics: {
    provider: "solar:delivery-bold-duotone",
    body: solarBodies.logistics,
  },
  admin: {
    provider: "solar:shield-user-bold-duotone",
    body: solarBodies.admin,
  },
  files: {
    provider: "solar:folder-with-files-bold-duotone",
    body: solarBodies.files,
  },
  communication: {
    provider: "solar:chat-round-line-bold-duotone",
    body: solarBodies.communication,
  },
  revenue: {
    provider: curatedIconMetadata.revenue.provider,
    body: curatedIconBodies.revenue,
    duotone: true,
  },
  medicine: {
    provider: curatedIconMetadata.medicine.provider,
    body: curatedIconBodies.medicine,
    duotone: true,
  },
  pills: {
    provider: curatedIconMetadata.pills.provider,
    body: curatedIconBodies.pills,
    duotone: true,
  },
  cashOnDelivery: {
    provider: curatedIconMetadata.cashOnDelivery.provider,
    body: curatedIconBodies.cashOnDelivery,
    duotone: true,
  },
  wallet: {
    provider: curatedIconMetadata.wallet.provider,
    body: curatedIconBodies.wallet,
    duotone: true,
  },
  triangleRight: {
    provider: curatedIconMetadata.triangleRight.provider,
    body: curatedIconBodies.triangleRight,
  },
  triangleLeft: {
    provider: curatedIconMetadata.triangleLeft.provider,
    body: curatedIconBodies.triangleLeft,
  },
  triangleUp: {
    provider: curatedIconMetadata.triangleUp.provider,
    body: curatedIconBodies.triangleUp,
  },
  triangleDown: {
    provider: curatedIconMetadata.triangleDown.provider,
    body: curatedIconBodies.triangleDown,
  },
  barn: {
    provider: curatedIconMetadata.barn.provider,
    body: curatedIconBodies.barn,
    duotone: true,
  },
  eggCrack: {
    provider: curatedIconMetadata.eggCrack.provider,
    body: curatedIconBodies.eggCrack,
    duotone: true,
  },
  eggPair: {
    provider: curatedIconMetadata.eggPair.provider,
    body: curatedIconBodies.eggPair,
  },
  egg: {
    provider: curatedIconMetadata.egg.provider,
    body: curatedIconBodies.egg,
    duotone: true,
  },
  chicken: {
    provider: curatedIconMetadata.chicken.provider,
    body: curatedIconBodies.chicken,
  },
  chick: {
    provider: curatedIconMetadata.chick.provider,
    body: curatedIconBodies.chick,
  },
  graphMemory: {
    provider: curatedIconMetadata.graphMemory.provider,
    body: curatedIconBodies.graphMemory,
    duotone: true,
  },
  marginalRoi: {
    provider: curatedIconMetadata.marginalRoi.provider,
    body: curatedIconBodies.marginalRoi,
    duotone: true,
  },
  hvac: {
    provider: curatedIconMetadata.hvac.provider,
    body: curatedIconBodies.hvac,
    duotone: true,
  },
  waterRate: {
    provider: curatedIconMetadata.waterRate.provider,
    body: curatedIconBodies.waterRate,
  },
  mortality: {
    provider: curatedIconMetadata.mortality.provider,
    body: curatedIconBodies.mortality,
    duotone: true,
  },
  breakEven: {
    provider: curatedIconMetadata.breakEven.provider,
    body: curatedIconBodies.breakEven,
    duotone: true,
  },
  equalRatio: {
    provider: curatedIconMetadata.equalRatio.provider,
    body: curatedIconBodies.equalRatio,
  },
  weight: {
    provider: curatedIconMetadata.weight.provider,
    body: curatedIconBodies.weight,
  },
} as const);

export type IconName = keyof typeof IconRegistry;
export const IconNames = Object.keys(IconRegistry) as IconName[];

/**
 * The locally bundled Iconify collection. Consumers use the unprefixed Solar
 * name here; provider strings stay an internal implementation detail.
 */
export type SolarIconName = (typeof solarIconNames)[number];
export const IconifyIconNames = solarIconNames;
export const IconifyIconCount = IconifyIconNames.length;
export type CuratedIconName = (typeof curatedIconNames)[number];
export const IconifyCuratedIconNames = curatedIconNames;
export const IconifyCuratedIconCount = IconifyCuratedIconNames.length;
export type IconifyIconName = SolarIconName | CuratedIconName;
/**
 * The curated Solar family used by the icon workbench. Keeping this as a
 * named export makes the visual-family boundary explicit without removing
 * the complete local catalog from the package API.
 */
export type SolarBoldDuotoneIconName = `${string}-bold-duotone`;
export const IconifyBoldDuotoneIconNames = Object.freeze(
  IconifyIconNames.filter((name): name is SolarBoldDuotoneIconName =>
    name.endsWith("-bold-duotone"),
  ),
);
export const IconifyBoldDuotoneIconCount = IconifyBoldDuotoneIconNames.length;
export const IconifyCollections = Object.freeze({
  solar: Object.freeze({
    name: "Solar",
    prefix: "solar",
    iconCount: IconifyIconCount,
    duotoneCount: IconifyIconNames.filter((name) => name.includes("-duotone"))
      .length,
    boldDuotoneCount: IconifyBoldDuotoneIconCount,
  }),
  curated: Object.freeze({
    name: "Curated operations",
    prefix: "ten4seven",
    iconCount: IconifyCuratedIconCount,
    duotoneCount: IconifyCuratedIconNames.filter(
      (name) => "duotone" in curatedIconMetadata[name],
    ).length,
    boldDuotoneCount: 0,
  }),
});

const iconBodyCache = new Map<string, string>();

/** Return a bundled Solar SVG body, resolving local aliases when necessary. */
export function getSolarIconBody(name: string): string | undefined {
  const directBody = solarIconBodies[name];
  if (directBody) return directBody;
  const parentName = solarIconAliases[name];
  return parentName ? solarIconBodies[parentName] : undefined;
}

export function isSolarIconName(name: string): name is SolarIconName {
  return Boolean(getSolarIconBody(name));
}

/** Return a curated local Iconify body selected for domain semantics. */
export function getCuratedIconBody(name: string): string | undefined {
  return curatedIconBodies[name as CuratedIconName];
}

export function isCuratedIconName(name: string): name is CuratedIconName {
  return Boolean(getCuratedIconBody(name));
}

function scopeSvgIds(body: string, instanceId: string): string {
  const suffix = instanceId.replace(/[^a-zA-Z0-9_-]/g, "") || "icon";
  const ids = [...body.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  if (!ids.length) return body;

  let scoped = body;
  for (const id of ids)
    scoped = scoped.replaceAll(`id="${id}"`, `id="${id}-${suffix}"`);
  for (const id of ids)
    scoped = scoped.replaceAll(`#${id}`, `#${id}-${suffix}`);
  return scoped;
}

const THEME_PRIMARY = "hsl(var(--t7-primary-hsl, 0 0% 20%))";
const THEME_ACCENT = "hsl(var(--t7-accent-hsl, 0 0% 50%))";
const PRIMARY_PAINT = "var(--t7-icon-primary, currentColor)";
const THEME_PRIMARY_PAINT = `var(--t7-icon-primary, ${THEME_PRIMARY})`;
const ACCENT_PAINT = `var(--t7-icon-accent, ${THEME_ACCENT})`;
const SEMANTIC_ACCENT_PAINT =
  "var(--t7-icon-accent, var(--t7-icon-primary, currentColor))";

function isPartialOpacity(value: string) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue < 1;
}

/**
 * Convert a local Solar body to CSS-variable paints. Solar's duotone
 * convention marks the secondary layer with opacity, so that layer can either
 * follow the semantic icon color or use the active theme accent for the full
 * Iconify catalog.
 */
function colorizeBody(
  body: string,
  duotone: boolean,
  primaryPaint: string,
  accentPaint: string,
): string {
  const cacheKey = `${duotone ? "duotone" : "single"}:${primaryPaint}:${accentPaint}:${body}`;
  const cachedBody = iconBodyCache.get(cacheKey);
  if (cachedBody) return cachedBody;

  const baseBody = body.replaceAll("currentColor", primaryPaint);
  if (!duotone) {
    iconBodyCache.set(cacheKey, baseBody);
    return baseBody;
  }

  const usesStroke = /stroke="(?:currentColor|var\(--t7-icon-primary)/.test(
    body,
  );
  const fallbackPaintAttribute = usesStroke ? "stroke" : "fill";
  const transformedBody = baseBody.replace(
    /<([a-z][\w:-]*)([^>]*?)opacity="([^"]+)"([^>]*?)(\/?)>/gi,
    (match, tag, before, opacity, after, close) => {
      if (!isPartialOpacity(opacity)) return match;

      const attributes = `${before}opacity="${opacity}"${after}`;
      const paintAttribute =
        /\sstroke="(?:var\(--t7-icon-primary|currentColor)/i.test(attributes)
          ? "stroke"
          : /\sfill="(?:var\(--t7-icon-primary|currentColor)/i.test(attributes)
            ? "fill"
            : fallbackPaintAttribute;
      const accentAttribute = `${paintAttribute}="${accentPaint}"`;
      const paintPattern = new RegExp(`\\s${paintAttribute}="[^"]*"`, "i");
      const nextAttributes = paintPattern.test(attributes)
        ? attributes.replace(paintPattern, ` ${accentAttribute}`)
        : `${attributes} ${accentAttribute}`;
      return `<${tag}${nextAttributes}${close}>`;
    },
  );

  iconBodyCache.set(cacheKey, transformedBody);
  return transformedBody;
}

type IconPaintStyle = CSSProperties & {
  "--t7-icon-primary"?: string;
  "--t7-icon-accent"?: string;
};

function mergeIconPaintStyle(
  style: SVGProps<SVGSVGElement>["style"],
  primaryColor?: string,
  accentColor?: string,
): IconPaintStyle | undefined {
  if (!primaryColor && !accentColor) return style as IconPaintStyle | undefined;
  return {
    ...style,
    ...(primaryColor ? { "--t7-icon-primary": primaryColor } : {}),
    ...(accentColor ? { "--t7-icon-accent": accentColor } : {}),
  };
}

export interface T7IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "name" | "title"
> {
  name: IconName;
  /** Override the solid layer; defaults to the consumer's inherited color. */
  primaryColor?: string;
  /** Override the secondary duotone layer; defaults to the semantic icon color. */
  accentColor?: string;
  /** Force or disable duotone treatment for a semantic Solar glyph. */
  duotone?: boolean;
  size?: number | string;
  label?: string;
}

export const T7Icon = memo(
  forwardRef<SVGSVGElement, T7IconProps>(function T7Icon(
    {
      accentColor,
      duotone,
      label,
      className,
      name,
      primaryColor,
      size = 18,
      style,
      ...props
    },
    ref,
  ) {
    const entry = IconRegistry[name];
    const instanceId = useId();
    const isDuotone =
      duotone ??
      ("duotone" in entry ? entry.duotone : undefined) ??
      entry.provider.endsWith("-duotone");

    return (
      <svg
        ref={ref}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        className={className}
        fill="none"
        height={size}
        role={label ? "img" : undefined}
        style={mergeIconPaintStyle(style, primaryColor, accentColor)}
        viewBox="0 0 24 24"
        width={size}
        {...props}
        dangerouslySetInnerHTML={{
          __html: scopeSvgIds(
            colorizeBody(
              entry.body,
              isDuotone,
              PRIMARY_PAINT,
              SEMANTIC_ACCENT_PAINT,
            ),
            instanceId,
          ),
        }}
      />
    );
  }),
);

T7Icon.displayName = "T7Icon";

export interface IconifyIconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "name" | "title"
> {
  /** Unprefixed name from the bundled Solar or curated Iconify collections. */
  name: IconifyIconName;
  /** Override the solid layer; defaults to the active theme primary token. */
  primaryColor?: string;
  /** Override the secondary duotone layer; defaults to the active theme accent. */
  accentColor?: string;
  /** Force or disable duotone treatment; names ending in -duotone opt in by default. */
  duotone?: boolean;
  size?: number | string;
  label?: string;
}

/** Render any one of the locally bundled Solar or curated Iconify glyphs. */
export const IconifyIcon = memo(
  forwardRef<SVGSVGElement, IconifyIconProps>(function IconifyIcon(
    {
      accentColor,
      duotone,
      label,
      className,
      name,
      primaryColor,
      size = 20,
      style,
      ...props
    },
    ref,
  ) {
    const instanceId = useId();
    const body = isCuratedIconName(name)
      ? getCuratedIconBody(name)
      : getSolarIconBody(name);
    if (!body) return null;
    const isDuotone =
      duotone ??
      (isCuratedIconName(name)
        ? "duotone" in curatedIconMetadata[name]
        : name.includes("-duotone"));
    const iconSet = isCuratedIconName(name) ? "ten4seven-curated" : "solar";

    return (
      <svg
        ref={ref}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        className={className}
        data-icon-set={iconSet}
        data-icon-name={name}
        fill="none"
        height={size}
        role={label ? "img" : undefined}
        style={mergeIconPaintStyle(style, primaryColor, accentColor)}
        viewBox="0 0 24 24"
        width={size}
        {...props}
        dangerouslySetInnerHTML={{
          __html: scopeSvgIds(
            colorizeBody(body, isDuotone, THEME_PRIMARY_PAINT, ACCENT_PAINT),
            instanceId,
          ),
        }}
      />
    );
  }),
);

IconifyIcon.displayName = "IconifyIcon";
