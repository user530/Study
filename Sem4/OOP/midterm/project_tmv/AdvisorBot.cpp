#include "AdvisorBot.h"
#include <iostream>

/** Constructor function */
AdvisorBot::AdvisorBot()
{
    std::cout << "Advisor bot object created! " << std::endl;
};

/** Initialize application */
void AdvisorBot::init()
{
    std::cout << "Advisor bot initialized!" << std::endl;

    while (true)
    {
        printMenu();
        getUserInput();
    }
};

/** Print application menu */
void AdvisorBot::printMenu()
{
    std::cout << "PRINT MENU fired!" << std::endl;
};
/** C1) List all available commands */
void AdvisorBot::printHelp()
{
    std::cout << "PRINT HELP fired!" << std::endl;
};
/** C2) Output help for the speciﬁed command */
void AdvisorBot::printCmdHelp()
{
    std::cout << "PRINT CMD HELP fired!" << std::endl;
};
/** C3) List available products */
void AdvisorBot::printProducts()
{
    std::cout << "PRINT PRODUCTS fired!" << std::endl;
};
/** C4) Find minimum bid or ask for product in current time step */
void AdvisorBot::findMin()
{
    std::cout << "FIND MIN fired!" << std::endl;
};
/** C5) Find maximum bid or ask for product in current time step */
void AdvisorBot::findMax()
{
    std::cout << "FIND MAX fired!" << std::endl;
};
/** C6) Compute average ask or bid for the sent product over the sent number
of time steps */
void AdvisorBot::findAvg()
{
    std::cout << "FIND AVG fired!" << std::endl;
};
/** C7) Predict max or min ask or bid for the sent product for the next time
step */
void AdvisorBot::predictPrice()
{
    std::cout << "PREDICT PRICE fired!" << std::endl;
};
/** C8) State current time in dataset, i.e. which timeframe are we looking at */
void AdvisorBot::printTimestamp()
{
    std::cout << "PRINT TIMESTAMP fired!" << std::endl;
};
/** C9) Move to next time step */
void AdvisorBot::nextTurn()
{
    std::cout << "NEXT TURN fired!" << std::endl;
};
/** C10) Plot Market Depth Chart */
void AdvisorBot::plotGraph()
{
    std::cout << "PLOT GRAPH fired!" << std::endl;
};

std::string AdvisorBot::getUserInput()
{
    std::string input;
    std::cout << "INput smth" << std::endl;
    std::getline(std::cin, input);

    std::cout << "You typed - "
              << input
              << std::endl;
    return input;
};
