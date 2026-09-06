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

export default function FeaturedProjects() {
  return (
    <div className={styles.grid}>
      {selected.map(
        ({ name, title, category, description, href, tags, source }) => (
          <a
            className={styles.project}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            key={name}
          >
            <div className={styles.topline}>
              <span>{category}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.footer}>
              <span>{tags}</span>
              <span className={styles.source}>{source}</span>
            </div>
          </a>
        ),
      )}
    </div>
  );
}
