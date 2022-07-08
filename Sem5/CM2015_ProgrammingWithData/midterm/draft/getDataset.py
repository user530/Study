from socket import timeout
import requests
import urllib3
from bs4 import BeautifulSoup
import time
import concurrent.futures


def getLinksFromPage(pageNum):
    # Check argument
    if not (isinstance(pageNum, int) and pageNum > 0):
        print('Error! Wrong page number.')
        return

    # Prepare links to scrape the data
    url = 'https://knowyourmeme.com'
    all = '/memes/popular/page/'

    # Prepare html pool manager, header and make a request
    http = urllib3.PoolManager()
    header = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'}
    response = http.request(
        'GET', url + all + str(pageNum), headers=header, timeout=3)

    # Stop if there are no more pages
    if(response.status != 200):
        print('Error! Can not access specidied page.')
        return

    # Make a pause to prevent ip ban
    time.sleep(1)

    # Add the list of links to the result
    return [url+a.get('href') for a in BeautifulSoup(response.data, 'lxml').select('td[class *= "entry"] > a')]


def getLinks(startPage, numOfPages):
    # Check argument
    if not (isinstance(startPage, int) and startPage > 0 and isinstance(numOfPages, int) and numOfPages > 0):
        print('Error! Wrong page number.')
        return

    print('Links extraction started...')

    # Parralel async link extraction
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        res = executor.map(
            lambda x: getLinksFromPage(x), range(startPage, startPage + numOfPages))

        print('Links extraction finished.')

        # Flatten the result list
        return [link for links in list(res) for link in links]


def linkToStr(link):
    # Helper function to create CSV token from the string
    def strToToken(strData):
        return "\"" + strData.replace('\"', '\'') + "\"" if strData else "\"NoData\""

    # Helper function to try and extract the text from the bf html element
    def getText(elem):
        return elem.text if elem else None

    # Check argument
    if not isinstance(link, str):
        print('Bad argument value!')
        return

    # Prepare html pool manager and make a request
    http = urllib3.PoolManager()
    page = http.request('GET', link, timeout=3)

    # Stop if page is not accessible
    if(page.status != 200):
        print('Request failed, skipping...')
        return

    # Create soup from the page data and scrape data (sometimes in 2 steps to prevent errors)
    soup = BeautifulSoup(page.data, 'lxml')

    title = soup.select_one('section[class *= "info"] > h1')
    status = soup.select_one('div[class = "tooltip-popup"] > span')
    type = soup.select_one('div[class = "detail"] > span > a[href *= "types"]')
    year = soup.select_one('div[class = "detail"] > span > a[href *= "year"]')

    place = status.find_next('span') if status else None
    place = status.find_next('span').find_next('span') if place else None

    date = soup.select_one('abbr[class = "timeago"]')
    date = date.get('title') if date else None

    views = soup.select_one('div[class = "stat-item"] > div[class = "views"]')
    views = views.find_next_sibling('span') if views else None

    videos = soup.select_one('a[class = "stat-item"] > div[class="videos"]')
    videos = videos.find_next('span') if videos else None

    photos = soup.select_one('a[class = "stat-item"] > div[class="photos"]')
    photos = photos.find_next('span') if photos else None

    comments = soup.select_one(
        'a[class = "stat-item"] > div[class="comments"]')
    comments = comments.find_next('span') if comments else None

    tags = soup.select_one('div[class = "tags"]')
    tags = ','.join(list(map(lambda el: el.text.replace('\"', '\''),
                             soup.select_one('div[class = "tags"]').findChildren('a')))) if tags else None

    about = soup.select_one('h2[id *= "about"]') if soup.select_one('h2[id *= "about"]') else soup.select_one(
        'h1[id *= "about"]')
    about = about.find_next('p') if about else None

    # Make a pause to prevent ip ban
    time.sleep(1)

    return ", ".join([strToToken(getText(title)),
                      strToToken(getText(status)).replace('\n', ''),
                      strToToken(getText(type)).replace(',', ''),
                      strToToken(getText(year)),
                      strToToken(getText(place)).replace('\n', ''),
                      strToToken(date),
                      strToToken(getText(views)).replace(',', ''),
                      strToToken(getText(videos)),
                      strToToken(getText(photos)),
                      strToToken(getText(comments)),
                      strToToken(tags),
                      strToToken(getText(about))])


def linksToStr(links):
    # Check argument
    if not isinstance(links, list) and len(links) > 0:
        print('Bad argument value!')
        return

    print('Data scraping started...')

    # Parrallel async scraping from all links
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        res = executor.map(
            linkToStr, links)

    print('Data scraping finished.')

    return "\n".join(list(res))


def saveMemes(startPage, numOfPages):
    # Check argument
    if not (isinstance(numOfPages, int) and numOfPages > 0):
        print('Error! Wrong page number.')
        return

    # Time and write the data to the file
    t0 = time.time()

    with open('memes.csv', 'a+', encoding="utf-8") as f:
        # Save the memes to the file
        f.write(linksToStr(getLinks(startPage, numOfPages)) + "\n")
        f.close()

    t1 = time.time()
    print(f"Operation took {round(t1-t0,2)} seconds")

    return "All done, dataset created"


saveMemes(1, 1)
