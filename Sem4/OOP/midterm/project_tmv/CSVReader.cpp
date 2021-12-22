#include "CSVReader.h"

CSVReader::CSVReader(){};

/** Break string into vector of strings based on the separator
 * (from the merkelrex project)
 * @param line-line of text to be partitioned
 * @param separator-separator for the different tokens
 * @returns vector of the strings that formed the line
 */
std::vector<std::string> CSVReader::tokenise(std::string line, char separator)
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
}