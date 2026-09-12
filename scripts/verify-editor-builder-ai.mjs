import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  ADVANCED_CLASSIFICATIONS,
  ADVANCED_COMPONENT_FAMILIES,
  ADVANCED_COMPLEXITIES,
  ADVANCED_INVENTORY_STATUSES,
  ADVANCED_NATIVE_STRATEGIES,
  ADVANCED_PLATFORMS,
  ADVANCED_STATES,
  ADVANCED_COMPONENT_DECISIONS,
  AI_CONVERSATION_COMPONENTS,
  AI_CONVERSATION_CONTRACT,
  AI_CONVERSATION_TAXONOMY,
  BUILDER_ARCHITECTURE,
  BUILDER_PART_DECISIONS,
  CANONICAL_CONTRACTS,
  COMMAND_SHORTCUT_CONTRACT,
  COMMAND_SHORTCUT_SCOPES,
  DND_INTENT_CONTRACT,
  EDITOR_BUILDER_AI_COMPONENTS,
  EDITOR_BUILDER_AI_CONTRACT,
  EDITOR_ENGINE_DECISIONS,
  EDITOR_FAMILIES,
  NATIVE_ADVANCED_CANARY,
  TOKEN_RESOLUTION_ORDER,
  U11_PROVISIONAL_RECONCILIATION,
  U11_RECONCILIATION_STATUSES,
  U12_PROVISIONAL_RECONCILIATION,
  U12_RECONCILIATION_STATUSES,
  WEB_ADVANCED_CANARY,
  createDndIntent,
} from "../packages/contracts/src/index.ts";
import { resolveComponentPlatformContract } from "../packages/contracts/src/component-platform.ts";
import { resolveNativeAdvancedInteraction } from "../packages/native/src/index.ts";
import {
  buildProjections,
  serializeProjection,
} from "./generate-contract-projections.mjs";

const repoRoot = path.resolve(import.meta.dirname, "..");
const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

const generated = readJson("generated/editor-builder-ai.json");
const agentGenerated = readJson(
  "packages/agent/generated/editor-builder-ai.json",
);
const projections = await buildProjections();
const expected = projections.outputs["editor-builder-ai.json"];
for (const [relativePath, actual] of [
  ["generated/editor-builder-ai.json", generated],
  ["packages/agent/generated/editor-builder-ai.json", agentGenerated],
]) {
  assert.deepEqual(
    actual,
    expected,
    `${relativePath} drifted from typed U10 source`,
  );
  assert.equal(
    read(relativePath),
    serializeProjection("editor-builder-ai.json", expected),
    `${relativePath} is stale; run pnpm contracts:generate`,
  );
}

assert.equal(
  CANONICAL_CONTRACTS.editorBuilderAi,
  EDITOR_BUILDER_AI_CONTRACT,
  "canonical registry must point at the typed U10 plane",
);
assert.deepEqual(generated.resolverOrder, TOKEN_RESOLUTION_ORDER);
assert.deepEqual(generated.taxonomy.editors, EDITOR_FAMILIES);
assert.deepEqual(generated.taxonomy.components, EDITOR_BUILDER_AI_COMPONENTS);
assert.deepEqual(generated.packageBoundary.runtimeDependencies, []);
assert.equal(
  generated.sourceOfTruth,
  "packages/contracts/src/editor-builder-ai.ts",
);

for (const values of [
  ADVANCED_PLATFORMS,
  ADVANCED_NATIVE_STRATEGIES,
  ADVANCED_COMPLEXITIES,
  ADVANCED_CLASSIFICATIONS,
  ADVANCED_INVENTORY_STATUSES,
  ADVANCED_COMPONENT_FAMILIES,
  ADVANCED_STATES,
])
  assert.ok(values.length > 0, "U10 taxonomy values must be explicit");
assert.deepEqual(ADVANCED_CLASSIFICATIONS, [
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

assert.equal(
  EDITOR_BUILDER_AI_CONTRACT.componentCount,
  EDITOR_BUILDER_AI_COMPONENTS.length,
);
assert.equal(
  new Set(EDITOR_BUILDER_AI_COMPONENTS).size,
  EDITOR_BUILDER_AI_COMPONENTS.length,
  "U10 canonical component IDs must be unique",
);
assert.equal(
  EDITOR_BUILDER_AI_CONTRACT.dependencyLicenseBundleMatrix.length,
  EDITOR_BUILDER_AI_COMPONENTS.length,
);
assert.deepEqual(
  EDITOR_BUILDER_AI_CONTRACT.packageBoundary.runtimeDependencies,
  [],
);
assert.match(
  EDITOR_BUILDER_AI_CONTRACT.packageBoundary.optionalAdapterBoundary,
  /lazy-load/i,
);
assert.doesNotMatch(
  JSON.stringify(EDITOR_BUILDER_AI_CONTRACT),
  /(@tiptap|monaco|dnd-kit|lexical|codemirror)/i,
  "vendor engine types and package names must stay outside the semantic contract",
);

const requiredEditorStates = [
  "idle",
  "focused",
  "dirty",
  "saving",
  "saved",
  "saveFailed",
  "readOnly",
  "loading",
  "error",
];
assert.deepEqual(Object.keys(EDITOR_ENGINE_DECISIONS), EDITOR_FAMILIES);
for (const family of EDITOR_FAMILIES) {
  const decision = EDITOR_ENGINE_DECISIONS[family];
  assert.equal(decision.family, family);
  assert.ok(decision.adapterBoundary.length > 0);
  if (family === "DIFF") {
    for (const state of ["ready", "empty", "loading", "error", "readOnly"])
      assert.ok(
        decision.states.includes(state),
        `${family} is missing ${state}`,
      );
  } else {
    for (const state of requiredEditorStates)
      assert.ok(
        decision.states.includes(state),
        `${family} is missing ${state}`,
      );
  }
  assert.ok(decision.accessibility.length >= 3);
}
assert.equal(EDITOR_ENGINE_DECISIONS.CODE.platform, "WEB");
assert.equal(EDITOR_ENGINE_DECISIONS.DIFF.canonicalComponent, "DiffViewer");
assert.equal(EDITOR_ENGINE_DECISIONS.DIFF.platform, "WEB");
assert.match(EDITOR_ENGINE_DECISIONS.DIFF.distinction, /RevisionDiff/);
assert.equal(
  EDITOR_ENGINE_DECISIONS.RICH_TEXT.classification,
  "ENGINE_ADAPTER",
);

assert.equal(BUILDER_ARCHITECTURE.noMegaComponent, true);
assert.deepEqual(BUILDER_ARCHITECTURE.anatomy, [
  "palette",
  "outliner",
  "canvas",
  "inspector",
  "toolbar",
  "preview",
]);
for (const part of [
  "palette",
  "outliner",
  "canvas",
  "inspector",
  "resize",
  "preview",
])
  assert.ok(BUILDER_PART_DECISIONS[part].consumerOwns.length > 0);
assert.ok(BUILDER_ARCHITECTURE.consumerOwns.includes("domain node schema"));
assert.ok(
  BUILDER_ARCHITECTURE.ten4sevenOwns.includes("responsive recomposition"),
);
assert.ok(BUILDER_ARCHITECTURE.rendererOwns.includes("canvas implementation"));

assert.deepEqual(DND_INTENT_CONTRACT.callbacks, [
  "onReorderIntent",
  "onMoveIntent",
  "onDropIntent",
]);
assert.ok(
  DND_INTENT_CONTRACT.accessibility.some((entry) =>
    /never the only/i.test(entry),
  ),
);
assert.match(DND_INTENT_CONTRACT.fileDropBoundary, /distinct intent contract/i);
const dndIntent = createDndIntent({
  kind: "move",
  itemId: "item-2",
  position: "inside",
  sourceCollectionId: "source",
  targetCollectionId: "target",
  targetItemId: "group-1",
  sourceIndex: 1,
  targetIndex: 0,
});
assert.deepEqual(dndIntent, {
  kind: "move",
  itemId: "item-2",
  position: "inside",
  sourceCollectionId: "source",
  targetCollectionId: "target",
  targetItemId: "group-1",
  sourceIndex: 1,
  targetIndex: 0,
});
assert.deepEqual(
  createDndIntent({
    kind: "reorder",
    itemId: "item-1",
    position: "after",
    sourceCollectionId: "same",
    targetCollectionId: "same",
  }),
  {
    kind: "reorder",
    itemId: "item-1",
    position: "after",
    sourceCollectionId: "same",
    targetCollectionId: "same",
  },
);

assert.equal(COMMAND_SHORTCUT_CONTRACT.canonicalComponent, "CommandMenu");
assert.equal(COMMAND_SHORTCUT_CONTRACT.alias, "CommandPalette");
assert.deepEqual(COMMAND_SHORTCUT_CONTRACT.scopes, COMMAND_SHORTCUT_SCOPES);
assert.ok(COMMAND_SHORTCUT_SCOPES.includes("global"));
assert.ok(COMMAND_SHORTCUT_SCOPES.includes("selection"));
assert.ok(COMMAND_SHORTCUT_CONTRACT.consumerOwns.includes("execution"));
assert.ok(
  COMMAND_SHORTCUT_CONTRACT.ten4sevenOwns.includes(
    "focus and empty/disabled states",
  ),
);
assert.match(COMMAND_SHORTCUT_CONTRACT.dangerousAction, /AlertDialog/);

assert.deepEqual(AI_CONVERSATION_COMPONENTS, [
  "ConversationThread",
  "PromptComposer",
  "CitationList",
  "ToolCallCard",
  "ApprovalPanel",
]);
assert.equal(AI_CONVERSATION_CONTRACT.providerNeutral, true);
assert.deepEqual(AI_CONVERSATION_CONTRACT.roles, [
  "user",
  "assistant",
  "system",
  "tool",
]);
assert.ok(AI_CONVERSATION_CONTRACT.contentKinds.includes("artifact"));
assert.ok(
  AI_CONVERSATION_CONTRACT.composerContract.includes("send and stop intent"),
);
assert.ok(
  AI_CONVERSATION_CONTRACT.sourceContract.includes(
    "optional file/document/page/section/record location",
  ),
);
assert.ok(AI_CONVERSATION_CONTRACT.toolContract.includes("safe summary"));
assert.ok(AI_CONVERSATION_CONTRACT.approvalContract.includes("impact"));
assert.ok(
  AI_CONVERSATION_CONTRACT.security.some((entry) =>
    /tokens|credentials/i.test(entry),
  ),
);
assert.ok(
  AI_CONVERSATION_CONTRACT.security.some((entry) =>
    /chain-of-thought/i.test(entry),
  ),
);
assert.ok(
  AI_CONVERSATION_CONTRACT.accessibility.some((entry) =>
    /every streamed token/i.test(entry),
  ),
);
assert.equal(
  AI_CONVERSATION_TAXONOMY.message.canonicalComponent,
  "ConversationThread",
);
assert.equal(
  AI_CONVERSATION_TAXONOMY.message.classification,
  "COMPONENT_VARIANT",
);
assert.equal(
  AI_CONVERSATION_TAXONOMY.approval.canonicalComponent,
  "ApprovalPanel",
);
assert.ok(!EDITOR_BUILDER_AI_COMPONENTS.includes("UserMessage"));
assert.ok(!EDITOR_BUILDER_AI_COMPONENTS.includes("AssistantMessage"));

assert.deepEqual(
  Object.keys(ADVANCED_COMPONENT_DECISIONS),
  EDITOR_BUILDER_AI_COMPONENTS,
);
for (const component of EDITOR_BUILDER_AI_COMPONENTS) {
  const decision = ADVANCED_COMPONENT_DECISIONS[component];
  assert.equal(decision.id, component);
  assert.ok(decision.tokens.length > 0);
  assert.ok(decision.states.length > 0);
  assert.ok(decision.accessibility.length > 0);
  assert.ok(decision.engineBoundary.length > 0);
}

const legacyComponents = readJson("packages/ai/catalog/components.json");
for (const component of EDITOR_BUILDER_AI_COMPONENTS) {
  assert.equal(
    legacyComponents[component]?.status,
    "implemented",
    `${component} catalog entry is not implemented`,
  );
  assert.ok(legacyComponents[component]?.accessibility?.length > 0);
  assert.ok(legacyComponents[component]?.responsive?.length > 0);
  assert.ok(legacyComponents[component]?.tokens?.length > 0);
}
assert.match(
  read("packages/ui/src/advanced.tsx"),
  /export function DiffViewer/,
);
assert.equal(
  resolveComponentPlatformContract("DiffViewer", legacyComponents.DiffViewer)
    .platform,
  "WEB",
);
assert.equal(
  resolveComponentPlatformContract("DiffViewer", legacyComponents.DiffViewer)
    .native.status,
  "not-applicable",
);
assert.ok(
  ADVANCED_COMPONENT_DECISIONS.DiffViewer.alternatives.includes("RevisionDiff"),
);
assert.match(read("packages/ui/src/index.ts"), /EDITOR_BUILDER_AI_CONTRACT/);
assert.match(
  read("packages/native/src/index.ts"),
  /resolveNativeAdvancedInteraction/,
);

assert.deepEqual(Object.keys(WEB_ADVANCED_CANARY).sort(), [
  "ai",
  "builder",
  "dnd",
  "editor",
  "powerUser",
]);
assert.ok(WEB_ADVANCED_CANARY.editor.components.includes("DiffViewer"));
assert.ok(WEB_ADVANCED_CANARY.dnd.proof.includes("alternative"));
assert.ok(WEB_ADVANCED_CANARY.ai.proof.includes("bounded status"));
assert.deepEqual(Object.keys(NATIVE_ADVANCED_CANARY).sort(), [
  "citationSource",
  "composer",
  "conversation",
  "editorInspector",
  "reorder",
  "toolApproval",
]);
for (const id of Object.keys(NATIVE_ADVANCED_CANARY)) {
  const descriptor = resolveNativeAdvancedInteraction(id);
  assert.equal(descriptor.cssParsing, false);
  assert.ok(descriptor.primitive.length > 0);
  assert.ok(descriptor.safeArea.length > 0);
  assert.ok(descriptor.touchSafeActions.length > 0);
}

assert.deepEqual(U11_RECONCILIATION_STATUSES, [
  "NO IMPACT",
  "NEEDS METADATA SYNC",
  "NEEDS BLOCK/RECIPE SYNC",
  "NEEDS CONTRACT MIGRATION",
]);
assert.deepEqual(U11_PROVISIONAL_RECONCILIATION, {
  "AI blocks": "NEEDS BLOCK/RECIPE SYNC",
  "Editor workspace": "NEEDS METADATA SYNC",
  "Builder workspace": "NEEDS BLOCK/RECIPE SYNC",
  "Productivity recipes": "NEEDS METADATA SYNC",
  "platform strategies": "NEEDS METADATA SYNC",
});
assert.deepEqual(U12_RECONCILIATION_STATUSES, [
  "NO IMPACT",
  "NATIVE METADATA ONLY",
  "NATIVE LAB CANARY REQUIRED",
  "NATIVE RENDERER GAP",
  "NOT_APPLICABLE",
]);
assert.deepEqual(U12_PROVISIONAL_RECONCILIATION, {
  "AI Conversation": "NATIVE LAB CANARY REQUIRED",
  Composer: "NATIVE LAB CANARY REQUIRED",
  Citation: "NATIVE LAB CANARY REQUIRED",
  "Tool Call": "NATIVE LAB CANARY REQUIRED",
  Approval: "NATIVE LAB CANARY REQUIRED",
  DnD: "NATIVE METADATA ONLY",
  Editor: "NATIVE RENDERER GAP",
  "Builder/Inspector": "NATIVE RENDERER GAP",
  CommandPalette: "NATIVE METADATA ONLY",
});

for (const relativePath of [
  "packages/ui/package.json",
  "packages/native/package.json",
  "package.json",
]) {
  assert.doesNotMatch(
    read(relativePath),
    /(@tiptap|monaco-editor|dnd-kit|@dnd-kit|lexical|codemirror)/i,
    `${relativePath} must not add an advanced engine dependency in U10`,
  );
}
const nativeSource = read("packages/native/src/index.ts");
for (const forbidden of [
  "@ten4seven/ui",
  "@ten4seven/icons",
  "react",
  "react-dom",
  "className",
  "createPortal",
  "<div",
  "document",
  "window",
  ".css",
  "fetch(",
  "localStorage",
  "SecureStore",
  "AsyncStorage",
  "SQLite",
  "apiClient",
  "database",
  "authorization",
  "entitlement",
  "queue",
])
  assert.doesNotMatch(
    nativeSource,
    new RegExp(forbidden.replace(/[()[\].]/g, "\\$&"), "i"),
    `native U10 adapter must not own ${forbidden}`,
  );

assert.match(
  read("apps/playground/src/component-proofs.tsx"),
  /AdvancedInteractionProof/,
);
assert.match(
  read("apps/playground/src/advanced-interaction-proof.tsx"),
  /component-lab-u10-advanced-interactions/,
);
assert.match(
  read("apps/playground/src/advanced-interaction-proof.tsx"),
  /Move before/,
);
assert.match(
  read("apps/playground/src/advanced-interaction-proof.tsx"),
  /Open command menu/,
);

console.log(
  `U10 editor/builder/DnD/AI/power-user contract verified: ${EDITOR_BUILDER_AI_COMPONENTS.length} components, ${EDITOR_FAMILIES.length} editor families, ${Object.keys(NATIVE_ADVANCED_CANARY).length} native canaries, no engine dependencies.`,
);
