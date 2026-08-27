# AAPM UI showcase

`catalog.html` is the primary static template-library demo for the general AAPM UI layer. It shows how the same foundation can serve Academy, Ebook, reader, operations and auth products, with live preview dialogs, search/filtering, theme and density controls, and an Iconify registry sample.

`index.html` remains the lower-level foundation review surface. It demonstrates the same concerns that the React source entrypoint covers:

- responsive application shell, sidebar drawer and mobile bottom navigation;
- local Inter Variable typography, light default and semantic dark mode;
- dashboard metrics, chart hierarchy, operational priorities and table density;
- balanced form fields, searchable-model affordance, status chips and actions;
- designed feedback states and toast/confirmation previews.

Open `catalog.html` directly for the product-facing review, or serve the parent folder if the browser blocks local font or module requests:

```powershell
python -m http.server 4173 --directory "D:\SA\ASSET\AAPM Design System 0826"
```

Then open `http://localhost:4173/showcase/catalog.html`. The static preview uses the Iconify web component CDN only because it is a dependency-free HTML demo; production React consumers use `components/core/Icon.jsx`, which resolves local Iconify data without a network request.
