import styles from "./FeaturedProjects.module.css";

// These posters are conceptual diagrams, not charts of measured results.
const factorTiles = Array.from({ length: 169 }, (_, index) => {
  const row = Math.floor(index / 13);
  const column = index % 13;
  const ridge = Math.exp(-Math.abs(row - column) / 3.5);
  const wave = (Math.sin(row * 0.7 + column * 0.45) + 1) / 2;
  return {
    x: 600 + (column - row) * 27,
    y: 146 + (column + row) * 13.5,
    // Transcendental math can differ in the last bit across JS engines.
    // Serialize stable precision so the server and browser hydrate identically.
    height: Number((18 + ridge * 65 + wave * 18).toFixed(3)),
    opacity: Number((0.34 + ridge * 0.45 + wave * 0.2).toFixed(3)),
  };
});

function FactorIllustration() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.factorOrbit}>
        <ellipse cx="600" cy="333" rx="460" ry="202" />
        <ellipse cx="600" cy="333" rx="392" ry="172" />
        <path d="M100 333H1100M600 58V540" />
      </g>
      <g className={styles.factorGround}>
        <path d="M250 337 600 162 950 337 600 512Z" />
        <path d="m250 350 350 175 350-175" />
      </g>
      {factorTiles.map(({ x, y, height, opacity }, index) => (
        <g key={index}>
          <path
            d={`M${x - 23} ${y + 11.5 - height}L${x} ${y + 23 - height}V${y + 23}L${x - 23} ${y + 11.5}Z`}
            className={styles.tileLeft}
            opacity={opacity}
          />
          <path
            d={`M${x} ${y + 23 - height}L${x + 23} ${y + 11.5 - height}V${y + 11.5}L${x} ${y + 23}Z`}
            className={styles.tileRight}
            opacity={opacity}
          />
          <path
            d={`M${x} ${y - height}L${x + 23} ${y + 11.5 - height}L${x} ${y + 23 - height}L${x - 23} ${y + 11.5 - height}Z`}
            className={styles.tileTop}
            opacity={opacity}
          />
        </g>
      ))}
      <g className={styles.factorAnnotations}>
        <path d="M275 152H338L390 188M925 418H864L812 388" />
        <circle cx="390" cy="188" r="4" />
        <circle cx="812" cy="388" r="4" />
      </g>
      <text x="275" y="137" className={styles.diagramText}>
        Sectors + styles
      </text>
      <text x="925" y="447" textAnchor="end" className={styles.diagramText}>
        Risk attribution
      </text>
    </svg>
  );
}

function VolatilityIllustration() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.chartGrid}>
        {[100, 200, 300, 400, 500].map((y) => (
          <path key={y} d={`M0 ${y}H1200`} />
        ))}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x) => (
          <path key={x} d={`M${x} 0V600`} />
        ))}
      </g>
      <path d="M600 94V513" className={styles.eventLine} />
      <path
        d="M-70 434C99 470 184 442 307 376S482 308 551 180S595 64 620 171S680 404 807 436S1040 481 1270 415V600H-70Z"
        className={styles.volatilityArea}
      />
      <g className={styles.volatilityRibbons}>
        {Array.from({ length: 11 }, (_, index) => (
          <path
            key={index}
            d={`M-70 ${429 + index * 5}C99 ${465 + index * 5} 184 ${437 + index * 4} 307 ${371 + index * 4}S482 ${303 + index * 4} 551 ${175 + index * 5}S595 ${59 + index * 5} 620 ${166 + index * 5}S680 ${399 + index * 4} 807 ${431 + index * 3}S1040 ${476 + index * 2} 1270 ${410 + index * 3}`}
          />
        ))}
      </g>
      <path
        d="M-70 434C99 470 184 442 307 376S482 308 551 180S595 64 620 171S680 404 807 436S1040 481 1270 415"
        className={styles.volatilityCurve}
      />
      <path
        d="M-60 471C118 442 243 446 386 422S564 374 684 419S990 424 1260 352"
        className={styles.volatilityComparison}
      />
      <circle cx="600" cy="116" r="8" className={styles.eventPoint} />
      <text x="268" y="83" className={styles.chartLabel}>
        Before
      </text>
      <text x="600" y="83" textAnchor="middle" className={styles.chartLabel}>
        Event
      </text>
      <text x="932" y="83" textAnchor="end" className={styles.chartLabel}>
        After
      </text>
    </svg>
  );
}

function MatchingIllustration() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <g className={styles.matchOrbits}>
        <circle cx="602" cy="300" r="225" />
        <circle cx="602" cy="300" r="178" />
        <path d="M137 300H1063M602 38V562" />
      </g>
      <path
        d="M480 292H525M677 292H724M677 307C729 307 697 423 751 423"
        className={styles.matchLines}
      />
      <g transform="rotate(-9 390 295)">
        <rect
          x="274"
          y="106"
          width="250"
          height="395"
          rx="10"
          className={styles.paperShadow}
        />
        <rect
          x="260"
          y="91"
          width="250"
          height="395"
          rx="10"
          className={styles.resumePaper}
        />
        <text x="288" y="139" className={styles.documentTitle}>
          Résumé
        </text>
        <circle cx="303" cy="191" r="17" className={styles.resumeAvatar} />
        <path
          d="M341 184H466M341 199H430M289 239H476M289 252H453M289 365H475M289 380H449M289 420H475M289 435H427"
          className={styles.resumeLines}
        />
        <rect
          x="287"
          y="279"
          width="191"
          height="54"
          rx="5"
          className={styles.resumeHighlight}
        />
        <text x="300" y="312" className={styles.matchText}>
          Skills & experience
        </text>
      </g>
      <g className={styles.matchHub}>
        <circle cx="602" cy="299" r="65" />
        <ellipse cx="602" cy="299" rx="35" ry="18" />
        <ellipse
          cx="602"
          cy="299"
          rx="35"
          ry="18"
          transform="rotate(60 602 299)"
        />
        <ellipse
          cx="602"
          cy="299"
          rx="35"
          ry="18"
          transform="rotate(120 602 299)"
        />
      </g>
      <g transform="rotate(7 841 220)">
        <rect
          x="724"
          y="114"
          width="252"
          height="230"
          rx="12"
          className={styles.paperShadow}
        />
        <rect
          x="710"
          y="100"
          width="252"
          height="230"
          rx="12"
          className={styles.rolePaper}
        />
        <text x="738" y="146" className={styles.documentTitle}>
          The right context
        </text>
        <path
          d="M738 175H929M738 190H895M738 205H916"
          className={styles.resumeLines}
        />
        <rect
          x="736"
          y="239"
          width="108"
          height="39"
          rx="19.5"
          className={styles.matchTag}
        />
        <text x="790" y="264" textAnchor="middle" className={styles.matchText}>
          Meaning
        </text>
      </g>
      <g transform="rotate(-5 840 421)">
        <rect
          x="720"
          y="377"
          width="252"
          height="108"
          rx="12"
          className={styles.matchCard}
        />
        <circle cx="758" cy="431" r="15" className={styles.matchCheck} />
        <path d="m751 431 5 5 9-10" className={styles.checkStroke} />
        <text x="788" y="428" className={styles.matchText}>
          Beyond keywords.
        </text>
        <path d="M788 448H940" className={styles.resumeLines} />
      </g>
    </svg>
  );
}

function FirmwareIllustration() {
  return (
    <svg viewBox="0 0 1200 600" fill="none" aria-hidden="true">
      <g stroke="currentColor" opacity=".15">
        {[150, 250, 350, 450].map((y) => (
          <path key={y} d={`M100 ${y}H1100`} />
        ))}
      </g>
      <rect
        x="180"
        y="110"
        width="840"
        height="380"
        rx="18"
        stroke="currentColor"
        opacity=".5"
      />
      <path d="M180 175H1020M580 175V490" stroke="currentColor" opacity=".3" />
      <g fill="currentColor" fontFamily="monospace" fontSize="22">
        <text x="220" y="151">
          OFFSET / ORIGINAL
        </text>
        <text x="620" y="151">
          CURRENT / REVIEW
        </text>
        {[
          "00 4E 55 43 00 00",
          "10 A4 20 00 FF 01",
          "20 7C 02 0A 10 00",
          "30 00 01 00 00 FF",
          "40 1E 00 54 58 54",
        ].map((row, i) => (
          <g key={row}>
            <text x="220" y={225 + i * 49} opacity=".6">
              {row}
            </text>
            <text x="620" y={225 + i * 49}>
              {i === 2 ? "20 7C 02 0B 10 00" : row}
            </text>
          </g>
        ))}
      </g>
      <rect
        x="758"
        y="299"
        width="41"
        height="35"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M1020 316H1070V392" stroke="currentColor" />
      <text x="1070" y="420" fill="currentColor" textAnchor="end" fontSize="18">
        1 edit
      </text>
    </svg>
  );
}

function WaveIllustration() {
  const paths = [1, 3, 7, 15].map((count, index) => {
    const points = Array.from({ length: 241 }, (_, i) => {
      const phase = (i / 240) * Math.PI * 4;
      let value = 0;
      for (let k = 1; k <= count; k += 2) value += Math.sin(k * phase) / k;
      return `${i === 0 ? "M" : "L"}${120 + i * 4} ${(300 - value * 120).toFixed(2)}`;
    }).join(" ");
    return (
      <path
        key={count}
        d={points}
        stroke="currentColor"
        opacity={0.2 + index * 0.22}
        strokeWidth={index === 3 ? 3 : 1.5}
      />
    );
  });
  return (
    <svg viewBox="0 0 1200 600" fill="none" aria-hidden="true">
      <g stroke="currentColor" opacity=".12">
        {[100, 200, 300, 400, 500].map((y) => (
          <path key={y} d={`M100 ${y}H1100`} />
        ))}
        {[200, 400, 600, 800, 1000].map((x) => (
          <path key={x} d={`M${x} 80V520`} />
        ))}
      </g>
      {paths}
      <text x="120" y="100" fill="currentColor" fontSize="20">
        1 → 3 → 7 → 15 harmonics
      </text>
      <text x="1080" y="512" textAnchor="end" fill="currentColor" fontSize="20">
        Σ sin(kx) / k
      </text>
    </svg>
  );
}
function ChartIllustration() {
  return (
    <svg viewBox="0 0 1200 600" fill="none" aria-hidden="true">
      <g stroke="currentColor" opacity=".15">
        {[160, 260, 360, 460].map((y) => (
          <path key={y} d={`M130 ${y}H1070`} />
        ))}
      </g>
      {[140, 200, 165, 280, 235, 320, 270, 355, 325, 405, 370, 430].map(
        (height, i) => (
          <rect
            key={i}
            x={150 + i * 76}
            y={500 - height * 0.75}
            width="43"
            height={height * 0.75}
            rx="4"
            fill="currentColor"
            opacity={0.25 + i * 0.055}
          />
        ),
      )}
      <text x="140" y="110" fill="currentColor" fontSize="22">
        From observations to insight
      </text>
    </svg>
  );
}
function TableIllustration() {
  return (
    <svg viewBox="0 0 1200 600" fill="none" aria-hidden="true">
      <rect
        x="150"
        y="110"
        width="900"
        height="380"
        rx="12"
        stroke="currentColor"
        opacity=".45"
      />
      <g stroke="currentColor" opacity=".2">
        {[185, 260, 335, 410].map((y) => (
          <path key={y} d={`M150 ${y}H1050`} />
        ))}
        <path d="M480 110V490M820 110V490" />
      </g>
      {[220, 295, 370, 445].map((y, i) => (
        <g key={y}>
          <path
            d={`M190 ${y}H${350 + i * 18}M520 ${y}H${700 - i * 15}`}
            stroke="currentColor"
            strokeWidth="8"
            opacity=".35"
          />
          <rect
            x="860"
            y={y - 15}
            width="130"
            height="30"
            rx="15"
            fill="currentColor"
            opacity={i === 2 ? 0.2 : 0.5}
          />
        </g>
      ))}
      <text x="190" y="156" fill="currentColor" fontSize="20">
        INPUT
      </text>
      <text x="520" y="156" fill="currentColor" fontSize="20">
        CONTEXT
      </text>
      <text x="860" y="156" fill="currentColor" fontSize="20">
        DECISION
      </text>
    </svg>
  );
}

const art = {
  "fourier-lab": [
    WaveIllustration,
    1,
    "Fourier partial sums · Concept illustration",
  ],
  "oura-visualizer": [
    ChartIllustration,
    2,
    "Data visualization · Concept illustration",
  ],
  "fantasy-draft": [
    TableIllustration,
    0,
    "Draft decisions · Concept illustration",
  ],
  row2reach: [TableIllustration, 2, "Data review · Concept illustration"],
  "factor-risk": [
    FactorIllustration,
    0,
    "Factor decomposition · Concept illustration",
  ],
  nucoop: [MatchingIllustration, 2, "Semantic matching · Concept illustration"],
  "firmware-workbench": [
    FirmwareIllustration,
    1,
    "Byte review · Concept illustration",
  ],
  "equity-volatility": [
    VolatilityIllustration,
    1,
    "Event volatility · Schematic curves",
  ],
};

export default function ProjectArtwork({ slug, category }) {
  const [Illustration, palette, label] = art[slug];
  return (
    <div className={`${styles.artwork} ${styles[`artwork${palette}`]}`}>
      <Illustration />
      <span className={styles.artworkCategory}>{category}</span>
      <span className={styles.artworkCaption}>{label}</span>
    </div>
  );
}
