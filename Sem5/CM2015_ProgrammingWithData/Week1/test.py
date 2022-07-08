def mod(p, q):
    # Handle the wrong argument
    if q == 0:
        print("Error! Division by zero!")
        return

    # When both have the same sign or p is zero
    if (p*q) >= 0:
        if (p >= 0 and p < q) or (p < 0 and p > q) or (p == 0):
            return p
        return mod(p-q, q)

    # When both have different sign
    else:
        return mod(p+q, q)


print(pow(4, 17))
