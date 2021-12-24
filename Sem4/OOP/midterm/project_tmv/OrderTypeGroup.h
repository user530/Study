#pragma once
#include "Order.h"
#include <vector>

/** All supported OrderTypes: bid, ask, sale, unknown */
enum class OrderType
{
    bid,
    ask,
    sale,
    unknown
};

/** Class that holds information about the orders of specific ordertype */
class OrderTypeGroup
{
private:
    /** Minimum price for this order type */
    double _minPrice;
    /** Maximum price for this order type */
    double _maxPrice;
    /** Average price for this order type */
    double _avgPrice;
    /** Total volume of the orders */
    double _ttlVolume;
    /** Number of orders for this order type */
    unsigned int _orderCount;
    /** List of all orders */
    std::vector<Order> _orderList;

public:
    OrderTypeGroup();
    void addOrder(Order);
    void updateGroupInfo(double, double);
    void printGroup();
    double getMin();
    double getMax();
    double getAvg();
    static OrderType strToOrdertype(std::string);
};