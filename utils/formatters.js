export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function cx(...values) {
  return values.flatMap((value) => {
    if (!value) return [];
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value;
    return Object.keys(value).filter((key) => value[key]);
  }).join(" ");
}

export function formatNumberId(value, options = {}) {
  return new Intl.NumberFormat("id-ID", options).format(Number(value) || 0);
}

export function formatCurrencyId(value, currency = "IDR", options = {}) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency, maximumFractionDigits: 0, ...options }).format(Number(value) || 0);
}

export function formatPercentId(value, options = {}) {
  return new Intl.NumberFormat("id-ID", { style: "percent", maximumFractionDigits: 1, ...options }).format((Number(value) || 0) / 100);
}

export function formatDateId(value, options = {}) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", ...options }).format(new Date(value));
}
