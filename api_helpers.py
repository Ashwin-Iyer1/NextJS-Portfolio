import os
import requests
import base64
import json
from typing import List, Dict, Optional, Tuple

# from dotenv import load_dotenv
# load_dotenv()

# --- Spotify & Google Images (Cover Art) ---

def get_spotify_bearer() -> Optional[str]:
    """
    Obtain a Spotify API Bearer token.
    """
    client_id = os.getenv('spotifyClient')
    client_secret = os.getenv('spotifySecret')
    
    if not client_id or not client_secret:
        print("Error: Spotify credentials not found in environment variables.")
        return None

    auth_string = f"{client_id}:{client_secret}"
    auth_base64 = base64.b64encode(auth_string.encode()).decode()
    auth_url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': f'Basic {auth_base64}'
    }
    data = {
        'grant_type': 'client_credentials'
    }
    
    try:
        response = requests.post(auth_url, headers=headers, data=data)
        if response.status_code == 200:
            token_info = response.json()
            return token_info['access_token']
        else:
            print(f"Failed to get Spotify token: {response.status_code}, {response.text}")
            return None
    except Exception as e:
        print(f"Error getting Spotify token: {e}")
        return None


def get_spotify_cover(song: List[str], bearer: str) -> Optional[str]:
    """
    Search for a song cover on Spotify.
    Args:
        song: List containing [song_name, artist_name]
        bearer: Spotify access token
    """
    if not bearer:
        return None
        
    url = f"https://api.spotify.com/v1/search?q=track:{song[0]}%20artist:{song[1]}&type=track"
    headers = {
        'Authorization': f'Bearer {bearer}'
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            if data['tracks']['items']:
                images = data['tracks']['items'][0]['album']['images']
                # Try to get the second image (medium size), fall back to first
                if len(images) > 1:
                    return images[1]['url']
                elif len(images) > 0:
                    return images[0]['url']
            print(f"No Spotify results found for: {song[0]} by {song[1]}")
            return None
        else:
            print(f"Failed to get Spotify cover: {response.status_code}, {response.text}")
            return None
    except Exception as e:
        print(f"Error searching Spotify: {e}")
        return None


def get_serapi_image(song: List[str]) -> Optional[str]:
    """
    Fallback to Google Images via SerpApi if Spotify fails.
    """
    api_key = os.getenv('google_key')
    if not api_key:
        print("Error: Google/SerpApi key not found.")
        return None

    params = {
        "engine": "google_images",
        "ijn": "0",
        "api_key": api_key,
        "q": f"{song[0]} {song[1]} Album Cover"
    }
    
    try:
        req = requests.get('https://serpapi.com/search.json', params=params)
        data = req.json()
        
        if 'images_results' not in data:
            return None
            
        image_results = data['images_results']

        # Prefer Spotify source
        for image in image_results:
            if image.get('source') == 'Spotify':
                return image['original']
        
        # Fallback to first result
        if image_results:
            return image_results[0]['original']
        
        return None
    except Exception as e:
        print(f"Error searching SerpApi: {e}")
        return None


def get_cover_image(song: List[str], bearer: Optional[str]) -> Optional[str]:
    """
    Get cover image for a song, trying Spotify first then Google Images.
    """
    image = get_spotify_cover(song, bearer) if bearer else None
    
    if image:
        print(f"Found Spotify cover for {song[0]}")
    else:
        print(f"No Spotify image found for {song[0]} by {song[1]}, trying Google...")
        image = get_serapi_image(song)
        
    return image


# --- GitHub ---

def get_github_repos() -> List[Tuple[str, str, str]]:
    """
    Fetch GitHub repositories for user 'Ashwin-Iyer1' and add manual entries.
    Returns a list of tuples: (name, description, html_url)
    """
    url = 'https://api.github.com/users/Ashwin-Iyer1/repos'
    
    # Manual entries
    manual_repos = [
        {"name": "Cookle", "description": "Food guessing game similar to Wordle", "html_url": "https://s-pat6.github.io/cookle/"},
        {"name": "HerImpact", "description": "The HerImpact project website", "html_url": "https://herimpactproject.org/"},
        {"name": "Stridez", "description": "A Strava clone made with NextJS and MySQL for CS3200", "html_url": "https://github.com/RoboticReaper/CS3200-Strava-Project"}
    ]
    
    repo_list = []
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            # Add manual repos to the list
            data.extend(manual_repos)
            
            for repo in data:
                name = repo.get('name')
                description = repo.get('description')
                html_url = repo.get('html_url')
                repo_list.append((name, description, html_url))
        else:
            print(f"Failed to fetch GitHub repos: {response.status_code}")
            
    except Exception as e:
        print(f"Error fetching GitHub repos: {e}")
        
    return repo_list


# --- Last.fm ---

def get_lastfm_top_tracks(num_songs: int = 10) -> List[List[str]]:
    """
    Fetch top weekly tracks from Last.fm for user 'turtlecap'.
    Returns a list of [song_name, artist_name].
    """
    api_key = os.getenv('last_fm_key')
    if not api_key:
        print("Error: Last.fm API key not found.")
        return []
        
    url = f'https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=turtlecap&api_key={api_key}&format=json'
    
    songs_list = []
    
    try:
        r = requests.get(url)
        if r.status_code == 200:
            data = r.json()
            tracks = data.get('weeklytrackchart', {}).get('track', [])
            
            # Ensure we don't exceed available tracks
            limit = min(len(tracks), num_songs)
            
            for i in range(limit):
                track = tracks[i]
                name = track.get('name')
                artist = track.get('artist', {}).get('#text')
                print(f"{name} by {artist}")
                songs_list.append([name, artist])
        else:
            print(f"Failed to fetch Last.fm data: {r.status_code}")
            
    except Exception as e:
        print(f"Error fetching Last.fm data: {e}")
        
    return songs_list


# --- WakaTime ---

def get_wakatime_stats() -> Optional[Dict]:
    """
    Fetch WakaTime stats for the current user.
    """
    bearer = os.getenv("wakaBearer")
    if not bearer:
        print("Error: WakaTime bearer token not found.")
        return None
        
    url = "https://wakatime.com/api/v1/users/current/all_time_since_today"
    headers = {
        "Authorization": f"Bearer {bearer}"
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch WakaTime stats: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error fetching WakaTime stats: {e}")
        return None
