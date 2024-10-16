import requests
import os
# from dotenv import load_dotenv
# load_dotenv()
last_fm = os.getenv('last_fm_key')

secret = os.getenv('last_fm_secret')

get_weekly_top = 'https://ws.audioscrobbler.com/2.0/?method=user.getweeklytrackchart&user=turtlecap&api_key=' + last_fm + '&format=json'

songsList = []

def get_top(numSongs: int):
    r = requests.get(get_weekly_top)

    r = r.json()
    r = r['weeklytrackchart']['track']


    for i in r[:numSongs]:
        print(i['name'] + " by " + i['artist']['#text'])
        songsList.append([i['name'], i['artist']['#text']])
    return songsList
