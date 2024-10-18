import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
load_dotenv()

# Database connection parameters
db_params = {
    'dbname': os.getenv('dbname'),
    'user': os.getenv('user'),
    'password': os.getenv('password'),  # Replace with your actual password
    'host': os.getenv('host'),
    'port': '5432'
}

def clear_entries():
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        # Create the table
        create_table(cursor)

        # Clear all entries from the Songs table
        truncate_query = sql.SQL("TRUNCATE TABLE Songs;")
        cursor.execute(truncate_query)
        connection.commit()

        print("All entries cleared successfully.")
    except Exception as error:
        print(f"Error occurred: {error}")

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()


    # Define the truncate query
    

def create_table(cursor):
    # Define the table creation query
    create_table_query = sql.SQL("""
        CREATE TABLE IF NOT EXISTS Songs (
            Song_Name VARCHAR(255),
            Artist VARCHAR(255),
            SongCoverLink VARCHAR(255)
        )
    """)
    cursor.execute(create_table_query)

def insert_song(cursor, song_data):
    # Define the insert query
    insert_query = sql.SQL("""
        INSERT INTO Songs (Song_Name, Artist, SongCoverLink)
        VALUES (%s, %s, %s)
    """)
    cursor.execute(insert_query, song_data)

def addtoDatabase(songs: list):
    # Create a connection to the database
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        # Insert the song data
        for song in songs:
            insert_song(cursor, song)
        connection.commit()

        print("Song added successfully.")

    except Exception as error:
        print(f"Error occurred: {error}")

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()
