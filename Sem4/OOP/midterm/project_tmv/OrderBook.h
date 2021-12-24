#pragma once
#include "DayData.h"

class Orderbook
{
private:
    /* Container for the day pages */
    std::map<std::string,
             std::map<std::string, std::map<std::string,
                                            std::map<OrderType,
                                                     OrderTypeSubsection>>>>
        orders;

public:
    Orderbook(/* args */);
    ~Orderbook();
};
