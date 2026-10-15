import { test, expect } from "@playwright/test";
import fs from "node:fs";

// Synthetic responses exercise rendering without recording personal health or
// financial data, or requiring production credentials in CI.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/api/**", (route) =>
    route.fulfill({ status: 503, json: { message: "Temporarily unavailable" } }),
  );
});

for (const width of [390, 1440]) {
  test(`populated charts render and refresh at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && /NaN|hydration|invalid|not recognize/i.test(message.text())) {
        errors.push(message.text());
      }
    });
    const now = Date.now();
    const data = [2, 1, 0].map((offset) => ({
      day: new Date(now - offset * 86_400_000).toISOString().slice(0, 10),
      timestamp: new Date(now - (offset + 1) * 3_600_000).toISOString(),
      steps: 5000 + offset * 1000,
      score: 80 + offset,
      bpm: 60 + offset,
      calories: 300 + offset * 10,
      vascular_age: 25 + offset,
      stress_high: 1800,
      recovery_high: 3600,
      spo2_percentage: { average: 98 },
      contributors: {
        deep_sleep: 80, rem_sleep: 85, efficiency: 90, latency: 80,
        restfulness: 80, timing: 90, total_sleep: 85,
        sleep_recovery: 85, stress: 75,
      },
      total_sleep_duration: 25200,
      deep_sleep_duration: 7200,
      rem_sleep_duration: 7200,
      light_sleep_duration: 10800,
      awake_time: 1800,
    }));
    await page.route("**/api/oura?**", (route) => route.fulfill({ json: { data } }));
    await page.goto("/about");
    await expect(page.locator(".oura-chart")).toHaveCount(10);
    for (const chart of await page.locator(".oura-chart").all()) {
      await expect(chart.locator("svg").first()).toBeVisible();
    }
    expect(await page.locator(".oura-chart [d]").evaluateAll((elements) =>
      elements.filter((element) => /NaN|Infinity/.test(element.getAttribute("d"))).length,
    )).toBe(0);
    const request = page.waitForRequest((request) =>
      request.url().includes("/api/oura?type=activity"),
    );
    await page.getByRole("button", { name: "7 days", exact: true }).click();
    await request;
    await expect(page.getByRole("button", { name: "7 days", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".oura-chart")).toHaveCount(10);
    const refresh = page.waitForRequest((request) => request.url().includes("/api/oura?type=activity"));
    await page.getByRole("button", { name: "Refresh Oura data" }).click();
    await refresh;
    await expect(page.locator(".oura-chart")).toHaveCount(10);
    expect(errors).toEqual([]);
  });
}

test("all MDX posts render, optimized images load, and missing posts return 404", async ({ page }) => {
  await page.route("https://www.goodreads.com/review/**", (route) => route.abort());
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const file of fs.readdirSync("content").filter((file) => file.endsWith(".mdx"))) {
    const response = await page.goto(`/blog/${file.slice(0, -4)}`);
    expect(response.status(), file).toBe(200);
    const article = page.locator("article");
    await expect(article.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(article.getByText("Post not found.", { exact: true })).toHaveCount(0);
    const image = article.locator('img[src*="/_next/image"]').first();
    if (await image.count()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
  }
  const missing = await page.goto("/blog/does-not-exist");
  expect(missing.status()).toBe(404);
  expect(errors).toEqual([]);
});

test("Goodreads failure keeps both shelf links usable after a reload", async ({ page }) => {
  await page.route("https://www.goodreads.com/review/**", (route) => route.abort());
  await page.goto("/blog/books");
  for (let visit = 0; visit < 2; visit += 1) {
    await expect(page.getByText("Goodreads couldn’t load right now.", { exact: false })).toHaveCount(2);
    const links = page.getByRole("link", { name: "Full shelf on Goodreads" });
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute("href", /shelf=read$/);
    await expect(links.nth(1)).toHaveAttribute("href", /shelf=to-read$/);
    if (visit === 0) await page.reload();
  }
});

test("sitemap and robots retain the portfolio and blog routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap: https://ashwiniyer.com/sitemap.xml");
  const index = await request.get("/sitemap.xml");
  expect(index.ok()).toBe(true);
  expect(await index.text()).toContain("https://ashwiniyer.com/sitemap-0.xml");
  const sitemap = await request.get("/sitemap-0.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  for (const path of ["/", "/about", "/projects", "/resume", "/blog/books"]) {
    expect(xml).toContain(`<loc>https://ashwiniyer.com${path === "/" ? "" : path}</loc>`);
  }
});
