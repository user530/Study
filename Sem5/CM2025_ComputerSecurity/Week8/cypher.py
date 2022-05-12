from numpy import chararray


numbers = [13, 5, 13, 14, 5, 1, 29, 5, 37, 9, 6, 32, 2, 20,
           37, 1, 37, 20, 5, 3, 20, 34, 37, 1, 26, 37, 37, 13]

newNum = [(n + 7 + i) % 37 for [i, n] in enumerate(numbers)]

chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
         'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']

newChars = [chars[ind-1] for ind in newNum]

print()

# for ind, num in enumerate(numbers):
#     print(ind, num)
