import os
import requests
from dotenv import load_dotenv
load_dotenv()

params = {
"engine": "google_images",
 "ijn": "0",
  "api_key": os.getenv('google_key')
}

def get_image(song):
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
