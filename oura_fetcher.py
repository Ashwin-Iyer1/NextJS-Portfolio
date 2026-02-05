import requests
from datetime import datetime
from typing import Dict, Any, Optional
import os
import json
from dotenv import load_dotenv
from token_manager import TokenManager
from oura_db import create_oura_table, upsert_oura_data

# Load environment variables
load_dotenv()

OURA_CLIENT_ID = os.getenv("OURA_CLIENT_ID")
OURA_CLIENT_SECRET = os.getenv("OURA_CLIENT_SECRET")
TOKEN_FILE = "oura_tokens.json"

class OuraClient:
    """Client for Oura V2 API with automated token management."""
    
    BASE_URL = "https://api.ouraring.com/v2"

    def __init__(self, client_id: str, client_secret: str, token_file: str = "oura_tokens.json"):
        self.client_id = client_id
        self.client_secret = client_secret
        self.token_manager = TokenManager("oura", token_file)
        self.session = requests.Session()
        self._load_tokens()

    def _load_tokens(self):
        """Load tokens using TokenManager."""
        self.tokens = self.token_manager.load_tokens()
        if self.tokens.get('access_token'):
            self.session.headers.update({
                "Authorization": f"Bearer {self.tokens.get('access_token')}"
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
        print("🔄 Refreshing access token...")
        if not self.tokens.get("refresh_token"):
            print("❌ No refresh token available.")
            raise Exception("No refresh token available.")

        url = "https://api.ouraring.com/oauth/token"
        data = {
            "grant_type": "refresh_token",
            "refresh_token": self.tokens.get("refresh_token"),
            "client_id": self.client_id,
            "client_secret": self.client_secret
        }
        
        response = requests.post(url, data=data)
        response.raise_for_status()
        
        new_tokens = response.json()
        self._save_tokens(new_tokens)
        print("✅ Token refreshed successfully.")

    def _get(self, endpoint: str, params: Optional[Dict[str, Any]] = None, retry: bool = True) -> Dict[str, Any]:
        if not self.tokens:
               print("❌ No tokens loaded. Cannot make request.")
               return {}

        url = f"{self.BASE_URL}{endpoint}"
        response = self.session.get(url, params=params)
        
        if response.status_code == 401 and retry:
            try:
                self._refresh_token()
                # Retry request with new token
                return self._get(endpoint, params, retry=False)
            except Exception as e:
                print(f"❌ Failed to refresh token: {e}")
                # Don't raise here, just return empty/error to allow script to continue or fail gracefully
                return {}
                
        if response.status_code != 200:
             print(f"❌ Request failed: {response.status_code} - {response.text}")
             return {}

        return response.json()

    def get_personal_info(self) -> Dict[str, Any]:
        """Get personal info."""
        return self._get("/usercollection/personal_info")

    def get_daily_sleep(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily sleep documents."""
        return self._get("/usercollection/daily_sleep", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_daily_activity(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily activity documents."""
        return self._get("/usercollection/daily_activity", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_daily_readiness(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily readiness documents."""
        return self._get("/usercollection/daily_readiness", params={
            "start_date": start_date,
            "end_date": end_date
        })
    
    def get_daily_stress(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily stress."""
        return self._get("/usercollection/daily_stress", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_daily_spo2(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily SpO2."""
        return self._get("/usercollection/daily_spo2", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_daily_resilience(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily resilience."""
        return self._get("/usercollection/daily_resilience", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_daily_cardiovascular_age(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get daily cardiovascular age."""
        return self._get("/usercollection/daily_cardiovascular_age", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_heart_rate(self, start_datetime: str, end_datetime: str) -> Dict[str, Any]:
        """Get heart rate data."""
        return self._get("/usercollection/heartrate", params={
            "start_datetime": start_datetime,
            "end_datetime": end_datetime
        })

    def get_sleep_documents(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get sleep documents (detailed sleep)."""
        return self._get("/usercollection/sleep", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_sleep_time(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get sleep time recommendations."""
        return self._get("/usercollection/sleep_time", params={
            "start_date": start_date,
            "end_date": end_date
        })
    
    def get_workouts(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get workouts."""
        return self._get("/usercollection/workout", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_sessions(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get sessions."""
        return self._get("/usercollection/session", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_tags(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get tags."""
        return self._get("/usercollection/tag", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_enhanced_tags(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get enhanced tags."""
        return self._get("/usercollection/enhanced_tag", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_rest_mode_periods(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get rest mode periods."""
        return self._get("/usercollection/rest_mode_period", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_ring_configuration(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get ring configuration."""
        return self._get("/usercollection/ring_configuration", params={
            "start_date": start_date,
            "end_date": end_date
        })

    def get_vo2_max(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Get VO2 Max."""
        return self._get("/usercollection/vO2_max", params={
            "start_date": start_date,
            "end_date": end_date
        })

def main():
    if not OURA_CLIENT_ID or not OURA_CLIENT_SECRET:
        print("❌ Error: Environment variables OURA_CLIENT_ID and OURA_CLIENT_SECRET are required.")
        return

    client = OuraClient(OURA_CLIENT_ID, OURA_CLIENT_SECRET, TOKEN_FILE)
    
    # Example: Fetch data for yesterday and today
    # You can adjust dates as needed. For "hourly" runs, mostly we care about the latest data.
    from datetime import date, timedelta
    today = date.today()
    yesterday = today - timedelta(days=1)
    tomorrow = today + timedelta(days=1)
    
    start_date = yesterday.isoformat()
    end_date = tomorrow.isoformat()

    # Initialize DB Table
    create_oura_table()

    print(f"Fetching Oura data from {start_date} to {end_date}...")
    
    # Define a helper to print results AND save to DB
    def print_result(name, data, data_type_key=None):
        if data and 'data' in data:
            count = len(data['data'])
            print(f"✅ {name}: Found {count} records.")
            
            # Save to DB if we have data
            # For this "daily" style data, we'll iterate and save each day? 
            # OR we can save the whole blob for the day range. 
            # The schema (data_type, date) suggests saving PER DAY.
            # Most endpoints return a list of items, each with a 'day' or 'timestamp'.
            
            key = data_type_key or name.lower().replace(" ", "_")
            
            saved_count = 0
            for item in data['data']:
                # extracting date
                date_val = item.get('day')
                if not date_val and 'timestamp' in item:
                    date_val = item['timestamp'].split('T')[0]
                elif not date_val and 'start_datetime' in item:
                    date_val = item['start_datetime'].split('T')[0]
                
                if date_val:
                    if upsert_oura_data(key, date_val, item):
                        saved_count += 1
            
            # print(f"   Saved {saved_count}/{count} records to DB.")
            
        else:
            print(f"⚠️ {name}: No data or error.")

    # Fetch Activity
    print_result("Activity", client.get_daily_activity(start_date, end_date), "activity")

    # Fetch Sleep (Daily)
    print_result("Sleep Daily", client.get_daily_sleep(start_date, end_date), "sleep_daily")

    # Fetch Readiness
    print_result("Readiness", client.get_daily_readiness(start_date, end_date), "readiness")

    # Fetch Daily Stress
    print_result("Daily Stress", client.get_daily_stress(start_date, end_date), "daily_stress")

    # Fetch Daily SpO2
    print_result("Daily SpO2", client.get_daily_spo2(start_date, end_date), "daily_spo2")

    # Fetch Daily Resilience
    print_result("Daily Resilience", client.get_daily_resilience(start_date, end_date), "daily_resilience")

    # Fetch Daily Cardio Age
    print_result("Cardio Age", client.get_daily_cardiovascular_age(start_date, end_date), "cardio_age")

    # Fetch Heart Rate (requires datetime)
    # Heart rate is high frequency. Storing every single point per row might be too much if schema was per-point.
    # But our schema is (data_type, date, json). We can store the WHOLE LIST for the day in one row?
    # NO, upsert_oura_data takes (data_type, date, json_data).
    # If we loop, we overwrite the same 'date' entry repeatedly if we don't be careful?
    # Actually, Oura Ring heart rate is many points.
    # DECISION: For high-frequency data like HR, let's group by day and save the LIST of points for that day?
    # OR, since the previous logic iterates: `upsert_oura_data` uses (data_type, date) as unique key.
    # If we call it multiple times for the same day (e.g. multiple 5min samples), we would overwrite.
    # SO, we should Group By Day first.
    
    # Let's write a smarter saver for HR.
    hr_data = client.get_heart_rate(f"{start_date}T00:00:00", f"{end_date}T23:59:59")
    if hr_data and 'data' in hr_data:
        print(f"✅ Heart Rate: Found {len(hr_data['data'])} records.")
        # Group by day
        hr_by_day = {}
        for item in hr_data['data']:
            d = item['timestamp'].split('T')[0]
            if d not in hr_by_day: hr_by_day[d] = []
            hr_by_day[d].append(item)
        
        for d, items in hr_by_day.items():
            upsert_oura_data("heart_rate", d, {"data": items}) # Wrap in dict
    else:
        print("⚠️ Heart Rate: No data.")


    # Fetch Sleep Documents (Detailed)
    print_result("Sleep Detailed", client.get_sleep_documents(start_date, end_date), "sleep_detailed")

    # Fetch Sleep Time
    print_result("Sleep Time", client.get_sleep_time(start_date, end_date), "sleep_time")

    # Fetch Workouts
    print_result("Workouts", client.get_workouts(start_date, end_date), "workout")

    # Fetch Sessions
    # print_result("Sessions", client.get_sessions(start_date, end_date), "session")

    # # Fetch Tags
    # print_result("Tags", client.get_tags(start_date, end_date), "tag")

    # # Fetch Enhanced Tags
    # print_result("Enhanced Tags", client.get_enhanced_tags(start_date, end_date), "enhanced_tag")

    # # Fetch Rest Mode Periods
    # print_result("Rest Mode", client.get_rest_mode_periods(start_date, end_date), "rest_mode_period")

    # # Fetch Ring Config - REMOVED per user request
    # # print_result("Ring Config", client.get_ring_configuration(start_date, end_date), "ring_configuration")

    # # Fetch VO2 Max
    # print_result("VO2 Max", client.get_vo2_max(start_date, end_date), "vo2_max")

    # Fetch Personal Info (Singleton)
    # Personal Info does not use start/end dates usually, it's just the current snapshot or user info.
    # Looking at spec, it has NO parameters? Or minimal? Spec says: GET /v2/usercollection/personal_info
    # Let's check the client method: def get_personal_info(self) -> Dict[str, Any]: return self._get("/usercollection/personal_info")
    # It has no date params.
    
    p_info = client.get_personal_info()
    if p_info:
        print(f"✅ Personal Info: Fetched.")
        # upsert expects a dict. we can use a dummy date or "latest"?
        # Schema is (data_type, date, data).
        # Since personal info is static/current, maybe we use today's date?
        # Or a fixed constant date like '1970-01-01' to just store the single latest record?
        # Let's use today's date so we have history of it changing?
        # Actually, user probably just wants the latest.
        # But our schema requires a date.
        
        # Checking schema in oura_db.py: 
        # PRIMARY KEY (id), UNIQUE (data_type, date)
        
        # Let's store it with today's date.
        upsert_oura_data("personal_info", today.isoformat(), p_info)
    else:
        print("⚠️ Personal Info: No data.")

    print("\n✅ Oura data update complete.")

if __name__ == "__main__":
    main()
