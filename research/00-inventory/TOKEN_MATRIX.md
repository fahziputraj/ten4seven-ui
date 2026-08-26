# Token matrix

AAPM manifest evidence: **476 tokens**, 3 theme selectors, and 2 font declarations.

## Tokens by source file

| File                  | Count |
| --------------------- | ----: |
| tokens/semantic.css   |   164 |
| tokens/dark.css       |   159 |
| tokens/typography.css |    43 |
| tokens/palette.css    |    40 |
| tokens/spacing.css    |    40 |
| tokens/elevation.css  |    21 |
| tokens/motion.css     |     9 |

## Sample entries

| Name                  | Value            | Kind  | Defined in         |
| --------------------- | ---------------- | ----- | ------------------ |
| --aapm-green-950-hsl  | 144 48% 10%      | other | tokens/palette.css |
| --aapm-green-950      | hsl(144 48% 10%) | color | tokens/palette.css |
| --aapm-green-900-hsl  | 141 47% 17%      | other | tokens/palette.css |
| --aapm-green-900      | hsl(141 47% 17%) | color | tokens/palette.css |
| --aapm-green-800-hsl  | 138 48% 25%      | other | tokens/palette.css |
| --aapm-green-800      | hsl(138 48% 25%) | color | tokens/palette.css |
| --aapm-green-700-hsl  | 135 45% 34%      | other | tokens/palette.css |
| --aapm-green-700      | hsl(135 45% 34%) | color | tokens/palette.css |
| --aapm-green-100-hsl  | 141 43% 92%      | other | tokens/palette.css |
| --aapm-green-100      | hsl(141 43% 92%) | color | tokens/palette.css |
| --aapm-lime-500-hsl   | 77 100% 47%      | other | tokens/palette.css |
| --aapm-lime-500       | hsl(77 100% 47%) | color | tokens/palette.css |
| --aapm-lime-100-hsl   | 77 100% 91%      | other | tokens/palette.css |
| --aapm-lime-100       | hsl(77 100% 91%) | color | tokens/palette.css |
| --aapm-orange-700-hsl | 17 76% 48%       | other | tokens/palette.css |
| --aapm-orange-700     | hsl(17 76% 48%)  | color | tokens/palette.css |
| --aapm-orange-100-hsl | 25 100% 93%      | other | tokens/palette.css |
| --aapm-orange-100     | hsl(25 100% 93%) | color | tokens/palette.css |
| --aapm-ink-hsl        | 145 38% 13%      | other | tokens/palette.css |
| --aapm-ink            | hsl(145 38% 13%) | color | tokens/palette.css |
| --aapm-paper-hsl      | 0 0% 100%        | other | tokens/palette.css |
| --aapm-paper          | hsl(0 0% 100%)   | color | tokens/palette.css |
| --neutral-0-hsl       | 0 0% 100%        | other | tokens/palette.css |
| --neutral-0           | hsl(0 0% 100%)   | color | tokens/palette.css |
| --neutral-50-hsl      | 0 0% 98%         | other | tokens/palette.css |
| --neutral-50          | hsl(0 0% 98%)    | color | tokens/palette.css |
| --neutral-100-hsl     | 0 0% 96%         | other | tokens/palette.css |
| --neutral-100         | hsl(0 0% 96%)    | color | tokens/palette.css |
| --neutral-150-hsl     | 0 0% 94%         | other | tokens/palette.css |
| --neutral-150         | hsl(0 0% 94%)    | color | tokens/palette.css |

## Extraction direction

The generic layer keeps the separation between foundation values, semantic roles, component variables, declared density, radius families, typography roles, elevation, motion, and appearance. AAPM brand values become the optional reference preset; generic component source consumes semantic variables only.
