#pragma once
#include "Order.h"
#include "vector"

/** All supported OrderTypes: bid, ask, sale, unknown */
enum class OrderType
{
    bid,
    ask,
    sale,
    unknown
};

/** Class that holds information about the orders of specific ordertype */
class OrderTypeSubsection
{
private:
    /** Minimum price for this order type */
    double _minPrice;
    /** Maximum price for this order type */
    double _maxPrice;
    /** Average price for this order type */
    double _avgPrice;
    /** Number of orders for this order type */
    unsigned int _orderCount;
    /** List of all orders */
    std::vector<Order> _orderList;

public:
    OrderTypeSubsection();
    void addOrder(Order);
    std::vector<Order> getOrders();
    void listOrders();
    void removeOrder(unsigned int);
    static OrderType strToOrdertype(std::string);
};