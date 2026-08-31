# Isolated Entity List consumer proof

This fixture represents a consumer that does not import workspace internals.
It asks `@ten4seven/agent` for the canonical `entity-list` scaffold and uses
the public package boundaries for UI contracts. Domain rows, columns,
permissions, and handlers remain consumer-owned.

The fixture intentionally has no copied CSS, local primitive, donor import, or
reference-screen dependency. A real consumer can install the package tarballs
normally; the `file:` entries only make this repository proof reproducible
before a registry release exists.
