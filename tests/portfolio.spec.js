import { test, expect } from "@playwright/test";

const intro = (page) => page.getByRole("status", { name: "Loading portfolio" });
const title = (page) =>
  page.getByRole("heading", { level: 1, name: "Ashwin Iyer." });

// Keep private data outside the test runner, traces, and screenshots. These
// unavailable responses also exercise the production error-state contracts.
test.beforeEach(async ({ page }) => {
  await page.route(
    /\/api\/(?:oura|kalshi(?:-profile)?|wakatime)(?:\?|$)/,
    (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ message: "Temporarily unavailable" }),
      }),
  );
});

async function openReturningVisit(page) {
  await page.addInitScript(() => sessionStorage.setItem("loaded", "true"));
  await page.goto("/");
  await expect(title(page)).toBeVisible();
}

test("fresh visits keep the signature visible while JavaScript loads, then reveal the portfolio", async ({
  page,
}) => {
  let releaseScripts;
  const scriptsReady = new Promise((resolve) => {
    releaseScripts = resolve;
  });
  await page.route(/\/_next\/static\/.*\.js(?:\?|$)/, async (route) => {
    await scriptsReady;
    await route.continue();
  });

  try {
    await page.goto("/", { waitUntil: "commit" });
    await expect(intro(page)).toBeVisible();
    await expect(intro(page).locator("svg")).toBeVisible();
    await expect(title(page)).toBeHidden();
  } finally {
    releaseScripts();
  }

  await expect(title(page)).toBeVisible({ timeout: 15_000 });
  await expect(intro(page)).toHaveCount(0);
  await expect
    .poll(() => page.evaluate(() => sessionStorage.getItem("loaded")))
    .toBe("true");

  await page.reload();
  await expect(title(page)).toBeVisible({ timeout: 1_500 });
  await expect(intro(page)).toHaveCount(0);
});

test("reduced motion bypasses the first-visit splash", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(title(page)).toBeVisible({ timeout: 1_500 });
  await expect(intro(page)).toHaveCount(0);
});

test("visitors can replay and skip the signature without remounting data widgets", async ({
  page,
}) => {
  const requests = [];
  page.on("request", (request) => {
    if (/\/api\/(?:oura|kalshi|wakatime)/.test(request.url()))
      requests.push(request.url());
  });
  await openReturningVisit(page);
  await expect(
    page.getByText("Oura data is temporarily unavailable.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Coding stats are temporarily unavailable.", {
      exact: true,
    }),
  ).toBeVisible();
  const requestCount = requests.length;

  await page.getByRole("button", { name: "Replay the intro" }).click();
  await expect(intro(page)).toBeVisible();
  await expect(title(page)).toBeHidden();
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(title(page)).toBeVisible();
  await expect(intro(page)).toHaveCount(0);
  expect(requests).toHaveLength(requestCount);
});

test("accent radios support keyboard selection and persist alongside the theme", async ({
  page,
}) => {
  await openReturningVisit(page);
  await expect(
    page.getByRole("radio", { name: "Brass", exact: true }),
  ).toBeChecked();
  await page.getByRole("radio", { name: "Glacier", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "glacier");
  await page
    .getByRole("radio", { name: "Glacier", exact: true })
    .press("ArrowRight");
  await expect(
    page.getByRole("radio", { name: "Iris", exact: true }),
  ).toBeChecked();
  await expect(page.locator("html")).toHaveAttribute("data-accent", "iris");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Iris", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("data-accent", "iris");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByRole("radio", { name: "Brass", exact: true }).check();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("radio", { name: "Brass", exact: true }),
  ).toBeChecked();
});

test("selected work retains real project destinations and identifies its concept illustrations", async ({
  page,
}) => {
  await openReturningVisit(page);
  const work = page.getByRole("region", { name: "Selected work" });
  const destinations = [
    [
      "Equity factor risk model",
      "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition",
    ],
    [
      "Event-driven equity volatility",
      "https://github.com/ArnMehta11/Equity_Volatility_Strategy",
    ],
    ["NUCoop", "https://nucoop.app/"],
  ];
  for (const [name, href] of destinations) {
    const project = work.getByRole("link", { name: new RegExp(`^${name}`) });
    await expect(project).toHaveAttribute("href", href);
    await expect(project).toHaveAttribute("target", "_blank");
    await expect(project).toHaveAttribute("rel", /noopener/);
    await expect(project).toHaveAccessibleDescription(
      /Concept illustration|Schematic curves/,
    );
  }
});

test("unavailable live widgets keep navigation usable and offer working retry controls", async ({
  page,
}) => {
  await openReturningVisit(page);
  await expect(
    page.getByText("Oura data is temporarily unavailable.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Error: Failed to fetch Kalshi positions", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Coding stats are temporarily unavailable.", {
      exact: true,
    }),
  ).toBeVisible();

  const codingRequest = page.waitForRequest(
    (request) => new URL(request.url()).pathname === "/api/wakatime",
  );
  await page.getByRole("button", { name: "Refresh coding stats" }).click();
  await codingRequest;
  await expect(
    page.getByRole("button", { name: "Refresh coding stats" }),
  ).toBeEnabled();

  const ouraRequest = page.waitForRequest(
    (request) => new URL(request.url()).pathname === "/api/oura",
  );
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await ouraRequest;
  await expect(
    page.getByText("Oura data is temporarily unavailable.", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Primary", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Send an email", exact: true }),
  ).toHaveAttribute("href", "mailto:ashwiniyer06@gmail.com");
});

for (const width of [320, 390, 768, 1440]) {
  test(`home fits ${width}px without horizontal overflow or clipped controls`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await openReturningVisit(page);
    await expect(
      page.getByText("Oura data is temporarily unavailable.", { exact: true }),
    ).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
    const clippedControls = await page
      .locator("a:visible, button:visible, input:visible")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            if (element.classList.contains("skip-link")) return false;
            const box = element.getBoundingClientRect();
            return box.left < -1 || box.right > window.innerWidth + 1;
          })
          .map((element) => ({
            tag: element.tagName,
            label:
              element.getAttribute("aria-label") ||
              element.textContent.trim().slice(0, 70),
          })),
      );
    expect(clippedControls).toEqual([]);
    await expect(
      page.getByRole("radio", { name: "Iris", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Equity factor risk model/ }),
    ).toBeVisible();
  });
}

test("project search narrows the list, explains empty results, and resets", async ({
  page,
}) => {
  await page.goto("/projects");
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await expect(search).toBeVisible();
  await expect(
    page.getByText("Checking for the latest projects…", { exact: true }),
  ).toBeHidden({ timeout: 15_000 });
  const firstName = await page
    .getByRole("heading", { level: 2 })
    .first()
    .textContent();
  await search.fill(firstName);
  await expect(
    page.getByRole("heading", { level: 2, name: firstName, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("1 project");
  await search.fill("no-project-could-match-this-query-59382");
  await expect(
    page.getByRole("heading", { name: "No matching projects" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("0 projects");
  await page
    .getByRole("button", { name: "Reset filters", exact: true })
    .click();
  await expect(search).toHaveValue("");
  await expect(
    page.getByRole("heading", { name: "No matching projects" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { level: 2, name: firstName, exact: true }),
  ).toBeVisible();
});

for (const width of [390, 1440]) {
  test(`section navigation at ${width}px keeps anchor headings readable and resets at the hero`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openReturningVisit(page);
    const navigation = page.getByRole("navigation", {
      name: "On this page",
      exact: true,
    });
    const contact = navigation.getByRole("link", {
      name: "Contact",
      exact: true,
    });
    await contact.click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(contact).toHaveAttribute("aria-current", "location");
    const heading = page.getByRole("heading", {
      name: "Let’s make something interesting.",
      exact: true,
    });
    await expect(heading).toBeInViewport();
    const primaryBox = await page
      .getByRole("navigation", { name: "Primary", exact: true })
      .boundingBox();
    const sectionBox = await navigation.boundingBox();
    const headingBox = await heading.boundingBox();
    expect(primaryBox.y).toBeGreaterThanOrEqual(-1);
    expect(sectionBox.y).toBeGreaterThanOrEqual(
      primaryBox.y + primaryBox.height - 1,
    );
    expect(headingBox.y).toBeGreaterThanOrEqual(
      sectionBox.y + sectionBox.height - 1,
    );

    await page.getByRole("link", { name: "Back to top" }).click();
    await expect(page).toHaveURL(/#top$/);
    await expect(title(page)).toBeInViewport();
    await expect(navigation.locator('[aria-current="location"]')).toHaveCount(
      0,
    );
  });
}

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the splash does not obstruct the server-rendered portfolio", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(title(page)).toBeVisible();
    await expect(intro(page)).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "Primary", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Equity factor risk model/ }),
    ).toHaveAttribute(
      "href",
      "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition",
    );
    await expect(
      page.getByRole("link", { name: "Send an email", exact: true }),
    ).toHaveAttribute("href", "mailto:ashwiniyer06@gmail.com");
  });
});
