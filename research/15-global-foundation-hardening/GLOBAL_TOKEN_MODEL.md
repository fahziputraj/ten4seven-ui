# Global token model

Typed contracts own semantic decisions. The token resolver owns concrete values. Provider and generated CSS deliver the same values; canonical components consume them; `/tokens` reads computed CSS at its actual scope.

## Domains and intensity

Action/brand, status and categorical data are independent domains. Emerald remains a valid primary. Success has fixed status meaning and an explicit label/icon; a categorical hue never conveys success merely by position. Categorical palettes remain independent of action/accent selection, with the existing five-slot API retained. Monochrome intentionally needs labels and non-color differentiation.

Surface expression selects intensity: Paper (`plain`, compatibility name), Soft (`soft`), Expressive (`expressive`, additive), Solid (`solid`), Inverse (`inverse`). Tone selects meaning and colorway selects a category. Ordinary work and broad canvases stay paper-neutral. Solid semantic colors derive a white-text-safe lightness centrally; inverse has its own paired foreground. The expressive middle level uses the readable neutral foreground on a bounded tinted surface.

## Runtime roles

The existing motion role resolver becomes authoritative for both typed profiles and CSS. The compatibility anchor has a bounded influence on micro/state/popup/modal/layout timings; reveals and slow choreography remain distinct. Explicit and OS reduced motion must agree in effective behavior.

Focus has a dedicated, moderated color independent of accent, width, offset, neutral halo and field border. High contrast strengthens visibility without saturating the whole interface. Forced-colors uses the platform highlight.

Density owns rhythm and padding; micro typography gets a readable floor. Radius retains all named/exact profiles while data surfaces use a role ceiling. Existing optical spacing is retained where it coordinates adjacent control and field geometry.

## Ownership and retrieval

Layout/viewport documents gutters, rails, sidebar/header/aside geometry, safe areas and component-owned breakpoints. Scroll ownership separately documents document scroll, explicit bounded regions, portal root, body lock and sticky offsets. Existing composition remains recipe-owned.

Iconography keeps semantic naming and inherited foreground, using the current optical roles and provider-independent alignment rules. Data visualization adds axis, grid, label, tooltip, focus, selection, comparison, threshold, no-data and explicit positive/negative role mappings without a new chart API.

Canonical section order: Color → Typography → Surface Expression → Geometry & Density → Layout & Viewport → Interaction → Motion → Elevation & Layering → Scroll Ownership → Iconography → Data Visualization. The navigation and document use the same order. Canonical machine names and their display names are shown together where useful.
