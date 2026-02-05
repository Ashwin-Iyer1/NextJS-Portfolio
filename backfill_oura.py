from oura_fetcher import OuraClient, OURA_CLIENT_ID, OURA_CLIENT_SECRET, TOKEN_FILE, upsert_oura_data
from datetime import date, timedelta
import oura_db

def main():
    print("--- Oura Historical Backfill ---")
    
    if not OURA_CLIENT_ID or not OURA_CLIENT_SECRET:
        print("❌ Error: OURA_CLIENT_ID or OURA_CLIENT_SECRET not found.")
        return

    # Default to last 90 days. User can change this source code if they want more.
    # Or we can make it interactive? Let's hardcode a good default for now.
    today = date.today()
    start_backfill = today - timedelta(days=90) # 3 Months
    
    start_date = start_backfill.isoformat()
    end_date = today.isoformat()
    
    print(f"Time Range: {start_date} to {end_date}")
    
    client = OuraClient(OURA_CLIENT_ID, OURA_CLIENT_SECRET, TOKEN_FILE)
    
    # Initialize DB (just in case)
    oura_db.create_oura_table()

    def print_result(name, data, data_type_key=None):
        if data and 'data' in data:
            count = len(data['data'])
            print(f"✅ {name}: Found {count} records.")
            
            key = data_type_key or name.lower().replace(" ", "_")
            saved_count = 0
            for item in data['data']:
                date_val = item.get('day')
                if not date_val and 'timestamp' in item:
                    date_val = item['timestamp'].split('T')[0]
                elif not date_val and 'start_datetime' in item:
                    date_val = item['start_datetime'].split('T')[0]
                
                if date_val:
                    if upsert_oura_data(key, date_val, item):
                        saved_count += 1
            # print(f"   Saved {saved_count} to DB.")
        else:
            print(f"⚠️ {name}: No data or error.")

    print(f"\nFetching data...")
    
    # Fetch Daily Metrics
    print_result("Activity", client.get_daily_activity(start_date, end_date), "activity")
    print_result("Sleep Daily", client.get_daily_sleep(start_date, end_date), "sleep_daily")
    print_result("Readiness", client.get_daily_readiness(start_date, end_date), "readiness")
    print_result("Daily Stress", client.get_daily_stress(start_date, end_date), "daily_stress")
    print_result("Daily SpO2", client.get_daily_spo2(start_date, end_date), "daily_spo2")
    print_result("Daily Resilience", client.get_daily_resilience(start_date, end_date), "daily_resilience")
    print_result("Cardio Age", client.get_daily_cardiovascular_age(start_date, end_date), "cardio_age")
    
    # Heart Rate (Chunking required: < 30 days per request)
    print("Heart Rate (fetching in chunks)...")
    
    current_start = start_backfill
    final_end = today
    
    all_hr_data = []
    
    while current_start < final_end:
        # Define chunk end (25 days to be safe)
        chunk_end = current_start + timedelta(days=25)
        if chunk_end > final_end:
            chunk_end = final_end
            
        print(f"   Fetching HR from {current_start} to {chunk_end}...")
        
        hr_chunk = client.get_heart_rate(f"{current_start.isoformat()}T00:00:00", f"{chunk_end.isoformat()}T23:59:59")
        
        if hr_chunk and 'data' in hr_chunk:
            all_hr_data.extend(hr_chunk['data'])
            
        # Move to next chunk
        current_start = chunk_end + timedelta(days=1)

    if all_hr_data:
        print(f"✅ Heart Rate: Found {len(all_hr_data)} total records.")
        # Group by day
        hr_by_day = {}
        for item in all_hr_data:
            d = item['timestamp'].split('T')[0]
            if d not in hr_by_day: hr_by_day[d] = []
            hr_by_day[d].append(item)
        
        for d, items in hr_by_day.items():
            upsert_oura_data("heart_rate", d, {"data": items})
        print("   Saved Heart Rate groups to DB.")
    else:
        print("⚠️ Heart Rate: No data found in any chunk.")

    # Details
    print_result("Sleep Detailed", client.get_sleep_documents(start_date, end_date), "sleep_detailed")
    print_result("Sleep Time", client.get_sleep_time(start_date, end_date), "sleep_time")
    print_result("Workouts", client.get_workouts(start_date, end_date), "workout")
    print_result("Sessions", client.get_sessions(start_date, end_date), "session")
    print_result("Tags", client.get_tags(start_date, end_date), "tag")
    print_result("Enhanced Tags", client.get_enhanced_tags(start_date, end_date), "enhanced_tag")
    print_result("Rest Mode", client.get_rest_mode_periods(start_date, end_date), "rest_mode_period")
    print_result("Ring Config", client.get_ring_configuration(start_date, end_date), "ring_configuration")
    print_result("VO2 Max", client.get_vo2_max(start_date, end_date), "vo2_max")

    print("\n🎉 Backfill Complete!")

if __name__ == "__main__":
    main()
