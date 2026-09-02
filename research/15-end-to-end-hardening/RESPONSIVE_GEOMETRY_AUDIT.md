# Responsive Geometry Audit

Status: **PASS — no accidental page-level horizontal overflow in the audited route matrix**  
Verified: 2026-09-01

## Tested viewport set

| CSS viewport | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| 1440×900     | Full desktop shell and public hero balance                      |
| 1186×698     | Laptop geometry and long Theme Studio labels                    |
| 840×900      | Intermediate responsive breakpoint where toolbars commonly clip |
| 768×900      | Tablet navigation and two-column transition                     |
| 390×844      | Modern mobile layout and drawer/modal bounds                    |
| 360×800      | Narrow mobile stress case                                       |

## Geometry outcomes

| Area                  | Check                                                    | Result                                                                                                                                                       |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Page root             | `scrollWidth - clientWidth` on audited primary routes    | `0` observed for the active route matrix at mobile/narrow; no accidental root scrollbar.                                                                     |
| Tables                | Ownership of horizontal overflow                         | PASS — table wrapper scrolls when content requires it; page root does not.                                                                                   |
| Theme Studio          | Control columns, profile labels, sliders, catalog search | PASS — one column at narrow width, role labels stay in bounds, sliders retain 36px physical hit geometry, and the icon-only search control is at least 40px. |
| Publishing/Ebook      | Intermediate toolbar and catalog grid                    | PASS — compact layout begins at 880px before control right edges can clip.                                                                                   |
| Public navigation     | Wrapped menu actions and header CTA                      | PASS — links/triggers are at least 44px high; visible Public/Ebook header actions are at least 40px high at the mobile breakpoint.                           |
| Operations            | Milestone nodes, selected detail, filter bar, table      | PASS — no percentage/border collision, no duplicated mobile chrome, table scroll remains local.                                                              |
| Cards and previews    | Min-content / grid balance                               | PASS — static cards retain their intended bounds; media/content regions do not force page overflow.                                                          |
| Modal/Drawer backdrop | Narrow 360px width                                       | PASS — native dialog backdrop bounds do not exceed viewport.                                                                                                 |
| Overlay edge anchors  | Popover, menu, combo popup                               | PASS — portal layers remain within viewport and do not clip behind scroll owners.                                                                            |

## Precision observations

- Profile label/value alignment was measured after the column-gap correction;
  the `Chart colorway` label no longer overruns its column.
- Health status chips in Operations are vertically centered within the data
  cells. The tiny line-alignment offset of domain chips is intentional and
  belongs to their record-title composition.
- The 100% milestone text clears the progress ring border. No post-hoc
  transform or page-specific offset was introduced.
- `AppShell` preview markup now retains exactly one `main` landmark rather than
  nesting a preview `main` inside a catalog document.

## Targeted regression coverage

`tests/end-to-end-hardening.spec.ts` now guards:

1. one-main landmark boundary for the App Shell preview;
2. Theme Studio one-column switch at narrow width;
3. Ebook compact behavior before the 840px clipping condition;
4. public navigation 44px mobile target geometry;
5. static-card non-lift contract;
6. Operations mobile identity/navigation behavior;
7. Drawer and Modal viewport-width containment;
8. slider, filter-chip removal, and carousel target geometry.
9. Theme Studio's icon-only catalog-search target at exact 360×800, including
   root-overflow protection.
