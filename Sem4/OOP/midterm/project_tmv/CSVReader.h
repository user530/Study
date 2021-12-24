#pragma once
#include "OrderBook.h"

class CSVReader
{
public:
    /** Constructor */
    CSVReader();
    /** Break string into vector of strings based on the separator */
    static std::vector<std::string> tokenise(const std::string, const char);

    /** Transform CSV file into OrderBook */
    static std::map<std::string,
                    std::map<std::string, std::map<std::string,
                                                   std::map<OrderType,
                                                            OrderTypeSubsection>>>>
    transformCSV(const std::string);

private:
    static Order tokensToOrder(std::string, std::string);
};