import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { explorerProjects } from '../app/data/explorerProjects';
import { explorerDemos } from '../scripts/explorer-demo-config.mjs';

test('directory covers the public inventory with unique, attributed entries', async ({ page }) => {
  expect(explorerProjects).toHaveLength(39);
  expect(new Set(explorerProjects.map(p => p.repo)).size).toBe(39);
  await page.goto('/projects/explore');
  await expect(page.getByRole('status')).toHaveText('39 of 39 repositories');
  await expect(page.locator('article')).toHaveCount(39);
  await page.getByRole('searchbox').fill('Fourier');
  await expect(page.getByRole('status')).toHaveText('1 of 39 repositories');
  await expect(page.locator('article')).toHaveAttribute('id', 'fourierseries');
  await page.getByLabel('Discipline', { exact: true }).selectOption('Software & systems');
  await expect(page.getByRole('heading', { name: 'No matching projects' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page.locator('article')).toHaveCount(39);
});

test('filter URLs survive reload and back navigation without database calls', async ({ page }) => {
  let databaseCalls = 0;
  page.on('request', r => { if (new URL(r.url()).pathname === '/api/data') databaseCalls++; });
  await page.goto('/projects/explore?discipline=Machine+learning&mode=browser');
  await expect(page.locator('article')).toHaveCount(2);
  await page.getByRole('searchbox').fill('Titanic');
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page).toHaveURL(/q=Titanic/);
  await page.reload();
  await expect(page.getByRole('searchbox')).toHaveValue('Titanic');
  await page.getByLabel('How to explore').selectOption('local');
  await expect(page.getByRole('heading', { name: 'No matching projects' })).toBeVisible();
  await page.goBack();
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.getByLabel('How to explore')).toHaveValue('browser');
  expect(databaseCalls).toBe(0);
});

for (const width of [390, 1440]) test(`directory navigation and details remain usable at ${width}px`, async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('/projects/explore?mode=local&q=video');
  await expect(page.getByRole('heading', { level: 2, name: 'Splitframe video studio' })).toBeVisible();
  await page.locator('summary').click();
  await expect(page.getByText(/Every finished clip is checked with FFprobe/)).toBeVisible();
  await expect(page.getByRole('link', { name: /Run locally/ })).toHaveAttribute('href', /TikTok-Video-Creator#readme/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('article')).toHaveCount(39);
  await expect(page.locator('nav[aria-label="Primary"] a[aria-current="page"]')).toHaveText('Projects');
  expect(errors).toEqual([]);
  if (width === 1440) {
    await page.goto('/projects/explore');
    await expect(page.getByRole('status')).toHaveText('39 of 39 repositories');
    await page.screenshot({ path: 'docs/project-directory.png' });
  }
});

test('new demo bundles and preview images match pinned provenance', async ({ request }) => {
  for (const demo of explorerDemos) {
    const root = `/demos/${demo.id}/`;
    const response = await request.get(root + 'provenance.json'); expect(response.ok()).toBe(true);
    const manifest = await response.json();
    expect(manifest.repository).toBe(`https://github.com/Ashwin-Iyer1/${demo.repo}`);
    expect(manifest.workingPreview).toBe(false); expect(manifest.commit).toMatch(/^[a-f0-9]{40}$/);
    for (const [file, digest] of Object.entries(manifest.files)) {
      const response = await request.get(root + file); expect(response.ok(), root + file).toBe(true);
      expect(createHash('sha256').update(await response.body()).digest('hex'), root + file).toBe(digest);
    }
  }
  const response = await request.get('/project-previews/provenance.json');
  for (const image of await response.json()) {
    const response = await request.get('/project-previews/' + image.file); expect(response.ok()).toBe(true);
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(image.sha256);
  }
});

for (const demo of explorerDemos) test(`${demo.id} nested-path demo loads without missing resources`, async ({ page }) => {
  const errors = [], failed = [], external = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  page.on('request', request => { if (/^https?:/.test(request.url()) && new URL(request.url()).hostname !== 'localhost') external.push(request.url()); });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(`/demos/${demo.id}/${demo.entry || 'index.html'}`);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('complementary', { name: 'Project context' })).toBeVisible();
  if (demo.id === 'anagrams') await expect(page.locator('#dictionary')).toContainText('43,117');
  if (demo.id === 'ml-observatory') await expect(page.locator('#scope')).toContainText('179');
  if (demo.id === 'interview') await expect(page.getByRole('link', { name: 'Local AI workflow setup' })).toHaveAttribute('href', /github.com.*#readme/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(errors).toEqual([]); expect(failed).toEqual([]); expect(external).toEqual([]);
});

test('classifier demo preserves its cohort and threshold interactions after packaging', async ({ page }) => {
  await page.goto('/demos/ml-observatory/index.html');
  await expect(page.locator('#scope')).toContainText('179');
  await page.getByLabel('Recorded sex').selectOption('female');
  await page.getByLabel('Passenger class').selectOption('1');
  await expect(page.locator('#scope')).toContainText('15');
  await page.locator('#threshold').fill('1');
  await expect(page.locator('#threshold-value')).toHaveText('1.00');
  await page.getByRole('button', { name: 'Reset view' }).click();
  await expect(page.locator('#scope')).toContainText('179');
});
