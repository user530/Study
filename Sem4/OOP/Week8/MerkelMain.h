#pragma once

#include <vector>
#include "OrderBookEntry.h"
#include "OrderBook.h"

class MerkelMain
{
public:
    MerkelMain() = default;
    void init();

private:
    void printMenu();
    void printHelp();
    void printMarketStats();
    void enterAsk();
    void enterBid();
    void printWallet();
    void gotoNextTimeFrame();
    int getUserOption();
    void welcome();
    void warning();
    void processUserOption(int userOption);
    // OrderBook orderBook{"OrderBookData.csv"};
    OrderBook orderBook{"testMatching.csv"}; //FOR TESTING PURPOSES!!! CLEAR LATER!
    std::string currentTime;
};