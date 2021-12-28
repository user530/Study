#pragma once
#include "DayData.h"

class Orderbook
{
private:
    /* Container for different market day pages */
    std::map<std::string, DayData> _orderbook;

public:
    Orderbook(const std::string);
    /* Returns specific day page */
    DayData &getDayPage(const std::string);
    /* Prints whole orderbook */
    void printOrderbook();
    /* Get all products */
    std::set<std::string> getAllProducts();
};
