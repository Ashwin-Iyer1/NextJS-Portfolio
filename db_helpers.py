"""
Database Helper Functions
Provides database connection and query utilities
"""
# from dotenv import load_dotenv
# load_dotenv()

import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from typing import List, Dict, Any, Optional
import os


# Database connection parameters from environment variables
db_params = {
    'dbname': os.getenv('dbname'),
    'user': os.getenv('user'),
    'password': os.getenv('password'),  # Replace with your actual password
    'host': os.getenv('host'),
    'port': '5432'
}


@contextmanager
def get_db_connection(use_dict_cursor: bool = False):
    """
    Context manager for database connections.
    Automatically handles connection opening and closing.
    
    Args:
        use_dict_cursor: If True, returns rows as dictionaries instead of tuples
    """
    connection = None
    cursor = None
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor(cursor_factory=RealDictCursor) if use_dict_cursor else connection.cursor()
        yield connection, cursor
    except Exception as error:
        if connection:
            connection.rollback()
        raise error
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()


def execute_query(query: str, params: tuple = None, fetch: bool = False, 
                 fetch_one: bool = False, use_dict: bool = False) -> Optional[Any]:
    """
    Execute a database query with automatic connection management.
    
    Args:
        query: SQL query to execute
        params: Query parameters (tuple)
        fetch: If True, returns all results
        fetch_one: If True, returns only first result
        use_dict: If True, returns results as dictionaries
        
    Returns:
        Query results if fetch or fetch_one is True, None otherwise
    """
    with get_db_connection(use_dict_cursor=use_dict) as (conn, cursor):
        cursor.execute(query, params)
        
        if fetch:
            return cursor.fetchall()
        elif fetch_one:
            return cursor.fetchone()
        else:
            conn.commit()
            return None


def create_table(table_name: str, columns: Dict[str, str]) -> bool:
    """
    Create a table with specified columns.
    
    Args:
        table_name: Name of the table to create
        columns: Dictionary of column_name: column_type
        
    Returns:
        True if successful, False otherwise
    """
    try:
        columns_sql = ", ".join([f"{col} {dtype}" for col, dtype in columns.items()])
        query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_sql});"
        execute_query(query)
        print(f"Table '{table_name}' created successfully.")
        return True
    except Exception as error:
        print(f"Error creating table '{table_name}':", error)
        return False


def insert_record(table_name: str, data: Dict[str, Any]) -> Optional[int]:
    """
    Insert a record into a table.
    
    Args:
        table_name: Name of the table
        data: Dictionary of column: value pairs
        
    Returns:
        ID of inserted record if table has 'id' column, None otherwise
    """
    try:
        columns = list(data.keys())
        values = list(data.values())
        
        query = sql.SQL("INSERT INTO {} ({}) VALUES ({}) RETURNING id;").format(
            sql.Identifier(table_name),
            sql.SQL(', ').join(map(sql.Identifier, columns)),
            sql.SQL(', ').join(sql.Placeholder() * len(values))
        )
        
        result = execute_query(query.as_string(psycopg2.extensions.new_type((0,), "TEXT", lambda x, y: x)), 
                              tuple(values), fetch_one=True)
        print(f"Record inserted successfully into '{table_name}'.")
        return result[0] if result else None
    except Exception as error:
        print(f"Error inserting record into '{table_name}':", error)
        return None


def insert_many(table_name: str, data_list: List[Dict[str, Any]]) -> bool:
    """
    Insert multiple records into a table.
    
    Args:
        table_name: Name of the table
        data_list: List of dictionaries with column: value pairs
        
    Returns:
        True if successful, False otherwise
    """
    if not data_list:
        return False
        
    try:
        with get_db_connection() as (conn, cursor):
            columns = list(data_list[0].keys())
            
            query = sql.SQL("INSERT INTO {} ({}) VALUES ({});").format(
                sql.Identifier(table_name),
                sql.SQL(', ').join(map(sql.Identifier, columns)),
                sql.SQL(', ').join(sql.Placeholder() * len(columns))
            )
            
            values_list = [tuple(record[col] for col in columns) for record in data_list]
            cursor.executemany(query.as_string(conn), values_list)
            conn.commit()
            
            print(f"{len(data_list)} records inserted successfully into '{table_name}'.")
            return True
    except Exception as error:
        print(f"Error inserting multiple records into '{table_name}':", error)
        return False


def update_record(table_name: str, data: Dict[str, Any], 
                 condition: str, condition_params: tuple = None) -> int:
    """
    Update records in a table.
    
    Args:
        table_name: Name of the table
        data: Dictionary of column: value pairs to update
        condition: WHERE clause (without 'WHERE')
        condition_params: Parameters for the WHERE clause
        
    Returns:
        Number of rows updated
    """
    try:
        with get_db_connection() as (conn, cursor):
            set_clause = ", ".join([f"{col} = %s" for col in data.keys()])
            query = f"UPDATE {table_name} SET {set_clause} WHERE {condition};"
            
            params = tuple(data.values()) + (condition_params if condition_params else ())
            cursor.execute(query, params)
            conn.commit()
            
            rows_updated = cursor.rowcount
            print(f"{rows_updated} record(s) updated in '{table_name}'.")
            return rows_updated
    except Exception as error:
        print(f"Error updating records in '{table_name}':", error)
        return 0


def delete_record(table_name: str, condition: str, condition_params: tuple = None) -> int:
    """
    Delete records from a table.
    
    Args:
        table_name: Name of the table
        condition: WHERE clause (without 'WHERE')
        condition_params: Parameters for the WHERE clause
        
    Returns:
        Number of rows deleted
    """
    try:
        with get_db_connection() as (conn, cursor):
            query = f"DELETE FROM {table_name} WHERE {condition};"
            cursor.execute(query, condition_params)
            conn.commit()
            
            rows_deleted = cursor.rowcount
            print(f"{rows_deleted} record(s) deleted from '{table_name}'.")
            return rows_deleted
    except Exception as error:
        print(f"Error deleting records from '{table_name}':", error)
        return 0


def query_table(table_name: str, columns: str = "*", condition: str = None, 
               condition_params: tuple = None, limit: int = None, 
               use_dict: bool = True) -> List[Any]:
    """
    Query records from a table.
    
    Args:
        table_name: Name of the table
        columns: Columns to select (default: "*")
        condition: WHERE clause (without 'WHERE')
        condition_params: Parameters for the WHERE clause
        limit: Maximum number of records to return
        use_dict: If True, returns records as dictionaries
        
    Returns:
        List of records
    """
    try:
        query = f"SELECT {columns} FROM {table_name}"
        
        if condition:
            query += f" WHERE {condition}"
        if limit:
            query += f" LIMIT {limit}"
        
        query += ";"
        
        results = execute_query(query, condition_params, fetch=True, use_dict=use_dict)
        return results if results else []
    except Exception as error:
        print(f"Error querying table '{table_name}':", error)
        return []


def truncate_table(table_name: str, restart_identity: bool = True) -> bool:
    """
    Remove all records from a table.
    
    Args:
        table_name: Name of the table
        restart_identity: If True, reset auto-increment counters
        
    Returns:
        True if successful, False otherwise
    """
    try:
        restart_sql = "RESTART IDENTITY" if restart_identity else ""
        query = f"TRUNCATE TABLE {table_name} {restart_sql};"
        execute_query(query)
        print(f"Table '{table_name}' truncated successfully.")
        return True
    except Exception as error:
        print(f"Error truncating table '{table_name}':", error)
        return False


def table_exists(table_name: str) -> bool:
    """Check if a table exists in the database."""
    query = """
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = %s
        );
    """
    result = execute_query(query, (table_name,), fetch_one=True)
    return result[0] if result else False


def count_records(table_name: str, condition: str = None, 
                 condition_params: tuple = None) -> int:
    """
    Count records in a table.
    
    Args:
        table_name: Name of the table
        condition: Optional WHERE clause (without 'WHERE')
        condition_params: Parameters for the WHERE clause
        
    Returns:
        Number of records
    """
    query = f"SELECT COUNT(*) FROM {table_name}"
    if condition:
        query += f" WHERE {condition}"
    query += ";"
    
    result = execute_query(query, condition_params, fetch_one=True)
    return result[0] if result else 0
