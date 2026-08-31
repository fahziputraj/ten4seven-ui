# Selective Retrieval Architecture

Status: PASS for the bounded C1 slice.

## Boundary

The agent-facing retrieval path is now:

```text
generated/index.json
        ↓
generated/recipes/{recipe}.json
        ↓
pure decision plan
        ↓
generated/components/{componentId}.json
        ↓
pure resolver/composer output
```

The runtime no longer imports the complete `generated/components.compact.json`
projection for Entity List or Entity Detail. The compact all-components file is
retained as a generated compatibility artifact; it is not the default runtime
path.

## Generated sources

Canonical authoring remains in `packages/contracts/src`. The generator creates:

- `generated/index.json`, the recipe-reference and component-shard manifest;
- one recipe shard for every existing recipe descriptor;
- one compact component contract shard for every catalog component;
- the existing compact projections for compatibility and historical validation.

No shard is manually maintained. Running `pnpm contracts:generate` reproduces
both `generated/` and `packages/agent/generated/`.

Selective shards use compact JSON serialization because retrieval cost is part
of the contract. Each shard still contains a contract identity, display name,
implementation status, category, purpose, source path, and important props when
the canonical source provides them.

## Environment-neutral lookup

`@ten4seven/agent/retrieval` exposes three pure lookup semantics:

```ts
resolveRecipeReference(index, recipeId);
resolveRequiredContracts(recipe, intent);
loadContracts(ids, injectedLoader);
```

The first two only inspect normalized data. `loadContracts` accepts an injected
loader and makes no assumption about filesystem, JSON import, registry, HTTP,
or embedded manifests.

`@ten4seven/agent/core` owns the deterministic decision plan and resolver. It
receives normalized recipe/component data and has no `node:fs`, `fs`, generated
path, or loader-telemetry dependency. `@ten4seven/agent/node` owns filesystem
loading and attaches retrieval telemetry after core resolution.

## Telemetry separation

Core output contains decisions only:

```text
recipe, family, intent, shell, required, conditional, included, omitted,
optional, states, responsive, forbid, consumerOwned, rationale, decisionCount
```

Node output adds loader-owned telemetry:

```text
source
contextReads
retrieval.indexBytes
retrieval.recipeBytes
retrieval.componentContractBytes
retrieval.supportingBytes
retrieval.totalActualBytes
retrieval.files
retrieval.componentIds
retrieval.fullCatalogFallbacks
```

This keeps a filesystem path from becoming a decision in the pure resolver.

## Cost definition

`totalActualBytes` is the sum of raw bytes for files actually read by the Node
loader for one resolution. `taskSpecificBytes` is recipe plus selected
component (and supporting, when applicable) bytes; the shared index is reported
separately. Historical logical task-slice bytes are reported separately and are
not substituted for actual reads.

## Compatibility and fallback

The legacy catalog remains available to explicit discovery/fallback commands.
Selective Entity List and Entity Detail runtime calls do not read:

```text
packages/ai/catalog/recipes.json
packages/ai/catalog/components.json
generated/recipes.compact.json
generated/components.compact.json
```

This is a retrieval boundary change, not a claim that every CLI discovery
operation must stop using the historical catalog adapter.
