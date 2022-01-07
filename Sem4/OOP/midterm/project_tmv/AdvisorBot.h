#pragma once
#include <string>
#include <vector>
#include "OrderBook.h"

class AdvisorBot
{
private:
    /** Current time period */
    std::pair<std::string, std::string> curDateTime;

    /** Orderbook */
    // Orderbook orderbook{"testdata.csv"};
    Orderbook orderbook{"testdata2.csv"};

    /** List of all valid commands */
    std::vector<std::string> cmds;

    /** Print initial greeting */
    void printGreeting();

    /** Print application menu */
    void printMenu();

    /** C1) List all available commands */
    void printHelp();

    /** C2) Output help for the speciﬁed command */
    void printCmdHelp(std::string);

    /** C3) List available products */
    void printProducts();

    /** C4) Find minimum bid or ask for product in current time step */
    void findMin(const std::string, const std::string);

    /** C5) Find maximum bid or ask for product in current time step */
    void findMax(const std::string, const std::string);

    /** C6) Compute average ask or bid for the sent product over the sent number
of time steps */
    void findAvg(const std::string, const std::string, const std::string);

    /** C7) Predict max or min ask or bid for the sent product for the next time
step */
    void predictPrice(const std::string, const std::string, const std::string);

    /** C8) State current time in dataset, i.e. which timeframe are we looking at */
    void printTimestamp();

    /** C9) Move to next time step */
    void nextTurn();

    /** C10) Plot Market Depth Chart */
    void plotGraph(const std::string, const std::string, const std::string);

    /** Get user input */
    std::string getUserInput();

    /** Parse unit input into vector of the strings */
    std::vector<std::string> parseUserInput(std::string);

    /** Process user input */
    void processUserInput(std::vector<std::string>);

    /** Handle single line commands */
    void hadleSingleCmd(const std::string);

    /** Handle 1 arg commands */
    void hadle1ArgCmd(const std::string, const std::string);

    /** Handle 2 arg commands */
    void hadle2ArgCmd(const std::string, const std::string, const std::string);

    /** Handle 3 arg commands */
    void hadle3ArgCmd(const std::string, const std::string, const std::string, const std::string);

    /** Print 'undefined command' error */
    void undefCmdErr();

    /** Print 'product not found' error */
    void prod404Err();

    /** Print incorrect argument error */
    void undefArgErr(std::string);

public:
    /** Constructor function */
    AdvisorBot();
    /** Initialize application */
    void init();
};
