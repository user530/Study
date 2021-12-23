#include "CSVReader.h"
#include <fstream>
#include <iostream>

CSVReader::CSVReader(){};

/** Break string into vector of strings based on the separator
 * (from the merkelrex project)
 * @param line-line of text to be partitioned
 * @param separator-separator for the different tokens
 * @returns vector of the strings that formed the line
 */
std::vector<std::string> CSVReader::tokenise(const std::string line, const char separator)
{
    std::vector<std::string> tokens;
    signed int start, end;
    std::string token;
    start = line.find_first_not_of(separator, 0);
    do
    {
        end = line.find_first_of(separator, start);
        if (start == line.length() || start == end)
            break;
        if (end >= 0)
            token = line.substr(start, end - start);
        else
            token = line.substr(start, line.length() - start);
        tokens.push_back(token);
        start = end + 1;
    } while (end > 0);

    return tokens;
};

std::vector<DayData> CSVReader::transformCSV(const std::string filename)
{
    // Prepare variable to store all data
    std::vector<DayData> orderBook;
    // CSV file
    std::ifstream csvFile{filename};
    // Variable to store single line of CSV data
    std::string line;

    // DELETE THIS!
    std::vector<std::string> lines;

    // Try to open requested file
    if (csvFile.is_open())
    {
        // Iterate file line by line
        while (std::getline(csvFile, line))
        {
            /* Try to transform std::string into orderBookEntry */
            std::cout << tokenise(line, ',')[0] << std::endl;
            lines.push_back(line);
        }
        // Report about result
        std::cout << "CSVReader::transformCSV transformed " << lines.size() << std::endl;
    }
    // If file wasn't opened
    else
    {
        std::cout << "Can't open required file!" << std::endl;
    }
};

int main()
{
    // CSVReader::transformCSV("filename");
    CSVReader::transformCSV("20200601.csv");
}