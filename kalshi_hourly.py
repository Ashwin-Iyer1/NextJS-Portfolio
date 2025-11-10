"""
Kalshi Position Updater - Scheduled Script
Automatically updates Kalshi positions from API
Similar to hourly.py for WakaTime tracking
Uses insert_positions_bulk() to efficiently update all positions
"""

from kalshi_tracker import (
    create_kalshi_positions_table,
    table_exists,
    refresh_positions,
    print_positions_summary,
    get_total_pnl,
    count_records,
    insert_positions_bulk,
    truncate_table
)
from kalshi import get_user_holdings, process_holdings_with_series_info


def main():
    """
    Main function to update Kalshi positions.
    Can be run on a schedule (e.g., hourly via cron or Heroku Scheduler).
    """
    print("\n" + "="*80)
    print("KALSHI POSITION UPDATE - Starting...")
    print("="*80 + "\n")
    
    # Ensure table exists
    if not table_exists("kalshi_positions"):
        print("Table doesn't exist. Creating kalshi_positions table...")
        if not create_kalshi_positions_table():
            print("ERROR: Failed to create table. Exiting.")
            return
    
    # Get current state
    old_count = count_records("kalshi_positions")
    old_pnl = get_total_pnl()
    
    print(f"Current positions in DB: {old_count}")
    print(f"Current total P&L: ${old_pnl / 100:.2f}")
    
    # Refresh positions using bulk insert
    print("\nFetching latest positions from API...")
    try:
        # Fetch latest holdings
        holdings_data = get_user_holdings()
        if not holdings_data:
            print("\n✗ Failed to fetch holdings data from API.")
            print("Check your KALSHI-ACCESS-KEY and KALSHI-ACCESS-SIGNATURE in .env file.")
            print("Get your credentials at: https://kalshi.com/settings/api")
            return
        
        market_count = len(holdings_data.get('market_positions', []))
        print(f"✓ Fetched portfolio data ({market_count} market positions)")
        
        # Process and enrich with series info
        print("Processing holdings and fetching series information...")
        enriched_positions = process_holdings_with_series_info(holdings_data)
        
        if not enriched_positions:
            print("\n✗ No positions to update.")
            return
        
        print(f"✓ Processed {len(enriched_positions)} positions with series info")
        
        # Clear existing data
        print("\nClearing existing positions from database...")
        truncate_table("kalshi_positions")
        print("✓ Table cleared")
        
        # Bulk insert fresh data
        print(f"Inserting {len(enriched_positions)} positions using bulk insert...")
        if insert_positions_bulk(enriched_positions):
            new_count = count_records("kalshi_positions")
            new_pnl = get_total_pnl()
            pnl_change = new_pnl - old_pnl
            
            print(f"\n✓ Positions updated successfully!")
            print(f"  New position count: {new_count}")
            print(f"  New total P&L: ${new_pnl / 100:.2f}")
            
            if pnl_change != 0:
                change_symbol = "+" if pnl_change > 0 else ""
                print(f"  P&L Change: {change_symbol}${pnl_change / 100:.2f}")
            
            # Print detailed summary
            print_positions_summary()
        else:
            print("\n✗ Failed to insert positions into database.")
            
    except Exception as e:
        print(f"\n✗ Error during position update: {e}")
        print("Check your API configuration and database connection.")


if __name__ == "__main__":
    main()
