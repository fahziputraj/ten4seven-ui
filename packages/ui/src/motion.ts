import { animate as animeAnimate } from "animejs/animation";
import { createTimeline as animeCreateTimeline } from "animejs/timeline";
import { stagger as animeStagger } from "animejs/utils";
import type {
  AnimationParams as AnimeAnimationParams,
  DefaultsParams as AnimeDefaultsParams,
  TargetsParam as AnimeTargetsParam,
} from "animejs";

/**
 * Ten4Seven Motion is the public motion contract for the UI package.
 *
 * CSS remains the source of truth for interaction states. Anime.js is kept
 * behind the same contract for choreography that CSS cannot express cleanly:
 * chart drawing, SVG sequences, viewport reveals, and grouped progress motion.
 */
export const t7Motion = Object.freeze({
  transition: Object.freeze({
    interactive: "var(--t7-transition-fast)",
    state: "var(--t7-transition-standard)",
    entrance: "var(--t7-transition-large)",
  }),
  animation: Object.freeze({
    enterFast: "var(--t7-motion-enter-fast)",
    enter: "var(--t7-motion-enter)",
    enterSlow: "var(--t7-motion-enter-slow)",
    exit: "var(--t7-motion-exit)",
    loop: "var(--t7-motion-loop)",
    loopEased: "var(--t7-motion-loop-eased)",
  }),
  easing: Object.freeze({
    standard: "var(--t7-ease-standard)",
    enter: "var(--t7-ease-enter)",
    exit: "var(--t7-ease-exit)",
  }),
});

export type T7MotionAnimation = keyof typeof t7Motion.animation;
export type T7MotionTransition = keyof typeof t7Motion.transition;

export type T7MotionRole =
  | "interactive"
  | "state"
  | "enterFast"
  | "enter"
  | "enterSlow"
  | "exit"
  | "loop";

export type T7ChartMotionKind = "sparkline" | "line" | "bar" | "donut";

export interface T7MotionProfile {
  duration: number;
  ease: string;
  reduced: boolean;
}

export interface T7MotionHandle {
  cancel: () => void;
  revert: () => void;
}

const durationTokens: Record<T7MotionRole, string> = {
  interactive: "--t7-duration-instant",
  state: "--t7-duration-standard",
  enterFast: "--t7-duration-fast",
  enter: "--t7-duration-standard",
  enterSlow: "--t7-duration-slow",
  exit: "--t7-duration-fast",
  loop: "--t7-duration-loop",
};

const easingTokens: Record<T7MotionRole, string> = {
  interactive: "--t7-ease-standard",
  state: "--t7-ease-standard",
  enterFast: "--t7-ease-enter",
  enter: "--t7-ease-enter",
  enterSlow: "--t7-ease-enter",
  exit: "--t7-ease-exit",
  loop: "--t7-ease-standard",
};

const fallbackDurations: Record<T7MotionRole, number> = {
  interactive: 150,
  state: 525,
  enterFast: 300,
  enter: 525,
  enterSlow: 1500,
  exit: 300,
  loop: 1200,
};

const fallbackEasings: Record<T7MotionRole, string> = {
  interactive: "cubic-bezier(.2, 0, 0, 1)",
  state: "cubic-bezier(.2, 0, 0, 1)",
  enterFast: "cubic-bezier(.16, 1, .3, 1)",
  enter: "cubic-bezier(.16, 1, .3, 1)",
  enterSlow: "cubic-bezier(.16, 1, .3, 1)",
  exit: "cubic-bezier(.4, 0, 1, 1)",
  loop: "cubic-bezier(.2, 0, 0, 1)",
};

const noOpMotion: T7MotionHandle = Object.freeze({
  cancel: () => undefined,
  revert: () => undefined,
});

function parseDuration(value: string | undefined, fallback: number) {
  const normalized = value?.trim().toLowerCase() ?? "";
  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount)) return fallback;
  if (normalized.endsWith("s") && !normalized.endsWith("ms")) {
    return Math.max(0, amount * 1000);
  }
  return Math.max(0, amount);
}

export type T7MotionTarget = Element | string | NodeListOf<Element> | Element[];

export type T7AnimationValue =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[]
  | ((
      target: Element,
      index: number,
      targets: Element[],
    ) => string | number | boolean);

function firstElement(targets: T7MotionTarget): Element | null {
  if (typeof window === "undefined") return null;
  if (targets instanceof Element) return targets;
  if (typeof targets === "string") return document.querySelector(targets);
  if (typeof NodeList !== "undefined" && targets instanceof NodeList) {
    return targets[0] instanceof Element ? targets[0] : null;
  }
  if (Array.isArray(targets)) {
    return (
      (targets.find((target) => target instanceof Element) as
        Element | undefined) ?? null
    );
  }
  return null;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Resolve numeric duration/easing values from the active theme at runtime. */
export function resolveT7Motion(
  target: Element | null,
  role: T7MotionRole = "enter",
): T7MotionProfile {
  const reduced = prefersReducedMotion();
  if (typeof window === "undefined") {
    return {
      duration: fallbackDurations[role],
      ease: fallbackEasings[role],
      reduced: false,
    };
  }

  const styles = window.getComputedStyle(target ?? document.documentElement);
  const duration = parseDuration(
    styles.getPropertyValue(durationTokens[role]),
    fallbackDurations[role],
  );
  const ease =
    styles.getPropertyValue(easingTokens[role]).trim() || fallbackEasings[role];

  return {
    duration: reduced ? 0 : duration,
    ease: reduced ? "linear" : ease,
    reduced,
  };
}

/** CSS-oriented animation values accepted by the public motion adapter. */
export type T7AnimationParameters = Record<string, T7AnimationValue>;

export interface T7AnimateOptions {
  duration?: number;
  ease?: string;
  role?: T7MotionRole;
}

/** Run one token-backed Anime.js animation without exposing vendor details. */
export function t7Animate(
  targets: T7MotionTarget,
  parameters: T7AnimationParameters,
  options: T7AnimateOptions = {},
): T7MotionHandle {
  if (typeof window === "undefined" || !firstElement(targets)) {
    return noOpMotion;
  }

  const profile = resolveT7Motion(firstElement(targets), options.role);
  const animation = animeAnimate(
    targets as AnimeTargetsParam,
    {
      ...parameters,
      duration: options.duration ?? profile.duration,
      ease: options.ease ?? profile.ease,
    } as AnimeAnimationParams,
  );

  return {
    cancel: () => animation.cancel(),
    revert: () => animation.revert(),
  };
}

export type T7TimelinePosition = number | string;

export interface T7TimelineDefaults {
  [key: string]: unknown;
}

export interface T7TimelineOptions {
  defaults?: T7TimelineDefaults;
  role?: T7MotionRole;
}

export interface T7TimelineHandle extends T7MotionHandle {
  add: (
    targets: T7MotionTarget,
    parameters: T7AnimationParameters,
    position?: T7TimelinePosition,
  ) => T7TimelineHandle;
}

function createAnimeTimeline(
  target: Element | null,
  options: T7TimelineOptions = {},
) {
  const profile = resolveT7Motion(target, options.role);
  return animeCreateTimeline({
    defaults: {
      duration: profile.duration,
      ease: profile.ease,
      ...(options.defaults as AnimeDefaultsParams | undefined),
    },
  });
}

/** Create a token-backed timeline without exposing the bundled motion engine. */
export function t7CreateTimeline(
  target: Element | null,
  options: T7TimelineOptions = {},
): T7TimelineHandle {
  const timeline = createAnimeTimeline(target, options);
  const handle: T7TimelineHandle = {
    add: (targets, parameters, position) => {
      timeline.add(
        targets as AnimeTargetsParam,
        parameters as AnimeAnimationParams,
        position,
      );
      return handle;
    },
    cancel: () => timeline.cancel(),
    revert: () => timeline.revert(),
  };
  return handle;
}

/** Observe a surface once, then let its motion adapter own the entrance. */
export function observeT7InView(
  element: Element,
  onEnter: () => void,
  options: IntersectionObserverInit = {},
) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      onEnter();
      observer.disconnect();
    }
  }, options);
  observer.observe(element);
  return () => observer.disconnect();
}

function elements(root: Element, selector: string) {
  return Array.from(root.querySelectorAll(selector));
}

function addChartReveal(
  timeline: ReturnType<typeof createAnimeTimeline>,
  root: Element,
  kind: T7ChartMotionKind,
) {
  const profile = resolveT7Motion(root, "enterSlow");
  const duration = profile.duration;
  const stagger = animeStagger(Math.min(96, Math.max(28, duration * 0.06)));

  if (kind === "sparkline") {
    const area = elements(root, ".t7-sparkline-area");
    const line = elements(root, ".t7-sparkline-line");
    const point = elements(root, ".t7-sparkline-point");
    if (area.length)
      timeline.add(area, { opacity: [0, 1], duration: duration * 0.72 }, 0);
    if (line.length)
      timeline.add(
        line,
        { strokeDashoffset: [1, 0], duration },
        Math.min(90, duration * 0.08),
      );
    if (point.length)
      timeline.add(
        point,
        { opacity: [0, 0.9], scale: [0.45, 1], duration: duration * 0.45 },
        Math.min(180, duration * 0.2),
      );
    return;
  }

  if (kind === "donut") {
    const segments = elements(root, ".t7-donut-segment");
    if (segments.length)
      timeline.add(
        segments,
        {
          opacity: [0, 1],
          scale: [0.84, 1],
          delay: stagger,
          duration: duration * 0.68,
        },
        0,
      );
    return;
  }

  const area = elements(root, ".t7-chart-area");
  const line = elements(root, ".t7-chart-line");
  const points = elements(root, ".t7-chart-point");
  const bars = elements(root, ".t7-chart-bar");

  if (area.length)
    timeline.add(area, { opacity: [0, 1], duration: duration * 0.62 }, 0);

  if (kind === "bar") {
    if (bars.length)
      timeline.add(
        bars,
        {
          opacity: [0.1, 1],
          scaleY: [0.04, 1],
          delay: stagger,
          duration: duration * 0.68,
        },
        Math.min(70, duration * 0.06),
      );
    return;
  }

  if (line.length)
    timeline.add(
      line,
      { strokeDashoffset: [1, 0], duration },
      Math.min(80, duration * 0.08),
    );
  if (points.length)
    timeline.add(
      points,
      {
        opacity: [0, 0.9],
        scale: [0.45, 1],
        delay: stagger,
        duration: duration * 0.52,
      },
      Math.min(150, duration * 0.16),
    );
}

/** Animate a chart only after its host has entered the viewport. */
export function t7AnimateChart(
  root: Element,
  kind: T7ChartMotionKind,
): T7MotionHandle {
  if (resolveT7Motion(root, "enterSlow").reduced) return noOpMotion;
  const timeline = createAnimeTimeline(root, { role: "enterSlow" });
  addChartReveal(timeline, root, kind);
  return {
    cancel: () => timeline.cancel(),
    revert: () => timeline.revert(),
  };
}

/** Animate the milestone sequence once while preserving CSS state motion. */
export function t7AnimateMilestone(root: Element): T7MotionHandle {
  if (resolveT7Motion(root, "enter").reduced) return noOpMotion;
  const timeline = createAnimeTimeline(root, { role: "enter" });
  const profile = resolveT7Motion(root, "enter");
  const duration = profile.duration;
  const items = elements(root, ".t7-milestone-item");
  const nodes = elements(root, ".t7-milestone-node");
  const rings = elements(root, ".t7-milestone-ring-value");

  if (items.length)
    timeline.add(
      items,
      {
        opacity: [0, 1],
        translateY: [8, 0],
        delay: animeStagger(Math.min(72, Math.max(24, duration * 0.08))),
        duration: duration * 0.62,
      },
      0,
    );
  if (nodes.length)
    timeline.add(
      nodes,
      { scale: [0.94, 1], duration: duration * 0.42 },
      Math.min(80, duration * 0.12),
    );

  rings.forEach((ring, index) => {
    const finalOffset = Number.parseFloat(
      (ring as SVGCircleElement).style.strokeDashoffset,
    );
    timeline.add(
      ring,
      {
        strokeDashoffset: [100, Number.isFinite(finalOffset) ? finalOffset : 0],
        duration: duration * 0.72,
      },
      Math.min(100, duration * 0.15) + index * 30,
    );
  });

  return {
    cancel: () => timeline.cancel(),
    revert: () => timeline.revert(),
  };
}
