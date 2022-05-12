from bs4 import BeautifulSoup
import requests
import json


def get_soup(URL, jar=None):
    request_headers = {"update-insecure-requests": "1",
                       "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/2010 0101 Firefox/47.0",
                       "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                       "accept-encoding": "utf-8",  # "gzip, deflate, br",
                       "accept-language": "en-US,en;q=0.5"}

    if jar:
        r = requests.get(URL, cookies=jar, headers=request_headers)
    else:
        r = requests.get(URL, headers=request_headers)
        jar = requests.cookies.RequestsCookieJar()
    print(r.url)
    data = r.text
    soup = BeautifulSoup(data, "lxml")
    return soup, jar


soup, jar = get_soup('https://www.tutorialspoint.com/html/html_tables.htm')
print(jar)


def page_name(soup):
    h2 = soup.find("h2")

    if h2 is not None:
        return h2.text


print(page_name(soup))
