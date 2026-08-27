# UI kit — AAPM Layer Academy

Click-through recreation of the learner and admin workspace, composed entirely from this design system's components.

**Flow:** `index.html` opens on the login screen → sign in (any email with an `@`) → Dashboard → Learning Path (accordion tracks, click a module) → Module Detail (tabs, inline knowledge check) → *Panel Admin* in the sidebar footer → Learner Management list.

**Screens**

| File | Recreates | Source |
| --- | --- | --- |
| `LoginScreen.jsx` | Split-screen auth: 44% form pane / 56% brand panel | `src/pages/Login.jsx`, `src/components/AuthLayout.jsx` |
| `AcademyShell.jsx` | 264px sidebar (collapsing to 76px), progress puck, grouped nav, 73px blurred sticky header | `src/components/layout/{AcademySidebar,AcademyHeader,academyNavigation}` |
| `DashboardScreen.jsx` | Welcome, metric strip, Continue-learning card, learning tracks, Up next, quick tools, study note | `src/pages/Home.jsx`, `src/components/academy/DashboardComponents.jsx` |
| `LearningPathScreen.jsx` | Overall-progress banner + four accordion tracks of module tiles with four states | `src/pages/Modules.jsx`, `src/components/academy/LearningRoadmap.jsx` |
| `ModuleDetailScreen.jsx` | Lesson reader, tabs, inline knowledge check, lesson list sidebar, certification tier note | `src/pages/ModuleDetail.jsx` structure + Academy content patterns |
| `AdminShell.jsx` | Admin workspace chrome: 264px rail (no collapse), primary + operasional nav, planned-capability notes, solid header on `--surface-default` | `src/components/layout/AdminShell.jsx`, `src/components/admin/adminNavigationItems.js` |
| `AdminLearnersScreen.jsx` | Admin list page: KPIs, filter toolbar, selectable table, bulk actions, pagination | `src/pages/admin/AdminLearners.jsx`, `src/components/admin/*` |
| `academyData.js` | Real level names, track definitions and module states | `src/lib/academyData.js`, `src/components/academy/LearningRoadmap.jsx` |

**Deliberate gaps**

- The login brand panel in production plays a looping farm video (`public/assets/Video-Web_3.mp4`). The video was not copied into this design system, so the panel uses the hero gradient plus the same green scrim, blurred logo glow and rotating italic-serif insight. Drop the real video in and the treatment is unchanged.
- Farm Calculators, Farm KPI, APPI, Profile, Certification and Final Exam are reachable in the nav but render a `StateView` explaining they were not auditable in the supplied source. They are deliberately **not** invented. The same applies to the admin rail's Ringkasan, Manajemen course, Pengaturan AI and Status ruang kerja.
- Module titles are authored; the **level names, track structure, module count (22) and level count (14) are real**, from `src/lib/academyData.js`. Every progress number on every screen derives from `academyData.js` via `stats()` / `trackStats()` — no screen hardcodes a count.
