#pragma once
#include "OrderTypeSubsection.h"
#include <map>

class ProductSection
{
private:
    /* Container for all types of orders for one product */
    std::map<OrderType, OrderTypeSubsection> _productOrders;

public:
    ProductSection();
};