const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.COC_TOKEN;
const url = "https://api.clashofclans.com/v1/players/%2329YOY8UJQ";

const headers = {
    "Authorization": `Bearer ${token}`
}

async function getClash() {
    try {
        var response = await fetch(url, { headers }).then((response) => response.json());
        const filePath = path.join(process.cwd(), 'app', 'data', 'COC.json');
        
        // Ensure the response is OK before proceeding

        fs.writeFileSync(filePath, JSON.stringify(response, null, 2), 'utf8');
        console.log('Clash of Clans data has been saved to COC.json');
    } catch (error) {
        console.error('Error saving COC:', error);
    }
}

getClash();
