# AAPM UI accessibility contract

- Use semantic landmarks: one `main`, labelled navigation regions, and headings in document order.
- Every icon-only action has an accessible label. Decorative icons remain hidden from the accessibility tree.
- Inputs expose labels, descriptions and errors through `aria-describedby`; invalid state is not conveyed by color alone.
- `Combobox` supports typing, arrow navigation, Home/End, Enter and Escape, and exposes a listbox relationship.
- Dialogs expose `role="dialog"` and `aria-modal`. Destructive confirmation always offers a visible cancel action.
- Maintain visible `:focus-visible` styles and a minimum 44px touch target for primary controls.
- Respect `prefers-reduced-motion`; motion communicates state and hierarchy rather than decoration.
