#pragma once
#include <string>
#include <vector>

class CSVReader
{
public:
    /** Constructor */
    CSVReader();
    /** Break string into vector of strings based on the separator */
    static std::vector<std::string> tokenise(std::string, char);

    /** Transform CSV file into OrderBook */

private:
};