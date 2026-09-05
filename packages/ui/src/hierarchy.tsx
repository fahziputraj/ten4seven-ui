import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { T7Icon } from "@ten4seven/icons";

import { Input } from "./components";
import { cx } from "./utils";

export type HierarchySelectionState = "none" | "mixed" | "all";

/**
 * A consumer-owned hierarchy node. IDs are opaque and must be unique within
 * the tree; the component never interprets their resource or permission
 * meaning.
 */
export interface HierarchyItem {
  children?: HierarchyItem[];
  description?: ReactNode;
  disabled?: boolean;
  id: string;
  label: string;
}

export interface HierarchyPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange" | "title"
> {
  /** Optional helper copy linked to the tree for assistive technology. */
  description?: ReactNode;
  /** Disable every selection and expansion action while retaining context. */
  disabled?: boolean;
  /** Initial expanded branch IDs for uncontrolled usage. */
  defaultExpandedIds?: string[];
  /** Initial selected IDs for uncontrolled usage. */
  defaultSelectedIds?: string[];
  /** Copy shown when the tree has no nodes or a search has no matches. */
  emptyMessage?: string;
  /** Label for the hierarchy field and tree. */
  label?: string;
  /** Callback after expansion changes; expansion is consumer-controlled when provided. */
  onExpandedIdsChange?: (ids: string[]) => void;
  /** Callback after selection changes; IDs remain opaque to the component. */
  onSelectionChange?: (ids: string[]) => void;
  /** Controlled expanded branch IDs. */
  expandedIds?: string[];
  /** Enable the local label filter for large trees. */
  searchable?: boolean;
  /** Placeholder and accessible name for the local search input. */
  searchPlaceholder?: string;
  /** Controlled selected IDs. */
  selectedIds?: string[];
  /** Hierarchy nodes to render. */
  items: HierarchyItem[];
}

interface TreeNodeMeta {
  item: HierarchyItem;
  order: number;
  parentId?: string;
}

interface TreeIndex {
  all: TreeNodeMeta[];
  byId: Map<string, TreeNodeMeta>;
  selectableById: Map<string, string[]>;
}

interface VisibleTreeNode extends TreeNodeMeta {
  hasChildren: boolean;
  isExpanded: boolean;
  level: number;
  position: number;
  setSize: number;
}

function createTreeIndex(items: HierarchyItem[]): TreeIndex {
  const all: TreeNodeMeta[] = [];
  const byId = new Map<string, TreeNodeMeta>();

  function visit(nodes: HierarchyItem[], parentId?: string) {
    for (const item of nodes) {
      if (byId.has(item.id)) continue;
      const meta = { item, order: all.length, parentId };
      byId.set(item.id, meta);
      all.push(meta);
      if (item.children?.length) visit(item.children, item.id);
    }
  }

  visit(items);

  const selectableById = new Map<string, string[]>();
  function collectSelectable(item: HierarchyItem): string[] {
    const ids = item.disabled ? [] : [item.id];
    for (const child of item.children ?? [])
      ids.push(...collectSelectable(child));
    return ids;
  }
  for (const meta of all)
    selectableById.set(meta.item.id, collectSelectable(meta.item));

  return { all, byId, selectableById };
}

function expandSelection(ids: Iterable<string>, index: TreeIndex): Set<string> {
  const next = new Set<string>();
  for (const id of ids) {
    const meta = index.byId.get(id);
    if (!meta) {
      next.add(id);
      continue;
    }
    if (meta.item.disabled) {
      next.add(id);
      continue;
    }
    for (const descendantId of index.selectableById.get(id) ?? [id])
      next.add(descendantId);
  }
  return next;
}

function normalizeSelection(
  selected: Iterable<string>,
  index: TreeIndex,
): Set<string> {
  const next = new Set(selected);
  for (const meta of [...index.all].reverse()) {
    if (meta.item.disabled) continue;
    const selectable = index.selectableById.get(meta.item.id) ?? [];
    const descendants = selectable.filter((id) => id !== meta.item.id);
    if (!descendants.length) {
      if (!next.has(meta.item.id)) next.delete(meta.item.id);
      continue;
    }
    if (descendants.every((id) => next.has(id))) next.add(meta.item.id);
    else next.delete(meta.item.id);
  }
  return next;
}

function orderSelection(ids: Iterable<string>, index: TreeIndex): string[] {
  const selected = new Set(ids);
  const ordered = index.all
    .filter((meta) => selected.has(meta.item.id))
    .sort((left, right) => left.order - right.order)
    .map((meta) => meta.item.id);
  for (const id of selected) if (!index.byId.has(id)) ordered.push(id);
  return ordered;
}

function selectionState(
  node: TreeNodeMeta,
  selected: Set<string>,
  index: TreeIndex,
): HierarchySelectionState {
  const selectable = index.selectableById.get(node.item.id) ?? [];
  if (!selectable.length) return selected.has(node.item.id) ? "all" : "none";
  const descendants = selectable.filter((id) => id !== node.item.id);
  if (!descendants.length) return selected.has(node.item.id) ? "all" : "none";
  const selectedCount = descendants.filter((id) => selected.has(id)).length;
  if (!selectedCount) return "none";
  if (selected.has(node.item.id) || selectedCount === descendants.length)
    return "all";
  return "mixed";
}

function matchesSearch(item: HierarchyItem, query: string): boolean {
  if (item.label.toLocaleLowerCase().includes(query)) return true;
  return (item.children ?? []).some((child) => matchesSearch(child, query));
}

function flattenVisible(
  items: HierarchyItem[],
  index: TreeIndex,
  query: string,
  expanded: Set<string>,
): VisibleTreeNode[] {
  const visible: VisibleTreeNode[] = [];

  function visit(
    nodes: HierarchyItem[],
    parentId: string | undefined,
    level: number,
  ) {
    const candidates = query
      ? nodes.filter((item) => matchesSearch(item, query))
      : nodes;
    candidates.forEach((item, position) => {
      const meta = index.byId.get(item.id);
      if (!meta) return;
      const children = query
        ? (item.children ?? []).filter((child) => matchesSearch(child, query))
        : (item.children ?? []);
      const hasChildren = Boolean(item.children?.length);
      const isExpanded =
        hasChildren && (query ? children.length > 0 : expanded.has(item.id));
      visible.push({
        ...meta,
        hasChildren,
        isExpanded,
        level,
        position: position + 1,
        setSize: candidates.length,
      });
      if (isExpanded) visit(children, item.id, level + 1);
    });
  }

  visit(items, undefined, 1);
  return visible;
}

function defaultExpandedFor(items: HierarchyItem[]) {
  return items.filter((item) => item.children?.length).map((item) => item.id);
}

export function HierarchyPicker({
  className,
  defaultExpandedIds,
  defaultSelectedIds = [],
  description,
  disabled = false,
  emptyMessage = "No hierarchy items match this search.",
  expandedIds,
  items,
  label = "Resource scope",
  onExpandedIdsChange,
  onSelectionChange,
  searchable = false,
  searchPlaceholder = "Search resources",
  selectedIds,
  ...props
}: HierarchyPickerProps) {
  const index = useMemo(() => createTreeIndex(items), [items]);
  const initialExpandedIds = useMemo(
    () => defaultExpandedIds ?? defaultExpandedFor(items),
    [defaultExpandedIds, items],
  );
  const [internalExpandedIds, setInternalExpandedIds] =
    useState<string[]>(initialExpandedIds);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(() =>
    orderSelection(
      normalizeSelection(expandSelection(defaultSelectedIds, index), index),
      index,
    ),
  );
  const [query, setQuery] = useState("");
  const [focusedId, setFocusedId] = useState<string | undefined>();
  const shouldFocusNext = useRef(false);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const treeId = useId();
  const labelId = `${treeId}-label`;
  const descriptionId = `${treeId}-description`;
  const rawExpandedIds = expandedIds ?? internalExpandedIds;
  const expanded = useMemo(() => new Set(rawExpandedIds), [rawExpandedIds]);
  const rawSelectedIds = selectedIds ?? internalSelectedIds;
  const selected = useMemo(
    () => expandSelection(rawSelectedIds, index),
    [index, rawSelectedIds],
  );
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleNodes = useMemo(
    () => flattenVisible(items, index, normalizedQuery, expanded),
    [expanded, index, items, normalizedQuery],
  );
  const visibleIds = useMemo(
    () => visibleNodes.map((node) => node.item.id),
    [visibleNodes],
  );
  const activeId =
    focusedId && visibleIds.includes(focusedId)
      ? focusedId
      : visibleNodes[0]?.item.id;

  useEffect(() => {
    if (activeId && focusedId !== activeId) setFocusedId(activeId);
  }, [activeId, focusedId]);

  useEffect(() => {
    if (!shouldFocusNext.current || !focusedId) return;
    shouldFocusNext.current = false;
    nodeRefs.current.get(focusedId)?.focus();
  }, [focusedId]);

  function commitSelection(next: Set<string>) {
    const canonical = orderSelection(normalizeSelection(next, index), index);
    if (selectedIds === undefined) setInternalSelectedIds(canonical);
    onSelectionChange?.(canonical);
  }

  function toggleSelection(id: string) {
    if (disabled) return;
    const meta = index.byId.get(id);
    if (!meta || meta.item.disabled) return;
    const ids = index.selectableById.get(id) ?? [];
    const next = new Set(selected);
    if (selectionState(meta, selected, index) === "all") {
      for (const descendantId of ids) next.delete(descendantId);
    } else {
      for (const descendantId of ids) next.add(descendantId);
    }
    commitSelection(next);
  }

  function commitExpanded(next: Set<string>) {
    const canonical = [...next];
    if (expandedIds === undefined) setInternalExpandedIds(canonical);
    onExpandedIdsChange?.(canonical);
  }

  function toggleExpanded(id: string) {
    if (disabled) return;
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    commitExpanded(next);
  }

  function focusNode(id: string | undefined) {
    if (!id) return;
    shouldFocusNext.current = true;
    setFocusedId(id);
  }

  function handleNodeKeyDown(
    event: KeyboardEvent<HTMLDivElement>,
    node: VisibleTreeNode,
  ) {
    const currentIndex = visibleIds.indexOf(node.item.id);
    if (currentIndex < 0) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + offset + visibleIds.length) % visibleIds.length;
      focusNode(visibleIds[nextIndex]);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      focusNode(visibleIds[event.key === "Home" ? 0 : visibleIds.length - 1]);
      return;
    }
    if (event.key === "ArrowRight") {
      if (node.hasChildren && !node.isExpanded) {
        event.preventDefault();
        toggleExpanded(node.item.id);
      } else {
        const next = visibleNodes[currentIndex + 1];
        if (next?.parentId === node.item.id) {
          event.preventDefault();
          focusNode(next.item.id);
        }
      }
      return;
    }
    if (event.key === "ArrowLeft") {
      if (node.hasChildren && node.isExpanded) {
        event.preventDefault();
        toggleExpanded(node.item.id);
      } else if (node.parentId) {
        event.preventDefault();
        focusNode(node.parentId);
      }
      return;
    }
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggleSelection(node.item.id);
    }
  }

  const selectedCount = index.all.filter((meta) =>
    selected.has(meta.item.id),
  ).length;

  return (
    <div
      {...props}
      className={cx("t7-hierarchy-picker", className)}
      data-disabled={disabled || undefined}
    >
      <span className="t7-field-label" id={labelId}>
        {label}
      </span>
      {description ? (
        <span className="t7-field-hint" id={descriptionId}>
          {description}
        </span>
      ) : null}
      {searchable ? (
        <Input
          aria-label={searchPlaceholder}
          className="t7-hierarchy-picker-search"
          leadingIcon="search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          type="search"
          value={query}
        />
      ) : null}
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={labelId}
        aria-multiselectable="true"
        className="t7-hierarchy-picker-tree"
        data-search-active={Boolean(normalizedQuery) || undefined}
        role="tree"
      >
        {visibleNodes.length ? (
          visibleNodes.map((node) => {
            const state = selectionState(node, selected, index);
            const nodeDescriptionId = `${treeId}-node-${node.order}-description`;
            const nodeStyle = {
              "--t7-hierarchy-level": node.level,
            } as CSSProperties;
            return (
              <div
                aria-describedby={
                  node.item.description ? nodeDescriptionId : undefined
                }
                aria-disabled={disabled || node.item.disabled || undefined}
                aria-expanded={node.hasChildren ? node.isExpanded : undefined}
                aria-level={node.level}
                aria-posinset={node.position}
                aria-selected={state === "all"}
                aria-setsize={node.setSize}
                className="t7-hierarchy-picker-node"
                data-disabled={node.item.disabled || undefined}
                data-selection-state={state}
                key={node.item.id}
                onClick={(event) => {
                  if (
                    (event.target as Element).closest(
                      "[data-hierarchy-expander]",
                    )
                  )
                    return;
                  toggleSelection(node.item.id);
                }}
                onFocus={() => setFocusedId(node.item.id)}
                onKeyDown={(event) => handleNodeKeyDown(event, node)}
                ref={(element) => {
                  if (element) nodeRefs.current.set(node.item.id, element);
                  else nodeRefs.current.delete(node.item.id);
                }}
                role="treeitem"
                style={nodeStyle}
                tabIndex={activeId === node.item.id ? 0 : -1}
              >
                {node.hasChildren ? (
                  <span
                    aria-hidden="true"
                    className="t7-hierarchy-picker-expander"
                    data-expanded={node.isExpanded || undefined}
                    data-hierarchy-expander="true"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleExpanded(node.item.id);
                    }}
                  >
                    <T7Icon aria-hidden="true" name="chevronRight" size={15} />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="t7-hierarchy-picker-expander-spacer"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="t7-hierarchy-picker-check"
                  data-state={state}
                >
                  {state === "all" ? <T7Icon name="check" size={13} /> : null}
                  {state === "mixed" ? (
                    <span className="t7-hierarchy-picker-check-mixed" />
                  ) : null}
                </span>
                <span className="t7-hierarchy-picker-copy">
                  <span className="t7-hierarchy-picker-label">
                    {node.item.label}
                  </span>
                  {node.item.description ? (
                    <span
                      className="t7-hierarchy-picker-description"
                      id={nodeDescriptionId}
                    >
                      {node.item.description}
                    </span>
                  ) : null}
                  <span className="t7-visually-hidden">
                    {state === "mixed"
                      ? "Partially selected"
                      : state === "all"
                        ? "Selected"
                        : "Not selected"}
                  </span>
                </span>
              </div>
            );
          })
        ) : (
          <span className="t7-hierarchy-picker-empty" role="status">
            {emptyMessage}
          </span>
        )}
      </div>
      <output aria-live="polite" className="t7-hierarchy-picker-summary">
        {selectedCount} selected
      </output>
    </div>
  );
}
