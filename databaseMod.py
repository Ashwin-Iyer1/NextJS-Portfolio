import psycopg2
from psycopg2 import sql
import os
# from dotenv import load_dotenv
# load_dotenv()

# Database connection parameters
db_params = {
    'dbname': os.getenv('dbname'),
    'user': os.getenv('user'),
    'password': os.getenv('password'),  # Replace with your actual password
    'host': os.getenv('host'),
    'port': '5432'
}

def clear_entries(table_name: str):
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        # Create the table
        create_table(cursor)

        # Clear all entries from the Songs table
        truncate_query = sql.SQL(f'TRUNCATE TABLE {table_name}')
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




def insertData(total_seconds, daily_average):
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        # Define the insert query
        insert_query = """
        INSERT INTO wakatime (total_seconds, daily_average)
        VALUES (%s, %s);
        """
        
        # Execute the query with the actual values
        cursor.execute(insert_query, (total_seconds, daily_average))
        connection.commit()

        print("Data inserted successfully.")
    except Exception as error:
        print("Error inserting data:", error)

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

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


def insert_repo(cursor, repo_data):
    # Define the insert query
    insert_query = sql.SQL("""
        INSERT INTO repos (reponame, description, html_url)
        VALUES (%s, %s, %s)
    """)
    cursor.execute(insert_query, repo_data)


def addtoGithub(data: list):
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        for repo in data:
            insert_repo(cursor, repo)
        connection.commit()

        print("repos added successfully.")

    except Exception as error:
        print(f"Error occurred: {error}")

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()

def wakatime_db_data():
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()

        # Define the select query
        select_query = """
        SELECT total_seconds FROM wakatime;
        """
        
        # Execute the query
        cursor.execute(select_query)
        data = cursor.fetchall()
        return data

    except Exception as error:
        print("Error fetching data:", error)

    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if connection:
            connection.close()