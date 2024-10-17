import COCData from '../data/COC.json';
import styles from './COC.module.css';
import townHall14 from '../Images/COC/Town_Hall14.webp';
import townHall15 from '../Images/COC/Town_Hall15.webp';
import townHall16 from '../Images/COC/Town_Hall16.webp';
import Image from 'next/image';

const townHallImages = {
    14: townHall14,
    15: townHall15,
    16: townHall16,
};

export default function COC() {
    const { townHallLevel } = COCData;
    const townHallImage = townHallImages[townHallLevel];

    return (
        <div className={styles.container}>
            <h2>Clash of Clans</h2>
            <p>Username: {COCData.name}</p>
            <p>TH Level: {townHallLevel}</p>
            {townHallImage && (
                <Image src={townHallImage} alt={`Town Hall Level ${townHallLevel}`} />
            )}
            <p>Trophies: {COCData.bestTrophies}</p>
            <img src={COCData.league.iconUrls.tiny} alt="League Icon" />
        </div>
    );
}
