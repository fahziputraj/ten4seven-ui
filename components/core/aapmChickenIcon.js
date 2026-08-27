/* AAPM-owned Solar-like domain glyphs.
   These are deliberately small, monochrome, filled silhouettes with opacity
   layers: the same visual grammar as Solar bold-duotone without importing a
   generic provider glyph that can carry the wrong meaning. */
export const aapmChickenIcon = Object.freeze({
  body: [
    '<path fill="currentColor" fill-opacity=".92" fill-rule="nonzero" transform="scale(.5)" d="M18.5 7.414c0-1.782-2.154-2.674-3.414-1.414L6.5 14.586C5.24 15.846 6.132 18 7.914 18h3.469a8.3 8.3 0 0 1-.277 2.4l-.761 2.842c-.882 3.293-1.135 6.912.75 9.753A15.7 15.7 0 0 0 24 40v2h-5v2h9.5v-2H26v-2.101a15.7 15.7 0 0 0 8.733-3.924A13.9 13.9 0 0 1 29.478 37C22.071 37 16 31.216 16 24a1 1 0 0 1 2 0c0 6.039 5.102 11 11.478 11c3.525 0 6.67-1.521 8.772-3.905q.099-.112.22-.187c.5-1.09.877-2.248 1.113-3.455c.369-1.892.914-3.784 2.078-5.32c.483-.637-.06-1.536-.848-1.406L27.698 22.89a5 5 0 0 1-5.2-2.533l-3.32-6.067l2.02-1.795C22.574 11.273 21.709 9 19.87 9H18.5zm-.307 5.076L19.87 11H18.5a2 2 0 0 1-2-2V7.414l-2.644 2.644q.329-.058.675-.058a3.88 3.88 0 0 1 3.403 2.017zm-7.485.716L7.914 16h3.159l-.298-1.148a3.9 3.9 0 0 1-.067-1.646M14 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/>',
    '<path fill="currentColor" fill-opacity=".3" d="M9.1 13.06c1.17-.76 2.52-1.02 4.06-.78 1.27.2 2.31.74 3.12 1.63-.92.02-1.78.27-2.58.75.4.19.75.44 1.06.75-1.3.26-2.52.02-3.66-.71-.82-.52-1.49-1.07-2-1.64z"/>',
  ].join(""),
  width: 24,
  height: 24,
});

export const aapmEggIcon = Object.freeze({
  /* A single, calm silhouette reads as an egg at small sizes. The colour is
     inherited from the same semantic token as every other Solar surface. */
  body: '<path fill="currentColor" fill-opacity=".92" d="M12 2.8c-4.45 1.22-7.35 6.13-7.35 10.57 0 4.65 2.93 7.63 7.35 7.63s7.35-2.98 7.35-7.63C19.35 8.93 16.45 4.02 12 2.8Z"/>',
  width: 24,
  height: 24,
});

export const aapmDomainIcons = Object.freeze({
  "aapm:chicken-bold-duotone": aapmChickenIcon,
  "aapm:egg-bold-duotone": aapmEggIcon,
});
