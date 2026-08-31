# Agent Runtime Boundary

Status: **PASS — bounded adoption boundary hardening**
Verified: 2026-08-31
Scope: `entity-list` resolver/composer only
Fresh agent context: **NOT VERIFIED**

This document defines the supported runtime boundary without changing the
historical Independent Adoption Benchmark decision. The historical gate stays
**CONDITIONAL PASS**; this document records the separate boundary slice.

## Conceptual boundary

```text
@ten4seven/agent/core
  pure deterministic resolver/composer
  accepts normalized contract data
  environment-neutral
  no node:fs, node:path, require, or filesystem access

@ten4seven/agent/node
  compact projection loader
  Node/build-time and CLI convenience layer
  may use node:fs
  delegates all resolution and composition to core

@ten4seven/agent/generated
  compact projection exports
  recipes, components, aliases, ownership rules, agent index

@ten4seven/ui
  application UI runtime
  consumes the resolved composition and canonical component contracts
```

## One canonical implementation

The only entity-list resolver implementation is
`packages/agent/src/core.mjs`.

Its public pure API is:

```js
import {
  composeEntityList,
  createEntityListResolver,
  inspectEntityList,
  resolveEntityListIntent,
} from "@ten4seven/agent/core";

const contract = {
  recipe: compactRecipes["entity-list"],
  components: compactComponents,
};

const resolution = resolveEntityListIntent(contract, intentInput);
const scaffold = composeEntityList(contract, intentInput);
```

The core receives normalized data; it does not know where that data came from.
It validates the entity-list contract, normalizes intent, resolves conditional
anatomy, composes the scaffold, and returns the same deterministic shape used
by the Node convenience layer.

The Node/build-time API is:

```js
import {
  composeEntityList,
  inspectEntityList,
  resolveEntityListIntent,
} from "@ten4seven/agent/node";
```

`@ten4seven/agent/node` reads `generated/recipes.compact.json` and
`generated/components.compact.json` once, creates the core resolver, and
delegates to it. The root `@ten4seven/agent` export points to this Node layer
for backward-compatible convenience. `src/runtime.mjs` is a compatibility
shim to `src/node.mjs`; it is not a second implementation.

The generated boundary is:

```js
import { components, recipes, agentIndex } from "@ten4seven/agent/generated";
```

These exports are data only. They do not load the resolver and do not make the
browser responsible for filesystem access.

## Supported adoption paths

| Adoption concern                     | Canonical path               | Role                                                   |
| ------------------------------------ | ---------------------------- | ------------------------------------------------------ |
| Portable deterministic logic         | `@ten4seven/agent/core`      | Core resolver/composer with normalized contract input. |
| Design/build-time and CLI resolution | `@ten4seven/agent/node`      | Load compact projections, then feed core.              |
| Compact projection data              | `@ten4seven/agent/generated` | Generated contract payload and retrieval metadata.     |
| Application UI runtime               | `@ten4seven/ui`              | Render canonical primitives and patterns.              |

Build-time/CLI resolution is the supported primary adoption path. A browser
application may run the pure core when it already has normalized contract data,
but direct production browser resolution by the full agent package is optional
and is not required by this boundary slice.

## Proof performed

- The core source contains no `node:` import, `require`, or filesystem access.
- The Node loader is the only layer that imports `node:fs`.
- A packed external install exposes `/core`, `/node`, and `/generated` subpaths.
- The external Vite consumer directly imports `@ten4seven/agent/core`.
- Core resolution and composition match Node resolution and composition for
  invoice list, customer directory, and exception queue.
- No source workspace or donor read occurs.
- The existing retrieval and decision behavior remains unchanged.

## Deliberate non-goals

- No second resolver implementation.
- No browser requirement for the full Node agent runtime.
- No registry publication.
- No Brand Profile implementation.
- No recipe migration beyond `entity-list`.
- No new visual component or route redesign.
- No change to `GATE_INDEPENDENT_ADOPTION.md` status.
