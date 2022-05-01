import csv
import pandas as pd

# Read data into variable
csvData = pd.read_csv("trees.csv")

# Top X lines of data (5 w/0 argument)
csvData.head(5)

# Bottom X lines of data (5 w/0 argument)
# print(csvData.tail())

# Get data based on the col name
# print(csvData['Index'])

# print(csvData["Girth (in)"].mean())      # Mean value from the column
# print(csvData["Girth (in)"].describe())  # Basic information about the column
# print(csvData.shape)                     # Number of rows and columns

# Set "X" column as index of the data frame
csvData.set_index("Index", inplace=True)

# Sort data
csvData.sort_values(by=["Height (ft)"], ascending=True, inplace=True)

# Locate data based on filters
# csvData.loc[(csvData['Girth (in)'] > 12) & (csvData['Volume(ft^3)'] < 30)]

# Plot a graph
# csvData.plot.scatter(x='Height (ft)', y='Volume(ft^3)')

# Create new data frame
df = csvData.loc[(csvData['Height (ft)'] < 80)]
