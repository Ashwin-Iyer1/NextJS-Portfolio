import os
import time
import requests
import hashlib
import base64
from typing import Dict, List, Optional
from dotenv import load_dotenv
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend

load_dotenv()

def get_series_info(series_ticker: str) -> Optional[Dict]:
    """
    Fetch series information from Kalshi API.
    
    Args:
        series_ticker: The series ticker symbol (e.g., "KXNBAGAME")
        
    Returns:
        Dictionary containing series information or None if request fails
    """
    url = f"https://api.elections.kalshi.com/trade-api/v2/series/{series_ticker}"
    
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
    url = f"https://api.elections.kalshi.com/trade-api/v2/markets/{market_ticker}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching market info for {market_ticker}: {e}")
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


def get_user_holdings() -> Optional[Dict]:
    """
    Fetch user portfolio positions from Kalshi API using authenticated endpoint.
    
    Returns:
        Dictionary containing positions data or None if request fails
    """
    api_path = "/trade-api/v2/portfolio/positions"
    api_url = f"https://api.elections.kalshi.com{api_path}"
    
    # Get credentials from environment
    access_key = os.getenv("KALSHI-ACCESS-KEY")
    private_key = os.getenv("KALSHI-ACCESS-SIGNATURE")  # This is actually your private key
    
    if not access_key or not private_key:
        print("Error: KALSHI-ACCESS-KEY and KALSHI-ACCESS-SIGNATURE must be set in .env file")
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


def process_holdings_with_series_info(holdings_data: Dict) -> List[Dict]:
    """
    Process portfolio positions data and enrich it with series and market information.
    
    Args:
        holdings_data: Raw portfolio positions data from API
        
    Returns:
        List of enriched positions with series and market information
    """
    enriched_holdings = []
    
    # Process market positions
    for market_pos in holdings_data.get('market_positions', []):
        ticker = market_pos.get('ticker', '')
        position = market_pos.get('position', 0)
        
        # Skip positions with 0 shares (closed positions)
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
        
        # Extract event ticker (format: SERIESNAME-DATE)
        parts = ticker.split('-')
        event_ticker = '-'.join(parts[:2]) if len(parts) >= 2 else ticker
        
        # Determine position side (YES for positive, NO for negative)
        position_side = "YES" if position > 0 else "NO"
        
        # Get market details
        market_data = market_info.get('market', {}) if market_info else {}
        
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
            'current_price': market_data.get('last_price', 0),
            'pnl': market_pos.get('realized_pnl', 0),  # PnL in cents
            'social_id': None  # Not provided in this API endpoint
        }
        enriched_holdings.append(enriched_holding)
    
    return enriched_holdings
