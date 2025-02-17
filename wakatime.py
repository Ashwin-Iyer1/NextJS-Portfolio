import os
import requests
# from dotenv import load_dotenv
# load_dotenv()
def get_wakatime_data():
    wakabearer = os.getenv("wakaBearer")
    url = "https://wakatime.com/api/v1/users/current/all_time_since_today"
    headers = {
        "Authorization": f"Bearer {wakabearer}"
    }
    response = requests.get(url, headers=headers)
    return response.json()
