#include "AdvisorBot.h"
#include <iostream>
#include "CSVReader.h"

/** Constructor function */
AdvisorBot::AdvisorBot(){};

/** Initialize application */
void AdvisorBot::init()
{
    std::cout << "\n*====================================================*\n"
              << "||   Welcome to the AdvisorBot trader assistance!   ||\n"
              << "||   Use this app to analyse cryptocurrency trade.  ||"
              << "\n*====================================================*\n"
              << std::endl;

    while (true)
    {
        // Print menu
        printMenu();
        // Get user input
        std::string input = getUserInput();
        // Process user input
        processUserInput(CSVReader::tokenise(input, ' '));
    }
};

/** Print application menu */
void AdvisorBot::printMenu()
{
    std::cout << "*=================================================================*\n"
              << "           AdvisorBot responds to the set of commands.\n"
              << "    You can type 'help' command to list all available commands.\n"
              << "*=================================================================*\n"
              << std::endl;
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

/** Prompt user for input, read his input into the string and return it
 * @return string containing user input
 */
std::string AdvisorBot::getUserInput()
{
    // Prepare string to read input
    std::string input;
    // Prompt user for the input
    std::cout << "Please enter your command:" << std::endl;
    // Read user input and save it to the prepared string variable
    std::getline(std::cin, input);
    // Return user input string
    return input;
};

/**  */
// std::vector<std::string> AdvisorBot::parseUserInput(std::string inputLine)
// {
// }

/** Processes token string and responds with appropriate action
 * @param cmdVector-vector of strings defining user's command
 */
void AdvisorBot::processUserInput(std::vector<std::string> cmdVector)
{
    switch (cmdVector.size())
    {
    // Empty input
    case 0:
        // Respond with error msg
        std::cout << "Input error - Empty line! Please enter valid command." << std::endl;
        break;

    // Command w/o additional argument
    case 1:
        // Check what command was sent
        std::cout << "One argument" << std::endl;
        break;

    // Command with a single argument
    case 2:
        // Check what command was sent
        std::cout << "Two arguments" << std::endl;
        break;

    // Command with two arguments
    case 3:
        // Check what command was sent
        std::cout << "Three arguments" << std::endl;
        break;

    // Command with three arguments
    case 4:
        // Check what command was sent
        std::cout << "Four arguments" << std::endl;
        break;

    // There are no valid commands with 5+ token items -> Error
    default:
        // Respond with error msg
        std::cout << "Input error - Too many arguments passed! Please enter valid command." << std::endl;
        break;
    }
}
