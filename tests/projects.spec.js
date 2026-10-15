import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { projects } from "../app/data/projects";

test("published demo files match their committed-source manifests", async ({
  request,
}) => {
  for (const project of projects.filter((project) => project.demo)) {
    const directory = project.demo.replace(/index\.html$/, "");
    const response = await request.get(`${directory}provenance.json`);
    expect(response.ok()).toBe(true);
    const manifest = await response.json();
    expect(manifest.workingPreview, project.slug).toBe(false);
    expect(manifest.commit).toMatch(/^[a-f0-9]{40}$/);
    expect(manifest.repository).toMatch(
      /^https:\/\/github\.com\/Ashwin-Iyer1\//,
    );
    for (const [file, digest] of Object.entries(manifest.files)) {
      const artifact = await request.get(`${directory}${file}`);
      expect(artifact.ok(), `${project.slug}/${file}`).toBe(true);
      expect(
        createHash("sha256")
          .update(await artifact.body())
          .digest("hex"),
        `${project.slug}/${file}`,
      ).toBe(digest);
    }
  }
});

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/api/**", (route) =>
    route.fulfill({
      status: 503,
      json: { message: "Temporarily unavailable" },
    }),
  );
});

for (const width of [390, 1440]) {
  test(`case studies expose source, evidence, and usable navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const project of projects) {
      const response = await page.goto(`/projects/${project.slug}`);
      expect(response.status()).toBe(200);
      await expect(
        page.getByRole("heading", {
          level: 1,
          name: project.title,
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Explore source", exact: false }),
      ).toHaveAttribute("href", project.source);
      await expect(
        page.getByRole("heading", { name: "Scope & limitations", exact: true }),
      ).toBeVisible();
      await expect(
        page
          .getByRole("navigation", { name: "Primary", exact: true })
          .getByRole("link", { name: "Projects", exact: true }),
      ).toHaveAttribute("aria-current", "page");
      if (project.demo)
        await expect(
          page.getByRole("link", { name: "Launch demo", exact: false }),
        ).toHaveAttribute("href", project.demo);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
      await expect(page).toHaveTitle(`${project.title} — Ashwin Iyer`);
      const artworkContrast = await page
        .locator("span")
        .filter({ hasText: /(?:Concept illustration|Schematic curves)$/ })
        .evaluate((caption) => {
          const luminance = (color) => {
            const rgb = color
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((channel) => {
                const value = channel / 255;
                return value <= 0.04045
                  ? value / 12.92
                  : ((value + 0.055) / 1.055) ** 2.4;
              });
            return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
          };
          const foreground = luminance(getComputedStyle(caption).color);
          const background = luminance(
            getComputedStyle(caption.parentElement).backgroundColor,
          );
          return (
            (Math.max(foreground, background) + 0.05) /
            (Math.min(foreground, background) + 0.05)
          );
        });
      expect(
        artworkContrast,
        `${project.slug} artwork captions remain readable outside the homepage`,
      ).toBeGreaterThanOrEqual(4.5);
    }
    expect(errors).toEqual([]);
  });
}

test("project collection works without the old database and combines search with discipline", async ({
  page,
}) => {
  let databaseCalls = 0;
  page.on("request", (request) => {
    if (new URL(request.url()).pathname === "/api/data") databaseCalls++;
  });
  await page.goto("/projects");
  await expect(page.getByRole("status")).toHaveText(
    `${projects.length} projects`,
  );
  await page.getByRole("button", { name: "Quant & data", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("Fourier");
  await expect(page.getByRole("status")).toHaveText("1 project");
  await page
    .getByRole("heading", { name: "Fourier signal lab", exact: true })
    .getByRole("link")
    .click();
  await expect(page).toHaveURL(/\/projects\/fourier-lab$/);
  expect(databaseCalls).toBe(0);
});

test("unknown case studies return a real 404", async ({ page }) => {
  const response = await page.goto("/projects/not-a-real-project");
  expect(response.status()).toBe(404);
});

for (const project of projects.filter((project) => project.demo)) {
  for (const width of [390, 1440]) {
    test(`${project.slug} demo loads at ${width}px without errors or external services`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors = [],
        external = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("request", (request) => {
        if (
          /^https?:/.test(request.url()) &&
          !["localhost", "127.0.0.1"].includes(new URL(request.url()).hostname)
        )
          external.push(request.url());
      });
      const response = await page.goto(project.demo);
      expect(response.status()).toBe(200);
      await page.waitForLoadState("networkidle");
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: "Back to the case study",
          exact: false,
        }),
      ).toHaveAttribute("href", `/projects/${project.slug}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
      expect(external).toEqual([]);
      if (process.env.UPDATE_PROJECT_PREVIEWS === "1" && width === 1440) {
        await page.evaluate(() => document.fonts.ready);
        if (project.slug === "firmware-workbench") {
          await page
            .getByRole("button", { name: "Try a practice file", exact: true })
            .click();
          await page
            .getByRole("button", { name: "Apply example edit", exact: true })
            .click();
          await page
            .getByRole("heading", {
              name: "What actually changed",
              exact: true,
            })
            .scrollIntoViewIfNeeded();
        } else if (project.slug === "row2reach") {
          await page.locator("#compose").scrollIntoViewIfNeeded();
        } else if (project.slug === "oura-visualizer") {
          await page
            .getByRole("heading", { name: "The daily overview.", exact: true })
            .evaluate((element) => element.scrollIntoView({ block: "start" }));
        }
        const output = path.join(
          process.cwd(),
          "public",
          "Images",
          "project-previews",
        );
        await mkdir(output, { recursive: true });
        await page.screenshot({
          path: path.join(output, `${project.slug}.png`),
          animations: "disabled",
        });
      }
    });
  }
}

test("contact studio prevents stale or invalid drafts and exports actual reviewed content", async ({
  page,
}) => {
  await page.goto("/demos/row2reach/index.html");
  await expect(page.locator("#ready")).toHaveText("2");
  await page.getByLabel("Subject", { exact: true }).fill("Hello {Unknown}");
  await expect(
    page.getByRole("button", { name: "Export ready drafts" }),
  ).toBeDisabled();
  await expect(page.locator("#preview")).toContainText("Unknown variable");
  await page.getByLabel("Subject", { exact: true }).fill("Hello {Name}");
  await page.locator("#status").selectOption("issues");
  await expect(page.locator("#contacts button")).toHaveCount(4);
  await page
    .getByLabel("Paste or edit CSV")
    .fill(
      'Name,Email,Role,Organization\nAvery,avery@example.com,Analyst,"Atlas, Inc."',
    );
  await expect(
    page.getByRole("button", { name: "Export ready drafts" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Inspect contacts" }).click();
  await expect(page.locator("#ready")).toHaveText("1");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export ready drafts" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("row2reach-reviewed-drafts.csv");
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const csv = Buffer.concat(chunks).toString("utf8");
  expect(csv).toContain("avery@example.com");
  expect(csv).toContain("Hello Avery");
  expect(csv).toContain("Atlas, Inc.");
  await page.getByLabel("Paste or edit CSV").fill('Name,Email\n"unclosed');
  await page.getByRole("button", { name: "Inspect contacts" }).click();
  await expect(page.getByRole("alert")).toContainText("not closed");
  await expect(
    page.getByRole("button", { name: "Export ready drafts" }),
  ).toBeDisabled();
});
