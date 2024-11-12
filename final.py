from last_fm import get_top
from coverArt import get_image
from databaseMod import addtoDatabase, clear_entries, insertData
import datetime
from fetchGithub import get_repos
from wakatime import get_wakatime_data

#only run if friday
def is_friday():
    return datetime.datetime.today().weekday() == 4


def main():
    get_repos()
    data = get_wakatime_data()
    clear_entries("wakatime")
    insertData(data['data']['total_seconds'], data['data']['daily_average'])
    if(not is_friday()):
        return
    songs = get_top(10)
    for song in songs:
        get_image(song)
        song.append(get_image(song))
        print("\n")
    clear_entries("Songs")
    addtoDatabase(songs)

    print(songs)

main()