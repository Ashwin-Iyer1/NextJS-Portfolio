import os
import requests
import base64

# from dotenv import load_dotenv
# load_dotenv()

params = {
"engine": "google_images",
 "ijn": "0",
  "api_key": os.getenv('google_key')
}
def get_spotify_bearer():
    client_id = os.getenv('spotifyClient')
    client_secret = os.getenv('spotifySecret')
    auth_string = f"{client_id}:{client_secret}"
    auth_base64 = base64.b64encode(auth_string.encode()).decode()
    auth_url = 'https://accounts.spotify.com/api/token'
    headers = {
    'Authorization': f'Basic {auth_base64}'
    }
    data = {
        'grant_type': 'client_credentials'
    }
    response = requests.post(auth_url, headers=headers, data=data)

    if response.status_code == 200:
        token_info = response.json()
        return token_info['access_token']
    else:
        print(f"Failed to get token: {response.status_code}, {response.text}")



def get_spotify_cover(song, bearer):
    url = f"https://api.spotify.com/v1/search?q=track:{song[0]}%20artist:{song[1]}&type=track"
    headers = {
        'Authorization': f'Bearer {bearer}'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data['tracks']['items'][0]['album']['images'][1]['url']
    else:
        print(f"Failed to get Spotify cover: {response.status_code}, {response.text}")
        return None
    

def get_serapi_image(song):
    req = requests.get('https://serpapi.com/search.json?engine=google_images&q=' + song[0] + ' ' + song[1] + ' Album Cover', params=params)
    data = req.json()
    image_results = data['images_results']

    for image in image_results:
        if image['source'] == 'Spotify':
            return image['original']
    
    # If no Spotify result is found, return the first image link
    if image_results:
        return image_results[0]['original']
    else:
        return None


def get_image(song, bearer):
    image = get_spotify_cover(song, bearer)
    if image:
        print(image)
    else:
        print("No image found for " + song[0] + " by " + song[1])
        image = get_serapi_image(song)
    return image

