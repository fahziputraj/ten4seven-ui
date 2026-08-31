import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AUTHENTICATION_CONTRACT,
  BRAND_PROFILE_IDS,
  BRAND_PROFILES,
} from "../packages/contracts/src/index.ts";
import {
  composeBrandExpression as composeNodeBrandExpression,
  resolveBrandExpression as resolveNodeBrandExpression,
} from "../packages/agent/src/node.mjs";
import {
  composeBrandExpression,
  createBrandExpressionResolver,
  resolveBrandExpression,
} from "../packages/agent/src/core.mjs";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

assert.deepEqual(BRAND_PROFILE_IDS, ["neutral-product", "aapm-academy"]);
assert.deepEqual(Object.keys(BRAND_PROFILES).sort(), [
  "aapm-academy",
  "neutral-product",
]);
assert.deepEqual(
  AUTHENTICATION_CONTRACT.expression?.profiles,
  BRAND_PROFILE_IDS,
);

const compactAuth = readJson("generated/recipes/auth.json");
const compactProfiles = readJson("generated/brand-profiles.json");
const compactComponents = Object.fromEntries(
  AUTHENTICATION_CONTRACT.components.map((name) => [
    name,
    readJson(`generated/components/${name}.json`),
  ]),
);
const coreResolver = createBrandExpressionResolver({
  recipe: compactAuth,
  profiles: compactProfiles,
  components: compactComponents,
});

const neutral = resolveBrandExpression(
  {
    recipe: compactAuth,
    profiles: compactProfiles,
    components: compactComponents,
  },
  { brandProfile: "neutral-product" },
);
const academy = coreResolver.resolve({ brandProfile: "aapm-academy" });
const neutralNode = resolveNodeBrandExpression({
  brandProfile: "neutral-product",
});
const academyNode = resolveNodeBrandExpression({
  brandProfile: "aapm-academy",
});

const stripRuntimeTelemetry = ({ source, contextReads, retrieval, ...core }) =>
  core;

for (const resolution of [neutral, academy, neutralNode, academyNode]) {
  assert.equal(resolution.recipe, "auth");
  assert.deepEqual(
    resolution.canonicalComponents,
    AUTHENTICATION_CONTRACT.components,
    "Brand Expression must retain the canonical Authentication anatomy",
  );
  assert.deepEqual(
    resolution.optionalComponents,
    AUTHENTICATION_CONTRACT.optional,
  );
  assert.equal(resolution.agentOwnedDecisionCount, 0);
  assert.equal(resolution.decisionCount, 9);
  for (const decision of resolution.decisionLedger) {
    assert.equal(decision.source, "brand-profile");
    assert.equal(decision.agentOwned, 0);
  }
}

assert.equal(neutral.brand, "neutral-product");
assert.equal(academy.brand, "aapm-academy");
assert.deepEqual(neutral.canonicalComponents, academy.canonicalComponents);
assert.deepEqual(neutral.optionalComponents, academy.optionalComponents);
assert.notDeepEqual(neutral.composition, academy.composition);
assert.notDeepEqual(neutral.media, academy.media);
assert.notDeepEqual(neutral.typography, academy.typography);
assert.notDeepEqual(neutral.surface, academy.surface);
assert.notDeepEqual(neutral.actionEmphasis, academy.actionEmphasis);
assert.deepEqual(neutral.responsive, academy.responsive);
assert.deepEqual(neutral.consumerSlots, academy.consumerSlots);
assert.deepEqual(stripRuntimeTelemetry(neutralNode), neutral);
assert.deepEqual(stripRuntimeTelemetry(academyNode), academy);
for (const resolution of [neutralNode, academyNode]) {
  assert.equal(resolution.retrieval.fullCatalogFallbacks, 0);
  assert.ok(resolution.retrieval.totalActualBytes < 84135);
  assert.deepEqual(
    resolution.retrieval.componentIds,
    AUTHENTICATION_CONTRACT.components,
  );
}

const neutralComposition = coreResolver.compose({
  brandProfile: "neutral-product",
});
const academyComposition = composeBrandExpression(
  {
    recipe: compactAuth,
    profiles: compactProfiles,
    components: compactComponents,
  },
  { brandProfile: "aapm-academy" },
);
const academyNodeComposition = composeNodeBrandExpression({
  brandProfile: "aapm-academy",
});
assert.equal(neutralComposition.kind, "ten4seven-brand-expression");
assert.equal(academyComposition.kind, "ten4seven-brand-expression");
assert.deepEqual(
  neutralComposition.canonicalComponents,
  academyComposition.canonicalComponents,
);
assert.notEqual(neutralComposition.brand, academyComposition.brand);
assert.equal(neutralComposition.agentOwnedDecisionCount, 0);
assert.equal(academyComposition.agentOwnedDecisionCount, 0);
assert.deepEqual(
  stripRuntimeTelemetry(academyNodeComposition),
  academyComposition,
);

const coreSource = read("packages/agent/src/core.mjs");
assert.doesNotMatch(coreSource, /node:/);
assert.doesNotMatch(coreSource, /from ["']node:/);
assert.doesNotMatch(coreSource, /(?:^|\W)(?:fs|readFileSync)\W/);
assert.doesNotMatch(coreSource, /contextReads/);
assert.doesNotMatch(coreSource, /generated\//);
assert.equal(
  (coreSource.match(/function resolveBrandFromContract/g) ?? []).length,
  1,
  "Brand Expression must have one canonical resolver implementation",
);

const projections = await buildProjections();
for (const root of ["generated", "packages/agent/generated"])
  for (const [filename, value] of Object.entries(projections.outputs))
    assert.equal(
      read(`${root}/${filename}`),
      serializeProjection(filename, value),
      `${root}/${filename}: generated output is stale; run pnpm contracts:generate`,
    );

const cliOutput = execFileSync(
  process.execPath,
  [
    "packages/ai/bin/t7ui.mjs",
    "brand",
    "resolve",
    "auth",
    "--profile=aapm-academy",
  ],
  { cwd: repoRoot, encoding: "utf8" },
);
const cliResolution = JSON.parse(cliOutput);
assert.equal(cliResolution.brand, "aapm-academy");
assert.equal(cliResolution.agentOwnedDecisionCount, 0);

console.log(
  "Brand Expression gate verified: two profiles, one canonical Authentication recipe, identical component anatomy, deterministic core/node parity, zero agent-owned brand decisions, and fresh generated projections.",
);
