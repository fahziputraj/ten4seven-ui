# Overlay layering model

## Boundary

Non-modal floating content is mounted into the single `#t7-overlay-root`.
Modal and drawer content uses the native dialog top layer through the canonical
`Modal` and `DetailDrawer` contracts. Consumers keep the same component APIs;
the portal is an implementation boundary.

## Semantic stack

| Role                                  | Token             |
| ------------------------------------- | ----------------- |
| document/base                         | `--t7-z-base`     |
| sticky shell/table headers            | `--t7-z-sticky`   |
| control focus adjacency               | `--t7-z-focus`    |
| select, menu, date and combobox popup | `--t7-z-dropdown` |
| popover                               | `--t7-z-popover`  |
| tooltip                               | `--t7-z-tooltip`  |
| drawer                                | `--t7-z-drawer`   |
| modal                                 | `--t7-z-modal`    |
| toast                                 | `--t7-z-toast`    |
| command surface                       | `--t7-z-command`  |

`--t7-z-overlay` remains as the compatibility overlay level for existing
consumers. New component CSS uses the more specific role token.

## Positioning

`useFloatingPosition` measures the trigger in viewport coordinates, flips the
requested side when space is insufficient, shifts within viewport padding, and
updates on resize, capture-phase scroll, and resize observation. Component
styles still own borders, surfaces, shadows, density, and motion.

## Dismissal and nesting

Dismissible layers register both their local trigger root and portalled content
ref. Pointer dismissal therefore does not close a popup before a nested option
or action can be selected. Escape remains the shared non-modal dismissal key;
native dialogs own modal Escape behavior.
