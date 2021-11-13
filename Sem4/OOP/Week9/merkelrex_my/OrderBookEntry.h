#pragma once

#include <string>

enum class OrderBookType
{
    bid,
    ask,
    unknown,
    bidsale,
    asksale
};

class OrderBookEntry
{
public:
    double price;
    double amount;
    std::string timestamp;
    std::string product;
    OrderBookType orderType;
    std::string username;

    OrderBookEntry(
        double _price,
        double _amount,
        std::string _timestamp,
        std::string _product,
        OrderBookType _orderType,
        std::string _username = "dataset");

    /** Function to convert string into a correct Order Book type (ask/bid) */
    static OrderBookType stringToOBT(std::string token);

    /** Function to compare two OrderBookEntries based on the timestamp */
    static bool compareByTimestamp(const OrderBookEntry &entry1, const OrderBookEntry &entry2);

    /** Function to sort two OrderBookEntries in ascending order based on the price */
    static bool compareByPriceAsc(const OrderBookEntry &entry1, const OrderBookEntry &entry2);

    /** Function to sort two OrderBookEntries in descending order based on the price */
    static bool compareByPriceDesc(const OrderBookEntry &entry1, const OrderBookEntry &entry2);
};