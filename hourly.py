import os

import oura_fetcher
from portfolio_operations import get_wakatime_db_data, update_wakatime_data
from wakatime_client import WakaTimeClient


def main():
    print("--- Starting Hourly Update ---")
    succeeded = True
    
    # --- WakaTime ---
    print("\n[WakaTime] Fetching data...")
    
    client_id = os.getenv("WAKA_CLIENT_ID")
    client_secret = os.getenv("WAKA_CLIENT_SECRET")
    
    if not client_id or not client_secret:
        print("❌ Error: WAKA_CLIENT_ID and WAKA_CLIENT_SECRET are required.")
        succeeded = False
    else:
        client = WakaTimeClient(client_id, client_secret)
        data = client.get_stats()
        
        if not data or 'data' not in data:
            if not client.last_error:
                print("Failed to fetch WakaTime data.")
            succeeded = False
        else:
            current_total_seconds = data['data']['total_seconds']
            daily_average = data['data']['daily_average']
            
            # Fetch existing data from DB
            db_result = get_wakatime_db_data()
            
            # Check if we need to update
            should_update = True
            if db_result:
                # db_result is a list of RealDictRow or tuples depending on cursor
                # portfolio_operations uses tuples for this specific query
                db_total_seconds = db_result[0][0]
                
                print(f"Current API Seconds: {current_total_seconds}")
                print(f"DB Seconds: {db_total_seconds}")
                
                if current_total_seconds <= db_total_seconds + 1:
                    print("Data already in database (no significant change).")
                    should_update = False
                    
            if should_update:
                print("New Data detected! Updating database...")
                if not update_wakatime_data(current_total_seconds, daily_average):
                    succeeded = False

    # --- Oura ---
    print("\n[Oura] Fetching data...")
    try:
        if not oura_fetcher.main():
            succeeded = False
    except Exception as e:
        print(f"❌ Error running Oura fetcher: {e}")
        succeeded = False

    return 0 if succeeded else 1

if __name__ == "__main__":
    raise SystemExit(main())
