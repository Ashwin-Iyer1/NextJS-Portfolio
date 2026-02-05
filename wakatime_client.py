import requests
import os
import json
from typing import Dict, Any, Optional

from token_manager import TokenManager

class WakaTimeClient:
    """Client for WakaTime API with automated token management."""
    
    BASE_URL = "https://wakatime.com/api/v1"
    TOKEN_URL = "https://wakatime.com/oauth/token"

    def __init__(self, client_id: str, client_secret: str, token_file: str = "wakatime_tokens.json"):
        self.client_id = client_id
        self.client_secret = client_secret
        self.token_manager = TokenManager("wakatime", token_file)
        self.session = requests.Session()
        self.tokens = {}
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
        self.token_manager.save_tokens(tokens)
        
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
        
        response = requests.post(self.TOKEN_URL, data=data)
        
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
            response = self.session.get(url)
            
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
            else:
                print(f"❌ WakaTime Request failed: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Error fetching WakaTime data: {e}")
            return None
