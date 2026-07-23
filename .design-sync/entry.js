// Design-system entry for the claude.ai/design import.
//
// This app is a Next.js site, not a published component package, so there is no
// dist/ for the converter to consume. This barrel is the package entry the
// converter bundles: it pulls in the token layer (app/globals.css) ahead of any
// component stylesheet, then re-exports the real components from
// app/components/ under stable names. Nothing here reimplements a component —
// every export is the repo's own module.

import "./ds-fonts.css";
import "../app/globals.css";
// Long-form/MDX prose styling, and the only home of the .image-container /
// .overlay rules CensoredImage needs — that component renders unblurred, i.e.
// wrong, without this stylesheet. Its rules are almost all scoped under
// .half-width-wrapper, so bundling it does not leak into other components.
import "../app/blog/[slug]/page.css";

// The <body> equivalent from app/globals.css, as a component. Used as
// cfg.provider so every preview renders on the dark surface the components
// were designed for, and exported so designs can do the same.
export { default as PageSurface } from "./PageSurface";

export { default as Bar } from "../app/components/Bar";
export { default as BlogList } from "../app/components/BlogList";
// Exported as ClashOfClans, not COC: the converter's discovery filter treats an
// ALL-CAPS export name as an enum/constant and drops it. The spelled-out name
// also reads better to an agent composing with it. Source: app/components/COC.js.
export { default as ClashOfClans } from "../app/components/COC";
export { default as CensoredImage } from "../app/components/CensoredImage";
export { default as Contact } from "../app/components/Contact";
export { default as GetTime } from "../app/components/getTime";
export { default as GetTimeWrapper } from "../app/components/GetTimeWrapper";
export { default as KalshiPositions } from "../app/components/KalshiPositions";
export { default as Links } from "../app/components/Links";
export { default as MiscProj } from "../app/components/MiscProj";
export { default as NameAnim } from "../app/components/NameAnim";
export { default as OuraDashboard } from "../app/components/OuraDashboard";
export { default as ProjectList } from "../app/components/ProjectList";
export { default as Skills } from "../app/components/Skills";
export { default as SongList } from "../app/components/SongList";
export { default as ThemeToggle } from "../app/components/ThemeToggle";
export { default as WorkExperience } from "../app/components/WorkExperience";

// OuraCharts ships fifteen named chart/card components rather than a default
// export. OuraDashboard composes them; each one is also usable on its own with
// literal data, which is how a design should reach for them.
export {
  ActivityChart,
  ReadinessChart,
  SleepChart,
  StressChart,
  SpO2Chart,
  HeartRateChart,
  WorkoutChart,
  ResilienceChart,
  CardioAgeChart,
  VO2MaxChart,
  SleepDetailChart,
  PersonalInfoCard,
  SleepTimeCard,
  RestModeCard,
  SimpleListCard,
} from "../app/components/OuraCharts";
