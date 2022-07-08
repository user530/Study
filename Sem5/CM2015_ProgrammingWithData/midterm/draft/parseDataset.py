from os.path import exists
import csv
import json
import pandas as pd


def parseCSV(filename):
    if not (isinstance(filename, str) and exists(filename)):
        print('Error! File not found!')
        return

    # Prepare the result variable
    memeDict = {'Name': [],
                'Year of origin': [],
                'Views': [],
                'Type tags': [],
                'Images': [],
                'Videos': [],
                'Comments': [],
                'Tags': []}

    with open(filename, 'r', encoding="utf-8", newline='') as f:
        reader = csv.reader(f)
        data = list(reader)
        print(data)
        f.close()


# def formatValues(line):

#     if len(line) != 6:
#         print('Bad line data, skipping...')
#         return

#     try:
#         memeDict['Name'] = str(line[0])

#         memeDict['Year of origin'] = int(line[1])

#         memeDict['Views'] = int(line[2])

#         memeDict['Type tags'] = line[3]

#         memeDict['Images'] = int(line[4][0])

#         memeDict['Videos'] = int(line[4][1])

#         memeDict['Comments'] = int(line[4][2])

#         memeDict['Tags'] = str(line[0])
#     except:
#         print('Bad line data, skipping...')
#         continue


# parseCSV('Text.txt')
# parseCSV('memes.csv')

with open('memes.json', 'r', encoding="utf-8") as f:

    data = json.load(f)
    df = pd.DataFrame(data)
    print(df)
    f.close()
