# Portfolio refresh

Design notes for the October 8, 2026 refresh. The direction combines expressive typography and visual project previews with a practical reading order: projects, experience, writing, personal activity, and contact.

## References and evidence

| Reference                                      | Evidence checked                                                                                                                                                                                               | Adaptation                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Jesper Landberg](https://jesperlandberg.com/) | The live [Awwwards page](https://www.awwwards.com/sites/jesper-landberg-4) lists Site of the Day on September 29, 2026, plus a Developer Award. It highlights project transitions and a black/white palette.   | Curated featured work, restrained surfaces, and motion around interaction.                            |
| [Gil Huybrecht](https://gilhuybrecht.com/)     | The live [Awwwards page](https://www.awwwards.com/sites/gil-huybrecht) lists Site of the Day on September 21, 2026, plus a Developer Award. Its gallery and dark palette were also inspected on the live site. | Prominent project visuals, compact metadata, and generous space between elements.                     |
| [Brittany Chiang](https://brittanychiang.com/) | The current site was read directly. It includes 2026 writing and reports 6k+ stars and 3k+ forks for its older v4 portfolio; those are site-reported figures, not independently refreshed repository counts.   | Clear professional positioning, scannable experience, project descriptions, and direct résumé access. |

These are current design references with documented recognition, not a ranked popularity survey. The September award dates were verified in the live browser because search results surfaced older cached listings. The typography and colors below are original choices for this portfolio.

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

The home page uses a larger name treatment, visual featured projects, sticky section jump links, and a stronger contact ending. The handwritten splash remains, with skip and replay controls and reduced-motion handling. Theme and accent choices let the same layout take on a warmer or cooler character.

Project art in [`app/components/FeaturedProjects.js`](../app/components/FeaturedProjects.js) illustrates factor decomposition, event volatility, and semantic matching. Its captions identify concept illustrations and schematic curves. These visuals are not product screenshots, measured performance, backtest results, or fabricated metrics; project descriptions and links provide the substantive context.

## Local verification

Run `npm run lint`, `npm run build`, and `npm run test:ui`. On a new machine, install the test browser first with `npx playwright install chromium`.

- All 14 Chromium smoke tests pass: delayed-JavaScript splash-first rendering, repeat visits, reduced motion, replay/skip without refetching widgets, keyboard accent selection and persistence, theme persistence, project destinations/search, unavailable-service retries, sticky anchor clearance, and no-JavaScript content fallback.
- Responsive checks cover 320, 390, 768, and 1440px widths and check for clipped controls as well as document overflow. Desktop/mobile screenshots were reviewed in both themes.
- Local live WakaTime, Oura, Kalshi positions, and Kalshi profile requests returned HTTP 200. The page reported no uncaught browser errors. Automated smoke tests use unavailable responses for the personal-data services to keep their payloads out of test artifacts.
- All three accent text colors exceed 5.9:1 contrast against the light page background and 8.7:1 against the dark background. This is a token-level check, not a whole-site accessibility certification.
- Existing lint warnings for two image elements and build warnings for older AVIF content remain. The npm audit count is unchanged from the starting lockfile (27 advisories); none of the added font or test packages introduces a newly affected package.

This work is local to `design/portfolio-refresh`; it has not been deployed.
