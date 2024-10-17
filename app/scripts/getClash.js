const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.COC_TOKEN;

const url = "https://api.clashofclans.com/v1/players/%2329YOY8UJQ"; 

const headers = {
    "Authorization": `Bearer ${token}`
}

const getClash = async () => {
    try {
    const response = await fetch(url, { headers });
    const filePath = path.join(process.cwd(),'app', 'data', 'COC.json');
    var data = await response.json();
    data = JSON.stringify(data);
    fs.writeFileSync(filePath, JSON.stringify(res, null, 2), 'utf8');
    console.log('Clash of Clans data has been saved to COC.json');
    }
    catch (error) {
        console.error('Error saving COC:', error);
    }
}


getClash();