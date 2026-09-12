import os
import time
import requests
import hashlib
import base64
from decimal import Decimal, InvalidOperation
from typing import Dict, List, Optional
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend
# from dotenv import load_dotenv
# load_dotenv()


def _as_decimal(value, default: str = "0") -> Decimal:
    """Parse Kalshi's fixed-point string values without float rounding."""
    if value is None or value == "":
        return Decimal(default)

    try:
        return Decimal(str(value))
    except (InvalidOperation, TypeError, ValueError):
        return Decimal(default)


def _dollars_to_cents(value) -> Decimal:
    """Convert a Kalshi ``*_dollars`` fixed-point value to cents."""
    return _as_decimal(value) * Decimal("100")


def get_kalshi_credentials():
    """
    Read Kalshi API credentials from the environment.

    Prefers KALSHI_ACCESS_KEY / KALSHI_ACCESS_SIGNATURE (GitHub Actions and
    Vercel disallow hyphens in env var names) and falls back to the legacy
    hyphenated KALSHI-ACCESS-KEY / KALSHI-ACCESS-SIGNATURE names still set
    on Heroku.

    Returns:
        Tuple of (access_key, private_key); either may be None if unset.
    """
    access_key = os.getenv("KALSHI_ACCESS_KEY") or os.getenv("KALSHI-ACCESS-KEY")
    private_key = os.getenv("KALSHI_ACCESS_SIGNATURE") or os.getenv("KALSHI-ACCESS-SIGNATURE")
    return access_key, private_key


def get_series_info(series_ticker: str) -> Optional[Dict]:
    """
    Fetch series information from Kalshi API.
    
    Args:
        series_ticker: The series ticker symbol (e.g., "KXNBAGAME")
        
    Returns:
        Dictionary containing series information or None if request fails
    """
    url = f"https://external-api.kalshi.com/trade-api/v2/series/{series_ticker}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching series info for {series_ticker}: {e}")
        return None


def get_market_info(market_ticker: str) -> Optional[Dict]:
    """
    Fetch market information from Kalshi API.
    
    Args:
        market_ticker: The market ticker symbol (e.g., "KXNBAGAME-25NOV10MILDAL-DAL")
        
    Returns:
        Dictionary containing market information or None if request fails
    """
    url = f"https://external-api.kalshi.com/trade-api/v2/markets/{market_ticker}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching market info for {market_ticker}: {e}")
        return None


def get_user_trades(ticker: Optional[str] = None, limit: int = 100) -> Optional[Dict]:
    """
    Fetch user's trade history from Kalshi API.
    
    Args:
        ticker: Optional ticker to filter trades for a specific market
        limit: Maximum number of trades to return (default: 100)
        
    Returns:
        Dictionary containing trades data or None if request fails
    """
    api_path = "/trade-api/v2/portfolio/fills"
    api_url = f"https://api.elections.kalshi.com{api_path}"
    
    # Add query parameters
    params = {"limit": limit}
    if ticker:
        params["ticker"] = ticker
    
    # Get credentials from environment
    access_key, private_key = get_kalshi_credentials()

    if not access_key or not private_key:
        print("Error: KALSHI_ACCESS_KEY and KALSHI_ACCESS_SIGNATURE (or legacy KALSHI-ACCESS-KEY/KALSHI-ACCESS-SIGNATURE) must be set")
        return None

    # Generate timestamp in milliseconds
    timestamp = str(int(time.time() * 1000))

    # Generate signature (path without query params)
    try:
        signature = sign_request(timestamp, "GET", api_path, private_key)
    except Exception as e:
        print(f"Error generating signature: {e}")
        return None
    
    # Set up headers with authentication
    headers = {
        "KALSHI-ACCESS-KEY": access_key,
        "KALSHI-ACCESS-SIGNATURE": signature,
        "KALSHI-ACCESS-TIMESTAMP": timestamp
    }
    
    try:
        response = requests.get(api_url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching trades: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        return None


def sign_request(timestamp: str, method: str, path: str, private_key_pem: str) -> str:
    """
    Generate RSA signature for Kalshi API request.
    
    Args:
        timestamp: Request timestamp in milliseconds
        method: HTTP method (GET, POST, etc.)
        path: API path (e.g., /trade-api/v2/portfolio/positions)
        private_key_pem: Your Kalshi private key in PEM format
        
    Returns:
        Base64-encoded signature
    """
    # Strip query parameters from path before signing
    path_without_query = path.split('?')[0]
    
    # Create the message to sign: timestamp + method + path
    message = f"{timestamp}{method}{path_without_query}".encode('utf-8')
    
    # Ensure the PEM key has proper line breaks
    # If it doesn't have actual newlines, it might have literal \n strings
    if '\\n' in private_key_pem:
        private_key_pem = private_key_pem.replace('\\n', '\n')
    
    # Ensure PEM key has proper headers if missing
    if not private_key_pem.strip().startswith('-----BEGIN'):
        # Add PEM headers
        private_key_pem = f"-----BEGIN RSA PRIVATE KEY-----\n{private_key_pem.strip()}\n-----END RSA PRIVATE KEY-----"
    
    # Load the private key
    private_key = serialization.load_pem_private_key(
        private_key_pem.encode('utf-8'),
        password=None,
        backend=default_backend()
    )
    
    # Sign the message using RSA-PSS with SHA256
    signature = private_key.sign(
        message,
        padding.PSS(
            mgf=padding.MGF1(hashes.SHA256()),
            salt_length=padding.PSS.DIGEST_LENGTH
        ),
        hashes.SHA256()
    )
    
    # Return base64-encoded signature
    return base64.b64encode(signature).decode('utf-8')


def get_event_positions() -> Optional[Dict]:
    """
    Fetch user event positions from Kalshi API using the v1 endpoint.
    This endpoint provides position_cost which is the actual cost basis.
    
    Returns:
        Dictionary containing event positions data or None if request fails
    """
    user_id = "7b8f944b-1a09-41e5-9e7f-bf75a5ca0408"
    api_path = f"/v1/users/{user_id}/event_positions"
    api_url = f"https://api.elections.kalshi.com{api_path}"
    
    # Get credentials from environment
    access_key, private_key = get_kalshi_credentials()

    if not access_key or not private_key:
        print("Error: KALSHI_ACCESS_KEY and KALSHI_ACCESS_SIGNATURE (or legacy KALSHI-ACCESS-KEY/KALSHI-ACCESS-SIGNATURE) must be set")
        return None

    # Generate timestamp in milliseconds
    timestamp = str(int(time.time() * 1000))

    # Generate signature (include query params in path)
    try:
        signature = sign_request(timestamp, "GET", f"{api_path}?position_status=open", private_key)
    except Exception as e:
        print(f"Error generating signature: {e}")
        return None
    
    # Set up headers with authentication
    headers = {
        "KALSHI-ACCESS-KEY": access_key,
        "KALSHI-ACCESS-SIGNATURE": signature,
        "KALSHI-ACCESS-TIMESTAMP": timestamp
    }
    
    try:
        response = requests.get(api_url, headers=headers, params={"position_status": "open"})
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching event positions: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        return None


def get_user_holdings() -> Optional[Dict]:
    """
    Fetch user portfolio positions from Kalshi API using authenticated endpoint.
    
    Returns:
        Dictionary containing positions data or None if request fails
    """
    # Remove the query parameter - try fetching all positions
    api_path = "/trade-api/v2/portfolio/positions"
    api_url = f"https://api.elections.kalshi.com{api_path}"
    
    # Get credentials from environment
    access_key, private_key = get_kalshi_credentials()  # private_key is actually your private key

    if not access_key or not private_key:
        print("Error: KALSHI_ACCESS_KEY and KALSHI_ACCESS_SIGNATURE (or legacy KALSHI-ACCESS-KEY/KALSHI-ACCESS-SIGNATURE) must be set")
        return None
    
    # Generate timestamp in milliseconds
    timestamp = str(int(time.time() * 1000))
    
    # Generate signature
    try:
        signature = sign_request(timestamp, "GET", api_path, private_key)
    except Exception as e:
        print(f"Error generating signature: {e}")
        print(f"\nDebug: First 50 chars of private key: {private_key[:50]}...")
        backslash_n = '\\n'
        has_literal_backslash_n = backslash_n in private_key
        has_actual_newlines = '\n' in private_key
        print(f"Debug: Key contains \\n literal: {has_literal_backslash_n}")
        print(f"Debug: Key contains actual newlines: {has_actual_newlines}")
        return None
    
    # Set up headers with authentication
    headers = {
        "KALSHI-ACCESS-KEY": access_key,
        "KALSHI-ACCESS-SIGNATURE": signature,
        "KALSHI-ACCESS-TIMESTAMP": timestamp
    }
    
    try:
        response = requests.get(api_url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching holdings: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response status: {e.response.status_code}")
            print(f"Response body: {e.response.text}")
        return None


def calculate_pnl_from_trades(ticker: str) -> Dict:
    """
    Calculate P&L for a specific ticker from trade history.
    
    Args:
        ticker: The market ticker to calculate P&L for
        
    Returns:
        Dictionary with P&L breakdown: {
            'total_cost': total amount spent on buys,
            'total_sales': total amount received from sells,
            'net_position': current net position (contracts),
            'realized_pnl': P&L from closed positions,
            'avg_cost': average cost per contract
        }
    """
    trades_data = get_user_trades(ticker=ticker)
    
    if not trades_data or 'fills' not in trades_data:
        return {
            'total_cost': 0,
            'total_sales': 0,
            'net_position': 0,
            'realized_pnl': 0,
            'avg_cost': 0,
            'total_fees': 0
        }
    
    fills = trades_data['fills']
    
    total_cost = 0
    total_sales = 0
    net_position = 0
    total_fees = 0
    
    for fill in fills:
        count = fill.get('count', 0)
        yes_price = fill.get('yes_price', 0)
        no_price = fill.get('no_price', 0)
        side = fill.get('side', '')  # 'yes' or 'no'
        action = fill.get('action', '')  # 'buy' or 'sell'
        
        # Calculate trade value
        price = yes_price if side == 'yes' else no_price
        trade_value = count * price
        
        if action == 'buy':
            total_cost += trade_value
            net_position += count if side == 'yes' else -count
        elif action == 'sell':
            total_sales += trade_value
            net_position -= count if side == 'yes' else -count
    
    # Calculate realized P&L (only for closed positions)
    realized_pnl = total_sales - total_cost
    
    # Calculate average cost
    avg_cost = (total_cost / abs(net_position)) if net_position != 0 else 0
    
    return {
        'total_cost': total_cost,
        'total_sales': total_sales,
        'net_position': net_position,
        'realized_pnl': realized_pnl,
        'avg_cost': avg_cost,
        'total_fees': total_fees
    }


def process_holdings_with_series_info(holdings_data: Dict) -> List[Dict]:
    """
    Process portfolio positions data and enrich it with series and market information.

    Kalshi's current API returns contract counts in ``position_fp`` and monetary
    values in ``*_dollars`` fixed-point strings. Legacy integer fields remain as
    fallbacks so older captured payloads can still be processed.
    
    Args:
        holdings_data: Raw portfolio positions data from API (v2 endpoint)
        
    Returns:
        List of enriched positions with series and market information
    """
    enriched_holdings = []
    
    # Process market positions
    for market_pos in holdings_data.get('market_positions', []):
        ticker = market_pos.get('ticker', '')
        position = _as_decimal(
            market_pos.get('position_fp', market_pos.get('position', 0))
        )
        
        # Skip closed positions (only show active positions with open contracts)
        if position == 0:
            continue
        
        # Extract series ticker from market ticker (format: SERIESNAME-DATE-OUTCOME)
        # Example: "KXNBAGAME-25NOV10MILDAL-DAL" -> series = "KXNBAGAME"
        series_ticker = ticker.split('-')[0] if ticker else None
        
        # Fetch series information
        series_info = None
        if series_ticker:
            series_info = get_series_info(series_ticker)
        
        # Fetch market information to get position details
        market_info = get_market_info(ticker)
        
        # Prefer the API relationship; retain ticker parsing as a fallback.
        parts = ticker.split('-')
        parsed_event_ticker = '-'.join(parts[:2]) if len(parts) >= 2 else ticker
        
        # Determine position side (YES for positive, NO for negative)
        position_side = "YES" if position > 0 else "NO"
        
        # Get market details
        market_data = market_info.get('market', {}) if market_info else {}
        event_ticker = market_data.get('event_ticker') or parsed_event_ticker
        
        # Get current market price (in cents)
        if 'last_price_dollars' in market_data:
            current_price = _dollars_to_cents(market_data['last_price_dollars'])
        else:
            current_price = _as_decimal(market_data.get('last_price', 0))
        
        # The current positions response contains the cost basis and P&L values.
        if 'market_exposure_dollars' in market_pos:
            position_cost = abs(
                _dollars_to_cents(market_pos['market_exposure_dollars'])
            )
        else:
            position_cost = abs(_as_decimal(market_pos.get('market_exposure', 0)))

        if 'realized_pnl_dollars' in market_pos:
            realized_pnl = _dollars_to_cents(
                market_pos['realized_pnl_dollars']
            )
        else:
            realized_pnl = _as_decimal(market_pos.get('realized_pnl', 0))

        if 'fees_paid_dollars' in market_pos:
            fees_paid = _dollars_to_cents(market_pos['fees_paid_dollars'])
        else:
            fees_paid = _as_decimal(market_pos.get('fees_paid', 0))
        
        # Calculate current market value based on current price and position
        # For YES positions: value = position * current_price
        # For NO positions: value = abs(position) * (100 - current_price)
        if position > 0:
            # YES position
            current_market_value = abs(position) * current_price
        else:
            # NO position (short on YES = long on NO)
            current_market_value = abs(position) * (
                Decimal("100") - current_price
            )
        
        # Calculate total P&L including unrealized gains/losses:
        # Total P&L = (Current Market Value) - (Position Cost) + (Realized P&L) - (Fees)
        # position_cost is the actual cost basis for the current position
        total_pnl = current_market_value - position_cost + realized_pnl - fees_paid
        
        # Calculate average purchase price (cost per contract in cents)
        side_purchase_price = position_cost / abs(position)
        # The UI stores/displays YES-equivalent prices and flips them for NO.
        purchase_price = (
            side_purchase_price
            if position > 0
            else Decimal("100") - side_purchase_price
        )
        
        enriched_holding = {
            'event_ticker': event_ticker,
            'series_ticker': series_ticker,
            'series_title': series_info['series']['title'] if series_info and 'series' in series_info else None,
            'series_category': series_info['series']['category'] if series_info and 'series' in series_info else None,
            'total_absolute_position': abs(position),
            'market_id': ticker,  # Using ticker as unique identifier
            'market_ticker': ticker,
            'market_title': market_data.get('title'),
            'market_subtitle': market_data.get('subtitle'),
            'yes_sub_title': market_data.get('yes_sub_title'),
            'no_sub_title': market_data.get('no_sub_title'),
            'position_side': position_side,
            'signed_open_position': position,
            'current_price': current_price,
            'purchase_price': purchase_price,  # Average purchase price per contract in cents
            'pnl': total_pnl,  # Total P&L in cents (realized + unrealized)
            'fees_paid': fees_paid,  # Total fees paid in cents
            'social_id': None  # Not provided in this API endpoint
        }
        enriched_holdings.append(enriched_holding)
    
    return enriched_holdings
