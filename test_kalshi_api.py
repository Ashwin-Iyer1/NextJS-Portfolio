#!/usr/bin/env python3
"""
Quick test script to verify Kalshi API authentication and data fetching
"""

import os
from dotenv import load_dotenv
from kalshi import get_user_holdings, process_holdings_with_series_info

load_dotenv()

def test_api_credentials():
    """Test if API credentials are configured"""
    print("="*80)
    print("TESTING KALSHI API CREDENTIALS")
    print("="*80 + "\n")
    
    access_key = os.getenv("KALSHI-ACCESS-KEY")
    access_signature = os.getenv("KALSHI-ACCESS-SIGNATURE")
    
    print(f"KALSHI-ACCESS-KEY set: {'✓ Yes' if access_key else '✗ No'}")
    print(f"KALSHI-ACCESS-SIGNATURE set: {'✓ Yes' if access_signature else '✗ No'}")
    
    if not access_key or not access_signature:
        print("\n⚠️  Please set your Kalshi API credentials in .env file:")
        print("   KALSHI-ACCESS-KEY=your_key_here")
        print("   KALSHI-ACCESS-SIGNATURE=your_signature_here")
        print("\n   Get credentials at: https://kalshi.com/settings/api")
        return False
    
    print("\n✓ Credentials are configured\n")
    return True


def test_api_fetch():
    """Test fetching data from API"""
    print("="*80)
    print("TESTING API DATA FETCH")
    print("="*80 + "\n")
    
    print("Fetching portfolio positions from Kalshi API...")
    holdings_data = get_user_holdings()
    
    if not holdings_data:
        print("✗ Failed to fetch data from API")
        print("\nPossible issues:")
        print("  - Invalid API credentials")
        print("  - Network connectivity problem")
        print("  - API rate limiting")
        return None
    
    print("✓ Successfully fetched data from API\n")
    
    # Display summary
    market_positions = holdings_data.get('market_positions', [])
    event_positions = holdings_data.get('event_positions', [])
    
    print(f"Market Positions: {len(market_positions)}")
    print(f"Event Positions: {len(event_positions)}")
    
    if market_positions:
        print("\nFirst 3 market positions:")
        for i, pos in enumerate(market_positions[:3], 1):
            print(f"\n  {i}. {pos.get('ticker', 'N/A')}")
            print(f"     Position: {pos.get('position', 0)} contracts")
            print(f"     Realized P&L: ${pos.get('realized_pnl', 0) / 100:.2f}")
            print(f"     Total Cost: ${pos.get('total_cost', 0) / 100:.2f}")
            print(f"     Fees Paid: ${pos.get('fees_paid', 0) / 100:.2f}")
    
    return holdings_data


def test_data_processing(holdings_data):
    """Test processing and enriching data"""
    print("\n" + "="*80)
    print("TESTING DATA PROCESSING")
    print("="*80 + "\n")
    
    print("Processing positions and fetching series info...")
    enriched = process_holdings_with_series_info(holdings_data)
    
    print(f"✓ Processed {len(enriched)} positions\n")
    
    if enriched:
        print("First enriched position:")
        pos = enriched[0]
        print(f"  Market Ticker: {pos.get('market_ticker')}")
        print(f"  Series Ticker: {pos.get('series_ticker')}")
        print(f"  Series Title: {pos.get('series_title') or 'N/A'}")
        print(f"  Event Ticker: {pos.get('event_ticker')}")
        print(f"  Position: {pos.get('signed_open_position')} contracts ({pos.get('position_side')})")
        print(f"  Current Price: {pos.get('current_price')}¢")
        print(f"  Total P&L: ${pos.get('pnl', 0) / 100:.2f}")
    
    return enriched


def main():
    print("\n")
    
    # Test 1: Credentials
    if not test_api_credentials():
        return
    
    # Test 2: API Fetch
    holdings_data = test_api_fetch()
    if not holdings_data:
        return
    
    # Test 3: Data Processing
    enriched = test_data_processing(holdings_data)
    
    print("\n" + "="*80)
    print("✓ ALL TESTS PASSED!")
    print("="*80)
    print("\n💡 You can now run 'python kalshi_hourly.py' to update your database\n")


if __name__ == "__main__":
    main()
