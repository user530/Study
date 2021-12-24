#pragma once
#include "ProductPage.h"

class TimestampPage
{
private:
    /* Container for different product pages from the same timestamp */
    std::map<std::string, ProductPage> _timedOrders;

public:
    TimestampPage();
    void addProductPage(std::string, ProductPage);
    void printTimestampPage();
};
