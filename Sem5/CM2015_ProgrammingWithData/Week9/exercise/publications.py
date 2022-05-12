from operator import attrgetter
import requests
from bs4 import BeautifulSoup


res = requests.get(
    "https://scholar.google.com/citations?user=ETIBghkAAAAJ&hl=en")

soup = BeautifulSoup(res.text, 'lxml')

table = soup.find("table", attrs={"id": "gsc_a_t"})

rows = table.find("tbody").find_all("tr")


def rightYear(row, year):
    try:
        return int(
            row.find("span", attrs={"class": "gsc_a_h gsc_a_hc gs_ibl"}).text) > year
    except:
        return False


pub2015 = [row.find("a", attrs={"class": "gsc_a_at"}).text
           for row in rows if rightYear(row, 2015)]

print('\n'.join(pub2015))
