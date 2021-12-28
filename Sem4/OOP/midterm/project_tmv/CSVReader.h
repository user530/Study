#pragma once
#include "OrderBook.h"

class CSVReader
{
public:
    /** Constructor */
    CSVReader();

    /** Break string into vector of strings based on the separator */
    static std::vector<std::string> tokenise(const std::string, const char);

    /** Transform CSV file into OrderBook map */
    static std::map<std::string, DayData> transformCSV(const std::string);

    static Order strToOrder(const std::string, const std::string);

private:
    static std::pair<std::string, std::string> splitDatetime(const std::string);
    static bool checkTokensLength(const int, const unsigned int);
    static bool checkDateTimeToken(const std::string, const unsigned int);
    static bool checkDateToken(const std::string, const unsigned int);
    static bool checkTimeToken(const std::string, const unsigned int);
    static bool checkProductToken(const std::string, const unsigned int);
    static bool checkOrdertypeToken(const std::string, const unsigned int);
    static bool checkOrderToken(const std::string, const unsigned int);
    static bool checkCSVLine(const std::vector<std::string>, const unsigned int);
};