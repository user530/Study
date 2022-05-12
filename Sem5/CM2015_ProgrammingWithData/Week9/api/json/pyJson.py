# import libraries JSON and pandas
import json
import pandas as pd

# Create simple json obj
earth = {"name": "Earth", "description": "The blue planet"}

# Create more complext json obj
planets = {"size": 8, "planets": [
    {"name": "Mercury", "moons": 0},
    {"name": "Venus", "moons": 0},
    {"name": "Earth", "moons": 1},
    {"name": "Mars", "moons": 2},
    {"name": "Jupiter", "moons": 79},
    {"name": "Saturn", "moons": 82},
    {"name": "Uranus", "moons": 27},
    {"name": "Neptune", "moons": 14},
]}

# Load json from the string
strToJson = json.loads('{"name": "Aldebaran", "description": "The big star"}')

# Create data frame from the JSON
df = pd.DataFrame(planets["planets"])

print(df)

# But if our data has more complex format
planets = {"size": 8, "planets": [
    {"name": "Mercury", "moons": {"size": 0, "main": []}},
    {"name": "Venus", "moons": {"size": 0, "main": []}},
    {"name": "Earth", "moons": {"size": 1, "main": ["moon"]}},
    {"name": "Mars", "moons": {"size": 2, "main": ["Phobos", "Dheimos"]}},
    {"name": "Jupiter", "moons": {"size": 79, "main": [
        "Io", "Europa", "Ganymede", "Callisto"]}},
    {"name": "Saturn", "moons": {"size": 82, "main": []}},
    {"name": "Uranus", "moons": {"size": 27, "main": []}},
    {"name": "Neptune", "moons": {"size": 14, "main": []}},
]}

df = pd.DataFrame(planets["planets"])

print(df)

# We can flatten the structure using 'normalize' command
flat = pd.json_normalize(planets["planets"])

print(flat)
