import type {
  BrandExpressionInput,
  BrandExpressionResolution,
  BrandExpressionScaffold,
  EntityDetailIntentInput,
  EntityDetailResolution,
  EntityDetailScaffold,
  EntityListIntentInput,
  EntityListResolution,
  EntityListScaffold,
} from "./index.ts";
import type { RecipeContract } from "@ten4seven/contracts";

export function resolveEntityListIntent(
  input?: EntityListIntentInput,
): EntityListResolution;
export function composeEntityList(
  input?: EntityListIntentInput,
): EntityListScaffold;
export function inspectEntityList(): RecipeContract;
export function resolveEntityDetailIntent(
  input?: EntityDetailIntentInput,
): EntityDetailResolution;
export function composeEntityDetail(
  input?: EntityDetailIntentInput,
): EntityDetailScaffold;
export function inspectEntityDetail(): RecipeContract;
export function resolveBrandExpression(
  input?: BrandExpressionInput,
): BrandExpressionResolution;
export function composeBrandExpression(
  input?: BrandExpressionInput,
): BrandExpressionScaffold;
export function inspectBrandExpression(): RecipeContract;

export type { RetrievalTelemetry } from "./index.ts";
