import { expect, test, type Page } from "@playwright/test";

const evidenceDir =
  "C:\\Users\\user\\.codex\\visualizations\\2026\\09\\12\\01a0943c-2d31-7940-8681-dcd1ebde7cd1";

async function rootOverflow(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
}

async function expectStoreReady(page: Page) {
  await expect(
    page.getByRole("heading", { name: "Buku untuk ide yang bertahan" }),
  ).toBeVisible();
  await expect(
    page.getByRole("searchbox", { name: "Cari buku" }),
  ).toBeVisible();
  await expect(page.locator(".ebook-product-card").first()).toBeVisible();
  await expect(page.locator(".t7-public-footer")).toBeVisible();
}

async function openDetail(page: Page, bookId?: string) {
  if (bookId) {
    await page.goto(`/ebook-store?book=${bookId}`);
  } else {
    await page.getByRole("button", { name: "Lihat detail" }).first().click();
  }
  const detail = page.locator("dialog").last();
  await expect(detail).toBeVisible();
  await expect(detail.getByText("Detail penerbitan")).toBeVisible();
  return detail;
}

async function collectRuntimeFaults(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  return { consoleErrors, pageErrors };
}

test.describe("H01C Publishing Store / GetPress-shaped storefront", () => {
  test("renders the public shell, discovery hierarchy, and footer", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store");
    await expectStoreReady(page);

    for (const label of [
      "Beranda",
      "Toko Buku",
      "Jelajahi",
      "Kolaborasi",
      "Penerbitan",
      "Masuk member",
      "Keranjang",
    ]) {
      await expect(
        page.getByText(label, { exact: true }).first(),
      ).toBeVisible();
    }
    await expect(page.getByText("Toko buku", { exact: true })).toBeVisible();
    await expect(
      page.getByText("Penerbitan", { exact: true }).last(),
    ).toBeVisible();
    await expect(
      page.getByText("Bantuan & akun", { exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Masuk member" }).click();
    await expect(page.getByRole("status")).toContainText("Akses akun");
    await page
      .getByRole("button", { name: "Mulai percakapan penerbitan" })
      .click();
    await expect(page.getByRole("status")).toContainText("layanan penerbitan");
    await expect(page).toHaveTitle("ten4seven UI — Publishing Store");
  });

  test("searches, filters, sorts, and exposes a truthful empty state", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store");

    const search = page.getByRole("searchbox", { name: "Cari buku" });
    await search.fill("Akuntansi");
    await expect(page.locator(".ebook-product-card")).toHaveCount(2);

    await search.fill("judul-yang-tidak-ada");
    await expect(
      page.getByText("Tidak ada buku yang sesuai dengan filter ini", {
        exact: true,
      }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Hapus filter katalog" }).click();
    await expect(page.locator(".ebook-product-card")).toHaveCount(8);

    await page
      .getByRole("navigation", { name: "Jelajahi kategori buku" })
      .getByRole("button", { name: "Kesehatan", exact: true })
      .click();
    await expect(page.locator(".ebook-product-card")).toHaveCount(2);

    await page.getByRole("button", { name: "Hapus filter" }).first().click();
    await page.getByRole("button", { name: /Urutkan/ }).click();
    await page.getByRole("option", { name: "Harga terendah" }).click();
    await expect(page.locator(".ebook-product-card").first()).toContainText(
      "Membaca Laporan Keuangan",
    );
  });

  test("supports substantive product detail, format state, preview, metadata, and citation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store");
    const detail = await openDetail(page, "book-04");

    await expect(detail).toContainText("dr. Bagus Santoso");
    await expect(detail).toContainText("978-623-8012-04-9");
    await expect(detail).toContainText("GetPress Publishing");
    await expect(detail).toContainText("Bahasa Indonesia");
    await expect(detail).toContainText("272");
    await expect(detail.locator("fieldset")).toContainText("Format produk");
    await expect(
      detail.getByRole("radio", { name: "Physical Book" }),
    ).toBeChecked();
    await expect(detail.getByRole("radio", { name: "Ebook" })).toBeEnabled();

    const ebookRadio = detail.getByRole("radio", { name: "Ebook" });
    await ebookRadio.evaluate((element) =>
      (element as HTMLInputElement).click(),
    );
    await expect(ebookRadio).toBeChecked();
    await detail.getByRole("button", { name: "Baca cuplikan" }).click();
    await expect(page.getByRole("status")).toContainText("Pratinjau");
    await detail.getByRole("button", { name: "Salin sitasi" }).click();
    await expect(page.getByRole("status")).toContainText("Format sitasi");
    await expect(detail.getByRole("region", { name: /Sitasi/ })).toBeVisible();
  });

  test("keeps external and unavailable acquisition states explicit", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store?book=book-01");
    const externalDetail = page.locator("dialog").last();
    await expect(externalDetail).toContainText("Provider eksternal");
    await expect(
      externalDetail.getByRole("button", { name: "Lihat akses eksternal" }),
    ).toBeVisible();
    await externalDetail
      .getByRole("button", { name: "Lihat akses eksternal" })
      .click();
    await expect(page.getByRole("status")).toContainText("provider eksternal");

    await page.goto("/ebook-store?book=book-03");
    const unavailableDetail = page.locator("dialog").last();
    await expect(
      unavailableDetail.getByRole("radio", { name: "Physical Book" }),
    ).toBeDisabled();
  });

  test("preserves cart quantity, format, removal, and mobile drawer behavior", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store");
    await page
      .getByRole("button", { name: "Tambah ke keranjang" })
      .first()
      .click();
    await expect(page.getByRole("status")).toContainText(
      "ditambahkan ke keranjang",
    );
    await page.getByRole("button", { name: /item di keranjang/ }).click();

    const cart = page.locator('[aria-label="Keranjang"]').last();
    await expect(cart).toContainText("Physical Book");
    await expect(cart.locator(".t7-quantity-value")).toHaveText("1");
    await cart.getByRole("button", { name: /Increase / }).click();
    await expect(cart.locator(".t7-quantity-value")).toHaveText("2");
    await cart.getByRole("button", { name: /Hapus .* dari keranjang/ }).click();
    await expect(cart).toContainText("Keranjang masih kosong");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ebook-store");
    await page
      .getByRole("button", { name: "Tambah ke keranjang" })
      .first()
      .click();
    await page.getByRole("button", { name: /item di keranjang/ }).click();
    const mobileCart = page.getByRole("dialog", { name: "Keranjang" });
    await expect(mobileCart).toBeVisible();
    await expect(mobileCart).toContainText("Physical Book");
    await expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
  });

  test("exposes loading and explicit empty fixture states", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/ebook-store?state=loading");
    await expect(
      page.getByRole("status", { name: "Memuat koleksi buku" }),
    ).toBeVisible();
    await expect(page.locator('[aria-busy="true"]')).toBeVisible();

    await page.goto("/ebook-store?state=empty");
    await expect(
      page.getByText("Tidak ada buku yang sesuai dengan filter ini", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByText("0 judul", { exact: true })).toBeVisible();
  });

  test("moves catalog filtering into the canonical drawer on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ebook-store");
    await expectStoreReady(page);

    await page.getByRole("button", { name: /^Filter/ }).click();
    const filterDrawer = page.locator("dialog").filter({
      hasText: "Filter buku",
    });
    await expect(filterDrawer).toBeVisible();
    await expect(filterDrawer).toContainText("Jelajahi kategori");
    await filterDrawer.getByRole("button", { name: "Lihat hasil" }).click();
    await expect(filterDrawer).not.toBeVisible();
  });

  test("keeps the storefront readable and clean across the required matrix", async ({
    page,
  }) => {
    const viewports = [
      [1440, 900],
      [1024, 768],
      [768, 1024],
      [390, 844],
    ] as const;

    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      const faults = await collectRuntimeFaults(page);
      await page.goto("/ebook-store");
      await expectStoreReady(page);
      await expect(await rootOverflow(page)).toBeLessThanOrEqual(1);
      expect(faults.consoleErrors, `${width}x${height} console`).toEqual([]);
      expect(faults.pageErrors, `${width}x${height} page errors`).toEqual([]);
    }
  });

  test("renders critical storefront content immediately in reduced-motion mode", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ebook-store");
    await expectStoreReady(page);
    await expect(page.locator(".ebook-product-card").first()).toBeVisible();
    const detail = await openDetail(page, "book-04");
    await expect(
      detail
        .getByRole("heading", {
          exact: true,
          name: "Kesehatan Masyarakat di Tingkat Lokal",
        })
        .first(),
    ).toBeVisible();
  });

  test("captures the required H01C browser evidence states", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ebook-store");
    await expectStoreReady(page);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-desktop-catalog.png`,
    });

    await page.goto("/ebook-store?book=book-04");
    await expect(page.locator("dialog").last()).toBeVisible();
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-desktop-detail.png`,
    });

    await page.goto("/ebook-store");
    await page
      .getByRole("button", { name: "Tambah ke keranjang" })
      .first()
      .click();
    await page.getByRole("button", { name: /item di keranjang/ }).click();
    await expect(page.locator('[aria-label="Keranjang"]').last()).toBeVisible();
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-desktop-cart.png`,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ebook-store");
    await expectStoreReady(page);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-mobile-catalog.png`,
    });

    await page.goto("/ebook-store?book=book-04");
    await expect(page.locator("dialog").last()).toBeVisible();
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-mobile-detail.png`,
    });

    await page.goto("/ebook-store");
    await page
      .getByRole("button", { name: "Tambah ke keranjang" })
      .first()
      .click();
    await page.getByRole("button", { name: /item di keranjang/ }).click();
    await expect(page.getByRole("dialog", { name: "Keranjang" })).toBeVisible();
    await page.waitForTimeout(450);
    await page.screenshot({
      path: `${evidenceDir}\\h01c-after-mobile-cart.png`,
    });
  });
});
