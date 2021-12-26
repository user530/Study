#pragma once
#include "ProductPage.h"

class TimestampPage
{
private:
    /* Container for different product pages from the same timestamp */
    std::map<std::string, ProductPage> _timedOrders;

public:
    TimestampPage();
    void addProductPage(const std::string, const ProductPage &);
    void printTimestampPage();
};
