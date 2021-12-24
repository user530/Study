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

std::map<std::string,
         std::map<std::string, std::map<std::string,
                                        std::map<OrderType,
                                                 OrderTypeSubsection>>>>
CSVReader::transformCSV(const std::string filename)
{
    // Prepare variable to store all data
    std::map<std::string,
             std::map<std::string, std::map<std::string,
                                            std::map<OrderType,
                                                     OrderTypeSubsection>>>>
        orderbook;

    // CSV file
    std::ifstream csvFile{filename};
    // Variable to store single line of CSV data
    std::string line;

    // DELETE THIS!
    int lines = 0;

    // Try to open requested file
    if (csvFile.is_open())
    {

        // Iterate file line by line
        while (std::getline(csvFile, line))
        {
            /* Try to transform std::string into orderBookEntry */
            std::vector<std::string> tokenLine = tokenise(line, ',');
            std::string day = tokenise(tokenLine[0], ' ')[0];
            std::string timestamp = tokenise(tokenLine[0], ' ')[1];
            std::string product = tokenLine[1];
            std::string ordertype = tokenLine[2];
            OrderType OTP = OrderTypeSubsection::strToOrdertype(ordertype);
            std::string price = tokenLine[3];
            std::string amount = tokenLine[4];

            // =========================

            // If market day entry doesnt exist
            if (!orderbook.count(day))
            {
                // Prepare order book structure elements

                Order order = tokensToOrder(price, amount);

                OrderTypeSubsection orderTypePage = OrderTypeSubsection{};

                orderTypePage.addOrder(order);

                std::map<OrderType,
                         OrderTypeSubsection>
                    productPage;

                productPage[OTP] = orderTypePage;

                std::map<std::string,
                         std::map<OrderType,
                                  OrderTypeSubsection>>
                    timestampPage;

                timestampPage[product] = productPage;

                std::map<std::string,
                         std::map<std::string,
                                  std::map<OrderType,
                                           OrderTypeSubsection>>>
                    dayPage;

                dayPage[timestamp] = timestampPage;

                // Add new day container
                orderbook[day] = dayPage;

                // Counter DELETE!
                lines++;
            }
            // If market day entry already exist
            else
            {
                // If timestamp doesnt exist
                if (!orderbook[day].count(timestamp))
                {
                    // Prepare order book structure elements

                    Order order = tokensToOrder(price, amount);

                    OrderTypeSubsection orderTypePage = OrderTypeSubsection{};

                    orderTypePage.addOrder(order);

                    std::map<OrderType,
                             OrderTypeSubsection>
                        productPage;

                    productPage[OTP] = orderTypePage;

                    std::map<std::string,
                             std::map<OrderType,
                                      OrderTypeSubsection>>
                        timestampPage;

                    timestampPage[product] = productPage;

                    std::map<std::string,
                             std::map<std::string,
                                      std::map<OrderType,
                                               OrderTypeSubsection>>>
                        dayPage;

                    dayPage[timestamp] = timestampPage;

                    // Counter DELETE!
                    lines++;
                }
                // If timestamp already there
                else
                {
                    // If product doesnt exist
                    if (!orderbook[day][timestamp].count(product))
                    {
                        // Prepare order book structure elements

                        Order order = tokensToOrder(price, amount);

                        OrderTypeSubsection orderTypePage = OrderTypeSubsection{};

                        orderTypePage.addOrder(order);

                        std::map<OrderType,
                                 OrderTypeSubsection>
                            productPage;

                        productPage[OTP] = orderTypePage;

                        std::map<std::string,
                                 std::map<OrderType,
                                          OrderTypeSubsection>>
                            timestampPage;

                        timestampPage[product] = productPage;

                        // Counter DELETE!
                        lines++;
                    }
                    // If product already exists
                    else
                    {
                        // If ordertype page soesn't exist
                        if (!orderbook[day][timestamp][product].count(OTP))
                        {
                            // Prepare order book structure elements

                            Order order = tokensToOrder(price, amount);

                            OrderTypeSubsection orderTypePage = OrderTypeSubsection{};

                            orderTypePage.addOrder(order);

                            std::map<OrderType,
                                     OrderTypeSubsection>
                                productPage;

                            productPage[OTP] = orderTypePage;

                            // Counter DELETE!
                            lines++;
                        }
                        // If order type page already exists
                        else
                        {
                            // Create order and add it to the page
                            Order order = tokensToOrder(price, amount);
                            orderbook[day][timestamp][product][OTP].addOrder(order);
                            // Counter DELETE!
                            lines++;
                        }
                    }
                }
            }
        }
        // Report about result
        std::cout << "CSVReader::transformCSV transformed " << lines << " lines." << std::endl;
    }
    // If file wasn't opened
    else
    {
        std::cout << "Can't open required file!" << std::endl;
    }

    return orderbook;
};

// Order from strings
Order CSVReader::tokensToOrder(std::string priceStr, std::string amountStr)
{
    // Prepare variables for transformation
    double price, amount;
    // Try to transform strings into doubles
    try
    {
        price = std::stod(priceStr);
        amount = std::stod(amountStr);
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << '\n';
    }

    return Order{price, amount};
};

int main()
{
    // CSVReader::transformCSV("filename");
    CSVReader::transformCSV("20200601.csv");
}