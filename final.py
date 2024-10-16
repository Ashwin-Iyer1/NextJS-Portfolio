from last_fm import get_top
from coverArt import get_image


def main():
    songs = get_top(10)
    for song in songs:
        get_image(song)
        song.append(get_image(song))
        print("\n")
    print(songs)

main()