import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const cliPath = path.join(repoRoot, "packages/ai/bin/t7ui.mjs");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));

const components = readJson("generated/components.compact.json");
const agentIndex = readJson("generated/agent-index.json");
const generatedIndex = readJson("generated/index.json");
const nativeExpo = readJson("generated/native-expo.json");

assert.equal(Object.keys(components).length, 179);
for (const component of Object.values(components)) {
  const shard = readJson(`generated/components/${component.id}.json`);
  assert.equal(shard.publicApi.package, "@ten4seven/ui");
  assert.equal(shard.publicApi.export, component.id);
  assert.ok(Array.isArray(shard.useWhen));
  assert.ok(Array.isArray(shard.avoidWhen));
}
assert.equal(agentIndex.sourceOfTruth.typedContracts, "packages/contracts/src");
assert.ok(agentIndex.entryPoints["component-corpus"]);
assert.equal(
  agentIndex.entryPoints["final-acceptance"].verifier,
  "pnpm test:final-ai-acceptance",
);
assert.ok(generatedIndex.componentCorpus);
assert.equal(
  generatedIndex.finalAcceptance.verifier,
  "pnpm test:final-ai-acceptance",
);
assert.ok(nativeExpo.deviceCapabilities.qrScanner);

function find(query, cwd = repoRoot) {
  return execFileSync(process.execPath, [cliPath, "find", query], {
    cwd,
    encoding: "utf8",
  });
}

function expects(query, required, forbidden = [], cwd = repoRoot) {
  const output = find(query, cwd);
  for (const value of required) assert.match(output, new RegExp(value));
  for (const value of forbidden) assert.doesNotMatch(output, new RegExp(value));
  return output;
}

expects("single primary action", ["Button", "Import: @ten4seven/ui"]);
expects("searchable selection", ["Combobox", "Platform: ADAPTIVE"]);
expects("choose one option on Android", ["Select", "Native import"]);
expects("hierarchical selection", ["Cascader", "Native alternative"]);
expects("show tabular financial records", ["DataTable"]);
expects("100k interactive records", ["AdvancedDataGrid"], ["^- DataTable"]);
expects(
  "records on phone",
  ["List", "Native alternative"],
  ["Export: DataTable"],
);
expects("approve or reject with evidence", [
  "Approval / Review",
  "ApprovalPanel",
]);
expects("write source code", ["Editor intent: CODE", "EditorSurface"]);
expects("reorder items", ["DND intent", "Platform: ADAPTIVE"]);
expects("chat interface", ["ConversationThread", "PromptComposer"]);
expects("AI source evidence", ["CitationList"]);
expects("capture QR code on native", [
  "Native capability: qrScanner",
  "DEV_CLIENT_REQUIRED",
]);
expects("temporary action feedback", ["Toast"]);
expects("persistent event history", ["NotificationCenter"], ["Export: Toast"]);
expects("context help on Android", ["Popover"], ["Export: Tooltip"]);
expects("desktop resize workspace", ["SplitPane", "Platform: WEB"]);
expects(
  "photo input on iOS",
  ["Native capability: photoLibrary", "EXPO_GO"],
  ["Dropzone"],
);
expects("move item on mobile", ["Intent: reorder/move", "Native alternative"]);
expects("show product price", ["Price"]);
expects(
  "edit rich formatted content",
  ["Editor intent: RICH_TEXT", "Canonical component: EditorSurface"],
  ["RichTextEditor"],
);

const coldStartRoot = path.join(
  repoRoot,
  "consumer-tests/entity-list-consumer",
);
expects(
  "records on phone",
  ["List", "Contract: generated/components.compact.json"],
  [],
  coldStartRoot,
);

console.log(
  "Final AI acceptance verified: typed projections, positive retrieval, negative guidance, platform-aware retrieval, and isolated cold-start retrieval.",
);
