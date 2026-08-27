# AAPM UI iconography contract

Iconography is a product surface, not a decorative afterthought. AAPM UI uses Iconify through one semantic registry so Academy, ERP, operations, Ebook and other products can share a reliable visual vocabulary without feature code scattering provider strings.

## The contract

Use the semantic key first:

```jsx
<Icon name="library" size={20} />
<Icon name="bookmark" size={18} title="Simpan bacaan" />
<Icon name="production" size={20} color="var(--brand-orange)" />
```

`components/core/Icon.jsx` is the source of truth. It currently exposes 290 semantic keys across navigation, actions, status, analytics, finance, inventory, farm, logistics, users, files, communication, Academy, AI, poultry operations and general web/publishing. The general aliases deliberately cover common products such as Ebook:

| Product need | Semantic keys |
| --- | --- |
| Discovery | `search`, `category`, `tag`, `global`, `filter`, `sort` |
| Reading | `library`, `book`, `bookOpen`, `reading`, `article`, `quote`, `bookmark`, `bookmarks` |
| Media | `audio`, `video`, `image`, `media`, `play` |
| Account | `user`, `users`, `login`, `logout`, `settings`, `help` |
| Commerce and operations | `cart`, `order`, `customer`, `warehouse`, `delivery`, `report`, `analytics` |

The raw `solar:*` escape hatch is reserved for a documented one-off. Do not pass raw provider strings from feature code when a semantic name exists.

## Family and reliability rules

- Solar is the default family: `bold-duotone` for object/category tiles, `bold` for compact actions and status, and `linear` for chevrons or low-emphasis navigation.
- AAPM-owned `aapm:*-bold-duotone` glyphs carry `egg` and `chicken`: compact, monochrome silhouettes in the Solar visual grammar, with chicken designed as a living side-view bird rather than food/drumstick. `warehouse` uses Solar buildings directly. Phosphor duotone fills the remaining physical/biological nouns Solar does not cover. Raw MingCute poultry maps remain only for compatibility. The six provider compatibility exceptions (`healthicons:animal-chicken`, `game-icons:rooster`, `game-icons:egg-clutch`, `mdi:silo`, `mdi:corn`, `mdi:forklift`) remain a closed list.
- Every mapping is verified against Iconify before it is added. A missing provider glyph must never reach a production screen by guesswork.
- The shipped React bundle includes curated Solar, Phosphor, MingCute, MDI, Healthicons and Game Icons data used by the Academy/ERP surface. Physical and biological aliases outside that local subset resolve to a visible local `info` fallback and expose `data-icon-fallback="true"`; they do not make a network request. Add a local package/data map before promoting a new family alias to production.
- Unknown semantic keys resolve to the `info` glyph. This is an intentional visible fallback: it keeps layout stable and makes registry drift discoverable rather than rendering a blank box.
- If a product needs a new concept, add a semantic alias and verify its provider glyph in the same change. When a paired concept such as egg/chicken must read as one domain family, prefer a matching local silhouette over a literal provider glyph that introduces the wrong meaning.

## Sizing and accessibility

Use 16px for inline metadata, 18–20px for navigation and controls, and 22–24px for a feature tile. A glyph is optically aligned by the component, not by ad-hoc margins. Icon-only controls require an accessible label and a 44px touch target; decorative glyphs are `aria-hidden`.

Use semantic colour tokens for emphasis (`var(--primary)`, `var(--brand-orange)`, `var(--success)`, `var(--danger)`, `var(--ai)`). Do not encode status by colour alone: pair it with text or a visible state label. Tinted icon tiles use the matching tint foreground/border triple and never introduce an unregistered colour.

## Preview

The runnable catalog at `showcase/catalog.html` includes a compact Iconify sample across learning, publishing, commerce and operations. The foundation surface at `showcase/index.html` demonstrates the lower-level component contracts. Both previews load the same local Inter Variable family and token entrypoint.
