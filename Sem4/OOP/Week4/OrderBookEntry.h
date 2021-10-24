#pragma once

#include <string>

enum class OrderBookType
{
    bid,
    ask
};

class OrderBookEntry
{
public:
    double price;
    double amount;
    std::string timestamp;
    std::string product;
    OrderBookType ordertype;

    OrderBookEntry(
        double _price,
        double _amount,
        std::string _timestamp,
        std::string _product,
        OrderBookType _ordertype);
};
