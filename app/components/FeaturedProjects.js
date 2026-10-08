import styles from "./FeaturedProjects.module.css";

// Curated for markets and quantitative recruiting. Keep the descriptions
// specific to the work, and distinguish team research from personal projects.
const selected = [
  {
    name: "Index-based-Factor-Decomposition",
    title: "Equity factor risk model",
    category: "Portfolio risk",
    description:
      "Models S&P 500 equity risk with 11 sector and four style factors, combining covariance estimation with portfolio risk attribution.",
    href: "https://github.com/Ashwin-Iyer1/Index-based-Factor-Decomposition",
    tags: "Python / Factor models / Risk",
    source: "GitHub",
  },
  {
    name: "Equity_Volatility_Strategy",
    title: "Event-driven equity volatility",
    category: "Derivatives research",
    description:
      "NUSA team research into implied-volatility pricing around earnings and macro events, using historical options data and walk-forward straddle backtests.",
    href: "https://github.com/ArnMehta11/Equity_Volatility_Strategy",
    tags: "Options / Volatility / Backtesting",
    source: "GitHub",
  },
  {
    name: "NUWorks-Co-op-grader",
    title: "NUCoop",
    category: "Applied machine learning",
    description:
      "A browser extension that ranks co-op listings against a résumé, combining explainable skill matching with an on-device semantic model.",
    href: "https://nucoop.app/",
    tags: "Semantic matching / ONNX",
    source: "Live app",
  },
];

function FactorIllustration() {
  return (
    <svg viewBox="0 0 520 330" fill="none" aria-hidden="true">
      <g className={styles.factorLines}>
        <path d="M104 165H157C184 165 174 86 207 86H229" />
        <path d="M104 165H229" />
        <path d="M104 165H157C184 165 174 244 207 244H229" />
        <path d="M302 86H326C354 86 344 165 376 165H407" />
        <path d="M302 165H407" />
        <path d="M302 244H326C354 244 344 165 376 165H407" />
      </g>
      <circle cx="80" cy="165" r="39" className={styles.factorNode} />
      <path
        d="M65 177V157M80 177V148M95 177V164"
        className={styles.factorBars}
      />
      <text x="80" y="229" textAnchor="middle" className={styles.diagramText}>
        Portfolio
      </text>
      <rect
        x="218"
        y="58"
        width="90"
        height="56"
        rx="12"
        className={styles.factorCell}
      />
      <rect
        x="218"
        y="137"
        width="90"
        height="56"
        rx="12"
        className={styles.factorCell}
      />
      <rect
        x="218"
        y="216"
        width="90"
        height="56"
        rx="12"
        className={styles.factorCell}
      />
      <text x="263" y="91" textAnchor="middle" className={styles.diagramText}>
        Sectors
      </text>
      <text x="263" y="170" textAnchor="middle" className={styles.diagramText}>
        Styles
      </text>
      <text x="263" y="249" textAnchor="middle" className={styles.diagramText}>
        Residual
      </text>
      <circle cx="433" cy="165" r="40" className={styles.factorResult} />
      <path
        d="M433 137V165L451 183M433 165L407 172"
        className={styles.factorPartition}
      />
      <text x="433" y="229" textAnchor="middle" className={styles.diagramText}>
        Risk attribution
      </text>
      <circle cx="169" cy="139" r="4" className={styles.factorSignal} />
      <circle cx="347" cy="117" r="4" className={styles.factorSignal} />
    </svg>
  );
}

function VolatilityIllustration() {
  return (
    <svg viewBox="0 0 520 270" fill="none" aria-hidden="true">
      <g className={styles.chartGrid}>
        <path d="M44 57H476M44 114H476M44 171H476M44 228H476" />
        <path d="M116 35V228M188 35V228M260 35V228M332 35V228M404 35V228" />
      </g>
      <path d="M260 34V228" className={styles.eventLine} />
      <path
        d="M44 190C99 196 124 170 158 163S199 126 226 101S251 52 260 48C269 78 283 162 310 181S377 206 413 203S454 205 476 209"
        className={styles.volatilityCurve}
      />
      <path
        d="M44 208C115 202 173 198 224 181S264 168 304 186S404 188 476 181"
        className={styles.volatilityComparison}
      />
      <circle cx="260" cy="48" r="6" className={styles.eventPoint} />
      <text x="279" y="47" className={styles.chartLabel}>
        Event
      </text>
      <text x="44" y="254" className={styles.chartLabel}>
        Before
      </text>
      <text x="476" y="254" textAnchor="end" className={styles.chartLabel}>
        After
      </text>
    </svg>
  );
}

function MatchingIllustration() {
  return (
    <svg viewBox="0 0 520 270" fill="none" aria-hidden="true">
      <path
        d="M201 131H246C269 131 269 76 294 76H323M201 131H323M201 131H246C269 131 269 186 294 186H323"
        className={styles.matchLines}
      />
      <g transform="rotate(-7 128 134)">
        <rect
          x="58"
          y="43"
          width="140"
          height="182"
          rx="11"
          className={styles.resumePaper}
        />
        <circle cx="92" cy="78" r="12" className={styles.resumeAvatar} />
        <path
          d="M117 73H171M117 83H152M81 111H173M81 124H155M81 166H173M81 180H158M81 194H135"
          className={styles.resumeLines}
        />
        <rect
          x="81"
          y="137"
          width="61"
          height="16"
          rx="4"
          className={styles.resumeHighlight}
        />
      </g>
      <g className={styles.matchTag}>
        <rect x="314" y="53" width="151" height="46" rx="23" />
        <rect x="292" y="108" width="173" height="46" rx="23" />
        <rect x="314" y="163" width="151" height="46" rx="23" />
      </g>
      <g className={styles.matchText}>
        <text x="389" y="81" textAnchor="middle">
          Skills
        </text>
        <text x="379" y="136" textAnchor="middle">
          Experience
        </text>
        <text x="389" y="191" textAnchor="middle">
          Meaning
        </text>
      </g>
    </svg>
  );
}

const illustrations = [
  FactorIllustration,
  VolatilityIllustration,
  MatchingIllustration,
];
const illustrationLabels = [
  "Factor decomposition · Concept illustration",
  "Event volatility · Schematic curves",
  "Semantic matching · Concept illustration",
];

export default function FeaturedProjects() {
  return (
    <div className={styles.grid}>
      {selected.map(
        ({ name, title, category, description, href, tags, source }, index) => {
          const Illustration = illustrations[index];
          return (
            <a
              className={`${styles.project} ${index === 0 ? styles.featured : ""}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              key={name}
              aria-label={`${title} — ${source} (opens in a new tab)`}
              aria-describedby={`${name}-description ${name}-illustration`}
            >
              <div className={`${styles.artwork} ${styles[`artwork${index}`]}`}>
                <Illustration />
                <span
                  id={`${name}-illustration`}
                  className={styles.artworkCaption}
                >
                  {illustrationLabels[index]}
                </span>
              </div>
              <div className={styles.copy}>
                <div className={styles.topline}>
                  <span>{category}</span>
                  <span className={styles.openIcon} aria-hidden="true">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
                <h3>{title}</h3>
                <p id={`${name}-description`}>{description}</p>
                <div className={styles.footer}>
                  <span>{tags}</span>
                  <span className={styles.source}>{source}</span>
                </div>
              </div>
            </a>
          );
        },
      )}
    </div>
  );
}
