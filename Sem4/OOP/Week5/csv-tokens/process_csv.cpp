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
std::vector<std::vector<std::string>> createData(std::string filename)
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

int main()
{

    std::vector<std::vector<std::string>> marketData = createData("OrderBookData.csv");

    for (std::vector<std::string> &row : marketData)
    {
        std::string line{""};
        for (std::string &token : row)
        {
            line += " / ";
            line += token;
        }

        std::cout << line << std::endl;
    }

    return 0;
}