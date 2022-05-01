import csv

# Open "data.csv" file using csv library
with open("data.csv") as csvfile:

    # Create reader for the file, with param to specify delimiter
    reader = csv.reader(csvfile, delimiter=",")

    # Prepare a new list for the data
    newList = []

    # Iterate over read data and add values from the 4-th col to the list
    for column in reader:
        newList.append(column[3])

    # Delete 'Column name' - first column data
    # newList.remove(newList[0])

    # Re-make list w/o the first item
    newList = newList[1:]

    # Re-make list again, changing values from "str" to "float"
    newList = [float(val) for val in newList]
    mean = sum(newList) / len(newList)  # Calculate mean
    # print(mean)
