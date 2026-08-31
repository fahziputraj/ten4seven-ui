import {
  composeBrandExpression as composeBrandRuntime,
  composeEntityDetail as composeEntityDetailRuntime,
  composeEntityList as composeRuntime,
  inspectBrandExpression as inspectBrandRuntime,
  inspectEntityDetail as inspectEntityDetailRuntime,
  inspectEntityList as inspectRuntime,
  resolveBrandExpression as resolveBrandRuntime,
  resolveEntityDetailIntent as resolveEntityDetailRuntime,
  resolveEntityListIntent as resolveRuntime,
} from "./node.mjs";
import type {
  BrandProfileId,
  RecipeCardinality,
  RecipeComparison,
  RecipeDensity,
  RecipeDetail,
  RecipeIntent,
  RecipeNavigation,
  RecipeOperation,
  RecipeSelection,
  RecipeState,
  RecipeWorkflow,
  RecipeVisibility,
  RecipeResponsive,
} from "@ten4seven/contracts";
import type {
  BrandExpressionInput,
  BrandExpressionResolution as CoreBrandExpressionResolution,
  BrandExpressionScaffold as CoreBrandExpressionScaffold,
  RecipeFamilyResolution,
  RecipeFamilyScaffold,
} from "./core.d.mts";

export type {
  BrandExpressionInput,
  BrandExpressionResolution as CoreBrandExpressionResolution,
  BrandExpressionScaffold as CoreBrandExpressionScaffold,
  RecipeFamilyResolution,
  RecipeFamilyScaffold,
} from "./core.d.mts";

export interface EntityListIntentInput {
  readonly intent?: Partial<RecipeIntent>;
  readonly visibility?: RecipeVisibility;
  readonly cardinality?: RecipeCardinality;
  readonly operations?: readonly RecipeOperation[];
  readonly density?: RecipeDensity;
  readonly navigation?: RecipeNavigation;
  readonly workflow?: RecipeWorkflow;
  readonly comparison?: RecipeComparison;
  readonly selection?: RecipeSelection;
  readonly detail?: RecipeDetail;
  readonly persistentNavigation?: boolean;
  readonly showMetrics?: boolean;
  readonly queryControls?: boolean;
  readonly paginated?: boolean;
  readonly bulkActions?: boolean;
  readonly contextualDetail?: boolean;
  readonly mobileMode?: RecipeResponsive["mobile"];
  readonly responsive?: Partial<RecipeResponsive>;
  readonly states?: readonly RecipeState[];
}

export interface EntityDetailIntentInput {
  readonly intent?: Partial<RecipeIntent>;
  readonly visibility?: RecipeVisibility;
  readonly cardinality?: RecipeCardinality;
  readonly operations?: readonly RecipeOperation[];
  readonly density?: RecipeDensity;
  readonly navigation?: RecipeNavigation;
  readonly workflow?: RecipeWorkflow;
  readonly comparison?: RecipeComparison;
  readonly selection?: RecipeSelection;
  readonly detail?: RecipeDetail;
  readonly persistentNavigation?: boolean;
  readonly readOnly?: boolean;
  readonly showStatus?: boolean;
  readonly activity?: "none" | "minimal" | "full";
  readonly quickActions?: boolean;
  readonly actionFooter?: boolean;
  readonly relatedRecords?: boolean;
  readonly showAlert?: boolean;
  readonly confirmActions?: boolean;
  readonly mobileMode?: RecipeResponsive["mobile"];
  readonly responsive?: Partial<RecipeResponsive>;
  readonly states?: readonly RecipeState[];
}

export interface RetrievalFile {
  readonly kind: "index" | "recipe" | "componentContract" | "supporting";
  readonly path: string;
  readonly bytes: number;
}

export interface RetrievalTelemetry {
  readonly indexBytes: number;
  readonly recipeBytes: number;
  readonly componentContractBytes: number;
  readonly supportingBytes: number;
  readonly totalActualBytes: number;
  readonly fullCatalogFallbacks: number;
  readonly files: readonly RetrievalFile[];
  readonly componentIds: readonly string[];
}

type RuntimeResolution<TRecipe, TFamily> = Omit<
  RecipeFamilyResolution,
  "recipe" | "family"
> & {
  readonly recipe: TRecipe;
  readonly family: TFamily;
  readonly source: string;
  readonly contextReads: readonly string[];
  readonly retrieval: RetrievalTelemetry;
};

type RuntimeScaffold<TRecipe, TFamily> = Omit<
  RecipeFamilyScaffold,
  "recipe" | "family"
> & {
  readonly recipe: TRecipe;
  readonly family: TFamily;
  readonly source: string;
  readonly contextReads: readonly string[];
  readonly retrieval: RetrievalTelemetry;
};

export type EntityListResolution = RuntimeResolution<
  "entity-list",
  "operational-collection"
>;
export type EntityListScaffold = RuntimeScaffold<
  "entity-list",
  "operational-collection"
>;
export type EntityDetailResolution = RuntimeResolution<
  "entity-detail",
  "record-inspection"
>;
export type EntityDetailScaffold = RuntimeScaffold<
  "entity-detail",
  "record-inspection"
>;
export type BrandExpressionResolution = CoreBrandExpressionResolution & {
  readonly source: string;
  readonly contextReads: readonly string[];
  readonly retrieval: RetrievalTelemetry;
};
export type BrandExpressionScaffold = CoreBrandExpressionScaffold & {
  readonly source: string;
  readonly contextReads: readonly string[];
  readonly retrieval: RetrievalTelemetry;
};

function toRuntimeInput(
  input: EntityListIntentInput | EntityDetailIntentInput,
) {
  return {
    ...input,
    intent: {
      ...(input.intent ?? {}),
      ...(input.visibility ? { visibility: input.visibility } : {}),
      ...(input.cardinality ? { cardinality: input.cardinality } : {}),
      ...(input.operations ? { operations: input.operations } : {}),
      ...(input.density ? { density: input.density } : {}),
      ...(input.navigation ? { navigation: input.navigation } : {}),
      ...(input.workflow ? { workflow: input.workflow } : {}),
      ...(input.comparison ? { comparison: input.comparison } : {}),
      ...(input.selection ? { selection: input.selection } : {}),
      ...(input.detail ? { detail: input.detail } : {}),
    },
  };
}

export function resolveEntityListIntent(
  input: EntityListIntentInput = {},
): EntityListResolution {
  return resolveRuntime(toRuntimeInput(input)) as EntityListResolution;
}

export function composeEntityList(
  input: EntityListIntentInput = {},
): EntityListScaffold {
  return composeRuntime(toRuntimeInput(input)) as EntityListScaffold;
}

export function inspectEntityList() {
  return inspectRuntime();
}

export function resolveEntityDetailIntent(
  input: EntityDetailIntentInput = {},
): EntityDetailResolution {
  return resolveEntityDetailRuntime(
    toRuntimeInput(input),
  ) as EntityDetailResolution;
}

export function composeEntityDetail(
  input: EntityDetailIntentInput = {},
): EntityDetailScaffold {
  return composeEntityDetailRuntime(
    toRuntimeInput(input),
  ) as EntityDetailScaffold;
}

export function inspectEntityDetail() {
  return inspectEntityDetailRuntime();
}

export function resolveBrandExpression(
  input: BrandExpressionInput = {},
): BrandExpressionResolution {
  return resolveBrandRuntime(input);
}

export function composeBrandExpression(
  input: BrandExpressionInput = {},
): BrandExpressionScaffold {
  return composeBrandRuntime(input);
}

export function inspectBrandExpression() {
  return inspectBrandRuntime();
}

export type { BrandProfileId };
