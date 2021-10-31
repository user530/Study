#include <iostream>
#include <fstream>
#include <string>
#include <vector>

/** Separate the string into vector of tokens using delimiter */
std::vector<std::string> tokenise(std::string string, char delimiter)
{
    std::vector<std::string> result;
    signed int start, end;
    std::string token;

    // Position of the first character of the token
    start = string.find_first_not_of(delimiter, 0);
    do
    {
        // Position of the last character of the token
        end = string.find_first_of(delimiter, start);

        // Check the early break conditions
        if (start == end || start == string.length())
        {
            break;
        }

        // Save substrin to the token based on the end position
        if (end >= 0)
        {
            token = string.substr(start, end - start);
        }
        else
        {
            token = string.substr(start, string.length() - start);
        }

        result.push_back(token);
        start = end + 1;

    } while (end > 0);

    return result;
};

/** Read CSV file and tokenise each line */
std::vector<std::vector<std::string>> createMarketData(std::string filename)
{
    // Result variable and token row variable
    std::vector<std::vector<std::string>> result;
    std::vector<std::string> row;

    // CSV file object and CSV line variable
    std::ifstream csvFile{filename};
    std::string csvLine;

    // Iterate over all lines
    while (std::getline(csvFile, csvLine))
    {
        //Tokenise the line and push it to the result
        row = tokenise(csvLine, ',');
        result.push_back(row);
    }

    csvFile.close();

    return result;
}

/** Check the CSV file and tokenise all good input */
std::vector<std::vector<std::string>> processCSV(std::string filename)
{
    // Variables for resulting vector of token rows
    std::vector<std::vector<std::string>> tokensBook;
    std::vector<std::string> tokensRow;

    // Try to open File object with argument name
    std::ifstream csvFile{filename};

    // Open status message
    if (csvFile.is_open())
    {
        std::cout << "File is opened successfully" << std::endl;
    }
    else
    {
        std::cout << "Problem openning the file named - " << filename << std::endl;
    }

    // Variable for string line from the CSV file
    std::string csvLine;

    // Counter variable (maybe change to long?)
    unsigned int i{0};

    // Iterate over all lines in the file
    while (std::getline(csvFile, csvLine))
    {
        // Tokenise the line
        tokensRow = tokenise(csvLine, ',');

        // Handle short length
        if (tokensRow.size() != 5)
        {
            // Print message and skip bad line
            std::cout
                << "Line "
                << i + 1
                << " problem. Wrong number of arguments!"
                << "\nSkipping..."
                << std::endl;
            continue;
        }

        // Check that last two tokens are valid numbers
        try
        {
            double price, amount;
            price = std::stod(tokensRow[3]);
            amount = std::stod(tokensRow[4]);

            std::cout << "Price is " << price
                      << " , and the amount is " << amount << std::endl;
        }
        // If not -> print msg and skip
        catch (const std::exception &e)
        {
            std::cout
                << "Line "
                << i + 1
                << " problem. Wrong arguments for price/amount!"
                << "\nSkipping..."
                << std::endl;
            continue;
        }

        // If all is good, add the token row to the book
        tokensBook.push_back(tokensRow);
        // Increment counter
        ++i;
    }

    std::cout << "*****************************" << std::endl;
    // Close the file and return tokenbook
    csvFile.close();
    return tokensBook;
}

int main()
{

    // std::vector<std::vector<std::string>> marketData = processCSV("OrderBookData.csv");
    std::vector<std::vector<std::string>> marketData = processCSV("MixedData.csv");

    for (std::vector<std::string> &row : marketData)
    {
        std::string line{""};
        for (std::string &token : row)
        {
            line += " ";
            line += token;
        }

        std::cout << line << std::endl;
    }

    return 0;
}