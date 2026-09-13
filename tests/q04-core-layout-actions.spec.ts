import { expect, test } from "@playwright/test";

const q04Families = [
  {
    components: ["Kbd", "Link"],
    count: 5,
    heading: "Foundations",
    path: "/components/foundations",
  },
  {
    components: ["SpeedDial", "DragHandle"],
    count: 8,
    heading: "Actions",
    path: "/components/actions",
  },
  {
    components: ["Transfer", "ColorPicker", "TagsInput"],
    count: 33,
    heading: "Forms",
    path: "/components/forms",
  },
  {
    components: ["BottomNavigation", "NavigationRail", "TreeView"],
    count: 19,
    heading: "Navigation",
    path: "/components/navigation",
  },
  {
    components: ["Container", "Stack", "SplitPane"],
    count: 12,
    heading: "Layout",
    path: "/components/layout",
  },
  {
    components: ["FilePreview"],
    count: 4,
    heading: "Files",
    path: "/components/files",
  },
] as const;

test.describe("Q04 core layout and actions", () => {
  test("indexes the implemented Q04 contracts in their responsibility families", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ height: 900, width: 1440 });

    for (const family of q04Families) {
      await page.goto(family.path);
      await expect(
        page.locator("h1").filter({ hasText: family.heading }),
      ).toBeVisible();
      await expect(page.locator("[data-component-contract]")).toHaveCount(
        family.count,
      );
      for (const component of family.components) {
        await expect(
          page.locator(`[data-component-contract="${component}"]`),
        ).toHaveCount(1);
      }
    }
  });

  test("keeps the Component Lab proof interactive and keyboard reachable", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-core-layout-actions");

    const proof = page.locator("#component-lab-core-layout-actions");
    await expect(proof).toBeVisible();

    const separator = proof.getByRole("separator", {
      name: "Resize core workspace",
    });
    await separator.focus();
    await expect(separator).toHaveAttribute("aria-valuenow", "54");
    await page.keyboard.press("ArrowRight");
    await expect(separator).toHaveAttribute("aria-valuenow", "56");

    await proof.getByRole("treeitem", { name: "Quality checks" }).click();
    await expect(proof.locator("output")).toContainText("quality selected");

    const available = proof.getByRole("listbox", { name: "Available" });
    await available.getByRole("option", { name: "Ownership" }).click();
    await proof.getByRole("button", { name: "Add" }).click();
    await expect(
      proof.getByRole("listbox", { name: "Selected" }),
    ).toContainText("Ownership");

    await proof.getByRole("button", { name: "Open quick actions" }).click();
    await expect(
      proof.getByRole("menuitem", { name: "Add check" }),
    ).toBeVisible();
    await proof.getByRole("menuitem", { name: "Add check" }).click();
    await expect(proof).toContainText("Add check selected");

    await expect(
      proof.getByRole("navigation", { name: "Core navigation rail" }),
    ).toBeVisible();
    await expect(
      proof.getByRole("navigation", { name: "Core bottom navigation" }),
    ).toBeVisible();
  });

  test("keeps split rails usable at both keyboard bounds and pointer resize", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 768, width: 1024 });
    await page.goto("/component-lab#component-lab-core-layout-actions");

    const proof = page.locator("#component-lab-core-layout-actions");
    const splitPane = proof.locator(".t7-split-pane");
    const separator = proof.getByRole("separator", {
      name: "Resize core workspace",
    });
    await expect(separator).toHaveAttribute("aria-valuemin", "40");
    await expect(separator).toHaveAttribute("aria-valuemax", "60");

    const separatorBox = await separator.boundingBox();
    const splitBox = await splitPane.boundingBox();
    expect(separatorBox).not.toBeNull();
    expect(splitBox).not.toBeNull();
    if (separatorBox && splitBox) {
      await page.mouse.move(
        separatorBox.x + separatorBox.width / 2,
        separatorBox.y + separatorBox.height / 2,
      );
      await page.mouse.down();
      await page.mouse.move(splitBox.x + splitBox.width * 0.58, separatorBox.y);
      await page.mouse.up();
      await expect(separator).toHaveAttribute("aria-valuenow", "58");
    }

    for (const key of ["Home", "End"]) {
      await separator.focus();
      await page.keyboard.press(key);
      await expect(separator).toHaveAttribute(
        "aria-valuenow",
        key === "Home" ? "40" : "60",
      );

      const geometry = await splitPane.evaluate((element) => {
        const panes = [...element.querySelectorAll<HTMLElement>(
          ".t7-split-pane-start, .t7-split-pane-end",
        )];
        const separatorElement = element.querySelector<HTMLElement>(
          ".t7-split-pane-separator",
        );
        return {
          paneOverflow: panes.map((pane) => pane.scrollWidth - pane.clientWidth),
          paneWidths: panes.map((pane) => pane.getBoundingClientRect().width),
          separatorBackground: separatorElement
            ? getComputedStyle(separatorElement).backgroundColor
            : "",
          separatorWidth: separatorElement?.getBoundingClientRect().width ?? 0,
          gripWidth:
            separatorElement
              ?.querySelector<HTMLElement>(".t7-split-pane-grip")
              ?.getBoundingClientRect().width ?? 0,
        };
      });

      expect(geometry.paneWidths.every((width) => width >= 140)).toBe(true);
      expect(geometry.paneOverflow.every((overflow) => overflow <= 1)).toBe(
        true,
      );
      expect(geometry.separatorBackground).toBe("rgba(0, 0, 0, 0)");
      expect(geometry.gripWidth).toBeLessThan(geometry.separatorWidth);
    }
  });

  test("keeps transfer options intrinsic and short Q04 controls bounded", async ({
    page,
  }) => {
    for (const viewport of [
      { height: 900, width: 1440 },
      { height: 768, width: 1024 },
      { height: 1024, width: 768 },
      { height: 844, width: 390 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/component-lab#component-lab-core-layout-actions");

      const proof = page.locator("#component-lab-core-layout-actions");
      const lists = proof.getByRole("listbox");
      for (const index of [0, 1]) {
        const list = lists.nth(index);
        const listBox = await list.boundingBox();
        expect(listBox).not.toBeNull();
        const options = await list.getByRole("option").all();
        const optionBoxes = await Promise.all(
          options.map((option) => option.boundingBox()),
        );
        expect(optionBoxes.every((optionBox) =>
          optionBox && listBox
            ? optionBox.height < listBox.height * 0.75
            : false,
        )).toBe(true);
      }

      const color = await proof.locator(".t7-color-picker").boundingBox();
      const tags = await proof.locator(".t7-tags-input-field").boundingBox();
      const formCard = await proof
        .locator(".component-proof-q04-card")
        .nth(1)
        .locator(".t7-card-content")
        .boundingBox();
      expect(color).not.toBeNull();
      expect(tags).not.toBeNull();
      expect(formCard).not.toBeNull();
      if (color && tags && formCard) {
        expect(color.width).toBeLessThanOrEqual(formCard.width + 1);
        expect(tags.width).toBeLessThanOrEqual(formCard.width + 1);
        if (viewport.width >= 1440) {
          expect(color.width).toBeLessThan(320);
          expect(tags.width).toBeLessThan(320);
        }
      }

      const surfaces = await proof.locator(".component-proof-q04-card").evaluateAll(
        (cards) =>
          cards.map((card) => {
            const style = getComputedStyle(card);
            return {
              shadow: style.boxShadow,
              tone: card.getAttribute("data-tone"),
            };
          }),
      );
      expect(surfaces).toHaveLength(3);
      expect(surfaces.every((surface) => surface.tone === "default")).toBe(
        true,
      );
      expect(surfaces.every((surface) => surface.shadow !== "none")).toBe(
        true,
      );

      const activeOption = proof.locator(
        '.t7-transfer-option[data-active="true"]',
      ).first();
      await expect(activeOption).toBeVisible();
      await expect(activeOption).not.toHaveCSS(
        "background-color",
        "rgb(37, 60, 208)",
      );

      const overflow = await page.evaluate(() => ({
        body: document.body.scrollWidth,
        document: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(overflow.body).toBeLessThanOrEqual(overflow.viewport + 1);
      expect(overflow.document).toBeLessThanOrEqual(overflow.viewport + 1);
    }
  });

  test("renders Confidence range as one visual track with two accessible thumbs", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-forms-feedback");

    const forms = page.locator("#component-lab-forms-feedback");
    const range = forms.locator(".t7-range-slider").filter({
      hasText: "Confidence range",
    });
    const inputs = range.locator('input[type="range"]');
    await expect(inputs).toHaveCount(2);
    await expect(inputs.nth(0)).toHaveAccessibleName("Confidence range minimum");
    await expect(inputs.nth(1)).toHaveAccessibleName("Confidence range maximum");
    await expect(inputs.nth(0)).toHaveValue("22");
    await expect(inputs.nth(1)).toHaveValue("84");
    await expect(range.locator(".t7-range-slider-track")).toHaveCount(1);
    await expect(range.locator(".t7-range-slider-selection")).toHaveCount(1);

    const geometry = await range.evaluate((element) => {
      const track = element.querySelector<HTMLElement>(
        ".t7-range-slider-track",
      );
      const inputBoxes = [...element.querySelectorAll<HTMLInputElement>(
        'input[type="range"]',
      )].map((input) => input.getBoundingClientRect());
      return {
        inputTops: inputBoxes.map((box) => box.top),
        inputHeights: inputBoxes.map((box) => box.height),
        trackHeight: track?.getBoundingClientRect().height ?? 0,
        trackWidth: track?.getBoundingClientRect().width ?? 0,
      };
    });
    expect(Math.abs(geometry.inputTops[0] - geometry.inputTops[1])).toBeLessThanOrEqual(1);
    expect(geometry.inputHeights[0]).toBeGreaterThan(0);
    expect(geometry.inputHeights[1]).toBeGreaterThan(0);
    expect(geometry.trackHeight).toBeGreaterThan(0);
    expect(geometry.trackWidth).toBeGreaterThan(0);

    await inputs.nth(0).focus();
    await page.keyboard.press("ArrowRight");
    await inputs.nth(1).focus();
    await page.keyboard.press("ArrowLeft");
    await expect(inputs.nth(0)).toHaveValue("23");
    await expect(inputs.nth(1)).toHaveValue("83");
  });

  test("keeps the accepted Component Lab section navigation bounded", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await page.goto("/component-lab#component-lab-core-layout-actions");

    const navigation = page.getByRole("navigation", {
      name: "Component Lab sections",
    });
    await expect(navigation).toBeVisible();
    const geometry = await navigation.evaluate((nav) => {
      const links = [
        ...nav.querySelectorAll<HTMLElement>(
          ".t7-section-navigation-desktop a",
        ),
      ];
      const tops = links.map((link) => link.getBoundingClientRect().top);
      return {
        linkTopRange: Math.max(...tops) - Math.min(...tops),
        scrollWidth: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      };
    });
    expect(geometry.linkTopRange).toBeLessThanOrEqual(1);
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.viewport + 1);
  });
});
