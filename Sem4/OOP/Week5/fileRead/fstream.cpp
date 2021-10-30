#include <iostream>
#include <string>
#include <vector>
#include <fstream>

int main()
{

    // std::ifstream csvFile{"OrderBookData.csv"};
    std::ifstream csvFile{"1.txt"};

    if (csvFile.is_open())
    {
        // Status msg
        std::cout << "File opened" << std::endl;

        // Create var for line, and pull the data from the csvFile
        std::string line;
        // std::getline(csvFile, line);
        // std::cout << "Read line - " << line << std::endl;

        // auto read all lines
        while (std::getline(csvFile, line))
        {
            std::cout << line << std::endl;
        }

        // Close file before moving one
        csvFile.close();
    }
    else
    {
        std::cout << "File is not opened" << std::endl;
    }

    return 0;
}