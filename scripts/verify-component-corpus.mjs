import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));

const ledger = readJson("generated/component-corpus-ledger.json");
const agentLedger = readJson(
  "packages/agent/generated/component-corpus-ledger.json",
);
const catalog = readJson("packages/ai/catalog/components.json");
const blocks = readJson("packages/ai/catalog/blocks.json");
const recipes = readJson("packages/ai/catalog/recipes.json");
const platformPlane = readJson("generated/component-contract-plane.json");

const decisions = new Set([
  "FOUNDATION",
  "CANONICAL_COMPONENT",
  "COMPONENT_VARIANT",
  "UTILITY_OR_PROVIDER",
  "COMPOSITE_BLOCK",
  "RECIPE_OR_PATTERN",
  "ENGINE_ADAPTER",
  "DOMAIN_COMPOSITION",
  "ALIAS",
  "WEB_ONLY",
  "NATIVE_ONLY",
  "ADAPTIVE",
  "DEFERRED",
  "REJECTED_DUPLICATE",
]);
const platforms = new Set(["BOTH", "WEB", "NATIVE", "ADAPTIVE"]);
const strategies = new Set([
  "SAME_INTENT",
  "NATIVE_RENDERER",
  "ALTERNATE_PATTERN",
  "NOT_APPLICABLE",
]);

assert.equal(ledger.schemaVersion, "0.1");
assert.equal(ledger.id, "component-corpus-ledger");
assert.deepEqual(
  agentLedger,
  ledger,
  "agent corpus projection must be an exact generated copy",
);
assert.equal(
  ledger.candidateLedger.length,
  ledger.counts.normalizedCandidates,
  "every normalized candidate must have exactly one ledger row",
);
assert.equal(
  new Set(ledger.candidateLedger.map((candidate) => candidate.normalizedKey))
    .size,
  ledger.candidateLedger.length,
  "normalized candidate keys must be unique",
);
assert.ok(
  ledger.candidateLedger.every((candidate) =>
    decisions.has(candidate.decision),
  ),
  "every corpus row must use the U13 classification vocabulary",
);
assert.ok(
  ledger.candidateLedger.every(
    (candidate) =>
      candidate.platform === null || platforms.has(candidate.platform),
  ),
  "candidate platform metadata must use the shared platform vocabulary",
);
assert.ok(
  ledger.candidateLedger.every(
    (candidate) =>
      candidate.nativeStrategy === null ||
      strategies.has(candidate.nativeStrategy),
  ),
  "candidate Native strategy metadata must use the shared vocabulary",
);

const dispositionTotal = Object.values(ledger.counts.dispositionCounts).reduce(
  (total, count) => total + count,
  0,
);
assert.equal(
  dispositionTotal,
  ledger.counts.normalizedCandidates,
  "disposition counts must account for the normalized corpus exactly once",
);
assert.equal(ledger.counts.rawCandidates, 2221);
assert.equal(ledger.counts.exactUniqueCandidates, 2075);
assert.equal(ledger.counts.normalizedCandidates, 2073);
assert.equal(ledger.counts.normalizedDuplicateGroups, 2);
assert.equal(ledger.normalizedDuplicateGroups.length, 2);

const catalogEntries = Object.entries(catalog);
const canonicalEntries = catalogEntries.filter(([, entry]) => !entry.aliasOf);
const aliasEntries = catalogEntries.filter(([, entry]) =>
  Boolean(entry.aliasOf),
);
assert.equal(ledger.counts.currentCatalogEntries, catalogEntries.length);
assert.equal(ledger.counts.canonicalBeforeU13, canonicalEntries.length);
assert.equal(ledger.counts.aliases, aliasEntries.length);
assert.equal(ledger.counts.blocks, Object.keys(blocks).length);
assert.equal(ledger.counts.recipes, Object.keys(recipes).length);
assert.equal(
  ledger.counts.canonicalBeforeU13,
  platformPlane.registry.canonicalCount,
  "ledger and generated platform plane must agree on canonical count",
);
assert.equal(
  ledger.counts.currentCatalogEntries,
  platformPlane.registry.catalogCount,
  "ledger and generated platform plane must agree on catalog count",
);
assert.equal(
  ledger.counts.aliases,
  platformPlane.registry.aliasCount,
  "ledger and generated platform plane must agree on alias count",
);

for (const [platform, expected] of Object.entries({
  BOTH: 97,
  WEB: 14,
  NATIVE: 0,
  ADAPTIVE: 61,
})) {
  assert.equal(
    ledger.counts.platformCounts.canonical[platform] ?? 0,
    expected,
    `canonical ${platform} platform count drifted`,
  );
}

assert.equal(ledger.counts.netNewCanonicalImplemented, 0);
assert.equal(ledger.counts.hardenedExisting, 0);
assert.equal(ledger.counts.canonicalAfterU13, ledger.counts.canonicalBeforeU13);
assert.equal(ledger.counts.legitimateGapCount, 0);
assert.equal(ledger.assessment.u13A, "TARGET NOT JUSTIFIABLE FROM CORPUS");
assert.equal(ledger.assessment.legitimateGaps.length, 0);
assert.equal(ledger.assessment.conditionalCandidates.length, 3);
assert.equal(ledger.assessment.u12PrerequisiteGate, "PASS FOR U13");
assert.equal(ledger.assessment.u13Gate, "PASS FOR U14");

const conditionalNames = new Set(
  ledger.assessment.conditionalCandidates.map(
    (candidate) => candidate.candidate,
  ),
);
assert.deepEqual([...conditionalNames].sort(), [
  "Gauge Chart",
  "Knob",
  "Menubar",
]);
for (const candidate of ledger.candidateLedger.filter(
  (candidate) => candidate.conditional,
)) {
  assert.equal(candidate.decision, "DEFERRED");
  assert.equal(candidate.implementationStatus, "conditional-unapproved");
  assert.ok(candidate.currentT7Equivalent in catalog);
}

for (const candidate of ledger.candidateLedger) {
  if (candidate.currentT7Equivalent !== null) {
    assert.ok(
      candidate.currentT7Equivalent in catalog,
      `${candidate.candidate}: current T7 equivalent is not in the catalog`,
    );
  }
  if (candidate.decision === "CANONICAL_COMPONENT") {
    assert.equal(candidate.implementationStatus, "existing-canonical");
    assert.ok(candidate.currentT7Equivalent in catalog);
  }
  if (candidate.decision === "ALIAS") {
    assert.ok(candidate.currentT7Equivalent in catalog);
  }
}

for (const relativePath of ledger.sourceOfTruth.generatedCopies) {
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), relativePath);
}

console.log(
  `Component corpus verified: ${ledger.counts.rawCandidates} raw entries, ${ledger.counts.normalizedCandidates} normalized candidates, ${ledger.counts.canonicalBeforeU13} canonical catalog entries, ${ledger.counts.legitimateGapCount} legitimate U13 gaps, ${ledger.counts.conditionalGapCount} conditional candidates, and deterministic U13-A stop evidence.`,
);
