import psycopg2
from psycopg2 import sql
from typing import List, Dict, Any, Tuple, Optional
from db_helpers import (
    get_db_connection,
    execute_query,
    create_table,
    truncate_table,
    insert_many
)

# --- WakaTime Operations ---

def get_wakatime_db_data() -> List[Tuple]:
    """
    Fetch total_seconds from wakatime table.
    """
    query = "SELECT total_seconds FROM wakatime;"
    try:
        results = execute_query(query, fetch=True, use_dict=False)
        return results if results else []
    except Exception as e:
        print(f"Error fetching WakaTime data: {e}")
        return []

def update_wakatime_data(total_seconds: float, daily_average: float) -> bool:
    """
    Clear and insert new WakaTime data.
    """
    try:
        # Clear existing
        truncate_table("wakatime", restart_identity=False)
        
        # Insert new
        query = """
        INSERT INTO wakatime (total_seconds, daily_average)
        VALUES (%s, %s);
        """
        execute_query(query, (total_seconds, daily_average))
        print("WakaTime data updated successfully.")
        return True
    except Exception as e:
        print(f"Error updating WakaTime data: {e}")
        return False

# --- Songs Operations ---

def create_songs_table() -> bool:
    """Create Songs table if not exists."""
    columns = {
        "Song_Name": "VARCHAR(255)",
        "Artist": "VARCHAR(255)",
        "SongCoverLink": "VARCHAR(255)"
    }
    return create_table("Songs", columns)

def update_songs(songs_list: List[List[str]]) -> bool:
    """
    Clear and insert new songs.
    songs_list: List of [Song_Name, Artist, SongCoverLink]
    """
    try:
        # Ensure table exists (optional, but good practice)
        # create_songs_table() 
        
        truncate_table("Songs", restart_identity=False)
        
        if not songs_list:
            return True

        # Convert list of lists to list of dicts for insert_many if we wanted to use it,
        # but since the structure is simple, we can just loop or use a custom query.
        # Let's use a custom query for list of lists to match previous logic style but cleaner.
        
        query = """
            INSERT INTO Songs (Song_Name, Artist, SongCoverLink)
            VALUES (%s, %s, %s)
        """
        
        with get_db_connection() as (conn, cursor):
            cursor.executemany(query, songs_list)
            conn.commit()
            
        print(f"{len(songs_list)} songs added successfully.")
        return True
    except Exception as e:
        print(f"Error updating songs: {e}")
        return False

# --- GitHub Repos Operations ---

def update_repos(repos_list: List[Tuple[str, str, str]]) -> bool:
    """
    Clear and insert new repos.
    repos_list: List of (reponame, description, html_url)
    """
    try:
        truncate_table("repos", restart_identity=False)
        
        if not repos_list:
            return True
            
        query = """
            INSERT INTO repos (reponame, description, html_url)
            VALUES (%s, %s, %s)
        """
        
        with get_db_connection() as (conn, cursor):
            cursor.executemany(query, repos_list)
            conn.commit()
            
        print(f"{len(repos_list)} repos added successfully.")
        return True
    except Exception as e:
        print(f"Error updating repos: {e}")
        return False

# --- Generic Helpers (Wrappers around db_helpers if needed) ---

def clear_table(table_name: str) -> bool:
    return truncate_table(table_name)
