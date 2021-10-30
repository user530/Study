#include <iostream>
#include <vector>
#include <string>

/** Create token from the csvLine using argument char as a separator */
std::vector<std::string> tokenise(std::string csvLine, char separator)
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
}

int main()
{
    std::cout << "Hello world!" << std::endl;

    std::vector<std::string> tokens;
    // std::string str = "thing1,thing2,kek,thing4,end!";
    // std::string str = "!";
    std::string str = ",aaa,b,cdeg";
    tokens = tokenise(str, ',');

    for (std::string &token : tokens)
    {
        std::cout << token << std::endl;
    }
    return 0;
}