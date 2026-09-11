from typing import Any, Dict, Optional

import requests

from token_manager import TokenManager

class WakaTimeClient:
    """Client for WakaTime API with automated token management."""
    
    BASE_URL = "https://api.wakatime.com/api/v1"
    TOKEN_URL = "https://wakatime.com/oauth/token"
    REQUEST_TIMEOUT = 20

    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret
        self.token_manager = TokenManager("wakatime")
        self.session = requests.Session()
        self.tokens = {}
        self.last_error = None
        self._load_tokens()

    def _load_tokens(self):
        """Load tokens using TokenManager."""
        self.tokens = self.token_manager.load_tokens()
        access_token = self.tokens.get('access_token')
        if access_token:
            self.session.headers.update({
                "Authorization": f"Bearer {access_token}"
            })

    def _save_tokens(self, tokens: Dict[str, Any]):
        """Save tokens using TokenManager."""
        self.tokens = tokens
        if not self.token_manager.save_tokens(tokens):
            print("⚠️ WakaTime tokens were refreshed but could not be persisted.")
        
        self.session.headers.update({
            "Authorization": f"Bearer {self.tokens.get('access_token')}"
        })

    def _refresh_token(self):
        """Refresh the access token."""
        print("🔄 Refreshing WakaTime access token...")
        refresh_token = self.tokens.get("refresh_token")
        
        if not refresh_token:
            print("❌ No refresh token available for WakaTime.")
            raise Exception("No refresh token available.")

        # WakaTime refresh token flow
        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": "http://localhost:8000/callback" # Must match original redirect_uri
        }
        
        response = requests.post(
            self.TOKEN_URL,
            data=data,
            headers={"Accept": "application/json"},
            timeout=self.REQUEST_TIMEOUT,
        )
        
        if response.status_code == 200:
            new_tokens = response.json()
            # WakaTime might not return a new refresh_token, so we might need to keep the old one?
            # Creating a merged dictionary just in case
            merged_tokens = self.tokens.copy()
            merged_tokens.update(new_tokens)
            
            self._save_tokens(merged_tokens)
            print("✅ WakaTime token refreshed successfully.")
        else:
            print(f"❌ Failed to refresh WakaTime token: {response.status_code} - {response.text}")
            raise Exception(f"Failed to refresh token: {response.text}")

    def get_stats(self) -> Optional[Dict]:
        """
        Fetch WakaTime stats for the current user.
        Endpoint: /users/current/all_time_since_today
        """
        url = f"{self.BASE_URL}/users/current/all_time_since_today"
        return self._make_request(url)
        
    def _make_request(self, url: str, retry: bool = True) -> Optional[Dict]:
        if not self.tokens:
               print("❌ No WakaTime tokens loaded. Cannot make request.")
               return None

        try:
            response = self.session.get(url, timeout=self.REQUEST_TIMEOUT)
            
            if response.status_code == 401 and retry:
                print("⚠️ WakaTime 401 Unauthorized. Attempting refresh...")
                try:
                    self._refresh_token()
                    # Update session header is done in _save_tokens, but let's double check
                    # Retry request
                    return self._make_request(url, retry=False)
                except Exception as e:
                    print(f"❌ Failed to refresh WakaTime token: {e}")
                    return None
                    
            if response.status_code == 200:
                return response.json()

            if response.status_code == 403 and "read_stats" in response.text.lower():
                self.last_error = (
                    "WakaTime token is missing the required 'read_stats' scope. "
                    "Run `python3 wakatime_setup.py` once to reauthorize it."
                )
                print(f"❌ {self.last_error}")
                return None

            print(f"❌ WakaTime request failed: HTTP {response.status_code}.")
            return None
                
        except Exception as e:
            print(f"❌ Error fetching WakaTime data: {e}")
            return None
