#include "OrderBook.h"
#include "csvReader.h"
#include <map>

/** Construct, reading a csv file */
OrderBook::OrderBook(std::string _fileName)
{
    orders = CSVReader::readCSV(_fileName);
};

/** Return vector of all known products in the dataset*/
std::vector<std::string> OrderBook::getKnownProducts()
{
    std::vector<std::string> products;
    std::map<std::string, bool> prodMap;

    // Create product map from orders
    for (const OrderBookEntry &entry : orders)
    {
        prodMap[entry.product] = true;
    }

    // Flatten map into vector
    for (const std::pair<std::string, bool> &productPair : prodMap)
    {
        products.push_back(productPair.first);
    }

    return products;
};

/** Return vector of all order book entries that match type, product and timestamp */
std::vector<OrderBookEntry> OrderBook::getOrders(OrderBookType _type,
                                                 std::string _product,
                                                 std::string _timestamp)
{
    std::vector<OrderBookEntry> filtered_orders;
    for (const OrderBookEntry &entry : orders)
    {
        // Iterate over all orders and collect all that match arguments
        if (entry.orderType == _type &&
            entry.product == _product &&
            entry.timestamp == _timestamp)
        {
            filtered_orders.push_back(entry);
        }
    }
    return filtered_orders;
};

double OrderBook::getHighPrice(std::vector<OrderBookEntry> &orders)
{
    double max = orders[0].price;

    // Itterate over the orders and return the maximum price
    for (const OrderBookEntry &order : orders)
    {
        if (order.price > max)
        {
            max = order.price;
        }
    }

    return max;
};

double OrderBook::getLowPrice(std::vector<OrderBookEntry> &orders)
{
    double min = orders[0].price;

    // Itterate over the orders and return the minimal price
    for (const OrderBookEntry &order : orders)
    {
        if (order.price < min)
        {
            min = order.price;
        }
    }

    return min;
};

double OrderBook::getSpread(double highPrice, double lowPrice)
{
    // Check that arguments are valid and return spread, else throw and error
    if (highPrice >= lowPrice)
    {
        return (highPrice - lowPrice);
    }
    else
    {
        throw std::invalid_argument("High price can't be lower than low price...");
    }
};

std::string OrderBook::getEarliestTime()
{
    // We assume that orders sorted in ascending order
    return orders[0].timestamp;
};

std::string OrderBook::getNextTime(std::string timestamp)
{
    std::string nextTimeStamp = "";

    // Itterate over entries and select the next one that is greater than argument
    // (!) Assuming that the entries are sorted in ascending order based on time
    for (const OrderBookEntry &entry : orders)
    {
        if (entry.timestamp > timestamp)
        {
            nextTimeStamp = entry.timestamp;
            break;
        }
    }

    // Check that this is the last stamp, wrap it around
    if (nextTimeStamp == "")
    {
        nextTimeStamp = orders[0].timestamp;
    }

    return nextTimeStamp;
};
