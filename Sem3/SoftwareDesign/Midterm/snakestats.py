from logging import exception, log
import math


def average(arg):
    try:
        if(type(arg) == list):
            sum = 0
            n = len(arg)
            for i in range(0, n):
                sum += arg[i]
            return sum/n
        else:
            return arg
    except Exception as Argument:
        return Argument


def variance(arg):
    try:
        n = len(arg)
        avr = average(arg)
        sq_sum = 0
        for el in arg:
            sq_sum += (el-avr) * (el - avr)
        return sq_sum/(n-1)
    except Exception as Argument:
        return Argument


def significance(arr1, arr2, criticalT):
    try:
        n1 = len(arr1)
        n2 = len(arr2)
        avg1 = average(arr1)
        avg2 = average(arr2)
        var1 = variance(arr1)
        var2 = variance(arr2)

        t = (max(avg1, avg2)-min(avg1, avg2)) / math.sqrt(var1/n1 + var2/n2)

        return t < criticalT
    except Exception as Argument:
        return Argument
