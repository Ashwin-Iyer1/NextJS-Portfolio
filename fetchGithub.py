import requests
import databaseMod
import json
url = 'https://api.github.com/users/Ashwin-Iyer1/repos'

cookle = '{"name": "Cookle","description": "Food guessing game similar to Wordle","html_url": "https://s-pat6.github.io/cookle/"}'
herimpact = '{"name": "HerImpact","description": "The HerImpact project website","html_url": "https://herimpactproject.org/"}'
databaseProjects = '{"name": "Stridez","description": "A Strava clone made with NextJS and MySQL for CS3200","html_url": "https://github.com/RoboticReaper/CS3200-Strava-Project"}'

cookle = json.loads(cookle)
herimpact = json.loads(herimpact)
databaseProjects = json.loads(databaseProjects)
def get_repos():
    response = requests.get(url)
    data = response.json()

    data.append(cookle)
    data.append(herimpact)
    data.append(databaseProjects)

    listofrepos = []

    for repo in data:
        reponame = repo['name']
        description = repo['description']
        html_url = repo['html_url']
        listofrepos.append((reponame, description, html_url))


    databaseMod.clear_entries("repos")

    databaseMod.addtoGithub(listofrepos)
