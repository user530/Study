#import library
import requests

# issue the request
req = requests.get("https://www.borrowmydoggy.com")

# get req status code
status = req.status_code

# get information about the data
header = req.headers['content-type']

# get information about the encoding
encoding = req.encoding

# get request data itself
data = req.text

print(data)
