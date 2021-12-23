#pragma once
#include "DayData.h"

class CSVReader
{
public:
    /** Constructor */
    CSVReader();
    /** Break string into vector of strings based on the separator */
    static std::vector<std::string> tokenise(const std::string, const char);

    /** Transform CSV file into OrderBook */
    static std::vector<DayData> transformCSV(const std::string);

private:
    Order tokensToOrder(std::string, std::string);
};