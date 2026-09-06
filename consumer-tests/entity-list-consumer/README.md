# Isolated Entity List consumer proof

This fixture represents a consumer that does not import workspace internals.
The verification script builds the `@ten4seven/ui` and `@ten4seven/agent`
release tarballs, installs those artifacts into this isolated fixture, runs a
strict TypeScript check, and executes the runtime proof. Domain rows, columns,
permissions, and handlers remain consumer-owned.

The fixture intentionally has no copied CSS, local primitive, donor import,
reference-screen dependency, or `workspace:` dependency. The `file:` entries
point at generated release artifacts only so the proof remains reproducible
before a registry release exists.
