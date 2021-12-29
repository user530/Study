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
              << '\n';
};

/** C1) List all available commands */
void AdvisorBot::printHelp()
{
    std::cout << "=========================================================\n"
              << "AdvisorBot uses following commands:\n"
              << "1) help\n"
              << "2) help <command_name>\n"
              << "3) prod\n"
              << "4) min <product> <price_type>\n"
              << "5) max <product> <price_type>\n"
              << "6) avg <product> <price_type> <timesteps_number>\n"
              << "7) predict <min/max> <product>\n"
              << "8) time\n"
              << "9) step\n"
              << "10) plot <product> <timesteps_number>\n"
              << "To get additional information type 'help <command_name>'.\n\n";
};

/** C2) Output help for the speciﬁed command */
void AdvisorBot::printCmdHelp(std::string cmd)
{
    // If user request information about help command
    if (cmd == "help")
    {
        std::cout << "This command lists all available commands or gives information about specified command.\n"
                  << "Command form - help OR help <cmd> - where:\n"
                  << "<cmd> - help, prod, min, etc.\n"
                  << "Information about all available commands can be found using 'help' command.\n\n";
    }
    // If user request information about prod command
    else if (cmd == "prod")
    {
        std::cout << "This command lists all products available on the market.\n"
                  << "Command form - prod.\n\n";
    }
    // If user request information about min command
    else if (cmd == "min")
    {
        std::cout << "This command finds minimum bid or ask for the sent product in current timestep.\n"
                  << "Command form - min <product> <price_type> - where:\n"
                  << "<product> - ETH/BTC, DOGE/BTC, BTC/USDT, etc.\n"
                  << "Information about all available products can be found using 'prod' command.\n"
                  << "<price_type> - bid or ask.\n"
                  << "Bid is the maximum price that a buyer is willing to pay, while ask is the minimum price seller is willing to take for the product.\n\n";
    }
    // If user request information about max command
    else if (cmd == "max")
    {
        std::cout << "This command finds maximum bid or ask for the sent product in current timestep.\n"
                  << "Command form - max <product> <price_type> - where:\n"
                  << "<product> - ETH/BTC, DOGE/BTC, BTC/USDT, etc.\n"
                  << "Information about all available products can be found using 'prod' command.\n"
                  << "<price_type> - price type: bid or ask.\n"
                  << "Bid is the maximum price that a buyer is willing to pay, while ask is the minimum price seller is willing to take for the product.\n\n";
    }
    // If user request information about avg command
    else if (cmd == "avg")
    {
        std::cout << "This command computes average price for the sent product over the set number of timesteps.\n"
                  << "Command form - avg <product> <price_type> <timesteps_number> - where:\n"
                  << "<product> - ETH/BTC, DOGE/BTC, BTC/USDT, etc.\n"
                  << "Information about all available products can be found using 'prod' command.\n"
                  << "<price_type> - price type: bid or ask.\n"
                  << "Bid is the maximum price that a buyer is willing to pay, while ask is the minimum price seller is willing to take for the product.\n"
                  << "<timesteps_number> - 1, 2, 3, etc.\n"
                  << "How many timesteps, starting from the current one, use for the calculation.\n\n";
    }
    // If user request information about predict command
    else if (cmd == "predict")
    {
        std::cout << "This command predicts requested price for the next timestep.\n"
                  << "Command form - predict <min/max> <product> - where:\n"
                  << "<min/max> - min or max.\n"
                  << "Min is for the smallest price and Max is for the largest.\n"
                  << "<product> - ETH/BTC, DOGE/BTC, BTC/USDT, etc.\n"
                  << "Information about all available products can be found using 'prod' command.\n\n";
    }
    // If user request information about time command
    else if (cmd == "time")
    {
        std::cout << "This command prints current time in dataset.\n"
                  << "Command form - time.\n\n";
    }
    // If user request information about step command
    else if (cmd == "step")
    {
        std::cout << "This command moves program to the next timestep.\n"
                  << "Command form - step.\n\n";
    }
    // If user request information about plot command
    else if (cmd == "plot")
    {
        std::cout << "This command plots the orderbook chart for the selected product over the set number of steps.\n"
                  << "Command form - <product> <timesteps_number> - where:\n"
                  << "<product> - ETH/BTC, DOGE/BTC, BTC/USDT, etc.\n"
                  << "Information about all available products can be found using 'prod' command.\n"
                  << "<timesteps_number> - 1, 2, 3, etc.\n"
                  << "How many timesteps, starting from the current one, use for the vizualization.\n\n";
    }
    // If user passes undefined command argument
    else
    {
        std::cout << "Input error - Wrong argument!\n"
                  << "Please enter valid command name argument OR another command.\n\n";
    }
};

/** C3) List available products */
void AdvisorBot::printProducts()
{
    // Prepare result varibale
    std::string result = "This data contains orders for the following products: ";

    // Add products to the result string
    for (std::string product : orderbook.getAllProducts())
    {
        result += product + ", ";
    }

    // Print result, slicing last coma
    std::cout << result.substr(0, result.size() - 2) << "\n\n";
};

/** C4) Find minimum bid or ask for product in current time step */
void AdvisorBot::findMin()
{
    // Command should check it's argument
    // If arguments are correct -> print min
    // Else -> print wrong arguments
    std::cout << "FIND MIN fired!" << std::endl;
};

/** C5) Find maximum bid or ask for product in current time step */
void AdvisorBot::findMax()
{
    // Command should check it's argument
    // If arguments are correct -> print max
    // Else -> print wrong arguments
    std::cout << "FIND MAX fired!" << std::endl;
};

/** C6) Compute average ask or bid for the sent product over the sent number
of time steps */
void AdvisorBot::findAvg()
{
    // Command should check it's argument
    // If arguments are correct -> print avg
    // Else -> print wrong arguments
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

/** Processes token string and responds with appropriate action
 * @param cmdVector-vector of strings defining user's command
 */
void AdvisorBot::processUserInput(std::vector<std::string> cmdVector)
{
    // Check cmd string size and route to appropriate response
    switch (cmdVector.size())
    {
    // Empty input
    case 0:
    {
        // Respond with error msg
        std::cout << "Input error - Empty line!\n"
                  << "Please enter valid command.\n\n";
        break;
    }

    // Command w/o additional argument
    case 1:
    {
        // Handle command string
        hadleSingleCmd(cmdVector[0]);

        break;
    }

    // Command with a single argument
    case 2:
    {
        // Handle command string with 1 argument
        hadle1ArgCmd(cmdVector[0], cmdVector[1]);

        break;
    }

    // Command with two arguments
    case 3:
    {
        // Handle command string with 2 arguments

        // Check what command was sent
        std::cout << "Three arguments" << std::endl;
        break;
    }

    // Command with three arguments
    case 4:
    {
        // Check what command was sent
        std::cout << "Four arguments" << std::endl;
        break;
    }

    // There are no valid commands with 5+ token items -> Error
    default:
    {
        // Respond with error msg
        std::cout << "Input error - Too many arguments passed!\n"
                  << "Please enter valid command.\n\n";
        break;
    }
    }
}

/** Handle single line command
 * @param cmd command line from the user input
 */
void AdvisorBot::hadleSingleCmd(std::string cmd)
{
    // General help command
    if (cmd == "help")
    {
        // Print help
        printHelp();
    }

    // Prod command
    else if (cmd == "prod")
    {
        // List all products
        printProducts();
    }

    // Time command
    else if (cmd == "time")
    {
        // Print current timestamp
        printTimestamp();
    }

    // Step command
    else if (cmd == "step")
    {
        // Move to the next timestamp
        nextTurn();
    }

    // Invalid 1 token string
    else
    {
        // Respond with error msg
        std::cout << "Input error - Undefined command!\n"
                  << "Please enter valid command.\n\n";
    }
};

/** Handle single arg commands
 * @param cmd command line from the user input
 * @param arg1 1st command line argument from the user input
 */
void AdvisorBot::hadle1ArgCmd(std::string cmd, std::string arg1)
{
    // Check command
    if (cmd == "help")
    {
        // Execute command with argument
        printCmdHelp(arg1);
    }
    // Invalid command string
    else
    {
        // Respond with error msg
        std::cout << "Input error - Undefined command!\n"
                  << "Please enter valid command.\n\n";
    }
};

/** Handle two arg commands
 * @param cmd command line from the user input
 * @param arg1 1st command line argument from the user input
 * @param arg2 2nd command line argument from the user input
 */
void AdvisorBot::hadle2ArgCmd(std::string cmd, std::string arg1, std::string arg2)
{
    // Min command passed
    if (cmd == "min")
    {
        // Execute MIN command with arguments
    }
    // Max command passed
    else if (cmd == "max")
    {
        // Execute MAX command with arguments
    }
    // Avg command passed
    else if (cmd == "avg")
    {
        // Execute AVG command with arguments
    }
    // Invalid command string
    else
    {
        // Respond with error msg
        std::cout << "Input error - Undefined command!\n"
                  << "Please enter valid command.\n\n";
    }
};

/** Handle three arg commands
 * @param cmd command line from the user input
 * @param arg1 1st command line argument from the user input
 * @param arg2 2nd command line argument from the user input
 * @param arg3 3rd command line argument from the user input
 */
void AdvisorBot::hadle3ArgCmd(std::string cmd, std::string arg1, std::string arg2, std::string arg3){

};