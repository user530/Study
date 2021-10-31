#include "MerkelMain.h"
#include "csvReader.h"
#include <iostream>
#include <string>

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
              << "6) Continue.\n\n"
              << "=============================\n"
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
    std::cout << "Current market offers:\n\n"
              << std::endl;

    std::cout << "Order book contains : " << orders.size() << std::endl;

    unsigned int bids = 0;
    unsigned int asks = 0;

    for (OrderBookEntry &entry : orders)
    {
        if (entry.orderType == OrderBookType::ask)
        {
            asks++;
        }
        if (entry.orderType == OrderBookType::bid)
        {
            bids++;
        }
    }

    std::cout << "The market contains "
              << asks
              << " asks, and "
              << bids
              << " bids in total."
              << std::endl;

    // for (unsigned i = 0; i < orders.size(); ++i)
    // {
    //     std::cout << i + 1 << ") " << orders[i].timestamp
    //               << " ; " << orders[i].product
    //               << " ; " << orders[i].price
    //               << " ; " << orders[i].amount
    //               << "\n"
    //               << std::endl;
    // }

    std::cout
        << "\n=============================\n"
        << std::endl;
};
/** Make an ask market offer */
void MerkelMain::enterOffer()
{
    std::cout << "Make an offer\n\n"
              << "=============================\n"
              << std::endl;
};
/** Make an ask market offer */
void MerkelMain::enterBid()
{
    std::cout << "Make a bid\n\n"
              << "=============================\n"
              << std::endl;
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
    std::cout << "A few moments later...\n\n"
              << "=============================\n"
              << std::endl;
};
/** Read the user action */
int MerkelMain::getUserOption()
{
    // Declare the result variable
    int user_option;

    // Ask for the prompt
    std::cout << "Type in 1-6 to choose action..." << std::endl;

    // Prompt and visualize
    std::cin >> user_option;
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
        enterOffer();
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
/** Load market orders from data file */
void MerkelMain::loadOrderBook()
{
    orders = CSVReader::readCSV("OrderBookData.csv");
}
/** Start the game */
void MerkelMain::init()
{
    // define user_option variable
    unsigned int user_option;

    // Print welcome message
    welcome();

    // Load market orders
    loadOrderBook();

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