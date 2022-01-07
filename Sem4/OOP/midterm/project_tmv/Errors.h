#pragma once
#include <iostream>

class Errors
{
public:
    /* Constructor */
    Errors();

    /* Incorrect cmd error */
    static void incrctCmd();

    /* Incorrect product argument error */
    static void incrctProd();

    /* No product error in current period error */
    static void noProdCurPeriod();

    /* No product error in requested period error */
    static void noProdReqPeriod();

    /* Incorrect order type argument error */
    static void incrctOTP();

    /* Incorrect extrema argument error */
    static void incrctExtrema();

    /* Incorrect date argument error */
    static void incrctDate();
};