import type {
  EntityDetailIntentInput,
  EntityListIntentInput,
} from "./index.ts";
import type { RecipeContract } from "@ten4seven/contracts";

export interface RecipeReference {
  readonly id: string;
  readonly path: string;
  readonly family?: string;
}

export interface GeneratedIndex {
  readonly recipes: Readonly<Record<string, RecipeReference>>;
  readonly componentShardPattern: string;
}

export function resolveRecipeReference(
  index: GeneratedIndex,
  recipeId: string,
): RecipeReference;
export function resolveComponentShardPath(
  index: GeneratedIndex,
  componentId: string,
): string;
export function loadContracts<T>(
  ids: readonly string[],
  loadContract: (componentId: string) => T,
): Readonly<Record<string, T>>;
export function resolveRequiredContracts(
  recipe: RecipeContract,
  input?: EntityListIntentInput | EntityDetailIntentInput,
): readonly string[];
