# AAPM UI — Instant Composition

AAPM UI adalah design system milik AAPM yang dirancang untuk langsung dipakai lintas produk: Academy, Ebook, reader, dashboard operasional, ERP, auth, dan AI workspace. “Instant” berarti tim dapat merakit layar baru dari kontrak yang sudah jelas tanpa memulai bahasa visual atau perilaku dari nol.

Sistem ini menggabungkan tiga sumber dengan batas yang tegas:

| Sumber | Peran di AAPM UI | Yang dibawa |
| --- | --- | --- |
| **Minimal UI** | Visual pattern source | Komposisi dashboard, hierarchy, density, metric cards, data surfaces, dan treatment warna per konteks |
| **HeroUI / HeroUI Pro** | Interaction reference | Perilaku control, focus, keyboard, overlay, validation, loading, dan responsive interaction |
| **Iconify** | Icon surface | Satu registry semantik untuk glyph, family, fallback, dan keputusan domain |
| **AAPM UI** | Source of truth | Token, component API, responsive contract, theme, brand, copy, accessibility, dan product recipes |

Minimal UI dan HeroUI adalah referensi/adaptasi yang disediakan untuk mempercepat keputusan desain. AAPM UI tidak menyalin template mentah dan tidak menambahkan runtime HeroUI ke produk. Hasil akhirnya harus tetap terasa AAPM: putih sebagai canvas default, Inter sebagai font utama, green sebagai brand anchor, orange sebagai action/counterpoint, dan Iconify sebagai bahasa ikon yang konsisten.

## Aturan sumber

- **Minimal UI memberi bentuk dan ritme.** Ambil pola hierarchy, grouping, density, card composition, chart framing, dan empty-state treatment; sesuaikan konten, token, dan responsivitas dengan AAPM UI.
- **HeroUI memberi perilaku.** Ambil prinsip accessible control, state model, focus ring, keyboard navigation, overlay lifecycle, dan form feedback; implementasikan lewat komponen AAPM UI yang memakai token kita sendiri.
- **Iconify memberi glyph.** Feature code memakai semantic key seperti bookOpen, approve, atau ai; feature code tidak menanam raw provider string jika key sudah tersedia di IconRegistry.
- **AAPM UI menyelesaikan konflik.** Jika referensi berbeda, token dan contract AAPM UI menang. Jangan menyelesaikan konflik dengan menambah framework, family ikon, atau warna ad-hoc.

### Yang tidak boleh terjadi

- Tidak ada import runtime HeroUI/MUI hanya untuk mengejar tampilan.
- Tidak ada copy-paste satu halaman Minimal UI menjadi product code tanpa dipecah menjadi recipe AAPM UI.
- Tidak ada raw hex, radius, shadow, atau spacing baru di komponen ketika token semantic/component sudah tersedia.
- Tidak ada dua komponen berbeda untuk perilaku yang sama hanya karena sumber inspirasinya berbeda.
- Tidak ada raw solar:* atau ph:* di feature code ketika semantic key sudah ada.
- Tidak ada icon kosong yang lolos hanya karena nama glyph terdengar benar; mapping harus melewati registry dan fallback yang terlihat.

## Instant recipe matrix

Gunakan recipe berikut sebagai starting point. Recipe adalah komposisi, bukan halaman yang harus disalin utuh.

| Surface | Compose from | Visual direction |
| --- | --- | --- |
| **Academy** | AppShell, PageHeader, KPICluster, DashboardGrid, Card, Progress, Tabs, Icon | Learning tint yang ringan, primary untuk progress/active state, orange untuk action dan AI |
| **Ebook / library** | AppShell, PageContainer, SearchInput atau Combobox, Card, Tabs, StatusChip, Pagination, Icon (library, bookOpen, bookmark) | Content-first, calm surface, metadata ringkas, readable measure |
| **Reader / article** | PageContainer, Breadcrumb, typography tokens, ProgressRing, Tabs, Divider, Icon (article, reading, quote) | Putih dan tenang; kurangi chrome, jaga panjang baris dan hierarchy bacaan |
| **Operations / ERP** | AppShell, FilterToolbar, KPICluster, DataTable, StatusChip, DashboardGrid, charts, ConfirmDialog | Dense dan compact secara terkontrol; status lifecycle jelas; exception lebih menonjol daripada dekorasi |
| **Auth / onboarding** | Surface atau Card, FormField, Input, Button, Alert, Modal, Toast | Canvas putih bersih, brand mark tegas, form seimbang, feedback dekat dengan tindakan |
| **AI workspace** | AppShell, activity/status pattern, composer, Drawer atau Popover, feedback, Icon (ai, sparkles, history) | Satu working area; state thinking/streaming/error terbaca; AI violet/orange tetap reserved dan tidak mengambil alih konten |

## Component contract

Setiap recipe mengikuti alur yang sama:

  primitive tokens
    → semantic tokens
      → component tokens + states
        → product recipe
          → responsive composition

Contoh: pola metric card dari Minimal UI memakai hierarchy yang sama, tetapi warna, radius, elevation, typography, empty state, dan responsive behavior semuanya berasal dari token AAPM UI. Interaction state seperti hover, focus-visible, loading, invalid, disabled, dan selected mengikuti perilaku yang diadaptasi dari HeroUI lalu diwujudkan oleh komponen AAPM UI.

Komponen publik harus:

- punya state default, hover, pressed, focus-visible, disabled, loading, empty, dan error jika relevan;
- menjaga target sentuh minimal 44px, label/aria yang jelas, keyboard access, dan focus-visible;
- tidak memaksa horizontal overflow pada viewport kecil;
- menghormati prefers-reduced-motion dan tidak menyembunyikan status penting di animasi;
- mengonsumsi token melalui CSS variables, bukan nilai visual lokal;
- memakai copy Indonesia-first untuk pesan yang ditujukan ke pengguna, dengan English hanya untuk interface furniture yang memang sudah menjadi konvensi produk.

## Memilih pola baru

Saat membutuhkan pola yang belum ada, gunakan urutan ini:

1. Cari komponen atau recipe AAPM UI yang paling dekat.
2. Cari pola visual di Minimal UI untuk hierarchy dan density.
3. Cari pola interaction HeroUI untuk state, keyboard, focus, dan overlay.
4. Cari semantic key Iconify di registry.
5. Tambahkan perubahan ke token/component contract terlebih dahulu bila pattern itu akan dipakai lebih dari sekali.
6. Dokumentasikan keputusan di guideline atau component matrix; jangan menyembunyikannya sebagai one-off styling.

Dengan model ini, AAPM UI terasa seperti katalog template yang siap dirakit, tetapi tetap satu sistem yang dapat dipelihara dan diperluas untuk produk umum seperti Ebook tanpa kehilangan identitas Academy.
