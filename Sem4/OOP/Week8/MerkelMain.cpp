#include "MerkelMain.h"
#include "csvReader.h"
#include <iostream>
#include <string>
#include <limits>

// MerkelMain::MerkelMain(){};

/** Print game menu */
void MerkelMain::printMenu()
{
    // Print available options
    std::cout << "Please select your action:\n"
              << "1) Print help;\n"
              << "2) Print exchange stats;\n"
              << "3) Make an offer;\n"
              << "4) Make a bid;\n"
              << "5) Print wallet;\n"
              << "6) Continue.\n"
              << "\n=============================\n"
              << "Current time is - "
              << currentTime
              << "\n=============================\n"
              << std::endl;
};
/** Print help */
void MerkelMain::printHelp()
{
    std::cout << "Help - your aim is to make money.\n"
              << "Analyse the market and make bids "
              << "and offers to raise some currency.\n\n"
              << "=============================\n"
              << std::endl;
};
/** Print current market information */
void MerkelMain::printMarketStats()
{
    // Iterate over all available products
    for (const std::string &product : orderBook.getKnownProducts())
    {
        // Print name of the product
        std::cout << "Product: " << product << std::endl;

        // Variable for two order types
        std::vector<OrderBookType> types;
        types.push_back(OrderBookType::ask);
        types.push_back(OrderBookType::bid);

        // For each product we iterate over all order types
        for (const OrderBookType &type : types)
        {
            // Based on the type of order we create type string variable to use in messages
            std::string typeStr = (type == OrderBookType::ask ? "ask" : "bid");

            // Get the data for current product, type and time
            std::vector<OrderBookEntry> entries = orderBook.getOrders(type, product, currentTime);

            // Print the total number of entries for this type of the product
            std::cout << "  There are " << entries.size() << " " << typeStr << "s for this product\n";

            // Variables for min and max prices
            double min{OrderBook::getLowPrice(entries)};
            double max{OrderBook::getHighPrice(entries)};

            // Print min, max and spread
            std::cout << "      The max " << typeStr << " for this product is " << max << "\n";
            std::cout << "      The min " << typeStr << " for this product is " << min << "\n";
            std::cout << "          The " << typeStr << " spread for this product is " << OrderBook::getSpread(max, min) << "\n\n";
        }
        std::cout << "=============================\n"
                  << std::endl;

        // std::vector<OrderBookEntry> entries = orderBook.getOrders(OrderBookType::ask, product, currentTime);

        // std::cout << "There are " << entries.size() << " asks for this product\n";

        // double min{OrderBook::getLowPrice(entries)};
        // double max{OrderBook::getHighPrice(entries)};

        // std::cout << "The max ask for this product is " << max << "\n";

        // std::cout << "The min ask for this product is " << min << "\n";

        // std::cout << "The spread for this product is " << OrderBook::getSpread(max, min) << "\n";

        // std::cout << "\n=============================\n"
        //           << std::endl;
    }
};
/** Make an ask market offer */
void MerkelMain::enterAsk()
{
    // Prompt + explanation
    std::cout << "Make an offer\n\n"
              << "The format is - 'product, price, amount'\n"
              << "e.g. - 'ETH/BTC, 200, 0.5'\n"
              << "=============================\n"
              << std::endl;

    // Variable that stores user ask information
    std::string askString;

    // Read user input and assign it to the 'askString' variable
    std::getline(std::cin, askString);

    // Tokenise the input
    std::vector<std::string> askTokens = CSVReader::tokenise(askString, ',');

    // Check the input size and make warning if nessesary
    if (askTokens.size() != 3)
    {
        std::cout << "Bad input, check your format..." << std::endl;
    }
    else
    {
        try
        {
            // Create the ask order from the user input
            OrderBookEntry userOrder = CSVReader::tokensToOBE(askTokens[1],
                                                              askTokens[2],
                                                              currentTime,
                                                              askTokens[0],
                                                              OrderBookType::ask);

            // Add it to the orderBook and shuffle it in the right position
            orderBook.insertOrder(userOrder);
        }
        catch (const std::exception &error)
        {
            std::cout << "MerkelMain::enterAsk - Bad input...\n"
                      << "**********\n"
                      << std::endl;
        }
    }

    // Confirmation msg
    std::cout
        << "You placed ask order as follows - " << askString << std::endl;
};
/** Make an ask market offer */
void MerkelMain::enterBid()
{
    // Prompt + explanation
    std::cout << "Make a bid\n\n"
              << "The format is - 'product, price, amount'\n"
              << "e.g. - 'ETH/BTC, 200, 0.5'\n"
              << "=============================\n"
              << std::endl;

    // Variable that stores user bid information
    std::string bidString;

    // Read user input and assign it to the 'bidString' variable
    std::getline(std::cin, bidString);

    // Tokenise the input
    std::vector<std::string> bidTokens = CSVReader::tokenise(bidString, ',');

    // Check the input size and make warning if nessesary
    if (bidTokens.size() != 3)
    {
        std::cout << "Bad input, check your format..." << std::endl;
    }
    else
    {
        try
        {
            // Create the bid order from the user input
            OrderBookEntry userOrder = CSVReader::tokensToOBE(bidTokens[1],
                                                              bidTokens[2],
                                                              currentTime,
                                                              bidTokens[0],
                                                              OrderBookType::bid);

            // Add it to the orderBook and shuffle it in the right position
            orderBook.insertOrder(userOrder);
        }
        catch (const std::exception &error)
        {
            std::cout << "MerkelMain::enterBid - Bad input...\n"
                      << "**********\n"
                      << std::endl;
        }
    }

    // Confirmation msg
    std::cout
        << "You placed bid order as follows - " << bidString << std::endl;
};
/** Print available money  */
void MerkelMain::printWallet()
{
    std::cout << "No money, honey\n\n"
              << "=============================\n"
              << std::endl;
};
/** Skip to the next game turn */
void MerkelMain::gotoNextTimeFrame()
{
    // Iterate to the next timeframe
    currentTime = orderBook.getNextTime(currentTime);
    std::cout << "A few moments later...\n\n"
              << "=============================\n"
              << std::endl;
};
/** Read the user action */
int MerkelMain::getUserOption()
{
    // Declare and initialize the result variable
    int user_option = 0;
    // Declare the variable to read input
    std::string user_input;

    // Ask for the input
    std::cout << "Type in 1-6 to choose action..." << std::endl;

    // Read line using getline
    std::getline(std::cin, user_input);

    // Check valid input and react accordingly
    try
    {
        user_option = std::stoi(user_input);
    }
    catch (const std::exception &error)
    {
        // Prompt bad input
        std::cout << "Bad input!" << std::endl;
    }

    // Visualize the user selection
    std::cout
        << "You selected option #"
        << user_option
        << "\n\n=============================\n"
        << std::endl;

    return user_option;
};
/** Print the wrong input warning */
void MerkelMain::warning()
{
    std::cout << "Invalid input command, please try again!\n\n"
              << "=============================\n"
              << std::endl;
};
/** Print the initial welcome message */
void MerkelMain::welcome()
{
    // Welcoming message
    std::cout << "=============================\n\n"
              << "Welcome to TradeSim!\n"
              << std::endl;
};
/** Respond to the user action */
void MerkelMain::processUserOption(int userOption)
{
    // React accordingly to the input
    switch (userOption)
    {
    case 1:
        printHelp();
        break;

    case 2:
        printMarketStats();
        break;

    case 3:
        enterAsk();
        break;

    case 4:
        enterBid();
        break;

    case 5:
        printWallet();
        break;

    case 6:
        gotoNextTimeFrame();
        break;

    default:
        warning();
        break;
    };
};

/** Start the game */
void MerkelMain::init()
{
    // define user_option variable
    unsigned int user_option;

    // Print welcome message
    welcome();

    // Setupe current time
    currentTime = orderBook.getEarliestTime();

    // Make a game repeat itself
    while (true)
    {
        // Print options each time
        printMenu();

        // Get user input and respond
        user_option = getUserOption();
        processUserOption(user_option);
    }
};