# Import libs
import requests
import urllib
import json
import pandas as pd


# Function to put together API query
def getReqUrl():
    url = "https://api.tvmaze.com/singlesearch/shows?"
    params = {"q": "rick-&-morty",
              "embed": "episodes"}
    request = url + urllib.parse.urlencode(params)
    return request


# Function to call API with given params
def getApiData(requestURL):
    # Call the API
    response = requests.get(requestURL)

    # Extract the text from the response
    data = json.loads(response.text)

    # Get the actual episodes data
    results = data["_embedded"]["episodes"]

    # Get other information (as specified in the API docs)
    showtype = data["type"]
    genres = data["genres"]

    print("Response: show type {}, genres {}".format(showtype, genres))

    return results


# Use the functions
req = getReqUrl()
res = getApiData(req)

# Use as foundation for the dataframe
df = pd.DataFrame(res)

print(df.head())
