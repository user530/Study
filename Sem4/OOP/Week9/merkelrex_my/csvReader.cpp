#include "csvReader.h"
#include <iostream>
#include <fstream>

CSVReader::CSVReader(){};

/** Read the file line by line and create order book entries from correct lines */
std::vector<OrderBookEntry> CSVReader::readCSV(std::string filename)
{
    // Result variable, file variable, line variable
    std::vector<OrderBookEntry> entries;
    std::ifstream csvFile{filename};
    std::string csvLine;

    // If file opened correctly;
    if (csvFile.is_open())
    {
        // Iterate over lines
        while (std::getline(csvFile, csvLine))
        {
            // Check if line can be tokenised and converted to the OBE
            try
            {
                std::vector<std::string> token = tokenise(csvLine, ',');
                OrderBookEntry obe = tokensToOBE(token);
                entries.push_back(obe);
            }
            catch (const std::exception &e)
            {
                std::cout << "CSVReader::readCSV bad data"
                          << std::endl;
            }
        }

        // Print the result of the file read
        std::cout << "CSVReader::readCSV read "
                  << entries.size()
                  << " entries..." << std::endl;
    }

    // Close file when done and return the resulting vector of entries
    csvFile.close();
    return entries;
};

std::vector<std::string> CSVReader::tokenise(std::string csvLine, char separator)
{
    // Resulting token
    std::vector<std::string> tokens;

    // Declare variables for start and end indices
    signed int start, end;

    // Declare variable for single token
    std::string token;

    // Initialize the start var
    start = csvLine.find_first_not_of(separator, 0);

    // Iterate over the whole line
    do
    {
        // The end of the token is the next separator
        end = csvLine.find_first_of(separator, start);

        // Escape from the loop if there is no tokens left
        if (start == csvLine.length() || start == end)
            break;

        // If there are still more tokens
        if (end >= 0)
            // Set token equal to the substring
            token = csvLine.substr(start, end - start);
        else
            // Set token to the last substring
            token = csvLine.substr(start, csvLine.length() - start);

        // Add token to the tokens
        tokens.push_back(token);

        // Move to the next substr
        start = end + 1;

    } while (end > 0);

    return tokens;
};

OrderBookEntry CSVReader::tokensToOBE(std::vector<std::string> tokens)
{
    double price, amount;

    // Check the argument size, throw and exception and msg if problem
    if (tokens.size() != 5)
    {
        std::cout << "Bad line" << std::endl;
        throw std::exception{};
    }

    // Check that price and amount arguments are valid numbers
    try
    {
        price = std::stod(tokens[3]);
        amount = std::stod(tokens[4]);
        // Check negative numbers
        if (price < 0 || amount < 0)
        {
            throw std::invalid_argument("Negative number!");
        }
    }
    catch (const std::exception &e)
    {
        std::cout << "\n*****ERROR*****\n\n";
        std::cout << "CSVReader::tokensToOBE - Bad float! " << tokens[3] << std::endl;
        std::cout << "CSVReader::tokensToOBE - Bad float! " << tokens[4] << std::endl;
        std::cout << e.what() << "\n\n***************\n"
                  << std::endl;
        throw;
    }

    // If everything is fine -> create an OrderBookEntry
    OrderBookEntry obe{
        price,
        amount,
        tokens[0],
        tokens[1],
        OrderBookEntry::stringToOBT(tokens[2])};

    return obe;
};

OrderBookEntry CSVReader::tokensToOBE(std::string priceString,
                                      std::string amountString,
                                      std::string timestamp,
                                      std::string product,
                                      OrderBookType ordertype)
{
    double price, amount;

    // Check that price and amount arguments are valid numbers
    try
    {
        price = std::stod(priceString);
        amount = std::stod(amountString);
        // Check negative numbers
        if (price < 0 || amount < 0)
        {
            throw std::invalid_argument("Negative number!");
        }
    }
    catch (const std::exception &e)
    {
        std::cout << "\n\n*****ERROR*****\n";
        std::cout << "CSVReader::tokensToOBE - Bad float! " << priceString << std::endl;
        std::cout << "CSVReader::tokensToOBE - Bad float! " << amountString << std::endl;
        std::cout << e.what() << "\n\n***************\n"
                  << std::endl;
        throw;
    }

    // If everything is OK, create order book entry and return it
    OrderBookEntry userOrder{
        price,
        amount,
        timestamp,
        product,
        ordertype};

    return userOrder;
};