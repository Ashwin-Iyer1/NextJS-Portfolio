from api_helpers import get_wakatime_stats
from portfolio_operations import get_wakatime_db_data, update_wakatime_data

def main():
    print("Fetching WakaTime data...")
    data = get_wakatime_stats()
    
    if not data or 'data' not in data:
        print("Failed to fetch WakaTime data.")
        return

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
        update_wakatime_data(current_total_seconds, daily_average)

if __name__ == "__main__":
    main()