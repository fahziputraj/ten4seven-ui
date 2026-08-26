import { forwardRef, memo, type SVGProps } from "react";

import { solarBodies } from "./solar-data";

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
} as const);

export type IconName = keyof typeof IconRegistry;
export const IconNames = Object.keys(IconRegistry) as IconName[];

export interface T7IconProps extends Omit<
  SVGProps<SVGSVGElement>,
  "name" | "title"
> {
  name: IconName;
  size?: number | string;
  label?: string;
}

export const T7Icon = memo(
  forwardRef<SVGSVGElement, T7IconProps>(function T7Icon(
    { name, size = 18, label, className, ...props },
    ref,
  ) {
    const entry = IconRegistry[name];

    return (
      <svg
        ref={ref}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        className={className}
        fill="none"
        height={size}
        role={label ? "img" : undefined}
        viewBox="0 0 24 24"
        width={size}
        {...props}
        dangerouslySetInnerHTML={{ __html: entry.body }}
      />
    );
  }),
);

T7Icon.displayName = "T7Icon";
