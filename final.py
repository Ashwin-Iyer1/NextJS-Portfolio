from api_helpers import (
    get_github_repos, 
    get_lastfm_top_tracks, 
    get_spotify_bearer, 
    get_cover_image
)
from portfolio_operations import update_songs, update_repos

def main():
    print("--- Starting Portfolio Update ---")

    # 1. Update GitHub Repos
    print("\nUpdating GitHub Repos...")
    repos = get_github_repos()
    if repos:
        update_repos(repos)
    else:
        print("No repos found or error occurred.")

    # 2. Update Top Songs
    print("\nUpdating Top Songs...")
    songs = get_lastfm_top_tracks(10)
    
    if songs:
        print("Fetching cover art...")
        bearer = get_spotify_bearer()
        
        songs_with_covers = []
        for song in songs:
            # song is [name, artist]
            cover_url = get_cover_image(song, bearer)
            # Append cover to the list: [name, artist, cover_url]
            song_entry = song + [cover_url]
            songs_with_covers.append(song_entry)
            print(f"Processed: {song[0]}")
            
        update_songs(songs_with_covers)
    else:
        print("No songs found or error occurred.")
        
    print("\n--- Update Complete ---")

if __name__ == "__main__":
    main()