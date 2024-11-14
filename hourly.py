from databaseMod import clear_entries, insertData
from wakatime import get_wakatime_data

def main():
    data = get_wakatime_data()
    clear_entries("wakatime")
    insertData(data['data']['total_seconds'], data['data']['daily_average'])

main()