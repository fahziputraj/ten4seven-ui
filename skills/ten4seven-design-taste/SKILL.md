---
name: ten4seven-design-taste
description: Apply Ten4Seven visual judgment for hierarchy, proportion, rhythm, density, uniformity, and responsive recomposition after canonical implementation choices are known.
---

# Ten4Seven design taste and uniformity

This skill is the judgment layer for Ten4Seven surfaces. Use it after the
implementation and retrieval workflow has identified the route archetype,
theme/profile, recipe, canonical components, and semantic icons. It helps decide
whether the resulting composition feels intentional, readable, proportionate,
and consistent across Web and Native.

## Boundary with ten4seven-ui

- `skills/ten4seven-ui/SKILL.md` owns implementation workflow, catalog retrieval,
  canonical component selection, theme setup, and technical validation.
- This skill owns visual judgment: hierarchy, measure, spacing rhythm, density,
  grouping, responsive recomposition, platform taste, and ownership diagnosis.
- Neither skill authorizes a local Button, Card, Input, icon registry, token
  scale, theme runtime, or donor-library substitute.

Uniformity means shared Ten4Seven primitives, semantic tokens, state language,
focus behavior, and composition grammar. It does not mean every route has the
same layout. A public storefront, authentication flow, dense workbench, and
mobile field task may use different composition while still belonging to one
design language.

## Review sequence

1. Name the surface archetype, primary task, and most important first-frame
   message.
2. Check hierarchy before decoration: brand/context, page intent, primary
   action, supporting evidence, and next path should be visually ordered.
3. Check proportion: readable measure, pane balance, control width, card
   density, whitespace rhythm, and whether important objects are too flat,
   oversized, cramped, or visually lost.
4. Check composition ownership. A shared problem belongs in the canonical
   component, token, contract, or recipe; a one-surface arrangement belongs in
   composition-local CSS with a bounded documented exception.
5. Check states and motion. Critical content must be understandable at first
   meaningful paint; motion may add position, layering, or emphasis afterward.
6. Check responsive recomposition at desktop, tablet, and narrow mobile widths.
   Recompose when the task changes; do not squeeze an unusable desktop layout
   into a phone.
7. Check Web versus Native taste. Preserve semantic intent and hierarchy while
   allowing platform-appropriate sheets, lists, safe areas, touch targets, and
   typography.
8. Record the viewport, observed defect, ownership class, and verification
   result before changing code.

## Non-negotiable judgments

- Use theme first, canonical component second, composition override last.
- Prefer a quiet, achromatic reading canvas with deliberate bounded emphasis;
  avoid card soup, ornamental depth, fake 3D treatment, and decorative fills
  that compete with the task.
- Keep text contrast, line length, and control labels readable before evaluating
  polish. A visually impressive but unclear surface fails the review.
- Keep repeated items content-driven. Do not use container height to stretch
  short rows, tags, list options, or actions into oversized panels.
- Keep a single shared interaction language for focus, selected, disabled,
  loading, invalid, and reduced-motion states.
- Do not encode meaning only through color, and do not introduce local raw
  palette, spacing, typography, radius, elevation, or timing systems.
- Treat screenshots as evidence, not as the source of truth. Validate semantic
  structure, runtime behavior, responsive containment, and accessibility too.

## Final taste checklist

- The first visible frame explains what the product/surface is and what to do.
- Primary and secondary actions have an obvious priority.
- Headings, copy, controls, media, and data use a coherent measure.
- Spacing has a repeatable rhythm rather than isolated arbitrary gaps.
- Density matches the job: enough information, no accidental crowding or empty
  canvas.
- Shared components look related across routes without erasing route identity.
- Mobile and tablet are intentional compositions, not clipped desktop layouts.
- Reduced motion preserves information and removes unnecessary entry delay.
- Any exception is narrow, named, and owned by the correct layer.
