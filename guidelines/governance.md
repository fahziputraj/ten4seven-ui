# AAPM UI governance

This package is the shared UI layer for Academy, ERP, operations, Ebook and other AAPM products. It supplements the product repository's existing governance; it does not replace or overwrite it. Product code owns business rules, authorization, data fetching and route decisions.

## Source of truth and ownership

- **Source of truth:** `index.js` (public API), `styles.css` (single style entrypoint), `tokens/` (primitive → semantic → component token layers), `components/` (canonical implementations), `aapm-ui.manifest.json` (catalog) and `guidelines/` (contracts).
- **Owner:** AAPM UI maintainers. Each product team is a consumer and can propose changes through its normal repository review process.
- **Maintainers:** the people responsible for token, component, icon, accessibility and release review. A change needs an owner who can explain its API, responsive behavior and migration impact.
- **Canonical location:** a concept has one implementation in its most general applicable group. Product-specific recipes belong in `ui_kits/<product>/` or a product repository, not in a copied primitive.

## Maturity

Every new public component or token change should be described as one of these stages in the change note:

| Stage | Meaning | API promise |
| --- | --- | --- |
| Experimental | Being explored in a kit or showcase | May change without compatibility promise |
| Candidate | Used by at least one composed example and reviewed for a11y/responsive behavior | Changes need a migration note |
| Stable | Public contract, documented states and validation evidence | SemVer rules apply |
| Deprecated | Superseded or no longer recommended | Keep a replacement and removal target |
| Removed | No longer exported or shipped | Only in a breaking release |

The current package is `0.2.0`. Existing components are foundation/candidate contracts unless their prompt, state behavior and tests show a stronger maturity decision.

## Change workflow

1. State the user/problem and search the manifest, index and matrix for an existing solution.
2. Prefer a token, variant, slot or composition change over a new component. A new component needs a distinct responsibility and an explicit reason it is not a duplicate.
3. Add or reuse primitive, semantic and component tokens; never introduce a component-level raw brand colour when a token exists.
4. Define the API, loading/empty/error/permission/disabled behavior, keyboard/focus behavior, mobile behavior and content limits.
5. Implement in the canonical group, export from `index.js`, register in `aapm-ui.manifest.json`, and add the `.prompt.md` plus `.d.ts` contract.
6. Add a catalog or kit example when the change is compositional. Keep domain logic in the product layer.
7. Run `npm test`, JSX parsing, the bundle smoke test and the relevant visual/mobile review before release.
8. Record the decision, evidence and migration impact in the change/ release note.

## Dependency and icon policy

- React and ReactDOM remain peer dependencies. The package may use small local runtime dependencies that are part of the public contract, currently `@iconify/react` and curated `@iconify-icons/*` data modules.
- Standard React rendering must not depend on a CDN, runtime Iconify API or a browser-loaded icon registry. The static HTML catalog may use a CDN only as a documented dependency-free preview exception.
- HeroUI/Minimal UI are references and pattern sources for this package. Adding a runtime framework requires an explicit architecture decision, bundle/accessibility evidence and a migration plan.
- All product icons use `Icon` and semantic registry names. A provider string is only acceptable for a documented one-off while its local data and fallback behavior are verified.

## Versioning and deprecation

- **Patch:** bug, documentation or non-breaking visual correction.
- **Minor:** additive token, component, variant or optional prop.
- **Major:** removed/renamed export, changed default behavior, token contract removal or keyboard/responsive behavior that breaks consumers.
- A deprecation keeps the old export working, names the replacement, documents the migration and is not removed until a major release.
- Release notes should include affected groups, screenshots/catalog links when visual, accessibility impact, migration steps and known limitations.

## Review checklist

- [ ] Existing primitive/component/recipe was checked; no duplicate API was introduced.
- [ ] Tokens resolve through primitive → semantic → component layers.
- [ ] Semantic HTML, labels, focus, contrast, reduced motion and touch targets are covered.
- [ ] Long text, empty data, slow/error/permission states and mobile layout are defined.
- [ ] Public export, manifest, prompt, type contract and example are aligned.
- [ ] `npm test` and the build/bundle smoke checks pass.
