import sys
from importlib.resources import path
import os

filename = "secretCodes.txt"
# print(os.path.join('/os/', filename))      # Create path for the file

# print(os.getcwd())                         # Current working dir

# os.mkdir('os')                             # Create dir

# shutil.rmtree("os")                        # Delete dir

# os.chdir('os')
# print(os.getcwd())                         # Move working directory


# IF FILE EXISTS - DELETE IT, ELSE - PRINT WARNING
# if os.path.exists('demo.txt'):
#     os.remove('demo.txt')
# else:
#     print('File doesn\'t exist')

# print(os.path.abspath('../'))              # Using abs path to navigate

# cd = os.path.relpath('..', '/')            # Using relative path to navigate

thisfile = sys.argv[0]
print(os.path.getsize(thisfile))
