#pragma once

#include "OrderBookEntry.h"
#include "csvReader.h"
#include <string>
#include <vector>

class OrderBook
{
public:
    /** Construct, reading a csv file */
    OrderBook(std::string _fileName);

    /** Return vector of all known products in the dataset*/
    std::vector<std::string> getKnownProducts();

    /** Return vector of all order book entries that match type, product and timestamp */
    std::vector<OrderBookEntry> getOrders(OrderBookType _type,
                                          std::string _product,
                                          std::string _timestamp);

    /** Static function to get the highest price from the vector of orders */
    static double getHighPrice(std::vector<OrderBookEntry> &orders);

    /** Static function to get the highest price from the vector of orders */
    static double getLowPrice(std::vector<OrderBookEntry> &orders);

    /** Get spread between two prices */
    static double getSpread(double highPrice, double lowPrice);

    /** Get earliest time, assuming orders are sorted by the time(!) */
    std::string getEarliestTime();

    /** Return the time stamp that comes next after the argument 
     * If this timestamp is the last, wraps around
     */
    std::string getNextTime(std::string timestamp);

private:
    /** Vector of orders */
    std::vector<OrderBookEntry>
        orders;
};