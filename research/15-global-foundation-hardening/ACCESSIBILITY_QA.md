# Accessibility and resilience QA

Date: 5 September 2026

## Automated coverage

`tests/global-foundation.spec.ts` passed all 9 tests with one worker. The suite
checks the foundation page across these representative axes:

- light and dark appearance;
- emerald, blue, orange, red, violet and slate palettes;
- comfortable and dense density;
- standard and more contrast;
- full and reduced motion;
- sharp, soft and rounded radius;
- desktop, tablet and narrow/mobile widths.

For every scenario the suite verifies:

- no horizontal document overflow;
- token-family navigation/document order;
- bounded motion durations and reduced-motion zeroing;
- resolved JS popup motion agrees with CSS motion;
- semantic surface, focus, chart and disabled text contrast;
- disabled controls remain readable at full opacity;
- keyboard focus is visible on the action and field;
- chart marks expose focusable labels, series/value context and tooltips;
- axe WCAG 2A/2AA/2.1AA scan returns no violations.

Additional gates verify forced-colors mode keeps a visible platform focus outline
of at least 2px, and the token debugger reacts to OS reduced motion, resizing and
runtime CSS overrides.

## Semantic and non-color communication

- Solid semantic surfaces use centralized paired foreground tokens.
- Status examples include labels and icons; hue is not the only carrier of
  meaning.
- Categorical chart series remain separate from positive/negative status roles.
- Chart tooltips and accessible mark labels carry series, period and value.
- Focus uses a dedicated moderated role and a neutral halo rather than relying
  on arbitrary accent saturation.

## Visual evidence

Relevant token family captures are in `evidence/after/`, including color,
surfaces, typography, interaction, motion, elevation, viewport, scroll,
iconography and data visualization. Propagation captures for the reference
routes are listed in `PROPAGATION_QA.md`.
