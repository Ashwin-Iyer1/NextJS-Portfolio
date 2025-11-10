#!/usr/bin/env python3
"""Test script to check trades endpoint and calculate accurate P&L"""

from kalshi import get_user_trades, calculate_pnl_from_trades

# Test fetching trades
print("Fetching user trades...")
trades_data = get_user_trades(limit=200)

if trades_data and 'fills' in trades_data:
    fills = trades_data['fills']
    print(f"\n✓ Found {len(fills)} trades")
    
    # Group trades by ticker
    tickers = {}
    for fill in fills:
        ticker = fill.get('ticker', '')
        if ticker not in tickers:
            tickers[ticker] = []
        tickers[ticker].append(fill)
    
    print(f"Trades across {len(tickers)} different tickers\n")
    
    # Show first fill structure
    if fills:
        print("Sample fill structure:")
        print(fills[0])
        print()
    
    # Show recent trades for key positions
    key_tickers = [
        'KXNBAGAME-25NOV10MILDAL-DAL',
        'KXNBATOTAL-25NOV10ATLLAC-222',
        'KXNFLGAME-25NOV10PHIGB-GB',
        'KXGOVSHUTLENGTH-26JAN01-45D'
    ]
    
    print("="*80)
    print("TRADES FOR KEY POSITIONS:")
    print("="*80)
    
    for ticker in key_tickers:
        if ticker in tickers:
            ticker_fills = tickers[ticker]
            print(f"\n{ticker} ({len(ticker_fills)} trades):")
            
            # Show first few trades
            for i, fill in enumerate(ticker_fills[:5], 1):
                side = fill.get('side', '')
                action = fill.get('action', '')
                count = fill.get('count', 0)
                yes_price = fill.get('yes_price', 0)
                no_price = fill.get('no_price', 0)
                price = yes_price if side == 'yes' else no_price
                trade_value = count * price
                
                print(f"  {i}. {action.upper()} {count} @ {price}¢ ({side.upper()}) = ${trade_value/100:.2f}")
            
            if len(ticker_fills) > 5:
                print(f"  ... and {len(ticker_fills) - 5} more trades")
            
            # Calculate P&L
            print(f"\n  Calculating P&L from trades...")
            pnl_data = calculate_pnl_from_trades(ticker)
            print(f"  Total Cost: ${pnl_data['total_cost']/100:.2f}")
            print(f"  Total Sales: ${pnl_data['total_sales']/100:.2f}")
            print(f"  Net Position: {pnl_data['net_position']} contracts")
            print(f"  Realized P&L: ${pnl_data['realized_pnl']/100:.2f}")
            print(f"  Avg Cost: {pnl_data['avg_cost']:.2f}¢/contract")
        else:
            print(f"\n{ticker}: No trades found")
    
else:
    print("✗ Failed to fetch trades data")
