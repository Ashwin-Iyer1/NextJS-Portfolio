import COCData from "../data/COC.json";
import styles from "./COC.module.css";
import townHall14 from "../Images/COC/Town_Hall14.webp";
import townHall15 from "../Images/COC/Town_Hall15.webp";
import townHall16 from "../Images/COC/Town_Hall16.webp";
import Image from "next/image";

const townHallImages = {
  14: townHall14,
  15: townHall15,
  16: townHall16,
};

const formatNumber = (value) =>
  typeof value === "number" ? value.toLocaleString("en-US") : value ?? "";

export default function COC() {
  const { townHallLevel } = COCData;
  const townHallImage = townHallImages[townHallLevel];

  const stats = [
    {
      label: "Best Trophies",
      value: formatNumber(COCData.bestTrophies),
      className: `${styles.statValue} ${styles.trophies}`,
    },
    {
      label: "War Stars",
      value: formatNumber(COCData.warStars),
      className: styles.statValue,
    },
    {
      label: "Exp Level",
      value: formatNumber(COCData.expLevel),
      className: styles.statValue,
    },
  ];

  return (
    <section className={styles.coc}>
      <h2 className="section-title">Clash of Clans</h2>
      <div className={`glass-card ${styles.card}`}>
        {townHallImage && (
          <figure className={styles.townHall}>
            <Image
              src={townHallImage}
              alt={`Town Hall level ${townHallLevel}`}
              className={styles.townHallImage}
            />
            <figcaption className={styles.townHallCaption}>
              Town Hall {townHallLevel}
            </figcaption>
          </figure>
        )}
        <div className={styles.details}>
          <p className={styles.playerName}>{COCData.name}</p>
          <p className={styles.playerMeta}>
            {COCData.clan?.name} · {COCData.tag}
          </p>
          <dl className={styles.stats}>
            {COCData.league?.name && (
              <div className={styles.stat}>
                <dt className={styles.statLabel}>League</dt>
                <dd className={styles.statValue}>
                  {COCData.league.iconUrls?.tiny && (
                    <img
                      src={COCData.league.iconUrls.tiny}
                      alt=""
                      className={styles.leagueIcon}
                    />
                  )}
                  {COCData.league.name}
                </dd>
              </div>
            )}
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={stat.className}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
