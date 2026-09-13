// Backward-compatible Node entrypoint. The implementation lives in core.mjs;
// node.mjs owns compact projection loading.
export {
  composeBrandExpression,
  composeEntityDetail,
  composeEntityList,
  inspectBrandExpression,
  inspectEntityDetail,
  inspectEntityList,
  inspectPlatformNeutralContract,
  resolveBrandExpression,
  resolveEntityDetailIntent,
  resolveEntityListIntent,
} from "./node.mjs";
