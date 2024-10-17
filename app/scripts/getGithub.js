const fs = require('fs');
const path = require('path');

async function getGithub() {
    try {
        var res = await fetch('https://api.github.com/users/Ashwin-Iyer1/repos').then((response) => response.json());
        // Define the path to save the file
        const filePath = path.join(process.cwd(),'app', 'data', 'repos.json');

        const cookle =     {
            "name": "Cookle",
            "description": "Food guessing game similar to Wordle",
            "html_url": "https://s-pat6.github.io/cookle/"
          }
          res = [...res, cookle]
          
          fs.writeFileSync(filePath, JSON.stringify(res, null, 2), 'utf8');
        console.log('Github repos data has been saved to repos.json');
    } catch (error) {
        console.error('Error saving repos:', error);
    }
}

getGithub();

