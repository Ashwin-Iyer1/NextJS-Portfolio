const pool = require('../about/db'); // Use require instead of import
const fs = require('fs');
const path = require('path');

async function saveSongsToFile() {
    const date = new Date();
    if (date.getDay() !== 6) {
        console.log('Songs data will be saved only on Saturdays');
        return;
    }
    try {
        const results = await pool.query('SELECT * FROM songs');
        const songs = results.rows;
        
        // Define the path to save the file
        const filePath = path.join(process.cwd(),'app', 'data', 'songs.json');

        // Write songs to a JSON file
        fs.writeFileSync(filePath, JSON.stringify(songs, null, 2), 'utf8');
        console.log('Songs data has been saved to songs.json');
    } catch (error) {
        console.error('Error saving songs:', error);
    }
}

saveSongsToFile();

