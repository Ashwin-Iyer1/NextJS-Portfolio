import os
import requests
import base64
import json
import time
from collections import Counter
from datetime import datetime, timezone
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
    url = 'https://api.github.com/users/Ashwin-Iyer1/repos?per_page=100'
    
    # Manual entries
    manual_repos = [
        {"name": "Cookle", "description": "Food guessing game similar to Wordle", "html_url": "https://s-pat6.github.io/cookle/"},
        {"name": "HerImpact", "description": "The HerImpact project website", "html_url": "https://herimpactproject.org/"},
        {"name": "Stridez", "description": "A Strava clone made with NextJS and MySQL for CS3200", "html_url": "https://github.com/RoboticReaper/CS3200-Strava-Project"},
        {"name": "Tactus", "description": "The website for Tactus Music", "html_url": "https://tactusmusic.com/"},
        {
            "name": "Fridge Flow",
            "description": "App that allows fridge sharing among roommates, cost-splitting, receipt parsing, and grocery list management",
            "html_url": "https://github.com/nickym11111/forge_fall_25_project"
        }
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
    Fetch the rolling seven-day top tracks from Last.fm for user 'turtlecap'.
    If there are no recent scrobbles, use the latest non-empty completed week
    so the portfolio is not left with a stale or empty songs section.
    Returns a list of [song_name, artist_name].

    Raises RuntimeError when Last.fm rejects the request or returns an
    unexpected response. This prevents the scheduled workflow from appearing
    successful when the songs were not refreshed.
    """
    api_key = os.getenv('LAST_FM_KEY') or os.getenv('last_fm_key')
    if not api_key:
        raise RuntimeError("Last.fm API key not found (expected LAST_FM_KEY).")

    url = 'https://ws.audioscrobbler.com/2.0/'
    params = {
        'method': 'user.gettoptracks',
        'user': 'turtlecap',
        'api_key': api_key,
        'format': 'json',
        'period': '7day',
        'limit': num_songs,
    }

    def request_lastfm(request_params: Dict) -> Dict:
        try:
            response = requests.get(url, params=request_params, timeout=20)
            response_data = response.json()
        except (requests.RequestException, ValueError) as e:
            raise RuntimeError(f"Unable to fetch Last.fm data: {e}") from e

        if not isinstance(response_data, dict):
            raise RuntimeError("Last.fm returned an unexpected response.")
        if response.status_code != 200 or 'error' in response_data:
            error_code = response_data.get('error', response.status_code)
            message = response_data.get('message', 'Unknown Last.fm error')
            raise RuntimeError(f"Last.fm API error {error_code}: {message}")
        return response_data

    data = request_lastfm(params)

    tracks = data.get('toptracks', {}).get('track', [])
    if not isinstance(tracks, list):
        tracks = [tracks] if tracks else []

    # Last.fm sometimes returns an empty pre-aggregated seven-day chart even
    # while recent scrobbles are public. Build the same rolling chart from the
    # raw seven-day scrobble history in that case.
    if not tracks:
        print("Last.fm's seven-day chart was empty; aggregating recent scrobbles...")
        recent_params = {
            'method': 'user.getrecenttracks',
            'user': 'turtlecap',
            'api_key': api_key,
            'format': 'json',
            'from': int(time.time()) - (7 * 24 * 60 * 60),
            'limit': 200,
            'page': 1,
        }
        track_counts = Counter()
        total_pages = 1

        while recent_params['page'] <= total_pages:
            recent_data = request_lastfm(recent_params)
            recent_tracks = recent_data.get('recenttracks', {})
            page_tracks = recent_tracks.get('track', [])
            if not isinstance(page_tracks, list):
                page_tracks = [page_tracks] if page_tracks else []

            for track in page_tracks:
                if track.get('@attr', {}).get('nowplaying') == 'true':
                    continue
                name = track.get('name')
                artist_data = track.get('artist', {})
                artist = artist_data.get('#text') or artist_data.get('name')
                if name and artist:
                    track_counts[(name, artist)] += 1

            attributes = recent_tracks.get('@attr', {})
            try:
                total_pages = min(int(attributes.get('totalPages', 1)), 50)
            except (TypeError, ValueError):
                total_pages = 1
            recent_params['page'] += 1

        if track_counts:
            songs_list = []
            for (name, artist), play_count in track_counts.most_common(num_songs):
                print(f"{name} by {artist} ({play_count} plays)")
                songs_list.append([name, artist])
            return songs_list

        print("No scrobbles in the last seven days; finding the latest active week...")
        chart_list = request_lastfm({
            'method': 'user.getweeklychartlist',
            'user': 'turtlecap',
            'api_key': api_key,
            'format': 'json',
        }).get('weeklychartlist', {}).get('chart', [])
        if not isinstance(chart_list, list):
            chart_list = [chart_list] if chart_list else []

        def chart_start(chart: Dict) -> int:
            try:
                return int(chart.get('from', 0))
            except (TypeError, ValueError):
                return 0

        for chart in sorted(chart_list, key=chart_start, reverse=True)[:52]:
            start = chart.get('from')
            end = chart.get('to')
            if not start or not end:
                continue
            weekly_data = request_lastfm({
                'method': 'user.getweeklytrackchart',
                'user': 'turtlecap',
                'api_key': api_key,
                'format': 'json',
                'from': start,
                'to': end,
            })
            weekly_tracks = weekly_data.get('weeklytrackchart', {}).get('track', [])
            if not isinstance(weekly_tracks, list):
                weekly_tracks = [weekly_tracks] if weekly_tracks else []

            songs_list = []
            for track in weekly_tracks[:num_songs]:
                name = track.get('name')
                artist_data = track.get('artist', {})
                artist = artist_data.get('#text') or artist_data.get('name')
                if name and artist:
                    songs_list.append([name, artist])
            if songs_list:
                start_date = datetime.fromtimestamp(int(start), timezone.utc).date()
                end_date = datetime.fromtimestamp(int(end), timezone.utc).date()
                print(f"Using Last.fm chart for {start_date} through {end_date}.")
                for name, artist in songs_list:
                    print(f"{name} by {artist}")
                return songs_list

        raise RuntimeError("Last.fm has no non-empty weekly track chart in the past year.")

    songs_list = []
    for track in tracks[:num_songs]:
        name = track.get('name')
        artist_data = track.get('artist', {})
        artist = artist_data.get('name') or artist_data.get('#text')
        if not name or not artist:
            continue
        print(f"{name} by {artist}")
        songs_list.append([name, artist])

    if not songs_list:
        raise RuntimeError("Last.fm returned tracks without names or artists.")

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
