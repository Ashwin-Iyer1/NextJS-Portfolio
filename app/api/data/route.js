// pages/api/data.js
const pool = require('../../about/db'); // Use require instead of import

export async function GET(request) {
  try {
    const results = await pool.query('SELECT * FROM repos');
    return new Response(JSON.stringify(results.rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
