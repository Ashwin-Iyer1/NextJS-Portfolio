import requests
import databaseMod
import json
url = 'https://api.github.com/users/Ashwin-Iyer1/repos'

cookle = '{"name": "Cookle","description": "Food guessing game similar to Wordle","html_url": "https://s-pat6.github.io/cookle/"}'
herimpact = '{"name": "HerImpact","description": "The HerImpact project website","html_url": "https://herimpactproject.org/"}'

cookle = json.loads(cookle)
herimpact = json.loads(herimpact)
def get_repos():
    response = requests.get(url)
    data = response.json()

    data.append(cookle)
    data.append(herimpact)

    listofrepos = []

    for repo in data:
        reponame = repo['name']
        description = repo['description']
        html_url = repo['html_url']
        listofrepos.append((reponame, description, html_url))


    databaseMod.clear_entries("repos")

    databaseMod.addtoGithub(listofrepos)
