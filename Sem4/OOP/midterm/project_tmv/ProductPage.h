#pragma once
#include "OrdertypeGroup.h"
#include <map>

class ProductPage
{
private:
    /* Container for all types of orders for one product */
    std::map<OrderType, OrdertypeGroup> _productOrders;
    // std::map<std::string, OrdertypeGroup> _productOrders;

public:
    ProductPage();
    void addOrdertypeGroup(const OrderType &, const OrdertypeGroup &);
    bool checkOrdertypePage(const OrderType &);
    OrdertypeGroup &getOrdertypePage(const OrderType &);
    void printProductPage();
};