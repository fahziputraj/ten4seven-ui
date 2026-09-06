import { composeEntityList } from "@ten4seven/agent";

const scaffold = composeEntityList({
  navigation: "none",
  showMetrics: false,
  contextualDetail: false,
});

if (
  scaffold.kind !== "ten4seven-canonical-scaffold" ||
  !scaffold.composition.includes("DataTable") ||
  Object.hasOwn(scaffold, "rows")
)
  throw new Error("isolated tarball build did not resolve the public scaffold");

console.log(
  `Isolated tarball build resolved ${scaffold.recipe} with ${scaffold.composition.length} canonical contracts.`,
);
