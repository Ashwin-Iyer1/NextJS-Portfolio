# design-sync notes — newportfolio

Repo-specific gotchas for future syncs. Read this before re-running anything.

## The big one: this repo is a Next.js app, not a component package

There is no library build and no `dist/`, so the converter cannot consume the
source directly. `.design-sync/build-ds.mjs` **is** the package build
(`cfg.buildCmd`): it bundles `.design-sync/entry.js` (a barrel re-exporting the
real `app/components/*` modules) into `.design-sync/.cache/dist/`, which
`cfg.entry` / `cfg.cssEntry` point at. Always run it before `package-build.mjs`.

- **Output must be CJS, not ESM.** MUI and its dependencies are CommonJS and
  reach React via `require("react")`. In ESM output esbuild compiles a require
  of an *external* module to `__require(...)`, which throws "Dynamic require of
  \"react\" is not supported" at load — that kills the whole IIFE, so every
  component disappears from `window.PortfolioDS` and all 20 previews fail at
  once. CJS output emits a plain `require("react")`, which the converter's own
  React shim resolves. Same failure appeared first via `react-is`.
- **`react-is` must NOT be external** for the same reason (MUI requires it
  through CJS). The bundled 19.2.4 copy shares React 19's element symbols, so it
  agrees with the vendored `window.React`.
- **Components are JSX inside `.js` files**, so the build sets
  `loader: {".js": "jsx"}`. esbuild's default `js` loader rejects that syntax.
- **`next/*` is shimmed**, not bundled: `.design-sync/shims/` replaces
  `next/link`, `next/image`, and `next/navigation`. `usePathname` returns `"/"`,
  so nav components render with no active route — that is the correct
  appearance outside a Next router, not a bug.
- **Public assets are inlined at build time.** Components reference logos as
  site-absolute paths (`/Images/github.webp`) that only Next's static server
  resolves; nothing serves them for a preview card or a rendered design, so they
  rendered as broken-image glyphs. The `inlinePublicAssets` esbuild plugin
  rewrites those string literals to data URIs from `public/`. Add new public
  asset references and they are picked up automatically.

## Component discovery

- `exportedNames` finds nothing (no `.d.ts` anywhere), so **`cfg.componentSrcMap`
  is the component list** — a component missing from it is a component missing
  from the sync. Adding a component to `app/components/` requires an entry there
  AND an export in `.design-sync/entry.js`.
- **`COC` is exported as `ClashOfClans`.** The converter's discovery filter
  (`isComponentName`) drops ALL-CAPS names as enum-like, so `COC` silently
  vanished. The rename lives in `.design-sync/entry.js`; source is still
  `app/components/COC.js`.
- Everything is plain JS with zero types, so **every prop contract in
  `cfg.dtsPropsFor` is hand-written** from the component source. If a component's
  signature changes, that contract does not follow it — update it by hand.
- Grouping comes from `category:` frontmatter in `.design-sync/docs/<Name>.md`,
  not from directory structure (all components live in one flat directory).

## OuraCharts exports fifteen components, not three

`app/components/OuraCharts.js` is one 1100-line file with **fifteen** named
exports (`ActivityChart` … `SimpleListCard`). The first pass of this sync synced
only the three that `OuraDashboard`'s imports made obvious and silently missed
twelve real, prop-driven components. On any sync that follows a change to that
file, re-run `grep -n '^export const' app/components/OuraCharts.js` and reconcile
against `.design-sync/entry.js` — a new chart there will not appear otherwise.

## Live-data components: the fixture harness

`.design-sync/preview-lib/fixtures.tsx` exports `withFixtures(routes, Story)`,
which serves named URL substrings from literal data by swapping `window.fetch`
during the first render and restoring it on unmount. The component is untouched —
it still fetches, parses, formats and lays out; only the responses are supplied.
Used by `KalshiPositions`, `GetTime`, `GetTimeWrapper` and `OuraDashboard`, all
of which otherwise render nothing but a one-line error.

- Routes are matched by `url.includes(...)`, longest key first, so
  `/api/kalshi-profile` is not swallowed by `/api/kalshi`. `OuraDashboard` keys
  off the query string (`type=activity`) since every family shares `/api/oura`.
- Each of those components keeps one un-fixtured cell showing the real error or
  fallback branch, so the card does not misrepresent what happens without an API.
- It lives outside `previews/` deliberately — a stray file in `previews/` would
  be read as a component's preview.

## Styling

- `PageSurface` (`.design-sync/PageSurface.js`) is `cfg.provider`. It is the
  portable equivalent of `<body>` + `<html data-theme>` from `app/globals.css`.
  Three separate defects it fixes, all of which returned the moment it was
  simplified:
  1. The preview card hard-codes `background:#fff` on `<body>`. This DS is
     dark-first (`--text-primary` is near-white), so without the surface every
     card is light text on white — technically "rendering", visually unusable.
  2. `[data-theme]` on `<html>` drives ThemeToggle's sun/moon icon visibility
     (rules live in `Bar.css`).
  3. `globals.css` makes `<body>` a centering flex container, so the mount node
     shrink-wraps. A percentage width then collapses toward zero and **silently
     blanks every visx chart** (`ParentSize` renders nothing below 10px). The
     surface sets its parent's width to `100%` to prevent this. If charts ever
     go blank again, look here first.
- `app/blog/[slug]/page.css` is imported by `entry.js` on purpose: it is the only
  home of the `.image-container` / `.overlay` rules, without which
  **CensoredImage renders completely unblurred** — the opposite of its purpose.
  Its other rules are scoped under `.half-width-wrapper` and do not leak.
- The class vocabulary designs should use is `glass-card` and `section-title`
  (both in `globals.css`), plus the `--*` custom properties.

## Fonts

- Inter is normally self-hosted by `next/font/google` inside the Next build; the
  woff2 files land in gitignored `.next/` and are never committed. Rather than
  depend on a build artifact, `.design-sync/ds-fonts.css` loads Inter from Google
  Fonts — the same origin `globals.css` already uses for Caveat — and defines
  `--font-inter`. This is why `[FONT_REMOTE]` fires; it is expected.

## Known render warns (expected — do not chase)

- `[FONT_REMOTE] "Inter", "Caveat", "Fira Code", "Cascadia Mono", "Roboto Mono"` —
  Inter and Caveat load from Google Fonts by design (above); the three monospace
  families are system-font stacks that were never meant to ship.
- `[RENDER_THIN] NameAnim` — NameAnim paints SVG strokes and no text at all, so
  the text-content heuristic flags it. Confirmed correct from the screenshot.
- `[PROVIDER_UNVERIFIED] PageSurface` — the export-evidence pass cannot enumerate
  a bundled CJS module's re-exports, which is exactly what our CJS dist is. The
  provider does resolve; previews render.
- `[GRID_OVERFLOW]` on the three Oura charts — visx `ParentSize` positions its
  sizer outside the measured cell no matter what wraps it (tried `position:
  relative` and a fixed pixel width; neither helps). Handled with
  `cfg.overrides.<Chart>.cardMode = "single"`. Don't re-litigate.

## Verification tooling

- Playwright + Chromium and `typescript@5` are installed into `.ds-sync/`
  (gitignored) — reinstall on a fresh clone.
- Pin **typescript@5**. TypeScript 7 (the native Go preview) has a different JS
  API; `package-validate.mjs` wraps the whole `.d.ts` check in one broad
  `try/catch`, so a TS7 API error is reported as the misleading
  "typescript not in node_modules" skip.

## Preview authoring judgment calls

- `CensoredImage`'s real use in the repo is a run of **personal gym progress
  photos** (`content/working-out.mdx`). Preview cards are shareable artifacts, so
  the previews use in-repo Clash of Clans artwork instead; the composition is the
  same. Revisit only if the owner wants the real photos shown.
- `NameAnim` has exactly one cell on purpose: `.container` is `height:100vh`, so
  anything placed after it falls below the fold, and a colour variant is
  impossible because `.container` pins colour to `var(--splash-stroke)`.

## Re-sync risks — what can silently go stale

- **Hand-written prop contracts** (`cfg.dtsPropsFor`) do not track the source.
  `OuraDashboard` was already wrong once: its `subset` prop must be an **array**
  (`Array.isArray` guard — a bare string is silently ignored and every endpoint
  is fetched) and `columns` accepts a number as well as a breakpoint object. The
  site's own `app/page.js` is the reference for real usage. Re-read component
  signatures on any sync that follows component changes.
- **`.design-sync/entry.js` is a hand-maintained barrel.** A component added to
  `app/components/` will NOT appear in the DS until it is exported there and
  added to `componentSrcMap`.
- **Live-data components** (`KalshiPositions`, `OuraDashboard`, `GetTime`,
  `SongList`) fetch from `/api/*`, which does not exist in a preview. They render
  their loading/error branches, which is honest but means their cards do not show
  the loaded state. `SongList` is the exception — it falls back to bundled
  `app/data/songs.json` and shows real rows.
- **Remote fonts** mean previews depend on Google Fonts being reachable at render
  time. An offline render silently falls back to system fonts.
- **`.next/` was present** during this sync but is not used by the build — don't
  let a future change start depending on it.
- **Docs can outlive the code they describe.** Three claims in component source
  or comments were wrong and had to be corrected against the actual render:
  `OuraCharts.js` calls its `.oura-seq-*` scale a "monochrome lightness ramp"
  when it is plainly multi-hue; `ClashOfClans` renders its own section title (so
  a wrapper heading duplicates it); and `Contact` is a labelled horizontal tile
  row, not the vertical list it reads like. Trust the screenshot over the
  comment, and re-check `.design-sync/docs/*.md` against fresh captures.
- **Fixture data drifts from the API.** The shapes in `previews/` were derived by
  reading component source, not from a recorded response. If an `/api/*` route's
  payload changes, the previews will keep rendering happily against the old
  shape while the real site breaks.
- **`SleepDetailChart` titles itself inconsistently** — "SLEEP STAGES (HR)" when
  populated, "SLEEP PHASES" when empty. Cosmetic, upstream, left alone.
- **Only partially verified:** light theme. Every preview renders through
  `PageSurface` in its default dark mode; `[data-theme="light"]` token values and
  the light `.oura-seq-*` scale ship but were never captured. Worth a pass if the
  light theme becomes important.
