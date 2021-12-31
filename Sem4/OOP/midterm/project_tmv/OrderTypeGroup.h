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

/** Overload stream extraction operator, to be able to print OrderType */
inline std::ostream &operator<<(std::ostream &out, const OrderType &ordertype)
{
    std::string result;
    if (ordertype == OrderType::bid)
    {
        result = "bid";
    }
    if (ordertype == OrderType::ask)
    {
        result = "ask";
    }
    if (ordertype == OrderType::sale)
    {
        result = "sale";
    }
    out << result;
    return out;
}

/** Class that holds information about the orders of specific ordertype */
class OrdertypeGroup
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

public:
    /** List of all orders */
    std::vector<Order> _orderList;
    OrdertypeGroup();
    void addOrder(const Order &);
    void updateGroupInfo(const double, const double);
    void printGroup();
    double getMin();
    double getMax();
    double getAvg();
    double getTtlVol();
    static OrderType strToOrdertype(const std::string);
};