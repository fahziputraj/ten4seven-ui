import {
  useState,
  type FormEvent,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { T7Icon, type IconName } from "@ten4seven/icons";

import { Badge, Button } from "./components";
import { Textarea } from "./forms";
import { Link } from "./core";
import { cx } from "./utils";

export type EditorLanguage = "plain" | "markdown" | "code" | "json";
export type EditorSurfaceState =
  | "idle"
  | "focused"
  | "dirty"
  | "saving"
  | "saved"
  | "saveFailed"
  | "readOnly"
  | "loading"
  | "error";

/**
 * A token-led editing frame. Parsing, history, collaboration, and the actual
 * editor engine stay in the consumer or an optional adapter.
 */
export interface EditorSurfaceProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  content: ReactNode;
  footer?: ReactNode;
  language?: EditorLanguage;
  readOnly?: boolean;
  status?: ReactNode;
  state?: EditorSurfaceState;
  title?: ReactNode;
  toolbar?: ReactNode;
}

export function EditorSurface({
  className,
  content,
  footer,
  language = "plain",
  readOnly = false,
  status,
  state = "idle",
  title = "Editor surface",
  toolbar,
  ...props
}: EditorSurfaceProps) {
  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? "Editor surface"}
      className={cx("t7-editor-surface", className)}
      data-language={language}
      data-readonly={readOnly || undefined}
      data-state={state}
    >
      <header className="t7-editor-surface-header">
        <div className="t7-editor-surface-heading">
          <span aria-hidden="true" className="t7-editor-surface-icon">
            <T7Icon name="edit" size={17} />
          </span>
          <div>
            <strong>{title}</strong>
            <small>{language} editing surface</small>
          </div>
        </div>
        <div className="t7-editor-surface-tools">
          <Badge>{language}</Badge>
          {toolbar}
        </div>
      </header>
      <div className="t7-editor-surface-content">{content}</div>
      {footer || status ? (
        <footer className="t7-editor-surface-footer">
          <span>{status}</span>
          {footer ? <div>{footer}</div> : null}
        </footer>
      ) : null}
    </section>
  );
}

export type DiffViewerMode = "inline" | "split";
export type DiffViewerLineKind = "context" | "added" | "removed" | "modified";

export interface DiffViewerLine {
  after?: ReactNode;
  before?: ReactNode;
  content?: ReactNode;
  id: string;
  kind: DiffViewerLineKind;
}

export interface DiffViewerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  emptyMessage?: ReactNode;
  lines: readonly DiffViewerLine[];
  mode?: DiffViewerMode;
  title?: ReactNode;
}

/**
 * A presentation-only comparison surface. Consumers provide the rows and own
 * diff computation, version meaning, audit policy, and persistence.
 */
export function DiffViewer({
  className,
  emptyMessage = "No comparison rows.",
  lines,
  mode = "split",
  title = "Version comparison",
  ...props
}: DiffViewerProps) {
  const label = props["aria-label"] ?? "Version comparison";
  return (
    <section
      {...props}
      aria-label={label}
      className={cx("t7-diff-viewer", className)}
      data-mode={mode}
    >
      <header className="t7-diff-viewer-header">
        <strong>{title}</strong>
        <Badge>{lines.length} rows</Badge>
      </header>
      {lines.length ? (
        <div className="t7-diff-viewer-scroll" tabIndex={0}>
          <table>
            <caption className="t7-visually-hidden">{label}</caption>
            <thead>
              <tr>
                <th scope="col">Change</th>
                {mode === "split" ? <th scope="col">Before</th> : null}
                <th scope="col">{mode === "split" ? "After" : "Content"}</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr data-kind={line.kind} key={line.id}>
                  <th scope="row">
                    <span className="t7-diff-viewer-kind">
                      {diffViewerKindLabel(line.kind)}
                    </span>
                  </th>
                  {mode === "split" ? (
                    <td>
                      {line.before ?? (
                        <span aria-label="No previous value">—</span>
                      )}
                    </td>
                  ) : null}
                  <td>
                    {mode === "inline"
                      ? (line.content ?? line.after ?? line.before ?? "—")
                      : (line.after ?? (
                          <span aria-label="No new value">—</span>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="t7-diff-viewer-empty">{emptyMessage}</p>
      )}
    </section>
  );
}

function diffViewerKindLabel(kind: DiffViewerLineKind): string {
  if (kind === "added") return "Added";
  if (kind === "removed") return "Removed";
  if (kind === "modified") return "Modified";
  return "Context";
}

export interface PropertyInspectorSection {
  content: ReactNode;
  defaultOpen?: boolean;
  description?: ReactNode;
  id: string;
  title: ReactNode;
}

/**
 * A disclosure-based property rail. It presents consumer-owned properties;
 * it does not serialize, validate, or mutate a builder document.
 */
export interface PropertyInspectorProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  sections: PropertyInspectorSection[];
  summary?: ReactNode;
  title?: ReactNode;
}

export function PropertyInspector({
  className,
  sections,
  summary,
  title = "Properties",
  ...props
}: PropertyInspectorProps) {
  return (
    <aside
      {...props}
      aria-label={props["aria-label"] ?? "Property inspector"}
      className={cx("t7-property-inspector", className)}
    >
      <header className="t7-property-inspector-header">
        <div>
          <strong>{title}</strong>
          {summary ? <small>{summary}</small> : null}
        </div>
        <T7Icon aria-hidden="true" name="settings" size={17} />
      </header>
      <div className="t7-property-inspector-sections">
        {sections.map((section) => (
          <details
            className="t7-property-inspector-section"
            key={section.id}
            open={section.defaultOpen ?? true}
          >
            <summary>
              <span>
                <strong>{section.title}</strong>
                {section.description ? (
                  <small>{section.description}</small>
                ) : null}
              </span>
              <T7Icon aria-hidden="true" name="chevronDown" size={15} />
            </summary>
            <div className="t7-property-inspector-section-content">
              {section.content}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
}

/**
 * A bounded builder composition with a stage and optional inspector rail.
 * Selection, document structure, persistence, and drag/drop policy remain
 * consumer-owned.
 */
export interface BuilderCanvasProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  children?: ReactNode;
  emptyState?: ReactNode;
  inspector?: ReactNode;
  status?: ReactNode;
  title?: ReactNode;
  toolbar?: ReactNode;
}

export function BuilderCanvas({
  children,
  className,
  emptyState,
  inspector,
  status,
  title = "Builder canvas",
  toolbar,
  ...props
}: BuilderCanvasProps) {
  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? "Builder canvas"}
      className={cx("t7-builder-canvas", className)}
    >
      <header className="t7-builder-canvas-header">
        <div>
          <strong>{title}</strong>
          {status ? <small>{status}</small> : null}
        </div>
        {toolbar ? <div>{toolbar}</div> : null}
      </header>
      <div className="t7-builder-canvas-body">
        <div className={cx("t7-builder-canvas-stage", !children && "is-empty")}>
          {children ?? emptyState}
        </div>
        {inspector ? (
          <div className="t7-builder-canvas-inspector">{inspector}</div>
        ) : null}
      </div>
    </section>
  );
}

export interface PromptComposerProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onChange" | "onSubmit"
> {
  attachments?: ReactNode;
  defaultValue?: string;
  label?: string;
  onSubmit?: (value: string, event: FormEvent<HTMLFormElement>) => void;
  onStop?: () => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  status?: ReactNode;
  state?: "idle" | "draft" | "focused" | "submitting" | "disabled" | "error";
  stopLabel?: string;
  submitLabel?: string;
  toolbar?: ReactNode;
  value?: string;
}

/**
 * A submission boundary for prompts. It never chooses a model, stores a
 * conversation, authorizes tools, or performs a network request.
 */
export function PromptComposer({
  attachments,
  className,
  defaultValue = "",
  disabled = false,
  label = "Prompt",
  onSubmit,
  onStop,
  onValueChange,
  placeholder = "Ask a question or describe the next action…",
  rows = 3,
  status,
  state = "idle",
  stopLabel = "Stop generation",
  submitLabel = "Send prompt",
  toolbar,
  value,
  ...props
}: PromptComposerProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = value ?? uncontrolledValue;
  const submitting = state === "submitting";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(currentValue, event);
  }

  return (
    <form
      {...props}
      aria-label={props["aria-label"] ?? "Prompt composer"}
      aria-busy={submitting || undefined}
      className={cx("t7-prompt-composer", className)}
      data-state={state}
      onSubmit={handleSubmit}
    >
      <Textarea
        disabled={disabled}
        label={label}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (value === undefined) setUncontrolledValue(nextValue);
          onValueChange?.(nextValue);
        }}
        placeholder={placeholder}
        rows={rows}
        value={currentValue}
      />
      <div className="t7-prompt-composer-footer">
        <div className="t7-prompt-composer-tools">
          {attachments}
          {toolbar}
        </div>
        <Button
          disabled={disabled || submitting || !currentValue.trim()}
          type="submit"
        >
          {submitLabel}
        </Button>
        {submitting && onStop ? (
          <Button intent="secondary" onClick={onStop} type="button">
            {stopLabel}
          </Button>
        ) : null}
      </div>
      {status ? (
        <div className="t7-prompt-composer-status">{status}</div>
      ) : null}
    </form>
  );
}

export type ConversationMessageRole = "user" | "assistant" | "system" | "tool";
export type ConversationMessageStatus =
  | "complete"
  | "streaming"
  | "pending"
  | "error"
  | "paused"
  | "canceled"
  | "waitingApproval";

export interface ConversationMessage {
  actions?: ReactNode;
  author?: ReactNode;
  content: ReactNode;
  icon?: IconName;
  id: string;
  role: ConversationMessageRole;
  status?: ConversationMessageStatus;
  timestamp?: ReactNode;
}

export interface ConversationThreadProps extends HTMLAttributes<HTMLElement> {
  emptyMessage?: ReactNode;
  messages: ConversationMessage[];
}

/** A semantic, presentation-only message timeline for consumer-owned chats. */
export function ConversationThread({
  className,
  emptyMessage = "No messages yet.",
  messages,
  ...props
}: ConversationThreadProps) {
  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? "Conversation"}
      className={cx("t7-conversation-thread", className)}
    >
      {messages.length ? (
        <ol>
          {messages.map((message) => (
            <li data-role={message.role} key={message.id}>
              <article className="t7-conversation-message">
                <header>
                  <span className="t7-conversation-message-icon">
                    <T7Icon
                      aria-hidden="true"
                      name={
                        message.icon ??
                        (message.role === "user" ? "user" : "analytics")
                      }
                      size={16}
                    />
                  </span>
                  <span>
                    <strong>{message.author ?? message.role}</strong>
                    {message.timestamp ? (
                      <small>{message.timestamp}</small>
                    ) : null}
                  </span>
                  {message.status ? (
                    <Badge tone={conversationStatusTone(message.status)}>
                      {message.status}
                    </Badge>
                  ) : null}
                </header>
                <div className="t7-conversation-message-content">
                  {message.content}
                </div>
                {message.actions ? (
                  <footer className="t7-conversation-message-actions">
                    {message.actions}
                  </footer>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="t7-conversation-empty">{emptyMessage}</p>
      )}
    </section>
  );
}

function conversationStatusTone(
  status: ConversationMessageStatus,
): "neutral" | "primary" | "success" | "warning" | "danger" {
  if (status === "complete") return "success";
  if (status === "streaming") return "primary";
  if (
    status === "pending" ||
    status === "paused" ||
    status === "waitingApproval"
  )
    return "warning";
  if (status === "canceled") return "neutral";
  return "danger";
}

export interface CitationItem {
  excerpt?: ReactNode;
  href?: string;
  id: string;
  label: ReactNode;
  source?: ReactNode;
}

export interface CitationListProps extends HTMLAttributes<HTMLElement> {
  citations: CitationItem[];
  emptyMessage?: ReactNode;
  title?: ReactNode;
}

/** A readable source list; the consumer owns retrieval, ranking, and trust. */
export function CitationList({
  citations,
  className,
  emptyMessage = "No sources attached.",
  title = "Sources",
  ...props
}: CitationListProps) {
  return (
    <section
      {...props}
      aria-label={props["aria-label"] ?? "Sources"}
      className={cx("t7-citation-list", className)}
    >
      <header>
        <strong>{title}</strong>
        <Badge>{citations.length}</Badge>
      </header>
      {citations.length ? (
        <ol>
          {citations.map((citation, index) => (
            <li key={citation.id}>
              <span aria-hidden="true" className="t7-citation-index">
                {index + 1}
              </span>
              <div>
                {citation.href ? (
                  <Link href={citation.href}>{citation.label}</Link>
                ) : (
                  <strong>{citation.label}</strong>
                )}
                {citation.source ? <small>{citation.source}</small> : null}
                {citation.excerpt ? <p>{citation.excerpt}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="t7-citation-empty">{emptyMessage}</p>
      )}
    </section>
  );
}

export type ToolCallStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "waitingApproval"
  | "canceled";

export interface ToolCallCardProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode;
  input?: ReactNode;
  name: ReactNode;
  output?: ReactNode;
  status?: ToolCallStatus;
  summary?: ReactNode;
}

/** Presents a tool invocation without owning authorization or execution. */
export function ToolCallCard({
  actions,
  className,
  input,
  name,
  output,
  status = "pending",
  summary,
  ...props
}: ToolCallCardProps) {
  return (
    <article
      {...props}
      aria-label={props["aria-label"] ?? `Tool call: ${String(name)}`}
      className={cx("t7-tool-call-card", className)}
      data-status={status}
    >
      <header>
        <span aria-hidden="true" className="t7-tool-call-icon">
          <T7Icon name="settings" size={17} />
        </span>
        <div>
          <strong>{name}</strong>
          {summary ? <small>{summary}</small> : null}
        </div>
        <Badge tone={toolCallStatusTone(status)}>{status}</Badge>
      </header>
      {input || output ? (
        <div className="t7-tool-call-body">
          {input ? (
            <div>
              <span>Input</span>
              <div>{input}</div>
            </div>
          ) : null}
          {output ? (
            <div>
              <span>Output</span>
              <div>{output}</div>
            </div>
          ) : null}
        </div>
      ) : null}
      {actions ? <footer>{actions}</footer> : null}
    </article>
  );
}

function toolCallStatusTone(
  status: ToolCallStatus,
): "neutral" | "primary" | "success" | "warning" | "danger" {
  if (status === "running") return "primary";
  if (status === "completed") return "success";
  if (status === "failed") return "danger";
  if (status === "canceled") return "neutral";
  return "warning";
}
