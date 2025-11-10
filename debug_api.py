#!/usr/bin/env python3
"""Debug script to see actual API response fields"""

from kalshi import get_user_holdings
import json

print("Fetching holdings data...")
data = get_user_holdings()

if data and 'market_positions' in data:
    positions = data['market_positions']
    print(f"\nFound {len(positions)} positions")
    
    # Find a position with non-zero position
    active_positions = [p for p in positions if p.get('position', 0) != 0]
    print(f"Active positions (non-zero): {len(active_positions)}")
    
    # Check for all KXGOVSHUTLENGTH positions
    gov_positions = [p for p in positions if 'KXGOVSHUTLENGTH' in p.get('ticker', '')]
    print(f"\nAll KXGOVSHUTLENGTH positions (including zero): {len(gov_positions)}")
    for pos in gov_positions:
        print(f"  {pos.get('ticker')}: position={pos.get('position')}, realized_pnl=${pos.get('realized_pnl', 0)/100:.2f}, fees=${pos.get('fees_paid', 0)/100:.2f}")
    
    if active_positions:
        print("\n" + "="*80)
        print("FIRST ACTIVE POSITION - ALL FIELDS:")
        print("="*80)
        first_pos = active_positions[0]
        for key, value in first_pos.items():
            print(f"{key:30} = {value}")
        
        # Check for unrealized_pnl field
        if 'unrealized_pnl' in first_pos:
            print(f"\n✓ unrealized_pnl field found!")
        else:
            print(f"\n✗ unrealized_pnl field NOT found in API response")
        
        print("\n" + "="*80)
        print("KEY P&L FIELDS:")
        print("="*80)
        print(f"ticker: {first_pos.get('ticker')}")
        print(f"position: {first_pos.get('position')} contracts")
        print(f"\nrealized_pnl: {first_pos.get('realized_pnl')} cents = ${first_pos.get('realized_pnl', 0)/100:.2f}")
        print(f"total_traded: {first_pos.get('total_traded')} cents = ${first_pos.get('total_traded', 0)/100:.2f}")
        print(f"fees_paid: {first_pos.get('fees_paid')} cents = ${first_pos.get('fees_paid', 0)/100:.2f}")
        print(f"market_exposure: {first_pos.get('market_exposure')} cents = ${first_pos.get('market_exposure', 0)/100:.2f}")
        
        # Show all positions with detailed P&L breakdown
        print("\n" + "="*80)
        print("ALL ACTIVE POSITIONS - DETAILED P&L:")
        print("="*80)
        
        # Expected values from user (updated)
        expected_pnl = {
            'KXNBAGAME-25NOV10MILDAL-DAL': -43,
            'KXNBATOTAL-25NOV10ATLLAC-222': -52,
            'KXNFLGAME-25NOV10PHIGB-GB': -63,
            'KXGOVSHUTLENGTH-26JAN01-45D': -250  # Updated to -2.50
        }
        
        for pos in active_positions:
            ticker = pos.get('ticker')
            print(f"\n{ticker}")
            print(f"  Position: {pos.get('position')} contracts")
            print(f"  Realized P&L: ${pos.get('realized_pnl', 0)/100:.2f}")
            print(f"  Total Traded: ${pos.get('total_traded', 0)/100:.2f}")
            print(f"  Fees Paid: ${pos.get('fees_paid', 0)/100:.2f}")
            print(f"  Market Exposure: ${pos.get('market_exposure', 0)/100:.2f}")
            
            # Try different P&L calculations
            position = pos.get('position', 0)
            realized = pos.get('realized_pnl', 0)
            fees = pos.get('fees_paid', 0)
            exposure = pos.get('market_exposure', 0)
            traded = pos.get('total_traded', 0)
            
            calc1 = realized - fees
            calc2 = exposure - traded + realized - fees
            calc3 = exposure - traded - fees
            calc4 = realized - traded
            
            print(f"  Calc 1 (realized - fees): ${calc1/100:.2f}")
            print(f"  Calc 2 (exposure - traded + realized - fees): ${calc2/100:.2f}")
            print(f"  Calc 3 (exposure - traded - fees): ${calc3/100:.2f}")
            print(f"  Calc 4 (realized - traded): ${calc4/100:.2f}")
            
            expected = expected_pnl.get(ticker)
            if expected:
                print(f"  ⭐ EXPECTED: ${expected/100:.2f}")
                if abs(calc1 - expected) < 1:
                    print(f"  ✓ Calc 1 MATCHES!")
                elif abs(calc2 - expected) < 1:
                    print(f"  ✓ Calc 2 MATCHES!")
                elif abs(calc3 - expected) < 1:
                    print(f"  ✓ Calc 3 MATCHES!")
                elif abs(calc4 - expected) < 1:
                    print(f"  ✓ Calc 4 MATCHES!")
                else:
                    print(f"  ✗ NO MATCH")
                    print(f"    Diff from Calc 1: ${(calc1 - expected)/100:.2f}")
                    print(f"    Diff from Calc 2: ${(calc2 - expected)/100:.2f}")
                    print(f"    Diff from Calc 3: ${(calc3 - expected)/100:.2f}")
                    print(f"    Diff from Calc 4: ${(calc4 - expected)/100:.2f}")
    else:
        print("\nNo active positions found")
else:
    print("Failed to fetch data or no positions found")
