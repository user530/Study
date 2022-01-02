#pragma once
#include "Order.h"
#include <vector>
#include <list>

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
    /** List of all orders */
    std::list<Order> _orderList;

public:
    OrdertypeGroup();

    void addOrder(const Order &);
    void updateMetaAdd(const double, const double);
    void printGroup();
    double getMin();
    double getMax();
    double getAvg();
    double getTtlVol();
    bool isEmpty();
    static OrderType strToOrdertype(const std::string);
    static bool priceCompAsc(Order &, Order &);
    static bool priceCompDes(Order &, Order &);
    void sortOrdPrAsc();
    void sortOrdPrDes();
    void eraseFirstOrd();
    void eraseLastOrd();
    void updateMetaReduce(const double, const double);
    void updateMetaErase(const double, const double, const OrderType &);
    static OrdertypeGroup *getMaxPriceContainer(std::vector<OrdertypeGroup *>);
    static OrdertypeGroup *getMinPriceContainer(std::vector<OrdertypeGroup *>);
    void matchAsks(const std::string, const std::string, const std::string, std::vector<OrdertypeGroup *> &);
};