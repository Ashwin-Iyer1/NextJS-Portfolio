export const additionalProjects = [
  {
    slug: "fourier-lab",
    title: "Fourier signal lab",
    shortTitle: "Fourier Lab",
    category: "Mathematics & signal processing",
    discipline: "Quant & data",
    kicker: "Build a signal from its frequencies.",
    description:
      "An interactive laboratory for Fourier decomposition: draw a waveform, reconstruct it with harmonics, and inspect amplitude, phase, and approximation error.",
    tags: ["JavaScript", "Fourier analysis", "Numerical methods"],
    source: "https://github.com/Ashwin-Iyer1/FourierSeries",
    demo: "/demos/fourier/index.html",
    demoLabel: "Open the signal lab",
    demoNote:
      "The transform and reconstruction run in your browser. Presets and drawn signals are educational inputs, not recorded measurements.",
    role: "Personal mathematical implementation",
    status: "Interactive mathematical tool",
    facts: [
      { value: "DFT", label: "explicit numerical decomposition" },
      { value: "Amplitude + phase", label: "inspectable spectrum" },
      { value: "Measured error", label: "reconstruction feedback" },
    ],
    problem:
      "The Fourier series is often introduced as a formula or an animation. The interesting questions come from changing the signal: which frequencies matter, how phase affects shape, and why discontinuities behave differently from smooth curves.",
    solution:
      "I expanded an early Fourier visualization into a self-contained signal lab. It exposes the coefficients and connects harmonic selection to the reconstructed waveform and its error, so the mathematical explanation is tied to quantities you can inspect.",
    workflow: [
      "Choose a waveform or draw a periodic signal.",
      "Change the harmonic cutoff and inspect individual amplitudes and phases.",
      "Compare reconstruction methods and export a signal or visual for further analysis.",
    ],
    architecture: [
      {
        title: "Sample",
        detail: "Represent one period as uniformly spaced real samples.",
      },
      {
        title: "Transform",
        detail: "Compute complex Fourier coefficients from the samples.",
      },
      {
        title: "Reconstruct",
        detail:
          "Combine selected frequency components, with optional Fejér weighting.",
      },
      {
        title: "Measure",
        detail:
          "Compare the reconstruction against the input and inspect energy and error.",
      },
    ],
    decisions: [
      {
        title: "Keep the mathematics inspectable",
        detail:
          "The numerical transform and reconstruction are explicit. Tests check known signals and invariants rather than relying on a convincing-looking animation.",
      },
      {
        title: "Explain the boundary conditions",
        detail:
          "A finite sampled period implies a periodic extension. Sampling limits the frequencies that can be distinguished, and a discontinuity produces Gibbs ringing under a sharp cutoff.",
      },
      {
        title: "Compare two approximations",
        detail:
          "Fejér weighting reduces ringing by averaging partial sums, trading sharpness for smoother convergence. It provides a concrete alternative to simply adding more harmonics.",
      },
    ],
    evidence: [
      {
        label: "Signal lab & numerical source",
        href: "https://github.com/Ashwin-Iyer1/FourierSeries",
        detail:
          "Browser implementation, numerical tests, and the preserved original Fourier experiment.",
      },
    ],
    limitations:
      "This is a finite sampled signal model. Frequencies above the sampling limit can alias, drawn signals are discretized, and interpolation does not recover unobserved detail. Error metrics describe the current sampled reconstruction, not a continuous-time guarantee.",
  },
  {
    slug: "oura-visualizer",
    title: "Oura visualization library",
    shortTitle: "Oura Visualizer",
    category: "Reusable data visualization",
    discipline: "Engineering & AI",
    kicker: "Keep useful data visible when one source fails.",
    description:
      "A reusable React library for Oura data, with a synthetic-data gallery and a more resilient loading pipeline for independent collections.",
    tags: ["React", "TypeScript", "Data visualization"],
    source: "https://github.com/Ashwin-Iyer1/oura-npm",
    live: "https://www.npmjs.com/package/oura-stats-visualizer",
    demo: "/demos/oura/index.html",
    demoLabel: "Explore the chart gallery",
    demoNote:
      "The gallery uses synthetic wellness data. It needs no Oura account or token and contains no personal health records.",
    role: "Personal library & API integration",
    status: "React library + example gallery",
    facts: [
      { value: "React", label: "reusable chart components" },
      { value: "Partial results", label: "independent collection loading" },
      { value: "Synthetic", label: "public example data" },
    ],
    problem:
      "A dashboard built from several API collections should not disappear because one endpoint is unavailable. Consumers also need a way to understand chart behavior without connecting a personal account.",
    solution:
      "I built a React visualization library and expanded it with an inspectable synthetic gallery. The loader handles independent collection failures, pagination, and cancellation so charts can retain useful results without presenting stale data as current.",
    workflow: [
      "Explore the gallery without authenticating.",
      "Change the visible data range and inspect chart states.",
      "Use the source and package documentation to integrate the components.",
    ],
    architecture: [
      {
        title: "Load",
        detail:
          "Request independent Oura data collections through a cancellable loading layer.",
      },
      {
        title: "Reconcile",
        detail:
          "Keep successful collections and report failures at their own boundaries.",
      },
      {
        title: "Prepare",
        detail:
          "Normalize dates and metric values for reusable visualization components.",
      },
      {
        title: "Render",
        detail:
          "Display charts with explicit populated, empty, and unavailable states.",
      },
    ],
    decisions: [
      {
        title: "Treat partial success as useful",
        detail:
          "An optional collection should not make every other collection fail. Collection-level results let the interface communicate what is available.",
      },
      {
        title: "Prevent stale results",
        detail:
          "Changing or clearing credentials invalidates in-flight requests. An older response must not repopulate a new session.",
      },
      {
        title: "Make examples reproducible",
        detail:
          "Synthetic fixture data makes the public demo deterministic and keeps health records and API tokens out of the portfolio.",
      },
    ],
    evidence: [
      {
        label: "Library implementation",
        href: "https://github.com/Ashwin-Iyer1/oura-npm",
        detail:
          "React components, loading behavior, tests, and synthetic example.",
      },
      {
        label: "Published package",
        href: "https://www.npmjs.com/package/oura-stats-visualizer",
        detail:
          "The existing package distribution. Check the repository for the latest improvements.",
      },
    ],
    limitations:
      "The gallery demonstrates visualization and failure handling with synthetic data. It is not medical interpretation or a live view of an Oura account. Package consumers still need an authorized API integration; repository improvements may precede an npm release.",
  },
  {
    slug: "fantasy-draft",
    title: "Fantasy draft strategy lab",
    shortTitle: "Draft Lab",
    category: "Decision models & simulation",
    discipline: "Quant & data",
    kicker: "Make a pick with the next round in mind.",
    description:
      "An interactive draft board that connects player projections, positional scarcity, roster fit, and a snake-draft schedule to an explainable decision.",
    tags: ["Python", "TypeScript", "Decision models"],
    source: "https://github.com/Ashwin-Iyer1/FantasyDraft",
    demo: "/demos/fantasy-draft/index.html",
    demoLabel: "Open the draft board",
    demoNote:
      "Uses the repository’s September 1, 2026 projection snapshot and stated draft assumptions. It does not connect to an ESPN league or execute picks in ESPN.",
    role: "Personal model & decision interface",
    status: "Historical draft-planning tool",
    facts: [
      { value: "2026", label: "projection snapshot" },
      { value: "Snake draft", label: "pick-order scenarios" },
      { value: "Explainable", label: "roster & scarcity factors" },
    ],
    problem:
      "The highest projected scorer is not always the most useful next pick. A draft decision depends on roster needs, positional replacement value, the players likely to remain, and when the next turn arrives.",
    solution:
      "I turned a quantitative draft strategy into an interactive board. Visitors can mark players as drafted, track their roster, and inspect why the model values a candidate under the current draft scenario.",
    workflow: [
      "Choose a draft position and inspect the available board.",
      "Mark picks, track roster needs, and compare candidates.",
      "Inspect recommendations, revise the scenario, and export the board.",
    ],
    architecture: [
      {
        title: "Snapshot",
        detail:
          "Read the public projection, tier, value-over-replacement, and market-ADP data.",
      },
      {
        title: "Track",
        detail:
          "Maintain picked and available players alongside the snake-draft schedule.",
      },
      {
        title: "Evaluate",
        detail:
          "Apply roster-fit, tier-drop, and candidate-scoring rules to the current state.",
      },
      {
        title: "Explain",
        detail:
          "Expose recommendation ingredients and assumptions instead of a single unexplained ranking.",
      },
    ],
    decisions: [
      {
        title: "Separate projections from outcomes",
        detail:
          "The source data is a dated expectation of player performance, not a record of realized results. The interface keeps that context visible.",
      },
      {
        title: "Make opportunity cost tangible",
        detail:
          "A player’s value changes as other players at the same position disappear. Tier and roster context make that change inspectable.",
      },
      {
        title: "State uncertainty honestly",
        detail:
          "Any reconstructed uncertainty proxy is labeled as an assumption. The tool does not claim the precision of a calibrated draft-outcome model.",
      },
    ],
    evidence: [
      {
        label: "Strategy model & public board",
        href: "https://github.com/Ashwin-Iyer1/FantasyDraft",
        detail:
          "Original Python strategy, projection snapshot, and interactive draft implementation.",
      },
    ],
    limitations:
      "The board reflects a ten-team, full-PPR league setup from September 1, 2026. Its 200 skill players support 14 quantified selections, followed by final-round D/ST and kicker guidance without player projections. It is not a live draft feed, a betting tool, or a guarantee of player availability; uncertainty proxies are illustrative assumptions.",
  },
  {
    slug: "row2reach",
    title: "Row2Reach contact studio",
    shortTitle: "Row2Reach",
    category: "Data workflows & desktop software",
    discipline: "Engineering & AI",
    kicker: "Make every row reviewable.",
    description:
      "A local contact-data workspace with CSV validation, personalized draft previews, duplicate checks, and controlled exports, built alongside an Electron enrichment app.",
    tags: ["JavaScript", "Electron", "Data validation"],
    source: "https://github.com/Ashwin-Iyer1/row2reach",
    demo: "/demos/row2reach/index.html",
    demoLabel: "Open the contact studio",
    demoNote:
      "Start with fictional contacts or inspect CSV locally. The studio uploads nothing, calls no enrichment services, and sends no email.",
    role: "Personal desktop app & data tooling",
    status: "Electron application + browser workspace",
    facts: [
      { value: "CSV fidelity", label: "quotes, commas & multiline fields" },
      { value: "Per-record", label: "template and data validation" },
      { value: "Local", label: "draft review & export" },
    ],
    problem:
      "A contact workflow starts with messy tabular data. A quoted comma can shift columns, a duplicate can become a repeated message, and an unknown template variable can slip into a draft without a deliberate review step.",
    solution:
      "I added a local contact studio that parses, validates, and previews the data before export. Its shared CSV parser also improves the desktop editor and merge flow, preserving quoted fields and embedded newlines through roundtrips.",
    workflow: [
      "Paste or open CSV and map the email column.",
      "Inspect duplicates, missing values, and rendered messages for each contact.",
      "Filter the review queue and export ready drafts without sending them.",
    ],
    architecture: [
      {
        title: "Parse",
        detail:
          "A shared state-machine parser preserves quoted commas, escaped quotes, and embedded newlines.",
      },
      {
        title: "Validate",
        detail:
          "Table shape, column names, email syntax, duplicates, and required template values are checked independently.",
      },
      {
        title: "Preview",
        detail:
          "Template substitution is rendered as text. Each contact gets its own evidence and draft review.",
      },
      {
        title: "Export",
        detail:
          "Only ready records enter a spreadsheet-safe CSV of drafts. External email actions remain outside the studio.",
      },
    ],
    decisions: [
      {
        title: "Reject ambiguity instead of shifting columns",
        detail:
          "Malformed quoting and inconsistent record widths stop the review with a useful error. An old valid export is disabled when the input changes.",
      },
      {
        title: "Share the fix with the desktop application",
        detail:
          "The CSV parser is used by the existing editor and merge flow, so the improved demo is backed by a production data-handling improvement.",
      },
      {
        title: "Keep preparation independently usable",
        detail:
          "The browser workspace needs no provider keys, authentication, or Electron runtime. It is useful for data review even when enrichment services are unavailable.",
      },
    ],
    evidence: [
      {
        label: "Contact studio & CSV core",
        href: "https://github.com/Ashwin-Iyer1/row2reach/tree/main/studio",
        detail:
          "The browser workflow and dependency-free shared parser, validation, and template logic.",
      },
      {
        label: "Data regression tests",
        href: "https://github.com/Ashwin-Iyer1/row2reach/tree/main/tests",
        detail:
          "Quoted-field roundtrips, malformed inputs, duplicate detection, template readiness, and safe exports.",
      },
    ],
    limitations:
      "Email syntax checks do not establish deliverability or consent. The studio creates local draft files; it does not enrich contacts, create mailbox drafts, or send messages. The separate Electron application requires provider configuration for those integrations.",
  },
];
