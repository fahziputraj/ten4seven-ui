# Third-party notices

The private `@ten4seven/ui` bundle contains or is built from the following
third-party material. This file is included so an internal commercial artifact
keeps its attribution boundary explicit.

## Inter variable font

The bundled `dist/fonts/Inter-Variable.woff2` is Inter by Rasmus Andersson and
contributors, distributed under the SIL Open Font License 1.1. The complete
license text is shipped at `dist/fonts/Inter-OFL.txt`.

## DM Sans variable font

The bundled `dist/fonts/DM-Sans-Variable.woff2` is DM Sans by Colophon Foundry,
Jonny Pinhorn, and contributors, distributed under the SIL Open Font License
1.1. The complete license text is shipped at `dist/fonts/DM-Sans-OFL.txt`.

## Source Serif 4 variable font

The bundled `dist/fonts/Source-Serif-4-Variable.woff2` is Source Serif 4 by
Adobe and contributors, distributed under the SIL Open Font License 1.1. The
complete license text is shipped at `dist/fonts/Source-Serif-4-OFL.txt`.

## IBM Plex Mono font

The bundled IBM Plex Mono 400, 500, 600, and 700 WOFF2 files are part of IBM
Plex by IBM and contributors, distributed under the SIL Open Font License 1.1.
The complete license text is shipped at `dist/fonts/IBM-Plex-Mono-OFL.txt`.

## Solar Iconify icon library

The generated SVG paths in the bundle are derived from the complete local Solar
Iconify collection by 480 Design. The bundle contains 7,759 canonical glyphs
and 203 local aliases (7,962 names in total), including the authored bold,
linear, outline, broken, and duotone variants. Solar is licensed under Creative
Commons Attribution 4.0 International (CC BY 4.0).

- Source attribution: https://www.figma.com/community/file/1166831539721848736
- License: https://creativecommons.org/licenses/by/4.0/
- Local generated sources: `packages/icons/src/solar-data.ts` (semantic names)
  and `packages/icons/src/solar-catalog.ts` (complete Iconify collection)

The runtime does not load Iconify or an icon CDN. The complete collection is
generated from the pinned `@iconify-json/solar` development package and shipped
inside the self-contained UI bundle; consumer applications use the semantic
`T7Icon` API or the local `IconifyIcon` catalog API.

## anime.js

The motion adapter bundles anime.js 4.5.0 by Julian Garnier under the MIT
License. The runtime does not require anime.js as a separate consumer
dependency.

```text
The MIT License

Copyright (c) 2025 Julian Garnier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
