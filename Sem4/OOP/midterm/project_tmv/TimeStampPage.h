#pragma once
#include "ProductPage.h"
#include <set>

class TimestampPage
{
private:
    /* Container for different product pages from the same timestamp */
    std::map<std::string, ProductPage> _timedOrders;
    /* Set of all product keys */
    std::set<std::string> _products;

public:
    TimestampPage();
    void addProductPage(const std::string, const ProductPage &);
    bool checkProductPage(const std::string);
    ProductPage &getProductPage(const std::string);
    void printTimestampPage();
    std::set<std::string> getProductKeys();
};
