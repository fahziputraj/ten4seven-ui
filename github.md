repo: erp-aapm/aapmlayeracademy.id
branch: develop
path: src

## Last sync
date: 2026-08-25T00:00:00Z

### Updated in this project
- Read the live token file `src/index.css` and rebuilt it as the `tokens/` closure behind `styles.css`.
- Lifted the Iconify/Solar semantic registry from `src/components/icons/` into `components/core/Icon.jsx`.
- Recreated the Academy learner + admin workspace as `ui_kits/academy/` from `src/pages/` and `src/components/`.
- Copied brand assets (logos, 24 learner avatars, Inter Variable) out of `public/` into `assets/`.

## Screen map

| Project screen | Built from |
| --- | --- |
| `ui_kits/academy/LoginScreen.jsx` | `src/pages/Login.jsx`, `src/components/AuthLayout.jsx`, `src/components/PasswordField.jsx` |
| `ui_kits/academy/AcademyShell.jsx` | `src/components/layout/AcademySidebar.jsx`, `AcademyHeader.jsx`, `academyNavigation.js` |
| `ui_kits/academy/DashboardScreen.jsx` | `src/pages/Home.jsx`, `src/components/academy/DashboardComponents.jsx` |
| `ui_kits/academy/LearningPathScreen.jsx` | `src/pages/Modules.jsx`, `src/components/academy/LearningRoadmap.jsx`, `src/lib/academyData.js` |
| `ui_kits/academy/ModuleDetailScreen.jsx` | `src/pages/ModuleDetail.jsx`, `src/components/academy/LessonWorkspace.jsx` |
| `ui_kits/academy/AdminLearnersScreen.jsx` | `src/pages/admin/AdminLearners.jsx`, `src/components/admin/` |
| `tokens/*.css` | `src/index.css`, `tailwind.config.js` |
| `components/core/Icon.jsx` | `src/components/icons/AapmIcon.jsx`, `solarIconData.js`, `docs/ui-ux/ICONIFY_SURFACE_CONTRACT.md` |
| `components/core/*`, `components/forms/*` | `src/components/ui/`, `src/components/primitives/` |
| `assets/logos/`, `assets/avatars/`, `assets/fonts/` | `public/brand/`, `public/assets/avatar/`, `public/fonts/` |
| `ui_kits/erp/*` | No repo source — built from the written ERP specification |
