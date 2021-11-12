#pragma once

#include "OrderBookEntry.h"
#include <vector>
#include <string>

class CSVReader
{
public:
    /** Create and CSV reader object */
    CSVReader();

    // Static functions are available even w/o instance of the class

    /** Read CSV file with argument name and create and the vector of orderbook entries from that */
    static std::vector<OrderBookEntry> readCSV(std::string filename);

    /** Transform the CSV line with separator delimiters into a vector of tokens */
    static std::vector<std::string> tokenise(std::string csvLine, char separator);

    /** Transform user inputs(strings) and program data to order book entry */
    static OrderBookEntry tokensToOBE(std::string priceString,
                                      std::string amountString,
                                      std::string timestamp,
                                      std::string product,
                                      OrderBookType ordertype);

private:
    /** Transform the vector of tokens into an order book entry */
    static OrderBookEntry tokensToOBE(std::vector<std::string> tokens);
};