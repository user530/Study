from random import betavariate
from bs4 import BeautifulSoup
import requests
import json


def make_soup(URL, jar=None):
    if(jar):
        r = requests.get(URL, cookies=jar)
    else:
        r = requests.get(URL)
        jar = requests.cookies.RequestsCookieJar()
    data = r.text
    soup = BeautifulSoup(data, 'lxml')
    return soup, jar


soup, jar = make_soup(
    "https://edition.cnn.com/2022/05/07/uk/northern-ireland-election-sinn-fein-gbr-intl/index.html")

li = soup.find("li", class_="sc-kGXeez femHHJ")

print(li)
