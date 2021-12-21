#pragma once
#include <string>

class AdvisorBot
{
private:
    /** Print application menu */
    void printMenu();
    /** C1) List all available commands */
    void printHelp();
    /** C2) Output help for the speciﬁed command */
    void printCmdHelp();
    /** C3) List available products */
    void printProducts();
    /** C4) Find minimum bid or ask for product in current time step */
    void findMin();
    /** C5) Find maximum bid or ask for product in current time step */
    void findMax();
    /** C6) Compute average ask or bid for the sent product over the sent number
of time steps */
    void findAvg();
    /** C7) Predict max or min ask or bid for the sent product for the next time
step */
    void predictPrice();
    /** C8) State current time in dataset, i.e. which timeframe are we looking at */
    void printTimestamp();
    /** C9) Move to next time step */
    void nextTurn();
    /** C10) Plot Market Depth Chart */
    void plotGraph();

    /** Get user input */
    std::string getUserInput();
    /** Process user input */
    void processUserInput();

public:
    /** Constructor function */
    AdvisorBot();
    /** Initialize application */
    void init();
};
