// app/api/songs/route.js
import fs from 'fs';
import path from 'path';

export async function GET(req) {
    try {
        // Define the path to the JSON file
        const filePath = path.join(process.cwd(), 'data', 'songs.json');
        
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf8');
        const songs = JSON.parse(data);
        
        return new Response(JSON.stringify(songs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
