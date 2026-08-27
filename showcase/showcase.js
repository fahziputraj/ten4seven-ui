(function () {
  const root = document.getElementById("showcase-root");
  const overlay = document.getElementById("mobile-overlay");
  const mobileMenu = document.getElementById("mobile-menu");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const themeToggle = document.getElementById("theme-toggle");
  const densityToggle = document.getElementById("density-toggle");
  const liveRegion = document.getElementById("live-region");

  function setSidebar(open) {
    root.dataset.sidebarOpen = open ? "true" : "false";
    overlay.tabIndex = open ? 0 : -1;
  }

  function notify(title, detail) {
    liveRegion.innerHTML = "";
    const toast = document.createElement("div");
    toast.innerHTML = `<strong>${title}</strong>${detail ? `<br><span>${detail}</span>` : ""}`;
    liveRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 4200);
  }

  mobileMenu?.addEventListener("click", () => setSidebar(true));
  overlay?.addEventListener("click", () => setSidebar(false));
  sidebarToggle?.addEventListener("click", () => {
    const collapsed = root.dataset.sidebarCollapsed === "true";
    root.dataset.sidebarCollapsed = collapsed ? "false" : "true";
    sidebarToggle.setAttribute("aria-label", collapsed ? "Ringkas navigasi" : "Perluas navigasi");
  });
  themeToggle?.addEventListener("click", () => {
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    themeToggle.querySelector("span").textContent = isDark ? "Light" : "Dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "hsl(145 18% 10%)" : "hsl(0 0% 100%)");
    notify(isDark ? "Dark theme aktif" : "Light theme aktif", "Semantic token berganti tanpa mengubah struktur komponen.");
  });
  densityToggle?.addEventListener("click", () => {
    const values = ["default", "compact", "comfortable"];
    const current = root.dataset.density || "default";
    const next = values[(values.indexOf(current) + 1) % values.length];
    root.dataset.density = next;
    densityToggle.querySelector("span").textContent = `Density: ${next}`;
    notify(`Density ${next}`, "Geometry diatur lewat component token, bukan override acak.");
  });
  document.getElementById("toast-preview")?.addEventListener("click", () => notify("Provider tersimpan", "Feedback menggunakan bahasa dan visual AAPM UI."));
  document.getElementById("save-preview")?.addEventListener("click", () => notify("Konfigurasi tersimpan", "Form action selesai dengan aman."));
  document.getElementById("confirm-preview")?.addEventListener("click", () => notify("Draft dihapus", "Confirmation preview selesai."));
  document.querySelectorAll(".showcase-nav-item").forEach((item) => item.addEventListener("click", () => setSidebar(false)));
})();
