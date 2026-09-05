import { expect, test, type Page } from "@playwright/test";
import axe from "axe-core";

const viewButtons = [
  "Control tower",
  "Process workspace",
  "Readiness review",
  "Load & route",
  "Receiving",
  "Entity 360",
] as const;

async function openOperationalReference(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.removeItem(
      "ten4seven.playground.runtime-preferences.v1",
    );
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/operational-patterns");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Today’s operational priorities",
    }),
  ).toBeVisible();
}

async function selectOperationalView(page: Page, view: string) {
  const viewport = page.viewportSize();
  if (viewport && viewport.width <= 860) {
    await page
      .getByRole("button", { name: "Open application navigation", exact: true })
      .click();
    const navigation = page.getByRole("navigation", {
      name: "Operational pattern navigation",
    });
    await expect(navigation).toBeVisible();
    await navigation.getByRole("button", { name: view, exact: true }).click();
    return;
  }
  await page.getByRole("button", { name: view, exact: true }).click();
}

async function expectNoDocumentOverflow(page: Page) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

test("operational reference exposes all mature pattern and readiness proofs", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openOperationalReference(page);

  await expect(
    page.getByText("4.6 days", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("table", { name: "Operational exception queue" }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("table", { name: "Operational exception queue" })
      .getByRole("cell", {
        name: "Approve alternate supplier before 10:30",
      }),
  ).toBeVisible();

  await selectOperationalView(page, "Process workspace");
  await expect(
    page.getByRole("heading", { level: 1, name: "Order execution workspace" }),
  ).toBeVisible();
  const kanban = page.getByRole("region", { name: "Operational Kanban" });
  for (const heading of ["Approved", "Loading", "Ready", "Dispatched"]) {
    await expect(
      kanban.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
  }
  await expect(
    page
      .locator(".operational-current-next")
      .getByText("Complete loading", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Activity and audit stream", { exact: true }),
  ).toBeVisible();

  await selectOperationalView(page, "Readiness review");
  await expect(
    page.getByRole("heading", { level: 1, name: "Can this object proceed?" }),
  ).toBeVisible();
  for (const state of ["ready", "blocked", "incomplete"]) {
    await expect(
      page.locator(`[data-readiness-state="${state}"]`),
    ).toBeVisible();
  }
  await expect(
    page.getByRole("list", { name: "Blocked blockers" }),
  ).toContainText("PAYMENT-TERM");
  await expect(
    page.getByText("Readiness is not a human decision", { exact: true }),
  ).toBeVisible();

  await selectOperationalView(page, "Load & route");
  for (const value of ["9,000 kg", "7,300 kg", "1,700 kg", "81%"]) {
    await expect(page.getByText(value, { exact: true }).first()).toBeVisible();
  }
  await expect(
    page.getByRole("list", { name: "Ordered delivery route" }),
  ).toContainText("Stop 2 · ETA 09:10");
  await expect(
    page.getByRole("table", { name: "Vehicle load manifest" }),
  ).toBeVisible();

  await selectOperationalView(page, "Receiving");
  await expect(
    page.getByText("ARRIVED ≠ RECEIVED", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Received · Not yet", { exact: true }),
  ).toBeVisible();
  for (const quantity of [
    "400 units",
    "376 units",
    "373 units",
    "3 units",
    "24 units",
  ]) {
    await expect(
      page.getByText(quantity, { exact: true }).first(),
    ).toBeVisible();
  }
  await expect(page.getByRole("group", { name: "Disposition" })).toBeVisible();

  await selectOperationalView(page, "Entity 360");
  await expect(
    page.getByRole("heading", { level: 2, name: "PT Tani Makmur" }),
  ).toBeVisible();
  await expect(
    page.getByText("Relationship owner · Dimas Pratama"),
  ).toBeVisible();
  await expect(
    page.getByText("Entity activity and audit trail", { exact: true }),
  ).toBeVisible();
  const revision = page.getByRole("region", { name: "RC-3841 field changes" });
  await expect(revision).toBeVisible();
  await expect(
    revision.getByRole("table", { name: "Revision field changes" }),
  ).toBeVisible();
  const revisionTable = revision.getByRole("table", {
    name: "Revision field changes",
  });
  for (const value of [
    "400",
    "376",
    "Needs QA review",
    "Sep 6, 2026",
    "Added",
    "Removed",
  ]) {
    await expect(revisionTable.getByText(value, { exact: true })).toBeVisible();
  }
  for (const value of [
    "Nadia Putri · Warehouse QA",
    "Sep 3, 2026 · 14:28",
    "RC-3841 receiving memo · evidence-2026-09-03-1428",
  ])
    await expect(revision.getByText(value, { exact: true })).toBeVisible();
  const sectionNavigation = page.getByRole("navigation", {
    name: "Entity sections",
  });
  await expect(sectionNavigation).toBeVisible();
  for (const [label, id] of [
    ["Summary", "entity-summary"],
    ["Current work", "entity-current-work"],
    ["Relationship signals", "entity-relationship-signals"],
    ["Revision context", "entity-revision-context"],
    ["Activity & audit", "entity-activity"],
  ] as const) {
    await expect(
      sectionNavigation.getByRole("link", { name: label }).first(),
    ).toHaveAttribute("href", `#${id}`);
  }
  await expect(
    sectionNavigation.getByRole("link", { name: "Summary" }).first(),
  ).toHaveAttribute("aria-current", "location");
  await sectionNavigation
    .getByRole("link", { name: "Revision context" })
    .first()
    .click();
  await expect(page).toHaveURL(/#entity-revision-context$/);
  await expect(
    sectionNavigation.getByRole("link", { name: "Revision context" }).first(),
  ).toHaveAttribute("aria-current", "location");
  await expectNoDocumentOverflow(page);
});

test("revision diff stacks changed facts and keeps provenance readable on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  const revision = page.getByRole("region", { name: "RC-3841 field changes" });
  await expect(revision).toBeVisible();
  const stacked = revision.locator(".t7-revision-diff-stacked");
  await expect(stacked).toBeVisible();
  await expect(
    stacked
      .locator(".t7-revision-diff-stacked-row")
      .first()
      .locator(".t7-revision-diff-stacked-label"),
  ).toHaveCount(4);
  await expect(
    stacked
      .locator(".t7-revision-diff-stacked-row")
      .first()
      .locator(".t7-revision-diff-stacked-label")
      .nth(1),
  ).toHaveText("Before");
  await expect(
    revision.getByText(
      "Three damaged units were isolated during receiving; retain the receipt for QA review.",
      { exact: true },
    ),
  ).toBeVisible();
  await expectNoDocumentOverflow(page);
});

test("revision diff desktop visual keeps changes and provenance together", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  await expect(
    page.getByRole("region", { name: "RC-3841 field changes" }),
  ).toHaveScreenshot("revision-diff-desktop.png", {
    animations: "disabled",
    caret: "hide",
  });
});

test("revision diff mobile visual stacks every field", async ({ page }) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  await expect(
    page.getByRole("region", { name: "RC-3841 field changes" }),
  ).toHaveScreenshot("revision-diff-mobile.png", {
    animations: "disabled",
    caret: "hide",
  });
});

test("section navigation collapses to a keyboard-accessible mobile menu", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  const sectionNavigation = page.getByRole("navigation", {
    name: "Entity sections",
  });
  const desktop = sectionNavigation.locator(".t7-section-navigation-desktop");
  const mobile = sectionNavigation.locator(".t7-section-navigation-mobile");
  await expect(desktop).toBeHidden();
  await expect(mobile).toBeVisible();
  await expect(mobile.locator("summary")).toContainText("Current section");
  await mobile.locator("summary").click();
  await expect
    .poll(() =>
      mobile.evaluate((element) => (element as HTMLDetailsElement).open),
    )
    .toBe(true);
  await mobile.getByRole("link", { name: "Revision context" }).click();
  await expect(page).toHaveURL(/#entity-revision-context$/);
  await expect(mobile.locator("summary")).toContainText("Revision context");
  await expect
    .poll(() =>
      mobile.evaluate((element) => (element as HTMLDetailsElement).open),
    )
    .toBe(false);
  await expectNoDocumentOverflow(page);
});

test("section navigation desktop visual keeps active anchor context", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  await expect(
    page.getByRole("navigation", { name: "Entity sections" }),
  ).toHaveScreenshot("section-navigation-desktop.png", {
    animations: "disabled",
    caret: "hide",
  });
});

test("section navigation mobile visual exposes the compact menu", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Entity 360");

  const sectionNavigation = page.getByRole("navigation", {
    name: "Entity sections",
  });
  await sectionNavigation.locator("summary").click();
  await expect(sectionNavigation).toHaveScreenshot(
    "section-navigation-mobile.png",
    {
      animations: "disabled",
      caret: "hide",
    },
  );
});

test("exception and entity decision drawers dismiss with Escape and restore focus", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openOperationalReference(page);

  const exceptionTrigger = page.getByRole("button", {
    name: "Open EX-260903-07",
  });
  await exceptionTrigger.click();
  const exceptionDialog = page.getByRole("dialog", { name: "EX-260903-07" });
  await expect(exceptionDialog).toBeVisible();
  await expect(exceptionDialog).toContainText("Procurement Lead");
  await page.keyboard.press("Escape");
  await expect(exceptionDialog).toBeHidden();
  await expect(exceptionTrigger).toBeFocused();

  await selectOperationalView(page, "Entity 360");
  const decisionTrigger = page.getByRole("button", { name: "Review decision" });
  await decisionTrigger.click();
  const decisionDialog = page.getByRole("dialog", {
    name: "Supplier decision review",
  });
  await expect(decisionDialog).toBeVisible();
  await expect(decisionDialog).toContainText("Evidence is incomplete");
  await page.keyboard.press("Escape");
  await expect(decisionDialog).toBeHidden();
  await expect(decisionTrigger).toBeFocused();
});

test("receiving decision keeps evidence, reason, owner, and outcome together", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1186 });
  await openOperationalReference(page);
  await selectOperationalView(page, "Receiving");

  const disposition = page.getByRole("group", { name: "Disposition" });
  const recount = disposition.getByRole("radio", { name: /Request recount/ });
  await recount.focus();
  await page.keyboard.press("Space");
  await expect(recount).toBeChecked();
  await page
    .getByRole("textbox", { name: "Decision reason" })
    .fill("Physical count is incomplete; retain the receipt as open.");
  await page.getByRole("button", { name: "Record decision" }).click();

  await expect(
    page.getByText("Request recount recorded in this local fixture."),
  ).toBeVisible();
  await expect(
    page.getByText("No API or production inventory was changed."),
  ).toBeVisible();
  await expectNoDocumentOverflow(page);
});

test("operational views preserve semantic order without horizontal document overflow", async ({
  page,
}) => {
  const viewports = [
    { height: 698, width: 1186 },
    { height: 900, width: 840 },
    { height: 844, width: 390 },
    { height: 800, width: 360 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await openOperationalReference(page);
    for (const view of viewButtons) {
      await selectOperationalView(page, view);
      await expectNoDocumentOverflow(page);
    }
  }
});

test("operational proof has no serious or critical axe violations in key states", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1440 });
  await openOperationalReference(page);
  await page.addScriptTag({ content: axe.source });

  for (const view of [
    "Control tower",
    "Readiness review",
    "Receiving",
    "Entity 360",
  ] as const) {
    await selectOperationalView(page, view);
    const result = await page.evaluate(async () =>
      // @ts-expect-error injected by axe-core for this isolated audit
      window.axe.run(document),
    );
    expect(
      result.violations.filter((violation: { impact: string | null }) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
  }
});

test("operational views honor persisted dark, compact, high-contrast, reduced-motion preferences", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("ten4seven.playground.theme.v1");
    window.localStorage.setItem(
      "ten4seven.playground.runtime-preferences.v1",
      JSON.stringify({
        appearance: "dark",
        contrast: "more",
        density: "compact",
        motion: "reduced",
      }),
    );
  });
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { height: 900, width: 1440 },
    { height: 844, width: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/operational-patterns");

    const provider = page.locator(".t7-provider");
    await expect(provider).toHaveAttribute("data-t7-mode", "dark");
    await expect(provider).toHaveAttribute("data-t7-density", "compact");
    await expect(provider).toHaveAttribute("data-t7-contrast", "more");
    await expect(provider).toHaveAttribute(
      "data-t7-motion-preference",
      "reduced",
    );

    for (const view of viewButtons) {
      await selectOperationalView(page, view);
      await expectNoDocumentOverflow(page);
    }
  }

  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/operational-patterns");
  await expect(page).toHaveScreenshot("operational-control-tower-dark.png", {
    animations: "disabled",
    caret: "hide",
    fullPage: false,
  });
});

test("receiving recipe exposes bounded selection guidance and its reference", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1186 });
  await page.goto("/recipes/receiving-console");

  await expect(
    page.getByRole("heading", { level: 1, name: "Receiving Console" }),
  ).toBeVisible();
  for (const heading of [
    "Use and avoid",
    "Operational semantics",
    "Responsive behavior",
    "Accessibility and AI guidance",
  ]) {
    await expect(
      page.getByRole("heading", { level: 2, name: heading }),
    ).toBeVisible();
  }

  const reference = page.getByRole("link", {
    name: "AAPM Operational Reference",
  });
  await expect(reference).toHaveAttribute("href", "/operational-patterns");
  await expect(
    page.getByText("ARRIVED is not RECEIVED", { exact: true }),
  ).toBeVisible();
  await expectNoDocumentOverflow(page);
});

test("readiness recipe exposes the evaluated-result boundary", async ({
  page,
}) => {
  await page.setViewportSize({ height: 900, width: 1186 });
  await page.goto("/recipes/readiness-review");

  await expect(
    page.getByRole("heading", { level: 1, name: "Readiness Review" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Explicit consumer-supplied result such as READY, BLOCKED, INCOMPLETE, or UNKNOWN",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText(/choose Decision Workspace when a human must decide/),
  ).toBeVisible();
  const reference = page.getByRole("link", {
    name: "AAPM Operational Reference",
  });
  await expect(reference).toHaveAttribute("href", "/operational-patterns");
  await expectNoDocumentOverflow(page);
});

const batchTwoRecipeProofs = [
  {
    id: "operational-kanban",
    title: "Operational Kanban",
    semantic: "Object identity",
    guidance: /Choose Operational Kanban for many work items awaiting people/,
  },
  {
    id: "exception-queue",
    title: "Exception Queue",
    semantic: "Exception category",
    guidance:
      /Choose Exception Queue when attention work is the primary collection/,
  },
  {
    id: "control-tower",
    title: "Control Tower",
    semantic: "Exception severity and plain-language reason",
    guidance:
      /Choose Control Tower when the user needs an operational overview whose hierarchy begins with exceptions/,
  },
] as const;

for (const recipe of batchTwoRecipeProofs) {
  test(`${recipe.id} recipe exposes its canonical operational contract`, async ({
    page,
  }) => {
    await page.setViewportSize({ height: 900, width: 1186 });
    await page.goto(`/recipes/${recipe.id}`);

    await expect(
      page.getByRole("heading", { level: 1, name: recipe.title }),
    ).toBeVisible();
    await expect(
      page.getByText(recipe.semantic, { exact: true }),
    ).toBeVisible();
    await expect(page.getByText(recipe.guidance)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "AAPM Operational Reference" }),
    ).toHaveAttribute("href", "/operational-patterns");
    await expectNoDocumentOverflow(page);
  });
}

const visualViews = [
  { button: "Control tower", name: "control-tower" },
  { button: "Process workspace", name: "process-workspace" },
  { button: "Readiness review", name: "readiness-review" },
  { button: "Load & route", name: "load-route" },
  { button: "Receiving", name: "receiving" },
  { button: "Entity 360", name: "entity-360" },
] as const;

for (const view of visualViews) {
  test(`operational ${view.name} desktop visual`, async ({ page }) => {
    await page.setViewportSize({ height: 900, width: 1440 });
    await openOperationalReference(page);
    await selectOperationalView(page, view.button);
    await expect(page.locator(".operational-workspace")).toBeVisible();
    await expect(page).toHaveScreenshot(
      `operational-${view.name}-desktop.png`,
      {
        animations: "disabled",
        caret: "hide",
        fullPage: false,
      },
    );
  });
}

for (const view of [
  { button: "Control tower", name: "control-tower" },
  { button: "Readiness review", name: "readiness-review" },
  { button: "Load & route", name: "load-route" },
  { button: "Receiving", name: "receiving" },
] as const) {
  test(`operational ${view.name} mobile visual`, async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await openOperationalReference(page);
    await selectOperationalView(page, view.button);
    await expectNoDocumentOverflow(page);
    await expect(page).toHaveScreenshot(`operational-${view.name}-mobile.png`, {
      animations: "disabled",
      caret: "hide",
      fullPage: false,
    });
  });
}
