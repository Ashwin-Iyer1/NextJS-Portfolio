from last_fm import get_top
from coverArt import get_image
from databaseMod import addtoDatabase, clear_entries, insertData
import datetime
from fetchGithub import get_repos

#only run if friday
def is_friday():
    return datetime.datetime.today().weekday() == 4


def main():
    get_repos()
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