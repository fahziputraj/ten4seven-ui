import React from "react";
import { Icon } from "../core/Icon.jsx";

export const milestoneStateMap = Object.freeze({
  complete: { label: "Selesai", icon: "check", tone: "approved" },
  current: { label: "Berjalan", icon: "play", tone: "progress" },
  upcoming: { label: "Berikutnya", icon: "pending", tone: "neutral" },
  blocked: { label: "Terblokir", icon: "blocked", tone: "blocked" },
  skipped: { label: "Dilewati", icon: "minus", tone: "neutral" },
});

function normalizeState(state) {
  if (state === "completed") return "complete";
  if (state === "active" || state === "in-progress") return "current";
  if (state === "pending" || state === "next") return "upcoming";
  return milestoneStateMap[state] ? state : "upcoming";
}

function resolveState(item, index, currentIndex) {
  if (item.state) return normalizeState(item.state);
  if (item.completed) return "complete";
  if (Number.isInteger(currentIndex)) {
    return index < currentIndex ? "complete" : index === currentIndex ? "current" : "upcoming";
  }
  return "upcoming";
}

export function MilestoneTimeline({
  milestones = [],
  current,
  currentId,
  orientation = "vertical",
  dense = false,
  onSelect,
  ariaLabel = "Tahapan proses",
  emptyLabel = "Belum ada milestone.",
  style,
  ...rest
}) {
  const currentIndex = Number.isInteger(current)
    ? current
    : currentId == null
      ? undefined
      : milestones.findIndex((item) => item.id === currentId);
  const direction = orientation === "horizontal" ? "horizontal" : "vertical";

  if (milestones.length === 0) {
    return <p className="aapm-milestone-empty" role="status" style={style} {...rest}>{emptyLabel}</p>;
  }

  return (
    <ol
      className="aapm-milestone-timeline"
      data-orientation={direction}
      data-density={dense ? "compact" : "default"}
      aria-label={ariaLabel}
      style={{ "--aapm-milestone-count": milestones.length, ...style }}
      {...rest}
    >
      {milestones.map((milestone, index) => {
        const state = resolveState(milestone, index, currentIndex);
        const stateMeta = milestoneStateMap[state];
        const interactive = typeof onSelect === "function" && !milestone.disabled;
        const body = (
          <>
            <span className="aapm-milestone-timeline__heading">
              <span className="aapm-milestone-timeline__label">{milestone.label}</span>
              <span className="aapm-milestone-timeline__state" data-state={state}>{milestone.stateLabel || stateMeta.label}</span>
            </span>
            {milestone.description && <span className="aapm-milestone-timeline__description">{milestone.description}</span>}
            {(milestone.meta || milestone.due || milestone.owner) && (
              <span className="aapm-milestone-timeline__meta">
                {milestone.meta && <span>{milestone.meta}</span>}
                {milestone.due && <span><Icon name="clock" size={12} aria-hidden="true" /> {milestone.due}</span>}
                {milestone.owner && <span><Icon name="user" size={12} aria-hidden="true" /> {milestone.owner}</span>}
              </span>
            )}
            {milestone.action && <span className="aapm-milestone-timeline__action">{milestone.action}</span>}
          </>
        );

        return (
          <li
            className="aapm-milestone-timeline__item"
            data-state={state}
            data-interactive={interactive ? "true" : "false"}
            key={milestone.id ?? index}
            aria-current={state === "current" ? "step" : undefined}
          >
            <span className="aapm-milestone-timeline__rail" aria-hidden="true">
              <span className="aapm-milestone-timeline__marker">
                <Icon name={milestone.icon || stateMeta.icon} size={15} />
              </span>
              {index < milestones.length - 1 && (
                <span className="aapm-milestone-timeline__connector" data-complete={state === "complete" ? "true" : "false"} />
              )}
            </span>
            {interactive ? (
              <button
                className="aapm-milestone-timeline__content aapm-milestone-timeline__content--button"
                type="button"
                disabled={milestone.disabled}
                onClick={() => onSelect(milestone, index)}
                aria-label={milestone.ariaLabel || String(milestone.label || "Pilih milestone")}
              >
                {body}
              </button>
            ) : (
              <div className="aapm-milestone-timeline__content">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
