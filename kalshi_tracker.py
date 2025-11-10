"""
Kalshi Position Tracker - Database Management
Tracks user positions from Kalshi trading platform
"""

from db_helpers import (
    create_table, 
    insert_record, 
    insert_many,
    query_table, 
    update_record,
    delete_record,
    truncate_table,
    table_exists,
    count_records,
    execute_query
)
from kalshi import get_user_holdings, process_holdings_with_series_info
from typing import List, Dict


def create_kalshi_positions_table() -> bool:
    """
    Create the kalshi_positions table to track user positions.
    
    Table Schema:
    - id: Primary key
    - social_id: User's social ID from Kalshi
    - event_ticker: Event ticker symbol
    - series_ticker: Series ticker symbol
    - series_title: Human-readable series name
    - series_category: Category of the series
    - total_absolute_position: Total absolute position in the event
    - market_id: Unique market identifier
    - market_ticker: Market ticker symbol
    - market_title: Market title (what you're betting on)
    - market_subtitle: Market subtitle with details
    - yes_sub_title: YES side description
    - no_sub_title: NO side description
    - position_side: Which side taken (YES/NO)
    - signed_open_position: Signed open position (positive/negative)
    - current_price: Current market price in cents
    - pnl: Profit and loss in cents
    - last_updated: Timestamp of last update
    """
    schema = {
        "id": "SERIAL PRIMARY KEY",
        "social_id": "VARCHAR(255)",
        "event_ticker": "VARCHAR(255)",
        "series_ticker": "VARCHAR(255)",
        "series_title": "TEXT",
        "series_category": "VARCHAR(255)",
        "total_absolute_position": "INTEGER",
        "market_id": "VARCHAR(255) UNIQUE",
        "market_ticker": "VARCHAR(255)",
        "market_title": "TEXT",
        "market_subtitle": "TEXT",
        "yes_sub_title": "TEXT",
        "no_sub_title": "TEXT",
        "position_side": "VARCHAR(10)",
        "signed_open_position": "INTEGER",
        "current_price": "INTEGER",
        "purchase_price": "INTEGER",
        "pnl": "INTEGER",
        "last_updated": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    }
    
    return create_table("kalshi_positions", schema)


def insert_position(position_data: Dict) -> bool:
    """
    Insert a single position into the database.
    
    Args:
        position_data: Dictionary containing position information
        
    Returns:
        True if successful, False otherwise
    """
    try:
        insert_record("kalshi_positions", position_data)
        return True
    except Exception as e:
        print(f"Error inserting position: {e}")
        return False


def insert_positions_bulk(positions: List[Dict]) -> bool:
    """
    Insert multiple positions into the database.
    
    Args:
        positions: List of position dictionaries
        
    Returns:
        True if successful, False otherwise
    """
    if not positions:
        print("No positions to insert")
        return False
    
    return insert_many("kalshi_positions", positions)


def update_position_by_market_id(market_id: str, updates: Dict) -> int:
    """
    Update a position by market ID.
    
    Args:
        market_id: The market ID to update
        updates: Dictionary of fields to update
        
    Returns:
        Number of rows updated
    """
    return update_record("kalshi_positions", updates, "market_id = %s", (market_id,))


def get_all_positions(use_dict: bool = True) -> List[Dict]:
    """
    Get all positions from the database.
    
    Args:
        use_dict: If True, returns positions as dictionaries
        
    Returns:
        List of all positions
    """
    return query_table("kalshi_positions", use_dict=use_dict)


def get_positions_by_series(series_ticker: str, use_dict: bool = True) -> List[Dict]:
    """
    Get all positions for a specific series.
    
    Args:
        series_ticker: The series ticker to filter by
        use_dict: If True, returns positions as dictionaries
        
    Returns:
        List of positions for the specified series
    """
    return query_table(
        "kalshi_positions", 
        condition="series_ticker = %s",
        condition_params=(series_ticker,),
        use_dict=use_dict
    )


def get_total_pnl() -> int:
    """
    Calculate total profit/loss across all positions.
    
    Returns:
        Total PnL in cents
    """
    query = "SELECT SUM(pnl) FROM kalshi_positions;"
    result = execute_query(query, fetch_one=True)
    return result[0] if result and result[0] else 0


def get_pnl_by_series() -> List[Dict]:
    """
    Get profit/loss grouped by series.
    
    Returns:
        List of dictionaries with series ticker, title, and total PnL
    """
    query = """
        SELECT 
            series_ticker, 
            series_title,
            SUM(pnl) as total_pnl,
            SUM(total_absolute_position) as total_position
        FROM kalshi_positions
        GROUP BY series_ticker, series_title
        ORDER BY total_pnl DESC;
    """
    return execute_query(query, fetch=True, use_dict=True)


def refresh_positions() -> bool:
    """
    Refresh all positions by fetching latest data from API.
    Clears existing data and inserts fresh data.
    
    Returns:
        True if successful, False otherwise
    """
    try:
        # Fetch latest holdings
        holdings_data = get_user_holdings()
        if not holdings_data:
            print("Failed to fetch holdings data")
            return False
        
        # Process and enrich with series info
        enriched_positions = process_holdings_with_series_info(holdings_data)
        
        if not enriched_positions:
            print("No positions to update")
            return False
        
        # Clear existing data
        truncate_table("kalshi_positions")
        
        # Insert fresh data
        return insert_positions_bulk(enriched_positions)
        
    except Exception as e:
        print(f"Error refreshing positions: {e}")
        return False


def delete_position_by_market_id(market_id: str) -> int:
    """
    Delete a position by market ID.
    
    Args:
        market_id: The market ID to delete
        
    Returns:
        Number of rows deleted
    """
    return delete_record("kalshi_positions", "market_id = %s", (market_id,))


def print_positions_summary():
    """
    Print a summary of all positions.
    """
    print("\n" + "="*80)
    print("KALSHI POSITIONS SUMMARY")
    print("="*80)
    
    total_positions = count_records("kalshi_positions")
    print(f"\nTotal Positions: {total_positions}")
    
    total_pnl = get_total_pnl()
    print(f"Total P&L: ${total_pnl / 100:.2f}")
    
    print("\n" + "-"*80)
    print("P&L by Series:")
    print("-"*80)
    
    pnl_by_series = get_pnl_by_series()
    for series in pnl_by_series:
        print(f"{series['series_ticker']:20} | {series['series_title']:30} | "
              f"Position: {series['total_position']:5} | "
              f"P&L: ${series['total_pnl'] / 100:8.2f}")
    
    print("="*80 + "\n")


# ============= EXAMPLE USAGE =============

if __name__ == "__main__":
    # Create the table if it doesn't exist
    if not table_exists("kalshi_positions"):
        print("Creating kalshi_positions table...")
        create_kalshi_positions_table()
    
    # Example: Insert sample data from your API response
    
    # Process and insert sample data
    print("Processing sample holdings data...")
    holdings_data = get_user_holdings()
    enriched_positions = process_holdings_with_series_info(holdings_data)
    
    if enriched_positions:
        print(f"Inserting {len(enriched_positions)} positions...")
        insert_positions_bulk(enriched_positions)
        
        # Print summary
        print_positions_summary()
        
        # Show all positions
        print("\nDetailed Positions:")
        positions = get_all_positions()
        for pos in positions:
            print(f"\n{pos['market_ticker']}")
            print(f"  Series: {pos['series_title'] or pos['series_ticker']}")
            print(f"  Position: {pos['signed_open_position']}")
            print(f"  P&L: ${pos['pnl'] / 100:.2f}")
