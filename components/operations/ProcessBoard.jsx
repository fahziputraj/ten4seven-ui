import React from "react";
import { Avatar } from "../data/Avatar.jsx";
import { StatusChip } from "../data/StatusChip.jsx";
import { Icon } from "../core/Icon.jsx";
import { IconTile } from "../core/IconTile.jsx";

const validTones = new Set(["neutral", "green", "lime", "orange", "blue", "violet", "slate"]);
const priorityLabels = { high: "Prioritas tinggi", medium: "Prioritas sedang", low: "Prioritas rendah" };

function getColumnId(column, index) {
  return String(column.id ?? column.key ?? index);
}

function getItemColumnId(item, columnKey) {
  return String(item[columnKey] ?? item.columnId ?? item.column ?? item.stage ?? "");
}

function itemId(item, index) {
  return item.id ?? item.key ?? index;
}

export function ProcessBoard({
  columns = [],
  items = [],
  columnKey = "columnId",
  density = "comfortable",
  mobile = "stack",
  allowMove = false,
  onMove,
  onItemClick,
  renderItem,
  emptyLabel = "Belum ada pekerjaan di tahap ini.",
  ariaLabel = "Alur proses",
  style,
  ...rest
}) {
  const [dragged, setDragged] = React.useState(null);
  const instanceId = React.useId().replace(/:/g, "");
  const canMove = allowMove && typeof onMove === "function";
  const boardColumns = columns.map((column, index) => ({ ...column, _id: getColumnId(column, index) }));

  if (boardColumns.length === 0) {
    return <div className="aapm-process-board-empty" role="status" style={style} {...rest}>{emptyLabel}</div>;
  }

  const handleDrop = (targetColumn) => {
    if (!dragged) return;
    const sourceColumn = getItemColumnId(dragged.item, columnKey);
    if (sourceColumn !== targetColumn) onMove(dragged.item, sourceColumn, targetColumn);
    setDragged(null);
  };

  return (
    <section
      className="aapm-process-board"
      data-density={density === "compact" ? "compact" : "comfortable"}
      data-mobile={mobile === "scroll" ? "scroll" : "stack"}
      aria-label={ariaLabel}
      style={{ "--aapm-process-columns": boardColumns.length, ...style }}
      {...rest}
    >
      <div className="aapm-process-board__scroll">
        <div className="aapm-process-board__grid">
          {boardColumns.map((column) => {
            const columnItems = items.filter((item) => getItemColumnId(item, columnKey) === column._id);
            const tone = validTones.has(column.tone) ? column.tone : "neutral";
            const titleId = "aapm-process-" + instanceId + "-column-" + column._id.replace(/[^a-z0-9_-]/gi, "-");
            return (
              <section
                className="aapm-process-board__column"
                data-tone={tone}
                key={column._id}
                aria-labelledby={titleId}
                onDragOver={canMove ? (event) => event.preventDefault() : undefined}
                onDrop={canMove ? () => handleDrop(column._id) : undefined}
              >
                <header className="aapm-process-board__column-header">
                    <div className="aapm-process-board__column-title">
                      <IconTile icon={column.icon || "route"} tone={tone} size="sm" />
                      <div>
                        <h2 id={titleId}>{column.title || column.label || column._id}</h2>
                        {column.description && <p>{column.description}</p>}
                      </div>
                    </div>
                  <span className="aapm-process-board__count">{column.count ?? columnItems.length}</span>
                </header>
                <ul className="aapm-process-board__list" aria-label={(column.title || column.label || "Tahap") + " — pekerjaan"}>
                  {columnItems.length === 0 && <li className="aapm-process-board__empty" role="status">{emptyLabel}</li>}
                  {columnItems.map((item, index) => {
                    const id = itemId(item, index);
                    const priority = item.priority && priorityLabels[item.priority] ? item.priority : undefined;
                    const itemContent = renderItem
                      ? renderItem(item, { column, index })
                      : (
                        <>
                          <span className="aapm-process-card__top">
                            <Icon name={item.icon || column.icon || "route"} size={15} />
                            {priority && <span className="aapm-process-card__priority" data-priority={priority}>{priorityLabels[priority]}</span>}
                          </span>
                          <span className="aapm-process-card__title">{item.title || item.label || "Pekerjaan tanpa judul"}</span>
                          {item.description && <span className="aapm-process-card__description">{item.description}</span>}
                          {(item.status || item.meta || item.assignee) && (
                            <span className="aapm-process-card__footer">
                              {item.status && <StatusChip status={item.status} size="sm" icon={false} />}
                              {item.meta && <span className="aapm-process-card__meta">{item.meta}</span>}
                              {item.assignee && <Avatar name={item.assignee} size="xs" tone="slate" />}
                            </span>
                          )}
                        </>
                      );
                    const contentProps = {
                      className: "aapm-process-card" + (canMove ? " aapm-process-card--movable" : ""),
                      "data-priority": priority,
                      draggable: canMove,
                      onDragStart: canMove ? () => setDragged({ item, column: column._id }) : undefined,
                      onDragEnd: canMove ? () => setDragged(null) : undefined,
                      onClick: onItemClick ? () => onItemClick(item, column) : undefined,
                      tabIndex: onItemClick ? 0 : undefined,
                      role: onItemClick ? "button" : undefined,
                      onKeyDown: onItemClick ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onItemClick(item, column);
                        }
                      } : undefined,
                      "aria-label": item.ariaLabel || item.title || item.label || undefined,
                    };
                    return <li key={id}><article {...contentProps}>{itemContent}</article></li>;
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
      {canMove && <p className="aapm-process-board__hint"><Icon name="grip" size={13} /> Pindahkan pekerjaan dengan drag and drop.</p>}
    </section>
  );
}
