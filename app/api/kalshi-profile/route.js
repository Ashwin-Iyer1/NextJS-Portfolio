export async function GET() {
  try {
    const response = await fetch(
      'https://api.elections.kalshi.com/v1/social/profile/metrics?nickname=Turtlecap&since_day_before=0&v=' + Date.now(),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Kalshi profile metrics');
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching Kalshi profile:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
