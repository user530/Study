#pragma once
#include
#include "vector"

// All supported OrderTypes: bid, ask, sale, unknown
enum class OrderType
{
    bid,
    ask,
    sale,
    unknown
};

class OrderTypeSubsection
{
private:
    double _minPrice;
    double _maxPrice;
    double _avgPrice;
    unsigned int _orderCount;
    std::vector<> _orders;

public:
    OrderTypeSubsection();
};