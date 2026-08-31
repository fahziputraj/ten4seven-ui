import { composeEntityList } from "@ten4seven/agent";
import { DataTable, PageHeader, Ten4SevenProvider } from "@ten4seven/ui";

/**
 * A package-boundary proof: the consumer asks for a scaffold and owns the
 * domain rows, columns, permissions, and event handlers.
 */
export function buildEntityListConsumer() {
  return {
    provider: Ten4SevenProvider,
    header: PageHeader,
    table: DataTable,
    scaffold: composeEntityList({
      navigation: "none",
      showMetrics: false,
      contextualDetail: false,
    }),
    domainOwned: {
      rows: [],
      columns: [],
      permissions: [],
      eventHandlers: {},
    },
  };
}
