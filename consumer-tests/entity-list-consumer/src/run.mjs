import { composeEntityList } from "@ten4seven/agent";

const scaffold = composeEntityList({
  navigation: "none",
  showMetrics: false,
  contextualDetail: false,
});

if (scaffold.kind !== "ten4seven-canonical-scaffold")
  throw new Error("consumer did not receive a canonical scaffold");
if (!scaffold.composition.includes("DataTable"))
  throw new Error("consumer scaffold omitted the required DataTable contract");
if (Object.hasOwn(scaffold, "rows"))
  throw new Error("consumer scaffold leaked domain rows");

console.log(
  `Installed consumer resolved ${scaffold.recipe} with ${scaffold.composition.length} canonical contracts.`,
);
