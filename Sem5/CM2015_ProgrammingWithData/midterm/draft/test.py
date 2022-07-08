from cProfile import label
from cmath import isnan
from datetime import datetime
from sre_compile import isstring
from time import time
from turtle import color
from xmlrpc.client import boolean
from numpy import correlate
from scipy.stats import normaltest
import matplotlib.pyplot as plt
import pandas as pd

# Read file, select all columns except the last two and save it to CSV file
# df = pd.read_csv('memes_dataset.csv')
# df = df.iloc[:, :-2]
# df.to_csv('new_file.csv', index=False)

df = pd.read_csv('new_file.csv')

df = df.sort_values('views', ascending=False)
df = df.drop_duplicates(subset='name', keep='first')
# df = df.groupby(by=['name'])['name'].count().sort_values(ascending=False)


# print(df.groupby(by=['status']).count().sort_values(
#     by=['status'], ascending=False))
# print(df.groupby(by=['origin_year'])[
#       'origin_year'].count().sort_values(ascending=False))
# print(df.groupby(by=['origin_place'])[
#       'origin_place'].count().sort_values(ascending=False))


status_type = pd.CategoricalDtype(
    categories=['Submission', 'Deadpool', 'Confirmed'], ordered=True)
df['status'] = df['status'].astype(status_type)


# df['type'] = df['type'].fillna('Undefined')
# memeType_type = pd.CategoricalDtype(
#     categories=df['type'].unique(), ordered=True)
# df['type'] = df['type'].astype(memeType_type)
#df['type'] = df['type'].cat.codes

# df['origin_year'] = df['origin_year'].map(lambda val: val if val != 'Unknown' and int(
#     val) >= 1920 and int(val) <= 2020 else 'Unknown')
# year_type = pd.CategoricalDtype(
#     categories=sorted(df['origin_year'].unique()), ordered=True)
# df['origin_year'] = df['origin_year'].astype(year_type)


# popular_origin = df['origin_place'].value_counts().gt(1)
# popular_origin = popular_origin.loc[popular_origin == True].index.to_list()
# df['origin_place'] = df['origin_place'].map(
#     lambda val: val if val in popular_origin else 'Other')
# origin_type = pd.CategoricalDtype(
#     categories=df['origin_place'].unique(), ordered=True)
# df['origin_place'] = df['origin_place'].astype(origin_type)


# print(df.dtypes)
# df['date_added'] = df['date_added'].map(lambda timeStr: datetime.strptime(
#     timeStr, "%Y-%m-%dT%H:%M:%S%z"))
# print(df.dtypes)


# df['date_added'] = pd.to_datetime(df['date_added'], utc=True, format="")
# print(df['date_added'].groupby(df['date_added'].dt.year).count())
# df['date_added'] = pd.to_numeric(df['date_added'])


# print(df[["views", "videos", "photos", "comments"]].sort_values(
#     ["views", "videos", "photos", "comments"]))

# print(df['tags'].value_counts())
# df['tags'] = df['tags'].fillna('none...')
# df['tags'] = df['tags'].map(lambda str: str.split(', '))


# df['about'] = df['about'].fillna('No data...')
# df['about'] = df['about'].map(
#     lambda str: 'No data...' if '\r\n' in str else str)


df['name_len'] = df['name'].map(lambda val: len(val))

#print(df[['name', 'views']].head(15))
#print(df[['name', 'views']].iloc[10:].head(10))
print(df.groupby(by=['type'])['type'].value_counts())

df['status_f'] = pd.factorize(df['status'])[0]
df['status_f2'] = df['status'].cat.codes
print(df['status_f'].head(100))
print(df['status_f2'].head(100))


# tags = pd.Series([val for list in df['tags'] for val in list]).value_counts()
# popular_tags = tags.gt(1)
# popular_tags = popular_tags.loc[popular_tags == True].index.to_list()


# print(df.sort_values(by=['origin_year'], ascending=True).head(20))
# print(df.groupby(['origin_year']).mean().sort_values(by=['origin_year'], ascending=False))

# with open("memes_dataset.csv", 'r') as f:

#     print(csvFile)
#     # df = pd.DataFrame(data)
#     # print(df)
#     f.close()


# TAGS - https://towardsdatascience.com/dealing-with-list-values-in-pandas-dataframes-a177e534f173

# # Dict that contains all unique tags and the number of views of all memes with this tag
# tagViews = {}


# # Function to get the total number of views of all memes containing this
# def viewsPerTag(row):
#     for tag in row['tags']:
#         tagViews[tag] = tagViews.get(tag, 0) + row['views']


# # Fill the tagViews
# df[['views', 'tags']].apply(viewsPerTag, axis=1)

# # List of sorted tags
# sorted_tags = sorted(tagViews.items(), key=lambda x: x[1], reverse=True)
