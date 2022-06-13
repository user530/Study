from datetime import datetime
from time import time
import pandas as pd

# Read file, select all columns except the last two and save it to CSV file
# df = pd.read_csv('memes_dataset.csv')
# df = df.iloc[:, :-2]
# df.to_csv('new_file.csv', index=False)

df = pd.read_csv('new_file.csv')

# df = df.sort_values('views', ascending=False)
# df = df.drop_duplicates(subset='name', keep='first')
# df = df.groupby(by=['name'])['name'].count().sort_values(ascending=False)

# print(df.head(10))

# print(df.dtypes)
# df['date_added'] = df['date_added'].map(lambda timeStr: datetime.strptime(
#     timeStr, "%Y-%m-%dT%H:%M:%S%z"))
# print(df.dtypes)

# print(df.dtypes)
# df['date_added'] = pd.to_datetime(df['date_added'], utc=True, format="")
# # df['date_added'] = df['date_added'].astype('datetime64[ns]')
# print(df.dtypes)


print(df.groupby(by=['status']).count().sort_values(
    by=['status'], ascending=False))
print(df.groupby(by=['origin_year'])[
      'origin_year'].count().sort_values(ascending=False))
print(df.groupby(by=['origin_place'])[
      'origin_place'].count().sort_values(ascending=False))

#print(df.sort_values(by=['origin_year'], ascending=True).head(20))
#print(df.groupby(['origin_year']).mean().sort_values(by=['origin_year'], ascending=False))

# with open("memes_dataset.csv", 'r') as f:

#     print(csvFile)
#     # df = pd.DataFrame(data)
#     # print(df)
#     f.close()


# TAGS - https://towardsdatascience.com/dealing-with-list-values-in-pandas-dataframes-a177e534f173
