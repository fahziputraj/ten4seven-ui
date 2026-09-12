import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  CANONICAL_CONTRACTS,
  NATIVE_WORKFLOW_CANARY,
  TOKEN_RESOLUTION_ORDER,
  WORKFLOW_BUSINESS_BOUNDARY,
  WORKFLOW_COMPONENT_PATTERN_LINKS,
  WORKFLOW_DND_BOUNDARY,
  WORKFLOW_INVENTORY_STATUSES,
  WORKFLOW_PATTERN_CLASSIFICATIONS,
  WORKFLOW_PATTERN_DEFINITIONS,
  WORKFLOW_PATTERN_IDS,
  WORKFLOW_PRODUCTIVITY_BLOCKS,
  WORKFLOW_PRODUCTIVITY_COMPONENTS,
  WORKFLOW_PRODUCTIVITY_CONTRACT,
  WORKFLOW_PRODUCTIVITY_PLANE,
  WORKFLOW_PRODUCTIVITY_RECIPES,
  resolveNativeWorkflowCanary,
  resolveWorkflowPattern,
} from "../packages/contracts/src/index.ts";
import { resolveNativeWorkflow } from "../packages/native/src/index.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");

const projection = readJson("generated/workflow-productivity.json");
const agentProjection = readJson(
  "packages/agent/generated/workflow-productivity.json",
);
const projections = await buildProjections();
const expected = projections.outputs["workflow-productivity.json"];

for (const [name, actual] of [
  ["generated", projection],
  ["packages/agent/generated", agentProjection],
]) {
  const relativePath = `${name}/workflow-productivity.json`;
  assert.equal(
    normalizeLineEndings(read(relativePath)),
    normalizeLineEndings(
      serializeProjection("workflow-productivity.json", expected),
    ),
    `${relativePath} is stale; run pnpm contracts:generate`,
  );
  assert.deepEqual(actual, expected, `${relativePath} must be deterministic`);
}

assert.deepEqual(
  expected,
  WORKFLOW_PRODUCTIVITY_CONTRACT,
  "U09 projection must equal the typed contract",
);
assert.equal(
  CANONICAL_CONTRACTS.workflowProductivity,
  WORKFLOW_PRODUCTIVITY_PLANE,
  "canonical registry must point at the typed U09 plane",
);
assert.deepEqual(expected.resolverOrder, TOKEN_RESOLUTION_ORDER);
assert.deepEqual(expected.taxonomy.patternIds, WORKFLOW_PATTERN_IDS);
assert.deepEqual(
  expected.taxonomy.inventoryStatuses,
  WORKFLOW_INVENTORY_STATUSES,
);
assert.deepEqual(
  expected.taxonomy.classifications,
  WORKFLOW_PATTERN_CLASSIFICATIONS,
);
assert.equal(expected.nativeProjection.cssParsing, false);
assert.equal(expected.webProjection.authority, "derived");
assert.equal(expected.nativeProjection.authority, "derived");

const legacyComponents = readJson("packages/ai/catalog/components.json");
const legacyRecipes = readJson("packages/ai/catalog/recipes.json");
const legacyBlocks = readJson("packages/ai/catalog/blocks.json");
const compactComponents = readJson("generated/components.compact.json");
const generatedIndex = readJson("generated/index.json");
const agentIndex = readJson("generated/agent-index.json");

assert.equal(
  generatedIndex.workflowProductivity.path,
  "workflow-productivity.json",
);
assert.equal(
  agentIndex.entryPoints["workflow-productivity"].source,
  "generated/workflow-productivity.json",
);
assert.equal(
  agentIndex.sourceOfTruth.workflowProductivity,
  "packages/contracts/src/workflow-productivity.ts",
);
assert.equal(expected.componentCount, WORKFLOW_PRODUCTIVITY_COMPONENTS.length);
assert.equal(
  new Set(WORKFLOW_PRODUCTIVITY_COMPONENTS).size,
  WORKFLOW_PRODUCTIVITY_COMPONENTS.length,
  "workflow component list must not duplicate canonical components",
);
for (const name of WORKFLOW_PRODUCTIVITY_COMPONENTS) {
  assert.equal(
    legacyComponents[name]?.status,
    "implemented",
    `${name} must remain an implemented canonical component`,
  );
}

for (const [name, patterns] of Object.entries(
  WORKFLOW_COMPONENT_PATTERN_LINKS,
)) {
  assert.deepEqual(
    compactComponents[name].workflowProductivityRef,
    {
      path: "workflow-productivity.json",
      component: name,
      patterns,
    },
    `${name} compact projection must link to U09 metadata`,
  );
}

for (const id of WORKFLOW_PATTERN_IDS) {
  const pattern = WORKFLOW_PATTERN_DEFINITIONS[id];
  assert.equal(pattern.id, id, `${id} key and id must agree`);
  assert.ok(
    WORKFLOW_PATTERN_CLASSIFICATIONS.includes(pattern.classification),
    `${id} has an invalid classification`,
  );
  assert.ok(
    WORKFLOW_INVENTORY_STATUSES.includes(pattern.inventoryStatus),
    `${id} has an invalid inventory status`,
  );
  assert.ok(pattern.intent.length > 0, `${id} intent is required`);
  assert.ok(
    pattern.accessibility.length > 0,
    `${id} accessibility is required`,
  );
  assert.ok(
    pattern.consumerOwns.length > 0,
    `${id} consumer ownership is required`,
  );
  assert.ok(
    pattern.ten4sevenOwns.length > 0,
    `${id} system ownership is required`,
  );
  assert.ok(
    pattern.rendererOwns.length > 0,
    `${id} renderer ownership is required`,
  );
  assert.ok(pattern.useWhen.length > 0, `${id} useWhen is required`);
  assert.ok(pattern.avoidWhen.length > 0, `${id} avoidWhen is required`);
  assert.ok(
    pattern.ai.retrievalTerms.length > 0,
    `${id} AI retrieval terms are required`,
  );
  assert.ok(
    pattern.ai.platformNotes.length > 0,
    `${id} platform notes are required`,
  );
  for (const component of pattern.canonicalComponents) {
    assert.ok(
      legacyComponents[component],
      `${id} references missing component ${component}`,
    );
  }
  for (const recipe of pattern.recipeRefs) {
    assert.ok(
      WORKFLOW_PRODUCTIVITY_RECIPES[recipe],
      `${id} references an unnormalized recipe ${recipe}`,
    );
    assert.ok(
      legacyRecipes[recipe],
      `${id} recipe ${recipe} is not in the compatibility catalog`,
    );
  }
  for (const block of pattern.blockRefs) {
    assert.ok(
      WORKFLOW_PRODUCTIVITY_BLOCKS[block],
      `${id} references an unnormalized block ${block}`,
    );
    assert.ok(
      legacyBlocks[block],
      `${id} block ${block} is not in the compatibility catalog`,
    );
  }
  assert.equal(pattern.responsive.desktop.length > 0, true);
  assert.equal(pattern.responsive.tablet.length > 0, true);
  assert.equal(pattern.responsive.mobile.length > 0, true);
  assert.equal(pattern.responsive.native.length > 0, true);
}

const workQueue = WORKFLOW_PATTERN_DEFINITIONS.WorkQueue;
const inbox = WORKFLOW_PATTERN_DEFINITIONS.Inbox;
const notificationCenter = WORKFLOW_PATTERN_DEFINITIONS.NotificationCenter;
assert.match(workQueue.intent, /operational records/i);
assert.match(inbox.intent, /attention|review/i);
assert.match(notificationCenter.intent, /informational notification history/i);
assert.notEqual(workQueue.intent, inbox.intent);
assert.notEqual(inbox.intent, notificationCenter.intent);
assert.match(workQueue.avoidWhen.join(" "), /notification history/i);
assert.match(inbox.avoidWhen.join(" "), /operational backlog/i);
assert.match(notificationCenter.avoidWhen.join(" "), /operational records/i);

const decision = WORKFLOW_PATTERN_DEFINITIONS.DecisionWorkspace;
assert.ok(
  decision.consumerOwns.some((item) =>
    /criteria|evidence|authorization/i.test(item),
  ),
);
assert.match(decision.decisionBoundary, /ApproveButton/);
assert.ok(!Object.prototype.hasOwnProperty.call(decision, "transitions"));
assert.ok(!Object.prototype.hasOwnProperty.call(decision, "guards"));

const lifecycle = WORKFLOW_PATTERN_DEFINITIONS.LifecycleTracker;
const wizard = WORKFLOW_PATTERN_DEFINITIONS.Wizard;
assert.notEqual(lifecycle.id, wizard.id);
assert.ok(
  lifecycle.consumerOwns.some((item) => /transition legality/i.test(item)),
);
assert.ok(wizard.consumerOwns.some((item) => /validation/i.test(item)));
assert.ok(lifecycle.avoidWhen.some((item) => /state-machine/i.test(item)));
assert.ok(wizard.avoidWhen.some((item) => /record lifecycle/i.test(item)));
assert.ok(
  !Object.prototype.hasOwnProperty.call(lifecycle, "allowedTransitions"),
);
assert.ok(!Object.prototype.hasOwnProperty.call(wizard, "validationRules"));

const kanban = WORKFLOW_PATTERN_DEFINITIONS.Kanban;
const taskBoard = WORKFLOW_PATTERN_DEFINITIONS.TaskBoard;
const workboard = WORKFLOW_PATTERN_DEFINITIONS.Workboard;
assert.equal(kanban.classification, "RECIPE_OR_PATTERN");
assert.equal(taskBoard.classification, "COMPONENT_VARIANT");
assert.equal(workboard.classification, "COMPOSITE_BLOCK");
assert.match(kanban.decisionBoundary, /intent only/i);
assert.match(WORKFLOW_DND_BOUNDARY.advancedEngine, /^DEFERRED_TO_U10$/);
assert.match(WORKFLOW_DND_BOUNDARY.nonDndAlternative, /focusable action/i);
assert.match(workboard.decisionBoundary, /block composition/i);
assert.ok(
  !JSON.stringify(kanban).match(/react-beautiful-dnd|@dnd-kit|sortablejs/i),
);

const commandPalette = WORKFLOW_PATTERN_DEFINITIONS.CommandPalette;
assert.equal(commandPalette.classification, "ALIAS");
assert.equal(commandPalette.inventoryStatus, "REJECTED_DUPLICATE");
assert.deepEqual(commandPalette.canonicalComponents, ["CommandMenu"]);
assert.equal(readJson("generated/aliases.json").CommandPalette, "CommandMenu");

assert.match(WORKFLOW_BUSINESS_BOUNDARY.priorityVocabulary, /No global/i);
assert.ok(!Object.prototype.hasOwnProperty.call(expected, "priorityLevels"));
assert.ok(!Object.prototype.hasOwnProperty.call(expected, "transitionRules"));
assert.ok(!Object.prototype.hasOwnProperty.call(expected, "permissions"));

assert.deepEqual(Object.keys(NATIVE_WORKFLOW_CANARY), [
  "workQueue",
  "queueDetail",
  "decisionWorkspace",
  "kanban",
  "wizard",
  "commandPalette",
]);
for (const [id, canary] of Object.entries(NATIVE_WORKFLOW_CANARY)) {
  const resolvedContract = resolveNativeWorkflowCanary(id);
  const descriptor = resolveNativeWorkflow(id);
  assert.deepEqual(resolvedContract, canary);
  assert.equal(descriptor.id, id);
  assert.ok(descriptor.primitive);
  assert.ok(descriptor.accessibilityRole);
  assert.ok(descriptor.accessibilityAlternative.length > 0);
  assert.ok(descriptor.semanticInputs.length > 0);
  assert.ok(descriptor.consumerOwns.length > 0);
  assert.equal(
    WORKFLOW_PATTERN_DEFINITIONS[canary.sourcePattern].platform,
    "ADAPTIVE",
    `${id} source pattern must remain adaptive`,
  );
}

const nativeSource = read("packages/native/src/index.ts");
for (const forbidden of [
  "@ten4seven/ui",
  "react",
  "react-dom",
  "className",
  "document",
  "window",
  ".css",
  "fetch(",
  "@dnd-kit",
  "react-beautiful-dnd",
]) {
  assert.doesNotMatch(
    nativeSource,
    new RegExp(forbidden.replace(/[()[\].]/g, "\\$&"), "i"),
    `native U09 projection must not own ${forbidden}`,
  );
}

assert.equal(
  readJson("generated/agent-index.json").entryPoints["workflow-productivity"]
    .reference,
  "/component-lab#component-lab-workflow",
);
assert.match(
  read("packages/contracts/src/workflow-productivity.ts"),
  /reduced-motion/i,
);

console.log(
  `U09 workflow/productivity contract verification passed (${WORKFLOW_PATTERN_IDS.length} patterns; ${WORKFLOW_PRODUCTIVITY_COMPONENTS.length} linked components; ${Object.keys(NATIVE_WORKFLOW_CANARY).length} native canaries).`,
);
