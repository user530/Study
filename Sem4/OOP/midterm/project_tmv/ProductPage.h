#pragma once
#include "OrdertypeGroup.h"
#include <map>

class ProductPage
{
private:
    /* Container for all types of orders for one product */
    // std::map<OrderType, OrdertypeGroup> _productOrders;
    std::map<std::string, OrdertypeGroup> _productOrders;

public:
    ProductPage();
    void addOrdertypeGroup(const std::string, const OrdertypeGroup &);
    bool checkOrdertypePage(const std::string);
    OrdertypeGroup &getOrdertypePage(const std::string);
    void printProductPage();
};