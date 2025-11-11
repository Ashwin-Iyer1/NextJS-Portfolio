const pool = require("../../about/db");
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM kalshi_profile WHERE id = 1");
    
    if (results.rows.length === 0) {
      return Response.json({ error: 'Profile not found' }, { status: 404 });
    }
    
    const profile = results.rows[0];
    
    // Format response to match the original API structure
    const response = {
      metrics: {
        pnl: profile.pnl,
        volume: profile.volume,
        open_interest: profile.open_interest,
        num_markets_traded: profile.num_markets_traded
      },
      nickname: profile.nickname,
      last_updated: profile.last_updated
    };
    
    return Response.json(response);
  } catch (error) {
    console.error('Error fetching Kalshi profile from database:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
