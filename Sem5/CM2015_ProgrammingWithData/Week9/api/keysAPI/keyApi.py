# Import libs
from urllib import response
import requests
import json
import urllib
import pandas as pd

# Import the key
from secret import *


# Function to get query url
def getReqUrl(pageNo):
    url = "https://content.guardianapis.com/search?"
    params = {"q": "olympic+games",
              "page-size": 50,
              "page": str(pageNo),
              "from-date": "2021-05-26",
              "api-key": guardian_api_key}

    req = url + urllib.parse.urlencode(params)
    return req


# Function to call API
def getApiData(url):
    # Make request
    req = requests.get(url)

    # Get the json
    data = json.loads(req.text)

    # Get actual data from json
    res = data["response"]["results"]

    # Get other information
    status = data["response"]["status"]
    pages = data["response"]["pages"]
    pageSize = data["response"]["pageSize"]
    total = data["response"]["total"]

    print("Response: status {}, pages {}, pageSize {}, total {}".format(
        status, pages, pageSize, total))

    return pages, res


# Prepare url
url = getReqUrl(pageNo=1)
pages, result = getApiData(url)

# print("Found ", pages, " pages")

# # Prepare data frame
# df = pd.DataFrame(result)

# print(df.head())
