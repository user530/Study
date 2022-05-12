# Import libraries
from unittest import result
from wsgiref.util import request_uri
import requests
import json
import pandas as pd


# Function to create an API query
def getReqURL():
    url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
    return url


# Function to call an API with given URL
def getApiData(reqURL):
    # Call this API
    response = requests.get(reqURL)

    # Extract the text from the response
    data = json.loads(response.text)

    # Get the actual data of interest (as specified in the API)
    results = data['features']

    # Get other information as specified in the earthquake API
    count = data["metadata"]["count"]

    print("Response: count {}".format(count))

    return results


# Get the data
reqUrl = getReqURL()
results = getApiData(reqUrl)

# Create data frame from the data
df = pd.DataFrame(results)

# Because our result is nested JSON -> better to normalize
df = pd.json_normalize(results)
print(df.head())
