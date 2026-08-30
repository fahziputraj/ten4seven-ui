/**
 * Ten4Seven Motion is the public motion contract for the UI package.
 *
 * The values intentionally point at semantic CSS variables instead of
 * shipping a runtime animation engine. This keeps the system small while
 * allowing every consumer to follow the active theme's duration axis,
 * easing, and reduced-motion policy.
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
