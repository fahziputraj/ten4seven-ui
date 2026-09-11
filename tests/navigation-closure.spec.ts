import { expect, test } from "@playwright/test";

type NavigationRoute = {
  accessibleLabel?: string;
  label: string;
  path: string;
};

const navigationGroups: Array<{
  label: string;
  maturity: string;
  routes: NavigationRoute[];
}> = [
  {
    label: "Studio",
    maturity: "PRIMARY",
    routes: [
      { label: "Theme Studio", path: "/theme-studio" },
      { label: "Component Lab", path: "/component-lab" },
    ],
  },
  {
    label: "Library",
    maturity: "PRIMARY",
    routes: [
      { label: "Tokens", path: "/tokens" },
      { label: "Components", path: "/components" },
      { label: "Blocks", path: "/blocks" },
      { label: "Icons", path: "/icons" },
      { label: "Recipes", path: "/recipes" },
    ],
  },
  {
    label: "Reference",
    maturity: "QUALITY_REFERENCE",
    routes: [{ label: "Publishing Store", path: "/ebook-store" }],
  },
  {
    label: "Labs / Proofs",
    maturity: "LAB_PROOF",
    routes: [
      { label: "Operations Tracker", path: "/operations-tracker" },
      { label: "Operational Patterns", path: "/operational-patterns" },
      { label: "ERP Density Reference", path: "/erp-reference" },
      { label: "Public Showcase", path: "/public-showcase" },
      { label: "Farm Synthetic", path: "/farm-synthetic-proof" },
      { label: "Auth · Neutral", path: "/brand-proof/auth-neutral" },
      {
        accessibleLabel: "Auth · AAPM Academy",
        label: "Auth · Academy",
        path: "/brand-proof/auth-aapm-academy",
      },
    ],
  },
];

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function studioNavigation(page: import("@playwright/test").Page) {
  return page.getByRole("navigation", { name: "ten4seven UI navigation" });
}

test("exposes every canonical top-level destination directly", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/theme-studio");

  const navigation = studioNavigation(page);
  for (const group of navigationGroups) {
    const groupNode = navigation.getByRole("group", { name: group.label });
    await expect(groupNode).toBeVisible();
    await expect(groupNode).toHaveAttribute(
      "data-surface-maturity",
      group.maturity,
    );
    for (const route of group.routes) {
      await expect(
        groupNode.getByRole("button", {
          name: route.accessibleLabel ?? route.label,
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        groupNode
          .getByRole("button", {
            name: route.accessibleLabel ?? route.label,
            exact: true,
          })
          .locator(".t7-nav-label"),
      ).toHaveText(route.label);
    }
  }

  await expect(
    navigation.getByRole("group", { name: "References", exact: true }),
  ).toHaveCount(0);
  await expect(
    navigation.getByRole("group", { name: "Adoption Proofs", exact: true }),
  ).toHaveCount(0);

  await expect(
    navigation.getByRole("button", { name: "Library", exact: true }),
  ).toHaveCount(0);
});

test("direct navigation reaches every top-level destination", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });

  for (const group of navigationGroups) {
    for (const route of group.routes) {
      await page.goto("/theme-studio");
      await studioNavigation(page)
        .getByRole("group", { name: group.label })
        .getByRole("button", {
          name: route.accessibleLabel ?? route.label,
          exact: true,
        })
        .click();
      await expect(page).toHaveURL(new RegExp(`${escapeRegExp(route.path)}$`));
    }
  }
});

test("library detail routes keep their parent navigation active", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });

  for (const route of [
    { path: "/components/forms", parent: "Components" },
    { path: "/components/button", parent: "Components" },
    { path: "/blocks/hero-split", parent: "Blocks" },
    { path: "/recipes/cart", parent: "Recipes" },
  ]) {
    await page.goto(route.path);
    const parent = studioNavigation(page).getByRole("button", {
      name: route.parent,
      exact: true,
    });
    await expect(parent).toHaveAttribute("data-active", "true");
    await expect(parent).toHaveAttribute("aria-current", "page");
  }
});

test("desktop route changes keep the active destination inside the sidebar viewport", async ({
  page,
}) => {
  await page.setViewportSize({ height: 420, width: 1440 });
  const directRoutes = [
    { label: "Recipes", path: "/recipes" },
    { label: "Theme Studio", path: "/theme-studio" },
    { label: "Tokens", path: "/tokens" },
  ];

  for (const route of directRoutes) {
    await page.goto(route.path);
    const navigation = studioNavigation(page);
    const activeItem = navigation.getByRole("button", {
      name: route.label,
      exact: true,
    });
    await expect(activeItem).toHaveAttribute("data-active", "true");
    const geometry = await activeItem.evaluate((item) => {
      const container = item.closest<HTMLElement>(".studio-nav-groups");
      if (!container) throw new Error("Sidebar scroll container not found");
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      return {
        itemBottom: itemRect.bottom,
        itemTop: itemRect.top,
        containerBottom: containerRect.bottom,
        containerTop: containerRect.top,
      };
    });
    expect(geometry.itemTop, route.path).toBeGreaterThanOrEqual(
      geometry.containerTop - 1,
    );
    expect(geometry.itemBottom, route.path).toBeLessThanOrEqual(
      geometry.containerBottom + 1,
    );
  }

  await page.goto("/theme-studio");
  const navigation = studioNavigation(page);
  const scrollContainer = navigation;
  for (const route of [
    { label: "Tokens", path: "/tokens" },
    { label: "Recipes", path: "/recipes" },
    { label: "Theme Studio", path: "/theme-studio" },
  ]) {
    await scrollContainer.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await navigation
      .getByRole("button", { name: route.label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${escapeRegExp(route.path)}$`));
    const activeItem = navigation.getByRole("button", {
      name: route.label,
      exact: true,
    });
    await expect(activeItem).toHaveAttribute("data-active", "true");
    const geometry = await activeItem.evaluate((item) => {
      const container = item.closest<HTMLElement>(".studio-nav-groups");
      if (!container) throw new Error("Sidebar scroll container not found");
      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      return {
        itemBottom: itemRect.bottom,
        itemTop: itemRect.top,
        containerBottom: containerRect.bottom,
        containerTop: containerRect.top,
      };
    });
    expect(geometry.itemTop, route.path).toBeGreaterThanOrEqual(
      geometry.containerTop - 1,
    );
    expect(geometry.itemBottom, route.path).toBeLessThanOrEqual(
      geometry.containerBottom + 1,
    );
  }
});

test("mobile navigation keeps all groups reachable without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 375, 390]) {
    await page.setViewportSize({ height: 844, width });
    await page.goto("/theme-studio");
    await page
      .getByRole("button", { name: "Open design system navigation" })
      .click();

    const drawer = page.getByRole("dialog", {
      name: "Design system navigation",
    });
    await expect(drawer).toBeVisible();
    for (const group of navigationGroups) {
      const groupNode = drawer.getByRole("group", { name: group.label });
      await expect(groupNode).toBeVisible();
      await expect(groupNode).toHaveAttribute(
        "data-surface-maturity",
        group.maturity,
      );
      for (const route of group.routes) {
        await expect(
          groupNode.getByRole("button", {
            name: route.accessibleLabel ?? route.label,
            exact: true,
          }),
        ).toBeVisible();
      }
    }

    const geometry = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(geometry.documentWidth).toBeLessThanOrEqual(
      geometry.viewportWidth + 1,
    );
  }
});

test("desktop navigation keeps ordinary labels readable", async ({ page }) => {
  for (const width of [1024, 1440]) {
    await page.setViewportSize({ height: 900, width });
    await page.goto("/theme-studio");

    const academyButton = studioNavigation(page).getByRole("button", {
      name: "Auth · AAPM Academy",
      exact: true,
    });
    await expect(academyButton).toHaveAccessibleName("Auth · AAPM Academy");
    await expect(academyButton.locator(".t7-nav-label")).toHaveText(
      "Auth · Academy",
    );

    const labelGeometry = await studioNavigation(page)
      .locator(".t7-nav-label")
      .evaluateAll((labels) =>
        labels.map((label) => ({
          label: label.textContent,
          clientWidth: label.clientWidth,
          scrollWidth: label.scrollWidth,
        })),
      );
    expect(
      labelGeometry.every(
        ({ clientWidth, scrollWidth }) => scrollWidth <= clientWidth + 1,
      ),
    ).toBe(true);

    await page.goto("/operational-patterns");
    const processLabel = page.getByRole("button", {
      name: "Process workspace",
      exact: true,
    });
    await expect(processLabel).toBeVisible();
    const processGeometry = await processLabel
      .locator(".t7-nav-label")
      .evaluate((label) => ({
        clientWidth: label.clientWidth,
        scrollWidth: label.scrollWidth,
      }));
    expect(processGeometry.scrollWidth).toBeLessThanOrEqual(
      processGeometry.clientWidth + 1,
    );
  }
});

test("product-like proof shells retain a bounded return to Studio", async ({
  page,
}) => {
  await page.goto("/farm-synthetic-proof");
  await expect(
    page.getByText("Synthetic proof · AAPM production adoption unverified", {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to Studio" }).click();
  await expect(page).toHaveURL(/\/theme-studio$/);

  await page.goto("/operational-patterns");
  await page.getByRole("button", { name: "Back to Studio" }).click();
  await expect(page).toHaveURL(/\/theme-studio$/);

  await page.goto("/brand-proof/auth-neutral");
  await expect(
    page.getByRole("link", { name: "Back to Theme Studio" }),
  ).toBeVisible();
});
