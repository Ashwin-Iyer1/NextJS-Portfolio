# Portfolio refresh

Design notes for the October 8, 2026 refresh. The current direction combines oversized typography and large visual compositions with a practical reading order: projects, experience, writing, personal activity, and contact.

## References and evidence

| Reference                                      | Evidence checked                                                                                                                                                                                               | Adaptation                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Jesper Landberg](https://jesperlandberg.com/) | The live [Awwwards page](https://www.awwwards.com/sites/jesper-landberg-4) lists Site of the Day on September 29, 2026, plus a Developer Award. It highlights project transitions and a black/white palette.   | Curated featured work, restrained surfaces, and motion around interaction.                            |
| [Gil Huybrecht](https://gilhuybrecht.com/)     | The live [Awwwards page](https://www.awwwards.com/sites/gil-huybrecht) lists Site of the Day on September 21, 2026, plus a Developer Award. Its gallery and dark palette were also inspected on the live site. | Prominent project visuals, compact metadata, and generous space between elements.                     |
| [Brittany Chiang](https://brittanychiang.com/) | The current site was read directly. It includes 2026 writing and reports 6k+ stars and 3k+ forks for its older v4 portfolio; those are site-reported figures, not independently refreshed repository counts.   | Clear professional positioning, scannable experience, project descriptions, and direct résumé access. |

These are current design references with documented recognition, not a ranked popularity survey. The September award dates were verified in the live browser because search results surfaced older cached listings. The typography and colors below are original choices for this portfolio.

## User-selected references: scale and imagery

| Reference and sources                                                                                                                                                                               | Observed choices                                                                                                                                                                                               | Direction for this portfolio                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ERA Residence — [live site](https://www.era-residence.com/), [Awwwards](https://www.awwwards.com/sites/era-residence)                                                                               | Enormous narrow serif lettering over full-viewport blue-sky architecture, overlapping script, small supporting labels, and a scroll-linked image reveal. Inspected live in Chrome.                             | Strong display-to-body scale contrast, a distinct handwritten counterpoint, and a large atmospheric blue visual.                                                                                  |
| Lama Lama — [site linked by Awwwards](https://lamalama.com/), [Awwwards](https://www.awwwards.com/sites/lama-lama-2), [desktop reference](https://www.awwwards.com/inspiration/desktop-lama-lama-1) | Cinematic abstract imagery, tightly set bold uppercase headlines, compact supporting copy, and small floating navigation. Awwwards also documents logo-intro and content-morph animations.                     | A dominant visual per composition, large project headlines, and quiet metadata. The live domain returned a DNS error during research; observations come from Awwwards screenshots and recordings. |
| Floema — [live site](https://floema.com/en), [Awwwards](https://www.awwwards.com/sites/floema)                                                                                                      | Oversized rounded Zimula headline, floating photographic fragments, then full-viewport photography with overlaid headlines. Palette: `#E9E778` / `#241F21`. Inspected live in Chrome.                          | A bold stacked name and generous artwork within a compact project grid.                                                                                                                 |
| Oryzo — [live site](https://oryzo.ai/), [Awwwards](https://www.awwwards.com/sites/oryzo-ai)                                                                                                         | Huge heavy wordmark over a full-bleed 3D desk; scrolling isolates the coaster against a dark background. Halyard Display Variable supports the copy. Palette: `#100904` / `#FF8539`. Inspected live in Chrome. | One original sculptural focal point with depth and restrained movement, followed by clear content.                                                                                                |

These references inform scale, composition, and pacing. The portfolio retains its Bricolage/Manrope typography and blue-default palette; the reference fonts, photographs, and 3D assets are not incorporated.

## Typography

- **Bricolage Grotesque:** display type and headings. Its distinctive shapes give the large name treatment personality. [Designer source and OFL license](https://github.com/ateliertriay/bricolage).
- **Manrope:** body copy, controls, and supporting information. This uses the Google Fonts/Fontsource version, not the designer's separately distributed Manrope V5. [Google Fonts description](https://github.com/google/fonts/blob/main/ofl/manrope/DESCRIPTION.en_us.html) and [OFL license](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt).
- **Caveat 700:** retained for the navigation signature. The splash keeps its original hand-drawn SVG.

All three fonts are installed through npm and self-hosted with `next/font/local`. Change the font files and CSS-variable bindings in [`app/layout.js`](../app/layout.js); change their usage in [`app/globals.css`](../app/globals.css). The variables are `--font-display`, `--font-body`, and `--font-signature`.

## Color

The dark theme uses charcoal `#151b1d` with paper-colored text `#edf0e9`. The light theme uses paper `#f1f3ee` with ink `#1b2628`. Glacier blue is the default accent; the appearance control also offers Brass and Iris. Returning visitors retain their saved accent choice.

| Accent  | Dark theme | Light theme on `#f1f3ee` |
| ------- | ---------- | ------------------------ |
| Brass   | `#ddbd80`  | `#785719`                |
| Glacier | `#9cc9df`  | `#2c627b`                |
| Iris    | `#bcb0e8`  | `#685096`                |

The light theme uses darker accent equivalents to preserve readable contrast. Edit theme tokens and `data-accent` overrides in [`app/globals.css`](../app/globals.css). Accent names and selection controls live in [`app/components/AccentPicker.js`](../app/components/AccentPicker.js); [`app/layout.js`](../app/layout.js) restores the saved selection before paint.

## Presentation choices

The current visual direction uses an oversized, stacked Bricolage name; a large original procedural blue folded surface in the hero; a compact project grid with three columns on desktop, two on tablets, and one on phones; and a large “Let's connect” ending. The existing hero details and contact content remain part of the composition. The folded surface uses Three.js as progressive enhancement, with an SVG fallback so the visual does not depend on WebGL. It is decorative artwork, not a scientific plot or a representation of project results. Pointer movement tilts it; the Rotate sculpture button provides the same exploration by keyboard. Rendering stops after settling, when offscreen, and when the tab is hidden. Reduced-motion users get a static SVG that changes discretely on rotation. Context loss also restores the SVG, and the renderer disposes its GPU resources on cleanup.

Sticky section jump links preserve quick access through the larger sections. The handwritten splash remains, with skip and replay controls and reduced-motion handling. Theme and accent choices let the same layout take on a warmer or cooler character.

Project art in [`app/components/FeaturedProjects.js`](../app/components/FeaturedProjects.js) illustrates factor decomposition, event volatility, and semantic matching. Its captions identify concept illustrations and schematic curves. These visuals are not product screenshots, measured performance, backtest results, or fabricated metrics; project descriptions and links provide the substantive context.

## Local verification

Run `npm run lint`, `npm run build`, and `npm run test:ui`. On a new machine, install the test browser first with `npx playwright install chromium`.

- All 17 Chromium smoke tests pass: delayed-JavaScript splash-first rendering, repeat visits, reduced motion, replay/skip without refetching widgets, keyboard accent selection and persistence, theme persistence, project destinations/search, unavailable-service retries, sticky anchor clearance, no-JavaScript content fallback, keyboard sculpture rotation, reduced-motion sculpture rendering, unavailable WebGL, and WebGL context loss.
- Responsive checks cover 320, 390, 768, and 1440px widths and check for clipped headings and controls as well as document overflow. Every browser test also checks for React hydration errors. Desktop/mobile screenshots were reviewed in both themes.
- Local live WakaTime, Oura, Kalshi positions, and Kalshi profile requests returned HTTP 200. The page reported no uncaught browser errors. Automated smoke tests use unavailable responses for the personal-data services to keep their payloads out of test artifacts.
- All three accent text colors exceed 5.9:1 contrast against the light page background and 8.7:1 against the dark background. This is a token-level check, not a whole-site accessibility certification.
- Existing lint warnings for two image elements and build warnings for older AVIF content remain. The npm audit count is unchanged from the starting lockfile (27 advisories); the added font, test, and Three.js packages do not increase the advisory count.

This work is local to `design/portfolio-refresh`; it has not been deployed.
