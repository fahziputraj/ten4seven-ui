# Isolated Tailwind bridge consumer proof

This fixture models a consumer that imports only published
`@ten4seven/ui` stylesheet entry points. It exercises the Tailwind v4 bridge
with a fixed set of semantic utility candidates, including the paired
`bg-t7-primary` and `text-t7-primary-foreground` action treatment.

`pnpm test:tailwind-bridge` builds the UI package, places this fixture in a
temporary external consumer directory, and compiles it with the pinned
Tailwind compiler. The verifier asserts that imports resolve to the packaged
`dist/theme.css` and `dist/tailwind.css` files and that the resulting CSS keeps
the expected semantic variable aliases.
