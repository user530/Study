import json
from unittest import TestCase
import pandas as pd

my_json = """
{
    "name": "Timarsuev Magomed Vahaevich",
    "languages": ["C++", "JS", "PHP", "Python"],
    "qualifications": ["BSc", "PhD"],
    "modules": ["CM2015", "CM2020", "CM2025", "CM2030"],
    "teachers": [{"name": "John", "module": "CM2020"}, {"name": "Kate", "module": ["CM2015", "CM2030"]}]
}
"""

# Load JSON data into var "myData"
myData = json.loads(my_json)

# Teachers data
teacherData = pd.DataFrame(myData['teachers'], columns=['name', 'module'])

# Convert data to CSV format for future use
teacherData.to_csv("teachers.csv")

# Print
# print(json.dumps(myData))
print(teacherData)
