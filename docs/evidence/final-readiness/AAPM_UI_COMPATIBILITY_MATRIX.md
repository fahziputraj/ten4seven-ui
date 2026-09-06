# AAPM UI COMPATIBILITY MATRIX

ten4seven library verdict: `TEN4SEVEN FINAL BUILD READY` for the library-owned
contracts, package, generic consumer, and reference proofs in this worktree.

Generic ten4seven capability: `COMPOSED + PROVEN` for the isolated/reference
surfaces listed below.

AAPM Adoption: `UNVERIFIED` for production Farm, Farm Monitoring,
Operations/Sales/SCM, ERP, Academy, and native-mobile journeys not run or
accepted in this repository.

This matrix distinguishes what ten4seven can compose from what the AAPM
consumer must own and verify. A generic disposition such as `COMPOSED +
PROVEN` means the UI contract or isolated reference proof passed. It does not
mean that a production AAPM route, API, database, permission predicate,
calculation, or workflow has been accepted. Production acceptance is tracked
in the separate `AAPM Adoption` column and remains `UNVERIFIED` where no real
consumer journey was run.

| AAPM surface             | UI archetype / required composition                                                                                 | ten4seven evidence                                                                                                                                                                                        | Consumer-owned boundary                                                                                                    | Generic ten4seven disposition       | AAPM Adoption | Next acceptance gate                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| Farm Customer Web        | Private shell, context/tenant navigation, overview metrics, scoped empty/error/loading states, action availability  | `tests/farm-synthetic-proof.spec.ts`, `apps/playground/src/farm-synthetic-proof.tsx`; Farm synthetic browser proof passes desktop/mobile/state journeys                                                   | Farm API adapter, tenant selection, authorization predicates, customer data, workflows, persistence, business calculations | COMPOSED + PROVEN                   | UNVERIFIED    | Run the same journey against the real Farm consumer with approved permission fixtures and API evidence.    |
| Farm Monitoring          | Dashboard/control-tower style overview, metric cards, trends, status, safe scope and no-data states                 | Farm synthetic proof plus `control-tower`, `resource-forecast`, `entity-360` operational contracts                                                                                                        | Monitoring data freshness, alert rules, tenant/Farm scope, escalation and operational authority                            | COMPOSED + PROVEN                   | UNVERIFIED    | Confirm real monitoring endpoints, scope enforcement, state transitions, and mobile/desktop acceptance.    |
| Operations               | Process workspace, Kanban/workboard, readiness/eligibility, receiving, route/load, exception queue, audit/revision  | `packages/contracts/src/operational-patterns.ts`, `tests/operational-patterns.spec.ts`, `apps/playground/src/operational-reference.tsx`; 12 typed operational patterns pass contract and reference checks | Sales/SCM records, calculations, approvals, transitions, persistence, API errors and domain terminology                    | COMPOSED + PROVEN                   | UNVERIFIED    | Map real Operations/Sales/SCM records to the typed intent and verify action authority with consumer tests. |
| ERP                      | Dense list/grid, filters, record detail, forms, approval, ledger/report, audit and revision                         | Entity List/Detail family proofs, `AdvancedDataGrid`, `ApprovalPanel`, `RevisionDiff`, `ActivityFeed`, package/consumer gates                                                                             | ERP data model, ledger math, SQL/database, posting rules, approval authority, export and integration                       | COMPOSED + PROVEN                   | UNVERIFIED    | Execute ERP consumer proof with real read-only fixtures and independently verified calculations.           |
| Academy                  | Public/content shell, catalog, content detail, reader, progress/contextual actions, brand expression                | Public/ebook references, adoption consumer, `auth-aapm-academy` brand-expression route and `tests/brand-expression.spec.ts`                                                                               | Academy content state, enrollment, lesson completion, permissions, publishing workflow, analytics                          | COMPOSED + PROVEN                   | UNVERIFIED    | Run the Academy production consumer journey and verify content/persistence/permission ownership.           |
| Public / customer-facing | PublicShell, navigation menu, marketing home, catalog/product detail, cart/order summary, accessible states         | `apps/adoption-public`, `pnpm test:adoption` 4/4, `pnpm test:adoption:static`, manual rendered review at `127.0.0.1:4174`                                                                                 | Real catalog, checkout/payment, fulfillment, customer identity, analytics and deployment                                   | COMPOSED + PROVEN                   | UNVERIFIED    | Connect a real consumer adapter without moving commerce/business behavior into ten4seven.                  |
| Mobile semantic boundary | Touch-safe navigation, drawers, responsive filters, bounded data, focus/keyboard semantics translated to Web mobile | Full browser responsive checks across 360/390/768 and adoption/Next mobile-capable proof surfaces                                                                                                         | Native platform implementation, device matrix, native accessibility, offline/device behavior                               | COMPOSED + PROVEN for Web semantics | UNVERIFIED    | Run Android/iOS consumer QA and preserve the same semantic ownership boundaries.                           |

## Cross-cutting contracts

| Contract area | Proven ten4seven behavior                                                                        | Must remain in AAPM consumer                                               |
| ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Theme         | Preset profiles, exact typed color sources, semantic light/dark variables, DTCG output, contrast | Brand Core selection and product-specific theme composition                |
| Icons         | Bundled semantic Solar/Bold Duotone catalog and `T7Icon` names                                   | Domain meaning and when an icon represents a business state                |
| Navigation    | Sidebar, TopNavigation, NavigationMenu, MobileSidebar, SectionNavigation                         | Permission-filtered destinations and tenant/Farm context rules             |
| Actions       | Button, SplitButton, ActionBar, unavailable-action reasons, keyboard discoverability             | Whether an action is allowed, API mutation, transition, approval authority |
| Data          | Table/DataTable/AdvancedDataGrid/filtering/pagination geometry                                   | Query, sort/filter semantics, calculations, data privacy, persistence      |
| States        | StateView, EmptyState, Skeleton, Error/unauthorized/no-data patterns                             | Domain-specific reason, retry policy, authorization decision and telemetry |
| Overlays      | Drawer, DetailDrawer, Modal, AlertDialog, Popover, accessible focus restoration                  | Business confirmation text, mutation, audit, irreversible consequence      |
| Motion        | Shared `t7Motion` roles and reduced-motion behavior                                              | Product-specific workflow meaning and any business-timed transition        |

## Explicit non-claims

- This matrix does not accept `D:\\SA\\aapm_prod` or any production database.
- A synthetic Farm proof is not production Farm acceptance.
- `AAPM ADOPTION UNVERIFIED` is a consumer-acceptance status; it is not, by
  itself, a ten4seven library defect or a reason to keep the library
  conditionally ready after all library-owned gates pass.
- A local package tarball is not a merge, deployment, or publication.
- `PUSHED`, `REVIEWED`, and `ACCEPTED` remain separate states.
- The unresolved `ECO-ADR-007` provider choice is not silently resolved here.
