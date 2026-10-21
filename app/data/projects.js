// Public, source-backed project stories. Private repositories and personal data
// deliberately do not enter this registry or the generated site.
import { additionalProjects } from "./additionalProjects";

const coreProjects = [
  {
    slug: "factor-risk",
    title: "Equity factor risk model",
    shortTitle: "Factor Risk",
    category: "Quantitative research",
    discipline: "Quant & data",
    kicker: "Understand what drives a portfolio.",
    description:
      "A 15-factor equity risk model, brought out of the notebook and into an interactive portfolio workbench.",
    tags: ["Python", "TypeScript", "Risk models"],
    source: "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition",
    demo: "/demos/factor-risk/index.html",
    demoLabel: "Open risk workbench",
    demoNote:
      "Runs locally in your browser against a saved model fitted on August 7, 2026. No account or market-data key required.",
    role: "Personal research & implementation",
    status: "Interactive research tool",
    facts: [
      { value: "503", label: "stocks in the saved model" },
      { value: "15", label: "sector + style factors" },
      { value: "2026-08-07", label: "model fit date" },
    ],
    problem:
      "A portfolio can look diversified by ticker while remaining concentrated in the same sources of risk. A list of holdings does not explain how sector exposure, style exposure, and stock-specific risk combine.",
    solution:
      "I built a factor model that separates those drivers, then made the saved model explorable without a Python environment. Edit positions, compare portfolios, and inspect the contribution of each factor to total variance.",
    workflow: [
      "Start with a sample portfolio or enter holdings and weights.",
      "Inspect annualized risk, factor exposures, and signed risk contributions.",
      "Change the allocation, compare it with a baseline, and export the analysis.",
    ],
    architecture: [
      {
        title: "Estimate",
        detail:
          "Python builds 11 sector exposures and four style factors: Beta, Momentum, Size, and residual volatility.",
      },
      {
        title: "Persist",
        detail:
          "The fitted exposure matrix, factor covariance, and specific variances are saved as portable CSV and JSON artifacts.",
      },
      {
        title: "Analyze",
        detail:
          "The browser evaluates the same covariance decomposition for the entered holdings. The saved fit date stays visible.",
      },
      {
        title: "Explain",
        detail:
          "Attribution separates common-factor risk from stock-specific risk and keeps negative contributions visible.",
      },
    ],
    decisions: [
      {
        title: "Explain risk through a smaller model",
        detail:
          "The model represents asset covariance as B F Bᵀ + D. It makes portfolio risk interpretable through common factors and a stock-specific remainder.",
      },
      {
        title: "Use different memories for volatility and correlation",
        detail:
          "EWMA uses an 84-day volatility half-life and a 504-day correlation half-life, with Newey–West adjustments and a positive-semidefinite repair.",
      },
      {
        title: "Preserve portfolio intent",
        detail:
          "Weights represent fractions of net asset value. Short positions and leverage are meaningful inputs; the interface must not silently normalize them away.",
      },
    ],
    evidence: [
      {
        label: "Saved model metadata",
        href: "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition/blob/main/BinaryClassification/model/meta.json",
        detail:
          "503 names, 1,937 observations, 252-day annualization, and the exact covariance settings.",
      },
      {
        label: "Python risk engine",
        href: "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition/blob/main/BinaryClassification/risk_model.py",
        detail:
          "The reference implementation for exposures, covariance, decomposition, and thematic factors.",
      },
    ],
    limitations:
      "This is a dated research snapshot, not a live risk feed or a return forecast. The universe uses current index constituents, raw-close returns have corporate-action limitations, and Size is a dollar-volume proxy. The demo uses the fitted base factors; it does not refit the model or run the repository’s separate forecasting experiments.",
  },
  {
    slug: "nucoop",
    title: "NUCoop",
    shortTitle: "NUCoop",
    category: "Applied machine learning",
    discipline: "Engineering & AI",
    kicker: "Make the job search explain itself.",
    description:
      "A browser extension that helps students explore co-op roles with transparent skill matching and optional on-device semantic scoring.",
    tags: ["JavaScript", "ONNX", "Browser extensions"],
    source:
      "https://github.com/Ashwin-Iyer1/NUWorks-Co-op-grader/tree/chrome-extension",
    live: "https://nucoop.app/",
    demo: "https://fine-tuned-resume-grading-model.vercel.app/",
    demoLabel: "Try the matching demo",
    demoNote:
      "Fictional jobs and sample résumés run through the extension’s keyword matcher. This demo does not load the optional semantic model or connect to NUWorks.",
    role: "Personal product & implementation",
    status: "Browser extension + interactive demo",
    facts: [
      { value: "Local", label: "résumé parsing & inference" },
      { value: "2 layers", label: "eligibility + relevance" },
      { value: "Opt-in", label: "semantic model download" },
    ],
    problem:
      "Students face a long list of co-op postings with different eligibility rules and inconsistent wording. A relevance score is only useful if the student can see why a role matches and what is missing.",
    solution:
      "I built an extension that adds scoring and a full-page Job Explorer to NUWorks. It separates eligibility from relevance, shows matched and missing skills, and keeps the search usable while optional semantic inference runs in the background.",
    workflow: [
      "Choose a sample résumé or edit its skills and experience.",
      "Filter fictional roles and inspect the matcher’s evidence for each score.",
      "Compare promising roles, build a shortlist, and export it.",
    ],
    architecture: [
      {
        title: "Read locally",
        detail:
          "The extension extracts résumé text with pdf.js and reads job postings in the user’s existing NUWorks session.",
      },
      {
        title: "Check eligibility",
        detail:
          "Server-provided eligibility takes priority. A local rules engine provides a fallback for class and graduation requirements.",
      },
      {
        title: "Score & explain",
        detail:
          "Skills, aliases, directional implied skills, required/preferred weighting, and keyword overlap produce an explainable match.",
      },
      {
        title: "Refine optionally",
        detail:
          "Transformers.js and ONNX run semantic inference in a Web Worker. Keyword results remain available while it works.",
      },
    ],
    decisions: [
      {
        title: "Keep eligibility separate from similarity",
        detail:
          "Text can be semantically similar while a hard requirement is unmet. Eligibility and visible skill evidence keep a high relevance score from disguising that distinction.",
      },
      {
        title: "Make inference an explicit choice",
        detail:
          "The semantic model is an opt-in download. Résumé and job text are processed on the device; the base search does not depend on model availability.",
      },
      {
        title: "Show the ingredients",
        detail:
          "The extension exposes keyword and AI scores separately and lets the user adjust their blend. The public demo isolates the keyword engine so it is quick to try and easy to inspect.",
      },
    ],
    evidence: [
      {
        label: "Extension architecture & model notes",
        href: "https://github.com/Ashwin-Iyer1/NUWorks-Co-op-grader/blob/chrome-extension/README.md",
        detail:
          "Documents inference, calibration, privacy boundaries, and the Job Explorer workflow.",
      },
      {
        label: "Explainable matching engine",
        href: "https://github.com/Ashwin-Iyer1/NUWorks-Co-op-grader/blob/chrome-extension/src/matcher.js",
        detail:
          "The eligibility and lexical matching implementation used by the extension.",
      },
    ],
    limitations:
      "Match scores are relevance signals, not probabilities of getting hired. Semantic similarity can miss seniority, negation, and hard requirements. The production extension requires an authorized NUWorks session. Demo employers, roles, and résumé profiles are fictional; no live application is submitted.",
  },
  {
    slug: "firmware-workbench",
    title: "Firmware workbench",
    shortTitle: "Firmware Lab",
    category: "Systems & developer tools",
    discipline: "Engineering & AI",
    kicker: "Inspect bytes. Understand every edit.",
    description:
      "A local browser workbench for inspecting firmware containers, reviewing byte changes, and exporting an auditable result.",
    tags: ["Python", "JavaScript", "Binary formats"],
    source:
      "https://github.com/Ashwin-Iyer1/Uniden-Firmware-Decompilation-Tool",
    live: "https://ashwin-iyer1.github.io/Uniden-Firmware-Decompilation-Tool/",
    demo: "/demos/firmware/index.html",
    demoLabel: "Explore the workbench",
    demoNote:
      "Try the included synthetic example without supplying a device image. Files are processed in browser memory. The tool does not flash hardware.",
    role: "Browser workbench & tooling extensions",
    status: "Local browser tool + Python codecs",
    facts: [
      { value: "In-browser", label: "file processing" },
      { value: "Undo", label: "reversible editing workflow" },
      { value: "SHA-256", label: "export provenance" },
    ],
    problem:
      "Binary editing tools can make it easy to change a file and hard to understand what changed. Firmware work adds another challenge: a recognized container does not guarantee that every internal resource is understood.",
    solution:
      "I built a browser workbench around documented firmware codecs, with raw inspection, profile-gated resource editing, undo, and an export manifest. A synthetic example and before/after byte review make the editing workflow possible to explore without vendor firmware.",
    workflow: [
      "Load the synthetic example to explore the raw editor.",
      "Make a small edit and compare the original and current bytes.",
      "Undo the change or export a file with a reviewable manifest.",
    ],
    architecture: [
      {
        title: "Inspect",
        detail:
          "Container detection and binary inspection establish what is known about the supplied file.",
      },
      {
        title: "Gate",
        detail:
          "Named resource editors depend on verified profiles. Unsupported layouts remain in raw inspection mode.",
      },
      {
        title: "Edit & review",
        detail:
          "Atomic edits and undo preserve a reviewable session. Byte comparison shows the net difference from the original.",
      },
      {
        title: "Export",
        detail:
          "The workbench creates an edited file and SHA-256 manifest. Hardware flashing stays outside the tool.",
      },
    ],
    decisions: [
      {
        title: "Make uncertainty visible",
        detail:
          "The interface distinguishes format detection from verified resource mappings. It avoids presenting guessed offsets as supported editors.",
      },
      {
        title: "Review the result as well as the actions",
        detail:
          "An operation log explains how a session evolved; before/after bytes show its final effect. Undoing an edit should remove it from the net diff.",
      },
      {
        title: "Keep research provenance intact",
        detail:
          "Old-model transforms and container research build on AngeloD2022’s uniden-firmware-tool under AGPL-3.0. My work adds the browser workflow and tooling around that foundation.",
      },
    ],
    evidence: [
      {
        label: "Workbench source & supported workflows",
        href: "https://github.com/Ashwin-Iyer1/Uniden-Firmware-Decompilation-Tool",
        detail:
          "Browser implementation, Python tools, tests, and documentation of supported operations.",
      },
      {
        label: "Upstream codec research",
        href: "https://github.com/AngeloD2022/uniden-firmware-tool",
        detail:
          "Attribution for the existing old-model transform and container research.",
      },
    ],
    limitations:
      "A successful parse or export does not prove that a file is safe for a device. The example is synthetic and is not firmware. Unsupported mappings remain raw data, resized diffs are positional rather than semantic, and the workbench does not upload files or flash devices.",
  },
  {
    slug: "equity-volatility",
    title: "Event-driven equity volatility",
    shortTitle: "Event Volatility",
    category: "Team research · NUSA",
    discipline: "Quant & data",
    kicker: "Study how uncertainty is priced around events.",
    description:
      "NUSA team research into implied-volatility pricing around earnings and macro events, with historical options data and walk-forward straddle backtests.",
    tags: ["Python", "Options", "Backtesting"],
    source: "https://github.com/ArnMehta11/Equity_Volatility_Strategy",
    live: "/projects/NUSA Spring 26 RS - Equity Vol. Project.pdf",
    role: "NUSA team research contributor",
    status: "Research presentation",
    facts: [
      { value: "Events", label: "earnings & macro catalysts" },
      { value: "Options", label: "implied-volatility research" },
      { value: "Team", label: "NUSA research project" },
    ],
    problem:
      "An event can change both expected price movement and the premium investors pay for uncertainty. Evaluating an options strategy requires distinguishing the volatility thesis from the execution and backtest assumptions.",
    solution:
      "This team project investigates event-driven volatility using historical options data and walk-forward straddle backtests. The presentation is the primary artifact for the research question, approach, and findings.",
    workflow: [
      "Read the team presentation for the research thesis and findings.",
      "Inspect the shared repository for the data and backtesting workflow.",
      "Assess results alongside their assumptions and limitations.",
    ],
    architecture: [
      {
        title: "Frame",
        detail: "Define the earnings and macro-event volatility question.",
      },
      {
        title: "Observe",
        detail: "Examine historical options pricing around the event window.",
      },
      {
        title: "Evaluate",
        detail: "Use walk-forward straddle backtests to study the thesis.",
      },
      {
        title: "Communicate",
        detail: "Present the methodology and findings as a NUSA team.",
      },
    ],
    decisions: [
      {
        title: "Keep team attribution explicit",
        detail:
          "This is collaborative NUSA research. The shared repository and presentation credit the broader work; this page does not claim sole authorship.",
      },
      {
        title: "Let the research carry the evidence",
        detail:
          "The presentation and source are linked directly. Schematic curves on this site illustrate the idea and are not claimed returns or measured trading performance.",
      },
    ],
    evidence: [
      {
        label: "NUSA Spring 2026 presentation",
        href: "/projects/NUSA Spring 26 RS - Equity Vol. Project.pdf",
        detail:
          "The existing team research presentation, including methodology and findings.",
      },
      {
        label: "Shared research repository",
        href: "https://github.com/ArnMehta11/Equity_Volatility_Strategy",
        detail: "Team source and research workflow.",
      },
    ],
    limitations:
      "Historical backtests do not establish future profitability. Options results depend on data quality, bid–ask spreads, execution, and event selection. No performance figures or individual contribution beyond team participation are inferred on this page.",
  },
];

export const projects = [
  coreProjects[0],
  additionalProjects[0],
  coreProjects[1],
  coreProjects[2],
  ...additionalProjects.slice(1),
  coreProjects[3],
];
export const featuredProjects = [
  coreProjects[0],
  additionalProjects[0],
  coreProjects[1],
  coreProjects[2],
];
export const getProject = (slug) =>
  projects.find((project) => project.slug === slug);
