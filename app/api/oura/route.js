const pool = require("../../about/db");
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    let query = "SELECT * FROM oura_data";
    const values = [];
    const conditions = [];

    if (type) {
      conditions.push(`data_type = $${values.length + 1}`);
      values.push(type);
    }

    if (startDate) {
      conditions.push(`date >= $${values.length + 1}`);
      values.push(startDate);
    }

    if (endDate) {
      conditions.push(`date <= $${values.length + 1}`);
      values.push(endDate);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY date ASC";

    const results = await pool.query(query, values);

    // Transform results to match Oura API format { data: [...] }
    // The DB stores each day as a separate row with 'data' column containing the JSON blob.
    // If the frontend expects a list of these blobs, we can extract them.
    // However, the DB 'data' column *is* the blob for that day.
    
    // If the user requested 'heart_rate' which we stored as a list-per-day, it will come out as a list of days, each with a list of points.
    // If the frontend expects a flat list of all points (like the raw API for range), we might need to flatten.
    // But for now, returning the list of row-data is safest.
    
    // Actually, to make it seamless for hooks expecting `{data: [...]}` where ... is the list of daily objects:
    const data = results.rows.map(row => row.data);
    
    // For heart_rate, we stored `{ data: [...] }` in the column. So mapping row.data gives us `[{data: [...]}, {data: [...]}]`.
    // The original API for heartrate returns `{ data: [point, point, ...] }`.
    // So we might want to flatten if it's heart_rate.
    if (type === 'heart_rate') {
        const flattened = data.flatMap(d => d.data || []);
        return Response.json({ data: flattened });
    }

    return Response.json({ data });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
