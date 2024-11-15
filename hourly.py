from databaseMod import clear_entries, insertData, wakatime_db_data
from wakatime import get_wakatime_data

data = get_wakatime_data()
db_data = wakatime_db_data()[0][0]
print(data['data']['total_seconds'])
print(db_data)
#remove parenthesis and comma from string
if(data['data']['total_seconds'] > db_data + 1):
    print("New Data!")
    clear_entries("wakatime")
    insertData(data['data']['total_seconds'], data['data']['daily_average'])
else:
    print("Data already in database")



# def main():
#     data = get_wakatime_data()
#     # clear_entries("wakatime")
#     insertData(data['data']['total_seconds'], data['data']['daily_average'])

# main()