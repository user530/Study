def highest(val1, val2):
    # first_higher = (int)(val1>val2)
    # return val1 * first_higher + val2 * (1-first_higher)
    if(val1 > val2):
        return val1
    else:
        return val2


print(highest(1, 5))
print(highest(7, 5))
print(highest(5, 5))
