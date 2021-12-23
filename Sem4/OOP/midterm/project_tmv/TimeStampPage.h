#pragma once
#include "ProductSection.h"

class TimeStampPage
{
private:
    /* Container for the product sections */
    std::map<std::string, ProductSection> _timedOrders;

public:
    TimeStampPage();
};
