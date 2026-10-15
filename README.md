This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use Node.js 22.22+ (22.x) or 24.x and install the committed dependency tree:

```bash
npm ci
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses `next/font/local` with self-hosted Fontsource fonts.

## Verification and dependency maintenance

```bash
npm run lint
npm run audit:production
npx playwright install chromium
npm run test:ui:production
```

The production browser suite builds and starts the site, then checks the splash,
navigation, themes, responsive layouts, sculpture, populated Oura charts, MDX
posts and optimized images, Goodreads fallback links, and sitemap. Health and
financial responses use synthetic fixtures or unavailable states; the suite does
not require production credentials. `npm run test:ui` runs against the development
server instead. The site-checks workflow runs these checks on pull requests and
pushes to `main`.

Python data-sync jobs use Python 3.12 and the pinned `requirements.txt`:

```bash
python -m pip install -r requirements.txt
python -m pip check
python -m unittest discover -s tests -v
```

Edit direct Python dependencies in `requirements.in`, then regenerate the lock
with `uv pip compile requirements.in --python-version 3.12 --upgrade --output-file requirements.txt`.
Review npm changes with `npm outdated` and `npm audit`; keep `next`, `@next/mdx`,
`@next/third-parties`, and `eslint-config-next` on the same version, and keep
`react` and `react-dom` aligned. Peer checks are enabled; do not restore
`legacy-peer-deps` to mask incompatible upgrades.

As of October 15, 2026, the full npm audit has six high-severity findings in the
build/lint dependency chain (`next-sitemap`, `eslint-config-next`,
`@next/eslint-plugin-next`, `fast-glob`, `micromatch`, and `braces`). They trace to
[the unpatched braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
`next-sitemap` runs only at build time and is a dev dependency. The production-only
npm audit and the audit of all ten pinned Python packages report zero findings.
Do not use `npm audit fix --force`: its suggested Next ESLint downgrade would
break the framework/config alignment. ESLint stays on 9.39.5 because the current
React, accessibility, and import plugins do not declare ESLint 10 support.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
