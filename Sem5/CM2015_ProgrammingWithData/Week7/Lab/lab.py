# Write a program that works out which of the local authorities has the most polluted educational institution
# and which has the least polluted educational institution.

import pandas as pd


csvData = pd.read_csv('SchoolsData.csv')

df = pd.DataFrame(csvData, columns=[
                  'URN', 'Local Authority name', 'Establisment name', 'NO2 g/m3 mean'])

df.set_index('URN')

maxNO2 = df['NO2 g/m3 mean'].idxmax()
minNO2 = df['NO2 g/m3 mean'].idxmin()


print("Authority - " + df['Local Authority name'][maxNO2] +
      ' has the most polluted educational institution - ' + df['Establisment name'][maxNO2] + ' (NO2 g/m3: ' + str(df['NO2 g/m3 mean'][maxNO2]) + ')')
print("Authority - " + df['Local Authority name'][minNO2] +
      ' has the least polluted educational institution - ' + df['Establisment name'][minNO2] + ' (NO2 g/m3: ' + str(df['NO2 g/m3 mean'][minNO2]) + ')')
