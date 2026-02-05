from db_helpers import execute_query, get_db_connection
import json
from datetime import datetime

def create_oura_table():
    """Create the oura_data table if it doesn't exist."""
    query = """
    CREATE TABLE IF NOT EXISTS oura_data (
        id SERIAL PRIMARY KEY,
        data_type VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (data_type, date)
    );
    """
    try:
        execute_query(query)
        print("✅ Table 'oura_data' verified/created.")
        return True
    except Exception as e:
        print(f"❌ Error creating table: {e}")
        return False

def upsert_oura_data(data_type: str, date_str: str, json_data: dict):
    """
    Insert or update Oura data for a specific type and date.
    Uses ON CONFLICT to update existing records.
    """
    if not json_data:
        return False

    query = """
    INSERT INTO oura_data (data_type, date, data)
    VALUES (%s, %s, %s)
    ON CONFLICT (data_type, date) 
    DO UPDATE SET 
        data = EXCLUDED.data,
        created_at = CURRENT_TIMESTAMP;
    """
    
    try:
        # Ensure json_data is a dict, not a string or list (though list is valid JSON, our schema expects object usually)
        # But Postgres JSONB can hold lists.
        # The API usually returns {data: [...]}, so we pass that whole dict.
        
        execute_query(query, (data_type, date_str, json.dumps(json_data)))
        # print(f"💾 Saved {data_type} for {date_str}.")
        return True
    except Exception as e:
        print(f"❌ Error saving {data_type} for {date_str}: {e}")
        return False

def get_oura_data(data_type: str, start_date: str, end_date: str):
    """Get Oura data for a date range."""
    query = """
    SELECT * FROM oura_data 
    WHERE data_type = %s 
    AND date >= %s 
    AND date <= %s
    ORDER BY date ASC;
    """
    try:
        return execute_query(query, (data_type, start_date, end_date), fetch=True, use_dict=True)
    except Exception as e:
        print(f"❌ Error fetching {data_type}: {e}")
        return []
