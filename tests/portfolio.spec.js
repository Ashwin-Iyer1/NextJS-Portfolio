import { test, expect } from "@playwright/test";

const intro = (page) => page.getByRole("status", { name: "Loading portfolio" });
const title = (page) =>
  page.getByRole("heading", { level: 1, name: "Ashwin Iyer." });
const hydrationErrors = new WeakMap();

// Keep private data outside the test runner, traces, and screenshots. These
// unavailable responses also exercise the production error-state contracts.
test.beforeEach(async ({ page }) => {
  const errors = [];
  hydrationErrors.set(page, errors);
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      /hydration|hydrated|server rendered HTML/i.test(message.text())
    ) {
      errors.push(message.text().split("\n")[0]);
    }
  });
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

test.afterEach(async ({ page }) => {
  expect(
    hydrationErrors.get(page),
    "No React hydration errors were logged",
  ).toEqual([]);
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
    await expect(
      page.getByRole("navigation", {
        name: "Primary",
        exact: true,
        includeHidden: true,
      }),
    ).toBeHidden();
    await expect(
      page.getByText("Skip to content", { exact: true }),
    ).toBeHidden();
  } finally {
    releaseScripts();
  }

  await expect(title(page)).toBeVisible({ timeout: 15_000 });
  await expect(intro(page)).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Primary", exact: true }),
  ).toBeVisible();
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

for (const entry of ["home", "projects"]) {
  test(`client navigation from ${entry} never inserts a returning Home splash`, async ({
    page,
  }) => {
    if (entry === "home") {
      await page.goto("/");
      await expect(title(page)).toBeVisible({ timeout: 15_000 });
      await page
        .getByRole("navigation", { name: "Primary", exact: true })
        .getByRole("link", { name: "Projects", exact: true })
        .click();
    } else {
      await page.goto("/projects");
    }
    await expect(
      page.getByRole("heading", { name: "Projects", exact: true }),
    ).toBeVisible();

    // Observe insertions, not only the final page: a timer can remove a splash
    // before an ordinary visibility assertion sees the unwanted first frame.
    await page.evaluate(() => {
      window.__homeNavigationViolations = [];
      const inspect = (element) => {
        if (element.matches("[data-home-intro]")) {
          window.__homeNavigationViolations.push("intro inserted");
        }
        if (
          element.matches("[data-home-content]") &&
          (element.hidden || element.style.display === "none")
        ) {
          window.__homeNavigationViolations.push("home content hidden");
        }
      };
      window.__homeNavigationObserver = new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === "attributes") inspect(record.target);
          for (const node of record.addedNodes) {
            if (!(node instanceof Element)) continue;
            inspect(node);
            node
              .querySelectorAll("[data-home-intro], [data-home-content]")
              .forEach(inspect);
          }
        }
      });
      window.__homeNavigationObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["style", "hidden"],
      });
    });

    await page
      .getByRole("navigation", { name: "Primary", exact: true })
      .getByRole("link", { name: "Home", exact: true })
      .click();
    await expect(title(page)).toBeVisible();
    await expect(intro(page)).toHaveCount(0);
    expect(
      await page.evaluate(() => {
        window.__homeNavigationObserver.disconnect();
        return window.__homeNavigationViolations;
      }),
      "Home stays visible from its first inserted DOM frame",
    ).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`route navigation at ${width}px preserves the header and aligned page widths`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await openReturningVisit(page);
    await page.evaluate(() => document.fonts.ready);
    const navigation = page.getByRole("navigation", {
      name: "Primary",
      exact: true,
    });
    const initialHeader = await navigation.evaluate((element) => {
      window.__persistentHeader = element;
      const rect = (node) => {
        const { x, y, width, height } = node.getBoundingClientRect();
        return { x, y, width, height };
      };
      return [element, ...element.querySelectorAll("a, button")].map(rect);
    });

    for (const [label, path, heading] of [
      ["Projects", "/projects", "Projects"],
      ["About", "/about", "About Me"],
      ["Résumé", "/resume", "Resume"],
      ["Home", "/", "Ashwin Iyer."],
    ]) {
      await navigation.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
      await expect(
        page.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
      await expect(
        navigation.getByRole("link", { name: label, exact: true }),
      ).toHaveAttribute("aria-current", "page");
      const geometry = await navigation.evaluate((element) => {
        const rect = (node) => {
          const { x, y, width, height } = node.getBoundingClientRect();
          return { x, y, width, height };
        };
        const contentEdges = (node) => {
          const box = node.getBoundingClientRect();
          const css = getComputedStyle(node);
          return {
            left: box.left + parseFloat(css.paddingLeft),
            right: box.right - parseFloat(css.paddingRight),
          };
        };
        return {
          sameHeader: element === window.__persistentHeader,
          controls: [element, ...element.querySelectorAll("a, button")].map(
            rect,
          ),
          headerEdges: contentEdges(element.querySelector(".page-shell")),
          pageEdges: contentEdges(document.querySelector("main .page-shell")),
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        };
      });
      expect(geometry.sameHeader, `${label} keeps the existing header`).toBe(
        true,
      );
      expect(geometry.controls).toHaveLength(initialHeader.length);
      geometry.controls.forEach((box, index) => {
        for (const property of ["x", "y", "width", "height"]) {
          expect(
            Math.abs(box[property] - initialHeader[index][property]),
            `${label} header control ${index} keeps its ${property}`,
          ).toBeLessThanOrEqual(1);
        }
      });
      for (const side of ["left", "right"]) {
        expect(
          Math.abs(geometry.headerEdges[side] - geometry.pageEdges[side]),
          `${label} content shares the header's ${side} edge`,
        ).toBeLessThanOrEqual(1);
      }
      expect(geometry.documentWidth).toBeLessThanOrEqual(
        geometry.viewportWidth + 1,
      );
    }
  });
}

test("visitors can replay the signature through automatic completion without remounting data widgets", async ({
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
  await expect(
    page.getByRole("navigation", {
      name: "Primary",
      exact: true,
      includeHidden: true,
    }),
  ).toBeHidden();
  await expect(page.getByText("Skip to content", { exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "Skip intro" })).toHaveCount(0);
  await expect(title(page)).toBeVisible({ timeout: 5_000 });
  await expect(intro(page)).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Primary", exact: true }),
  ).toBeVisible();
  expect(requests).toHaveLength(requestCount);
});

test("Glacier stays fixed despite obsolete accent preferences while themes persist", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (localStorage.getItem("accent") === null) {
      localStorage.setItem("accent", "brass");
    }
  });
  await openReturningVisit(page);
  const activeHome = page
    .getByRole("navigation", { name: "Primary", exact: true })
    .getByRole("link", { name: "Home", exact: true });
  async function expectFixedGlacier(color) {
    await expect(activeHome).toHaveCSS("color", color);
    await expect(
      page.getByRole("radio", { name: /^(Brass|Glacier|Iris)$/ }),
    ).toHaveCount(0);
    await expect(page.locator("[data-accent]")).toHaveCount(0);
  }

  await expectFixedGlacier("rgb(156, 201, 223)");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expectFixedGlacier("rgb(44, 98, 123)");

  await page.evaluate(() => localStorage.setItem("accent", "iris"));
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expectFixedGlacier("rgb(44, 98, 123)");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectFixedGlacier("rgb(156, 201, 223)");
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
      .locator(
        "a:visible, button:visible, input:visible, h1:visible, h2:visible, h3:visible",
      )
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
      page.getByRole("button", { name: "Switch to light theme" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /^Equity factor risk model/ }),
    ).toBeVisible();
    if (width === 390 || width === 1440) {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        animations: "disabled",
        path: test.info().outputPath("home-dark.png"),
      });
      await page.getByRole("button", { name: "Switch to light theme" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await page.screenshot({
        animations: "disabled",
        path: test.info().outputPath("home-light.png"),
      });
      if (width === 390) {
        await page
          .getByRole("heading", { name: "Selected work", exact: true })
          .evaluate((element) => {
            element.scrollIntoView({ behavior: "instant", block: "start" });
          });
        await page.screenshot({
          animations: "disabled",
          path: test.info().outputPath("projects-light.png"),
        });
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "dark",
        );
        await page.screenshot({
          animations: "disabled",
          path: test.info().outputPath("projects-dark.png"),
        });
      }
    }
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
      name: "Let’s connect",
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

const sculpture = (page) =>
  page.getByRole("img", { name: /folded mathematical surface/ });

test("reduced-motion visitors can rotate the visible sculpture with the keyboard", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openReturningVisit(page);
  const artwork = sculpture(page);
  await expect(artwork.locator("svg")).toBeVisible();
  await expect(artwork.locator("canvas")).toHaveCount(0);
  const before = await artwork.screenshot();
  const rotate = page.getByRole("button", {
    name: "Rotate sculpture",
    exact: true,
  });
  await rotate.focus();
  await rotate.press("Enter");
  await expect
    .poll(async () => !(await artwork.screenshot()).equals(before))
    .toBe(true);
  await expect(artwork.locator("svg")).toBeVisible();
  await expect(artwork.locator("canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("WebGL failure preserves a usable sculpture without an uncaught error", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    window.__portfolioWebGLAttempts = 0;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (["webgl", "webgl2", "experimental-webgl"].includes(type)) {
        window.__portfolioWebGLAttempts += 1;
        return null;
      }
      return original.call(this, type, ...args);
    };
  });
  await openReturningVisit(page);
  await expect
    .poll(() => page.evaluate(() => window.__portfolioWebGLAttempts))
    .toBeGreaterThan(0);
  const artwork = sculpture(page);
  await expect(artwork.locator("svg")).toBeVisible();
  const before = await artwork.screenshot();
  await page
    .getByRole("button", { name: "Rotate sculpture", exact: true })
    .press("Space");
  await expect
    .poll(async () => !(await artwork.screenshot()).equals(before))
    .toBe(true);
  await expect(artwork.locator("svg")).toBeVisible();
  expect(errors).toEqual([]);
});

test("WebGL sculpture rotates and restores its fallback after a lost context", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await openReturningVisit(page);
  const supported = await page.evaluate(() => {
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    const available = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return available;
  });
  test.skip(
    !supported,
    "This browser has no WebGL2; the forced-unavailable test covers the fallback.",
  );
  const artwork = sculpture(page);
  const canvas = artwork.locator("canvas");
  await expect(canvas).toHaveCSS("opacity", "1", { timeout: 15_000 });
  await expect(artwork.locator("svg")).toBeHidden();
  let previousFrame;
  await expect
    .poll(async () => {
      const currentFrame = await artwork.screenshot();
      const settled = previousFrame && currentFrame.equals(previousFrame);
      previousFrame = currentFrame;
      return Boolean(settled);
    })
    .toBe(true);
  const before = previousFrame;
  await page
    .getByRole("button", { name: "Rotate sculpture", exact: true })
    .press("Enter");
  await expect
    .poll(async () => !(await artwork.screenshot()).equals(before))
    .toBe(true);

  const contextLost = await canvas.evaluate((element) => {
    const extension = element
      .getContext("webgl2")
      ?.getExtension("WEBGL_lose_context");
    if (!extension) return false;
    extension.loseContext();
    return true;
  });
  expect(
    contextLost,
    "WebGL2 exposes the context-loss simulation extension",
  ).toBe(true);
  await expect(artwork.locator("svg")).toBeVisible();
  await expect(canvas).toHaveCSS("opacity", "0");
  const fallbackBefore = await artwork.screenshot();
  await page
    .getByRole("button", { name: "Rotate sculpture", exact: true })
    .press("Enter");
  await expect
    .poll(async () => !(await artwork.screenshot()).equals(fallbackBefore))
    .toBe(true);
  await expect(artwork.locator("svg")).toBeVisible();
  await expect(canvas).toHaveCSS("opacity", "0");
  expect(errors).toEqual([]);
});
