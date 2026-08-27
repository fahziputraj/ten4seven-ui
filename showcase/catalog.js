import { aapmDomainIcons } from "../components/core/aapmChickenIcon.js";

const catalogRoot = document.getElementById("catalog-app");
const templateGrid = document.getElementById("template-grid");
const templateEmpty = document.getElementById("template-empty");
const templateSearch = document.getElementById("template-search");
const templateCount = document.getElementById("template-count");
const iconGallery = document.getElementById("icon-gallery");
const dialog = document.getElementById("template-dialog");
const dialogPanel = dialog?.querySelector(".catalog-modal__dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogCategory = document.getElementById("dialog-category");
const dialogPreview = document.getElementById("dialog-preview");
const useTemplateButton = document.getElementById("use-template");
const toast = document.getElementById("catalog-toast");
const themeToggle = document.getElementById("theme-toggle");
const densityToggle = document.getElementById("density-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');

const templates = [
  { id: "academy", category: "learning", label: "Learning workspace", title: "Layer Academy", icon: "solar:notebook-bold-duotone", tone: "green", description: "Roadmap, progress, lesson, quiz, certification, dan APPI dalam satu learning shell.", tags: ["Dashboard", "Learning path", "APPI"], preview: "academy" },
  { id: "ebook", category: "publishing", label: "Publishing", title: "Ebook library", icon: "solar:book-2-bold-duotone", tone: "orange", description: "Discovery-first library untuk katalog Ebook, topik, bookmark, dan rekomendasi bacaan.", tags: ["Library", "Search", "Bookmark"], preview: "library" },
  { id: "reader", category: "publishing", label: "Long-form content", title: "Book reader", icon: "solar:book-bookmark-bold-duotone", tone: "blue", description: "Reader yang tenang dengan hierarchy teks, progress membaca, dan navigasi bab yang jelas.", tags: ["Reader", "Article", "Progress"], preview: "reader" },
  { id: "operations", category: "operations", label: "Operations", title: "Control room", icon: "solar:chart-square-bold-duotone", tone: "slate", description: "Dashboard operasional untuk KPI, status lifecycle, alert, dan data yang padat namun terarah.", tags: ["Metrics", "Data table", "Status"], preview: "operations" },
  { id: "auth", category: "auth", label: "Auth & onboarding", title: "Clean sign in", icon: "solar:login-3-bold", tone: "lime", description: "Auth shell yang bersih untuk login, create account, reset password, dan provider OAuth.", tags: ["Sign in", "Form", "Recovery"], preview: "auth" },
  { id: "ai", category: "ai", label: "AI workspace", title: "AI copilot", icon: "solar:cpu-bolt-bold-duotone", tone: "violet", description: "Chat workspace dengan context, quick action, streaming state, dan composer yang fokus.", tags: ["Chat", "Context", "Tools"], preview: "ai" },
];

const iconSamples = [
  ["dashboard", "solar:home-angle-bold-duotone", "Solar", "Workspace"],
  ["library", "solar:book-2-bold-duotone", "Solar", "Publishing"],
  ["bookOpen", "solar:book-bookmark-bold-duotone", "Solar", "Reading"],
  ["bookmark", "solar:bookmark-bold-duotone", "Solar", "Reading"],
  ["article", "solar:document-text-bold-duotone", "Solar", "Content"],
  ["audio", "solar:headphones-round-bold-duotone", "Solar", "Media"],
  ["video", "solar:play-circle-bold", "Solar", "Media"],
  ["search", "solar:card-search-bold-duotone", "Solar", "Discovery"],
  ["category", "solar:widget-5-bold-duotone", "Solar", "Discovery"],
  ["tag", "solar:tag-price-bold-duotone", "Solar", "Discovery"],
  ["analytics", "solar:chart-square-bold-duotone", "Solar", "Analytics"],
  ["report", "solar:document-text-bold-duotone", "Solar", "Analytics"],
  ["warehouse", "solar:garage-bold-duotone", "Solar", "Operations"],
  ["cart", "solar:cart-large-2-bold-duotone", "Solar", "Commerce"],
  ["order", "solar:cart-check-bold-duotone", "Solar", "Commerce"],
  ["farm", "solar:home-add-bold-duotone", "Solar", "Farm"],
  ["egg", "aapm:egg-bold-duotone", "Solar", "Farm"],
  ["chicken", "aapm:chicken-bold-duotone", "Solar", "Poultry"],
  ["calculator", "solar:calculator-bold-duotone", "Solar", "Tools"],
  ["user", "solar:user-circle-bold-duotone", "Solar", "Account"],
  ["settings", "solar:settings-bold-duotone", "Solar", "Account"],
  ["login", "solar:login-3-bold", "Solar", "Auth"],
  ["ai", "solar:cpu-bolt-bold-duotone", "Solar", "AI"],
  ["help", "solar:question-circle-bold", "Solar", "Support"],
];

let activeFilter = "all";
let activeTemplate = null;
let previousFocus = null;
let toastTimer = 0;

function readPreference(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}

function writePreference(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* private/file previews can disable storage */ }
}

function iconTag(icon, size = 18) {
  const localIcon = aapmDomainIcons[icon];
  if (localIcon) {
    return `<svg class="catalog-icon-inline" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${localIcon.body}</svg>`;
  }
  return `<iconify-icon icon="${icon}" width="${size}" height="${size}" aria-hidden="true"></iconify-icon>`;
}

function miniChrome(label) {
  return `<div class="catalog-mini-window__top"><span class="catalog-window-dots"><i></i><i></i><i></i></span><span>${label}</span></div>`;
}

function miniPreview(template) {
  if (template.preview === "reader") {
    return `<div class="catalog-mini-window">${miniChrome("reader / chapter-01")}<div class="catalog-mini-reader"><div class="catalog-mini-cover">${iconTag("solar:book-bookmark-bold-duotone", 28)}</div><div class="catalog-mini-reader__copy"><small>CHAPTER 01</small><h4>Memahami flock yang sehat</h4><p>Progress membaca, catatan, dan navigasi bab tetap terlihat.</p><i></i></div></div></div>`;
  }
  if (template.preview === "auth") {
    return `<div class="catalog-mini-window">${miniChrome("academy / sign-in")}<div class="catalog-mini-auth"><div class="catalog-mini-auth__form"><div class="catalog-mini-auth__brand">${iconTag("solar:shield-check-bold-duotone", 15)} AAPM UI</div><div class="catalog-mini-auth__field"></div><div class="catalog-mini-auth__field"></div><div class="catalog-mini-auth__button"></div></div></div></div>`;
  }
  if (template.preview === "ai") {
    return `<div class="catalog-mini-window">${miniChrome("workspace / copilot")}<div class="catalog-mini-ai"><div class="catalog-mini-ai__head"><span class="catalog-mini-ai__avatar">AI</span><span>AI copilot</span></div><div class="catalog-mini-ai__message">Baca konteks halaman dan bantu susun langkah berikutnya.</div><div class="catalog-mini-ai__input"><span>Tanyakan sesuatu...</span><i></i></div></div></div>`;
  }
  const title = template.preview === "library" ? "Ebook library" : template.preview === "operations" ? "Control room" : "Dashboard";
  const first = template.preview === "operations" ? "KPI farm" : template.preview === "library" ? "Terbaru" : "Modul selesai";
  const second = template.preview === "operations" ? "Alert" : template.preview === "library" ? "Bookmark" : "Rata-rata kuis";
  return `<div class="catalog-mini-window">${miniChrome(`app / ${template.category}`)}<div class="catalog-mini-window__body"><div class="catalog-mini-window__rail"><i></i><i class="is-active"></i><i></i><i></i><i></i></div><div class="catalog-mini-window__main"><small>${template.label}</small><h4>${title}</h4><div class="catalog-mini-row"><div class="catalog-mini-block" data-tone="${template.tone}">${iconTag(template.icon, 14)}<strong>${first}</strong><span>${template.preview === "operations" ? "92% live" : "24 item"}</span></div><div class="catalog-mini-block" data-tone="${template.preview === "library" ? "blue" : "orange"}">${iconTag(template.preview === "operations" ? "solar:danger-triangle-bold" : "solar:bookmark-bold-duotone", 14)}<strong>${second}</strong><span>${template.preview === "academy" ? "75% score" : "Lihat semua"}</span></div></div><div class="catalog-mini-line" data-tone="${template.tone}"><i></i></div></div></div></div>`;
}

function renderTemplateCard(template) {
  const tags = template.tags.map((tag) => `<span>${tag}</span>`).join("");
  return `<article class="catalog-template-card" data-template-id="${template.id}" data-category="${template.category}" data-search="${template.title.toLowerCase()} ${template.label.toLowerCase()} ${template.description.toLowerCase()} ${template.tags.join(" ").toLowerCase()}"><div class="catalog-template-card__preview" data-tone="${template.tone}">${miniPreview(template)}</div><div class="catalog-template-card__body"><div class="catalog-template-card__meta"><span class="catalog-template-card__category" data-tone="${template.tone}"><i></i>${template.label}</span><span>Live demo</span></div><h3>${template.title}</h3><p>${template.description}</p><div class="catalog-template-card__footer"><div class="catalog-template-card__tags">${tags}</div><button class="catalog-template-card__demo" type="button" data-demo="${template.id}">Lihat demo</button></div></div></article>`;
}

function renderTemplates() {
  const query = (templateSearch?.value || "").trim().toLowerCase();
  const visible = templates.filter((template) => {
    const matchesFilter = activeFilter === "all" || template.category === activeFilter;
    const haystack = `${template.title} ${template.label} ${template.description} ${template.tags.join(" ")}`.toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });
  if (templateGrid) templateGrid.innerHTML = visible.map(renderTemplateCard).join("");
  if (templateEmpty) templateEmpty.hidden = visible.length !== 0;
  if (templateCount) templateCount.textContent = `${visible.length} template${visible.length === 1 ? "" : "s"}`;
}

function renderIcons() {
  if (!iconGallery) return;
  iconGallery.innerHTML = iconSamples.map(([name, icon, family, area]) => {
    const familyKey = icon.startsWith("aapm:") ? "aapm" : family === "Phosphor" ? "ph" : family === "MingCute" ? "mingcute" : family === "Domain" ? "domain" : "solar";
    return `<div class="catalog-icon-item" data-family="${familyKey}">${iconTag(icon, 20)}<span><strong>${name}</strong><small>${area} · ${family}</small></span></div>`;
  }).join("");
}

function largePreview(template) {
  if (template.preview === "reader") {
    return `<div class="catalog-large-preview"><div class="catalog-large-preview__chrome"><span class="catalog-window-dots"><i></i><i></i><i></i></span><span>reader / chapter-01</span>${iconTag("solar:menu-dots-bold", 17)}</div><div class="catalog-large-reader"><div class="catalog-large-reader__cover">${iconTag("solar:book-bookmark-bold-duotone", 55)}</div><div class="catalog-large-reader__copy"><small>CHAPTER 01 · 12 MIN READ</small><h3>Memahami flock yang sehat</h3><p>Long-form content memakai reading measure yang nyaman, progress yang terlihat, dan tindakan simpan yang tidak mengambil alih bacaan.</p><div class="catalog-large-reader__progress"><i></i></div></div></div></div>`;
  }
  if (template.preview === "auth") {
    return `<div class="catalog-large-preview"><div class="catalog-large-preview__chrome"><span class="catalog-window-dots"><i></i><i></i><i></i></span><span>academy / sign-in</span>${iconTag("solar:menu-dots-bold", 17)}</div><div class="catalog-large-auth"><div class="catalog-large-auth__form"><div class="catalog-large-auth__brand">${iconTag("solar:shield-check-bold-duotone", 22)} AAPM UI</div><small>CONTINUE TO YOUR WORKSPACE</small><div class="catalog-large-auth__field"><span>Email address</span><i></i></div><div class="catalog-large-auth__field"><span>Password</span><i></i></div><div class="catalog-large-auth__button"></div></div></div></div>`;
  }
  if (template.preview === "ai") {
    return `<div class="catalog-large-preview"><div class="catalog-large-preview__chrome"><span class="catalog-window-dots"><i></i><i></i><i></i></span><span>workspace / copilot</span>${iconTag("solar:menu-dots-bold", 17)}</div><div class="catalog-large-ai"><div class="catalog-large-ai__chat"><div class="catalog-large-ai__message"><strong>${iconTag("solar:cpu-bolt-bold-duotone", 17)} AI copilot · context active</strong>Halaman ini sedang berada di Farm KPI. Saya bisa membaca konteks yang tersedia dan membantu menyusun analisis berikutnya.</div><div class="catalog-large-ai__composer"><span>Tanyakan sesuatu tentang halaman ini...</span><i></i></div></div><aside class="catalog-large-ai__context"><strong>Konteks halaman</strong><p>Farm KPI</p><p>3 catatan tersedia</p><p>Tools aktif: kalkulator, riwayat</p></aside></div></div>`;
  }
  const isOperations = template.preview === "operations";
  const isLibrary = template.preview === "library";
  const title = isOperations ? "Operations overview" : isLibrary ? "Ebook library" : "Learning workspace";
  const cards = isOperations ? [["HDP", "92%", "green", "solar:chart-square-bold-duotone"], ["FCR", "1,72", "orange", "solar:calculator-bold-duotone"], ["Alert", "4", "blue", "solar:danger-triangle-bold"]] : isLibrary ? [["Ebook aktif", "24", "orange", "solar:book-2-bold-duotone"], ["Disimpan", "8", "blue", "solar:bookmark-bold-duotone"], ["Selesai", "12", "green", "solar:check-circle-bold"]] : [["Modul selesai", "8/22", "green", "solar:check-circle-bold"], ["Progress", "36%", "orange", "solar:graph-up-bold-duotone"], ["Nilai kuis", "75%", "blue", "solar:target-bold-duotone"]];
  const cardsMarkup = cards.map(([label, value, tone, icon]) => `<div class="catalog-large-card" data-tone="${tone}"><span class="catalog-large-card__icon">${iconTag(icon, 19)}</span><strong>${value}</strong><span>${label}</span></div>`).join("");
  return `<div class="catalog-large-preview"><div class="catalog-large-preview__chrome"><span class="catalog-window-dots"><i></i><i></i><i></i></span><span>workspace / ${template.category}</span>${iconTag("solar:menu-dots-bold", 17)}</div><div class="catalog-large-preview__body"><div class="catalog-large-preview__rail"><i></i><i class="is-active"></i><i></i><i></i><i></i><i></i></div><div class="catalog-large-preview__main"><small>${template.label}</small><h3>${title}</h3><div class="catalog-large-cards">${cardsMarkup}</div><div class="catalog-large-table"><div class="catalog-large-table__row"><span>${isLibrary ? "Title" : isOperations ? "Metric" : "Module"}</span><span>Status</span><span>Progress</span><span>Updated</span></div><div class="catalog-large-table__row"><span>${isLibrary ? "Practical layer management" : isOperations ? "Weekly production" : "Brooding &amp; rearing"}</span><span>Aktif</span><span>72%</span><span>Hari ini</span></div><div class="catalog-large-table__row"><span>${isLibrary ? "Biosecurity field guide" : isOperations ? "Feed conversion" : "Layer management"}</span><span>Review</span><span>38%</span><span>Kemarin</span></div></div></div></div></div>`;
}

function showToast(message) {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function setTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  writePreference("aapm-ui-catalog-theme", dark ? "dark" : "light");
  if (themeMeta) themeMeta.setAttribute("content", dark ? "hsl(220 12% 8%)" : "hsl(0 0% 100%)");
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", dark ? "Aktifkan light mode" : "Aktifkan dark mode");
    themeToggle.setAttribute("title", dark ? "Aktifkan light mode" : "Aktifkan dark mode");
    themeToggle.innerHTML = iconTag(dark ? "solar:sun-2-bold-duotone" : "solar:moon-bold-duotone", 19);
  }
}

function setDensity(density, announce = true) {
  if (catalogRoot) catalogRoot.dataset.density = density;
  writePreference("aapm-ui-catalog-density", density);
  if (densityToggle) densityToggle.setAttribute("title", density === "compact" ? "Gunakan density default" : "Gunakan density compact");
  if (announce) showToast(density === "compact" ? "Density compact aktif." : "Density default aktif.");
}

function openDialog(template) {
  if (!dialog || !dialogPanel || !template) return;
  activeTemplate = template;
  previousFocus = document.activeElement;
  dialogTitle.textContent = template.title;
  dialogDescription.textContent = template.description;
  dialogCategory.innerHTML = `<i></i> ${template.label} · live demo`;
  dialogPreview.innerHTML = largePreview(template);
  dialog.hidden = false;
  document.body.classList.add("catalog-dialog-open");
  dialogPanel.focus();
}

function closeDialog() {
  if (!dialog || dialog.hidden) return;
  dialog.hidden = true;
  document.body.classList.remove("catalog-dialog-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  activeTemplate = null;
}

function trapDialogFocus(event) {
  if (!dialog || dialog.hidden || event.key !== "Tab") return;
  const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

templateSearch?.addEventListener("input", renderTemplates);
document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter || "all";
  document.querySelectorAll("[data-filter]").forEach((item) => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
  renderTemplates();
}));
document.getElementById("clear-filters")?.addEventListener("click", () => { activeFilter = "all"; if (templateSearch) templateSearch.value = ""; document.querySelectorAll("[data-filter]").forEach((item) => { const active = item.dataset.filter === "all"; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); }); renderTemplates(); templateSearch?.focus(); });
templateGrid?.addEventListener("click", (event) => { const button = event.target.closest("[data-demo]"); if (!button) return; openDialog(templates.find((template) => template.id === button.dataset.demo)); });
dialog?.addEventListener("click", (event) => { if (event.target.closest("[data-close-dialog]")) closeDialog(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDialog(); trapDialogFocus(event); });
useTemplateButton?.addEventListener("click", () => { const selectedTemplate = activeTemplate; if (selectedTemplate) { closeDialog(); showToast(`${selectedTemplate.title} siap dijadikan starting point.`); document.getElementById("templates")?.scrollIntoView({ behavior: "smooth", block: "start" }); } });
themeToggle?.addEventListener("click", () => setTheme(document.documentElement.classList.contains("dark") ? "light" : "dark"));
densityToggle?.addEventListener("click", () => setDensity(catalogRoot?.dataset.density === "compact" ? "default" : "compact"));

const savedTheme = readPreference("aapm-ui-catalog-theme");
const savedDensity = readPreference("aapm-ui-catalog-density");
setTheme(savedTheme === "dark" ? "dark" : "light");
setDensity(savedDensity === "compact" ? "compact" : "default", false);
renderTemplates();
renderIcons();
