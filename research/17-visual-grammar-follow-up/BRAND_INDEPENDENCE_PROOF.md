# Brand Independence Proof — Public Showcase

## Claim under test

Ten4Seven must remain recognizable when its familiar emerald hue is replaced by
other authored recipes. This proof checks composition signatures rather than a
single color token.

## Signatures retained

The Public Showcase uses a restrained set of existing, defensible signatures:

1. An asymmetric thin primary edge on the neutral hero surface.
2. The four-tile modular mark repeated in the public brand and product preview.
3. A strong but measured display heading paired with a bounded description and
   action row.
4. An inset product/system preview with a clear internal navigation rail and
   chart proof.

No new logo system, gradient language, glow, oversized shadow, or decorative
brand abstraction was introduced for this check.

## Recipe contexts

The executable proof in
`tests/public-showcase-expression.spec.ts` selects each recipe in Theme Studio,
navigates through the actual Studio `Public Showcase` control, and then checks
the consumer route. The expected provider expression map is:

| Recipe     | Provider theme | Provider expression | Identity signal                                                                 |
| ---------- | -------------- | ------------------- | ------------------------------------------------------------------------------- |
| Enterprise | `enterprise`   | `operational`       | slate/indigo operational surface with the same edge, mark, and preview geometry |
| Product    | `product`      | `product`           | balanced application surface with the same asymmetric hero composition          |
| Editorial  | `editorial`    | `editorial`         | reading-led type/rhythm with the same inset proof and modular mark              |
| Commerce   | `commerce`     | `commerce`          | approachable browsing geometry with the same edge and section rhythm            |

The test requires for every recipe:

- hero background differs from the primary action background;
- hero radius is `0px` and shadow is `none`;
- the one-pixel hero divider and primary edge resolve to the action color;
- horizontal overflow is at most one pixel;
- content width and composition gap vary in the expected authored order.

These checks demonstrate that the route consumes recipe output while its
identity is carried by structure, typography, edge alignment, and the modular
preview rather than by an emerald-filled hero.

## Consumer-copy boundary

The public route no longer exposes the internal phrases `Local reference
fixture` or `Illustrative local coverage trend chart`. The coverage chart keeps
truthful wording about readable signals, while the Reference QA harness remains
available only through the explicit `?mode=qa` path on the harness-controlled
reference workflow.

## Evidence

The focused recipe test owns these controlled desktop baselines:

- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-enterprise-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-product-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-editorial-expression-chromium-win32.png`
- `tests/public-showcase-expression.spec.ts-snapshots/public-showcase-commerce-expression-chromium-win32.png`

The expressive route suite additionally covers `1440 × 900`, `1280 × 800`,
`1024 × 900`, `768 × 900`, `391 × 844`, and `360 × 800` equivalent captures.
The current full serial Chromium suite revalidated all of these artifacts.

## Conclusion

Brand independence is accepted for this pass: the Public Showcase remains a
Ten4Seven composition under materially different recipe contexts, with the
identity carried by repeatable geometry and content relationships rather than
by a single brand hue.
