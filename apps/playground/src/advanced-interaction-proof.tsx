import { useState } from "react";

import {
  ApprovalPanel,
  Badge,
  BuilderCanvas,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CitationList,
  CommandMenu,
  ConversationThread,
  DiffViewer,
  DragHandle,
  EditorSurface,
  Input,
  Kbd,
  PropertyInspector,
  PromptComposer,
  SectionHeader,
  Select,
  StatusChip,
  Textarea,
  ToolCallCard,
  TreeView,
  Typography,
  createDndIntent,
} from "@ten4seven/ui";

const builderTree = [
  {
    children: [
      { id: "hero-title", label: "Title" },
      { id: "hero-summary", label: "Summary" },
    ],
    id: "hero",
    label: "Hero section",
  },
  {
    children: [{ id: "proof-card", label: "Proof card" }],
    id: "proof",
    label: "Proof section",
  },
];

const diffLines = [
  {
    after: "The release note is ready for review.",
    before: "The release note is ready.",
    id: "summary",
    kind: "modified" as const,
  },
  {
    after: "Review source context before publishing.",
    id: "source-guidance",
    kind: "added" as const,
  },
  {
    before: "Draft owner: Maya Chen",
    id: "owner",
    kind: "removed" as const,
  },
  {
    content: "---",
    id: "separator",
    kind: "context" as const,
  },
];

/**
 * U10 Web canary. Each family is intentionally a bounded composition of
 * canonical contracts; engines, mutations, transport, and business meaning
 * remain outside the UI package.
 */
export function AdvancedInteractionProof() {
  const [draft, setDraft] = useState(
    "The release note is ready for review.\n\nReview source context before publishing.",
  );
  const [selectedNode, setSelectedNode] = useState("hero");
  const [moveNotice, setMoveNotice] = useState(
    "No move requested; drag remains optional.",
  );
  const [prompt, setPrompt] = useState("Summarize the open review blockers.");
  const [promptState, setPromptState] = useState<
    "idle" | "draft" | "submitting" | "error"
  >("draft");
  const [aiNotice, setAiNotice] = useState(
    "Synthetic response surface; no provider or transport is connected.",
  );
  const [commandOpen, setCommandOpen] = useState(false);
  const [powerNotice, setPowerNotice] = useState(
    "No command selected; keyboard and labelled press paths are available.",
  );

  function requestMove(position: "before" | "after") {
    const intent = createDndIntent({
      kind: "reorder",
      itemId: selectedNode,
      position,
      sourceCollectionId: "builder-outliner",
      targetCollectionId: "builder-outliner",
      targetItemId: position === "before" ? "hero" : "proof",
    });
    setMoveNotice(
      `${intent.kind} intent for ${intent.itemId}: ${intent.position} target; persistence remains consumer-owned.`,
    );
  }

  return (
    <section
      aria-label="U10 advanced interaction proof"
      className="component-proof-u10"
      data-testid="component-lab-u10-advanced-interactions"
      id="component-lab-u10-advanced-interactions"
    >
      <SectionHeader
        description="Editor, builder, DnD, AI, and power-user contracts share intent and states while leaving engines and authority with the consumer."
        eyebrow="U10 · Advanced interaction"
        title="Editors, builders, DnD &amp; AI"
      />

      <div className="component-proof-u10-grid">
        <Card data-testid="u10-editor-canary">
          <CardHeader>
            <div>
              <CardTitle>Editor family</CardTitle>
              <CardDescription>
                Plain, Markdown, code, JSON, and rich-text engines stay behind
                the same semantic surface.
              </CardDescription>
            </div>
            <StatusChip icon="edit" tone="success">
              Adapter seam
            </StatusChip>
          </CardHeader>
          <CardContent className="component-proof-u10-editor-content">
            <EditorSurface
              content={
                <Textarea
                  aria-label="Synthetic Markdown draft"
                  onChange={(event) => setDraft(event.target.value)}
                  rows={6}
                  value={draft}
                />
              }
              data-state="dirty"
              footer={
                <Button intent="secondary" size="sm">
                  Save draft
                </Button>
              }
              language="markdown"
              state="dirty"
              status="Dirty · consumer persistence boundary"
              title="Release note"
              toolbar={
                <StatusChip icon="keyboard" tone="neutral">
                  Cmd S
                </StatusChip>
              }
            />
            <DiffViewer
              aria-label="Synthetic release note comparison"
              data-testid="u10-diff-viewer"
              lines={diffLines}
              mode="split"
              title="Before / after"
            />
          </CardContent>
        </Card>

        <Card data-testid="u10-builder-canary">
          <CardHeader>
            <div>
              <CardTitle>Builder anatomy</CardTitle>
              <CardDescription>
                Palette, outliner, canvas, inspector, and preview remain
                separate contracts.
              </CardDescription>
            </div>
            <StatusChip icon="components" tone="info">
              No engine
            </StatusChip>
          </CardHeader>
          <CardContent className="component-proof-u10-builder-content">
            <div className="component-proof-u10-builder-palette">
              <Typography as="h3" typeRole="label">
                Palette
              </Typography>
              <InputList />
            </div>
            <div className="component-proof-u10-builder-workspace">
              <div className="component-proof-u10-outliner">
                <TreeView
                  items={builderTree}
                  label="Builder outliner"
                  onSelectedIdChange={(id) => setSelectedNode(id ?? "hero")}
                  selectedId={selectedNode}
                />
              </div>
              <BuilderCanvas
                data-testid="u10-builder-stage"
                inspector={
                  <PropertyInspector
                    sections={[
                      {
                        content: (
                          <Select label="Content width" defaultValue="wide">
                            <option value="compact">Compact</option>
                            <option value="wide">Wide</option>
                          </Select>
                        ),
                        id: "layout",
                        title: "Layout",
                      },
                      {
                        content: (
                          <Button intent="secondary" size="sm">
                            Reset selection
                          </Button>
                        ),
                        defaultOpen: false,
                        id: "actions",
                        title: "Actions",
                      },
                    ]}
                    summary={`Selected: ${selectedNode}`}
                  />
                }
                status="Selected node and persistence stay consumer-owned"
                title="Release builder"
                toolbar={
                  <Button intent="secondary" size="sm">
                    Preview
                  </Button>
                }
              >
                <div className="component-proof-u10-stage-card">
                  <Badge>Selected node</Badge>
                  <Typography as="h3" typeRole="heading-sm">
                    {selectedNode === "hero" ? "Hero section" : "Proof section"}
                  </Typography>
                  <Typography typeRole="body-sm">
                    The stage is a bounded renderer slot, not a document model.
                  </Typography>
                </div>
              </BuilderCanvas>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="u10-dnd-canary">
          <CardHeader>
            <div>
              <CardTitle>Reorder intent</CardTitle>
              <CardDescription>
                Drag affordance is paired with explicit keyboard and touch-safe
                movement actions.
              </CardDescription>
            </div>
            <StatusChip icon="keyboard" tone="warning">
              Alternative path
            </StatusChip>
          </CardHeader>
          <CardContent className="component-proof-u10-dnd-content">
            <div className="component-proof-u10-dnd-row">
              <DragHandle label="Drag selected builder node" />
              <div>
                <strong>{selectedNode}</strong>
                <Typography typeRole="caption">
                  Drag is optional; the consumer decides legality and rollback.
                </Typography>
              </div>
            </div>
            <div className="component-proof-u10-dnd-actions">
              <Button
                intent="secondary"
                onClick={() => requestMove("before")}
                size="sm"
              >
                Move before
              </Button>
              <Button
                intent="secondary"
                onClick={() => requestMove("after")}
                size="sm"
              >
                Move after
              </Button>
              <Button
                intent="quiet"
                onClick={() => setMoveNotice("Move canceled by the consumer.")}
                size="sm"
              >
                Cancel
              </Button>
            </div>
            <output aria-live="polite" data-testid="u10-dnd-status">
              {moveNotice}
            </output>
          </CardContent>
        </Card>

        <Card data-testid="u10-ai-canary">
          <CardHeader>
            <div>
              <CardTitle>Conversation &amp; tools</CardTitle>
              <CardDescription>
                Messages, citations, tool status, approval, and generation are
                safe presentation contracts.
              </CardDescription>
            </div>
            <StatusChip icon="lock" tone="neutral">
              Provider-neutral
            </StatusChip>
          </CardHeader>
          <CardContent className="component-proof-u10-ai-content">
            <ConversationThread
              aria-label="Synthetic AI conversation"
              messages={[
                {
                  author: "Reviewer",
                  content:
                    "Please check the release note against the source context.",
                  id: "u10-user-message",
                  role: "user",
                  status: "complete",
                },
                {
                  author: "Assistant surface",
                  content:
                    "One review blocker remains; the source and tool status are shown below.",
                  id: "u10-assistant-message",
                  role: "assistant",
                  status: "streaming",
                },
              ]}
            />
            <div className="component-proof-u10-ai-detail">
              <CitationList
                citations={[
                  {
                    excerpt:
                      "The comparison surface renders rows supplied by the consumer.",
                    id: "u10-source-contract",
                    label: "Advanced surface contract",
                    source: "Synthetic local source",
                  },
                  {
                    excerpt:
                      "Provider, credentials, retrieval, and trust remain outside the UI.",
                    id: "u10-source-boundary",
                    label: "Authority boundary",
                    source: "U10 contract",
                  },
                ]}
              />
              <ToolCallCard
                name="Lookup release context"
                output={<code>Safe summary: 1 blocker found</code>}
                status="waitingApproval"
                summary="No raw parameters or credentials"
              />
            </div>
            <ApprovalPanel
              actions={
                <>
                  <Button
                    onClick={() =>
                      setAiNotice("Approval intent recorded locally.")
                    }
                    size="sm"
                  >
                    Approve review
                  </Button>
                  <Button
                    intent="secondary"
                    onClick={() => setAiNotice("Review remains pending.")}
                    size="sm"
                  >
                    Keep pending
                  </Button>
                </>
              }
              description="A consumer-defined checkpoint is presented without policy or execution authority."
              metadata="Synthetic impact: publish the reviewed note"
              title="Approval requested"
              tone="warning"
            />
            <PromptComposer
              label="Synthetic prompt"
              onStop={() => {
                setPromptState("idle");
                setAiNotice(
                  "Generation stopped locally; no provider is connected.",
                );
              }}
              onSubmit={(value) => {
                setPromptState("submitting");
                setAiNotice(`Prompt submitted locally: ${value}`);
              }}
              onValueChange={setPrompt}
              state={promptState}
              status={aiNotice}
              stopLabel="Stop locally"
              submitLabel="Send locally"
              value={prompt}
            />
            <output aria-live="polite" data-testid="u10-ai-status">
              {aiNotice}
            </output>
          </CardContent>
        </Card>

        <Card data-testid="u10-power-user-canary">
          <CardHeader>
            <div>
              <CardTitle>Power-user surface</CardTitle>
              <CardDescription>
                Commands declare scope and shortcut metadata; consumers execute
                them.
              </CardDescription>
            </div>
            <StatusChip icon="command" tone="neutral">
              Cmd/Ctrl K
            </StatusChip>
          </CardHeader>
          <CardContent className="component-proof-u10-power-content">
            <div className="component-proof-u10-power-trigger">
              <Button onClick={() => setCommandOpen(true)}>
                Open command menu
              </Button>
              <Kbd>Ctrl K</Kbd>
            </div>
            <Typography typeRole="caption">
              Search, arrow navigation, empty state, and focus return are
              provided by the canonical CommandMenu.
            </Typography>
            <output aria-live="polite" data-testid="u10-command-status">
              {powerNotice}
            </output>
            <CommandMenu
              commands={[
                {
                  description: "Open the release editor",
                  group: "Workspace",
                  id: "open-editor",
                  label: "Open editor",
                  onSelect: () => setPowerNotice("Open editor selected."),
                  shortcut: "E",
                },
                {
                  description: "Review the selected node properties",
                  group: "Workspace",
                  id: "open-inspector",
                  label: "Open inspector",
                  onSelect: () => setPowerNotice("Open inspector selected."),
                  shortcut: "I",
                },
                {
                  description: "Move the selected node to another group",
                  group: "Selection",
                  id: "move-node",
                  label: "Move selected node",
                  onSelect: () => setPowerNotice("Move intent selected."),
                  shortcut: "M",
                },
              ]}
              onOpenChange={setCommandOpen}
              open={commandOpen}
              shortcut={false}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function InputList() {
  return (
    <div className="component-proof-u10-palette-list">
      <Input
        aria-label="Filter component palette"
        placeholder="Filter palette"
      />
      <Button intent="secondary" size="sm">
        Add heading
      </Button>
      <Button intent="secondary" size="sm">
        Add summary
      </Button>
      <Button intent="secondary" size="sm">
        Add proof card
      </Button>
    </div>
  );
}
