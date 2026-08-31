import type {
  BrandProfile,
  BrandProfileId,
  ComponentContract,
  RecipeContract,
  RecipeExpressionContract,
  RecipeFamily,
  RecipeIntent,
  RecipeResponsive,
  RecipeState,
} from "@ten4seven/contracts";
import type {
  EntityDetailIntentInput,
  EntityListIntentInput,
} from "./index.ts";

export interface RecipeConditionalDecision {
  readonly included: boolean;
  readonly rationale: string;
}

export interface RecipeFamilyResolution {
  readonly recipe: "entity-list" | "entity-detail";
  readonly family: Exclude<RecipeFamily, "identity">;
  readonly intent: RecipeIntent;
  readonly shell: NonNullable<RecipeContract["shell"]>;
  readonly required: readonly string[];
  readonly conditional: Readonly<Record<string, RecipeConditionalDecision>>;
  readonly included: readonly string[];
  readonly omitted: readonly string[];
  readonly optional: readonly string[];
  readonly states: readonly RecipeState[];
  readonly responsive: RecipeResponsive;
  readonly forbid: readonly string[];
  readonly rationale?: Readonly<Record<string, string>>;
  readonly consumerOwned: readonly string[];
  readonly decisionCount: number;
}

export interface RecipeFamilyScaffold {
  readonly kind: "ten4seven-canonical-scaffold";
  readonly recipe: RecipeFamilyResolution["recipe"];
  readonly family: RecipeFamilyResolution["family"];
  readonly shell: RecipeFamilyResolution["shell"];
  readonly composition: readonly string[];
  readonly decisions: {
    readonly required: readonly string[];
    readonly conditional: RecipeFamilyResolution["conditional"];
    readonly omitted: readonly string[];
    readonly forbid: readonly string[];
  };
  readonly states: readonly RecipeState[];
  readonly responsive: RecipeResponsive;
  readonly consumerOwned: readonly string[];
  readonly decisionCount: number;
}

export interface EntityListContractData {
  readonly recipe: RecipeContract;
  readonly components: Readonly<Record<string, ComponentContract>>;
}

export interface EntityDetailContractData {
  readonly recipe: RecipeContract;
  readonly components: Readonly<Record<string, ComponentContract>>;
}

export interface RecipeFamilyPolicy {
  readonly family: Exclude<RecipeFamily, "identity">;
  readonly resolveConditional: (
    input: Record<string, unknown>,
    intent: RecipeIntent,
    recipe: RecipeContract,
  ) => Readonly<Record<string, boolean>>;
  readonly consumerOwned: readonly string[];
}

export interface RecipeFamilyResolver {
  resolve(
    input?: EntityListIntentInput | EntityDetailIntentInput,
  ): RecipeFamilyResolution;
  compose(
    input?: EntityListIntentInput | EntityDetailIntentInput,
  ): RecipeFamilyScaffold;
  inspect(): RecipeContract;
}

export function createRecipeFamilyResolver(
  contract: EntityListContractData | EntityDetailContractData,
  policy?: RecipeFamilyPolicy,
): RecipeFamilyResolver;
export function resolveRequiredContracts(
  recipe: RecipeContract,
  input?: EntityListIntentInput | EntityDetailIntentInput,
): readonly string[];

export function createEntityListResolver(
  contract: EntityListContractData,
): RecipeFamilyResolver;
export function resolveEntityListIntent(
  contract: EntityListContractData,
  input?: EntityListIntentInput,
): RecipeFamilyResolution;
export function composeEntityList(
  contract: EntityListContractData,
  input?: EntityListIntentInput,
): RecipeFamilyScaffold;
export function inspectEntityList(
  contract: EntityListContractData,
): RecipeContract;

export function createEntityDetailResolver(
  contract: EntityDetailContractData,
): RecipeFamilyResolver;
export function resolveEntityDetailIntent(
  contract: EntityDetailContractData,
  input?: EntityDetailIntentInput,
): RecipeFamilyResolution;
export function composeEntityDetail(
  contract: EntityDetailContractData,
  input?: EntityDetailIntentInput,
): RecipeFamilyScaffold;
export function inspectEntityDetail(
  contract: EntityDetailContractData,
): RecipeContract;

export interface BrandExpressionContractData {
  readonly recipe: RecipeContract;
  readonly profiles: Readonly<Record<BrandProfileId, BrandProfile>>;
  readonly components: Readonly<Record<string, ComponentContract>>;
}

export interface BrandExpressionInput {
  readonly brandProfile?: BrandProfileId;
}

export interface BrandDecision {
  readonly decision: string;
  readonly value: string;
  readonly source: "brand-profile";
  readonly agentOwned: 0;
}

export interface BrandExpressionResolution {
  readonly recipe: "auth";
  readonly brand: BrandProfileId;
  readonly profile: BrandProfile;
  readonly composition: BrandProfile["composition"];
  readonly media: BrandProfile["media"];
  readonly typography: BrandProfile["typography"];
  readonly brandMark: BrandProfile["brandMark"];
  readonly surface: BrandProfile["surface"];
  readonly actionEmphasis: BrandProfile["actionEmphasis"];
  readonly responsive: RecipeExpressionContract["responsive"];
  readonly canonicalComponents: readonly string[];
  readonly optionalComponents: readonly string[];
  readonly consumerSlots: readonly string[];
  readonly consumerOwned: readonly string[];
  readonly decisionLedger: readonly BrandDecision[];
  readonly decisionCount: number;
  readonly agentOwnedDecisionCount: 0;
}

export interface BrandExpressionScaffold extends Omit<
  BrandExpressionResolution,
  "profile"
> {
  readonly kind: "ten4seven-brand-expression";
}

export interface BrandExpressionResolver {
  resolve(input?: BrandExpressionInput): BrandExpressionResolution;
  compose(input?: BrandExpressionInput): BrandExpressionScaffold;
  inspect(): RecipeContract;
}

export function createBrandExpressionResolver(
  contract: BrandExpressionContractData,
): BrandExpressionResolver;
export function resolveBrandExpression(
  contract: BrandExpressionContractData,
  input?: BrandExpressionInput,
): BrandExpressionResolution;
export function composeBrandExpression(
  contract: BrandExpressionContractData,
  input?: BrandExpressionInput,
): BrandExpressionScaffold;
export function inspectBrandExpression(
  contract: BrandExpressionContractData,
): RecipeContract;
