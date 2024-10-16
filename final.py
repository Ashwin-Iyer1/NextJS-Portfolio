from last_fm import get_top
from coverArt import get_image

import datetime

#only run if friday
def is_friday():
    return datetime.datetime.today().weekday() == 4


def main():
    if(not is_friday()):
        return
    songs = get_top(10)
    for song in songs:
        get_image(song)
        song.append(get_image(song))
        print("\n")
    print(songs)

main()