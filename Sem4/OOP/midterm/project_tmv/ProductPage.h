#pragma once
#include "OrderTypeGroup.h"
#include <map>

class ProductPage
{
private:
    /* Container for all types of orders for one product */
    std::map<OrderType, OrdertypeGroup &> _productOrders;

public:
    ProductPage();
    void addOrdertypeGroup(OrderType, OrdertypeGroup &);
    void printProductPage();
};