import { resolveRequiredContracts } from "./core.mjs";

/**
 * Resolve a generated recipe reference without knowing how the index was
 * obtained. Filesystem, registry, HTTP, and embedded manifests can all feed
 * this same lookup contract.
 */
export function resolveRecipeReference(index, recipeId) {
  const reference = index?.recipes?.[recipeId];
  if (!reference || typeof reference !== "object") {
    throw new Error(`Unknown generated recipe: ${recipeId}`);
  }
  return {
    id: recipeId,
    path: reference.path,
    ...(reference.family ? { family: reference.family } : {}),
  };
}

export function resolveComponentShardPath(index, componentId) {
  const pattern = index?.componentShardPattern;
  if (typeof pattern !== "string" || !pattern.includes("{componentId}")) {
    throw new Error("Generated index is missing componentShardPattern");
  }
  return pattern.replace("{componentId}", componentId);
}

/**
 * Load exactly the requested contract IDs through an injected loader. The
 * loader may read a file, import JSON, query a registry, or return an embedded
 * manifest; this helper has no environment or transport assumptions.
 */
export function loadContracts(ids, loadContract) {
  if (!Array.isArray(ids) || typeof loadContract !== "function") {
    throw new Error(
      "loadContracts requires IDs and an injected contract loader",
    );
  }
  return Object.fromEntries(
    [...new Set(ids)].map((id) => [id, loadContract(id)]),
  );
}

/**
 * Select the minimum component contract set before any component shard is
 * loaded. The decision plan is owned by the pure recipe-family kernel.
 */
export { resolveRequiredContracts };
