import numpy

my_dict = {"key1": "value1", 3: "banana"}

print(my_dict.get(3))

if 'test' in my_dict.keys() == False:
    my_dict['test'] = 1

a = numpy.array(['one', '2', '3.0'], dtype='<U3')
print(a)
