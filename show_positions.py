#!/usr/bin/env python3
"""
Display detailed Kalshi positions with market information
"""

from kalshi_tracker import get_all_positions

def display_detailed_positions():
    """Display all positions with full market details"""
    positions = get_all_positions()
    
    if not positions:
        print("No positions found in database.")
        print("Run 'python kalshi_hourly.py' to fetch your positions.")
        return
    
    print("\n" + "="*100)
    print("DETAILED KALSHI POSITIONS")
    print("="*100)
    
    for i, pos in enumerate(positions, 1):
        print(f"\n{'='*100}")
        print(f"Position #{i}: {pos['market_ticker']}")
        print(f"{'='*100}")
        
        # Market details
        print(f"\n📊 MARKET DETAILS:")
        print(f"  Title: {pos['market_title'] or 'N/A'}")
        if pos['market_subtitle']:
            print(f"  Subtitle: {pos['market_subtitle']}")
        
        # Position details
        print(f"\n💼 YOUR POSITION:")
        print(f"  Side Taken: {pos['position_side']} ({pos['signed_open_position']} contracts)")
        
        # Show what YES and NO mean
        print(f"\n📝 OUTCOMES:")
        if pos['yes_sub_title']:
            print(f"  YES = {pos['yes_sub_title']}")
        if pos['no_sub_title']:
            print(f"  NO = {pos['no_sub_title']}")
        
        # Market info
        print(f"\n💰 MARKET INFO:")
        print(f"  Current Price: {pos['current_price']}¢")
        print(f"  Realized P&L: ${pos['pnl'] / 100:.2f}")
        
        # Series/Category
        print(f"\n🏷️  CATEGORY:")
        print(f"  Series: {pos['series_title'] or pos['series_ticker']}")
        print(f"  Category: {pos['series_category'] or 'N/A'}")
        
        # Event
        print(f"\n📅 EVENT:")
        print(f"  Event Ticker: {pos['event_ticker']}")
        print(f"  Last Updated: {pos['last_updated']}")
    
    print("\n" + "="*100)
    print(f"Total Active Positions: {len(positions)}")
    total_pnl = sum(p['pnl'] for p in positions)
    print(f"Total P&L: ${total_pnl / 100:.2f}")
    print("="*100 + "\n")


if __name__ == "__main__":
    display_detailed_positions()
