#include "Errors.h"

/* Incorrect cmd error */
void Errors::incrctCmd()
{
    std::cerr << "Input error - Undefined command!\n"
              << "Please enter valid command.\n";
}

/* Incorrect product argument error */
void Errors::incrctProd()
{
    std::cerr << "Incorrect product argument passed!\n"
              << "Please check list of all valid products using 'prod' command.\n";
}

/* No product error in current period error */
void Errors::noProdCurPeriod()
{
    std::cerr << "There is no product data for the current date!\n"
              << "Please try another product.\n";
}

/* No product error in requested period error */
void Errors::noProdReqPeriod()
{
    std::cerr << "There is no product data for the requested date!\n"
              << "Please try another product or date.\n";
}

/* Incorrect order type argument error */
void Errors::incrctOTP()
{
    std::cerr << "Incorrect order type argument passed!\n"
              << "Valid values are 'bid' and 'ask'.\n";
}

/* Incorrect extrema argument error */
void Errors::incrctExtrema()
{
    std::cerr << "Incorrect extrema argument passed!\n"
              << "Valid values are 'min' and 'max'.\n";
}

/* Incorrect date argument error */
void Errors::incrctDate()
{
    std::cerr << "Incorrect date argument passed!\n"
              << "Please check list of all available dates using 'dates' command.\n";
}