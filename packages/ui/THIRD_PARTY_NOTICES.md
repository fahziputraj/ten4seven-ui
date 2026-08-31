# Third-party notices

The private `@ten4seven/ui` bundle contains or is built from the following
third-party material. This file is included so an internal commercial artifact
keeps its attribution boundary explicit.

## Inter variable font

The bundled `dist/fonts/Inter-Variable.woff2` is Inter by Rasmus Andersson and
contributors, distributed under the SIL Open Font License 1.1. The complete
license text is shipped at `dist/fonts/Inter-OFL.txt`.

## Solar semantic icon subset

The generated semantic SVG paths in the bundle are derived from the Solar icon
set by 480 Design. Solar is licensed under Creative Commons Attribution 4.0
International (CC BY 4.0).

- Source attribution: https://www.figma.com/community/file/1166831539721848736
- License: https://creativecommons.org/licenses/by/4.0/
- Local generated source: `packages/icons/src/solar-data.ts`

The runtime does not depend on Iconify or load an icon CDN. The bundle contains
only the generated local semantic subset used by ten4seven contracts.

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
