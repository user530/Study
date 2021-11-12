#pragma once
#include <string>
#include <map>
#include "OrderBookEntry.h"

class Wallet
{
public:
    /** Wallet contructor */
    Wallet();

    /** Add currency of the selected type to the wallet */
    void insertCurrency(const std::string type, double amount);

    /** Remove currency of the selected type from the wallet */
    bool removeCurrency(const std::string type, double amount);

    /** Check if the wallet contains amount of the specified currency */
    bool containsCurrency(const std::string type, const double amount);

    /** Check if we can fulfill specified order */
    bool canFulfillOrder(const OrderBookEntry &order);

    /** Generate a string representation of the wallet */
    std::string toString();

private:
    std::map<std::string, double> currencies;
};